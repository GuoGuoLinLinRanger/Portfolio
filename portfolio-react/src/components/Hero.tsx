import { motion } from "motion/react"
import { ArrowDown, Mail } from "lucide-react"
import { Button } from "@/components/ui/button"
import { GithubIcon, LinkedinIcon } from "@/components/icons"
import { asset } from "@/lib/asset"
import { awards, headlineStats, profile } from "@/data/portfolio"

const ease = [0.22, 1, 0.36, 1] as const

export function Hero() {
  return (
    <section
      id="top"
      data-hue={272}
      className="relative mx-auto flex min-h-[100svh] w-full max-w-6xl flex-col justify-center px-5 pb-16 pt-28 sm:px-8"
    >
      <div className="grid items-center gap-10 lg:grid-cols-[1.35fr_1fr]">
        {/* ---- Left: the pitch ---- */}
        <div>
          {/* mobile-only feathered avatar so recruiters on phones get a face */}
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.6, ease }}
            className="relative mb-6 h-20 w-20 lg:hidden"
          >
            <div
              className="absolute inset-0 -z-10 rounded-2xl opacity-70 blur-xl"
              style={{ background: "radial-gradient(circle, hsl(var(--flow-hue) 85% 60% / 0.6), transparent 70%)" }}
            />
            <img
              src={asset(profile.photo)}
              alt="Tian Yi Tong"
              width={80}
              height={80}
              className="h-20 w-20 rounded-2xl object-cover"
              style={{
                WebkitMaskImage: "radial-gradient(circle at 50% 42%, #000 62%, transparent 96%)",
                maskImage: "radial-gradient(circle at 50% 42%, #000 62%, transparent 96%)",
              }}
            />
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, ease }}
            className="mb-5 inline-flex items-center gap-2 rounded-full border border-border/70 bg-card/40 px-3 py-1.5 font-mono text-xs text-muted-foreground backdrop-blur"
          >
            <span className="relative flex h-2 w-2">
              <span
                className="absolute inline-flex h-full w-full rounded-full opacity-75"
                style={{ background: "var(--live)", animation: "pulse-live 2.4s ease-in-out infinite" }}
              />
              <span className="relative inline-flex h-2 w-2 rounded-full" style={{ background: "var(--live)" }} />
            </span>
            Systems live in production right now
          </motion.div>

          <motion.h1
            initial={{ opacity: 0, y: 24 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, ease, delay: 0.05 }}
            className="text-balance text-4xl font-bold leading-[1.05] tracking-tight sm:text-5xl md:text-6xl"
          >
            I build full-stack systems
            <br className="hidden sm:block" /> and{" "}
            <span className="text-gradient-flow">keep them running.</span>
          </motion.h1>

          <motion.p
            initial={{ opacity: 0, y: 24 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, ease, delay: 0.12 }}
            className="mt-5 max-w-xl text-pretty text-base leading-relaxed text-muted-foreground sm:text-lg"
          >
            {profile.blurb}
          </motion.p>

          <motion.div
            initial={{ opacity: 0, y: 24 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, ease, delay: 0.2 }}
            className="mt-7 flex flex-wrap items-center gap-3"
          >
            <Button
              size="lg"
              className="cursor-pointer"
              style={{ background: "var(--flow)", color: "var(--primary-foreground)" }}
              onClick={() => document.querySelector("#work")?.scrollIntoView({ behavior: "smooth" })}
            >
              See the work
            </Button>
            <div className="flex items-center gap-1">
              <IconLink href={profile.github} label="GitHub"><GithubIcon className="size-4.5" /></IconLink>
              <IconLink href={profile.linkedin} label="LinkedIn"><LinkedinIcon className="size-4.5" /></IconLink>
              <IconLink href={`mailto:${profile.email}`} label="Email"><Mail className="size-4.5" /></IconLink>
            </div>
          </motion.div>

          {/* award chips — supporting credibility, not the headline */}
          <motion.ul
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.7, delay: 0.32 }}
            className="mt-8 flex flex-wrap gap-2"
          >
            {awards.map((a) => (
              <li
                key={a.title}
                className="inline-flex items-center gap-2 rounded-full border border-border/70 bg-card/40 px-3 py-1.5 text-xs backdrop-blur"
              >
                <span className="font-mono font-semibold text-flow">{a.place}</span>
                <span className="text-foreground/90">{a.title}</span>
                <span className="text-muted-foreground">· {a.detail}</span>
              </li>
            ))}
          </motion.ul>
        </div>

        {/* ---- Right: portrait that fades into the backdrop ---- */}
        <motion.div
          initial={{ opacity: 0, scale: 0.96 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.9, ease, delay: 0.1 }}
          className="relative mx-auto hidden w-full max-w-sm lg:block"
        >
          <div
            className="absolute inset-0 -z-10 rounded-[2rem] opacity-60 blur-3xl"
            style={{ background: "radial-gradient(circle at 50% 40%, hsl(var(--flow-hue) 85% 60% / 0.5), transparent 70%)" }}
          />
          <div
            className="relative overflow-hidden rounded-[2rem]"
            style={{ animation: "float-slow 7s ease-in-out infinite" }}
          >
            <img
              src={asset(profile.photo)}
              alt="Tian Yi Tong"
              width={420}
              height={520}
              className="h-auto w-full object-cover"
              style={{
                // fade all photo edges into the page — no hard box
                WebkitMaskImage:
                  "radial-gradient(130% 118% at 50% 40%, #000 44%, transparent 82%)",
                maskImage:
                  "radial-gradient(130% 118% at 50% 40%, #000 44%, transparent 82%)",
              }}
            />
            <div
              className="pointer-events-none absolute inset-0"
              style={{
                background:
                  "linear-gradient(180deg, transparent 50%, color-mix(in oklab, var(--background) 70%, transparent) 100%)",
              }}
            />
          </div>
        </motion.div>
      </div>

      {/* ---- Headline stats: scannable proof in 3 seconds ---- */}
      <motion.div
        initial={{ opacity: 0, y: 24 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.7, delay: 0.4 }}
        className="mt-14 grid grid-cols-2 gap-px overflow-hidden rounded-2xl border border-border/60 bg-border/40 lg:grid-cols-4"
      >
        {headlineStats.map((s) => (
          <div key={s.label} className="bg-card/40 p-5 backdrop-blur transition-colors hover:bg-card/70">
            <div className="font-display text-2xl font-bold text-flow sm:text-3xl">{s.value}</div>
            <div className="mt-1 text-sm font-medium text-foreground/90">{s.label}</div>
            <div className="mt-1 text-xs text-muted-foreground">{s.sub}</div>
          </div>
        ))}
      </motion.div>

      <motion.a
        href="#work"
        aria-label="Scroll to work"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1, duration: 0.6 }}
        onClick={(e) => {
          e.preventDefault()
          document.querySelector("#work")?.scrollIntoView({ behavior: "smooth" })
        }}
        className="mx-auto mt-12 hidden cursor-pointer text-muted-foreground transition-colors hover:text-foreground md:block"
      >
        <ArrowDown className="size-5 animate-bounce" />
      </motion.a>
    </section>
  )
}

function IconLink({
  href,
  label,
  children,
}: {
  href: string
  label: string
  children: React.ReactNode
}) {
  return (
    <a
      href={href}
      target={href.startsWith("http") ? "_blank" : undefined}
      rel={href.startsWith("http") ? "noreferrer" : undefined}
      aria-label={label}
      className="grid size-10 cursor-pointer place-items-center rounded-lg text-muted-foreground transition-colors hover:bg-accent hover:text-foreground"
    >
      {children}
    </a>
  )
}
