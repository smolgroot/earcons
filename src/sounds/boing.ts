// ---------------------------------------------------------------------------
// earcon — "boing" preset
// Comedy spring drop — sine notes descend in pitch with increasing duration
// to simulate a spring slowly settling 🎪
// ---------------------------------------------------------------------------

import type { EarconSound, SoundVariant } from "../types.js";

const ENV = { attack: 0.004, decay: 0.0, sustain: 1.0, release: 0.025 } as const;

const VARIANTS: Record<SoundVariant, EarconSound> = {
  short: {
    name: "boing",
    duration: 0.38,
    notes: [
      { frequency: 1200, duration: 0.03, startAt: 0.0,  waveShape: "sine", gain: 0.6,  envelope: ENV },
      { frequency: 900,  duration: 0.03, startAt: 0.04, waveShape: "sine", gain: 0.58, envelope: ENV },
      { frequency: 680,  duration: 0.04, startAt: 0.08, waveShape: "sine", gain: 0.55, envelope: ENV },
      { frequency: 500,  duration: 0.05, startAt: 0.13, waveShape: "sine", gain: 0.52, envelope: ENV },
      { frequency: 350,  duration: 0.07, startAt: 0.19, waveShape: "sine", gain: 0.48, envelope: ENV },
      { frequency: 220,  duration: 0.1,  startAt: 0.27, waveShape: "sine", gain: 0.42, envelope: ENV },
    ],
  },
  medium: {
    name: "boing",
    duration: 0.6,
    notes: [
      { frequency: 1400, duration: 0.04, startAt: 0.0,  waveShape: "sine", gain: 0.62, envelope: ENV },
      { frequency: 1050, duration: 0.04, startAt: 0.05, waveShape: "sine", gain: 0.6,  envelope: ENV },
      { frequency: 800,  duration: 0.05, startAt: 0.1,  waveShape: "sine", gain: 0.57, envelope: ENV },
      { frequency: 600,  duration: 0.06, startAt: 0.16, waveShape: "sine", gain: 0.54, envelope: ENV },
      { frequency: 450,  duration: 0.07, startAt: 0.23, waveShape: "sine", gain: 0.51, envelope: ENV },
      { frequency: 330,  duration: 0.09, startAt: 0.31, waveShape: "sine", gain: 0.47, envelope: ENV },
      { frequency: 240,  duration: 0.13, startAt: 0.41, waveShape: "sine", gain: 0.42, envelope: ENV },
    ],
  },
  long: {
    name: "boing",
    duration: 0.9,
    notes: [
      { frequency: 1600, duration: 0.04, startAt: 0.0,  waveShape: "sine", gain: 0.62, envelope: ENV },
      { frequency: 1200, duration: 0.04, startAt: 0.05, waveShape: "sine", gain: 0.6,  envelope: ENV },
      { frequency: 950,  duration: 0.05, startAt: 0.1,  waveShape: "sine", gain: 0.58, envelope: ENV },
      { frequency: 720,  duration: 0.06, startAt: 0.16, waveShape: "sine", gain: 0.55, envelope: ENV },
      { frequency: 540,  duration: 0.07, startAt: 0.23, waveShape: "sine", gain: 0.52, envelope: ENV },
      { frequency: 400,  duration: 0.09, startAt: 0.31, waveShape: "sine", gain: 0.49, envelope: ENV },
      { frequency: 290,  duration: 0.12, startAt: 0.41, waveShape: "sine", gain: 0.45, envelope: ENV },
      { frequency: 210,  duration: 0.16, startAt: 0.54, waveShape: "sine", gain: 0.41, envelope: ENV },
      { frequency: 160,  duration: 0.18, startAt: 0.71, waveShape: "sine", gain: 0.36, envelope: ENV },
    ],
  },
};

export function boingPreset(variant: SoundVariant, pitchSemitones: number): EarconSound {
  void pitchSemitones;
  return VARIANTS[variant];
}
