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

// src/sounds/toggle.ts
var ENV = { attack: 3e-3, decay: 0.022, sustain: 0, release: 0.018 };
var VARIANTS7 = {
  short: {
    name: "toggle",
    duration: 0.08,
    notes: [
      { frequency: 880, duration: 0.06, startAt: 0, waveShape: "triangle", gain: 0.6, envelope: ENV }
    ]
  },
  medium: {
    name: "toggle",
    duration: 0.18,
    notes: [
      { frequency: 660, duration: 0.05, startAt: 0, waveShape: "triangle", gain: 0.5, envelope: ENV },
      { frequency: 880, duration: 0.07, startAt: 0.08, waveShape: "triangle", gain: 0.65, envelope: ENV }
    ]
  },
  long: {
    name: "toggle",
    duration: 0.3,
    notes: [
      { frequency: 440, duration: 0.05, startAt: 0, waveShape: "triangle", gain: 0.45, envelope: ENV },
      { frequency: 660, duration: 0.05, startAt: 0.08, waveShape: "triangle", gain: 0.55, envelope: ENV },
      { frequency: 880, duration: 0.08, startAt: 0.16, waveShape: "triangle", gain: 0.65, envelope: ENV }
    ]
  }
};
function togglePreset(variant, pitchSemitones) {
  return VARIANTS7[variant];
}

// src/sounds/delete.ts
var ENV2 = { attack: 3e-3, decay: 0.04, sustain: 0.3, release: 0.07 };
var VARIANTS8 = {
  short: {
    name: "delete",
    duration: 0.22,
    notes: [
      { frequency: 440, duration: 0.07, startAt: 0, waveShape: "sawtooth", gain: 0.5, envelope: ENV2 },
      { frequency: 293, duration: 0.12, startAt: 0.08, waveShape: "sawtooth", gain: 0.55, envelope: ENV2 }
    ]
  },
  medium: {
    name: "delete",
    duration: 0.38,
    notes: [
      { frequency: 523, duration: 0.07, startAt: 0, waveShape: "sawtooth", gain: 0.45, envelope: ENV2 },
      { frequency: 415, duration: 0.07, startAt: 0.09, waveShape: "sawtooth", gain: 0.5, envelope: ENV2 },
      { frequency: 277, duration: 0.15, startAt: 0.18, waveShape: "sawtooth", gain: 0.55, envelope: ENV2 }
    ]
  },
  long: {
    name: "delete",
    duration: 0.55,
    notes: [
      { frequency: 587, duration: 0.07, startAt: 0, waveShape: "sawtooth", gain: 0.4, envelope: ENV2 },
      { frequency: 494, duration: 0.07, startAt: 0.09, waveShape: "sawtooth", gain: 0.45, envelope: ENV2 },
      { frequency: 392, duration: 0.07, startAt: 0.18, waveShape: "sawtooth", gain: 0.5, envelope: ENV2 },
      { frequency: 277, duration: 0.2, startAt: 0.27, waveShape: "sawtooth", gain: 0.55, envelope: ENV2 }
    ]
  }
};
function deletePreset(variant, pitchSemitones) {
  return VARIANTS8[variant];
}

// src/sounds/message.ts
var ENV3 = { attack: 0.01, decay: 0.04, sustain: 0.3, release: 0.08 };
var VARIANTS9 = {
  short: {
    name: "message",
    duration: 0.15,
    notes: [
      { frequency: 1318, duration: 0.12, startAt: 0, waveShape: "sine", gain: 0.35, envelope: ENV3 }
    ]
  },
  medium: {
    name: "message",
    duration: 0.26,
    notes: [
      { frequency: 1318, duration: 0.07, startAt: 0, waveShape: "sine", gain: 0.35, envelope: ENV3 },
      { frequency: 1047, duration: 0.15, startAt: 0.08, waveShape: "sine", gain: 0.4, envelope: ENV3 }
    ]
  },
  long: {
    name: "message",
    duration: 0.4,
    notes: [
      { frequency: 1568, duration: 0.06, startAt: 0, waveShape: "sine", gain: 0.3, envelope: ENV3 },
      { frequency: 1318, duration: 0.07, startAt: 0.07, waveShape: "sine", gain: 0.35, envelope: ENV3 },
      { frequency: 1047, duration: 0.22, startAt: 0.15, waveShape: "sine", gain: 0.4, envelope: ENV3 }
    ]
  }
};
function messagePreset(variant, pitchSemitones) {
  return VARIANTS9[variant];
}

// src/sounds/upload.ts
var VARIANTS10 = {
  short: {
    name: "upload",
    duration: 0.24,
    notes: [
      { frequency: 523, duration: 0.08, startAt: 0, waveShape: "sine", gain: 0.6 },
      { frequency: 784, duration: 0.13, startAt: 0.09, waveShape: "sine", gain: 0.7 }
    ]
  },
  medium: {
    name: "upload",
    duration: 0.4,
    notes: [
      { frequency: 392, duration: 0.08, startAt: 0, waveShape: "sine", gain: 0.55 },
      { frequency: 523, duration: 0.08, startAt: 0.1, waveShape: "sine", gain: 0.65 },
      { frequency: 784, duration: 0.18, startAt: 0.2, waveShape: "sine", gain: 0.75 }
    ]
  },
  long: {
    name: "upload",
    duration: 0.58,
    notes: [
      { frequency: 330, duration: 0.08, startAt: 0, waveShape: "sine", gain: 0.5 },
      { frequency: 392, duration: 0.08, startAt: 0.1, waveShape: "sine", gain: 0.6 },
      { frequency: 523, duration: 0.08, startAt: 0.2, waveShape: "sine", gain: 0.65 },
      { frequency: 784, duration: 0.24, startAt: 0.3, waveShape: "sine", gain: 0.75 }
    ]
  }
};
function uploadPreset(variant, pitchSemitones) {
  return VARIANTS10[variant];
}

// src/sounds/download.ts
var VARIANTS11 = {
  short: {
    name: "download",
    duration: 0.24,
    notes: [
      { frequency: 784, duration: 0.08, startAt: 0, waveShape: "sine", gain: 0.7 },
      { frequency: 523, duration: 0.13, startAt: 0.09, waveShape: "sine", gain: 0.6 }
    ]
  },
  medium: {
    name: "download",
    duration: 0.4,
    notes: [
      { frequency: 784, duration: 0.08, startAt: 0, waveShape: "sine", gain: 0.75 },
      { frequency: 523, duration: 0.08, startAt: 0.1, waveShape: "sine", gain: 0.65 },
      { frequency: 392, duration: 0.18, startAt: 0.2, waveShape: "sine", gain: 0.55 }
    ]
  },
  long: {
    name: "download",
    duration: 0.58,
    notes: [
      { frequency: 784, duration: 0.08, startAt: 0, waveShape: "sine", gain: 0.75 },
      { frequency: 523, duration: 0.08, startAt: 0.1, waveShape: "sine", gain: 0.65 },
      { frequency: 392, duration: 0.08, startAt: 0.2, waveShape: "sine", gain: 0.6 },
      { frequency: 330, duration: 0.24, startAt: 0.3, waveShape: "sine", gain: 0.5 }
    ]
  }
};
function downloadPreset(variant, pitchSemitones) {
  return VARIANTS11[variant];
}

// src/sounds/eightBit.ts
var ENV4 = { attack: 3e-3, decay: 0.015, sustain: 0.4, release: 0.015 };
var VARIANTS12 = {
  short: {
    name: "eightBit",
    duration: 0.2,
    notes: [
      { frequency: 523.25, duration: 0.04, startAt: 0, waveShape: "square", gain: 0.38, envelope: ENV4 },
      { frequency: 659.26, duration: 0.04, startAt: 0.05, waveShape: "square", gain: 0.38, envelope: ENV4 },
      { frequency: 783.99, duration: 0.08, startAt: 0.1, waveShape: "square", gain: 0.42, envelope: ENV4 }
    ]
  },
  medium: {
    name: "eightBit",
    duration: 0.33,
    notes: [
      { frequency: 523.25, duration: 0.04, startAt: 0, waveShape: "square", gain: 0.35, envelope: ENV4 },
      { frequency: 659.26, duration: 0.04, startAt: 0.06, waveShape: "square", gain: 0.38, envelope: ENV4 },
      { frequency: 783.99, duration: 0.04, startAt: 0.12, waveShape: "square", gain: 0.4, envelope: ENV4 },
      { frequency: 1046.5, duration: 0.12, startAt: 0.18, waveShape: "square", gain: 0.45, envelope: ENV4 }
    ]
  },
  long: {
    name: "eightBit",
    duration: 0.5,
    notes: [
      { frequency: 523.25, duration: 0.04, startAt: 0, waveShape: "square", gain: 0.32, envelope: ENV4 },
      { frequency: 659.26, duration: 0.04, startAt: 0.06, waveShape: "square", gain: 0.35, envelope: ENV4 },
      { frequency: 783.99, duration: 0.04, startAt: 0.12, waveShape: "square", gain: 0.38, envelope: ENV4 },
      { frequency: 659.26, duration: 0.04, startAt: 0.18, waveShape: "square", gain: 0.35, envelope: ENV4 },
      { frequency: 783.99, duration: 0.04, startAt: 0.24, waveShape: "square", gain: 0.38, envelope: ENV4 },
      { frequency: 1046.5, duration: 0.15, startAt: 0.3, waveShape: "square", gain: 0.45, envelope: ENV4 }
    ]
  }
};
function eightBitPreset(variant, pitchSemitones) {
  return VARIANTS12[variant];
}

// src/sounds/police.ts
var ENV5 = { attack: 0.02, decay: 0, sustain: 1, release: 0.04 };
function sirenNote(freq, startAt) {
  return { frequency: freq, duration: 0.22, startAt, waveShape: "sawtooth", gain: 0.45, envelope: ENV5 };
}
var VARIANTS13 = {
  short: {
    name: "police",
    duration: 0.52,
    notes: [
      sirenNote(770, 0),
      sirenNote(577, 0.26)
    ]
  },
  medium: {
    name: "police",
    duration: 1.04,
    notes: [
      sirenNote(770, 0),
      sirenNote(577, 0.26),
      sirenNote(770, 0.52),
      sirenNote(577, 0.78)
    ]
  },
  long: {
    name: "police",
    duration: 1.56,
    notes: [
      sirenNote(770, 0),
      sirenNote(577, 0.26),
      sirenNote(770, 0.52),
      sirenNote(577, 0.78),
      sirenNote(770, 1.04),
      sirenNote(577, 1.3)
    ]
  }
};
function policePreset(variant, pitchSemitones) {
  return VARIANTS13[variant];
}

// src/sounds/coin.ts
var ENV6 = { attack: 3e-3, decay: 0.025, sustain: 0.45, release: 0.04 };
var VARIANTS14 = {
  short: {
    name: "coin",
    duration: 0.16,
    notes: [
      { frequency: 987.77, duration: 0.04, startAt: 0, waveShape: "square", gain: 0.45, envelope: ENV6 },
      { frequency: 1318.51, duration: 0.1, startAt: 0.045, waveShape: "square", gain: 0.5, envelope: ENV6 }
    ]
  },
  medium: {
    name: "coin",
    duration: 0.28,
    notes: [
      { frequency: 987.77, duration: 0.05, startAt: 0, waveShape: "square", gain: 0.42, envelope: ENV6 },
      { frequency: 1174.66, duration: 0.05, startAt: 0.06, waveShape: "square", gain: 0.45, envelope: ENV6 },
      { frequency: 1318.51, duration: 0.14, startAt: 0.12, waveShape: "square", gain: 0.5, envelope: ENV6 }
    ]
  },
  long: {
    name: "coin",
    duration: 0.42,
    notes: [
      { frequency: 987.77, duration: 0.05, startAt: 0, waveShape: "square", gain: 0.4, envelope: ENV6 },
      { frequency: 1174.66, duration: 0.05, startAt: 0.06, waveShape: "square", gain: 0.43, envelope: ENV6 },
      { frequency: 1318.51, duration: 0.05, startAt: 0.12, waveShape: "square", gain: 0.47, envelope: ENV6 },
      { frequency: 1568, duration: 0.2, startAt: 0.18, waveShape: "square", gain: 0.52, envelope: ENV6 }
    ]
  }
};
function coinPreset(variant, pitchSemitones) {
  return VARIANTS14[variant];
}

// src/sounds/boing.ts
var ENV7 = { attack: 4e-3, decay: 0, sustain: 1, release: 0.025 };
var VARIANTS15 = {
  short: {
    name: "boing",
    duration: 0.38,
    notes: [
      { frequency: 1200, duration: 0.03, startAt: 0, waveShape: "sine", gain: 0.6, envelope: ENV7 },
      { frequency: 900, duration: 0.03, startAt: 0.04, waveShape: "sine", gain: 0.58, envelope: ENV7 },
      { frequency: 680, duration: 0.04, startAt: 0.08, waveShape: "sine", gain: 0.55, envelope: ENV7 },
      { frequency: 500, duration: 0.05, startAt: 0.13, waveShape: "sine", gain: 0.52, envelope: ENV7 },
      { frequency: 350, duration: 0.07, startAt: 0.19, waveShape: "sine", gain: 0.48, envelope: ENV7 },
      { frequency: 220, duration: 0.1, startAt: 0.27, waveShape: "sine", gain: 0.42, envelope: ENV7 }
    ]
  },
  medium: {
    name: "boing",
    duration: 0.6,
    notes: [
      { frequency: 1400, duration: 0.04, startAt: 0, waveShape: "sine", gain: 0.62, envelope: ENV7 },
      { frequency: 1050, duration: 0.04, startAt: 0.05, waveShape: "sine", gain: 0.6, envelope: ENV7 },
      { frequency: 800, duration: 0.05, startAt: 0.1, waveShape: "sine", gain: 0.57, envelope: ENV7 },
      { frequency: 600, duration: 0.06, startAt: 0.16, waveShape: "sine", gain: 0.54, envelope: ENV7 },
      { frequency: 450, duration: 0.07, startAt: 0.23, waveShape: "sine", gain: 0.51, envelope: ENV7 },
      { frequency: 330, duration: 0.09, startAt: 0.31, waveShape: "sine", gain: 0.47, envelope: ENV7 },
      { frequency: 240, duration: 0.13, startAt: 0.41, waveShape: "sine", gain: 0.42, envelope: ENV7 }
    ]
  },
  long: {
    name: "boing",
    duration: 0.9,
    notes: [
      { frequency: 1600, duration: 0.04, startAt: 0, waveShape: "sine", gain: 0.62, envelope: ENV7 },
      { frequency: 1200, duration: 0.04, startAt: 0.05, waveShape: "sine", gain: 0.6, envelope: ENV7 },
      { frequency: 950, duration: 0.05, startAt: 0.1, waveShape: "sine", gain: 0.58, envelope: ENV7 },
      { frequency: 720, duration: 0.06, startAt: 0.16, waveShape: "sine", gain: 0.55, envelope: ENV7 },
      { frequency: 540, duration: 0.07, startAt: 0.23, waveShape: "sine", gain: 0.52, envelope: ENV7 },
      { frequency: 400, duration: 0.09, startAt: 0.31, waveShape: "sine", gain: 0.49, envelope: ENV7 },
      { frequency: 290, duration: 0.12, startAt: 0.41, waveShape: "sine", gain: 0.45, envelope: ENV7 },
      { frequency: 210, duration: 0.16, startAt: 0.54, waveShape: "sine", gain: 0.41, envelope: ENV7 },
      { frequency: 160, duration: 0.18, startAt: 0.71, waveShape: "sine", gain: 0.36, envelope: ENV7 }
    ]
  }
};
function boingPreset(variant, pitchSemitones) {
  return VARIANTS15[variant];
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
async function playToggle(opts = {}) {
  return play(togglePreset(opts.variant ?? "short", opts.pitch ?? 0), opts);
}
async function playDelete(opts = {}) {
  return play(deletePreset(opts.variant ?? "medium", opts.pitch ?? 0), opts);
}
async function playMessage(opts = {}) {
  return play(messagePreset(opts.variant ?? "medium", opts.pitch ?? 0), opts);
}
async function playUpload(opts = {}) {
  return play(uploadPreset(opts.variant ?? "medium", opts.pitch ?? 0), opts);
}
async function playDownload(opts = {}) {
  return play(downloadPreset(opts.variant ?? "medium", opts.pitch ?? 0), opts);
}
async function playEightBit(opts = {}) {
  return play(eightBitPreset(opts.variant ?? "medium", opts.pitch ?? 0), opts);
}
async function playPolice(opts = {}) {
  return play(policePreset(opts.variant ?? "short", opts.pitch ?? 0), opts);
}
async function playCoin(opts = {}) {
  return play(coinPreset(opts.variant ?? "short", opts.pitch ?? 0), opts);
}
async function playBoing(opts = {}) {
  return play(boingPreset(opts.variant ?? "medium", opts.pitch ?? 0), opts);
}
var BANK = {
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
  boing: boingPreset
};
async function earcon(name, opts = {}) {
  const preset = BANK[name];
  return play(preset(opts.variant ?? "medium", opts.pitch ?? 0), opts);
}
function registerSound(name, preset) {
  BANK[name] = preset;
}

export { closeAudioContext, earcon, playBoing, playClick, playCoin, playDelete, playDownload, playEightBit, playError, playInfo, playMessage, playNotification, playPolice, playSuccess, playToggle, playUpload, playWarning, registerSound, semitonesToMultiplier, setAudioContext };
//# sourceMappingURL=index.js.map
//# sourceMappingURL=index.js.map