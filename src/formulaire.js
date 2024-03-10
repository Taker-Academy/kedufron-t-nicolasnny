document.addEventListener('DOMContentLoaded', function() {
  const orderSummary = document.getElementById('orderSummary').getElementsByTagName('tbody')[0];
  const orderForm = document.getElementById('orderForm');
  const confirmOrderBtn = document.getElementById('confirmOrderBtn');
  const confirmationContainer = document.getElementById('confirmation');
  const confirmationText = document.getElementById('confirmationText');
  const cartItems = JSON.parse(localStorage.getItem('cartItems'));

  function displayOrderSummary() {
    orderSummary.innerHTML = '';
    let totalPrice = 0;
    if (cartItems && cartItems.length > 0) {
      cartItems.forEach(item => {
        const itemTotalPrice = item.price * item.quantity;
        const row = orderSummary.insertRow();
        const cell1 = row.insertCell(0);
        const cell2 = row.insertCell(1);
        const cell3 = row.insertCell(2);
        const cell4 = row.insertCell(3);
        cell1.innerHTML = `<img src="https://api.kedufront.juniortaker.com/static/img/${item._id}.png" alt="${item.name}" class="table-image" />`;
        cell2.textContent = item.name;
        cell3.textContent = item.quantity;
        cell4.textContent = `${itemTotalPrice} €`;
        totalPrice += itemTotalPrice;
      });
    }

    const totalPriceElement = orderSummary.insertRow();
    totalPriceElement.insertCell(0);
    totalPriceElement.insertCell(1);
    totalPriceElement.insertCell(2).textContent = 'Prix Total de la Commande:';
    totalPriceElement.insertCell(3).textContent = `${totalPrice} €`;
  }

  displayOrderSummary();
  confirmOrderBtn.addEventListener('click', (e) => {
    e.preventDefault();
    const email = document.getElementById('email').value;
    const name = document.getElementById('name').value;
    const address = document.getElementById('address').value;
    if (!cartItems || cartItems.length === 0) {
      alert('Votre panier est vide.');
      return;
    }
    const orderData = {
      email: email,
      name: name,
      address: address,
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
      })
      .catch(error => console.error('Error placing order:', error));
  });

  function showConfirmation(commandId) {
    confirmationText.textContent = `Votre commande a été passée avec succès. ID de Commande: ${commandId}`;
    confirmationContainer.style.display = 'block';
    window.location.href = "confirmation.html";
    alert(`ID de commande: ${commandId}`);
    localStorage.removeItem('cartItems');
  }
});
