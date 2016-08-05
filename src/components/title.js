var chalk = require('chalk');
var blessed = require('blessed');


module.exports = function(screen, queries) {
    var pre = queries.length > 1
        ? 'Queries:'
        : 'Query:';
    var qs = queries
        .map(str => chalk.inverse(' ' + str + ' '))
        .join(' ');

    screen.append(blessed.Text({
        content: chalk.bold(pre) + ' ' + qs,
    }));
    return function() {};
};
