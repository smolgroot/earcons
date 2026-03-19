// ---------------------------------------------------------------------------
// earcon — "win" preset
// Triumphant ascending major arpeggio — achievement unlocked, level complete! 🏆
// Quick bright run ending on a sustained chord; clean modern sine fanfare.
// ---------------------------------------------------------------------------

import type { EarconSound, SoundVariant } from "../types.js";

const RUN  = { attack: 0.008, decay: 0.04, sustain: 0.45, release: 0.1  } as const;
const HOLD = { attack: 0.012, decay: 0.06, sustain: 0.55, release: 0.28 } as const;

const VARIANTS: Record<SoundVariant, EarconSound> = {
  short: {
    name: "win",
    duration: 0.58,
    notes: [
      { frequency: 523,  duration: 0.08, startAt: 0,    waveShape: "sine", gain: 0.6,  envelope: RUN  },
      { frequency: 659,  duration: 0.08, startAt: 0.1,  waveShape: "sine", gain: 0.65, envelope: RUN  },
      { frequency: 784,  duration: 0.08, startAt: 0.2,  waveShape: "sine", gain: 0.7,  envelope: RUN  },
      { frequency: 1047, duration: 0.32, startAt: 0.3,  waveShape: "sine", gain: 0.78, envelope: HOLD },
    ],
  },
  medium: {
    name: "win",
    duration: 0.92,
    notes: [
      { frequency: 392,  duration: 0.07, startAt: 0,    waveShape: "sine", gain: 0.55, envelope: RUN  },
      { frequency: 523,  duration: 0.07, startAt: 0.1,  waveShape: "sine", gain: 0.6,  envelope: RUN  },
      { frequency: 659,  duration: 0.07, startAt: 0.2,  waveShape: "sine", gain: 0.65, envelope: RUN  },
      { frequency: 784,  duration: 0.07, startAt: 0.3,  waveShape: "sine", gain: 0.7,  envelope: RUN  },
      { frequency: 1047, duration: 0.48, startAt: 0.4,  waveShape: "sine", gain: 0.78, envelope: HOLD },
      { frequency: 784,  duration: 0.4,  startAt: 0.45, waveShape: "sine", gain: 0.34, envelope: HOLD },
    ],
  },
  long: {
    name: "win",
    duration: 1.45,
    notes: [
      { frequency: 262,  duration: 0.07, startAt: 0,    waveShape: "sine", gain: 0.5,  envelope: RUN  },
      { frequency: 330,  duration: 0.07, startAt: 0.1,  waveShape: "sine", gain: 0.54, envelope: RUN  },
      { frequency: 392,  duration: 0.07, startAt: 0.2,  waveShape: "sine", gain: 0.58, envelope: RUN  },
      { frequency: 523,  duration: 0.07, startAt: 0.3,  waveShape: "sine", gain: 0.62, envelope: RUN  },
      { frequency: 659,  duration: 0.07, startAt: 0.4,  waveShape: "sine", gain: 0.66, envelope: RUN  },
      { frequency: 784,  duration: 0.07, startAt: 0.5,  waveShape: "sine", gain: 0.7,  envelope: RUN  },
      { frequency: 1047, duration: 0.7,  startAt: 0.62, waveShape: "sine", gain: 0.78, envelope: HOLD },
      { frequency: 784,  duration: 0.6,  startAt: 0.68, waveShape: "sine", gain: 0.36, envelope: HOLD },
      { frequency: 523,  duration: 0.5,  startAt: 0.74, waveShape: "sine", gain: 0.22, envelope: HOLD },
    ],
  },
};

export function winPreset(
  variant: SoundVariant,
  pitchSemitones: number
): EarconSound {
  void pitchSemitones;
  return VARIANTS[variant];
}
