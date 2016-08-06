var chalk = require('chalk');
var blessed = require('blessed');


module.exports = class Title {
    constructor(screen) {
        this.elem = blessed.Text({height: 1});
        screen.append(this.elem);
    }

    render(queries) {
        var pre = queries.length > 1
            ? 'Queries:'
            : 'Query:';
        var qs = queries
            .map(str => chalk.inverse(' ' + str + ' '))
            .join(' ');
        this.elem.setContent(chalk.bold(pre) + ' ' + qs);
        this.elem.setContent(
            this.elem.border
        );
    }
}
