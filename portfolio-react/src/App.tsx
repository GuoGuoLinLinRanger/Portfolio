import { Achievements } from "@/components/Achievements"
import { Backdrop } from "@/components/Backdrop"
import { Contact } from "@/components/Contact"
import { CustomCursor } from "@/components/CustomCursor"
import { Experience } from "@/components/Experience"
import { Footer } from "@/components/Footer"
import { Hero } from "@/components/Hero"
import { Nav } from "@/components/Nav"
import { ParticleField } from "@/components/ParticleField"
import { Projects } from "@/components/Projects"
import { ScrollProgress } from "@/components/ScrollProgress"
import { SkillsMatrix } from "@/components/SkillsMatrix"
import { Toaster } from "@/components/ui/sonner"
import { useColorFlow } from "@/hooks/useColorFlow"
import { useTheme } from "@/hooks/useTheme"

export default function App() {
  const { theme, toggle } = useTheme()
  useColorFlow()

  return (
    <>
      <a
        href="#experience"
        className="sr-only focus:not-sr-only focus:fixed focus:left-4 focus:top-4 focus:z-[100] focus:rounded-lg focus:bg-flow focus:px-4 focus:py-2 focus:text-primary-foreground"
      >
        Skip to content
      </a>

      <Backdrop />
      <ParticleField />
      <ScrollProgress />
      <Nav theme={theme} onToggleTheme={toggle} />

      <main className="relative">
        <Hero />
        <Experience />
        <Projects />
        <Achievements />
        <SkillsMatrix />
        <Contact />
      </main>

      <Footer />
      <Toaster position="bottom-right" />
      <CustomCursor />
    </>
  )
}
