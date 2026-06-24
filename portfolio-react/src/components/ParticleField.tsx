import { useEffect, useRef } from "react"

/**
 * Reactive particle constellation on a 2D canvas — no external libraries.
 * Points live across three depth tiers: nearer points are larger, brighter
 * and parallax further; far points are small, dim and nearly still. The
 * whole field shifts gently opposite the cursor, so moving the mouse reads
 * as looking *into* a field with real depth rather than a flat sheet of
 * dots. Lines link nearby points softly; points brighten near the cursor.
 * Color tracks the live `--flow-hue`. DPR-aware, capped count, paused when
 * hidden, single static frame under prefers-reduced-motion.
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

    const mouse = { x: -9999, y: -9999, inside: false }
    // eased parallax offset in normalized [-1, 1] space
    let ox = 0
    let oy = 0
    const maxDist = 118

    type P = {
      x: number
      y: number
      vx: number
      vy: number
      z: number // 0 far → 1 near
      size: number
      par: number // parallax amplitude (px)
      alpha: number
      rx: number
      ry: number
    }
    let particles: P[] = []

    const resize = () => {
      w = canvas.clientWidth
      h = canvas.clientHeight
      canvas.width = Math.floor(w * dpr)
      canvas.height = Math.floor(h * dpr)
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0)
      // calmer density than before
      const target = Math.min(66, Math.floor((w * h) / 23000))
      particles = Array.from({ length: target }, () => {
        const z = Math.random()
        return {
          x: Math.random() * w,
          y: Math.random() * h,
          vx: (Math.random() - 0.5) * (0.12 + z * 0.22),
          vy: (Math.random() - 0.5) * (0.12 + z * 0.22),
          z,
          size: 0.6 + z * 1.7,
          par: 5 + z * 17,
          alpha: 0.16 + z * 0.5,
          rx: 0,
          ry: 0,
        }
      })
    }

    const draw = () => {
      if (frame % 12 === 0) {
        const v = parseFloat(
          getComputedStyle(document.documentElement).getPropertyValue("--flow-hue"),
        )
        if (!Number.isNaN(v)) hue = v
      }
      frame++

      // ease parallax offset toward the cursor's position relative to center
      const tx = mouse.inside ? -((mouse.x - w / 2) / (w / 2)) : 0
      const ty = mouse.inside ? -((mouse.y - h / 2) / (h / 2)) : 0
      ox += (tx - ox) * 0.045
      oy += (ty - oy) * 0.045

      ctx.clearRect(0, 0, w, h)

      // advance + compute rendered (parallaxed) positions
      for (const p of particles) {
        p.x += p.vx
        p.y += p.vy
        if (p.x < -20) p.x = w + 20
        else if (p.x > w + 20) p.x = -20
        if (p.y < -20) p.y = h + 20
        else if (p.y > h + 20) p.y = -20
        p.rx = p.x + ox * p.par
        p.ry = p.y + oy * p.par
      }

      // links — soft, depth-weighted
      for (let i = 0; i < particles.length; i++) {
        const a = particles[i]
        for (let j = i + 1; j < particles.length; j++) {
          const b = particles[j]
          const dx = a.rx - b.rx
          const dy = a.ry - b.ry
          const dist = Math.sqrt(dx * dx + dy * dy)
          if (dist < maxDist) {
            const depth = (a.z + b.z) / 2
            const o = (1 - dist / maxDist) * (0.06 + depth * 0.2)
            ctx.strokeStyle = `hsla(${hue}, 72%, 66%, ${o})`
            ctx.lineWidth = 0.6 + depth * 0.6
            ctx.beginPath()
            ctx.moveTo(a.rx, a.ry)
            ctx.lineTo(b.rx, b.ry)
            ctx.stroke()
          }
        }
      }

      // points — brighten + swell slightly near the cursor
      for (const p of particles) {
        let a = p.alpha
        let s = p.size
        if (mouse.inside) {
          const dx = p.rx - mouse.x
          const dy = p.ry - mouse.y
          const d2 = dx * dx + dy * dy
          const R = 150
          if (d2 < R * R) {
            const t = 1 - Math.sqrt(d2) / R
            a = Math.min(1, a + t * 0.4)
            s += t * 0.9
          }
        }
        ctx.fillStyle = `hsla(${hue}, 78%, 72%, ${a})`
        ctx.beginPath()
        ctx.arc(p.rx, p.ry, s, 0, Math.PI * 2)
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
      mouse.inside = true
    }
    const onLeave = () => {
      mouse.inside = false
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
      className="pointer-events-none fixed inset-0 -z-10 h-full w-full opacity-65"
    />
  )
}
