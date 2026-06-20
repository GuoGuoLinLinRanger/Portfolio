import { useEffect, useRef } from "react"

/**
 * Reactive particle network on a 2D canvas — no external libraries.
 * Points drift, link with thin lines when close, and gently scatter
 * away from the cursor. Line/dot color tracks the live `--flow-hue`,
 * so the field shifts color with the rest of the page. DPR-aware,
 * capped particle count, paused when the tab is hidden, and reduced
 * to a single static frame under prefers-reduced-motion.
 */
export function ParticleField() {
  const canvasRef = useRef<HTMLCanvasElement>(null)

  useEffect(() => {
    const canvas = canvasRef.current
    if (!canvas) return
    const ctx = canvas.getContext("2d")
    if (!ctx) return

    const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches
    const dpr = Math.min(window.devicePixelRatio || 1, 2)
    let w = 0
    let h = 0
    let hue = 272
    let frame = 0
    let raf = 0
    const mouse = { x: -9999, y: -9999 }
    const maxDist = 132

    type P = { x: number; y: number; vx: number; vy: number }
    let particles: P[] = []

    const resize = () => {
      w = canvas.clientWidth
      h = canvas.clientHeight
      canvas.width = Math.floor(w * dpr)
      canvas.height = Math.floor(h * dpr)
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0)
      const target = Math.min(96, Math.floor((w * h) / 15000))
      particles = Array.from({ length: target }, () => ({
        x: Math.random() * w,
        y: Math.random() * h,
        vx: (Math.random() - 0.5) * 0.28,
        vy: (Math.random() - 0.5) * 0.28,
      }))
    }

    const draw = () => {
      // sample the live flow hue every ~12 frames (cheap, avoids thrash)
      if (frame % 12 === 0) {
        const v = parseFloat(
          getComputedStyle(document.documentElement).getPropertyValue("--flow-hue"),
        )
        if (!Number.isNaN(v)) hue = v
      }
      frame++

      ctx.clearRect(0, 0, w, h)

      for (const p of particles) {
        p.x += p.vx
        p.y += p.vy
        if (p.x < 0 || p.x > w) p.vx *= -1
        if (p.y < 0 || p.y > h) p.vy *= -1

        const dx = p.x - mouse.x
        const dy = p.y - mouse.y
        const d2 = dx * dx + dy * dy
        if (d2 < 130 * 130) {
          const d = Math.sqrt(d2) || 1
          const f = ((130 - d) / 130) * 0.9
          p.x += (dx / d) * f
          p.y += (dy / d) * f
        }
      }

      for (let i = 0; i < particles.length; i++) {
        const a = particles[i]
        for (let j = i + 1; j < particles.length; j++) {
          const b = particles[j]
          const dx = a.x - b.x
          const dy = a.y - b.y
          const dist = Math.sqrt(dx * dx + dy * dy)
          if (dist < maxDist) {
            const o = (1 - dist / maxDist) * 0.45
            ctx.strokeStyle = `hsla(${hue}, 82%, 66%, ${o})`
            ctx.lineWidth = 1
            ctx.beginPath()
            ctx.moveTo(a.x, a.y)
            ctx.lineTo(b.x, b.y)
            ctx.stroke()
          }
        }
        ctx.fillStyle = `hsla(${hue}, 82%, 72%, 0.75)`
        ctx.beginPath()
        ctx.arc(a.x, a.y, 1.4, 0, Math.PI * 2)
        ctx.fill()
      }
    }

    const loop = () => {
      raf = requestAnimationFrame(loop)
      draw()
    }

    const onMove = (e: MouseEvent) => {
      const r = canvas.getBoundingClientRect()
      mouse.x = e.clientX - r.left
      mouse.y = e.clientY - r.top
    }
    const onLeave = () => {
      mouse.x = -9999
      mouse.y = -9999
    }
    const onVisibility = () => {
      if (document.hidden) {
        if (raf) cancelAnimationFrame(raf)
        raf = 0
      } else if (!raf && !reduce) {
        loop()
      }
    }

    resize()
    window.addEventListener("resize", resize)
    window.addEventListener("mousemove", onMove)
    window.addEventListener("mouseout", onLeave)
    document.addEventListener("visibilitychange", onVisibility)

    if (reduce) {
      draw() // single static frame
    } else {
      loop()
    }

    return () => {
      if (raf) cancelAnimationFrame(raf)
      window.removeEventListener("resize", resize)
      window.removeEventListener("mousemove", onMove)
      window.removeEventListener("mouseout", onLeave)
      document.removeEventListener("visibilitychange", onVisibility)
    }
  }, [])

  return (
    <canvas
      ref={canvasRef}
      aria-hidden="true"
      className="pointer-events-none fixed inset-0 -z-10 h-full w-full opacity-70"
    />
  )
}
