// ---------------------------------------------------------------------------
// earcon — "delete" preset
// Soft sine sweep dissolving downward — calm "removed" feeling, not alarming.
// Fast per-note decay with no sustain creates a clean disappearing effect.
// ---------------------------------------------------------------------------

import type { EarconSound, SoundVariant } from "../types.js";

const ENV = { attack: 0.006, decay: 0.05, sustain: 0.0, release: 0.08 } as const;

const VARIANTS: Record<SoundVariant, EarconSound> = {
  short: {
    name: "delete",
    duration: 0.28,
    notes: [
      { frequency: 587, duration: 0.1,  startAt: 0,    waveShape: "sine", gain: 0.6,  envelope: ENV },
      { frequency: 392, duration: 0.16, startAt: 0.1,  waveShape: "sine", gain: 0.55, envelope: ENV },
    ],
  },
  medium: {
    name: "delete",
    duration: 0.42,
    notes: [
      { frequency: 659, duration: 0.08, startAt: 0,    waveShape: "sine", gain: 0.55, envelope: ENV },
      { frequency: 523, duration: 0.1,  startAt: 0.09, waveShape: "sine", gain: 0.58, envelope: ENV },
      { frequency: 349, duration: 0.2,  startAt: 0.19, waveShape: "sine", gain: 0.55, envelope: ENV },
    ],
  },
  long: {
    name: "delete",
    duration: 0.6,
    notes: [
      { frequency: 698, duration: 0.08, startAt: 0,    waveShape: "sine", gain: 0.52, envelope: ENV },
      { frequency: 587, duration: 0.09, startAt: 0.1,  waveShape: "sine", gain: 0.55, envelope: ENV },
      { frequency: 466, duration: 0.1,  startAt: 0.21, waveShape: "sine", gain: 0.55, envelope: ENV },
      { frequency: 311, duration: 0.22, startAt: 0.33, waveShape: "sine", gain: 0.52, envelope: ENV },
    ],
  },
};

export function deletePreset(variant: SoundVariant, pitchSemitones: number): EarconSound {
  void pitchSemitones;
  return VARIANTS[variant];
}
