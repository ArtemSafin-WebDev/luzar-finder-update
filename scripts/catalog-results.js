(function () {
  const root = document.querySelector("[data-catalog-results]");

  if (!root) return;

  const icons = {
    close:
      '<svg viewBox="0 0 16 16" aria-hidden="true"><path d="M4.4714 3.52856L8 7.05716L11.5286 3.52856L12.4714 4.47136L8.9428 7.99996L12.4714 11.5286L11.5286 12.4714L8 8.94276L4.4714 12.4714L3.5286 11.5286L7.0572 7.99996L3.5286 4.47136L4.4714 3.52856Z"/></svg>',
  };

  const mobileSortQuery = "(max-width: 699.98px)";
  const sortAnimationDuration = 260;

  const initialHeaderCartCount = Number(
    document.querySelector(".luzar-header__cart-count")?.textContent || 0,
  );

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
    query: "",
    cart: {},
    favorites: new Set(),
    draggingPrice: "",
  };

  let sortCloseTimer = 0;

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

  function hasActiveFilters() {
    const hasSelected = Object.values(state.selected).some((value) =>
      value instanceof Set ? value.size > 0 : Boolean(value),
    );

    return (
      hasSelected ||
      state.discount ||
      state.price.currentMin !== state.price.min ||
      state.price.currentMax !== state.price.max
    );
  }

  function syncSortModalState() {
    document.body.classList.toggle(
      "catalog-sort-modal-open",
      state.sortOpen && isMobileSortModal(),
    );
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

  function syncActiveFilters() {
    let activeFilters = root.querySelector("[data-active-filters]");
    const reset = root.querySelector("[data-reset-filters]");

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
    if (reset) reset.disabled = !hasActiveFilters();
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

  function syncCartControls(id) {
    const controls = root.querySelector(`[data-cart-controls="${id}"]`);
    if (!controls) return;

    const count = state.cart[id] || 0;
    const addButton = controls.querySelector("[data-add-cart]");
    const counter = controls.querySelector(".card-catalog__counter");
    const input = controls.querySelector("[data-cart-input]");

    if (addButton) {
      addButton.hidden = Boolean(count);
      addButton.disabled = false;
    }
    if (counter) counter.hidden = !count;
    if (input) input.value = count || 1;
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

    const activeSort = root.querySelector("[data-sort-value].is-active")?.getAttribute("data-sort-value");
    if (activeSort) {
      state.sort = activeSort;
      state.sortDraft = activeSort;
    }
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
    const favoriteForm = event.target.closest("[data-favorite-form]");

    if (search) {
      event.preventDefault();
      const input = search.querySelector("[name='q']");
      state.query = input ? input.value : "";
    }

    if (favoriteForm) {
      event.preventDefault();
      const id = favoriteForm.querySelector("[name='id']").value;
      const button = favoriteForm.querySelector("button");
      if (state.favorites.has(id)) {
        state.favorites.delete(id);
      } else {
        state.favorites.add(id);
      }
      button?.classList.toggle("is-active", state.favorites.has(id));
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
    if (event.key === "Escape" && state.sortOpen) {
      event.preventDefault();
      closeSort();
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
    const expand = event.target.closest("[data-filter-expand]");
    const collapse = event.target.closest("[data-filter-collapse]");
    const reset = event.target.closest("[data-reset-filters]");
    const clearTag = event.target.closest("[data-clear-filter]");
    const copy = event.target.closest(".icon-copy-code");
    const addCart = event.target.closest("[data-add-cart]");
    const cartPlus = event.target.closest("[data-cart-plus]");
    const cartMinus = event.target.closest("[data-cart-minus]");
    const gallery = event.target.closest("[data-gallery]");
    const requestButton = event.target.closest('[data-action="open-vin-request-modal"]');

    if (gallery) {
      event.preventDefault();
    }

    if (requestButton) {
      event.preventDefault();
      openVinRequestModal();
    }

    if (sortToggle) {
      event.stopPropagation();
      if (sortCloseTimer) {
        window.clearTimeout(sortCloseTimer);
        sortCloseTimer = 0;
      }
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
    }

    if (clearTag) {
      const filterId = clearTag.getAttribute("data-clear-filter");
      const value = clearTag.getAttribute("data-clear-value");

      if (filterId === "discount") {
        state.discount = false;
        syncDiscountInput();
      } else if (state.selected[filterId] instanceof Set) {
        state.selected[filterId].delete(value);
        syncFilterInputs(filterId);
      } else {
        state.selected[filterId] = "";
        syncFilterInputs(filterId);
      }

      syncActiveFilters();
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
        syncCartControls(id);
      }, 180);
    }

    if (cartPlus) {
      const id = cartPlus.getAttribute("data-cart-plus");
      state.cart[id] = Math.min(99, (state.cart[id] || 1) + 1);
      updateHeaderCartCount();
      syncCartControls(id);
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
      syncCartControls(id);
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

    closeSort();
  });

  window.addEventListener("resize", syncSortModalState);

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
  updatePriceTrack();
  syncSortModalState();
})();
