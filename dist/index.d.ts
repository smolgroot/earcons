/** Oscillator wave shapes supported by the Web Audio API */
type WaveShape = "sine" | "square" | "sawtooth" | "triangle";
/** Optional duration variants for sounds that have them */
type SoundVariant = "short" | "medium" | "long";
/**
 * Options accepted by every public play* function.
 */
interface SoundOptions {
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
interface Envelope {
    attack: number;
    decay: number;
    sustain: number;
    release: number;
    hold?: number;
}
/**
 * Descriptor for a single note/tone within a sound sequence.
 */
interface NoteEvent {
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
interface EarconSound {
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
type SoundPreset = (variant: SoundVariant, pitchSemitones: number) => EarconSound;

/**
 * Closes and discards the shared AudioContext.
 * Useful in tests or when tearing down an SPA.
 */
declare function closeAudioContext(): Promise<void>;
/**
 * Replace the internal singleton — useful in tests to inject a mock.
 */
declare function setAudioContext(ctx: AudioContext): void;

/**
 * Converts a semitone offset to a frequency multiplier.
 * e.g. +12 semitones → ×2 (one octave up)
 */
declare function semitonesToMultiplier(semitones: number): number;

declare function successPreset(variant: SoundVariant, pitchSemitones: number): EarconSound;

declare function errorPreset(variant: SoundVariant, pitchSemitones: number): EarconSound;

declare function warningPreset(variant: SoundVariant, pitchSemitones: number): EarconSound;

declare function notificationPreset(variant: SoundVariant, pitchSemitones: number): EarconSound;

declare function clickPreset(variant: SoundVariant, pitchSemitones: number): EarconSound;

declare function infoPreset(variant: SoundVariant, pitchSemitones: number): EarconSound;

/** Play a success / confirmation sound */
declare function playSuccess(opts?: SoundOptions): Promise<void>;
/** Play an error sound */
declare function playError(opts?: SoundOptions): Promise<void>;
/** Play a warning sound */
declare function playWarning(opts?: SoundOptions): Promise<void>;
/** Play a notification / message sound */
declare function playNotification(opts?: SoundOptions): Promise<void>;
/** Play a UI click / toggle transient */
declare function playClick(opts?: SoundOptions): Promise<void>;
/** Play an informational / neutral tone */
declare function playInfo(opts?: SoundOptions): Promise<void>;
declare const BANK: {
    readonly success: typeof successPreset;
    readonly error: typeof errorPreset;
    readonly warning: typeof warningPreset;
    readonly notification: typeof notificationPreset;
    readonly click: typeof clickPreset;
    readonly info: typeof infoPreset;
};
type SoundName = keyof typeof BANK;
/**
 * Play any registered sound by name.
 *
 * @example
 * await earcon("success");
 * await earcon("error", { variant: "long", volume: 0.8 });
 */
declare function earcon(name: SoundName, opts?: SoundOptions): Promise<void>;
/**
 * Register a custom sound under a new name so it can be played via {@link earcon}.
 *
 * @example
 * import type { SoundPreset } from "earcon";
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
declare function registerSound(name: string, preset: SoundPreset): void;

export { type EarconSound, type Envelope, type NoteEvent, type SoundName, type SoundOptions, type SoundPreset, type SoundVariant, type WaveShape, closeAudioContext, earcon, playClick, playError, playInfo, playNotification, playSuccess, playWarning, registerSound, semitonesToMultiplier, setAudioContext };
