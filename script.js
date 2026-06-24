// script.js
// Wait for DOM to be fully loaded
document.addEventListener('DOMContentLoaded', function() {
    // Initialize all components
    initPreloader();
    initNavigation();
    initHeroSlider();
    initFeaturedItems();
    initMenuItems();
    initCart();
    initThemeToggle();
    initOffersTimer();
    initContactForm();
    initCheckoutModal();
    
    console.log('Why So Cheesy??? Restaurant Website Loaded Successfully!');
});

// Preloader
function initPreloader() {
    const preloader = document.querySelector('.preloader');
    setTimeout(() => {
        preloader.classList.add('fade-out');
        setTimeout(() => {
            preloader.style.display = 'none';
        }, 500);
    }, 1500);
}

// Navigation
function initNavigation() {
    const hamburger = document.getElementById('hamburger');
    const navMenu = document.querySelector('.nav-menu');
    const navLinks = document.querySelectorAll('.nav-link');
    
    hamburger.addEventListener('click', () => {
        hamburger.classList.toggle('active');
        navMenu.classList.toggle('active');
    });
    
    navLinks.forEach(link => {
        link.addEventListener('click', () => {
            hamburger.classList.remove('active');
            navMenu.classList.remove('active');
        });
    });
    
    // Add scroll effect to navbar
    window.addEventListener('scroll', () => {
        const navbar = document.querySelector('.navbar');
        if (window.scrollY > 100) {
            navbar.style.background = 'rgba(255, 255, 255, 0.95)';
            navbar.style.backdropFilter = 'blur(10px)';
        } else {
            navbar.style.background = '';
            navbar.style.backdropFilter = '';
        }
    });
}

// Hero Slider
function initHeroSlider() {
    const slides = document.querySelectorAll('.slide');
    const dots = document.querySelectorAll('.slider-dot');
    let currentSlide = 0;
    
    function showSlide(index) {
        slides.forEach(slide => slide.classList.remove('active'));
        dots.forEach(dot => dot.classList.remove('active'));
        
        slides[index].classList.add('active');
        dots[index].classList.add('active');
        currentSlide = index;
    }
    
    dots.forEach((dot, index) => {
        dot.addEventListener('click', () => showSlide(index));
    });
    
    // Auto slide every 5 seconds
    setInterval(() => {
        let nextSlide = (currentSlide + 1) % slides.length;
        showSlide(nextSlide);
    }, 5000);
    
    // Order button functionality
    document.querySelector('.order-btn').addEventListener('click', function() {
        document.querySelector('#menu').scrollIntoView({ behavior: 'smooth' });
    });
}

// Featured Items Data
const featuredItems = [
    {
        id: 1,
        name: "Jain Special Pizza",
        description: "Loaded with fresh vegetables and special Jain cheese",
        price: 399,
        rating: 5,
        category: "pizza",
        image: "🍕"
    },
    {
        id: 2,
        name: "Cheese Delight Burger",
        description: "Double cheese patty with Jain sauce",
        price: 299,
        rating: 4,
        category: "burger",
        image: "🍔"
    },
    {
        id: 3,
        name: "Cheese Garlic Bread",
        description: "Crispy bread with garlic butter and mozzarella",
        price: 199,
        rating: 5,
        category: "appetizer",
        image: "🍞"
    }
];

function initFeaturedItems() {
    const featuredGrid = document.querySelector('.featured-grid');
    
    featuredItems.forEach(item => {
        const featuredCard = document.createElement('div');
        featuredCard.className = 'featured-card';
        featuredCard.innerHTML = `
            <div class="featured-img" data-food="${item.image}"></div>
            <div class="featured-content">
                <h3>${item.name}</h3>
                <div class="featured-rating">
                    ${'⭐'.repeat(item.rating)}
                </div>
                <p>${item.description}</p>
                <div class="featured-price">
                    <span class="price">₹${item.price}</span>
                    <button class="add-to-cart" data-id="${item.id}">Add to Cart</button>
                </div>
            </div>
        `;
        featuredGrid.appendChild(featuredCard);
    });
    
    // Add event listeners for featured items
    document.querySelectorAll('.add-to-cart').forEach(button => {
        button.addEventListener('click', function() {
            const itemId = parseInt(this.getAttribute('data-id'));
            addToCart(itemId);
        });
    });
}

// Menu Items Data
const menuItems = [
    // Pizzas
    { id: 101, name: "Margherita Pizza", description: "Classic tomato and mozzarella", price: 299, category: "pizza", image: "🍕" },
    { id: 102, name: "Veg Supreme Pizza", description: "Loaded with fresh veggies", price: 399, category: "pizza", image: "🍕" },
    { id: 103, name: "Paneer Tikka Pizza", description: "Spicy paneer cubes on pizza", price: 449, category: "pizza", image: "🍕" },
    
    // Burgers
    { id: 201, name: "Classic Cheese Burger", description: "Double cheese patty", price: 199, category: "burger", image: "🍔" },
    { id: 202, name: "Veg Supreme Burger", description: "With special Jain sauce", price: 249, category: "burger", image: "🍔" },
    { id: 203, name: "Cheese Melt Burger", description: "Extra cheese loaded", price: 299, category: "burger", image: "🍔" },
    
    // Pasta
    { id: 301, name: "White Sauce Pasta", description: "Creamy white sauce pasta", price: 249, category: "pasta", image: "🍝" },
    { id: 302, name: "Red Sauce Pasta", description: "Tangy tomato sauce pasta", price: 229, category: "pasta", image: "🍝" },
    
    // Desserts
    { id: 401, name: "Cheese Cake", description: "New York style cheese cake", price: 199, category: "dessert", image: "🍰" },
    { id: 402, name: "Chocolate Brownie", description: "With vanilla ice cream", price: 149, category: "dessert", image: "🧁" },
    
    // Drinks
    { id: 501, name: "Fresh Lime Soda", description: "Refreshing soda drink", price: 99, category: "drink", image: "🥤" },
    { id: 502, name: "Mango Shake", description: "Fresh mango shake", price: 149, category: "drink", image: "🥛" }
];

function initMenuItems() {
    const menuGrid = document.querySelector('.menu-grid');
    const searchInput = document.getElementById('menu-search');
    const categoryButtons = document.querySelectorAll('.category-btn');
    
    function renderMenu(items) {
        menuGrid.innerHTML = '';
        
        items.forEach(item => {
            const menuCard = document.createElement('div');
            menuCard.className = 'menu-card';
            menuCard.innerHTML = `
                <div class="menu-img" data-category="${item.category}"></div>
                <div class="menu-content">
                    <h3>${item.name}</h3>
                    <p class="menu-desc">${item.description}</p>
                    <div class="menu-footer">
                        <span class="menu-price">₹${item.price}</span>
                        <div class="quantity-controls">
                            <button class="quantity-btn minus" data-id="${item.id}">-</button>
                            <span class="quantity" data-id="${item.id}">0</span>
                            <button class="quantity-btn plus" data-id="${item.id}">+</button>
                        </div>
                    </div>
                </div>
            `;
            menuGrid.appendChild(menuCard);
        });
        
        // Add event listeners for quantity buttons
        document.querySelectorAll('.quantity-btn').forEach(button => {
            button.addEventListener('click', function() {
                const itemId = parseInt(this.getAttribute('data-id'));
                const isPlus = this.classList.contains('plus');
                updateQuantity(itemId, isPlus);
            });
        });
    }
    
    function filterMenu() {
        const searchTerm = searchInput.value.toLowerCase();
        const activeCategory = document.querySelector('.category-btn.active').getAttribute('data-category');
        
        let filteredItems = menuItems;
        
        // Filter by search term
        if (searchTerm) {
            filteredItems = filteredItems.filter(item => 
                item.name.toLowerCase().includes(searchTerm) || 
                item.description.toLowerCase().includes(searchTerm)
            );
        }
        
        // Filter by category
        if (activeCategory !== 'all') {
            filteredItems = filteredItems.filter(item => item.category === activeCategory);
        }
        
        renderMenu(filteredItems);
    }
    
    // Initial render
    renderMenu(menuItems);
    
    // Search functionality
    searchInput.addEventListener('input', filterMenu);
    
    // Category filter functionality
    categoryButtons.forEach(button => {
        button.addEventListener('click', function() {
            categoryButtons.forEach(btn => btn.classList.remove('active'));
            this.classList.add('active');
            filterMenu();
        });
    });
}

// Cart System
let cart = JSON.parse(localStorage.getItem('cart')) || [];

function initCart() {
    const cartIcon = document.getElementById('cart-icon');
    const cartSidebar = document.querySelector('.cart-sidebar');
    const closeCartBtn = document.querySelector('.close-cart');
    const clearCartBtn = document.querySelector('.clear-cart-btn');
    const checkoutBtn = document.querySelector('.checkout-btn');
    
    // Toggle cart sidebar
    cartIcon.addEventListener('click', toggleCart);
    closeCartBtn.addEventListener('click', toggleCart);
    
    // Clear cart
    clearCartBtn.addEventListener('click', clearCart);
    
    // Proceed to checkout
    checkoutBtn.addEventListener('click', proceedToCheckout);
    
    // Close cart when clicking outside
    document.addEventListener('click', (e) => {
        if (!e.target.closest('.cart-sidebar') && 
            !e.target.closest('.cart-icon-container') && 
            cartSidebar.classList.contains('active')) {
            toggleCart();
        }
    });
    
    updateCartCount();
    renderCartItems();
}

function toggleCart() {
    const cartSidebar = document.querySelector('.cart-sidebar');
    cartSidebar.classList.toggle('active');
}

function updateCartCount() {
    const totalItems = cart.reduce((total, item) => total + item.quantity, 0);
    document.querySelector('.cart-count').textContent = totalItems;
}

function renderCartItems() {
    const cartItemsContainer = document.querySelector('.cart-items');
    const cartTotalPrice = document.getElementById('cart-total-price');
    
    if (cart.length === 0) {
        cartItemsContainer.innerHTML = '<p class="empty-cart">Your cart is empty</p>';
        cartTotalPrice.textContent = '0';
        return;
    }
    
    cartItemsContainer.innerHTML = '';
    let totalPrice = 0;
    
    cart.forEach(item => {
        const menuItem = menuItems.find(m => m.id === item.id) || featuredItems.find(f => f.id === item.id);
        if (!menuItem) return;
        
        const itemTotal = menuItem.price * item.quantity;
        totalPrice += itemTotal;
        
        const cartItem = document.createElement('div');
        cartItem.className = 'cart-item';
        cartItem.innerHTML = `
            <div class="cart-item-img"></div>
            <div class="cart-item-info">
                <h4>${menuItem.name}</h4>
                <p class="cart-item-price">₹${menuItem.price} × ${item.quantity} = ₹${itemTotal}</p>
                <div class="cart-item-controls">
                    <button class="quantity-btn minus" data-id="${item.id}">-</button>
                    <span class="quantity">${item.quantity}</span>
                    <button class="quantity-btn plus" data-id="${item.id}">+</button>
                    <span class="remove-item" data-id="${item.id}">Remove</span>
                </div>
            </div>
        `;
        cartItemsContainer.appendChild(cartItem);
    });
    
    cartTotalPrice.textContent = totalPrice;
    
    // Add event listeners for cart item controls
    document.querySelectorAll('.cart-items .quantity-btn').forEach(button => {
        button.addEventListener('click', function() {
            const itemId = parseInt(this.getAttribute('data-id'));
            const isPlus = this.classList.contains('plus');
            updateQuantity(itemId, isPlus);
        });
    });
    
    document.querySelectorAll('.remove-item').forEach(button => {
        button.addEventListener('click', function() {
            const itemId = parseInt(this.getAttribute('data-id'));
            removeFromCart(itemId);
        });
    });
}

function addToCart(itemId) {
    const cartItem = cart.find(item => item.id === itemId);
    
    if (cartItem) {
        cartItem.quantity += 1;
    } else {
        cart.push({ id: itemId, quantity: 1 });
    }
    
    saveCart();
    updateCartCount();
    renderCartItems();
    showToast('Item added to cart! 🍕');
}

function updateQuantity(itemId, increase) {
    const cartItem = cart.find(item => item.id === itemId);
    
    if (cartItem) {
        if (increase) {
            cartItem.quantity += 1;
        } else {
            cartItem.quantity -= 1;
            if (cartItem.quantity <= 0) {
                cart = cart.filter(item => item.id !== itemId);
            }
        }
        
        saveCart();
        updateCartCount();
        renderCartItems();
        
        // Update quantity display in menu
        const quantityDisplay = document.querySelector(`.quantity[data-id="${itemId}"]`);
        if (quantityDisplay) {
            quantityDisplay.textContent = cartItem ? cartItem.quantity : 0;
        }
    }
}

function removeFromCart(itemId) {
    cart = cart.filter(item => item.id !== itemId);
    saveCart();
    updateCartCount();
    renderCartItems();
    showToast('Item removed from cart');
    
    // Update quantity display in menu
    const quantityDisplay = document.querySelector(`.quantity[data-id="${itemId}"]`);
    if (quantityDisplay) {
        quantityDisplay.textContent = 0;
    }
}

function clearCart() {
    cart = [];
    saveCart();
    updateCartCount();
    renderCartItems();
    showToast('Cart cleared');
    
    // Reset all quantity displays
    document.querySelectorAll('.quantity').forEach(display => {
        display.textContent = 0;
    });
}

function saveCart() {
    localStorage.setItem('cart', JSON.stringify(cart));
}

function proceedToCheckout() {
    if (cart.length === 0) {
        showToast('Your cart is empty!');
        return;
    }
    
    // Close cart sidebar
    toggleCart();
    
    // Open checkout modal
    openCheckoutModal();
}

// Toast Notification
function showToast(message) {
    const toast = document.getElementById('toast');
    const toastMessage = toast.querySelector('.toast-message');
    
    toastMessage.textContent = message;
    toast.classList.add('show');
    
    setTimeout(() => {
        toast.classList.remove('show');
    }, 3000);
}

// Theme Toggle
function initThemeToggle() {
    const themeIcon = document.getElementById('theme-icon');
    const themeToggle = document.querySelector('.theme-toggle');
    
    // Check for saved theme preference or default to light
    const savedTheme = localStorage.getItem('theme') || 'light';
    if (savedTheme === 'dark') {
        document.body.classList.add('dark-theme');
        themeIcon.className = 'fas fa-sun';
    }
    
    themeToggle.addEventListener('click', () => {
        document.body.classList.toggle('dark-theme');
        
        if (document.body.classList.contains('dark-theme')) {
            themeIcon.className = 'fas fa-sun';
            localStorage.setItem('theme', 'dark');
        } else {
            themeIcon.className = 'fas fa-moon';
            localStorage.setItem('theme', 'light');
        }
    });
}

// Offers Timer
function initOffersTimer() {
    function updateTimer(timerId, endDate) {
        const timer = document.getElementById(timerId);
        const days = timer.querySelector('.time-value:nth-child(1)');
        const hours = timer.querySelector('.time-value:nth-child(2)');
        const minutes = timer.querySelector('.time-value:nth-child(3)');
        
        function update() {
            const now = new Date();
            const timeRemaining = endDate - now;
            
            if (timeRemaining <= 0) {
                days.textContent = '00';
                hours.textContent = '00';
                minutes.textContent = '00';
                return;
            }
            
            const daysRemaining = Math.floor(timeRemaining / (1000 * 60 * 60 * 24));
            const hoursRemaining = Math.floor((timeRemaining % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
            const minutesRemaining = Math.floor((timeRemaining % (1000 * 60 * 60)) / (1000 * 60));
            
            days.textContent = daysRemaining.toString().padStart(2, '0');
            hours.textContent = hoursRemaining.toString().padStart(2, '0');
            minutes.textContent = minutesRemaining.toString().padStart(2, '0');
        }
        
        update();
        setInterval(update, 60000); // Update every minute
    }
    
    // Set timers for 3 days from now
    const endDate1 = new Date();
    endDate1.setDate(endDate1.getDate() + 3);
    
    const endDate2 = new Date();
    endDate2.setDate(endDate2.getDate() + 2);
    endDate2.setHours(endDate2.getHours() + 12);
    
    updateTimer('timer1', endDate1);
    updateTimer('timer2', endDate2);
}

// Contact Form
function initContactForm() {
    const contactForm = document.getElementById('contactForm');
    const errorMessages = {
        name: document.getElementById('name-error'),
        email: document.getElementById('email-error'),
        phone: document.getElementById('phone-error'),
        message: document.getElementById('message-error')
    };
    
    contactForm.addEventListener('submit', function(e) {
        e.preventDefault();
        
        let isValid = true;
        
        // Clear previous error messages
        Object.values(errorMessages).forEach(error => {
            error.style.display = 'none';
            error.textContent = '';
        });
        
        // Validate name
        const name = document.getElementById('name').value.trim();
        if (!name) {
            errorMessages.name.textContent = 'Name is required';
            errorMessages.name.style.display = 'block';
            isValid = false;
        }
        
        // Validate email
        const email = document.getElementById('email').value.trim();
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!email) {
            errorMessages.email.textContent = 'Email is required';
            errorMessages.email.style.display = 'block';
            isValid = false;
        } else if (!emailRegex.test(email)) {
            errorMessages.email.textContent = 'Please enter a valid email';
            errorMessages.email.style.display = 'block';
            isValid = false;
        }
        
        // Validate phone (optional)
        const phone = document.getElementById('phone').value.trim();
        if (phone && !/^\d{10}$/.test(phone)) {
            errorMessages.phone.textContent = 'Please enter a valid 10-digit phone number';
            errorMessages.phone.style.display = 'block';
            isValid = false;
        }
        
        // Validate message
        const message = document.getElementById('message').value.trim();
        if (!message) {
            errorMessages.message.textContent = 'Message is required';
            errorMessages.message.style.display = 'block';
            isValid = false;
        } else if (message.length < 10) {
            errorMessages.message.textContent = 'Message must be at least 10 characters';
            errorMessages.message.style.display = 'block';
            isValid = false;
        }
        
        if (isValid) {
            // Simulate form submission
            const submitBtn = contactForm.querySelector('.submit-btn');
            const originalText = submitBtn.innerHTML;
            
            submitBtn.innerHTML = '<i class="fas fa-spinner fa-spin"></i> Sending...';
            submitBtn.disabled = true;
            
            setTimeout(() => {
                showToast('Message sent successfully! We\'ll get back to you soon. 🧀');
                contactForm.reset();
                submitBtn.innerHTML = originalText;
                submitBtn.disabled = false;
            }, 1500);
        }
    });
}

// Checkout Modal
function initCheckoutModal() {
    const checkoutModal = document.getElementById('checkoutModal');
    const checkoutBtn = document.querySelector('.checkout-btn');
    const closeCheckoutBtn = document.querySelector('.close-checkout');
    const cancelCheckoutBtn = document.querySelector('.cancel-checkout-btn');
    const confirmOrderBtn = document.querySelector('.confirm-order-btn');
    
    function openCheckoutModal() {
        renderCheckoutItems();
        checkoutModal.classList.add('active');
        document.body.style.overflow = 'hidden'; // Prevent scrolling
    }
    
    function closeCheckoutModal() {
        checkoutModal.classList.remove('active');
        document.body.style.overflow = ''; // Restore scrolling
    }
    
    // Close modal when clicking outside
    checkoutModal.addEventListener('click', (e) => {
        if (e.target === checkoutModal) {
            closeCheckoutModal();
        }
    });
    
    closeCheckoutBtn.addEventListener('click', closeCheckoutModal);
    cancelCheckoutBtn.addEventListener('click', closeCheckoutModal);
    
    confirmOrderBtn.addEventListener('click', function() {
        const address = document.getElementById('delivery-address').value.trim();
        const phone = document.getElementById('checkout-phone').value.trim();
        const paymentMethod = document.getElementById('payment-method').value;
        
        if (!address || !phone || !paymentMethod) {
            showToast('Please fill all the checkout details');
            return;
        }
        
        if (!/^\d{10}$/.test(phone)) {
            showToast('Please enter a valid 10-digit phone number');
            return;
        }
        
        // Simulate order confirmation
        const btn = this;
        const originalText = btn.innerHTML;
        
        btn.innerHTML = '<i class="fas fa-spinner fa-spin"></i> Processing...';
        btn.disabled = true;
        
        setTimeout(() => {
            showToast('Order confirmed! Your food will arrive in 30-40 minutes. Thank you! 🎉');
            clearCart();
            closeCheckoutModal();
            btn.innerHTML = originalText;
            btn.disabled = false;
            
            // Reset checkout form
            document.getElementById('delivery-address').value = '';
            document.getElementById('checkout-phone').value = '';
            document.getElementById('payment-method').value = '';
        }, 2000);
    });
    
    window.openCheckoutModal = openCheckoutModal;
    window.closeCheckoutModal = closeCheckoutModal;
}

function renderCheckoutItems() {
    const checkoutItems = document.querySelector('.checkout-items');
    const checkoutSubtotal = document.getElementById('checkout-subtotal');
    const checkoutTotal = document.getElementById('checkout-total');
    const deliveryCharge = 50;
    
    if (cart.length === 0) {
        checkoutItems.innerHTML = '<p>No items in cart</p>';
        checkoutSubtotal.textContent = '0';
        checkoutTotal.textContent = deliveryCharge;
        return;
    }
    
    checkoutItems.innerHTML = '';
    let subtotal = 0;
    
    cart.forEach(item => {
        const menuItem = menuItems.find(m => m.id === item.id) || featuredItems.find(f => f.id === item.id);
        if (!menuItem) return;
        
        const itemTotal = menuItem.price * item.quantity;
        subtotal += itemTotal;
        
        const checkoutItem = document.createElement('div');
        checkoutItem.className = 'checkout-item';
        checkoutItem.innerHTML = `
            <span>${menuItem.name} × ${item.quantity}</span>
            <span>₹${itemTotal}</span>
        `;
        checkoutItems.appendChild(checkoutItem);
    });
    
    const total = subtotal + deliveryCharge;
    checkoutSubtotal.textContent = subtotal;
    checkoutTotal.textContent = total;
}

// Handle newsletter subscription
document.querySelector('.newsletter-form button').addEventListener('click', function(e) {
    e.preventDefault();
    const emailInput = this.parentElement.querySelector('input');
    const email = emailInput.value.trim();
    
    if (!email) {
        showToast('Please enter your email address');
        return;
    }
    
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
        showToast('Please enter a valid email address');
        return;
    }
    
    // Simulate subscription
    const btn = this;
    const originalHTML = btn.innerHTML;
    
    btn.innerHTML = '<i class="fas fa-spinner fa-spin"></i>';
    btn.disabled = true;
    
    setTimeout(() => {
        showToast('Subscribed successfully! Check your email for exclusive offers. 🧀');
        emailInput.value = '';
        btn.innerHTML = originalHTML;
        btn.disabled = false;
    }, 1500);
});

// Initialize quantity displays from cart
function initQuantityDisplays() {
    cart.forEach(item => {
        const quantityDisplay = document.querySelector(`.quantity[data-id="${item.id}"]`);
        if (quantityDisplay) {
            quantityDisplay.textContent = item.quantity;
        }
    });
}

// Call this after cart is initialized
setTimeout(initQuantityDisplays, 100);
