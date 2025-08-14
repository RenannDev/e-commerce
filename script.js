
// DOM Elements
const menuToggle = document.getElementById('menuToggle');
const closeMenu = document.getElementById('closeMenu');
const mobileMenu = document.getElementById('mobileMenu');
const mobileDropdowns = document.querySelectorAll('.mobile-dropdown');
const filterButtons = document.querySelectorAll('.filter-btn');
const viewButtons = document.querySelectorAll('.view-btn');
const productsGrid = document.getElementById('productsGrid');
const productCards = document.querySelectorAll('.product-card');
const wishlistButtons = document.querySelectorAll('.wishlist-btn');
const cartCount = document.querySelector('.cart-count');
const newsletterForm = document.querySelector('.newsletter-form');

// Mobile Menu Toggle
menuToggle.addEventListener('click', () => {
    mobileMenu.classList.add('active');
});

closeMenu.addEventListener('click', () => {
    mobileMenu.classList.remove('active');
});

// Close mobile menu when clicking outside
document.addEventListener('click', (e) => {
    if (mobileMenu.classList.contains('active') && 
        !mobileMenu.contains(e.target) && 
        e.target !== menuToggle) {
        mobileMenu.classList.remove('active');
    }
});

// Mobile Dropdown Toggle
mobileDropdowns.forEach(dropdown => {
    const link = dropdown.querySelector('a');
    link.addEventListener('click', (e) => {
        e.preventDefault();
        dropdown.classList.toggle('active');
    });
});

// Product Category Filtering
filterButtons.forEach(button => {
    button.addEventListener('click', () => {
        // Remove active class from all buttons
        filterButtons.forEach(btn => btn.classList.remove('active'));
        
        // Add active class to clicked button
        button.classList.add('active');
        
        // Get category filter
        const category = button.dataset.category;
        
        // Filter products
        filterProducts(category);
    });
});

function filterProducts(category) {
    productCards.forEach(card => {
        if (category === 'all' || card.dataset.category === category) {
            card.style.display = 'block';
        } else {
            card.style.display = 'none';
        }
    });
}

// View Mode Toggle (Grid/List)
viewButtons.forEach(button => {
    button.addEventListener('click', () => {
        // Remove active class from all buttons
        viewButtons.forEach(btn => btn.classList.remove('active'));
        
        // Add active class to clicked button
        button.classList.add('active');
        
        // Get view mode
        const viewMode = button.dataset.view;
        
        // Toggle view mode
        toggleViewMode(viewMode);
    });
});

function toggleViewMode(viewMode) {
    if (viewMode === 'list') {
        productsGrid.classList.add('list-view');
    } else {
        productsGrid.classList.remove('list-view');
    }
}

// Wishlist Toggle
wishlistButtons.forEach(button => {
    button.addEventListener('click', function() {
        const icon = this.querySelector('i');
        
        if (icon.classList.contains('far')) {
            icon.classList.remove('far');
            icon.classList.add('fas');
            icon.style.color = '#e11d48';
        } else {
            icon.classList.remove('fas');
            icon.classList.add('far');
            icon.style.color = '';
        }
    });
});

// Add to Cart Functionality
const addToCartButtons = document.querySelectorAll('.add-to-cart');
let cartItems = 3; // Initial cart count

addToCartButtons.forEach(button => {
    button.addEventListener('click', function() {
        // Visual feedback
        const originalText = this.textContent;
        this.textContent = 'Adicionado!';
        this.style.backgroundColor = '#10b981';
        
        // Update cart count
        cartItems++;
        cartCount.textContent = cartItems;
        
        // Reset button after delay
        setTimeout(() => {
            this.textContent = originalText;
            this.style.backgroundColor = '';
        }, 2000);
    });
});

// Newsletter Form Submission
if (newsletterForm) {
    const newsletterInput = newsletterForm.querySelector('input');
    
    newsletterForm.addEventListener('submit', function(e) {
        e.preventDefault();
        
        const email = newsletterInput.value.trim();
        
        if (email) {
            // Simple email validation
            const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
            
            if (emailRegex.test(email)) {
                // Show success message
                const originalButton = newsletterForm.querySelector('button');
                const originalButtonText = originalButton.textContent;
                originalButton.textContent = 'Inscrito!';
                originalButton.style.backgroundColor = '#10b981';
                
                // Clear input
                newsletterInput.value = '';
                
                // Reset button after delay
                setTimeout(() => {
                    originalButton.textContent = originalButtonText;
                    originalButton.style.backgroundColor = '';
                }, 2000);
            } else {
                alert('Por favor, insira um email válido.');
            }
        } else {
            alert('Por favor, insira seu email.');
        }
    });
}

// Smooth Scrolling for Navigation Links
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();
        
        const targetId = this.getAttribute('href');
        if (targetId === '#') return;
        
        const targetElement = document.querySelector(targetId);
        if (targetElement) {
            targetElement.scrollIntoView({
                behavior: 'smooth',
                block: 'start'
            });
            
            // Close mobile menu if open
            if (mobileMenu.classList.contains('active')) {
                mobileMenu.classList.remove('active');
            }
        }
    });
});

// Header scroll effect
window.addEventListener('scroll', () => {
    const header = document.querySelector('.header');
    if (window.scrollY > 100) {
        header.style.boxShadow = '0 4px 12px rgba(0, 0, 0, 0.1)';
        header.style.background = 'rgba(255, 255, 255, 0.95)';
    } else {
        header.style.boxShadow = '0 4px 6px rgba(0, 0, 0, 0.1)';
        header.style.background = 'white';
    }
});

// Product Card Hover Effect Enhancement
productCards.forEach(card => {
    card.addEventListener('mouseenter', function() {
        this.style.transform = 'translateY(-5px)';
    });
    
    card.addEventListener('mouseleave', function() {
        this.style.transform = 'translateY(0)';
    });
});

// Initialize the page
document.addEventListener('DOMContentLoaded', () => {
    // Set initial active filter
    const allFilterButton = document.querySelector('.filter-btn[data-category="all"]');
    if (allFilterButton) {
        allFilterButton.classList.add('active');
    }
    
    // Set initial active view
    const gridViewButton = document.querySelector('.view-btn[data-view="grid"]');
    if (gridViewButton) {
        gridViewButton.classList.add('active');
    }
    
    console.log('Grace & Glory website initialized');
});

// Accessibility improvements
document.addEventListener('keydown', (e) => {
    // Close mobile menu with Escape key
    if (e.key === 'Escape' && mobileMenu.classList.contains('active')) {
        mobileMenu.classList.remove('active');
    }
});

// Lazy loading for images
if ('IntersectionObserver' in window) {
    const imageObserver = new IntersectionObserver((entries, observer) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const img = entry.target;
                img.src = img.dataset.src;
                img.classList.remove('lazy');
                imageObserver.unobserve(img);
            }
        });
    });

    document.querySelectorAll('img[data-src]').forEach(img => {
        imageObserver.observe(img);
    });
}

// Performance optimization - Debounce function
function debounce(func, wait) {
    let timeout;
    return function executedFunction(...args) {
        const later = () => {
            clearTimeout(timeout);
            func(...args);
        };
        clearTimeout(timeout);
        timeout = setTimeout(later, wait);
    };
}

// Optimize scroll events
const optimizedScroll = debounce(() => {
    // Header effect is already optimized
}, 10);

window.addEventListener('scroll', optimizedScroll);

// Export functions for potential external use
window.GraceAndGlory = {
    filterProducts,
    toggleViewMode,
    updateCartCount: (count) => {
        cartItems += count;
        cartCount.textContent = cartItems;
    }
};
