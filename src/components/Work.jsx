import { useEffect, useRef, useState } from 'react'
import { onFrame, still } from '../lib/loop'
import { WORK } from '../data/work'

const GAP = 1600 // depth between projects
const rnd = s => { const x = Math.sin(s * 999) * 10000; return x - Math.floor(x) }
// the first screen of each project leads, slightly off centre; the rest sit wide and high, clear of the caption at bottom left
const SHOTS = WORK.flatMap(([name, , , srcs], k) => srcs.map((src, j) => {
  const side = j === 0 ? 0 : (j % 2 ? 1 : -1)
  return { src, alt: `${name} screen ${j + 1}`, k, z: -k * GAP - 380 - j * 420, x: j === 0 ? (k % 2 ? .1 : -.06) : side * (.5 + rnd(k * 7 + j) * .16), y: j === 0 ? -.04 : -.12 - rnd(k * 3 + j) * .22, s: j === 0 ? .9 : .5 }
}))

// things I built: screens placed through depth; scrolling flies the camera forward
export default function Work() {
  const [cur, setCur] = useState(0)
  const sec = useRef(null), deck = useRef(null), cap = useRef(null), curRef = useRef(0)
  useEffect(() => {
    const els = [...deck.current.querySelectorAll('.shot')]
    let camZ = 0
    return onFrame((t, y) => {
      const space = sec.current, span = space.offsetHeight - innerHeight, p = Math.min(1, Math.max(0, (y - space.offsetTop) / span))
      camZ += (-p * (WORK.length - 1) * GAP - camZ) * (still ? 1 : .1)
      const k = Math.min(WORK.length - 1, Math.max(0, Math.round(-camZ / GAP)))
      if (k !== curRef.current) { curRef.current = k; setCur(k) }
      const vw = deck.current.clientWidth, vh = deck.current.clientHeight
      SHOTS.forEach((s, i) => {
        const el = els[i], dz = s.z - camZ
        if (dz > 400 || dz < -3600) { el.style.visibility = 'hidden'; return }
        el.style.visibility = 'visible'
        const fadeFar = Math.min(1, (dz + 3600) / 1400), fadeNear = dz > -260 ? Math.max(0, 1 - (dz + 260) / 520) : 1
        el.style.opacity = (fadeFar * fadeNear * (s.k === k ? 1 : .3)).toFixed(3)
        el.style.zIndex = Math.round(5000 + dz) // nearer screens paint over farther ones
        el.style.transform = `translate3d(${s.x * vw}px, ${s.y * vh}px, ${dz}px) scale(${s.s})`
      })
    })
  }, [])
  useEffect(() => {
    if (!still && cur) cap.current.animate([{ opacity: 0, transform: 'translateY(16px)' }, { opacity: 1, transform: 'none' }], { duration: 450, easing: 'cubic-bezier(.2,.8,.2,1)' })
  }, [cur])
  const [name, stack, line] = WORK[cur]
  return (
    <section ref={sec} className="space" id="work" aria-labelledby="h-work">
      <div ref={deck} className="deck">
        <h2 id="h-work">Things I built</h2>
        {SHOTS.map(s => <figure key={s.src} className="shot" style={{ visibility: 'hidden' }}><img src={s.src} alt={s.alt} width="820" height="461" /></figure>)}
        <div ref={cap} className="cap" aria-live="polite"><h3>{name}</h3><p className="st">{stack}</p><p>{line}</p></div>
        <p className="hint">Scroll to fly through</p>
      </div>
    </section>
  )
}
