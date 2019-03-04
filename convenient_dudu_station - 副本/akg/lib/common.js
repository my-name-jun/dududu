require('../bower_components/avalon/deferred');

require('../bower_components/bootstrap/dist/css/bootstrap.min.css');
require('../bower_components/bootstrap/dist/js/bootstrap.min');
//
//require('../bower_components/bootstrap/js/modal');
//require('../bower_components/bootstrap/js/dropdown');
//
require('../bower_components/bootstrap-datetimepicker/css/bootstrap-datetimepicker.min.css');
require('../bower_components/bootstrap-datetimepicker/js/bootstrap-datetimepicker');
require('../bower_components/bootstrap-datetimepicker/js/locales/bootstrap-datetimepicker.zh-CN');
require('../view/ReleaseGoods/lib/cropper/js/cropper')
// require('https://cdnjs.cloudflare.com/ajax/libs/sockjs-client/1.1.4/sockjs.min.js')
// require('https://cdnjs.cloudflare.com/ajax/libs/stomp.js/2.3.3/stomp.min.js')


window.flog = require('./dic/log');

window.console = window.console || (function () {
    var c = {};
    c.log = c.warn = c.debug = c.info = c.error = c.time = c.dir = c.profile = c.clear = c.exception = c.trace = c.assert = function () {
    };
    return c;
})();

$.fn.datetimepicker.dates['zh-CN'] = {
    days: ["星期日", "星期一", "星期二", "星期三", "星期四", "星期五", "星期六", "星期日"],
    daysShort: ["周日", "周一", "周二", "周三", "周四", "周五", "周六", "周日"],
    daysMin: ["日", "一", "二", "三", "四", "五", "六", "日"],
    months: ["一月", "二月", "三月", "四月", "五月", "六月", "七月", "八月", "九月", "十月", "十一月", "十二月"],
    monthsShort: ["一月", "二月", "三月", "四月", "五月", "六月", "七月", "八月", "九月", "十月", "十一月", "十二月"],
    today: "今天",
    suffix: [],
    meridiem: ["上午", "下午"]
};

$("body").css("font-family", "Microsoft YaHei");

var config = require('../config/config');

if (config.env != 'prd') {
    try {
        eruda.init()
    } catch (e) {
    }
}
