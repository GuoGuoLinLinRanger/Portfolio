import { useState } from "react"
import { motion, useReducedMotion, useSpring } from "motion/react"
import { ArrowRight, ArrowUpRight, ChevronRight, Images } from "lucide-react"
import { Section } from "@/components/Section"
import { CountUp } from "@/components/CountUp"
import { Badge } from "@/components/ui/badge"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog"
import { asset } from "@/lib/asset"
import { cn } from "@/lib/utils"
import { projects, type Project } from "@/data/portfolio"

const ease = [0.22, 1, 0.36, 1] as const

const ctaLabel = (p: Project) =>
  p.gallery?.length ? "View gallery & case study" : "Open case study"

export function Projects() {
  const flagships = projects.filter((p) => p.flagship)
  const rest = projects.filter((p) => !p.flagship)

  return (
    <Section
      id="work"
      hue={222}
      eyebrow="Selected work"
      title="Things I built and shipped"
      intro="The work does the talking. Each one is a real system with real numbers — where it's a backtest and not a live record, I say so. Open any project for the full case study and screenshots."
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
          <CountUp value={m.value} className="font-display text-lg font-bold text-flow" />
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

function Highlights({ items }: { items: string[] }) {
  return (
    <div className="rounded-xl border border-border/50 bg-card/40 p-4">
      <div className="mb-2.5 font-mono text-[0.7rem] uppercase tracking-wide text-flow">
        Under the hood
      </div>
      <ul className="space-y-2">
        {items.map((h, i) => (
          <li key={i} className="flex gap-2.5 text-sm leading-relaxed text-muted-foreground">
            <span className="mt-2 h-1 w-1 shrink-0 rounded-full bg-flow/70" />
            <span>{h}</span>
          </li>
        ))}
      </ul>
    </div>
  )
}

/** Image gallery with a large active frame + clickable thumbnails. */
function Gallery({ images }: { images: NonNullable<Project["gallery"]> }) {
  const [i, setI] = useState(0)
  const active = images[Math.min(i, images.length - 1)]
  return (
    <div className="border-b border-border/50 bg-black/40">
      <div className="relative aspect-[16/9] w-full overflow-hidden">
        <img
          key={active.src}
          src={asset(active.src)}
          alt={active.caption}
          className="h-full w-full animate-in fade-in-0 object-cover duration-300"
        />
        {/* top scrim keeps the close button legible over bright shots */}
        <div className="pointer-events-none absolute inset-x-0 top-0 h-16 bg-gradient-to-b from-black/55 to-transparent" />
        <div className="pointer-events-none absolute inset-x-0 bottom-0 bg-gradient-to-t from-black/75 to-transparent p-3">
          <p className="text-xs text-white/90">{active.caption}</p>
        </div>
      </div>
      {images.length > 1 && (
        <div className="flex gap-2 overflow-x-auto p-3">
          {images.map((img, idx) => (
            <button
              key={img.src}
              type="button"
              onClick={() => setI(idx)}
              aria-label={`View: ${img.caption}`}
              aria-current={idx === i}
              className={cn(
                "relative h-14 w-20 shrink-0 cursor-pointer overflow-hidden rounded-md border transition-all",
                idx === i
                  ? "border-flow ring-1 ring-flow"
                  : "border-border/60 opacity-60 hover:opacity-100",
              )}
            >
              <img src={asset(img.src)} alt="" className="h-full w-full object-cover" />
            </button>
          ))}
        </div>
      )}
    </div>
  )
}

/** The shared deep-dive modal opened by every project card. */
function CaseStudy({ project }: { project: Project }) {
  const hasGallery = !!project.gallery?.length
  return (
    <DialogContent className="max-h-[90vh] gap-0 overflow-y-auto p-0 sm:max-w-3xl">
      {hasGallery ? (
        <Gallery images={project.gallery!} />
      ) : project.architecture ? (
        <div className="border-b border-border/50 bg-background/40 p-5">
          <Architecture {...project.architecture} />
        </div>
      ) : null}

      <div className="space-y-5 p-6">
        <DialogHeader className="space-y-2">
          <div className="flex flex-wrap items-center gap-3">
            {project.flagship && (
              <Badge variant="outline" className="border-flow/40 font-mono text-flow">
                Flagship
              </Badge>
            )}
            <StatusDot status={project.status} />
            <span className="font-mono text-xs text-muted-foreground">{project.year}</span>
          </div>
          <DialogTitle className="font-display text-2xl">{project.name}</DialogTitle>
          <DialogDescription>{project.tagline}</DialogDescription>
        </DialogHeader>

        <Metrics project={project} />

        <div className="space-y-3 text-sm leading-relaxed">
          <PAR label="Problem" text={project.problem} />
          <PAR label="Approach" text={project.approach} />
          <PAR label="Result" text={project.result} highlight />
        </div>

        {project.highlights && <Highlights items={project.highlights} />}

        {/* show architecture in the body if a gallery already took the visual slot */}
        {hasGallery && project.architecture && <Architecture {...project.architecture} />}

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
            className="inline-flex w-fit cursor-pointer items-center gap-1 text-sm font-medium text-flow hover:underline"
          >
            {project.link.label}
            <ArrowUpRight className="size-4" />
          </a>
        )}
      </div>
    </DialogContent>
  )
}

function FlagshipCard({ project, flip }: { project: Project; flip: boolean }) {
  const [open, setOpen] = useState(false)
  const reduce = useReducedMotion()
  // cursor-driven 3D tilt — springy, subtle, and disabled for reduced motion
  const rotateX = useSpring(0, { stiffness: 140, damping: 18 })
  const rotateY = useSpring(0, { stiffness: 140, damping: 18 })

  const handleMove = (e: React.MouseEvent<HTMLElement>) => {
    if (reduce) return
    const r = e.currentTarget.getBoundingClientRect()
    const px = (e.clientX - r.left) / r.width - 0.5
    const py = (e.clientY - r.top) / r.height - 0.5
    rotateY.set(px * 6)
    rotateX.set(-py * 6)
  }
  const handleLeave = () => {
    rotateX.set(0)
    rotateY.set(0)
  }

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <motion.article
        onMouseMove={handleMove}
        onMouseLeave={handleLeave}
        onClick={() => setOpen(true)}
        onKeyDown={(e) => {
          if (e.key === "Enter" || e.key === " ") {
            e.preventDefault()
            setOpen(true)
          }
        }}
        role="button"
        tabIndex={0}
        aria-haspopup="dialog"
        aria-label={`Open ${project.name} case study`}
        initial={{ opacity: 0, y: 30 }}
        whileInView={{ opacity: 1, y: 0 }}
        whileHover={reduce ? undefined : { y: -4 }}
        viewport={{ once: true, margin: "-80px" }}
        transition={{ duration: 0.6, ease }}
        style={{ rotateX, rotateY, transformPerspective: 1200 }}
        className="card-ring group relative cursor-pointer overflow-hidden rounded-3xl bg-card/40 p-6 backdrop-blur outline-none focus-visible:ring-2 focus-visible:ring-flow sm:p-8"
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

            <div className="mt-5 inline-flex items-center gap-1.5 text-sm font-medium text-flow">
              {ctaLabel(project)}
              <ArrowRight className="size-4 transition-transform group-hover:translate-x-0.5" />
            </div>
          </div>

          <div className={`flex flex-col justify-center gap-4 ${flip ? "lg:order-1" : ""}`}>
            {project.architecture && <Architecture {...project.architecture} />}
            <Metrics project={project} />
          </div>
        </div>
      </motion.article>

      <CaseStudy project={project} />
    </Dialog>
  )
}

function CompactCard({ project }: { project: Project }) {
  const [open, setOpen] = useState(false)
  const hasGallery = !!project.gallery?.length
  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <article
        onClick={() => setOpen(true)}
        onKeyDown={(e) => {
          if (e.key === "Enter" || e.key === " ") {
            e.preventDefault()
            setOpen(true)
          }
        }}
        role="button"
        tabIndex={0}
        aria-haspopup="dialog"
        aria-label={`Open ${project.name} case study`}
        className="card-ring group flex h-full cursor-pointer flex-col overflow-hidden rounded-2xl bg-card/40 backdrop-blur outline-none transition-transform duration-300 hover:-translate-y-1 focus-visible:ring-2 focus-visible:ring-flow"
      >
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
            {hasGallery && project.gallery!.length > 1 && (
              <span className="absolute right-2.5 top-2.5 inline-flex items-center gap-1 rounded-full bg-black/55 px-2 py-1 font-mono text-[0.65rem] text-white/90 backdrop-blur">
                <Images className="size-3" />
                {project.gallery!.length}
              </span>
            )}
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

          <span className="mt-4 inline-flex w-fit items-center gap-1 text-sm font-medium text-flow">
            {ctaLabel(project)}
            <ArrowRight className="size-4 transition-transform group-hover:translate-x-0.5" />
          </span>
        </div>
      </article>

      <CaseStudy project={project} />
    </Dialog>
  )
}
