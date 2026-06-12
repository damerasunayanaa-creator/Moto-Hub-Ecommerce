document.addEventListener('DOMContentLoaded', () => {
    // Get elements
    const addToCartButtons = document.querySelectorAll('.add-to-cart');

    // Add event listeners to "Add to Cart" buttons
    addToCartButtons.forEach(button => {
        button.addEventListener('click', (event) => {
            const productElement = event.target.closest('.product');
            const productId = productElement.querySelector('h2').textContent;
            const productImage = productElement.querySelector('img').src;
            const productPrice = productElement.querySelector('.price').textContent;
            const productDescription = productElement.querySelector('.description').textContent;

            // Create a product object
            const product = {
                id: productId,
                image: productImage,
                price: productPrice,
                description: productDescription
            };

            // Get existing cart items from localStorage
            const cart = JSON.parse(localStorage.getItem('cart')) || [];

            // Add the new product to the cart
            cart.push(product);

            // Save the updated cart to localStorage
            localStorage.setItem('cart', JSON.stringify(cart));

            // Optionally, show an alert or update UI to confirm the addition
            alert('Product added to cart!');
        });
    });
});


document.addEventListener('DOMContentLoaded', () => {
    const cartItemsContainer = document.getElementById('cart-items');

    // Load cart items from localStorage
    const cart = JSON.parse(localStorage.getItem('cart')) || [];

    // Function to render cart items
    function renderCartItems() {
        cartItemsContainer.innerHTML = '';
        if (cart.length === 0) {
            cartItemsContainer.innerHTML = '<p>Your cart is empty.</p>';
        } else {
            cart.forEach((item, index) => {
                const cartItemHTML = `
                    <div class="cart-item">
                        <div class="cart-item-image">
                            <img src="${item.image}" alt="${item.id}">
                        </div>
                        <div class="cart-item-details">
                            <h3>${item.id}</h3>
                            <p class="description">${item.description}</p>
                            <p class="price">${item.price}</p>
                        </div>
                        <button class="remove-from-cart" data-index="${index}">Remove</button>
                    </div>
                `;
                cartItemsContainer.innerHTML += cartItemHTML;
            });

            // Add event listeners to remove buttons
            const removeButtons = document.querySelectorAll('.remove-from-cart');
            removeButtons.forEach(button => {
                button.addEventListener('click', (event) => {
                    const index = event.target.getAttribute('data-index');
                    removeItemFromCart(index);
                });
            });
        }
    }

    // Function to remove item from cart
    function removeItemFromCart(index) {
        // Remove the item from the cart array
        cart.splice(index, 1);
        // Update the localStorage
        localStorage.setItem('cart', JSON.stringify(cart));
        // Re-render the cart items
        renderCartItems();
    }

    // Initial rendering of cart items
    renderCartItems();
});

// Function to handle mouse hover
function handleMouseOver(event) {
    const product = event.currentTarget;
    // Example: Add a CSS class to highlight the product
    product.classList.add('hovered');
    // Example: Log the product name
    console.log('Mouse over:', product.querySelector('h2').textContent);
}

function handleMouseOut(event) {
    const product = event.currentTarget;
    // Example: Remove the CSS class used for highlighting
    product.classList.remove('hovered');
    // Example: Log the product name
    console.log('Mouse out:', product.querySelector('h2').textContent);
}

// Add event listeners to all product elements
document.querySelectorAll('.product').forEach(product => {
    product.addEventListener('mouseover', handleMouseOver);
    product.addEventListener('mouseout', handleMouseOut);
});


// Function to handle mouse over to zoom in
function zoomIn(event) {
    const img = event.currentTarget.querySelector('img');
    img.style.transform = 'scale(1.2)'; // Zoom in
}

// Function to handle mouse out to zoom out
function zoomOut(event) {
    const img = event.currentTarget.querySelector('img');
    img.style.transform = 'scale(1)'; // Zoom out
}

// Add event listeners to all product image containers
document.querySelectorAll('.product-image').forEach(productImage => {
    productImage.addEventListener('mouseover', zoomIn);
    productImage.addEventListener('mouseout', zoomOut);
});



document.addEventListener('DOMContentLoaded', () => {
    // Function to handle the display of payment methods
    function displayPaymentMethods() {
        const paymentSection = document.getElementById('payment-methods');
        paymentSection.style.display = 'block'; // Show the payment methods section
    }

    // Function to toggle payment details based on the selected payment method
    function togglePaymentDetails(method) {
        // Hide all payment details sections
        document.getElementById('card-details').style.display = 'none';
        document.getElementById('phonepe-details').style.display = 'none';
        document.getElementById('qr-scanner').style.display = 'none';

        if (method === 'Card') {
            document.getElementById('card-details').style.display = 'block'; // Show card details
        } else if (method === 'PhonePe') {
            document.getElementById('phonepe-details').style.display = 'block'; // Show PhonePe QR code
        } else if (method === 'QR Scanner') {
            document.getElementById('qr-scanner').style.display = 'block'; // Show QR scanner
        }
    }

    // Function to handle the "Proceed to Payment" button click
    function payNow() {
        const paymentSection = document.getElementById('payment-methods');
        const orderDetailsSection = document.getElementById('order-details');
        const orderTrackingSection = document.getElementById('order-tracking');

        // Hide payment methods and show order details
        paymentSection.style.display = 'none';
        orderDetailsSection.style.display = 'block';
        orderTrackingSection.style.display = 'block';

        // You can add code here to handle the actual payment processing and order confirmation
    }

    // Add event listeners
    document.querySelector('.checkout-btn').addEventListener('click', displayPaymentMethods);
    document.querySelectorAll('input[name="payment-method"]').forEach(input => {
        input.addEventListener('change', (event) => {
            togglePaymentDetails(event.target.value);
        });
    });
    document.querySelector('.pay-now-btn').addEventListener('click', payNow);

    // Optionally, you could add code here to dynamically populate cart items and reviews if needed
});



// Function to handle adding products to the cart
document.querySelectorAll('.add-to-cart').forEach(button => {
    button.addEventListener('click', () => {
        const productElement = button.closest('.product');
        const productName = productElement.querySelector('h2').textContent;
        const productPrice = parseFloat(productElement.querySelector('.price').textContent.replace('$', ''));

        // For simplicity, we just log the product info here
        console.log(`Added to cart: ${productName} - $${productPrice.toFixed(2)}`);
        // In a real application, you'd update the cart UI or local storage here
    });
});

// Function to submit reviews
function submitReview(event, formId, reviewsContainerId) {
    event.preventDefault();

    const form = document.getElementById(formId);
    const reviewContent = form.querySelector('textarea').value;

    if (reviewContent.trim() === '') {
        alert('Please enter a review.');
        return;
    }

    const reviewsContainer = document.getElementById(reviewsContainerId);
    const reviewElement = document.createElement('div');
    reviewElement.className = 'review';
    reviewElement.textContent = reviewContent;

    reviewsContainer.appendChild(reviewElement);

    form.reset(); // Clear the form
}

// Attach review submit event handlers
document.querySelectorAll('form').forEach(form => {
    form.addEventListener('submit', function(event) {
        const formId = this.id;
        const reviewsContainerId = formId.replace('form', 'reviews-container');
        submitReview(event, formId, reviewsContainerId);
    });
});


// Function to handle sorting products
document.getElementById('sort-options').addEventListener('change', function() {
    const sortOption = this.value;
    const productsContainer = document.querySelector('main');
    const products = Array.from(document.querySelectorAll('.product'));

    products.sort((a, b) => {
        const aName = a.querySelector('h2').textContent.toLowerCase();
        const bName = b.querySelector('h2').textContent.toLowerCase();
        const aPrice = parseFloat(a.querySelector('.price').textContent.replace('$', ''));
        const bPrice = parseFloat(b.querySelector('.price').textContent.replace('$', ''));

        switch (sortOption) {
            case 'price-asc':
                return aPrice - bPrice;
            case 'price-desc':
                return bPrice - aPrice;
            case 'name-asc':
                return aName.localeCompare(bName);
            case 'name-desc':
                return bName.localeCompare(aName);
            default:
                return 0;
        }
    });

    products.forEach(product => productsContainer.appendChild(product));
});
