/**
 * Created by Administrator on 2017/10/31 0031.
 */
$(function(){
    //判断用户是否会员
    var state = true;
    if(!state) {
        $(".SetupCenter-top>em,.SetupCenter-top>span").hide();
        $(".SetupCenter-top>p>span").html('<span>用户类型：VIP会员</span>');
    } else {
        $(".SetupCenter-top>em,.SetupCenter-top>span").show();
        $(".SetupCenter-top>p>span").html('<span>用户类型：体验会员</span>');
    }
    //全局变量旧密码错误正确状态
    var pass = true;
    //验证码不正确的状态
    var iphoneNO1 = true
    var iphoneNO2 = true
    //输入框输入number大于9的时候变为可发送状态
    $("#uppass").keydown(function(){
        var uppass = $("#uppass").val();
        console.log(uppass.length);
        if(uppass.length>9){
            $(".UpPhone-send02").addClass("code-state")
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


    getHeight(); //动态设置高度

    $(window).resize(function(){
        getHeight();
    })

    function getHeight() {
        var height = 974;
        $(".left_template,.right_template,.xiansuo_des").height(height);
        //$(".right_template").width(1653);
    }
    // 更换头像事件代理点击事件
    $(document).on("click",".modal_SetUp",function(){
        $("#file0").click();
    })

    $("#file0").change(function(){
        var objUrl = getObjectURL(this.files[0]) ;
        console.log("objUrl = "+objUrl) ;
        if (objUrl) {
            $("#img0").attr("src", objUrl) ;
        }
    }) ;
    //上传图片保存路径函数及兼容性处理
    function getObjectURL(file) {
        var url = null ;
        if (window.createObjectURL!=undefined) { // basic
            url = window.createObjectURL(file) ;
        } else if (window.URL!=undefined) { // mozilla(firefox)
            url = window.URL.createObjectURL(file) ;
        } else if (window.webkitURL!=undefined) { // webkit or chrome
            url = window.webkitURL.createObjectURL(file) ;
        }
        return url ;
    }
    //点击保存表单
    $(".Updata").on("click",function(){
        $(".sucuess-modal").fadeIn();
        setTimeout(function(){
            $(".sucuess-modal").fadeOut();
        },1500);
    })
    //点击安全设置修改密码按钮
    $(document).on("click",".Updata-Password",function(){
        $(".modal_Bigbox").fadeIn()
        $(".UpPassword").fadeIn()
    })
    //点击安全设置修改手机号按钮
    $(document).on("click",".Updata-Phone",function(){
        $(".modal_Bigbox").fadeIn()
        $(".Updata-Phonenumber").fadeIn()
    })
    //点击安全设置消息管理
    $(document).on("click",".Updata-message",function(){
        $(".modal_Bigbox").fadeIn()
        $(".Updata-Message").fadeIn()
    })
    //点击关闭修改密码模态框
    $(document).on("click",".UpPassword-top>i,.password-off",function(){
        $(".modal_Bigbox").hide()
        $(".UpPassword").hide()
    })
    //点击关闭修改手机号窗口
    $(document).on("click",".UpPhone-top>i,.Phone-off",function(){
        $(".modal_Bigbox").hide()
        $(".Updata-Phonenumber").hide()
    })
    //点击关闭修改消息管理窗口
    $(document).on("click",".Updata-Message-top>i,.Message-off",function(){
        $(".modal_Bigbox").hide()
        $(".Updata-Message").hide()
    })
    //点击修改密码确认按钮以及密码不正确的状态
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

    })
    //点击修改手机号确认按钮以及验证码不正确的状态
    $(document).on("click",".Phone-save",function(){
        var input001 = $(".input02>input").val();
        var input002 = $(".input03>input").val();
        var input003 = $(".input04>input").val();
        //验证码正确的状态为true,错误为false
        iphoneNO1 = true;
        iphoneNO2 = true;
        if(input001 == "" || input002 == "" ||input003 == ""){
            alert("输入框内容不能为空！")
        }else  if(iphoneNO1 == false){
            $(".iphoneNO1").show();
        }else if(iphoneNO2 == false){
            $(".iphoneNO2").show();
        }else {
            $(".iphoneNO1").fadeOut();
            $(".iphoneNO2").fadeOut();
            $(".sucuess-modal").fadeIn();
            setTimeout(function(){
                $(".sucuess-modal").fadeOut();
            },1500);
        }
    })
    //点击确定保存消息管理
    $(document).on("click",".Message-no",function(){
        $(".sucuess-modal").fadeIn();
        setTimeout(function(){
            $(".sucuess-modal").fadeOut();
        },1500);

    })
    //点击显示隐藏密码切换
    $(document).on("click",".ShowPassword",function(){
//            //获取点击按钮内state属性
        var state = $(this).attr("state");
        console.log(state);
        //判断属性是off还是no
        if(state == "off"){
            $("#password-2").prop("type","text");
            $(".ShowPassword").attr("state","no")
            $(".ShowPassword").css("background-image","url(../../Images/set_icon_eye_sel.png)");
        }else {
            $("#password-2").prop("type","password");
            $(".ShowPassword").attr("state","off")
            $(".ShowPassword").css("background-image","url(../../Images/set_icon_eye_nor.png)");
        }


    });
    //修改密码点击发送验证码
    $(document).on("click",".UpPhone-send01",function(){
        sendMessage();

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
        if(uppass == ""){
            alert("请输入要修改的手机号码！")
        }else {
            sendMessage();
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
            $(".back01").css("background-image","url(../../Images/set_icon_xioaxi_nor.png)");
        }else {
            sback01 = true;
            $(".back01").css("background-image","url(../../Images/set_icon_xioaxi_sel.png)");

        }

    })
    $(document).on("click",".back02",function(){
        if(sback02){
            sback02 = false;
            $(".back02").css("background-image","url(../../Images/set_icon_xioaxi_nor.png)");
        }else {
            sback02 = true;
            $(".back02").css("background-image","url(../../Images/set_icon_xioaxi_sel.png)");

        }

    })
    $(document).on("click",".back03",function(){
        if(sback03){
            sback03 = false;
            $(".back03").css("background-image","url(../../Images/set_icon_tixing_nor.png)");
        }else {
            sback03 = true;
            $(".back03").css("background-image","url(../../Images/set_icon_tixing_sel.png)");

        }

    })
    $(document).on("click",".back04",function(){
        if(sback04){
            sback04 = false;
            $(".back04").css("background-image","url(../../Images/set_icon_tixing_nor.png)");
        }else {
            sback04 = true;
            $(".back04").css("background-image","url(../../Images/set_icon_tixing_sel.png)");

        }

    })
})