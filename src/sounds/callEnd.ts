// ---------------------------------------------------------------------------
// earcon — "callEnd" preset
// A soft decline with harmonic overtones (like gentle line disconnect or fade-out).
// Uses triangle wave for smooth, warm feel, distinctly different from plugOut.
// ---------------------------------------------------------------------------

import type { EarconSound, SoundVariant } from "../types.js";

const VARIANTS: Record<SoundVariant, EarconSound> = {
  short: {
    name: "callEnd",
    duration: 0.4,
    notes: [
      { frequency: 440, duration: 0.1, startAt: 0,    waveShape: "triangle", gain: 0.7, envelope: { attack: 0.01, decay: 0.12, sustain: 0.3, release: 0.17 } },
      { frequency: 220, duration: 0.1, startAt: 0.1,  waveShape: "triangle", gain: 0.5, envelope: { attack: 0.01, decay: 0.1, sustain: 0.2, release: 0.19 } },
    ],
  },
  medium: {
    name: "callEnd",
    duration: 0.6,
    notes: [
      { frequency: 550, duration: 0.12, startAt: 0,    waveShape: "triangle", gain: 0.7, envelope: { attack: 0.01, decay: 0.15, sustain: 0.3, release: 0.22 } },
      { frequency: 330, duration: 0.15, startAt: 0.15, waveShape: "triangle", gain: 0.6, envelope: { attack: 0.02, decay: 0.15, sustain: 0.2, release: 0.23 } },
      { frequency: 165, duration: 0.15, startAt: 0.32, waveShape: "triangle", gain: 0.4, envelope: { attack: 0.02, decay: 0.12, sustain: 0, release: 0.13 } },
    ],
  },
  long: {
    name: "callEnd",
    duration: 0.8,
    notes: [
      { frequency: 660, duration: 0.15, startAt: 0,    waveShape: "triangle", gain: 0.75, envelope: { attack: 0.01, decay: 0.15, sustain: 0.35, release: 0.29 } },
      { frequency: 440, duration: 0.15, startAt: 0.18, waveShape: "triangle", gain: 0.65, envelope: { attack: 0.02, decay: 0.15, sustain: 0.25, release: 0.3 } },
      { frequency: 293, duration: 0.15, startAt: 0.36, waveShape: "triangle", gain: 0.5, envelope: { attack: 0.02, decay: 0.14, sustain: 0.15, release: 0.29 } },
      { frequency: 165, duration: 0.15, startAt: 0.54, waveShape: "triangle", gain: 0.3, envelope: { attack: 0.02, decay: 0.12, sustain: 0, release: 0.11 } },
    ],
  },
};

export function callEndPreset(variant: SoundVariant = "medium", pitch: number = 0) {
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
