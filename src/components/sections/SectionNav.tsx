import { Users, Briefcase, Car, Music, MapPin } from "lucide-react"

const sections = [
  { id: "social", label: "Social", icon: Users, description: "Connect with me" },
  { id: "career", label: "Career", icon: Briefcase, description: "Experience & education" },
  { id: "cars", label: "Cars", icon: Car, description: "Shows, engines & chassis" },
  { id: "music", label: "Music", icon: Music, description: "Vinyls, concerts & vibes" },
  { id: "travel", label: "Travel", icon: MapPin, description: "Places & adventures" },
]

export default function SectionNav() {
  const scrollTo = (id: string) => {
    document.getElementById(id)?.scrollIntoView({ behavior: "smooth" })
  }

  return (
    <section className="py-20 px-6">
      <div className="max-w-5xl mx-auto">
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-4">
          {sections.map(({ id, label, icon: Icon, description }) => (
            <button
              key={id}
              onClick={() => scrollTo(id)}
              className="group cursor-pointer p-6 rounded-2xl border border-white/[0.08] bg-white/[0.03] backdrop-blur-sm transition-all duration-300 hover:border-[var(--color-garden-accent)]/20 hover:bg-white/[0.06] text-center flex flex-col items-center"
            >
              <Icon
                className="w-6 h-6 text-white/30 mb-3 transition-colors duration-300 group-hover:text-[var(--color-garden-accent)]"
                strokeWidth={1.5}
              />
              <h3 className="text-sm font-semibold text-white/80 mb-1">{label}</h3>
              <p className="text-xs text-white/30">{description}</p>
            </button>
          ))}
        </div>
      </div>
    </section>
  )
}
