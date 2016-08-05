var chalk = require('chalk');
var blessed = require('blessed');
var formatTweet = require('../utils/format-tweet');


module.exports = function(screen) {
    var worst = {score: +Infinity};
    var elem = blessed.Box({
        top: 5 + 1,
        right:  0,
        width: '50%',
        height: 10,
        padding: {left: 1, right: 1},
        border: { type: 'line' },
    });

    screen.append(elem);
    return function render(res) {
        if (res.score > worst.score) return;
        worst = res;
        elem.setContent([
            chalk.bold('Worst (' + worst.score + ') '),
            formatTweet(worst.tweet),
        ].join('\n'));
    };
};
