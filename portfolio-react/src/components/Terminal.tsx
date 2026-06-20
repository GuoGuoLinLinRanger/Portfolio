import { useEffect, useRef, useState } from "react"
import { motion } from "motion/react"
import { TerminalSquare } from "lucide-react"
import { awards, profile, projects, skillGroups } from "@/data/portfolio"

type Line = { kind: "in" | "out"; text: string }

const HELP = `Available commands:
  about       who I am in one line
  projects    what I've shipped
  skills      the stack, by layer
  awards      competition results
  contact     how to reach me
  resume      where to find the long version
  clear       wipe the screen
  help        this list`

function run(cmd: string): string {
  const c = cmd.trim().toLowerCase()
  switch (c) {
    case "":
      return ""
    case "help":
      return HELP
    case "about":
    case "whoami":
      return `${profile.name} — ${profile.role}. ${profile.tagline}`
    case "projects":
      return projects
        .map((p) => `  ${p.flagship ? "★" : "·"} ${p.name} — ${p.tagline}`)
        .join("\n")
    case "skills":
      return skillGroups
        .map((g) => `  ${g.title}: ${g.skills.map((s) => s.name).join(", ")}`)
        .join("\n")
    case "awards":
      return awards.map((a) => `  ${a.place} — ${a.title} (${a.detail})`).join("\n")
    case "contact":
      return `  email    ${profile.email}\n  github   ${profile.github}\n  linkedin ${profile.linkedin}`
    case "resume":
      return "  Ask me at " + profile.email + " — happy to send the PDF."
    case "ls":
      return "about  projects  skills  awards  experience  contact"
    case "sudo":
    case "sudo su":
      return "  Nice try. You already have everything you need here."
    default:
      return `command not found: ${c} — type 'help'`
  }
}

const BOOT: Line[] = [
  { kind: "out", text: "tian@portfolio:~$ welcome — this terminal is real. type 'help'." },
]

export function Terminal() {
  const [lines, setLines] = useState<Line[]>(BOOT)
  const [value, setValue] = useState("")
  const scrollRef = useRef<HTMLDivElement>(null)
  const inputRef = useRef<HTMLInputElement>(null)

  useEffect(() => {
    scrollRef.current?.scrollTo({ top: scrollRef.current.scrollHeight })
  }, [lines])

  const submit = (e: React.FormEvent) => {
    e.preventDefault()
    const input = value
    const out = run(input)
    if (input.trim().toLowerCase() === "clear") {
      setLines([])
    } else {
      setLines((prev) => [
        ...prev,
        { kind: "in", text: input },
        ...(out ? [{ kind: "out" as const, text: out }] : []),
      ])
    }
    setValue("")
  }

  return (
    <motion.div
      initial={{ opacity: 0, y: 24 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-60px" }}
      transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
      className="card-ring overflow-hidden rounded-2xl bg-[#0a0b11]/80 font-mono text-[0.8rem] backdrop-blur"
      onClick={() => inputRef.current?.focus()}
    >
      <div className="flex items-center gap-2 border-b border-white/10 px-4 py-2.5">
        <span className="h-3 w-3 rounded-full bg-[#ff5f57]" />
        <span className="h-3 w-3 rounded-full bg-[#febc2e]" />
        <span className="h-3 w-3 rounded-full bg-[#28c840]" />
        <span className="ml-2 flex items-center gap-1.5 text-xs text-white/40">
          <TerminalSquare className="size-3.5" />
          tian@portfolio — try it
        </span>
      </div>
      <div ref={scrollRef} className="max-h-72 space-y-1 overflow-y-auto p-4 text-white/80">
        {lines.map((l, i) =>
          l.kind === "in" ? (
            <div key={i} className="flex gap-2">
              <span className="shrink-0 text-[#28c840]">tian@portfolio:~$</span>
              <span className="text-white">{l.text}</span>
            </div>
          ) : (
            <pre key={i} className="whitespace-pre-wrap break-words text-white/65">
              {l.text}
            </pre>
          ),
        )}
        <form onSubmit={submit} className="flex gap-2">
          <span className="shrink-0 text-[#28c840]">tian@portfolio:~$</span>
          <input
            ref={inputRef}
            value={value}
            onChange={(e) => setValue(e.target.value)}
            aria-label="Terminal command input"
            autoComplete="off"
            spellCheck={false}
            className="flex-1 bg-transparent text-white caret-[#28c840] outline-none"
          />
        </form>
      </div>
    </motion.div>
  )
}
