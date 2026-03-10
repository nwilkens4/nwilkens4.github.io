import { Disc3, Headphones, Radio } from "lucide-react"

const interests = [
  { label: "Vinyls", description: "Your collection details", icon: Disc3 },
  { label: "Concerts", description: "Shows you've attended", icon: Headphones },
  { label: "Spotify", description: "Link your profile", icon: Radio },
]

export default function Music() {
  return (
    <section id="music" className="py-24 px-6">
      <div className="max-w-4xl mx-auto">
        <h2
          className="text-3xl md:text-4xl text-white/90 mb-2 text-center"
          style={{ fontFamily: "'Caveat', cursive" }}
        >
          Music
        </h2>
        <p className="text-white/30 mb-12 text-sm text-center">vinyls, concerts & vibes</p>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          {interests.map(({ label, description, icon: Icon }) => (
            <div
              key={label}
              className="group p-8 rounded-2xl border border-white/[0.08] bg-white/[0.03] backdrop-blur-sm transition-all duration-300 hover:border-[var(--color-garden-accent)]/20 hover:bg-white/[0.06] cursor-pointer"
            >
              <Icon
                className="w-8 h-8 text-white/20 mb-4 transition-colors duration-300 group-hover:text-[var(--color-garden-accent)]"
                strokeWidth={1}
              />
              <h3 className="text-white/80 font-semibold mb-2">{label}</h3>
              <p className="text-sm text-white/30">{description}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
