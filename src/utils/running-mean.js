var atMost = require('./at-most');


function avg(arr) {
    var len = arr.length;
    return len
        ? arr.reduce((r, a) => (r + a)) / len
        : 0;
}


module.exports = function() {
    var mean  = 0;
    var count = 0;
    var history = atMost(10);
    return datum => {
        var prev = mean;
        mean = ((mean * count) + datum) / ++count;
        return {
            growing: avg(history(mean - prev)) > 0,
            mean,
        };
    };
};
