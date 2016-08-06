var test = require('tape');
var dimensions = require('../src/utils/dimensions');


function extend(a, b) {
    return Object.assign(a, b);
}


function mockElem(opts) {
    var zeroPad = {left: 0, right: 0, top: 0, bottom: 0};
    var zeroBor = {left: false, right: false, top: false, bottom: false};
    return {
        height:  100,
        width:   100,
        padding: extend(zeroPad, opts.padding || {}),
        border:  extend(zeroBor, opts.border  || {}),
    };
}


test('dimensions padding', function(t) {
    var elem = mockElem({ padding: { left: 1, right: 1 } });
    t.deepEqual(dimensions(elem), {
        width: 98,
        height: 100,
    });
    t.end();
});


test('dimensions border', function(t) {
    var elem = mockElem({border: {left: true, right: true}});
    t.deepEqual(dimensions(elem), {
        width: 98,
        height: 100,
    });
    t.end();
});


test('dimensions border+padding', function(t) {
    var elem = mockElem({
        border:  {left: true, right: false},
        padding: {left: 5, right: 10, top: 2},
    });
    t.deepEqual(dimensions(elem), {
        width:  100 - 1 - 5 - 10,
        height: 98,
    });
    t.end();
});
