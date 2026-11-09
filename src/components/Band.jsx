import { useEffect, useRef, useState } from 'react'
import { onFrame, still } from '../lib/loop'
import useClock from '../lib/useClock'

// the JD mark drawn in dots; a scan line runs down it and lights each row it passes
const ROWS = ['..###.###..', '...#..#..#.', '...#..#...#', '...#..#...#', '...#..#...#', '#..#..#..#.', '.##...###..']
const DOTS = ROWS.flatMap((row, r) => [...row].flatMap((ch, c) => ch === '#' ? [{ r, c }] : []))

function Mark() {
  const svg = useRef(null)
  useEffect(() => {
    const dots = [...svg.current.querySelectorAll('circle')], scan = svg.current.querySelector('.scan'), link = svg.current.parentElement
    const timers = []
    if (!still) dots.forEach(d => d.animate([{ opacity: 0, transform: 'scale(.2)' }, { opacity: 1, transform: 'none' }], { duration: 420, delay: d.dataset.c * 45 + d.dataset.r * 18, fill: 'backwards' }))
    // hovering sweeps a wave across the columns
    const wave = () => dots.forEach(d => {
      timers.push(setTimeout(() => { d.dataset.w = 1 }, d.dataset.c * 40), setTimeout(() => { d.dataset.w = 0 }, d.dataset.c * 40 + 220))
    })
    link.addEventListener('pointerenter', wave)
    const off = onFrame(t => {
      const ly = still ? 44.5 : -6 + ((t / 4000) % 1) * 102, lr = Math.round((ly - 15.2) / 10)
      scan.setAttribute('y', ly)
      dots.forEach(d => d.classList.toggle('on', +d.dataset.r === lr || d.dataset.w === '1'))
    })
    return () => { off(); link.removeEventListener('pointerenter', wave); timers.forEach(clearTimeout) }
  }, [])
  return (
    <svg ref={svg} className="jd" width="48" height="30" viewBox="0 0 130 90" aria-hidden="true">
      {DOTS.map(({ r, c }) => <circle key={r + '-' + c} cx={15.2 + c * 10} cy={15.2 + r * 10} r="3.2" data-r={r} data-c={c} />)}
      <rect className="scan" width="130" height="1.5" />
    </svg>
  )
}

// top band: plain text over the page, the mark, three facts and one link; a menu on phones
export default function Band() {
  const clock = useClock()
  const [open, setOpen] = useState(false)
  const btn = useRef(null), close = useRef(null), first = useRef(true)
  useEffect(() => {
    if (first.current) { first.current = false; return }
    ;(open ? close : btn).current.focus()
  }, [open])
  useEffect(() => {
    if (!open) return
    const esc = e => { if (e.key === 'Escape') setOpen(false) }
    addEventListener('keydown', esc)
    return () => removeEventListener('keydown', esc)
  }, [open])
  return (
    <>
      <header className="band">
        <a className="brand" href="#top" aria-label="Joshua Dampil, home"><Mark /></a>
        <div className="b1"><span className="label">Joshua Dampil:</span>Software developer, AI engineer</div>
        <div className="b2"><span className="label"><span className="live" aria-hidden="true" />Currently:</span>Solutions Architect Intern, Globe Telecom</div>
        <div className="b3"><span className="label">Based in:</span>Muntinlupa, PH <span id="clock">({clock})</span></div>
        <div className="b5"><span className="label">Say hello:</span><a className="u" href="mailto:joshuadamps@gmail.com">joshuadamps@gmail.com</a></div>
        <button ref={btn} className="txt-btn menu-btn" type="button" aria-expanded={open} aria-controls="menu" onClick={() => setOpen(true)}>Menu</button>
      </header>
      <div className="menu" id="menu" hidden={!open} role="dialog" aria-modal="true" aria-label="Menu">
        <div className="top"><span>Joshua Dampil</span><button ref={close} className="txt-btn" type="button" onClick={() => setOpen(false)}>Close</button></div>
        <nav aria-label="Sections" onClick={e => e.target.closest('a') && setOpen(false)}>
          <a href="#about">About me</a><a href="#experience">Experience</a><a href="#work">Featured projects</a><a href="#awards">Awards</a><a href="#contact">Contact</a>
        </nav>
        <div className="mfacts">
          <div><span className="label">Latest</span>Solutions Architect Intern, Globe Telecom</div>
          <div><span className="label">Based in</span>Muntinlupa, PH</div>
          <a className="btn" href="mailto:joshuadamps@gmail.com" style={{ gridColumn: '1 / -1', justifyContent: 'center' }}>Email me</a>
        </div>
      </div>
    </>
  )
}
