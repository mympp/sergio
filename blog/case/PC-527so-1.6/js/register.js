/**
 * Created by Administrator on 2017/10/31 0031.
 */
$(function(){
    var InterValObj; //timer变量，控制时间
    var curCount; //当前剩余秒数
    //logo点击跳转首页
    $(".logo").on("click",function(){
        window.open("../../view/publicity/index.html")
    })
    //点击发送手机验证码带输入框正则判断
    $(document).on("click",".Code01",function(){
        var uppass = $(".input-1").val();
        var phone  = $(".input-phone").val();
        var numreg = /^1(3|4|5|7|8)\d{9}$/;
        if(uppass == ""){
            alert("请输入要注册的手机号码！")
        }else if(!numreg.test(phone)) {
            alert("手机号码有误，请重填");
        }else {
            sendMessage();
        }

        //发送消息函数
        function sendMessage() {
            curCount = 60; //设置button效果，开始计时
            console.log(curCount);
            $(".Code01").text(curCount+"秒后重获").addClass('code-state1')
            InterValObj = window.setInterval(SetRemainTime, 1000); //启动计时器，1秒执行一次
        }



        //timer处理函数
        function SetRemainTime() {
            if(curCount == 0) {
                window.clearInterval(InterValObj); //停止计时器
                $(".Code01").text("重新获取").removeClass('code-state1')
            } else {
                curCount--;
                $(".Code01").text(curCount+"秒后重获").addClass('code-state1');
            }
        }
    })
    //点击发送邮箱验证码带输入框正则判断
    $(document).on("click",".Code02",function(){
        var uppass = $(".input-1").val();
        var email  = $(".input-email").val();
        var emailreg = /^[a-z0-9-_.]+@[\da-z][\.\w-]+\.[a-z]{2,4}$/i;
        if(uppass == ""){
            alert("请输入要注册的邮箱号码！")
        }else if(!emailreg.test(email)) {
            alert("邮箱号码有误，请重填");
        }else {
            sendMessage();
        }
        //发送消息函数
        function sendMessage() {
            curCount = 60; //设置button效果，开始计时
            console.log(curCount);
            $(".Code02").text(curCount+"秒后重获").addClass('code-state1')
            InterValObj = window.setInterval(SetRemainTime, 1000); //启动计时器，1秒执行一次
        }



        //timer处理函数
        function SetRemainTime() {
            if(curCount == 0) {
                window.clearInterval(InterValObj); //停止计时器
                $(".Code02").text("重新获取").removeClass('code-state1')
            } else {
                curCount--;
                $(".Code02").text(curCount+"秒后重获").addClass('code-state1');
            }
        }
    })
    //点击注册验证用户注册前的操作如输入框不能为空密码不能少于6服务是否勾选
    $(document).on("click",".input-5",function(){
        var input1 = $(".input-1").val();
        var input2 = $(".input-2").val();
        var input3 = $(".input-3").val();
        var input4 = $(".input-4").val();
        console.log(input2.length);
        console.log($("input[type='checkbox']").prop('checked'));
        if(input1 == ""||input2 == ""||input3 == ""||input4 == ""){
            alert("输入框不能为空！")
        }else if(input2.length<5 ||input3.length<5){
            alert("密码不足六位！")
        }else if($("input[type='checkbox']").prop('checked') == true){
            alert("发送ajax")
        }else {
            alert("请点击同意服务协议！")
        }





    })
    //点击邮箱注册切换
    $(document).on("click",".EmailReg",function(){
        $(".VipReg").removeClass("active");
        $(".EmailReg").addClass("active");
        $("#RegEmail").show();
        $("#RegPhone").hide();
    })
    //点击手机注册切换
    $(document).on("click",".VipReg",function(){
        $(".VipReg").addClass("active");
        $(".EmailReg").removeClass("active");
        $("#RegPhone").show();
        $("#RegEmail").hide();

    })
    //点击底部跳转
    $(document).on("click",".RegBottom ul .li2>span",function(){
        window.open("../Publicity/about.html")
    })
    //点击服务条例
    $(document).on("click",".sever",function(){
        window.open("../Publicity/serve.html")
    })



})