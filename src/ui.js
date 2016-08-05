var chalk = require('chalk');
var sparkline = require('sparkline');
var truncate  = require('cli-truncate');


function score_color(score) {
    if (score === 0) return chalk.yellow;
    if (score > 0)   return chalk.green;
    return chalk.red;
}


function displayMean(r) {
    var t = score_color(r.mean)(r.mean.toFixed(6));
    var s = r.growing
        ? chalk.green('▲')
        : chalk.red('▼');
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
        chalk.bold(score_color(res.score)('Best (' + (res.score) + ') ')),
        res.tweet.text,
    ].join('\n');
};

function worst(res) {
    return [
        chalk.bold(score_color(res.score)('Worst (' + (res.score) + ') ')),
        res.tweet.text,
    ].join('\n');
};


function firstLine(text) {
    return text.split('\n', 1)[0].trim();
}


function displayTweet(tweet, width) {
    return truncate(text, width);
}

function latest(tweet) {
    return [
        chalk.bold('Latest:'),
        chalk.bold(chalk.blue('@' + tweet.user.screen_name + ': '))
            + tweet.text.replace(/(\#\S+)/g, function(m) {
                return chalk.bold(m);
            })
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
