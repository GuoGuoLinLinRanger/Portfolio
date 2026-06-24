import { motion } from "motion/react"
import { Award, Medal, Trophy } from "lucide-react"
import { Section } from "@/components/Section"
import { awards } from "@/data/portfolio"

const ICONS = [Trophy, Medal, Award]
const ease = [0.22, 1, 0.36, 1] as const

export function Achievements() {
  return (
    <Section
      id="awards"
      hue={210}
      eyebrow="Recognition"
      title="Achievements"
      intro="Competitive results against large fields — quant trading challenges and the Putnam."
    >
      <div className="grid gap-4 md:grid-cols-3">
        {awards.map((a, i) => {
          const Icon = ICONS[i % ICONS.length]
          return (
            <motion.div
              key={a.title}
              initial={{ opacity: 0, y: 24 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-60px" }}
              transition={{ duration: 0.5, delay: i * 0.08, ease }}
              className="card-ring group relative overflow-hidden rounded-2xl bg-card/40 p-6 backdrop-blur"
            >
              <div
                className="pointer-events-none absolute -right-10 -top-10 h-28 w-28 rounded-full opacity-0 blur-2xl transition-opacity duration-500 group-hover:opacity-100"
                style={{ background: "var(--flow-soft)" }}
              />
              <div className="mb-5 grid size-12 place-items-center rounded-xl bg-flow-soft text-flow">
                <Icon className="size-6" />
              </div>
              <div className="font-display text-4xl font-bold text-flow">{a.place}</div>
              <h3 className="mt-2 font-display text-xl font-semibold">{a.title}</h3>
              <p className="mt-1.5 text-base text-muted-foreground">{a.detail}</p>
            </motion.div>
          )
        })}
      </div>
    </Section>
  )
}
