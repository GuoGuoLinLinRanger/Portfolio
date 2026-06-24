import { useEffect, useRef, useState } from "react"
import { useInView, useReducedMotion } from "motion/react"

/**
 * Animate the first number inside a stat string from 0 to its target while
 * keeping everything around it (prefix/suffix) intact — so "3,000+" counts up
 * to 3,000+, "~64%" to ~64%, "<100ms" to <100ms, "1.8→1.1s" to 1.8→1.1s.
 * Fires once when scrolled into view; respects prefers-reduced-motion.
 */

type Parsed = { prefix: string; suffix: string; target: number; decimals: number; grouped: boolean }

function parse(value: string): Parsed | null {
  // first run of digits, allowing thousands commas and one decimal point
  const m = value.match(/^(.*?)([\d][\d,]*(?:\.\d+)?)(.*)$/s)
  if (!m) return null
  const raw = m[2]
  const target = Number(raw.replace(/,/g, ""))
  if (!Number.isFinite(target)) return null
  return {
    prefix: m[1],
    suffix: m[3],
    target,
    decimals: raw.includes(".") ? raw.split(".")[1].length : 0,
    grouped: raw.includes(","),
  }
}

function format(n: number, p: Parsed): string {
  const fixed = n.toFixed(p.decimals)
  const out = p.grouped
    ? Number(fixed).toLocaleString("en-US", {
        minimumFractionDigits: p.decimals,
        maximumFractionDigits: p.decimals,
      })
    : fixed
  return `${p.prefix}${out}${p.suffix}`
}

const easeOut = (t: number) => 1 - Math.pow(1 - t, 3)

export function CountUp({
  value,
  duration = 1100,
  className,
}: {
  value: string
  duration?: number
  className?: string
}) {
  const ref = useRef<HTMLSpanElement>(null)
  const inView = useInView(ref, { once: true, margin: "-40px" })
  const reduce = useReducedMotion()
  const parsed = parse(value)
  // Reduced motion → render the final value straight away; otherwise start at 0.
  const [text, setText] = useState(() =>
    parsed ? format(reduce ? parsed.target : 0, parsed) : value,
  )

  useEffect(() => {
    if (!parsed || reduce || !inView) return
    let raf = 0
    let start = 0
    const tick = (ts: number) => {
      if (!start) start = ts
      const t = Math.min(1, (ts - start) / duration)
      setText(format(parsed.target * easeOut(t), parsed))
      if (t < 1) raf = requestAnimationFrame(tick)
    }
    raf = requestAnimationFrame(tick)
    return () => cancelAnimationFrame(raf)
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [inView, reduce, value, duration])

  // Non-numeric values (e.g. "1st") render verbatim.
  return (
    <span ref={ref} className={className}>
      {parsed ? text : value}
    </span>
  )
}
