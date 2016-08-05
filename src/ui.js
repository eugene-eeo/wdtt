var chalk = require('chalk');
var sparkline = require('sparkline');


function best(res) {
    return [
        chalk.bold('Best (' + res.score + ') '),
        formatTweet(res.tweet),
    ].join('\n');
};

function worst(res) {
    return [
        chalk.bold('Worst (' + res.score + ') '),
        formatTweet(res.tweet),
    ].join('\n');
};


function formatTweet(tweet) {
    var prefix = chalk.bold('@' + tweet.user.screen_name + ': ');
    return prefix + tweet.text;
}


function latest(tweet) {
    return [
        chalk.bold('Latest:'),
        formatTweet(tweet),
    ].join('\n');
}

module.exports = {
    best,
    worst,
    latest,
};
