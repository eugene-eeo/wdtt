module.exports = function(text) {
    // words per minute
    var wpm = 230;
    var spaces = /\W+/g;
    var words = text.split(spaces).length;
    return Math.ceil((words / wpm) * 60) + 0.5;
};
