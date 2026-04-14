import { MapPin, ImageIcon } from "lucide-react"
import { ContainerScroll } from "@/components/ui/container-scroll-animation"

const places = [
  { name: "Add a place", description: "Where have you been?" },
]

const titleComponent = (
  <>
    <h2
      className="text-3xl md:text-4xl text-white/90 mb-2"
      style={{ fontFamily: "'Caveat', cursive" }}
    >
      Travel
    </h2>
    <p className="text-white/30 mb-8 text-sm">places & adventures</p>
  </>
)

export default function Travel() {
  return (
    <ContainerScroll id="travel" titleComponent={titleComponent}>
      <div className="space-y-6">
        {/* Interactive map placeholder */}
        <div className="p-12 rounded-2xl border border-dashed border-white/[0.08] bg-white/[0.02] text-center">
          <MapPin className="w-10 h-10 text-white/15 mx-auto mb-4" strokeWidth={1} />
          <p className="text-white/30 mb-1">Interactive Map</p>
          <p className="text-xs text-white/15">Clickable map with photos coming soon</p>
        </div>

        {/* Places grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
          {places.map((place, i) => (
            <div
              key={i}
              className="group p-6 rounded-2xl border border-white/[0.08] bg-white/[0.03] backdrop-blur-sm cursor-pointer transition-all duration-300 hover:border-[var(--color-garden-accent)]/20 hover:bg-white/[0.06] text-center"
            >
              <div className="w-full aspect-video rounded-lg bg-white/[0.03] border border-white/[0.05] mb-4 flex items-center justify-center">
                <ImageIcon className="w-6 h-6 text-white/10" strokeWidth={1} />
              </div>
              <h3 className="text-white/70 font-semibold text-sm">{place.name}</h3>
              <p className="text-xs text-white/30 mt-1">{place.description}</p>
            </div>
          ))}
        </div>
      </div>
    </ContainerScroll>
  )
}
