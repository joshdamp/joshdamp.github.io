import { memo } from 'react';

const Navigation = memo(({ theme, onThemeToggle }) => {
  return (
    <nav className="container mx-auto px-6 md:px-16 py-6 flex justify-between items-center sticky top-0 z-50">
      <div className="text-2xl font-bold title-brand">JDAMPS</div>
      <div className="flex items-center gap-4 md:gap-6">
        <button className="mobile-menu-btn md:hidden" style={{ color: 'var(--color-accent)' }}>
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
    </nav>
  )
});

Navigation.displayName = 'Navigation';

export default Navigation;
