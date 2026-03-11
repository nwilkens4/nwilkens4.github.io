# Curtain Wipe Transition Design

**Date:** 2026-03-10
**Status:** Approved

## Overview

Replace the current opacity-fade transition between the spiral launch screen and the main content with a GSAP-powered curtain wipe animation. No new packages required — GSAP is already installed.

## User Flow

1. Page loads → spiral launch screen is visible (full screen, z-50)
2. After 2 seconds → "Digital Farm" button fades in
3. User clicks "Digital Farm" →
   - Black curtain panel slides in from the **left** (covers the launch screen, ~400ms)
   - Launch screen unmounts while hidden behind curtain
   - Curtain slides out to the **right** (exits screen, ~400ms) simultaneously as main content fades in (~300ms)

## Architecture

No routing, no new packages, no architectural changes. Both screens remain in `App.tsx` stacked via z-index.

### New element: `.curtain`

A `div` fixed to the viewport, full-screen black background, initially translated off-screen to the left (`translateX(-100%)`). Lives at `z-60` (above launch screen at `z-50`).

### GSAP timeline (on "Digital Farm" click):

```
gsap.timeline()
  .set(curtain, { x: '-100%', display: 'block' })          // ensure start position
  .to(curtain, { x: '0%', duration: 0.4, ease: 'power2.inOut' })   // slide in, covers launch
  .set(launchOverlay, { display: 'none' })                  // remove spiral (hidden by curtain)
  .to(curtain, { x: '100%', duration: 0.4, ease: 'power2.inOut' }, '+=0.05')  // slide out right
  .to(mainContent, { opacity: 1, duration: 0.3 }, '<0.1')   // fade in main alongside
```

## Files Changed

| File | Change |
|------|--------|
| `src/App.tsx` | Add `curtainRef`, `mainContentRef` refs; replace `handleEnter` timeout logic with GSAP timeline; add curtain div |

## Files Unchanged

- `src/components/LaunchScreen.tsx` — no changes
- `src/components/ui/spiral-animation.tsx` — no changes
- `src/index.css` — no changes

## No New Dependencies

GSAP is already installed. `@barba/core` is NOT needed.
