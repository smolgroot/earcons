// ---------------------------------------------------------------------------
// earcon — AudioContext singleton with autoplay-policy handling
// ---------------------------------------------------------------------------

let _ctx: AudioContext | null = null;

/**
 * Returns the shared AudioContext, creating it on first call.
 * Automatically resumes a suspended context (needed after browser
 * autoplay-policy restrictions kick in before a user gesture).
 */
export async function getAudioContext(): Promise<AudioContext> {
  if (!_ctx) {
    _ctx = new AudioContext();
  }

  if (_ctx.state === "suspended") {
    await _ctx.resume();
  }

  return _ctx;
}

/**
 * Returns the shared AudioContext synchronously.
 * The context may still be suspended — callers that need it resumed
 * should use {@link getAudioContext} instead.
 */
export function getAudioContextSync(): AudioContext {
  if (!_ctx) {
    _ctx = new AudioContext();
  }
  return _ctx;
}

/**
 * Closes and discards the shared AudioContext.
 * Useful in tests or when tearing down an SPA.
 */
export async function closeAudioContext(): Promise<void> {
  if (_ctx) {
    await _ctx.close();
    _ctx = null;
  }
}

/**
 * Replace the internal singleton — useful in tests to inject a mock.
 */
export function setAudioContext(ctx: AudioContext): void {
  _ctx = ctx;
}
