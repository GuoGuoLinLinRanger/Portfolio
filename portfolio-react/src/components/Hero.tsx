import { motion } from "motion/react"
import { Mail } from "lucide-react"
import { Button } from "@/components/ui/button"
import { CountUp } from "@/components/CountUp"
import { GithubIcon, LinkedinIcon } from "@/components/icons"
import { asset } from "@/lib/asset"
import { headlineStats, profile } from "@/data/portfolio"

const ease = [0.22, 1, 0.36, 1] as const

export function Hero() {
  return (
    <section
      id="top"
      data-hue={272}
      className="relative mx-auto flex min-h-[86svh] w-full max-w-6xl flex-col justify-center px-5 pb-14 pt-28 sm:px-8"
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
            I build software that
            <br className="hidden sm:block" />{" "}
            <span className="text-gradient-flow">runs while I sleep.</span>
          </motion.h1>

          <motion.p
            initial={{ opacity: 0, y: 24 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, ease, delay: 0.12 }}
            className="mt-5 max-w-2xl text-pretty text-lg leading-relaxed text-muted-foreground sm:text-xl"
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

      {/* ---- Proof, kept quiet: the work is the headline, these just back it up ---- */}
      <motion.div
        initial={{ opacity: 0, y: 16 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.7, delay: 0.4 }}
        className="mt-10 flex flex-wrap gap-x-8 gap-y-3 border-t border-border/50 pt-6"
      >
        {headlineStats.map((s) => (
          <div key={s.label} className="flex items-baseline gap-2">
            <CountUp value={s.value} className="font-mono text-sm font-semibold text-flow" />
            <span className="text-xs text-muted-foreground">{s.label}</span>
          </div>
        ))}
      </motion.div>
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
