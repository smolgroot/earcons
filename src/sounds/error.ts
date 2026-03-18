// ---------------------------------------------------------------------------
// earcon — "error" preset
// Descending dissonant tones (tritone), harsh and attention-grabbing.
// ---------------------------------------------------------------------------

import type { EarconSound, SoundVariant } from "../types.js";

const VARIANTS: Record<SoundVariant, EarconSound> = {
  short: {
    name: "error",
    duration: 0.25,
    notes: [
      { frequency: 440, duration: 0.1,  startAt: 0,    waveShape: "square", gain: 0.5,
        envelope: { attack: 0.005, decay: 0.04, sustain: 0.6, release: 0.06 } },
      { frequency: 311, duration: 0.15, startAt: 0.1,  waveShape: "square", gain: 0.6,
        envelope: { attack: 0.005, decay: 0.04, sustain: 0.6, release: 0.06 } },
    ],
  },
  medium: {
    name: "error",
    duration: 0.5,
    notes: [
      { frequency: 440, duration: 0.12, startAt: 0,    waveShape: "sawtooth", gain: 0.4,
        envelope: { attack: 0.005, decay: 0.06, sustain: 0.5, release: 0.08 } },
      { frequency: 392, duration: 0.12, startAt: 0.13, waveShape: "sawtooth", gain: 0.45,
        envelope: { attack: 0.005, decay: 0.06, sustain: 0.5, release: 0.08 } },
      { frequency: 311, duration: 0.2,  startAt: 0.26, waveShape: "sawtooth", gain: 0.55,
        envelope: { attack: 0.005, decay: 0.06, sustain: 0.5, release: 0.12 } },
    ],
  },
  long: {
    name: "error",
    duration: 0.75,
    notes: [
      { frequency: 440, duration: 0.12, startAt: 0,    waveShape: "sawtooth", gain: 0.4,
        envelope: { attack: 0.005, decay: 0.07, sustain: 0.5, release: 0.1 } },
      { frequency: 415, duration: 0.1,  startAt: 0.14, waveShape: "sawtooth", gain: 0.4,
        envelope: { attack: 0.005, decay: 0.07, sustain: 0.5, release: 0.1 } },
      { frequency: 370, duration: 0.12, startAt: 0.26, waveShape: "sawtooth", gain: 0.45,
        envelope: { attack: 0.005, decay: 0.07, sustain: 0.5, release: 0.1 } },
      { frequency: 311, duration: 0.25, startAt: 0.4,  waveShape: "sawtooth", gain: 0.55,
        envelope: { attack: 0.005, decay: 0.08, sustain: 0.5, release: 0.15 } },
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
