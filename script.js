/* ============================================
   SENSUAL - Landing Page JavaScript
   Countdown, FAQ, Carousel Interactions
   ============================================ */

// ============ Countdown Timer ============
class CountdownTimer {
    constructor() {
        this.hoursEl = document.getElementById('hours');
        this.minutesEl = document.getElementById('minutes');
        this.secondsEl = document.getElementById('seconds');

        // Set initial time: 2 hours, 8 minutes, 12 seconds
        this.totalSeconds = 2 * 3600 + 8 * 60 + 12;

        this.init();
    }

    init() {
        this.update();
        setInterval(() => this.tick(), 1000);
    }

    tick() {
        if (this.totalSeconds > 0) {
            this.totalSeconds--;
            this.update();
        }
    }

    update() {
        const hours = Math.floor(this.totalSeconds / 3600);
        const minutes = Math.floor((this.totalSeconds % 3600) / 60);
        const seconds = this.totalSeconds % 60;

        this.hoursEl.textContent = String(hours).padStart(2, '0');
        this.minutesEl.textContent = String(minutes).padStart(2, '0');
        this.secondsEl.textContent = String(seconds).padStart(2, '0');
    }
}

// Initialize countdown
new CountdownTimer();

// ============ FAQ Accordion ============
const faqItems = document.querySelectorAll('.faq-item');

faqItems.forEach(item => {
    const question = item.querySelector('.faq-question');

    question.addEventListener('click', () => {
        // Close other items
        faqItems.forEach(otherItem => {
            if (otherItem !== item && otherItem.classList.contains('open')) {
                otherItem.classList.remove('open');
            }
        });

        // Toggle current item
        item.classList.toggle('open');
    });
});

// ============ Reviews Carousel ============
class ReviewsCarousel {
    constructor() {
        this.track = document.getElementById('reviewsTrack');
        this.dots = document.querySelectorAll('.carousel-dots .dot');
        this.cards = this.track?.querySelectorAll('.review-card') || [];
        this.currentIndex = 2; // Start at 3rd review (matching reference)

        this.init();
    }

    init() {
        if (!this.track || this.cards.length === 0) return;

        // Scroll to initial position
        this.scrollToIndex(this.currentIndex, false);

        // Click on dots
        this.dots.forEach((dot, index) => {
            dot.addEventListener('click', () => {
                this.scrollToIndex(index);
            });
        });

        // Track scroll to update dots
        this.track.addEventListener('scroll', () => {
            this.updateDots();
        });

        // Auto-scroll every 5 seconds
        this.autoScrollInterval = setInterval(() => {
            this.next();
        }, 5000);

        // Pause on hover
        this.track.addEventListener('mouseenter', () => {
            clearInterval(this.autoScrollInterval);
        });

        this.track.addEventListener('mouseleave', () => {
            this.autoScrollInterval = setInterval(() => {
                this.next();
            }, 5000);
        });
    }

    scrollToIndex(index, smooth = true) {
        if (index < 0) index = this.cards.length - 1;
        if (index >= this.cards.length) index = 0;

        this.currentIndex = index;

        const card = this.cards[index];
        if (card) {
            // Fix: Use container scroll instead of scrollIntoView to prevent page jumping
            const cardLeft = card.offsetLeft;
            this.track.scrollTo({
                left: cardLeft,
                behavior: smooth ? 'smooth' : 'auto'
            });
        }

        this.updateDots();
    }

    updateDots() {
        const scrollLeft = this.track.scrollLeft;
        const cardWidth = this.cards[0]?.offsetWidth || 0;
        const newIndex = Math.round(scrollLeft / cardWidth);

        this.dots.forEach((dot, index) => {
            dot.classList.toggle('active', index === newIndex);
        });
    }

    next() {
        this.scrollToIndex(this.currentIndex + 1);
    }
}

new ReviewsCarousel();

// ============ Benefits Slider ============
// Removed auto-scroll hint to prevent page jumping
class BenefitsSlider {
    constructor() {
        this.slider = document.querySelector('.benefits-slider');
    }
}

new BenefitsSlider();

// ============ Pricing Card Selection ============
const pricingCards = document.querySelectorAll('.pricing-card');

pricingCards.forEach(card => {
    card.addEventListener('click', () => {
        pricingCards.forEach(c => c.classList.remove('selected'));
        card.classList.add('selected');
    });
});

// ============ Continue Button ============
const continueBtn = document.getElementById('continueBtn');

continueBtn?.addEventListener('click', () => {
    // Simulate app store redirect
    const isIOS = /iPad|iPhone|iPod/.test(navigator.userAgent);
    const isAndroid = /Android/.test(navigator.userAgent);

    if (isIOS) {
        alert('Redirecting to App Store...');
        // window.location.href = 'https://apps.apple.com/';
    } else if (isAndroid) {
        alert('Redirecting to Google Play Store...');
        // window.location.href = 'https://play.google.com/';
    } else {
        alert('Thank you for your interest! Download the app on your mobile device.');
    }
});

// ============ Close Button ============
const closeBtn = document.querySelector('.close-btn');

closeBtn?.addEventListener('click', () => {
    if (confirm('Are you sure you want to leave? You might miss out on this exclusive offer!')) {
        window.history.back();
    }
});

// ============ Category Tags ============
const categoryTags = document.querySelectorAll('.category-tag');

categoryTags.forEach(tag => {
    tag.addEventListener('click', () => {
        tag.classList.toggle('highlight');
    });
});

// ============ Smooth Scroll for Internal Links ============
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();
        const target = document.querySelector(this.getAttribute('href'));
        if (target) {
            target.scrollIntoView({
                behavior: 'smooth',
                block: 'start'
            });
        }
    });
});

// ============ Intersection Observer for Animations ============
const observerOptions = {
    threshold: 0.1,
    rootMargin: '0px 0px -50px 0px'
};

const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.style.opacity = '1';
            entry.target.style.transform = 'translateY(0)';
        }
    });
}, observerOptions);

// Observe all sections
document.querySelectorAll('section').forEach(section => {
    section.style.opacity = '0';
    section.style.transform = 'translateY(20px)';
    section.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
    observer.observe(section);
});

// ============ Story Cards Interaction ============
const storyCards = document.querySelectorAll('.story-card');

storyCards.forEach(card => {
    card.addEventListener('click', () => {
        // Simulate story preview
        const title = card.querySelector('.story-badge')?.textContent || 'Story';
        const description = card.querySelector('.story-description')?.textContent || '';

        // Add a subtle animation
        card.style.transform = 'scale(0.98)';
        setTimeout(() => {
            card.style.transform = 'scale(1)';
        }, 150);
    });
});

// ============ "More Options" Button ============
const moreOptionsBtns = document.querySelectorAll('.more-options-btn');

moreOptionsBtns.forEach(btn => {
    btn.addEventListener('click', () => {
        // Find parent section and scroll to the next one
        const currentSection = btn.closest('section');
        const nextSection = currentSection?.nextElementSibling;

        if (nextSection) {
            nextSection.scrollIntoView({
                behavior: 'smooth',
                block: 'start'
            });
        }
    });
});

// ============ Touch Interactions for Mobile ============
let touchStartY = 0;

document.addEventListener('touchstart', (e) => {
    touchStartY = e.touches[0].clientY;
}, { passive: true });

document.addEventListener('touchmove', (e) => {
    // Parallax disabled to prevent scroll jitter
    /* 
    const touchY = e.touches[0].clientY;
    const diff = touchStartY - touchY;

    const bgGradient = document.querySelector('.bg-gradient');
    if (bgGradient) {
        bgGradient.style.transform = `translateY(${diff * 0.1}px)`;
    } 
    */
}, { passive: true });

// ============ Haptic Feedback Simulation ============
function vibrate(pattern = 10) {
    if ('vibrate' in navigator) {
        navigator.vibrate(pattern);
    }
}

// Add haptic feedback to interactive elements
document.querySelectorAll('.continue-btn, .pricing-card, .category-tag, .faq-question').forEach(el => {
    el.addEventListener('click', () => vibrate());
});

// ============ Performance: Pause animations when not visible ============
document.addEventListener('visibilitychange', () => {
    if (document.hidden) {
        document.querySelectorAll('[style*="animation"]').forEach(el => {
            el.style.animationPlayState = 'paused';
        });
    } else {
        document.querySelectorAll('[style*="animation"]').forEach(el => {
            el.style.animationPlayState = 'running';
        });
    }
});

// ============ Console Branding ============
console.log('%c🔥 Sensual', 'font-size: 24px; font-weight: bold; color: #ff1493;');
console.log('%cUnlock your deepest fantasies', 'font-size: 14px; color: #ff69b4;');
