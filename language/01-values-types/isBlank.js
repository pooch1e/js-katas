/**
 * isBlank — true for null, undefined, and strings with no visible
 * characters. See README.md › isBlank.
 */
export function isBlank(value) {
  if (value === '' || value === undefined || value === null || value.trim() === '') {
    return true
  } else if (value === 0 || value === false || value.length === 0) {
    return false;
  } else {
    return false
  }
}
