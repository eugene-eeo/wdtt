module.exports = function atMost(max, buffer) {
    buffer = (buffer || []).slice(-max);
    var exceed = false;
    var length = buffer.length;

    function push(datum) {
        exceed = exceed || (++length > max);
        if (exceed) {
            buffer.shift();
        }
        buffer.push(datum);
        return buffer;
    }

    push.resize = function(size) {
        return atMost(size, buffer);
    };
    return push;
};
