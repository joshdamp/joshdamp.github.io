import { useEffect, useRef, useState } from 'react'
import useClock from '../lib/useClock'

const Arrow = () => <svg className="go" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" aria-hidden="true"><path d="M5 12h14M13 6l6 6-6 6" /></svg>
const EMAIL = 'joshuadamps@gmail.com'

function Copy() {
  const [label, setLabel] = useState('Copy'), timer = useRef(0)
  useEffect(() => () => clearTimeout(timer.current), [])
  const copy = async () => {
    try { await navigator.clipboard.writeText(EMAIL); setLabel('Copied') } catch { setLabel('Copy failed') }
    clearTimeout(timer.current); timer.current = setTimeout(() => setLabel('Copy'), 1600)
  }
  return <button className="copy" type="button" onClick={copy}>{label}</button>
}

// contact: the close. One big line, the ways to reach him, the time where he is
export default function Contact() {
  const clock = useClock()
  return (
    <footer className="chap" id="contact" aria-labelledby="h-contact">
      <h2 className="close" id="h-contact" data-reveal>Let's get the <b>j</b>ob <b>d</b>one.</h2>
      <div className="reach">
        <ul className="ways">
          <li data-reveal style={{ '--i': 1 }}><span className="soft">Email</span><a href={'mailto:' + EMAIL}>{EMAIL}</a><Copy /></li>
          <li data-reveal style={{ '--i': 2 }}><span className="soft">LinkedIn</span><a href="https://www.linkedin.com/in/joshua-dampil/" target="_blank" rel="noopener">joshua-dampil</a><Arrow /></li>
          <li data-reveal style={{ '--i': 3 }}><span className="soft">GitHub</span><a href="https://github.com/joshdamp" target="_blank" rel="noopener">joshdamp</a><Arrow /></li>
          <li data-reveal style={{ '--i': 4 }}><span className="soft">CV</span><a href="/Joshua_Dampil_CV.pdf" download="Joshua_Dampil_CV.pdf" target="_blank" rel="noopener">Download my CV</a><Arrow /></li>
        </ul>
        <div className="now" data-reveal style={{ '--i': 2 }}>
          <p className="clockbig">{clock}</p>
          <p><span className="live" aria-hidden="true" />In Muntinlupa, Philippines. Currently a Solutions Architect Intern at Globe Telecom.</p>
          <a className="btn" href={'mailto:' + EMAIL}>Email me <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" aria-hidden="true"><path d="M5 12h14M13 6l6 6-6 6" /></svg></a>
        </div>
      </div>
    </footer>
  )
}
