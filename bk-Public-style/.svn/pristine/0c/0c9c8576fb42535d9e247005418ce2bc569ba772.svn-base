$(function(){
	//为登录按钮绑定单击事件并验证用户输入的信息
		var count = 0;
	$("#submit").on('click',function(){
		var username = $("input[name='user_zh']").val();
		var userpwd = $("input[name='user_pwd']").val();
		var useryzm = $("input[name='user_yzm']").val();
		var jl 		= $("input:checkbox:checked").val();
		if(username == ""){
			$(".err-tip").html("请输入您的用户名");
			return;
		}else if(userpwd == ""){
			$(".err-tip").html("请输入您的密码");
			return;
		}else if(count >= 3){
			if(useryzm == ''){
				$(".err-tip").html("请输入验证码");
				return;
			};
		}
            var data={"username":username,"password":userpwd,"useryzm":useryzm,'count':count,'jl':jl};
			$.ajax({
				type: 'POST',
				data:data,
				dataType:"Json",
				url: url, //此处需传page&size到后台
				success: function(data) { 
                    console.log(data);
                    if(data.code==0){
                    	count++;
                    	console.log(count);
                    	if(count>=3){
							$(".checkSubmit").show();
						}
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
		
	});
	$('.login-white').keypress(function(event){//按下回车建  
	    var keycode = (event.keyCode ? event.keyCode : event.which);  
	    if(keycode == '13'){  
	        var username = $("input[name='user_zh']").val();
			var userpwd = $("input[name='user_pwd']").val();
			var useryzm = $("input[name='user_yzm']").val();
			var jl 		= $("input:checkbox:checked").val();
			if(username == ""){
				$(".err-tip").html("请输入您的用户名");
				return;
			}else if(userpwd == ""){
				$(".err-tip").html("请输入您的密码");
				return;
			}else if(count >= 3){
				if(useryzm == ''){
					$(".err-tip").html("请输入验证码");
					return;
				}
			}
				var data={"username":username,"password":userpwd,"useryzm":useryzm,'count':count,'jl':jl};
				$.ajax({
					type: 'POST',
					data:data,
					dataType:"json",
					url: url, //此处需传page&size到后台
					success: function(data) { 
						console.log(data);
						if(data.code==0){
							count++;
	                    	console.log(count);
	                    	if(count>=3){
								$(".checkSubmit").show();
							}
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
	});
});