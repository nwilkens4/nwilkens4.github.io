# Curtain Wipe Transition Implementation Plan

> **For Claude:** REQUIRED SUB-SKILL: Use superpowers:executing-plans to implement this plan task-by-task.

**Goal:** Replace the current opacity-fade between the spiral launch screen and main content with a GSAP-powered black curtain that slides in from the left, then exits right to reveal the main site.

**Architecture:** A fixed full-screen black `div.curtain` (z-60) lives above both screens. On "Digital Farm" click, a GSAP timeline slides the curtain in to cover the launch screen, unmounts it, then slides the curtain out while fading in the main content. No new packages — GSAP is already installed.

**Tech Stack:** React 18, TypeScript, GSAP 3 (already installed), Tailwind v4

---

### Task 1: Refactor App.tsx — add refs and curtain div

**Files:**
- Modify: `src/App.tsx`

**Step 1: Read current App.tsx to confirm current state**

Run:
```bash
cat src/App.tsx
```
Expected: File shows `entered`, `launchVisible` state, `handleEnter` with `setTimeout`, and a `<LaunchScreen>` block.

**Step 2: Add imports and refs**

At the top of `App.tsx`, update the React import to include `useRef`:

```tsx
import { useState, useRef, Component, type ReactNode, type ErrorInfo } from "react"
import { gsap } from "gsap"
```

Remove the `gsap` import if already present elsewhere — it should only appear once.

**Step 3: Replace state with refs in the App function**

Replace the existing state declarations and `handleEnter`:

```tsx
export default function App() {
  const [speed] = useState(0.6)
  const [launchVisible, setLaunchVisible] = useState(true)
  const curtainRef = useRef<HTMLDivElement>(null)
  const mainContentRef = useRef<HTMLDivElement>(null)

  const handleEnter = () => {
    const curtain = curtainRef.current
    const mainContent = mainContentRef.current
    if (!curtain || !mainContent) return

    gsap.timeline()
      .set(curtain, { x: '-100%', display: 'block' })
      .to(curtain, { x: '0%', duration: 0.4, ease: 'power2.inOut' })
      .call(() => setLaunchVisible(false))
      .to(curtain, { x: '100%', duration: 0.4, ease: 'power2.inOut' }, '+=0.05')
      .to(mainContent, { opacity: 1, duration: 0.3 }, '<0.1')
      .set(curtain, { display: 'none' })
  }
```

Remove: `const [entered, setEntered] = useState(false)` — no longer needed.

**Step 4: Update the JSX**

Replace the entire return block with:

```tsx
  return (
    <div className="relative w-full min-h-screen bg-black text-[var(--color-garden-text)]">
      {/* Curtain — slides in from left, exits right */}
      <div
        ref={curtainRef}
        className="fixed inset-0 z-[60] bg-black hidden"
        style={{ transform: 'translateX(-100%)' }}
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
```

Key changes from original:
- Removed the wrapper `<div>` around `<LaunchScreen>` (no more opacity transition on it)
- `<LaunchScreen>` renders directly (it's `fixed inset-0 z-50` already)
- Main content div gets `ref={mainContentRef}` and starts `opacity-0`
- Curtain div added at top with `ref={curtainRef}`, `hidden`, `z-[60]`

**Step 5: Verify build compiles clean**

```bash
npm run build 2>&1 | tail -10
```
Expected: `✓ built in X.XXs` with no TypeScript errors.

**Step 6: Commit**

```bash
git add src/App.tsx
git commit -m "feat: replace fade with GSAP curtain wipe transition"
```

---

### Task 2: Verify animation sequence visually

**Files:** None changed — this is a manual verification step.

**Step 1: Run dev server**

```bash
npm run dev
```

**Step 2: Open browser to localhost (port shown in terminal)**

Verify:
- [ ] Spiral animation plays on load
- [ ] "Digital Farm" button fades in after ~2 seconds
- [ ] Clicking "Digital Farm" → black curtain slides in from the left
- [ ] Curtain covers the spiral (spiral disappears behind it)
- [ ] Curtain slides out to the right
- [ ] Main content fades in as curtain exits

**Step 3: Stop dev server**

`Ctrl+C`

---

### Task 3: Push and deploy

**Step 1: Push feature branch**

```bash
git push
```

**Step 2: Merge to main and push for GitHub Actions deploy**

```bash
cd /Users/noahwilkens/.21st/repos/nwilkens4/nwilkens4.github.io
git pull
git merge breakable-guineafowl-152aa8 --no-edit
git push origin main
```

Expected: Push succeeds, GitHub Actions triggers a build + deploy to Pages.
