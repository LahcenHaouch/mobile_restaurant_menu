import { menuItems } from "./data.js";

const menu = document.querySelector("#menu");
const summary = document.querySelector("#summary");
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
  if (!cart.length) {
    summary.innerHTML = "";
  }

  summary.innerHTML = cart.reduce((acc, current) => {
    const totalItemPriceIfMulti =
      current.total > 1 ? ` ($${current.price * current.total})` : "";

    return (
      acc +
      `
      <li>
         <div>
            <p>${current.name}</p>
            <button id="remove-${current.id}">remove</button>
         </div>
         <p>$${current.price} X ${current.total}${totalItemPriceIfMulti}</p>
      </li>
    `
    );
  }, "");
}

summary.addEventListener("click", (event) => {
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
