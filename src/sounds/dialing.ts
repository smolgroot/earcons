// ---------------------------------------------------------------------------
// earcon — "dialing" preset
// A pulsing DTMF-like tone sequence (ascending tones), simulating phone dialing.
// ---------------------------------------------------------------------------

import type { EarconSound, SoundVariant } from "../types.js";

const VARIANTS: Record<SoundVariant, EarconSound> = {
  short: {
    name: "dialing",
    duration: 0.4,
    notes: [
      { frequency: 697, duration: 0.08, startAt: 0,     waveShape: "sine", gain: 0.6 },
      { frequency: 770, duration: 0.08, startAt: 0.1,   waveShape: "sine", gain: 0.6 },
      { frequency: 852, duration: 0.08, startAt: 0.2,   waveShape: "sine", gain: 0.6 },
      { frequency: 941, duration: 0.08, startAt: 0.3,   waveShape: "sine", gain: 0.6 },
    ],
  },
  medium: {
    name: "dialing",
    duration: 0.6,
    notes: [
      { frequency: 697, duration: 0.1, startAt: 0,     waveShape: "sine", gain: 0.6 },
      { frequency: 770, duration: 0.1, startAt: 0.12,  waveShape: "sine", gain: 0.6 },
      { frequency: 852, duration: 0.1, startAt: 0.24,  waveShape: "sine", gain: 0.6 },
      { frequency: 941, duration: 0.1, startAt: 0.36,  waveShape: "sine", gain: 0.6 },
      { frequency: 1209, duration: 0.1, startAt: 0.48, waveShape: "sine", gain: 0.6 },
    ],
  },
  long: {
    name: "dialing",
    duration: 0.8,
    notes: [
      { frequency: 697, duration: 0.12, startAt: 0,    waveShape: "sine", gain: 0.6 },
      { frequency: 770, duration: 0.12, startAt: 0.14, waveShape: "sine", gain: 0.6 },
      { frequency: 852, duration: 0.12, startAt: 0.28, waveShape: "sine", gain: 0.6 },
      { frequency: 941, duration: 0.12, startAt: 0.42, waveShape: "sine", gain: 0.6 },
      { frequency: 1209, duration: 0.12, startAt: 0.56, waveShape: "sine", gain: 0.6 },
      { frequency: 1336, duration: 0.12, startAt: 0.7, waveShape: "sine", gain: 0.6 },
    ],
  },
};

export function dialingPreset(variant: SoundVariant = "medium", pitch: number = 0) {
  const sound = VARIANTS[variant];
  const multiplier = Math.pow(2, pitch / 12);
  return {
    ...sound,
    notes: sound.notes.map((note) => ({
      ...note,
      frequency: note.frequency * multiplier,
    })),
  };
}
