$(function(){
	//发送信息表单验证
	$(document).on("click",".submit",function(){
		var sendEmail = $("input[name='email']").val();//获得收件人
		var sendTitle = $("input[name='title']").val();//获得标题
		var editHtml = $("#Baidu_editor").contents().find("#ueditor_0").contents().find("body>p").text();//获得富文本编辑器的文本值(元素可变动)
		var msgType = $("input[type='checkbox'][data-type='1']:checked").val();//获取消息类型  1为不发送，保存为草稿  2为保存到已发送  3为已读回执
		if(sendEmail == "" || sendEmail == undefined){
			alert("请输入收件人");
		}else if(sendTitle == "" || sendTitle == undefined){
			alert("请输入标题");
		}else if(editHtml == "" || editHtml == undefined){
			alert("请输入内容");
		}else if(msgType == "" || msgType == undefined){
			alert("请选择消息类型");
		}else{
			alert("信息完善");
			console.log(sendEmail,sendTitle,editHtml,msgType);//发起ajax
		}
	})
	
	//限制用户发送选项
	$(document).on("click",".Three-cells_1 label input",function(){
		var ckleng = $("input[type='checkbox'][data-type='1']:checked").length;
		if( ckleng > 0 || ckleng == 1){
			$(this).prop("checked",true).parent().siblings().find("input").prop("checked",false);
			//console.log("选中1个");
		}
	})
})