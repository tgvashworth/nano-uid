var t = require('tap'),
    async = require('async'),
    memorizer = require('../lib/memorizer');

t.test('memory', function (t) {

  t.test('creating a memory', function (t) {
    t.plan(3);
    var memory = Object.create(memorizer);
    t.ok(memory, 'Memory is truthy');
    t.ok(memory.save, 'save is truthy');
    t.ok(memory.has, 'has is truthy');
    t.end();
  });

  t.test('creating multiple memorys', function (t) {
    t.plan(3);
    var memoryA = Object.create(memorizer),
        memoryB = Object.create(memorizer);
    t.ok(memoryA !== memoryB, 'Memories are not equal');
    async.parallel({
      a: function (done) { return memoryA.save('a', done); },
      b: function (done) { return memoryB.save('a', done); }
    }, function (err) {
      t.notOk(err);
      t.ok(memoryA.store !== memoryB.store, 'Memories are not equal');
      t.end();
    });
  });

  t.test('setting & getting from the memory', function (t) {
    t.plan(4);
    var memory = Object.create(memorizer);
    async.parallel({
      hello: function (done) { return memory.save('hello', done); },
      test: function (done) { return memory.save('test', done); }
    }, function (err) {
      t.notOk(err);
      async.parallel({
        hello: function (done) { return memory.has('hello', done); },
        test: function (done) { return memory.has('test', done); }
      }, function (err, results) {
        t.notOk(err);
        t.equal(results.hello, true);
        t.equal(results.test, true);
        t.end();
      });
    });
  });

  t.test('no overwriting', function (t) {
    t.plan(3);
    var memory = Object.create(memorizer);
    async.series([
      function (done) { return memory.save('hello', done); },
      function (done) { return memory.save('hello', done); }
    ], function (err) {
      t.ok(err);
      memory.has('hello', function (err, result) {
        t.notOk(err);
        t.equal(result, true);
        t.end();
      });
    });
  });

});