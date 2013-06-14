var memoriser = require('./memoriser');

module.exports = function (memory) {

  var uid = {

    // Remember used strings.
    memory: memory || Object.create(memoriser),

    // Letterbank
    vowels: 'aeiou',
    consonants: 'bcdfghjklmnpqrstvwxyz',

    // Entropy
    entropy: 0,

    /**
     * Generate a random, pronouncable string of length `length`, or 4.
     * The string will always be consonant, vowel, consonant etc.
     *
     * Takes a length and a callback.
     */
    generate: function generate(length, cb, calls) {
      // Try not to recurse too deep
      calls = calls || 0;
      calls += 1;
      if (calls >= this.getPossibleCombinations(length)) length += 1;
      // Create a random string
      var str = this.degenerate(this.createStringOfLength(length));
      // Try this new string out from the memory
      this.memory.get(str, function (err, reply) {
        if (err) return cb(err);
        // Oops, it's already there. Go again.
        if (reply) return generate.call(this, length, cb, calls);
        // Looks like we're good
        this.memory.set(str, str, function (err) {
          if (err) return cb(err);
          // Send em on back
          return cb(null, str);
        });
      }.bind(this));
    },

    end: function () {
      if (this.memory) return this.memory.end();
    },

    /**
     * Create a random, readable string of the given length
     */
    createStringOfLength: function (length) {
      var str = '', choice = 0;
      while (str.length < length) {
        str += this.getRandomLetterFrom([this.consonants, this.vowels][choice]);
        // Flip, flop
        choice = 1 - choice;
      }
      return str;
    },

    /**
     * Fiddle about with the string according to the entropy
     */
    degenerate: function (str) {
      var i = this.entropy,
          index = 0;
      while (i--) {
        index = Math.floor(Math.random() * str.length);
        str = str.replace(str[index], this.getRandomLetterFrom(this.consonants + this.vowels));
      }
      return str;
    },

    getPossibleCombinations: function (length) {
      if (!length) return 0;
      var total = 1, choice = 0;
      while (length--) {
        total *= [this.consonants, this.vowels][choice].length;
      }
      return total;
    },

    /**
     * Pick a random character from the string
     */
    getRandomLetterFrom: function (str) {
      // ~~ acts as a floor for positive numbers
      return str[~~(Math.random() * str.length)];
    }

  };

  return uid;

};