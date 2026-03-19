// ---------------------------------------------------------------------------
// earcon — "failure" preset
// "Dam-dam-dam-DAAAAM" — three punchy hits then a deep sustained fall.
// Classic Beethoven's 5th rhythm in modern low-register sine. Cinematic.
// ---------------------------------------------------------------------------

import type { EarconSound, SoundVariant } from "../types.js";

const HIT  = { attack: 0.01,  decay: 0.06, sustain: 0.4,  release: 0.09 } as const;
const FALL = { attack: 0.015, decay: 0.12, sustain: 0.28, release: 0.32 } as const;

const VARIANTS: Record<SoundVariant, EarconSound> = {
  short: {
    name: "failure",
    duration: 0.95,
    notes: [
      { frequency: 311, duration: 0.1,  startAt: 0,    waveShape: "sine", gain: 0.7,  envelope: HIT  },
      { frequency: 311, duration: 0.1,  startAt: 0.17, waveShape: "sine", gain: 0.72, envelope: HIT  },
      { frequency: 311, duration: 0.1,  startAt: 0.34, waveShape: "sine", gain: 0.74, envelope: HIT  },
      { frequency: 220, duration: 0.46, startAt: 0.52, waveShape: "sine", gain: 0.82, envelope: FALL },
    ],
  },
  medium: {
    name: "failure",
    duration: 1.5,
    notes: [
      { frequency: 311, duration: 0.12, startAt: 0,    waveShape: "sine", gain: 0.68, envelope: HIT  },
      { frequency: 311, duration: 0.12, startAt: 0.2,  waveShape: "sine", gain: 0.7,  envelope: HIT  },
      { frequency: 311, duration: 0.12, startAt: 0.4,  waveShape: "sine", gain: 0.72, envelope: HIT  },
      { frequency: 220, duration: 0.72, startAt: 0.62, waveShape: "sine", gain: 0.8,  envelope: FALL },
      { frequency: 110, duration: 0.56, startAt: 0.78, waveShape: "sine", gain: 0.36, envelope: FALL },
    ],
  },
  long: {
    name: "failure",
    duration: 2.2,
    notes: [
      { frequency: 349, duration: 0.14, startAt: 0,    waveShape: "sine", gain: 0.62, envelope: HIT  },
      { frequency: 349, duration: 0.14, startAt: 0.22, waveShape: "sine", gain: 0.65, envelope: HIT  },
      { frequency: 349, duration: 0.14, startAt: 0.44, waveShape: "sine", gain: 0.68, envelope: HIT  },
      { frequency: 262, duration: 1.0,  startAt: 0.68, waveShape: "sine", gain: 0.76, envelope: FALL },
      { frequency: 131, duration: 0.8,  startAt: 0.88, waveShape: "sine", gain: 0.35, envelope: FALL },
      { frequency: 196, duration: 0.6,  startAt: 1.1,  waveShape: "sine", gain: 0.26, envelope: FALL },
    ],
  },
};

export function failurePreset(
  variant: SoundVariant,
  pitchSemitones: number
): EarconSound {
  void pitchSemitones;
  return VARIANTS[variant];
}
