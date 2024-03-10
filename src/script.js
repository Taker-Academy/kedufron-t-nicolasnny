document.addEventListener('DOMContentLoaded', function() {
  const itemsContainer = document.getElementById('items');
  const cartContainer = document.querySelector('.cart');
  const checkoutBtn = document.getElementById('checkoutBtn');
  const confirmationContainer = document.getElementById('confirmation');
  const confirmationText = document.getElementById('confirmationText');
  let cartItems = [];

  if (localStorage.getItem('cartItems')) {
      cartItems = JSON.parse(localStorage.getItem('cartItems'));
      updateCartDisplay();
  }

  function fetchItems() {
      fetch('https://api.kedufront.juniortaker.com/item/')
          .then(response => response.json())
          .then(data => {
              data.forEach(item => {
                  itemsContainer.appendChild(createItemElement(item));
              });
          })
  }

  function createItemElement(item) {
      const itemDiv = document.createElement('div');
      itemDiv.classList.add('item');
      const img = document.createElement('img');
      img.src = `https://api.kedufront.juniortaker.com/static/img/${item.image}.png`;
      img.alt = item.name;
      const name = document.createElement('h3');
      name.textContent = item.name;
      const price = document.createElement('p');
      price.textContent = 'Prix: ' + item.price + ' €';
      itemDiv.addEventListener('click', () => {
          window.location.href = `item.html?id=${item._id}`;
      });
      itemDiv.appendChild(img);
      itemDiv.appendChild(name);
      itemDiv.appendChild(price);
      return itemDiv;
  }

  function updateCartDisplay() {
      cartContainer.innerHTML = '';
      cartItems.forEach(item => {
          if (item.quantity > 0) {
              const cartItemElement = document.createElement('li');
              cartItemElement.classList.add('cart-item');
              const increaseBtn = document.createElement('button');
              increaseBtn.textContent = '+';
              increaseBtn.addEventListener('click', () => {
                  item.quantity++;
                  updateCartDisplay();
                  saveCartToLocalStorage();
              });
              const quantityText = document.createElement('span');
              quantityText.textContent = `${item.quantity}`;
              const decreaseBtn = document.createElement('button');
              decreaseBtn.textContent = '-';
              decreaseBtn.addEventListener('click', () => {
                  item.quantity--;
                  if (item.quantity === 0) {
                      cartItems = cartItems.filter(cartItem => cartItem._id !== item._id);
                  }
                  updateCartDisplay();
                  saveCartToLocalStorage();
              });
              cartItemElement.appendChild(document.createTextNode(`${item.name}`));
              cartItemElement.appendChild(decreaseBtn);
              cartItemElement.appendChild(quantityText);
              cartItemElement.appendChild(increaseBtn);
              cartContainer.appendChild(cartItemElement);
          }
      });
  }

  function saveCartToLocalStorage() {
      localStorage.setItem('cartItems', JSON.stringify(cartItems));
  }

  checkoutBtn.addEventListener('click', () => {
      if (cartItems.length === 0) {
          alert('Votre panier est vide.');
          return;
      }
      window.location.href = "formulaire.html";
      const orderData = {
          email: 'client@example.com',
          name: 'Client Nom',
          address: 'Adresse de Livraison',
          cart: cartItems.map(item => ({ id: item._id, amount: item.quantity }))
      };
      fetch('https://api.kedufront.juniortaker.com/order/', {
          method: 'POST',
          headers: {
              'Content-Type': 'application/json'
          },
          body: JSON.stringify(orderData)
      })
          .then(response => response.json())
          .then(data => {
              showConfirmation(data.command_id);
              cartItems = [];
              updateCartDisplay();
              saveCartToLocalStorage();
          })
  });

  function showConfirmation(commandId) {
      confirmationText.textContent = `Votre commande a été passée avec succès. ID de Commande: ${commandId}`;
      confirmationContainer.style.display = 'block';
  }
  fetchItems();
});
