var chalk = require('chalk');
var formatTweet = require('./utils/format-tweet');


function best(res) {
    return [
        chalk.bold('Best (' + res.score + ') '),
        formatTweet(res.tweet),
    ].join('\n');
};


module.exports = {
    best,
};
