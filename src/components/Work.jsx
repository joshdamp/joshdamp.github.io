import { useEffect, useLayoutEffect, useRef, useState } from 'react'
import { onFrame, fitCanvas, scramble, still, token } from '../lib/loop'
import { WORK } from '../data/work'

const Out = () => <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" aria-hidden="true"><path d="M7 17L17 7M9 7h8v8" /></svg>
const small = src => src.replace('.webp', '-s.webp')
// every screen decoded up front, so a swap can paint both pictures on its first frame
const CACHE = {}
const load = () => WORK.forEach(p => p[5].forEach(s => { if (!CACHE[s]) { const im = new Image(); im.src = s; CACHE[s] = im } }))
const ready = s => CACHE[s]?.complete && CACHE[s].naturalWidth > 0

// the screen: a new picture rebuilds out of the old one in the page's own grid, cell by cell, a purple dot at the seam
function Screen({ src, alt, onOpen }) {
  const cv = useRef(null), img = useRef(null), shown = useRef(src)
  useLayoutEffect(() => {
    const from = shown.current
    shown.current = src
    if (from === src) return
    if (still || !ready(from) || !ready(src)) { img.current.animate([{ opacity: .3 }, { opacity: 1 }], { duration: 240 }); return }
    const c = cv.current, x = c.getContext('2d'), { w, h } = fitCanvas(c), a = CACHE[from], b = CACHE[src]
    const N = w < 520 ? 22 : 40, s = w / N, M = Math.ceil(h / s), kx = a.naturalWidth / w, ky = a.naturalHeight / h, SPARK = token('--spark', '#9d7bff')
    // mostly random, with a slight left-to-right sweep so the change reads as travelling
    const thr = Float32Array.from({ length: N * M }, (_, i) => Math.random() * .72 + (i % N) / N * .28)
    const cell = (im, i) => { const cx = (i % N) * s, cy = Math.floor(i / N) * s; x.drawImage(im, cx * kx, cy * ky, s * kx, s * ky, cx, cy, s + .5, s + .5) }
    c.style.visibility = 'visible'
    const t0 = performance.now()
    const off = onFrame(t => {
      const p = (t - t0) / 900 * 1.14
      for (let i = 0; i < N * M; i++) {
        const v = thr[i]
        if (p < v) cell(a, i)
        else if (p < v + .14) { const cx = (i % N) * s, cy = Math.floor(i / N) * s; x.fillStyle = '#08090a'; x.fillRect(cx, cy, s + .5, s + .5); x.fillStyle = SPARK; x.fillRect(cx + s * .3, cy + s * .3, s * .4, s * .4) }
        else cell(b, i)
      }
      if (p >= 1.14) { c.style.visibility = 'hidden'; off() }
    })
    return () => { off(); c.style.visibility = 'hidden' }
  }, [src])
  return (
    <button className="screen" type="button" onClick={onOpen} aria-label={`View ${alt} full size`}>
      <img ref={img} src={src} alt={alt} width="1600" height="900" />
      <canvas ref={cv} aria-hidden="true" />
      <span className="zoom" aria-hidden="true">Full size <Out /></span>
    </button>
  )
}

// featured projects: the stage holds while you scroll; each screen of scroll is the next project
export default function Work() {
  const sec = useRef(null), name = useRef(null), dlg = useRef(null), kRef = useRef(0), prev = useRef(0)
  const [k, setK] = useState(0), [i, setI] = useState(0), [big, setBig] = useState(0)
  const [title, kind, line, stack, links, srcs] = WORK[k]
  const mark = () => sec.current.previousElementSibling.offsetTop // flow position, unmoved by pinning
  useEffect(() => {
    load()
    return onFrame((t, y) => {
      const span = sec.current.offsetHeight - innerHeight, p = (y - mark()) / span
      const n = Math.min(WORK.length - 1, Math.max(0, Math.floor(p * WORK.length)))
      if (n !== kRef.current) { kRef.current = n; setK(n); setI(0) }
    })
  }, [])
  useEffect(() => {
    const el = name.current, to = WORK[k][0]
    if (still || el.textContent === to) el.textContent = to
    else scramble(el, { from: WORK[prev.current][0], to, ms: 650 })
    prev.current = k
  }, [k])
  const jump = j => scrollTo({ top: mark() + j * (sec.current.offsetHeight - innerHeight) / WORK.length + 2, behavior: still ? 'auto' : 'smooth' })
  const step = d => setBig(b => (b + d + srcs.length) % srcs.length)
  return (
    <section ref={sec} className="space work" id="work" aria-labelledby="h-work" style={{ height: `${WORK.length * 100}vh` }}>
      <div className="stage">
        <header className="whead">
          <h2 id="h-work">Featured projects</h2>
          <ul className="pick">{WORK.map((p, j) => <li key={p[0]}><button type="button" aria-current={j === k ? 'true' : undefined} onClick={() => jump(j)}>{p[0]}</button></li>)}</ul>
        </header>
        <article className="proj" aria-live="polite">
          <div className="view">
            <Screen src={srcs[i]} alt={`${title}, screen ${i + 1} of ${srcs.length}`} onOpen={() => { setBig(i); dlg.current.showModal() }} />
            <div className="thumbs" role="group" aria-label={`${title} screens`}>
              {srcs.map((s, j) => <button key={s} type="button" aria-pressed={i === j} aria-label={`Show screen ${j + 1}`} onClick={() => setI(j)}><img src={small(s)} alt="" width="480" height="270" /></button>)}
            </div>
          </div>
          <div className="info" key={k}>
            <h3><span ref={name} aria-hidden="true">{WORK[0][0]}</span><span className="sr-only">{title}</span></h3>
            <p className="kind">{kind}</p>
            <p>{line}</p>
            <ul className="tags">{stack.map(t => <li key={t}>{t}</li>)}</ul>
            <div className="links">{links.map(([label, url], j) => <a key={url} className={j ? 'btn ghost' : 'btn'} href={url} target="_blank" rel="noopener">{label}<Out /></a>)}</div>
          </div>
        </article>
      </div>
      <dialog className="lightbox" ref={dlg} aria-label={`${title} screens`} onClick={e => e.target === dlg.current && dlg.current.close()}
        onKeyDown={e => { if (e.key === 'ArrowRight') step(1); if (e.key === 'ArrowLeft') step(-1) }}>
        <header><span>{title} <span className="soft">{big + 1} of {srcs.length}</span></span>
          <span className="nav"><button className="txt-btn" type="button" onClick={() => step(-1)}>Previous</button><button className="txt-btn" type="button" onClick={() => step(1)}>Next</button><button className="txt-btn" type="button" onClick={() => dlg.current.close()}>Close</button></span></header>
        <img src={srcs[big]} alt={`${title}, screen ${big + 1} of ${srcs.length}`} width="1600" height="900" />
      </dialog>
    </section>
  )
}
