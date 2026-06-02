(function () {
  const root = document.querySelector("[data-catalog-results]");

  if (!root) return;

  const icons = {
    close:
      '<svg viewBox="0 0 16 16" aria-hidden="true"><path d="M4.4714 3.52856L8 7.05716L11.5286 3.52856L12.4714 4.47136L8.9428 7.99996L12.4714 11.5286L11.5286 12.4714L8 8.94276L4.4714 12.4714L3.5286 11.5286L7.0572 7.99996L3.5286 4.47136L4.4714 3.52856Z"/></svg>',
    arrowLeft:
      '<svg viewBox="0 0 24 24" aria-hidden="true"><path d="M9.59473 18.4785C9.32957 18.4785 9.07522 18.373 8.8877 18.1855L3.23047 12.5283C3.04309 12.3408 2.9375 12.0864 2.9375 11.8213C2.93755 11.5562 3.04302 11.3017 3.23047 11.1143L8.8877 5.45703C9.0752 5.26968 9.32965 5.16504 9.59473 5.16504C9.85981 5.16505 10.1143 5.26966 10.3018 5.45703C10.4893 5.64457 10.5947 5.89982 10.5947 6.16504C10.5946 6.4301 10.4892 6.68464 10.3018 6.87207L6.35156 10.8213L20.4229 10.8213C20.6849 10.8258 20.9354 10.9332 21.1191 11.1201C21.3029 11.3071 21.4062 11.5591 21.4063 11.8213C21.4063 12.0835 21.3029 12.3354 21.1191 12.5225C20.9354 12.7094 20.685 12.8167 20.4229 12.8213L6.35156 12.8213L10.3018 16.7715C10.4892 16.959 10.5947 17.2134 10.5947 17.4785C10.5947 17.7437 10.4892 17.9981 10.3018 18.1855C10.1142 18.373 9.85989 18.4785 9.59473 18.4785Z"/></svg>',
    check:
      '<svg viewBox="0 0 16 16" aria-hidden="true"><path d="M12.4714 4.19531L13.4142 5.13811L6.94281 11.6095H6.00001L2.58582 8.19531L3.52862 7.25251L6.47141 10.1953L12.4714 4.19531Z"/></svg>',
    filter:
      '<svg viewBox="0 0 16 16" aria-hidden="true"><path d="M10.667 10C11.5375 10.0001 12.279 10.5565 12.5537 11.333H13.333C13.5097 11.333 13.6797 11.4034 13.8047 11.5283C13.9297 11.6533 14 11.8232 14 12C14 12.1768 13.9297 12.3467 13.8047 12.4717C13.6797 12.5966 13.5097 12.667 13.333 12.667H12.5537C12.416 13.0572 12.16 13.3947 11.8223 13.6338C11.4844 13.8728 11.0808 14.0019 10.667 14.002C10.2531 14.002 9.84865 13.8729 9.51074 13.6338C9.17313 13.3948 8.91799 13.057 8.78027 12.667H2.66699C2.49026 12.667 2.32032 12.5966 2.19531 12.4717C2.07029 12.3467 2 12.1768 2 12C2 11.8232 2.07029 11.6533 2.19531 11.5283C2.32032 11.4034 2.49026 11.333 2.66699 11.333H8.78027C8.91831 10.9431 9.17394 10.6059 9.51172 10.3672C9.8496 10.1284 10.2533 9.99988 10.667 10ZM10.667 11.333C10.4903 11.333 10.3203 11.4034 10.1953 11.5283C10.0703 11.6533 10 11.8232 10 12C10 12.1768 10.0703 12.3467 10.1953 12.4717C10.3203 12.5966 10.4903 12.667 10.667 12.667C10.8435 12.6669 11.0128 12.5964 11.1377 12.4717C11.2627 12.3467 11.333 12.1768 11.333 12C11.333 11.8232 11.2627 11.6533 11.1377 11.5283C11.0128 11.4036 10.8435 11.3331 10.667 11.333ZM5.33301 6C5.72566 5.99995 6.11006 6.11533 6.4375 6.33203C6.76494 6.54874 7.02141 6.85729 7.1748 7.21875L7.21973 7.33301H13.333C13.5029 7.3332 13.6665 7.39898 13.79 7.51563C13.9135 7.63226 13.9881 7.79135 13.998 7.96094C14.008 8.13054 13.9528 8.29744 13.8438 8.42773C13.7347 8.55804 13.5799 8.64204 13.4111 8.66211L13.333 8.66699H7.21973C7.0853 9.04703 6.83919 9.37746 6.51367 9.61523C6.18812 9.85303 5.79847 9.98755 5.39551 10C4.99245 10.0124 4.59451 9.90196 4.25488 9.68457C3.91541 9.46718 3.64965 9.15234 3.49219 8.78125L3.44629 8.66699H2.66699C2.49707 8.6668 2.33352 8.60102 2.20996 8.48438C2.08646 8.36774 2.01191 8.20865 2.00195 8.03906C1.992 7.86946 2.04722 7.70256 2.15625 7.57227C2.26531 7.44196 2.42014 7.35796 2.58887 7.33789L2.66699 7.33301H3.44629C3.58425 6.94319 3.8401 6.60592 4.17773 6.36719C4.51553 6.12846 4.91938 5.99995 5.33301 6ZM5.33301 7.33301C5.15647 7.33309 4.98722 7.40358 4.8623 7.52832C4.73728 7.65334 4.66699 7.82319 4.66699 8C4.66699 8.17681 4.73728 8.34666 4.8623 8.47168C4.98722 8.59642 5.15647 8.66691 5.33301 8.66699C5.50974 8.66699 5.67968 8.5966 5.80469 8.47168C5.92971 8.34666 6 8.17681 6 8C6 7.82319 5.92971 7.65334 5.80469 7.52832C5.67968 7.4034 5.50974 7.33301 5.33301 7.33301ZM10.667 2C11.5375 2.00014 12.279 2.55653 12.5537 3.33301H13.333C13.5097 3.33301 13.6797 3.4034 13.8047 3.52832C13.9297 3.65334 14 3.82319 14 4C14 4.17681 13.9297 4.34666 13.8047 4.47168C13.6797 4.5966 13.5097 4.66699 13.333 4.66699H12.5537C12.416 5.05721 12.16 5.39473 11.8223 5.63379C11.4844 5.87282 11.0808 6.00189 10.667 6.00195C10.2531 6.00195 9.84865 5.87289 9.51074 5.63379C9.17313 5.39479 8.91799 5.05704 8.78027 4.66699H2.66699C2.49026 4.66699 2.32032 4.5966 2.19531 4.47168C2.07029 4.34666 2 4.17681 2 4C2 3.82319 2.07029 3.65334 2.19531 3.52832C2.32032 3.4034 2.49026 3.33301 2.66699 3.33301H8.78027C8.91831 2.94312 9.17394 2.6059 9.51172 2.36719C9.8496 2.12841 10.2533 1.99988 10.667 2ZM10.667 3.33301C10.4903 3.33301 10.3203 3.4034 10.1953 3.52832C10.0703 3.65334 10 3.82319 10 4C10 4.17681 10.0703 4.34666 10.1953 4.47168C10.3203 4.5966 10.4903 4.66699 10.667 4.66699C10.8435 4.66691 11.0128 4.59642 11.1377 4.47168C11.2627 4.34666 11.333 4.17681 11.333 4C11.333 3.82319 11.2627 3.65334 11.1377 3.52832C11.0128 3.40358 10.8435 3.33309 10.667 3.33301Z"/></svg>',
    search:
      '<svg viewBox="0 0 16 16" aria-hidden="true"><path d="M7.33325 1.33337C10.647 1.33337 13.3333 4.01967 13.3333 7.33337C13.3333 8.75002 12.8408 10.0511 12.0198 11.0775L15.1379 14.1957L14.1956 15.1381L11.0774 12.0199C10.051 12.8409 8.7499 13.3334 7.33325 13.3334C4.01954 13.3334 1.33325 10.6471 1.33325 7.33337C1.33325 4.01967 4.01954 1.33337 7.33325 1.33337ZM7.33325 2.66638C4.75592 2.66638 2.66626 4.75605 2.66626 7.33337C2.66626 9.9107 4.75592 12.0004 7.33325 12.0004C9.91058 12.0004 12.0002 9.9107 12.0002 7.33337C12.0002 4.75605 9.91058 2.66638 7.33325 2.66638Z"/></svg>',
    reset:
      '<svg viewBox="0 0 16 16" aria-hidden="true"><path d="M6.27344 1.56049C7.69092 1.18072 9.195 1.27821 10.5508 1.83979C11.3442 2.16848 12.0607 2.64657 12.666 3.24018V1.66596H13.999L13.998 4.99994L13.332 5.66596H9.99902V4.33295H11.8701C11.3582 3.79251 10.7363 3.36064 10.04 3.07221C8.95558 2.62305 7.75296 2.54393 6.61914 2.8476C5.48514 3.15145 4.48229 3.8215 3.76758 4.75287C3.05295 5.68426 2.66604 6.82599 2.66602 7.99994C2.66608 9.1737 3.05313 10.3148 3.76758 11.246C4.48229 12.1774 5.48513 12.8474 6.61914 13.1513C7.75305 13.455 8.95551 13.3759 10.04 12.9267C11.1246 12.4774 12.0302 11.6826 12.6172 10.666L13.7725 11.3329C13.0387 12.6038 11.9065 13.5975 10.5508 14.1591C9.19499 14.7207 7.69094 14.8192 6.27344 14.4394C4.8561 14.0596 3.60329 13.2226 2.70996 12.0585C1.81666 10.8943 1.3321 9.46737 1.33203 7.99994C1.33205 6.53249 1.81668 5.10558 2.70996 3.94135C3.60327 2.77724 4.8561 1.94035 6.27344 1.56049Z" /></svg>',
  };

  const mobileSortQuery = "(max-width: 699.98px)";
  const sortAnimationDuration = 260;

  const state = {
    selected: {},
    discount: false,
    expanded: {},
    filterSearch: {},
    filterHidden: {},
    price: { min: 459, max: 9999999, currentMin: 459, currentMax: 9999999 },
    sort: "popular",
    sortDraft: "popular",
    sortOpen: false,
    filterOpen: false,
    mobileDetailFilter: "",
    query: "",
    draggingPrice: "",
  };

  let sortCloseTimer = 0;
  const gallerySwipeThreshold = 34;
  const gallerySwipeIntentThreshold = 8;
  const gallerySwipe = {
    gallery: null,
    pointerId: null,
    startX: 0,
    startY: 0,
    startIndex: 0,
    isHorizontal: false,
  };

  function escapeHtml(value) {
    return String(value)
      .replace(/&/g, "&amp;")
      .replace(/</g, "&lt;")
      .replace(/>/g, "&gt;")
      .replace(/"/g, "&quot;")
      .replace(/'/g, "&#039;");
  }

  function formatPriceInput(value) {
    return new Intl.NumberFormat("ru-RU").format(value);
  }

  function parsePriceInput(value) {
    const digits = String(value).replace(/\D/g, "");
    return digits ? Number(digits) : state.price.min;
  }

  function getFilterElements() {
    return Array.from(root.querySelectorAll("[data-filter]"));
  }

  function getFilterElement(filterId) {
    return getFilterElements().find((filter) => filter.getAttribute("data-filter") === filterId);
  }

  function getFilterInputs(filterId) {
    return Array.from(root.querySelectorAll("[data-filter-input]")).filter(
      (input) => input.getAttribute("data-filter-input") === filterId,
    );
  }

  function getFilterOptionLabel(filterId, value) {
    const input = getFilterInputs(filterId).find((item) => item.value === value);
    const option = input?.closest(".catalog-option, .catalog-chip");

    return (
      option?.querySelector(".catalog-option__label")?.textContent ||
      option?.textContent ||
      ""
    ).trim();
  }

  function getSortLabel() {
    return (
      Array.from(root.querySelectorAll("[data-sort-value]"))
        .find((option) => option.getAttribute("data-sort-value") === state.sort)
        ?.textContent.trim() || ""
    );
  }

  function isMobileSortModal() {
    return window.matchMedia(mobileSortQuery).matches;
  }

  function isMobileFilters() {
    return window.matchMedia(mobileSortQuery).matches;
  }

  function hasActiveFilters() {
    const hasSelected = Object.values(state.selected).some((value) =>
      value instanceof Set ? value.size > 0 : Boolean(value),
    );

    return hasSelected || state.discount || hasActivePriceFilter();
  }

  function hasActivePriceFilter() {
    return (
      state.price.currentMin !== state.price.min ||
      state.price.currentMax !== state.price.max
    );
  }

  function getActiveFilterTags() {
    const tags = [];

    Object.entries(state.selected).forEach(([filterId, selected]) => {
      if (selected instanceof Set) {
        selected.forEach((value) => {
          tags.push({ filter: filterId, value, label: getFilterOptionLabel(filterId, value) });
        });
        return;
      }

      if (selected) {
        tags.push({ filter: filterId, value: selected, label: getFilterOptionLabel(filterId, selected) });
      }
    });

    if (state.discount) {
      tags.push({ filter: "discount", value: "discount", label: "Товары со скидкой" });
    }

    if (hasActivePriceFilter()) {
      tags.push({
        filter: "price",
        value: "price",
        label: `Цена: ${formatPriceInput(state.price.currentMin)} - ${formatPriceInput(state.price.currentMax)} ₽`,
      });
    }

    return tags.filter((tag) => tag.label);
  }

  function syncFilterBadge(count = getActiveFilterTags().length) {
    const counter = root.querySelector("[data-filter-count]");
    const filterToggle = root.querySelector("[data-filter-toggle]");

    if (counter) {
      counter.textContent = String(count);
      counter.hidden = count === 0;
    }

    filterToggle?.classList.toggle("has-active-filters", count > 0);
  }

  function syncCatalogSearch(search = root.querySelector("[data-catalog-search]")) {
    if (!search) return;

    const input = search.querySelector("[name='q']");
    const clear = search.querySelector("[data-catalog-search-clear]");
    const hasValue = Boolean(input?.value);

    search.classList.toggle("is-filled", hasValue);
    if (clear) clear.hidden = !hasValue;
  }

  function syncSortModalState() {
    document.body.classList.toggle(
      "catalog-sort-modal-open",
      state.sortOpen && isMobileSortModal(),
    );
  }

  function syncFilterModalState() {
    const catalog = root.querySelector(".catalog-results");
    const filterToggle = root.querySelector("[data-filter-toggle]");
    const open = state.filterOpen && isMobileFilters();

    catalog?.classList.toggle("is-filter-open", open);
    document.body.classList.toggle("catalog-filter-modal-open", open);
    filterToggle?.setAttribute("aria-expanded", String(open));

    if (!open) {
      state.mobileDetailFilter = "";
    }

    syncMobileFilterDetail();
  }

  function syncSortDraftOptions() {
    root.querySelectorAll("[data-sort-value]").forEach((button) => {
      const active = button.getAttribute("data-sort-value") === state.sortDraft;

      button.classList.toggle("is-active", active);
      button.setAttribute("aria-selected", String(active));
    });
  }

  function syncSortButton() {
    const sortToggle = root.querySelector("[data-sort-toggle]");
    const label = sortToggle?.querySelector("span");

    if (label) label.textContent = getSortLabel();
    sortToggle?.setAttribute("aria-expanded", String(state.sortOpen));
  }

  function syncSortState() {
    const sort = root.querySelector("[data-sort]");

    sort?.classList.toggle("is-open", state.sortOpen);
    sort?.classList.remove("is-closing");
    syncSortButton();
    syncSortDraftOptions();
    syncSortModalState();
  }

  function ensureMobileFilterControls() {
    const heading = root.querySelector(".catalog-results__heading");
    const search = root.querySelector(".catalog-search");
    const sort = root.querySelector("[data-sort]");
    const sidebar = root.querySelector(".catalog-sidebar");

    if (!heading || !sidebar) return;

    if (!root.querySelector("[data-filter-toggle]")) {
      const button = document.createElement("button");
      button.className = "catalog-mobile-filter-toggle";
      button.type = "button";
      button.setAttribute("aria-label", "Открыть фильтры");
      button.setAttribute("aria-controls", "catalog-mobile-filters");
      button.setAttribute("aria-expanded", "false");
      button.setAttribute("data-filter-toggle", "");
      button.innerHTML = `${icons.filter}<span class="catalog-mobile-filter-toggle__count" data-filter-count hidden>0</span>`;

      if (sort) {
        sort.before(button);
      } else if (search) {
        search.after(button);
      } else {
        heading.append(button);
      }
    }

    if (!root.querySelector("[data-filter-backdrop]")) {
      const backdrop = document.createElement("button");
      backdrop.className = "catalog-filter-backdrop";
      backdrop.type = "button";
      backdrop.setAttribute("aria-label", "Закрыть фильтры");
      backdrop.setAttribute("data-filter-close", "");
      backdrop.setAttribute("data-filter-backdrop", "");
      sidebar.before(backdrop);
    }

    sidebar.id = sidebar.id || "catalog-mobile-filters";

    if (!sidebar.querySelector("[data-filter-mobile-header]")) {
      const header = document.createElement("div");
      header.className = "catalog-sidebar__mobile-header";
      header.setAttribute("data-filter-mobile-header", "");
      header.innerHTML = `
        <button class="catalog-sidebar__mobile-close" type="button" aria-label="Закрыть фильтры" data-filter-close>${icons.arrowLeft}</button>
        <h3 class="catalog-sidebar__mobile-title">Фильтры</h3>
        <button class="catalog-sidebar__mobile-reset" type="button" data-reset-filters hidden>Сбросить</button>
      `;
      sidebar.prepend(header);
    }

    if (!sidebar.querySelector("[data-filter-detail]")) {
      const detail = document.createElement("div");
      detail.className = "catalog-filter-detail";
      detail.setAttribute("data-filter-detail", "");
      detail.hidden = true;
      detail.innerHTML = `
        <div class="catalog-filter-detail__header">
          <button class="catalog-filter-detail__back" type="button" aria-label="Вернуться к фильтрам" data-filter-detail-close>${icons.arrowLeft}</button>
          <h3 class="catalog-filter-detail__title" data-filter-detail-title></h3>
        </div>
        <label class="catalog-filter-detail__search">
          <span class="visually-hidden" data-filter-detail-search-label>Поиск по фильтру</span>
          <input class="catalog-filter-detail__search-input" type="search" placeholder="Начните ввод" autocomplete="off" data-filter-detail-search>
          <span class="catalog-filter-detail__search-button" aria-hidden="true">${icons.search}</span>
        </label>
        <div class="catalog-filter-detail__tags" data-filter-detail-tags></div>
        <div class="catalog-filter-detail__list" data-filter-detail-list></div>
      `;
      sidebar.append(detail);
    }

    if (!sidebar.querySelector("[data-filter-mobile-actions]")) {
      const actions = document.createElement("div");
      actions.className = "catalog-sidebar__mobile-actions";
      actions.setAttribute("data-filter-mobile-actions", "");
      actions.innerHTML = '<button class="catalog-sidebar__mobile-apply" type="button" data-filter-apply>Сохранить</button>';
      sidebar.append(actions);
    }
  }

  function getFilterTitle(filterId) {
    return (
      getFilterElement(filterId)?.querySelector(".catalog-filter__title")?.textContent.trim() ||
      "Фильтр"
    );
  }

  function getMobileDetailTitle(filterId) {
    return filterId === "groups" ? "Группа товаров" : getFilterTitle(filterId);
  }

  function isFilterMulti(filterId) {
    return getFilterInputs(filterId)[0]?.type === "checkbox";
  }

  function isFilterValueSelected(filterId, value) {
    const selected = state.selected[filterId];

    return selected instanceof Set ? selected.has(value) : selected === value;
  }

  function getSelectedFilterValues(filterId) {
    const selected = state.selected[filterId];

    if (selected instanceof Set) return Array.from(selected);
    return selected ? [selected] : [];
  }

  function getFilterOptionData(filterId) {
    const query = (state.filterSearch[filterId] || "").trim().toLowerCase();

    return getFilterInputs(filterId)
      .map((input) => {
        const option = input.closest(".catalog-option, .catalog-chip");
        const label = (
          option?.querySelector(".catalog-option__label")?.textContent ||
          option?.textContent ||
          ""
        ).trim();

        return {
          input,
          label,
          value: input.value,
          selected: isFilterValueSelected(filterId, input.value),
          visible: !query || label.toLowerCase().includes(query),
        };
      })
      .filter((option) => option.label && option.visible);
  }

  function getMobileDetailTagsHtml(filterId) {
    return getSelectedFilterValues(filterId)
      .map((value) => {
        const label = getFilterOptionLabel(filterId, value);

        if (!label) return "";

        return `
          <button class="catalog-filter-detail__tag" type="button" data-filter-detail-clear="${filterId}" data-filter-detail-value="${escapeHtml(value)}">
            <span>${escapeHtml(label)}</span>${icons.close}
          </button>
        `;
      })
      .join("");
  }

  function getMobileDetailOptionsHtml(filterId) {
    const options = getFilterOptionData(filterId);

    return `
      <div class="catalog-filter-detail__group-title">Популярные</div>
      ${options
        .map(
          (option) => `
            <button class="catalog-filter-detail__row ${option.selected ? "is-active" : ""}" type="button" data-filter-detail-option="${filterId}" data-filter-detail-value="${escapeHtml(option.value)}" aria-pressed="${option.selected}">
              <span>${escapeHtml(option.label)}</span>
              ${option.selected ? icons.check : ""}
            </button>
          `,
        )
        .join("")}
    `;
  }

  function syncMobileFilterDetail() {
    const sidebar = root.querySelector(".catalog-sidebar");
    const detail = root.querySelector("[data-filter-detail]");
    const filterId = state.mobileDetailFilter;
    const active = Boolean(state.filterOpen && isMobileFilters() && filterId && getFilterElement(filterId));

    sidebar?.classList.toggle("is-detail-open", active);
    if (!detail) return;

    detail.hidden = !active;
    if (!active) return;

    const title = getMobileDetailTitle(filterId);
    const titleElement = detail.querySelector("[data-filter-detail-title]");
    const searchLabel = detail.querySelector("[data-filter-detail-search-label]");
    const searchInput = detail.querySelector("[data-filter-detail-search]");
    const tags = detail.querySelector("[data-filter-detail-tags]");
    const list = detail.querySelector("[data-filter-detail-list]");

    if (titleElement) titleElement.textContent = title;
    if (searchLabel) searchLabel.textContent = `Поиск по фильтру ${getFilterTitle(filterId)}`;
    if (searchInput) searchInput.value = state.filterSearch[filterId] || "";
    if (tags) tags.innerHTML = getMobileDetailTagsHtml(filterId);
    if (list) list.innerHTML = getMobileDetailOptionsHtml(filterId);
  }

  function openMobileFilterDetail(filterId) {
    if (!filterId || !getFilterElement(filterId)) return;

    state.mobileDetailFilter = filterId;
    syncMobileFilterDetail();
  }

  function closeMobileFilterDetail() {
    state.mobileDetailFilter = "";
    syncMobileFilterDetail();
  }

  function setFilterValueFromDetail(filterId, value) {
    if (isFilterMulti(filterId)) {
      if (!(state.selected[filterId] instanceof Set)) {
        state.selected[filterId] = new Set();
      }

      if (state.selected[filterId].has(value)) {
        state.selected[filterId].delete(value);
      } else {
        state.selected[filterId].add(value);
      }
    } else {
      state.selected[filterId] = value;
    }

    syncFilterInputs(filterId);
    updateFilterOptions(filterId);
    syncActiveFilters();
    syncMobileFilterDetail();
  }

  function clearFilterValueFromDetail(filterId, value) {
    if (state.selected[filterId] instanceof Set) {
      state.selected[filterId].delete(value);
    } else if (state.selected[filterId] === value) {
      state.selected[filterId] = "";
    }

    syncFilterInputs(filterId);
    updateFilterOptions(filterId);
    syncActiveFilters();
    syncMobileFilterDetail();
  }

  function getGalleryImages(gallery) {
    return Array.from(gallery.querySelectorAll("[data-gallery-image]"));
  }

  function getGalleryPoints(gallery) {
    return Array.from(gallery.querySelectorAll("[data-gallery-point]"));
  }

  function getGalleryActiveIndex(gallery) {
    const activeIndex = getGalleryImages(gallery).findIndex((image) =>
      image.classList.contains("is-active"),
    );

    return activeIndex >= 0 ? activeIndex : 0;
  }

  function setGalleryIndex(gallery, index) {
    const images = getGalleryImages(gallery);
    const points = getGalleryPoints(gallery);

    if (!images.length) return;

    const activeIndex = Math.min(images.length - 1, Math.max(0, index));

    images.forEach((image, imageIndex) =>
      image.classList.toggle("is-active", imageIndex === activeIndex),
    );
    points.forEach((point, pointIndex) =>
      point.classList.toggle("is-active", pointIndex === activeIndex),
    );
  }

  function getGalleryIndexFromPointer(gallery, clientX) {
    const images = getGalleryImages(gallery);
    const points = getGalleryPoints(gallery);
    const zones = points.length || images.length;
    const rect = gallery.getBoundingClientRect();

    if (!zones || !rect.width) return 0;

    return Math.min(
      zones - 1,
      Math.max(0, Math.floor(((clientX - rect.left) / rect.width) * zones)),
    );
  }

  function resetGallerySwipe() {
    gallerySwipe.gallery = null;
    gallerySwipe.pointerId = null;
    gallerySwipe.startX = 0;
    gallerySwipe.startY = 0;
    gallerySwipe.startIndex = 0;
    gallerySwipe.isHorizontal = false;
  }

  function closeSort(options = {}) {
    const { apply = false, resetDraft = true } = options;

    if (sortCloseTimer) {
      window.clearTimeout(sortCloseTimer);
      sortCloseTimer = 0;
    }

    if (apply) {
      state.sort = state.sortDraft;
    } else if (resetDraft) {
      state.sortDraft = state.sort;
    }

    const wasOpen = state.sortOpen;
    state.sortOpen = false;

    if (isMobileSortModal() && wasOpen) {
      const sort = root.querySelector("[data-sort]");
      const sortToggle = root.querySelector("[data-sort-toggle]");

      sort?.classList.add("is-closing");
      sort?.classList.remove("is-open");
      sortToggle?.setAttribute("aria-expanded", "false");
      syncSortButton();
      syncSortDraftOptions();
      syncSortModalState();

      sortCloseTimer = window.setTimeout(() => {
        sortCloseTimer = 0;
        sort?.classList.remove("is-closing");
      }, sortAnimationDuration);

      return;
    }

    syncSortState();
  }

  function updateFilterOptions(filterId) {
    const filterElement = getFilterElement(filterId);

    if (!filterElement) return;

    const expanded = filterElement.classList.contains("is-expanded");
    const query = (state.filterSearch[filterId] || "").trim().toLowerCase();
    const hiddenOptions = state.filterHidden[filterId] || new Set();
    const options = filterElement.querySelectorAll(".catalog-option, .catalog-chip");

    options.forEach((option, index) => {
      const label = (
        option.querySelector(".catalog-option__label")?.textContent ||
        option.textContent ||
        ""
      ).trim();
      const filtered = expanded && query && !label.toLowerCase().includes(query);

      option.classList.toggle("is-hidden", !expanded && hiddenOptions.has(index));
      option.classList.toggle("is-filtered", Boolean(filtered));
    });
  }

  function syncFilterExpanded(filterId) {
    const filterElement = getFilterElement(filterId);
    const input = filterElement?.querySelector("[data-filter-search]");

    if (!filterElement) return;

    filterElement.classList.toggle("is-expanded", Boolean(state.expanded[filterId]));
    if (input) input.value = state.filterSearch[filterId] || "";
    updateFilterOptions(filterId);
  }

  function getActiveTagsHtml() {
    const tags = getActiveFilterTags();

    if (!tags.length) return "";

    const mobileReset =
      tags.length > 2
        ? `
          <button class="catalog-active__reset" type="button" data-reset-filters>
            ${icons.reset}<span>Сбросить</span>
          </button>
        `
        : "";

    return `
      <div class="catalog-active">
        <span class="catalog-active__label">Фильтры:</span>
        <div class="catalog-active__tags">
          ${tags
            .map(
              (tag) => `
                <button class="catalog-active__tag" type="button" data-clear-filter="${tag.filter}" data-clear-value="${escapeHtml(tag.value)}">
                  <span>${escapeHtml(tag.label)}</span>${icons.close}
                </button>
              `,
            )
            .join("")}
          ${mobileReset}
        </div>
      </div>
    `;
  }

  function syncActiveFilters() {
    let activeFilters = root.querySelector("[data-active-filters]");
    const tags = getActiveFilterTags();
    const resetButtons = root.querySelectorAll("[data-reset-filters]");

    if (!activeFilters) {
      const active = root.querySelector(".catalog-active");
      const main = root.querySelector(".catalog-results__main");

      activeFilters = document.createElement("div");
      activeFilters.setAttribute("data-active-filters", "");
      if (active) {
        active.before(activeFilters);
        activeFilters.append(active);
      } else if (main) {
        main.prepend(activeFilters);
      }
    }

    if (activeFilters) activeFilters.innerHTML = getActiveTagsHtml();
    resetButtons.forEach((reset) => {
      reset.disabled = !hasActiveFilters();
      reset.hidden = !hasActiveFilters() && reset.classList.contains("catalog-sidebar__mobile-reset");
    });
    syncFilterBadge(tags.length);
  }

  function syncFilterInputs(filterId) {
    const inputs = getFilterInputs(filterId);
    const selected = state.selected[filterId];
    const isCheckbox = inputs[0]?.type === "checkbox";

    inputs.forEach((input) => {
      input.checked = isCheckbox
        ? selected instanceof Set && selected.has(input.value)
        : selected === input.value;
    });
  }

  function syncDiscountInput() {
    const discount = root.querySelector("[data-discount-toggle]");
    if (discount) discount.checked = state.discount;
  }

  function syncAllFilterControls() {
    getFilterElements().forEach((filter) => {
      const filterId = filter.getAttribute("data-filter");

      syncFilterInputs(filterId);
      syncFilterExpanded(filterId);
    });
    syncDiscountInput();
    updatePriceControls();
    syncActiveFilters();
  }

  function updatePriceTrack() {
    const price = root.querySelector("[data-price]");
    if (!price) return;

    const span = state.price.max - state.price.min;
    const minPercent = ((state.price.currentMin - state.price.min) / span) * 100;
    const maxPercent = ((state.price.currentMax - state.price.min) / span) * 100;

    price.style.setProperty("--range-min", `${minPercent}%`);
    price.style.setProperty("--range-max", `${maxPercent}%`);
    price.classList.toggle("is-price-active", hasActivePriceFilter());
  }

  function updatePriceControls() {
    updatePriceTrack();

    const minInput = root.querySelector('[data-price-input="min"]');
    const maxInput = root.querySelector('[data-price-input="max"]');
    const minRange = root.querySelector('[data-price-range="min"]');
    const maxRange = root.querySelector('[data-price-range="max"]');
    const minHandle = root.querySelector('[data-price-handle="min"]');
    const maxHandle = root.querySelector('[data-price-handle="max"]');

    if (minInput) minInput.value = formatPriceInput(state.price.currentMin);
    if (maxInput) maxInput.value = formatPriceInput(state.price.currentMax);
    if (minRange) minRange.value = state.price.currentMin;
    if (maxRange) maxRange.value = state.price.currentMax;
    if (minHandle) minHandle.setAttribute("aria-valuenow", String(state.price.currentMin));
    if (maxHandle) maxHandle.setAttribute("aria-valuenow", String(state.price.currentMax));
  }

  function clampPrice(type, value) {
    const next = Math.min(Math.max(parsePriceInput(value), state.price.min), state.price.max);

    if (type === "min") {
      state.price.currentMin = Math.min(next, state.price.currentMax);
    } else {
      state.price.currentMax = Math.max(next, state.price.currentMin);
    }
  }

  function setPriceFromPointer(type, clientX) {
    const slider = root.querySelector(".catalog-price__slider");
    if (!slider) return;

    const rect = slider.getBoundingClientRect();
    const percent = Math.min(Math.max((clientX - rect.left) / rect.width, 0), 1);
    const rawValue = state.price.min + percent * (state.price.max - state.price.min);
    const step = 100;

    clampPrice(type, Math.round(rawValue / step) * step);
    updatePriceControls();
    syncActiveFilters();
  }

  function getHandleCenter(slider, type) {
    const rect = slider.querySelector(`[data-price-handle="${type}"]`).getBoundingClientRect();
    return rect.left + rect.width / 2;
  }

  function resetFilters() {
    getFilterElements().forEach((filter) => {
      const filterId = filter.getAttribute("data-filter");
      const inputs = getFilterInputs(filterId);

      state.selected[filterId] = inputs[0]?.type === "checkbox" ? new Set() : "";
      state.filterSearch[filterId] = "";
      state.expanded[filterId] = false;
    });

    state.discount = false;
    state.price.currentMin = state.price.min;
    state.price.currentMax = state.price.max;
  }

  function hydrateCatalogState() {
    getFilterElements().forEach((filterElement) => {
      const filterId = filterElement.getAttribute("data-filter");
      const inputs = getFilterInputs(filterId);
      const checkedInputs = inputs.filter((input) => input.checked);
      const searchInput = root.querySelector(`[data-filter-search="${filterId}"]`);

      if (inputs[0]?.type === "checkbox") {
        state.selected[filterId] = new Set(checkedInputs.map((input) => input.value));
      } else {
        state.selected[filterId] = checkedInputs[0]?.value || "";
      }

      state.expanded[filterId] = filterElement.classList.contains("is-expanded");
      state.filterSearch[filterId] = searchInput?.value || "";
      state.filterHidden[filterId] = new Set(
        Array.from(filterElement.querySelectorAll(".catalog-option, .catalog-chip"))
          .map((option, index) => (option.classList.contains("is-hidden") ? index : -1))
          .filter((index) => index >= 0),
      );
    });

    state.discount = Boolean(root.querySelector("[data-discount-toggle]")?.checked);

    const minInput = root.querySelector('[data-price-input="min"]');
    const maxInput = root.querySelector('[data-price-input="max"]');
    if (minInput) state.price.currentMin = parsePriceInput(minInput.value);
    if (maxInput) state.price.currentMax = parsePriceInput(maxInput.value);

    state.query = root.querySelector("[data-catalog-search] [name='q']")?.value || "";

    const activeSort = root.querySelector("[data-sort-value].is-active")?.getAttribute("data-sort-value");
    if (activeSort) {
      state.sort = activeSort;
      state.sortDraft = activeSort;
    }
  }

  async function copyCode(button) {
    const code = button.getAttribute("data-code") || "";

    try {
      await navigator.clipboard.writeText(code);
    } catch (error) {
      const input = document.createElement("input");
      input.value = code;
      document.body.append(input);
      input.select();
      document.execCommand("copy");
      input.remove();
    }

    button.classList.add("is-copied");
    window.setTimeout(() => button.classList.remove("is-copied"), 900);
  }

  function openVinRequestModal() {
    if (window.LuzarPartsFinder?.openVinRequestModal) {
      window.LuzarPartsFinder.openVinRequestModal();
      return;
    }

    const handledByPartsFinder = !document.dispatchEvent(
      new CustomEvent("parts-finder:open-vin-request-modal", {
        cancelable: true,
      }),
    );

    if (!handledByPartsFinder && window.PartsFinderRequestModal) {
      window.PartsFinderRequestModal.open();
    }
  }

  root.addEventListener("submit", (event) => {
    const search = event.target.closest("[data-catalog-search]");

    if (search) {
      event.preventDefault();
      const input = search.querySelector("[name='q']");
      state.query = input ? input.value : "";
      syncCatalogSearch(search);
    }
  });

  root.addEventListener("input", (event) => {
    const filterInput = event.target.closest("[data-filter-input]");
    const filterSearch = event.target.closest("[data-filter-search]");
    const filterDetailSearch = event.target.closest("[data-filter-detail-search]");
    const discount = event.target.closest("[data-discount-toggle]");
    const priceInput = event.target.closest("[data-price-input]");
    const priceRange = event.target.closest("[data-price-range]");
    const searchInput = event.target.closest("#catalog-search-input");

    if (filterInput) {
      const filterId = filterInput.getAttribute("data-filter-input");
      const value = filterInput.value;

      if (filterInput.type === "checkbox") {
        if (!(state.selected[filterId] instanceof Set)) {
          state.selected[filterId] = new Set();
        }

        if (filterInput.checked) {
          state.selected[filterId].add(value);
        } else {
          state.selected[filterId].delete(value);
        }
      } else {
        state.selected[filterId] = value;
      }

      syncActiveFilters();
    }

    if (filterSearch) {
      const filterId = filterSearch.getAttribute("data-filter-search");

      state.filterSearch[filterId] = filterSearch.value;
      updateFilterOptions(filterId);
    }

    if (filterDetailSearch && state.mobileDetailFilter) {
      state.filterSearch[state.mobileDetailFilter] = filterDetailSearch.value;
      updateFilterOptions(state.mobileDetailFilter);
      syncMobileFilterDetail();
    }

    if (discount) {
      state.discount = discount.checked;
      syncActiveFilters();
    }

    if (priceInput || priceRange) {
      const control = priceInput || priceRange;
      clampPrice(control.dataset.priceInput || control.dataset.priceRange, control.value);
      updatePriceControls();
      syncActiveFilters();
    }

    if (searchInput) {
      state.query = searchInput.value;
      syncCatalogSearch(searchInput.closest("[data-catalog-search]"));
    }
  });

  root.addEventListener("pointerdown", (event) => {
    const handle = event.target.closest("[data-price-handle]");
    const slider = event.target.closest(".catalog-price__slider");

    if (!slider) return;

    const type =
      handle?.getAttribute("data-price-handle") ||
      (Math.abs(event.clientX - getHandleCenter(slider, "min")) <
      Math.abs(event.clientX - getHandleCenter(slider, "max"))
        ? "min"
        : "max");

    event.preventDefault();
    state.draggingPrice = type;
    root.querySelector(`[data-price-handle="${type}"]`)?.classList.add("is-dragging");
    setPriceFromPointer(type, event.clientX);
  });

  root.addEventListener("keydown", (event) => {
    if (event.key === "Escape" && state.sortOpen) {
      event.preventDefault();
      closeSort();
      return;
    }

    if (event.key === "Escape" && state.filterOpen) {
      event.preventDefault();
      if (state.mobileDetailFilter) {
        closeMobileFilterDetail();
        return;
      }
      state.filterOpen = false;
      syncFilterModalState();
      return;
    }

    const handle = event.target.closest("[data-price-handle]");
    if (!handle) return;

    const type = handle.getAttribute("data-price-handle");
    const keyStep = event.key === "PageUp" || event.key === "PageDown" ? 1000 : 100;
    const direction = event.key === "ArrowRight" || event.key === "ArrowUp" || event.key === "PageUp"
      ? 1
      : event.key === "ArrowLeft" || event.key === "ArrowDown" || event.key === "PageDown"
        ? -1
        : 0;

    if (!direction) return;

    event.preventDefault();
    const current = type === "min" ? state.price.currentMin : state.price.currentMax;
    clampPrice(type, current + direction * keyStep);
    updatePriceControls();
    syncActiveFilters();
    handle.focus();
  });

  root.addEventListener("click", (event) => {
    const sortToggle = event.target.closest("[data-sort-toggle]");
    const sortValue = event.target.closest("[data-sort-value]");
    const sortClose = event.target.closest("[data-sort-close]");
    const sortApply = event.target.closest("[data-sort-apply]");
    const filterToggle = event.target.closest("[data-filter-toggle]");
    const filterClose = event.target.closest("[data-filter-close]");
    const filterApply = event.target.closest("[data-filter-apply]");
    const filterDetailClose = event.target.closest("[data-filter-detail-close]");
    const filterDetailOption = event.target.closest("[data-filter-detail-option]");
    const filterDetailClear = event.target.closest("[data-filter-detail-clear]");
    const expand = event.target.closest("[data-filter-expand]");
    const collapse = event.target.closest("[data-filter-collapse]");
    const reset = event.target.closest("[data-reset-filters]");
    const clearTag = event.target.closest("[data-clear-filter]");
    const searchClear = event.target.closest("[data-catalog-search-clear]");
    const copy = event.target.closest(".icon-copy-code");
    const gallery = event.target.closest("[data-gallery]");
    const requestButton = event.target.closest('[data-action="open-vin-request-modal"]');

    if (gallery) {
      event.preventDefault();
    }

    if (requestButton) {
      event.preventDefault();
      openVinRequestModal();
    }

    if (searchClear) {
      event.preventDefault();
      const search = searchClear.closest("[data-catalog-search]");
      const input = search?.querySelector("[name='q']");

      if (input) {
        input.value = "";
        state.query = "";
        syncCatalogSearch(search);
        input.focus();
      }
    }

    if (filterToggle) {
      event.stopPropagation();
      closeSort();
      state.filterOpen = !state.filterOpen;
      syncFilterModalState();
    }

    if (filterApply) {
      event.stopPropagation();

      if (state.mobileDetailFilter) {
        closeMobileFilterDetail();
        return;
      }

      state.filterOpen = false;
      syncFilterModalState();
      return;
    }

    if (filterClose) {
      event.stopPropagation();
      state.mobileDetailFilter = "";
      state.filterOpen = false;
      syncFilterModalState();
      return;
    }

    if (filterDetailClose) {
      event.stopPropagation();
      closeMobileFilterDetail();
      return;
    }

    if (filterDetailOption) {
      event.preventDefault();
      event.stopPropagation();
      setFilterValueFromDetail(
        filterDetailOption.getAttribute("data-filter-detail-option"),
        filterDetailOption.getAttribute("data-filter-detail-value"),
      );
    }

    if (filterDetailClear) {
      event.preventDefault();
      event.stopPropagation();
      clearFilterValueFromDetail(
        filterDetailClear.getAttribute("data-filter-detail-clear"),
        filterDetailClear.getAttribute("data-filter-detail-value"),
      );
    }

    if (sortToggle) {
      event.stopPropagation();
      if (sortCloseTimer) {
        window.clearTimeout(sortCloseTimer);
        sortCloseTimer = 0;
      }
      state.filterOpen = false;
      syncFilterModalState();
      state.sortDraft = state.sort;
      state.sortOpen = !state.sortOpen;
      syncSortState();
    }

    if (sortValue) {
      event.stopPropagation();
      if (isMobileSortModal()) {
        state.sortDraft = sortValue.getAttribute("data-sort-value");
        syncSortDraftOptions();
      } else {
        state.sort = sortValue.getAttribute("data-sort-value");
        state.sortDraft = state.sort;
        state.sortOpen = false;
        syncSortState();
      }
    }

    if (sortClose) {
      event.stopPropagation();
      closeSort();
    }

    if (sortApply) {
      event.stopPropagation();
      closeSort({ apply: true, resetDraft: false });
    }

    if (expand) {
      const filterId = expand.getAttribute("data-filter-expand");
      if (isMobileFilters()) {
        event.preventDefault();
        openMobileFilterDetail(filterId);
        return;
      }
      state.expanded[filterId] = true;
      syncFilterExpanded(filterId);
    }

    if (collapse) {
      const filterId = collapse.getAttribute("data-filter-collapse");
      state.expanded[filterId] = false;
      state.filterSearch[filterId] = "";
      syncFilterExpanded(filterId);
    }

    if (reset) {
      resetFilters();
      syncAllFilterControls();
      syncMobileFilterDetail();
    }

    if (clearTag) {
      const filterId = clearTag.getAttribute("data-clear-filter");
      const value = clearTag.getAttribute("data-clear-value");

      if (filterId === "discount") {
        state.discount = false;
        syncDiscountInput();
      } else if (filterId === "price") {
        state.price.currentMin = state.price.min;
        state.price.currentMax = state.price.max;
        updatePriceControls();
      } else if (state.selected[filterId] instanceof Set) {
        state.selected[filterId].delete(value);
        syncFilterInputs(filterId);
      } else {
        state.selected[filterId] = "";
        syncFilterInputs(filterId);
      }

      syncActiveFilters();
      syncMobileFilterDetail();
    }

    if (copy) {
      copyCode(copy);
    }

  });

  root.addEventListener("pointerdown", (event) => {
    const gallery = event.target.closest("[data-gallery]");

    if (!gallery || event.pointerType === "mouse") return;
    if (getGalleryImages(gallery).length < 2) return;

    gallerySwipe.gallery = gallery;
    gallerySwipe.pointerId = event.pointerId;
    gallerySwipe.startX = event.clientX;
    gallerySwipe.startY = event.clientY;
    gallerySwipe.startIndex = getGalleryActiveIndex(gallery);
    gallerySwipe.isHorizontal = false;

    try {
      gallery.setPointerCapture(event.pointerId);
    } catch {
      // Some browsers can reject pointer capture after cancelled gestures.
    }
  });

  root.addEventListener("pointermove", (event) => {
    const gallery = event.target.closest("[data-gallery]");
    if (!gallery) return;

    if (event.pointerType && event.pointerType !== "mouse") {
      if (gallerySwipe.pointerId !== event.pointerId) return;

      const deltaX = event.clientX - gallerySwipe.startX;
      const deltaY = event.clientY - gallerySwipe.startY;

      if (
        !gallerySwipe.isHorizontal &&
        Math.abs(deltaX) > gallerySwipeIntentThreshold &&
        Math.abs(deltaX) > Math.abs(deltaY)
      ) {
        gallerySwipe.isHorizontal = true;
      }

      if (gallerySwipe.isHorizontal) {
        event.preventDefault();
      }

      return;
    }

    setGalleryIndex(gallery, getGalleryIndexFromPointer(gallery, event.clientX));
  });

  root.addEventListener("pointerup", (event) => {
    const gallery = gallerySwipe.gallery;

    if (!gallery || gallerySwipe.pointerId !== event.pointerId) return;

    const deltaX = event.clientX - gallerySwipe.startX;
    const deltaY = event.clientY - gallerySwipe.startY;

    if (Math.abs(deltaX) >= gallerySwipeThreshold && Math.abs(deltaX) > Math.abs(deltaY)) {
      setGalleryIndex(gallery, gallerySwipe.startIndex + (deltaX < 0 ? 1 : -1));
    }

    try {
      gallery.releasePointerCapture(event.pointerId);
    } catch {
      // Pointer capture may already be released by the browser.
    }

    resetGallerySwipe();
  });

  root.addEventListener("pointercancel", resetGallerySwipe);

  root.addEventListener("lostpointercapture", (event) => {
    if (gallerySwipe.pointerId === event.pointerId) {
      resetGallerySwipe();
    }
  });

  root.addEventListener("pointerout", (event) => {
    if (event.pointerType && event.pointerType !== "mouse") return;

    const gallery = event.target.closest && event.target.closest("[data-gallery]");
    if (!gallery) return;
    if (gallery.contains(event.relatedTarget)) return;

    setGalleryIndex(gallery, 0);
  });

  document.addEventListener("click", (event) => {
    const requestButton = event.target.closest?.('[data-action="open-vin-request-modal"]');

    if (requestButton && !root.contains(requestButton) && !event.defaultPrevented) {
      event.preventDefault();
      openVinRequestModal();
      return;
    }

    if (root.contains(event.target) || event.composedPath().includes(root)) return;
    if (!state.sortOpen) return;

    closeSort();
  }, true);

  window.addEventListener("resize", () => {
    syncSortModalState();
    syncFilterModalState();
  });

  document.addEventListener("pointermove", (event) => {
    if (!state.draggingPrice) return;

    event.preventDefault();
    setPriceFromPointer(state.draggingPrice, event.clientX);
  });

  document.addEventListener("pointerup", () => {
    if (!state.draggingPrice) return;

    state.draggingPrice = "";
    root.querySelectorAll("[data-price-handle]").forEach((handle) => {
      handle.classList.remove("is-dragging");
    });
  });

  hydrateCatalogState();
  syncCatalogSearch();
  ensureMobileFilterControls();
  updatePriceTrack();
  syncActiveFilters();
  syncSortModalState();
  syncFilterModalState();
})();
