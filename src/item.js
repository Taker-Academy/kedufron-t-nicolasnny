document.addEventListener('DOMContentLoaded', function() {
    const itemName = document.getElementById('itemName');
    const itemDescription = document.getElementById('itemDescription');
    const itemPrice = document.getElementById('itemPrice');
    const itemImage = document.getElementById('itemImage');
    const cartContainer = document.querySelector('.cart');
    const checkoutBtn = document.getElementById('checkoutBtn');
    const confirmationContainer = document.getElementById('confirmation');
    const confirmationText = document.getElementById('confirmationText');
    const urlParams = new URLSearchParams(window.location.search);
    const itemId = urlParams.get('id');
    let cartItems = localStorage.getItem('cartItems') ? JSON.parse(localStorage.getItem('cartItems')) : [];

    fetch(`https://api.kedufront.juniortaker.com/item/${itemId}`)
        .then(response => response.json())
        .then(data => {
            const itemData = data.item;
            itemName.textContent = itemData.name;
            itemDescription.textContent = itemData.description;
            itemPrice.textContent = 'Prix: ' + itemData.price + ' €';
            itemImage.innerHTML = `<img src="https://api.kedufront.juniortaker.com/static/img/${itemData.image}.png" alt="${itemData.name}" />`;
            updateCartDisplay();
        });

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
            });
    });

    function showConfirmation(commandId) {
        confirmationText.textContent = `Votre commande a été passée avec succès. ID de Commande: ${commandId}`;
        confirmationContainer.style.display = 'block';
    }

    function addItemToCart(itemData) {
        let found = false;
        cartItems.forEach(item => {
            if (item._id === itemData._id) {
                item.quantity++;
                found = true;
            }
        });
        if (!found) {
            cartItems.push({ _id: itemData._id, name: itemData.name, quantity: 1, price: itemData.price });
        }
        updateCartDisplay();
        saveCartToLocalStorage();
    }

    const addToCartBtn = document.getElementById('addToCartBtn');
    addToCartBtn.addEventListener('click', () => {
        fetch(`https://api.kedufront.juniortaker.com/item/${itemId}`)
            .then(response => response.json())
            .then(data => {
                const itemData = data.item;
                addItemToCart(itemData);
            });
    });
});
