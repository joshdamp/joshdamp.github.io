document.addEventListener('DOMContentLoaded', function() {
    console.log('Portfolio website loaded successfully');
    
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
    
    // Hero section animations
    const heroTitle = document.querySelector('.hero-title');
    const heroSubtitle = document.querySelector('.hero-subtitle');
    const profileImage = document.querySelector('.profile-image-container');
    
    function animateElement(element, delay) {
        if (element) {
            element.style.opacity = '0';
            element.style.transform = element.classList.contains('profile-image-container') 
                ? 'translateY(20px)' 
                : 'translateY(20px)';
            element.style.transition = 'opacity 0.8s ease, transform 0.8s ease';
            setTimeout(() => {
                element.style.opacity = '1';
                element.style.transform = element.classList.contains('profile-image-container')
                    ? 'translateY(0)'
                    : 'translateY(0)';
            }, delay);
        }
    }
    
    animateElement(profileImage, 300);
    animateElement(heroTitle, 500);
    animateElement(heroSubtitle, 700);
    
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

    // Click event for project cards to toggle previews
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
});