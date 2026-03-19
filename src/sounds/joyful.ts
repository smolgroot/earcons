// ---------------------------------------------------------------------------
// earcon — "joyful" preset
// Bouncing ascending major pentatonic arpeggio — pure happiness, bright & airy.
// Fast bright sine in the upper register; each note a little louder than last.
// ---------------------------------------------------------------------------

import type { EarconSound, SoundVariant } from "../types.js";

const ENV = { attack: 0.007, decay: 0.04, sustain: 0.28, release: 0.14 } as const;

const VARIANTS: Record<SoundVariant, EarconSound> = {
  short: {
    name: "joyful",
    duration: 0.4,
    notes: [
      { frequency: 523,  duration: 0.08, startAt: 0,    waveShape: "sine", gain: 0.58, envelope: ENV },
      { frequency: 659,  duration: 0.08, startAt: 0.1,  waveShape: "sine", gain: 0.65, envelope: ENV },
      { frequency: 784,  duration: 0.24, startAt: 0.2,  waveShape: "sine", gain: 0.74, envelope: ENV },
    ],
  },
  medium: {
    name: "joyful",
    duration: 0.56,
    notes: [
      { frequency: 523,  duration: 0.08, startAt: 0,    waveShape: "sine", gain: 0.55, envelope: ENV },
      { frequency: 659,  duration: 0.08, startAt: 0.1,  waveShape: "sine", gain: 0.62, envelope: ENV },
      { frequency: 784,  duration: 0.08, startAt: 0.2,  waveShape: "sine", gain: 0.68, envelope: ENV },
      { frequency: 1047, duration: 0.3,  startAt: 0.3,  waveShape: "sine", gain: 0.76, envelope: ENV },
    ],
  },
  long: {
    name: "joyful",
    duration: 0.76,
    notes: [
      { frequency: 392,  duration: 0.07, startAt: 0,    waveShape: "sine", gain: 0.5,  envelope: ENV },
      { frequency: 523,  duration: 0.07, startAt: 0.1,  waveShape: "sine", gain: 0.56, envelope: ENV },
      { frequency: 659,  duration: 0.07, startAt: 0.2,  waveShape: "sine", gain: 0.62, envelope: ENV },
      { frequency: 784,  duration: 0.07, startAt: 0.3,  waveShape: "sine", gain: 0.68, envelope: ENV },
      { frequency: 1047, duration: 0.38, startAt: 0.4,  waveShape: "sine", gain: 0.76, envelope: ENV },
    ],
  },
};

export function joyfulPreset(
  variant: SoundVariant,
  pitchSemitones: number
): EarconSound {
  void pitchSemitones;
  return VARIANTS[variant];
}
