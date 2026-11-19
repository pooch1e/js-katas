/**
 * normalise(results) — sorts a list of results (and the items inside each
 * array result) so tests can compare without caring about order. Already
 * written; read, don't edit.
 */
export function normalise(results) {
  return results
    .map((r) => (Array.isArray(r) ? [...r].sort((a, b) => (a < b ? -1 : a > b ? 1 : 0)) : r))
    .map((r) => JSON.stringify(r))
    .sort();
}
