function updateCartDisplay(cartItems, cartContainer, saveCallback) {
    cartContainer.innerHTML = '';
    cartItems.forEach(item => {
        if (item.quantity > 0) {
            const cartItemElement = document.createElement('li');
            cartItemElement.classList.add('cart-item');
            const increaseBtn = document.createElement('button');
            increaseBtn.textContent = '+';
            increaseBtn.addEventListener('click', () => {
                item.quantity++;
                updateCartDisplay(cartItems, cartContainer, saveCallback);
                saveCallback();
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
                updateCartDisplay(cartItems, cartContainer, saveCallback);
                saveCallback();
            });
            cartItemElement.appendChild(document.createTextNode(`${item.name}`));
            cartItemElement.appendChild(decreaseBtn);
            cartItemElement.appendChild(quantityText);
            cartItemElement.appendChild(increaseBtn);
            cartContainer.appendChild(cartItemElement);
        }
    });
}

function saveCartToLocalStorage(cartItems) {
    localStorage.setItem('cartItems', JSON.stringify(cartItems));
}

export { updateCartDisplay, saveCartToLocalStorage };
