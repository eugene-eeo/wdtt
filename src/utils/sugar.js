var layout = require('../layout');
module.exports = function row(...components) {
    return layout.row(components.map(c => c.elem));
};
