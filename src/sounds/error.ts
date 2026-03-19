// ---------------------------------------------------------------------------
// earcon — "error" preset
// Soft descending sine tones in the low register — modern "nope" feel.
// Two near-overlapping notes create a gentle dissonance without retro buzz.
// Inspired by iOS / macOS error feedback (Basso).
// ---------------------------------------------------------------------------

import type { EarconSound, SoundVariant } from "../types.js";

const ENV = { attack: 0.012, decay: 0.06, sustain: 0.25, release: 0.14 } as const;

const VARIANTS: Record<SoundVariant, EarconSound> = {
  short: {
    name: "error",
    duration: 0.32,
    notes: [
      { frequency: 330, duration: 0.14, startAt: 0,    waveShape: "sine", gain: 0.65, envelope: ENV },
      { frequency: 247, duration: 0.2,  startAt: 0.08, waveShape: "sine", gain: 0.7,  envelope: ENV },
    ],
  },
  medium: {
    name: "error",
    duration: 0.52,
    notes: [
      { frequency: 370, duration: 0.14, startAt: 0,    waveShape: "sine", gain: 0.6,  envelope: ENV },
      { frequency: 294, duration: 0.16, startAt: 0.1,  waveShape: "sine", gain: 0.65, envelope: ENV },
      { frequency: 220, duration: 0.25, startAt: 0.22, waveShape: "sine", gain: 0.7,  envelope: ENV },
    ],
  },
  long: {
    name: "error",
    duration: 0.78,
    notes: [
      { frequency: 392, duration: 0.14, startAt: 0,    waveShape: "sine", gain: 0.58, envelope: ENV },
      { frequency: 330, duration: 0.14, startAt: 0.13, waveShape: "sine", gain: 0.62, envelope: ENV },
      { frequency: 262, duration: 0.16, startAt: 0.26, waveShape: "sine", gain: 0.66, envelope: ENV },
      { frequency: 196, duration: 0.28, startAt: 0.42, waveShape: "sine", gain: 0.72, envelope: ENV },
    ],
  },
};

export function errorPreset(
  variant: SoundVariant,
  pitchSemitones: number
): EarconSound {
  void pitchSemitones;
  return VARIANTS[variant];
}
