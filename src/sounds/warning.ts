// ---------------------------------------------------------------------------
// earcon — "warning" preset
// A flat-then-descending minor second — cautious, not alarming.
// ---------------------------------------------------------------------------

import type { EarconSound, SoundVariant } from "../types.js";

const VARIANTS: Record<SoundVariant, EarconSound> = {
  short: {
    name: "warning",
    duration: 0.28,
    notes: [
      { frequency: 587.33, duration: 0.1,  startAt: 0,    waveShape: "triangle", gain: 0.7 },
      { frequency: 523.25, duration: 0.18, startAt: 0.1,  waveShape: "triangle", gain: 0.75 },
    ],
  },
  medium: {
    name: "warning",
    duration: 0.5,
    notes: [
      { frequency: 587.33, duration: 0.12, startAt: 0,    waveShape: "triangle", gain: 0.65 },
      { frequency: 587.33, duration: 0.12, startAt: 0.14, waveShape: "triangle", gain: 0.65 },
      { frequency: 493.88, duration: 0.2,  startAt: 0.28, waveShape: "triangle", gain: 0.75 },
    ],
  },
  long: {
    name: "warning",
    duration: 0.8,
    notes: [
      { frequency: 587.33, duration: 0.12, startAt: 0,    waveShape: "triangle", gain: 0.6 },
      { frequency: 587.33, duration: 0.12, startAt: 0.15, waveShape: "triangle", gain: 0.6 },
      { frequency: 554.37, duration: 0.12, startAt: 0.3,  waveShape: "triangle", gain: 0.65 },
      { frequency: 493.88, duration: 0.25, startAt: 0.45, waveShape: "triangle", gain: 0.75 },
    ],
  },
};

export function warningPreset(
  variant: SoundVariant,
  pitchSemitones: number
): EarconSound {
  void pitchSemitones;
  return VARIANTS[variant];
}
