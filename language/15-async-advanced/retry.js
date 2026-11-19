/**
 * retry — retries a failing async fn with exponential backoff.
 * See README.md › retry.
 */
export async function retry(fn, { retries = 3, baseDelayMs = 100 } = {}) {
  throw new Error("TODO: implement retry");
}
