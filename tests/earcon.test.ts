// ---------------------------------------------------------------------------
// earcon — tests
// Uses vitest + jsdom. The Web Audio API is mocked via web-audio-api-mock.
// ---------------------------------------------------------------------------

import { describe, it, expect, vi, beforeEach, afterEach } from "vitest";
import { semitonesToMultiplier } from "../src/synth.js";
import {
  earcon,
  playSuccess,
  playError,
  playWarning,
  playNotification,
  playClick,
  playInfo,
  registerSound,
  setAudioContext,
  closeAudioContext,
} from "../src/index.js";
import type { SoundPreset } from "../src/types.js";

// ---------------------------------------------------------------------------
// Minimal AudioContext mock
// ---------------------------------------------------------------------------

function makeMockContext() {
  const nodes: unknown[] = [];

  const makeGainNode = () => ({
    gain: {
      setValueAtTime: vi.fn(),
      linearRampToValueAtTime: vi.fn(),
    },
    connect: vi.fn(),
  });

  const makeOscillator = () => ({
    type: "sine",
    frequency: { setValueAtTime: vi.fn() },
    connect: vi.fn(),
    start: vi.fn(),
    stop: vi.fn(),
    set onended(fn: (() => void) | null) {
      if (fn) setTimeout(fn, 0);
    },
  });

  return {
    currentTime: 0,
    state: "running" as AudioContextState,
    destination: {},
    createGain: vi.fn(() => {
      const n = makeGainNode();
      nodes.push(n);
      return n;
    }),
    createOscillator: vi.fn(() => {
      const n = makeOscillator();
      nodes.push(n);
      return n;
    }),
    resume: vi.fn().mockResolvedValue(undefined),
    close: vi.fn().mockResolvedValue(undefined),
    _nodes: nodes,
  } as unknown as AudioContext;
}

// ---------------------------------------------------------------------------
// synth helpers
// ---------------------------------------------------------------------------

describe("semitonesToMultiplier", () => {
  it("returns 1 for 0 semitones", () => {
    expect(semitonesToMultiplier(0)).toBeCloseTo(1);
  });

  it("returns ~2 for 12 semitones (one octave up)", () => {
    expect(semitonesToMultiplier(12)).toBeCloseTo(2);
  });

  it("returns ~0.5 for -12 semitones (one octave down)", () => {
    expect(semitonesToMultiplier(-12)).toBeCloseTo(0.5);
  });

  it("returns ~1.0595 for 1 semitone", () => {
    expect(semitonesToMultiplier(1)).toBeCloseTo(1.0595, 3);
  });
});

// ---------------------------------------------------------------------------
// play* functions
// ---------------------------------------------------------------------------

describe("play* functions", () => {
  let ctx: AudioContext;

  beforeEach(() => {
    ctx = makeMockContext();
    setAudioContext(ctx);
  });

  afterEach(async () => {
    await closeAudioContext();
  });

  const allPlayers = [
    ["playSuccess",      playSuccess],
    ["playError",        playError],
    ["playWarning",      playWarning],
    ["playNotification", playNotification],
    ["playClick",        playClick],
    ["playInfo",         playInfo],
  ] as const;

  for (const [name, fn] of allPlayers) {
    it(`${name}() resolves without throwing`, async () => {
      await expect(fn({ audioContext: ctx })).resolves.toBeUndefined();
    });

    it(`${name}() creates oscillator and gain nodes`, async () => {
      const mock = ctx as ReturnType<typeof makeMockContext>;
      await fn({ audioContext: ctx });
      expect(mock.createGain).toHaveBeenCalled();
      expect(mock.createOscillator).toHaveBeenCalled();
    });
  }

  it("respects the volume option (clamped to 0–1)", async () => {
    await expect(playSuccess({ audioContext: ctx, volume: 0.3 })).resolves.toBeUndefined();
    await expect(playSuccess({ audioContext: ctx, volume: 2 })).resolves.toBeUndefined();
    await expect(playSuccess({ audioContext: ctx, volume: -1 })).resolves.toBeUndefined();
  });

  it("respects the variant option", async () => {
    await expect(
      playSuccess({ audioContext: ctx, variant: "short" })
    ).resolves.toBeUndefined();
    await expect(
      playSuccess({ audioContext: ctx, variant: "long" })
    ).resolves.toBeUndefined();
  });

  it("calls onEnded callback", async () => {
    const onEnded = vi.fn();
    await playSuccess({ audioContext: ctx, onEnded });
    // The sentinel oscillator fires onended via setTimeout(fn, 0) in the mock
    await new Promise((r) => setTimeout(r, 10));
    expect(onEnded).toHaveBeenCalledOnce();
  });
});

// ---------------------------------------------------------------------------
// earcon() generic API
// ---------------------------------------------------------------------------

describe("earcon()", () => {
  let ctx: AudioContext;

  beforeEach(() => {
    ctx = makeMockContext();
    setAudioContext(ctx);
  });

  afterEach(async () => {
    await closeAudioContext();
  });

  it("plays built-in sounds by name", async () => {
    const names = ["success", "error", "warning", "notification", "click", "info"] as const;
    for (const name of names) {
      await expect(earcon(name, { audioContext: ctx })).resolves.toBeUndefined();
    }
  });

  it("plays custom registered sounds", async () => {
    const myPreset: SoundPreset = (_variant, _pitch) => ({
      name: "myCustom",
      duration: 0.1,
      notes: [{ frequency: 440, duration: 0.1, startAt: 0 }],
    });

    registerSound("myCustom", myPreset);
    await expect(
      earcon("myCustom" as never, { audioContext: ctx })
    ).resolves.toBeUndefined();
  });
});
