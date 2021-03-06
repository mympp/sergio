$(function() {
	getHeight(); //获取高度

	$(window).resize(function() {
		getHeight(); //获取高度
	})

	//通过手机验证绑定单击事件
	$(document).on("click", ".select_phone", function() {
		//console.log(0);
		var timer = 500;
		$(".select_codefun").fadeOut(timer);
		$(".user_state2").remove();
		setTimeout(function() {
			$(".select_codefun").remove();
			$(".user_state1").show();
		}, timer);
	})

	//通过邮箱验证绑定单击事件
	$(document).on("click", ".select_email", function() {
		//console.log(1);
		var timer = 500;
		$(".select_codefun").fadeOut(timer);
		$(".user_state1").remove();
		setTimeout(function() {
			$(".select_codefun").remove();
			$(".user_state2").show();
		}, timer);
	})

	//为手机提交按钮绑定单击事件
	$(document).on("click", ".submit_phone_btn", function() {
		var user_name = $(".user_name1").val();
		var vcode_num = $(".user_vcode1").val();
		var vcode_val = $(".vcode_val1").val();
		var user_phone1 = $(".user_phone1").val();
		var phonereg = /^1(3|4|5|7|8)\d{9}$/;
		if(user_name.length > 0) {
			//console.log(111);
			$(".user_name1").parents(".one-cell1").removeClass("error");
		}

		if(user_phone1.lenght > 0) {
			//console.log(222);
			$(".user_phone1").parents(".one-cell1").removeClass("error");
		}

		if(vcode_num.length > 0) {
			//console.log(333);
			$(".newcode-cell1_lf").removeClass("error");
		}

		if(user_name == "" || user_name == undefined) {
			$(".error_code1").show().find(".error_msg1_tips").text("请输入您的用户名");
			$(".user_name1").parents(".one-cell1").addClass("error");
		} else if(user_phone1 == "" || user_phone1 == undefined) {
			$(".error_code1").show().find(".error_msg1_tips").text("请输入您的手机号码");
			$(".user_phone1").parents(".one-cell1").addClass("error");
		} else if(!phonereg.test(user_phone1)) {
			$(".error_code1").show().find(".error_msg1_tips").text("输入的手机号码格式有误");
			$(".user_phone1").parents(".one-cell1").addClass("error");
		} else if(vcode_num == "" || vcode_num == undefined) {
			$(".error_code1").show().find(".error_msg1_tips").text("请输入您的验证码");
			$(".newcode-cell1_lf").addClass("error");
		} else if(vcode_num != vcode_val) {
			$(".error_code1").show().find(".error_msg1_tips").text("您输入的验证码有误");
			$(".newcode-cell1_lf").addClass("error");
		} else {
			$(".error_code1").hide().find(".error_msg1_tips").text("");
			console.log(user_name, user_phone1, vcode_num, vcode_val); //发起ajax
			location.href = "set-password3.html";
		}
	})
	
	//为手机验证码按钮绑定单击事件
	$(document).on("click", ".getvcode_1", function() {
		var InterValObj; //timer变量，控制时间
		var count = 60; //间隔函数，1秒执行
		var curCount; //当前剩余秒数
		var user_name = $(".user_name1").val();
		var user_phone1 = $(".user_phone1").val();
		var phonereg = /^1(3|4|5|7|8)\d{9}$/;
		if(user_name.length > 0) {
			//console.log(111);
			$(".user_name1").parents(".one-cell1").removeClass("error");
		}
	
		if(user_phone1.lenght > 0) {
			//console.log(222);
			$(".user_phone1").parents(".one-cell1").removeClass("error");
		}
	
		if(user_name == "" || user_name == undefined) {
			$(".error_code1").show().find(".error_msg1_tips").text("请输入您的用户名");
			$(".user_name1").parents(".one-cell1").addClass("error");
		} else if(user_phone1 == "" || user_phone1 == undefined) {
			$(".error_code1").show().find(".error_msg1_tips").text("请输入您的手机号码");
			$(".user_phone1").parents(".one-cell1").addClass("error");
		} else if(!phonereg.test(user_phone1)) {
			$(".error_code1").show().find(".error_msg1_tips").text("输入的手机号码格式有误");
			$(".user_phone1").parents(".one-cell1").addClass("error");
		} else {
			console.log("scuess");
			$(".error_code1").hide().find(".error_msg1_tips").text("");
			$("*").removeClass("error");
			var Ele = $(this);
			sendMessage(Ele);
		}
	
		//发送消息函数
		function sendMessage(Ele) {　
			curCount = count; //设置button效果，开始计时
			Ele.attr("disabled", "true");
			Ele.val(curCount + "秒").addClass('active');
			InterValObj = window.setInterval(function() {
				SetRemainTime(Ele);
			}, 1000);
		}
	
		//timer处理函数
		function SetRemainTime(Ele) {
			if(curCount == 0) {
				window.clearInterval(InterValObj); //停止计时器
				Ele.removeAttr("disabled"); //启用按钮
				Ele.val("重新获取").removeClass('active');
			} else {
				curCount--;
				Ele.val(curCount + "秒").addClass('active');
			}
		}
	})
	
	//为邮箱提交按钮绑定单击事件
	$(document).on("click", ".submit_email_btn", function() {
		var user_name = $(".user_name1").val();
		var vcode_num = $(".user_vcode1").val();
		var vcode_val = $(".vcode_val1").val();
		var user_email1 = $(".user_email1").val();
		var emailreg = /^[a-z0-9-_.]+@[\da-z][\.\w-]+\.[a-z]{2,4}$/i;
		if(user_name.length > 0) {
			//console.log(111);
			$(".user_name1").parents(".one-cell1").removeClass("error");
		}

		if(user_email1.lenght > 0) {
			//console.log(222);
			$(".user_email1").parents(".one-cell1").removeClass("error");
		}

		if(vcode_num.length > 0) {
			//console.log(333);
			$(".newcode-cell1_lf").removeClass("error");
		}

		if(user_name == "" || user_name == undefined) {
			$(".error_code1").show().find(".error_msg1_tips").text("请输入您的用户名");
			$(".user_name1").parents(".one-cell1").addClass("error");
		} else if(user_email1 == "" || user_email1 == undefined) {
			$(".error_code1").show().find(".error_msg1_tips").text("请输入您的邮箱号码");
			$(".user_email1").parents(".one-cell1").addClass("error");
		} else if(!emailreg.test(user_email1)) {
			$(".error_code1").show().find(".error_msg1_tips").text("输入的邮箱号码格式有误");
			$(".user_email1").parents(".one-cell1").addClass("error");
		} else if(vcode_num == "" || vcode_num == undefined) {
			$(".error_code1").show().find(".error_msg1_tips").text("请输入您的验证码");
			$(".newcode-cell1_lf").addClass("error");
		} else if(vcode_num != vcode_val) {
			$(".error_code1").show().find(".error_msg1_tips").text("您输入的验证码有误");
			$(".newcode-cell1_lf").addClass("error");
		} else {
			$(".error_code1").hide().find(".error_msg1_tips").text("");
			console.log(user_name, user_email1, vcode_num, vcode_val); //发起ajax
			location.href = "set-password3.html";
		}
	})
	
	//为邮箱验证码按钮绑定单击事件
	$(document).on("click", ".getvcode_2", function() {
		var InterValObj; //timer变量，控制时间
		var count = 60; //间隔函数，1秒执行
		var curCount; //当前剩余秒数
		var user_name = $(".user_name1").val();
		var user_email1 = $(".user_email1").val();
		var emailreg = /^[a-z0-9-_.]+@[\da-z][\.\w-]+\.[a-z]{2,4}$/i;
		if(user_name.length > 0) {
			//console.log(111);
			$(".user_name1").parents(".one-cell1").removeClass("error");
		}
	
		if(user_email1.lenght > 0) {
			//console.log(222);
			$(".user_email1").parents(".one-cell1").removeClass("error");
		}
	
		if(user_name == "" || user_name == undefined) {
			$(".error_code1").show().find(".error_msg1_tips").text("请输入您的用户名");
			$(".user_name1").parents(".one-cell1").addClass("error");
		} else if(user_email1 == "" || user_email1 == undefined) {
			$(".error_code1").show().find(".error_msg1_tips").text("请输入您的邮箱号码");
			$(".user_email1").parents(".one-cell1").addClass("error");
		} else if(!emailreg.test(user_email1)) {
			$(".error_code1").show().find(".error_msg1_tips").text("输入的邮箱号码格式有误");
			$(".user_email1").parents(".one-cell1").addClass("error");
		} else {
			console.log("scuess");
			$(".error_code1").hide().find(".error_msg1_tips").text("");
			$("*").removeClass("error");
			var Ele = $(this);
			sendMessage(Ele);
		}
	
		//发送消息函数
		function sendMessage(Ele) {　
			curCount = count; //设置button效果，开始计时
			Ele.attr("disabled", "true");
			Ele.val(curCount + "秒").addClass('active');
			InterValObj = window.setInterval(function() {
				SetRemainTime(Ele);
			}, 1000);
		}
		
		//timer处理函数
		function SetRemainTime(Ele) {
			//console.log(Ele);
			if(curCount == 0) {
				window.clearInterval(InterValObj); //停止计时器
				Ele.removeAttr("disabled"); //启用按钮
				Ele.val("重新获取").removeClass('active');
			} else {
				curCount--;
				Ele.val(curCount + "秒").addClass('active');
			}
		}
	})
})

//定义高度获取方法
function getHeight() {
	var winH = $(window).height();
	$(".setBody").height(winH);
}