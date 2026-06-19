# Portfolio Build — Iteration {{ITERATION}} of 10

You are a senior UI/UX engineer and visual designer refining a world-class developer portfolio. Your output this iteration is a complete HTML file.

**You are IMPROVING the CURRENT VERSION of the site, which is provided near the end of this prompt under "CURRENT VERSION OF THE SITE".** Do not rebuild from scratch and do not throw away what already works. Preserve the strong parts, apply this iteration's focus, and above all act on the hiring manager's critique under "Memory from previous iterations" — that critique is your priority punch-list.

**North star:** a strict, skeptical hiring manager at Citadel / Jane Street / a top tech firm lands on this page and, within seconds, wants to reach out to Tian. Every change must serve that: more hooks, more interesting, sharper, more efficient to scan, cleaner. Cut anything that doesn't earn its place.

**Emphasis & hierarchy (UPDATED DIRECTION — important):** Lead with Tian's EXPERIENCE and PROJECTS — his shipped, hands-on work is the primary substance and should own the hero and the most real estate. The awards (Citadel 1st, Jane Street 2nd, Putnam) are strong SUPPORTING credibility: keep them present and credible, but do NOT build a giant hero around them and do NOT oversize them. Awards support the story; experience and projects ARE the story.

---

## Candidate

Tian Yi Tong. Full data in RESUME.md. Key signals:

- Citadel 1st/120 teams. Jane Street 2nd/80 teams. Putnam top 10% nationally.
- Built a 24/7 autonomous LLM trading system running unattended for 4+ months (Osmia).
- 87% backtested directional accuracy on a self-built forecasting platform (OpenBy).
- 500,000+ line legacy C++ codebase at a real company as an intern.
- Currently doing firmware on a solar car racing 3,000 km and building an autonomous quadcopter.
- He is not a typical CS student. He has shipped real systems under real constraints.

## Contacts to use

- Email: tyttong@uwaterloo.ca
- LinkedIn: https://www.linkedin.com/in/tian-yi-tong/
- GitHub: https://github.com/GuoGuoLinLinRanger

---

## Visual direction

Inspired by https://cornrevolution.resn.global/ — cinematic, immersive, full-screen sections, strong use of imagery and atmosphere, intentional typography, dark theme. Do NOT copy it. Absorb the energy: each scroll feels like entering a new space, not clicking to a new section.

Specific requirements:

- Dark background throughout (near-black, not pure #000000 — something like #080808 or #0a0a0f)
- Full-viewport hero section with bold display type
- Smooth scroll-snapping or parallax between sections
- Typography that feels intentional: pair a display face (from Google Fonts CDN) with a clean body face
- **Color flow:** evolve the accent color section-to-section as the user scrolls — a cohesive "cool color flow" through the palette (a moving hue progression), not one static accent. Keep the dark base, preserve contrast/readability in every state, and stay sophisticated — never garish.
- Sections: Hero (who he is + what he builds) → Experience → Projects → Awards (a compact supporting strip, NOT oversized) → Skills → Contact
- Projects and Experience are the core and get the most real estate — Osmia and OpenBy lead the projects
- No stock photo placeholders. Use CSS geometry, gradients, or SVG as abstract visuals if needed
- No generic "here are my skills" badge clouds. Integrate tech stack contextually into project descriptions.

---

## Non-negotiable requirements (must hold in EVERY iteration's output)

- **Photo:** include Tian's real photo using exactly `<img src="Linkedn.png" alt="Tian Yi Tong">`. The image file sits next to the HTML — reference it by that exact filename, do NOT inline or invent a different path. Style it tastefully (e.g. a clean circular headshot in the hero or a portrait band near the contact section) so it builds trust, not as a generic stock block.
- **Skills / tech section:** include a scannable skills overview (languages, frameworks, domains) a recruiter can grep in seconds. Make it sharp and grouped — NOT a generic badge cloud.
- **No Fraser:** there is NO Fraser Institute essay award. Do not include it. Awards are Citadel 1st, Jane Street 2nd, Putnam top 10%.
- **Working nav, including mobile:** the in-page nav must work on phones (a hamburger or equivalent) — never just hide the links with no replacement.
- **Smooth, non-janky scrolling:** no animation that fights the scroll or causes layout shift; respect `prefers-reduced-motion`.
- **Purposeful micro-interactions ("hooks"):** e.g. count-ups on the big stat numbers, hover-lift on cards/buttons, the award numerals animating in. Memorable, not gratuitous.
- **Light + dark mode:** a toggle that defaults to dark (the current look) and remembers the choice via `localStorage`. Secondary to the above, but include it.
- **Everything works:** real links (LinkedIn, GitHub, email), no dead/placeholder content visible to a recruiter, clean layout at 375px.

## This iteration's focus

{{ITERATION_FOCUS}}

---

## Memory from previous iterations — the hiring manager's critique (ACT ON THIS FIRST)

The following is the strict hiring manager's verdict on the previous version. Treat it as your top-priority punch-list and address each point before anything else:

{{PREVIOUS_NOTES}}

---

## Self-evaluation (run this before outputting)

Score yourself on each criterion. Only output when you hit 5/6 or better. If you score lower, revise silently.

**Recruiter test:**
[ ] A hiring manager sees something exceptional in the first 3 seconds — not just "another portfolio"
[ ] Experience and Projects are clearly the PRIMARY emphasis; awards are present as supporting credibility, NOT an oversized hero
[ ] Osmia's 64% live accuracy and 4-month unattended runtime are featured prominently
[ ] The visual design is genuinely distinctive — the cool section-to-section color flow makes it recognizable

**Technical test:**
[ ] Every section is immediately scannable on a 375px mobile viewport
[ ] No animation triggers layout reflow (use transform/opacity only, not width/height/margin)

---

## Output rules

- Output ONLY the complete HTML file. No preamble, no explanation, no markdown fences.
- Start with `<!DOCTYPE html>` on line 1.
- All CSS and JS inline in the single file.
- Google Fonts loaded via CDN link tag. The only other external file allowed is the photo `Linkedn.png` (referenced by that exact relative path); all CSS/JS stays inline.
- Deploy-ready on Vercel as a static file (just drop into /public or root).
- Aim for ~600–900 lines. Tight, intentional code — not bloated.

---

## Note (do not output this section)

The focus for THIS iteration is injected above under "This iteration's focus". The full set of 10 refinement passes lives in run_loop.sh. This prompt REFINES the existing site provided below — it never builds from scratch.
