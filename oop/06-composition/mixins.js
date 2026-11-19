/**
 * withTimestamps / withSerializable — class mixin factories.
 * See README.md › Class mixins.
 */
export const withTimestamps = (Base, now = () => Date.now()) =>
  class extends Base {
    constructor(...args) {
      super(...args);
      throw new Error("TODO: implement withTimestamps");
    }
  };

export const withSerializable = (Base) =>
  class extends Base {
    constructor(...args) {
      super(...args);
      throw new Error("TODO: implement withSerializable");
    }
  };
