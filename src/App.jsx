import { useState, useEffect } from 'react'
import Navigation from './components/Navigation'
import Hero from './components/Hero'
import About from './components/About'
import Projects from './components/Projects'
import Contact from './components/Contact'
import Footer from './components/Footer'
import Chatbot from './components/Chatbot'
import ColorBends from './components/ColorBends'

export default function App() {
  const [theme, setTheme] = useState('dark')

  useEffect(() => {
    const savedTheme = localStorage.getItem('portfolio-theme') || 'dark'
    setTheme(savedTheme)
    applyTheme(savedTheme)
  }, [])

  const applyTheme = (themeMode) => {
    const body = document.body
    if (themeMode === 'light') {
      body.classList.remove('dark-mode')
      body.classList.add('light-mode')
    } else {
      body.classList.remove('light-mode')
      body.classList.add('dark-mode')
    }
  }

  const toggleTheme = () => {
    const newTheme = theme === 'dark' ? 'light' : 'dark'
    setTheme(newTheme)
    localStorage.setItem('portfolio-theme', newTheme)
    applyTheme(newTheme)
  }

  return (
    <div className="App">
      {/* ColorBends Background with wrapper for background color */}
      <div 
        className="color-bends-wrapper"
        style={{ backgroundColor: theme === 'dark' ? '#121212' : '#FEFEFE' }}
      >
        <ColorBends
          key={theme}
          className="color-bends-background"
          colors={theme === 'dark' 
            ? ["#ff0000", "#ff7f00", "#ffff00", "#00ff00", "#0000ff", "#8b00ff", "#ff00ff", "#00ffff"] 
            : ["#1e3a5f", "#4a1942", "#2d3436", "#1a1a2e", "#16213e", "#0f3460"]}
          rotation={0}
          speed={0.2}
          scale={1}
          frequency={0.75}
          warpStrength={1}
          mouseInfluence={1.5}
          parallax={0.9}
          noise={0.1}
          transparent={true}
        />
      </div>
      
      <Navigation theme={theme} onThemeToggle={toggleTheme} />
      <Hero />
      <About />
      <Projects />
      <Contact />
      <Footer />
      <Chatbot />
    </div>
  )
}
