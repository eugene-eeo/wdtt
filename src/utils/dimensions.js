module.exports = function(elem) {
    var padding = elem.padding;
    var border  = elem.border;
    var width = elem.width
        - padding.left
        - padding.right
        - (border.left ? 1 : 0)
        - (border.right ? 1 : 0);
    var height = elem.width
        - padding.top
        - padding.bottom
        - (border.top ? 1 : 0)
        - (border.bottom ? 1 : 0);
    return {
        width:  width,
        height: height,
    };
};
