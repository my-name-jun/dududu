var commonService = require('../../lib/commonService');
var service = require('./service');
var college = require('../../lib/dic/college');
var major = require('../../lib/dic/major');
var net = require('../../network/network');
//GEN_dependences

var vm = avalon.define({
    $id: "vm",
    img_logo: require('./img/3.jpg'),
    classification_list: require('../../lib/dic/classification_list'),
    img_logo1: require('./img/1.jpg'),
    edit: true,
    edit1: false,
    edit2: false,
    edit3: true,
    edit4: true,
    edit5: false,
    photo_add: require('./img/photo_add.png'),
    gexing: '叽叽喳喳吱吱喳喳到家了卡三等奖爱是可敬的卡死了件大事，你，新农村明\n' +
    '能飞吗能飞吗，是的内分泌，迪士尼方面上你的佛挡杀佛大码数打可是！',
    college: college,
    major: major,
    birthday: '',
    num: 8,
    Essential_information: '',
    urlhttp: 'http://dududu.soarteam.cn',
    field: false,//字段传给商品列表的
    avatar: 'dsa',

    //region 组件数据

    //GEN_properties

    //endregion

    //region 主要数据

    //endregion 主要数据

    Essential_information_name: '',
    Essential_information_sex: '',
    Essential_information_faculty: '',
    Essential_information_profession: '',
    Essential_information_birthday: '',
    Essential_information_mobile: '',
    Essential_information_signature: '',


    //region 主逻辑

    //endregion 主逻辑

    //region 组件逻辑

    //GEN_actions

    //endregion

    //region 校验逻辑

    //endregion

    //region 数据监听

    //搜索
    serach_click: function () {
        var value_id = $('#form_control').val();
        vm.field = true;
        localStorage.setItem('Commodity_information', value_id);
        localStorage.setItem('field', vm.field);
        window.location.href = "commodity_list.html";
    },


    edit_inf: function () {
        if (vm.edit == true) {
            vm.edit = false;
            vm.edit4 = false
            vm.edit1 = true;
            vm.edit2 = false;
            vm.edit5 = true;
        }
        $('.sell_information_basic').css('top', '-18.8%');
        $('.edit').css('width', '85%');
    },

//修改密码
    edit_inf_pwd: function () {
        if (vm.edit == true) {
            vm.edit = false;
            vm.edit2 = true;
            vm.edit1 = false;
            vm.edit3 = false;
            vm.edit5 = true;
        }
    },
    old:'',//旧密码
    new1:'',//新密码
    new2:'',//第二次新密码
    edit_inf_pwd1: function () {
        vm.old = $('#Essential_information_old_pwd').val();
        vm.new1 = $('#Essential_information_new_pwd').val();
        vm.new2 = $('#Essential_information_new_pwd1').val();
        if(vm.new1.length<6){
            alert("新密码不能少于6位!");
            return;
        }
        if (vm.new1 != vm.new2) {
            alert("两次输出不一致，请重新输入！");
            return;
        }
        vm.posttestpwd(function () {
            window.location.href = "Essential_information.html";
        },vm.old,vm.new1);
    },

    posttestpwd:function (callback,oldpwd,newpwd) {
        var that = this;
        $.ajax({
            url: 'http://dududu.soarteam.cn/market/api/user/'+Number(localStorage.getItem("user_id")),
            type: 'put',
            contentType: "application/json; charset=utf-8",
            dataType: "json",
            id: 100,
            data:JSON.stringify({newPassword:newpwd,passWord:oldpwd}),
            headers: {
                'Authorization': localStorage.getItem('token')

            },
        }).success(function (data) {

            // object.dataall = data.data;
            callback(data);
            //object.dataallsell=data.data.sell;
            // console.log(object.dataall)
            //console.log(object.dataallsell)

        }).error(function (data) {
            console.log(1)
        });

    },


    user_id:'',
    //修改信息
    edit_inf_succ: function () {
        vm.Essential_information_name = $('#Essential_information_name').val();
        if (vm.Essential_information_name == '') {
            alert("用户名不能为空");
            return;
        }
        vm.user_id=localStorage.getItem('user_id')
        vm.Essential_information_sex = $('.sex').val();
        vm.Essential_information_sex = Number(vm.Essential_information_sex);
        vm.Essential_information_faculty = $('#Essential_information_faculty option:selected').val();
        vm.Essential_information_profession = $('#Essential_information_profession').val();
        vm.Essential_information_birthday = $('#birthday').val();
        vm.Essential_information_mobile = $('#phone').val();

        var reg =/^0?1[3|4|5|6|7|8][0-9]\d{8}$/;

        if (vm.Essential_information_mobile == '') {
            alert("用户名不能为空");
            return;
        }

        if(!(reg.test(vm.Essential_information_mobile))){
            alert("手机号输入不正确");
            return;
            }
        vm.Essential_information_signature = $('#Essential_information_signature').val();


        // var url=urlhttp + vm.Essential_information.userInfo.avatar;
        // getBase64(url)
        //     .then(function(base64){
        //         console.log(base64);//处理成功打印在控制台
        //     },function(err){
        //         console.log(err);//打印异常信息
        //     });


        // alert(vm.Essential_information_name);
        // alert( vm.Essential_information_sex);
        // alert(vm.Essential_information_faculty);
        // alert(vm.Essential_information_profession);
        // alert(vm.Essential_information_birthday);
        // alert(vm.Essential_information_mobile);
        // alert(vm.Essential_information_signature);

        // alert(typeof vm.avatar)


        let formData = new FormData();
        formData.append('id', vm.user_id);
        formData.append('name', vm.Essential_information_name);
        formData.append('sex', vm.Essential_information_sex);
        formData.append('faculty', vm.Essential_information_faculty);
        formData.append('profession', vm.Essential_information_profession);
        formData.append('birthday', vm.Essential_information_birthday);
        formData.append('mobile', vm.Essential_information_mobile);
        formData.append('signature', vm.Essential_information_signature);
        formData.append('image', vm.dataURLtoFile(vm.avatar));
        // alert(vm.dataURLtoFile(vm.avatar))
        // console.log(formData);
        $.ajax({
            url: 'http://dududu.soarteam.cn/market/api/user/update',
            type: 'post',
            // contentType: "application/json; charset=utf-8",
            data: formData,
            contentType: false,
            processData: false,
            headers: {
                'Authorization': localStorage.getItem('token')
            },
        }).success(function (data) {
            window.location.href = 'Essential_information.html';
            console.log(data.data);


        }).error(function (data) {
            console.log(1)
        });


    },
    arrow_left: function () {
        window.location.href = 'Essential_information.html';
    },
    birthday1: function () {
        $('#birthday').datetimepicker({
            language: 'zh-CN',
            //startDate: new Date(),能被选择的开始时间
            endDate: new Date(),
            autoclose: true,     //选择完成后自动关闭
            todayBtn: true,        //显示今天按钮
            //weekStart: 1,        //周的开始时间默认0周日
            minView: 2,      //时间选择视图【0：小时，1：天，2：月，3：年,4：十年】
            format: 'yyyy-mm-dd',
            bootcssVer: 3,
        });
    },
    ldie: function () {
        window.location.href = 'ReleaseGoods.html';
    },
    index: function () {
        window.location.href = 'index.html';
    },


    //剪裁头像
    cropCavatar: function () {
        var file = $("#avatar_label").find("input")[0].files[0];
        var reader = new FileReader();
        //创建文件读取相关的变量
        var imgFile;
        //为文件读取成功设置事件
        reader.onload = function (e) {
            imgFile = e.target.result;
            $("#modal_img").attr("src", imgFile);
            vm.crop();
            $('#modal_img').cropper('replace', imgFile, false);
        };
        reader.readAsDataURL(file);
        $('#myModal1').modal('show');
        $("#cropper_btn").unbind("click").bind("click", function (event) {
            var c = $('#modal_img').cropper("getCroppedCanvas", {
                width: 200,
                height: 200
            });
            c.toBlob(function (blob) {
                $("#edit_avatar").attr("src", URL.createObjectURL(blob));
                vm.avatar = c.toDataURL();
            })
            $('#myModal1').modal('hide');
            // alert(vm.avatar)
        })
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

    //剪裁
    crop: function () {
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

    bindListeners: function () {


        //
        // //传入图片路径，返回base64
        // function getBase64(img){
        //     function getBase64Image(img,width,height) {//width、height调用时传入具体像素值，控制大小 ,不传则默认图像大小
        //         var canvas = document.createElement("canvas");
        //         canvas.width = width ? width : img.width;
        //         canvas.height = height ? height : img.height;
        //
        //         var ctx = canvas.getContext("2d");
        //         ctx.drawImage(img, 0, 0, canvas.width, canvas.height);
        //         var dataURL = canvas.toDataURL();
        //         return dataURL;
        //     }
        //     var image = new Image();
        //     image.crossOrigin = '';
        //     image.src = img;
        //     var deferred=$.Deferred();
        //     if(img){
        //         image.onload =function (){
        //             deferred.resolve(getBase64Image(image));//将base64传给done上传处理
        //         }
        //         return deferred.promise();//问题要让onload完成后再return sessionStorage['imgTest']
        //     }
        // }


        net.posttestEssential_information(function (data) {
            vm.Essential_information = data;
            console.log(vm.Essential_information);

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



        //更改头像
        $(".sell_head_img").change(function () {
            vm.cropCavatar();
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
