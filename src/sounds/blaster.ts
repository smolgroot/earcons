// ---------------------------------------------------------------------------
// earcon — "blaster" preset
// Sci-fi laser blast — rapid descending triangle cascade, high to low.
// Triangle gives odd-harmonic "energy" buzz without full square harshness.
// Short: single shot. Long: double burst (pew pew!).
// ---------------------------------------------------------------------------

import type { EarconSound, SoundVariant } from "../types.js";

const ENV = { attack: 0.003, decay: 0.04, sustain: 0.0, release: 0.03 } as const;

const VARIANTS: Record<SoundVariant, EarconSound> = {
  short: {
    name: "blaster",
    duration: 0.24,
    notes: [
      { frequency: 1200, duration: 0.03, startAt: 0.0,  waveShape: "triangle", gain: 0.55, envelope: ENV },
      { frequency: 850,  duration: 0.03, startAt: 0.03, waveShape: "triangle", gain: 0.58, envelope: ENV },
      { frequency: 580,  duration: 0.04, startAt: 0.06, waveShape: "triangle", gain: 0.6,  envelope: ENV },
      { frequency: 370,  duration: 0.05, startAt: 0.1,  waveShape: "triangle", gain: 0.58, envelope: ENV },
      { frequency: 200,  duration: 0.07, startAt: 0.15, waveShape: "triangle", gain: 0.5,  envelope: ENV },
    ],
  },
  medium: {
    name: "blaster",
    duration: 0.42,
    notes: [
      { frequency: 1600, duration: 0.03, startAt: 0.0,  waveShape: "triangle", gain: 0.5,  envelope: ENV },
      { frequency: 1200, duration: 0.03, startAt: 0.03, waveShape: "triangle", gain: 0.54, envelope: ENV },
      { frequency: 860,  duration: 0.04, startAt: 0.06, waveShape: "triangle", gain: 0.57, envelope: ENV },
      { frequency: 580,  duration: 0.04, startAt: 0.1,  waveShape: "triangle", gain: 0.6,  envelope: ENV },
      { frequency: 370,  duration: 0.05, startAt: 0.15, waveShape: "triangle", gain: 0.6,  envelope: ENV },
      { frequency: 220,  duration: 0.07, startAt: 0.21, waveShape: "triangle", gain: 0.54, envelope: ENV },
      { frequency: 120,  duration: 0.1,  startAt: 0.29, waveShape: "triangle", gain: 0.44, envelope: ENV },
    ],
  },
  long: {
    name: "blaster",
    duration: 0.66,
    notes: [
      // first shot
      { frequency: 1800, duration: 0.03, startAt: 0.0,  waveShape: "triangle", gain: 0.48, envelope: ENV },
      { frequency: 1250, duration: 0.03, startAt: 0.03, waveShape: "triangle", gain: 0.52, envelope: ENV },
      { frequency: 820,  duration: 0.04, startAt: 0.06, waveShape: "triangle", gain: 0.56, envelope: ENV },
      { frequency: 500,  duration: 0.05, startAt: 0.1,  waveShape: "triangle", gain: 0.58, envelope: ENV },
      { frequency: 270,  duration: 0.07, startAt: 0.16, waveShape: "triangle", gain: 0.52, envelope: ENV },
      // second shot (slightly lower pitch, more energy)
      { frequency: 1400, duration: 0.03, startAt: 0.34, waveShape: "triangle", gain: 0.5,  envelope: ENV },
      { frequency: 980,  duration: 0.03, startAt: 0.37, waveShape: "triangle", gain: 0.54, envelope: ENV },
      { frequency: 640,  duration: 0.04, startAt: 0.4,  waveShape: "triangle", gain: 0.58, envelope: ENV },
      { frequency: 400,  duration: 0.05, startAt: 0.44, waveShape: "triangle", gain: 0.58, envelope: ENV },
      { frequency: 200,  duration: 0.09, startAt: 0.5,  waveShape: "triangle", gain: 0.5,  envelope: ENV },
    ],
  },
};

export function blasterPreset(
  variant: SoundVariant,
  pitchSemitones: number
): EarconSound {
  void pitchSemitones;
  return VARIANTS[variant];
}
