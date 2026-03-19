// ---------------------------------------------------------------------------
// earcon — "notification" preset
// Ascending sine tones — modern "something arrived" feel.
// Going UP signals arrival; matches iOS, Slack, WhatsApp style.
// Bell-like envelope: fast attack, natural exponential tail.
// ---------------------------------------------------------------------------

import type { EarconSound, SoundVariant } from "../types.js";

const ENV = { attack: 0.008, decay: 0.05, sustain: 0.2, release: 0.15 } as const;

const VARIANTS: Record<SoundVariant, EarconSound> = {
  short: {
    name: "notification",
    duration: 0.3,
    notes: [
      { frequency: 660,  duration: 0.08, startAt: 0,    waveShape: "sine", gain: 0.5,  envelope: ENV },
      { frequency: 880,  duration: 0.2,  startAt: 0.07, waveShape: "sine", gain: 0.58, envelope: ENV },
    ],
  },
  medium: {
    name: "notification",
    duration: 0.44,
    notes: [
      { frequency: 660,  duration: 0.1,  startAt: 0,    waveShape: "sine", gain: 0.48, envelope: ENV },
      { frequency: 990,  duration: 0.3,  startAt: 0.09, waveShape: "sine", gain: 0.56, envelope: ENV },
    ],
  },
  long: {
    name: "notification",
    duration: 0.6,
    notes: [
      { frequency: 587,  duration: 0.09, startAt: 0,    waveShape: "sine", gain: 0.44, envelope: ENV },
      { frequency: 880,  duration: 0.1,  startAt: 0.09, waveShape: "sine", gain: 0.52, envelope: ENV },
      { frequency: 1174, duration: 0.35, startAt: 0.19, waveShape: "sine", gain: 0.56, envelope: ENV },
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
