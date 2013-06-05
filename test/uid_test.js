var t = require('tap'),
    async = require('async'),
    _ = require('underscore'),
    uidFactory = require('../');

t.test('uid', function (t) {

  t.test('generates ids', function (t) {
    var uid = uidFactory();
    uid.generate(4, function (err, id) {
      console.log(id);
      t.notOk(err, 'No error.');
      t.ok(id, 'id returned.');
      t.equal(id.length, 4, 'id returned is correct length.');
      t.end();
    });
  });

  t.test('generates many ids', function (t) {
    var uid = uidFactory();
    var arr = (new Array(5)).join(',').split(',');
    var gen = arr.map(function () {
      return function (done) {
        return uid.generate(3, done);
      };
    });
    async.parallel(gen, function (err, results) {
      t.notOk(err);
      var unique = _.uniq(results);
      t.equal(unique.length, results.length);
      uid.end();
      t.end();
    });
  });

  t.test('knows about combinations', function (t) {
    var uid = uidFactory();
    t.equal(uid.getPossibleCombinations(1),
            uid.consonants.length,
            'One letter: just 21 possibilities');
    t.equal(uid.getPossibleCombinations(2),
            uid.consonants.length * uid.consonants.length,
            'Two letters: 105 possibilities');
    t.end();
  });

  t.end();

});