import { useState, useEffect, useCallback, useMemo, lazy, Suspense, memo } from 'react'
import Navigation from './components/Navigation'
import Hero from './components/Hero'
import Footer from './components/Footer'

// Lazy load heavy components
const ColorBends = lazy(() => import('./components/ColorBends'))
const About = lazy(() => import('./components/About'))
const Projects = lazy(() => import('./components/Projects'))
const Contact = lazy(() => import('./components/Contact'))
const Chatbot = lazy(() => import('./components/Chatbot'))

// Minimal loading fallback
const SectionLoader = () => <div style={{ minHeight: '50vh' }} />

function App() {
  const [theme, setTheme] = useState(() => {
    // Initialize from localStorage during first render
    if (typeof window !== 'undefined') {
      return localStorage.getItem('portfolio-theme') || 'dark'
    }
    return 'dark'
  })

  const applyTheme = useCallback((themeMode) => {
    const { classList } = document.body
    classList.remove('dark-mode', 'light-mode')
    classList.add(themeMode === 'light' ? 'light-mode' : 'dark-mode')
  }, [])

  useEffect(() => {
    applyTheme(theme)
  }, [theme, applyTheme])

  const toggleTheme = useCallback(() => {
    setTheme(prev => {
      const newTheme = prev === 'dark' ? 'light' : 'dark'
      localStorage.setItem('portfolio-theme', newTheme)
      return newTheme
    })
  }, [])

  // Memoize ColorBends colors to prevent recalculation
  const colorBendsColors = useMemo(() => 
    theme === 'dark' 
      ? ['#ff0000', '#ff7f00', '#ffff00', '#00ff00', '#0000ff', '#8b00ff', '#ff00ff', '#00ffff'] 
      : ['#1e3a5f', '#4a1942', '#2d3436', '#1a1a2e', '#16213e', '#0f3460']
  , [theme])

  const wrapperStyle = useMemo(() => ({
    backgroundColor: theme === 'dark' ? '#121212' : '#FEFEFE'
  }), [theme])

  return (
    <div className="App">
      {/* ColorBends Background */}
      <div className="color-bends-wrapper" style={wrapperStyle}>
        <Suspense fallback={null}>
          <ColorBends
            key={theme}
            className="color-bends-background"
            colors={colorBendsColors}
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
        </Suspense>
      </div>
      
      <Navigation theme={theme} onThemeToggle={toggleTheme} />
      <Hero />
      
      <Suspense fallback={<SectionLoader />}>
        <About />
      </Suspense>
      
      <Suspense fallback={<SectionLoader />}>
        <Projects />
      </Suspense>
      
      <Suspense fallback={<SectionLoader />}>
        <Contact />
      </Suspense>
      
      <Footer />
      
      <Suspense fallback={null}>
        <Chatbot />
      </Suspense>
    </div>
  )
}

export default memo(App)
