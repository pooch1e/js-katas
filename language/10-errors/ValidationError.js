/**
 * ValidationError — an Error subclass that records which field failed.
 * See README.md › ValidationError.
 */
export class ValidationError extends Error {
  constructor(field, message) {
    super(message);
    throw new Error("TODO: implement ValidationError");
  }
}
