import { motion } from "motion/react"
import { Section } from "@/components/Section"
import { nowBuilding } from "@/data/portfolio"

export function NowSection() {
  return (
    <Section
      id="now"
      hue={170}
      eyebrow="Currently"
      title="What I'm building right now"
      intro="Active threads, not a résumé archive. This is where my evenings go."
    >
      <div className="grid gap-4 md:grid-cols-3">
        {nowBuilding.map((item, i) => (
          <motion.div
            key={item.title}
            initial={{ opacity: 0, y: 24 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-60px" }}
            transition={{ duration: 0.5, delay: i * 0.08, ease: [0.22, 1, 0.36, 1] }}
            className="card-ring group relative overflow-hidden rounded-2xl bg-card/40 p-5 backdrop-blur"
          >
            <div className="mb-3 flex items-center gap-2 font-mono text-[0.7rem] uppercase tracking-wide text-flow">
              <span
                className="h-2 w-2 rounded-full"
                style={{ background: "var(--live)", animation: "pulse-live 2.4s ease-in-out infinite" }}
              />
              In progress
            </div>
            <h3 className="font-display text-base font-semibold">{item.title}</h3>
            <p className="mt-2 text-sm leading-relaxed text-muted-foreground">{item.detail}</p>
          </motion.div>
        ))}
      </div>
    </Section>
  )
}
