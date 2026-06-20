import { useState } from "react"
import { motion } from "motion/react"
import { Mail, Send } from "lucide-react"
import { GithubIcon, LinkedinIcon } from "@/components/icons"
import { toast } from "sonner"
import { Section } from "@/components/Section"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Terminal } from "@/components/Terminal"
import { profile } from "@/data/portfolio"

// TODO: replace REPLACE_WITH_FORM_ID with the real Formspree form id.
// Until then, the form degrades gracefully to a prefilled email (see below),
// so it always does something useful instead of failing silently.
const FORMSPREE_ENDPOINT = "https://formspree.io/f/REPLACE_WITH_FORM_ID"
const FORMSPREE_CONFIGURED = !FORMSPREE_ENDPOINT.includes("REPLACE_WITH_FORM_ID")

export function Contact() {
  const [status, setStatus] = useState<"idle" | "sending" | "sent">("idle")

  const onSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    const form = e.currentTarget
    const data = new FormData(form)
    const name = String(data.get("name") || "").trim()
    const email = String(data.get("email") || "").trim()
    const message = String(data.get("message") || "").trim()

    if (!name || !email || !message) {
      toast.error("Please fill out every field.")
      return
    }

    // No Formspree id wired yet → open the user's mail client, prefilled.
    if (!FORMSPREE_CONFIGURED) {
      const subject = encodeURIComponent(`Portfolio — ${name}`)
      const body = encodeURIComponent(`${message}\n\n— ${name} (${email})`)
      window.location.href = `mailto:${profile.email}?subject=${subject}&body=${body}`
      toast.success("Opening your email client…")
      return
    }

    setStatus("sending")
    try {
      const res = await fetch(FORMSPREE_ENDPOINT, {
        method: "POST",
        headers: { Accept: "application/json" },
        body: data,
      })
      if (!res.ok) throw new Error("bad response")
      setStatus("sent")
      toast.success("Message sent — I'll get back to you soon.")
      form.reset()
      setTimeout(() => setStatus("idle"), 4000)
    } catch {
      setStatus("idle")
      toast.error(`Couldn't send. Email me directly at ${profile.email}.`)
    }
  }

  return (
    <Section
      id="contact"
      hue={152}
      eyebrow="Let's talk"
      title="Building something? Hiring?"
      intro="I'm open to full-stack, platform, and product-engineering roles. The fastest way to reach me is the form or a direct line below."
    >
      <div className="grid gap-6 lg:grid-cols-[1.1fr_0.9fr]">
        <motion.form
          onSubmit={onSubmit}
          action={FORMSPREE_ENDPOINT}
          method="POST"
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-60px" }}
          transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
          className="card-ring space-y-4 rounded-2xl bg-card/40 p-6 backdrop-blur"
        >
          <div className="grid gap-4 sm:grid-cols-2">
            <div className="space-y-1.5">
              <Label htmlFor="name">Name</Label>
              <Input id="name" name="name" placeholder="Ada Lovelace" required autoComplete="name" />
            </div>
            <div className="space-y-1.5">
              <Label htmlFor="email">Email</Label>
              <Input
                id="email"
                name="email"
                type="email"
                placeholder="ada@compute.org"
                required
                autoComplete="email"
              />
            </div>
          </div>
          <div className="space-y-1.5">
            <Label htmlFor="message">Message</Label>
            <Textarea
              id="message"
              name="message"
              placeholder="What are you building, and where could I help?"
              required
              rows={5}
            />
          </div>
          <Button
            type="submit"
            disabled={status === "sending"}
            className="w-full cursor-pointer sm:w-auto"
            style={{ background: "var(--flow)", color: "var(--primary-foreground)" }}
          >
            <Send className="size-4" />
            {status === "sending" ? "Sending…" : status === "sent" ? "Sent ✓" : "Send message"}
          </Button>
        </motion.form>

        <div className="flex flex-col gap-4">
          <div className="card-ring rounded-2xl bg-card/40 p-6 backdrop-blur">
            <div className="font-mono text-xs uppercase tracking-wide text-flow">Direct lines</div>
            <div className="mt-4 flex flex-col gap-2">
              <ContactLink href={`mailto:${profile.email}`} icon={<Mail className="size-4" />}>
                {profile.email}
              </ContactLink>
              <ContactLink href={profile.github} icon={<GithubIcon className="size-4" />} external>
                github.com/GuoGuoLinLinRanger
              </ContactLink>
              <ContactLink href={profile.linkedin} icon={<LinkedinIcon className="size-4" />} external>
                linkedin.com/in/tian-yi-tong
              </ContactLink>
            </div>
          </div>
          <Terminal />
        </div>
      </div>
    </Section>
  )
}

function ContactLink({
  href,
  icon,
  external,
  children,
}: {
  href: string
  icon: React.ReactNode
  external?: boolean
  children: React.ReactNode
}) {
  return (
    <a
      href={href}
      target={external ? "_blank" : undefined}
      rel={external ? "noreferrer" : undefined}
      className="group flex items-center gap-3 rounded-lg px-3 py-2.5 text-sm transition-colors hover:bg-accent"
    >
      <span className="grid size-8 shrink-0 place-items-center rounded-lg bg-flow-soft text-flow">
        {icon}
      </span>
      <span className="text-foreground/90 transition-colors group-hover:text-foreground">
        {children}
      </span>
    </a>
  )
}
