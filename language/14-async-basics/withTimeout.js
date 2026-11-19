/**
 * withTimeout / TimeoutError — rejects if a promise takes longer than ms.
 * See README.md › withTimeout.
 */
export class TimeoutError extends Error {
  constructor(ms) {
    super(`timed out after ${ms}ms`);
    this.name = "TimeoutError";
  }
}

export function withTimeout(promise, ms) {
  throw new Error("TODO: implement withTimeout");
}
