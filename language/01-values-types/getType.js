/**
 * getType — like typeof, but returns "null", "array" and "nan" for the
 * values typeof gets wrong. See README.md › getType.
 */

function isObject(val) {
  return val === Object.getPrototypeOf(val)
}
export function getType(value) {
  if (typeof value === 'string') {
    return 'string'
  }
  if (typeof value === 'number' && !isNaN(value)) {
    return 'number'
  }
  if (value === null) {
    return 'null'
  }
  if (Array.isArray(value)) {
    return 'array'
  }
  if (typeof value === 'object' && !Array.isArray(value) && value !== null) {
    console.log(value)
    return 'object'
  }
  if (value === undefined) {
    return 'undefined'
  }
  if (value === true || value === false) {
    return 'boolean'
  }
  if (typeof value === 'function') {
    return 'function'
  }
  if (isNaN(value)) {
    return 'nan'
  }
}