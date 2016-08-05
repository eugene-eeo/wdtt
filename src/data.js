var sentiment = require('sentiment');
var atMost = require('./utils/at-most');
var runningWorstBest = require('./utils/worst-best');
var runningMean = require('./utils/running-mean');


module.exports = function(width) {
    var nextMean  = runningMean();
    var worstBest = runningWorstBest();
    var pushScore = atMost(width);

    var analyse = tweet => {
        var res   = sentiment(tweet.text);
        var score = res.score;
        var {mean, growing} = nextMean(score);
        var {worst, best} = worstBest({
            score: score,
            tweet: tweet,
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
        pushScore = atMost(width, pushScore.data);
    };
    return analyse;
};
