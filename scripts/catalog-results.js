(function () {
  const root = document.querySelector("[data-catalog-results]");

  if (!root) return;

  const icons = {
    close:
      '<svg viewBox="0 0 16 16" aria-hidden="true"><path d="M4.4714 3.52856L8 7.05716L11.5286 3.52856L12.4714 4.47136L8.9428 7.99996L12.4714 11.5286L11.5286 12.4714L8 8.94276L4.4714 12.4714L3.5286 11.5286L7.0572 7.99996L3.5286 4.47136L4.4714 3.52856Z"/></svg>',
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
    }
  });

  root.addEventListener("input", (event) => {
    const filterInput = event.target.closest("[data-filter-input]");
    const filterSearch = event.target.closest("[data-filter-search]");
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
