# Portfolio Loop State

current_iteration: 1 (React era)
deliverable: portfolio-react/ (Vite + React 19 + TS + Tailwind v4 + shadcn/ui + motion)
status: SHIPPED — finishing pass complete (2026-06-24), verified in headless Chrome, no console errors

## Loop closed (2026-06-24)
The old single-file HTML loop (run_loop.sh) is retired — it crashed at iter 7/10 on
2026-06-19 and no longer matches the deliverable. run_loop.sh now exits immediately with a
deprecation notice. The React app is the only thing maintained going forward.

## Finishing pass (2026-06-24) — next-iteration candidates resolved
- Contact form: now reads a Formspree id from `VITE_FORMSPREE_ID` (see portfolio-react/.env.example).
  No placeholder token in the markup anymore; with no id it degrades to a prefilled mailto and the
  copy says exactly that ("Opens your email app with everything prefilled") — nothing lies.
  ⏳ Only remaining external step: paste a real Formspree id into .env.local for live submissions.
- Count-up animation on hero stats + project metrics (src/components/CountUp.tsx) — parses the number
  out of strings like "3,000+", "~64%", "<100ms", "1.8→1.1s"; reduced-motion safe; fires once in view.
- 3D cursor tilt on flagship cards (Projects.tsx, springy, disabled for reduced motion).
- OG/social image: public/og.png (1200×630, branded) + og:image/twitter:card meta in index.html.

## Iteration loop (2026-06-24) — friend feedback round (see ITERATION_PROMPT.md)
iteration: 2 · verdict: PASS

changelog:
- Typography → IBM Plex Sans + IBM Plex Mono throughout (chosen over Inter/Space Grotesk).
- Background calmed (no grain, softer/fewer aurora blooms) + constellation rebuilt with 3 depth
  tiers + eased cursor parallax → more immersive without overdoing it.
- Projects: clickable case-study modals already in place; added reserved 16:9 gallery placeholders
  on every project, a structured links row, and a tech-stack filter bar.
- Navbar → full-width bar (transparent at top, glass + hairline on scroll); was a floating pill.
- Hero stat band de-emphasized to a quiet mono strip; removed scroll-arrow; hero height trimmed.
- Experience → click-to-expand accordion, all collapsed by default → time-to-projects ~3.0 → ~1.7
  viewport heights.
- Removed the redundant "Now" section (content duplicated Experience/Projects) to cut clutter.

self_eval: first_impression 8 · time_to_proof 8 · signal_over_noise 8 · scannability 9 · craft 8 ·
perf_a11y 8  → confidence ~88

verified: build green, new code lint-clean, 0 console errors in headless Chrome (1440px + 375px);
full-width nav, slim hero, accordion expand/collapse, filter, galleries + placeholders confirmed.

## Migration note (2026-06-20)
The portfolio was rewritten from the single-file HTML loop into a real React app at
`portfolio-react/`. The old `run_loop.sh` (single-file HTML generator) no longer matches the
deliverable; evaluation is now screenshot-based against the rewritten EVALUATOR_PROMPT.md
(8 axes, immersive/no-flat-boxes bar). Content source of truth remains resume.md →
`portfolio-react/src/data/portfolio.ts`.

## What's implemented
- Reactive canvas particle field (cursor-reactive, flow-hue tinted, reduced-motion safe)
- Scroll-driven cool color flow (violet→blue→cyan→teal→green) via `--flow-hue`
- Layered atmospheric backdrop (aurora blooms + vignette + grain) + per-section ambient glow — no flat boxes
- Hero: photo fades into backdrop (desktop + mobile avatar), headline, 4 proof stats, award chips
- Projects: Osmia + OpenBy flagship case studies (architecture mini-diagram + Problem→Approach→Result + metrics); 4 compact cards with case-study dialogs
- Skills matrix grouped Frontend/Backend/Infra/Data&ML with proficiency dots
- Experience timeline + education; "Now" section; terminal easter-egg (real commands); contact form (Formspree, mailto fallback until id wired) + direct links; footer
- Dark-default theme toggle (localStorage), scroll progress bar, smooth scroll nav incl. mobile

## Self-evaluation (strict hiring-manager rubric) ≈ 15/16
Strong on hook, immersion, color-flow/motion, proof, scannability, copy, distinctive craft.
Only open item: wire a real Formspree form id (currently degrades to prefilled email).

## Next-iteration candidates
- Real Formspree id (or a tiny serverless endpoint) for the contact form
- Count-up animation on hero/metric numbers; optional 3D/tilt on flagship cards
- Per-project deeper case-study pages; OG image; favicon refresh
- Adapt or retire run_loop.sh for the React deliverable (screenshot-in-the-loop evaluator)
