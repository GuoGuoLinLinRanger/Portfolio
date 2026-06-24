/**
 * Layered atmospheric backdrop — deliberately NOT a flat color block, but
 * dialed back: two restrained aurora blooms that follow the flow hue plus a
 * vignette for depth. No film grain, softer/fewer glows than before so the
 * constellation does the talking. Fixed behind the particle field; sections
 * sit on top mostly-transparent so this shows through.
 */
export function Backdrop() {
  return (
    <div
      aria-hidden="true"
      className="pointer-events-none fixed inset-0 -z-20 overflow-hidden"
    >
      <div className="absolute inset-0 bg-background" />

      {/* primary aurora bloom — softened */}
      <div
        className="absolute -top-[22%] left-1/2 h-[88vh] w-[88vh] -translate-x-1/2 rounded-full opacity-[0.32] blur-[150px] transition-[background] duration-700"
        style={{
          background:
            "radial-gradient(circle at center, hsl(var(--flow-hue) 85% 62% / 0.34), transparent 62%)",
        }}
      />
      {/* secondary, offset and hue-shifted — softened */}
      <div
        className="absolute bottom-[-18%] right-[-12%] h-[68vh] w-[68vh] rounded-full opacity-[0.24] blur-[160px] transition-[background] duration-700"
        style={{
          background:
            "radial-gradient(circle at center, hsl(calc(var(--flow-hue) - 45) 82% 55% / 0.3), transparent 62%)",
        }}
      />

      {/* vignette for cinematic depth */}
      <div
        className="absolute inset-0"
        style={{
          background:
            "radial-gradient(120% 80% at 50% 0%, transparent 42%, color-mix(in oklab, var(--background) 88%, transparent) 100%)",
        }}
      />
    </div>
  )
}
