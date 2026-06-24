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
