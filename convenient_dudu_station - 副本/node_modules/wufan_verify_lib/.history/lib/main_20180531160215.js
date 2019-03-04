
var libs = {
    /*************************通用表达式****************************** */

    //检查空值
    checkNull: function(v) {
        var result = { state: 1, content: "" };
        if (
            v == null ||
            v == undefined ||
            v == "undefined" ||
            v == "null" ||
            v == "" ||
            v == "" ||
            v == []
        ) {
            result.state = -1;
        }
        return result;
    },
    //拆解号码 -
    extractPhoneInfo: function(str) {
        var result = { state: 1, content: "" };
        if (checkNull(str)) {
            var _sep = str.split("-");
            result.content = _sep;
        } else {
            result.state = -1;
        }
        return result;
    },
    //拆解邮件 @
    extractEmailInfo: function(str) {
        var result = { state: 1, content: "" };
        if (checkNull(str)) {
            var _sep = str.split("@");
            result.content = _sep;
        } else {
            result.state = -1;
        }
        return result;
    },
    //手机号码校验
    MobileCheck: function(value) {
        var result = { state: 1, content: "" };
        var patt1 = new RegExp("^[1][3,4,5,6,7,8,9][0-9]{9}$"); //验证长度，第一位数必须是1
        if (!patt1.test(value)) {
            result.state = -1;
        }
        return result;
    },
    //电子邮件校验
    EmailCheck: function(value) {
        var result = { state: 1, content: "" };
        var patt1 = new RegExp(
            "^([a-zA-Z0-9_\\-\\.]+)@((\\[[0-9]{1,3}\\.[0-9]{1,3}\\.[0-9]{1,3}\\.)|(([a-zA-Z0-9_\\-]+\\.)+))([a-zA-Z]{2,4}|[0-9]{1,3})(\\]?)$"
        ); //验证邮件
        if (!patt1.test(value)) {
            result.state = -1;
        }
        return result;
    },
    //检测区号长度
    AreaCodeCheck: function(areaCode) {
        var result = {state:1,content:""};
        if (!areaCode || areaCode == "null") {
            return result;
        }
        if (areaCode != null || areaCode != "-") {
            var codeLength = areaCode.split("-")[0].length;
            if (codeLength < 3 || codeLength > 4) {
                result.state = -1;
            }
        }
        return result;
    },
    //检测座机电话
    PhoneCodeCheck: function(phone) {
        var result = {state:1,content:""};

        if (!phone) {
            return result;
        }

        if (phone) {
            var areaCode = phone.split("-")[0];
            var phoneNumber = phone.split("-")[1];
            var codeLength = phoneNumber.length;
            if (codeLength == 7 || codeLength == 8) {
                if (areaCode.length < 3 || areaCode.length > 4) {
                    result.state = -1;
                }
            } else if (codeLength == 10) {
                var begin = phoneNumber.substr(0, 3);
                if (begin == 400 || begin == 800) {
                } else {
                    result.state = -1;
                }
            } else {
                result.state = -1;
            }
        }
        return isValid;
    },
    //校验是否含有小写字符
    checkSmallLetter: function(icNumber) {
        var result = {state:1,content:""};
        //在JavaScript中，正则表达式只能使用"/"开头和结束，不能使用双引号
        var Expression = /^.*[a-z]+.*$/;
        var objExp = new RegExp(Expression);
        if (objExp.test(icNumber) == true) {
            result.state = -1;
        } 
        return result;
    },
    //出生日期校验
    checkBirthday: function(value) {
        var result = {state:1,content:""};
        var a = /^(\d{4})-(\d{2})-(\d{2})$/;
        if (!a.test(value)) {
            result.state = -1;
        } 
        return result;
    },
    //检查根据身份证检查性别是否匹配
    getSexFromIdCard: function(idcard) {
        var sexno, sex;
        var result = {state:1,content:""};
        if (idcard.length == 18) {
            sexno = idcard.substring(16, 17);
        } else if (idcard.length == 15) {
            sexno = idcard.substring(14, 15);
        } else {
            result.content = "错误的身份证号码，请核对！";
            result.state = -1;
            return result;
        }
        var tempid = sexno % 2;
        if (tempid == 0) {
            sex = 1; //返回女
        } else {
            sex = 0; //返回男
        }
        result.content = sex;
        return result;
    },
    // 收入校验
    IncomeCheck: function(value) {
        var result = {state:1,content:""};
        if (value == 0) {
            result.state = -1;
        } else if (value == "" || value == null) {
            result.state = -1;
        } 
        return result;
    },
    //带小数的年收入检查(0.2  2  1.66等格式)
    IncomeWithFloatCheck: function(v) {
        var result = {state:1,content:""};
        var r = new RegExp("^\\d+(\\.\\d+)?$");
        if (r.test(v)) {
        } else {
            result.state = -1;
        }
        return result;
    },
    //去除空格
    removeAllSpace: function(str) {
        var result = {state:1,content:""};
        result.content = str.replace(/\s+/g, "");
        return result;
    },


   /********姓名校验******** */
        //校验中文字符数量
        NameChineseNum: function(str) {
            var result = { state: 1, content: "" };
            var patt1 = new RegExp(/^[\u0391-\uFFE5]+$/);
            var strNumber = 0;
            for (var i = 0; i < str.length; i++) {
                if (patt1.test(str[i])) {
                    strNumber = strNumber + 1;
                }
            }
            result.content = strNumber;
            return result;
        },
        ////校验英文字符数量
        NameEnglishNum: function(str) {
            var result = { state: 1, content: "" };
            var patt1 = new RegExp(/^[A-Za-z]+$/);
            var strNumber = 0;
            for (var i = 0; i < str.length; i++) {
                if (patt1.test(str[i])) {
                    strNumber = strNumber + 1;
                }
            }
            result.content = strNumber;
            return result;
        },
        //校验一个一上、十一个以下中文字符
        NameChineseCheck: function(value) {
            var result = { state: 1, content: "" };
            var patt1 = new RegExp(/^[\u4e00-\u9fa5]{2}[a-zA-Z]{4}$/); //验证只能中文输入
            if (
                this.NameChineseNum(value).content <= 10 &&
                this.NameChineseNum(value).content > 1 &&
                patt1.test(value)
            ) {
            } else {
                result.content =
                    "员工姓名必须含有一个以上、十一个以下中文字符，或者四位或以上英文字符，且不能含有阿拉伯数字或空格";
                result.state = -1;
            }
            return result;
        },
        //校验四位或以上英文字符
        NameEnglishCheck: function(value) {
            var result = { state: 1, content: "" };
            var patt1 = new RegExp(/^[a-zA-Z\s]{4}$/); //验证只能中文输入
            if (this.NameEnglishNum(value).content > 3&&patt1.test(value)) {
            } else {
                result.content =
                    "员工姓名必须含有一个以上、十一个以下中文字符，或者四位或以上英文字符，且不能含有阿拉伯数字或空格";
                result.state = -1;
            }
            return result;
        },
    /********姓名校验******** */


    /********地址校验 格式 省#市#区**************/
        //名称输入其他字符会自动删除
        nameStripscript2: function(s) {
            var pattern = new RegExp(/^[\u4e00-\u9fa5]{1}$/);
            var rs = "";
            for (var i = 0; i < s.length; i++) {
                if (
                    s.substr(i, 1).replace(pattern) == undefined ||
                    s.substr(i, 1).replace(pattern) == "undefined" ||
                    s.substr(i, 1).replace(pattern) == null
                ) {
                    rs = rs + s.substr(i, 1);
                }
            }
            return rs;
        },
        //验证地址输入,中文字符不能小于5个
        validateInputAddressLt5Cn: function(v) {
            v = this.nameStripscript2(v);
            var patt1 = new RegExp("^[\u4e00-\u9fa5]{5,}$"); //验证只能中文输入
            if (patt1.test(v)) {
                return true;
            } else {
                return false;
            }
        },
        checkDistrictEmpty: function(cityId) {
            var isEmpty = true;
            for (var i = 0; i < districts.length; i++) {
                var sub = districts[i].id.substring(0, 4);
                if (sub == cityId) {
                    isEmpty = false;
                }
            }
            return isEmpty;
        },
        AddressCheck: function(v) {
            var strs = v.split("#");
            var result = {state:1,content:""};

            if (strs[0] == "MAC" || strs[0] == "HKG" || strs[0] == "TWN") {
                if (strs[0] == 0 || strs[0] == "0") {
                    result.state = -1;
                    return result;
                }

                if (strs[3] != null && strs[3] != "") {
                } else {
                    result.state = -1;
                    return result;
                }
                //验证输入必须大于5个中文字符
                if (this.validateInputAddressLt5Cn(strs[3])) {
                } else {
                    result.state = -1;
                    return result;
                }
            } else {
                if (strs[0] == 0 || strs[0] == "0") {
                    result.state = -1;
                    return result;
                }

                if (strs[1] == 0 || strs[1] == "0") {
                    result.state = -1;
                    return result;
                }

                if (strs[1] == "4420" || strs[1] == "4419") {
                } else {
                    if (strs[2] == 0 || strs[2] == "0") {
                        if (this.checkDistrictEmpty(strs[1])) {
                        } else {
                            result.state = -1;
                            return result;
                        }
                    }
                }

                if (strs[3] != null && strs[3] != "") {
                } else {
                    result.state = -1;
                    return result;
                }

                //验证输入必须大于5个中文字符
                if (this.validateInputAddressLt5Cn(strs[3])) {
                } else {
                    result.state = -1;
                    return result;
                }

                if (strs[3].indexOf("#") > 0) {
                    result.state = -1;
                    return result;
                }
            }
            return result;
        },
    /********地址校验 格式 省#市#区**************/



    /********校验身份证有效期日期******** */
        isDate: function(dateString) {
            if (dateString.trim() == "") return true;
            var r = dateString.match(/^(\d{1,4})(-|\/)(\d{1,2})\2(\d{1,2})$/);
            if (r == null) {
                return false;
            }
            var d = new Date(r[1], r[3] - 1, r[4]);
            var num =
                d.getFullYear() == r[1] &&
                d.getMonth() + 1 == r[3] &&
                d.getDate() == r[4];
            if (num == 0) {
                return false;
            }
            return num != 0;
        },
        MonthAndDay: function(v) {
            if (
                v == 1 ||
                v == 2 ||
                v == 3 ||
                v == 4 ||
                v == 5 ||
                v == 6 ||
                v == 7 ||
                v == 8 ||
                v == 9
            ) {
                v = "0" + v;
            }
            return v;
        },
        checkVaildIcTime: function(ic_is_long_valid,ic_expiry_day) {
            var result = {state:1,content:""};
            if (ic_is_long_valid == 0 || ic_is_long_valid == "0") {
                if (ic_expiry_day) {
                    if (this.isDate(ic_expiry_day)) {
                        var now = new Date();
                        var dateNow =
                            now.getFullYear() +
                            "-" +
                            this.MonthAndDay(now.getMonth() + 1) +
                            "-" +
                            this.MonthAndDay(now.getDate());
                        if (ic_expiry_day == dateNow) {
                            result.state = -1;
                        }
                    } else {
                        result.state = -1;
                    }
                } else {
                    result.state = -1;
                }
            } 
            return result;
        },

    /********校验身份证有效期日期******** */




    /********证件类型与国籍校验************* */

        //非中国籍不能选择居民身份证
        checkCountryAndIcType: function(country,ic_type) {
            if (
                !(
                    country == "CHN" ||
                    country == "HKG" ||
                    country == "MAC" ||
                    country == "TWN"
                )
            ) {
                if (ic_type == "I") {
                    return false;
                } else {
                    return true;
                }
            } else {
                return true;
            }
        },
        //国籍为中国大陆，>=16周岁，必须为身份证IL、军官证W、士兵证S
        checkCountryAndAgeLt16: function(country,ic_type, age) {
            var isValid = true;
            if (country == "CHN") {
                if (age >= 16) {
                    if (
                        ic_type == "I" ||
                        ic_type == "L" ||
                        ic_type == "A" ||
                        ic_type == "S"
                    ) {
                    } else {
                        return false;
                    }
                }
            }
            return isValid;
        },
        //国籍为中国大陆，>=10周岁且<16周岁必须为户口本H、身份证IL
        checkCountryAndAgeBetween3To16: function(country,ic_type, age) {
            var isValid = true;
    
            if (country == "CHN") {
                if (age >= 3 && age < 16) {
                    if (
                        ic_type == "I" ||
                        ic_type == "L" ||
                        ic_type == "H"
                    ) {
                    } else {
                        return false;
                    }
                }
            }
            return isValid;
        },
        //国籍为中国大陆，>=0周岁且<3周岁必须为户口本H、身份证IL
        checkCountryAndAgeBetween0To3: function(country,ic_type, age) {
            var isValid = true;
            if (country == "CHN") {
                if (age < 3) {
                    if (
                        ic_type == "B" ||
                        ic_type == "H" ||
                        ic_type == "I" ||
                        ic_type == "L"
                    ) {
                    } else {
                        return false;
                    }
                }
            }
            return isValid;
        },
        //国籍为香港、澳门，必须为港澳居民来往内地通行证
        checkHongKongAndMacaoIcType: function(country,ic_type) {
            var isValid = true;
            if (country == "HKG" || country == "MAC") {
                if (ic_type != "T") {
                    return false;
                }
            }
            return isValid;
        },
        //国籍为香港、澳门，必须为港澳居民来往内地通行证
        checkTaiwanIcType: function(country,ic_type) {
            var isValid = true;
            if (country == "TWN") {
                if (ic_type != "R") {
                    return false;
                }
            }
            return isValid;
        },
        //外籍人士，必须为护照
        checkOtherIcType: function(country,ic_type) {
            var isValid = true;
            if (
                country != "CHN" &&
                country != "HKG" &&
                country != "MAC" &&
                country != "TWN"
            ) {
                if (ic_type != "P") {
                    return false;
                }
            }
            return isValid;
        },
        //证件类型与国籍校验
        IcTypeAndCountryCheck: function(country,ic_type, age) {
            var result = {state:1,content:""};
            var isValid = true;
            if (this.checkCountryAndIcType(country,ic_type)) {
            } else {
                result.content ="非中国籍不能选择居民身份证，请检查";
                result.state = -1;
                return result;
            }

            if (this.checkCountryAndAgeLt16(country,ic_type, age)) {
            } else {
                result.content ="16周岁（含）以上中国大陆国籍被保人，证件类型必须为身份证、军官证、士兵证";
                result.state = -1;
                return result;
            }

            if (this.checkCountryAndAgeBetween3To16(country,ic_type, age)) {
            } else {
                result.content ="3周岁（含）-15周岁（含）中国大陆国籍被保人，证件类型必须为户口本、身份证";
                result.state = -1;
                return result;
            }

            if (this.checkCountryAndAgeBetween0To3(country,ic_type, age)) {
            } else {
                result.content ="0周岁（含）-2周岁（含）中国大陆国籍被保人，证件类型必须为出生证、户口本、身份证";
                result.state = -1;
                return result;
            }

            if (this.checkHongKongAndMacaoIcType(country,ic_type)) {
            } else {
                result.content ="被保人国籍为香港、澳门，证件类型必须为港澳居民来往内地通行证";
                result.state = -1;
                return result;
            }

            if (this.checkTaiwanIcType(country,ic_type)) {
            } else {
                result.content ="被保人国籍为台湾，证件类型必须为台湾居民来往大陆通行证";
                result.state = -1;
                return result;
                
            }

            if (this.checkOtherIcType(country,ic_type)) {
            } else {
                result.content ="外籍被保人，证件类型必须为护照";
                result.state = -1;
                return result;
            }

            return result;
        },
        //身份证号码校验
        IdCardCheck: function(idcard) {
            var Y, JYM, JYM_X, ereg, Errors, area, S, M, M_X, idcard_array;
            var result = {state:1,content:""};
            if (idcard === "") {
                result.state = -1;
                return result;
            }

            area = {
                11: "北京",
                12: "天津",
                13: "河北",
                14: "山西",
                15: "内蒙古",
                21: "辽宁",
                22: "吉林",
                23: "黑龙江",
                31: "上海",
                32: "江苏",
                33: "浙江",
                34: "安徽",
                35: "福建",
                36: "江西",
                37: "山东",
                41: "河南",
                42: "湖北",
                43: "湖南",
                44: "广东",
                45: "广西",
                46: "海南",
                50: "重庆",
                51: "四川",
                52: "贵州",
                53: "云南",
                54: "西藏",
                61: "陕西",
                62: "甘肃",
                63: "青海",
                64: "宁夏",
                65: "新疆",
                71: "台湾",
                81: "香港",
                82: "澳门",
                91: "国外"
            };

            //先看在不在36个省里
            //再看是不是是1

            idcard_array = idcard.split("");
            /*地区检验*/
            if (area[parseInt(idcard.substr(0, 2))] == null) {
                result.state = -1;
                return result;
            }
            /*身份号码位数及格式检验*/
            switch (idcard.length) {
                case 15:
                    if (
                        (parseInt(idcard.substr(6, 2)) + 1900) % 4 == 0 ||
                        ((parseInt(idcard.substr(6, 2)) + 1900) % 100 == 0 &&
                            (parseInt(idcard.substr(6, 2)) + 1900) % 400 == 0)
                    ) {
                        ereg = /^[1-9][0-9]{5}[0-9]{2}((01|03|05|07|08|10|12)(0[1-9]|[1-2][0-9]|3[0-1])|(04|06|09|11)(0[1-9]|[1-2][0-9]|30)|02(0[1-9]|[1-2][0-9]))[0-9]{3}$/; //测试出生日期的合法性
                    } else {
                        ereg = /^[1-9][0-9]{5}[0-9]{2}((01|03|05|07|08|10|12)(0[1-9]|[1-2][0-9]|3[0-1])|(04|06|09|11)(0[1-9]|[1-2][0-9]|30)|02(0[1-9]|1[0-9]|2[0-8]))[0-9]{3}$/; //测试出生日期的合法性
                    }
                    if (ereg.test(idcard)) {
                        result.content = 15;
                        return result;
                    } else {
                        result.state = -1;
                        return result;
                    }
                    break;

                case 18:
                    //18位身份号码检测
                    //出生日期的合法性检查
                    //闰年月日:((01|03|05|07|08|10|12)(0[1-9]|[1-2][0-9]|3[0-1])|(04|06|09|11)(0[1-9]|[1-2][0-9]|30)|02(0[1-9]|[1-2][0-9]))
                    //平年月日:((01|03|05|07|08|10|12)(0[1-9]|[1-2][0-9]|3[0-1])|(04|06|09|11)(0[1-9]|[1-2][0-9]|30)|02(0[1-9]|1[0-9]|2[0-8]))
                    if (
                        parseInt(idcard.substr(6, 4)) % 4 == 0 ||
                        (parseInt(idcard.substr(6, 4)) % 100 == 0 &&
                            parseInt(idcard.substr(6, 4)) % 4 == 0)
                    ) {
                        ereg = /^[1-9][0-9]{5}(19|20)[0-9]{2}((01|03|05|07|08|10|12)(0[1-9]|[1-2][0-9]|3[0-1])|(04|06|09|11)(0[1-9]|[1-2][0-9]|30)|02(0[1-9]|[1-2][0-9]))[0-9]{3}[0-9Xx]$/; //闰年出生日期的合法性正则表达式
                    } else {
                        ereg = /^[1-9][0-9]{5}(19|20)[0-9]{2}((01|03|05|07|08|10|12)(0[1-9]|[1-2][0-9]|3[0-1])|(04|06|09|11)(0[1-9]|[1-2][0-9]|30)|02(0[1-9]|1[0-9]|2[0-8]))[0-9]{3}[0-9Xx]$/; //平年出生日期的合法性正则表达式
                    }
                    if (ereg.test(idcard)) {
                        //测试出生日期的合法性
                        //计算校验位
                        S =
                            (parseInt(idcard_array[0]) +
                                parseInt(idcard_array[10])) *
                                7 +
                            (parseInt(idcard_array[1]) +
                                parseInt(idcard_array[11])) *
                                9 +
                            (parseInt(idcard_array[2]) +
                                parseInt(idcard_array[12])) *
                                10 +
                            (parseInt(idcard_array[3]) +
                                parseInt(idcard_array[13])) *
                                5 +
                            (parseInt(idcard_array[4]) +
                                parseInt(idcard_array[14])) *
                                8 +
                            (parseInt(idcard_array[5]) +
                                parseInt(idcard_array[15])) *
                                4 +
                            (parseInt(idcard_array[6]) +
                                parseInt(idcard_array[16])) *
                                2 +
                            parseInt(idcard_array[7]) +
                            parseInt(idcard_array[8]) * 6 +
                            parseInt(idcard_array[9]) * 3;
                        Y = S % 11;
                        M = "F";

                    JYM = "10x98765432";
                    JYM_X = "10X98765432";
                    M = JYM.substr(Y, 1);
                    /*判断校验位*/
                    M_X = JYM_X.substr(Y, 1);
                    /*判断校验位*/

                    if (M == idcard_array[17] || M_X == idcard_array[17]) {
                        result.state = 1;
                        return result;
                        /*检测ID的校验位false;*/
                    } else {
                        result.state = -1;
                        return result;
                    }
                } else {
                    result.state = -1;
                    return result;
                }
                break;

            default:
                result.state = -1;
                return result;
                break;
            }
        },
        checkSexAndId: function (ic_number, gender) {
            var sex = this.getSexFromIdCard(ic_number).content;
            if (sex != gender) {
                return false;
            } else {
                return true;
            }
        },
        //证件类型与证件号校验
        IcNumberAndTypeCheck: function(ic_type,ic_number,birthday,gender) {
            var result = {state:1,content:""};
            if (ic_number == "" || !ic_number) {
                result.state = -1;
                return result;
            } else {
                switch (ic_type) {
                    case "H": //户口本
                        if (ic_number.length < 18) {
                            result.content = "证件类型为身份证、户口本时,号码长度必须为18位";
                            result.state = -1;
                            return result;
                        
                        } else {
                            if (this.IdCardCheck(ic_number).state) {
                                if (
                                    ic_number.substring(6, 10) +
                                        "-" +
                                        ic_number.substring(10, 12) +
                                        "-" +
                                        ic_number.substring(12, 14) ==
                                    birthday
                                ) {
                                    if (
                                        !this.checkSexAndId(
                                            ic_number,
                                            gender
                                        )
                                    ) {
                                        result.content = "证件号码与性别不匹配";
                                        result.state = -1;
                                        return result;
                                    } else {
                                        return result;
                                    }
                                } else {
                                    result.content = "证件号码和出生日期不一致！请返回上一页确认正确的出生日期。";
                                    result.state = -1;
                                    return result;
                                    
                                }
                            } else {
                                result.content = "请输入正确的证件号";
                                result.state = -1;
                                return result;
                                
                            }
                        }

                        break;
                    case "I","L": //身份证,临时身份证
                        if (ic_number.length < 18) {
                            result.content = "证件类型为身份证、户口本时,号码长度必须为18位";
                            result.state = -1;
                            return result;
                            
                        } else {
                            if (this.IdCardCheck(ic_number).state) {
                                if (
                                    ic_number.substring(6, 10) +
                                        "-" +
                                        ic_number.substring(10, 12) +
                                        "-" +
                                        ic_number.substring(12, 14) ==
                                    birthday
                                ) {
                                    if (
                                        !this.checkSexAndId(
                                            ic_number,
                                            gender
                                        )
                                    ) {
                                        result.content = "证件号码与性别不匹配";
                                        result.state = -1;
                                        return result;
                                        
                                    } else {
                                        return result;
                                    }
                                } else {
                                    result.content = "证件号码和出生日期不一致！请返回上一页确认正确的出生日期。"
                                    result.state = -1;
                                    return result;
                                    
                                }
                            } else {
                                result.content = "请输入正确的证件号"
                                result.state = -1;
                                return result;
                            }
                        }

                        break;
                    
                    case "P": //护照
                        if (ic_number.length >= 3) {
                            return result;
                        } else {
                            result.content = "证件类型为护照时，号码长度不能少于3个字符"
                                result.state = -1;
                                return result;
                            
                        }
                        break;
                    case "T": //港澳通行证
                        if (ic_number.length >= 8) {
                            return result;
                        } else {
                            result.content = "证件类型为港澳居民来往内地通行证或台湾居民来往大陆通行证时，号码长度不能少于8个字符"
                                result.state = -1;
                                return result;
                            
                        }
                        break;
                    case "R": //台胞通行证
                        if (ic_number.length >= 8) {
                            return result;
                        } else {
                            result.content = "证件类型为港澳居民来往内地通行证或台湾居民来往大陆通行证时，号码长度不能少于8个字符"
                                result.state = -1;
                                return result;
                        }
                        break;
                    case "A","S": //士兵证,军官证
                        if (
                            ic_number.length >= 10 &&
                            ic_number.length <= 18
                        ) {
                            return result;
                        } else {
                            result.content = "证件类型为军官证或士兵证，号码长度在10-18个字符之间"
                            result.state = -1;
                            return result;
                            
                        }
                        break;
                    case "B": //婴儿证
                        if (ic_number.length >= 3) {
                            return result;
                        } else {
                            result.content = "证件类型为出生证,号码长度不能少于3个字符";
                            result.state = -1;
                            return result;
                            
                        }
                        break;
                    default:
                        if (ic_number.length >= 1) {
                            return result;
                        } else {
                            result.content = "请输入正确的证件号";
                            result.state = -1;
                            return result;
                        }
                        break;
                }
            }
        },
    /********联合校验证件号与国籍年龄的关系************* */

};

exports.libs = libs;
