import { Fragment, useEffect } from 'react'
import Field from './components/Field'
import Band from './components/Band'
import Flow from './components/Flow'
import Intro from './components/Intro'
import About from './components/About'

// each section sits after a zero-height mark that records where it starts in the flow
const Mark = () => <i aria-hidden="true" />

export default function App() {
  // reveal once, as each piece comes into view
  useEffect(() => {
    const io = new IntersectionObserver(es => es.forEach(e => {
      if (e.isIntersecting) { e.target.classList.add('in'); io.unobserve(e.target) }
    }), { threshold: .15 })
    document.querySelectorAll('[data-reveal]').forEach(el => io.observe(el))
    return () => io.disconnect()
  }, [])

  return (
    <>
      <Field />
      <main>
        <Band />
        {[
          <Intro key="top" />,
          <About key="about" />,
          <section key="experience" className="pad exp chap" id="experience" />,
          <section key="work" className="space" id="work" />,
          <section key="awards" className="awards chap" id="awards" />,
          <section key="certifications" className="pad certs chap" id="certifications" />,
          <footer key="contact" className="chap" id="contact" />,
        ].map(s => <Fragment key={s.key}><Mark />{s}</Fragment>)}
      </main>
      <Flow />
    </>
  )
}
