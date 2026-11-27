/**
 * sameValue — like ===, except NaN equals NaN and 0 does not equal -0.
 * Don't use Object.is. See README.md › sameValue.
 */
export function sameValue(a, b) {
  if (isNaN(a) && isNaN(b)) {
    return true
  }
  if (JSON.stringify(a) === JSON.stringify(b)) {
    return true
  }
  return a === b ? true : false
}
