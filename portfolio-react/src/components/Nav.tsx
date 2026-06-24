import { useEffect, useState } from "react"
import { AnimatePresence, motion } from "motion/react"
import { Menu, Moon, Sun, X } from "lucide-react"
import { Button } from "@/components/ui/button"
import { cn } from "@/lib/utils"

const LINKS = [
  { href: "#experience", label: "Experience" },
  { href: "#work", label: "Work" },
  { href: "#skills", label: "Skills" },
  { href: "#now", label: "Now" },
  { href: "#contact", label: "Contact" },
]

type NavProps = {
  theme: "dark" | "light"
  onToggleTheme: () => void
}

export function Nav({ theme, onToggleTheme }: NavProps) {
  const [scrolled, setScrolled] = useState(false)
  const [open, setOpen] = useState(false)

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 24)
    onScroll()
    window.addEventListener("scroll", onScroll, { passive: true })
    return () => window.removeEventListener("scroll", onScroll)
  }, [])

  const go = (href: string) => {
    setOpen(false)
    document.querySelector(href)?.scrollIntoView({ behavior: "smooth" })
  }

  return (
    <header
      className={cn(
        "fixed inset-x-0 top-0 z-50 transition-all duration-300",
        scrolled ? "py-2" : "py-4",
      )}
    >
      <nav
        className={cn(
          "mx-auto flex max-w-6xl items-center justify-between gap-4 rounded-2xl px-4 py-2.5 transition-all duration-300 sm:px-5",
          scrolled
            ? "glass hairline shadow-lg shadow-black/20"
            : "border border-transparent",
        )}
        style={{ marginInline: "1rem" }}
        aria-label="Primary"
      >
        <a
          href="#top"
          onClick={(e) => {
            e.preventDefault()
            window.scrollTo({ top: 0, behavior: "smooth" })
          }}
          className="group flex items-center gap-2.5 font-display text-sm font-semibold"
        >
          <span
            className="grid h-7 w-7 place-items-center rounded-lg text-[0.8rem] font-bold text-primary-foreground transition-transform duration-300 group-hover:scale-110"
            style={{ background: "var(--flow)" }}
          >
            TT
          </span>
          <span className="hidden sm:inline">Tian Yi Tong</span>
        </a>

        <div className="hidden items-center gap-1 md:flex">
          {LINKS.map((l) => (
            <button
              key={l.href}
              onClick={() => go(l.href)}
              className="cursor-pointer rounded-lg px-3 py-1.5 text-sm text-muted-foreground transition-colors hover:bg-accent hover:text-foreground"
            >
              {l.label}
            </button>
          ))}
        </div>

        <div className="flex items-center gap-1.5">
          <Button
            variant="ghost"
            size="icon"
            aria-label={`Switch to ${theme === "dark" ? "light" : "dark"} mode`}
            onClick={onToggleTheme}
            className="cursor-pointer"
          >
            {theme === "dark" ? (
              <Sun className="size-4" />
            ) : (
              <Moon className="size-4" />
            )}
          </Button>
          <Button
            onClick={() => go("#contact")}
            className="hidden cursor-pointer sm:inline-flex"
            size="sm"
            style={{ background: "var(--flow)", color: "var(--primary-foreground)" }}
          >
            Get in touch
          </Button>
          <Button
            variant="ghost"
            size="icon"
            className="cursor-pointer md:hidden"
            aria-label={open ? "Close menu" : "Open menu"}
            aria-expanded={open}
            onClick={() => setOpen((o) => !o)}
          >
            {open ? <X className="size-5" /> : <Menu className="size-5" />}
          </Button>
        </div>
      </nav>

      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ opacity: 0, y: -8 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -8 }}
            transition={{ duration: 0.2 }}
            className="glass hairline mx-4 mt-2 flex flex-col gap-1 rounded-2xl p-2 md:hidden"
          >
            {LINKS.map((l) => (
              <button
                key={l.href}
                onClick={() => go(l.href)}
                className="cursor-pointer rounded-xl px-4 py-3 text-left text-sm font-medium text-foreground transition-colors hover:bg-accent"
              >
                {l.label}
              </button>
            ))}
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  )
}
