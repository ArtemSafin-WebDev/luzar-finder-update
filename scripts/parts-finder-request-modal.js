(function () {
  const EMPTY_VALUES = {
    brand: null,
    model: null,
    vin: "",
    plate: "",
    name: "",
    phone: "",
    email: "",
    parts: "",
    agreement: false,
  };

  class PartsFinderRequestModal {
    constructor() {
      this.state = null;
      this.handleKeydown = this.handleKeydown.bind(this);
      this.handleClick = this.handleClick.bind(this);
      this.handleInput = this.handleInput.bind(this);
    }

    open(options = {}) {
      this.close();
      this.state = {
        endpoint: options.endpoint || "/api/parts-finder/vin-request",
        values: {
          ...EMPTY_VALUES,
          ...(options.values || {}),
        },
        vehicle: options.vehicle || {},
        brandOptions: options.brandOptions || [],
        modelOptions: options.modelOptions || [],
        modelOptionsMap: options.modelOptionsMap || {},
      };
      this.render();
      document.addEventListener("keydown", this.handleKeydown);
    }

    close() {
      document.removeEventListener("keydown", this.handleKeydown);
      document.querySelector(".pf-modal")?.remove();
      this.state = null;
    }

    render() {
      const host = document.createElement("div");
      host.className = "pf-modal";
      host.innerHTML = this.template();
      host.addEventListener("click", this.handleClick);
      host.addEventListener("input", this.handleInput);
      host.addEventListener("change", this.handleInput);
      document.body.append(host);
      const firstInput = host.querySelector("input, select, textarea, button");
      firstInput?.focus();
    }

    template() {
      const values = this.state.values;
      const disabled = !this.isComplete();

      return `
        <div class="pf-modal__overlay" data-modal-close></div>
        <section class="pf-modal__dialog" role="dialog" aria-modal="true" aria-labelledby="pf-modal-title">
          <button class="pf-modal__close" type="button" aria-label="Закрыть" data-modal-close>${iconCross()}</button>
          <div class="pf-modal__art" aria-hidden="true">
            <h2 id="pf-modal-title">Оставьте заявку на индивидуальный подбор деталей</h2>
          </div>
          <form class="pf-modal__form" action="${escapeAttr(this.state.endpoint)}" method="post">
            <input type="hidden" name="mode" value="vin-request">
            <div class="pf-modal__grid">
              ${this.selectTemplate("brand", "Марка", this.state.brandOptions, values.brand)}
              ${this.selectTemplate("model", "Модель", this.state.modelOptions, values.model)}
              ${this.inputTemplate("vin", "VIN", values.vin)}
              ${this.inputTemplate("plate", "Госномер", values.plate)}
              ${this.inputTemplate("name", "ФИО*", values.name, "text", true)}
              ${this.inputTemplate("phone", "Телефон*", values.phone, "tel", true)}
              ${this.inputTemplate("email", "Email", values.email, "email")}
              ${this.textareaTemplate("parts", "Интересующие запчасти*", values.parts)}
            </div>
            <label class="pf-agreement pf-agreement--modal">
              <input type="checkbox" name="agreement" value="1" ${values.agreement ? "checked" : ""} data-modal-field="agreement">
              <span>
                Я принимаю <a href="#">Пользовательское соглашение</a> и
                <a href="#">Политику обработки персональных данных</a>
              </span>
            </label>
            <button class="pf-submit pf-submit--with-icon pf-modal__submit" type="submit" ${disabled ? "disabled" : ""}>
              ${iconSent()}
              <span>Отправить запрос</span>
            </button>
          </form>
        </section>
      `;
    }

    selectTemplate(id, placeholder, options, value) {
      const selectedId = value?.id || "";
      const selectedOption =
        value && !options.some((option) => option.id === value.id)
          ? `<option value="${escapeAttr(value.id)}" selected>${escapeHtml(value.label)}</option>`
          : "";
      const items = options
        .map(
          (option) =>
            `<option value="${escapeAttr(option.id)}" ${option.id === selectedId ? "selected" : ""}>${escapeHtml(option.label)}</option>`,
        )
        .join("");

      return `
        <label class="pf-modal-field">
          <span class="visually-hidden">${escapeHtml(placeholder)}</span>
          <select name="${escapeAttr(id)}" data-modal-field="${escapeAttr(id)}">
            <option value="">${escapeHtml(placeholder)}</option>
            ${selectedOption}
            ${items}
          </select>
        </label>
      `;
    }

    inputTemplate(id, placeholder, value, type = "text", required = false) {
      return `
        <label class="pf-modal-field ${id === "vin" ? "pf-modal-field--wide" : ""}">
          <span class="visually-hidden">${escapeHtml(placeholder)}</span>
          <input type="${escapeAttr(type)}" name="${escapeAttr(id)}" value="${escapeAttr(value || "")}" placeholder="${escapeAttr(placeholder)}" ${required ? "required" : ""} data-modal-field="${escapeAttr(id)}">
        </label>
      `;
    }

    textareaTemplate(id, placeholder, value) {
      return `
        <label class="pf-modal-field pf-modal-field--textarea">
          <span class="visually-hidden">${escapeHtml(placeholder)}</span>
          <textarea name="${escapeAttr(id)}" placeholder="${escapeAttr(placeholder)}" required data-modal-field="${escapeAttr(id)}">${escapeHtml(value || "")}</textarea>
        </label>
      `;
    }

    handleClick(event) {
      if (event.target.closest("[data-modal-close]")) {
        event.preventDefault();
        this.close();
      }
    }

    handleInput(event) {
      const field = event.target.closest("[data-modal-field]");
      if (!field) return;
      const key = field.dataset.modalField;

      if (field.tagName === "SELECT") {
        const options =
          key === "brand" ? this.state.brandOptions : this.state.modelOptions;
        this.state.values[key] =
          options.find((option) => option.id === field.value) || null;
        if (key === "brand") {
          this.state.values.model = null;
          this.state.modelOptions = this.state.modelOptionsMap[field.value] || [];
        }
      } else {
        this.state.values[key] =
          field.type === "checkbox" ? field.checked : field.value;
      }

      const activeName = field.name;
      const host = document.querySelector(".pf-modal");
      host.innerHTML = this.template();
      const active = host.querySelector(`[name="${CSS.escape(activeName)}"]`);
      active?.focus();
    }

    handleKeydown(event) {
      if (event.key === "Escape") this.close();
    }

    isComplete() {
      const values = this.state.values;
      return Boolean(
        values.brand &&
          values.model &&
          values.name.trim() &&
          values.phone.trim() &&
          values.parts.trim() &&
          values.agreement,
      );
    }
  }

  function escapeHtml(value) {
    return String(value)
      .replaceAll("&", "&amp;")
      .replaceAll("<", "&lt;")
      .replaceAll(">", "&gt;")
      .replaceAll('"', "&quot;")
      .replaceAll("'", "&#039;");
  }

  function escapeAttr(value) {
    return escapeHtml(value);
  }

  function iconCross() {
    return `<svg class="pf-cross-icon" viewBox="0 0 16 16" aria-hidden="true"><path d="M13.333 3.64551L8.97852 8L13.333 12.3545L12.3545 13.333L8 8.97852L3.64551 13.333L2.66699 12.3545L7.02148 8L2.66699 3.64551L3.64551 2.66699L8 7.02148L12.3545 2.66699L13.333 3.64551Z"/></svg>`;
  }

  function iconSent() {
    return `<svg viewBox="0 0 16 16" aria-hidden="true"><path d="M14.4424 1.55762L12.4424 14.2246L11.418 14.5811L7.54199 10.7051L5.33301 12.333L4.52051 11.4961L5.98145 8.9502L1.41895 4.38672L1.77539 3.3623L14.4424 1.55762ZM6.77051 8.14941L11.3594 3.56152L3.32812 4.70703L6.77051 8.14941ZM11.293 12.6719L12.6094 4.33789L8.4834 8.46289L11.293 12.6719ZM7.30469 9.6416L7.4834 9.46289L8.42969 10.4092L7.2998 9.65723L7.30469 9.6416Z"/></svg>`;
  }

  window.PartsFinderRequestModal = new PartsFinderRequestModal();
})();
