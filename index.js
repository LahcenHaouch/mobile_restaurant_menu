import { menuItems } from "./data.js";

const menu = document.querySelector("#menu");

menu.innerHTML = menuItems.reduce((acc, current) => {
  return (
    acc +
    `
      <li>
        <div class="item-desc">
          <p class="icon">${current.emoji}</p>
          <div>
            <h2>Pizza</h2>
            <p>${current.ingredients.join(", ")}</p>
            <p class="item-price">${current.price}$</p>
          </div>
        </div>
        <button class="add-item-btn">+</button>
    </li>
  `
  );
}, "");
