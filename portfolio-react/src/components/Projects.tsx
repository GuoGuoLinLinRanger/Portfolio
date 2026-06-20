import { motion } from "motion/react"
import { ArrowUpRight, ChevronRight } from "lucide-react"
import { Section } from "@/components/Section"
import { Badge } from "@/components/ui/badge"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"
import { asset } from "@/lib/asset"
import { projects, type Project } from "@/data/portfolio"

const ease = [0.22, 1, 0.36, 1] as const

export function Projects() {
  const flagships = projects.filter((p) => p.flagship)
  const rest = projects.filter((p) => !p.flagship)

  return (
    <Section
      id="work"
      hue={258}
      eyebrow="Selected work"
      title="Things I built and shipped"
      intro="The work does the talking. Each one is a real system with real numbers — where it's a backtest and not a live record, I say so."
    >
      {/* Flagship case studies */}
      <div className="space-y-6">
        {flagships.map((p, i) => (
          <FlagshipCard key={p.id} project={p} flip={i % 2 === 1} />
        ))}
      </div>

      {/* The rest */}
      <div className="mt-6 grid gap-4 md:grid-cols-2">
        {rest.map((p, i) => (
          <motion.div
            key={p.id}
            initial={{ opacity: 0, y: 24 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-60px" }}
            transition={{ duration: 0.5, delay: i * 0.06, ease }}
          >
            <CompactCard project={p} />
          </motion.div>
        ))}
      </div>
    </Section>
  )
}

function StatusDot({ status }: { status?: Project["status"] }) {
  if (!status) return null
  const live = status === "live"
  return (
    <span className="inline-flex items-center gap-1.5 font-mono text-[0.7rem] uppercase tracking-wide">
      <span
        className="h-2 w-2 rounded-full"
        style={{
          background: live ? "var(--live)" : "var(--flow)",
          animation: live ? "pulse-live 2.4s ease-in-out infinite" : undefined,
        }}
      />
      <span style={{ color: live ? "var(--live)" : "var(--flow)" }}>{live ? "Live" : "Active"}</span>
    </span>
  )
}

function Metrics({ project }: { project: Project }) {
  return (
    <div className="grid grid-cols-2 gap-px overflow-hidden rounded-xl border border-border/50 bg-border/30 sm:grid-cols-4">
      {project.metrics.map((m) => (
        <div key={m.label} className="bg-card/50 p-3">
          <div className="font-display text-lg font-bold text-flow">{m.value}</div>
          <div className="mt-0.5 text-[0.7rem] leading-tight text-muted-foreground">{m.label}</div>
        </div>
      ))}
    </div>
  )
}

function Architecture({ nodes, caption }: { nodes: string[]; caption: string }) {
  return (
    <figure className="rounded-xl border border-border/50 bg-background/40 p-4">
      <div className="flex flex-wrap items-center gap-2">
        {nodes.map((n, i) => (
          <div key={n} className="flex items-center gap-2">
            <span className="rounded-lg border border-border/60 bg-card/70 px-2.5 py-1.5 font-mono text-[0.7rem] text-foreground/90">
              {n}
            </span>
            {i < nodes.length - 1 && (
              <ChevronRight className="size-3.5 shrink-0 text-flow" />
            )}
          </div>
        ))}
      </div>
      <figcaption className="mt-3 text-xs text-muted-foreground">{caption}</figcaption>
    </figure>
  )
}

function FlagshipCard({ project, flip }: { project: Project; flip: boolean }) {
  return (
    <motion.article
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-80px" }}
      transition={{ duration: 0.6, ease }}
      className="card-ring group relative overflow-hidden rounded-3xl bg-card/40 p-6 backdrop-blur transition-transform duration-300 hover:-translate-y-1 sm:p-8"
    >
      <div
        className="pointer-events-none absolute inset-0 opacity-50"
        style={{
          background:
            "radial-gradient(80% 60% at 100% 0%, var(--flow-soft), transparent 60%)",
        }}
      />
      <div className="relative grid gap-6 lg:grid-cols-2 lg:gap-10">
        <div className={flip ? "lg:order-2" : ""}>
          <div className="mb-3 flex items-center gap-3">
            <Badge variant="outline" className="border-flow/40 font-mono text-flow">
              Flagship
            </Badge>
            <StatusDot status={project.status} />
            <span className="font-mono text-xs text-muted-foreground">{project.year}</span>
          </div>
          <h3 className="font-display text-2xl font-bold sm:text-3xl">{project.name}</h3>
          <p className="mt-2 text-pretty text-sm text-muted-foreground sm:text-base">
            {project.tagline}
          </p>

          <div className="mt-5 space-y-3 text-sm leading-relaxed">
            <PAR label="Problem" text={project.problem} />
            <PAR label="Approach" text={project.approach} />
            <PAR label="Result" text={project.result} highlight />
          </div>

          <div className="mt-5 flex flex-wrap gap-1.5">
            {project.stack.map((s) => (
              <span
                key={s}
                className="rounded-md bg-secondary px-2 py-0.5 font-mono text-[0.7rem] text-secondary-foreground"
              >
                {s}
              </span>
            ))}
          </div>

          {project.link && (
            <a
              href={project.link.href}
              target="_blank"
              rel="noreferrer"
              className="mt-5 inline-flex cursor-pointer items-center gap-1 text-sm font-medium text-flow transition-colors hover:underline"
            >
              {project.link.label}
              <ArrowUpRight className="size-4" />
            </a>
          )}
        </div>

        <div className={`flex flex-col justify-center gap-4 ${flip ? "lg:order-1" : ""}`}>
          {project.architecture && <Architecture {...project.architecture} />}
          <Metrics project={project} />
        </div>
      </div>
    </motion.article>
  )
}

function PAR({ label, text, highlight }: { label: string; text: string; highlight?: boolean }) {
  return (
    <div>
      <span className="mr-2 font-mono text-[0.7rem] uppercase tracking-wide text-flow">
        {label}
      </span>
      <span className={highlight ? "text-foreground" : "text-muted-foreground"}>{text}</span>
    </div>
  )
}

function CompactCard({ project }: { project: Project }) {
  return (
    <Dialog>
      <article className="card-ring group flex h-full flex-col overflow-hidden rounded-2xl bg-card/40 backdrop-blur transition-transform duration-300 hover:-translate-y-1">
        {project.image && (
          <div className="relative h-40 overflow-hidden">
            <img
              src={asset(project.image)}
              alt={`${project.name} preview`}
              loading="lazy"
              className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-105"
            />
            <div
              className="absolute inset-0"
              style={{
                background:
                  "linear-gradient(180deg, transparent 30%, color-mix(in oklab, var(--card) 92%, transparent) 100%)",
              }}
            />
          </div>
        )}
        <div className="flex flex-1 flex-col p-5">
          <div className="mb-2 flex items-center gap-3">
            <StatusDot status={project.status} />
            <span className="font-mono text-xs text-muted-foreground">{project.year}</span>
          </div>
          <h3 className="font-display text-lg font-semibold">{project.name}</h3>
          <p className="mt-1.5 flex-1 text-sm text-muted-foreground">{project.tagline}</p>

          <div className="mt-4 flex flex-wrap gap-1.5">
            {project.stack.slice(0, 4).map((s) => (
              <span
                key={s}
                className="rounded-md bg-secondary px-2 py-0.5 font-mono text-[0.68rem] text-secondary-foreground"
              >
                {s}
              </span>
            ))}
          </div>

          <DialogTrigger className="mt-4 inline-flex w-fit cursor-pointer items-center gap-1 text-sm font-medium text-flow transition-colors hover:underline">
            Read the case study
            <ChevronRight className="size-4" />
          </DialogTrigger>
        </div>
      </article>

      <DialogContent className="max-h-[88vh] overflow-y-auto sm:max-w-2xl">
        <DialogHeader>
          <DialogTitle className="font-display text-2xl">{project.name}</DialogTitle>
          <DialogDescription>{project.tagline}</DialogDescription>
        </DialogHeader>
        <div className="space-y-4">
          <Metrics project={project} />
          <div className="space-y-3 text-sm leading-relaxed">
            <PAR label="Problem" text={project.problem} />
            <PAR label="Approach" text={project.approach} />
            <PAR label="Result" text={project.result} highlight />
          </div>
          <div className="flex flex-wrap gap-1.5">
            {project.stack.map((s) => (
              <span
                key={s}
                className="rounded-md bg-secondary px-2 py-0.5 font-mono text-[0.7rem] text-secondary-foreground"
              >
                {s}
              </span>
            ))}
          </div>
          {project.link && (
            <a
              href={project.link.href}
              target="_blank"
              rel="noreferrer"
              className="inline-flex cursor-pointer items-center gap-1 text-sm font-medium text-flow hover:underline"
            >
              {project.link.label}
              <ArrowUpRight className="size-4" />
            </a>
          )}
        </div>
      </DialogContent>
    </Dialog>
  )
}
