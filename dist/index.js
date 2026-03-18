// src/context.ts
var _ctx = null;
async function getAudioContext() {
  if (!_ctx) {
    _ctx = new AudioContext();
  }
  if (_ctx.state === "suspended") {
    await _ctx.resume();
  }
  return _ctx;
}
async function closeAudioContext() {
  if (_ctx) {
    await _ctx.close();
    _ctx = null;
  }
}
function setAudioContext(ctx) {
  _ctx = ctx;
}

// src/synth.ts
var DEFAULT_ENVELOPE = {
  attack: 0.01,
  decay: 0.05,
  sustain: 0.7,
  release: 0.08,
  hold: 0
};
function semitonesToMultiplier(semitones) {
  return Math.pow(2, semitones / 12);
}
function scheduleNote(ctx, note, masterGain, pitchMultiplier, timeOffset) {
  const env = {
    ...DEFAULT_ENVELOPE,
    ...note.envelope
  };
  const t0 = timeOffset + note.startAt;
  const noteGain = note.gain ?? 1;
  const waveShape = note.waveShape ?? "sine";
  const freq = note.frequency * pitchMultiplier;
  const gainNode = ctx.createGain();
  gainNode.connect(masterGain);
  gainNode.gain.setValueAtTime(0, t0);
  gainNode.gain.linearRampToValueAtTime(noteGain, t0 + env.attack);
  const holdEnd = t0 + env.attack + (env.hold ?? 0);
  gainNode.gain.setValueAtTime(noteGain, holdEnd);
  gainNode.gain.linearRampToValueAtTime(
    noteGain * env.sustain,
    holdEnd + env.decay
  );
  const noteEnd = t0 + note.duration;
  gainNode.gain.setValueAtTime(noteGain * env.sustain, noteEnd);
  gainNode.gain.linearRampToValueAtTime(0, noteEnd + env.release);
  const osc = ctx.createOscillator();
  osc.type = waveShape;
  osc.frequency.setValueAtTime(freq, t0);
  osc.connect(gainNode);
  osc.start(t0);
  osc.stop(noteEnd + env.release + 0.01);
  return noteEnd + env.release;
}
function playSound(ctx, sound, volume, pitchSemitones, onEnded) {
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

// src/sounds/success.ts
var VARIANTS = {
  short: {
    name: "success",
    duration: 0.25,
    notes: [
      { frequency: 523.25, duration: 0.1, startAt: 0, waveShape: "sine", gain: 0.8 },
      { frequency: 783.99, duration: 0.15, startAt: 0.1, waveShape: "sine", gain: 0.9 }
    ]
  },
  medium: {
    name: "success",
    duration: 0.45,
    notes: [
      { frequency: 523.25, duration: 0.12, startAt: 0, waveShape: "sine", gain: 0.7 },
      { frequency: 659.25, duration: 0.12, startAt: 0.12, waveShape: "sine", gain: 0.8 },
      { frequency: 783.99, duration: 0.2, startAt: 0.24, waveShape: "sine", gain: 0.9 }
    ]
  },
  long: {
    name: "success",
    duration: 0.7,
    notes: [
      { frequency: 392, duration: 0.1, startAt: 0, waveShape: "sine", gain: 0.6 },
      { frequency: 523.25, duration: 0.12, startAt: 0.1, waveShape: "sine", gain: 0.7 },
      { frequency: 659.25, duration: 0.12, startAt: 0.22, waveShape: "sine", gain: 0.8 },
      { frequency: 783.99, duration: 0.25, startAt: 0.34, waveShape: "sine", gain: 0.9 }
    ]
  }
};
function successPreset(variant, pitchSemitones) {
  return VARIANTS[variant];
}

// src/sounds/error.ts
var VARIANTS2 = {
  short: {
    name: "error",
    duration: 0.25,
    notes: [
      {
        frequency: 440,
        duration: 0.1,
        startAt: 0,
        waveShape: "square",
        gain: 0.5,
        envelope: { attack: 5e-3, decay: 0.04, sustain: 0.6, release: 0.06 }
      },
      {
        frequency: 311,
        duration: 0.15,
        startAt: 0.1,
        waveShape: "square",
        gain: 0.6,
        envelope: { attack: 5e-3, decay: 0.04, sustain: 0.6, release: 0.06 }
      }
    ]
  },
  medium: {
    name: "error",
    duration: 0.5,
    notes: [
      {
        frequency: 440,
        duration: 0.12,
        startAt: 0,
        waveShape: "sawtooth",
        gain: 0.4,
        envelope: { attack: 5e-3, decay: 0.06, sustain: 0.5, release: 0.08 }
      },
      {
        frequency: 392,
        duration: 0.12,
        startAt: 0.13,
        waveShape: "sawtooth",
        gain: 0.45,
        envelope: { attack: 5e-3, decay: 0.06, sustain: 0.5, release: 0.08 }
      },
      {
        frequency: 311,
        duration: 0.2,
        startAt: 0.26,
        waveShape: "sawtooth",
        gain: 0.55,
        envelope: { attack: 5e-3, decay: 0.06, sustain: 0.5, release: 0.12 }
      }
    ]
  },
  long: {
    name: "error",
    duration: 0.75,
    notes: [
      {
        frequency: 440,
        duration: 0.12,
        startAt: 0,
        waveShape: "sawtooth",
        gain: 0.4,
        envelope: { attack: 5e-3, decay: 0.07, sustain: 0.5, release: 0.1 }
      },
      {
        frequency: 415,
        duration: 0.1,
        startAt: 0.14,
        waveShape: "sawtooth",
        gain: 0.4,
        envelope: { attack: 5e-3, decay: 0.07, sustain: 0.5, release: 0.1 }
      },
      {
        frequency: 370,
        duration: 0.12,
        startAt: 0.26,
        waveShape: "sawtooth",
        gain: 0.45,
        envelope: { attack: 5e-3, decay: 0.07, sustain: 0.5, release: 0.1 }
      },
      {
        frequency: 311,
        duration: 0.25,
        startAt: 0.4,
        waveShape: "sawtooth",
        gain: 0.55,
        envelope: { attack: 5e-3, decay: 0.08, sustain: 0.5, release: 0.15 }
      }
    ]
  }
};
function errorPreset(variant, pitchSemitones) {
  return VARIANTS2[variant];
}

// src/sounds/warning.ts
var VARIANTS3 = {
  short: {
    name: "warning",
    duration: 0.28,
    notes: [
      { frequency: 587.33, duration: 0.1, startAt: 0, waveShape: "triangle", gain: 0.7 },
      { frequency: 523.25, duration: 0.18, startAt: 0.1, waveShape: "triangle", gain: 0.75 }
    ]
  },
  medium: {
    name: "warning",
    duration: 0.5,
    notes: [
      { frequency: 587.33, duration: 0.12, startAt: 0, waveShape: "triangle", gain: 0.65 },
      { frequency: 587.33, duration: 0.12, startAt: 0.14, waveShape: "triangle", gain: 0.65 },
      { frequency: 493.88, duration: 0.2, startAt: 0.28, waveShape: "triangle", gain: 0.75 }
    ]
  },
  long: {
    name: "warning",
    duration: 0.8,
    notes: [
      { frequency: 587.33, duration: 0.12, startAt: 0, waveShape: "triangle", gain: 0.6 },
      { frequency: 587.33, duration: 0.12, startAt: 0.15, waveShape: "triangle", gain: 0.6 },
      { frequency: 554.37, duration: 0.12, startAt: 0.3, waveShape: "triangle", gain: 0.65 },
      { frequency: 493.88, duration: 0.25, startAt: 0.45, waveShape: "triangle", gain: 0.75 }
    ]
  }
};
function warningPreset(variant, pitchSemitones) {
  return VARIANTS3[variant];
}

// src/sounds/notification.ts
var VARIANTS4 = {
  short: {
    name: "notification",
    duration: 0.22,
    notes: [
      { frequency: 880, duration: 0.08, startAt: 0, waveShape: "sine", gain: 0.6 },
      { frequency: 660, duration: 0.14, startAt: 0.08, waveShape: "sine", gain: 0.65 }
    ]
  },
  medium: {
    name: "notification",
    duration: 0.38,
    notes: [
      { frequency: 880, duration: 0.1, startAt: 0, waveShape: "sine", gain: 0.55 },
      { frequency: 660, duration: 0.28, startAt: 0.1, waveShape: "sine", gain: 0.6 }
    ]
  },
  long: {
    name: "notification",
    duration: 0.55,
    notes: [
      { frequency: 1046.5, duration: 0.08, startAt: 0, waveShape: "sine", gain: 0.5 },
      { frequency: 880, duration: 0.1, startAt: 0.1, waveShape: "sine", gain: 0.55 },
      { frequency: 660, duration: 0.3, startAt: 0.22, waveShape: "sine", gain: 0.6 }
    ]
  }
};
function notificationPreset(variant, pitchSemitones) {
  return VARIANTS4[variant];
}

// src/sounds/click.ts
var VARIANTS5 = {
  short: {
    name: "click",
    duration: 0.04,
    notes: [
      {
        frequency: 1200,
        duration: 0.03,
        startAt: 0,
        waveShape: "sine",
        gain: 0.5,
        envelope: { attack: 2e-3, decay: 0.015, sustain: 0, release: 0.01 }
      }
    ]
  },
  medium: {
    name: "click",
    duration: 0.07,
    notes: [
      {
        frequency: 900,
        duration: 0.05,
        startAt: 0,
        waveShape: "sine",
        gain: 0.55,
        envelope: { attack: 2e-3, decay: 0.03, sustain: 0, release: 0.015 }
      }
    ]
  },
  long: {
    name: "click",
    duration: 0.12,
    notes: [
      {
        frequency: 700,
        duration: 0.08,
        startAt: 0,
        waveShape: "triangle",
        gain: 0.6,
        envelope: { attack: 2e-3, decay: 0.05, sustain: 0, release: 0.025 }
      }
    ]
  }
};
function clickPreset(variant, pitchSemitones) {
  return VARIANTS5[variant];
}

// src/sounds/info.ts
var VARIANTS6 = {
  short: {
    name: "info",
    duration: 0.2,
    notes: [
      {
        frequency: 698.46,
        // F5
        duration: 0.18,
        startAt: 0,
        waveShape: "sine",
        gain: 0.55,
        envelope: { attack: 0.015, decay: 0.04, sustain: 0.5, release: 0.1 }
      }
    ]
  },
  medium: {
    name: "info",
    duration: 0.35,
    notes: [
      {
        frequency: 698.46,
        duration: 0.32,
        startAt: 0,
        waveShape: "sine",
        gain: 0.55,
        envelope: { attack: 0.02, decay: 0.05, sustain: 0.5, release: 0.12 }
      }
    ]
  },
  long: {
    name: "info",
    duration: 0.55,
    notes: [
      {
        frequency: 587.33,
        // D5
        duration: 0.18,
        startAt: 0,
        waveShape: "sine",
        gain: 0.5,
        envelope: { attack: 0.02, decay: 0.05, sustain: 0.4, release: 0.1 }
      },
      {
        frequency: 698.46,
        // F5
        duration: 0.3,
        startAt: 0.2,
        waveShape: "sine",
        gain: 0.55,
        envelope: { attack: 0.02, decay: 0.06, sustain: 0.5, release: 0.12 }
      }
    ]
  }
};
function infoPreset(variant, pitchSemitones) {
  return VARIANTS6[variant];
}

// src/index.ts
async function play(preset, opts = {}) {
  const { volume = 0.5, pitch = 0, audioContext, onEnded } = opts;
  const ctx = audioContext ?? await getAudioContext();
  playSound(ctx, preset, volume, pitch, onEnded);
}
async function playSuccess(opts = {}) {
  return play(successPreset(opts.variant ?? "medium", opts.pitch ?? 0), opts);
}
async function playError(opts = {}) {
  return play(errorPreset(opts.variant ?? "medium", opts.pitch ?? 0), opts);
}
async function playWarning(opts = {}) {
  return play(warningPreset(opts.variant ?? "medium", opts.pitch ?? 0), opts);
}
async function playNotification(opts = {}) {
  return play(
    notificationPreset(opts.variant ?? "medium", opts.pitch ?? 0),
    opts
  );
}
async function playClick(opts = {}) {
  return play(clickPreset(opts.variant ?? "short", opts.pitch ?? 0), opts);
}
async function playInfo(opts = {}) {
  return play(infoPreset(opts.variant ?? "medium", opts.pitch ?? 0), opts);
}
var BANK = {
  success: successPreset,
  error: errorPreset,
  warning: warningPreset,
  notification: notificationPreset,
  click: clickPreset,
  info: infoPreset
};
async function earcon(name, opts = {}) {
  const preset = BANK[name];
  return play(preset(opts.variant ?? "medium", opts.pitch ?? 0), opts);
}
function registerSound(name, preset) {
  BANK[name] = preset;
}

export { closeAudioContext, earcon, playClick, playError, playInfo, playNotification, playSuccess, playWarning, registerSound, semitonesToMultiplier, setAudioContext };
//# sourceMappingURL=index.js.map
//# sourceMappingURL=index.js.map