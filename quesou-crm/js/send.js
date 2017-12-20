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
	$(".left_template,.right_template").height(winH);
}