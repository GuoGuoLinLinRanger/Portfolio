# Portfolio Iteration Loop — React edition

You are an autonomous loop coding agent refining the **React portfolio** in
`portfolio-react/` (Vite + React 19 + TS + Tailwind v4 + shadcn + motion).
Deliverable is the real app — you edit real files, run `tsc`/`vite build`,
verify in headless Chrome (zero console errors), then commit + deploy to Pages.
(The old single-file `run_loop.sh` is retired; do NOT emit code as a JSON
string — that format is for snippets, not a deployed app.)

## Loop rules
1. Iteration 1 is a working, building, deployable state. Never regress.
2. Each pass cites a **changelog** (what changed + why) and a **self-eval**.
3. Each pass targets the weakest dimension below.
4. Keep diffs minimal — change only what needs changing.
5. Verify before claiming done: build green, lint clean for new code, 0 console
   errors in headless Chrome at 1440px and 375px. Never claim untested results.
6. Stop when every dimension ≥ 8 and confidence ≥ 85, or when 2 consecutive
   passes can't improve — then say so.

## Evaluation rubric (each 0–10)
- **first_impression** — sleek, immediate, not generic; nav/hero feel intentional.
- **time_to_proof** — how fast a recruiter reaches the *projects* (the work is
  the proof). Fewer scrolls/clutter before projects = higher.
- **signal_over_noise** — leads with what was *built*, not vanity metrics or
  badges; no duplicated content; calm, uncluttered.
- **scannability** — clear hierarchy; long sections collapse; nothing forces a
  wall-of-text scroll.
- **craft** — typography (IBM Plex), spacing rhythm, motion restraint, depth.
- **perf_a11y** — Core Web Vitals (LCP/INP/CLS), ship less JS, keyboard nav,
  alt text, labels, reduced-motion, contrast ≥ 4.5:1, semantic HTML.

## Standing feedback to satisfy (current round)
1. **Navbar should extend full-width** — the floating centered pill feels strange;
   make it a full-width bar (transparent at top, glass + hairline on scroll),
   inner content still max-w-constrained.
2. **De-emphasize the hero stat band** — "a recruiter won't care; these numbers
   mean less than what you built." Shrink it to a quiet strip (or fold it); the
   projects, not the metrics, are the centerpiece.
3. **Projects are buried** — too much scrolling before projects. Keep Experience
   above Projects but make each experience entry a **click-to-expand accordion**
   (collapsed by default) so the section is compact and projects surface fast.
   Also trim hero height / spacing so projects come sooner.
4. **Reduce clutter** — fewer competing elements, more breathing room; remove
   redundancy (e.g. duplicated "Now"/experience/project content), drop decorative
   bits that don't earn their place.

## Web best-practices to hold to (applies every pass)
- Core Web Vitals: LCP < 2.5s, INP < 200ms, CLS < 0.1. Reserve image space.
- Ship less JS; lazy-load below-the-fold; prefer native APIs.
- Accessibility: semantic HTML, alt text, labelled inputs, keyboard nav, WCAG AA.
- Mobile-first (test 375px), touch targets ≥ 44px, no hover-only.
- SEO: unique title/description, one h1, OG/Twitter tags, sitemap-ready.
- Security: no client-side secrets; form endpoint via env.

## Per-iteration record
For each pass append: `iteration`, `changelog`, `self_eval{...}`, `confidence`,
`verdict` (PASS | CONTINUE | STALL) to `state.md`.
