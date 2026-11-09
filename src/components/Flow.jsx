import { useEffect, useRef } from 'react'
import { onFrame, still } from '../lib/loop'

export const CHAPTERS = ['top', 'about', 'experience', 'work', 'awards', 'certifications', 'contact']
const NAMES = { about: 'About me', experience: 'Experience', work: 'Featured projects', awards: 'Awards', certifications: 'Certifications', contact: 'Contact' }

// chapters: each section pins when it ends; as the next slides over it, it lifts, shrinks a little and fades out.
// The flow bar shows where you are, fills each section's line as you read it, and jumps between them.
export default function Flow() {
  const nav = useRef(null)
  useEffect(() => {
    const chapters = CHAPTERS.map(id => document.getElementById(id))
    const marks = chapters.map(ch => ch.previousElementSibling) // flow positions, unmoved by pinning
    const links = [...nav.current.querySelectorAll('a')], fills = links.map(a => a.querySelector('i'))
    const pin = () => chapters.forEach((ch, i) => {
      ch.style.zIndex = i + 1
      ch.style.position = i < chapters.length - 1 ? 'sticky' : 'relative'
      ch.style.top = i < chapters.length - 1 ? Math.min(0, innerHeight - ch.offsetHeight) + 'px' : ''
    })
    const go = e => {
      const a = e.target.closest('a[href^="#"]'), i = a ? CHAPTERS.indexOf(a.getAttribute('href').slice(1)) : -1
      if (i < 0) return
      e.preventDefault()
      scrollTo({ top: marks[i].offsetTop, behavior: still ? 'auto' : 'smooth' })
    }
    // re-pin when a section changes height (a role opens, a picture loads)
    const ro = new ResizeObserver(pin)
    chapters.forEach(ch => ro.observe(ch))
    addEventListener('resize', pin); document.addEventListener('click', go)
    const off = onFrame((t, y) => {
      const vh = innerHeight
      let on = -1
      chapters.forEach((ch, i) => {
        const nx = chapters[i + 1]
        if (!nx) return
        const k = Math.min(1, Math.max(0, 1 - nx.getBoundingClientRect().top / vh))
        ch.style.opacity = Math.max(0, 1 - k * 1.6).toFixed(3)
        ch.style.transform = still || !k ? '' : `translateY(${(-k * 6).toFixed(2)}vh) scale(${(1 - k * .06).toFixed(4)})`
        ch.style.pointerEvents = k > .6 ? 'none' : ''
      })
      links.forEach((a, j) => {
        const i = j + 1, s = marks[i].offsetTop, e = i + 1 < marks.length ? marks[i + 1].offsetTop : document.documentElement.scrollHeight - vh + 1
        fills[j].style.setProperty('--p', Math.min(1, Math.max(0, (y - s + vh * .5) / (e - s))).toFixed(3))
        if (y >= s - vh * .5) on = j
      })
      links.forEach((a, j) => {
        a.classList.toggle('on', j === on)
        j === on ? a.setAttribute('aria-current', 'location') : a.removeAttribute('aria-current')
      })
      nav.current.classList.toggle('show', y > marks[1].offsetTop - vh * .6)
    })
    return () => { off(); ro.disconnect(); removeEventListener('resize', pin); document.removeEventListener('click', go) }
  }, [])
  return (
    <nav className="flow" ref={nav} aria-label="Sections">
      {CHAPTERS.slice(1).map(id => <a key={id} href={'#' + id}>{NAMES[id]}<span className="fill" aria-hidden="true"><i /></span></a>)}
    </nav>
  )
}
