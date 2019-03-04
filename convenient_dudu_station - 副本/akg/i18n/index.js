var text;
var i18n = {

    getLocaleText: function () {
        var deferred = Deferred();
        var that = this;
        var type = navigator.appName;
        var lang;
        if (type == "Netscape") {
            lang = navigator.language;
        }
        else {
            lang = navigator.userLanguage;
        }
        lang = lang.substr(0, 2)
        if (lang == "zh") {
            text = require('./zh-CN');
        }
        else {
            text = require('./en');

        }
        // deferred.resolve(text);
        // deferred.reject();
        // return deferred.promise;
        return text
    },

};

module.exports = i18n;