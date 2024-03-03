const openMenuBtn = document.getElementById('open-basket-button');
const closeMenuBtn = document.getElementById('close-basket-button');
const sideMenu = document.getElementById('sideMenu');
const add_omnia_btn = document.getElementById("add-omnia-btn");

let shop_items = {
  "Omnia": { item_name: "Omnia", item_quantity: 0, item_image: "../assets/omnia.jpeg" }
};

let cart_item_list = document.getElementById("cart-items-list");

function check_quantity() {
  for (let item in shop_items) {
    if (shop_items[item].item_quantity == 0) {
      delete shop_items[item];
    }
  }
}

function create_new_item(item_name) {
  let new_item = document.createElement("li");
  let itemContainer = document.createElement("div");
  itemContainer.classList.add("item-container");
  let itemName = document.createElement("div");
  itemName.textContent = item_name;
  itemName.style.color = "black";
  let new_image = document.createElement("img");
  new_image.src = shop_items[item_name].item_image;
  itemContainer.appendChild(itemName);
  itemContainer.appendChild(new_image);
  new_item.appendChild(itemContainer);
  new_item.classList.add("cart-item");
  return new_item;
}

function add_new_item(item_name) {
  let new_item = create_new_item(item_name);
  let itemQuantity = document.createElement("div");
  itemQuantity.textContent = `Quantité: ${shop_items[item_name].item_quantity}`;
  itemQuantity.style.color = "black";
  let increaseButton = document.createElement("button");
  increaseButton.textContent = "+";
  increaseButton.addEventListener("click", () => {
    shop_items[item_name].item_quantity++;
    itemQuantity.textContent = `Quantité: ${shop_items[item_name].item_quantity}`;
    localStorage.setItem(item_name, shop_items[item_name].item_quantity);
  });
  let decreaseButton = document.createElement("button");
  decreaseButton.textContent = "-";
  decreaseButton.addEventListener("click", () => {
    if (shop_items[item_name].item_quantity > 0) {
      shop_items[item_name].item_quantity--;
      itemQuantity.textContent = `Quantité: ${shop_items[item_name].item_quantity}`;
      localStorage.setItem(item_name, shop_items[item_name].item_quantity);
      check_quantity();
      updateCartDisplay();
    }
  });
  new_item.appendChild(itemQuantity);
  new_item.appendChild(increaseButton);
  new_item.appendChild(decreaseButton);
  cart_item_list.appendChild(new_item);
}

function update_item(item_name) {
  if (!shop_items[item_name]) {
    shop_items[item_name] = { item_name: item_name, item_quantity: 0, item_image: "../assets/omnia.jpeg" };
  }
  shop_items[item_name].item_quantity++;
  localStorage.setItem(item_name, shop_items[item_name].item_quantity);
  updateCartDisplay();
}

function updateCartDisplay() {
  cart_item_list.innerHTML = '';
  for (let item in shop_items) {
    add_new_item(shop_items[item].item_name);
  }
}

openMenuBtn.addEventListener('click', () => {
  sideMenu.style.width = '100%';
});

closeMenuBtn.addEventListener('click', () => {
  sideMenu.style.width = '0';
});

add_omnia_btn.addEventListener('click', () => {
  sideMenu.style.width = '100%';
  openMenuBtn.click();
  update_item("Omnia");
});