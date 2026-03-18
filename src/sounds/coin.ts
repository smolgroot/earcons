// ---------------------------------------------------------------------------
// earcon — "coin" preset
// Classic two-note square wave pickup sound 🪙
// ---------------------------------------------------------------------------

import type { EarconSound, SoundVariant } from "../types.js";

const ENV = { attack: 0.003, decay: 0.025, sustain: 0.45, release: 0.04 } as const;

const VARIANTS: Record<SoundVariant, EarconSound> = {
  short: {
    name: "coin",
    duration: 0.16,
    notes: [
      { frequency: 987.77,  duration: 0.04,  startAt: 0.0,   waveShape: "square", gain: 0.45, envelope: ENV },
      { frequency: 1318.51, duration: 0.1,   startAt: 0.045, waveShape: "square", gain: 0.5,  envelope: ENV },
    ],
  },
  medium: {
    name: "coin",
    duration: 0.28,
    notes: [
      { frequency: 987.77,  duration: 0.05,  startAt: 0.0,  waveShape: "square", gain: 0.42, envelope: ENV },
      { frequency: 1174.66, duration: 0.05,  startAt: 0.06, waveShape: "square", gain: 0.45, envelope: ENV },
      { frequency: 1318.51, duration: 0.14,  startAt: 0.12, waveShape: "square", gain: 0.5,  envelope: ENV },
    ],
  },
  long: {
    name: "coin",
    duration: 0.42,
    notes: [
      { frequency: 987.77,  duration: 0.05,  startAt: 0.0,  waveShape: "square", gain: 0.4,  envelope: ENV },
      { frequency: 1174.66, duration: 0.05,  startAt: 0.06, waveShape: "square", gain: 0.43, envelope: ENV },
      { frequency: 1318.51, duration: 0.05,  startAt: 0.12, waveShape: "square", gain: 0.47, envelope: ENV },
      { frequency: 1568.0,  duration: 0.2,   startAt: 0.18, waveShape: "square", gain: 0.52, envelope: ENV },
    ],
  },
};

export function coinPreset(variant: SoundVariant, pitchSemitones: number): EarconSound {
  void pitchSemitones;
  return VARIANTS[variant];
}
