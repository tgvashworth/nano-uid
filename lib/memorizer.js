module.exports = {
  /**
   * Do we know about this id?
   *
   * id will the be a string.
   *
   * Call the callback when done: pass an error or null, or true/false.
   */
  has: function (id, cb) {
    cb = cb || function () {};
    if (!this.store) this.store = {};
    return cb(null, this.store[id]);
  },

  /**
   * Remember this id.
   *
   * id will be a string.
   *
   * Call the callback when done: pass an error or null.
   */
  save: function (id, cb) {
    cb = cb || function () {};
    if (!this.store) this.store = {};
    if (typeof this.store[id] !== "undefined") {
      return cb(new Error("Tried to save already-generated id."));
    }
    this.store[id] = true;
    return cb();
  },

  /**
   * Gives you the opporunity to perform cleanup related to the memorizer.
   *
   * To run it: uid.end()
   */
  end: function () {}
};