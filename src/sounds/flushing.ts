// ---------------------------------------------------------------------------
// earcon — "flushing" preset
// Water draining down — rapid sine cascade from mid-high to sub-bass.
// Dense overlapping notes with very fast decay simulate turbulent rushing water.
// ---------------------------------------------------------------------------

import type { EarconSound, SoundVariant } from "../types.js";

const ENV = { attack: 0.004, decay: 0.05, sustain: 0.1, release: 0.07 } as const;

const VARIANTS: Record<SoundVariant, EarconSound> = {
  short: {
    name: "flushing",
    duration: 0.62,
    notes: [
      { frequency: 800, duration: 0.07, startAt: 0.0,  waveShape: "sine", gain: 0.45, envelope: ENV },
      { frequency: 640, duration: 0.07, startAt: 0.07, waveShape: "sine", gain: 0.5,  envelope: ENV },
      { frequency: 500, duration: 0.07, startAt: 0.14, waveShape: "sine", gain: 0.52, envelope: ENV },
      { frequency: 380, duration: 0.08, startAt: 0.21, waveShape: "sine", gain: 0.54, envelope: ENV },
      { frequency: 270, duration: 0.09, startAt: 0.3,  waveShape: "sine", gain: 0.53, envelope: ENV },
      { frequency: 170, duration: 0.11, startAt: 0.4,  waveShape: "sine", gain: 0.48, envelope: ENV },
      { frequency: 90,  duration: 0.16, startAt: 0.52, waveShape: "sine", gain: 0.4,  envelope: ENV },
    ],
  },
  medium: {
    name: "flushing",
    duration: 0.92,
    notes: [
      { frequency: 920, duration: 0.07, startAt: 0.0,  waveShape: "sine", gain: 0.4,  envelope: ENV },
      { frequency: 740, duration: 0.07, startAt: 0.07, waveShape: "sine", gain: 0.44, envelope: ENV },
      { frequency: 590, duration: 0.07, startAt: 0.14, waveShape: "sine", gain: 0.48, envelope: ENV },
      { frequency: 460, duration: 0.08, startAt: 0.22, waveShape: "sine", gain: 0.5,  envelope: ENV },
      { frequency: 350, duration: 0.09, startAt: 0.31, waveShape: "sine", gain: 0.52, envelope: ENV },
      { frequency: 260, duration: 0.1,  startAt: 0.41, waveShape: "sine", gain: 0.52, envelope: ENV },
      { frequency: 180, duration: 0.11, startAt: 0.52, waveShape: "sine", gain: 0.5,  envelope: ENV },
      { frequency: 110, duration: 0.14, startAt: 0.64, waveShape: "sine", gain: 0.44, envelope: ENV },
      { frequency: 70,  duration: 0.2,  startAt: 0.78, waveShape: "sine", gain: 0.36, envelope: ENV },
    ],
  },
  long: {
    name: "flushing",
    duration: 1.3,
    notes: [
      { frequency: 1050, duration: 0.06, startAt: 0.0,  waveShape: "sine", gain: 0.36, envelope: ENV },
      { frequency: 840,  duration: 0.06, startAt: 0.07, waveShape: "sine", gain: 0.4,  envelope: ENV },
      { frequency: 780,  duration: 0.05, startAt: 0.11, waveShape: "sine", gain: 0.28, envelope: ENV },
      { frequency: 660,  duration: 0.07, startAt: 0.15, waveShape: "sine", gain: 0.44, envelope: ENV },
      { frequency: 520,  duration: 0.07, startAt: 0.23, waveShape: "sine", gain: 0.48, envelope: ENV },
      { frequency: 560,  duration: 0.05, startAt: 0.27, waveShape: "sine", gain: 0.3,  envelope: ENV },
      { frequency: 410,  duration: 0.08, startAt: 0.32, waveShape: "sine", gain: 0.5,  envelope: ENV },
      { frequency: 310,  duration: 0.09, startAt: 0.42, waveShape: "sine", gain: 0.52, envelope: ENV },
      { frequency: 340,  duration: 0.06, startAt: 0.46, waveShape: "sine", gain: 0.3,  envelope: ENV },
      { frequency: 220,  duration: 0.1,  startAt: 0.53, waveShape: "sine", gain: 0.5,  envelope: ENV },
      { frequency: 150,  duration: 0.13, startAt: 0.65, waveShape: "sine", gain: 0.46, envelope: ENV },
      { frequency: 95,   duration: 0.18, startAt: 0.8,  waveShape: "sine", gain: 0.4,  envelope: ENV },
      { frequency: 60,   duration: 0.26, startAt: 0.99, waveShape: "sine", gain: 0.32, envelope: ENV },
    ],
  },
};

export function flushingPreset(
  variant: SoundVariant,
  pitchSemitones: number
): EarconSound {
  void pitchSemitones;
  return VARIANTS[variant];
}
