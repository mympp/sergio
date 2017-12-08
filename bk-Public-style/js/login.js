$(function(){
	//广告轮播开始
	var timejg=3000;//轮播间隔时间
	var size = $('.box_img ul li').size();
	for(var i=1;i<=size;i++){
		$('.box_tab').append('<a>'+i+'</a>');
	}
	$('.box_img ul li').eq(0).show();
	$('.box_tab a').eq(0).addClass('active')
	$('.box_tab a').mouseover(function(){
		$(this).addClass('active').siblings().removeClass('active');
		var index = $(this).index();
		i=index;
		$('.box_img ul li').eq(index).stop().fadeIn(500).siblings().stop().fadeOut(500);
	});
	var i = 0;
	var time = setInterval(move,timejg);
	function move(){
		i++;
		if(i==size){
			i=0;
		}
		$('.box_tab a').eq(i).addClass('active').siblings().removeClass('active');
		$('.box_img ul li').eq(i).fadeIn(500).siblings().fadeOut(500);
	}
	$('.box').hover(function(){
		clearInterval(time);
	},function(){
		time = setInterval(move,timejg);
	});
	//广告轮播结束
	
	//为登录按钮绑定单击事件并验证用户输入的信息
	$("input[name='login_btn']").on('click',function(){
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
            var data={"username":username,"password":userpwd,"useryzm":useryzm};
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
	});
	$('.Login-Box').keypress(function(event){//按下回车建  
	    var keycode = (event.keyCode ? event.keyCode : event.which);  
	    if(keycode == '13'){  
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
				var data={"username":username,"password":userpwd,"useryzm":useryzm};
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
	    }  
	});
});