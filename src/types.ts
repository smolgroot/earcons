// ---------------------------------------------------------------------------
// earcon — core type definitions
// ---------------------------------------------------------------------------

/** Oscillator wave shapes supported by the Web Audio API */
export type WaveShape = "sine" | "square" | "sawtooth" | "triangle";

/** Optional duration variants for sounds that have them */
export type SoundVariant = "short" | "medium" | "long";

/**
 * Options accepted by every public play* function.
 */
export interface SoundOptions {
  /**
   * Master volume for this sound, 0–1.
   * @default 0.5
   */
  volume?: number;

  /**
   * Duration variant. Not all sounds support all variants.
   * Falls back to "medium" when unsupported.
   * @default "medium"
   */
  variant?: SoundVariant;

  /**
   * Semitone offset applied to all pitches in the sound (+12 = one octave up).
   * @default 0
   */
  pitch?: number;

  /**
   * Provide your own AudioContext instead of using the shared singleton.
   * Useful in frameworks that manage their own audio graph.
   */
  audioContext?: AudioContext;

  /**
   * Called when the sound finishes playing.
   */
  onEnded?: () => void;
}

/**
 * ADSR envelope parameters (all times in seconds).
 */
export interface Envelope {
  attack: number;
  decay: number;
  sustain: number;   // sustain *level* 0–1, not time
  release: number;
  hold?: number;     // optional hold time before decay
}

/**
 * Descriptor for a single note/tone within a sound sequence.
 */
export interface NoteEvent {
  /** Frequency in Hz */
  frequency: number;
  /** Duration of the note in seconds */
  duration: number;
  /** Start offset from the beginning of the sequence (seconds) */
  startAt: number;
  /** Wave shape */
  waveShape?: WaveShape;
  /** Per-note volume multiplier 0–1 */
  gain?: number;
  /** ADSR envelope (overrides synth defaults if provided) */
  envelope?: Partial<Envelope>;
}

/**
 * A fully-described playable sound — returned by every preset builder.
 */
export interface EarconSound {
  /** Human-readable name, e.g. "success" */
  name: string;
  /** Total duration in seconds (used to schedule the onEnded callback) */
  duration: number;
  /** Sequence of notes that make up this sound */
  notes: NoteEvent[];
}

/**
 * A sound preset function signature: accepts variant and pitch offset,
 * returns a fully-specified EarconSound ready for the scheduler.
 */
export type SoundPreset = (
  variant: SoundVariant,
  pitchSemitones: number
) => EarconSound;
