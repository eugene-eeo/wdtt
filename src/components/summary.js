var chalk = require('chalk');
var blessed = require('blessed');
var sparkline = require('sparkline');
var atMost = require('../utils/at-most');


function sentimentLine(res) {
    var {mean, growing} = res;
    var s = growing ? '▲' : '▼';
    var v = mean.toFixed(6);
    return chalk.bold('Sentiment: ') + s + ' ' + v;
}


module.exports = class Summary {
    constructor(screen) {
        this.elem = blessed.Box({
            height: 5,
            border: {type: 'line'},
            padding: {left: 1, right: 1},
            content: 'Hang on a moment...',
        });

        this.scores = atMost(100);
        var resize = () => {
            this.scores = this.scores.resize(this.elem.width - 4);
        };

        screen.on('resize', resize);
        screen.append(this.elem);
        resize();
    }

    render(res) {
        this.elem.setContent([
            sentimentLine(res),
            sparkline(this.scores(res.score)),
        ].join('\n'));
    }
};
