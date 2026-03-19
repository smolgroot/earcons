// ---------------------------------------------------------------------------
// earcon — "wave" preset
// Gentle ocean swell — overlapping harmonic sines that build then recede.
// Long attack lets the "wash" grow naturally before it fades away.
// ---------------------------------------------------------------------------

import type { EarconSound, SoundVariant } from "../types.js";

const ENV_IN  = { attack: 0.12, decay: 0.08, sustain: 0.55, release: 0.3  } as const;
const ENV_OUT = { attack: 0.06, decay: 0.1,  sustain: 0.4,  release: 0.55 } as const;

const VARIANTS: Record<SoundVariant, EarconSound> = {
  short: {
    name: "wave",
    duration: 1.3,
    notes: [
      { frequency: 220, duration: 0.65, startAt: 0,    waveShape: "sine", gain: 0.36, envelope: ENV_IN  },
      { frequency: 330, duration: 0.7,  startAt: 0.1,  waveShape: "sine", gain: 0.42, envelope: ENV_IN  },
      { frequency: 440, duration: 0.55, startAt: 0.3,  waveShape: "sine", gain: 0.46, envelope: ENV_OUT },
      { frequency: 220, duration: 0.5,  startAt: 0.65, waveShape: "sine", gain: 0.3,  envelope: ENV_OUT },
    ],
  },
  medium: {
    name: "wave",
    duration: 2.1,
    notes: [
      { frequency: 165, duration: 0.85, startAt: 0,    waveShape: "sine", gain: 0.3,  envelope: ENV_IN  },
      { frequency: 220, duration: 1.05, startAt: 0.1,  waveShape: "sine", gain: 0.38, envelope: ENV_IN  },
      { frequency: 330, duration: 0.9,  startAt: 0.3,  waveShape: "sine", gain: 0.42, envelope: ENV_IN  },
      { frequency: 440, duration: 0.75, startAt: 0.55, waveShape: "sine", gain: 0.46, envelope: ENV_OUT },
      { frequency: 330, duration: 0.8,  startAt: 0.95, waveShape: "sine", gain: 0.38, envelope: ENV_OUT },
      { frequency: 220, duration: 0.7,  startAt: 1.3,  waveShape: "sine", gain: 0.3,  envelope: ENV_OUT },
      { frequency: 165, duration: 0.55, startAt: 1.62, waveShape: "sine", gain: 0.22, envelope: ENV_OUT },
    ],
  },
  long: {
    name: "wave",
    duration: 3.1,
    notes: [
      { frequency: 110, duration: 1.3,  startAt: 0,    waveShape: "sine", gain: 0.24, envelope: ENV_IN  },
      { frequency: 165, duration: 1.45, startAt: 0.15, waveShape: "sine", gain: 0.32, envelope: ENV_IN  },
      { frequency: 220, duration: 1.5,  startAt: 0.35, waveShape: "sine", gain: 0.38, envelope: ENV_IN  },
      { frequency: 330, duration: 1.2,  startAt: 0.7,  waveShape: "sine", gain: 0.42, envelope: ENV_IN  },
      { frequency: 440, duration: 0.95, startAt: 1.15, waveShape: "sine", gain: 0.45, envelope: ENV_OUT },
      { frequency: 330, duration: 1.0,  startAt: 1.65, waveShape: "sine", gain: 0.38, envelope: ENV_OUT },
      { frequency: 220, duration: 1.1,  startAt: 2.05, waveShape: "sine", gain: 0.3,  envelope: ENV_OUT },
      { frequency: 165, duration: 0.8,  startAt: 2.35, waveShape: "sine", gain: 0.22, envelope: ENV_OUT },
      { frequency: 110, duration: 0.6,  startAt: 2.58, waveShape: "sine", gain: 0.15, envelope: ENV_OUT },
    ],
  },
};

export function wavePreset(
  variant: SoundVariant,
  pitchSemitones: number
): EarconSound {
  void pitchSemitones;
  return VARIANTS[variant];
}
