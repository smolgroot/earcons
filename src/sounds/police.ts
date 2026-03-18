// ---------------------------------------------------------------------------
// earcon — "police" preset
// Alternating wee-woo tones — European emergency siren 🚨
// 770 Hz (hi) ↔ 577 Hz (lo)
// ---------------------------------------------------------------------------

import type { EarconSound, SoundVariant } from "../types.js";

const ENV = { attack: 0.02, decay: 0.0, sustain: 1.0, release: 0.04 } as const;

function sirenNote(freq: number, startAt: number): (typeof VARIANTS)["short"]["notes"][number] {
  return { frequency: freq, duration: 0.22, startAt, waveShape: "sawtooth", gain: 0.45, envelope: ENV };
}

const VARIANTS: Record<SoundVariant, EarconSound> = {
  short: {
    name: "police",
    duration: 0.52,
    notes: [
      sirenNote(770, 0.0),
      sirenNote(577, 0.26),
    ],
  },
  medium: {
    name: "police",
    duration: 1.04,
    notes: [
      sirenNote(770, 0.0),
      sirenNote(577, 0.26),
      sirenNote(770, 0.52),
      sirenNote(577, 0.78),
    ],
  },
  long: {
    name: "police",
    duration: 1.56,
    notes: [
      sirenNote(770, 0.0),
      sirenNote(577, 0.26),
      sirenNote(770, 0.52),
      sirenNote(577, 0.78),
      sirenNote(770, 1.04),
      sirenNote(577, 1.30),
    ],
  },
};

export function policePreset(variant: SoundVariant, pitchSemitones: number): EarconSound {
  void pitchSemitones;
  return VARIANTS[variant];
}
