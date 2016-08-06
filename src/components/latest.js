var chalk = require('chalk');
var blessed = require('blessed');
var readingTime = require('../utils/reading-time');
var formatTweet = require('../utils/format-tweet');


module.exports = function(screen) {
    var latest;
    var elem = blessed.Box({
        top:    16,
        height: 10,
        width: '100%',
        padding: {left: 1, right: 1},
        content: 'Hang on a moment...',
        border: { type: 'line' },
    });

    setTimeout(function display() {
        var seconds = 1;
        if (latest) {
            seconds = readingTime(latest.text);
            elem.setContent([
                chalk.bold('Latest'),
                formatTweet(latest),
            ].join('\n'));
            latest = null;
        }
        setTimeout(display, seconds * 1000);
    });

    screen.append(elem);
    return function render(res) {
        if ('retweeted_status' in res.tweet) return;
        latest = res.tweet;
    };
};
