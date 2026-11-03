import { useEffect, useRef } from 'react'
import { still, scramble } from '../lib/loop'

const AWARDS = [
  ['Magna cum laude', 'BS Computer Science, Mapúa Malayan Colleges Laguna', 'August 2026', "Specialisation in machine learning, and a consistent President's Lister."],
  ['Finalist', 'ASEAN AI Hackathon, Vietnam', 'August 2026', 'Selected from 200+ teams across Southeast Asia with an AI-driven education solution built to widen access to learning.'],
  ['Champion', 'Byte Forward Hackathon, South Luzon', 'September 2025', 'An AI tourism platform with LLM voice, translation, recommendations and route planning, built in 24 hours.'],
  ['Top 6', 'Byte Forward Hackathon, Philippines', 'September 2025', 'The same build, ranked 5th in the national round.'],
]
const CERTS = [['Google Professional Data Analytics', 'Google, on Coursera', 'December 2025'], ['CompTIA Tech+', 'CompTIA', 'December 2025']]
// Google Cloud skill badges, each linking to its public verification
const BADGE = 'https://www.cloudskillsboost.google/public_profiles/6b401eaf-82dc-4438-aa77-6928093e330d/badges/'
const BADGES = [
  ['Prepare Data for ML APIs on Google Cloud', 9810831],
  ['Build a Secure Google Cloud Network', 9808895],
  ['Set Up an App Dev Environment on Google Cloud', 9799451],
  ['Implement Load Balancing on Compute Engine', 9797901],
  ['Cloud Computing Foundations: Data, ML, and AI in Google Cloud', 9453260],
  ['Cloud Computing Foundations: Networking & Security in Google Cloud', 9413422],
  ['Cloud Computing Foundations: Infrastructure in Google Cloud', 9403955],
  ['Cloud Computing Foundations: Cloud Computing Fundamentals', 9398496],
]

// awards: a results board on its own field; each result decodes as it comes into view
export function Awards() {
  const board = useRef(null)
  useEffect(() => {
    if (still) return
    const io = new IntersectionObserver(es => es.forEach(e => {
      if (!e.isIntersecting) return
      io.unobserve(e.target); scramble(e.target, { to: e.target.textContent })
    }), { threshold: .4 })
    board.current.querySelectorAll('.res').forEach(el => io.observe(el))
    return () => io.disconnect()
  }, [])
  return (
    <section className="awards chap" id="awards" aria-labelledby="h-awards">
      <h2 id="h-awards" data-reveal>Awards</h2>
      <ul className="board" ref={board}>
        {AWARDS.map(([res, ev, when, line]) => (
          <li key={ev} data-reveal><span className="res">{res}</span><div className="ev"><b>{ev}</b><span className="soft">{when}</span><p>{line}</p></div></li>
        ))}
      </ul>
    </section>
  )
}

// certifications: a quiet list before the close
export function Certifications() {
  return (
    <section className="pad certs chap" id="certifications" aria-labelledby="h-certs">
      <h2 id="h-certs" data-reveal>Certifications</h2>
      <div>
        <ul>
          {CERTS.map(([name, by, when], i) => (
            <li key={name} data-reveal style={{ '--i': i }}><div><b>{name}</b><span className="soft">{by}</span></div><span className="soft">{when}</span></li>
          ))}
        </ul>
        <h3 className="sub" data-reveal>Google Cloud skill badges</h3>
        <ul className="badges">
          {BADGES.map(([name, id], i) => (
            <li key={id} data-reveal style={{ '--i': i % 2 }}>
              <a href={BADGE + id} target="_blank" rel="noopener">{name}<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" aria-hidden="true"><path d="M7 17L17 7M9 7h8v8" /></svg></a>
            </li>
          ))}
        </ul>
      </div>
    </section>
  )
}
