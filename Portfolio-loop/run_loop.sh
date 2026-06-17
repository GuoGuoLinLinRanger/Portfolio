#!/bin/bash
# Portfolio build loop — runs 10 iterations of Claude Code
# Usage: chmod +x run_loop.sh && ./run_loop.sh

set -e

# --- preflight: required tooling -------------------------------------------
if ! command -v claude >/dev/null 2>&1; then
  echo "ERROR: 'claude' CLI not found on PATH." >&2
  echo "Install with: npm install -g @anthropic-ai/claude-code" >&2
  exit 1
fi

# Windows ships Python as 'python'/'py', not 'python3' — detect whatever exists.
PY="$(command -v python3 || command -v python || command -v py || true)"
if [ -z "$PY" ]; then
  echo "ERROR: no Python interpreter found (need python3/python/py to parse evaluator JSON)." >&2
  exit 1
fi

TMPDIR_LOCAL="$(mktemp -d 2>/dev/null || echo /tmp)"
GEN_PROMPT="$TMPDIR_LOCAL/current_prompt.txt"
EVAL_PROMPT="$TMPDIR_LOCAL/eval_prompt.txt"
GEN_RAW="$TMPDIR_LOCAL/gen_raw.html"

ITERATION_FOCUSES=(
  "Build the skeleton: HTML structure, dark theme, section layout, basic nav, hero placeholder. No styling yet — just clean architecture."
  "Build the visual system: load Google Fonts, define CSS custom properties for colors/spacing/type, establish the typography scale, and apply consistent spacing to all sections."
  "Make the hero cinematic. This is the first thing a recruiter sees. Animated text reveal, strong display type, something that communicates exceptional ability instantly. The awards (Citadel 1st, Jane Street 2nd) must appear here or immediately below."
  "Build the projects section. Osmia and OpenBy get the most space. Interactive hover states, tech stack shown contextually, quantified numbers prominent. Make each project feel like a real product, not a homework assignment."
  "Build the awards/achievements section. Citadel 1st place out of 120 teams and Jane Street 2nd out of 80 teams are the lead. Putnam top 10% nationally. Make the numbers feel like art — big, proud, impossible to scroll past."
  "Build the experience timeline. BusPlanner (500K+ line codebase, 35% load time reduction, 40 production defects closed), CS Club (3,000+ students, 99.5% uptime), Solar Car (0% to 70% test coverage). Every bullet leads with the number."
  "Full mobile pass. Test every section at 375px. Fix any overflow, clipping, or layout breakage. Ensure smooth scroll, no jank, no animation that fires on load and breaks layout. Add prefers-reduced-motion support."
  "Micro-interactions pass. Add a scroll progress indicator. Add section fade-ins on scroll (IntersectionObserver). Add hover states on project cards and nav links. Optionally: subtle cursor effect on hero. Nothing gratuitous."
  "Recruiter UX pass. Every link works (LinkedIn, GitHub, email). Add a contact section. Add a resume download button (can be placeholder). Make sure name and role are in the browser tab title. Check that CTAs are clear."
  "Final polish. Read every line of copy out loud. Remove anything that sounds like a template or AI output. Make it sound like Tian Yi Tong wrote it about himself. Remove any decoration that does not serve the brief. This is the version that ships."
)

mkdir -p output

# MAX_ITERS lets you run a subset (e.g. MAX_ITERS=1 ./run_loop.sh for a smoke test).
MAX_ITERS="${MAX_ITERS:-10}"

for i in $(seq 1 "$MAX_ITERS"); do
  echo ""
  echo "━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━"
  echo "  ITERATION $i / 10"
  echo "━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━"

  FOCUS="${ITERATION_FOCUSES[$((i-1))]}"

  PREV_NOTES=$(grep -A 20 "## Notes from last iteration" state.md | tail -n +2 || echo "None — starting fresh.")

  # Build the generation prompt from the template + placeholders.
  PROMPT=$(cat PROMPT_TEMPLATE.md)
  PROMPT="${PROMPT//\{\{ITERATION\}\}/$i}"
  PROMPT="${PROMPT//\{\{ITERATION_FOCUS\}\}/$FOCUS}"
  PROMPT="${PROMPT//\{\{PREVIOUS_NOTES\}\}/$PREV_NOTES}"

  {
    printf '%s\n\n---\nRESUME DATA:\n' "$PROMPT"
    cat resume.md
  } > "$GEN_PROMPT"

  echo "Sending to Claude Code (generation)..."
  # Pipe via stdin so a large prompt never hits the command-line length limit.
  claude -p < "$GEN_PROMPT" > "$GEN_RAW"

  # Extract the actual HTML document — models sometimes wrap it in prose or
  # markdown fences despite the output contract. Slice from the first
  # <!doctype>/<html> through the last </html>; fall back to fence-stripping.
  "$PY" -c '
import sys, re
s = sys.stdin.read()
low = s.lower()
start = low.find("<!doctype html")
if start == -1:
    start = low.find("<html")
end = low.rfind("</html>")
if start != -1 and end != -1:
    s = s[start:end + len("</html>")]
else:
    s = s.strip()
    s = re.sub(r"^```[a-zA-Z]*\s*\n", "", s)
    s = re.sub(r"\n```\s*$", "", s)
sys.stdout.write(s.strip() + "\n")
' < "$GEN_RAW" > "output/portfolio_v${i}.html"

  echo "Saved to output/portfolio_v${i}.html"

  # Run evaluator (HTML passed via stdin — a full portfolio exceeds argv limits).
  echo "Running evaluator..."
  {
    cat EVALUATOR_PROMPT.md
    printf '\n\nHere is the HTML to evaluate:\n'
    cat "output/portfolio_v${i}.html"
  } > "$EVAL_PROMPT"

  EVAL_RESULT=$(claude -p < "$EVAL_PROMPT" 2>/dev/null || echo '{"total": 0, "pass": false, "top_fix": "Evaluator failed"}')

  # Robustly extract total / pass / top_fix even if the JSON is fenced or has prose around it.
  PARSED=$(printf '%s' "$EVAL_RESULT" | "$PY" -c '
import sys, json, re
raw = sys.stdin.read()
m = re.search(r"\{.*\}", raw, re.S)
try:
    d = json.loads(m.group(0)) if m else {}
except Exception:
    d = {}
print(d.get("total", 0))
print(d.get("pass", False))
print(" ".join(str(d.get("top_fix", "")).split()))
' 2>/dev/null || printf '0\nFalse\n\n')

  TOTAL=$(printf '%s\n' "$PARSED" | sed -n '1p');  [ -z "$TOTAL" ]   && TOTAL=0
  PASS=$(printf '%s\n' "$PARSED" | sed -n '2p');   [ -z "$PASS" ]    && PASS=False
  TOP_FIX=$(printf '%s\n' "$PARSED" | sed -n '3p'); [ -z "$TOP_FIX" ] && TOP_FIX="See evaluator output"

  echo "Score: $TOTAL/12 — Pass: $PASS"
  echo "Top fix: $TOP_FIX"

  # Write back to state.md
  cat > state.md << EOF
# Portfolio Loop State

current_iteration: $((i+1))
last_output_file: output/portfolio_v${i}.html
status: in_progress

## Notes from last iteration
Iteration $i score: $TOTAL/12
Top fix identified: $TOP_FIX
Iteration focus was: $FOCUS

## What worked so far
(Review output/portfolio_v${i}.html and add notes manually if needed)

## Evaluator raw output
$EVAL_RESULT
EOF

  echo "state.md updated."

  if [ "$PASS" = "True" ] && [ "$i" -ge 8 ]; then
    echo ""
    echo "✓ Evaluator passed on iteration $i with score $TOTAL/12. Stopping early."
    echo "Final output: output/portfolio_v${i}.html"
    break
  fi

  if [ "$i" -lt "$MAX_ITERS" ]; then
    echo "Waiting 3 seconds before next iteration..."
    sleep 3
  fi
done

echo ""
echo "Loop complete. Final file: $(ls -1t output/portfolio_v*.html 2>/dev/null | head -1)"
echo "Deploy to Vercel: copy that file into your project root as index.html"
