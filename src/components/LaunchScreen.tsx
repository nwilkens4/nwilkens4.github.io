import { useState, useEffect } from 'react'
import { SpiralAnimation } from '@/components/ui/spiral-animation'

interface LaunchScreenProps {
  onEnter: () => void
}

export default function LaunchScreen({ onEnter }: LaunchScreenProps) {
  const [buttonVisible, setButtonVisible] = useState(false)

  useEffect(() => {
    const timer = setTimeout(() => setButtonVisible(true), 2000)
    return () => clearTimeout(timer)
  }, [])

  return (
    <div className="fixed inset-0 w-full h-full overflow-hidden bg-black z-50">
      <div className="absolute inset-0">
        <SpiralAnimation />
      </div>

      <div
        className={`absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 z-10 transition-all duration-[1500ms] ease-out ${
          buttonVisible ? 'opacity-100 translate-y-[-50%]' : 'opacity-0 translate-y-[calc(-50%+16px)]'
        }`}
      >
        <button
          onClick={onEnter}
          className="text-white text-2xl tracking-[0.2em] uppercase font-extralight transition-all duration-700 hover:tracking-[0.3em] animate-pulse"
        >
          Enter
        </button>
      </div>
    </div>
  )
}
