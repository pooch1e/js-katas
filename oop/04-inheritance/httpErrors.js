/**
 * HttpError and subclasses — an error hierarchy with a static factory.
 * See README.md › HTTP errors.
 */
export class HttpError extends Error {
  constructor(status, message) {
    super(message);
    throw new Error("TODO: implement HttpError");
  }

  toJSON() {}

  static from(status, message) {}
}

export class BadRequestError extends HttpError {}

export class UnauthorizedError extends HttpError {}

export class NotFoundError extends HttpError {}
