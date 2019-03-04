var commonService = require('../../lib/commonService');
var service = require('./service');
var net = require('../../network/network');
var classification_lib_list = require('../../lib/dic/classification_list');
//GEN_dependences

var vm = avalon.define({
    $id: "vm",
    //region 组件数据
    classification_list: classification_lib_list,
    img_logo: require('./img/3.jpg'),
    commodity_name:'这是商品名称',
    commodity_price:'1700',
    num_text:'1',
    commodity_price_all:"0.00",
    order_num:0,
    user:'请登录',
    collect_judge:[],
    submit_commodity:[],//提交商品数据

    //GEN_properties

    //endregion

    //region 主要数据
    srcurl: 'http://dududu.soarteam.cn',
    all_shopping_commodity:[],
    input_flag:[{id:0,flag:false}, {id:1,flag:false}, {id:2,flag:false}, {id:3,flag:false}, {id:4,flag:false}, {id:5,flag:false},
        {id:6,flag:false}, {id:7,flag:false}, {id:8,flag:false},{id:9,flag:false}, {id:10,flag:false}, {id:11,flag:false},],
    input_flag_all:false,
    //endregion 主要数据

    //region 主逻辑
    // 分类选择
    checkbox: function (i,price){
        var num1 = parseFloat(vm.commodity_price_all);
        var num2 = parseFloat(price);
        if (vm.input_flag[i].flag == false){
            var sum = (num1 + num2).toFixed(2);
            vm.commodity_price_all = sum;
            vm.input_flag[i].flag = true;
            vm.order_num++;
            $('#submit').css("background-color","red");
        }
        else{
            var ch0 = document.getElementsByName("check_header");
            var ch1 = document.getElementsByName("check_all");
            ch0[0].checked = false;
            ch1[0].checked = false;
            var sum = (num1 - num2).toFixed(2);
            vm.commodity_price_all = sum;
            vm.input_flag[i].flag = false;
            vm.order_num--;
            if (vm.order_num == 0){
                $('#submit').css("background-color","#B0B0B0");
            }
        }
    },
    // 多选框选择
    checkbox_all: function(){
        var num1 = 0;
        if(vm.input_flag_all == false){
          vm.input_flag_all = true;
          var ch = document.getElementsByName("check");
          var ch0 = document.getElementsByName("check_header");
          var ch1 = document.getElementsByName("check_all");
          ch0[0].checked = true;
          ch1[0].checked = true;
          for (var i =0;i<vm.all_shopping_commodity.length;i++){
              ch[i].checked = true;
              vm.input_flag[i].flag = true;
              num1 += parseFloat(vm.all_shopping_commodity[i].price);
          }
          vm.commodity_price_all = num1.toFixm.all_shopping_commodity.length;
            $('#submit').ced(2);
          vm.order_num = vss("background-color","red");
      }
      else{
            vm.input_flag_all = false;
            var ch = document.getElementsByName("check");
            var ch0 = document.getElementsByName("check_header");
            var ch1 = document.getElementsByName("check_all");
            ch0[0].checked = false;
            ch1[0].checked = false;
            for (var i =0;i<vm.all_shopping_commodity.length;i++){
                ch[i].checked = false;
                vm.input_flag[i].flag = false;
            }
            vm.commodity_price_all = "0.00";
            vm.order_num = 0;
            $('#submit').css("background-color","#B0B0B0");
        }

    },

    // 删除购物车订单
    delete_shopping: function(id,index){
        //删除选中多选框的
        var ch = document.getElementsByName("check");
        if (ch[index].checked == true){
            alert("请先取消勾选！");
        }
        else {
            delete_commodity(function () {
                all_showpping(function (data) {
                    vm.all_shopping_commodity = data.data;
                    console.log(vm.all_shopping_commodity);
                });
            },id);
        }

    },


    // 收藏商品
    love: function(index,id){
        var str = '.love span:eq(' + index + ')';
        if (vm.all_shopping_commodity[index].collectFlag == false)
        {
            $(str).css("color","red");
            vm.all_shopping_commodity[index].collectFlag = true;
            alert("关注成功！");
            net.love_commodity(function () {

            },id);
        }
        else
        {
            $(str).css("color","gray");
            vm.all_shopping_commodity[index].collectFlag = false;
            alert("取消关注成功！");
            net.cancellove_commodity(function () {
            },id);
        }
    },


    //endregion 主逻辑

    //region 组件逻辑

    //GEN_actions

    //endregion

    //region 校验逻辑

    //endregion

    //region 数据监听
    bindListeners: function () {

        // 购物车提交事件
    $('#submit').click(function () {
        if(vm.order_num != 0){
            var buy_id = parseInt(localStorage.getItem('user_id'));
            for (var i = 0;i<vm.all_shopping_commodity.length;i++){
                if(vm.input_flag[i].flag == true){
                    vm.submit_commodity.push(
                        {"amount":1, "buyUserId":buy_id,
                            'product_id':vm.all_shopping_commodity[i].id,
                            'sellUserId':vm.all_shopping_commodity[i].user_id}
                    );
                }
            }
            console.log(vm.submit_commodity);
            // 购物车结算
            submit_showpping(function (data) {

            },vm.submit_commodity);
            vm.submit_commodity = [];
            console.log(vm.submit_commodity);
            alert("购买成功！");
            // 更新购物车订单
            all_showpping(function (data) {
                vm.all_shopping_commodity = data.data;
            });
        }
    });

    // 购物车多删除
    $('#delete').click(function () {
        if(vm.order_num != 0) {
            var delete_all = [];
            for (var i = 0; i < vm.all_shopping_commodity.length; i++) {
                if (vm.input_flag[i].flag == true) {
                    delete_all.push(vm.all_shopping_commodity[i].shoppingCartId);
                }
            }
            console.log(delete_all);
            delete_commodity(function () {
                all_showpping(function (data) {
                    vm.all_shopping_commodity = data.data;
                    console.log(vm.all_shopping_commodity);
                });
            },delete_all);
            vm.commodity_price_all = "0.00";
            vm.order_num = 0;

            var ch = document.getElementsByName("check");
            for (var i =0;i<vm.all_shopping_commodity.length;i++){
                ch[i].checked = false;
                vm.input_flag[i].flag = false;
            }
            $('#submit').css("background-color","#B0B0B0");
            var ch0 = document.getElementsByName("check_header");
            var ch1 = document.getElementsByName("check_all");
            ch0[0].checked = false;
            ch1[0].checked = false;
        }
    });

        // 接收数据
        all_showpping(function (data) {
            vm.all_shopping_commodity = data.data;
            for (var i = 0;i < vm.all_shopping_commodity.length;i++){
                var str = '.love span:eq(' + i + ')';
                if (vm.all_shopping_commodity[i].collectFlag == true)
                {
                    $(str).css("color","red");
                }
                else
                {
                    $(str).css("color","gray");
                    }
            }
        });
        //GEN_listeners
        // 提交数据
        // $('#submit').click(function () {
        //
        // });




        // 登录验证
        $('#land').click(function (data) {
            var username = $('#username').val();
            var password = $('#password').val();
            net.postuser(username,password,function (data) {
                if (data.code == 200){
                    vm.user = data.data.userinfo.name;
                    localStorage.setItem("token",data.data.token);
                    localStorage.setItem("code",200);
                    localStorage.setItem("name",vm.user);
                    localStorage.setItem("id",data.data.userinfo.id);
                    $('#myModal').modal('hide');
                }
                else{
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
        if(code == 200)
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


        $('.user').mouseover(function () {
            judge();
        });
        $('.hidden_div').mouseover(function () {
            judge();
        });
        var code = localStorage.getItem('code');
        if(code == 200)
            vm.user = localStorage.getItem('name');

    }


    //endregion 数据监听

});

vm.bindListeners();
//GEN_run
// 显示购物车订单
function all_showpping(callback) {
    var that = this;
    var id = localStorage.getItem("user_id");
    var str = 'http://dududu.soarteam.cn/market/api/collect/findAllShoppingCart/' + id;
    var token = localStorage.getItem("token");
    $.ajax({
        url: str,
        type: 'get',
        contentType: "application/json; charset=utf-8",
        dataType: "json",
        headers: {
            'Authorization': token
        },
    }).success(function (data) {
        console.log(data);
        var data1 = data;
        for (var i=0;i<data.data.length;i++){
            data1.data[i].icon = data1.data[i].icon.split(',')[0];
        }
        callback(data1);

    }).error(function (data) {
        console.log(1)
    });
};

// 删除购物车订单
function delete_commodity(callback,id) {
    var that = this;
    var str = 'http://dududu.soarteam.cn/market/api/collect/delShoppingCart/' + id;
    var token = localStorage.getItem("token");
    $.ajax({
        url: str,
        type: 'DELETE',
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
};

// 购物车结算
function submit_showpping(callback,sub_data) {
    console.log(sub_data);
    var that = this;
    var str = 'http://dududu.soarteam.cn/market/api/collect/insertMultiOrder';
    var token = localStorage.getItem("token");
    $.ajax({
        url: str,
        type: 'post',
        contentType: "application/json; charset=utf-8",
        dataType: "json",
        data:JSON.stringify(sub_data),
        headers: {
            'Authorization': token
        },
    }).success(function (data) {
        callback(data);
    }).error(function (data) {
        console.log(1)
    });
};

// // 关注商品
// function love_commodity(callback,id) {
//     var that = this;
//     var str = 'http://dududu.soarteam.cn/market/api/collect';
//     var user_id = localStorage.getItem('user_id');
//     var token = localStorage.getItem("token");
//     $.ajax({
//         url: str,
//         type: 'post',
//         contentType: "application/json; charset=utf-8",
//         dataType: "json",
//         data:JSON.stringify({productId:id,userId:user_id}),
//         headers: {
//             'Authorization': token
//         },
//     }).success(function (data) {
//         callback(data);
//     }).error(function (data) {
//         console.log(1)
//     });
// };
//
// // 取消关注商品
// function cancellove_commodity(callback,id) {
//     var that = this;
//     var user_id = localStorage.getItem('user_id');
//     var str = 'http://dududu.soarteam.cn/market/api/collect/' + user_id + '/' + id;
//     var token = localStorage.getItem("token");
//     $.ajax({
//         url: str,
//         type: 'put',
//         contentType: "application/json; charset=utf-8",
//         dataType: "json",
//         headers: {
//             'Authorization': token
//         },
//     }).success(function (data) {
//         callback(data);
//     }).error(function (data) {
//         console.log(1)
//     });
// };


// 登录框
function judge() {
    var code = localStorage.getItem('code');
    if (code == 200){
        $('.hidden_div').css("display","block");
        $('.hidden_div').mouseover(function () {
            $('.select_informations').css("display","block");
        });
        $('.hidden_div').mouseout(function () {
            $('.select_informations').css("display","none");
        });
        // 出现冗余
        $('.select_informations div:eq(0)').mouseover(function () {
            for (var i =1;i<=6;i++){
                var str = '#' + i;
                $(str).css("background-color","white");
            }
            $('#1').css("background-color","rgba(73,101,247,0.4)");
            $('.select_informations').css("display","block");
        });
        $('.select_informations div:eq(1)').mouseover(function () {
            for (var i =1;i<=6;i++){
                var str = '#' + i;
                $(str).css("background-color","white");
            }
            $('#2').css("background-color","rgba(73,101,247,0.4)");
            $('.select_informations').css("display","block");
        });
        $('.select_informations div:eq(2)').mouseover(function () {
            for (var i =1;i<=6;i++){
                var str = '#' + i;
                $(str).css("background-color","white");
            }
            $('#3').css("background-color","rgba(73,101,247,0.4)");
            $('.select_informations').css("display","block");
        });
        $('.select_informations div:eq(4)').mouseover(function () {
            for (var i =1;i<=6;i++){
                var str = '#' + i;
                $(str).css("background-color","white");
            }
            $('#5').css("background-color","rgba(73,101,247,0.4)");
            $('.select_informations').css("display","block");
        });
        $('.select_informations div:eq(3)').mouseover(function () {
            for (var i =1;i<=6;i++){
                var str = '#' + i;
                $(str).css("background-color","white");
            }
            $('#4').css("background-color","rgba(73,101,247,0.4)");
            $('.select_informations').css("display","block");
        });
        $('.select_informations div:eq(5)').mouseover(function () {
            for (var i =1;i<=6;i++){
                var str = '#' + i;
                $(str).css("background-color","white");
            }
            $('#6').css("background-color","rgba(73,101,247,0.4)");
            $('.select_informations').css("display","block");
        });
        $('.select_informations div:eq(0)').mouseout(function () {
            $('#1').css("background-color","white");
        });
        $('.select_informations div:eq(1)').mouseout(function () {
            $('#2').css("background-color","white");
        });
        $('.select_informations div:eq(2)').mouseout(function () {
            $('#3').css("background-color","white");
        });
        $('.select_informations div:eq(3)').mouseout(function () {
            $('#4').css("background-color","white");
        });
        $('.select_informations div:eq(4)').mouseout(function () {
            $('#5').css("background-color","white");
        });
        $('.select_informations div:eq(5)').mouseout(function () {
            $('#6').css("background-color","white");
        });

        // $('.user').mouseover(function () {
        //     $('.select_informations').css("display","block");
        // });
        $('.select_informations').mouseout(function () {
            $('.select_informations').css("display","none");
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
            localStorage.setItem("code",500);
            localStorage.setItem("token",500);
            vm.user = '请登录';
            window.location.href = 'index.html';
        });
    }
    else
    {
        $('.hidden_div').css("display","none");

    }
}

for (var i = 0;i<vm.all_shopping_commodity.length;i++){
    vm.collect_judge[i] = vm.all_shopping_commodity[i].collectFlag;
}