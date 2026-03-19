// ---------------------------------------------------------------------------
// earcon — "waterDrop" preset
// A single drop of water: sharp high-frequency impact + decaying resonance.
// Zero sustain lets the note die away naturally like a real water drop.
// ---------------------------------------------------------------------------

import type { EarconSound, SoundVariant } from "../types.js";

const ENV = { attack: 0.003, decay: 0.09, sustain: 0.0, release: 0.14 } as const;

const VARIANTS: Record<SoundVariant, EarconSound> = {
  short: {
    name: "waterDrop",
    duration: 0.32,
    notes: [
      { frequency: 1400, duration: 0.05, startAt: 0,    waveShape: "sine", gain: 0.65, envelope: ENV },
      { frequency: 900,  duration: 0.26, startAt: 0.04, waveShape: "sine", gain: 0.48, envelope: ENV },
    ],
  },
  medium: {
    name: "waterDrop",
    duration: 0.62,
    notes: [
      // first drop
      { frequency: 1400, duration: 0.05, startAt: 0,    waveShape: "sine", gain: 0.62, envelope: ENV },
      { frequency: 900,  duration: 0.24, startAt: 0.04, waveShape: "sine", gain: 0.45, envelope: ENV },
      // second drop (slightly lower pitch)
      { frequency: 1100, duration: 0.05, startAt: 0.34, waveShape: "sine", gain: 0.56, envelope: ENV },
      { frequency: 720,  duration: 0.22, startAt: 0.38, waveShape: "sine", gain: 0.4,  envelope: ENV },
    ],
  },
  long: {
    name: "waterDrop",
    duration: 0.9,
    notes: [
      // three drops, each a bit lower
      { frequency: 1400, duration: 0.05, startAt: 0,    waveShape: "sine", gain: 0.62, envelope: ENV },
      { frequency: 900,  duration: 0.22, startAt: 0.04, waveShape: "sine", gain: 0.45, envelope: ENV },
      { frequency: 1100, duration: 0.05, startAt: 0.34, waveShape: "sine", gain: 0.56, envelope: ENV },
      { frequency: 720,  duration: 0.2,  startAt: 0.38, waveShape: "sine", gain: 0.40, envelope: ENV },
      { frequency: 880,  duration: 0.05, startAt: 0.66, waveShape: "sine", gain: 0.5,  envelope: ENV },
      { frequency: 580,  duration: 0.2,  startAt: 0.7,  waveShape: "sine", gain: 0.35, envelope: ENV },
    ],
  },
};

export function waterDropPreset(
  variant: SoundVariant,
  pitchSemitones: number
): EarconSound {
  void pitchSemitones;
  return VARIANTS[variant];
}
