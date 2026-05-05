(function () {
  const root = document.querySelector("[data-catalog-results]");

  if (!root) return;

  const icons = {
    search:
      '<svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 16 16" aria-hidden="true"><path d="M7.33325 1.33337C10.647 1.33337 13.3333 4.01967 13.3333 7.33337C13.3333 8.75002 12.8408 10.0511 12.0198 11.0775L15.1379 14.1957L14.1956 15.1381L11.0774 12.0199C10.051 12.8409 8.7499 13.3334 7.33325 13.3334C4.01954 13.3334 1.33325 10.6471 1.33325 7.33337C1.33325 4.01967 4.01954 1.33337 7.33325 1.33337ZM7.33325 2.66638C4.75592 2.66638 2.66626 4.75605 2.66626 7.33337C2.66626 9.9107 4.75592 12.0004 7.33325 12.0004C9.91058 12.0004 12.0002 9.9107 12.0002 7.33337C12.0002 4.75605 9.91058 2.66638 7.33325 2.66638Z" /></svg>',
    close:
      '<svg viewBox="0 0 16 16" aria-hidden="true"><path d="M4.4714 3.52856L8 7.05716L11.5286 3.52856L12.4714 4.47136L8.9428 7.99996L12.4714 11.5286L11.5286 12.4714L8 8.94276L4.4714 12.4714L3.5286 11.5286L7.0572 7.99996L3.5286 4.47136L4.4714 3.52856Z"/></svg>',
    down:
      '<svg viewBox="0 0 16 16" aria-hidden="true"><path d="M4.4714 5.52856L8 9.05716L11.5286 5.52856L12.4714 6.47136L8.4714 10.4714H7.5286L3.5286 6.47136L4.4714 5.52856Z"/></svg>',
    up:
      '<svg viewBox="0 0 16 16" aria-hidden="true"><path d="M7.5286 5.52856H8.4714L12.4714 9.52856L11.5286 10.4714L8 6.94276L4.4714 10.4714L3.5286 9.52856L7.5286 5.52856Z"/></svg>',
    reset:
      '<svg viewBox="0 0 16 16" aria-hidden="true"><path d="M6.27441 1.56098C7.6919 1.18121 9.19598 1.2787 10.5518 1.84027C11.3452 2.16897 12.0617 2.64706 12.667 3.24066V1.66645H14L13.999 5.00043L13.333 5.66645H10V4.33344H11.8711C11.3592 3.793 10.7373 3.36113 10.041 3.0727C8.95656 2.62354 7.75394 2.54442 6.62012 2.84809C5.48612 3.15194 4.48326 3.82198 3.76855 4.75336C3.05393 5.68474 2.66701 6.82648 2.66699 8.00043C2.66706 9.17419 3.05411 10.3152 3.76855 11.2465C4.48326 12.1779 5.4861 12.8479 6.62012 13.1518C7.75402 13.4555 8.95649 13.3764 10.041 12.9272C11.1256 12.4779 12.0312 11.6831 12.6182 10.6664L13.7734 11.3334C13.0397 12.6043 11.9074 13.598 10.5518 14.1596C9.19596 14.7212 7.69192 14.8197 6.27441 14.4399C4.85708 14.0601 3.60427 13.2231 2.71094 12.059C1.81763 10.8948 1.33308 9.46786 1.33301 8.00043C1.33303 6.53298 1.81766 5.10607 2.71094 3.94184C3.60424 2.77773 4.85708 1.94084 6.27441 1.56098Z"/></svg>',
    copy:
      '<svg viewBox="0 0 16 16" aria-hidden="true"><path d="M11.333 5.33301V14L10.667 14.667H2L1.33301 14V5.33301L2 4.66699H10.667L11.333 5.33301ZM2.66699 13.333H10V6H2.66699V13.333ZM14.667 2V10.667L14 11.333H12V10H13.333V2.66699H6V4H4.66699V2L5.33301 1.33301H14L14.667 2Z"/></svg>',
    star:
      '<svg viewBox="0 0 16 16" aria-hidden="true"><path d="M10.1201 5.60645H14.9443L15.333 6.80566L11.4297 9.65137L12.9209 14.2598L11.9033 15L8 12.1533L4.09668 15L3.0791 14.2598L4.56934 9.65137L0.666992 6.80566L1.05566 5.60645H5.87988L7.37109 1H8.62891L10.1201 5.60645ZM6.84082 6.93262H3.08887L5.7373 8.86328L6.12402 9.14648L4.96582 12.7266L8 10.5137L11.0342 12.7266L9.87598 9.14648L10.2627 8.86328L12.9111 6.93262H9.15918L8 3.35254L6.84082 6.93262Z"/></svg>',
    sort:
      '<svg viewBox="0 0 16 16" aria-hidden="true"><path d="M14.4717 5.52832L13.5283 6.47168L12 4.94238V13.333H10.667V4.94238L9.1377 6.47168L8.19531 5.52832L10.8623 2.8623H11.8047L14.4717 5.52832ZM5.33301 11.0576L6.8623 9.52832L7.80469 10.4717L5.1377 13.1377H4.19531L1.52832 10.4717L2.47168 9.52832L4 11.0576V2.66699H5.33301V11.0576Z"/></svg>',
    minus:
      '<svg viewBox="0 0 16 16" aria-hidden="true"><path d="M13.333 7.33301V8.66699H2.66699V7.33301H13.333Z"/></svg>',
    plus:
      '<svg viewBox="0 0 16 16" aria-hidden="true"><path d="M8.66699 2.66699V7.33301H13.333V8.66699H8.66699V13.333H7.33301V8.66699H2.66699V7.33301H7.33301V2.66699H8.66699Z"/></svg>',
    check:
      '<svg viewBox="0 0 16 16" aria-hidden="true"><path d="M12.4714 4.19531L13.4142 5.13811L6.94281 11.6095H6.00001L2.58582 8.19531L3.52862 7.25251L6.47141 10.1953L12.4714 4.19531Z"/></svg>',
  };

  const imageBase = "images/catalog/";
  const productImages = [
    `${imageBase}radiator-01.webp`,
    `${imageBase}radiator-02.webp`,
    `${imageBase}radiator-03.webp`,
  ];

  const filters = [
    {
      id: "groups",
      title: "Доступные группы товаров",
      type: "checkbox",
      visibleLimit: 7,
      moreLabelCount: 6,
      options: [
        ["radiators", "Радиаторы"],
        ["water-pumps", "Насосы водяные"],
        ["cooling-fans", "Электровентиляторы охлаждения"],
        ["thermostats", "Термостаты"],
        ["cooling-components", "Компоненты системы охлаждения"],
        ["compressors", "Компрессоры кондиционера"],
        ["ac-components", "Компоненты системы кондиционирования"],
        ["pipes", "Трубопроводы кондиционера"],
        ["sensors", "Датчики давления хладагента"],
        ["caps", "Крышки и пробки"],
        ["belts", "Приводные ремни"],
        ["filters", "Фильтры"],
        ["gaskets", "Прокладки двигателя"],
      ],
    },
    {
      id: "teeth",
      title: "Кол-во зубьев",
      type: "radio-chip",
      options: [
        ["teeth-01", "variant 01"],
        ["teeth-02", "variant 02"],
        ["teeth-03", "variant 03"],
        ["teeth-04", "variant 04"],
        ["teeth-05", "variant 05"],
        ["teeth-06", "variant 06"],
      ],
    },
    {
      id: "power",
      title: "Мощность, кВт",
      type: "radio",
      visibleLimit: 7,
      moreLabelCount: 134,
      options: makeNumberedOptions("power", "Variant", 18),
    },
    {
      id: "brand",
      title: "Марка",
      type: "radio",
      visibleLimit: 7,
      moreLabelCount: 134,
      options: [
        ["audi", "Audi"],
        ["bmw", "BMW"],
        ["chevrolet", "Chevrolet"],
        ["citroen", "Citroen"],
        ["ford", "Ford"],
        ["hyundai", "Hyundai"],
        ["kia", "KIA"],
        ["lada", "LADA"],
        ["mazda", "Mazda"],
        ["mercedes", "Mercedes-Benz"],
        ["mitsubishi", "Mitsubishi"],
        ["nissan", "Nissan"],
        ["opel", "Opel"],
        ["peugeot", "Peugeot"],
        ["renault", "Renault"],
        ["skoda", "Skoda"],
        ["toyota", "Toyota"],
        ["volkswagen", "Volkswagen"],
      ],
    },
  ];

  const products = [
    product("LRAC 1980", "Радиатор кондиционера для автомобилей Приора (тип Halla)", 8500, 6650),
    product("LRAC 1920", "Радиатор кондиционера для автомобилей Приора (тип Halla)", 8500, 6650),
    product("LRAC 1750", "Радиатор кондиционера для автомобилей Приора (тип Halla)", 8500, 6650),
    product("LRAC 2160", "Радиатор кондиционера для автомобилей Приора (тип Halla)", 8500, 6650),
    product("LRAC 2210", "Радиатор кондиционера для автомобилей Приора (тип Halla)", 8500, 6650),
    product("LRAC 2350", "Радиатор кондиционера для автомобилей Приора (тип Halla)", 8500, 6650),
    product("LRAC 2410", "Радиатор кондиционера для автомобилей Приора (тип Halla)", 8500, 6650),
    product("LRAC 2490", "Радиатор кондиционера для автомобилей Приора (тип Halla)", 8500, 6650),
    product("LRAC 2510", "Радиатор кондиционера для автомобилей Приора (тип Halla)", 8500, 6650),
    product("LRAC 2600", "Радиатор кондиционера для автомобилей Granta (тип Halla)", 9200, 7120),
    product("LRAC 2640", "Радиатор кондиционера для автомобилей Kalina (тип Panasonic)", 7800, 6420),
    product("LRAC 2710", "Радиатор кондиционера для автомобилей Vesta", 9800, 7990),
  ];

  const sortOptions = [
    ["popular", "По популярности"],
    ["price-asc", "Сначала дешевле"],
    ["price-desc", "Сначала дороже"],
    ["new", "По новизне"],
    ["discount", "По величине скидки"],
  ];
  const initialHeaderCartCount = Number(
    document.querySelector(".luzar-header__cart-count")?.textContent || 0,
  );

  const state = {
    selected: {
      groups: new Set(["cooling-fans"]),
      teeth: "teeth-03",
      power: "",
      brand: "",
      discount: false,
    },
    expanded: {},
    filterSearch: {},
    price: { min: 459, max: 9999999, currentMin: 459, currentMax: 9999999 },
    sort: "popular",
    sortOpen: false,
    query: "",
    visibleProducts: 9,
    cart: {},
    favorites: new Set(),
    draggingPrice: "",
  };

  function makeNumberedOptions(prefix, label, count) {
    return Array.from({ length: count }, (_, index) => {
      const number = String(index + 1).padStart(2, "0");
      return [`${prefix}-${number}`, `${label} ${number}`];
    });
  }

  function product(code, name, oldPrice, price) {
    return {
      id: code.toLowerCase().replace(/\s+/g, "-"),
      code,
      name,
      oldPrice,
      price,
      oems: ["88450-12290", "88450-12280", "88450-02410", "88450-02280", "88450-02280"],
      images: productImages,
      discount: true,
    };
  }

  function escapeHtml(value) {
    return String(value)
      .replace(/&/g, "&amp;")
      .replace(/</g, "&lt;")
      .replace(/>/g, "&gt;")
      .replace(/"/g, "&quot;")
      .replace(/'/g, "&#039;");
  }

  function formatPrice(value) {
    return new Intl.NumberFormat("ru-RU").format(value) + " ₽";
  }

  function findOption(filterId, value) {
    const filter = filters.find((item) => item.id === filterId);
    const option = filter && filter.options.find((item) => item[0] === value);
    return option ? option[1] : "";
  }

  function getSortLabel() {
    return sortOptions.find((option) => option[0] === state.sort)[1];
  }

  function hasActiveFilters() {
    return (
      state.selected.groups.size > 0 ||
      Boolean(state.selected.teeth) ||
      Boolean(state.selected.power) ||
      Boolean(state.selected.brand) ||
      state.selected.discount ||
      state.price.currentMin !== state.price.min ||
      state.price.currentMax !== state.price.max
    );
  }

  function getFilteredProducts() {
    const query = state.query.trim().toLowerCase();
    let result = products.filter((item) => {
      const matchesQuery =
        !query ||
        item.name.toLowerCase().includes(query) ||
        item.code.toLowerCase().includes(query);
      const matchesDiscount = !state.selected.discount || item.discount;
      const matchesPrice =
        item.price >= state.price.currentMin && item.price <= state.price.currentMax;

      return matchesQuery && matchesDiscount && matchesPrice;
    });

    return result;
  }

  function render() {
    const filteredProducts = getFilteredProducts();
    const visibleProducts = filteredProducts.slice(0, state.visibleProducts);

    root.innerHTML = `
      <article class="catalog-results">
        <div class="catalog-results__heading">
          <div>
            <p class="catalog-results__eyebrow">Результаты подбора по VIN</p>
            <h2 class="catalog-results__title" id="catalog-results-title">Y6DTF69YO8O144158</h2>
          </div>
          <form class="catalog-search" data-catalog-search>
            <label class="visually-hidden" for="catalog-search-input">Найти товар для вашего авто</label>
            <input class="catalog-search__input" id="catalog-search-input" type="search" name="q" value="${escapeHtml(state.query)}" placeholder="Найти товары для вашего авто" autocomplete="off">
            <button class="catalog-search__submit" type="submit" aria-label="Найти">${icons.search}</button>
          </form>
          ${renderSort()}
        </div>
        <div class="catalog-results__layout">
          <aside class="catalog-sidebar" aria-label="Фильтры каталога">
            <div class="catalog-sidebar__summary">Всего товаров: 1065</div>
            ${filters.map(renderFilter).join("")}
            ${renderDiscount()}
            ${renderPrice()}
            <button class="catalog-reset" type="button" data-reset-filters ${hasActiveFilters() ? "" : "disabled"}>${icons.reset}<span>Сбросить фильтры</span></button>
          </aside>
          <div class="catalog-results__main">
            ${renderActiveTags()}
            <div class="catalog-grid-results">
              ${visibleProducts.map(renderProduct).join("")}
            </div>
            ${
              visibleProducts.length < filteredProducts.length
                ? '<button class="catalog-more" type="button" data-show-more>Показать еще</button>'
                : ""
            }
            ${renderRequestBanner()}
          </div>
        </div>
      </article>
    `;

    updatePriceTrack();
  }

  function renderSort() {
    return `
      <div class="catalog-sort${state.sortOpen ? " is-open" : ""}" data-sort>
        <button class="catalog-sort__button" type="button" aria-haspopup="listbox" aria-expanded="${state.sortOpen}" data-sort-toggle>
          ${icons.sort}
          <span>${escapeHtml(getSortLabel())}</span>
        </button>
        <div class="catalog-sort__menu" role="listbox">
          <div class="catalog-sort__title">Сортировать:</div>
          ${sortOptions
            .map(
              ([value, label]) => `
                <button class="catalog-sort__option${state.sort === value ? " is-active" : ""}" type="button" role="option" aria-selected="${state.sort === value}" data-sort-value="${value}">
                  <span class="catalog-sort__radio" aria-hidden="true"></span>
                  <span>${escapeHtml(label)}</span>
                </button>
              `,
            )
            .join("")}
        </div>
      </div>
    `;
  }

  function renderFilter(filter) {
    const expanded = Boolean(state.expanded[filter.id]);
    const query = state.filterSearch[filter.id] || "";
    const isChip = filter.type === "radio-chip";
    const visibleLimit = filter.visibleLimit || filter.options.length;

    return `
      <section class="catalog-filter${expanded ? " is-expanded" : ""}" data-filter="${filter.id}">
        <h3 class="catalog-filter__title">${escapeHtml(filter.title)}</h3>
        ${
          filter.options.length > visibleLimit
            ? `
              <div class="catalog-filter__search">
                <label class="visually-hidden" for="filter-search-${filter.id}">Поиск по фильтру ${escapeHtml(filter.title)}</label>
                <div class="catalog-filter__search-field">
                  <input class="catalog-filter__search-input" id="filter-search-${filter.id}" type="search" value="${escapeHtml(query)}" placeholder="Начните ввод" data-filter-search="${filter.id}">
                  <span class="catalog-filter__search-icon">${icons.search}</span>
                </div>
              </div>
            `
            : ""
        }
        <div class="catalog-filter__options${isChip ? " catalog-filter__options--chips" : ""}">
          ${filter.options
            .map(([value, label], index) => renderFilterOption(filter, value, label, index, expanded, visibleLimit, query))
            .join("")}
        </div>
        ${
          filter.options.length > visibleLimit
            ? `
              <button class="catalog-filter__more" type="button" data-filter-expand="${filter.id}">
                <span>Еще ${filter.moreLabelCount || filter.options.length - visibleLimit}</span>${icons.down}
              </button>
              <button class="catalog-filter__collapse" type="button" data-filter-collapse="${filter.id}">
                <span>Свернуть</span>${icons.up}
              </button>
            `
            : ""
        }
      </section>
    `;
  }

  function renderFilterOption(filter, value, label, index, expanded, visibleLimit, query) {
    const inputType = filter.type === "checkbox" ? "checkbox" : "radio";
    const checked =
      filter.type === "checkbox"
        ? state.selected[filter.id].has(value)
        : state.selected[filter.id] === value;
    const hidden = !expanded && index >= visibleLimit;
    const filtered =
      expanded && query && !label.toLowerCase().includes(query.trim().toLowerCase());

    if (filter.type === "radio-chip") {
      return `
        <label class="catalog-chip${hidden ? " is-hidden" : ""}${filtered ? " is-filtered" : ""}">
          <input type="${inputType}" name="${filter.id}" value="${escapeHtml(value)}" ${checked ? "checked" : ""} data-filter-input="${filter.id}">
          <span>${escapeHtml(label)}</span>
        </label>
      `;
    }

    return `
      <label class="catalog-option${hidden ? " is-hidden" : ""}${filtered ? " is-filtered" : ""}">
        <input type="${inputType}" name="${filter.id}" value="${escapeHtml(value)}" ${checked ? "checked" : ""} data-filter-input="${filter.id}">
        <span class="catalog-option__mark catalog-option__mark--${inputType}">${inputType === "checkbox" ? icons.check : ""}</span>
        <span class="catalog-option__label">${escapeHtml(label)}</span>
      </label>
    `;
  }

  function renderDiscount() {
    return `
      <section class="catalog-filter">
        <label class="catalog-toggle">
          <span class="catalog-toggle__text">Товары со скидкой</span>
          <input type="checkbox" ${state.selected.discount ? "checked" : ""} data-discount-toggle>
          <span class="catalog-toggle__track" aria-hidden="true"></span>
        </label>
      </section>
    `;
  }

  function renderPrice() {
    return `
      <section class="catalog-filter">
        <h3 class="catalog-filter__title">Цена</h3>
        <div class="catalog-price" data-price>
          <div class="catalog-price__inputs">
            <input class="catalog-price__input" type="number" min="${state.price.min}" max="${state.price.max}" value="${state.price.currentMin}" aria-label="Цена от" data-price-input="min">
            <input class="catalog-price__input" type="number" min="${state.price.min}" max="${state.price.max}" value="${state.price.currentMax}" aria-label="Цена до" data-price-input="max">
          </div>
          <div class="catalog-price__slider">
            <span class="catalog-price__track" aria-hidden="true"></span>
            <button class="catalog-price__handle catalog-price__handle--min${state.draggingPrice === "min" ? " is-dragging" : ""}" type="button" role="slider" aria-label="Минимальная цена" aria-valuemin="${state.price.min}" aria-valuemax="${state.price.currentMax}" aria-valuenow="${state.price.currentMin}" data-price-handle="min"></button>
            <button class="catalog-price__handle catalog-price__handle--max${state.draggingPrice === "max" ? " is-dragging" : ""}" type="button" role="slider" aria-label="Максимальная цена" aria-valuemin="${state.price.currentMin}" aria-valuemax="${state.price.max}" aria-valuenow="${state.price.currentMax}" data-price-handle="max"></button>
            <input class="catalog-price__range" type="range" min="${state.price.min}" max="${state.price.max}" value="${state.price.currentMin}" aria-label="Минимальная цена" data-price-range="min">
            <input class="catalog-price__range" type="range" min="${state.price.min}" max="${state.price.max}" value="${state.price.currentMax}" aria-label="Максимальная цена" data-price-range="max">
          </div>
        </div>
      </section>
    `;
  }

  function renderActiveTags() {
    const tags = [];

    state.selected.groups.forEach((value) => {
      tags.push({ filter: "groups", value, label: findOption("groups", value) });
    });

    ["teeth", "power", "brand"].forEach((filterId) => {
      const value = state.selected[filterId];
      if (value) tags.push({ filter: filterId, value, label: findOption(filterId, value) });
    });

    if (state.selected.discount) {
      tags.push({ filter: "discount", value: "discount", label: "Товары со скидкой" });
    }

    if (!tags.length) return "";

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
        </div>
      </div>
    `;
  }

  function renderProduct(item) {
    const count = state.cart[item.id] || 0;
    const favorite = state.favorites.has(item.id);

    return `
      <article class="card-catalog" data-card-id="${item.id}">
        <a class="card-catalog__gallery js-img-slider-prew" href="#" aria-label="${escapeHtml(item.name)}" data-gallery>
          <span class="card-catalog__images">
            ${item.images
              .map(
                (image, index) => `
                  <img class="card-catalog__image${index === 0 ? " is-active" : ""}" src="${image}" alt="${escapeHtml(item.name)}" loading="lazy" data-gallery-image="${index}">
                `,
              )
              .join("")}
          </span>
          <span class="card-catalog__points" aria-hidden="true">
            ${item.images.map((_, index) => `<span class="card-catalog__point${index === 0 ? " is-active" : ""}" data-gallery-point="${index}"></span>`).join("")}
          </span>
        </a>
        <div class="card-catalog__body">
          <a class="card-catalog__name" href="#">${escapeHtml(item.name)}</a>
          <div class="card-catalog__code">
            <span class="card-catalog__label">Код товара:</span>
            <span class="card-catalog__code-value icon-copy-code" data-code="${escapeHtml(item.code)}">${escapeHtml(item.code)}</span>
            <button class="card-catalog__icon-button icon-copy-code" type="button" aria-label="Скопировать код товара" data-code="${escapeHtml(item.code)}">${icons.copy}</button>
            <form class="card-catalog__favorite-form" action="/favorites/" method="post" data-favorite-form>
              <input type="hidden" name="id" value="${escapeHtml(item.id)}">
              <button class="card-catalog__icon-button${favorite ? " is-active" : ""}" type="submit" aria-label="Добавить в избранное">${icons.star}</button>
            </form>
          </div>
          <div class="card-catalog__group">
            <span class="card-catalog__label">ОЕМ номер:</span>
            <div class="card-catalog__oems">
              ${item.oems.map((oem) => `<span class="card-catalog__oem">${escapeHtml(oem)}</span>`).join("")}
            </div>
          </div>
          <div class="card-catalog__footer">
            <div class="card-catalog__price">
              <div class="card-catalog__old-price">${formatPrice(item.oldPrice)}</div>
              <div class="card-catalog__current-price">${formatPrice(item.price)}</div>
            </div>
            <div class="card-catalog__cart" data-cart-controls="${item.id}">
              <button class="card-catalog__cart-button" type="button" data-add-cart="${item.id}" ${count ? "hidden" : ""}>В корзину</button>
              <div class="card-catalog__counter" ${count ? "" : "hidden"}>
                <button class="card-catalog__counter-button" type="button" aria-label="Уменьшить количество" data-cart-minus="${item.id}">${icons.minus}</button>
                <input class="card-catalog__counter-input" type="number" min="1" max="99" value="${count || 1}" data-cart-input="${item.id}" aria-label="Количество ${escapeHtml(item.code)}">
                <button class="card-catalog__counter-button" type="button" aria-label="Увеличить количество" data-cart-plus="${item.id}">${icons.plus}</button>
              </div>
            </div>
          </div>
        </div>
      </article>
    `;
  }

  function renderRequestBanner() {
    return `
      <div class="catalog-request">
        <div class="catalog-request__text">
          <div class="catalog-request__title">Не уверены в выборе? Оставьте заявку на индивидуальный подбор</div>
          <div class="catalog-request__subtitle">Наши специалисты помогут подобрать подходящую деталь для вашего авто</div>
        </div>
        <button class="catalog-request__button" type="button">Запросить подбор</button>
      </div>
    `;
  }

  function updatePriceTrack() {
    const price = root.querySelector("[data-price]");
    if (!price) return;

    const span = state.price.max - state.price.min;
    const minPercent = ((state.price.currentMin - state.price.min) / span) * 100;
    const maxPercent = ((state.price.currentMax - state.price.min) / span) * 100;

    price.style.setProperty("--range-min", `${minPercent}%`);
    price.style.setProperty("--range-max", `${maxPercent}%`);
  }

  function updatePriceControls() {
    updatePriceTrack();

    const minInput = root.querySelector('[data-price-input="min"]');
    const maxInput = root.querySelector('[data-price-input="max"]');
    const minRange = root.querySelector('[data-price-range="min"]');
    const maxRange = root.querySelector('[data-price-range="max"]');
    const minHandle = root.querySelector('[data-price-handle="min"]');
    const maxHandle = root.querySelector('[data-price-handle="max"]');

    if (minInput) minInput.value = state.price.currentMin;
    if (maxInput) maxInput.value = state.price.currentMax;
    if (minRange) minRange.value = state.price.currentMin;
    if (maxRange) maxRange.value = state.price.currentMax;
    if (minHandle) minHandle.setAttribute("aria-valuenow", String(state.price.currentMin));
    if (maxHandle) maxHandle.setAttribute("aria-valuenow", String(state.price.currentMax));
  }

  function clampPrice(type, value) {
    const next = Math.min(Math.max(Number(value) || state.price.min, state.price.min), state.price.max);

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
  }

  function getHandleCenter(slider, type) {
    const rect = slider.querySelector(`[data-price-handle="${type}"]`).getBoundingClientRect();
    return rect.left + rect.width / 2;
  }

  function resetFilters() {
    state.selected.groups = new Set();
    state.selected.teeth = "";
    state.selected.power = "";
    state.selected.brand = "";
    state.selected.discount = false;
    state.price.currentMin = state.price.min;
    state.price.currentMax = state.price.max;
    state.filterSearch = {};
    state.expanded = {};
  }

  function updateHeaderCartCount() {
    const headerCount = document.querySelector(".luzar-header__cart-count");
    if (!headerCount) return;

    const count =
      initialHeaderCartCount + Object.values(state.cart).reduce((sum, value) => sum + value, 0);
    headerCount.textContent = String(count);
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

  root.addEventListener("submit", (event) => {
    const search = event.target.closest("[data-catalog-search]");
    const favoriteForm = event.target.closest("[data-favorite-form]");

    if (search) {
      event.preventDefault();
      const input = search.querySelector("[name='q']");
      state.query = input ? input.value : "";
      state.visibleProducts = 9;
      render();
    }

    if (favoriteForm) {
      event.preventDefault();
      const id = favoriteForm.querySelector("[name='id']").value;
      if (state.favorites.has(id)) {
        state.favorites.delete(id);
      } else {
        state.favorites.add(id);
      }
      render();
    }
  });

  root.addEventListener("input", (event) => {
    const filterInput = event.target.closest("[data-filter-input]");
    const filterSearch = event.target.closest("[data-filter-search]");
    const discount = event.target.closest("[data-discount-toggle]");
    const priceInput = event.target.closest("[data-price-input]");
    const priceRange = event.target.closest("[data-price-range]");
    const searchInput = event.target.closest("#catalog-search-input");
    const cartInput = event.target.closest("[data-cart-input]");

    if (filterInput) {
      const filterId = filterInput.getAttribute("data-filter-input");
      const value = filterInput.value;

      if (filterInput.type === "checkbox") {
        if (filterInput.checked) {
          state.selected[filterId].add(value);
        } else {
          state.selected[filterId].delete(value);
        }
      } else {
        state.selected[filterId] = value;
      }

      state.visibleProducts = 9;
      render();
    }

    if (filterSearch) {
      state.filterSearch[filterSearch.getAttribute("data-filter-search")] = filterSearch.value;
      render();
      const refocused = root.querySelector(
        `[data-filter-search="${filterSearch.getAttribute("data-filter-search")}"]`,
      );
      if (refocused) refocused.focus();
    }

    if (discount) {
      state.selected.discount = discount.checked;
      state.visibleProducts = 9;
      render();
    }

    if (priceInput || priceRange) {
      const control = priceInput || priceRange;
      clampPrice(control.dataset.priceInput || control.dataset.priceRange, control.value);
      state.visibleProducts = 9;
      render();
    }

    if (searchInput) {
      state.query = searchInput.value;
      state.visibleProducts = 9;
    }

    if (cartInput) {
      const id = cartInput.getAttribute("data-cart-input");
      state.cart[id] = Math.max(1, Math.min(99, Number(cartInput.value) || 1));
      updateHeaderCartCount();
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
    state.visibleProducts = 9;
    render();
    root.querySelector(`[data-price-handle="${type}"]`)?.focus();
  });

  root.addEventListener("click", (event) => {
    const sortToggle = event.target.closest("[data-sort-toggle]");
    const sortValue = event.target.closest("[data-sort-value]");
    const expand = event.target.closest("[data-filter-expand]");
    const collapse = event.target.closest("[data-filter-collapse]");
    const reset = event.target.closest("[data-reset-filters]");
    const clearTag = event.target.closest("[data-clear-filter]");
    const showMore = event.target.closest("[data-show-more]");
    const copy = event.target.closest(".icon-copy-code");
    const addCart = event.target.closest("[data-add-cart]");
    const cartPlus = event.target.closest("[data-cart-plus]");
    const cartMinus = event.target.closest("[data-cart-minus]");
    const gallery = event.target.closest("[data-gallery]");

    if (gallery) {
      event.preventDefault();
    }

    if (sortToggle) {
      event.stopPropagation();
      state.sortOpen = !state.sortOpen;
      render();
    }

    if (sortValue) {
      event.stopPropagation();
      state.sort = sortValue.getAttribute("data-sort-value");
      state.sortOpen = false;
      render();
    }

    if (expand) {
      state.expanded[expand.getAttribute("data-filter-expand")] = true;
      render();
    }

    if (collapse) {
      const filterId = collapse.getAttribute("data-filter-collapse");
      state.expanded[filterId] = false;
      state.filterSearch[filterId] = "";
      render();
    }

    if (reset) {
      resetFilters();
      render();
    }

    if (clearTag) {
      const filterId = clearTag.getAttribute("data-clear-filter");
      const value = clearTag.getAttribute("data-clear-value");

      if (filterId === "groups") {
        state.selected.groups.delete(value);
      } else if (filterId === "discount") {
        state.selected.discount = false;
      } else {
        state.selected[filterId] = "";
      }

      render();
    }

    if (showMore) {
      state.visibleProducts += 3;
      render();
    }

    if (copy) {
      copyCode(copy);
    }

    if (addCart) {
      const id = addCart.getAttribute("data-add-cart");
      addCart.disabled = true;
      window.setTimeout(() => {
        state.cart[id] = 1;
        updateHeaderCartCount();
        render();
      }, 180);
    }

    if (cartPlus) {
      const id = cartPlus.getAttribute("data-cart-plus");
      state.cart[id] = Math.min(99, (state.cart[id] || 1) + 1);
      updateHeaderCartCount();
      render();
    }

    if (cartMinus) {
      const id = cartMinus.getAttribute("data-cart-minus");
      const next = (state.cart[id] || 1) - 1;
      if (next <= 0) {
        delete state.cart[id];
      } else {
        state.cart[id] = next;
      }
      updateHeaderCartCount();
      render();
    }
  });

  root.addEventListener("pointermove", (event) => {
    const gallery = event.target.closest("[data-gallery]");
    if (!gallery) return;

    const images = Array.from(gallery.querySelectorAll("[data-gallery-image]"));
    const points = Array.from(gallery.querySelectorAll("[data-gallery-point]"));
    const rect = gallery.getBoundingClientRect();
    const index = Math.min(points.length - 1, Math.max(0, Math.floor(((event.clientX - rect.left) / rect.width) * points.length)));

    images.forEach((image, imageIndex) => image.classList.toggle("is-active", imageIndex === index));
    points.forEach((point, pointIndex) => point.classList.toggle("is-active", pointIndex === index));
  });

  root.addEventListener("pointerout", (event) => {
    const gallery = event.target.closest && event.target.closest("[data-gallery]");
    if (!gallery) return;
    if (gallery.contains(event.relatedTarget)) return;

    const images = Array.from(gallery.querySelectorAll("[data-gallery-image]"));
    const points = Array.from(gallery.querySelectorAll("[data-gallery-point]"));

    images.forEach((image, imageIndex) => image.classList.toggle("is-active", imageIndex === 0));
    points.forEach((point, pointIndex) => point.classList.toggle("is-active", pointIndex === 0));
  });

  document.addEventListener("click", (event) => {
    if (root.contains(event.target) || event.composedPath().includes(root)) return;
    if (!state.sortOpen) return;

    state.sortOpen = false;
    render();
  });

  document.addEventListener("pointermove", (event) => {
    if (!state.draggingPrice) return;

    event.preventDefault();
    setPriceFromPointer(state.draggingPrice, event.clientX);
  });

  document.addEventListener("pointerup", () => {
    if (!state.draggingPrice) return;

    state.draggingPrice = "";
    state.visibleProducts = 9;
    render();
  });

  render();
})();
