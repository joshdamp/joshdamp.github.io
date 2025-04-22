document.addEventListener('DOMContentLoaded', function() {
    console.log('Portfolio website loaded successfully');
    
    // Initialize scroll observer for section animations
    initScrollAnimations();
    
    // Navigation hover effects and smooth scrolling
    const navLinks = document.querySelectorAll('.nav-links a');
    navLinks.forEach(link => {
        link.addEventListener('mouseenter', function() {
            this.style.transition = 'color 0.3s ease';
        });
        
        link.addEventListener('click', function(e) {
            const href = this.getAttribute('href');
            if (href.startsWith('#')) {
                e.preventDefault();
                const targetId = href.substring(1);
                const targetElement = document.getElementById(targetId);
                if (targetElement) {
                    window.scrollTo({
                        top: targetElement.offsetTop - 100,
                        behavior: 'smooth'
                    });
                }
            }
        });
    });
    
    // Hero section initial animations
    const heroSection = document.querySelector('section.container.mx-auto.px-6.py-16.flex.items-center');
    const heroTitle = document.querySelector('.hero-title');
    const heroSubtitle = document.querySelector('.hero-subtitle');
    const profileImage = document.querySelector('.profile-image-container');
    const socialIcons = document.querySelector('.absolute.bottom-4.right-20');
    
    // Add hero section to our tracking
    if (heroSection) {
        heroSection.classList.add('animated-section');
        heroSection.dataset.sectionId = 'hero';
        heroSection.style.transition = 'opacity 0.8s ease, transform 0.8s ease';
    }
    
    // Initial animations for hero elements
    animateElement(profileImage, 300, 'translateY(20px)', 'translateY(0)');
    animateElement(heroTitle, 500, 'translateX(-20px)', 'translateX(0)');
    animateElement(heroSubtitle, 700, 'translateX(-20px)', 'translateX(0)');
    animateElement(socialIcons, 900, 'translateY(20px)', 'translateY(0)');
    
    // Tab functionality
    const tabButtons = document.querySelectorAll('.tab-btn');
    const tabContents = document.querySelectorAll('.tab-content');
    
    tabButtons.forEach(button => {
        button.addEventListener('click', () => {
            tabButtons.forEach(btn => btn.classList.remove('active'));
            button.classList.add('active');
            tabContents.forEach(content => content.classList.remove('active'));
            const tabId = button.getAttribute('data-tab');
            document.getElementById(tabId).classList.add('active');
        });
    });

    // Project Card Preview Functionality
    initProjectCardPreviews();
    
    // Add CSS for preview visibility
    const style = document.createElement('style');
    document.head.appendChild(style);
});

// Function to handle project card previews
function initProjectCardPreviews() {
    const projectCards = document.querySelectorAll('.project-card');
    
    projectCards.forEach(card => {
        // Click event for the entire card
        card.addEventListener('click', () => {
            const isActive = card.getAttribute('data-active') === 'true';
            card.setAttribute('data-active', !isActive);
        });

        // Prevent GitHub link clicks from toggling the card
        const githubLink = card.querySelector('.github-link');
        if (githubLink) {
            githubLink.addEventListener('click', (e) => {
                e.stopPropagation(); // Prevent the card click event from firing
            });
        }
    });
}

// Helper function to animate elements
function animateElement(element, delay, fromTransform, toTransform) {
    if (element) {
        element.style.opacity = '0';
        element.style.transform = fromTransform;
        element.style.transition = 'opacity 0.8s ease, transform 0.8s ease';
        setTimeout(() => {
            element.style.opacity = '1';
            element.style.transform = toTransform;
        }, delay);
    }
}

// Enhanced scroll animation system with section hide effect
function initScrollAnimations() {
    // Mark all major sections for animation
    const sections = [
        {
            id: 'hero',
            element: document.querySelector('section.container.mx-auto.px-6.py-16.flex.items-center'),
            threshold: 0.3,
            enterAnimation: 'translateY(0)',
            exitAnimation: 'translateY(-30px)'
        },
        {
            id: 'about',
            element: document.getElementById('about'),
            threshold: 0.3,
            enterAnimation: 'translateY(0)',
            exitAnimation: 'translateY(-30px)'
        },
        {
            id: 'projects',
            element: document.getElementById('projects'),
            threshold: 0.3,
            enterAnimation: 'translateY(0)',
            exitAnimation: 'translateY(-30px)'
        },
        {
            id: 'contacts',
            element: document.getElementById('contacts'),
            threshold: 0.3,
            enterAnimation: 'translateY(0)',
            exitAnimation: 'translateY(-30px)'
        }
    ];
    
    // Filter out any undefined sections
    const validSections = sections.filter(section => section.element !== null);
    
    // Prepare each section for animations
    validSections.forEach(section => {
        const el = section.element;
        el.classList.add('animated-section');
        el.dataset.sectionId = section.id;
        el.style.opacity = (section.id === 'hero') ? '1' : '0';
        el.style.transform = (section.id === 'hero') ? section.enterAnimation : 'translateY(30px)';
        el.style.transition = 'opacity 0.8s ease, transform 0.8s ease';
    });
    
    // Set up inner element animations for each section
    setupInnerAnimations();
    
    // Create intersection observer for section visibility
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            const section = entry.target;
            const sectionId = section.dataset.sectionId;
            const sectionConfig = validSections.find(s => s.id === sectionId);
            
            if (!sectionConfig) return;
            
            // When section enters viewport
            if (entry.isIntersecting) {
                section.style.opacity = '1';
                section.style.transform = sectionConfig.enterAnimation;
                
                // Animate inner elements if this is the first time seeing this section
                if (section.dataset.animated !== 'true') {
                    animateInnerElements(sectionId);
                    section.dataset.animated = 'true';
                }
            } 
            // When section exits viewport
            else {
                if (entry.boundingClientRect.top < 0) {
                    // Scrolled past - exit upward
                    section.style.opacity = '0';
                    section.style.transform = sectionConfig.exitAnimation;
                } else {
                    // Not yet scrolled to - prepare for entrance
                    section.style.opacity = '0';
                    section.style.transform = 'translateY(30px)';
                }
            }
        });
    }, {
        rootMargin: '-10% 0px',
        threshold: [0.3, 0.7] // Check at multiple thresholds for smoother transitions
    });
    
    // Start observing all sections
    validSections.forEach(section => {
        if (section.element) {
            observer.observe(section.element);
        }
    });
    
    // Add special navigation effect on scroll
    window.addEventListener('scroll', function() {
        const nav = document.querySelector('nav');
        if (nav) {
            if (window.scrollY > 50) {
                nav.style.backgroundColor = 'rgba(18, 18, 24, 0.8)';
                nav.style.backdropFilter = 'blur(5px)';
            } else {
                nav.style.backgroundColor = 'transparent';
                nav.style.backdropFilter = 'none';
            }
        }
    });
}

// Set up animations for inner elements of each section
function setupInnerAnimations() {
    // Define inner elements to animate for each section
    const sectionInnerElements = {
        'hero': {
            title: {
                selector: '.hero-title',
                fromTransform: 'translateX(-30px)'
            },
            subtitle: {
                selector: '.hero-subtitle',
                fromTransform: 'translateX(-30px)'
            },
            profileImage: {
                selector: '.profile-image-container',
                fromTransform: 'translateY(30px)'
            },
            socialIcons: {
                selector: '.absolute.bottom-4.right-20',
                fromTransform: 'translateY(20px)'
            }
        },
        'about': {
            title: {
                selector: '#about h2',
                fromTransform: 'translateY(30px)'
            },
            content: {
                selector: '#about .md\\:w-2\\/3',
                fromTransform: 'translateX(-30px)'
            },
            image: {
                selector: '#about .md\\:w-1\\/3',
                fromTransform: 'translateX(30px)'
            }
        },
        'projects': {
            title: {
                selector: '#projects h2',
                fromTransform: 'translateY(30px)'
            },
            cards: {
                selector: '#projects .project-card',
                fromTransform: 'translateY(30px)',
                staggered: true
            }
        },
        'contacts': {
            title: {
                selector: '#contacts h2',
                fromTransform: 'translateY(30px)'
            },
            cards: {
                selector: '#contacts .bg-gray-800',
                fromTransform: 'translateY(30px)',
                staggered: true
            },
            footer: {
                selector: '#contacts .text-center.mt-16',
                fromTransform: 'translateY(20px)'
            }
        }
    };
    
    // Prepare all inner elements
    Object.keys(sectionInnerElements).forEach(sectionId => {
        const elementsConfig = sectionInnerElements[sectionId];
        
        Object.keys(elementsConfig).forEach(key => {
            const config = elementsConfig[key];
            const elements = document.querySelectorAll(config.selector);
            
            elements.forEach((el, index) => {
                el.classList.add('inner-animated');
                el.dataset.sectionId = sectionId;
                el.dataset.animationGroup = key;
                el.dataset.fromTransform = config.fromTransform;
                el.dataset.initialState = 'hidden';
                
                // Add index for staggered animations
                if (config.staggered) {
                    el.dataset.staggerIndex = index;
                }
                
                // Set initial state if not hero section
                if (sectionId !== 'hero') {
                    el.style.opacity = '0';
                    el.style.transform = config.fromTransform;
                    el.style.transition = 'opacity 0.8s ease, transform 0.8s ease';
                }
            });
        });
    });
}

// Function to animate inner elements of a section
function animateInnerElements(sectionId) {
    const innerElements = document.querySelectorAll(`.inner-animated[data-section-id="${sectionId}"]`);
    
    innerElements.forEach(el => {
        // Skip if already animated
        if (el.dataset.initialState === 'visible') return;
        
        const baseDelay = 200; // Base delay in ms
        const staggerDelay = el.dataset.staggerIndex ? parseInt(el.dataset.staggerIndex) * 100 : 0;
        
        // Group-specific delays
        let groupDelay = 0;
        if (el.dataset.animationGroup === 'title') {
            groupDelay = 0;
        } else if (el.dataset.animationGroup === 'content' || el.dataset.animationGroup === 'cards') {
            groupDelay = 200;
        } else if (el.dataset.animationGroup === 'image') {
            groupDelay = 300;
        } else if (el.dataset.animationGroup === 'footer' || el.dataset.animationGroup === 'socialIcons') {
            groupDelay = 400;
        }
        
        // Calculate total delay
        const totalDelay = baseDelay + groupDelay + staggerDelay;
        
        // Animate after delay
        setTimeout(() => {
            el.style.opacity = '1';
            el.style.transform = 'translateY(0)';
            el.dataset.initialState = 'visible';
        }, totalDelay);
    });
}

// Mobile menu toggle
document.addEventListener('DOMContentLoaded', function() {
    const mobileMenuBtn = document.querySelector('.mobile-menu-btn');
    const navLinks = document.querySelector('.nav-links');
    
    if (mobileMenuBtn) {
        mobileMenuBtn.addEventListener('click', function() {
            navLinks.classList.toggle('mobile-active');
        });
    }
    
    // Close menu when clicking a link
    const links = document.querySelectorAll('.nav-links a');
    links.forEach(link => {
        link.addEventListener('click', function() {
            navLinks.classList.remove('mobile-active');
        });
    });
});
