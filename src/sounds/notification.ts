// ---------------------------------------------------------------------------
// earcon — "notification" preset
// Two clean sine tones — a gentle, neutral "ding" suitable for messages.
// ---------------------------------------------------------------------------

import type { EarconSound, SoundVariant } from "../types.js";

const VARIANTS: Record<SoundVariant, EarconSound> = {
  short: {
    name: "notification",
    duration: 0.22,
    notes: [
      { frequency: 880, duration: 0.08, startAt: 0,    waveShape: "sine", gain: 0.6 },
      { frequency: 660, duration: 0.14, startAt: 0.08, waveShape: "sine", gain: 0.65 },
    ],
  },
  medium: {
    name: "notification",
    duration: 0.38,
    notes: [
      { frequency: 880, duration: 0.1,  startAt: 0,    waveShape: "sine", gain: 0.55 },
      { frequency: 660, duration: 0.28, startAt: 0.1,  waveShape: "sine", gain: 0.6 },
    ],
  },
  long: {
    name: "notification",
    duration: 0.55,
    notes: [
      { frequency: 1046.5, duration: 0.08, startAt: 0,    waveShape: "sine", gain: 0.5 },
      { frequency: 880,    duration: 0.1,  startAt: 0.1,  waveShape: "sine", gain: 0.55 },
      { frequency: 660,    duration: 0.3,  startAt: 0.22, waveShape: "sine", gain: 0.6 },
    ],
  },
};

export function notificationPreset(
  variant: SoundVariant,
  pitchSemitones: number
): EarconSound {
  void pitchSemitones;
  return VARIANTS[variant];
}
