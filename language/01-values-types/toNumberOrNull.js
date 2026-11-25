/**
 * toNumberOrNull — converts numbers and numeric strings to a number;
 * returns null for anything else. See README.md › toNumberOrNull.
 */
export function toNumberOrNull(input) {
  let numberConverted = input;
  if (typeof numberConverted === 'string') {
    numberConverted = numberConverted.trim()
    if (numberConverted === '' || numberConverted.match(/[a-zA-Z]/i)) {
      return null
    }
    numberConverted = Number(numberConverted)
    return numberConverted
  }
  if (isNaN(numberConverted) || !isFinite(numberConverted)) {
    return null;
  }
  return typeof numberConverted === 'number' ? numberConverted : null
}
