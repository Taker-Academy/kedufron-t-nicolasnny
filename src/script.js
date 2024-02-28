const openMenuBtn = document.getElementById('open-basket-button');
const closeMenuBtn = document.getElementById('close-basket-button');
const sideMenu = document.getElementById('sideMenu');
const add_omnia_btn = document.getElementById("add-omnia-btn");

let shop_items = {
  "Omnia": {item_name: "Omnia", item_quantity: 0, item_image: "../assets/omnia.jpeg"}
};

let cart_item_list = document.getElementById("cart-items-list");

function check_quantity() {
  for (item in shop_items) {
    if (item.item_quantity == 0)
      localStorage.removeItem(item.item_name);
  }
}

function add_new_item(item_name) {
  let new_item = document.createElement("li");
  let itemContainer = document.createElement("div");
  itemContainer.classList.add("item-container");
  let itemName = document.createElement("div");
  itemName.textContent = item_name;
  itemName.style.color = "black";
  itemContainer.appendChild(itemName);
  let new_image = document.createElement("img");
  new_image.src = shop_items[item_name].item_image;
  itemContainer.appendChild(new_image);
  let itemQuantity = document.createElement("div");
  itemQuantity.textContent = `Quantité: ${shop_items[item_name].item_quantity}`;
  itemQuantity.style.color = "black";
  itemContainer.appendChild(itemQuantity);
  let increaseButton = document.createElement("button");
  increaseButton.textContent = "+";
  increaseButton.addEventListener("click", () => {
      shop_items[item_name].item_quantity++;
      itemQuantity.textContent = `Quantité: ${shop_items[item_name].item_quantity}`;
      localStorage.setItem(item_name, shop_items[item_name].item_quantity);
  });
  itemContainer.appendChild(increaseButton);
  let decreaseButton = document.createElement("button");
  decreaseButton.textContent = "-";
  decreaseButton.addEventListener("click", () => {
      if (shop_items[item_name].item_quantity > 0) {
          shop_items[item_name].item_quantity--;
          itemQuantity.textContent = `Quantité: ${shop_items[item_name].item_quantity}`;
          localStorage.setItem(item_name, shop_items[item_name].item_quantity);
          check_quantity();
      }
  });
  itemContainer.appendChild(decreaseButton);
  new_item.appendChild(itemContainer);
  cart_item_list.appendChild(new_item);
  return new_image;
}

function add_cart_item(item_name) {
  if (shop_items[item_name].item_quantity == 0)
    add_new_item(item_name);
  shop_items[item_name].item_quantity++;
  localStorage.setItem("Omnia", shop_items["Omnia"].item_quantity);
  return;
};


openMenuBtn.addEventListener('click', () => {
  sideMenu.style.width = '100%';
});

closeMenuBtn.addEventListener('click', () => {
  sideMenu.style.width = '0';
});

add_omnia_btn.addEventListener('click', () => {
  sideMenu.style.width = '100%';
  // printf(shop_items["Omnia"].item_quantity);
  openMenuBtn.click();
  add_cart_item("Omnia");
  // localStorage.
});