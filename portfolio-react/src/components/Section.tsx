import { motion } from "motion/react"
import type { ReactNode } from "react"
import { cn } from "@/lib/utils"

type SectionProps = {
  id: string
  hue: number
  eyebrow?: string
  title?: ReactNode
  intro?: ReactNode
  children: ReactNode
  className?: string
}

/**
 * Shared section shell. Carries `data-hue` so the color-flow hook can
 * pick it up, reveals on scroll, and keeps a transparent background so
 * the atmospheric backdrop shows through (never a flat color box).
 */
export function Section({
  id,
  hue,
  eyebrow,
  title,
  intro,
  children,
  className,
}: SectionProps) {
  return (
    <section
      id={id}
      data-hue={hue}
      className={cn(
        "relative isolate mx-auto w-full max-w-6xl scroll-mt-24 px-5 py-20 sm:px-8 md:py-28",
        className,
      )}
    >
      {/* ambient section glow — keeps text-only sections atmospheric, never flat */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute right-[-10%] top-[12%] -z-10 h-[45vh] w-[60vw] rounded-full opacity-[0.08] blur-[120px]"
        style={{ background: `radial-gradient(circle, hsl(${hue} 85% 60%), transparent 70%)` }}
      />
      {(eyebrow || title || intro) && (
        <motion.header
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-80px" }}
          transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
          className="mb-12 max-w-2xl"
        >
          {eyebrow && (
            <div className="mb-3 flex items-center gap-2 font-mono text-[0.8rem] uppercase tracking-[0.2em] text-flow">
              <span className="h-px w-8 bg-flow/60" />
              {eyebrow}
            </div>
          )}
          {title && (
            <h2 className="text-balance text-[2.1rem] font-semibold leading-tight sm:text-[2.6rem] md:text-[3rem]">
              {title}
            </h2>
          )}
          {intro && (
            <p className="mt-4 text-pretty text-lg leading-relaxed text-muted-foreground sm:text-xl">
              {intro}
            </p>
          )}
        </motion.header>
      )}
      {children}
    </section>
  )
}
