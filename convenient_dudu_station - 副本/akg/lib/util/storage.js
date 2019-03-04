/**
 * Created by brave on 17/5/9.
 */
var cookie = {
    setCookie: function(key, value) {
        key = escape(value);
        document.cookie = key + "=" + value;
    },
    getCookie: function(name) {
        var arr,
            reg = new RegExp("(^| )" + name + "=([^;]*)(;|$)");
        if ((arr = document.cookie.match(reg))) return unescape(arr[2]);
        else return null;
    },
    delCookie: function(name) {
        var exp = new Date();
        exp.setTime(exp.getTime() - 1);
        var cval = this.getCookie(name);
        if (cval != null)
            document.cookie =
                name + "=" + cval + ";expires=" + exp.toGMTString();
    }
};



var object = {
    storage:function(key,value){
        if(arguments.length === 1){
            if(localStorage){
                return localStorage.getItem(key);
            }else{
                return cookie.getCookie(key);
            }
        }else{
            if(localStorage){
                localStorage.setItem(key,value);
            }else{
                cookie.setCookie(key,value);
            }
        }
    },
    delStorage:function(key){
        if(localStorage){
            localStorage.removeItem(key,value);
        }else{
            cookie.delCookie(key,value);
        }
    }
};

module.exports = object;
