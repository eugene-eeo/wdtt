module.exports = function() {
    var mean  = 0;
    var count = 0;
    return datum => {
        prev = mean;
        mean = ((mean * count) + datum) / ++count;
        return {
            growing: prev >= mean,
            mean,
        };
    };
};
