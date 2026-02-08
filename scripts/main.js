document.addEventListener('DOMContentLoaded', () => {
    // 1. Hero Video Handling
    const heroVideo = document.querySelector('.hero-video');
    if (heroVideo) {
        heroVideo.playbackRate = 0.8; // Slow down slightly for more sensual feel
    }

    // 2. Audio Waveform Animation (Simulated)
    const bars = document.querySelectorAll('.wave-bar');
    bars.forEach(bar => {
        // Randomize initial delay and duration for organic feel
        const duration = 0.8 + Math.random() * 0.8;
        const delay = Math.random() * -1;
        bar.style.animationDuration = `${duration}s`;
        bar.style.animationDelay = `${delay}s`;
    });

    // 3. Smooth Scroll (Mobile UX Optimized)
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            e.preventDefault();
            const targetId = this.getAttribute('href');
            if (targetId === '#') return;

            const targetElement = document.querySelector(targetId);
            if (targetElement) {
                const headerOffset = 80;
                const elementPosition = targetElement.getBoundingClientRect().top;
                const offsetPosition = elementPosition + window.pageYOffset - headerOffset;

                window.scrollTo({
                    top: offsetPosition,
                    behavior: 'smooth'
                });
            }
        });
    });

    // 4.// Intersection Observer for Scroll Animations
    const observeElements = () => {
        const observer = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    entry.target.classList.add('visible');
                    // Optional: stop observing once animate
                    // observer.unobserve(entry.target);
                }
            });
        }, {
            threshold: 0.15,
            rootMargin: '0px 0px -50px 0px'
        });

        document.querySelectorAll('.animate-on-scroll').forEach(el => {
            observer.observe(el);
        });
    };

    // Cinematic Floating FX (Parallax)
    const initParallax = () => {
        window.addEventListener('scroll', () => {
            const scrolled = window.pageYOffset;

            // Move orbs slightly slower for depth
            const orbs = document.querySelectorAll('.glow-orb');
            orbs.forEach((orb, index) => {
                const speed = 0.1 + (index * 0.05);
                orb.style.transform = `translateY(${scrolled * speed}px)`;
            });

            // Rotate rings or other elements
            const rings = document.querySelectorAll('.floating-ring');
            rings.forEach(ring => {
                ring.style.transform = `translate(-50%, -50%) rotate(${scrolled * 0.05}deg)`;
            });
        });
    };

    // Initialize
    // The main DOMContentLoaded listener already exists, so we'll just call these functions within it.
    observeElements();
    initParallax();

    // Smooth Header
    const header = document.querySelector('.site-header');
    window.addEventListener('scroll', () => {
        if (window.scrollY > 50) {
            header.classList.add('scrolled');
        } else {
            header.classList.remove('scrolled');
        }
    });

    // 5. Pricing Toggle Logic
    const toggleContainer = document.getElementById('planToggle');
    const priceDisplay = document.querySelector('.plan-price');
    const planDetails = document.querySelector('.plan-details');

    if (toggleContainer) {
        const options = toggleContainer.querySelectorAll('.toggle-option');

        // Init state - precise width for initial active item
        const initialActive = toggleContainer.querySelector('.toggle-option.active');
        const bg = toggleContainer.querySelector('.toggle-bg');
        if (initialActive && bg) {
            bg.style.width = initialActive.offsetWidth + 'px';
        }

        options.forEach(option => {
            option.addEventListener('click', () => {
                // Update specific active class
                options.forEach(opt => opt.classList.remove('active'));
                option.classList.add('active');

                // Update container state for background sliding
                const planType = option.dataset.plan;
                toggleContainer.dataset.active = planType;

                // Adjust sliding background width/position manually for perfect fit
                if (bg) {
                    if (planType === 'monthly') {
                        bg.style.transform = 'translateX(0)';
                        bg.style.width = option.offsetWidth + 'px';
                    } else {
                        // Yearly - offset by monthly width
                        const monthlyWidth = options[0].offsetWidth;
                        bg.style.transform = `translateX(${monthlyWidth}px)`;
                        bg.style.width = option.offsetWidth + 'px';
                    }
                }

                // Update content with Fade effect
                if (priceDisplay && planDetails) {
                    priceDisplay.style.opacity = 0;
                    planDetails.style.opacity = 0;

                    setTimeout(() => {
                        if (planType === 'yearly') {
                            priceDisplay.innerHTML = '$7.50 <span>/ month</span>';
                            planDetails.textContent = 'Billed $89.99 annually. Cancel anytime.';
                        } else {
                            priceDisplay.innerHTML = '$9.99 <span>/ month</span>';
                            planDetails.textContent = 'Billed monthly. Cancel anytime.';
                        }
                        priceDisplay.style.opacity = 1;
                        planDetails.style.opacity = 1;
                    }, 200);
                }
            });
        });
    }
    // 6. Music Player Functional Logic
    const playerCard = document.getElementById('music-player');
    const audio = document.getElementById('player-audio');
    const progressFill = document.querySelector('.progress-fill');

    if (playerCard && audio) {
        playerCard.addEventListener('click', () => {
            if (audio.paused) {
                audio.play();
                playerCard.classList.add('playing');
            } else {
                audio.pause();
                playerCard.classList.remove('playing');
            }
        });

        // Update Progress Bar
        audio.addEventListener('timeupdate', () => {
            const progress = (audio.currentTime / audio.duration) * 100;
            if (progressFill) progressFill.style.width = `${progress}%`;
        });
    }
});
