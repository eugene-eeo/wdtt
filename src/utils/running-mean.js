var atMost = require('./at-most');
var sum = a => a.reduce((r, a) => r+a);

function avg(arr) {
    var len = arr.length;
    return len > 0
        ? sum(arr) / len
        : 0;
}

module.exports = function() {
    var mean  = 0;
    var count = 0;
    var history = atMost(15);
    return datum => {
        var prev = mean;
        mean = ((mean * count) + datum) / ++count;
        return {
            growing: avg(history(mean - prev)) > 0,
            mean,
        };
    };
};
