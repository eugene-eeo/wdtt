var better = (a, b) => (a.score >= b.score ? a : b);
var worser = (a, b) => (a.score <= b.score ? a : b);


module.exports = function() {
    var best  = {score: -Infinity};
    var worst = {score: +Infinity};
    return function(datum) {
        best  = better(best,  datum);
        worst = worser(worst, datum);
        return {best, worst};
    };
};
