/**
 * Created by brave on 17/3/28.
 */

var config = require('../config/config');
var recommend_commodity = [];
var land = [];
var object = {
    pr:100,
    collect:1,
    name:'',
    commodity_id:2,
    user:'',
    stock:'5',
    icon:'',
    dataall:'',
    dataallsell:'',


    number:'',
    collectNum:'',
    time:'',
    recommend_commodity:recommend_commodity,
    land:land,
    description:'',

    post: function (interfaceName, data) {
        var deferred = Deferred();
        showLoading();
        $.ajax({
            url: config.host + config.appName + "/" + interfaceName,
            type: 'post',
            timeout: 180000,
            data: data,
            dataType: 'json',
            success: function (data) {
                deferred.resolve(data);
            },
            error: function (res, error) {
                deferred.reject(res);
            }
        });
        return deferred.promise
    },
    postFile: function (interfaceName, data) {
        var deferred = Deferred();
        // var url = config.backendUrl + interfaceName;
        var url = config.host + config.appName + "/" + interfaceName;
        $.ajax({
            url: url,
            type: 'POST',
            cache: false,
            dataType: 'json',
            data: data,
            processData: false,
            contentType: false,
            timeout: 180000,
            complete: function () {
            }
        }).done(function (data) {
            alert("success")
        }).fail(function (data) {
            alert("error")
        });
        return deferred.promise
    },
    postFile2: function (interfaceName, data) {
        var deferred = Deferred();
        var url = config.backendUrl + interfaceName;
        // var url = config.host + config.appName + "/" + interfaceName;
        avalon.log(url)
        $.ajax({
            url: url,
            type: 'post',
            timeout: 180000,
            data: data,
            dataType: 'json',
            success: function (data) {
                deferred.resolve(data);
            },
            error: function (res, error) {
                deferred.reject(res);
            }
        });
        return deferred.promise
    },
    posttest: function () {
        var that = this;
        var url = 'http://dududu.soarteam.cn/market/api/product/' + object.commodity_id;
        var token = localStorage.getItem("token");
        $.ajax({
            url: url,
            type: 'get',
            contentType:"application/json; charset=utf-8",
            dataType:"json",
            id:2,
            headers:{
              'Authorization':token
            },
            //data为所需数据，具体什么数据可看前端文档或者自行查看
            //data: JSON.stringify({userName:"201610098211",passWord:"admin"}),
        }).success(function (data) {
            //给自己定义的变量test赋值
            // setTimeout(function () {
            //     object.pr = data.code;
            // },3000);
            object.pr = data.code;
            object.collect = data.data[0].state;
            object.name = data.data[0].name;
            object.commodity_id = data.data[0].id;
            object.user = data.data[0].user[0].name;
            object.stock = data.data[0].storage;
            object.icon = data.data[0].icon;
            //查看从数据库得到的数据
            console.log(data);
        }).error(function (data) {
            console.log(data)
        });
    },

    postuser: function (name,password,callback) {
        var that = this;
        $.ajax({
            // url:'http://localhost:8080/api/user/1',
            url:'http://dududu.soarteam.cn/market/api/user',
            method:'post',
            contentType: "application/json; charset=utf-8",
            dataType:"json",
            data:JSON.stringify({userName:name,passWord:password})
        }).success(function (data) {
            object.land = data;
            console.log(data);
            callback(data);
        }).error(function (data) {
            console.log(data)
        });
    },

    posttestbuy: function (callback,id) {
        var that = this;
        var token = localStorage.getItem("token");
        $.ajax({
            url: 'http://dududu.soarteam.cn/market/api/order/'+id,
            type: 'get',
            contentType: "application/json; charset=utf-8",
            dataType: "json",
            id: 100,
            headers: {
                'Authorization': token
            },
        }).success(function (data) {
            //  object.number=data.data[0].number;
            //   object.collectNum = data.data[0].productInfo[0].collectNum;
            //   object.name = data.data[0].productInfo[0].name;
            //   object.pr = data.data[0].productInfo[0].price;
            //   object.user = data.data[0].productInfo[0].user[0].name;
            // // // object.stock = data.data[0].browseNum;
            //   //object.icon = data.data[0].productInfo[0].icon;
            //   object.time=data.data[0].time;
            object.dataall = data.data;
            callback(data.data);
            //object.dataallsell=data.data.sell;
            //console.log(object.dataall)
            //console.log(object.dataallsell)
            //alert(123)


        }).error(function (data) {
            console.log(1)
        });

    }, posttestinf: function (callback) {
        var that = this;
        var token = localStorage.getItem("token");
        $.ajax({
            url: 'http://dududu.soarteam.cn/market/api/order/1',
            type: 'get',
            contentType: "application/json; charset=utf-8",
            dataType: "json",
            id: 100,
            headers: {
                'Authorization': token
            },
        }).success(function (data) {

            object.dataall = data.data;
            callback(data.data);
            //object.dataallsell=data.data.sell;
            //console.log(object.dataall)
            //console.log(object.dataallsell)

        }).error(function (data) {
            console.log(1)
        });

    }, posttestcollect: function (callback,id) {
        var that = this;
        var token = localStorage.getItem("token");
        $.ajax({
            url: 'http://dududu.soarteam.cn/market/api/collect/'+id,
            type: 'get',
            contentType: "application/json; charset=utf-8",
            dataType: "json",
            id: 100,
            headers: {
                'Authorization': token
            },
        }).success(function (data) {

            object.dataall = data.data;
            callback(data.data);
            //object.dataallsell=data.data.sell;
            console.log(object.dataall)
            //console.log(object.dataallsell)

        }).error(function (data) {
            console.log(1)
        });

    },
    posttestEssential_information: function (callback,id) {
        var that = this;
        var token = localStorage.getItem("token");
        $.ajax({
            url: 'http://dududu.soarteam.cn/market/api/user/'+id,
            type: 'get',
            contentType: "application/json; charset=utf-8",
            dataType: "json",
            id: 100,
            headers: {
                'Authorization': token
            },
        }).success(function (data) {

            object.dataall = data.data;
            callback(data.data);

        }).error(function (data) {
            console.log(1)
        });

    },
    post_recommend: function (callback) {
        var that = this;
        var token = localStorage.getItem("token");
        $.ajax({
            url: 'http://dududu.soarteam.cn/market/api/product',
            type: 'get',
            contentType: "application/json; charset=utf-8",
            dataType: "json",
            headers: {
                'Authorization': token,

            },
            //data为所需数据，具体什么数据可看前端文档或者自行查看
            //data: JSON.stringify({userName:"201610098211",passWord:"admin"}),
        }).success(function (data) {
            object.recommend_commodity = data;
            var data1 = data;
            for (var i=0;i<data.data.length;i++){
                data1.data[i].icon = data1.data[i].icon.split(',')[0];
            }
            callback(data1);
        }).error(function (data) {
            console.log(data)
        });
    },

    // 关注商品
    love_commodity: function(callback,id) {
    var that = this;
    var str = 'http://dududu.soarteam.cn/market/api/collect';
    var user_id = localStorage.getItem('user_id');
    var token = localStorage.getItem("token");
    $.ajax({
        url: str,
        type: 'post',
        contentType: "application/json; charset=utf-8",
        dataType: "json",
        data:JSON.stringify({productId:id,userId:user_id}),
        headers: {
            'Authorization': token
        },
    }).success(function (data) {
        callback(data);
    }).error(function (data) {
        console.log(1)
    });
},

// 取消关注商品
cancellove_commodity :function(callback,id) {
    var that = this;
    var user_id = localStorage.getItem('user_id');
    var str = 'http://dududu.soarteam.cn/market/api/collect/' + user_id + '/' + id;
    var token = localStorage.getItem("token");
    $.ajax({
        url: str,
        type: 'put',
        contentType: "application/json; charset=utf-8",
        dataType: "json",
        headers: {
            'Authorization': token
        },
    }).success(function (data) {
        callback(data);
    }).error(function (data) {
        console.log(1)
    });
},
};


module.exports = object;
