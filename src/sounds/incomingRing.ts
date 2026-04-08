// ---------------------------------------------------------------------------
// earcon — "incomingRing" preset
// A classic phone ringing pattern — repeating pulse tones (classic rotary phone feel).
// ---------------------------------------------------------------------------

import type { EarconSound, SoundVariant } from "../types.js";

const VARIANTS: Record<SoundVariant, EarconSound> = {
  short: {
    name: "incomingRing",
    duration: 0.8,
    notes: [
      { frequency: 480, duration: 0.2, startAt: 0,     waveShape: "sine", gain: 0.8, envelope: { attack: 0.02, decay: 0.1, sustain: 0.5, release: 0.08 } },
      { frequency: 0, duration: 0.15, startAt: 0.2,    waveShape: "sine", gain: 0 }, // silence
      { frequency: 480, duration: 0.2, startAt: 0.35,  waveShape: "sine", gain: 0.8, envelope: { attack: 0.02, decay: 0.1, sustain: 0.5, release: 0.08 } },
      { frequency: 0, duration: 0.1, startAt: 0.55,    waveShape: "sine", gain: 0 }, // silence
    ],
  },
  medium: {
    name: "incomingRing",
    duration: 1.2,
    notes: [
      { frequency: 480, duration: 0.2, startAt: 0,     waveShape: "sine", gain: 0.8, envelope: { attack: 0.02, decay: 0.1, sustain: 0.5, release: 0.08 } },
      { frequency: 0, duration: 0.15, startAt: 0.2,    waveShape: "sine", gain: 0 }, // silence
      { frequency: 480, duration: 0.2, startAt: 0.35,  waveShape: "sine", gain: 0.8, envelope: { attack: 0.02, decay: 0.1, sustain: 0.5, release: 0.08 } },
      { frequency: 0, duration: 0.15, startAt: 0.55,   waveShape: "sine", gain: 0 }, // silence
      { frequency: 480, duration: 0.2, startAt: 0.7,   waveShape: "sine", gain: 0.8, envelope: { attack: 0.02, decay: 0.1, sustain: 0.5, release: 0.08 } },
      { frequency: 0, duration: 0.15, startAt: 0.9,    waveShape: "sine", gain: 0 }, // silence
    ],
  },
  long: {
    name: "incomingRing",
    duration: 1.6,
    notes: [
      { frequency: 480, duration: 0.2, startAt: 0,     waveShape: "sine", gain: 0.8, envelope: { attack: 0.02, decay: 0.1, sustain: 0.5, release: 0.08 } },
      { frequency: 0, duration: 0.15, startAt: 0.2,    waveShape: "sine", gain: 0 }, // silence
      { frequency: 480, duration: 0.2, startAt: 0.35,  waveShape: "sine", gain: 0.8, envelope: { attack: 0.02, decay: 0.1, sustain: 0.5, release: 0.08 } },
      { frequency: 0, duration: 0.15, startAt: 0.55,   waveShape: "sine", gain: 0 }, // silence
      { frequency: 480, duration: 0.2, startAt: 0.7,   waveShape: "sine", gain: 0.8, envelope: { attack: 0.02, decay: 0.1, sustain: 0.5, release: 0.08 } },
      { frequency: 0, duration: 0.15, startAt: 0.9,    waveShape: "sine", gain: 0 }, // silence
      { frequency: 480, duration: 0.2, startAt: 1.05,  waveShape: "sine", gain: 0.8, envelope: { attack: 0.02, decay: 0.1, sustain: 0.5, release: 0.08 } },
      { frequency: 0, duration: 0.2, startAt: 1.25,    waveShape: "sine", gain: 0 }, // silence
    ],
  },
};

export function incomingRingPreset(variant: SoundVariant = "medium", pitch: number = 0) {
  const sound = VARIANTS[variant];
  const multiplier = Math.pow(2, pitch / 12);
  return {
    ...sound,
    notes: sound.notes.map((note) => ({
      ...note,
      frequency: note.frequency === 0 ? 0 : note.frequency * multiplier,
    })),
  };
}
