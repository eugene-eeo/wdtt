var chalk = require('chalk');
var sparkline = require('sparkline');


function displayMean(r) {
    var t = r.mean.toFixed(6);
    var s = r.growing ? '▲' : '▼';
    return chalk.bold('Sentiment: ') + s + ' ' + t;
}


function summary(res) {
    return [
        displayMean(res),
        sparkline(res.history),
    ].join('\n');
}

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


function firstLine(text) {
    return text.split('\n', 1)[0].trim();
}


function formatTweet(tweet) {
    var handle = chalk.bold('@' + tweet.user.screen_name + ': ');
    var text   = tweet.text.replace(/(\#\S+)/g, function(m) {
            return chalk.bold(m);
        });
    return handle + tweet.text;
}


function latest(tweet) {
    return [
        chalk.bold('Latest:'),
        formatTweet(tweet),
    ].join('\n');
}

function title(queries) {
    var qs = queries.map(str => chalk.inverse(' ' + str + ' ')).join(' ');
    return (queries.length > 1 ? 'Queries: ' : 'Query: ') + qs;
}

module.exports = {
    summary,
    best,
    worst,
    latest,
    title,
};
