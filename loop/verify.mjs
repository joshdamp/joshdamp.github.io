#!/usr/bin/env node
// Build-loop checker: photographs the design and the build at the same scroll points, side by side,
// and fails on console errors, horizontal overflow or a missing section.
//   node loop/verify.mjs <section> [--url http://localhost:4173/]
// Needs Chrome and the tasteskill CDP helper (~/.claude/skills/design-taste-frontend).
import { mkdirSync } from 'node:fs'
import { join, resolve } from 'node:path'
import { homedir } from 'node:os'
import { pathToFileURL } from 'node:url'

const { Browser, sleep } = await import(pathToFileURL(join(homedir(), '.claude/skills/design-taste-frontend/scripts/lib/cdp.mjs')).href)

// [chapter id, offset in screen heights after the chapter starts, optional script to run after scrolling]
const SPEC = {
  foundation: [['top', 0], ['about', 0]],
  intro: [['top', 0], ['top', .9], ['top', 1.6]],
  about: [['about', 0], ['about', 0, "document.getElementById('belt').click()"]],
  experience: [['experience', 0], ['experience', 0, "document.querySelector('.span-row').click()"]],
  work: [['work', 0], ['work', 2.6]],
  awards: [['awards', 0], ['certifications', 0]],
  contact: [['contact', 0], ['contact', 0, "document.getElementById('tile').click()"]],
}
const VIEWS = [{ name: '1440', width: 1440, height: 900 }, { name: '393', width: 393, height: 852, mobile: true, dsf: 2 }]

const args = process.argv.slice(2)
const section = args[0], ui = args.indexOf('--url'), url = ui > -1 ? args[ui + 1] : 'http://localhost:4173/'
if (!SPEC[section]) { console.error('usage: node loop/verify.mjs <' + Object.keys(SPEC).join('|') + '> [--url URL]'); process.exit(2) }
const design = pathToFileURL(resolve('design-preview/index.html')).href
const out = resolve('loop/shots'); mkdirSync(out, { recursive: true })

// the design scrolls an inner box (#sc), the build scrolls the window
const place = ([id, off]) => `(() => { const el = document.getElementById(${JSON.stringify(id)}); if (!el) return false;
  const sc = document.getElementById('sc'), vh = sc ? sc.clientHeight : innerHeight, top = el.previousElementSibling.offsetTop + ${off} * vh;
  sc ? sc.scrollTo(0, top) : scrollTo(0, top); return true })()`

const problems = [], b = await Browser.launch()
try {
  for (const v of VIEWS) for (const [which, target] of [['design', design], ['build', url]]) {
    const p = await b.newPage(v)
    await p.goto(target, { settleMs: 1200 })
    for (const [n, step] of SPEC[section].entries()) {
      if (!(await p.eval(place(step)))) { problems.push(`${which} ${v.name}: #${step[0]} missing`); continue }
      await sleep(1600)
      if (step[2]) { await p.eval(step[2]); await sleep(900) }
      await p.screenshot({ path: join(out, `${section}-${n}-${v.name}-${which}.jpg`) })
      if (step[2]) await p.goto(target, { settleMs: 1200 })
    }
    if (which === 'build') {
      const m = await p.eval('({ sw: document.documentElement.scrollWidth, w: innerWidth })')
      if (m.sw > m.w) problems.push(`build ${v.name}: page is ${m.sw}px wide in a ${m.w}px window`)
      for (const e of p.consoleErrors) problems.push(`build ${v.name}: console error: ${e}`)
    }
    await p.close()
  }
} finally { await b.close() }

console.log(`shots in ${out}: ${section}-<step>-<width>-<design|build>.jpg`)
if (problems.length) { console.log('FAIL\n- ' + problems.join('\n- ')); process.exit(1) }
console.log('PASS (mechanical checks); the screenshots still need a visual comparison')
