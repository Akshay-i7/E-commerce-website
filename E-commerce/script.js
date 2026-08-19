/**
 * TrendCart Interactive Functionality
 */

document.addEventListener('DOMContentLoaded', () => {
    // --------------------------------------------------------------------------
    // 1. Toast Notification System
    // --------------------------------------------------------------------------
    let toastTimeout;
    function showToast(message, icon = '🛍️') {
        let container = document.querySelector('.toast-container');
        if (!container) {
            container = document.createElement('div');
            container.className = 'toast-container';
            document.body.appendChild(container);
        }

        // Clear existing toast if any
        container.innerHTML = '';
        if (toastTimeout) clearTimeout(toastTimeout);

        const toast = document.createElement('div');
        toast.className = 'toast';
        toast.innerHTML = `
            <span class="toast-icon">${icon}</span>
            <span>${message}</span>
        `;
        container.appendChild(toast);

        // Force reflow and show
        setTimeout(() => {
            toast.classList.add('show');
        }, 10);

        toastTimeout = setTimeout(() => {
            toast.classList.remove('show');
            setTimeout(() => toast.remove(), 300);
        }, 3000);
    }

    // --------------------------------------------------------------------------
    // 2. Flash Sale Live Countdown Timer
    // --------------------------------------------------------------------------
    const hoursEl = document.getElementById('timer-hours');
    const minutesEl = document.getElementById('timer-minutes');
    const secondsEl = document.getElementById('timer-seconds');

    if (hoursEl && minutesEl && secondsEl) {
        // Set target duration: 2 hours, 13 minutes, 45 seconds from now
        let totalSeconds = (2 * 3600) + (13 * 60) + 45;

        function updateTimer() {
            if (totalSeconds <= 0) {
                totalSeconds = 24 * 3600; // Reset for demo if finished
            }

            const h = Math.floor(totalSeconds / 3600);
            const m = Math.floor((totalSeconds % 3600) / 60);
            const s = Math.floor(totalSeconds % 60);

            hoursEl.textContent = String(h).padStart(2, '0');
            minutesEl.textContent = String(m).padStart(2, '0');
            secondsEl.textContent = String(s).padStart(2, '0');

            totalSeconds--;
        }

        updateTimer();
        setInterval(updateTimer, 1000);
    }

    // --------------------------------------------------------------------------
    // 3. Cart Counter & Add to Cart Action
    // --------------------------------------------------------------------------
    let cartCount = 0;
    const cartBadge = document.querySelector('.cart-badge');
    const addToCartButtons = document.querySelectorAll('.add-to-cart-btn');

    addToCartButtons.forEach(btn => {
        btn.addEventListener('click', (e) => {
            e.preventDefault();
            cartCount++;
            if (cartBadge) {
                cartBadge.textContent = cartCount;
                cartBadge.style.transform = 'scale(1.3)';
                setTimeout(() => {
                    cartBadge.style.transform = 'scale(1)';
                }, 200);
            }

            const card = btn.closest('.product-card');
            const productName = card ? card.querySelector('.product-title').textContent : 'Item';
            showToast(`${productName} added to your cart!`, '🛒');

            // Quick button feedback
            const originalContent = btn.innerHTML;
            btn.innerHTML = `
                <svg viewBox="0 0 24 24" width="16" height="16" stroke="currentColor" stroke-width="2.5" fill="none">
                    <polyline points="20 6 9 17 4 12"></polyline>
                </svg>
                Added!
            `;
            btn.style.backgroundColor = '#16A34A';

            setTimeout(() => {
                btn.innerHTML = originalContent;
                btn.style.backgroundColor = '';
            }, 1200);
        });
    });

    // --------------------------------------------------------------------------
    // 4. Wishlist Toggle
    // --------------------------------------------------------------------------
    const wishlistButtons = document.querySelectorAll('.wishlist-btn');

    wishlistButtons.forEach(btn => {
        btn.addEventListener('click', (e) => {
            e.preventDefault();
            btn.classList.toggle('active');
            const isActive = btn.classList.contains('active');
            const card = btn.closest('.product-card');
            const productName = card ? card.querySelector('.product-title').textContent : 'Item';

            if (isActive) {
                btn.innerHTML = `
                    <svg viewBox="0 0 24 24" width="18" height="18" fill="#EF4444" stroke="#EF4444" stroke-width="2">
                        <path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z"></path>
                    </svg>
                `;
                showToast(`Added ${productName} to wishlist!`, '❤️');
            } else {
                btn.innerHTML = `
                    <svg viewBox="0 0 24 24" width="18" height="18" fill="none" stroke="currentColor" stroke-width="2">
                        <path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z"></path>
                    </svg>
                `;
                showToast(`Removed from wishlist`, '💔');
            }
        });
    });

    // --------------------------------------------------------------------------
    // 5. Category Navigation Active Switcher
    // --------------------------------------------------------------------------
    const categoryItems = document.querySelectorAll('.category-item');
    categoryItems.forEach(item => {
        item.addEventListener('click', (e) => {
            categoryItems.forEach(i => i.classList.remove('active'));
            item.classList.add('active');
        });
    });

    // --------------------------------------------------------------------------
    // 6. Newsletter Subscription Form
    // --------------------------------------------------------------------------
    const newsletterForm = document.querySelector('.newsletter-form');
    if (newsletterForm) {
        newsletterForm.addEventListener('submit', (e) => {
            e.preventDefault();
            const input = newsletterForm.querySelector('.newsletter-input');
            if (input && input.value.trim() !== '') {
                showToast('Thank you for subscribing to our newsletter!', '✉️');
                input.value = '';
            }
        });
    }

    // --------------------------------------------------------------------------
    // 7. Search Form Handler
    // --------------------------------------------------------------------------
    const searchBtn = document.querySelector('.search-btn');
    const searchInput = document.querySelector('.search-input');
    if (searchBtn && searchInput) {
        const handleSearch = () => {
            const query = searchInput.value.trim();
            if (query) {
                showToast(`Searching for "${query}"...`, '🔍');
            }
        };
        searchBtn.addEventListener('click', handleSearch);
        searchInput.addEventListener('keydown', (e) => {
            if (e.key === 'Enter') handleSearch();
        });
    }

    // --------------------------------------------------------------------------
    // 8. Hero Dots Slider Interaction
    // --------------------------------------------------------------------------
    const heroDots = document.querySelectorAll('.hero-dots .dot');
    heroDots.forEach((dot, index) => {
        dot.addEventListener('click', () => {
            heroDots.forEach(d => d.classList.remove('active'));
            dot.classList.add('active');
            showToast(`Switched to promotional banner #${index + 1}`, '✨');
        });
    });
});
