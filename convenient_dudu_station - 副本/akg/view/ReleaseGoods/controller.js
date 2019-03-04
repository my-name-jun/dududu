var commonService = require('../../lib/commonService');
var service = require('./service');

//GEN_dependences


var vm = avalon.define({
    $id: "vm",

    width: 1920,

    //region 组件数据
    study: '学习用品',
    electronics: '电子产品',
    nursing: '美妆/个人护理',
    clothing: '服装',
    skill: '个人技能',
    user: '用户xxx',
    category_one: 1,
    category: "17",
    field: false,
    category_two: [{id: "17", name: '书'},
        {id: "18", name: '文具'}],

    img_logo: require('./img/3.jpg'),
    photo_add: require('./img/photo_add.png'),
    delete_icon: require('./img/delete_icon.png'),


    classification: '',
    classification_list: require('../../lib/dic/classification_list'),

    category_list: require('./lib/category'),
    category_two_list: require('./lib/categoryTwo'),

    // degree_list: require('./lib/degree'),
    image: new Array(),
    imageURL: new Array(),
    imageNo: 0,

    //GEN_properties

    //endregion

    //region 主要数据

    //endregion 主要数据

    //region 主逻辑

    //endregion 主逻辑

    //region 组件逻辑
    //适应设备
    setWidth: function () {
        vm.width = window.screen.width;
        $("#container").css("width", vm.width);
    },

    //获取图片
    loadImg: function loadImg(label, imgNum) {
        var labelstr = "#" + label;
        var imgstr = "#img" + imgNum;
        //获取文件
        var file = $(labelstr).find("input")[0].files[0];

        //创建读取文件的对象
        var reader = new FileReader();

        //创建文件读取相关的变量
        var imgFile;
        //为文件读取成功设置事件
        reader.onload = function (e) {
            imgFile = e.target.result;
            $("#modal_img").attr("src", imgFile);
            vm.test();
            $('#modal_img').cropper('replace', imgFile, false);
        };
        //正式读取文件
        reader.readAsDataURL(file);
        //图片剪裁模态框弹出
        $('#myModal').modal('show');
        // 当按保存修改时，将剪裁图片存入图片Array
        $("#cropper_btn").unbind("click").bind("click", function (event) {
            var c = $('#modal_img').cropper("getCroppedCanvas", {
                width: 200,
                height: 200
            });
            c.toBlob(function (blob) {
                if (vm.imageURL[imgNum - 1] == null) {
                    vm.imageNo = vm.imageNo + 1;
                }
                vm.image[imgNum - 1] = c.toDataURL();
                vm.imageURL[imgNum - 1] = URL.createObjectURL(blob);
                $(imgstr).attr('src', vm.imageURL[imgNum - 1]);
                var n = parseInt(imgNum) + 1;
                var del = "#del" + imgNum;
                $(del).show();
                if (imgNum < 6) {
                    var label2 = "#photo" + n;
                    $(label2).show();
                }
                $('#myModal').modal('hide');
            });
            // vm.image.push(URL.createObjectURL(c));
            // $(imgstr).attr('src',vm.image[imgNum-1]);

        });
    },


    // //图片压缩
    // compress: function (img) { // img可以是dataURL或者图片url
    //     var canvas, ctx;
    //
    //     canvas = document.createElement('canvas');
    //     canvas.width = 200;
    //     canvas.height = 200;
    //
    //     ctx = canvas.getContext("2d");
    //     ctx.drawImage(img, 0, 0, 200, 200,0,0,200,200);
    //     return canvas; // 压缩后的图片文件
    // },

    //获取表单数据
    getData: function () {
        var formData = new FormData();
        var price, user_id, name, storage, description, news;
        price = $("#input_price").val();
        user_id = localStorage.getItem("user_id");
        name = $("#input_name").val();
        storage = parseInt($("#input_storage").val());
        description = $("#input_description").val();
        // news = vm.degree;

        if (price == null || price == "" || name == null || name == "" || storage == null || storage == "" || description == null ||
            description == "" || vm.category_one == null || vm.category_one == "" || vm.imageURL[0] == null || vm.imageURL == "") {
            alert("请填写信息，信息未填写完整。")
            return;
        }

        formData.append('user_id', user_id);
        formData.append('name', name);
        formData.append('price', price);
        formData.append('storage', storage);
        formData.append('description', description);
        formData.append('news', '0');
        if (vm.category_one == 6)
            formData.append('category_id', 6)
        else
            formData.append('category_id', vm.category.substring(1, vm.category.length));
        for (var i = 0; i < vm.image.length; i++) {
            if (vm.imageURL[i] != null)
                formData.append('image', vm.dataURLtoFile(vm.image[i], i));
        }

        vm.submit(formData);

    },

    // 将base64转换成file对象
    dataURLtoFile(dataurl, filename = 'file') {
        let arr = dataurl.split(',')
        let mime = arr[0].match(/:(.*?);/)[1]
        let suffix = mime.split('/')[1]
        let bstr = atob(arr[1])
        let n = bstr.length
        let u8arr = new Uint8Array(n)
        while (n--) {
            u8arr[n] = bstr.charCodeAt(n)
        }
        return new File([u8arr], `${filename}.${suffix}`, {type: mime})
    },
// ---------------------
//     作者：mystraight
// 来源：CSDN
// 原文：https://blog.csdn.net/qq_35568483/article/details/80287940
//     版权声明：本文为博主原创文章，转载请附上博文链接！

    //提交
    submit: function (formData) {
        $.ajax({
            url: "http://dududu.soarteam.cn/market/api/product",
            method: 'post',
            headers: {
                "Authorization": "eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJleHAiOjE1NDAwMTIwNTgsInVzZXJuYW1lIjoiMjAxNjEwMDk4MjExIn0.Hi5BxrzwTFZREEvYRqqfjAtKs8LfFMwXcU8Wn3-3m9U"
            },
            data: formData,
            contentType: false,
            processData: false,
        }).success(function (data, status) {
            alert("闲置物品提交成功！")
            location.reload(true)
        }).error(function (err, status) {
            alert("啊哦，出错了...提交失败QAQ")
        })
    },


    //GEN_actions

    //endregion

    //region 校验逻辑

    //endregion

    //region 数据监听
    bindListeners: function () {

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

        ///////
        $("#input1").change(function () {
            vm.loadImg("photo1", "1");
        })
        $("#input2").change(function () {
            vm.loadImg("photo2", "2");
        })
        $("#input3").change(function () {
            vm.loadImg("photo3", "3");
        })
        $("#input4").change(function () {
            vm.loadImg("photo4", "4");
        })
        $("#input5").change(function () {
            vm.loadImg("photo5", "5");
        })
        $("#submit").unbind("click").bind("click", function (event) {
            vm.getData()
        })
        $("#del1").unbind("click").bind("click", function (event) {
            vm.setImg(1)
        })
        $("#del2").unbind("click").bind("click", function (event) {
            vm.setImg(2)
        })
        $("#del3").unbind("click").bind("click", function (event) {
            vm.setImg(3)
        })
        $("#del4").unbind("click").bind("click", function (event) {
            vm.setImg(4)
        })
        $("#del5").unbind("click").bind("click", function (event) {
            vm.setImg(5)
        })
        //二级联动
        $("#category_one").change(function () {
            var that = vm;
            var value = $(this).val();
            service
                .getCategoryTwoByOne(value, vm.category_two_list)
                .then(function (category) {
                    that.category_two = category;
                    vm.category = category[0].id;
                });
        });

    },

    //删除后设置图片
    setImg: function (n) {
        var del_icon = "#del" + vm.imageNo;
        var imgstr = "#photo" + (vm.imageNo + 1);
        $(imgstr).hide();
        $(del_icon).hide();
        for (var i = 0; i <= vm.imageNo; i++) {
            if (vm.imageURL[i + 1] != null || vm.imageURL[i + 1] != undefined)
                vm.imageURL[i] = vm.imageURL[i + 1];
            else {
                vm.imageURL[i] = null;
            }
        }
        for (var i = n; i <= vm.imageNo; i++) {
            var imgstr = "#img" + i;
            if (vm.imageURL[i - 1] != null) {
                $(imgstr).attr('src', vm.imageURL[i - 1]);
            }
            else {
                $(imgstr).attr('src', vm.photo_add);
            }
        }
        vm.imageNo = vm.imageNo - 1;
    },

    //搜索
    serach_click: function () {
        var value_id = $('#form_control').val();
        vm.field = true;
        localStorage.setItem('Commodity_information', value_id);
        localStorage.setItem('field', vm.field);
        window.location.href = "commodity_list.html";
    },

    test: function () {
        $('#modal_img').cropper({
            aspectRatio: 1,
            viewMode: 1,
            background: false,
            minContainerWidth: 500,
            minCanvasWidth: 500,
            minCropBoxWidth: 200,
            minCanvasHeight: 500,
            minContainerHeight: 500,
            crop: function (e) {
                console.log(e);
            }
        })
    },


//endregion 数据监听

});

$("#photo2").hide();
$("#photo3").hide();
$("#photo4").hide();
$("#photo5").hide();
$("#del1").hide();
$("#del2").hide();
$("#del3").hide();
$("#del4").hide();
$("#del5").hide();
vm.bindListeners();
//GEN_run
vm.setWidth();

//判断是否登陆
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
