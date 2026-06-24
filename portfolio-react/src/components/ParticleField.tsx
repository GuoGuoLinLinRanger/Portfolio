import { useEffect, useRef } from "react"

/**
 * Reactive particle constellation on a 2D canvas — no external libraries.
 * Points live across depth tiers: nearer points are larger, brighter and
 * parallax further; far points are small, dim and nearly still. The whole
 * field eases opposite the cursor, so moving the mouse reads as looking
 * *into* a field with real depth. Theme-aware: bright points on the dark
 * theme, darker accent points on light so the network stays visible on
 * white. Color tracks the live `--flow-hue`. DPR-aware, capped count,
 * paused when hidden, single static frame under prefers-reduced-motion.
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
    let isDark = true
    let frame = 0
    let raf = 0

    const mouse = { x: -9999, y: -9999, inside: false }
    let ox = 0
    let oy = 0
    const maxDist = 122

    type P = {
      x: number
      y: number
      vx: number
      vy: number
      z: number
      size: number
      par: number
      alpha: number
      tw: number // twinkle phase
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
      const target = Math.min(82, Math.floor((w * h) / 18000))
      particles = Array.from({ length: target }, () => {
        const z = Math.random()
        return {
          x: Math.random() * w,
          y: Math.random() * h,
          vx: (Math.random() - 0.5) * (0.12 + z * 0.24),
          vy: (Math.random() - 0.5) * (0.12 + z * 0.24),
          z,
          size: 0.7 + z * 1.8,
          par: 6 + z * 22,
          alpha: 0.18 + z * 0.5,
          tw: Math.random() * Math.PI * 2,
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
        isDark = document.documentElement.classList.contains("dark")
      }
      frame++

      const tx = mouse.inside ? -((mouse.x - w / 2) / (w / 2)) : 0
      const ty = mouse.inside ? -((mouse.y - h / 2) / (h / 2)) : 0
      ox += (tx - ox) * 0.045
      oy += (ty - oy) * 0.045

      ctx.clearRect(0, 0, w, h)

      // theme-aware palette
      const dotL = isDark ? 72 : 42
      const dotS = isDark ? 80 : 72
      const lineL = isDark ? 66 : 52
      const lineS = isDark ? 72 : 60
      const aBoost = isDark ? 0 : 0.08
      const lineMul = isDark ? 1 : 0.85

      // scroll-travel: the whole field glides as you scroll, so moving down the
      // page reads as moving *along* one continuous constellation. Nearer points
      // travel faster (parallax). Wrapped so the field never runs out.
      const scroll = window.scrollY || document.documentElement.scrollTop || 0
      const span = h + 40
      for (const p of particles) {
        p.x += p.vx
        p.y += p.vy
        if (p.x < -20) p.x = w + 20
        else if (p.x > w + 20) p.x = -20
        if (p.y < -20) p.y = h + 20
        else if (p.y > h + 20) p.y = -20
        p.rx = p.x + ox * p.par
        let ry = p.y + oy * p.par - scroll * (0.015 + p.z * 0.05)
        ry = (((ry + 20) % span) + span) % span - 20
        p.ry = ry
      }

      for (let i = 0; i < particles.length; i++) {
        const a = particles[i]
        for (let j = i + 1; j < particles.length; j++) {
          const b = particles[j]
          const dx = a.rx - b.rx
          const dy = a.ry - b.ry
          const dist = Math.sqrt(dx * dx + dy * dy)
          if (dist < maxDist) {
            const depth = (a.z + b.z) / 2
            const o = (1 - dist / maxDist) * (0.06 + depth * 0.2) * lineMul
            ctx.strokeStyle = `hsla(${hue}, ${lineS}%, ${lineL}%, ${o})`
            ctx.lineWidth = 0.6 + depth * 0.6
            ctx.beginPath()
            ctx.moveTo(a.rx, a.ry)
            ctx.lineTo(b.rx, b.ry)
            ctx.stroke()
          }
        }
      }

      for (const p of particles) {
        // subtle twinkle keeps the field alive without drawing attention
        let a = (p.alpha + aBoost) * (0.8 + 0.2 * Math.sin(frame * 0.035 + p.tw))
        let s = p.size
        if (mouse.inside) {
          const dx = p.rx - mouse.x
          const dy = p.ry - mouse.y
          const d2 = dx * dx + dy * dy
          const R = 175
          if (d2 < R * R) {
            const t = 1 - Math.sqrt(d2) / R
            a = Math.min(1, a + t * 0.55)
            s += t * 1.1
          }
        }
        ctx.fillStyle = `hsla(${hue}, ${dotS}%, ${dotL}%, ${a})`
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
      draw()
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
      className="pointer-events-none fixed inset-0 -z-10 h-full w-full opacity-80"
    />
  )
}
