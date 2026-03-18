// ---------------------------------------------------------------------------
// earcon — "click" preset
// A very short transient — simulates a tactile UI button press/toggle.
// ---------------------------------------------------------------------------

import type { EarconSound, SoundVariant } from "../types.js";

const VARIANTS: Record<SoundVariant, EarconSound> = {
  short: {
    name: "click",
    duration: 0.04,
    notes: [
      {
        frequency: 1200,
        duration: 0.03,
        startAt: 0,
        waveShape: "sine",
        gain: 0.5,
        envelope: { attack: 0.002, decay: 0.015, sustain: 0, release: 0.01 },
      },
    ],
  },
  medium: {
    name: "click",
    duration: 0.07,
    notes: [
      {
        frequency: 900,
        duration: 0.05,
        startAt: 0,
        waveShape: "sine",
        gain: 0.55,
        envelope: { attack: 0.002, decay: 0.03, sustain: 0, release: 0.015 },
      },
    ],
  },
  long: {
    name: "click",
    duration: 0.12,
    notes: [
      {
        frequency: 700,
        duration: 0.08,
        startAt: 0,
        waveShape: "triangle",
        gain: 0.6,
        envelope: { attack: 0.002, decay: 0.05, sustain: 0, release: 0.025 },
      },
    ],
  },
};

export function clickPreset(
  variant: SoundVariant,
  pitchSemitones: number
): EarconSound {
  void pitchSemitones;
  return VARIANTS[variant];
}
