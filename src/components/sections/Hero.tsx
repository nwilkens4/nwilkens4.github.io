import { Disc3 } from "lucide-react"

export default function Hero() {
  return (
    <section className="min-h-screen flex flex-col items-center justify-center px-6">
      {/* Logo Placeholder - will be replaced with custom interactive logo */}
      <div className="relative group cursor-pointer mb-8">
        <div className="w-40 h-40 md:w-56 md:h-56 rounded-full border border-white/10 flex items-center justify-center backdrop-blur-sm bg-white/[0.03] transition-all duration-700 group-hover:border-[var(--color-garden-accent)]/30 group-hover:bg-white/[0.06] group-hover:scale-105">
          <Disc3
            className="w-20 h-20 md:w-28 md:h-28 text-white/20 transition-all duration-700 group-hover:text-[var(--color-garden-accent)]/50 group-hover:rotate-180"
            strokeWidth={1}
          />
        </div>
        {/* Glow ring */}
        <div className="absolute inset-0 rounded-full opacity-0 group-hover:opacity-100 transition-opacity duration-700 blur-xl bg-[var(--color-garden-accent)]/10 -z-10 scale-125" />
      </div>

      {/* Mantra */}
      <h1 className="font-[var(--font-display)] text-4xl md:text-6xl text-center text-white/90 mb-4" style={{ fontFamily: "'Caveat', cursive" }}>
        Noah Wilkens
      </h1>
      <p className="text-lg md:text-xl text-white/40 text-center max-w-md font-light tracking-wide">
        create. explore. evolve.
      </p>

      {/* Scroll indicator */}
      <div className="absolute bottom-12 animate-bounce">
        <div className="w-px h-12 bg-gradient-to-b from-transparent to-white/20" />
        <div className="w-1.5 h-1.5 rounded-full bg-white/20 mx-auto mt-1" />
      </div>
    </section>
  )
}
