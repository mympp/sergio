$(function(){
	getHeight(); //动态设置高度
	
	$(window).resize(function() {
		getHeight();
	})
	
	//发送信息表单验证
	$(document).on("click",".submit",function(){
		var sendEmail = $("input[name='email']").val();//获得收件人
		var sendTitle = $("input[name='title']").val();//获得标题
		var editHtml = $("#editor").find("#ueditor_0").contents().find("body").html();//获得富文本编辑器的html片段
		var ckEle = $("input[type='checkbox']:checked");
		
		var msgType = "";
		ckEle.each(function(){
			msgType += $(this).val()+",";
		})
		
		var msgType1 = msgType.substring(0,msgType.length-1);//获取消息类型

		if(sendEmail == "" || sendEmail == undefined){
			alert("请输入收件人");
		}else if(sendTitle == "" || sendTitle == undefined){
			alert("请输入标题");
		}else if(editHtml == "" || editHtml == undefined){
			alert("请输入内容");
		}else if(msgType1 == "" || msgType1 == undefined){
			alert("请选择消息类型");
		}else{
			alert("信息完善");
			console.log(sendEmail,sendTitle,editHtml,msgType1);//发起ajax
		}
	})
	
	//限制用户发送选项1
	$(document).on("click","input[type='checkbox'][data-type='1']",function(){
		if($(this).is(':checked')) {
			$("input[type='checkbox'][data-type='2']").prop("checked",false);
		}
	})
	
	//限制用户发送选项2
	$(document).on("click","input[type='checkbox'][data-type='2']",function(){
		if($(this).is(':checked')) {
			$("input[type='checkbox'][data-type='1']").prop("checked",false);
		}
	})
})

//定义高度获取方法
function getHeight(){
	var winH = $(window).height();//浏览器高度
	var TopH1 = $(".left_header").height();//页面顶部高度
	var TopH2 = $(".consult-nav").height();//咨询信息导航高度
	var padH = parseInt($(".consult-main").css("padding"))*2;//外层容器上下边距
	var formPd = 30+parseInt($(".consult-form").css("marginTop"));//表单盒子上下内边距+上外边距
	var formH = winH - (TopH1 + TopH2 + padH + formPd);//表单盒子的高度
	$(".left_template,.right_template").height(winH);
	$(".consult-main").height(winH-TopH1-padH);
	$(".consult-form").height(formH);
}