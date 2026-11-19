/**
 * User — keeps the password hash private; exposes only safe operations.
 * See README.md › User.
 */
export class User {
  constructor(username, password) {
    throw new Error("TODO: implement User");
  }

  checkPassword(attempt) {}

  changePassword(oldPassword, newPassword) {}

  toJSON() {}
}
