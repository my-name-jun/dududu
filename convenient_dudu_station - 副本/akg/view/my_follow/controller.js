var commonService = require('../../lib/commonService');
var service = require('./service');
var net = require('../../network/network');
//GEN_dependences

var vm = avalon.define({
    $id: "vm",
    img_logo: require('./img/3.jpg'),
    img_logo1:require('./img/1.jpg'),
    classification: '',
    datacollect:[],
    urlhttp:'http://dududu.soarteam.cn',
    // price:'',
    valuedata:'',
    classification_list: require('../../lib/dic/classification_list'),
    field:false,//字段传给商品列表的
    name:localStorage.getItem('name'),
    user_img:localStorage.getItem('user_img'),
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

//搜索
    serach_click: function () {
        var value_id=$('#form_control').val();
        vm.field=true;
        localStorage.setItem('Commodity_information',value_id);
        localStorage.setItem('field',vm.field);
        window.location.href="commodity_list.html";
    },


    my_love_search:function(){
        var value_id=$('#my_love_search').val();
        if(value_id=='')
        {
            window.location.href="my_follow.html";
        }
        // vm.field=true;
        localStorage.setItem('Commodity_information',value_id);
        // localStorage.setItem('field',vm.field);
        vm.posttestquery1(function (data) {
            vm.datacollect.splice(0, vm.datacollect.length);
            for (var i = 0; i < data.length; i++) {
                    var dataElement = data[i];
                    var a=dataElement.products[0].icon;
                    var b=a.split(",");
                    dataElement.products[0].icon=b[0];
                    vm.datacollect.push(dataElement);
            }
           // vm.datacollect=data;
            console.log(vm.datacollect)
            // window.location.href="my_follow.html";
        },localStorage.getItem('Commodity_information'));

        // alert(value_id)
    },
    posttestquery1: function (callback, commodity) {
        var that = this;
        $.ajax({
            url: 'http://dududu.soarteam.cn/market/api/product/follow',
            type: 'POST',
            contentType: "application/json; charset=utf-8",
            dataType: "json",
            id: 100,
            data: JSON.stringify({name: commodity}),
            headers: {
                'Authorization': localStorage.getItem('token')
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
            //object.dataall = data.data;
            console.log(data)
            callback(data.data);
            //object.dataallsell=data.data.sell;
            //console.log(object.dataall)
            //console.log(object.dataallsell)
            //alert(123)


        }).error(function (data) {
            console.log(1)
        });

    },


    my_follow_commodity:function(index){
        // alert(123);
        vm.valuedata=vm.datacollect[index].products[0].id;
        localStorage.setItem('id',vm.valuedata);
        window.location.href='commodity_details.html';
    },


    ldie: function () {
        window.location.href = 'ReleaseGoods.html';
    },
    index: function () {
        window.location.href = 'index.html';
    },
    //region 数据监听
    bindListeners: function () {
        net.posttestcollect(function (data) {
            // alert(data.length)
            for (var i = 0; i < data.length; i++) {
                var dataElement = data[i];
                var a=dataElement.products[0].icon;
                var b=a.split(",");
                dataElement.products[0].icon=b[0];
                // alert(dataElement.products[0].icon);
                vm.datacollect.push(dataElement);
            }
            //
             vm.datacollect=data;
            console.log(vm.datacollect);
        },localStorage.getItem('user_id'));

        $('#follow').click(function () {
            window.location.href = 'my_follow.html';
        });

        $('#order').click(function () {
            window.location.href = 'my_order.html';
        });

        $('#inf').click(function () {
            window.location.href = 'Essential_information.html';
        });
        $('#self').click(function () {
            window.location.href = 'user_info.html';
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

        //GEN_listeners
    }


    //endregion 数据监听

});

vm.bindListeners();
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
            window.location.href="index.html";
        });
    }
    else
    {
        $('.hidden_div').css("display","none");

    }
}
//GEN_run
