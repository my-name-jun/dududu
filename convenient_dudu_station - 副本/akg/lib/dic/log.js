var rank = 2;
var log = {
    debug: function(msg) {
        if (console && rank >= 2) {
            console.debug("debug:" + msg);
        }
    },
    info: function(msg) {
        if (console && rank >= 1) {
            console.info("info:" + msg);
        }
    },
    err: function(msg) {
        if (console && rank >= 0) {
            console.error("error:" + msg);
        }
    }
};

module.exports = log;
