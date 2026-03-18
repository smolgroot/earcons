# earcons

> Tiny vanilla TypeScript library for UI notification sounds — pure Web Audio API, no audio files, zero dependencies.

[![npm](https://img.shields.io/npm/v/earcons)](https://www.npmjs.com/package/earcons)
[![bundle size](https://img.shields.io/bundlephobia/minzip/earcons)](https://bundlephobia.com/package/earcons)
[![license](https://img.shields.io/npm/l/earcons)](LICENSE)

## Why earcon?

| | earcon | Howler.js | Tone.js | ZzFX |
|---|:---:|:---:|:---:|:---:|
| **No audio files** | ✅ | ❌ | ✅ | ✅ |
| **Notification-specific API** | ✅ | ❌ | ❌ | ❌ |
| **TypeScript native** | ✅ | via @types | ✅ | ❌ |
| **Zero dependencies** | ✅ | ✅ | ❌ | ✅ |
| **Bundle size** | ~3 KB | 318 KB | 5.4 MB | <1 KB |
| **Semantic sound names** | ✅ | ❌ | ❌ | ❌ |
| **Customizable** | ✅ | ✅ | ✅ | ✅ |

An [earcon](https://en.wikipedia.org/wiki/Earcon) is an auditory icon — a short, meaningful sound signal used in user interfaces. This library provides a curated set of them, generated entirely in code.

---

## Install

```bash
npm install earcons
```

### CDN (no build step)

```html
<!-- jsDelivr -->
<script src="https://cdn.jsdelivr.net/npm/earcons/dist/earcon.min.global.js"></script>

<!-- unpkg -->
<script src="https://unpkg.com/earcons/dist/earcon.min.global.js"></script>
```

All functions are available under the global `Earcon` object:

```html
<button onclick="Earcon.playSuccess()">✅</button>
<button onclick="Earcon.playError()">❌</button>
<script>
  // or
  Earcon.earcon("notification", { volume: 0.8 });
</script>
```

---

## Quick start

```ts
import { playSuccess, playError, playWarning } from "earcons";

// Defaults — medium variant, volume 0.5
await playSuccess();
await playError();
await playWarning();
```

---

## API

### Named play functions

Each function accepts an optional [`SoundOptions`](#soundoptions) object.

```ts
import {
  playSuccess,
  playError,
  playWarning,
  playNotification,
  playClick,
  playInfo,
} from "earcons";

await playSuccess();
await playError({ variant: "long", volume: 0.8 });
await playWarning({ variant: "short" });
await playNotification({ pitch: 7 }); // +7 semitones
await playClick({ variant: "short" });
await playInfo({ volume: 0.3 });
```

### Generic `earcon()` — play by name

```ts
import { earcon } from "earcons";

await earcon("success");
await earcon("error", { variant: "long" });
```

**Built-in sound names:** `success` · `error` · `warning` · `notification` · `click` · `info`

### Register a custom sound

```ts
import { registerSound, earcon } from "earcons";
import type { SoundPreset } from "earcons";

const chirp: SoundPreset = (_variant, _pitch) => ({
  name: "chirp",
  duration: 0.15,
  notes: [
    { frequency: 1200, duration: 0.07, startAt: 0, waveShape: "sine" },
    { frequency: 1600, duration: 0.08, startAt: 0.07, waveShape: "sine" },
  ],
});

registerSound("chirp", chirp);
await earcon("chirp");
```

### `SoundOptions`

| Option | Type | Default | Description |
|---|---|---|---|
| `volume` | `number` | `0.5` | Master volume, 0–1 |
| `variant` | `"short" \| "medium" \| "long"` | `"medium"` | Duration variant |
| `pitch` | `number` | `0` | Semitone offset (±) |
| `audioContext` | `AudioContext` | shared singleton | Bring your own context |
| `onEnded` | `() => void` | — | Called when the sound finishes |

### AudioContext management

```ts
import { closeAudioContext, setAudioContext } from "earcons";

// Provide your own AudioContext (useful in frameworks)
const myCtx = new AudioContext();
setAudioContext(myCtx);

// Tear down (e.g. on unmount)
await closeAudioContext();
```

---

## Sound reference

| Name | Waveform | Character |
|---|---|---|
| `success` | sine | Ascending major triad — bright, positive |
| `error` | sawtooth | Descending tritone — harsh, attention-grabbing |
| `warning` | triangle | Flat then descending minor second — cautious |
| `notification` | sine | Soft descending two-tone ding — neutral |
| `click` | sine | Very short transient — tactile UI feedback |
| `info` | sine | Single soft tone — informational, non-intrusive |

---

## Browser support

Any browser that supports the [Web Audio API](https://developer.mozilla.org/en-US/docs/Web/API/Web_Audio_API) (all modern browsers since 2014).

> **Autoplay policy:** earcon automatically calls `AudioContext.resume()` before playing. Make sure you call a play function in response to a user gesture on first load, or the browser may suppress audio.

---

## License

MIT
