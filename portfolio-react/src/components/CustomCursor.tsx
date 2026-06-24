import { useEffect, useRef } from "react"

/**
 * A theme-matched cursor: a small glowing node (the "star" you carry through
 * the constellation) plus a softer ring that eases behind it and expands over
 * interactive elements. Pure transform/opacity, pointer-events: none. Disabled
 * on touch devices and under prefers-reduced-motion, where the native cursor
 * is kept. Color tracks the flow accent via CSS, so it shifts with the page.
 */
export function CustomCursor() {
  const dotRef = useRef<HTMLDivElement>(null)
  const ringRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const fine = window.matchMedia("(pointer: fine)").matches
    const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches
    if (!fine || reduce) return // touch / reduced-motion → keep native cursor

    const dot = dotRef.current
    const ring = ringRef.current
    if (!dot || !ring) return
    const root = document.documentElement
    root.classList.add("custom-cursor")

    let visible = false

    const show = () => {
      if (visible) return
      visible = true
      dot.style.opacity = "1"
      ring.style.opacity = "1"
    }
    const onMove = (e: MouseEvent) => {
      show()
      // dot and ring both track the pointer exactly — no trailing lag
      const tf = `translate(${e.clientX}px, ${e.clientY}px) translate(-50%, -50%)`
      dot.style.transform = tf
      ring.style.transform = tf
      const interactive = (e.target as Element)?.closest?.(
        "a, button, [role='button'], input, textarea, label, summary",
      )
      ring.classList.toggle("cursor-hover", !!interactive)
    }
    const onLeave = () => {
      visible = false
      dot.style.opacity = "0"
      ring.style.opacity = "0"
    }
    const onDown = () => ring.classList.add("cursor-down")
    const onUp = () => ring.classList.remove("cursor-down")

    window.addEventListener("mousemove", onMove)
    document.addEventListener("mouseleave", onLeave)
    window.addEventListener("mousedown", onDown)
    window.addEventListener("mouseup", onUp)

    return () => {
      window.removeEventListener("mousemove", onMove)
      document.removeEventListener("mouseleave", onLeave)
      window.removeEventListener("mousedown", onDown)
      window.removeEventListener("mouseup", onUp)
      root.classList.remove("custom-cursor")
    }
  }, [])

  return (
    <>
      <div ref={ringRef} aria-hidden="true" className="cursor-ring" />
      <div ref={dotRef} aria-hidden="true" className="cursor-dot" />
    </>
  )
}
