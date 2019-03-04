var commonService = require('../../lib/commonService');

//GEN_dependences


var vm = avalon.define({
    $id: "vm",
    width: 1920,
    img_logo: require('./img/3.jpg'),
    goods_img: require('./img/goods.jpg'),
    tree: require('./img/tree.png'),
    field: false,
    urlhttp: 'http://dududu.soarteam.cn',
    user_avatar: "",
    user_name: "",
    history_list: [],
    chat_list: "",
    friend_avatar: "",
    targetId: "",
    targetName: "",
    friend_avatar_temp: "",

    //聊天室
    stompClient: null,

    setWidth: function () {
        vm.width = window.screen.width;
        $("#container").css("width", vm.width);
    },


    //搜索
    serach_click: function () {
        var value_id = $('#form_control').val();
        vm.field = true;
        localStorage.setItem('Commodity_information', value_id);
        localStorage.setItem('field', vm.field);
        window.location.href = "commodity_list.html";
    },

    //滚动条自动滚
    scroll_auto: function () {
        $(".modal-body").scrollTop($(".modal-body")[0].scrollHeight);
    },

    //获取用户信息
    getUserInfoById: function (id) {
        var url = "http://dududu.soarteam.cn/market/api/user/" + localStorage.getItem("user_id");
        $.ajax({
            url: url,
            method: 'get',
            headers: {
                "Authorization": "eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJleHAiOjE1NDAwMTIwNTgsInVzZXJuYW1lIjoiMjAxNjEwMDk4MjExIn0.Hi5BxrzwTFZREEvYRqqfjAtKs8LfFMwXcU8Wn3-3m9U"
            },
            data: localStorage.getItem("user_id"),
            contentType: false,
            processData: false,
        }).success(function (data, status) {
            vm.user_avatar = vm.urlhttp + data.data.userInfo.avatar;
            vm.user_name = data.data.userInfo.name;
            $("#user_avatar").attr("src", vm.user_avatar);
            $("#user_name")[0].innerHTML = vm.user_name;
        }).error(function (err, status) {
            console.log(err)
        })
    },

    //历史浏览记录
    history_show: function () {
        for (var i = 1; i <= 9; i++) {
            var item = localStorage.getItem("history_" + i);
            if (item != null && item != "") {
                var arr_temp = JSON.parse(localStorage.getItem("history_" + i));
                var id = arr_temp[0];
                var img_str = (arr_temp[1].split(","))[0];
                var price = arr_temp[2];
                var title = arr_temp[3];
                var json = {"id": id, "img_str": img_str, "price": price, "title": title};
                vm.history_list.push(json)
            }
        }
    },

    //商品页面跳转
    jumpToDetail: function (id) {
        localStorage.setItem("id", id);
        window.location.href = "commodity_details.html";
    },

    //聊天室
    connect: function () {
        var userId = localStorage.getItem("user_id");
        var socket = new SockJS('http://dududu.soarteam.cn:8080/market/duduEndPoint'); //连接SockJS的endpoint名称为"endpointOyzc"
        console.log('我userId1已经连接成功');
        stompClient = Stomp.over(socket);//使用STMOP子协议的WebSocket客户端
        stompClient.connect({}, function (frame) {//连接WebSocket服务端
            console.log('Connected:' + frame);
            //通过stompClient.subscribe订阅/queue/getResponse 目标(destination)发送的消息
            stompClient.subscribe('/user/' + userId + '/queue/getResponse', function (response) {
                $(".modal-body")[0].innerHTML = "";
                if (vm.targetId != "")
                    vm.getHistoryChat(vm.targetId);
                vm.findMyChatRoom();
            });
        });
    },

    //获取有关于我的聊天室
    findMyChatRoom: function () {
        var url = "http://dududu.soarteam.cn/market/api/findMyChatRoom/" + localStorage.getItem("user_id");
        $.ajax({
            url: url,
            type: 'get',
            contentType: "application/json; charset=utf-8",
            dataType: "json",
            data: localStorage.getItem("user_id"),
            headers: {
                'Authorization': localStorage.getItem("token")
            },
        }).success(function (data) {
            vm.chat_list = data.data;
        }).error(function (err, status) {
            console.log(err)
        });
    },


    //获取卖家信息
    getUserInfoById_seller: function (id) {
        var url = "http://dududu.soarteam.cn/market/api/user/" + id;
        $.ajax({
            url: url,
            method: 'get',
            headers: {
                "Authorization": "eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJleHAiOjE1NDAwMTIwNTgsInVzZXJuYW1lIjoiMjAxNjEwMDk4MjExIn0.Hi5BxrzwTFZREEvYRqqfjAtKs8LfFMwXcU8Wn3-3m9U"
            },
            data: id,
            contentType: false,
            processData: false,
        }).success(function (data, status) {
            vm.openChat(id, data.data.userInfo.avatar, data.data.userInfo.name);
            localStorage.setItem("sellerid", "")
            vm.findMyChatRoom();
        }).error(function (err, status) {
            console.log(err)
        })
    },


    //打开聊天室
    openChat: function (targetId, avatar, name) {
        $('#myModal').modal('show')
        vm.friend_avatar_temp = avatar;
        vm.friend_avatar = vm.urlhttp + avatar;
        $(".modal_name")[0].innerHTML = name;
        $(".friend_avatar").attr("src",vm.friend_avatar)
        vm.targetId = targetId;
        vm.targetName = name;
        vm.getHistoryChat(targetId);
        vm.findMyChatRoom();
    },

    //聊天记录替换
    replaceChatHistory: function (data) {
        for (var i = 0; i < data.data.length; i++) {
            if (data.data[i].recivedtUserId == localStorage.getItem("user_id")) {
                var obj = $("<div class=\"friend\">\n" +
                    "                            <div class=\"friend_img\"><img class=\"friend_avatar\" :attr=\"\"></div>\n" +
                    "                            <div class=\"content\"></div>\n" +
                    "                        </div>");
                $(".modal-body").append(obj);
                obj.find(".content")[0].innerHTML = data.data[i].message;
            }
            if (data.data[i].sendUserId == localStorage.getItem("user_id")) {
                var obj = $("<div class=\"me\">\n" +
                    "                            <div class=\"content\"></div>\n" +
                    "                            <div class=\"friend_img\"><img class=\"my_avatar\" :attr=\"\"></div>\n" +
                    "                        </div>")
                $(".modal-body").append(obj);
                obj.find(".content")[0].innerHTML = data.data[i].message;
            }
        }
        $(".friend_avatar").attr("src", vm.friend_avatar);
        $(".my_avatar").attr("src", vm.user_avatar);
        vm.scroll_auto();
    },

    //打开与目标用户的聊天室，取出聊天记录
    getHistoryChat: function (targetId) {
        var url = "http://dududu.soarteam.cn/market/api/openChatRoom";
        var jsonData = {
            "myUserId": parseInt(localStorage.getItem("user_id")),
            "targetUserId": targetId
        }
        $.ajax({
            url: url,
            type: 'POST',
            contentType: "application/json; charset=utf-8",
            dataType: "json",
            data: JSON.stringify(jsonData),
            headers: {
                'Authorization': localStorage.getItem("token")
            },
        }).success(function (data) {
            vm.replaceChatHistory(data);
            vm.scroll_auto();
        }).error(function (err, status) {
            console.log(err)
        });
    },

    //发送消息给对方
    sendMessage: function (message, targetId) {
        var url = "http://dududu.soarteam.cn/market/api/sendMessage";
        var jsonData = {
            "message": message,
            "recivedtUserId": targetId,
            "sendUserId": parseInt(localStorage.getItem("user_id")),
        }
        $.ajax({
            url: url,
            type: 'POST',
            contentType: "application/json; charset=utf-8",
            dataType: "json",
            data: JSON.stringify(jsonData),
            headers: {
                'Authorization': localStorage.getItem("token")
            },
        }).success(function (data) {
        }).error(function (err, status) {
            console.log(err)
        });
    },

    //联系卖家
    createChat: function () {
        var seller_id = localStorage.getItem("sellerid")
        if (seller_id != null && seller_id != "") {
            vm.targetId = seller_id;
            vm.getUserInfoById_seller(seller_id)
        }
    },

    bindListeners: function () {
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

        //聊天室点击发送按钮
        $("#send_btn").click(function () {
            var newObj = $("<div class=\"me\">\n" +
                "                            <div class=\"content\"></div>\n" +
                "                            <div class=\"friend_img\"><img class=\"my_avatar\" :attr=\"\"></div>\n" +
                "                        </div>")
            $(".modal-body").append(newObj);
            var message = $(".input_text").val()
            newObj.find(".content")[0].innerHTML = message;
            vm.sendMessage(message, vm.targetId)
            vm.scroll_auto();
            $(".my_avatar").attr("src", vm.user_avatar);
            $(".input_text").val("")
        })
        //模态框消失触发事件
        $('#myModal').on('hidden.bs.modal', function () {
            $(".modal-body")[0].innerHTML = "";
            vm.targetId = "";
            vm.findMyChatRoom();
        })
    }


});
vm.bindListeners();
vm.setWidth();
vm.getUserInfoById(); //当前用户信息
vm.history_show(); //历史浏览记录
vm.createChat(); //联系卖家跳转显示聊天窗
vm.findMyChatRoom(); //获取有关于我的聊天室
vm.connect(); //监听动态

//判断是否登陆
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
            window.location.href = 'index.html';
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
            window.location.href = "index.html";
        });
    }
    else {
        $('.hidden_div').css("display", "none");

    }
}
