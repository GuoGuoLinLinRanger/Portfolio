# Portfolio Loop State

current_iteration: 1 (React era)
deliverable: portfolio-react/ (Vite + React 19 + TS + Tailwind v4 + shadcn/ui + motion)
status: passing baseline — verified in headless Chrome, no console errors

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
