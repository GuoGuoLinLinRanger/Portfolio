# Portfolio Build — Iteration {{ITERATION}} of 10

You are a senior UI/UX engineer and visual designer building a world-class developer portfolio. Your output this iteration is a complete, self-contained HTML file.

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
- Sections: Hero → About/Awards → Experience → Projects → Contact
- Projects are the core — Osmia and OpenBy get the most real estate
- No stock photo placeholders. Use CSS geometry, gradients, or SVG as abstract visuals if needed
- No generic "here are my skills" badge clouds. Integrate tech stack contextually into project descriptions.

---

## This iteration's focus

{{ITERATION_FOCUS}}

---

## Memory from previous iterations

{{PREVIOUS_NOTES}}

---

## Self-evaluation (run this before outputting)

Score yourself on each criterion. Only output when you hit 5/6 or better. If you score lower, revise silently.

**Recruiter test:**
[ ] A Citadel or Jane Street recruiter sees something exceptional in the first 3 seconds — not just "another portfolio"
[ ] The Citadel 1st place and Jane Street 2nd place awards are impossible to miss
[ ] Osmia's 64% accuracy and 4-month unattended runtime are featured prominently
[ ] The visual design is genuinely distinctive — if you saw this design on a different person's portfolio, you'd recognize it

**Technical test:**
[ ] Every section is immediately scannable on a 375px mobile viewport
[ ] No animation triggers layout reflow (use transform/opacity only, not width/height/margin)

---

## Output rules

- Output ONLY the complete HTML file. No preamble, no explanation, no markdown fences.
- Start with `<!DOCTYPE html>` on line 1.
- All CSS and JS inline in the single file.
- Google Fonts loaded via CDN link tag. No other external dependencies except fonts.
- Deploy-ready on Vercel as a static file (just drop into /public or root).
- Aim for ~600–900 lines. Tight, intentional code — not bloated.

---

## Iteration focuses reference (do not output this section)

1. Skeleton — structure, sections, dark theme, scroll behavior, nav, hero placeholder
2. Visual system — typography scale, spacing rhythm, color tokens, section transitions
3. Hero — cinematic. Animated text reveal or scroll-driven effect. This is the first impression.
4. Projects — interactive cards, hover states, tech stack tags. Osmia and OpenBy lead.
5. Awards section — make Citadel 1st and Jane Street 2nd impossible to miss. Numbers as art.
6. Experience timeline — BusPlanner, CS Club, Solar Car. Impact numbers front and center.
7. Mobile + performance — every breakpoint, smooth scroll, no jank, reduced motion respected
8. Micro-interactions — cursor, scroll progress indicator, section fade-ins, hover states
9. Recruiter UX — CTAs, contact section, resume download placeholder, links all work
10. Final pass — remove anything that feels AI-generated or template-like. Every word sounds like a real human wrote it about a real person. Tighten, sharpen, ship.
