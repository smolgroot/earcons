// ---------------------------------------------------------------------------
// earcon — "callStart" preset
// A rich harmonic chord (stacked frequencies for full-bodied warmth).
// Multiple tones play together to create a resonant "connection" feel.
// ---------------------------------------------------------------------------

import type { EarconSound, SoundVariant } from "../types.js";

const VARIANTS: Record<SoundVariant, EarconSound> = {
  short: {
    name: "callStart",
    duration: 0.35,
    notes: [
      // Root (C5)
      { frequency: 523.25, duration: 0.3, startAt: 0, waveShape: "sine", gain: 0.6, envelope: { attack: 0.05, decay: 0.2, sustain: 0.1, release: 0.1 } },
      // Third (E5)
      { frequency: 659.25, duration: 0.3, startAt: 0, waveShape: "sine", gain: 0.5, envelope: { attack: 0.08, decay: 0.18, sustain: 0.08, release: 0.12 } },
      // Fifth (G5)
      { frequency: 783.99, duration: 0.3, startAt: 0, waveShape: "sine", gain: 0.45, envelope: { attack: 0.1, decay: 0.16, sustain: 0.05, release: 0.15 } },
    ],
  },
  medium: {
    name: "callStart",
    duration: 0.55,
    notes: [
      // Root (C5)
      { frequency: 523.25, duration: 0.5, startAt: 0, waveShape: "sine", gain: 0.65, envelope: { attack: 0.05, decay: 0.25, sustain: 0.15, release: 0.15 } },
      // Third (E5)
      { frequency: 659.25, duration: 0.5, startAt: 0, waveShape: "sine", gain: 0.55, envelope: { attack: 0.08, decay: 0.23, sustain: 0.12, release: 0.17 } },
      // Fifth (G5)
      { frequency: 783.99, duration: 0.5, startAt: 0, waveShape: "sine", gain: 0.5, envelope: { attack: 0.1, decay: 0.22, sustain: 0.1, release: 0.2 } },
      // Octave (C6)
      { frequency: 1046.5, duration: 0.5, startAt: 0, waveShape: "sine", gain: 0.35, envelope: { attack: 0.12, decay: 0.2, sustain: 0.08, release: 0.2 } },
    ],
  },
  long: {
    name: "callStart",
    duration: 0.75,
    notes: [
      // Root (C5)
      { frequency: 523.25, duration: 0.7, startAt: 0, waveShape: "sine", gain: 0.7, envelope: { attack: 0.06, decay: 0.32, sustain: 0.2, release: 0.2 } },
      // Third (E5)
      { frequency: 659.25, duration: 0.7, startAt: 0, waveShape: "sine", gain: 0.6, envelope: { attack: 0.08, decay: 0.3, sustain: 0.18, release: 0.22 } },
      // Fifth (G5)
      { frequency: 783.99, duration: 0.7, startAt: 0, waveShape: "sine", gain: 0.55, envelope: { attack: 0.1, decay: 0.28, sustain: 0.15, release: 0.25 } },
      // Octave (C6)
      { frequency: 1046.5, duration: 0.7, startAt: 0, waveShape: "sine", gain: 0.4, envelope: { attack: 0.12, decay: 0.26, sustain: 0.12, release: 0.25 } },
    ],
  },
};

export function callStartPreset(variant: SoundVariant = "medium", pitch: number = 0) {
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
