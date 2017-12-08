$(function(){
	//先判断微信和邮箱是否已经关联，如果没有关联，点击会弹出关联模板
	var $weixin = false;//微信后台传值
	var $email = false;//邮箱后台传值
	var time = 1;//推送时间后台传值,0表示10点推送，1表示不推送
	$('.tsTime input').eq(time).prop('checked','checked');//根据后台传值设置接收推送时间
	if(time==0){//如果推送时间选择为每天上午10点推送才判断微信和邮箱是否选择，否则不判断
		if($weixin){//根据后台传值设置微信
			$('.ck_weixin').prop('checked','checked');
		}
		if($email){//根据后台传值设置邮箱
			$('.ck_email').prop('checked','checked');
		}
	}
	
	//通点击不推送则把下面的推送方式清掉。点击10点推送不关联下面的推送方式
	$('.nots').on('click',function(){
		$('.ck_weixin').removeProp('checked');
		$('.ck_email').removeProp('checked');
	});
	
	//如果推送方式有一个是勾选的就把推送时间改为10点推送
	$('input:checkbox[name="checkbox"]').on('click',function(){
		fnBtn();
	})
	
	//通过点击微信接收方式判断是有推送还是没推送
	$('.ck_weixin').on('click',function(){
		if(!$weixin){//判断是否已经设置
			if($('.ck_weixin:checked').val()=='on'){//判断勾选才弹出模态框
				$('.tips').show();
				$('.tips_boxs_weixin').show().siblings().hide();
			}
		}
	});
	
	//点击微信弹出的模态框“确认”按钮
	$('.weixin_btn').on('click',function(){
		fnBtn();
		$('.ck_weixin').prop('checked','checked');
		$('.tips').hide();
		console.log('微信推送方式发起Ajax保存数据！')
	})
	
	//关闭微信弹出的模态框
	$('.weixin_close').on('click',function(){
		fnClose();
		$('.ck_weixin').removeProp('checked');
	});
	
	//通过点击邮箱接收方式判断是有推送还是没推送
	$('.ck_email').on('click',function(){
		if(!$weixin){//判断是否已经设置
			if($('.ck_email:checked').val()=='on'){//判断勾选才弹出模态框
				$('.tips').show();
				$('.tips_boxs_email').show().siblings().hide();
			}
		}
	});
	
	//点击邮箱弹出的模态框“确认”按钮
	$('.email_btn').on('click',function(){
		var $email = $('#email').val();
		if(!isEmail($email)){
			$('.email_p').show();
		}else{
			$('.email_p').hide();
			fnBtn();
			$('.ck_email').prop('checked','checked');
			$('.tips').hide();
			console.log('邮箱方式发起Ajax保存数据！' + $email)
		}
	})
	
	//关闭邮箱弹出的模态框
	$('.email_close').on('click',function(){
		var $wxState = $('.ck_weixin:checked').val();
		fnClose();
		if($wxState != 'on'){
			$('.nots').prop('checked','checked');
		}
		$('.ck_email').removeProp('checked');
	});
	
	//封装微信和邮箱点击'取消'关闭模态框和关联的推送时间、推送方式
	function fnClose(){
		var $wxState = $('.ck_weixin:checked').val();
		var $yxState = $('.ck_email:checked').val();
		if($wxState != 'on'||$yxState == 'on'){
			$('.ts').prop('checked','checked');
		}else{
			$('.nots').prop('checked','checked');
		}
		$('.email_p').hide();
		$('.tips').hide();
	}
	
	//封装微信和邮箱点击'确认'关闭模态框和关联的推送时间、推送方式
	function fnBtn(){
		var $wxState = $('.ck_weixin:checked').val();
		var $yxState = $('.ck_email:checked').val();
		
		if($wxState == 'on'||$yxState == 'on'){
			$('.ts').prop('checked','checked');
		}else{
			$('.nots').prop('checked','checked');
		}
		$('.tips').fadeOut();
	}
	
	//邮箱验证
	function isEmail(str){ 
		var reg =  /^\w+([-+.]\w+)*@\w+([-.]\w+)*\.\w+([-.]\w+)*$/; 
		return reg.test(str); 
	} 
})