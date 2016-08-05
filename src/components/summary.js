var chalk = require('chalk');
var blessed = require('blessed');
var sparkline = require('sparkline');


class Summary {
    constructor() {
        this.elem = blessed.Box({
            top: 1, // hack
            height: 5,
            border: {type: 'line'},
            padding: {left: 1, right: 1},
        });
    }

    attach(dataLayer, screen) {
        var resize = () => {
            dataLayer.resize(this.elem.width - 4);
        };
        this.elem.setContent('Hang on a moment...');
        this.elem.on('resize', resize);
        screen.append(this.elem);
        resize();
    }

    sentimentLine(analysis) {
        var {mean, growing} = analysis;
        var s = growing ? '▲' : '▼';
        var v = mean.toFixed(6);
        return chalk.bold('Sentiment: ') + s + ' ' + v;
    }

    render(analysis) {
        this.elem.setContent([
            this.sentimentLine(analysis),
            sparkline(analysis.history),
        ].join('\n'));
    }
}

module.exports = Summary;
