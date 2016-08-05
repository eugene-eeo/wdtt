var chalk = require('chalk');

module.exports = function(tweet) {
    var prefix = chalk.bold('@' + tweet.user.screen_name + ': ');
    return prefix + tweet.text;
};
