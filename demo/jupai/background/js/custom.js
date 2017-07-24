/*
 * 绑定dropdown-click组件事件
 */
$(document).on("click", ".dropdown-click:not(.disable)", function(event) {
    event.stopPropagation();
    $(this).toggleClass("opened");
});
$(document).on("click", function() {
    $(".dropdown-click").removeClass("opened");
});
$(document).on("click", ".dropdown-click .dropdown-menu>li", function() {
    $(this).parents(".dropdown-click").children(".dropdown-toggle").html($(this).text());
});
// 获取终端的相关信息
var Terminal = {
    // 辨别移动终端类型
    platform : function(){
        var u = navigator.userAgent, app = navigator.appVersion;
        return {
            // 是否为windows
            windows: u.indexOf('Windows NT') > -1 ,
            // 是否为mac
            mac: u.indexOf('Mac')
        };
    }(),
    // 辨别移动终端的语言：zh-cn、en-us、ko-kr、ja-jp...
    language : (navigator.browserLanguage || navigator.language).toLowerCase()
}
if(Terminal.platform.windows){
    $('html').addClass('windows').removeClass('mac');
}else if(Terminal.platform.mac){
    $('html').addClass('mac').removeClass('windows');
}else{
    $('html').removeClass('windows').removeClass('mac');
}
/*
 * 退出事件
 */
$(document).on('click', '#nav-user-quit', function(event) {
    event.preventDefault();
    window.location.href = BASEURL + 'admin/api/logout';
});

var customs = {};
var phoneReg = /^(0|86|17951)?(13[0-9]|15[012356789]|17[678]|18[0-9]|14[57])[0-9]{8}$/;
var nameReg = /^[^\s]{2,20}$/;
var pswReg = /^.{6,20}$/;


customs.edit = function () {
    var phoneNum = document.getElementById('phone-num');//客户联系方式
    var nickName = document.getElementById('contacts-people');//客户联系人名称
    // var unitPrice = document.getElementById('unit-price');//芯片单价
    // var hardwareNum = document.getElementById('hardware-num');//芯片数量
    var shareScene = document.getElementById('share-scene');//场景权限
    var messageManage = document.getElementById('message-manage');//广告管理

    var customAuth = document.getElementsByName('checkbox');//
    // var messagePrice = document.getElementById('message-price');//APP广告单价
    // var flowPrice = document.getElementById('flow-price');//信息流广告单价
    // var friendsPrice = document.getElementById('friends-price');//朋友圈广告单价
    // var noticePrice = document.getElementById('notice-price');//通知栏广告单价
    // var boxMessagePrice = document.getElementById('box-message-price');//
    // var messageBox = document.getElementById('message-box');//
    var submitButton = document.getElementById('submit-button');//

    // customs.getAgentZone();
    //暂不上线

    $("#nick-name").on("blur", function() {
       if(!nameReg.test($(this).val())) {
            alert("用户名格式错误");
       }
    });
    $("#password").on("blur", function() {
       if(!pswReg.test($(this).val())) {
            alert("密码格式错误");
       }
    });
    $("#verify-password").on("blur", function() {
        if($("#password").val() !== $("#verify-password").val()) {
            alert("两次输入的密码不一致");
        }
    });

    // function checkPrice(adPrice, adType){
    //     $.ajax({
    //         url: BASEURL + 'account/validateAdPrice',
    //         type: 'POST',
    //         dataType: 'json',
    //         data: {
    //             adPrice: adPrice,
    //             type: adType
    //         }
    //     })
    //     .done(function(data) {
    //         console.log(data);
    //         if(data.success){
                
    //         }else{
    //             layer.msg(data.errMsg, {icon: 5,time: 2000});
    //         }
    //     })
    //     .fail(function(data) {
    //         console.log(data);
    //         console.log("validateAdPrice error");
    //     });
    // }

    $("#message-price").on("blur", function() {
        if($("#message-price").val().trim() != "") {
            checkPrice($("#message-price").val().trim(), 1);
        }
    });
    // $("#flow-price").on("blur", function() {
    //     if($("#flow-price").val().trim() != "") {
    //         checkPrice($("#flow-price").val().trim(), 2);
    //     }
    // });
    $("#notice-price").on("blur", function() {
        if($("#notice-price").val().trim() != "") {
            checkPrice($("#notice-price").val().trim(), 3);
        }
    });

    $("input[name='user-type']").on("change", function() {
        if($("#user-type-1").prop("checked")) {
            $(".vital-row.agent-area").show();
            $(".vital-row.agent-industry").show();
        } else {
            $(".vital-row.agent-area").hide();
            $(".vital-row.agent-industry").hide();
        }
    });
    $("#agent-area").on("click", ".dropdown-menu>li", function() {
        $("#agent-area").attr("data-area", $(this).attr("data-area"));
    });

    //是否勾选广告管理权限
    $("#message-manage").on("change", function() {
        if($(this).prop("checked")) {
            $("#message-price").removeAttr('readonly');
            $("#message-price").removeClass('no-drop');
            $("#message-price").focus();

            $("#flow-price").removeAttr('readonly');
            $("#flow-price").removeClass('no-drop');
            
            $("#friends-price").removeAttr('readonly');
            $("#friends-price").removeClass('no-drop');
            
            $("#notice-price").removeAttr('readonly');
            $("#notice-price").removeClass('no-drop');

            $("#box-message-price").removeAttr('readonly');
            $("#box-message-price").removeClass('no-drop');
        } else {
            $("#message-price").attr("readonly", "readonly");
            $("#message-price").val("");
            $("#message-price").addClass('no-drop');

            $("#flow-price").attr("readonly", "readonly");
            $("#flow-price").val("");
            $("#flow-price").addClass('no-drop');

            $("#friends-price").attr("readonly", "readonly");
            $("#friends-price").val("");
            $("#friends-price").addClass('no-drop');
            
            $("#notice-price").attr("readonly", "readonly");
            $("#notice-price").val("");
            $("#notice-price").addClass('no-drop');

            $("#box-message-price").attr("readonly", "readonly");
            $("#box-message-price").val("");
            $("#box-message-price").addClass('no-drop');
        }
    });

    submitButton.onclick = function () {
        var clientComp = $('#conpany-name').val();//客户公司名
        var clientAddr = $("#conpany-addr").val() + "-" + $("#conpany-addr-detail").val();//客户公司地址
        var clientSname = $("#nick-name").val();//客户简称
        var scene_powers = 0;
        var ad_powers = 0;


        if(!clientSname) {
            alert("请输入用户名称");
            return;
        }
        if(!nameReg.test(clientSname)) {
            alert("用户名格式错误");
            return;
        }
        if(!$("#password").val()) {
            alert("请设置账户密码");
            return;
        }
        if(!pswReg.test($("#password").val())) {
            alert("密码格式错误");
            return;
        }
        if($("#password").val() !== $("#verify-password").val()) {
            alert("两次输入的密码不一致");
            return;
        }
        if(!$("#conpany-name").val()) {
            alert("请输入客户公司名称");
            return;
        }
        if(!$("#conpany-addr").val()) {
            alert("请输入客户公司地址");
            return;
        }
        if (!nickName.value) {
            alert("请输入联系人名称");
            return;
        }
        if (!phoneNum.value || !phoneReg.test(phoneNum.value)) {
            alert("请输入正确的手机号码");
            return;
        }
        // if (!unitPrice.value) {
        //     alert("请输入盒子单价");
        //     return;
        // }
        // if(!$("#box-type-0").prop("checked") && !$("#box-type-1").prop("checked")){
        //     alert("请选择单价类型");
        //     return;
        // }
        // if (!hardwareNum.value) {
        //     alert("请输入盒子数量");
        //     return;
        // }
        if($("#user-type-1").prop("checked") && $("#agent-area").attr("data-area") == "") {
            alert("请选择所属区域");
            return;
        }

        // scene_powers = shareScene.checked ? 1 : 0;
        // ad_powers = messageManage.checked ? 1 : 0;

        // if (messageManage.checked && !messagePrice.value) {
        //     alert("请输入APP广告单价");
        //     $("#message-price").focus();
        //     return;
        // }
        // if (messageManage.checked && !flowPrice.value) {
        //     alert("请输入信息流广告单价");
        //     $("#flow-price").focus();
        //     return;
        // }
        /*if (messageManage.checked && !friendsPrice.value) {
            alert("请输入朋友圈广告单价");
            $("#friends-price").focus();
            return;
        }*/
        // if (messageManage.checked && !noticePrice.value) {
        //     alert("请输入通知栏广告单价");
        //     $("#notice-price").focus();
        //     return;
        // }
        
      
        $.ajax({
            url: BASEURL + 'background/useradd.do',
            type: 'POST',
            dataType: 'json',
            data: {
                userName: clientSname,//客户简称
                passwd: $("#password").val(),//密码

                contactsPhone: phoneNum.value,//客户联系方式（手机号）
                contacts: nickName.value,//联系人姓名
                addr: clientAddr,//客户公司地址
                client_comp: clientComp,//客户公司名
                token:$("#token").val(),
                role:$("#role").val()
                // share_permit: scene_powers,//场景管理
                // ad_permit: ad_powers,//广告管理
                // ad_perprice: messagePrice.value,//客户发布单价
                // circle_friends_price: friendsPrice.value,//朋友圈广告单价
                // flow_information_price: flowPrice.value,//信息流广告单价
                // notice_board_price: noticePrice.value,//通知栏广告单价
                // ad_box_perprice: boxMessagePrice.value, //客户盒子广告单价
                // chip_perprice: unitPrice.value,//芯片单价
                // chip_num: hardwareNum.value,//芯片数量

                // chip_type: $("input[name='box-type']:checked").val(),//用户单价类型 0购买 1租用
                //box_perprice
                //box_num

                // user_type: $("input[name='user-type']:checked").val(),//用户类型
                // agent_area: $("#agent-area").attr("data-area"),//代理区域
                // agent_industry: $("#agent-industry").val()
            }
        })
        .done(function(data) {
            if (data.success) {
                alert("添加客户完成");
                window.location.href = BASEURL + "background/userlist.html";
            } else {
                alert(data.errMsg);
            }
        })
        .fail(function() {
            console.log(data);
            console.log("error");
            alert("添加客户失败，请刷新重试");
        });
    };
};

customs.getAgentZone = function() {
    $.ajax({
        url: BASEURL + 'account/getAreas',
        type: 'POST',
        dataType: 'json',
        data: {}
    })
    .done(function(data) {
        console.log(data);
        if (data.success) {
            var zone = data.result;
            var html = [];
            for (var i = 0, len = zone.length; i < len; i++) {
                html.push('<li id="zone-' + zone[i].id + '" data-area="' + zone[i].id + '"><a>' + zone[i].name + '</a></li>');
            }
            $("#agent-area").children(".dropdown-content").children(".dropdown-menu").html(html.join(""));
        } else {
            console.log("error");
        }
    })
    .fail(function() {
        console.log("error");
    });
}

customs.checkNameInput = function() {
    
}