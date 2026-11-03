import { useEffect, useRef, useState } from 'react'
import { still } from '../lib/loop'
import { PROXY, SYSTEM, LOCAL, SUGG } from '../data/assistant'

const ease = 'cubic-bezier(.2,.8,.2,1)'
const FALLBACK = "I don't have that one. Email Joshua at joshuadamps@gmail.com and he'll answer."
const Arrow = () => <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" aria-hidden="true"><path d="M5 12h14M13 6l6 6-6 6" /></svg>

// Gemini through Josh's Cloudflare Worker; offline, blocked or off his domain, the built-in answers reply
async function answer(history, text) {
  try {
    const res = await fetch(PROXY, {
      method: 'POST', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify({
        system_instruction: { parts: [{ text: SYSTEM }] },
        contents: [...history, { role: 'user', parts: [{ text }] }],
        generationConfig: { temperature: 0.6, maxOutputTokens: 700 },
      }),
    })
    if (res.ok) { const reply = (await res.json()).candidates?.[0]?.content?.parts?.[0]?.text; if (reply) return reply }
  } catch { /* fall back below */ }
  return (LOCAL.find(([re]) => re.test(text)) || [0, FALLBACK])[1]
}

// the assistant: a tile at the corner that opens into a Q&A card
export default function Assistant() {
  const [open, setOpen] = useState(false), [msgs, setMsgs] = useState([]), [busy, setBusy] = useState(false), [ti, setTi] = useState(0)
  const card = useRef(null), tile = useRef(null), input = useRef(null), qa = useRef(null), tease = useRef(null), history = useRef([]), first = useRef(true)

  useEffect(() => {
    if (first.current) { first.current = false; return }
    if (open) { input.current.focus(); if (!still) card.current.animate([{ opacity: 0, transform: 'translateY(16px)' }, { opacity: 1, transform: 'none' }], { duration: 320, easing: ease }) }
    else tile.current.focus()
  }, [open])
  // the collapsed tile cycles through what you could ask
  useEffect(() => {
    if (still || open) return
    const id = setInterval(() => setTi(i => (i + 1) % SUGG.length), 3200)
    return () => clearInterval(id)
  }, [open])
  useEffect(() => { if (ti) tease.current.animate([{ opacity: 0, transform: 'translateY(6px)' }, { opacity: 1, transform: 'none' }], { duration: 360, easing: ease }) }, [ti])
  useEffect(() => {
    const esc = e => { if (e.key === 'Escape' && open && document.getElementById('menu')?.hidden) setOpen(false) }
    addEventListener('keydown', esc)
    return () => removeEventListener('keydown', esc)
  }, [open])
  useEffect(() => { qa.current.scrollTop = qa.current.scrollHeight }, [msgs, busy])

  const send = async raw => {
    const text = raw.trim()
    if (!text || busy) return
    setOpen(true); setMsgs(m => [...m, { q: text }]); setBusy(true); input.current.value = ''
    const reply = await answer(history.current, text)
    history.current.push({ role: 'user', parts: [{ text }] }, { role: 'model', parts: [{ text: reply }] })
    setMsgs(m => [...m, { a: reply.replace(/\*\*/g, '').replace(/^\s*[*-] /gm, '• ') }]); setBusy(false)
  }

  return (
    <div className="chat">
      <section ref={card} className="card" id="card" hidden={!open} aria-label="Ask about Joshua">
        <header><span>Ask about me<span className="soft">Answered by Joshua's assistant</span></span><button className="min" type="button" aria-label="Minimize" title="Minimize" onClick={() => setOpen(false)}><svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.6" strokeLinecap="round" aria-hidden="true"><path d="M6 12h12" /></svg></button></header>
        <div ref={qa} className="qa" aria-live="polite">
          <p className="intro">Ask me about Joshua's projects, his work at Globe Telecom, his studies or how to reach him.</p>
          <ul className="sugg" hidden={msgs.length > 0}>
            {SUGG.map(t => <li key={t}><button type="button" onClick={() => send(t)}>{t}<Arrow /></button></li>)}
          </ul>
          {msgs.map((m, i) => m.q ? <p key={i} className="q">{m.q}</p> : <p key={i} className="a">{m.a}</p>)}
          {busy && <p className="a thinking">Thinking</p>}
        </div>
        <form className="field" onSubmit={e => { e.preventDefault(); send(input.current.value) }}>
          <label htmlFor="q">Your question</label><input ref={input} id="q" autoComplete="off" placeholder="Type a question" /><button className="txt-btn" type="submit">Ask</button>
        </form>
      </section>
      <button ref={tile} className="ask-tile" id="tile" type="button" hidden={open} aria-expanded={open} aria-controls="card" onClick={() => setOpen(true)}>
        <span><span className="live" aria-hidden="true" />Ask about me<span ref={tease} className="soft">{SUGG[ti]}</span></span>
        <span className="open" aria-hidden="true"><svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M7 17L17 7M9 7h8v8" /></svg></span>
      </button>
    </div>
  )
}
