var layout = require('../layout');


function stack(...rows) {
    return layout.stack(rows);
}


function row(...components) {
    return layout.row(components.map(c => c.elem));
}


function renderThese(components) {
    return data => components.forEach(c => c.render(data));
}


module.exports = {
    row,
    stack,
    renderThese,
};
