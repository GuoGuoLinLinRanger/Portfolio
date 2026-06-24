#!/bin/bash
# Portfolio build loop — runs 10 iterations of Claude Code
# Usage: chmod +x run_loop.sh && ./run_loop.sh
#
# ⚠️ DEPRECATED (2026-06-24). This is the single-file HTML generator from the
# original loop. The portfolio is now a real React app at ../portfolio-react/
# (the canonical deliverable, deployed to Pages via .github/workflows/static.yml).
# This script no longer matches the deliverable and is kept only for history.
# See state.md for the closed-out loop record. Do not run it against the React app.

set -e
echo "DEPRECATED: superseded by the React app in ../portfolio-react/. See state.md." >&2
exit 0

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

# Which generation prompt to use. Default is the original; the full-stack edition is
# selected with:  PROMPT_FILE=PROMPT_FULLSTACK.md ./run_loop.sh
PROMPT_FILE="${PROMPT_FILE:-PROMPT_TEMPLATE.md}"
if [ ! -f "$PROMPT_FILE" ]; then
  echo "ERROR: prompt file '$PROMPT_FILE' not found." >&2
  exit 1
fi
echo "Using generation prompt: $PROMPT_FILE"

TMPDIR_LOCAL="$(mktemp -d 2>/dev/null || echo /tmp)"
GEN_PROMPT="$TMPDIR_LOCAL/current_prompt.txt"
EVAL_PROMPT="$TMPDIR_LOCAL/eval_prompt.txt"
GEN_RAW="$TMPDIR_LOCAL/gen_raw.html"

# Refinement passes (the site already exists — each iteration IMPROVES it, never rebuilds).
ITERATION_FOCUSES=(
  "Land all the non-negotiables cleanly into the existing site: integrate the photo (Linkedn.png) tastefully, add a sharp scannable skills/tech section, remove the Fraser award, and add a light/dark toggle defaulting to dark. Keep everything that already works."
  "Sharpen the hero hook. The first screen must stop a skeptical hiring manager cold and make Citadel 1st impossible to miss. Tighten the lede to its strongest, most confident form. This is the highest-leverage real estate on the page."
  "Elevate the flagship projects. Osmia and OpenBy must read as real, impressive products — strengthen the live data-viz signature, surface the quantified outcomes (64%, 87%, 4-mo unattended), make the tech stack legible. Cut anything that reads like homework."
  "Make the proof scannable and the numbers feel like art. Awards (1st/2nd/Top 10%) and experience impact metrics should be extractable in seconds and impossible to scroll past. Lead every line with the number."
  "Recruiter-efficiency pass. Can a hiring manager get who-this-is / why-care / what-they-build in under 30 seconds? Improve hierarchy and skimmability, make the skills overview genuinely useful, and cut filler and redundancy."
  "Hooks and micro-interactions. Add purposeful motion that signals craft: count-ups on the big stat numbers, hover-lift on cards/buttons, award numerals animating in, a refined nav. Memorable, never gratuitous."
  "Scrolling and motion quality. Make it buttery: no jank, no layout shift, smooth section flow, animations that never fight the scroll. Respect prefers-reduced-motion fully."
  "Mobile pass. Flawless at 375px — working mobile nav (not hidden-with-no-replacement), no overflow or clipping, comfortable touch targets, readable type. The photo and skills section must work on phones."
  "Polish and correctness. Every link works (LinkedIn, GitHub, email, résumé). No placeholder or dead content. BOTH light and dark modes look intentional. Accessibility: focus states, alt text, contrast. Add title + Open Graph meta for link sharing."
  "Final ruthless edit. Read every word as the strict hiring manager would. Cut anything that does not earn its place. Make the copy sound like Tian wrote it about himself — confident, specific, human. This is the version that ships."
)

mkdir -p output

# MAX_ITERS lets you run a subset (e.g. MAX_ITERS=1 ./run_loop.sh for a smoke test).
MAX_ITERS="${MAX_ITERS:-10}"

# Last KNOWN-GOOD base. Initialized from the seed; only advanced when an iteration
# produces a real full HTML document. This prevents a chat-prose/garbage generation
# from poisoning every later iteration (the loop improves from this, not from v(i-1)).
cp output/seed.html output/_base.html

is_valid_doc() {
  # $1 = file. Real document = has doctype, closing html, and substantial size.
  grep -qi '<!doctype html>' "$1" \
    && grep -qi '</html>' "$1" \
    && [ "$(wc -c < "$1")" -gt 10000 ]
}

for i in $(seq 1 "$MAX_ITERS"); do
  echo ""
  echo "━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━"
  echo "  ITERATION $i / 10"
  echo "━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━"

  FOCUS="${ITERATION_FOCUSES[$((i-1))]}"

  PREV_NOTES=$(grep -A 20 "## Notes from last iteration" state.md | tail -n +2 || echo "None — starting fresh.")

  # Always improve from the last KNOWN-GOOD base (never from a possibly-corrupted v(i-1)).
  PREV_HTML_FILE="output/_base.html"

  # Build the generation prompt from the template + placeholders.
  PROMPT=$(cat "$PROMPT_FILE")
  PROMPT="${PROMPT//\{\{ITERATION\}\}/$i}"
  PROMPT="${PROMPT//\{\{ITERATION_FOCUS\}\}/$FOCUS}"
  PROMPT="${PROMPT//\{\{PREVIOUS_NOTES\}\}/$PREV_NOTES}"

  {
    printf '%s\n\n' "$PROMPT"
    printf -- '---\nCURRENT VERSION OF THE SITE (improve THIS — preserve what works, do not rebuild from scratch):\n'
    if [ -f "$PREV_HTML_FILE" ]; then cat "$PREV_HTML_FILE"; else echo "(no previous version)"; fi
    printf '\n\n---\nRESUME DATA:\n'
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
# Anchor on the REAL document: <!doctype html> immediately followed by <html.
# (Models sometimes narrate above it and even quote "<!DOCTYPE html>" in prose,
# so we must not latch onto a stray mention.)
m = re.search(r"<!doctype html>\s*<html", s, re.I)
if m:
    start = m.start()
else:
    m2 = re.search(r"<html[\s>]", s, re.I)
    start = m2.start() if m2 else None
end = s.lower().rfind("</html>")
if start is not None and end != -1:
    s = s[start:end + len("</html>")]
else:
    s = s.strip()
    s = re.sub(r"^```[a-zA-Z]*\s*\n", "", s)
    s = re.sub(r"\n```\s*$", "", s)
sys.stdout.write(s.strip() + "\n")
' < "$GEN_RAW" > "output/portfolio_v${i}.html"

  # Guard: accept only a real, full HTML document. Otherwise discard it and reuse the last
  # good base, so chat-prose/garbage never propagates forward or gets evaluated as the winner.
  if is_valid_doc "output/portfolio_v${i}.html"; then
    cp "output/portfolio_v${i}.html" "output/_base.html"
    echo "Saved to output/portfolio_v${i}.html (valid document — base advanced)."
  else
    echo "WARNING: iteration $i output was NOT a valid HTML document (chat prose/garbage). Discarding it and reusing the last good base."
    cp "output/_base.html" "output/portfolio_v${i}.html"
  fi

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
