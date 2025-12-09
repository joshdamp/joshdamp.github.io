import { memo, useState } from 'react';

const Navigation = memo(({ theme, onThemeToggle }) => {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  const toggleMobileMenu = () => {
    setIsMobileMenuOpen(!isMobileMenuOpen);
    const navLinks = document.querySelector('.nav-links-mobile');
    if (navLinks) {
      navLinks.classList.toggle('mobile-active');
    }
  };

  const closeMobileMenu = () => {
    setIsMobileMenuOpen(false);
    const navLinks = document.querySelector('.nav-links-mobile');
    if (navLinks) {
      navLinks.classList.remove('mobile-active');
    }
  };

  const handleNavClick = (e) => {
    e.preventDefault();
    closeMobileMenu();
  };

  const handleThemeToggle = (e) => {
    e.stopPropagation();
    onThemeToggle();
  };

  return (
    <nav className="container mx-auto px-6 md:px-16 py-6 flex justify-between items-center sticky top-0 z-50">
      <div className="text-2xl font-bold title-brand">JDAMPS</div>
      <div className="flex items-center gap-4 md:gap-6">
        <button 
          className="mobile-menu-btn md:hidden" 
          style={{ color: 'var(--color-accent)' }}
          onClick={toggleMobileMenu}
          title="Toggle mobile menu"
          aria-label="Toggle mobile menu"
        >
          ☰
        </button>
      </div>
      <div className="nav-links hidden md:flex space-x-4 md:space-x-10 items-center">
        <a href="#hero" className="hover:text-primary">Home</a>
        <a href="#about" className="hover:text-primary">About</a>
        <a href="#projects" className="hover:text-primary">Projects</a>
        <a href="#contacts" className="hover:text-primary">Contacts</a>
        <button 
          className="theme-toggle-btn" 
          id="themeToggle" 
          title="Toggle dark/light mode"
          onClick={onThemeToggle}
          aria-label="Toggle theme"
        >
          <span>{theme === 'dark' ? '🌙' : '☀️'}</span>
        </button>
      </div>
      <div className="nav-links-mobile md:hidden">
        <a href="#hero" className="hover:text-primary" onClick={handleNavClick}>Home</a>
        <a href="#about" className="hover:text-primary" onClick={handleNavClick}>About</a>
        <a href="#projects" className="hover:text-primary" onClick={handleNavClick}>Projects</a>
        <a href="#contacts" className="hover:text-primary" onClick={handleNavClick}>Contacts</a>
        <button 
          className="theme-toggle-btn-mobile" 
          title="Toggle dark/light mode"
          onClick={handleThemeToggle}
          aria-label="Toggle theme"
        >
          {theme === 'dark' ? 'Light Mode' : 'Dark Mode'}
        </button>
      </div>
    </nav>
  )
});

Navigation.displayName = 'Navigation';

export default Navigation;
