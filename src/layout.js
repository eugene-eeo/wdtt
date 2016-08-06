function layout(rows) {
    for (var row of rows) {
        row.elems.forEach((elem, i) => {
            elem.position.top = row.top;
            elem.position.left = row.offsets[i];
        });
    }
}


layout.row = function(elems) {
    var height = 0;
    var widthSum = 0;
    var offsets = [];
    for (var e of elems) {
        height = Math.max(height, e.height);
        offsets.push(widthSum);
        widthSum += e.width;
    }
    return {
        top:     0,
        elems:   elems,
        offsets: offsets,
        height:  height,
    };
};


layout.stack = function(rows) {
    var top = 0;
    for (var row of rows) {
        row.top = top;
        top += row.height;
    }
    return rows;
};


module.exports = layout;
