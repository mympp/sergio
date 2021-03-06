$(function() {
	getHeight();//动态设置高度
	
	$(window).resize(function() {
		getHeight();
	})
	//判断何种状态进来
	//1 = 手机会员登录 2 = 邮箱登录 3 = 微信扫码登录
	var login = 3;
	if(login == 1){
		var email = false;//此时状态为没绑定邮箱
		//如果该手机号已绑定邮箱，显示邮箱名，不可修改。
		//如果该手机号没绑定邮箱，显示“未填写”，可以修改。
		$(".MessPhone").attr("disabled","disabled")
		if(email){
			$(".MessEmail").attr("disabled","disabled")
		}else {
			$(".MessEmail").attr("placeholder","邮箱尚未绑定")
		}
	}
	if(login == 2){
		var Phone = false;//此时状态为没绑定手机
		//如果该手机号已绑定邮箱，显示手机号码，不可修改。
		//如果该手机号没绑定邮箱，显示“未填写”，可以修改。
		$(".MessEmail").attr("disabled","disabled")
		if(Phone){
			$(".MessPhone").attr("disabled","disabled")
		}else {
			$(".MessPhone").attr("placeholder","手机号码尚未绑定")
		}
	}
	if(login == 3){
		var Phone = false;//此时状态为没绑定手机
		var email = false;//此时状态为没绑定邮箱
		//如果该手机号已绑定邮箱，显示手机号码，不可修改。
		//如果该手机号没绑定邮箱，显示“未填写”，可以修改。
		//如果该手机号已绑定邮箱，显示邮箱名，不可修改。
		//如果该手机号没绑定邮箱，显示“未填写”，可以修改。
		if(Phone){
			$(".MessPhone").attr("disabled","disabled")
		}else {
			$(".MessPhone").attr("placeholder","手机号码尚未绑定")
		}
		if(email){
			$(".MessEmail").attr("disabled","disabled")
		}else {
			$(".MessEmail").attr("placeholder","邮箱尚未绑定")
		}
	}
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
			alert("发送请求")
			$(".MessPhone").val(MyIphoneInput);
			$(".My-Iphone-model").fadeOut();
			$(".MessPhone").attr("disabled","disabled")
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
			alert("发送请求")
			$(".MessEmail").val(MyEmailInput);
			$(".My-Email-model").fadeOut();
			$(".MessEmail").attr("disabled","disabled")
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
	$("#uppass").keydown(function() {
		var uppass = $("#uppass").val();
		console.log(uppass.length);
		if(uppass.length > 9) {
			$(".UpPhone-send02").addClass("code-state")
		}
	});
	
	//隐藏手机号中间数
	//var tel = $('#IphoneNumber').val();
	//var mtel = tel.substr(0, 3) + '****' + tel.substr(7);
	//$('#IphoneNumber').val(mtel);
	
	//隐藏手机号中间数结束
	//消息管理4个选项的状态
	var sback01 = false;
	console.log(sback01);
	var sback02 = false;
	var sback03 = false;
	var sback04 = false;
	
	// 更换头像事件代理点击事件
	$(document).on("click", ".modal_SetUp", function() {
		$("#file0").click();
	})

	$("#file0").change(function() {
		var objUrl = getObjectURL(this.files[0]);
		console.log("objUrl = " + objUrl);
		if(objUrl) {
			$("#img0").attr("src", objUrl);
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
	
	//点击保存表单
	$(".Updata").on("click", function() {
		$(".sucuess-modal").fadeIn();
		setTimeout(function() {
			$(".sucuess-modal").fadeOut();
		}, 1500);
	})

	$(document).on("click", ".SetupCenter-top>span", function() {
		$(".pay_model").fadeIn();
		$(".pay01").show();
	})
	
	//点击安全设置修改密码按钮
	$(document).on("click", ".Updata-Password", function() {
		$(".modal_Bigbox").fadeIn()
		$(".UpPassword").fadeIn()
	})
	
	//点击安全设置修改手机号按钮
	$(document).on("click", ".Updata-Phone", function() {
		$(".modal_Bigbox").fadeIn()
		$(".Updata-Phonenumber").fadeIn()
	})
	
	//点击安全设置消息管理
	$(document).on("click", ".Updata-message", function() {
		$(".modal_Bigbox").fadeIn()
		$(".Updata-Message").fadeIn()
	})
	
	//点击关闭修改密码模态框
	$(document).on("click", ".UpPassword-top>i,.password-off", function() {
		$(".modal_Bigbox").hide()
		$(".UpPassword").hide()
	})
	
	//点击关闭修改手机号窗口
	$(document).on("click", ".UpPhone-top>i,.Phone-off", function() {
		$(".modal_Bigbox").hide()
		$(".Updata-Phonenumber").hide()
	})
	
	//点击关闭修改消息管理窗口
	$(document).on("click", ".Updata-Message-top>i,.Message-off", function() {
		$(".modal_Bigbox").hide()
		$(".Updata-Message").hide()
	})
	
	//点击修改密码确认按钮以及密码不正确的状态
	$(document).on("click", ".password-save", function() {
		//pass 为true 密码正常
		//pass 为false 密码错误 出现提示密码错误
		pass = true
		var pass1 = $("#password-1").val();
		var pass2 = $("#password-2").val();
		//判断修改密码是否为空
		if(pass1 == "" || pass2 == "") {
			alert("输入框内容不能为空")

		} else if(pass == false) { //判断密码状态
			$(".password-NO").fadeIn();
		} else {
			$(".password-NO").fadeOut();
			$(".sucuess-modal").fadeIn();
			setTimeout(function() {
				$(".sucuess-modal").fadeOut();
			}, 1500);
		}
	})
	
	//点击修改手机号确认按钮以及验证码不正确的状态
	$(document).on("click", ".Phone-save", function() {
		var input001 = $(".input02>input").val();
		var input002 = $(".input03>input").val();
		var input003 = $(".input04>input").val();
		//验证码正确的状态为true,错误为false
		iphoneNO1 = true;
		iphoneNO2 = true;
		if(input001 == "" || input002 == "" || input003 == "") {
			alert("输入框内容不能为空！")
		} else if(iphoneNO1 == false) {
			$(".iphoneNO1").show();
		} else if(iphoneNO2 == false) {
			$(".iphoneNO2").show();
		} else {
			$(".iphoneNO1").fadeOut();
			$(".iphoneNO2").fadeOut();
			$(".sucuess-modal").fadeIn();
			setTimeout(function() {
				$(".sucuess-modal").fadeOut();
			}, 1500);
		}
	})
	
	//点击确定保存消息管理
	$(document).on("click", ".Message-no", function() {
		$(".sucuess-modal").fadeIn();
		setTimeout(function() {
			$(".sucuess-modal").fadeOut();
		}, 1500);

	})
	
	//点击显示隐藏密码切换
	$(document).on("click", ".ShowPassword", function() {
		//获取点击按钮内state属性
		var state = $(this).attr("state");
		console.log(state);
		//判断属性是off还是no
		if(state == "off") {
			$("#password-2").prop("type", "text");
			$(".ShowPassword").attr("state", "no")
			$(".ShowPassword").css("background-image", "url(../../Images/set_icon_eye_sel.png)");
		} else {
			$("#password-2").prop("type", "password");
			$(".ShowPassword").attr("state", "off")
			$(".ShowPassword").css("background-image", "url(../../Images/set_icon_eye_nor.png)");
		}

	});
	
	//修改密码点击发送验证码
	$(document).on("click", ".UpPhone-send01", function() {
		$(".UpPhone-send01").addClass("disabled");
		sendMessage();

		var InterValObj; //timer变量，控制时间
		var curCount; //当前剩余秒数
		//发送消息函数
		function sendMessage() {
			curCount = 60; //设置button效果，开始计时
			console.log(curCount);
			$(".UpPhone-send01").text(curCount + "秒后重获").addClass('code-state1');
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
				$(".UpPhone-send01").text(curCount + "秒后重获").addClass('code-state1');
			}
		}
	})
	
	$(document).on("click", ".UpPhone-send02", function() {
		var uppass = $("#uppass").val();
		if(uppass == "") {
			alert("请输入要修改的手机号码！")
		} else {
			sendMessage();
		}

		var InterValObj; //timer变量，控制时间
		var curCount; //当前剩余秒数
		//发送消息函数
		function sendMessage() {
			curCount = 60; //设置button效果，开始计时
			console.log(curCount);
			$(".UpPhone-send02").text(curCount + "秒后重获").addClass('code-state1').removeClass('code-state');
			InterValObj = window.setInterval(SetRemainTime, 1000); //启动计时器，1秒执行一次
		}

		//timer处理函数
		function SetRemainTime() {
			if(curCount == 0) {
				window.clearInterval(InterValObj); //停止计时器
				$(".UpPhone-send02").text("重新获取").removeClass('code-state1').addClass('code-state');
			} else {
				curCount--;
				$(".UpPhone-send02").text(curCount + "秒后重获").addClass('code-state1');
			}
		}
	})
	
	//消息管理中4个按钮
	$(document).on("click", ".back01", function() {
		if(sback01) {
			sback01 = false;
			$(".back01").css("background-image", "url(../../Images/set_icon_xioaxi_nor.png)");
		} else {
			sback01 = true;
			$(".back01").css("background-image", "url(../../Images/set_icon_xioaxi_sel.png)");

		}

	})
	
	$(document).on("click", ".back02", function() {
		if(sback02) {
			sback02 = false;
			$(".back02").css("background-image", "url(../../Images/set_icon_xioaxi_nor.png)");
		} else {
			sback02 = true;
			$(".back02").css("background-image", "url(../../Images/set_icon_xioaxi_sel.png)");

		}

	})
	
	$(document).on("click", ".back03", function() {
		if(sback03) {
			sback03 = false;
			$(".back03").css("background-image", "url(../../Images/set_icon_tixing_nor.png)");
		} else {
			sback03 = true;
			$(".back03").css("background-image", "url(../../Images/set_icon_tixing_sel.png)");

		}

	})
	
	$(document).on("click", ".back04", function() {
		if(sback04) {
			sback04 = false;
			$(".back04").css("background-image", "url(../../Images/set_icon_tixing_nor.png)");
		} else {
			sback04 = true;
			$(".back04").css("background-image", "url(../../Images/set_icon_tixing_sel.png)");

		}
	})
})
function checkphone(){
	var numreg = /^1(3|4|5|7|8)\d{9}$/;
	var MyIphone = $(".MyIphoneInput").val();
	if(!numreg.test(MyIphone)){
		$(".MyIphoneText-T").text("您输入的手机号码格式错误");
	}else {
		sendMessage($(".MyIphoneBtn"))
	}
}
function checkemail(){
	var emailreg = /^[a-z0-9-_.]+@[\da-z][\.\w-]+\.[a-z]{2,4}$/i;
	var MyEmail = $(".MyEmailInput").val();
	if(! emailreg.test(MyEmail)){
		$(".MyEmailText-T").text("您输入的邮箱格式错误");
	}else {
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