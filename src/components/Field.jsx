import { useEffect, useRef } from 'react'
import { onFrame, fitCanvas, still, token } from '../lib/loop'

// the background: a grid of points that breathes, follows scroll speed and parts around the pointer
export default function Field() {
  const ref = useRef(null)
  useEffect(() => {
    const fc = ref.current, fx = fc.getContext('2d'), PITCH = 26, INK = token('--ink', '#f1f2ef'), SIG = token('--signal', '#5b8cff')
    let fw = 0, fh = 0, vel = 0, lastY = scrollY, last = performance.now()
    const ptr = { x: -999, y: -999, k: 0 }
    const size = () => ({ w: fw, h: fh } = fitCanvas(fc))
    const move = e => { ptr.x = e.clientX; ptr.y = e.clientY; ptr.k = 1 }
    const leave = () => { ptr.k = 0 }
    size()
    addEventListener('resize', size); addEventListener('pointermove', move); document.addEventListener('pointerleave', leave)
    const off = onFrame((t, y) => {
      const dt = Math.min(.05, (t - last) / 1000); last = t
      vel = vel * .9 + Math.abs(y - lastY) / Math.max(dt, .016) * .1; lastY = y
      if (still) t = 0
      fx.clearRect(0, 0, fw, fh)
      const o = -(y * .25) % PITCH, amp = .11 + Math.min(.14, vel * .0008), T = t * .0005
      for (let gy = o - PITCH; gy < fh + PITCH; gy += PITCH) for (let gx = PITCH / 2; gx < fw; gx += PITCH) {
        const wave = .5 + .5 * Math.sin(gx * .005 + (gy - o + y * .25) * .007 - T * 1.2)
        const dx = gx - ptr.x, dy = gy - ptr.y, d = Math.hypot(dx, dy), k = d < 220 ? Math.pow(1 - d / 220, 1.6) * ptr.k : 0
        const push = k * 10, x2 = gx + (d ? dx / d * push : 0), y2 = gy + (d ? dy / d * push : 0)
        const s = 1.3 + wave * .8 + k * 2.8
        fx.globalAlpha = .07 + wave * wave * amp + k * .8; fx.fillStyle = k > .45 ? SIG : INK; fx.fillRect(x2 - s / 2, y2 - s / 2, s, s)
      }
      fx.globalAlpha = 1
    })
    return () => { off(); removeEventListener('resize', size); removeEventListener('pointermove', move); document.removeEventListener('pointerleave', leave) }
  }, [])
  return <canvas id="field" ref={ref} aria-hidden="true" />
}
