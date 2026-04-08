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
  plugInPreset,
  plugOutPreset,
  eightBitPreset,
  policePreset,
  coinPreset,
  boingPreset,
  failurePreset,
  joyfulPreset,
  flushingPreset,
  blasterPreset,
  wavePreset,
  winPreset,
  waterDropPreset,
  dialingPreset,
  callStartPreset,
  callEndPreset,
  incomingRingPreset,
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

/** Play a plug-in / insert-complete ascending sweep */
export async function playPlugIn(opts: SoundOptions = {}): Promise<void> {
  return play(plugInPreset(opts.variant ?? "medium", opts.pitch ?? 0), opts);
}

/** Play a plug-out / eject-complete descending sweep */
export async function playPlugOut(opts: SoundOptions = {}): Promise<void> {
  return play(plugOutPreset(opts.variant ?? "medium", opts.pitch ?? 0), opts);
}

/** @deprecated Use playPlugIn instead. */
export const playUpload = playPlugIn;

/** @deprecated Use playPlugOut instead. */
export const playDownload = playPlugOut;

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

/** Play a dramatic "dam-dam-dam-DAAAAM" failure sound */
export async function playFailure(opts: SoundOptions = {}): Promise<void> {
  return play(failurePreset(opts.variant ?? "medium", opts.pitch ?? 0), opts);
}

/** Play a bright bouncing joyful arpeggio 😄 */
export async function playJoyful(opts: SoundOptions = {}): Promise<void> {
  return play(joyfulPreset(opts.variant ?? "medium", opts.pitch ?? 0), opts);
}

/** Play a cascading water-drain flushing sweep 🚿 */
export async function playFlushing(opts: SoundOptions = {}): Promise<void> {
  return play(flushingPreset(opts.variant ?? "medium", opts.pitch ?? 0), opts);
}

/** Play a sci-fi laser blaster shot ⚡ */
export async function playBlaster(opts: SoundOptions = {}): Promise<void> {
  return play(blasterPreset(opts.variant ?? "short", opts.pitch ?? 0), opts);
}

/** Play a gentle ocean wave swell 🌊 */
export async function playWave(opts: SoundOptions = {}): Promise<void> {
  return play(wavePreset(opts.variant ?? "medium", opts.pitch ?? 0), opts);
}

/** Play a triumphant win / level-complete fanfare 🏆 */
export async function playWin(opts: SoundOptions = {}): Promise<void> {
  return play(winPreset(opts.variant ?? "medium", opts.pitch ?? 0), opts);
}

/** Play a clean water drop pluck 💧 */
export async function playWaterDrop(opts: SoundOptions = {}): Promise<void> {
  return play(waterDropPreset(opts.variant ?? "short", opts.pitch ?? 0), opts);
}

/** Play a dialing sequence (ascending DTMF tones) ☎️ */
export async function playDialing(opts: SoundOptions = {}): Promise<void> {
  return play(dialingPreset(opts.variant ?? "medium", opts.pitch ?? 0), opts);
}

/** Play a call connection established chime 📞 */
export async function playCallStart(opts: SoundOptions = {}): Promise<void> {
  return play(callStartPreset(opts.variant ?? "medium", opts.pitch ?? 0), opts);
}

/** Play a hang up / call ended sound 📳 */
export async function playCallEnd(opts: SoundOptions = {}): Promise<void> {
  return play(callEndPreset(opts.variant ?? "medium", opts.pitch ?? 0), opts);
}

/** Play an incoming phone ring (classic rotary pattern) 📱 */
export async function playIncomingRing(opts: SoundOptions = {}): Promise<void> {
  return play(incomingRingPreset(opts.variant ?? "medium", opts.pitch ?? 0), opts);
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
  plugIn: plugInPreset,
  plugOut: plugOutPreset,
  // legacy aliases
  upload: plugInPreset,
  download: plugOutPreset,
  // fun & misc
  eightBit: eightBitPreset,
  police: policePreset,
  coin: coinPreset,
  boing: boingPreset,
  failure: failurePreset,
  joyful: joyfulPreset,
  flushing: flushingPreset,
  blaster: blasterPreset,
  wave: wavePreset,
  win: winPreset,
  waterDrop: waterDropPreset,
  // call sounds
  dialing: dialingPreset,
  callStart: callStartPreset,
  callEnd: callEndPreset,
  incomingRing: incomingRingPreset,
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
