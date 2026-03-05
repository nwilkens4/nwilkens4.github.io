import { useState, Component, type ReactNode, type ErrorInfo } from "react"
import { MeshGradient } from "@paper-design/shaders-react"
import Hero from "./components/sections/Hero"
import SectionNav from "./components/sections/SectionNav"
import SocialMedia from "./components/sections/SocialMedia"
import Career from "./components/sections/Career"
import Cars from "./components/sections/Cars"
import Music from "./components/sections/Music"
import Travel from "./components/sections/Travel"

class ShaderErrorBoundary extends Component<
  { children: ReactNode },
  { hasError: boolean }
> {
  state = { hasError: false }
  static getDerivedStateFromError() {
    return { hasError: true }
  }
  componentDidCatch(error: Error, info: ErrorInfo) {
    console.warn("Shader background failed to load:", error, info)
  }
  render() {
    if (this.state.hasError) return null
    return this.props.children
  }
}

export default function App() {
  const [speed] = useState(0.6)

  return (
    <div className="relative min-h-screen bg-black text-[var(--color-garden-text)]">
      {/* Shader Background - fixed behind everything */}
      <ShaderErrorBoundary>
        <div className="fixed inset-0 z-0">
          <MeshGradient
            className="w-full h-full"
            colors={["#000000", "#1a1a2e", "#16213e", "#0a0a0a"]}
            speed={speed}
            style={{ background: "#000000" }}
          />
        </div>
      </ShaderErrorBoundary>

      {/* Subtle lighting overlays */}
      <div className="fixed inset-0 z-[1] pointer-events-none">
        <div
          className="absolute top-1/4 left-1/3 w-64 h-64 rounded-full blur-3xl animate-pulse"
          style={{
            background: "rgba(167, 139, 250, 0.03)",
            animationDuration: `${5 / speed}s`,
          }}
        />
        <div
          className="absolute bottom-1/3 right-1/4 w-48 h-48 rounded-full blur-2xl animate-pulse"
          style={{
            background: "rgba(139, 92, 246, 0.02)",
            animationDuration: `${3 / speed}s`,
            animationDelay: "1s",
          }}
        />
      </div>

      {/* Content - scrollable over the background */}
      <div className="relative z-10">
        {/* Hero / Landing */}
        <Hero />

        {/* Section Navigation Grid */}
        <SectionNav />

        {/* Individual Sections */}
        <SocialMedia />
        <Career />
        <Cars />
        <Music />
        <Travel />

        {/* Footer */}
        <footer className="py-12 text-center">
          <p className="text-sm text-white/30 font-sans">
            &copy; {new Date().getFullYear()} Noah Wilkens
          </p>
        </footer>
      </div>
    </div>
  )
}
