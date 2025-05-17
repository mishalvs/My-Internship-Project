let cart = JSON.parse(localStorage.getItem('cart')) || [];
updateCartCount();

// Add item to cart
function addToCart(name, price) {
    cart.push({ name, price });
    localStorage.setItem('cart', JSON.stringify(cart));
    updateCartCount();
    alert(`${name} added to cart!`);
}

// Update cart count in navbar
function updateCartCount() {
    const cartCount = document.getElementById('cart-count');
    if (cartCount) cartCount.textContent = cart.length;
}

// Display cart items (for cart.html)
function displayCartItems() {
    const container = document.getElementById('cart-items');
    const total = document.getElementById('total-price');
    if (!container) return;

    container.innerHTML = '';
    let totalPrice = 0;

    cart.forEach(item => {
        const div = document.createElement('div');
        div.className = 'cart-item';
        div.innerHTML = `<p>${item.name} - $${item.price}</p>`;
        container.appendChild(div);
        totalPrice += item.price;
    });

    total.textContent = `Total: $${totalPrice.toFixed(2)}`;
}

// Clear cart
function clearCart() {
    cart = [];
    localStorage.removeItem('cart');
    displayCartItems();
    updateCartCount();
}

// Run on cart page
if (window.location.pathname.includes('cart.html')) {
    displayCartItems();
}
