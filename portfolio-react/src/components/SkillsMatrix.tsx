import { motion } from "motion/react"
import { Section } from "@/components/Section"
import { skillGroups } from "@/data/portfolio"

export function SkillsMatrix() {
  return (
    <Section
      id="skills"
      hue={200}
      eyebrow="What I work in"
      title="Full-stack, end to end"
      intro="Not a badge cloud — the things I actually reach for, grouped by where they live in the stack. Filled dots are where I'm strongest."
    >
      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
        {skillGroups.map((group, gi) => (
          <motion.div
            key={group.title}
            initial={{ opacity: 0, y: 24 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-60px" }}
            transition={{ duration: 0.5, delay: gi * 0.08, ease: [0.22, 1, 0.36, 1] }}
            className="group card-ring relative overflow-hidden rounded-2xl bg-card/40 p-5 backdrop-blur transition-transform duration-300 hover:-translate-y-1"
          >
            {/* per-group accent glow anchored to its hue */}
            <div
              className="pointer-events-none absolute -right-8 -top-8 h-24 w-24 rounded-full opacity-0 blur-2xl transition-opacity duration-500 group-hover:opacity-100"
              style={{ background: `hsl(${group.hue} 82% 60% / 0.5)` }}
            />
            <div className="mb-4 flex items-center gap-2">
              <span
                className="h-2.5 w-2.5 rounded-full"
                style={{ background: `hsl(${group.hue} 82% 62%)` }}
              />
              <h3 className="font-display text-sm font-semibold uppercase tracking-wide">
                {group.title}
              </h3>
            </div>
            <ul className="space-y-3">
              {group.skills.map((s) => (
                <li key={s.name}>
                  <div className="flex items-center justify-between gap-2">
                    <span className="text-sm font-medium text-foreground/90">{s.name}</span>
                    <span className="flex gap-1" aria-label={`Proficiency ${s.level} of 5`}>
                      {Array.from({ length: 5 }).map((_, i) => (
                        <span
                          key={i}
                          className="h-1.5 w-1.5 rounded-full transition-colors"
                          style={{
                            background:
                              i < s.level
                                ? `hsl(${group.hue} 82% 62%)`
                                : "color-mix(in oklab, var(--foreground) 14%, transparent)",
                          }}
                        />
                      ))}
                    </span>
                  </div>
                  {s.note && (
                    <div className="mt-0.5 font-mono text-[0.7rem] text-muted-foreground">
                      {s.note}
                    </div>
                  )}
                </li>
              ))}
            </ul>
          </motion.div>
        ))}
      </div>
    </Section>
  )
}
