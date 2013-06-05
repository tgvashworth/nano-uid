var t = require('tap'),
    async = require('async'),
    memoriser = require('../lib/memoriser');

t.test('memory', function (t) {

  t.test('creating a memory', function (t) {
    t.plan(3);
    var memory = Object.create(memoriser);
    t.ok(memory, 'Memory is truthy');
    t.ok(memory.set, 'Set is truthy');
    t.ok(memory.get, 'Get is truthy');
    t.end();
  });

  t.test('creating multiple memorys', function (t) {
    t.plan(3);
    var memoryA = Object.create(memoriser),
        memoryB = Object.create(memoriser);
    t.ok(memoryA !== memoryB, 'Memories are not equal');
    async.parallel({
      a: function (done) { return memoryA.set('a', 1, done); },
      b: function (done) { return memoryB.set('a', 1, done); }
    }, function (err) {
      t.notOk(err);
      t.ok(memoryA.store !== memoryB.store, 'Memories are not equal');
      t.end();
    });
  });

  t.test('setting & getting from the memory', function (t) {
    t.plan(4);
    var memory = Object.create(memoriser);
    async.parallel({
      hello: function (done) { return memory.set('hello', 'sup', done); },
      test: function (done) { return memory.set('test', true, done); }
    }, function (err) {
      t.notOk(err);
      async.parallel({
        hello: function (done) { return memory.get('hello', done); },
        test: function (done) { return memory.get('test', done); }
      }, function (err, results) {
        t.notOk(err);
        t.equal(results.hello, 'sup');
        t.equal(results.test, true);
        t.end();
      });
    });
  });

  t.test('no overwriting', function (t) {
    t.plan(3);
    var memory = Object.create(memoriser);
    async.series([
      function (done) { return memory.set('hello', 'sup', done); },
      function (done) { return memory.set('hello', 'no', done); }
    ], function (err) {
      t.notOk(err);
      memory.get('hello', function (err, result) {
        t.notOk(err);
        t.equal(result, 'sup');
        t.end();
      });
    });
  });

});