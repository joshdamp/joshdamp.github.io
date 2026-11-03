import { useEffect, useRef } from 'react'
import { onFrame, fitCanvas, still, token } from '../lib/loop'
import { STACK } from '../data/stack'

const svgUri = svg => 'data:image/svg+xml;charset=utf-8,' + encodeURIComponent(svg)
// the stack in colour: brand colour where it reads on the dark ground, else the mark's own fill
const Icon = ({ s: [, svg, colour] }) => <img alt="" src={svgUri(colour ? svg.replace('<svg ', `<svg fill="${colour}" `) : svg)} />
const GROUPS = [...new Set(STACK.map(s => s[3]))]
const SAY = 'Computer Science graduate specialising in machine learning, working across solutions architecture, applied AI and full-stack. Hackathon champion and international finalist.'
const KEY = /^(machine|learning,|Hackathon|champion|international|finalist\.)$/ // the words that carry the claim light in purple

// the portrait: Josh's cut-out rebuilt from the marks of his stack; bigger marks on flat areas, small ones on the face
function Portrait() {
  const ref = useRef(null)
  useEffect(() => {
    const me = ref.current, mx = me.getContext('2d'), mimg = new Image(), INK = token('--ink', '#f1f2ef'), S300 = token('--surface-300', '#26282c')
    let tiles = [], mw = 0, mh = 0, born = -1, ptr = { x: -999, y: -999 }, live = true
    const glyphs = STACK.map(([name, svg]) => {
      const g = { name, c: null }, img = new Image()
      img.onload = () => {
        const c = document.createElement('canvas'); c.width = c.height = 64
        const x = c.getContext('2d'), r = Math.min(64 / img.width, 64 / img.height), w = img.width * r, h = img.height * r
        x.drawImage(img, (64 - w) / 2, (64 - h) / 2, w, h); x.globalCompositeOperation = 'source-in'; x.fillStyle = INK; x.fillRect(0, 0, 64, 64); g.c = c
      }
      img.src = svgUri(svg)
      return g
    })
    const init = () => {
      if (!live || !mimg.naturalWidth) return
      ;({ w: mw, h: mh } = fitCanvas(me))
      if (!mw) return
      const P = mw < 420 ? 5 : 7, cols = Math.floor(mw / P), rows = Math.floor(mh / P), o = document.createElement('canvas'); o.width = cols; o.height = rows
      const ox = o.getContext('2d'); ox.drawImage(mimg, 0, 0, cols, rows)
      const px = ox.getImageData(0, 0, cols, rows).data, L = new Float32Array(cols * rows).fill(-1), used = new Uint8Array(cols * rows)
      for (let i = 0; i < cols * rows; i++) if (px[i * 4 + 3] > 120) L[i] = px[i * 4] / 255
      // stretch the tones inside the figure so the face keeps its contrast
      const v = [...L].filter(x => x >= 0).sort((a, b) => a - b), lo = v[Math.floor(v.length * .04)] || 0, hi = v[Math.floor(v.length * .97)] || 1, norm = x => Math.min(1, Math.max(0, (x - lo) / (hi - lo)))
      tiles = []; let n = 0
      const add = (r, c, k, l) => tiles.push({ x: (c + k / 2) * P, y: (r + k / 2) * P, s: k * P, l, g: glyphs[(n++ * 7 + r * 3 + c) % glyphs.length], z: 1, dx: (Math.random() - .5) * mw * 1.4, dy: (Math.random() - .5) * mh })
      // flat areas take big, readable marks; detail (the face) takes small ones
      for (const [k, tol] of [[4, .07], [2, .13]]) for (let r = 0; r + k <= rows; r += k) for (let c = 0; c + k <= cols; c += k) {
        let mn = 2, mxv = -1, sum = 0, ok = true
        for (let a = 0; a < k && ok; a++) for (let b = 0; b < k; b++) { const i = (r + a) * cols + c + b; if (used[i] || L[i] < 0) { ok = false; break } mn = Math.min(mn, L[i]); mxv = Math.max(mxv, L[i]); sum += L[i] }
        if (!ok || mxv - mn > tol) continue
        for (let a = 0; a < k; a++) for (let b = 0; b < k; b++) used[(r + a) * cols + c + b] = 1
        add(r, c, k, norm(sum / (k * k)))
      }
      for (let r = 0; r < rows; r++) for (let c = 0; c < cols; c++) { const i = r * cols + c; if (!used[i] && L[i] >= 0) add(r, c, 1, norm(L[i])) }
    }
    mimg.onload = init; mimg.src = '/me-cutout.png'
    addEventListener('resize', init)
    const point = e => { const r = me.getBoundingClientRect(); ptr = { x: e.clientX - r.left, y: e.clientY - r.top } }
    const leave = () => { ptr = { x: -999, y: -999 } }
    me.addEventListener('pointermove', point); me.addEventListener('pointerdown', point); me.addEventListener('pointerleave', leave)
    const off = onFrame(t => {
      const r = me.getBoundingClientRect()
      if (!tiles.length || r.bottom < 0 || r.top > innerHeight) return
      if (born < 0) born = t
      const life = still ? 1 : Math.min(1, (t - born) / 1300), e = 1 - Math.pow(1 - life, 3)
      mx.clearRect(0, 0, mw, mh)
      let near = null, nd = 14
      const paint = q => {
        const x = q.x + q.dx * (1 - e), y = q.y + q.dy * (1 - e), s = q.s * q.z
        // a faint square holds the tone, the mark on top carries the detail
        mx.globalAlpha = e * q.l * .26; mx.fillStyle = INK; mx.fillRect(x - q.s / 2, y - q.s / 2, q.s - 1, q.s - 1)
        if (q.g.c) { mx.globalAlpha = e * (q.z > 1.05 ? 1 : .1 + .9 * q.l); mx.drawImage(q.g.c, x - s * .44, y - s * .44, s * .88, s * .88) }
      }
      // marks near the pointer magnify and paint last, on top
      const big = []
      for (const q of tiles) {
        const d = Math.hypot(q.x - ptr.x, q.y - ptr.y), k = still || d > 70 ? 0 : 1 - d / 70
        q.z += (1 + k * (q.s < 14 ? 2.6 : 1.2) - q.z) * .2
        if (d < nd) { nd = d; near = q }
        if (q.z > 1.05) big.push(q); else paint(q)
      }
      big.sort((a, b) => a.z - b.z).forEach(paint)
      if (near && !still) {
        mx.font = '500 13px Manrope, sans-serif'
        const w = mx.measureText(near.g.name).width + 16, lx = Math.min(mw - w, ptr.x + 16), ly = Math.max(0, ptr.y - 34)
        mx.globalAlpha = 1; mx.fillStyle = S300; mx.fillRect(lx, ly, w, 24); mx.fillStyle = INK; mx.fillText(near.g.name, lx + 8, ly + 16)
      }
      mx.globalAlpha = 1
    })
    return () => {
      live = false; off(); removeEventListener('resize', init)
      me.removeEventListener('pointermove', point); me.removeEventListener('pointerdown', point); me.removeEventListener('pointerleave', leave)
    }
  }, [])
  return <canvas ref={ref} id="me" role="img" aria-label={'Portrait of Joshua Dampil made of the marks of the tools he builds with: ' + STACK.map(s => s[0]).join(', ')} />
}

export default function About() {
  const dlg = useRef(null), say = useRef(null)
  // the statement lights word by word over 1.2s once it is on screen, so short phone screens see it whole
  useEffect(() => {
    const words = [...say.current.querySelectorAll('.w')]
    let start = -1
    return onFrame(t => {
      if (start < 0 && say.current.getBoundingClientRect().top < innerHeight * .9) start = t
      const lit = still ? words.length : start < 0 ? 0 : Math.round(Math.min(1, (t - start) / 1200) * words.length)
      words.forEach((w, i) => w.classList.toggle('on', i < lit))
    })
  }, [])
  return (
    <section className="pad about chap" id="about" aria-labelledby="h-about">
      <figure className="photo" data-reveal>
        <Portrait />
        <button className="belt" type="button" id="belt" aria-haspopup="dialog" aria-label={`See my whole tech stack, ${STACK.length} tools`} onClick={() => dlg.current.showModal()}>
          <span className="track" aria-hidden="true">{[...STACK, ...STACK].map((s, i) => <span className="it" key={i}><Icon s={s} />{s[0]}</span>)}</span>
          <span className="all" aria-hidden="true">All {STACK.length} <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M7 17L17 7M9 7h8v8" /></svg></span>
        </button>
      </figure>
      <div>
        <h2 id="h-about" data-reveal>About me</h2>
        <p className="say" ref={say}>{SAY.split(/(\s+)/).map((t, i) => /^\s+$/.test(t) ? t : <span key={i} className={KEY.test(t) ? 'w k' : 'w'}>{t}</span>)}</p>
      </div>
      <dialog className="stackdlg" ref={dlg} aria-labelledby="h-stack" onClick={e => e.target === dlg.current && dlg.current.close()}>
        <header><h2 id="h-stack">My stack</h2><button className="txt-btn" type="button" onClick={() => dlg.current.close()}>Close</button></header>
        {GROUPS.map(g => <section key={g}><h3>{g}</h3><ul>{STACK.filter(s => s[3] === g).map(s => <li key={s[0]}><Icon s={s} />{s[0]}</li>)}</ul></section>)}
      </dialog>
    </section>
  )
}
