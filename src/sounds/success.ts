// ---------------------------------------------------------------------------
// earcon — "success" preset
// A short ascending two-tone chime (major third → fifth), bright and clean.
// ---------------------------------------------------------------------------

import type { EarconSound, SoundVariant } from "../types.js";

const VARIANTS: Record<SoundVariant, EarconSound> = {
  short: {
    name: "success",
    duration: 0.25,
    notes: [
      { frequency: 523.25, duration: 0.1, startAt: 0,    waveShape: "sine", gain: 0.8 },
      { frequency: 783.99, duration: 0.15, startAt: 0.1, waveShape: "sine", gain: 0.9 },
    ],
  },
  medium: {
    name: "success",
    duration: 0.45,
    notes: [
      { frequency: 523.25, duration: 0.12, startAt: 0,    waveShape: "sine", gain: 0.7 },
      { frequency: 659.25, duration: 0.12, startAt: 0.12, waveShape: "sine", gain: 0.8 },
      { frequency: 783.99, duration: 0.2,  startAt: 0.24, waveShape: "sine", gain: 0.9 },
    ],
  },
  long: {
    name: "success",
    duration: 0.7,
    notes: [
      { frequency: 392.00, duration: 0.1,  startAt: 0,    waveShape: "sine", gain: 0.6 },
      { frequency: 523.25, duration: 0.12, startAt: 0.1,  waveShape: "sine", gain: 0.7 },
      { frequency: 659.25, duration: 0.12, startAt: 0.22, waveShape: "sine", gain: 0.8 },
      { frequency: 783.99, duration: 0.25, startAt: 0.34, waveShape: "sine", gain: 0.9 },
    ],
  },
};

export function successPreset(
  variant: SoundVariant,
  pitchSemitones: number
): EarconSound {
  // pitchSemitones is applied by the synth engine — just return the descriptor
  void pitchSemitones;
  return VARIANTS[variant];
}
