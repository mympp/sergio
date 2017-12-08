$(function(){
	//为关联按钮绑定单击事件并验证用户输入的信息
	$("input[name='login_btn_wx']").on('click',function(){
		var username = $("input[name='user_zh']").val();
		var userpwd = $("input[name='user_pwd']").val();
		var useryzm = $("input[name='user_yzm']").val();
		if(username == ""){
			$(".err-tip").html("请输入您的用户名");
		}else if(userpwd == ""){
			$(".err-tip").html("请输入您的密码");
		}else if(useryzm == ""){
			$(".err-tip").html("请输入验证码");
		}else{
            var data={"username":username,"password":userpwd,"useryzm":useryzm,"bind":"wx"};
			$.ajax({
				type: 'POST',
				data:data,
				dataType:"json",
				url: url, //此处需传page&size到后台
				success: function(data) { 
                    console.log(data);
                    if(data.code==0){
                       var newimg=$(".yzm-weizhi").attr("src")+"?"+Math.random();
            		   $(".yzm-weizhi").attr("src",newimg);
                       $(".err-tip").html(data.message);
                    }
                    if(data.code==1){
                       $(".err-tip").html("");
                       location.href=index_url;
                    }
				},
			});
		}
	})
})