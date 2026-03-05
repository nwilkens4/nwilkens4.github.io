import { Gauge, Wrench, Camera } from "lucide-react"

const favorites = [
  { label: "Favorite Engine", value: "Edit me", icon: Gauge },
  { label: "Favorite Chassis", value: "Edit me", icon: Wrench },
  { label: "Car Shows", value: "Coming soon", icon: Camera },
]

export default function Cars() {
  return (
    <section id="cars" className="py-24 px-6">
      <div className="max-w-4xl mx-auto">
        <h2
          className="text-3xl md:text-4xl text-white/90 mb-2"
          style={{ fontFamily: "'Caveat', cursive" }}
        >
          Cars
        </h2>
        <p className="text-white/30 mb-12 text-sm">shows, engines & chassis</p>

        {/* Quick stats */}
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mb-8">
          {favorites.map(({ label, value, icon: Icon }) => (
            <div
              key={label}
              className="p-6 rounded-2xl border border-white/[0.08] bg-white/[0.03] backdrop-blur-sm text-center"
            >
              <Icon className="w-6 h-6 text-[var(--color-garden-accent)] mx-auto mb-3" strokeWidth={1.5} />
              <p className="text-xs text-white/40 mb-1">{label}</p>
              <p className="text-white/70 font-semibold">{value}</p>
            </div>
          ))}
        </div>

        {/* Photo gallery placeholder */}
        <div className="p-8 rounded-2xl border border-dashed border-white/[0.08] bg-white/[0.02] text-center">
          <Camera className="w-8 h-8 text-white/20 mx-auto mb-3" strokeWidth={1} />
          <p className="text-sm text-white/30">Photo gallery coming soon</p>
          <p className="text-xs text-white/15 mt-1">Add your car show photos here</p>
        </div>
      </div>
    </section>
  )
}
