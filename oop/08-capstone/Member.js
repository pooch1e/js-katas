/**
 * Member — see README.md › The spec › Member.
 */
export class Member {
  constructor({ id, name, type = "standard" }) {
    throw new Error("TODO: implement Member");
  }

  get borrowLimit() {}

  get fines() {}

  payFine(amount) {}
}
