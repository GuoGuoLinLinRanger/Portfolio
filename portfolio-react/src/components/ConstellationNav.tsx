import { useEffect, useState } from "react"

/**
 * A star-map section nav: each section is a node, wired into one small
 * constellation down the right edge. The connecting line fills and the active
 * node lights up as you scroll, so the page reads as one constellation you
 * travel along. Click a node to jump; labels appear on hover/active. Desktop
 * only (xl+), where there's gutter for it; the top nav covers smaller screens.
 */

type Node = { id: string; label: string; x: number; y: number }

// hand-placed for a constellation feel (not a straight line). Coords are px and
// match the svg/overlay box exactly so labels line up with the dots.
const W = 46
const NODES: Node[] = [
  { id: "top", label: "Home", x: 30, y: 16 },
  { id: "experience", label: "Experience", x: 17, y: 56 },
  { id: "work", label: "Work", x: 33, y: 96 },
  { id: "awards", label: "Awards", x: 19, y: 136 },
  { id: "skills", label: "Skills", x: 33, y: 176 },
  { id: "contact", label: "Contact", x: 21, y: 216 },
]
const H = 232

export function ConstellationNav() {
  const [active, setActive] = useState(0)
  const [hover, setHover] = useState<number | null>(null)

  useEffect(() => {
    const ids = NODES.map((n) => n.id)
    let raf = 0
    const update = () => {
      raf = 0
      const line = window.innerHeight * 0.4
      let best = 0
      let bestDist = Infinity
      ids.forEach((id, i) => {
        const el = document.getElementById(id)
        if (!el) return
        const r = el.getBoundingClientRect()
        const mid = r.top + r.height / 2
        const dist = Math.abs(mid - line)
        if (dist < bestDist) {
          bestDist = dist
          best = i
        }
      })
      setActive(best)
    }
    const onScroll = () => {
      if (!raf) raf = requestAnimationFrame(update)
    }
    update()
    window.addEventListener("scroll", onScroll, { passive: true })
    window.addEventListener("resize", onScroll)
    return () => {
      window.removeEventListener("scroll", onScroll)
      window.removeEventListener("resize", onScroll)
      if (raf) cancelAnimationFrame(raf)
    }
  }, [])

  const go = (id: string) => {
    document.getElementById(id)?.scrollIntoView({ behavior: "smooth" })
  }

  const basePts = NODES.map((n) => `${n.x},${n.y}`).join(" ")
  const progPts = NODES.slice(0, active + 1)
    .map((n) => `${n.x},${n.y}`)
    .join(" ")

  return (
    <nav
      aria-label="Sections"
      className="pointer-events-none fixed right-3 top-1/2 z-40 hidden -translate-y-1/2 xl:block"
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
          strokeOpacity="0.22"
          strokeWidth="1"
          strokeLinecap="round"
          strokeLinejoin="round"
          style={{ stroke: "var(--flow)" }}
        />
        {active > 0 && (
          <polyline
            points={progPts}
            strokeOpacity="0.85"
            strokeWidth="1.5"
            strokeLinecap="round"
            strokeLinejoin="round"
            style={{ stroke: "var(--flow)", transition: "all 0.4s ease" }}
          />
        )}
        {NODES.map((n, i) => {
          const isActive = i === active
          const passed = i <= active
          return (
            <g key={n.id}>
              {isActive && (
                <circle cx={n.x} cy={n.y} r="8" opacity="0.18" style={{ fill: "var(--flow)" }} />
              )}
              <circle
                cx={n.x}
                cy={n.y}
                r={isActive ? 4 : 2.4}
                opacity={passed ? 1 : 0.4}
                style={{ fill: "var(--flow)", transition: "r 0.25s ease, opacity 0.25s ease" }}
              />
            </g>
          )
        })}
      </svg>

      {/* hit areas + labels (real buttons for a11y) */}
      {NODES.map((n, i) => {
        const show = i === active || i === hover
        return (
          <button
            key={n.id}
            type="button"
            onClick={() => go(n.id)}
            onMouseEnter={() => setHover(i)}
            onMouseLeave={() => setHover((h) => (h === i ? null : h))}
            aria-label={n.label}
            aria-current={i === active ? "true" : undefined}
            className="pointer-events-auto absolute grid -translate-x-1/2 -translate-y-1/2 place-items-center"
            style={{ left: n.x, top: n.y, width: 26, height: 26 }}
          >
            <span
              className="absolute right-full mr-3 whitespace-nowrap rounded-md px-2 py-1 font-mono text-[0.7rem] uppercase tracking-wide transition-all duration-200"
              style={{
                background: show ? "color-mix(in oklab, var(--card) 80%, transparent)" : "transparent",
                color: i === active ? "var(--flow)" : "var(--muted-foreground)",
                opacity: show ? 1 : 0,
                transform: show ? "translateX(0)" : "translateX(6px)",
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
