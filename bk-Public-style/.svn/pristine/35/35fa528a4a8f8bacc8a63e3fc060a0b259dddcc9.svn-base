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
			message("请输入收件人");
		}else if(sendTitle == "" || sendTitle == undefined){
			message("请输入标题");
		}else if(editHtml == "" || editHtml == undefined){
			message("请输入内容");
		}else{
			console.log(msgType1);
			$.ajax({
				type:'POST',
				dataType:'json',
				data:{'touser':sendEmail,'title':sendTitle,'content':editHtml,'type':msgType1},
				url:'/CrmSend/add_mail',
				success:function(res){
					if(res.code==1){
						success('发送成功');
						chongzhi();		
					}else{
						message(res.message);
					}
				}
			})
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

	//重置表单值
	function chongzhi(){ 
		$("input[type='email']").val("");
		$("input[type='text']").val("");
		$("input[type='checkbox']").prop("checked",false);
		$("#editor").find("#ueditor_0").contents().find("body").empty();
		$("#edui1_iframeholder").css("height","500px");
	}
})

//定义高度获取方法
function getHeight(){
	var winH = $(window).height();//浏览器高度
	$(".left_template,.right_template").height(winH);
}