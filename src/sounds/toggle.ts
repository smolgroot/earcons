// ---------------------------------------------------------------------------
// earcon — "toggle" preset
// A short tactile pop — distinct from click, signals an on/off state change.
// ---------------------------------------------------------------------------

import type { EarconSound, SoundVariant } from "../types.js";

const ENV = { attack: 0.003, decay: 0.022, sustain: 0, release: 0.018 } as const;

const VARIANTS: Record<SoundVariant, EarconSound> = {
  short: {
    name: "toggle",
    duration: 0.08,
    notes: [
      { frequency: 880, duration: 0.06, startAt: 0, waveShape: "triangle", gain: 0.6, envelope: ENV },
    ],
  },
  medium: {
    name: "toggle",
    duration: 0.18,
    notes: [
      { frequency: 660, duration: 0.05, startAt: 0,    waveShape: "triangle", gain: 0.5, envelope: ENV },
      { frequency: 880, duration: 0.07, startAt: 0.08, waveShape: "triangle", gain: 0.65, envelope: ENV },
    ],
  },
  long: {
    name: "toggle",
    duration: 0.3,
    notes: [
      { frequency: 440, duration: 0.05, startAt: 0,    waveShape: "triangle", gain: 0.45, envelope: ENV },
      { frequency: 660, duration: 0.05, startAt: 0.08, waveShape: "triangle", gain: 0.55, envelope: ENV },
      { frequency: 880, duration: 0.08, startAt: 0.16, waveShape: "triangle", gain: 0.65, envelope: ENV },
    ],
  },
};

export function togglePreset(variant: SoundVariant, pitchSemitones: number): EarconSound {
  void pitchSemitones;
  return VARIANTS[variant];
}
