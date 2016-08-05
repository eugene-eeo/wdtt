var sentiment = require('sentiment');
var runningMean = require('./utils/running-mean');


module.exports = function(width) {
    var nextMean  = runningMean();
    return function(tweet) {
        var res   = sentiment(tweet.text);
        var score = res.score;
        var {mean, growing} = nextMean(score);
        return {
            mean,
            growing,
            score,
            tweet,
        };
    };
};
