// ---------------------------------------------------------------------------
// earcon — public API
// ---------------------------------------------------------------------------

export type {
  WaveShape,
  SoundVariant,
  SoundOptions,
  Envelope,
  NoteEvent,
  EarconSound,
  SoundPreset,
} from "./types.js";

export { closeAudioContext, setAudioContext } from "./context.js";
export { semitonesToMultiplier } from "./synth.js";

import { getAudioContext } from "./context.js";
import { playSound } from "./synth.js";
import type { SoundOptions } from "./types.js";

import {
  successPreset,
  errorPreset,
  warningPreset,
  notificationPreset,
  clickPreset,
  infoPreset,
  togglePreset,
  deletePreset,
  messagePreset,
  uploadPreset,
  downloadPreset,
  eightBitPreset,
  policePreset,
  coinPreset,
  boingPreset,
} from "./sounds/index.js";

// ---------------------------------------------------------------------------
// Internal helper — resolves options and dispatches to the synth engine
// ---------------------------------------------------------------------------

async function play(
  preset: ReturnType<typeof successPreset>,
  opts: SoundOptions = {}
): Promise<void> {
  const { volume = 0.5, pitch = 0, audioContext, onEnded } = opts;
  const ctx = audioContext ?? (await getAudioContext());
  playSound(ctx, preset, volume, pitch, onEnded);
}

// ---------------------------------------------------------------------------
// Named play functions — tree-shakable, one per sound type
// ---------------------------------------------------------------------------

/** Play a success / confirmation sound */
export async function playSuccess(opts: SoundOptions = {}): Promise<void> {
  return play(successPreset(opts.variant ?? "medium", opts.pitch ?? 0), opts);
}

/** Play an error sound */
export async function playError(opts: SoundOptions = {}): Promise<void> {
  return play(errorPreset(opts.variant ?? "medium", opts.pitch ?? 0), opts);
}

/** Play a warning sound */
export async function playWarning(opts: SoundOptions = {}): Promise<void> {
  return play(warningPreset(opts.variant ?? "medium", opts.pitch ?? 0), opts);
}

/** Play a notification / message sound */
export async function playNotification(opts: SoundOptions = {}): Promise<void> {
  return play(
    notificationPreset(opts.variant ?? "medium", opts.pitch ?? 0),
    opts
  );
}

/** Play a UI click / toggle transient */
export async function playClick(opts: SoundOptions = {}): Promise<void> {
  return play(clickPreset(opts.variant ?? "short", opts.pitch ?? 0), opts);
}

/** Play an informational / neutral tone */
export async function playInfo(opts: SoundOptions = {}): Promise<void> {
  return play(infoPreset(opts.variant ?? "medium", opts.pitch ?? 0), opts);
}

/** Play a tactile on/off toggle sound */
export async function playToggle(opts: SoundOptions = {}): Promise<void> {
  return play(togglePreset(opts.variant ?? "short", opts.pitch ?? 0), opts);
}

/** Play a delete / destructive action sound */
export async function playDelete(opts: SoundOptions = {}): Promise<void> {
  return play(deletePreset(opts.variant ?? "medium", opts.pitch ?? 0), opts);
}

/** Play a message / incoming chat sound */
export async function playMessage(opts: SoundOptions = {}): Promise<void> {
  return play(messagePreset(opts.variant ?? "medium", opts.pitch ?? 0), opts);
}

/** Play an upload / send-complete ascending sweep */
export async function playUpload(opts: SoundOptions = {}): Promise<void> {
  return play(uploadPreset(opts.variant ?? "medium", opts.pitch ?? 0), opts);
}

/** Play a download / receive-complete descending sweep */
export async function playDownload(opts: SoundOptions = {}): Promise<void> {
  return play(downloadPreset(opts.variant ?? "medium", opts.pitch ?? 0), opts);
}

/** Play a retro 8-bit chiptune arpeggio 🕹️ */
export async function playEightBit(opts: SoundOptions = {}): Promise<void> {
  return play(eightBitPreset(opts.variant ?? "medium", opts.pitch ?? 0), opts);
}

/** Play a police / emergency siren 🚨 */
export async function playPolice(opts: SoundOptions = {}): Promise<void> {
  return play(policePreset(opts.variant ?? "short", opts.pitch ?? 0), opts);
}

/** Play a classic coin pickup sound 🪙 */
export async function playCoin(opts: SoundOptions = {}): Promise<void> {
  return play(coinPreset(opts.variant ?? "short", opts.pitch ?? 0), opts);
}

/** Play a comedy spring/boing sound 🎪 */
export async function playBoing(opts: SoundOptions = {}): Promise<void> {
  return play(boingPreset(opts.variant ?? "medium", opts.pitch ?? 0), opts);
}

// ---------------------------------------------------------------------------
// Sound bank — generic play-by-name API
// ---------------------------------------------------------------------------

const BANK = {
  // UI sounds
  success: successPreset,
  error: errorPreset,
  warning: warningPreset,
  notification: notificationPreset,
  click: clickPreset,
  info: infoPreset,
  toggle: togglePreset,
  delete: deletePreset,
  message: messagePreset,
  upload: uploadPreset,
  download: downloadPreset,
  // fun & misc
  eightBit: eightBitPreset,
  police: policePreset,
  coin: coinPreset,
  boing: boingPreset,
} as const;

export type SoundName = keyof typeof BANK;

/**
 * Play any registered sound by name.
 *
 * @example
 * await earcon("success");
 * await earcon("error", { variant: "long", volume: 0.8 });
 */
export async function earcon(
  name: SoundName,
  opts: SoundOptions = {}
): Promise<void> {
  const preset = BANK[name];
  return play(preset(opts.variant ?? "medium", opts.pitch ?? 0), opts);
}

/**
 * Register a custom sound under a new name so it can be played via {@link earcon}.
 *
 * @example
 * import type { SoundPreset } from "earcons";
 *
 * const mySound: SoundPreset = (variant, pitch) => ({
 *   name: "mySound",
 *   duration: 0.3,
 *   notes: [{ frequency: 440, duration: 0.3, startAt: 0 }],
 * });
 *
 * registerSound("mySound", mySound);
 * await earcon("mySound");
 */
export function registerSound(name: string, preset: SoundPreset): void {
  (BANK as Record<string, SoundPreset>)[name] = preset;
}

import type { SoundPreset } from "./types.js";
