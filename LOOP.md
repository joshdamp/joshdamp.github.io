# Build loop: the portfolio redesign

This file is the spec and the log for porting the approved design into the React + Vite site. A coding agent (Claude) ports one section per round. A separate checker then compares that section with the design, and a failed check sends the round back.

## The spec

- **Design source of truth:** `design-preview/index.html`, built from the design system artifact "Joshua Dampil, Portfolio System" (https://claude.ai/artifact/B1sCJFi88mNp4cEibKHeZu).
- **Target:** React 19 + Vite 6, built to `docs/`, which GitHub Pages serves.
- **Same look, same motion, same words** as the design. The one change is that the page scrolls the window instead of an inner box.
- **Copy rules:**
  - Never say "AI-native".
  - Say "built", never "shipped".
  - Leave the phone number off.
  - Globe stays as his current role.
- **The chatbot** stays on Gemini through the Cloudflare Worker. On localhost it falls back to built-in answers, because the Worker only accepts joshdamp.github.io.

## One round

1. **Port** one section into `src/` (components, CSS, data).
2. **Build** with `npm run build`. A build error fails the round.
3. **Check** with `node loop/verify.mjs <section>`. The script screenshots the design and the build side by side at 1440 and 393 wide, at fixed scroll points, and saves them to `loop/shots/`. It fails the round on any of these:
   - a console error;
   - horizontal overflow;
   - a missing section.
4. **Judge.** A separate verifier agent reads the screenshot pairs and the section's spec. It replies PASS, or FAIL with a list of differences.
5. **On PASS:** commit with the message `feat(redesign): <section>` and go to the next section.
6. **On FAIL:** fix the listed differences and go back to step 2. After 3 failed fixes, stop and log the section as blocked.

The loop never pushes or deploys. It ends with a pull request to `master`, and merging that pull request is what publishes the site.

## Sections

| # | Section | What it covers | Status |
|---|---|---|---|
| 1 | foundation | tokens, global CSS, fonts, background field, top band and phone menu, flow bar, chapter pinning, reveal | done |
| 2 | intro | pixel hands with the AI marks, the purple world, the JD name cycle, the dive and the claim | done |
| 3 | about | logo-mosaic portrait, stack belt, stack dialog, lit statement | done |
| 4 | experience | trace timeline, toggles, durations | done |
| 5 | work | the fly-through of eight projects | done |
| 6 | awards | results board and certifications | done |
| 7 | contact | the close, contact rows, clock, assistant tile and card | done |
| 8 | final | remove the old components and assets, production build to `docs/`, run the inspector, open the pull request | pending |

## Log

Each round appends a line here: the section, the attempt number, the result, and what was fixed.

- foundation, attempt 1: PASS. Mechanical checks clean; the verifier found only animation-phase differences (logo scan line, dot grid).
- intro, attempt 1: PASS. Hands, marks, globe, name cycle, claim and dive match at both widths.
- about, attempt 1: PASS. Mosaic portrait, belt, stack dialog and statement match at both widths.
- experience, attempt 1: PASS. Axis, spans, durations, toggles and one-open-at-a-time match at both widths.
- work, attempt 1: PASS. Fly-through screens, captions and hint match at both widths. (Fixed before checking: a stray extra frame subscriber.)
- awards, attempt 1: PASS. Results board and certifications match at both widths.
- contact, attempt 1: PASS. Close, contact rows, clock, tile and card match at both widths. Fixed a bug the check exposed, also present in the design: the card's intro paragraph took the hero's .intro height (260vh) and hid the suggestions. The assistant answered live through the Worker in a headless test.
