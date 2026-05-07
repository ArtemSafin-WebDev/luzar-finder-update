(function () {
  const root = document.querySelector("[data-catalog-results]");

  if (!root) return;

  function clampQuantity(value) {
    return Math.max(1, Math.min(99, Number(value) || 1));
  }

  function syncCart(cart, quantity) {
    const addButton = cart.querySelector(".card-catalog__cart-button");
    const counter = cart.querySelector(".card-catalog__counter");
    const input = cart.querySelector(".card-catalog__counter-input");
    const inCart = quantity > 0;

    if (addButton) addButton.hidden = inCart;
    if (counter) counter.hidden = !inCart;
    if (input) input.value = String(inCart ? quantity : 1);
  }

  root.addEventListener("submit", (event) => {
    const cart = event.target.closest(".card-catalog__cart");

    if (!cart) return;

    event.preventDefault();

    const input = cart.querySelector(".card-catalog__counter-input");
    const action = event.submitter?.value || "update";
    const current = clampQuantity(input?.value);
    let next = current;

    if (action === "add") {
      next = 1;
    } else if (action === "increase") {
      next = Math.min(99, current + 1);
    } else if (action === "decrease") {
      next = current <= 1 ? 0 : current - 1;
    }

    syncCart(cart, next);
  });

  root.addEventListener("input", (event) => {
    const input = event.target.closest(".card-catalog__counter-input");
    if (!input) return;

    input.value = String(clampQuantity(input.value));
  });
})();
