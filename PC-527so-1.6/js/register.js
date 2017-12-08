$(function() {
	var InterValObj; //timer变量，控制时间
	var curCount; //当前剩余秒数

	//检测手机号码输入正确-手机注册
	$(document).on("change",".input-phone",function(){
		var uppass = $(".input-phone").val();
		var phone = $(".input-phone").val();
		var numreg = /^1(3|4|5|7|8)\d{9}$/;
		if(uppass == "") {
			$(".err01").show();
			$(".err02").hide();
			$(".error_msg1_tips").text("请输入您的手机号码");
			$(".input-10").addClass("error");
			$(".input-11").removeClass("error");
		} else if(!numreg.test(phone)) {
			$(".err01").show();
			$(".err02").hide();
			$(".error_msg1_tips").text("您输入的手机号码有误");
			$(".input-10").addClass("error");
			$(".input-11").removeClass("error");
		} else {
			$(".err01").hide();
			$(".input-10").removeClass("error");
			$(".error_msg1_tips").text("");
		}
		CheckPhone();//检查手机号码
	})

	//检测图文验证码输入正确-手机注册
	$(document).on("change",".input-vcode1",function(){
		var imgcodeUser = $(".input-vcode1").val();//用户输入的图片验证码
		var imgcodeVal = $(".img_vcode").attr("data-val"); //假设图片验证码为4542
		if(imgcodeUser == ""){
			$(".err01").show();
			$(".error_msg1_tips").text("请输入验证码");
			$(".input-3").removeClass("error");
			$(".input-2").removeClass("error");
			$(".input-vcode1").addClass("error");
			$(".UpData-Code").addClass("jy_btn_1");
			console.log("请输入验证码1");
		} else if(imgcodeUser != imgcodeVal){
			$(".err01").show();
			$(".error_msg1_tips").text("您输入的验证码不正确，请重输");
			$(".input-3").removeClass("error");
			$(".input-2").removeClass("error");
			$(".input-vcode1").addClass("error");
			$(".UpData-Code").addClass("jy_btn_1");
			console.log("您输入的验证码不正确，请重输1");
		} else {
			$(".err01").hide();
			$(".error_msg1_tips").text("");
			$(".input-vcode1").removeClass("error");
			$(".UpData-Code").removeClass("jy_btn_1");
		}
	})

	//点击发送手机验证码带输入框正则判断
	$(document).on("click", ".Code01", function() {
		var phone = $(".input-phone").val();
		var numreg = /^1(3|4|5|7|8)\d{9}$/;
		if(phone == "") {
			$(".err01").show();
			$(".err02").hide();
			$(".error_msg1_tips").text("请输入您的手机号码");
			$(".input-10").addClass("error");
			$(".input-11").removeClass("error");
		} else if(!numreg.test(phone)) {
			$(".err01").show();
			$(".err02").hide();
			$(".error_msg1_tips").text("您输入的手机号码有误");
			$(".input-10").addClass("error");
			$(".input-11").removeClass("error");
		} else {
			$(".err01").hide();
			$(".input-10").removeClass("error");
			$(".error_msg1_tips").text("");
			sendMessage();
		}

		//发送消息函数
		function sendMessage() {
			curCount = 60; //设置button效果，开始计时
			console.log(curCount);
			$(".Code01").text(curCount + "秒后重获").addClass('code-state1');
			InterValObj = window.setInterval(SetRemainTime, 1000); //启动计时器，1秒执行一次
		}

		//timer处理函数
		function SetRemainTime() {
			if(curCount == 0) {
				window.clearInterval(InterValObj); //停止计时器
				$(".Code01").text("重新获取").removeClass('code-state1');
			} else {
				curCount--;
				$(".Code01").text(curCount + "秒后重获").addClass('code-state1');
			}
		}
	})
	
	//为用户输入获取焦点事件监听（手机）
	$(document).on("focus", ".vcode_1", function() {
		$(this).addClass("focus");
	})

	//为用户输入失去焦点事件监听（手机）
	$(document).on("blur", ".vcode_1", function() {
		$(this).removeClass("focus");
		CheckPhone();
	})
	
	//用户按下回车键监听处理函数-手机注册
	$(document).on("keydown", "#RegPhone", function(e) {
		if(e.keyCode==13){
			CheckPhone();
			if(submitTo1 == 1){
				console.log(valArr1[0],valArr1[1],valArr1[2],valArr1[3],valArr1[4]);//发起ajax
			}
		}
	})
	
	//手机号码提交按钮
	$(document).on("click", ".subiphone", function() {
		CheckPhone();
		if(submitTo1 == 1){
			console.log(valArr1[0],valArr1[1],valArr1[2],valArr1[3],valArr1[4]);//发起ajax
		}
	})
	
	//点击发送邮箱验证码带输入框正则判断
	$(document).on("click", ".Code02", function() {
		var email = $(".input-email").val();
		var emailreg = /^[a-z0-9-_.]+@[\da-z][\.\w-]+\.[a-z]{2,4}$/i;
		if(email == "") {
			$(".err02").show();
			$(".err01").hide();
			$(".error_msg1_tips").text("请输入您的邮箱号码")
			$(".input-11").addClass("error");
			$(".input-10").removeClass("error");
		} else if(!emailreg.test(email)) {
			$(".err02").show();
			$(".err01").hide();
			$(".error_msg1_tips").text("邮箱号码有误")
			$(".input-11").addClass("error");
			$(".input-10").removeClass("error");
		} else {
			$(".err02").hide();
			$(".input-10").removeClass("error");
			$(".error_msg1_tips").text("");
			sendMessage();
		}
		//发送消息函数
		function sendMessage() {
			curCount = 60; //设置button效果，开始计时
			console.log(curCount);
			$(".Code02").text(curCount + "秒后重获").addClass('code-state1')
			InterValObj = window.setInterval(SetRemainTime, 1000); //启动计时器，1秒执行一次
		}

		//timer处理函数
		function SetRemainTime() {
			if(curCount == 0) {
				window.clearInterval(InterValObj); //停止计时器
				$(".Code02").text("重新获取").removeClass('code-state1')
			} else {
				curCount--;
				$(".Code02").text(curCount + "秒后重获").addClass('code-state1');
			}
		}
	})

	//检测邮箱输入正确-邮箱注册
	$(document).on("change",".input-email",function(){
		var str = "";
		var email = $(".input-email").val();
		var emailreg = /^[a-z0-9-_.]+@[\da-z][\.\w-]+\.[a-z]{2,4}$/i;

		$(".img_vcode").css("border","2px solid red");
		
		if(email == "") {
			$(".err02").show();
			$(".err01").hide();
			$(".error_msg1_tips").text("请输入您的邮箱号码")
			$(".input-11").addClass("error");
			$(".input-10").removeClass("error");
			$(".UpData-Code").addClass("jy_btn_1");
		} else if(!emailreg.test(email)) {
			$(".err02").show();
			$(".err01").hide();
			$(".error_msg1_tips").text("邮箱号码有误")
			$(".input-11").addClass("error");
			$(".input-10").removeClass("error");
			$(".UpData-Code").addClass("jy_btn_1");
		} else {
			$(".err02").hide();
			$(".error_msg1_tips").text("");
			$(".input-vcode2").removeClass("error");
//			$(".UpData-Code").removeClass("jy_btn_1");
		}
		CheckEamil();//检查邮箱号码
	})

	//检测图文验证码输入正确-邮箱注册
	$(document).on("change",".input-vcode2",function(){
		var imgcodeUser = $(".input-vcode2").val();//用户输入的图片验证码
		var imgcodeVal = $(".img_vcode").attr("data-val"); //假设图片验证码为4542
		if(imgcodeUser == ""){
			$(".err02").show();
			$(".error_msg1_tips").text("请输入验证码");
			$(".input-3").removeClass("error");
			$(".input-2").removeClass("error");
			$(".input-vcode2").addClass("error");
			$(".UpData-Code").addClass("jy_btn_1");
			console.log("请输入验证码1");
		} else if(imgcodeUser != imgcodeVal){
			$(".err02").show();
			$(".error_msg1_tips").text("您输入的验证码不正确，请重输");
			$(".input-3").removeClass("error");
			$(".input-2").removeClass("error");
			$(".input-vcode2").addClass("error");
			$(".UpData-Code").addClass("jy_btn_1");
			console.log("您输入的验证码不正确，请重输1");
		} else {
			$(".err02").hide();
			$(".error_msg1_tips").text("");
			$(".input-vcode2").removeClass("error");
			$(".UpData-Code").removeClass("jy_btn_1");
		}
		CheckEamil();//检查邮箱号码
	})
	
	//为用户输入获取焦点事件监听（邮箱）
	$(document).on("focus", ".vcode_2", function() {
		$(this).addClass("focus");
	})

	//为用户输入失去焦点事件监听（邮箱）
	$(document).on("blur", ".vcode_2", function() {
		$(this).removeClass("focus");
		CheckEamil();
	})
	
	//用户按下回车键监听处理函数-邮箱注册
	$(document).on("keydown", "#RegEmail", function(e) {
		if(e.keyCode==13){
			CheckPhone();
			if(submitTo2 == 1){
				console.log(valArr2[0],valArr2[1],valArr2[2],valArr2[3],valArr2[4]);//发起ajax
			}
		}
	})
	
	//邮箱号码提交按钮
	$(document).on("click", ".subemail", function() {
		CheckEamil();
		if(submitTo2 == 1){
			console.log(valArr2[0],valArr2[1],valArr2[2],valArr2[3],valArr2[4]);//发起ajax
		}
	})
	
	//点击手机注册切换
	$(document).on("click", ".VipReg", function() {
		$(".VipReg").addClass("active");
		$(".EmailReg").removeClass("active");
		$("input").removeClass("error");
		$(".error_code1").hide();
		$("#RegPhone").show();
		$("#RegEmail").hide();
	})
	
	//点击邮箱注册切换
	$(document).on("click", ".EmailReg", function() {
		$(".VipReg").removeClass("active");
		$(".EmailReg").addClass("active");
		$("input").removeClass("error");
		$(".error_code1").hide();
		$("#RegEmail").show();
		$("#RegPhone").hide();
	})
	
	//点击底部跳转
	$(document).on("click", ".RegBottom ul .li2>span", function() {
		window.open("../Publicity/about.html");
	})
	
	//点击服务条例
	$(document).on("click", ".sever", function() {
		window.open("../Publicity/serve.html");
	})
})

//检查手机号码注册提交
var submitTo1;
var valArr1;
function CheckPhone(){
	var numreg = /^1(3|4|5|7|8)\d{9}$/;//匹配手机格式正则
	var inputphone = $(".input-phone").val();//手机号码
	var input2 = $(".input-20").val();//一次密码
	var input3 = $(".input-30").val();//二次密码
	var imgcodeUser = $(".input-vcode1").val();//用户输入的图片验证码
	var imgcodeVal = $(".img_vcode").attr("data-val");//假设图片验证码为4542
	var input4 = $(".input-40").val();//用户输入的短信验证码
	var telcodeVal = "1234";//假设短信验证码为1234
	//console.log(input2.length);
	//console.log($("input[type='checkbox']").prop('checked'));
	if(inputphone == "") {
		$(".err01").show();
		$(".err02").hide();
		$(".error_msg1_tips").text("请输入您的手机号码");
		$(".input-phone").addClass("error");
		$(".input-email").removeClass("error");
		console.log("请输入您的手机号");
	} else if(!numreg.test(inputphone)){
		$(".err01").show();
		$(".err02").hide();
		$(".error_msg1_tips").text("您输入的手机号码有误");
		$(".input-phone").addClass("error");
		$(".input-email").removeClass("error");
		console.log("您输入的手机格式不对");
	}else if(input2 == "") {
		$(".err01").show();
		$(".error_msg1_tips").text("请输入密码");
		$(".input-2").addClass("error");
		$(".input-phone").removeClass("error");
		console.log("请输入密码");
	} else if(input3 == "") {
		$(".err01").show();
		$(".error_msg1_tips").text("请输入确认密码");
		$(".input-2").removeClass("error");
		$(".input-3").addClass("error");
		console.log("请输入确认密码");
	} else if(input2.length < 6) {
		$(".err01").show();
		$(".error_msg1_tips").text("密码不足六位");
		$(".input-3").removeClass("error");
		$(".input-2").addClass("error");
		console.log("密码不足六位");
	} else if(input3.length < 6) {
		$(".err01").show();
		$(".error_msg1_tips").text("密码不足六位");
		$(".input-2").removeClass("error");
		$(".input-3").addClass("error");
		console.log("密码不足六位");
	} else if(input2 != input3) {
		$(".err01").show();
		$(".error_msg1_tips").text("两次密码输入不相同");
		$(".input-3").addClass("error");
		$(".input-2").addClass("error");
		console.log("两次密码输入不相同");
	} else if(imgcodeUser == ""){
		$(".err01").show();
		$(".error_msg1_tips").text("请输入验证码");
		$(".input-3").removeClass("error");
		$(".input-2").removeClass("error");
		$(".input-vcode1").addClass("error");
		console.log("请输入验证码1");
	} else if(imgcodeUser != imgcodeVal){
		$(".err01").show();
		$(".error_msg1_tips").text("您输入的验证码不正确，请重输");
		$(".input-3").removeClass("error");
		$(".input-2").removeClass("error");
		$(".input-vcode1").addClass("error");
		console.log("您输入的验证码不正确，请重输1");
	} else if(input4 == "") {
		$(".err01").show();
		$(".error_msg1_tips").text("请输入验证码");
		$(".input-vcode1").removeClass("error");
		$(".input-4").addClass("error");
		console.log("请输入验证码2");
	} else if(input4 != telcodeVal){
		$(".err01").show();
		$(".error_msg1_tips").text("您输入的验证码不正确，请重输");
		$(".input-3").removeClass("error");
		$(".input-2").removeClass("error");
		$(".input-vcode1").removeClass("error");
		$(".input-4").addClass("error");
		console.log("您输入的验证码不正确，请重输2");
	} else if(!$('.CheckBox11').is(':checked')) {
		$(".err01").show();
		$(".error_msg1_tips").text("请点击同意服务协议");
		$(".input-4").removeClass("error");
	} else {
		$(".err01").hide();
		$(".input-4").removeClass("error");
		$(".error_msg1_tips").text("");
		submitTo1 = 1;
		valArr1 = [inputphone,input2,input3,imgcodeUser,input4];
		//console.log(input2,input3,input4,inputphone);//发起ajax
	}
}

//检查邮箱号码注册提交
var submitTo2;
var valArr2;
function CheckEamil(){
	var emailreg = /^[a-z0-9-_.]+@[\da-z][\.\w-]+\.[a-z]{2,4}$/i;//匹配邮箱格式正则
	var inputemail = $(".input-email").val();//邮箱号码
	var input2 = $(".input-22").val();//一次密码
	var input3 = $(".input-33").val();//二次密码
	var imgcodeUser = $(".input-vcode2").val();//用户输入的图片验证码
	var imgcodeVal = $(".img_vcode").attr("data-val"); //假设图片验证码为4542
	var input4 = $(".input-44").val();//用户输入的短信验证码
	var emailcodeVal = "1234";//假设邮箱验证码为1234
	if(inputemail == "") {
		$(".err02").show();
		$(".err01").hide();
		$(".error_msg1_tips").text("请输入您的邮箱号码");
		$(".input-email").addClass("error");
		$(".input-phone").removeClass("error");
		console.log("请输入您的邮箱号码");
	} else if(!emailreg.test(inputemail)){
		$(".err02").show();
		$(".err01").hide();
		$(".error_msg1_tips").text("您输入的邮箱号码有误");
		$(".input-email").addClass("error");
		$(".input-phone").removeClass("error");
		console.log("您输入的邮箱号码有误");
	}else if(input2 == "") {
		$(".err02").show();
		$(".error_msg1_tips").text("请输入密码");
		$(".input-2").addClass("error");
		$(".input-email").removeClass("error");
		console.log("请输入密码");
	} else if(input3 == "") {
		$(".err02").show();
		$(".error_msg1_tips").text("请输入确认密码");
		$(".input-2").removeClass("error");
		$(".input-3").addClass("error");
		console.log("请输入确认密码");
	} else if(input2.length < 6) {
		$(".err02").show();
		$(".error_msg1_tips").text("密码不足六位");
		$(".input-3").removeClass("error");
		$(".input-2").addClass("error");
		console.log("密码不足六位");
	} else if(input3.length < 6) {
		$(".err02").show();
		$(".error_msg1_tips").text("密码不足六位");
		$(".input-2").removeClass("error");
		$(".input-3").addClass("error");
		console.log("密码不足六位");
	} else if(input2 != input3) {
		$(".err02").show();
		$(".error_msg1_tips").text("两次密码输入不相同");
		$(".input-3").addClass("error");
		$(".input-2").addClass("error");
		console.log("两次密码输入不相同");
	} else if(imgcodeUser == "") {
		$(".err02").show();
		$(".error_msg1_tips").text("请输入验证码");
		$(".input-3").removeClass("error");
		$(".input-2").removeClass("error");
		$(".input-vcode2").addClass("error");
		console.log("请输入验证码1");
	} else if(imgcodeUser != imgcodeVal) {
		$(".err02").show();
		$(".error_msg1_tips").text("您输入的验证码不正确，请重输");
		$(".input-3").removeClass("error");
		$(".input-2").removeClass("error");
		$(".input-vcode2").addClass("error");
		console.log("您输入的验证码不正确，请重输1");
	} else if(input4 == "") {
		$(".err02").show();
		$(".error_msg1_tips").text("请输入验证码");
		$(".input-vcode2").removeClass("error");
		$(".input-4").addClass("error");
		console.log("请输入验证码2");
	} else if(input4 != emailcodeVal) {
		$(".err02").show();
		$(".error_msg1_tips").text("您输入的验证码不正确，请重输");
		$(".input-3").removeClass("error");
		$(".input-2").removeClass("error");
		$(".input-vcode2").removeClass("error");
		$(".input-4").addClass("error");
		console.log("您输入的验证码不正确，请重输2");
	} else if(!$('.CheckBox22').is(':checked')) {
		$(".err02").show();
		$(".error_msg1_tips").text("请点击同意服务协议");
		$(".input-4").removeClass("error");
	} else {
		$(".err02").hide();
		$(".input-4").removeClass("error");
		$(".error_msg1_tips").text("");
		submitTo2 = 1;
		valArr2 = [inputemail,input2,input3,imgcodeUser,input4];
		//console.log(inputemail,input2,input3,imgcodeUser,input4);//发起ajax
	}
}