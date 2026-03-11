import { useState, useRef, useEffect, Component, type ReactNode, type ErrorInfo } from "react"
import { gsap } from "gsap"
import { MeshGradient } from "@paper-design/shaders-react"
import Hero from "./components/sections/Hero"
import SectionNav from "./components/sections/SectionNav"
import SocialMedia from "./components/sections/SocialMedia"
import Career from "./components/sections/Career"
import Cars from "./components/sections/Cars"
import Music from "./components/sections/Music"
import Travel from "./components/sections/Travel"
import LaunchScreen from "./components/LaunchScreen"

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
  const speed = 0.6
  const [launchVisible, setLaunchVisible] = useState(true)
  const curtainRef = useRef<HTMLDivElement>(null)
  const mainContentRef = useRef<HTMLDivElement>(null)
  const tlRef = useRef<gsap.core.Timeline | null>(null)
  const isAnimating = useRef(false)

  useEffect(() => {
    if (curtainRef.current) {
      gsap.set(curtainRef.current, { x: '-100%' })
    }
    return () => { tlRef.current?.kill() }
  }, [])

  const handleEnter = () => {
    if (isAnimating.current) return
    isAnimating.current = true
    const curtain = curtainRef.current
    const mainContent = mainContentRef.current
    if (!curtain || !mainContent) return

    tlRef.current?.kill()
    tlRef.current = gsap.timeline()
      .set(curtain, { x: '-100%', display: 'block' })
      .to(curtain, { x: '0%', duration: 0.4, ease: 'power2.inOut' })
      .call(() => setLaunchVisible(false))
      .to(curtain, { x: '100%', duration: 0.4, ease: 'power2.inOut' }, '+=0.05')
      .to(mainContent, { opacity: 1, duration: 0.3 }, '<0.1')
      .set(curtain, { display: 'none' })
  }

  return (
    <div className="relative w-full min-h-screen bg-black text-[var(--color-garden-text)]">
      {/* Curtain — slides in from left, exits right */}
      <div
        ref={curtainRef}
        className="fixed inset-0 z-[60] bg-black hidden"
      />

      {/* Launch Screen */}
      {launchVisible && (
        <LaunchScreen onEnter={handleEnter} />
      )}

      {/* Shader Background - fixed behind everything */}
      <ShaderErrorBoundary>
        <div className="fixed inset-0 z-0">
          <MeshGradient
            className="w-full h-full"
            colors={["#000000", "#1a1a1a", "#2a2a2a", "#0a0a0a"]}
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
            background: "rgba(160, 160, 160, 0.03)",
            animationDuration: `${5 / speed}s`,
          }}
        />
        <div
          className="absolute bottom-1/3 right-1/4 w-48 h-48 rounded-full blur-2xl animate-pulse"
          style={{
            background: "rgba(160, 160, 160, 0.02)",
            animationDuration: `${3 / speed}s`,
            animationDelay: "1s",
          }}
        />
      </div>

      {/* Content - initially invisible, fades in after curtain exits */}
      <div ref={mainContentRef} className="relative z-10 w-full opacity-0">
        <Hero />
        <SectionNav />
        <SocialMedia />
        <Career />
        <Cars />
        <Music />
        <Travel />

        <footer className="py-12 text-center">
          <p className="text-sm text-white/30 font-sans">
            &copy; {new Date().getFullYear()} Noah Wilkens
          </p>
        </footer>
      </div>
    </div>
  )
}
