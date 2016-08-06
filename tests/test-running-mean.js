var test = require('tape');
var runningMean = require('../src/utils/running-mean');

test('running mean.mean', function(t) {
    var m = runningMean();
    t.equal(m(1).mean, 1);
    t.equal(m(2).mean, 1.5);
    t.equal(m(3).mean, 2);
    t.end();
});


test('running mean.growing', function(t) {
    var m = runningMean();
    t.equal(m(1).growing, true);
    t.equal(m(2).growing, true);
    t.equal(m(3).growing, true);
    t.equal(m(4).growing, true);
    t.equal(m(-100).growing, false);
    t.equal(m(-50).growing, false);
    t.end();
});
