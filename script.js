// Mobile menu toggle
document.addEventListener('DOMContentLoaded', function() {
    const mobileMenuToggle = document.querySelector('.mobile-menu-toggle');
    const navMenu = document.querySelector('.nav-menu');

    if (mobileMenuToggle && navMenu) {
        mobileMenuToggle.addEventListener('click', function() {
            navMenu.classList.toggle('active');
            this.classList.toggle('active');
        });

        // Close menu when clicking on a link
        const navLinks = navMenu.querySelectorAll('a');
        navLinks.forEach(link => {
            link.addEventListener('click', function() {
                navMenu.classList.remove('active');
                mobileMenuToggle.classList.remove('active');
            });
        });

        // Close menu when clicking outside
        document.addEventListener('click', function(event) {
            if (!navMenu.contains(event.target) && !mobileMenuToggle.contains(event.target)) {
                navMenu.classList.remove('active');
                mobileMenuToggle.classList.remove('active');
            }
        });
    }

    // Smooth scroll for anchor links in navigation
    const navLinks = document.querySelectorAll('.nav-menu a[href^="#"]');
    navLinks.forEach(link => {
        link.addEventListener('click', function(e) {
            const href = this.getAttribute('href');
            if (href !== '#' && href.length > 1) {
                e.preventDefault();
                const targetId = href.substring(1);
                const target = document.getElementById(targetId);
                
                if (target) {
                    const headerOffset = 100;
                    const elementPosition = target.getBoundingClientRect().top;
                    const offsetPosition = elementPosition + window.pageYOffset - headerOffset;

                    window.scrollTo({
                        top: offsetPosition,
                        behavior: 'smooth'
                    });
                    
                    // Close mobile menu if open
                    if (navMenu) {
                        navMenu.classList.remove('active');
                        if (mobileMenuToggle) {
                            mobileMenuToggle.classList.remove('active');
                        }
                    }
                }
            }
        });
    });

    // Header scroll effect removed - keeping header static
    

    // Snow Animation
    function createSnowflake(callback) {
        const snowContainer = document.getElementById('snowContainer');
        if (!snowContainer) return;

        const snowflake = document.createElement('div');
        snowflake.className = 'snowflake';
        
        // Different snowflake symbols
        const snowflakeSymbols = ['❄', '❅', '❆', '✻', '✼', '✽', '✾', '✿'];
        const randomSymbol = snowflakeSymbols[Math.floor(Math.random() * snowflakeSymbols.length)];
        snowflake.textContent = randomSymbol;
        
        // Random size between 0.5em and 1.5em
        const size = Math.random() * 1 + 0.5;
        snowflake.style.fontSize = size + 'em';
        
        // Random starting position
        snowflake.style.left = Math.random() * 100 + '%';
        
        // Random animation duration (falling speed) - Slower for better visibility
        const duration = Math.random() * 5 + 5; // 5 to 10 seconds (slower)
        snowflake.style.animationDuration = duration + 's';
        
        // Random opacity
        const opacity = Math.random() * 0.5 + 0.5; // 0.5 to 1
        snowflake.style.opacity = opacity;
        
        // Random horizontal drift
        const drift = (Math.random() - 0.5) * 100; // -50px to 50px
        snowflake.style.setProperty('--drift', drift + 'px');
        
        // Add custom animation for horizontal drift
        const animationId = 'fall-' + Date.now() + '-' + Math.random().toString(36).substr(2, 9);
        const keyframes = `
            @keyframes ${animationId} {
                0% {
                    transform: translateY(0) translateX(0) rotate(0deg);
                }
                100% {
                    transform: translateY(100vh) translateX(${drift}px) rotate(360deg);
                }
            }
        `;
        
        // Create style element if it doesn't exist
        let styleSheet = document.getElementById('snow-animations');
        if (!styleSheet) {
            styleSheet = document.createElement('style');
            styleSheet.id = 'snow-animations';
            document.head.appendChild(styleSheet);
        }
        
        styleSheet.textContent += keyframes;
        snowflake.style.animationName = animationId;
        
        snowContainer.appendChild(snowflake);
        
        // Remove snowflake after it falls and immediately create a new one to maintain constant quantity
        setTimeout(() => {
            if (snowflake.parentNode) {
                snowflake.remove();
                // Immediately create a new snowflake to replace the one that disappeared
                if (callback && typeof callback === 'function') {
                    callback();
                }
            }
        }, duration * 1000 + 1000);
    }

    // Create snowflakes periodically - continuous snowfall with consistent quantity
    function startSnowAnimation() {
        const MAX_SNOWFLAKES = 40; // Fixed number of snowflakes (reduced for lighter snowfall)
        
        // Function to create a new snowflake when one disappears
        const createReplacementSnowflake = () => {
            createSnowflake(createReplacementSnowflake);
        };
        
        // Create initial snowflakes with consistent spacing - each will auto-replace itself
        for (let i = 0; i < MAX_SNOWFLAKES; i++) {
            setTimeout(() => {
                createSnowflake(createReplacementSnowflake);
            }, i * 100); // Faster initial creation to fill up quickly
        }
        
        // Backup system: Check every second to ensure we always have exactly MAX_SNOWFLAKES
        setInterval(() => {
            const snowContainer = document.getElementById('snowContainer');
            if (snowContainer) {
                const activeFlakes = snowContainer.querySelectorAll('.snowflake').length;
                const missingFlakes = MAX_SNOWFLAKES - activeFlakes;
                
                // If we're missing any flakes, create them immediately
                if (missingFlakes > 0) {
                    for (let i = 0; i < missingFlakes; i++) {
                        createSnowflake(createReplacementSnowflake);
                    }
                }
            }
        }, 1000); // Check every second to ensure constant quantity
    }

    // Start snow animation
    startSnowAnimation();

    // Intersection Observer for scroll animations
    const observerOptions = {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    };

    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.style.animationPlayState = 'running';
            }
        });
    }, observerOptions);

    // Observe elements for scroll animations
    document.querySelectorAll('.feature, .faq-item, .tagline').forEach(el => {
        observer.observe(el);
    });

    // Animated counter for stats
    function animateCounter(element, target, duration = 2000) {
        let start = 0;
        const increment = target / (duration / 16);
        const timer = setInterval(() => {
            start += increment;
            if (start >= target) {
                element.textContent = formatNumber(target, element);
                clearInterval(timer);
            } else {
                element.textContent = formatNumber(Math.floor(start), element);
            }
        }, 16);
    }

    function formatNumber(num, element) {
        const text = element.getAttribute('data-text');
        if (text) {
            return num + ' ' + text;
        }
        if (num >= 1000) {
            return (num / 1000).toFixed(0) + 'K';
        }
        return num.toString();
    }

    // Observe stats section for counter animation
    const statsObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const statNumbers = entry.target.querySelectorAll('.stat-number');
                statNumbers.forEach(stat => {
                    const target = parseInt(stat.getAttribute('data-target'));
                    if (target && stat.textContent === '0') {
                        animateCounter(stat, target);
                    }
                });
                statsObserver.unobserve(entry.target);
            }
        });
    }, { threshold: 0.5 });

    const heroStats = document.querySelector('.hero-stats');
    if (heroStats) {
        statsObserver.observe(heroStats);
    }

    // Parallax effect on scroll for hero background
    let lastScrollTop = 0;
    window.addEventListener('scroll', function() {
        const scrollTop = window.pageYOffset || document.documentElement.scrollTop;
        const heroBg = document.querySelector('.hero-bg-image');
        
        if (heroBg && scrollTop < window.innerHeight) {
            const parallaxSpeed = scrollTop * 0.5;
            heroBg.style.transform = `scale(1.1) translateY(${parallaxSpeed}px)`;
        }
        
        lastScrollTop = scrollTop;
    });

    // Add ripple effect to buttons
    document.querySelectorAll('.btn-download, .app-badge').forEach(button => {
        button.addEventListener('click', function(e) {
            const ripple = document.createElement('span');
            const rect = this.getBoundingClientRect();
            const size = Math.max(rect.width, rect.height);
            const x = e.clientX - rect.left - size / 2;
            const y = e.clientY - rect.top - size / 2;
            
            ripple.style.width = ripple.style.height = size + 'px';
            ripple.style.left = x + 'px';
            ripple.style.top = y + 'px';
            ripple.classList.add('ripple');
            
            this.appendChild(ripple);
            
            setTimeout(() => {
                ripple.remove();
            }, 600);
        });
    });

    // Contact form submission
    const contactForm = document.getElementById('contactForm');
    if (contactForm) {
        contactForm.addEventListener('submit', function(e) {
            e.preventDefault();
            
            const formData = {
                firstName: document.getElementById('firstName').value,
                lastName: document.getElementById('lastName').value,
                email: document.getElementById('email').value,
                subject: document.getElementById('subject').value,
                message: document.getElementById('message').value
            };

            // Here you would typically send the data to a server
            // For now, we'll just show a success message
            const submitButton = contactForm.querySelector('.btn-submit');
            const originalText = submitButton.innerHTML;
            
            submitButton.innerHTML = '<span>Envoi en cours...</span>';
            submitButton.disabled = true;
            
            // Simulate form submission (replace with actual API call)
            setTimeout(() => {
                submitButton.innerHTML = '<span>Message envoyé ! ✓</span>';
                submitButton.style.background = 'linear-gradient(135deg, #50C878, #4CAF50)';
                
                // Reset form
                contactForm.reset();
                
                // Reset button after 3 seconds
                setTimeout(() => {
                    submitButton.innerHTML = originalText;
                    submitButton.style.background = '';
                    submitButton.disabled = false;
                }, 3000);
            }, 1500);
        });
    }
});

