<!-- earcon workspace instructions for GitHub Copilot -->

# earcon

A tiny vanilla TypeScript library for playing UI notification sounds via the Web Audio API. No audio files, no dependencies.

## Project structure

- `src/types.ts` — all TypeScript interfaces and types
- `src/context.ts` — shared AudioContext singleton with autoplay-policy handling
- `src/synth.ts` — low-level oscillator + ADSR envelope engine
- `src/sounds/` — one file per sound preset (success, error, warning, notification, click, info)
- `src/index.ts` — public API and sound bank registry
- `tests/` — vitest unit tests

## Dev conventions

- Zero runtime dependencies — never add them
- All public functions are async and accept `SoundOptions`
- Sounds are described as `NoteEvent[]` — pure data, no imperative audio code in presets
- Use `WaveShape` union type for oscillator types, never raw strings
- Tree-shakable: each play function is independently importable
