var blessed = require('blessed');
var Twitter = require('node-tweet-stream');

var makeAnalyser = require('../src/data');


module.exports = function program(queries) {
    var stream = new Twitter({
        consumer_key:    process.env.CONSUMER_KEY,
        consumer_secret: process.env.CONSUMER_SECRET,
        token:           process.env.ACCESS_TOKEN,
        token_secret:    process.env.ACCESS_SECRET,
    });

    var analyse = makeAnalyser();
    var screen = blessed.screen({
        smartCSR: true,
        fullUnicode: true,
    });

    var title   = require('../src/components/title')(screen, queries);
    var summary = require('../src/components/summary')(screen);
    var latest  = require('../src/components/latest')(screen);
    var worst   = require('../src/components/worst')(screen);
    var best    = require('../src/components/best')(screen);

    screen.render();
    screen.key(['C-c', 'Q'], (ch, key) => {
        stream.abort();
        process.exit(1);
    });

    queries.forEach(query => stream.track(query));
    stream.on('tweet', tweet => {
        var r = analyse(tweet);
        title();
        summary(r);
        worst(r);
        best(r);
        latest(r);
        screen.render();
    });
};
