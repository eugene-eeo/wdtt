var chalk = require('chalk');
var formatTweet = require('./utils/format-tweet');


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
