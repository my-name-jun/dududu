var commonService = require('../../lib/commonService');
var service = require('./service');
var net = require('../../network/network');
//GEN_dependences

var vm = avalon.define({
    $id: "vm",
    img_logo: require('./img/3.jpg'),
    img_logo1: require('./img/1.jpg'),
    img_logo2: require('./img/1.jpg'),
    img_logo3: require('./img/1.jpg'),
    img_logo4: require('./img/1.jpg'),

    classification: '',
    trading_state: require('../../lib/dic/trading_state'),

    sell: '',
    classification_list: require('../../lib/dic/classification_list'),
    user: '用户xxx',
    dataall: '',
    dataallsell: '',
    id: '',//跳转商品详情的
    id1: '',//删除的
    id2: '',//取消购买按钮的
    stare: '',
    id3: '',//立即购买按钮的
    field: false,//字段传给商品列表的
    day: '2018-10-10',
    seller_name: '卖家昵称',
    tick: '',
    name1: '',
    name2: '苹果 iPhone XS Max  全新',
    name3: '苹果 iPhone XS Max  全新',
    name4: '苹果 iPhone XS Max  全新',
    price1: '￥9599.00',
    price2: '￥9599.00',
    price3: '￥9599.00',
    price4: '￥9599.00',
    number1: true,
    number2: true,
    number3: true,
    number4: true,
    number5: false,

    evaluate: '',
    buyid: '',
    sellerid: '',


    valuedata: '',
    valuedata1: '',
    buy_state1: [],   // '卖家审核中',
    buy_state3: [],   //'成功交易',
    buy_state31: [],   //'成功交易',
    buy_state2: [],   // '等待确认购买',
    sell1: [],   // '卖家审核中',
    sell2: [],   //'成功交易',
    sell3: [],   // '等待买家确认购买',
    buy_state4: [],   // '失败交易（卖家已成功卖给其他买家）',
    pingjia:'已评价',
    state1: '卖家审核中',
    state3: '成功交易',
    state2: '等待确认购买',
    state5: '等待买家确认购买',
    state4: '失败交易（卖家已成功卖给其他买家）',
    operation: [],   //'评价',
    urlhttp: 'http://dududu.soarteam.cn',

    //region 组件数据
    sell_state1: [],  //为审核卖给谁
    sell_state2: [],  //为等待买家是否购买
    sell_state3: [],  //交易成功
    sell_state4: [],  //交易失败
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
//个人页面条转
    geren: function () {
        window.location.href = "user_info.html"
    },
    //endregion
    serach_click: function () {
        var value_id = $('#search_commodity_text').val();
        vm.field = true;
        localStorage.setItem('Commodity_information', value_id);
        localStorage.setItem('field', vm.field);
        window.location.href = "commodity_list.html";
    },


    order_specific_information_examine: function (index) {
        // vm.id=$('.order_content').attr('id');
        // alert(index);
        /**
         *直接获取index的索引，通过索引获取id，保存在本地，然后另一个页面通过本地的id来访问
         */
        vm.valuedata = vm.buy_state1[index].productInfo[0].id;
        localStorage.setItem('sellerid', vm.buy_state1[index].userInfo[0].id);
        localStorage.setItem('id', vm.valuedata);
        window.location.href = 'commodity_details.html';
    },
    order_specific_information_wait: function (index) {
        vm.valuedata = vm.buy_state3[index].productInfo[0].id;
        alert(vm.valuedata)
        localStorage.setItem('sellerid', vm.buy_state3[index].userInfo[0].id);
        localStorage.setItem('id', vm.valuedata);
        window.location.href = 'commodity_details.html';
        // alert(456);
    },
    order_specific_information_wait31: function (index) {
        vm.valuedata = vm.buy_state31[index].productInfo[0].id;
        localStorage.setItem('sellerid', vm.buy_state31[index].userInfo[0].id);
         // alert(vm.buy_state31[index].userInfo[0].id)

        localStorage.setItem('id', vm.valuedata);
        window.location.href = 'commodity_details.html';
        // alert(456);
    },
    order_specific_information_success: function (index) {
        vm.valuedata = vm.buy_state2[index].productInfo[0].id;
        localStorage.setItem('sellerid', vm.buy_state2[index].userInfo[0].id);
        localStorage.setItem('id', vm.valuedata);
        window.location.href = 'commodity_details.html';
        // alert(456);
    },
    order_specific_information_error: function (index) {
        vm.valuedata = vm.buy_state4[index].productInfo[0].id;
        localStorage.setItem('sellerid', vm.buy_state4[index].userInfo[0].id);
        localStorage.setItem('id', vm.valuedata);
        window.location.href = 'commodity_details.html';
        // alert(456);
    },
    order_specific_information_wait1: function (index) {
        vm.valuedata = vm.sell1[index].productInfo[0].id;
        localStorage.setItem('sellerid', vm.sell1[index].userInfo[0].id);
        localStorage.setItem('id', vm.valuedata);
        window.location.href = 'commodity_details.html';
        // alert(456);
    }, order_specific_information_wait2: function (index) {
        vm.valuedata = vm.sell2[index].productInfo[0].id;
        localStorage.setItem('sellerid', vm.sell2[index].userInfo[0].id);
        localStorage.setItem('id', vm.valuedata);
        window.location.href = 'commodity_details.html';
        // alert(456);
    }, order_specific_information_wait3: function (index) {
        vm.valuedata = vm.sell3[index].productInfo[0].id;
        localStorage.setItem('sellerid', vm.sell3[index].userInfo[0].id);
        localStorage.setItem('id', vm.valuedata);
        window.location.href = 'commodity_details.html';
        // alert(456);
    },


    posttestbuyid2: function (callback, id2) {
        var that = this;
        $.ajax({
            url: 'http://dududu.soarteam.cn/market/api/order/buy/' + id2,
            type: 'put',
            contentType: "application/json; charset=utf-8",
            dataType: "json",
            id: 100,
            data: JSON.stringify({state: 4}),
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
    operation1_btn: function (index) {
        vm.valuedata = vm.buy_state1[index].number;
        vm.valuedata1 = vm.buy_state1[index].state;
        window.location.href = "my_order.html";
        //alert(vm.valuedata);
        // alert(vm.valuedata1);
        localStorage.setItem('id2', vm.valuedata);
        // e.stopPropagation();
        // alert(4546);
    },
    operation2_btn: function (index) {
        vm.valuedata = vm.buy_state2[index].number;
        vm.valuedata1 = vm.buy_state2[index].state;
        window.location.href = "my_order.html";
        // alert(vm.valuedata);
        // alert(vm.valuedata1);
        localStorage.setItem('id2', vm.valuedata);
        // e.stopPropagation();
        // alert(4546);
    },


    operation1_btn_evaluate: function (index) {

        vm.valuedata = vm.sell2[index].productInfo[0].id;
        localStorage.setItem('id', vm.valuedata);
        localStorage.setItem('sellerid', vm.valuedata);
        window.location.href = 'commodity_details.html';
        // e.stopPropagation();
        // $('#modal_sell').attr('display','block');
        // alert(vm.valuedata)
        // this.parent().attr('data-toggle','modal');
        // this.parent().attr('data-target','#myModal_sell');
        // $()
    }
    ,
    ldie: function () {
        window.location.href = 'ReleaseGoods.html';
    },
    index: function () {
        window.location.href = 'index.html';
    },

    checkAll1: function () {
        // alert(123);
        var all = document.getElementById('all1');//获取到点击全选的那个复选框的id
        var one = document.getElementsByName('checkname[]');//获取到复选框的名称
        if (all.checked == true) {//因为获得的是数组，所以要循环 为每一个checked赋值
            for (var i = 0; i < one.length; i++) {
                one[i].checked = true;
            }

        } else {
            for (var j = 0; j < one.length; j++) {
                one[j].checked = false;
            }
        }
    },
    checkAll2: function () {
        // alert(123);
        var all = document.getElementById('all2');//获取到点击全选的那个复选框的id
        var one = document.getElementsByName('checkname[]');//获取到复选框的名称
        if (all.checked == true) {//因为获得的是数组，所以要循环 为每一个checked赋值
            for (var i = 0; i < one.length; i++) {
                one[i].checked = true;
            }

        } else {
            for (var j = 0; j < one.length; j++) {
                one[j].checked = false;
            }
        }
    },


    //删除订单
    clean1: function (index) {
        // vm.id=$(this).attr('id');
        // alert(vm.id);
        vm.valuedata1 = vm.buy_state1[index].number;
        // alert(vm.valuedata1);
        localStorage.setItem('id1', vm.valuedata1);
        window.location.href = "my_order.html";
    }, clean2: function (index) {
        // vm.id=$(this).attr('id');
        // alert(vm.id);
        vm.valuedata1 = vm.buy_state3[index].number;
        // alert(vm.valuedata1);
        localStorage.setItem('id1', vm.valuedata1);
        window.location.href = "my_order.html";
    }, clean3: function (index) {
        // vm.id=$(this).attr('id');
        // alert(vm.id);
        vm.valuedata1 = vm.buy_state2[index].number;
        // alert(vm.valuedata1);
        localStorage.setItem('id1', vm.valuedata1);
        window.location.href = "my_order.html";
    }, clean4: function (index) {
        // vm.id=$(this).attr('id');
        // alert(vm.id);
        vm.valuedata1 = vm.buy_state4[index].number;
        // alert(vm.valuedata1);
        localStorage.setItem('id1', vm.valuedata1);
        window.location.href = "my_order.html";
    }, clean5: function (index) {
        // vm.id=$(this).attr('id');
        // alert(vm.id);
        vm.valuedata1 = vm.sell1[index].number;
        // alert(vm.valuedata1);
        localStorage.setItem('id1', vm.valuedata1);
        window.location.href = "my_order.html";
    }, clean6: function (index) {
        // vm.id=$(this).attr('id');
        // alert(vm.id);
        vm.valuedata1 = vm.sell2[index].number;
        // alert(vm.valuedata1);
        localStorage.setItem('id1', vm.valuedata1);
        window.location.href = "my_order.html";
    }, clean7: function (index) {
        // vm.id=$(this).attr('id');
        // alert(vm.id);
        vm.valuedata1 = vm.sell3[index].number;
        localStorage.setItem('id1', vm.valuedata1);
        window.location.href = "my_order.html";
    },

    posttestdel: function (callback, num) {
        var that = this;
        $.ajax({
            url: 'http://dududu.soarteam.cn/market/api/order/' + num,
            type: 'DELETE',
            contentType: "application/json; charset=utf-8",
            dataType: "json",
            id: 100,
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


//评价
    evaluateid1: '',
    pingjiaid:'',
    evaluateid: function (index) {
        vm.evaluateid1 = index;
        // alert("#seccess"+index);
        // alert($("#seccess"+index).text());
    },
    evaluate: function () {
        var index = vm.evaluateid1;
        vm.buyid = localStorage.getItem('user_id');
        vm.sellerid = vm.buy_state3[index].userInfo[0].id;
        vm.pingjiaid=vm.buy_state3[index].number;
        vm.evaluate = $('#evaluate').val();
        // alert(vm.evaluate)
        if (vm.evaluate==''){
            alert("评价不能为空！！！");
        }
        // alert($('#evaluate').val());
        else {
            vm.posttestevaluate(function (data) {
            }, vm.buyid, vm.evaluate, vm.pingjiaid,vm.sellerid);
            alert("评价成功")
            $("#seccess"+vm.evaluateid1).text(vm.pingjia);
        }

        // setTimeout(5000);
        window.location.href="my_order.html";
    },
    //region 数据监听
    posttestevaluate: function (callback, buyid, evaluate,number1,sellerid) {
        var that = this;
        $.ajax({
            url: 'http://dududu.soarteam.cn/market/api/comment',
            type: 'post',
            contentType: "application/json; charset=utf-8",
            dataType: "json",
            id: 100,
            data: JSON.stringify({buyUserId: buyid, content: evaluate,number:number1 ,sellUserId: sellerid}),
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

//卖给他
    operation1_btn_sell: function (index) {
        vm.id2 = vm.sell1[index].number;
        // alert(index)
        // alert(vm.id2)
        vm.posttestsellid2(function (data) {
            window.location.href = "my_order.html";
        }, vm.id2);

    },
    posttestsellid2: function (callback, id2) {
        var that = this;
        $.ajax({
            url: 'http://dududu.soarteam.cn/market/api/order/sell/' + id2,
            type: 'put',
            contentType: "application/json; charset=utf-8",
            dataType: "json",
            id: 100,
            data: JSON.stringify({state: 2}),
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
//立即购买
    operation1_btn2: function (index) {
        vm.valuedata = vm.buy_state2[index].number;
        // alert(vm.valuedata);
        // localStorage.setItem('id3', vm.valuedata);
        vm.posttestimmediatelybuy(function (data) {
            window.location.href = "my_order.html";
        }, vm.valuedata);

    },
    posttestimmediatelybuy: function (callback, id2) {
        var that = this;
        $.ajax({
            url: 'http://dududu.soarteam.cn/market/api/order/buy/' + id2,
            type: 'put',
            contentType: "application/json; charset=utf-8",
            dataType: "json",
            id: 100,
            data: JSON.stringify({state: 3}),
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
//订单搜索
    posttestone: function (callback, num) {
        var that = this;
        $.ajax({
            url: 'http://dududu.soarteam.cn/market/api/order/one/' + num,
            type: 'get',
            contentType: "application/json; charset=utf-8",
            dataType: "json",
            id: 100,
            headers: {
                'Authorization': localStorage.getItem('token')
            },
        }).success(function (data) {

            callback(data);
            //object.dataallsell=data.data.sell;
            //console.log(data)
        }).error(function (data) {
            console.log(1)
        });

    },
    serach_click1: function () {
        var value_id = $('#input_order').val();
        localStorage.setItem('Commodity_information', value_id);
        // alert(value_id);
        vm.posttestone(function (data) {
            //alert(123);
            var a = data.data.state;
            vm.buy_state1.splice(0, vm.buy_state1.length);
            vm.buy_state2.splice(0, vm.buy_state2.length);
            vm.buy_state3.splice(0, vm.buy_state3.length);
            vm.buy_state4.splice(0, vm.buy_state4.length);

            var dataElement = data.data;
            if (a == 1) {
                    var a=dataElement.productInfo[0].icon;
                    var b=a.split(",");
                    // alert(b[0]);
                // alert(dataElement.sellUserInfo.avatar)
                // dataElement.userInfo[0].avatar=dataElement.sellUserInfo.avatar;
                // alert(dataElement.userInfo[0].avatar)
                // dataElement.userInfo[0].name=dataElement.sellUserInfo.name;
                 dataElement.productInfo[0].icon=b[0];

                vm.buy_state1.push(dataElement);
                vm.buy_state2 = '';
                console.log(vm.buy_state1)
                vm.buy_state3 = '';
                vm.buy_state4 = '';
                // $('#img_size1').html("<img src='"+"http://dududu.soarteam.cn" + vm.buy_state1[k].productInfo[0].icon + "'  class='img_comm'/>");
                //$('.img_size').html("<img src='" + vm.img_logo1 + "' class='img_comm' />");
                // k++;
            }
            else if (a == 2) {
                var a=dataElement.productInfo[0].icon;
                var b=a.split(",");
                // alert(b[0]);
                // dataElement.userInfo[0].avatar=dataElement.sellUserInfo.avatar;
                // dataElement.userInfo[0].name=dataElement.sellUserInfo.name;
                dataElement.productInfo[0].icon=b[0];
                vm.buy_state2.push(dataElement)
                console.log(vm.buy_state2)
                vm.buy_state1 = '';
                vm.buy_state3 = '';
                vm.buy_state4 = '';
                // $('#img_size2').html("<img src='"+"http://dududu.soarteam.cn" + vm.buy_state1[l].productInfo[0].icon + "'  class='img_comm'/>");
                // l++;
            }
            else if (a == 3) {
                var a=dataElement.productInfo[0].icon;
                var b=a.split(",");
                // alert(b[0]);
                // dataElement.userInfo[0].avatar=dataElement.sellUserInfo.avatar;
                // dataElement.userInfo[0].name=dataElement.sellUserInfo.name;
                dataElement.productInfo[0].icon=b[0];
                vm.buy_state3.push(dataElement);
                console.log(vm.buy_state3)
                vm.buy_state1 = '';
                vm.buy_state2 = '';
                vm.buy_state4 = '';
                // $('#img_size3').html("<img src='"+"http://dududu.soarteam.cn" + vm.buy_state1[n].productInfo[0].icon + "'  class='img_comm'/>");
                // n++;
            }
            else if (a == 4) {
                var a=dataElement.productInfo[0].icon;
                var b=a.split(",");
                // alert(b[0]);
                // dataElement.userInfo[0].avatar=dataElement.sellUserInfo.avatar;
                // dataElement.userInfo[0].name=dataElement.sellUserInfo.name;
                dataElement.productInfo[0].icon=b[0];
                vm.buy_state4.push(dataElement)
                console.log(vm.buy_state4)
                vm.buy_state1 = '';
                vm.buy_state2 = '';
                vm.buy_state3 = '';
                // $('#img_size4').html("<img src='"+"http://dududu.soarteam.cn" + vm.buy_state1[m].productInfo[0].icon + "'  class='img_comm'/>");
                // m++;
            }


            //判断不同的 buy_state，用push的语法放到不同的数组
            // var k=0,l=0,n=0,m=0;


            console.log(data)
            //  console.log(vm.buy_state1[k].productInfo[0].icon)


        }, localStorage.getItem('Commodity_information'));

    },


    success_order: function () {
        vm.number1 = false;
        vm.number2 = false;
        vm.number5 = false;
        vm.number4 = false;
        vm.number3 = true;
        $('.order').css('background-color', '#EFEFEF');
        $('.error_order').css('background-color', '#EFEFEF');
        $('.item_order').css('background-color', '#EFEFEF');
        $('.wait_order').css('background-color', '#EFEFEF');
        $('.success_order').css('background-color', '#F4922B');
        $('.Audit_order').css('background-color', '#EFEFEF');
        vm.unreadNum4= 0;
    },
    wait_order: function () {
        vm.number1 = false;
        vm.number5 = false;
        vm.number2 = true;
        vm.number3 = false;
        vm.number4 = false;
        $('.order').css('background-color', '#EFEFEF');
        $('.error_order').css('background-color', '#EFEFEF');
        $('.item_order').css('background-color', '#EFEFEF');
        $('.wait_order').css('background-color', '#F4922B');
        $('.success_order').css('background-color', '#EFEFEF');
        $('.Audit_order').css('background-color', '#EFEFEF');
        vm.unreadNum3= 0;
    },
    Audit_order: function () {
        vm.number1 = true;
        vm.number2 = false;
        vm.number3 = false;
        vm.number4 = false;
        vm.number5 = false;
        $('.order').css('background-color', '#EFEFEF');
        $('.error_order').css('background-color', '#EFEFEF');
        $('.item_order').css('background-color', '#EFEFEF');
        $('.wait_order').css('background-color', '#EFEFEF');
        $('.success_order').css('background-color', '#EFEFEF');
        $('.Audit_order').css('background-color', '#F4922B');
        vm.unreadNum2= 0;
    },


    unreadNum1: 0,
    unreadNum2: 0,
    unreadNum3: 0,
    unreadNum4: 0,
    unreadNum5: 0,


    bindListeners: function () {


        /**
         * 这样才能保证数据获取后才在控制器进行处理
         */
        vm.posttestbuyid2(function (data) {

        }, localStorage.getItem('id2')),


            vm.posttestdel(function (data) {

            }, localStorage.getItem('id1')),

            net.posttestbuy(function (data) {

                //判断不同的 buy_state，用push的语法放到不同的数组
                // var k=0,l=0,n=0,m=0;
                // alert(data.unreadNum.length)
                vm.unreadNum1=data.unreadNum[0];
                vm.unreadNum2=data.unreadNum[1];
                vm.unreadNum3=data.unreadNum[2];
                vm.unreadNum4=data.unreadNum[3];
                vm.unreadNum5=data.unreadNum[4];



                for (var i = 0; i < data.buy.length; i++) {
                    var dataElement = data.buy[i];
                    if (data.buy[i].state == 1) {
                        var a=dataElement.productInfo[0].icon;
                        var b=a.split(",");
                        // alert(b[0]);
                        dataElement.productInfo[0].icon=b[0];
                        // alert(dataElement.productInfo[0].icon);
                        vm.buy_state1.push(dataElement);
                        continue;
                        // $('#img_size1').html("<img src='"+"http://dududu.soarteam.cn" + vm.buy_state1[k].productInfo[0].icon + "'  class='img_comm'/>");
                        //$('.img_size').html("<img src='" + vm.img_logo1 + "' class='img_comm' />");
                        // k++;
                    }
                    else if (data.buy[i].state == 2) {
                        var a=dataElement.productInfo[0].icon;
                        var b=a.split(",");
                        // alert(b[0]);
                        dataElement.productInfo[0].icon=b[0];
                        // alert(dataElement.productInfo[0].icon);
                        vm.buy_state2.push(dataElement)
                        continue;
                        // $('#img_size2').html("<img src='"+"http://dududu.soarteam.cn" + vm.buy_state1[l].productInfo[0].icon + "'  class='img_comm'/>");
                        // l++;
                    }
                    else if (data.buy[i].state == 3) {
                        var a=dataElement.productInfo[0].icon;
                        var b=a.split(",");
                        // alert(b[0]);
                        dataElement.productInfo[0].icon=b[0];
                        // alert(dataElement.productInfo[0].icon);
                        if(dataElement.comment_flag==0){
                            vm.buy_state3.push(dataElement)
                        }
                        else if(dataElement.comment_flag==1){
                            vm.buy_state31.push(dataElement);
                        }
                        continue;
                        // $('#img_size3').html("<img src='"+"http://dududu.soarteam.cn" + vm.buy_state1[n].productInfo[0].icon + "'  class='img_comm'/>");
                        // n++;
                    }
                    else if (data.buy[i].state == 4) {
                        var a=dataElement.productInfo[0].icon;
                        var b=a.split(",");
                        // alert(b[0]);
                        dataElement.productInfo[0].icon=b[0];
                        // alert(dataElement.productInfo[0].icon);
                        vm.buy_state4.push(dataElement)
                        continue;
                        // $('#img_size4').html("<img src='"+"http://dududu.soarteam.cn" + vm.buy_state1[m].productInfo[0].icon + "'  class='img_comm'/>");
                        // m++;
                    }
                }
                for (var i = 0; i < data.sell.length; i++) {
                    var dataElement1 = data.sell[i];
                    if (data.sell[i].state == 1) {
                        var a=dataElement1.productInfo[0].icon;
                        var b=a.split(",");
                        // alert(b[0]);
                        dataElement1.productInfo[0].icon=b[0];
                        // alert(dataElement.productInfo[0].icon);
                        vm.sell1.push(dataElement1);
                        continue;
                        // $('#img_size1').html("<img src='"+"http://dududu.soarteam.cn" + vm.buy_state1[k].productInfo[0].icon + "'  class='img_comm'/>");
                        //$('.img_size').html("<img src='" + vm.img_logo1 + "' class='img_comm' />");
                        // k++;
                    }
                    else if (data.sell[i].state == 3) {
                        var a=dataElement1.productInfo[0].icon;
                        var b=a.split(",");
                        // alert(b[0]);
                        dataElement1.productInfo[0].icon=b[0];
                        // alert(dataElement.productInfo[0].icon);
                        vm.sell2.push(dataElement1)
                        continue;
                        // $('#img_size2').html("<img src='"+"http://dududu.soarteam.cn" + vm.buy_state1[l].productInfo[0].icon + "'  class='img_comm'/>");
                        // l++;
                    }
                    else if (data.sell[i].state == 2 || data.sell[i].state == 4) {
                        var a=dataElement1.productInfo[0].icon;
                        var b=a.split(",");
                        // alert(b[0]);
                        dataElement1.productInfo[0].icon=b[0];
                        // alert(dataElement.productInfo[0].icon);
                        vm.sell3.push(dataElement1)
                        continue;
                        // $('#img_size3').html("<img src='"+"http://dududu.soarteam.cn" + vm.buy_state1[n].productInfo[0].icon + "'  class='img_comm'/>");
                        // n++;
                    }

                }
                console.log(data)
                //  console.log(vm.buy_state1[k].productInfo[0].icon)


            },localStorage.getItem('user_id'));

        /**
         * 这个异步请求如果用setTimeout来处理会比较危险，因为设定的时间是未知的，可能会导致数据问题。要用callback来处理。
         */
        //        setTimeout(function () {
        //            vm.dataall = net.dataall;
        //            //vm.dataallsell=net.dataallsell;
        //            //vm.img_logo1=net.dataall.icon;
        //            //alert(vm.img_logo1);
        //            // console.log(vm.dataall);
        //            // vm.day=net.time;
        //            // vm.id=net.number;
        //            // vm.name1=net.name;
        //            // vm.price1=net.pr;
        //            // vm.number1=net.collectNum;
        //            // vm.img_logo1=net.icon;
        //            // vm.seller_name=net.user;
        //            // //alert(vm.name1)
        //            var a = 0, b = 0, c = 0, d = 0;
        //            for (var i = 0; i < vm.dataall.buy.length; i++) {
        //                // alert(typeof (vm.dataall[i].buy_state));
        //                if (vm.dataall.buy[i].buy_state == 1) {
        //                    vm.buy_state1[a] = vm.dataall.buy[i];
        //                    console.log(vm.buy_state1)
        //                    //alert(vm.buy_state1[a])
        //                    a++;
        //                    continue;
        //                }
        //                if (vm.dataall.buy[i].buy_state == 2) {
        //                    vm.buy_state2[b] = vm.dataall.buy[i];
        //                    console.log(vm.buy_state2);
        //                    b++;
        //                    continue;
        //                }
        //                if (vm.dataall.buy[i].buy_state == 3) {
        //                    vm.buy_state3[c] = vm.dataall.buy[i];
        //                    console.log(vm.buy_state3);
        //                    c++;
        //                    continue;
        //                }
        //                if (vm.dataall.buy[i].buy_state == 4) {
        //                    vm.buy_state4[d] = vm.dataall.buy[i];
        //                    console.log(vm.buy_state4);
        //                    d++;
        //                    continue;
        //                }
        //            }
        // // alert(vm.buy_state1[0].time)
        //            // console.log(vm.buy_state1)
        //        }, 500);


        $('#all_order').click(function () {
            vm.number1 = true;
            vm.number2 = true;
            vm.number4 = true;
            vm.number3 = true;
            vm.number5 = false;
            $('.order').css('background-color', '#F4922B')
            $('.error_order').css('background-color', '#EFEFEF');
            $('.item_order').css('background-color', '#EFEFEF');
            $('.wait_order').css('background-color', '#EFEFEF');
            $('.success_order').css('background-color', '#EFEFEF');
            $('.Audit_order').css('background-color', '#EFEFEF');
        });
        $('#item_order').click(function () {
            vm.number1 = false;
            vm.number2 = false;
            vm.number4 = false;
            vm.number3 = false;
            vm.number5 = true;
            $('.order').css('background-color', '#EFEFEF')
            $('.error_order').css('background-color', '#EFEFEF');
            $('.item_order').css('background-color', '#F4922B');
            $('.wait_order').css('background-color', '#EFEFEF');
            $('.success_order').css('background-color', '#EFEFEF');
            $('.Audit_order').css('background-color', '#EFEFEF');
            vm.unreadNum1= 0;
        });


        $('#error_order').click(function () {
            vm.number1 = false;
            vm.number2 = false;
            vm.number5 = false;
            vm.number3 = false;
            vm.number4 = true;
            $('.order').css('background-color', '#EFEFEF');
            $('.error_order').css('background-color', '#F4922B');
            $('.item_order').css('background-color', '#EFEFEF');
            $('.wait_order').css('background-color', '#EFEFEF');
            $('.success_order').css('background-color', '#EFEFEF');
            $('.Audit_order').css('background-color', '#EFEFEF');
            vm.unreadNum5= 0;
        });


        $('#follow').click(function () {
            window.location.href = 'my_follow.html';
        });

        $('#order').click(function () {
            window.location.href = 'my_order.html';
        });

        $('#inf').click(function () {
            window.location.href = 'Essential_information.html';
        });
        //GEN_listeners

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

    }


    //endregion 数据监听

});

vm.bindListeners();

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
            window.location.href = "index.html";
        });
    }
    else {
        $('.hidden_div').css("display", "none");

    }
}

//GEN_run
