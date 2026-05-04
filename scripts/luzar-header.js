(function () {
  const root = document.querySelector("[data-luzar-header]");

  if (!root) return;

  const menuToggle = root.querySelector("[data-luzar-header-menu-toggle]");
  const menu = root.querySelector("[data-luzar-header-menu]");
  const searchToggle = root.querySelector("[data-luzar-header-search-toggle]");
  const mobileSearch = root.querySelector("[data-luzar-header-mobile-search]");
  const searchClose = root.querySelector("[data-luzar-header-search-close]");
  const searchInput = root.querySelector("#luzar-header-mobile-search-input");

  function setMenu(open) {
    root.classList.toggle("is-menu-open", open);
    if (menuToggle) menuToggle.setAttribute("aria-expanded", String(open));
    if (menu) menu.setAttribute("aria-hidden", String(!open));
  }

  function setSearch(open) {
    root.classList.toggle("is-search-open", open);
    if (searchToggle) searchToggle.setAttribute("aria-expanded", String(open));
    if (mobileSearch) mobileSearch.setAttribute("aria-hidden", String(!open));
    if (open && searchInput) searchInput.focus();
  }

  function scrollToTarget(selector) {
    const target = document.querySelector(selector);

    if (!target) return;

    setMenu(false);
    setSearch(false);
    target.scrollIntoView({ behavior: "smooth", block: "start" });
  }

  if (menuToggle) {
    menuToggle.addEventListener("click", () => {
      const willOpen = !root.classList.contains("is-menu-open");

      setSearch(false);
      setMenu(willOpen);
    });
  }

  if (searchToggle) {
    searchToggle.addEventListener("click", () => {
      const willOpen = !root.classList.contains("is-search-open");

      setMenu(false);
      setSearch(willOpen);
    });
  }

  if (searchClose) {
    searchClose.addEventListener("click", () => setSearch(false));
  }

  root.addEventListener("click", (event) => {
    const trigger = event.target.closest("[data-luzar-header-scroll-target]");

    if (!trigger) return;

    const selector = trigger.getAttribute("data-luzar-header-scroll-target");

    if (!selector) return;

    event.preventDefault();
    scrollToTarget(selector);
  });

  document.addEventListener("keydown", (event) => {
    if (event.key !== "Escape") return;

    setMenu(false);
    setSearch(false);
  });

  document.addEventListener("click", (event) => {
    if (root.contains(event.target)) return;

    setMenu(false);
    setSearch(false);
  });
})();
