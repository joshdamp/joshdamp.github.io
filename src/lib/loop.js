// One animation loop for the whole page: every canvas and scroll effect subscribes to it
export const still = matchMedia('(prefers-reduced-motion: reduce)').matches
const css = getComputedStyle(document.documentElement)
export const token = (name, fallback) => css.getPropertyValue(name).trim() || fallback
export const GLY = 'abcdefghijklmnopqrstuvwxyz'

const subs = new Set()
let raf = 0
const frame = t => {
  const y = scrollY
  for (const fn of subs) fn(t, y)
  raf = subs.size ? requestAnimationFrame(frame) : 0
}

export function onFrame(fn) {
  subs.add(fn)
  if (!raf) raf = requestAnimationFrame(frame)
  return () => subs.delete(fn)
}

// sizes a canvas to its box at the device pixel ratio; returns the box in CSS pixels
export function fitCanvas(c) {
  const d = devicePixelRatio || 1, w = c.clientWidth, h = c.clientHeight
  c.width = w * d; c.height = h * d
  c.getContext('2d').setTransform(d, 0, 0, d, 0, 0)
  return { w, h }
}

// letters run through random glyphs until they settle on the text, left to right
export function scramble(el, { from = el.textContent, to, ms = 700, render = s => { el.textContent = s } } = {}) {
  const t0 = performance.now()
  const step = t => {
    const k = Math.min(1, (t - t0) / ms), len = Math.round(from.length + (to.length - from.length) * k)
    let s = ''
    for (let i = 0; i < len; i++) s += to[i] === ' ' || i < k * to.length ? (to[i] ?? '') : GLY[Math.random() * 26 | 0]
    render(s)
    if (k < 1) requestAnimationFrame(step)
  }
  requestAnimationFrame(step)
}
