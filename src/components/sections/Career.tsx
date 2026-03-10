import { GraduationCap, Building2 } from "lucide-react"

const experiences = [
  {
    type: "work",
    title: "Your Role",
    org: "Company Name",
    period: "2024 - Present",
    description: "Description of your role and achievements.",
  },
]

const education = [
  {
    type: "education",
    title: "B.S. Computer Science",
    org: "Towson University",
    period: "2020 - 2024",
    description: "Focus on Software Engineering. Courses in OS, OOP Design, and Software Engineering.",
  },
]

export default function Career() {
  return (
    <section id="career" className="py-24 w-full flex justify-center px-6">
      <div className="w-full max-w-4xl">
        <h2
          className="text-3xl md:text-4xl text-white/90 mb-2 text-center"
          style={{ fontFamily: "'Caveat', cursive" }}
        >
          Career
        </h2>
        <p className="text-white/30 mb-12 text-sm text-center">experience & education</p>

        <div className="space-y-6">
          {/* Experience */}
          <div>
            <div className="flex items-center justify-center gap-2 mb-4">
              <Building2 className="w-4 h-4 text-[var(--color-garden-accent)]" strokeWidth={1.5} />
              <h3 className="text-sm font-semibold text-white/60 uppercase tracking-wider">Experience</h3>
            </div>
            <div className="space-y-4">
              {experiences.map((item, i) => (
                <div
                  key={i}
                  className="p-6 rounded-2xl border border-white/[0.08] bg-white/[0.03] backdrop-blur-sm"
                >
                  <div className="text-center mb-2">
                    <h4 className="text-white/80 font-semibold">{item.title}</h4>
                    <span className="text-xs text-white/30">{item.period}</span>
                  </div>
                  <p className="text-sm text-[var(--color-garden-accent)]/70 mb-2 text-center">{item.org}</p>
                  <p className="text-sm text-white/40 text-center">{item.description}</p>
                </div>
              ))}
            </div>
          </div>

          {/* Education */}
          <div>
            <div className="flex items-center justify-center gap-2 mb-4">
              <GraduationCap className="w-4 h-4 text-[var(--color-garden-accent)]" strokeWidth={1.5} />
              <h3 className="text-sm font-semibold text-white/60 uppercase tracking-wider">Education</h3>
            </div>
            <div className="space-y-4">
              {education.map((item, i) => (
                <div
                  key={i}
                  className="p-6 rounded-2xl border border-white/[0.08] bg-white/[0.03] backdrop-blur-sm"
                >
                  <div className="text-center mb-2">
                    <h4 className="text-white/80 font-semibold">{item.title}</h4>
                    <span className="text-xs text-white/30">{item.period}</span>
                  </div>
                  <p className="text-sm text-[var(--color-garden-accent)]/70 mb-2 text-center">{item.org}</p>
                  <p className="text-sm text-white/40 text-center">{item.description}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
