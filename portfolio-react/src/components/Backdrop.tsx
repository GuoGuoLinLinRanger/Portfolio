/**
 * Layered atmospheric backdrop — deliberately NOT a flat color block.
 * Base near-black + two soft aurora blooms that follow the flow hue,
 * a top fade and a vignette for depth, plus film grain. Fixed behind
 * the particle field; sections sit on top mostly-transparent so this
 * shows through and "fades into" the content.
 */
export function Backdrop() {
  return (
    <div
      aria-hidden="true"
      className="grain pointer-events-none fixed inset-0 -z-20 overflow-hidden"
    >
      <div className="absolute inset-0 bg-background" />

      {/* primary aurora bloom */}
      <div
        className="absolute -top-[20%] left-1/2 h-[90vh] w-[90vh] -translate-x-1/2 rounded-full opacity-50 blur-[130px] transition-[background] duration-700"
        style={{
          background:
            "radial-gradient(circle at center, hsl(var(--flow-hue) 85% 62% / 0.45), transparent 60%)",
        }}
      />
      {/* secondary, offset and hue-shifted */}
      <div
        className="absolute bottom-[-15%] right-[-10%] h-[70vh] w-[70vh] rounded-full opacity-40 blur-[140px] transition-[background] duration-700"
        style={{
          background:
            "radial-gradient(circle at center, hsl(calc(var(--flow-hue) - 45) 85% 55% / 0.4), transparent 60%)",
        }}
      />
      {/* faint third for richness on the left */}
      <div
        className="absolute top-1/3 left-[-10%] h-[55vh] w-[55vh] rounded-full opacity-25 blur-[140px] transition-[background] duration-700"
        style={{
          background:
            "radial-gradient(circle at center, hsl(calc(var(--flow-hue) + 20) 80% 60% / 0.35), transparent 60%)",
        }}
      />

      {/* vignette for cinematic depth */}
      <div
        className="absolute inset-0"
        style={{
          background:
            "radial-gradient(120% 80% at 50% 0%, transparent 40%, color-mix(in oklab, var(--background) 85%, transparent) 100%)",
        }}
      />
    </div>
  )
}
