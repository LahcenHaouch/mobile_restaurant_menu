import { menuItems } from "./data.js";

const menu = document.querySelector("#menu");
const orderSection = document.querySelector("#order-section");

let cart = [];

menu.innerHTML = menuItems.reduce((acc, current) => {
  return (
    acc +
    `
      <li>
        <div class="item-desc">
          <p class="icon">${current.emoji}</p>
          <div>
            <h2>${current.name}</h2>
            <p>${current.ingredients.join(", ")}</p>
            <p class="item-price">${current.price}$</p>
          </div>
        </div>
        <button id="menu-item-${current.id}" class="add-item-btn">+</button>
      </li>
  `
  );
}, "");

menu.addEventListener("click", (event) => {
  const { id } = event.target;

  if (!id.includes("menu-item-")) {
    return;
  }

  const [, , idInMenu] = id.split("-");

  const idToFind = Number.parseInt(idInMenu, 10);

  const itemInMenu = menuItems.find(({ id }) => id === idToFind);

  const itemAlreadyInCart = cart.find(({ id }) => id === idToFind);

  if (itemAlreadyInCart) {
    itemAlreadyInCart.total++;
  } else {
    itemInMenu.total = 1;
    cart.push(itemInMenu);
  }

  renderCart();
});

function renderCart() {
  console.log(cart);
  if (!cart.length) {
    orderSection.innerHTML = "";
    return;
  }

  let total = 0;

  const summary = cart.reduce((acc, current) => {
    total += current.total * current.price;
    const totalItemPriceIfMulti =
      current.total > 1 ? ` ($${current.price * current.total})` : "";

    return (
      acc +
      `
      <li>
         <div class="item-name-remove">
            <p class="cart-item-name">${current.name}</p>
            <button class="remove-item-btn" id="remove-${current.id}">remove</button>
         </div>
         <p class="cart-item-price">$${current.price} X ${current.total}${totalItemPriceIfMulti}</p>
      </li>
    `
    );
  }, "");

  const totalPrice = `
    <p class="total-price-label">Total price:</p>
    <p class="total-price-value" id="total">$${total}</p>
  `;

  orderSection.innerHTML = `
    <div id="order-section">
      <h2>Your order</h2>
      <ul id="summary">${summary}</ul>
      <div id="total-price">${totalPrice}</div>
    </div>
  `;
}

orderSection.addEventListener("click", (event) => {
  const { id } = event.target;
  if (!id.includes("remove-")) {
    return;
  }

  const [, removeBtnId] = id.split("-");
  const idToRemove = Number.parseInt(removeBtnId, 10);

  const itemToRemove = cart.find(({ id }) => id === idToRemove);

  if (itemToRemove && itemToRemove.total > 1) {
    itemToRemove.total--;
  } else {
    cart = cart.filter(({ id }) => id !== idToRemove);
  }

  renderCart();
});
