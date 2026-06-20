import { motion } from "motion/react"
import { Section } from "@/components/Section"
import { education, experience } from "@/data/portfolio"

export function Experience() {
  return (
    <Section
      id="experience"
      hue={192}
      eyebrow="Where I've done it"
      title="Experience"
      intro="Production engineering, not coursework — a 500K-line C++/C# codebase, a platform thousands of students depend on, and safety-critical firmware."
    >
      <div className="relative">
        {/* timeline rail */}
        <div
          className="absolute bottom-0 left-[7px] top-2 w-px md:left-[9px]"
          style={{ background: "linear-gradient(var(--flow), transparent)" }}
        />
        <div className="space-y-10">
          {experience.map((job, i) => (
            <motion.div
              key={job.company}
              initial={{ opacity: 0, x: -16 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true, margin: "-60px" }}
              transition={{ duration: 0.5, delay: i * 0.08, ease: [0.22, 1, 0.36, 1] }}
              className="relative pl-8 md:pl-10"
            >
              <span
                className="absolute left-0 top-1.5 grid h-4 w-4 place-items-center rounded-full"
                style={{ background: "var(--flow-soft)" }}
              >
                <span className="h-2 w-2 rounded-full" style={{ background: "var(--flow)" }} />
              </span>

              <div className="flex flex-col gap-1 sm:flex-row sm:items-baseline sm:justify-between">
                <h3 className="font-display text-lg font-semibold">
                  {job.role}{" "}
                  <span className="text-flow">· {job.company}</span>
                </h3>
                <span className="font-mono text-xs text-muted-foreground">{job.period}</span>
              </div>

              <div className="mt-2 flex flex-wrap gap-1.5">
                {job.stack.map((s) => (
                  <span
                    key={s}
                    className="rounded-md bg-secondary px-2 py-0.5 font-mono text-[0.68rem] text-secondary-foreground"
                  >
                    {s}
                  </span>
                ))}
              </div>

              <ul className="mt-3 space-y-1.5">
                {job.bullets.map((b, bi) => (
                  <li key={bi} className="flex gap-2.5 text-sm leading-relaxed text-muted-foreground">
                    <span className="mt-2 h-1 w-1 shrink-0 rounded-full bg-flow/70" />
                    <span>{b}</span>
                  </li>
                ))}
              </ul>
            </motion.div>
          ))}
        </div>
      </div>

      {/* Education footnote */}
      <motion.div
        initial={{ opacity: 0, y: 16 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.5 }}
        className="card-ring mt-10 flex flex-col gap-2 rounded-2xl bg-card/40 p-5 backdrop-blur sm:flex-row sm:items-center sm:justify-between"
      >
        <div>
          <div className="font-display font-semibold">
            {education.school} <span className="text-muted-foreground">— {education.program}</span>
          </div>
          <div className="mt-1 text-sm text-muted-foreground">
            {education.period} · GPA {education.gpa}
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
