// ---------------------------------------------------------------------------
// earcon — "delete" preset
// Rapid descending sawtooth notes — conveys loss/removal without panic.
// ---------------------------------------------------------------------------

import type { EarconSound, SoundVariant } from "../types.js";

const ENV = { attack: 0.003, decay: 0.04, sustain: 0.3, release: 0.07 } as const;

const VARIANTS: Record<SoundVariant, EarconSound> = {
  short: {
    name: "delete",
    duration: 0.22,
    notes: [
      { frequency: 440, duration: 0.07, startAt: 0,    waveShape: "sawtooth", gain: 0.5, envelope: ENV },
      { frequency: 293, duration: 0.12, startAt: 0.08, waveShape: "sawtooth", gain: 0.55, envelope: ENV },
    ],
  },
  medium: {
    name: "delete",
    duration: 0.38,
    notes: [
      { frequency: 523, duration: 0.07, startAt: 0,    waveShape: "sawtooth", gain: 0.45, envelope: ENV },
      { frequency: 415, duration: 0.07, startAt: 0.09, waveShape: "sawtooth", gain: 0.5, envelope: ENV },
      { frequency: 277, duration: 0.15, startAt: 0.18, waveShape: "sawtooth", gain: 0.55, envelope: ENV },
    ],
  },
  long: {
    name: "delete",
    duration: 0.55,
    notes: [
      { frequency: 587, duration: 0.07, startAt: 0,    waveShape: "sawtooth", gain: 0.4, envelope: ENV },
      { frequency: 494, duration: 0.07, startAt: 0.09, waveShape: "sawtooth", gain: 0.45, envelope: ENV },
      { frequency: 392, duration: 0.07, startAt: 0.18, waveShape: "sawtooth", gain: 0.5, envelope: ENV },
      { frequency: 277, duration: 0.2,  startAt: 0.27, waveShape: "sawtooth", gain: 0.55, envelope: ENV },
    ],
  },
};

export function deletePreset(variant: SoundVariant, pitchSemitones: number): EarconSound {
  void pitchSemitones;
  return VARIANTS[variant];
}
