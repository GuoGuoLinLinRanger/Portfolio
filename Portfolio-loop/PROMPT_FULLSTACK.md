# Portfolio Build (Full-Stack edition) — Iteration {{ITERATION}} of 10

You are a senior UI/UX engineer and front-end developer refining a world-class personal portfolio for **Tian Yi Tong**, repositioned to present him as a **full-stack engineer who ships real systems end to end** (frontend → backend → infrastructure → data).

**You are IMPROVING the CURRENT VERSION of the site, provided near the end of this prompt under "CURRENT VERSION OF THE SITE".** Do not rebuild from scratch and do not discard what works. Preserve the strong parts, apply this iteration's focus, and act first on the hiring manager's critique under "Memory from previous iterations".

**North star:** a skeptical hiring manager — full-stack / platform / product-engineering role at a strong company — lands here and within seconds thinks "this person can build the whole thing, and I want to talk to them." Every change serves that.

**Emphasis & hierarchy (important):** Lead with what Tian BUILDS — his projects and experience as a full-stack engineer are the substance and own the hero and the most space. The awards (Citadel 1st, Jane Street 2nd, Putnam) are supporting credibility shown as compact chips — present and credible, but NOT an oversized hero and NOT the headline. Experience + projects ARE the story.

---

## Candidate (full-stack framing)

Tian Yi Tong — University of Waterloo CS. Full data in the RESUME DATA appended at the end. Frame the full-stack story with his real work:

- **OpenBy** — full-stack on his own: React frontend, FastAPI backend, Supabase, Docker, multi-LLM orchestration. The flagship "I build the whole thing" proof.
- **UWaterloo CS Club** — production platform for 3,000+ students on React/Next.js/TypeScript/GCP, ~99.5% uptime.
- **Real-Time Collaborative Whiteboard** — TypeScript, WebSockets, PostgreSQL, JWT; sub-100ms sync across 20+ users.
- **Osmia** — autonomous system, Python/DuckDB/Linux/systemd, 24/7 for 4+ months (shows backend/infra depth).
- **BusPlanner** internship — C++/C#/ASP.NET/SQL Server across a 500k-line codebase (real production engineering).

Awards are credibility chips, not the lede. There is NO Fraser Institute award.

## Contacts

- Email: tyttong@uwaterloo.ca
- LinkedIn: https://www.linkedin.com/in/tian-yi-tong/
- GitHub: https://github.com/GuoGuoLinLinRanger

---

## Visual direction

Atmospheric, cinematic, dark — inspired by the energy of immersive sites like cornrevolution.resn.global (do NOT copy it). Each scroll feels like moving through a space.

- **Signature background — reactive particle field.** A canvas-based particle network behind the content: points connected by thin lines that link and gently scatter near the cursor, drifting slowly. Atmospheric and premium, never distracting. Requirements: pure canvas 2D (NO external libraries), capped particle count for performance, `requestAnimationFrame`, pause when the tab is hidden, fully disabled under `prefers-reduced-motion`, low opacity so it never hurts text contrast, behind all content (`z-index`/`pointer-events` correct), and responsive/DPR-aware.
- **Cool color flow.** The accent evolves section-to-section as you scroll (a moving hue progression) — tie the particle-field line color to it. Keep the dark base and full readability in every state. Sophisticated, not garish.
- Dark near-black background (e.g. `#0a0a0f`), bold intentional display type paired with a clean body face (Google Fonts), generous spacing, smooth non-janky scrolling.

---

## Non-negotiable requirements (must hold in EVERY iteration's output)

- **Reactive particle-field background** as described above.
- **Interactive skills matrix:** a scannable board grouped Frontend / Backend / Infra & DevOps / Data & ML, with light proficiency cues. Sharp and grep-able in seconds — NOT a generic badge cloud. This is a headline section (full-stack breadth is the point).
- **Project case studies:** the flagships (OpenBy, Osmia) each get a compact architecture mini-diagram (CSS/SVG, no images) and a tight **Problem → Approach → Result** story with the quantified outcome — not just bullets.
- **"Now" section:** a short "what I'm building right now" block (solar-car firmware, autonomous quadcopter) signalling active momentum.
- **Terminal easter-egg:** a subtle interactive mini-terminal where typing a command (e.g. `help`, `about`, `contact`, `projects`) prints a short response. Tasteful and discoverable, never blocking the main content. Keyboard-accessible.
- **Contact section with a working form:** name / email / message fields posting to a Formspree endpoint. Use exactly `action="https://formspree.io/f/REPLACE_WITH_FORM_ID" method="POST"` and add an HTML comment `<!-- TODO: replace REPLACE_WITH_FORM_ID with the real Formspree form id -->`. Real, accessible labels and a clear success/validation affordance. Also show direct links (email, LinkedIn, GitHub) beside the form so contact never depends solely on the form.
- **Photo:** include Tian's real photo with exactly `<img src="Linkedn.png" alt="Tian Yi Tong">`; style it tastefully (clean headshot). Reference that exact filename; do not inline or rename.
- **Light + dark mode:** a toggle defaulting to dark, remembered via `localStorage`.
- **Working nav incl. mobile** (a hamburger or equivalent — never hide links with no replacement), real working links, no dead/placeholder content visible to a recruiter, clean at 375px.

---

## Copy & tone — make it sound HUMAN, not AI (the recruiter must like it)

This is a priority. Rewrite weak copy every pass.

- First person, specific, confident but understated. It should read like Tian wrote it about himself.
- **Ban AI/portfolio clichés:** no "passionate", "results-driven", "leverage", "cutting-edge", "seamless", "robust solutions", "I'm a developer who loves...", "in today's fast-paced world", or hollow superlatives.
- Lead lines with concrete things built and real numbers, not adjectives. Show, don't claim.
- Tighten ruthlessly — short, declarative, a little personality. The intro/hero especially must not sound generated.

---

## This iteration's focus

{{ITERATION_FOCUS}}

---

## Memory from previous iterations — the hiring manager's critique (ACT ON THIS FIRST)

The strict hiring manager's verdict on the previous version. Treat it as the top-priority punch-list:

{{PREVIOUS_NOTES}}

---

## Output rules

- Output ONLY the complete HTML file. No preamble, no explanation, no markdown fences. Your entire response is written verbatim to a `.html` file.
- The first characters must be `<!DOCTYPE html>` and the last `</html>`. No narration before or after.
- All CSS and JS inline in the single file. The only external resources allowed: Google Fonts (CDN `<link>`) and the photo `Linkedn.png` (exact relative path). No frameworks, no other files.
- Keep the particle background and all animation performant; respect `prefers-reduced-motion`. Deploy-ready as a static file.
