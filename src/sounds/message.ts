// ---------------------------------------------------------------------------
// earcon — "message" preset
// Soft high ping — lighter than notification, suitable for chat messages.
// ---------------------------------------------------------------------------

import type { EarconSound, SoundVariant } from "../types.js";

const ENV = { attack: 0.01, decay: 0.04, sustain: 0.3, release: 0.08 } as const;

const VARIANTS: Record<SoundVariant, EarconSound> = {
  short: {
    name: "message",
    duration: 0.15,
    notes: [
      { frequency: 1318, duration: 0.12, startAt: 0, waveShape: "sine", gain: 0.35, envelope: ENV },
    ],
  },
  medium: {
    name: "message",
    duration: 0.26,
    notes: [
      { frequency: 1318, duration: 0.07, startAt: 0,    waveShape: "sine", gain: 0.35, envelope: ENV },
      { frequency: 1047, duration: 0.15, startAt: 0.08, waveShape: "sine", gain: 0.4, envelope: ENV },
    ],
  },
  long: {
    name: "message",
    duration: 0.4,
    notes: [
      { frequency: 1568, duration: 0.06, startAt: 0,    waveShape: "sine", gain: 0.3, envelope: ENV },
      { frequency: 1318, duration: 0.07, startAt: 0.07, waveShape: "sine", gain: 0.35, envelope: ENV },
      { frequency: 1047, duration: 0.22, startAt: 0.15, waveShape: "sine", gain: 0.4, envelope: ENV },
    ],
  },
};

export function messagePreset(variant: SoundVariant, pitchSemitones: number): EarconSound {
  void pitchSemitones;
  return VARIANTS[variant];
}
