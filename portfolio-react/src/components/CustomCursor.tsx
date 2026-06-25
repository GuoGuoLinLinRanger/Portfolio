import { useEffect, useRef } from "react"

/**
 * "Draw the constellation" cursor: a bright node sits at the pointer, and a
 * fading line of star-nodes trails behind it — so moving the mouse draws a
 * little constellation that erases itself from the tail. Pure transform/SVG,
 * pointer-events: none, color tracks the flow accent. Disabled on touch and
 * under prefers-reduced-motion (native cursor kept). The rAF loop only runs
 * while nodes are still alive, then stops.
 */

const MAX = 24 // most nodes kept in the trail
const LIFE = 600 // ms a node lives before it fully fades
const STEP = 10 // px spacing between resampled nodes (keeps fast moves smooth)
const MAXLEN = 150 // px — hard cap on total trail length, so fast flicks don't stretch it

export function CustomCursor() {
  const dotRef = useRef<HTMLDivElement>(null)
  const svgRef = useRef<SVGSVGElement>(null)
  const lineRef = useRef<SVGPolylineElement>(null)
  const circlesRef = useRef<SVGCircleElement[]>([])

  useEffect(() => {
    const fine = window.matchMedia("(pointer: fine)").matches
    const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches
    if (!fine || reduce) return // touch / reduced-motion → keep native cursor

    const dot = dotRef.current
    const svg = svgRef.current
    const line = lineRef.current
    if (!dot || !svg || !line) return
    const circles = circlesRef.current
    const root = document.documentElement
    root.classList.add("custom-cursor")

    const size = () => {
      svg.setAttribute("width", String(window.innerWidth))
      svg.setAttribute("height", String(window.innerHeight))
      svg.setAttribute("viewBox", `0 0 ${window.innerWidth} ${window.innerHeight}`)
    }
    size()

    type Pt = { x: number; y: number; born: number }
    let pts: Pt[] = []
    let raf = 0
    let visible = false
    let lastX = -100
    let lastY = -100

    const render = () => {
      const t = performance.now()
      pts = pts.filter((p) => t - p.born < LIFE) // drop fully-faded tail nodes
      line.setAttribute("points", pts.map((p) => `${p.x},${p.y}`).join(" "))
      circles.forEach((c, i) => {
        const p = pts[i]
        if (!p) {
          c.setAttribute("r", "0")
          return
        }
        const op = Math.max(0, 1 - (t - p.born) / LIFE)
        c.setAttribute("cx", String(p.x))
        c.setAttribute("cy", String(p.y))
        c.setAttribute("r", String(Math.max(0.4, (2.6 - i * 0.12) * op)))
        c.setAttribute("opacity", String(op))
      })
      raf = pts.length ? requestAnimationFrame(render) : 0
    }
    const ensure = () => {
      if (!raf) raf = requestAnimationFrame(render)
    }

    const onMove = (e: MouseEvent) => {
      if (!visible) {
        visible = true
        dot.style.opacity = "1"
      }
      const x = e.clientX
      const y = e.clientY
      dot.style.transform = `translate(${x}px, ${y}px) translate(-50%, -50%)`
      // Resample the path at a fixed spacing so a fast flick lays down evenly
      // spaced nodes (smooth) instead of a few far-apart ones, then hard-cap the
      // total trail length so it never stretches across the screen.
      let dx = x - lastX
      let dy = y - lastY
      let dist = Math.hypot(dx, dy)
      if (dist > 0) {
        const ux = dx / dist
        const uy = dy / dist
        const t = performance.now()
        let guard = 0
        while (dist >= STEP && guard < 30) {
          lastX += ux * STEP
          lastY += uy * STEP
          dist -= STEP
          guard++
          pts.unshift({ x: lastX, y: lastY, born: t })
        }
        if (guard >= 30) {
          lastX = x
          lastY = y
        }
        // trim oldest nodes once the cumulative length passes the cap
        let len = 0
        for (let i = 1; i < pts.length; i++) {
          len += Math.hypot(pts[i].x - pts[i - 1].x, pts[i].y - pts[i - 1].y)
          if (len > MAXLEN) {
            pts.length = i
            break
          }
        }
        if (pts.length > MAX) pts.length = MAX
      }
      const interactive = (e.target as Element)?.closest?.(
        "a, button, [role='button'], input, textarea, label, summary",
      )
      dot.classList.toggle("cursor-active", !!interactive)
      ensure()
    }
    const onLeave = () => {
      visible = false
      dot.style.opacity = "0"
    }

    window.addEventListener("mousemove", onMove)
    document.addEventListener("mouseleave", onLeave)
    window.addEventListener("resize", size)
    return () => {
      if (raf) cancelAnimationFrame(raf)
      window.removeEventListener("mousemove", onMove)
      document.removeEventListener("mouseleave", onLeave)
      window.removeEventListener("resize", size)
      root.classList.remove("custom-cursor")
    }
  }, [])

  return (
    <>
      <svg ref={svgRef} className="cursor-draw-svg" aria-hidden="true">
        <polyline ref={lineRef} points="" />
        {Array.from({ length: MAX }).map((_, i) => (
          <circle
            key={i}
            ref={(el) => {
              if (el) circlesRef.current[i] = el
            }}
            r="0"
          />
        ))}
      </svg>
      <div ref={dotRef} aria-hidden="true" className="cursor-dot" />
    </>
  )
}
