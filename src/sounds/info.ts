// ---------------------------------------------------------------------------
// earcon — "info" preset
// A neutral single soft tone — informational, non-intrusive.
// ---------------------------------------------------------------------------

import type { EarconSound, SoundVariant } from "../types.js";

const VARIANTS: Record<SoundVariant, EarconSound> = {
  short: {
    name: "info",
    duration: 0.2,
    notes: [
      {
        frequency: 698.46, // F5
        duration: 0.18,
        startAt: 0,
        waveShape: "sine",
        gain: 0.55,
        envelope: { attack: 0.015, decay: 0.04, sustain: 0.5, release: 0.1 },
      },
    ],
  },
  medium: {
    name: "info",
    duration: 0.35,
    notes: [
      {
        frequency: 698.46,
        duration: 0.32,
        startAt: 0,
        waveShape: "sine",
        gain: 0.55,
        envelope: { attack: 0.02, decay: 0.05, sustain: 0.5, release: 0.12 },
      },
    ],
  },
  long: {
    name: "info",
    duration: 0.55,
    notes: [
      {
        frequency: 587.33, // D5
        duration: 0.18,
        startAt: 0,
        waveShape: "sine",
        gain: 0.5,
        envelope: { attack: 0.02, decay: 0.05, sustain: 0.4, release: 0.1 },
      },
      {
        frequency: 698.46, // F5
        duration: 0.3,
        startAt: 0.2,
        waveShape: "sine",
        gain: 0.55,
        envelope: { attack: 0.02, decay: 0.06, sustain: 0.5, release: 0.12 },
      },
    ],
  },
};

export function infoPreset(
  variant: SoundVariant,
  pitchSemitones: number
): EarconSound {
  void pitchSemitones;
  return VARIANTS[variant];
}
