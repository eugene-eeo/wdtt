var atMost = require('./at-most');
var sum = a => a.reduce((r, a) => r+a, 0);

module.exports = function() {
    var mean  = 0;
    var count = 0;
    var history = atMost(20);
    return datum => {
        var prev = mean;
        mean = (mean * count + datum) / ++count;
        return {
            growing: sum(history(mean - prev)) > 0,
            mean,
        };
    };
};
