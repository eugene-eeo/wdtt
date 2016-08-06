var test = require('tape');
var atMost = require('../src/utils/at-most');

test('atMost size', function(t) {
    var push = atMost(3);
    t.deepEqual(push(1), [1]);
    t.deepEqual(push(2), [1, 2]);
    t.deepEqual(push(3), [1, 2, 3]);
    t.deepEqual(push(4), [2, 3, 4]);
    t.end();
});

test('atMost resize smaller', function(t) {
    var push = atMost(3);
    push(1);
    push(2);
    push(3);
    push = push.resize(2);
    t.deepEqual(push(4), [3, 4]);
    t.end();
});

test('atMost resize larger', function(t) {
    var push = atMost(1);
    push(1);
    push(2);
    push = push.resize(2);
    t.deepEqual(push(3), [2, 3]);
    t.end();
});
