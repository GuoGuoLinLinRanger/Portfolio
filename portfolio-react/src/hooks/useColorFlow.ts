import { useEffect } from "react"

/**
 * Drives the global `--flow-hue` CSS variable from whichever
 * `[data-hue]` section sits closest to the viewport center.
 * CSS transitions the variable, so the accent glides between hues
 * as you scroll — the signature "cool color flow".
 */
export function useColorFlow() {
  useEffect(() => {
    const sections = Array.from(
      document.querySelectorAll<HTMLElement>("[data-hue]"),
    )
    if (!sections.length) return

    let raf = 0
    const update = () => {
      raf = 0
      const vh = window.innerHeight
      const mid = vh / 2
      let best: HTMLElement | null = null
      let bestDist = Infinity
      for (const s of sections) {
        const r = s.getBoundingClientRect()
        if (r.bottom < 0 || r.top > vh) continue
        const dist = Math.abs(r.top + r.height / 2 - mid)
        if (dist < bestDist) {
          bestDist = dist
          best = s
        }
      }
      const hue = best?.dataset.hue
      if (hue) document.documentElement.style.setProperty("--flow-hue", hue)
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
}
