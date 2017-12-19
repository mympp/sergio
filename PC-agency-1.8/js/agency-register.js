/**
 * Created by Administrator on 2017/12/11 0011.
 */
$(function(){
    //获取焦点去除error状态
    //清除错误状态集合
    $(document).on("focus",".register-body-input>input",function() {
        $(this).next().next().removeClass("re-er")
        $(this).parent().prev().children(".register-error").removeClass("re-er")
    })
    $(document).on("click",".register-body-input>input",function() {
        $(this).next().next().removeClass("re-er")
    })
    $(document).on("focus",".register-body-input>input",function() {
        $(this).parent().next().removeClass("re-er")
        $(this).parent().prev().children(".register-error").removeClass("re-er")
    })
    $(document).on("click",".register-body-input>input",function() {
        $(this).next().removeClass("re-er")
    })
    //点击发送验证码
    //加强验证规则,获取验证码前需完成前面必填表单
    $(".register-phone-code-btn").on("click",function(){
        var RegisterName = $(".register-name").val();//用户名
        var RegisterPassword1 = $(".register-password1").val();//输入密码
        var RegisterPassword2 = $(".register-password2").val();//确认密码
        var RegisterGsName = $(".register-gs-name").val();//公司名称
        var RegisterYh = $(".register-yh").val();//选择银行
        var RegisterYhNumber = $(".register-yh-number").val();//银行卡号
        var RegisterYhNumberL = $(".register-yh-number").val().length;//银行卡号长度
        var RegisterYhName = $(".register-yh-name").val();//银行持卡人姓名
        var BodyImgUl = $(".up-section").length;//上传证件照片
        var RegisterLxName = $(".register-lx-name").val();//联系人姓名
        var phone = $(".register-iphone").val();
        var numreg = /^1(3|4|5|7|8)\d{9}$/;
        if(RegisterName == ""){
            $(".error-name").addClass("re-er")
            $(".error-name>span").text("用户名不能为空")
        }else if(RegisterPassword1 == ""){
            $(".error-pass1").addClass("re-er")
            $(".error-pass1>span").text("密码不能为空")
        }else if(RegisterPassword2 == ""){
            $(".error-pass2").addClass("re-er")
            $(".error-pass2>span").text("密码不能为空")
        }else if(RegisterPassword1 != RegisterPassword2){
            $(".error-pass2").addClass("re-er")
            $(".error-pass2>span").text("密码输入不相同")
        }else if(RegisterGsName == ""){
            $(".error-pass3").addClass("re-er")
            $(".error-pass3>span").text("公司不能为空")
        }else if(RegisterYh == "选择银行"){
            $(".error-pass4").addClass("re-er")
            $(".error-pass4>span").text("请输入银行卡号")
        }else if(RegisterYhNumber == ""){
            $(".error-pass4").addClass("re-er")
            $(".error-pass4>span").text("卡号不能为空")
        }else if(RegisterYhNumberL<5){
            $(".error-pass4").addClass("re-er")
            $(".error-pass4>span").text("银行卡号错误")
        }else if(RegisterYhName == ""){
            $(".error-pass5").addClass("re-er")
            $(".error-pass5>span").text("姓名不能为空")
        }else if(BodyImgUl<2){
            $(".error-pass6").addClass("re-er")
            $(".error-pass6>span").text("公司资质不全")
        }else if(RegisterLxName == ""){
            $(".error-pass7").addClass("re-er")
            $(".error-pass7>span").text("姓名不能为空")
        }else if(phone == "") {
            $(".error-pass8").addClass("re-er")
            $(".error-pass8>span").text("号码不能为空")
        } else if(!numreg.test(phone)) {
            $(".error-pass8").addClass("re-er")
            $(".error-pass8>span").text("号码输入有误")
        } else {
            $(".register-error").removeClass("re-er")
            sendMessage();
        }

    })
    //$(".register-iphone").on("blur",function(){
    //    var phone = $(".register-iphone").val();
    //    var numreg = /^1(3|4|5|7|8)\d{9}$/;
    //    if(phone == "") {
    //        $(".error-pass8").addClass("re-er")
    //        $(".error-pass8>span").text("号码不能为空")
    //    } else if(!numreg.test(phone)) {
    //        $(".error-pass8").addClass("re-er")
    //        $(".error-pass8>span").text("号码输入有误")
    //    } else {
    //        $(".register-error").removeClass("re-er")
    //        sendMessage();
    //    }
    //})
    //键盘回车提交
    $(document).on("keydown",".register-center-bigbox", function(e)  {
        if(e.keyCode==13){
            checkfrom()
        }
    })
    //点击提交表单
    $(".register-sub-btn").on("click",function(){
        checkfrom()
    })
    //封装验证判断方法
    function checkfrom(){
        var emailreg = /^[a-z0-9-_.]+@[\da-z][\.\w-]+\.[a-z]{2,4}$/i;//邮箱正则
        var RegisterName = $(".register-name").val();//用户名
        var RegisterPassword1 = $(".register-password1").val();//输入密码
        var RegisterPassword2 = $(".register-password2").val();//确认密码
        var RegisterGsName = $(".register-gs-name").val();//公司名称
        var RegisterYh = $(".register-yh").val();//选择银行
        var RegisterYhNumber = $(".register-yh-number").val();//银行卡号
        var RegisterYhNumberL = $(".register-yh-number").val().length;//银行卡号长度
        var RegisterYhName = $(".register-yh-name").val();//银行持卡人姓名
        var BodyImgUl = $(".up-section").length;//上传证件照片
        var RegisterLxName = $(".register-lx-name").val();//联系人姓名
        var RegisterIphone = $(".register-iphone").val();//联系人手机
        var RegisterEmail = $(".register-email").val();//联系人邮箱
        var RegisterCode = $(".register-code").val();//联系人图形验证码
        var imgcodeVal = $(".img-code").attr("img-val");//假设图形验证码为1234
        var RegisterPhoneCode = $(".register-phone-code").val();//联系人手机短信验证码
        var phoneVal = 1234;//假设短信验证码
        var CheckStatus = $(".checkbox-zl").is(":checked");//勾选框状态
        if(RegisterName == ""){
            $(".error-name").addClass("re-er")
            $(".error-name>span").text("用户名不能为空")
        }else if(RegisterPassword1 == ""){
            $(".error-pass1").addClass("re-er")
            $(".error-pass1>span").text("密码不能为空")
        }else if(RegisterPassword2 == ""){
            $(".error-pass2").addClass("re-er")
            $(".error-pass2>span").text("密码不能为空")
        }else if(RegisterPassword1 != RegisterPassword2){
            $(".error-pass2").addClass("re-er")
            $(".error-pass2>span").text("密码输入不相同")
        }else if(RegisterGsName == ""){
            $(".error-pass3").addClass("re-er")
            $(".error-pass3>span").text("公司不能为空")
        }else if(RegisterYh == "选择银行"){
            $(".error-pass4").addClass("re-er")
            $(".error-pass4>span").text("请输入银行卡号")
        }else if(RegisterYhNumber == ""){
            $(".error-pass4").addClass("re-er")
            $(".error-pass4>span").text("卡号不能为空")
        }else if(RegisterYhNumberL<5){
            $(".error-pass4").addClass("re-er")
            $(".error-pass4>span").text("银行卡号错误")
        }else if(RegisterYhName == ""){
            $(".error-pass5").addClass("re-er")
            $(".error-pass5>span").text("姓名不能为空")
        }else if(BodyImgUl<1){
            $(".error-pass6").addClass("re-er")
            $(".error-pass6>span").text("公司资质不全")
        }else if(RegisterLxName == ""){
            $(".error-pass7").addClass("re-er")
            $(".error-pass7>span").text("姓名不能为空")
        }else if(RegisterIphone == ""){
            $(".error-pass8").addClass("re-er")
            $(".error-pass8>span").text("号码不能为空")
        }else if(RegisterEmail != ""){
            if(!emailreg.test(RegisterEmail)) {
                $(".error-pass9").addClass("re-er")
                $(".error-pass9>span").text("邮箱输入有误")
            }else if(RegisterCode == ""){
                $(".error-pass10").addClass("re-er")
                $(".error-pass10>span").text("验证码不能为空")
            }else if(RegisterCode != imgcodeVal){
                $(".error-pass10").addClass("re-er")
                $(".error-pass10>span").text("图形验证码错误")
            }else if(RegisterPhoneCode == ""){
                $(".error-pass11").addClass("re-er")
                $(".error-pass11>span").text("验证码不能为空")
            }else if(RegisterPhoneCode != phoneVal){
                $(".error-pass11").addClass("re-er")
                $(".error-pass11>span").text("短信验证码错误")
            }else if(CheckStatus == false) {
                $(".error-pass12").addClass("re-er")
                $(".error-pass12>span").text("请先勾选雀搜服务协议")
            }else {
                alert("注册成功")
                $('#form1').submit();
            }
        }else if(RegisterCode == ""){
            $(".error-pass10").addClass("re-er")
            $(".error-pass10>span").text("验证码不能为空")
        }else if(RegisterCode != imgcodeVal){
            $(".error-pass10").addClass("re-er")
            $(".error-pass10>span").text("图形验证码错误")
        }else if(RegisterPhoneCode == ""){
            $(".error-pass11").addClass("re-er")
            $(".error-pass11>span").text("验证码不能为空")
        }else if(RegisterPhoneCode != phoneVal){
            $(".error-pass11").addClass("re-er")
            $(".error-pass11>span").text("短信验证码错误")
        }else if(CheckStatus == false) {
            $(".error-pass12").addClass("re-er")
            $(".error-pass12>span").text("请先勾选雀搜服务协议")
        }else {
            alert("注册成功")
            $('#form1').submit();
        }
    }
    //复按取消勾选框错误状态
    $(".checkbox-zl").on("click",function(){
        $(".error-pass12").removeClass("re-er");
    })
    //点击进入雀搜服务协议
    $(".check-i").on("click",function(){
        window.open("http://www.527so.com/publicity/serve.html")
    })

    //监听卡号输入框检查银行卡号
    $(".register-yh-number").on("input propertychange",function(){
        var abc = $(".register-yh-number").val().substring(0,7);//获取用户输入的前6位
        var value=$(this).val().replace(/\s/g,'').replace(/(\d{4})(?=\d)/g,"$1 ");//设置银行卡输入格式
        $(this).val(value);
        var bankBinWhere = bankBin.indexOf(abc);//在bankcard.js库中查找
        var bankNameHere = bankName1[bankBinWhere];//找到卡号对应的银行卡
        if (bankNameHere == bankName1[bankBinWhere]) {
            $(".register-yh option:selected").text(bankNameHere);
        }
        if (bankBinWhere == -1){
            $(".register-yh").val("其他银行");
        }
    })

    //勾选框事件
    var status = $(".checkbox-zl").is(":checked");
    if(status == true){
        $(".check-img").css("background-image", "url(../Images/icon_shangpingldata_agree_sel.png)");
    }else {
        $(".check-img").css("background-image", "url(../Images/icon_shangpingldata_agree_nor.png)");
    }
    //勾选框点击事件
    $(document).on("click",".checkbox-zl",function(){
        var status = $(".checkbox-zl").is(":checked");
        console.log(status);
        if(status == true){
            $(".check-img").css("background-image", "url(../Images/icon_shangpingldata_agree_sel.png)");
            $(".input-text").text("")
        }else {
            $(".check-img").css("background-image", "url(../Images/icon_shangpingldata_agree_nor.png)");
        }
    })
    ////图片即时预览
    //var urlnum = 0;
    //var arr = []
    ////删除图片
    //$(document).on("click",".body-img-ul li .close-img",function(){
    //    console.log(urlnum);
    //    console.log(arr);
    //    urlnum = $(this).parent().index()-1;
    //    $(this).parent().remove();
    //    var dataid = $(this).parent().attr("data-id")
    //    $("#file"+dataid).remove();
    //    arr.unshift(dataid);
    //    var imglength = $(".body-img-ul li").length;
    //    if(imglength<5){
    //        $(".img-up01").show();
    //    }
    //})
    //
    //$(".img-up01").on("click",function(){
    //    console.log(urlnum);
    //    console.log(arr);
    //    for (var j=0;j<arr.length;j++){
    //        $(".register-body-img").append('<input type="file" style="display: none" name="file[]" id="file' + arr[j] + '"accept="image/gif,image/jpeg,image/jpg,image/png,image/svg">')
    //    }
    //    $("body [id]").each(function(){
    //            var ids = $(this).attr("id");
    //            if( $("body [id="+ids+"]").length >= 2 ){
    //               $("#"+ids).remove();
    //            }
    //    });
    //    //上传图片事件代理
    //    $("#file"+urlnum).click();
    //    $("#file"+urlnum).change(function() {
    //        var str = $(this).attr("id")
    //        var strzi = str.charAt(str.length - 1);
    //        $(".register-error").removeClass("re-er")
    //        var urlimg = this.files.length;
    //        for(var i=0;i<urlimg;i++){
    //            var objUrl = getObjectURL(this.files[i]);
    //            console.log("objUrl = " + objUrl);
    //            var ullength = $(".body-img-ul li").length;
    //            if(ullength>2){
    //                $(".body-img-ul li:eq(3)").css({
    //                    "marginBottom": 26
    //                })
    //            }
    //            if(objUrl&&ullength<5) {
    //               $(".body-img-ul").append('<li class="img-up" data-id=' + strzi + '><img src="' + objUrl + '" alt="" ><span class="close-img"></span></li>')
    //
    //            }
    //            if(ullength==4){
    //                $(".img-up01").hide();
    //            }
    //
    //        }
    //
    //    });
    //    urlnum ++;
    //    if(urlnum>3){
    //        urlnum = 0;
    //    }
    //})
    //
    //
    //
    ////上传图片保存路径函数及兼容性处理
    //function getObjectURL(file) {
    //    var url = null;
    //    if(window.createObjectURL != undefined) { // basic
    //        url = window.createObjectURL(file);
    //    } else if(window.URL != undefined) { // mozilla(firefox)
    //        url = window.URL.createObjectURL(file);
    //    } else if(window.webkitURL != undefined) { // webkit or chrome
    //        url = window.webkitURL.createObjectURL(file);
    //    }
    //    return url;
    //}
    //底部关于我们点击事件
    $(".register-bottom-img1").on("click",function(){
        window.open("http://www.527so.com/Publicity/about.html")
    })
    //发送消息函数
    function sendMessage() {
        curCount = 60; //设置button效果，开始计时
        console.log(curCount);
        $(".register-phone-code-btn").text(curCount + "秒后重获").addClass('code-state1');
        InterValObj = window.setInterval(SetRemainTime, 1000); //启动计时器，1秒执行一次
    }

    //timer处理函数
    function SetRemainTime() {
        if(curCount == 0) {
            window.clearInterval(InterValObj); //停止计时器
            $(".register-phone-code-btn").text("重新获取").removeClass('code-state1');
        } else {
            curCount--;
            $(".register-phone-code-btn").text(curCount + "秒后重获").addClass('code-state1');
        }
    }

})