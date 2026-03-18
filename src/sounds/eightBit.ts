// ---------------------------------------------------------------------------
// earcon — "eightBit" preset
// Square wave chiptune arpeggio — retro 8-bit video game feel 🕹️
// ---------------------------------------------------------------------------

import type { EarconSound, SoundVariant } from "../types.js";

const ENV = { attack: 0.003, decay: 0.015, sustain: 0.4, release: 0.015 } as const;

const VARIANTS: Record<SoundVariant, EarconSound> = {
  short: {
    name: "eightBit",
    duration: 0.2,
    notes: [
      { frequency: 523.25, duration: 0.04, startAt: 0.0,  waveShape: "square", gain: 0.38, envelope: ENV },
      { frequency: 659.26, duration: 0.04, startAt: 0.05, waveShape: "square", gain: 0.38, envelope: ENV },
      { frequency: 783.99, duration: 0.08, startAt: 0.1,  waveShape: "square", gain: 0.42, envelope: ENV },
    ],
  },
  medium: {
    name: "eightBit",
    duration: 0.33,
    notes: [
      { frequency: 523.25, duration: 0.04, startAt: 0.0,  waveShape: "square", gain: 0.35, envelope: ENV },
      { frequency: 659.26, duration: 0.04, startAt: 0.06, waveShape: "square", gain: 0.38, envelope: ENV },
      { frequency: 783.99, duration: 0.04, startAt: 0.12, waveShape: "square", gain: 0.4, envelope: ENV },
      { frequency: 1046.5, duration: 0.12, startAt: 0.18, waveShape: "square", gain: 0.45, envelope: ENV },
    ],
  },
  long: {
    name: "eightBit",
    duration: 0.5,
    notes: [
      { frequency: 523.25, duration: 0.04, startAt: 0.0,  waveShape: "square", gain: 0.32, envelope: ENV },
      { frequency: 659.26, duration: 0.04, startAt: 0.06, waveShape: "square", gain: 0.35, envelope: ENV },
      { frequency: 783.99, duration: 0.04, startAt: 0.12, waveShape: "square", gain: 0.38, envelope: ENV },
      { frequency: 659.26, duration: 0.04, startAt: 0.18, waveShape: "square", gain: 0.35, envelope: ENV },
      { frequency: 783.99, duration: 0.04, startAt: 0.24, waveShape: "square", gain: 0.38, envelope: ENV },
      { frequency: 1046.5, duration: 0.15, startAt: 0.3,  waveShape: "square", gain: 0.45, envelope: ENV },
    ],
  },
};

export function eightBitPreset(variant: SoundVariant, pitchSemitones: number): EarconSound {
  void pitchSemitones;
  return VARIANTS[variant];
}
