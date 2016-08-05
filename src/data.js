var sentiment = require('sentiment');
var runningWorstBest = require('./utils/worst-best');
var runningMean = require('./utils/running-mean');


module.exports = function(width) {
    var nextMean  = runningMean();
    var worstBest = runningWorstBest();

    return function(tweet) {
        var res   = sentiment(tweet.text);
        var score = res.score;
        var {mean, growing} = nextMean(score);
        var {worst, best} = worstBest({
            score: score,
            tweet: tweet,
        });
        return {
            mean,
            growing,
            score,
            best,
            worst,
            tweet,
        };
    };
};
