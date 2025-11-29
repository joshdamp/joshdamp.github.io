import { useState, useEffect } from 'react'
import Navigation from './components/Navigation'
import Hero from './components/Hero'
import About from './components/About'
import Projects from './components/Projects'
import Contact from './components/Contact'
import Footer from './components/Footer'
import Chatbot from './components/Chatbot'

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
