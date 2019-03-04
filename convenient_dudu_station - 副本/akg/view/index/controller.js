var commonService = require('../../lib/commonService');
var service = require('./service');
var classification_lib_list = require('../../lib/dic/classification_list');
var net = require('../../network/network');
//GEN_dependences
// var post_sort1 = require('./../commodity_list/controller');
var vm = avalon.define({
    $id: "vm",
    img_logo: require('./img/3.jpg'),
    img_logo1: require('./img/1.jpg'),
    img_logo2: require('./img/1.jpg'),
    img_logo3: require('./img/1.jpg'),
    img_logo4: require('./img/1.jpg'),
    blind_1: require('./img/blind_1.jpg'),
    blind_2: require('./img/blind_2.png'),
    blind_3: require('./img/blind_3.jpg'),
    small_1: require('./img/small_1.png'),
    small_2: require('./img/small_2.png'),
    small_3: require('./img/small_3.png'),
    small_4: require('./img/small_4.png'),
    width: 1920,


    classification_list: classification_lib_list,
    recommend_commodity: [],
    field: false,//字段传给商品列表的
    user: '请登录',


    commodity_name1: '商品标题',
    commodity_description1: '商品描述..................................................',
    price1: '99',
    original_price1: '原价xxx',
    old_new1: '  8成新',
    want1: '8',

    commodity_name2: '商品标题',
    commodity_description2: '商品描述....................................................',
    price2: '99',
    original_price2: '原价xxx',
    old_new2: '  8成新',
    want2: '8人想买',

    commodity_name3: '商品标题',
    commodity_description3: '商品描述...................................................',
    price3: '99',
    original_price3: '原价xxx',
    old_new3: '  8成新',
    want3: '8人想买',

    commodity_name4: '商品标题',
    commodity_description4: '商品描述.................................................',
    price4: '99',
    original_price4: '原价xxx',
    old_new4: '  8成新',
    want4: '8人想买',
    srcurl: 'http://dududu.soarteam.cn',//图片的前缀


    //region 组件数据

    //GEN_properties

    //endregion

    //region 主要数据

    //endregion 主要数据

    //region 主逻辑

    //endregion 主逻辑

    //region 组件逻辑

    //GEN_actions

    //endregion


    //region 校验逻辑

    //endregion
    setWidth: function () {
        vm.width = window.screen.width;
        $(".container").css("width", vm.width);
    },
    ldie: function () {
        window.location.href = 'ReleaseGoods.html';
    },

    //region 数据监听
    serach_click: function () {
        var value_id = $('#form_control').val();
        vm.field = true;
        localStorage.setItem('Commodity_information', value_id);
        localStorage.setItem('field', vm.field);
        window.location.href = "commodity_list.html";
    },
    // blind_click: function () {
    //     // alert(222);
    // },
    dormitory: function () {
        alert(1);
    },
    brand: function () {
        alert(1);
    },
    skin: function () {
        alert(1);
    },
    book: function () {
        alert(1);
    },
    hot_commodity: function (id) {
        var code = localStorage.getItem('code');
        if (code == 200) {
            localStorage.setItem("id", id);
            localStorage.setItem('sellerid',id);
            window.location.href = "commodity_details.html";
        }
        else {
            $('#myModal').modal("show");
            alert("请登录！");
        }
    },
    button_collection: function (e) {
        e.stopPropagation();//阻止父点击事件触发
        alert(123456);
    },


    //   分类事件
    post_sort1: require('./../commodity_list/controller'),
    mask_school_book: function () {
        var id = 1;
        localStorage.setItem('test', id);
        window.location.href = "commodity_list.html";
    },
    mask_school_dormitory: function () {
        var id = 5;
        localStorage.setItem('test', id);
        window.location.href = "commodity_list.html";
    },
    mask_life: function () {
        var id = 4;
        localStorage.setItem('test', id);
        window.location.href = "commodity_list.html";
    },
    mask_school_brand: function () {
        var id = 2;
        localStorage.setItem('test', id);
        window.location.href = "commodity_list.html";
    },


    bindListeners: function () {


        $("#img_book").mouseover(function () {
            $(".div_text1").css("display", "block");
            $(".div_text1").css("z-index", "2");

        }),
            $(".div_text1").mouseout(function () {
                $(".div_text1").css("display", "none");
                $(".div_text1").css("z-index", "-1");
            }),


            $("#img_dormitory").mouseover(function () {
                $(".div_text2").css("display", "block");
                $(".div_text2").css("z-index", "2");
            });
        $(".div_text2").mouseout(function () {
            $(".div_text2").css("display", "none");
            $(".div_text2").css("z-index", "-1");
        });


        $("#img_healthcare").mouseover(function () {
            $(".div_text3").css("display", "block");
            $(".div_text3").css("z-index", "2");
        });
        $(".div_text3").mouseout(function () {
            $(".div_text3").css("display", "none");
            $(".div_text3").css("z-index", "-1");
        });


        $("#img_new").mouseover(function () {
            $(".div_text4").css("display", "block");
            $(".div_text4").css("z-index", "2");
        });
        $(".div_text4").mouseout(function () {
            $(".div_text4").css("display", "none");
            $(".div_text4").css("z-index", "-1");
        });


        post_recommend_six(function (data) {
            vm.recommend_commodity = data.data;
            for (var i = 0; i< vm.recommend_commodity.length;i++){
                vm.recommend_commodity[i].product[0].icon = vm.recommend_commodity[i].product[0].icon.split(',')[0];
            }

            // vm.commodity_name1 = vm.recommend_commodity[0].name;
            console.log(vm.recommend_commodity);
        });


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
                    localStorage.setItem("user_id", data.data.userinfo.id);
                    localStorage.setItem("user_img", data.data.userinfo.avatar);

                    $('#myModal').modal('hide');
                    localStorage.setItem("history_1", "");
                    localStorage.setItem("history_2", "");
                    localStorage.setItem("history_3", "");
                    localStorage.setItem("history_4", "");
                    localStorage.setItem("history_5", "");
                    localStorage.setItem("history_6", "");
                    localStorage.setItem("history_7", "");
                    localStorage.setItem("history_8", "");
                    localStorage.setItem("history_9", "");
                }
                else {
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


        //GEN_listeners
    },

    //endregion 数据监听

});

vm.bindListeners();
vm.setWidth();

// 热门搜索商品
function post_recommend_six(callback) {
    var that = this;
    var token = localStorage.getItem("token");
    $.ajax({
        url: 'http://dududu.soarteam.cn/market/api/product/most',
        type: 'get',
        contentType: "application/json; charset=utf-8",
        dataType: "json",
        headers: {
            'Authorization': token,

        },
        //data为所需数据，具体什么数据可看前端文档或者自行查看
        //data: JSON.stringify({userName:"201610098211",passWord:"admin"}),
    }).success(function (data) {
        // console.log(data);
        callback(data);
    }).error(function (data) {
        console.log(data)
    });
};

// 判断是否登录
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

//GEN_run
