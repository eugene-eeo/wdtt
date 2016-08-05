var punct = /[!"\#$%&'()*+,\-./:;<=>?@\[\\\]^_`{|}~]/g;

module.exports = function(text) {
    return 50 * text.replace(punct, '').length;
};
