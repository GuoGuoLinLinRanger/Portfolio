import { useEffect, useRef, useState } from "react"

/**
 * A star-map section nav down the LEFT edge: each section is a node, wired into
 * one constellation. A glowing "traveler" glides smoothly ALONG the line as you
 * scroll (continuous, not snapping node-to-node), the line fills behind it, and
 * the nearest node lights up with its label. Click a node to jump. Desktop only
 * (xl+, where there's gutter); the top nav covers smaller screens.
 */

type Node = { id: string; label: string; x: number; y: number }

// hand-placed asterism (varied x → a real constellation feel, not a zigzag)
const NODES: Node[] = [
  { id: "top", label: "Home", x: 24, y: 24 },
  { id: "experience", label: "Experience", x: 54, y: 74 },
  { id: "work", label: "Work", x: 30, y: 126 },
  { id: "awards", label: "Awards", x: 58, y: 178 },
  { id: "skills", label: "Skills", x: 34, y: 230 },
  { id: "contact", label: "Contact", x: 18, y: 282 },
]
const W = 76
const H = 306

const clampIdx = (i: number) => Math.max(0, Math.min(NODES.length - 1, i))

export function ConstellationNav() {
  const [t, setT] = useState(0) // continuous position along the constellation
  const [hover, setHover] = useState<number | null>(null)
  const targetRef = useRef(0)
  const tRef = useRef(0)
  const rafRef = useRef(0)

  useEffect(() => {
    const computeTarget = () => {
      // anchor each node to its section's CENTER (not top) and compare against
      // the viewport center, so at the top of the page the traveler sits on the
      // first node instead of already drifting toward the second.
      const anchors = NODES.map((n) => {
        const el = document.getElementById(n.id)
        if (!el) return 0
        const r = el.getBoundingClientRect()
        return r.top + window.scrollY + r.height / 2
      })
      const refY = window.scrollY + window.innerHeight / 2
      const last = anchors.length - 1
      let tt = 0
      if (refY <= anchors[0]) tt = 0
      else if (refY >= anchors[last]) tt = last
      else {
        for (let i = 0; i < last; i++) {
          if (refY >= anchors[i] && refY < anchors[i + 1]) {
            tt = i + (refY - anchors[i]) / ((anchors[i + 1] - anchors[i]) || 1)
            break
          }
        }
      }
      targetRef.current = tt
      startLoop()
    }

    const loop = () => {
      const target = targetRef.current
      const next = tRef.current + (target - tRef.current) * 0.16
      if (Math.abs(target - next) < 0.002) {
        tRef.current = target
        setT(target)
        rafRef.current = 0
        return
      }
      tRef.current = next
      setT(next)
      rafRef.current = requestAnimationFrame(loop)
    }
    const startLoop = () => {
      if (!rafRef.current) rafRef.current = requestAnimationFrame(loop)
    }

    const onScroll = () => computeTarget()
    computeTarget()
    window.addEventListener("scroll", onScroll, { passive: true })
    window.addEventListener("resize", onScroll)
    return () => {
      window.removeEventListener("scroll", onScroll)
      window.removeEventListener("resize", onScroll)
      if (rafRef.current) cancelAnimationFrame(rafRef.current)
    }
  }, [])

  const go = (id: string) => document.getElementById(id)?.scrollIntoView({ behavior: "smooth" })

  // interpolate the traveler position along the polyline
  const ti = Math.floor(t)
  const tf = t - ti
  const a = NODES[clampIdx(ti)]
  const b = NODES[clampIdx(ti + 1)]
  const tx = a.x + (b.x - a.x) * tf
  const ty = a.y + (b.y - a.y) * tf
  const activeIdx = Math.round(t)

  const basePts = NODES.map((n) => `${n.x},${n.y}`).join(" ")
  const filledPts = [...NODES.slice(0, ti + 1).map((n) => `${n.x},${n.y}`), `${tx},${ty}`].join(" ")

  return (
    <nav
      aria-label="Sections"
      className="pointer-events-none fixed left-4 top-1/2 z-40 hidden -translate-y-1/2 xl:block"
      style={{ width: W, height: H }}
    >
      <svg
        width={W}
        height={H}
        viewBox={`0 0 ${W} ${H}`}
        fill="none"
        className="absolute inset-0 overflow-visible"
        aria-hidden="true"
      >
        <polyline
          points={basePts}
          strokeOpacity="0.2"
          strokeWidth="1.2"
          strokeLinecap="round"
          strokeLinejoin="round"
          style={{ stroke: "var(--flow)" }}
        />
        <polyline
          points={filledPts}
          strokeOpacity="0.9"
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
          style={{ stroke: "var(--flow)" }}
        />
        {NODES.map((n, i) => {
          const passed = i <= t + 0.05
          const isActive = i === activeIdx
          return (
            <circle
              key={n.id}
              cx={n.x}
              cy={n.y}
              r={isActive ? 4.5 : 3}
              opacity={passed ? 1 : 0.4}
              style={{ fill: "var(--flow)", transition: "r 0.2s ease, opacity 0.2s ease" }}
            />
          )
        })}
        {/* the smooth traveler */}
        <circle cx={tx} cy={ty} r="11" opacity="0.18" style={{ fill: "var(--flow)" }} />
        <circle cx={tx} cy={ty} r="5" style={{ fill: "var(--flow)" }} />
      </svg>

      {/* hit areas + labels (real buttons for a11y) */}
      {NODES.map((n, i) => {
        const show = i === activeIdx || i === hover
        return (
          <button
            key={n.id}
            type="button"
            onClick={() => go(n.id)}
            onMouseEnter={() => setHover(i)}
            onMouseLeave={() => setHover((h) => (h === i ? null : h))}
            aria-label={n.label}
            aria-current={i === activeIdx ? "true" : undefined}
            className="pointer-events-auto absolute grid -translate-x-1/2 -translate-y-1/2 place-items-center"
            style={{ left: n.x, top: n.y, width: 30, height: 30 }}
          >
            <span
              className="absolute left-full ml-3 whitespace-nowrap rounded-md px-2.5 py-1 font-mono text-xs uppercase tracking-wide transition-all duration-200"
              style={{
                background: show ? "color-mix(in oklab, var(--card) 82%, transparent)" : "transparent",
                color: i === activeIdx ? "var(--flow)" : "var(--muted-foreground)",
                opacity: show ? 1 : 0,
                transform: show ? "translateX(0)" : "translateX(-6px)",
                boxShadow: show ? "0 0 0 1px color-mix(in oklab, var(--foreground) 8%, transparent)" : "none",
                backdropFilter: show ? "blur(8px)" : "none",
              }}
            >
              {n.label}
            </span>
          </button>
        )
      })}
    </nav>
  )
}
