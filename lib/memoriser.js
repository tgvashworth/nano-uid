module.exports = {
  get: function (key, cb) {
    cb = cb || function () {};
    if (!this.store) this.store = {};
    return cb(null, this.store[key]);
  },
  set: function (key, value, cb) {
    cb = cb || function () {};
    if (!this.store) this.store = {};
    if (typeof this.store[key] !== "undefined") return cb(null, this.get(key));
    return cb(null, (this.store[key] = value));
  },
  end: function () {}
};