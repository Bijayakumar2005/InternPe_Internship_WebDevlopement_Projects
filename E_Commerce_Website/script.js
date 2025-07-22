// Enhanced product data with more items and categories
const products = [
    // Electronics
    {
        id: 1,
        name: "Wireless Noise-Cancelling Headphones",
        price: 249.99,
        originalPrice: 299.99,
        description: "Premium wireless headphones with active noise cancellation and 30-hour battery life.",
        image: "https://images.unsplash.com/photo-1505740420928-5e560c06d30e?ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=60",
        category: "Electronics",
        rating: 4.8,
        reviews: 1245,
        badge: "Bestseller"
    },
    {
        id: 2,
        name: "Smart Watch Pro",
        price: 199.99,
        originalPrice: 249.99,
        description: "Advanced smartwatch with health monitoring, GPS, and water resistance.",
        image: "https://images.unsplash.com/photo-1523275335684-37898b6baf30?ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=60",
        category: "Electronics",
        rating: 4.6,
        reviews: 892,
        badge: "New"
    },
    {
        id: 3,
        name: "Bluetooth Speaker X7",
        price: 129.99,
        description: "Portable waterproof speaker with 360° sound and 24-hour playtime.",
        image: "https://images.unsplash.com/photo-1572569511254-d8f925fe2cbb?ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=60",
        category: "Electronics",
        rating: 4.5,
        reviews: 567
    },
    
    // Fashion
    {
        id: 4,
        name: "Premium Leather Jacket",
        price: 179.99,
        originalPrice: 229.99,
        description: "Genuine leather jacket with premium stitching and lining.",
        image: "https://images.unsplash.com/photo-1551232864-3f0890e580d9?ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=60",
        category: "Fashion",
        rating: 4.7,
        reviews: 342,
        badge: "Popular"
    },
    {
        id: 5,
        name: "Classic Chronograph Watch",
        price: 159.99,
        description: "Elegant stainless steel watch with chronograph function.",
        image: "https://images.unsplash.com/photo-1523170335258-f5ed11844a49?ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=60",
        category: "Fashion",
        rating: 4.9,
        reviews: 1023,
        badge: "Bestseller"
    },
    {
        id: 6,
        name: "Designer Sunglasses",
        price: 89.99,
        originalPrice: 129.99,
        description: "UV protection sunglasses with polarized lenses.",
        image: "https://images.unsplash.com/photo-1511499767150-a48a237f0083?ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=60",
        category: "Fashion",
        rating: 4.4,
        reviews: 456,
        badge: "Sale"
    },
    
    // Home & Living
    {
        id: 7,
        name: "Smart Air Purifier",
        price: 199.99,
        description: "HEPA air purifier with smart sensors and app control.",
        image: "https://images.unsplash.com/photo-1581578731548-c64695cc6952?ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=60",
        category: "Home & Living",
        rating: 4.7,
        reviews: 289
    },
    {
        id: 8,
        name: "Memory Foam Mattress",
        price: 499.99,
        originalPrice: 599.99,
        description: "Queen size memory foam mattress with cooling gel technology.",
        image: "https://images.unsplash.com/photo-1505693416388-ac5ce068fe85?ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=60",
        category: "Home & Living",
        rating: 4.9,
        reviews: 783,
        badge: "Hot Deal"
    },
     
    // Beauty
    {
        id: 10,
        name: "Premium Skincare Set",
        price: 89.99,
        originalPrice: 119.99,
        description: "Complete skincare set with cleanser, serum, and moisturizer.",
        image: "https://images.unsplash.com/photo-1571781926291-c477ebfd024b?ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=60",
        category: "Beauty",
        rating: 4.8,
        reviews: 543,
        badge: "Sale"
    },
    {
        id: 11,
        name: "Professional Hair Dryer",
        price: 79.99,
        description: "Ionic hair dryer with multiple heat settings for salon-quality results.",
        image: "https://images.unsplash.com/photo-1522337360788-8b13dee7a37e?ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=60",
        category: "Beauty",
        rating: 4.5,
        reviews: 321
    },
    {
        id: 12,
        name: "Luxury Perfume Collection",
        price: 129.99,
        description: "Elegant fragrance set with three signature scents.",
        image: "https://images.unsplash.com/photo-1594035910387-fea47794261f?ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=60",
        category: "Beauty",
        rating: 4.7,
        reviews: 412,
        badge: "New"
    }
];

// Shopping cart
let cart = [];

// DOM elements
const productGrid = document.querySelector('.product-grid');
const cartCount = document.querySelector('.cart-count');
const cartIcon = document.querySelector('.cart-icon');
const cartSidebar = document.querySelector('.cart-sidebar');
const overlay = document.querySelector('.overlay');
const closeCartBtn = document.querySelector('.close-cart');
const cartItemsContainer = document.querySelector('.cart-items');
const cartTotal = document.querySelector('.cart-total span');
const checkoutBtn = document.querySelector('.checkout-btn');

// Display products
function displayProducts() {
    productGrid.innerHTML = '';
    
    products.forEach(product => {
        const discount = product.originalPrice 
            ? Math.round(((product.originalPrice - product.price) / product.originalPrice) * 100)
            : 0;
        
        const productCard = document.createElement('div');
        productCard.className = 'product-card';
        
        productCard.innerHTML = `
            ${product.badge ? `<span class="product-badge">${product.badge}</span>` : ''}
            <img src="${product.image}" alt="${product.name}" class="product-img">
            <div class="product-info">
                <h3>${product.name}</h3>
                <p>${product.description}</p>
                <div class="product-price">
                    <span class="current-price">$${product.price.toFixed(2)}</span>
                    ${product.originalPrice ? `
                        <span class="original-price">$${product.originalPrice.toFixed(2)}</span>
                        <span class="discount">${discount}% OFF</span>
                    ` : ''}
                </div>
                <div class="product-rating">
                    <div class="stars">
                        ${generateStars(product.rating)}
                    </div>
                    <span class="review-count">(${product.reviews})</span>
                </div>
                <button class="add-to-cart" data-id="${product.id}">
                    <i class="fas fa-shopping-cart"></i> Add to Cart
                </button>
            </div>
        `;
        
        productGrid.appendChild(productCard);
    });
    
    // Add event listeners to all "Add to Cart" buttons
    document.querySelectorAll('.add-to-cart').forEach(button => {
        button.addEventListener('click', addToCart);
    });
}

// Generate star rating HTML
function generateStars(rating) {
    let stars = '';
    const fullStars = Math.floor(rating);
    const hasHalfStar = rating % 1 >= 0.5;
    
    for (let i = 1; i <= 5; i++) {
        if (i <= fullStars) {
            stars += '<i class="fas fa-star"></i>';
        } else if (i === fullStars + 1 && hasHalfStar) {
            stars += '<i class="fas fa-star-half-alt"></i>';
        } else {
            stars += '<i class="far fa-star"></i>';
        }
    }
    
    return stars;
}

// Add product to cart
function addToCart(e) {
    const productId = parseInt(e.target.getAttribute('data-id'));
    const product = products.find(p => p.id === productId);
    
    // Check if product is already in cart
    const existingItem = cart.find(item => item.id === productId);
    
    if (existingItem) {
        existingItem.quantity += 1;
    } else {
        cart.push({
            ...product,
            quantity: 1
        });
    }
    
    updateCartCount();
    showCartNotification(product.name);
    updateCartSidebar();
}

// Update cart count in header
function updateCartCount() {
    const totalItems = cart.reduce((total, item) => total + item.quantity, 0);
    cartCount.textContent = totalItems;
}

// Show notification when item is added to cart
function showCartNotification(productName) {
    const notification = document.createElement('div');
    notification.className = 'cart-notification';
    notification.innerHTML = `
        <i class="fas fa-check-circle"></i>
        <span>${productName} added to cart!</span>
    `;
    
    document.body.appendChild(notification);
    
    setTimeout(() => {
        notification.classList.add('show');
    }, 10);
    
    setTimeout(() => {
        notification.classList.remove('show');
        setTimeout(() => {
            document.body.removeChild(notification);
        }, 300);
    }, 2000);
}

// Update cart sidebar
function updateCartSidebar() {
    cartItemsContainer.innerHTML = '';
    
    if (cart.length === 0) {
        cartItemsContainer.innerHTML = '<p class="empty-cart">Your cart is empty</p>';
        cartTotal.textContent = '$0.00';
        return;
    }
    
    let total = 0;
    
    cart.forEach(item => {
        const cartItem = document.createElement('div');
        cartItem.className = 'cart-item';
        cartItem.innerHTML = `
            <img src="${item.image}" alt="${item.name}" class="cart-item-img">
            <div class="cart-item-details">
                <h4 class="cart-item-title">${item.name}</h4>
                <p class="cart-item-price">$${item.price.toFixed(2)}</p>
                <div class="cart-item-quantity">
                    <button class="decrease-quantity" data-id="${item.id}">-</button>
                    <span>${item.quantity}</span>
                    <button class="increase-quantity" data-id="${item.id}">+</button>
                </div>
            </div>
            <button class="remove-item" data-id="${item.id}">
                <i class="fas fa-times"></i>
            </button>
        `;
        
        cartItemsContainer.appendChild(cartItem);
        total += item.price * item.quantity;
    });
    
    cartTotal.textContent = `$${total.toFixed(2)}`;
    
    // Add event listeners to quantity buttons
    document.querySelectorAll('.decrease-quantity').forEach(button => {
        button.addEventListener('click', decreaseQuantity);
    });
    
    document.querySelectorAll('.increase-quantity').forEach(button => {
        button.addEventListener('click', increaseQuantity);
    });
    
    document.querySelectorAll('.remove-item').forEach(button => {
        button.addEventListener('click', removeItem);
    });
}

// Decrease item quantity
function decreaseQuantity(e) {
    const productId = parseInt(e.target.getAttribute('data-id'));
    const item = cart.find(item => item.id === productId);
    
    if (item.quantity > 1) {
        item.quantity -= 1;
    } else {
        cart = cart.filter(item => item.id !== productId);
    }
    
    updateCartCount();
    updateCartSidebar();
}

// Increase item quantity
function increaseQuantity(e) {
    const productId = parseInt(e.target.getAttribute('data-id'));
    const item = cart.find(item => item.id === productId);
    
    item.quantity += 1;
    
    updateCartCount();
    updateCartSidebar();
}

// Remove item from cart
function removeItem(e) {
    const productId = parseInt(e.target.closest('button').getAttribute('data-id'));
    cart = cart.filter(item => item.id !== productId);
    
    updateCartCount();
    updateCartSidebar();
}

// Toggle cart sidebar
function toggleCart() {
    cartSidebar.classList.toggle('active');
    overlay.classList.toggle('active');
    document.body.classList.toggle('no-scroll');
}

// Initialize the page
document.addEventListener('DOMContentLoaded', () => {
    displayProducts();
    
    // Add some styles for the notification
    const style = document.createElement('style');
    style.textContent = `
        .cart-notification {
            position: fixed;
            bottom: 20px;
            right: 20px;
            background-color: #10b981;
            color: white;
            padding: 15px 20px;
            border-radius: 5px;
            box-shadow: 0 3px 10px rgba(0,0,0,0.2);
            transform: translateY(100px);
            opacity: 0;
            transition: all 0.3s ease;
            z-index: 1000;
            display: flex;
            align-items: center;
            gap: 10px;
        }
        .cart-notification i {
            font-size: 1.2rem;
        }
        .cart-notification.show {
            transform: translateY(0);
            opacity: 1;
        }
        .empty-cart {
            text-align: center;
            color: #64748b;
            margin-top: 2rem;
        }
        .no-scroll {
            overflow: hidden;
        }
    `;
    document.head.appendChild(style);
    
    // Event listeners
    cartIcon.addEventListener('click', toggleCart);
    closeCartBtn.addEventListener('click', toggleCart);
    overlay.addEventListener('click', toggleCart);
    checkoutBtn.addEventListener('click', () => {
        alert('Proceeding to checkout!');
        toggleCart();
    });
    
    // Initialize empty cart
    updateCartSidebar();
});