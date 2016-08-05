var chalk = require('chalk');
var blessed = require('blessed');
var sparkline = require('sparkline');
var atMost = require('../utils/at-most');


function sentimentLine(analysis) {
    var {mean, growing} = analysis;
    var s = growing ? '▲' : '▼';
    var v = mean.toFixed(6);
    return chalk.bold('Sentiment: ') + s + ' ' + v;
}


module.exports = function(screen) {
    var elem = blessed.Box({
        top: 1, // hack
        height: 5,
        border: {type: 'line'},
        padding: {left: 1, right: 1},
        content: 'Hang on a moment...',
    });

    var pushScore = atMost(100);
    var resize = () => {
        pushScore = pushScore.resize(elem.width - 4);
    };

    screen.on('resize', resize);
    screen.append(elem);
    resize();

    return function render(analysis) {
        elem.setContent([
            sentimentLine(analysis),
            sparkline(pushScore(analysis.score)),
        ].join('\n'));
    };
};
