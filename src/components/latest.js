var chalk = require('chalk');
var blessed = require('blessed');
var readingTime = require('../utils/reading-time');
var formatTweet = require('../utils/format-tweet');


module.exports = class Latest {
    constructor(screen) {
        this.latest = null;
        this.elem = blessed.Box({
            width: '100%',
            padding: {left: 1, right: 1},
            content: 'Hang on a moment...',
            border: { type: 'line' },
        });
        var display = () => {
            var seconds = 1;
            if (this.latest) {
                seconds = readingTime(this.latest.text);
                this.elem.setContent([
                    chalk.bold('Latest'),
                    formatTweet(this.latest),
                ].join('\n'));
                this.latest = null;
            }
            setTimeout(display, seconds * 1000);
        };
        screen.append(this.elem);
        display();
    }

    render(res) {
        if ('retweeted_status' in res.tweet) return;
        this.latest = res.tweet;
    };
};
