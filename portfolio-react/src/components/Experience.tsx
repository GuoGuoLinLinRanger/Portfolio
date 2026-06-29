import { useState } from "react"
import { AnimatePresence, motion } from "motion/react"
import { ChevronDown } from "lucide-react"
import { Section } from "@/components/Section"
import { cn } from "@/lib/utils"
import { education, experience, type Experience as Job } from "@/data/portfolio"

const ease = [0.22, 1, 0.36, 1] as const

export function Experience() {
  return (
    <Section
      id="experience"
      hue={246}
      eyebrow="Where I've done it"
      title="Experience"
      intro="Production engineering, not coursework. Tap any role to expand the details."
    >
      <div className="border-b border-border/50">
        {experience.map((job, i) => (
          <JobRow key={job.company} job={job} defaultOpen={false} index={i} />
        ))}
      </div>

      {/* Education footnote */}
      <motion.div
        initial={{ opacity: 0, y: 16 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.5 }}
        className="card-ring mt-8 flex flex-col gap-2 rounded-2xl bg-card/40 p-5 backdrop-blur sm:flex-row sm:items-center sm:justify-between"
      >
        <div>
          <div className="font-display font-semibold">
            {education.school} <span className="text-muted-foreground">— {education.program}</span>
          </div>
          <div className="mt-1 text-sm text-muted-foreground">
            {education.period}
          </div>
        </div>
        <div className="flex flex-wrap gap-1.5">
          {education.coursework.map((c) => (
            <span
              key={c}
              className="rounded-md border border-border/60 px-2 py-0.5 text-[0.68rem] text-muted-foreground"
            >
              {c}
            </span>
          ))}
        </div>
      </motion.div>
    </Section>
  )
}

function JobRow({ job, defaultOpen, index }: { job: Job; defaultOpen: boolean; index: number }) {
  const [open, setOpen] = useState(defaultOpen)
  const panelId = `exp-panel-${index}`
  return (
    <div className="border-t border-border/50">
      <button
        type="button"
        onClick={() => setOpen((o) => !o)}
        aria-expanded={open}
        aria-controls={panelId}
        className="group flex w-full cursor-pointer items-center gap-3 py-4 text-left"
      >
        <span
          className="grid h-4 w-4 shrink-0 place-items-center rounded-full"
          style={{ background: "var(--flow-soft)" }}
        >
          <span className="h-1.5 w-1.5 rounded-full" style={{ background: "var(--flow)" }} />
        </span>
        <h3 className="min-w-0 flex-1 font-display text-lg font-semibold sm:text-xl">
          {job.role} <span className="text-flow">· {job.company}</span>
        </h3>
        <span className="hidden shrink-0 font-mono text-sm text-muted-foreground sm:block">
          {job.period}
        </span>
        <ChevronDown
          className={cn(
            "size-4 shrink-0 text-muted-foreground transition-transform duration-300 group-hover:text-foreground",
            open && "rotate-180",
          )}
        />
      </button>

      <AnimatePresence initial={false}>
        {open && (
          <motion.div
            id={panelId}
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: "auto", opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.32, ease }}
            className="overflow-hidden"
          >
            <div className="pb-5 pl-7">
              <div className="mb-3 font-mono text-sm text-muted-foreground sm:hidden">
                {job.period}
              </div>
              <div className="mb-3 flex flex-wrap gap-1.5">
                {job.stack.map((s) => (
                  <span
                    key={s}
                    className="rounded-md bg-secondary px-2 py-0.5 font-mono text-xs text-secondary-foreground"
                  >
                    {s}
                  </span>
                ))}
              </div>
              <ul className="space-y-2">
                {job.bullets.map((b, bi) => (
                  <li key={bi} className="flex gap-2.5 text-base leading-relaxed text-muted-foreground">
                    <span className="mt-2.5 h-1 w-1 shrink-0 rounded-full bg-flow/70" />
                    <span>{b}</span>
                  </li>
                ))}
              </ul>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  )
}
