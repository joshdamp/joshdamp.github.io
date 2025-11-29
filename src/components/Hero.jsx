export default function Hero() {
  return (
    <section id="hero">
      {/* Left side content - vertically centered */}
      <div className="hero-content">
        <h1 className="hero-name">Joshua Dampil</h1>
        <p className="hero-subtitle">FullStack Developer</p>
        
        <div className="hero-links">
          <a href="/Joshua_Dampil_CV.pdf" download="Joshua_Dampil_CV.pdf" className="hero-cv-link">
            Download CV
          </a>
          
          {/* Social Icons */}
          <nav className="hero-social-icons" aria-label="Social media links">
            <a href="mailto:joshuadamps@gmail.com" className="hero-social-link" title="Email">
              <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor">
                <path d="M20,4H4C2.9,4,2,4.9,2,6v12c0,1.1,0.9,2,2,2h16c1.1,0,2-0.9,2-2V6C22,4.9,21.1,4,20,4z M20,8l-8,5L4,8V6l8,5l8-5V8z"/>
              </svg>
            </a>
            <a href="https://github.com/joshdamp" target="_blank" rel="noopener noreferrer" className="hero-social-link" title="GitHub">
              <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor">
                <path d="M12,2C6.5,2,2,6.5,2,12c0,4.4,2.9,8.2,7,9.5c0.5,0.1,0.7-0.2,0.7-0.5c0-0.2,0-0.9,0-1.7c-2.9,0.6-3.5-1.4-3.5-1.4c-0.5-1.2-1.1-1.5-1.1-1.5c-0.9-0.6,0.1-0.6,0.1-0.6c1,0.1,1.5,1,1.5,1c0.9,1.5,2.3,1.1,2.9,0.8c0.1-0.6,0.3-1.1,0.6-1.3c-2.2-0.3-4.6-1.1-4.6-5c0-1.1,0.4-2,1-2.7c-0.1-0.3-0.4-1.3,0.1-2.7c0,0,0.8-0.3,2.7,1c0.8-0.2,1.6-0.3,2.5-0.3c0.8,0,1.7,0.1,2.5,0.3c1.9-1.3,2.7-1,2.7-1c0.5,1.4,0.2,2.4,0.1,2.7c0.6,0.7,1,1.6,1,2.7c0,3.9-2.4,4.7-4.6,5c0.3,0.3,0.6,0.9,0.6,1.8c0,1.3,0,2.3,0,2.6c0,0.3,0.2,0.6,0.7,0.5c4.1-1.4,7-5.1,7-9.5C22,6.5,17.5,2,12,2z"/>
              </svg>
            </a>
            <a href="https://www.linkedin.com/in/joshua-dampil123/" target="_blank" rel="noopener noreferrer" className="hero-social-link" title="LinkedIn">
              <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor">
                <path d="M19,3H5C3.9,3,3,3.9,3,5v14c0,1.1,0.9,2,2,2h14c1.1,0,2-0.9,2-2V5C21,3.9,20.1,3,19,3z M9,17H6.5v-7H9V17z M7.7,8.7c-0.8,0-1.4-0.7-1.4-1.4c0-0.8,0.6-1.4,1.4-1.4c0.8,0,1.4,0.6,1.4,1.4C9.1,8.1,8.5,8.7,7.7,8.7z M18,17h-2.5v-3.9c0-1.1-0.2-2.4-1.7-2.4c-1.7,0-2,1.3-2,2.7V17H9.5v-7h2.4v1.2h0c0.4-0.8,1.5-1.6,3-1.6c3.2,0,3.8,2.1,3.8,4.9V17z"/>
              </svg>
            </a>
          </nav>
        </div>
      </div>

      {/* Profile Picture - positioned between center and right, anchored to bottom */}
      <img 
        src="/images/profilepic.png" 
        alt="Joshua Dampil" 
        className="hero-profile-image"
      />

      {/* Chatbot Button - bottom right */}
      <button 
        id="chatbot-toggle-btn" 
        className="hero-chatbot-btn"
        type="button" 
        title="Open chat" 
        aria-label="Open chatbot"
        onClick={() => window.dispatchEvent(new CustomEvent('openChatbot'))}
      >
        <span className="sr-only">Open Chat</span>
        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
          <path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z"/>
        </svg>
      </button>
    </section>
  )
}
