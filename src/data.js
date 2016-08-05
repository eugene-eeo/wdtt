var sentiment = require('sentiment');


function atMost(size, data) {
    var array = data || [];
    var exceed = false;
    var length = array.length;

    function push(datum) {
        exceed = exceed || (++length > size);
        if (exceed) {
            array.shift();
        }
        array.push(datum);
        return array;
    }

    push.data = array;
    return push;
}


var better = (a, b) => (a.score >= b.score ? a : b);
var worser = (a, b) => (a.score <= b.score ? a : b);


function runningWorstBest() {
    var best  = {score: -Infinity};
    var worst = {score: +Infinity};
    return function(datum) {
        best  = better(best,  datum);
        worst = worser(worst, datum);
        return {best, worst};
    };
}


function runningMean() {
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
}


module.exports = function(width) {
    var nextMean  = runningMean();
    var worstBest = runningWorstBest();
    var prev = nextMean(0);
    var pushScore = atMost(width);

    var analyse = tweet => {
        var res   = sentiment(tweet.text);
        var score = res.score;
        var {mean, growing} = nextMean(score);
        var {worst, best} = worstBest({
            score: score,
            text:  tweet.text,
        });
        return {
            history: pushScore(score),
            mean,
            growing,
            score,
            best,
            worst,
        };
    };

    analyse.resize = function(width, height) {
        pushScore = atMost(width, pushScore.data.slice(-width));
    };
    return analyse;
};
