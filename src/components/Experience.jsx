import { useEffect, useRef, useState } from 'react'
import { still } from '../lib/loop'

const ROLES = [
  { title: 'Software Engineer', org: 'Freelance', from: '2024-01', to: 'now', when: '2024 to now',
    text: 'Custom machine learning models for classification and object detection, and cross-platform apps across mobile, web and games for 20+ clients. Co-founded a startup in November 2024 that builds programming tools for students and small businesses.' },
  { title: 'AI Specialist Intern', org: 'SN Group, Australia (remote)', from: '2025-11', to: '2026-02', when: 'November 2025 to February 2026',
    text: 'Architected a goal-driven AI automation ecosystem in n8n that manages 30+ clients, replacing manual coach-client tracking with automated data capture.' },
  { title: 'AI Engineer Intern', org: 'Ayala Group Summer Internship Program', from: '2026-06', to: '2026-07', when: 'June to July 2026',
    text: 'Built a 456-question benchmark from three years of P1 and P2 incident and root-cause records to evaluate how accurately LLM agents triage, measured in Langfuse.' },
  { title: 'Solutions Architect Intern', org: 'Globe Telecom, BGC Taguig', from: '2026-06', to: 'now', when: 'June 2026 to now',
    text: "Built and deployed GStat, Globe's service status portal: live status for 18 business services and 85 application service providers, on AWS EKS through Helm and Argo CD, with ownership data from a Git-backed Backstage catalog." },
]

// each role laid on one time axis, from January 2024 to this month
const mon = s => { const [y, m] = s.split('-').map(Number); return y * 12 + m - 1 }
const T0 = mon('2024-01'), T1 = new Date().getFullYear() * 12 + new Date().getMonth() + 1, pct = v => (v - T0) / (T1 - T0) * 100
const span = r => {
  const a = mon(r.from), z = r.to === 'now' ? T1 : mon(r.to) + 1, m = z - a
  return { a: pct(a), w: pct(z) - pct(a), z: pct(z), dur: m >= 12 ? (Math.floor(m / 12) + ' yr ' + (m % 12 ? m % 12 + ' mo' : '')).trim() : m + ' mo' }
}
const Plus = () => <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.4"><path d="M12 5v14M5 12h14" /></svg>

// experience: the career as a trace, each role a span; one opens at a time
export default function Experience() {
  const [open, setOpen] = useState(3)
  const trace = useRef(null)
  useEffect(() => {
    if (still) { trace.current.classList.add('in'); return }
    const io = new IntersectionObserver(es => es.forEach(e => { if (e.isIntersecting) { trace.current.classList.add('in'); io.disconnect() } }), { threshold: .2 })
    io.observe(trace.current)
    return () => io.disconnect()
  }, [])
  return (
    <section className="pad exp chap" id="experience" aria-labelledby="h-exp">
      <h2 id="h-exp" data-reveal>Experience</h2>
      <div className="trace" ref={trace}>
        <div className="axis" aria-hidden="true">
          <span />
          <div className="ticks">
            {[2024, 2025, 2026].filter(y => y * 12 < T1).map(y => <span key={y} style={{ left: pct(y * 12) + '%' }}>{y}</span>)}
            <span style={{ right: 0, color: 'var(--spark)' }}>Now</span>
          </div>
          <span />
        </div>
        {ROLES.map((r, i) => {
          const s = span(r), on = open === i
          return [
            <button key={'b' + i} className="span-row" type="button" aria-expanded={on} aria-controls={'sp-' + i} onClick={() => setOpen(on ? -1 : i)}>
              <span className="who"><b>{r.title}</b><span>{r.org}</span></span>
              <span className="lane">
                <span className={'bar' + (r.to === 'now' ? ' on' : '') + (s.z > 90 ? ' inside' : '')} style={{ '--a': s.a + '%', '--w': s.w + '%', '--i': i }}><span className="dur">{s.dur}</span></span>
              </span>
              <span className="tog" aria-hidden="true"><Plus /></span>
            </button>,
            <div key={'d' + i} className="span-detail" id={'sp-' + i} hidden={!on}>
              <p>{r.text}<span className="when soft" style={{ display: 'block' }}>{r.when}</span></p>
            </div>,
          ]
        })}
      </div>
    </section>
  )
}
