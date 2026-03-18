// ---------------------------------------------------------------------------
// earcon — synthesis engine
// Schedules NoteEvents on a given AudioContext using oscillator nodes
// and a GainNode-based ADSR envelope.
// ---------------------------------------------------------------------------

import type { EarconSound, Envelope, NoteEvent } from "./types.js";

const DEFAULT_ENVELOPE: Envelope = {
  attack: 0.01,
  decay: 0.05,
  sustain: 0.7,
  release: 0.08,
  hold: 0,
};

/**
 * Converts a semitone offset to a frequency multiplier.
 * e.g. +12 semitones → ×2 (one octave up)
 */
export function semitonesToMultiplier(semitones: number): number {
  return Math.pow(2, semitones / 12);
}

/**
 * Schedules a single NoteEvent on the provided AudioContext.
 * Returns the scheduled end time (AudioContext.currentTime + startAt + duration + release).
 */
function scheduleNote(
  ctx: AudioContext,
  note: NoteEvent,
  masterGain: GainNode,
  pitchMultiplier: number,
  timeOffset: number
): number {
  const env: Envelope = {
    ...DEFAULT_ENVELOPE,
    ...note.envelope,
  };

  const t0 = timeOffset + note.startAt;
  const noteGain = note.gain ?? 1;
  const waveShape = note.waveShape ?? "sine";
  const freq = note.frequency * pitchMultiplier;

  // Per-note gain envelope node
  const gainNode = ctx.createGain();
  gainNode.connect(masterGain);
  gainNode.gain.setValueAtTime(0, t0);

  // Attack
  gainNode.gain.linearRampToValueAtTime(noteGain, t0 + env.attack);

  // Hold (optional flat segment)
  const holdEnd = t0 + env.attack + (env.hold ?? 0);
  gainNode.gain.setValueAtTime(noteGain, holdEnd);

  // Decay → sustain level
  gainNode.gain.linearRampToValueAtTime(
    noteGain * env.sustain,
    holdEnd + env.decay
  );

  // Sustain until note end
  const noteEnd = t0 + note.duration;
  gainNode.gain.setValueAtTime(noteGain * env.sustain, noteEnd);

  // Release
  gainNode.gain.linearRampToValueAtTime(0, noteEnd + env.release);

  // Oscillator
  const osc = ctx.createOscillator();
  osc.type = waveShape;
  osc.frequency.setValueAtTime(freq, t0);
  osc.connect(gainNode);
  osc.start(t0);
  osc.stop(noteEnd + env.release + 0.01); // tiny buffer to avoid click

  return noteEnd + env.release;
}

/**
 * Plays an {@link EarconSound} on the provided AudioContext.
 *
 * @param ctx        - AudioContext to schedule on
 * @param sound      - The sound descriptor to play
 * @param volume     - Master volume 0–1
 * @param pitchSemitones - Semitone offset applied to all frequencies
 * @param onEnded    - Optional callback when the sound finishes
 */
export function playSound(
  ctx: AudioContext,
  sound: EarconSound,
  volume: number,
  pitchSemitones: number,
  onEnded?: () => void
): void {
  const masterGain = ctx.createGain();
  masterGain.gain.setValueAtTime(Math.max(0, Math.min(1, volume)), ctx.currentTime);
  masterGain.connect(ctx.destination);

  const pitchMultiplier = semitonesToMultiplier(pitchSemitones);
  const timeOffset = ctx.currentTime;

  let latestEnd = timeOffset;

  for (const note of sound.notes) {
    const end = scheduleNote(ctx, note, masterGain, pitchMultiplier, timeOffset);
    if (end > latestEnd) latestEnd = end;
  }

  // Schedule onEnded callback via a silent OscillatorNode that stops at latestEnd
  if (onEnded) {
    const sentinel = ctx.createOscillator();
    const silentGain = ctx.createGain();
    silentGain.gain.setValueAtTime(0, timeOffset);
    sentinel.connect(silentGain);
    silentGain.connect(ctx.destination);
    sentinel.start(timeOffset);
    sentinel.stop(latestEnd);
    sentinel.onended = onEnded;
  }
}
