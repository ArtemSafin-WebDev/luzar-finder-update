(function () {
  const STORAGE_KEY = "luzar.partsFinder.history";
  const ENDPOINT = "/api/parts-finder";
  const STEPS = ["brand", "model", "year", "engine", "modification"];
  const CONTROL_WIDTHS = {
    brand: "16rem",
    model: "14rem",
    year: "9rem",
    engine: "17rem",
    modification: "16rem",
    productGroups: "22.8rem",
  };

  const MOCK_DATA = {
    title: "Подберите детали для легковых и грузовых автомобилей",
    tabs: [
      {
        id: "vehicle",
        label: "Подобрать по авто",
        active: true,
        disabled: false,
      },
      {
        id: "vin",
        label: "Подобрать по VIN и госномеру",
        active: false,
        disabled: true,
      },
    ],
    fields: [
      {
        id: "brand",
        type: "single",
        label: "Марка",
        placeholder: "Марка",
        queryKey: "brand",
      },
      {
        id: "model",
        type: "single",
        label: "Модель",
        placeholder: "Модель",
        queryKey: "model",
      },
      {
        id: "year",
        type: "single",
        label: "Год",
        placeholder: "Год",
        queryKey: "year",
      },
      {
        id: "engine",
        type: "single",
        label: "Объем двигателя",
        placeholder: "Объем двигателя",
        queryKey: "engine",
      },
      {
        id: "modification",
        type: "single",
        label: "Модификация",
        placeholder: "Модификация",
        queryKey: "modification",
      },
      {
        id: "productGroups",
        type: "multi",
        label: "Группа товаров",
        placeholder: "Группа товаров",
        queryKey: "group",
      },
    ],
    vehicles: [
      {
        id: "volkswagen",
        label: "Volkswagen",
        models: [
          {
            id: "tiguan",
            label: "Tiguan",
            years: [
              {
                id: "2016",
                label: "2016",
                engines: [
                  {
                    id: "20-petrol",
                    label: "2.0 бензиновый",
                    modifications: [
                      { id: "tsi-14-20", label: "бензин TSI 1.4-2.0 л" },
                      { id: "tsi-20-180", label: "2.0 TSI 180 л.с." },
                    ],
                  },
                ],
              },
              {
                id: "2018",
                label: "2018",
                engines: [
                  {
                    id: "14-petrol",
                    label: "1.4 бензиновый",
                    modifications: [
                      { id: "tsi-14", label: "1.4 TSI 150 л.с." },
                    ],
                  },
                ],
              },
            ],
          },
          {
            id: "polo",
            label: "Polo",
            years: [
              {
                id: "2020",
                label: "2020",
                engines: [
                  {
                    id: "16-petrol",
                    label: "1.6 бензиновый",
                    modifications: [
                      { id: "mpi-16", label: "1.6 MPI 110 л.с." },
                    ],
                  },
                ],
              },
            ],
          },
        ],
      },
      {
        id: "lada",
        label: "Lada",
        models: [
          {
            id: "vesta",
            label: "Vesta",
            years: [
              {
                id: "2021",
                label: "2021",
                engines: [
                  {
                    id: "16-petrol",
                    label: "1.6 бензиновый",
                    modifications: [
                      { id: "vesta-16", label: "ВАЗ-21129 106 л.с." },
                    ],
                  },
                ],
              },
            ],
          },
        ],
      },
      {
        id: "haval",
        label: "Haval",
        models: [
          {
            id: "f7",
            label: "F7",
            years: [
              {
                id: "2022",
                label: "2022",
                engines: [
                  {
                    id: "15-turbo",
                    label: "1.5 бензиновый",
                    modifications: [{ id: "gw4b15", label: "GW4B15 150 л.с." }],
                  },
                ],
              },
            ],
          },
        ],
      },
      {
        id: "chery",
        label: "Chery",
        models: [
          {
            id: "tiggo-7",
            label: "Tiggo 7 Pro",
            years: [
              {
                id: "2023",
                label: "2023",
                engines: [
                  {
                    id: "15-turbo",
                    label: "1.5 бензиновый",
                    modifications: [
                      { id: "sqre4t15c", label: "SQRE4T15C 147 л.с." },
                    ],
                  },
                ],
              },
            ],
          },
        ],
      },
      {
        id: "bmw",
        label: "BMW",
        models: [
          {
            id: "5",
            label: "5",
            years: [
              {
                id: "2018",
                label: "2018",
                engines: [
                  {
                    id: "14-petrol",
                    label: "1.4 бензиновый",
                    modifications: [{ id: "e60", label: "E60 (03-)" }],
                  },
                ],
              },
            ],
          },
        ],
      },
      {
        id: "geely",
        label: "Geely",
        models: [{ id: "coolray", label: "Coolray", years: [] }],
      },
      {
        id: "kia",
        label: "Kia",
        models: [{ id: "rio", label: "Rio", years: [] }],
      },
      {
        id: "hyundai",
        label: "Hyundai",
        models: [{ id: "solaris", label: "Solaris", years: [] }],
      },
      {
        id: "skoda",
        label: "Skoda",
        models: [{ id: "octavia", label: "Octavia", years: [] }],
      },
      {
        id: "toyota",
        label: "Toyota",
        models: [{ id: "camry", label: "Camry", years: [] }],
      },
    ],
    productGroups: [
      { id: "radiators", label: "Радиаторы" },
      { id: "water-pumps", label: "Насосы водяные" },
      { id: "fans", label: "Вентиляторы" },
      { id: "thermostats", label: "Термостаты" },
      { id: "cooling-components", label: "Компоненты системы охлаждения" },
      { id: "ac-compressors", label: "Компрессоры кондиционера" },
      { id: "ac-components", label: "Компоненты системы кондиционирования" },
      { id: "engine-parts", label: "Детали двигателя" },
      { id: "air-compressors", label: "Компрессоры воздушные" },
      { id: "filters", label: "Фильтры" },
    ],
  };

  const HISTORY_SEED = [
    {
      id: "audi-a4-2015",
      brand: { id: "audi", label: "Audi" },
      model: { id: "a4-b8", label: "A4 B8 (08-)" },
      year: { id: "2015", label: "2015" },
      engine: { id: "20-petrol", label: "2.0 бензиновый" },
      modification: { id: "a4-tfsi", label: "A4 2.0 TFSI quattro 190 л.с." },
      vin: "1234567890ABCDEFG",
      plate: "",
    },
    {
      id: "bmw-5-2018",
      brand: { id: "bmw", label: "BMW" },
      model: { id: "5", label: "5" },
      year: { id: "2018", label: "2018" },
      engine: { id: "14-petrol", label: "1.4 бензиновый" },
      modification: { id: "e60", label: "E60 (03-)" },
      vin: "WDB1240821F323866",
      plate: "у888нд198",
    },
    {
      id: "mercedes-c-2024",
      brand: { id: "mercedes", label: "Mercedes-Benz" },
      model: { id: "c-w205", label: "C-Class W205 (14-)" },
      year: { id: "2024", label: "2024" },
      engine: { id: "15-petrol", label: "1.5 бензиновый" },
      modification: { id: "c180-amg", label: "C 180 AMG Line 156 л.с." },
      vin: "",
      plate: "",
    },
  ];

  class MockPartsFinderApi {
    constructor(data) {
      this.data = data;
    }

    async getState(params) {
      const url = new URL(ENDPOINT, window.location.origin);
      Object.entries(params.selected).forEach(([key, value]) => {
        if (!value) return;
        if (Array.isArray(value)) {
          value.forEach((item) => url.searchParams.append("group", item.id));
          return;
        }
        url.searchParams.set(key, value.id);
      });
      await wait(140);
      return this.buildResponse(params, url);
    }

    buildResponse(params, url) {
      const selected = normalizeSelected(params.selected);
      const options = this.getOptions(selected);
      const controls = this.data.fields.map((field) => {
        const previousComplete = this.isPreviousComplete(field.id, selected);
        const value =
          field.type === "multi" ? selected.productGroups : selected[field.id];
        const fieldOptions =
          field.id === "productGroups"
            ? this.data.productGroups
            : options[field.id];

        return {
          ...field,
          disabled: field.id === "brand" ? false : !previousComplete,
          value,
          options: fieldOptions,
          allSelected:
            field.id === "productGroups" &&
            value.length === this.data.productGroups.length,
        };
      });

      return {
        endpoint: url.pathname,
        request: {
          method: "GET",
          query: Object.fromEntries(url.searchParams.entries()),
          selected,
        },
        title: this.data.title,
        mode: "vehicle",
        tabs: this.data.tabs,
        controls,
        submit: {
          label: "Подобрать",
          disabled: !STEPS.every((key) => selected[key]),
        },
        history: {
          enabled: true,
          label: "Мои авто",
        },
      };
    }

    isPreviousComplete(fieldId, selected) {
      if (fieldId === "brand") return true;
      if (fieldId === "productGroups")
        return STEPS.every((key) => selected[key]);
      const index = STEPS.indexOf(fieldId);
      return STEPS.slice(0, index).every((key) => selected[key]);
    }

    getOptions(selected) {
      const brand = this.data.vehicles.find(
        (item) => item.id === selected.brand?.id,
      );
      const model = brand?.models.find(
        (item) => item.id === selected.model?.id,
      );
      const year = model?.years.find((item) => item.id === selected.year?.id);
      const engine = year?.engines.find(
        (item) => item.id === selected.engine?.id,
      );

      return {
        brand: this.data.vehicles.map(toOption),
        model: (brand?.models || []).map(toOption),
        year: (model?.years || []).map(toOption),
        engine: (year?.engines || []).map(toOption),
        modification: (engine?.modifications || []).map(toOption),
      };
    }
  }

  class PartsFinder {
    constructor(root, api) {
      this.root = root;
      this.api = api;
      this.response = null;
      this.search = {};
      this.openControl = null;
      this.historyOpen = false;
      this.expandedTags = false;
      this.toastTimer = null;
      this.selected = {
        brand: null,
        model: null,
        year: null,
        engine: null,
        modification: null,
        productGroups: [],
      };
      this.history = this.loadHistory();
      this.bindEvents();
    }

    async init() {
      await this.refresh();
    }

    bindEvents() {
      this.root.addEventListener("click", (event) => {
        if (event.target.matches("[data-search]")) return;
        const action = event.target.closest("[data-action]");
        if (!action) return;

        const actionName = action.dataset.action;
        const id = action.dataset.id;
        const value = action.dataset.value;

        event.stopPropagation();

        if (actionName === "toggle-control") this.toggleControl(id);
        if (actionName === "clear-control") this.clearControl(id);
        if (actionName === "select-option") this.selectOption(id, value);
        if (actionName === "toggle-option") this.toggleOption(value);
        if (actionName === "toggle-all") this.toggleAllGroups();
        if (actionName === "toggle-history") this.toggleHistory();
        if (actionName === "select-history") this.selectHistory(value);
        if (actionName === "delete-history") this.deleteHistory(value);
        if (actionName === "submit") this.submit();
        if (actionName === "more-tags") this.expandTags();
        if (actionName === "remove-tag") this.removeGroup(value);
        if (actionName === "reset-tags") this.resetGroups();

        event.preventDefault();
      });

      this.root.addEventListener("input", (event) => {
        if (!event.target.matches("[data-search]")) return;
        this.search[event.target.dataset.search] = event.target.value;
        this.render();
      });

      document.addEventListener("click", (event) => {
        if (this.root.contains(event.target)) return;
        if (!this.openControl && !this.historyOpen) return;
        this.openControl = null;
        this.historyOpen = false;
        this.render();
      });
    }

    async refresh() {
      this.response = await this.api.getState({ selected: this.selected });
      this.render();
    }

    render() {
      if (!this.response) return;
      this.root.innerHTML = this.template();
      const input = this.root.querySelector("[data-autofocus]");
      if (input) {
        input.focus();
        input.setSelectionRange(input.value.length, input.value.length);
      }
    }

    template() {
      return `
        <article class="parts-finder" aria-labelledby="parts-finder-title">
          <h1 id="parts-finder-title" class="parts-finder__title">${escapeHtml(this.response.title)}</h1>
          <div class="parts-finder__workspace">
            ${this.tabsTemplate()}
            ${this.inputGroupTemplate()}
            ${this.historyOpen ? this.historyTemplate() : ""}
            <div class="pf-toast" aria-live="polite" data-toast></div>
          </div>
        </article>
      `;
    }

    tabsTemplate() {
      const tabs = this.response.tabs
        .map(
          (tab) => `
        <button
          class="pf-tab"
          type="button"
          role="tab"
          aria-selected="${tab.id === "vehicle"}"
          ${tab.disabled ? "disabled" : ""}
        >${escapeHtml(tab.label)}</button>
      `,
        )
        .join("");

      return `
        <div class="pf-tabs" role="tablist" aria-label="Режим подбора">
          <div class="pf-tabs__group">${tabs}</div>
          <button class="pf-history-toggle ${this.historyOpen ? "is-open" : ""}" type="button" data-action="toggle-history">
            ${iconCar()}
            <span>${escapeHtml(this.response.history.label)}</span>
            <span class="pf-history-toggle__close">${iconHistoryClose()}</span>
          </button>
        </div>
      `;
    }

    inputGroupTemplate() {
      const controls = this.response.controls
        .map((control) => this.controlTemplate(control))
        .join("");
      return `
        <div class="pf-input-group">
          <div class="pf-controls">${controls}</div>
          <button class="pf-submit" type="button" data-action="submit" ${this.response.submit.disabled ? "disabled" : ""}>
            ${escapeHtml(this.response.submit.label)}
          </button>
        </div>
      `;
    }

    controlTemplate(control) {
      const isOpen = this.openControl === control.id;
      const hasValue =
        control.type === "multi"
          ? control.value.length > 0
          : Boolean(control.value);
      const classes = [
        "pf-control",
        control.type === "multi" ? "pf-control--groups" : "",
        isOpen ? "is-open" : "",
      ]
        .filter(Boolean)
        .join(" ");
      const style = `--pf-control-width:${CONTROL_WIDTHS[control.id] || "16rem"}`;

      return `
        <div class="${classes}" style="${style}" data-control="${control.id}">
          ${this.fieldTemplate(control, hasValue, isOpen)}
          ${isOpen && !control.disabled ? this.dropdownTemplate(control) : ""}
        </div>
      `;
    }

    fieldTemplate(control, hasValue, isOpen) {
      const selectedCount = control.type === "multi" ? control.value.length : 0;
      const allGroups = control.type === "multi" && control.allSelected;
      const label =
        control.type === "multi"
          ? control.placeholder
          : control.value?.label || control.placeholder;
      const searchValue = this.search[control.id] || "";
      const searchPlaceholder = "Начните ввод";
      const fieldBody = isOpen
        ? `<input class="pf-field__input" type="search" value="${escapeAttr(searchValue)}" placeholder="${escapeAttr(searchPlaceholder)}" data-search="${control.id}" data-autofocus>`
        : `<span class="pf-field__text">${escapeHtml(label)}</span>`;
      const countBadge =
        selectedCount > 0 && !isOpen
          ? `<span class="pf-count">${selectedCount}</span>`
          : "";
      const clearButton =
        hasValue && !isOpen
          ? `
        <button class="pf-clear" type="button" aria-label="Очистить ${escapeAttr(control.label)}" data-action="clear-control" data-id="${control.id}">
          ${iconCross()}
        </button>
      `
          : "";

      return `
        <div
          class="pf-field ${hasValue ? "has-value" : ""} ${allGroups ? "has-all-groups" : ""}"
          role="button"
          tabindex="${control.disabled ? "-1" : "0"}"
          aria-haspopup="listbox"
          aria-expanded="${isOpen}"
          aria-disabled="${control.disabled}"
          data-action="toggle-control"
          data-id="${control.id}"
        >
          ${fieldBody}
          ${countBadge}
          ${clearButton}
          ${iconArrow()}
        </div>
      `;
    }

    dropdownTemplate(control) {
      const query = (this.search[control.id] || "").trim().toLowerCase();
      const options = control.options.filter((option) =>
        option.label.toLowerCase().includes(query),
      );
      const className =
        control.type === "multi"
          ? "pf-dropdown pf-dropdown--groups"
          : "pf-dropdown";

      if (control.type === "multi") {
        return `
          <div class="${className}" role="listbox" aria-multiselectable="true">
            ${this.tagsTemplate(control)}
            <div class="pf-options">
              <button class="pf-option pf-option--all ${control.allSelected ? "is-selected" : ""}" type="button" data-action="toggle-all">
                <span class="pf-checkbox" aria-hidden="true">${iconCheck()}</span>
                <span class="pf-option__label">${control.allSelected ? "Отменить все" : "Выбрать все"}</span>
              </button>
              ${options.length ? options.map((option) => this.multiOptionTemplate(option, control.value)).join("") : emptyTemplate()}
            </div>
          </div>
        `;
      }

      return `
        <div class="${className}" role="listbox">
          <div class="pf-options">
            ${options.length ? options.map((option) => this.singleOptionTemplate(option, control)).join("") : emptyTemplate()}
          </div>
        </div>
      `;
    }

    tagsTemplate(control) {
      const groups = control.value;
      if (!groups.length || control.allSelected) return "";
      const visible = this.expandedTags ? groups : groups.slice(0, 3);
      const moreCount = groups.length - visible.length;
      const tags = visible
        .map(
          (tag) => `
        <span class="pf-tag">
          <span class="pf-tag__label">${escapeHtml(tag.label)}</span>
          <button class="pf-tag__remove" type="button" aria-label="Удалить ${escapeAttr(tag.label)}" data-action="remove-tag" data-value="${escapeAttr(tag.id)}">
            ${iconCross()}
          </button>
        </span>
      `,
        )
        .join("");
      const more =
        !this.expandedTags && moreCount > 0
          ? `<button class="pf-more-tags" type="button" data-action="more-tags"><span>Еще ${moreCount}</span>${iconArrow()}</button>`
          : "";
      const reset =
        this.expandedTags && groups.length > 1
          ? `<button class="pf-reset-tags" type="button" data-action="reset-tags">${iconReset()}<span>Сбросить</span></button>`
          : "";

      return `<div class="pf-tags">${tags}${more}${reset}</div>`;
    }

    multiOptionTemplate(option, value) {
      const selected = value.some((item) => item.id === option.id);
      return `
        <button class="pf-option ${selected ? "is-selected" : ""}" type="button" role="option" aria-selected="${selected}" data-action="toggle-option" data-value="${escapeAttr(option.id)}">
          <span class="pf-checkbox" aria-hidden="true">${iconCheck()}</span>
          <span class="pf-option__label">${escapeHtml(option.label)}</span>
        </button>
      `;
    }

    singleOptionTemplate(option, control) {
      const selected = control.value?.id === option.id;
      return `
        <button class="pf-option ${selected ? "is-selected" : ""}" type="button" role="option" aria-selected="${selected}" data-action="select-option" data-id="${control.id}" data-value="${escapeAttr(option.id)}">
          <span class="pf-option__label">${escapeHtml(option.label)}</span>
          ${selected ? `<span class="pf-option__check" aria-hidden="true">${iconCheck()}</span>` : ""}
        </button>
      `;
    }

    historyTemplate() {
      if (!this.history.length) {
        return `
          <div class="pf-history pf-history--empty">
            <div class="pf-history-empty" role="status">
              <div class="pf-history-empty__icon" aria-hidden="true">
                ${iconSleep()}
              </div>
              <div class="pf-history-empty__content">
                <h2 class="pf-history-empty__title">Здесь пусто</h2>
                <p class="pf-history-empty__text">
                  Данные о ваших авто сохранятся автоматически,<br>
                  после подбора запчастей
                </p>
              </div>
            </div>
          </div>
        `;
      }

      const rows = this.history
        .map(
          (item) => `
          <div class="pf-history__row">
            <span class="pf-history__cell">${escapeHtml(item.brand.label)}</span>
            <span class="pf-history__cell">${escapeHtml(item.model.label)}</span>
            <span class="pf-history__cell">${escapeHtml(item.year.label)}</span>
            <span class="pf-history__cell">${escapeHtml(item.engine.label)}</span>
            <span class="pf-history__cell">${escapeHtml(item.modification.label)}</span>
            <span class="pf-history__cell">${escapeHtml(item.vin || "")}</span>
            <span class="pf-history__cell">${escapeHtml(item.plate || "")}</span>
            <span class="pf-history__actions">
              <button class="pf-text-button" type="button" data-action="select-history" data-value="${escapeAttr(item.id)}">Выбрать</button>
              <button class="pf-icon-button" type="button" aria-label="Удалить авто" data-action="delete-history" data-value="${escapeAttr(item.id)}">${iconTrash()}</button>
            </span>
          </div>
        `,
        )
        .join("");

      return `
        <div class="pf-history">
          <div class="pf-history__scroller">
            <div class="pf-history__table">
              <div class="pf-history__row pf-history__row--head" aria-hidden="true">
                <span>Марка</span>
                <span>Модель</span>
                <span>Год</span>
                <span>Объем двигателя</span>
                <span>Модификация</span>
                <span>VIN</span>
                <span>Госномер</span>
                <span>Действия</span>
              </div>
              ${rows}
            </div>
          </div>
        </div>
      `;
    }

    toggleControl(id) {
      const control = this.response.controls.find((item) => item.id === id);
      if (!control || control.disabled) return;
      this.historyOpen = false;
      this.openControl = this.openControl === id ? null : id;
      this.search[id] = "";
      if (id !== "productGroups") this.expandedTags = false;
      this.render();
    }

    async selectOption(id, optionId) {
      const control = this.response.controls.find((item) => item.id === id);
      const option = control?.options.find((item) => item.id === optionId);
      if (!option) return;
      this.selected[id] = option;
      this.clearAfter(id);
      this.openControl = null;
      this.search[id] = "";
      await this.refresh();
    }

    async toggleOption(optionId) {
      const option = MOCK_DATA.productGroups.find(
        (item) => item.id === optionId,
      );
      if (!option) return;
      const selected = this.selected.productGroups;
      const exists = selected.some((item) => item.id === optionId);
      this.selected.productGroups = exists
        ? selected.filter((item) => item.id !== optionId)
        : [...selected, option];
      await this.refresh();
      this.openControl = "productGroups";
      this.render();
    }

    async toggleAllGroups() {
      const allSelected =
        this.selected.productGroups.length === MOCK_DATA.productGroups.length;
      this.selected.productGroups = allSelected
        ? []
        : [...MOCK_DATA.productGroups];
      this.openControl = null;
      this.expandedTags = false;
      await this.refresh();
    }

    async clearControl(id) {
      if (id === "productGroups") {
        this.selected.productGroups = [];
      } else {
        this.selected[id] = null;
        this.clearAfter(id);
      }
      this.openControl = null;
      await this.refresh();
    }

    clearAfter(id) {
      const index = STEPS.indexOf(id);
      if (index >= 0) {
        STEPS.slice(index + 1).forEach((key) => {
          this.selected[key] = null;
          this.search[key] = "";
        });
        this.selected.productGroups = [];
      }
    }

    toggleHistory() {
      this.historyOpen = !this.historyOpen;
      this.openControl = null;
      this.render();
    }

    async selectHistory(id) {
      const item = this.history.find((entry) => entry.id === id);
      if (!item) return;
      STEPS.forEach((key) => {
        this.selected[key] = item[key];
      });
      this.selected.productGroups = [];
      this.historyOpen = false;
      this.openControl = null;
      await this.refresh();
    }

    deleteHistory(id) {
      this.history = this.history.filter((item) => item.id !== id);
      this.saveHistory();
      this.render();
    }

    async submit() {
      if (this.response.submit.disabled) {
        const next = this.response.controls.find(
          (control) => control.disabled === false && !control.value,
        );
        if (next) this.openControl = next.id;
        this.render();
        return;
      }
      const item = {
        id: `vehicle-${Date.now()}`,
        brand: this.selected.brand,
        model: this.selected.model,
        year: this.selected.year,
        engine: this.selected.engine,
        modification: this.selected.modification,
        vin: "",
        plate: "",
      };
      this.history = [
        item,
        ...this.history.filter((entry) => !sameVehicle(entry, item)),
      ].slice(0, 8);
      this.saveHistory();
      this.showToast("Автомобиль добавлен в Мои авто");
    }

    expandTags() {
      this.expandedTags = true;
      this.openControl = "productGroups";
      this.render();
    }

    async removeGroup(id) {
      this.selected.productGroups = this.selected.productGroups.filter(
        (item) => item.id !== id,
      );
      this.openControl = "productGroups";
      await this.refresh();
    }

    async resetGroups() {
      this.selected.productGroups = [];
      this.expandedTags = false;
      this.openControl = "productGroups";
      await this.refresh();
    }

    showToast(message) {
      const toast = this.root.querySelector("[data-toast]");
      if (!toast) return;
      window.clearTimeout(this.toastTimer);
      toast.textContent = message;
      toast.classList.add("is-visible");
      this.toastTimer = window.setTimeout(() => {
        toast.classList.remove("is-visible");
      }, 2200);
    }

    loadHistory() {
      try {
        const saved = JSON.parse(window.localStorage.getItem(STORAGE_KEY));
        return Array.isArray(saved) ? saved : HISTORY_SEED;
      } catch (error) {
        return HISTORY_SEED;
      }
    }

    saveHistory() {
      window.localStorage.setItem(STORAGE_KEY, JSON.stringify(this.history));
    }
  }

  function normalizeSelected(selected) {
    return {
      brand: selected.brand || null,
      model: selected.model || null,
      year: selected.year || null,
      engine: selected.engine || null,
      modification: selected.modification || null,
      productGroups: Array.isArray(selected.productGroups)
        ? selected.productGroups
        : [],
    };
  }

  function toOption(item) {
    return { id: item.id, label: item.label };
  }

  function wait(ms) {
    return new Promise((resolve) => window.setTimeout(resolve, ms));
  }

  function sameVehicle(a, b) {
    return STEPS.every((key) => a[key]?.id === b[key]?.id);
  }

  function emptyTemplate() {
    return `<div class="pf-empty">Ничего не найдено</div>`;
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

  function iconArrow() {
    return `<svg class="pf-arrow" viewBox="0 0 16 16" aria-hidden="true"><path d="M13.8047 5.80469L8.47168 11.1377H7.52832L2.19531 5.80469L3.1377 4.8623L8 9.72363L12.8623 4.8623L13.8047 5.80469Z"/></svg>`;
  }

  function iconCar() {
    return `<svg class="pf-history-icon" viewBox="0 0 16 16" aria-hidden="true"><path d="M12 8C12.1111 8 12.2204 8.02454 12.3193 8.07031L12.415 8.12305L12.501 8.18848C12.5551 8.23575 12.6028 8.29012 12.6416 8.34961L12.6934 8.44238L13.3096 9.75L14.6777 9.95801C14.7876 9.9746 14.8917 10.0156 14.9824 10.0752L15.0693 10.1406L15.1445 10.2178C15.1909 10.2719 15.229 10.3326 15.2588 10.3965L15.2969 10.4951L15.3223 10.5977C15.3399 10.7015 15.3366 10.8091 15.3125 10.9121C15.2803 11.0493 15.2109 11.1771 15.1104 11.2803L15.1094 11.2812L14.1055 12.3057L14.3428 13.7568L14.3525 13.8613C14.3557 13.9665 14.3391 14.0727 14.3008 14.1719C14.2495 14.3042 14.1618 14.4226 14.0459 14.5107C13.9298 14.599 13.7898 14.6541 13.6416 14.665C13.4941 14.6758 13.3476 14.6419 13.2197 14.5713L12 13.9004L10.7812 14.5723H10.7803C10.6522 14.6422 10.5056 14.6743 10.3584 14.6631C10.2113 14.6518 10.0715 14.5982 9.95605 14.5107C9.84091 14.4234 9.75392 14.3059 9.70215 14.1748C9.65051 14.0438 9.63508 13.9011 9.65625 13.7627L9.65723 13.7578L9.89453 12.3057L8.89258 11.2822C8.79102 11.1791 8.72012 11.0509 8.6875 10.9131C8.65497 10.7754 8.66015 10.6304 8.70215 10.4951L8.74121 10.3965C8.7862 10.3 8.85068 10.2116 8.93262 10.1396L9.01953 10.0742C9.08024 10.0346 9.14668 10.0035 9.2168 9.98242L9.3252 9.95801L10.6904 9.75L11.3066 8.44336L11.3076 8.44238C11.3684 8.31413 11.4639 8.2025 11.5859 8.12305L11.6816 8.07031C11.7804 8.02461 11.8891 8.00009 12 8ZM11.4902 10.4248C11.4185 10.5768 11.2746 10.6837 11.1084 10.709L9.9209 10.8887L10.7959 11.7812C10.9083 11.8961 10.9595 12.0582 10.9336 12.2168L10.7314 13.4453L11.7568 12.8818C11.9083 12.7985 12.0926 12.7986 12.2441 12.8818L13.2676 13.4453L13.0674 12.2168C13.0415 12.0583 13.0928 11.896 13.2051 11.7812L14.0791 10.8887L12.8916 10.709C12.7256 10.6835 12.5824 10.5767 12.5107 10.4248L12 9.3418L11.4902 10.4248ZM10.9463 1.33301C11.4247 1.33307 11.8671 1.58956 12.1045 2.00488L14.4912 6.18262C14.6062 6.38398 14.667 6.61187 14.667 6.84375V7.33301C14.667 7.7012 14.3682 8 14 8C13.6318 8 13.333 7.7012 13.333 7.33301V6.84375L10.9463 2.66699H5.05371L2.66699 6.84375V9.84277L3.41211 11.333H4.66699V10.667C4.66699 10.2989 4.96497 10.0002 5.33301 10H7.33301C7.7012 10 8 10.2988 8 10.667C7.99982 11.035 7.70109 11.333 7.33301 11.333H6C6 12.0693 5.40322 12.6668 4.66699 12.667H3.41211C2.90714 12.667 2.44561 12.3813 2.21973 11.9297L1.47363 10.4385C1.38128 10.2536 1.33306 10.0495 1.33301 9.84277V6.84375C1.33301 6.61187 1.39382 6.38398 1.50879 6.18262L3.89551 2.00488C4.13289 1.58956 4.57534 1.33307 5.05371 1.33301H10.9463ZM10.8623 6.19531C11.1227 5.93513 11.5444 5.93502 11.8047 6.19531C12.065 6.45561 12.0649 6.87733 11.8047 7.1377C11.5639 7.37849 11.1197 7.58259 10.5498 7.72949C9.94637 7.88498 9.11099 8 8 8C6.88901 8 6.05363 7.88498 5.4502 7.72949C4.95152 7.60095 4.54903 7.42876 4.29492 7.22656L4.19531 7.1377L4.14941 7.08691C3.93615 6.82507 3.95135 6.43928 4.19531 6.19531C4.43928 5.95135 4.82507 5.93615 5.08691 6.14941L5.1377 6.19531L5.15918 6.20703C5.21895 6.24194 5.40236 6.33934 5.7832 6.4375C6.25752 6.55974 6.97789 6.66699 8 6.66699C9.02211 6.66699 9.74248 6.55974 10.2168 6.4375C10.723 6.30702 10.8798 6.17764 10.8623 6.19531Z"/></svg>`;
  }

  function iconHistoryClose() {
    return `<svg class="pf-history-close-icon" viewBox="0 0 16 16" aria-hidden="true"><path d="M13.333 3.64551L8.97852 8L13.333 12.3545L12.3545 13.333L8 8.97852L3.64551 13.333L2.66699 12.3545L7.02148 8L2.66699 3.64551L3.64551 2.66699L8 7.02148L12.3545 2.66699L13.333 3.64551Z"/></svg>`;
  }

  function iconSleep() {
    return `<svg class="pf-sleep-icon" viewBox="0 0 48 48" aria-hidden="true">
      <path d="M33.4141 33.4141L28.8281 38H34V42H24L22.5859 38.5859L27.1719 34H22V30H32L33.4141 33.4141ZM19.4141 19.4141L12.8281 26H20V30H8L6.58594 26.5859L13.1719 20H6V16H18L19.4141 19.4141ZM41.4141 9.41406L30.8281 20H42V24H26L24.5859 20.5859L35.1719 10H24V6H40L41.4141 9.41406Z"/>
    </svg>`;
  }

  function iconTrash() {
    return `<svg width="16" height="16" viewBox="0 0 16 16">
      <path d="M13.333 3.33301C13.5097 3.33301 13.6797 3.4034 13.8047 3.52832C13.9297 3.65334 14 3.82319 14 4C14 4.17681 13.9297 4.34666 13.8047 4.47168C13.6797 4.5966 13.5097 4.66699 13.333 4.66699H12.667L12.665 4.71387L12.043 13.4277C12.019 13.7641 11.8678 14.0788 11.6211 14.3086C11.3744 14.5384 11.0501 14.6669 10.7129 14.667H5.28711C4.94987 14.667 4.62472 14.5384 4.37793 14.3086C4.13127 14.0788 3.98097 13.764 3.95703 13.4277L3.33496 4.71484C3.33396 4.69897 3.33289 4.68289 3.33301 4.66699H2.66699C2.49026 4.66699 2.32032 4.5966 2.19531 4.47168C2.07029 4.34666 2 4.17681 2 4C2 3.82319 2.07029 3.65334 2.19531 3.52832C2.32032 3.4034 2.49026 3.33301 2.66699 3.33301H13.333ZM5.28711 13.333H10.7129L11.3311 4.66699H4.66895L5.28711 13.333ZM9.33301 1.33301C9.50974 1.33301 9.67968 1.4034 9.80469 1.52832C9.92971 1.65334 10 1.82319 10 2C10 2.17681 9.92971 2.34666 9.80469 2.47168C9.67968 2.5966 9.50974 2.66699 9.33301 2.66699H6.66699C6.49026 2.66699 6.32032 2.5966 6.19531 2.47168C6.07029 2.34666 6 2.17681 6 2C6 1.82319 6.07029 1.65334 6.19531 1.52832C6.32032 1.4034 6.49026 1.33301 6.66699 1.33301H9.33301Z"/>
    </svg>`;
  }

  function iconReset() {
    return `<svg class="pf-reset-icon" viewBox="0 0 16 16" aria-hidden="true"><path d="M6.27441 1.56098C7.6919 1.18121 9.19598 1.2787 10.5518 1.84027C11.3452 2.16897 12.0617 2.64706 12.667 3.24066V1.66645H14L13.999 5.00043L13.333 5.66645H10V4.33344H11.8711C11.3592 3.793 10.7373 3.36113 10.041 3.0727C8.95656 2.62354 7.75394 2.54442 6.62012 2.84809C5.48612 3.15194 4.48326 3.82198 3.76855 4.75336C3.05393 5.68474 2.66701 6.82648 2.66699 8.00043C2.66706 9.17419 3.05411 10.3152 3.76855 11.2465C4.48326 12.1779 5.4861 12.8479 6.62012 13.1518C7.75402 13.4555 8.95649 13.3764 10.041 12.9272C11.1256 12.4779 12.0312 11.6831 12.6182 10.6664L13.7734 11.3334C13.0397 12.6043 11.9074 13.598 10.5518 14.1596C9.19596 14.7212 7.69192 14.8197 6.27441 14.4399C4.85708 14.0601 3.60427 13.2231 2.71094 12.059C1.81763 10.8948 1.33308 9.46786 1.33301 8.00043C1.33303 6.53298 1.81766 5.10607 2.71094 3.94184C3.60424 2.77773 4.85708 1.94084 6.27441 1.56098Z"/></svg>`;
  }

  function iconCheck() {
    return `<svg viewBox="0 0 16 16" aria-hidden="true"><path d="M14.4717 4.27637L6.47168 12.2764H5.52832L1.52832 8.27637L2.47168 7.33301L6 10.8623L13.5283 3.33301L14.4717 4.27637Z"/></svg>`;
  }

  const root = document.getElementById("parts-finder");
  if (root) {
    new PartsFinder(root, new MockPartsFinderApi(MOCK_DATA)).init();
  }
})();
