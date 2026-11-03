import { useEffect, useRef } from 'react'
import { onFrame, fitCanvas, still, token, scramble } from '../lib/loop'
import { LOGOS } from '../data/handLogos'

// the name: J and D stay, the rest decodes into what else JD stands for
const JD = [['Joshua', 'Dampil'], ['Just', 'Developing'], ['Just', 'Deploying'], ['Job', 'Done']]
const setWord = (el, s) => { el.innerHTML = `<b>${s[0]}</b>${s.slice(1)}` }
const GAPX = .477, GAPY = .45 // where the fingertips meet in hands.png, as a fraction of its size

// a mark rasterised to S x S cells
const stamp = (d, S) => {
  const o = document.createElement('canvas'); o.width = o.height = S
  const x = o.getContext('2d'); x.scale(S / 24, S / 24); x.fill(new Path2D(d))
  const a = x.getImageData(0, 0, S, S).data
  return (c, r) => a[(r * S + c) * 4 + 3] > 110
}

// the world in the spark: points on a sphere, three arcs running between them
const PTS = []
for (let i = 0, n = 360; i < n; i++) { const y = 1 - 2 * (i + .5) / n, r = Math.sqrt(1 - y * y), th = i * 2.39996; PTS.push([Math.cos(th) * r, y, Math.sin(th) * r]) }
const ARCS = [[20, 250], [90, 300], [170, 330]].map(([a, b]) => [PTS[a], PTS[b]])
const rot = ([x, y, z], a, b) => { const x1 = x * Math.cos(a) + z * Math.sin(a), z1 = -x * Math.sin(a) + z * Math.cos(a); return [x1, y * Math.cos(b) - z1 * Math.sin(b), y * Math.sin(b) + z1 * Math.cos(b)] }

// intro: two hands across the whole screen on a diagonal, the name split around the spark; scrolling dives into it
export default function Intro() {
  const sec = useRef(null), stg = useRef(null), cv = useRef(null), h1r = useRef(null), w1 = useRef(null), w2 = useRef(null), clm = useRef(null), ent = useRef(null)
  useEffect(() => {
    const intro = sec.current, stage = stg.current, hc = cv.current, hx = hc.getContext('2d'), h1 = h1r.current, W1 = w1.current, W2 = w2.current, claim = clm.current, enter = ent.current
    const INK = token('--ink', '#f1f2ef'), SIG = token('--signal', '#5b8cff'), SPARK = token('--spark', '#9d7bff'), SIGH = token('--signal-hover', '#86a9ff')
    const timers = [], himg = new Image()
    let cells = [], hw = 0, hh = 0, HP = 8, draw = null, near = 0, nearS = 0, pv = { x: 0, y: 0 }, ang = 0, claimOn = false
    const born = performance.now()

    // the name decodes through the JD phrases
    if (!still) {
      [W1, W2].forEach((w, i) => w.animate([{ opacity: 0, translate: '0 30px' }, { opacity: 1, translate: '0 0' }], { duration: 400, delay: 150 + i * 100, easing: 'cubic-bezier(.2,.8,.2,1)', fill: 'backwards' }))
      let jd = 0
      const decode = (el, from, to) => scramble(el, { from, to, ms: 650, render: s => setWord(el, to[0] + s.slice(1)) })
      const id = setInterval(() => {
        const a = JD[jd]; jd = (jd + 1) % JD.length; const b = JD[jd]
        decode(W1, a[0], b[0]); timers.push(setTimeout(() => decode(W2, a[1], b[1]), 140))
      }, 1800)
      timers.push(id)
    }

    const init = () => {
      if (!himg.naturalWidth) return
      ;({ w: hw, h: hh } = fitCanvas(hc))
      if (!hw || !hh) return
      const phone = hw < 600; HP = phone ? 4 : hw < 1100 ? 7 : 8
      ang = -Math.min(phone ? .62 : .42, Math.atan2(hh * .55, hw))
      pv = { x: hw / 2, y: hh * .52 }
      stage.style.setProperty('--px', pv.x + 'px'); stage.style.setProperty('--py', pv.y + 'px')
      // each arm runs past its edge of the screen
      const L = hw / 2 / Math.cos(ang) + 60, dw = L / Math.min(GAPX, 1 - GAPX), dh = dw * himg.naturalHeight / himg.naturalWidth
      draw = { x: -dw * GAPX, y: -dh * GAPY, w: dw, h: dh } // relative to the spark, before rotation
      const cols = Math.floor(dw / HP), rows = Math.floor(dh / HP), o = document.createElement('canvas'); o.width = cols; o.height = rows
      const ox = o.getContext('2d'); ox.drawImage(himg, 0, 0, cols, rows)
      const p = ox.getImageData(0, 0, cols, rows).data; cells = []
      for (let r = 0; r < rows; r++) for (let c = 0; c < cols; c++) {
        const i = (r * cols + c) * 4, a = p[i + 3] / 255; if (a < .35) continue
        const u = c / cols; cells.push({ r, c, u, v: r / rows, l: p[i] / 255, ai: u > GAPX, sx: Math.random() * dw, sy: Math.random() * dh })
      }
      // the three marks sit side by side along the AI forearm, as brighter pixels
      const at = new Map(cells.filter(c => c.ai).map(c => [c.r * cols + c.c, c]))
      const col = c0 => cells.filter(c => c.ai && c.c === c0), base = col(Math.round(.75 * cols)), S = Math.max(phone ? 11 : 7, Math.min(13, Math.round(base.length * .5)))
      LOGOS.forEach((d, i) => {
        const c0 = Math.round(.75 * cols) + (i - 1) * (S + 3), cs = col(c0); if (cs.length < S * .7) return
        const mid = Math.round(cs.reduce((s, c) => s + c.r, 0) / cs.length), hit = stamp(d, S)
        for (let r = 0; r < S; r++) for (let c = 0; c < S; c++) { const cell = at.get((mid - (S >> 1) + r) * cols + c0 - (S >> 1) + c); if (cell && hit(c, r)) cell.logo = 1 }
      })
    }
    himg.onload = init; himg.src = '/hands.png'
    addEventListener('resize', init)
    const move = e => { const r = hc.getBoundingClientRect(); near = Math.max(0, 1 - Math.hypot(e.clientX - r.left - pv.x, e.clientY - r.top - pv.y) / 420) }
    const leave = () => { near = 0 }
    stage.addEventListener('pointermove', move); stage.addEventListener('pointerleave', leave)

    const drawWorld = (t, p) => {
      const r0 = (hw < 600 ? 15 : 21) * (1 + nearS * .35) * (still ? 1 : 1 + .06 * Math.sin(t / 600)), zoom = still ? 0 : Math.pow(p, 1.7)
      const R = r0 * Math.exp(Math.log(Math.hypot(hw, hh) * 3 / r0) * zoom), a = t * .00035, b = .38, fade = p > .82 ? Math.max(0, (1 - p) / .18) : 1
      hx.globalAlpha = (.16 + nearS * .14) * fade * (1 - zoom); hx.fillStyle = SPARK; hx.beginPath(); hx.arc(pv.x, pv.y, R * 2, 0, 7); hx.fill()
      const s0 = Math.min(5, 1.1 + R * .018)
      for (const q of PTS) {
        const [x, y, z] = rot(q, a, b), front = (z + 1) / 2
        hx.globalAlpha = fade * (.15 + front * .85); hx.fillStyle = SPARK; const s = s0 * (.6 + front * .5); hx.fillRect(pv.x + x * R - s / 2, pv.y + y * R - s / 2, s, s)
      }
      // arcs lift off the surface; a bright head runs along each
      ARCS.forEach(([A, B], k) => {
        const om = Math.acos(A[0] * B[0] + A[1] * B[1] + A[2] * B[2]), head = still ? 1 : ((t / 1800 + k / 3) % 1)
        for (let j = 0; j <= 24; j++) {
          const f = j / 24, s1 = Math.sin((1 - f) * om) / Math.sin(om), s2 = Math.sin(f * om) / Math.sin(om), lift = 1 + Math.sin(f * Math.PI) * .25
          const [x, y, z] = rot([(A[0] * s1 + B[0] * s2) * lift, (A[1] * s1 + B[1] * s2) * lift, (A[2] * s1 + B[2] * s2) * lift], a, b), on = Math.abs(f - head) < .06
          hx.globalAlpha = fade * (on ? 1 : .35) * (z > -.2 ? 1 : .3); hx.fillStyle = on ? INK : SPARK; const s = s0 * (on ? 1.1 : .7); hx.fillRect(pv.x + x * R - s / 2, pv.y + y * R - s / 2, s, s)
        }
      })
      hx.globalAlpha = 1
    }

    const drawHands = (t, p) => {
      if (!draw) return
      hx.clearRect(0, 0, hw, hh)
      nearS += (near - nearS) * .08
      const breath = still ? 0 : Math.sin(t / 1700) * 5 + nearS * 10, life = still ? 1 : Math.min(1, (t - born) / 1300), ease = 1 - Math.pow(1 - life, 3)
      const scanU = still ? 2 : ((t / 3200) % 1) * 1.4 - .2, apart = still ? 0 : p * p * hw * .6, fade = Math.max(0, 1 - p * 1.8)
      if (fade > 0) {
        hx.save(); hx.translate(pv.x, pv.y); hx.rotate(ang)
        for (const c of cells) {
          let x = draw.x + c.u * draw.w, y = draw.y + c.v * draw.h
          if (!c.ai) { // human: pixel blocks, revealed from the shoulder to the fingertip
            if (c.u > ease * 1.05) continue
            x += breath - apart; const g = Math.round(90 + c.l * 165)
            hx.globalAlpha = .85 * fade; hx.fillStyle = `rgb(${g},${g},${g - 3})`; hx.fillRect(x, y, HP - 1, HP - 1)
          } else { // AI: blue blocks that assemble from scatter; the marks stay bright, a scan passes over the rest
            const ex = draw.x + c.sx, ey = draw.y + c.sy; x = ex + (x - ex) * ease - breath + apart; y = ey + (y - ey) * ease
            const lit = Math.max(0, 1 - Math.abs(c.u - scanU) * 14)
            hx.globalAlpha = fade * (c.logo ? (hw < 600 ? .95 : .8) : .3 + c.l * .45 + lit * .3); hx.fillStyle = c.logo ? (hw < 600 ? INK : SIGH) : lit > .3 ? SIGH : SIG; hx.fillRect(x, y, HP - 1, HP - 1)
          }
        }
        hx.restore()
      }
      drawWorld(t, p)
    }

    const introText = p => {
      const q = still ? 0 : p
      W1.style.translate = `${-q * 40}vw 0`; W2.style.translate = `${q * 40}vw 0`
      h1.style.opacity = Math.max(0, 1 - p * 2.6); enter.style.opacity = Math.max(0, 1 - p * 5)
      claim.style.opacity = Math.min(1, Math.max(0, (p - .45) / .15))
      if (p > .5 && !claimOn) { claimOn = true; claim.querySelectorAll('.hl').forEach((s, i) => timers.push(setTimeout(() => s.classList.add('on'), still ? 0 : 300 + i * 450))) }
    }

    const off = onFrame((t, y) => {
      const r = intro.getBoundingClientRect()
      if (r.bottom < 0) return // scrolled past: nothing to draw
      const ip = Math.min(1, Math.max(0, y / (intro.offsetHeight - innerHeight)))
      drawHands(t, ip); introText(ip)
    })
    return () => {
      off(); himg.onload = null; timers.forEach(id => { clearTimeout(id); clearInterval(id) })
      removeEventListener('resize', init); stage.removeEventListener('pointermove', move); stage.removeEventListener('pointerleave', leave)
    }
  }, [])

  return (
    <section ref={sec} className="intro" id="top" aria-labelledby="h1">
      <div ref={stg} className="stage" id="stage">
        <canvas ref={cv} id="hands" role="img" aria-label="Two hands reaching for each other across the screen: a human hand in grey pixels and an AI hand in blue pixels carrying the marks of Claude, ChatGPT and Gemini, with a small purple world between the fingertips" />
        <h1 ref={h1r} id="h1" aria-label="Joshua Dampil">
          <span ref={w1} className="w w1" aria-hidden="true"><b>J</b>oshua</span>
          <span ref={w2} className="w w2" aria-hidden="true"><b>D</b>ampil</span>
        </h1>
        <p ref={clm} className="claim" id="claim">Software developer and <span className="hl">AI engineer,</span> building things that <span className="hl">think.</span></p>
        <p ref={ent} className="enter" id="enter">Scroll to enter</p>
      </div>
    </section>
  )
}
