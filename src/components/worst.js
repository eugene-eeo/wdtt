var chalk = require('chalk');
var blessed = require('blessed');
var formatTweet = require('../utils/format-tweet');


module.exports = function(screen) {
    var worst;
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
        if (res.worst === worst) return;
        worst = res.worst;
        elem.setContent([
            chalk.bold('Worst (' + worst.score + ') '),
            formatTweet(worst.tweet),
        ].join('\n'));
    };
};
