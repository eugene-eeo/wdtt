var chalk = require('chalk');
var blessed = require('blessed');
var formatTweet = require('../utils/format-tweet');


module.exports = function(screen) {
    var best;
    var elem = blessed.Box({
        top: 5 + 1,
        left:   0,
        width: '50%',
        height: 10,
        padding: {left: 1, right: 1},
        border: { type: 'line' },
    });

    screen.append(elem);
    return function render(res) {
        if (res.best === best) return;
        best = res.best;
        elem.setContent([
            chalk.bold('Best (' + best.score + ') '),
            formatTweet(best.tweet),
        ].join('\n'));
    };
};
