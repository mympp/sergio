/**
 * Created by Administrator on 2017/12/6 0006.
 */
$(function(){
    //0表示会员状态未过期
    //1表示会员已过期提醒续费
    var status = 0;
    //true表示会员未过期但是资料未完善
    //false表示会员未过期并且资料已经完善提交
    var vipstatus = true;

    //true表示会员未绑定邮箱
    //false表示会员已绑定邮箱
    var emailStatus = false

    if(status == 0){
        $(".pr-vip").hide();
        $(".tsXq-div_main").show();
        $(".Two_Btn_cells_1").show();
        if(vipstatus){
            $(".Complete-model").show();
        }else {
            $(".Complete-model").hide();
        }
    }
    if(status == 1){
        $(".Complete-model").hide();
        $(".tsXq-div_main").hide();
        $(".Two_Btn_cells_1").hide();
    }
    //会员过期状态点击去续费按钮
    $(document).on("click",".vip-btn",function(){
        $(".pay_model").show();
        $(".pay01").fadeIn();
    })

    //引导页状态
    var FabuIndex = false;
    if(FabuIndex) {
        $(".Guidance-box").show();
    }else {
        $(".Guidance-box").hide();
    }
    //服务条例
    $(document).on("click",".check-i",function(){
        window.open("../../view/Publicity/serve.html")
    })
    //头部X关闭窗口
    $(document).on("click",".Complete-box-top>i",function(){
        $(".Complete-model").hide();
    })
    //勾选框事件
    var status = $(".checkbox-zl").is(":checked");
    if(status == true){
        $(".check-img").css("background-image", "url(../../Images/icon_shangpingldata_agree_sel.png)");
    }else {
        $(".check-img").css("background-image", "url(../../Images/icon_shangpingldata_agree_nor.png)");
    }
    //勾选框点击事件
    $(document).on("click",".checkbox-zl",function(){
        var status = $(".checkbox-zl").is(":checked");
        console.log(status);
        if(status == true){
            $(".check-img").css("background-image", "url(../../Images/icon_shangpingldata_agree_sel.png)");
            $(".input-text").text("")
        }else {
            $(".check-img").css("background-image", "url(../../Images/icon_shangpingldata_agree_nor.png)");
        }
    })
    // 更换头像事件代理点击事件
    $(document).on("click", ".Complete-box-MinBOX", function() {
        $("#file0").click();
    })
    //删除图片
    $(document).on("click",".Complete-box-cloe",function(){
        $("#img0").attr("src","");
        $(".Complete-box-cloe").hide();
    })
    //图片即时预览
    $("#file0").change(function() {
        var objUrl = getObjectURL(this.files[0]);
        console.log("objUrl = " + objUrl);
        if(objUrl) {
            $(".Complete-box-cloe").show();
            $("#img0").show();
            $("#img0").attr("src", objUrl);
            $(".i-img").text("");
        }else {
            $(".Complete-box-cloe").hide();
        }
    });

    //上传图片保存路径函数及兼容性处理
    function getObjectURL(file) {
        var url = null;
        if(window.createObjectURL != undefined) { // basic
            url = window.createObjectURL(file);
        } else if(window.URL != undefined) { // mozilla(firefox)
            url = window.URL.createObjectURL(file);
        } else if(window.webkitURL != undefined) { // webkit or chrome
            url = window.webkitURL.createObjectURL(file);
        }
        return url;
    }
    //获取焦点清空提示文字
    $(".Complete-box-input").on("focus",function(){
        $(".input-text").text("")
    })
    if(emailStatus) {
        $(".email-con").show();
        //保存按钮点击事件
        $(".Complete-box-btn").on("click",function(){
            var numreg = /^1(3|4|5|7|8)\d{9}$/;//手机号码正则表达式
            var emailreg = /^[a-z0-9-_.]+@[\da-z][\.\w-]+\.[a-z]{2,4}$/i;//邮箱号码正则表达式
            var CompleteName = $(".Name").val();//名称
            var CompleteGenre = $(".genre").val();//证件类型
            console.log(CompleteGenre);
            var CompleteCodeYzm = $(".code-yzm").val();//证件号码
            var CompletePhone = $(".Phone").val();//手机号码
            var CompleteEmail = $(".Email").val();//电子邮箱
            var inputcode = $(".input-code").val();//邮箱验证码
            var CompanyAddress = $(".companyAddress").val();//联系地址
            var CompleteImg = $("#img0").attr("src") == "";//判断是否上传图片
            console.log(CompleteImg);
            var status = $(".checkbox-zl").is(":checked");//勾选框状态
            if(CompleteName == ""){
                $(".i-name").text("名称不能为空")
            }else if(CompleteGenre == null){
                $(".i-sf").text("证件类型不能为空","提示")
            }else if(CompleteCodeYzm == ""){
                $(".i-zj").text("证件号码不能为空","提示")
            }else  if(CompletePhone == ""){
                $(".i-phone").text("手机号码不能为空","提示")
            }else if(!numreg.test(CompletePhone)){
                $(".i-phone").text("您输入的手机号码格式错误","提示");
            }else if(CompleteEmail == ""){
                $(".i-email").text("邮箱不能为空","提示");
            }else if(!emailreg.test(CompleteEmail)){
                $(".i-email").text("您输入的邮箱格式错误","提示");
            }else if(inputcode == ""){
                $(".i-code").text("验证码不能为空","提示");
            }else if(CompleteImg == true){
                $(".i-img").text("请上传证件照片","提示");
            }else if(status == false){
                $(".i-checkbox").text("请勾选同意服务协议","提示");
            }else {
                //$.alert("发送ajax","提示");
                $(".Complete-model-wan").show();
                setTimeout(function(){
                    $(".Complete-model-wan").fadeOut();
                    $(".Complete-model").fadeOut();
                },1000)
            }


        })
    }else {
        $(".email-con").hide();
        $(".Email").attr("disabled","disabled")
        //保存按钮点击事件
        $(".Complete-box-btn").on("click",function(){
            var numreg = /^1(3|4|5|7|8)\d{9}$/;//手机号码正则表达式
            var emailreg = /^[a-z0-9-_.]+@[\da-z][\.\w-]+\.[a-z]{2,4}$/i;//邮箱号码正则表达式
            var CompleteName = $(".Name").val();//名称
            var CompleteGenre = $(".genre").val();//证件类型
            console.log(CompleteGenre);
            var CompleteCodeYzm = $(".code-yzm").val();//证件号码
            var CompletePhone = $(".Phone").val();//手机号码
            var CompleteEmail = $(".Email").val();//电子邮箱
            var inputcode = $(".input-code").val();//邮箱验证码
            var CompanyAddress = $(".companyAddress").val();//联系地址
            var CompleteImg = $("#img0").attr("src") == "";//判断是否上传图片
            console.log(CompleteImg);
            var status = $(".checkbox-zl").is(":checked");//勾选框状态
            if(CompleteName == ""){
                $(".i-name").text("名称不能为空")
            }else if(CompleteGenre == null){
                $(".i-sf").text("证件类型不能为空","提示")
            }else if(CompleteCodeYzm == ""){
                $(".i-zj").text("证件号码不能为空","提示")
            }else  if(CompletePhone == ""){
                $(".i-phone").text("手机号码不能为空","提示")
            }else if(!numreg.test(CompletePhone)){
                $(".i-phone").text("您输入的手机号码格式错误","提示");
            }else if(CompleteEmail == ""){
                $(".i-email").text("邮箱不能为空","提示");
            }else if(CompleteImg == true){
                $(".i-img").text("请上传证件照片","提示");
            }else if(status == false){
                $(".i-checkbox").text("请勾选同意服务协议","提示");
            }else {
                //$.alert("发送ajax","提示");
                $(".Complete-model-wan").show();
                setTimeout(function(){
                    $(".Complete-model-wan").fadeOut();
                    $(".Complete-model").fadeOut();
                },1000)
            }


        })
    }


    //增加邮箱验证码功能
    $(document).on("input propertychange", ".Email", function() {
        var Email = $(".Email").val().length;
        if(Email != 0){
            $(".i-code-btn").addClass("as")
        }else if(Email == 0) {
            $(".i-code-btn").removeClass("as")
        }
    })
    $(document).on("click",".i-code-btn",function(){
        var emailreg = /^[a-z0-9-_.]+@[\da-z][\.\w-]+\.[a-z]{2,4}$/i; //邮箱正则
        var EmailV = $(".Email").val();
        if(!emailreg.test(EmailV)) {
            $(".i-email").text("邮箱不符合规范")
        } else {
            sendMessage1();
        }
    })
    //发送消息函数
    function sendMessage1() {
        curCount = 60; //设置button效果，开始计时
        console.log(curCount);
        $(".i-code-btn").text(curCount + "秒后重获").addClass('code-state12');
        InterValObj = window.setInterval(SetRemainTime1, 1000); //启动计时器，1秒执行一次
    }

//timer处理函数
    function SetRemainTime1() {
        if(curCount == 0) {
            window.clearInterval(InterValObj); //停止计时器
            $(".i-code-btn").text("重新获取").removeClass('code-state12');
        } else {
            curCount--;
            $(".i-code-btn").text(curCount + "秒后重获").addClass('code-state12');
        }
    }
})