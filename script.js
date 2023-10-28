document.addEventListener("DOMContentLoaded", function () {
    const cartIcon = document.getElementById("cart-icon");
    const cartCountElement = document.getElementById("cart-count");
    let cartCount = 0;
    let cartItems = [];
    let subtotal = 0; // Initialize subtotal to 0
    const shipping = 0; // Initialize shipping to 0

    const updateCartCount = () => {
        cartCountElement.innerText = cartCount;
    };

    const addToCart = (productName, price) => {
        cartCount++;
        cartItems.push({ name: productName, price: price });
        updateCartCount();
        updateCartDisplay();
    };

    const openCartPage = () => {
        const cartItemsParam = encodeURIComponent(JSON.stringify(cartItems));
        const totalPriceParam = calculateTotalPrice(); // Calculate the total price

        const url = `cart.html?cartItems=${cartItemsParam}&totalPrice=${totalPriceParam}`;
        window.open(url, '_blank');
    };

    const updateCartDisplay = () => {
        const cartTableBody = document.querySelector("#cart-container tbody");
        cartTableBody.innerHTML = ""; // Clear the existing cart content

        subtotal = 0; // Recalculate subtotal when updating the cart display

        cartItems.forEach(item => {
            const price = parseFloat(item.price.replace("$", ""));
            const total = price;
            subtotal += total;

            cartTableBody.innerHTML += `
                <tr>
                    <td><a href="#" class="remove-item">Remove</a></td>
                    <td><img src="Images/black tws 2.jpg" alt="Product Image"></td>
                    <td>
                        <h5>${item.name}</h5>
                    </td>
                    <td>
                        <h5>${item.price}</h5>
                    </td>
                    <td><input class="w-25 pl-1" value="1" type="number"></td>
                    <td>
                        <h5>$${total.toFixed(2)}</h5>
                    </td>
                </tr>
            `;
        });

        // Update the cart total, subtotal, and shipping
        updateCartTotal();
    };

    const updateCartTotal = () => {
        const cartTotalElement = document.getElementById("cart-total");
        const shippingElement = document.getElementById("shipping");
        const subtotalElement = document.getElementById("subtotal");

        const total = calculateTotalPrice();
        const shippingCost = calculateShippingCost(); // You can add your shipping cost calculation here

        cartTotalElement.textContent = `$${total.toFixed(2)}`;
        shippingElement.textContent = `$${shippingCost.toFixed(2)}`;
        subtotalElement.textContent = `$${subtotal.toFixed(2)}`;
    };

    const calculateTotalPrice = () => {
        // Calculate the total price based on the items in the cart
        let total = subtotal;
        return total;
    };

    const calculateShippingCost = () => {
        // Calculate the shipping cost
        return shipping;
    };

    // Initialize cart count
    updateCartCount();

    const addToCartButtons = document.querySelectorAll(".add-to-cart");
    addToCartButtons.forEach(button => {
        button.addEventListener("click", function () {
            const productBox = this.closest(".box");
            const productName = productBox.querySelector("h3").innerText;
            const price = productBox.querySelector(".price a").textContent;
            addToCart(productName, price);
        });
    });

    cartIcon.addEventListener("click", openCartPage);

    if (window.location.pathname.includes("cart.html")) {
        // Cart page-specific code
        const cartItemsParam = new URLSearchParams(window.location.search).get("cartItems");
        const totalPriceParam = new URLSearchParams(window.location.search).get("totalPrice");
        cartItems = JSON.parse(decodeURIComponent(cartItemsParam));
        updateCartDisplay();
    }
});
