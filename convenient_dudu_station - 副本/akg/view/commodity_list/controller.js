var commonService = require('../../lib/commonService');
var service = require('./service');
var classification_lib_list = require('../../lib/dic/classification_list');
var net = require('../../network/network');
var sort_first = require('./../../lib/sort/sort_first');
var sort_second_study = require('./../../lib/sort/sort_second_study');
var sort_second_clothes = require('./../../lib/sort/sort_second_clothes');
var sort_second_electronics = require('./../../lib/sort/sort_second_electronics');
var sort_second_life = require('./../../lib/sort/sort_second_life');
var sort_second_skill = require('./../../lib/sort/sort_second_skill');

//GEN_dependences
var vm = avalon.define({
    $id: "vm",
    classification_list: classification_lib_list,
    img_logo: require('./img/3.jpg'),
    img_logo1: require('./img/1.jpg'),
    test: '',
    user: '请登录',
    //region 组件数据

    srcurl: 'http://dududu.soarteam.cn',
    price: '9599.00',
    name: '苹果iPhone',
    user_name: '张三',
    icon: '',

    commodity_all: [],
    flag: true,
    single_title: '学习用品',
    sorts: sort_first,
    sorts0: sort_first,
    sorts1: sort_second_study,
    sorts2: sort_second_electronics,
    sorts3: sort_second_skill,
    sorts4: sort_second_life,
    sorts5: sort_second_clothes,
    //GEN_properties

    //该方法出现了冗余
    sortF: function (i, id) {
        if (vm.flag) {
            if (i == 0) {
                vm.post_sort(function (data) {
                    vm.commodity_all = data.data;
                }, id);
                vm.sorts = vm.sorts1;
                $('.sors_title').css('display', 'block');
                vm.single_title = vm.sorts0[0].value;
                vm.flag = false;
            }
            else if (i == 1) {
                vm.post_sort(function (data) {
                    vm.commodity_all = data.data;
                }, id);
                vm.sorts = vm.sorts2;
                $('.sors_title').css('display', 'block');
                vm.single_title = vm.sorts0[1].value;
                vm.flag = false;
            }
            else if (i == 2) {
                vm.post_sort(function (data) {
                    vm.commodity_all = data.data;
                }, id);
                vm.sorts = vm.sorts3;
                $('.sors_title').css('display', 'block');
                vm.single_title = vm.sorts0[2].value;
                vm.flag = false;
            }
            else if (i == 3) {
                vm.post_sort(function (data) {
                    vm.commodity_all = data.data;
                }, id);
                vm.sorts = vm.sorts4;
                $('.sors_title').css('display', 'block');
                vm.single_title = vm.sorts0[3].value;
                vm.flag = false;
            }
            else if (i == 5) {
                vm.post_sort(function (data) {
                    vm.commodity_all = data.data;
                }, id);
                $('.content_title:eq(5)').css("background-color", "rgba(24, 144, 255, 1)");
            }
            else {
                vm.post_sort(function (data) {
                    vm.commodity_all = data.data;
                }, id);
                vm.sorts = vm.sorts5;
                $('.sors_title').css('display', 'block');
                vm.single_title = vm.sorts0[4].value;
                vm.flag = false;
            }
        }
        else {
            vm.post_sort(function (data) {
                vm.commodity_all = data.data;
            }, id);

            var str = '.content_title:eq(' + i + ')';
            $('.content_title').css("background-color", "white");
            $(str).css("background-color", "rgba(24, 144, 255, 1)");
        }

    },

    hot_commodity: function (id) {
        var code = localStorage.getItem('code');
        if (code == 200) {
            localStorage.setItem("id", id);
            window.location.href = "commodity_details.html";
        }
        else {
            $('#myModal').modal("show");
            alert("请登录！");
        }
    },
    //endregion

    //region 主要数据

    //endregion 主要数据

    //region 主逻辑

    //endregion 主逻辑

    //region 组件逻辑

    //GEN_actions
    posttestquery: function (callback, commodity, field) {
        var that = this;
        var token = localStorage.getItem("token");
        $.ajax({
            url: 'http://dududu.soarteam.cn/market/api/product/fuzzy',
            type: 'POST',
            contentType: "application/json; charset=utf-8",
            dataType: "json",
            id: 100,
            data: JSON.stringify({name: commodity}),
            headers: {
                'Authorization': token
            },
        }).success(function (data) {
            console.log(data);
            callback(data);
        }).error(function (data) {
            console.log(1)
        });
    },

    // 分类查询
    post_sort: function (callback, id) {
        var that = this;
        var str = 'http://dududu.soarteam.cn/market/api/product/category/' + id;
        var token = localStorage.getItem("token");
        $.ajax({
            url: str,
            type: 'GET',
            contentType: "application/json; charset=utf-8",
            dataType: "json",
            id: 100,
            headers: {
                'Authorization': token
            },
        }).success(function (data) {
            var data1 = data;
            for (var i = 0; i < data.data.length; i++) {
                data1.data[i].icon = data1.data[i].icon.split(',')[0];
            }
            callback(data1);
        }).error(function (data) {
            console.log(1)
        });
    },

    //endregion

    //region 校验逻辑
    field: false,//字段传给商品列表的
    serach_click: function () {
        var value_id = $('#form_control').val();
        vm.field = true;
        localStorage.setItem('Commodity_information', value_id);
        localStorage.setItem('field', vm.field);
        window.location.href = "commodity_list.html";
        // alert(value_id);
    },

    //endregion

    //region 数据监听
    bindListeners: function () {
        vm.posttestquery(function (data) {
            if (vm.field == 'true') {
                vm.commodity_all = data.data;
            }
            else {
                vm.field = false;
            }
        }, vm.Commodity_information, vm.field);


        $('#sort_close').click(function () {
            $('.sors_title').css('display', 'none');
            vm.sorts = vm.sorts0;
            vm.flag = true;
            $('.content_title').css("background-color", "white");
            net.post_recommend(function (data) {
                vm.commodity_all = data.data;


                var height = $('#commodity_all').outerHeight();
                console.log(height);
                if (height > 1550) {
                    $('#commodity_all').css("overflow", "scroll");
                    $('#commodity_all').css("height", "1480px");
                }
            });

        });
        if (vm.field == 'false') {
            net.post_recommend(function (data) {
                vm.commodity_all = data.data;
                var height = $('#commodity_all').outerHeight();
                console.log(height);
                if (height > 1550) {
                    $('#commodity_all').css("overflow", "scroll");
                    $('#commodity_all').css("height", "1480px");
                }
            });
        }
        localStorage.setItem('field', 'false');
        //GEN_listeners

        // 登录验证
        $('#land').click(function (data) {
            var username = $('#username').val();
            var password = $('#password').val();
            net.postuser(username, password, function (data) {
                if (data.code == 200) {
                    vm.user = data.data.userinfo.name;
                    localStorage.setItem("token", data.data.token);
                    localStorage.setItem("code", 200);
                    localStorage.setItem("name", vm.user);
                    localStorage.setItem("id", data.data.userinfo.id);
                    $('#myModal').modal('hide');
                }
                else {
                    alert("账号密码有误，请重新输入！");
                }
            });
            // callback(net.land);
        });


        // 登录状态与未登录状态
        $('.user').mouseover(function () {
            judge();
        });
        $('.hidden_div').mouseover(function () {
            judge();
        });
        var code = localStorage.getItem('code');
        if (code == 200)
            vm.user = localStorage.getItem('name');

        // 商品列表跳转
        $('.home1').click(function () {
            window.location.href = 'commodity_list.html';
        });
        // 首页跳转
        $('.home').click(function () {
            window.location.href = 'index.html';
        });
        // 发布闲置跳转
        $('.home2').click(function () {
            window.location.href = 'ReleaseGoods.html';
        });


        //首页的分类查询

        var a1 = localStorage.getItem('test');
        var fenid = parseInt(a1);

        if (a1 == '1' || a1 == '5' || a1 == '4' || a1 == '2') {
            // alert(a1);
            vm.post_sort(function (data) {
                // console.log(data)
                vm.commodity_all = data.data;
            }, fenid);
            localStorage.setItem('test','0');
        }


    },


    //endregion 数据监听

});
vm.dataid = localStorage.getItem('id');
vm.Commodity_information = localStorage.getItem('Commodity_information');
vm.field = localStorage.getItem('field');
vm.bindListeners();
//GEN_run


// 登录框的
function judge() {
    var code = localStorage.getItem('code');
    if (code == 200) {
        $('.hidden_div').css("display", "block");
        $('.hidden_div').mouseover(function () {
            $('.select_informations').css("display", "block");
        });
        $('.hidden_div').mouseout(function () {
            $('.select_informations').css("display", "none");
        });
        // 出现冗余
        $('.select_informations div:eq(0)').mouseover(function () {
            for (var i = 1; i <= 6; i++) {
                var str = '#' + i;
                $(str).css("background-color", "white");
            }
            $('#1').css("background-color", "rgba(73,101,247,0.4)");
            $('.select_informations').css("display", "block");
        });
        $('.select_informations div:eq(1)').mouseover(function () {
            for (var i = 1; i <= 6; i++) {
                var str = '#' + i;
                $(str).css("background-color", "white");
            }
            $('#2').css("background-color", "rgba(73,101,247,0.4)");
            $('.select_informations').css("display", "block");
        });
        $('.select_informations div:eq(2)').mouseover(function () {
            for (var i = 1; i <= 6; i++) {
                var str = '#' + i;
                $(str).css("background-color", "white");
            }
            $('#3').css("background-color", "rgba(73,101,247,0.4)");
            $('.select_informations').css("display", "block");
        });
        $('.select_informations div:eq(4)').mouseover(function () {
            for (var i = 1; i <= 6; i++) {
                var str = '#' + i;
                $(str).css("background-color", "white");
            }
            $('#5').css("background-color", "rgba(73,101,247,0.4)");
            $('.select_informations').css("display", "block");
        });
        $('.select_informations div:eq(3)').mouseover(function () {
            for (var i = 1; i <= 6; i++) {
                var str = '#' + i;
                $(str).css("background-color", "white");
            }
            $('#4').css("background-color", "rgba(73,101,247,0.4)");
            $('.select_informations').css("display", "block");
        });
        $('.select_informations div:eq(5)').mouseover(function () {
            for (var i = 1; i <= 6; i++) {
                var str = '#' + i;
                $(str).css("background-color", "white");
            }
            $('#6').css("background-color", "rgba(73,101,247,0.4)");
            $('.select_informations').css("display", "block");
        });
        $('.select_informations div:eq(0)').mouseout(function () {
            $('#1').css("background-color", "white");
        });
        $('.select_informations div:eq(1)').mouseout(function () {
            $('#2').css("background-color", "white");
        });
        $('.select_informations div:eq(2)').mouseout(function () {
            $('#3').css("background-color", "white");
        });
        $('.select_informations div:eq(3)').mouseout(function () {
            $('#4').css("background-color", "white");
        });
        $('.select_informations div:eq(4)').mouseout(function () {
            $('#5').css("background-color", "white");
        });
        $('.select_informations div:eq(5)').mouseout(function () {
            $('#6').css("background-color", "white");
        });

        // $('.user').mouseover(function () {
        //     $('.select_informations').css("display","block");
        // });
        $('.select_informations').mouseout(function () {
            $('.select_informations').css("display", "none");
        });
        // $('.user').mouseout(function () {
        //     $('.select_informations').css("display","none");
        // });
        $('#1').click(function () {
            window.location.href = "user_info.html";
        });
        $('#2').click(function () {
            window.location.href = "my_order.html";
        });
        $('#3').click(function () {
            window.location.href = "showpping_trolly.html";
        });
        $('#4').click(function () {
            window.location.href = "my_follow.html";
        });
        $('#5').click(function () {
            window.location.href = "Essential_information.html";
        });
        $('#6').click(function () {
            localStorage.setItem("code", 500);
            localStorage.setItem("token", 500);
            vm.user = '请登录';
        });
    }
    else {
        $('.hidden_div').css("display", "none");

    }
}

console.log(1);
