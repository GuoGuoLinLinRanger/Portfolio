import { Mail } from "lucide-react"
import { GithubIcon, LinkedinIcon } from "@/components/icons"
import { profile } from "@/data/portfolio"

export function Footer() {
  const year = new Date().getFullYear()
  return (
    <footer className="relative mx-auto w-full max-w-6xl px-5 py-10 sm:px-8">
      <div className="hairline flex flex-col items-center justify-between gap-4 rounded-2xl bg-card/30 px-6 py-5 backdrop-blur sm:flex-row">
        <div className="text-sm text-muted-foreground">
          © {year} {profile.name} · Built in React — designed to be kept running.
        </div>
        <div className="flex items-center gap-1">
          <a
            href={profile.github}
            target="_blank"
            rel="noreferrer"
            aria-label="GitHub"
            className="grid size-9 place-items-center rounded-lg text-muted-foreground transition-colors hover:bg-accent hover:text-foreground"
          >
            <GithubIcon className="size-4" />
          </a>
          <a
            href={profile.linkedin}
            target="_blank"
            rel="noreferrer"
            aria-label="LinkedIn"
            className="grid size-9 place-items-center rounded-lg text-muted-foreground transition-colors hover:bg-accent hover:text-foreground"
          >
            <LinkedinIcon className="size-4" />
          </a>
          <a
            href={`mailto:${profile.email}`}
            aria-label="Email"
            className="grid size-9 place-items-center rounded-lg text-muted-foreground transition-colors hover:bg-accent hover:text-foreground"
          >
            <Mail className="size-4" />
          </a>
        </div>
      </div>
    </footer>
  )
}
