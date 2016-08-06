var blessed = require('blessed');
var Twitter = require('node-tweet-stream');
var makeAnalyser = require('../src/data');

var Title   = require('../src/components/title');
var Summary = require('../src/components/summary');
var Latest  = require('../src/components/latest');
var Worst   = require('../src/components/worst');
var Best    = require('../src/components/best');

var {renderThese, row} = require('../src/utils/sugar');
var layout = require('../src/layout');

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
    });

    var title   = new Title(screen);
    var summary = new Summary(screen);
    var best    = new Best(screen);
    var worst   = new Worst(screen);
    var latest  = new Latest(screen);

    var render = renderThese([
        summary,
        best,
        worst,
        latest,
    ]);

    var resize = () => {
        layout(layout.stack([
            row(title),
            row(summary),
            row(best, worst),
            row(latest),
        ]));
    };

    title.render(queries);
    resize();
    screen.on('resize', resize);
    screen.render();
    screen.key(['C-c'], (ch, key) => {
        stream.abort();
        process.exit(0);
    });

    queries.forEach(query => stream.track(query));
    stream.on('tweet', tweet => {
        render(analyse(tweet));
        screen.render();
    });
};
