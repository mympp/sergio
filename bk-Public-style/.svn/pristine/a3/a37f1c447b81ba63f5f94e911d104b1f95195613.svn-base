$(function(){
	getHeight();//动态设置高度

    $(window).resize(function(){
        getHeight();
    })

    //判断何种状态进来
    //1 = 手机会员登录 2 = 邮箱登录 3 = 微信扫码登录
    $.post(is_user,'',function(data){
        console.log(data);
        var login = data['code'];
        var Phone = data['phone'];//此时状态为没绑定手机
        var email = data['email'];//此时状态为没绑定邮箱
        if(login == 1){
            //如果该手机号已绑定邮箱，显示邮箱名，不可修改。
            //如果该手机号没绑定邮箱，显示“未填写”，可以修改。
            $(".MessPhone").attr("disabled","disabled")
            if(email == 1){
                $(".MessEmail").attr("disabled","disabled")
            }else {
                $(".MessEmail").attr("placeholder","邮箱尚未绑定")
            }
        }
        if(login == 2){
            //如果该手机号已绑定邮箱，显示手机号码，不可修改。
            //如果该手机号没绑定邮箱，显示“未填写”，可以修改。
            $(".MessEmail").attr("disabled","disabled")
            if(Phone == 1){
                $(".MessPhone").attr("disabled","disabled")
            }else {
                $(".MessPhone").attr("placeholder","手机号码尚未绑定")
            }
        }
        if(login == 3){
            //如果该手机号已绑定邮箱，显示手机号码，不可修改。
            //如果该手机号没绑定邮箱，显示“未填写”，可以修改。
            //如果该手机号已绑定邮箱，显示邮箱名，不可修改。
            //如果该手机号没绑定邮箱，显示“未填写”，可以修改。
            if(Phone == 1){
                $(".MessPhone").attr("disabled","disabled")
            }else {
                $(".MessPhone").attr("placeholder","手机号码尚未绑定")
            }
            if(email == 1){
                $(".MessEmail").attr("disabled","disabled")
            }else {
                $(".MessEmail").attr("placeholder","邮箱尚未绑定")
            }
        }
    },'json');
//*****************************************************************//
    //手机绑定获取验证码功能开始
    //手机号码框获取焦点绑定验证码窗口响应
    $(document).on("focus",".MessPhone",function(){
        $(".My-Iphone-model").fadeIn();
        $(".MessPhone").blur();
        $(".MyIphoneInput").focus();
    })
    $(document).on("click",".My-Iphone-Top>em",function(){
        $(".My-Iphone-model").hide();
    })

    //获取手机号码输入框焦点时
    $(document).on("focus", ".MyIphoneInput", function() {
        $(".MyIphoneText-T").text("")

    })
    //获取验证码输入框焦点时
    $(document).on("focus", ".MyCodeInput", function() {
        $(".MyIphoneText-T").text("")

    })
    //实时监控输入框内容
    $(document).on("input propertychange",".MyIphoneInput", function(){
        var MyIphoneInput = $(".MyIphoneInput").val().length;
        console.log(MyIphoneInput);
        if(MyIphoneInput>0){
            $(".My-Iphone-clos").show()
        }
        if(MyIphoneInput<=0) {
            $(".My-Iphone-clos").hide()
        }
    })

    //点击圆形XX清空输入框
    $(document).on("click",".My-Iphone-clos",function(){
        $(".MyIphoneInput").val('');
        $(".My-Iphone-clos").hide();
        $(".MyIphoneText-T").text("")
    })
    //点击获取验证码按钮
    $(document).on("click",".MyIphoneBtn",function(){
        var MyIphoneInput = $(".MyIphoneInput").val()
        if(MyIphoneInput==""){
            $(".MyIphoneText-T").text("手机号码不能为空")
        }else {
            checkphone();
        }
    })
    //点击绑定手机确定按钮
    $(document).on("click",".MyIphoneAffirm",function(){
        var MyIphoneInput = $(".MyIphoneInput").val()
        var MyCodeInput = $(".MyCodeInput").val()
        var MyCodeInputL = $(".MyCodeInput").val().length;
        if(MyCodeInput == ""&&MyIphoneInput == ""){
            $(".MyIphoneText-T").text("请输入手机号码与验证码进行绑定")
        }else if(MyCodeInput == ""){
            $(".MyIphoneText-T").text("请输入验证码进行绑定")
        }else if(MyCodeInputL<4) {
            $(".MyIphoneText-T").text("输入验证码不足4位")
        }else {
            $(".sucuess-modal").fadeIn();
            setTimeout(function() {
                $(".sucuess-modal").fadeOut();
            }, 1500);
            $.post(binding,{'phone':MyIphoneInput,'code':MyCodeInput},function(data){
                if(data.code != 1){
                    $(".MyIphoneText-T").text(data.message);
                }else{
                    $(".MessPhone").val(MyIphoneInput);
                    $(".My-Iphone-model").fadeOut();
                    $(".MessPhone").attr("disabled","disabled")
                }
            },'json')
        }
    })
    //手机绑定获取验证码功能结束
//*****************************************************************//

//-----------------------------------------------------------------//
    //邮箱绑定获取验证码功能开始
    //邮箱框获取焦点绑定验证码窗口响应
    $(document).on("focus",".MessEmail",function(){
        $(".My-Email-model").fadeIn();
        $(".MessEmail").blur();
        $(".MyEmailInput").focus();
    })
    //邮箱绑定获取验证码功能开始
    $(document).on("click",".My-Email-Top>em",function(){
        $(".My-Email-model").hide();
    })

    //获取邮箱输入框焦点时
    $(document).on("focus", ".MyEmailInput", function() {
        $(".MyEmailText-T").text("")

    })
    //获取验证码输入框焦点时
    $(document).on("focus", ".MyEmailCodeInput", function() {
        $(".MyEmailText-T").text("")

    })
    //实时监控输入框内容
    $(document).on("input propertychange",".MyEmailInput", function(){
        var MyEmailInput = $(".MyEmailInput").val().length;
        console.log(MyEmailInput);
        if(MyEmailInput>0){
            $(".My-Email-clos").show()
        }
        if(MyEmailInput<=0) {
            $(".My-Email-clos").hide()
        }
    })

    //点击圆形XX清空输入框
    $(document).on("click",".My-Email-clos",function(){
        $(".MyEmailInput").val('');
        $(".My-Email-clos").hide();
        $(".MyEmailText-T").text("")
    })
    //点击获取验证码按钮
    $(document).on("click",".MyEmailBtn",function(){
        var MyEmailInput = $(".MyEmailInput").val()
        if(MyEmailInput==""){
            $(".MyEmailText-T").text("邮箱不能为空")
        }else {
            checkemail();
        }
    })
    //点击绑定邮箱确定按钮
    $(document).on("click",".MyEmailAffirm",function(){
        var MyEmailInput = $(".MyEmailInput").val()
        var MyCodeInput = $(".MyEmailCodeInput").val()
        var MyCodeInputL = $(".MyEmailCodeInput").val().length;
        if(MyCodeInput == ""&&MyEmailInput == ""){
            $(".MyEmailText-T").text("请输入邮箱号码与验证码进行绑定")
        }else if(MyCodeInput == ""){
            $(".MyEmailText-T").text("请输入验证码进行绑定")
        }else if(MyCodeInputL<4) {
            $(".MyEmailText-T").text("输入验证码不足4位")
        }else {//成功回调
            $(".sucuess-modal").fadeIn();
            setTimeout(function() {
                $(".sucuess-modal").fadeOut();
            }, 1500);
            $.post(binding,{'email':MyEmailInput,'code':MyCodeInput},function(data){
                if(data.code != 1){
                    $(".MyEmailText-T").text(data.message);
                }else{
                    $(".MessEmail").val(MyEmailInput);
                    $(".My-Email-model").fadeOut();
                    $(".MessEmail").attr("disabled","disabled")
                }
            },'json')
        }
    })
    //邮箱绑定获取验证码功能结束
//-----------------------------------------------------------------//

    //旧密码错误正确状态
    var pass = true;

    //验证码不正确的状态
    var iphoneNO1 = true;
    var iphoneNO2 = true;

    //输入框输入number大于9的时候变为可发送状态
    $("#uppass").keydown(function(){
        var uppass = $("#uppass").val();
        var code_type=$('#code_type').val();
        console.log(uppass.length);
        if(uppass.length>9&&code_type==1){
            $(".UpPhone-send02").addClass("code-state");
        }
    });

    //隐藏手机号中间数
    var tel = $('#IphoneNumber').val();
    var mtel = tel.substr(0, 3) + '****' + tel.substr(7);
    $('#IphoneNumber').val(mtel);

    //隐藏手机号中间数结束
    //消息管理4个选项的状态
    var sback01 = false;
    var sback02 = false;
    var sback03 = false;
    var sback04 = false;

    //点击安全设置修改密码按钮
    $(document).on("click",".Updata-Password",function(){
        $(".modal_Bigbox").fadeIn();
        $(".UpPassword").fadeIn();
    })
    //点击安全设置修改手机号按钮
    $(document).on("click",".Updata-Phone",function(){
        $.ajax({
            type:"GET",
            dataType:'json',
            url:'/CrmSettings/get_user_phone',
            success:function(res){
                if(res.code==1){
                    $('#IphoneNumber').val(res.mobile);
                    $(".modal_Bigbox").fadeIn();
                    $(".Updata-Phonenumber").fadeIn();
                }
            }
        })
    })
    //点击安全设置消息管理
    $(document).on("click",".Updata-message",function(){
        $.ajax({
            type:'POST',
            dataType:'json',
            url:'/CrmSettings/ts_shezhi',
            success:function(res){
                if(res.code==1){
                    if(res.res.weixin==1||res.res.email==1){
                         $(".back01").css("background-image","url(/Public/Home/1.6/Images/set_icon_xioaxi_sel.png)");
                         $(".back02").css("background-image","url(/Public/Home/1.6/Images/set_icon_xioaxi_nor.png)");
                         sback01=true;
                         sback02=false; 
                    }else{
                        $(".back01").css("background-image","url(/Public/Home/1.6/Images/set_icon_xioaxi_nor.png)");
                        $(".back02").css("background-image","url(/Public/Home/1.6/Images/set_icon_xioaxi_sel.png)");
                        sback02=true; 
                        sback01=false; 
                        sback03=false; 
                        sback04=false; 
                    }
                    if(res.res.weixin==1){
                         $(".back03").css("background-image","url(/Public/Home/1.6/Images/set_icon_tixing_sel.png)");
                         sback03=true;
                    }else{
                         $(".back03").css("background-image","url(/Public/Home/1.6/Images/set_icon_tixing_nor.png)");
                         sback03=false;
                    }
                    if(res.res.email==1){
                        $(".back04").css("background-image","url(/Public/Home/1.6/Images/set_icon_tixing_sel.png)");
                         sback04=true;
                    }else{
                        $(".back04").css("background-image","url(/Public/Home/1.6/Images/set_icon_tixing_nor.png)");
                        sback04=false;
                    }
                    $(".modal_Bigbox").fadeIn();
                    $(".Updata-Message").fadeIn();
                }else{
                    message('系统繁忙');
                }
            }
        })
    })
    //点击关闭修改密码模态框
    $(document).on("click",".UpPassword-top>i,.password-off",function(){
        $(".modal_Bigbox").hide();
        $(".UpPassword").hide();
    })
    //点击关闭修改手机号窗口
    $(document).on("click",".UpPhone-top>i,.Phone-off",function(){
        $(".modal_Bigbox").hide();
        $(".Updata-Phonenumber").hide();
    })
    //点击关闭修改消息管理窗口
    $(document).on("click",".Updata-Message-top>i,.Message-off",function(){
        $(".modal_Bigbox").hide();
        $(".Updata-Message").hide();
    })
/*    //点击修改密码确认按钮以及密码不正确的状态
    $(document).on("click",".password-save",function(){
        //pass 为true 密码正常
        //pass 为false 密码错误 出现提示密码错误
        pass = true
        var pass1 =$("#password-1").val();
        var pass2 =$("#password-2").val();
        //判断修改密码是否为空
        if(pass1 == "" ||pass2 == "" ){
            alert("输入框内容不能为空")

        }else if(pass == false){//判断密码状态
            $(".password-NO").fadeIn();
        }
        else {
            $(".password-NO").fadeOut();
            $(".sucuess-modal").fadeIn();
            setTimeout(function(){
                $(".sucuess-modal").fadeOut();
            },1500);
        }

    })*/
    //点击修改手机号确认按钮以及验证码不正确的状态
    $(document).on("click",".Phone-save",function(){
        var mobile=$('.new_moblie').val();
        var code=$('.new_code').val();
        $.ajax({
            type:'POST',
            dataType:'json',
            data:{'mobile':mobile,'code':code},
            url:'/CrmSettings/chang_code',
            success:function(res){
                if(res.code==1){
                    success('修改成功');
                    $(".modal_Bigbox").hide();
                    $(".Updata-Phonenumber").hide();
                }else{
                    error(res.message);
                }
            }
        })
    })
    //点击确定保存消息管理
    $(document).on("click",".Message-no",function(){
        if(sback01){
            if(!sback03&&!sback04){
                message('请选择接收方式');
                return false;
            }else{
                var wz=0;
                if(sback03){
                    var wxTs='true';
                }else{
                     var wxTs='false';
                }
                if(sback04){
                    var yjTs='true';
                }else{
                    var yjTs='false';
                }
            }
        }
        if(sback02){
            var wz=1;
            var yjTs='false';
            var wxTs='false';
        }
        var result=wz + ',' + wxTs + ',' + yjTs;
        $.ajax({
            type:'POST',
            dataType:'json',
            data:{'result':result},
            url:url_str+'/CrmUser/ts_shezhi_ajax',
            success:function(res){
                if(res){
                    success('设置成功');
                    $(".modal_Bigbox").hide()
                    $(".Updata-Message").hide()
                }else{
                    message('系统繁忙');
                }
            }
        })
    })

    //点击显示隐藏密码切换
    $(document).on("click",".ShowPassword",function(){
		//获取点击按钮内state属性
        var state = $(this).attr("state");
        //console.log(state);

        //判断属性是off还是no
        if(state == "off"){
            $("#password-2").prop("type","text");
            $(".ShowPassword").attr("state","no")
            $(".ShowPassword").css("background-image","url(/Public/Home/1.6/Images/set_icon_eye_sel.png)");
        }else {
            $("#password-2").prop("type","password");
            $(".ShowPassword").attr("state","off")
            $(".ShowPassword").css("background-image","url(/Public/Home/1.6/Images/set_icon_eye_nor.png)");
        }
    });

    //修改密码点击发送验证码
    $(document).on("click",".UpPhone-send01",function(){
		$(".UpPhone-send01").addClass("disabled");
        sendMessage();
        $.ajax({
            type:'POST',
            dataType:'json',
            data:{'type':'0'},
            url:'/CrmSettings/get_one_number',
            success:function(res){
                if(res.code==1){
                    success('验证已发送');
                }else{
                    error(res.message);
                }
            }
        })

        var InterValObj; //timer变量，控制时间
        var curCount; //当前剩余秒数
        //发送消息函数
        function sendMessage() {
            curCount = 60; //设置button效果，开始计时
            console.log(curCount);
            $(".UpPhone-send01").text(curCount+"秒后重获").addClass('code-state1');
            InterValObj = window.setInterval(SetRemainTime, 1000); //启动计时器，1秒执行一次
        }

        //timer处理函数
        function SetRemainTime() {
            if(curCount == 0) {
				$(".UpPhone-send01").removeClass("disabled");
                window.clearInterval(InterValObj); //停止计时器
                $(".UpPhone-send01").text("重新获取").removeClass('code-state1');
            } else {
                curCount--;
                $(".UpPhone-send01").text(curCount+"秒后重获").addClass('code-state1');
            }
        }
    })

    $(document).on("click",".UpPhone-send02",function(){
        var uppass = $("#uppass").val();
        var reg_phone=/^0?(13[0-9]|15[012356789]|17[013678]|18[0-9]|14[57])[0-9]{8}$/;
        if(uppass == ""){
            message("请输入要修改的手机号码！");return false;
        }else if(!reg_phone.test(uppass)){
             message("请输入正确的手机号码！");return false;
        }else {
            sendMessage();
            $.ajax({
                type:'POST',
                dataType:'json',
                data:{'type':'1','mobile':uppass},
                url:'/CrmSettings/get_one_number',
                success:function(res){
                    if(res.code==1){
                        success('获取验证码成功');
                    }else{
                        error(res.message);
                    }
                }
            })
        }

        var InterValObj; //timer变量，控制时间
        var curCount; //当前剩余秒数
        //发送消息函数
        function sendMessage() {
            curCount = 60; //设置button效果，开始计时
            console.log(curCount);
            $(".UpPhone-send02").text(curCount+"秒后重获").addClass('code-state1').removeClass('code-state');
            InterValObj = window.setInterval(SetRemainTime, 1000); //启动计时器，1秒执行一次
        }

        //timer处理函数
        function SetRemainTime() {
            if(curCount == 0) {
                window.clearInterval(InterValObj); //停止计时器
                $(".UpPhone-send02").text("重新获取").removeClass('code-state1').addClass('code-state');
            } else {
                curCount--;
                $(".UpPhone-send02").text(curCount+"秒后重获").addClass('code-state1');
            }
        }
    })

    //消息管理中4个按钮
    $(document).on("click",".back01",function(){
        if(sback01){
            sback01 = false;
            $(".back01").css("background-image","url(/Public/Home/1.6/Images/set_icon_xioaxi_nor.png)");
            //$(".back02").css("background-image","url(/Public/Home/1.6/Images/set_icon_xioaxi_sel.png)");
        }else {
            sback01 = true;
            sback02 = false;
            $(".back01").css("background-image","url(/Public/Home/1.6/Images/set_icon_xioaxi_sel.png)");
            $(".back02").css("background-image","url(/Public/Home/1.6/Images/set_icon_xioaxi_nor.png)");
        }
    })

    $(document).on("click",".back02",function(){
        if(sback02){
            sback02 = false;
            //$(".back01").css("background-image","url(/Public/Home/1.6/Images/set_icon_xioaxi_sel.png)");
            $(".back02").css("background-image","url(/Public/Home/1.6/Images/set_icon_xioaxi_nor.png)");
        }else {
            sback01 = false;
            sback02 = true;
            sback03 = false;
            sback04 = false;
            $(".back01").css("background-image","url(/Public/Home/1.6/Images/set_icon_xioaxi_nor.png)");
            $(".back02").css("background-image","url(/Public/Home/1.6/Images/set_icon_xioaxi_sel.png)");
            $(".back03").css("background-image","url(/Public/Home/1.6/Images/set_icon_tixing_nor.png)");
            $(".back04").css("background-image","url(/Public/Home/1.6/Images/set_icon_tixing_nor.png)");
        }
    })

    $(document).on("click",".back03",function(){
        if(sback03){
            sback03 = false;
            $(".back03").css("background-image","url(/Public/Home/1.6/Images/set_icon_tixing_nor.png)");
        }else {
            sback03 = true;
            $(".back03").css("background-image","url(/Public/Home/1.6/Images/set_icon_tixing_sel.png)");
        }
    })

    $(document).on("click",".back04",function(){
        if(sback04){
            sback04 = false;
            $(".back04").css("background-image","url(/Public/Home/1.6/Images/set_icon_tixing_nor.png)");
        }else {
            sback04 = true;
            $(".back04").css("background-image","url(/Public/Home/1.6/Images/set_icon_tixing_sel.png)");
        }
    })
})

function checkphone(){
    var numreg = /^1(3|4|5|7|8)\d{9}$/;
    var MyIphone = $(".MyIphoneInput").val();
    if(!numreg.test(MyIphone)){
        $(".MyIphoneText-T").text("您输入的手机号码格式错误");
    }else {
        $.post(phone_code,{'mobile':MyIphone},function(data){
            $(".MyIphoneText-T").text(data.message);
        },'json')
        sendMessage($(".MyIphoneBtn"))
    }
}
function checkemail(){
    var emailreg = /^[a-z0-9-_.]+@[\da-z][\.\w-]+\.[a-z]{2,4}$/i;
    var MyEmail = $(".MyEmailInput").val();
    if(! emailreg.test(MyEmail)){
        $(".MyEmailText-T").text("您输入的邮箱格式错误");
    }else {
        $.post(email_code,{'email':MyEmail},function(data){
            $(".MyEmailText-T").text(data.message);
        },'json')
        sendMessage($(".MyEmailBtn"));
    }
}
//发送消息函数
function sendMessage(obj) {
    curCount = 60; //设置button效果，开始计时
    console.log(curCount);
    obj.text(curCount + "秒后重获").addClass('code-state1');
    InterValObj = window.setInterval(function(){
        SetRemainTime(obj)
    }, 1000); //启动计时器，1秒执行一次
}

//timer处理函数
function SetRemainTime(obj) {
    if(curCount == 0) {
        window.clearInterval(InterValObj); //停止计时器
        obj.text("重新获取").removeClass('code-state1');
    } else {
        curCount--;
        obj.text(curCount + "秒后重获").addClass('code-state1');
    }
}

//定义获取高度方法
function getHeight(){
	var winH = $(window).height();
	$(".left_template,.right_template").height(winH);
	$(".SetupCenter").height(winH - 130);
}