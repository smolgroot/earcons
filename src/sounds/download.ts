// ---------------------------------------------------------------------------
// earcon — "plugOut" preset
// Descending sine sweep — mirror of plugIn, signals "removed / disconnected".
// ---------------------------------------------------------------------------

import type { EarconSound, SoundVariant } from "../types.js";

const VARIANTS: Record<SoundVariant, EarconSound> = {
  short: {
    name: "plugOut",
    duration: 0.24,
    notes: [
      { frequency: 784, duration: 0.08, startAt: 0,    waveShape: "sine", gain: 0.7 },
      { frequency: 523, duration: 0.13, startAt: 0.09, waveShape: "sine", gain: 0.6 },
    ],
  },
  medium: {
    name: "plugOut",
    duration: 0.4,
    notes: [
      { frequency: 784, duration: 0.08, startAt: 0,    waveShape: "sine", gain: 0.75 },
      { frequency: 523, duration: 0.08, startAt: 0.1,  waveShape: "sine", gain: 0.65 },
      { frequency: 392, duration: 0.18, startAt: 0.2,  waveShape: "sine", gain: 0.55 },
    ],
  },
  long: {
    name: "plugOut",
    duration: 0.58,
    notes: [
      { frequency: 784, duration: 0.08, startAt: 0,    waveShape: "sine", gain: 0.75 },
      { frequency: 523, duration: 0.08, startAt: 0.1,  waveShape: "sine", gain: 0.65 },
      { frequency: 392, duration: 0.08, startAt: 0.2,  waveShape: "sine", gain: 0.6 },
      { frequency: 330, duration: 0.24, startAt: 0.3,  waveShape: "sine", gain: 0.5 },
    ],
  },
};

export function plugOutPreset(variant: SoundVariant, pitchSemitones: number): EarconSound {
  void pitchSemitones;
  return VARIANTS[variant];
}

/** @deprecated Use plugOutPreset instead. */
export const downloadPreset = plugOutPreset;
