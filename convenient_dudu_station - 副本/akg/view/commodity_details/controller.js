var commonService = require('../../lib/commonService');
var service = require('./service');
var net = require('../../network/network');

//GEN_dependences

var vm = avalon.define({
    $id: "vm",
    img_logo: require('./img/3.jpg'),
    img_logo1: require('./img/1.jpg'),
    classification: '',
    commodity: 2,
    simmilar_commodity1: 19,
    simmilar_commodity2: 19,
    simmilar_commodity3: 19,
    simmilar_commodity4: 19,
    simmilar_commodity5: 19,
    commodity_description: '商品描述商品描述商品描述商' +
    '品描述商品描述商品描述...',
    urlhttp: 'http://dududu.soarteam.cn',
    datacom: '',
    commodity_id: 4,
    field: false,//字段传给商品列表的
    classification_list: require('../../lib/dic/classification_list'),
    user: 'xxx',
    commodity_title: '',
    original_price: '原价 ￥10800购入',
    price: '995',
    stock: 10,
    collect_judge: false,
    icon: '',
    num: 8,
    sellid: '',
    commodity_id: '',//商品id


    //region 组件数据

    //GEN_properties

    //endregion

    //region 主要数据

    //endregion 主要数据

    //region 主逻辑

    //endregion 主逻辑

    //region 组件逻辑

    //GEN_actions

    //历史浏览记录保存
    history_save: function (data) {
        if (localStorage.getItem("user_id") != null) {
            var id = data.data.product[0].id;
            var img = vm.urlhttp + data.data.product[0].icon;
            var now_price = data.data.product[0].price;
            var title = data.data.product[0].name;
            var arr = [id, img, now_price, title]

            //历史已存在该商品
            var temp = 9;
            for (var i = 9; i > 0; i--) {
                if (localStorage.getItem("history_" + i) != "")
                    var arr_temp = JSON.parse(localStorage.getItem("history_" + i));
                if (arr_temp != null)
                    var id_temp = arr_temp[0];
                if (id == id_temp) {
                    temp = i;
                    break;
                }
            }

            for (var i = temp; i > 1; i--) {
                localStorage.setItem("history_" + i, localStorage.getItem("history_" + (i - 1)))
            }

            //存入
            localStorage.setItem("history_1", JSON.stringify(arr));
        }
    },

    //endregion

    //region 校验逻辑

    //endregion
    serach_click: function () {
        var value_id = $('#form_control').val();
        vm.field = true;
        localStorage.setItem('Commodity_information', value_id);
        localStorage.setItem('field', vm.field);
        window.location.href = "commodity_list.html";
    },
    collect_interval: function () {
        var id = vm.commodity_id;
        if (vm.collect_judge == true) {
            vm.collect_judge = false;
            $("#collect").css('color', 'gray');
            alert("取消关注成功！");
            net.cancellove_commodity(function () {

            }, id);
        }
        else {
            vm.collect_judge = true;
            $("#collect").css('color', 'red');
            alert("关注成功！");
            net.love_commodity(function () {

            }, id);
        }
    },


    //联系卖家
    contact: function () {
        var a=localStorage.getItem('user_id');
        var b=localStorage.getItem('sellerid');
        if(a==b)
        {
            alert("不能联系自己！！！");
        }
        else {
            window.location.href = "user_info.html";
        }
    },

    //设置商品图片、商品详情
    setImagesAndDescribe: function (data) {
        var imgstr = data.data.product[0].icon;
        var avatar = imgstr.split(",");
        $("#icon_main").attr("src",vm.urlhttp+avatar[0]);
        for (var i = 1; i <= avatar.length; i++) {
            var className="#img_logo"+i;
            $(className).attr("src",vm.urlhttp+avatar[i-1])
        }
        for (var i=avatar.length+1;i<=5;i++){
            var className=".commodity_details_picture_small"+i;
            $(className).hide();
        }
        $("#goods_describe")[0].innerHTML=data.data.product[0].description;
    },


    ldie: function () {
        window.location.href = 'ReleaseGoods.html';
    },
    index: function () {
        window.location.href = 'index.html';
    },
    icon_over: function (img_str) {
        var id="#img_logo"+img_str;
        $('#icon_main').attr('src', $(id).attr("src"));
    },

    //添加购物车
    insertShoppingCart:function(){
        var productId=parseInt(localStorage.getItem("id"))
        var userId=parseInt(localStorage.getItem("user_id"))
        var jsondata={
            "productId":productId,
            "userId":userId
        }
        $.ajax({
            url: 'http://dududu.soarteam.cn/market/api/collect/insertShoppingCart',
            type:'post',
            contentType: "application/json; charset=utf-8",
            dataType:"json",
            data:JSON.stringify(jsondata),
            headers:{
                'Authorization': localStorage.getItem("token")
            },
        }).success(function(data){
            alert("成功加入购物车！")
        }).error(function(){
            alert("error")
        });
    }
    ,

    // 获取单个商品信息
    postdata: function (callback, id) {
        var that = this;
        var user_id = localStorage.getItem('user_id');
        $.ajax({
            url: 'http://dududu.soarteam.cn/market/api/product/' + user_id + '/' + id,
            type: 'get',
            contentType: "application/json; charset=utf-8",
            dataType: "json",
            headers: {
                'Authorization': localStorage.getItem("token")
            },
        }).success(function (data) {
            console.log(data.data);
            localStorage.setItem('sellerid', data.data.product[0].user[0].id)
            callback(data);
            vm.history_save(data)
            vm.setImagesAndDescribe(data)
        }).error(function (data) {
            console.log(1)
        });
    },


    //评价
    comments: '',

    postdatacomments: function (callback, id) {
        var that = this;
        var i=Number(id)
        $.ajax({
            url: 'http://dududu.soarteam.cn/market/api/comment/' + i,
            type: 'get',
            contentType: "application/json; charset=utf-8",
            dataType: "json",
            headers: {
                'Authorization': localStorage.getItem('token')
            },
        }).success(function (data) {
            callback(data);

            // object.dataall = data.data;
            // callback(data);
            //object.dataallsell=data.data.sell;
            // console.log(data)
            //console.log(object.dataallsell)
        }).error(function (data) {
            console.log(1)
        });
    },


//立即购买
    Purchase_immediately:function(a,c){
        var seller_id = localStorage.getItem("selluserid");
        var user_id = localStorage.getItem("user_id");
        if (seller_id == user_id) {
            alert("不能购买自己的商品！");
            // $('#myModal1').modal({
            //     show: true,
            //     backdrop:'static'
            // })
            $("#myModal1").modal('hide');
            return;
        }
        if(c==0)
        {
            alert("库存不足，无法购买");
            // $('#myModal1').modal({
            //     show: true,
            //     backdrop:'static'
            // })
            $("#myModal1").modal('hide');
        }
        else
            $("#myModal1").modal('show');
        localStorage.setItem('shengpingid',a);
        // console.log(vm.datacom)
        var b=localStorage.getItem('sellerid1');
        localStorage.setItem('sellerid',b);

        vm.posttestbuyid(function () {

        },localStorage.getItem('user_id'),localStorage.getItem('shengpingid'),localStorage.getItem('sellerid'));
    },

    posttestbuyid: function (callback, buyUserId,product_id,sellUserId) {
        var that = this;
        $.ajax({
            url: 'http://dududu.soarteam.cn/market/api/order',
            type: 'post',
            contentType: "application/json; charset=utf-8",
            dataType: "json",
            id: 100,
            data: JSON.stringify({amount: 1, buyUserId: buyUserId,product_id: product_id,sellUserId:sellUserId}),
            headers: {
                'Authorization': localStorage.getItem('token')
            },
        }).success(function (data) {

            callback(data);
            //object.dataallsell=data.data.sell;
            console.log(data)
        }).error(function (data) {
            console.log(1)
        });

    },











    //region 数据监听
    bindListeners: function () {

        //点击加入购物车
        $("#insertShoppingCart_btn").click(function () {
            var seller_id = localStorage.getItem("selluserid");
            var user_id = localStorage.getItem("user_id");
            if (seller_id == user_id)
                alert("不能将自己的商品添加至购物车！")
            else
                vm.insertShoppingCart();
        })
        vm.postdata(function (data) {
            console.log(data);
            vm.datacom = data;
            // alert(vm.datacom.data.product[0].user[0].id);
            localStorage.setItem('selluserid',vm.datacom.data.product[0].user[0].id);
            vm.collect_judge = data.data.iscollect;
            vm.commodity_id = data.data.product[0].id;
            if (vm.collect_judge == true) {
                $("#collect").css('color', 'red');
            }
            else {
                $("#collect").css('color', 'gray');
            }

            $('#order_comment').click(function () {
                $('.commodity_details_chart_title_title').css('background-color', '#ffffff');
                $('#commodity_detail a').css('color', '#000000');
                $('.commodity_details_chart_title_title1').css('background-color', '#1890FF');
                $('#order_comment a').css('color', '#ffffFF');
                $('.commodity_details_chart_chart').css('display', 'none');
                $('.commodity_details_chart_chart1').css('display', 'block');
                // alert(localStorage.getItem('sellerid'))
                vm.postdatacomments(function (data) {
                    // console.log(data)
                    vm.comments=data.data;
                    console.log(vm.comments)
                    console.log(localStorage.getItem('sellerid'))
                },localStorage.getItem('sellerid'));
            });

        }, vm.dataid),

            $('#order_comment').click(function () {
                $('.commodity_details_chart_title_title').css('background-color', '#ffffff');
                $('#commodity_detail a').css('color', '#000000');
                $('.commodity_details_chart_title_title1').css('background-color', '#1890FF');
                $('#order_comment a').css('color', '#ffffFF');
                $('.commodity_details_chart_chart').css('display', 'none');
                $('.commodity_details_chart_chart1').css('display', 'block');
            });
        $('#commodity_detail').click(function () {
            $('.commodity_details_chart_title_title1').css('background-color', '#ffffff');
            $('#order_comment a').css('color', '#000000');
            $('.commodity_details_chart_title_title').css('background-color', '#1890FF');
            $('#commodity_detail a').css('color', '#ffffFF');
            $('.commodity_details_chart_chart1').css('display', 'none');
            $('.commodity_details_chart_chart').css('display', 'block');
        });
        // alert(vm.datacom.data.product[0].name);


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
        //GEN_listeners






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


    }


    //endregion 数据监听

});
vm.dataid = localStorage.getItem('id');
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
            localStorage.setItem('sellerid','');
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
vm.bindListeners();
// vm.postdata(function (data){
//     alert(2)
// },vm.dataid);
//GEN_run
