/**
 * Layered atmospheric backdrop — never a flat color block, in either theme.
 * Dark: restrained aurora blooms over near-black + a vignette for depth.
 * Light: soft color washes over near-white so the page reads as atmospheric
 * rather than blank. Both follow the live flow hue. Fixed behind the particle
 * field; sections sit on top mostly-transparent so this shows through.
 */
export function Backdrop() {
  return (
    <div
      aria-hidden="true"
      className="pointer-events-none fixed inset-0 -z-20 overflow-hidden"
    >
      <div className="absolute inset-0 bg-background" />

      {/* ---- Dark theme atmosphere ---- */}
      <div className="absolute inset-0 hidden dark:block">
        <div
          className="absolute -top-[22%] left-1/2 h-[88vh] w-[88vh] -translate-x-1/2 rounded-full opacity-[0.36] blur-[150px] transition-[background] duration-700"
          style={{
            background:
              "radial-gradient(circle at center, hsl(var(--flow-hue) 85% 62% / 0.4), transparent 62%)",
          }}
        />
        <div
          className="absolute bottom-[-18%] right-[-12%] h-[70vh] w-[70vh] rounded-full opacity-[0.28] blur-[160px] transition-[background] duration-700"
          style={{
            background:
              "radial-gradient(circle at center, hsl(calc(var(--flow-hue) - 45) 82% 55% / 0.34), transparent 62%)",
          }}
        />
        <div
          className="absolute inset-0"
          style={{
            background:
              "radial-gradient(120% 80% at 50% 0%, transparent 42%, color-mix(in oklab, var(--background) 88%, transparent) 100%)",
          }}
        />
      </div>

      {/* ---- Light theme atmosphere: soft color washes ---- */}
      <div className="absolute inset-0 dark:hidden">
        <div
          className="absolute -top-[16%] left-[-6%] h-[72vh] w-[72vh] rounded-full opacity-70 blur-[120px] transition-[background] duration-700"
          style={{
            background:
              "radial-gradient(circle at center, hsl(var(--flow-hue) 92% 78% / 0.5), transparent 66%)",
          }}
        />
        <div
          className="absolute bottom-[-18%] right-[-8%] h-[66vh] w-[66vh] rounded-full opacity-60 blur-[130px] transition-[background] duration-700"
          style={{
            background:
              "radial-gradient(circle at center, hsl(calc(var(--flow-hue) - 50) 88% 76% / 0.45), transparent 66%)",
          }}
        />
        <div
          className="absolute top-1/4 left-1/3 h-[50vh] w-[50vh] rounded-full opacity-40 blur-[140px] transition-[background] duration-700"
          style={{
            background:
              "radial-gradient(circle at center, hsl(calc(var(--flow-hue) + 24) 90% 80% / 0.4), transparent 66%)",
          }}
        />
      </div>
    </div>
  )
}
