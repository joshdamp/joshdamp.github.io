/* ============================================================================
   PORTFOLIO - MAIN JAVASCRIPT FILE
   Organized, modular structure for better maintainability
   ============================================================================ */

/* ============================================================================
   THEME MANAGER MODULE
   Handles dark/light mode toggle and persistence
   ============================================================================ */
const ThemeManager = (() => {
  const STORAGE_KEY = 'portfolio-theme';
  const DARK_MODE_CLASS = 'dark-mode';
  const LIGHT_MODE_CLASS = 'light-mode';
  
  // Initialize theme on page load
  const init = () => {
    const savedTheme = localStorage.getItem(STORAGE_KEY) || 'dark';
    applyTheme(savedTheme);
    attachToggleListener();
  };
  
  // Apply theme to the document
  const applyTheme = (theme) => {
    const body = document.body;
    
    if (theme === 'light') {
      body.classList.remove(DARK_MODE_CLASS);
      body.classList.add(LIGHT_MODE_CLASS);
    } else {
      body.classList.remove(LIGHT_MODE_CLASS);
      body.classList.add(DARK_MODE_CLASS);
    }
    
    updateThemeButton(theme);
    localStorage.setItem(STORAGE_KEY, theme);
  };
  
  // Update theme toggle button icon and text
  const updateThemeButton = (theme) => {
    const btn = document.getElementById('themeToggle');
    if (btn) {
      btn.innerHTML = theme === 'light' ? '☀️' : '🌙';
      btn.setAttribute('aria-label', theme === 'light' ? 'Switch to dark mode' : 'Switch to light mode');
    }
  };
  
  // Attach click listener to toggle button
  const attachToggleListener = () => {
    const toggleBtn = document.getElementById('themeToggle');
    if (toggleBtn) {
      toggleBtn.addEventListener('click', () => {
        const currentTheme = localStorage.getItem(STORAGE_KEY) || 'dark';
        const newTheme = currentTheme === 'dark' ? 'light' : 'dark';
        applyTheme(newTheme);
      });
    }
  };
  
  return { init };
})();

/* ============================================================================
   NAVIGATION MODULE
   Handles smooth scrolling, mobile menu, and nav interactions
   ============================================================================ */
const Navigation = (() => {
  // Initialize navigation features
  const init = () => {
    setupSmoothScroll();
    setupMobileMenu();
    setupNavHoverEffects();
  };
  
  // Smooth scroll to sections
  const setupSmoothScroll = () => {
    const navLinks = document.querySelectorAll('.nav-links a');
    navLinks.forEach(link => {
      link.addEventListener('click', (e) => {
        const href = link.getAttribute('href');
        if (href.startsWith('#')) {
          e.preventDefault();
          const targetId = href.substring(1);
          const targetElement = document.getElementById(targetId);
          if (targetElement) {
            window.scrollTo({
              top: targetElement.offsetTop - 25,
              behavior: 'smooth'
            });
            // Close mobile menu if open
            closeMobileMenu();
          }
        }
      });
    });
  };
  
  // Mobile menu toggle functionality
  const setupMobileMenu = () => {
    const mobileMenuBtn = document.querySelector('.mobile-menu-btn');
    const navLinks = document.querySelector('.nav-links');
    
    if (mobileMenuBtn && navLinks) {
      mobileMenuBtn.addEventListener('click', () => {
        navLinks.classList.toggle('mobile-active');
        updateMobileMenuButton(mobileMenuBtn, navLinks.classList.contains('mobile-active'));
      });
      
      // Close menu when clicking a link
      const links = document.querySelectorAll('.nav-links a');
      links.forEach(link => {
        link.addEventListener('click', closeMobileMenu);
      });
    }
  };
  
  // Close mobile menu
  const closeMobileMenu = () => {
    const navLinks = document.querySelector('.nav-links');
    const mobileMenuBtn = document.querySelector('.mobile-menu-btn');
    if (navLinks && mobileMenuBtn) {
      navLinks.classList.remove('mobile-active');
      updateMobileMenuButton(mobileMenuBtn, false);
    }
  };
  
  // Update mobile menu button appearance
  const updateMobileMenuButton = (btn, isOpen) => {
    btn.textContent = isOpen ? '✕' : '☰';
  };
  
  // Navigation hover effects
  const setupNavHoverEffects = () => {
    window.addEventListener('scroll', () => {
      const nav = document.querySelector('nav');
      if (nav) {
        if (window.scrollY > 50) {
          nav.style.backgroundColor = 'var(--color-nav-bg)';
          nav.style.backdropFilter = 'blur(5px)';
        } else {
          nav.style.backgroundColor = 'transparent';
          nav.style.backdropFilter = 'none';
        }
      }
    });
  };
  
  return { init };
})();

/* ============================================================================
   TABS MODULE
   Handles tab switching in the About section
   ============================================================================ */
const Tabs = (() => {
  const init = () => {
    const tabButtons = document.querySelectorAll('.tab-btn');
    const tabContents = document.querySelectorAll('.tab-content');
    
    tabButtons.forEach(button => {
      button.addEventListener('click', () => {
        // Remove active class from all buttons and contents
        tabButtons.forEach(btn => btn.classList.remove('active'));
        tabContents.forEach(content => content.classList.remove('active'));
        
        // Add active class to clicked button and corresponding content
        button.classList.add('active');
        const tabId = button.getAttribute('data-tab');
        const tabContent = document.getElementById(tabId);
        if (tabContent) {
          tabContent.classList.add('active');
        }
      });
    });
  };
  
  return { init };
})();

/* ============================================================================
   PROJECTS MODULE
   Handles project card interactions and preview carousel
   ============================================================================ */
const Projects = (() => {
  const init = () => {
    const isMobile = window.innerWidth <= 768;
    isMobile ? setupMobileCarousels() : setupDesktopPreviews();
    
    // Handle resize
    window.addEventListener('resize', handleResize);
  };
  
  // Setup desktop project previews
  const setupDesktopPreviews = () => {
    const projectCards = document.querySelectorAll('.project-card');
    
    projectCards.forEach(card => {
      card.addEventListener('click', (e) => {
        if (!e.target.closest('.github-link')) {
          const isActive = card.getAttribute('data-active') === 'true';
          card.setAttribute('data-active', !isActive);
        }
      });
    });
  };
  
  // Setup mobile carousels
  const setupMobileCarousels = () => {
    const projectCards = document.querySelectorAll('.project-card');
    
    projectCards.forEach((card) => {
      const preview = card.querySelector('.project-preview');
      if (!preview) return;
      
      const mainImg = preview.querySelector('.main-image');
      const preview1 = preview.querySelector('.preview-1');
      const preview2 = preview.querySelector('.preview-2');
      
      // Create carousel structure
      const carousel = createCarousel([mainImg, preview1, preview2]);
      preview.innerHTML = '';
      preview.appendChild(carousel);
    });
  };
  
  // Create carousel element
  const createCarousel = (images) => {
    const carousel = document.createElement('div');
    carousel.className = 'mobile-carousel';
    
    // Create slides
    const slides = document.createElement('div');
    slides.className = 'carousel-slides';
    
    const validImages = images.filter(img => img);
    validImages.forEach((img) => {
      const slide = document.createElement('div');
      slide.className = 'carousel-slide';
      
      const newImg = document.createElement('img');
      newImg.src = img.src;
      newImg.alt = img.alt || 'Project preview';
      
      slide.appendChild(newImg);
      slides.appendChild(slide);
    });
    
    carousel.appendChild(slides);
    
    // Create dots
    const dots = document.createElement('div');
    dots.className = 'carousel-dots';
    let currentSlide = 0;
    
    validImages.forEach((_, index) => {
      const dot = document.createElement('div');
      dot.className = 'carousel-dot' + (index === 0 ? ' active' : '');
      dot.dataset.slide = index;
      
      dot.addEventListener('click', () => {
        currentSlide = index;
        updateCarousel(slides, dots, index, validImages.length);
      });
      
      dots.appendChild(dot);
    });
    
    carousel.appendChild(dots);
    
    // Setup touch swipe
    setupSwipe(carousel, slides, dots, validImages.length, (newIndex) => {
      currentSlide = newIndex;
    });
    
    return carousel;
  };
  
  // Update carousel position
  const updateCarousel = (slides, dots, index, total) => {
    slides.style.transform = `translateX(-${index * 33.333}%)`;
    
    dots.querySelectorAll('.carousel-dot').forEach(d => d.classList.remove('active'));
    const activeDot = dots.querySelector(`.carousel-dot[data-slide="${index}"]`);
    if (activeDot) activeDot.classList.add('active');
  };
  
  // Setup swipe functionality
  const setupSwipe = (carousel, slides, dots, imageCount, updateCallback) => {
    let startX = 0;
    let currentSlide = 0;
    
    carousel.addEventListener('touchstart', (e) => {
      startX = e.touches[0].clientX;
    });
    
    carousel.addEventListener('touchend', (e) => {
      const endX = e.changedTouches[0].clientX;
      const diff = startX - endX;
      const threshold = 50;
      
      if (Math.abs(diff) > threshold) {
        if (diff > 0 && currentSlide < imageCount - 1) {
          currentSlide++;
        } else if (diff < 0 && currentSlide > 0) {
          currentSlide--;
        }
        
        updateCarousel(slides, dots, currentSlide, imageCount);
        updateCallback(currentSlide);
      }
    });
  };
  
  // Handle window resize
  const handleResize = () => {
    const isMobile = window.innerWidth <= 768;
    if (isMobile) {
      setupMobileCarousels();
    }
  };
  
  return { init };
})();

/* ============================================================================
   ANIMATIONS MODULE
   Handles scroll animations and element transitions
   ============================================================================ */
const Animations = (() => {
  const init = () => {
    setupScrollAnimations();
    setupHeroAnimations();
  };
  
  // Initial hero animations
  const setupHeroAnimations = () => {
    const heroElements = [
      { el: document.querySelector('.hero-title'), delay: 500 },
      { el: document.querySelector('.hero-subtitle'), delay: 700 },
      { el: document.querySelector('.profile-image-container'), delay: 300 },
      { el: document.querySelector('.absolute.bottom-4.right-20'), delay: 900 }
    ];
    
    heroElements.forEach(({ el, delay }) => {
      if (el) {
        el.style.opacity = '0';
        el.style.animation = `fadeIn 0.8s ease forwards ${delay}ms`;
      }
    });
  };
  
  // Scroll-based animations
  const setupScrollAnimations = () => {
    const sections = document.querySelectorAll('section');
    
    const observer = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          entry.target.style.opacity = '1';
          entry.target.style.transform = 'translateY(0)';
        }
      });
    }, { threshold: 0.1 });
    
    sections.forEach(section => {
      section.style.opacity = '0';
      section.style.transform = 'translateY(20px)';
      section.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
      observer.observe(section);
    });
  };
  
  return { init };
})();

/* ============================================================================
   APPLICATION INITIALIZATION
   Initialize all modules when DOM is ready
   ============================================================================ */
document.addEventListener('DOMContentLoaded', () => {
  console.log('🚀 Portfolio initialized');
  
  // Initialize theme first (before other modules)
  ThemeManager.init();
  
  // Initialize other modules
  Navigation.init();
  Tabs.init();
  Projects.init();
  Animations.init();
});
