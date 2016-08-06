var chalk = require('chalk');
var blessed = require('blessed');
var formatTweet = require('../utils/format-tweet');


module.exports = class Best {
    constructor(screen) {
        this.score = -Infinity;
        this.elem = blessed.Box({
            width: '50%',
            height: 10,
            padding: {left: 1, right: 1},
            border: { type: 'line' },
        });
        screen.append(this.elem);
    }

    render(res) {
        if (res.score < this.score) return;
        this.score = res.score;
        this.elem.setContent([
            chalk.bold('Best (' + res.score + ') '),
            formatTweet(res.tweet),
        ].join('\n'));
    }
};
