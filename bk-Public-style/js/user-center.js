$(function(){

	if(vtel){
		$('.personalInformation_right .tel').css({'background':'#fff','cursor':'default'});
	}
	if(vemail){
		$('.personalInformation_right .email').css({'background':'#fff','cursor':'default'});
		$('.email').unbind();	
	}
	//点击进行头像上传
	$(document).on('click','.headImg',function(){
		location.href=destoon+'member/avatar.php';				
	});
	//点击进行手机认证
	$(document).on('click','.tel',function(){
		if(vtel){//如果tel=true表示手机已经认证了，不需要点击跳转到手机认证页面
			$('.tel').unbind();
		}else{
			location.href=destoon+'member/validate.php?action=mobile'	
		}			
	});
	//点击进行邮箱认证
	$(document).on('click','.email',function(){
		if(vemail){//如果tel=true表示邮箱已经认证了，不需要点击跳转到邮箱认证页面
			$('.email').unbind();
		}else{
			location.href=destoon+'member/validate.php?action=email'
		}					
	});
	var refer=document.referrer;
	var time=window.name==""?1:0;


    if(time){
    	if(refer.indexOf("Login/login") >= 0){
			if(status == 3){
				//会员认证
				huiyuan($('.submenu_huiy'));
			}else if(status == 1){
				gaikuang();
			}else if(status == 2){
				hangy($('.submenu_hangy'));
			}
			
		}else{
			$('.submenu_yongh').find('span').css({'background':'url('+urlPath+'/Images/icon1_1.png) no-repeat'});//默认选择用户概况
			gaikuang();
		}
		
    }else{
    	$('.submenu_yongh').find('span').css({'background':'url('+urlPath+'/Images/icon1_1.png) no-repeat'});//默认选择用户概况
			gaikuang();
    }
	window.name=2;
	$(document).on('click','#clear_name',function(){
		window.name="";
	});
		//绑定微信
	if(type=='banding'&&action=='cg'){
		huiyuan($('.submenu_huiy'));
	}else if(type=='banding'&&action=='yi'){
		huiyuan($('.submenu_huiy'));
		alert('此微信已有账号');
	}else if(type=='banding'&&action=='error'){
		huiyuan($('.submenu_huiy'));
		alert('系统繁忙，请稍后再试');
	}
	
	// $('.submenu_yongh').find('span').css({'background':'url('+urlPath+'/Images/icon1_1.png) no-repeat'});//默认选择用户概况
	
	$(document).on('click','.submenu_yongh',function(){//点击用户概况
		$('#tobuy_nav').find('i').html($(this).find('i').html());
		delStyle();
		$(this).addClass('blue');
		$(this).find('span').css({'background':'url('+urlPath+'/Images/icon1_1.png) no-repeat'});
		gaikuang();
	});
	
	$(document).on('click','.submenu_huiy',function(){//点击会员认证
		huiyuan($(this));
	});
	
	$(document).on('click','.submenu_hangy',function(){
	//点击行业管理
		hangy($(this));
	});


	//行业管理
	//删除右边列表提示的备注
	$(document).on('click','.ind_colse',function(){
		$('.industryManagement_right_prompt').remove();
	});
	//行业管理
	//点击新增
	$(document).on('click','.indAdd',function(){
		$('.tips_hygl').show();//弹出模态框
		//$('.tips_box_title').html('新增行业');//改变模态框的标题
	});

	//行业管理
	//关闭弹出的新增或者编辑模态框
	$(document).on('click','.tips_box_close',function(){
		$('.tips_hygl').hide();//关闭新增模态框
		$('.tips_hygl_edit').hide().remove();//关闭编辑模态框
	})
	//行业管理
	//删除当前的tr
	$(document).on('click','.delete',function(){
        $lx=$(this).next('input').val();
        $hy_id=$(this).attr('name');
        $this=$(this);
        $.ajax({
			type: 'GET',
			data:{
				'lx'    :$lx,
				'hy_id' :$hy_id,
			},
			url: hy_del,
			dataType: 'json',
			success: function(data) {
				if(data.code=='1'){
					$('#success').html(data.message)
			    	$('.success_tips').show();
                    $('.tips_hygl').hide();
                    $(".submenu_hangy").trigger("click");
				}else{
					$('#message').html(data.message);
			    	$('.fail_tips').show();
			    	$('.not_hy').remove();
					$('.tips_hygl').hide();
				}
				selfClose();
			},
			error: function(xhr, type) {
				
			}
		});
		
	});

	//点击新增提交按钮
	$(document).on('click','.indSubmit',function(){
		var mydate = new Date();
		var indTime = mydate.getFullYear() + "-" + (mydate.getMonth() + 1) + "-" + mydate.getDate();//获取提交的时间
		var indSelectText = $('.indSelect').find("option:selected").text();//获取选择的行业值
		var hy_id=$('.indSelect').find("option:selected").val();
		var indKeywords = $('.indKeywords').val();//获取关键词的值
		var indType=$('input:radio[name="radio"]:checked').val();//获取推送类型的值
		if(indType==1){
		  var type="接收供应信息";
		}else{
		  var type="接收求购信息";
		}
		//console.log(indTime,indSelectText,hy_id,indKeywords,indType);
		if(indKeywords==''){//判断输入的关键词是否为空
			$('.indKeywords').css({'border':'1px solid red'});
			$('.tips_keyWords p').html('*关键字不能为空！');
			return false;
		}else{
			$('.indKeywords').css({'border':'1px solid #999'})
			$('.tips_keyWords p').html('');
		}

		$.ajax({
			type: 'POST',
			url: add_hy,
			data:{
               'hy_id'        : hy_id,
               'hy_lx'        : indType,
               'keywords'     : indKeywords,
			},
			dataType: 'json',
			success: function(data) {
			    if(data.code==1){
			    	$('#success').html(data.message)
			    	$('.success_tips').show();
                    $('.tips_hygl').hide();
                    $(".submenu_hangy").trigger("click");
			    }else{
			    	$('#message').html(data.message);
			    	$('.fail_tips').show();
			    	$('.not_hy').remove();
					$('.tips_hygl').hide();
			    }
				selfClose();
			},
			error: function(xhr, type) {
				
			}
		});		

	});

	//行业管理
	//点击编辑
	$(document).on('click','.edit',function(){
		var $lx=$(this).next('input').val();
        var $hy_id=$(this).attr('name');
        $.ajax({
			type: 'GET',
			data:{
				'lx'    :$lx,
				'hy_id' :$hy_id,
			},
			url: hangyue_edit,
			dataType: 'json',
			success: function(data) {
				if(data.hy_id){
					var result = '<section class="tips_hygl_edit" style="display:block;">'
					+'<div class="tips_mask_hygl_edit"></div>'
					+'<div class="tips_box_hygl_edit">'
					+'<article class="tips_box_top"><div class="tips_box_title">编辑行业</div><div class="tips_box_close">X</div></article>'
					+'<article class="tips_selectIndustry">'
					+'<div>选择行业</div>'
					+'<select class="indSelect">';
					var op_html='';
					for (var i = 0; i < data.hy.length; i++) {
						if(data.hy[i].m_trade_id==data.hy_id){
							op_html+='<option selected="selected" value ="'+data.hy[i].m_trade_id+'">'+data.hy[i].m_trade_name+'</option>';
						}else{
							op_html+='<option value ="'+data.hy[i].m_trade_id+'">'+data.hy[i].m_trade_name+'</option>';
						}
					}

					result+=op_html;
					result+='</select></article>'
							+'<article class="tips_keyWords">'
							+'<div>设置关键词</div>'
							+'<textarea id="editKeyword" class="indKeywords" rows="3" cols="20" value="">'
							+data.t_keywords_name
							+'</textarea>'
							+'<p></p>'
							+'</article>'
							+'<article class="tips_indType">'
							+'<div>接收推送类型</div>';
					if(data.lx==0){
						result+='<input name="radio" type="radio" checked="true" value="0"/>接收求购信息'
							    +'<input name="radio" type="radio"  value="1"/>接收产品信息';
					}else{
						result+='<input name="radio" type="radio" value="0"/>接收求购信息'
							    +'<input name="radio" type="radio" checked="true"   value="1"/>接收产品信息';
					}
							
						result+='</article>'
							+'<article class="editSubmit">提交</article>'
							+'<input type="hidden" id="old_hy_id" name="old_hy_id" value="'+data.hy_id+'">'
							+'<input type="hidden" id="old_lx" name="old_lx" value="'+data.lx+'">'
							+'<input type="hidden" id="trade_mapping_id" name="trade_mapping_id" value="'+data.trade_mapping_id+'">'
							+'</div>'
							+'</section>';
					$('body').append(result);
				}
			},
			error: function(xhr, type) {
				
			}
		});
		
		
	});

	//行业管理
	//点击编辑提交按钮
	$(document).on('click','.editSubmit',function(){
		var indKeywords =  $(this).parent().find('#editKeyword').val();
		var indSelectText = $(this).parent().find('.indSelect>option:selected').text();//获取选择的行业值
		var hy_id=$(this).parent().find('.indSelect>option:selected').val();
		var indType=$(this).parent().find('input:radio[name="radio"]:checked').val();//获取推送类型的值
		var old_lx=$(this).parent().find('#old_lx').val();
		var old_hy_id=$(this).parent().find('#old_hy_id').val();
		var trade_mapping_id=$(this).parent().find('#trade_mapping_id').val();

		if(indKeywords==''){//判断输入的关键词是否为空
			$('.indKeywords').css({'border':'1px solid red'});
			$('.tips_keyWords p').html('*关键字不能为空！');
			return false;
		}else{
			$('.indKeywords').css({'border':'1px solid #999'})
			$('.tips_keyWords p').html('');
		}

		$.ajax({
			type: 'POST',
			url: hy_edit_ok,
			data:{
               'hy_id'               : hy_id,
               'hy_lx'        		 : indType,
               'keywords'     		 : indKeywords,
               'old_lx'      		 : old_lx,
               'old_hy_id'    		 : old_hy_id,
               'trade_mapping_id'    : trade_mapping_id,
			},
			dataType: 'json',
			success: function(data) {
					
				if(data.code==1){
					$('#success').html(data.message);
					$('.success_tips').show();
					$('.tips_hygl').hide();
					$(".submenu_hangy").trigger("click");
				}else{
					$('#message').html(data.message);
					$('.fail_tips').show();
					$('.tips_hygl').hide();
				}
				selfClose();
			},
			error: function(xhr, type) {
				
			}
		});	

		$('.tips_hygl_edit').hide().remove();
	})
	//行业管理
	//获取到输入关键词时执行事件
	$(document).on('keydown','.indKeywords',function(){
		$('.indKeywords').css({'border':'1px solid #999'});
		$('.tips_keyWords p').html('');
	});

	$(document).on('click','.submenu_tuis',function(){
	//点击推送设置
		$('#tobuy_nav').find('i').html($(this).find('i').html());
		delStyle();
		$(this).addClass('blue');
		$(this).find('span').css({'background':'url('+urlPath+'/Images/icon4_1.png) no-repeat'});
		$.ajax({
			type: 'GET',
			url: charge_wx_em,
			dataType: 'json',
			success: function(data) {
			
			$weixin = data.wx;
			$email = data.email;
			if(data.email==0){
				$('.ck_email').prop('checked','checked');
			}
			if(data.wx==0){
				$('.ck_weixin').prop('checked','checked');
			}
		    var ts_html='<article class="tobuy_info_right"><div class="tsTime">'
			+'<p class="tsWay_tile">接收推送时间</p><input class="ts" name="radio" type="radio" value="0" /><span>每天上午10点准时推送</span></br>'
			+'<input class="nots" name="radio" type="radio" value="1" /><span>不推送</span></div>'
			+'<div class="tsWay"><p class="tsWay_tile">接收推送方式</p><input class="ck_weixin" name="checkbox1" type="checkbox"  /><span>微信推送</span></br>'
			+'<input class="ck_email" name="checkbox2" type="checkbox"  /><span>邮件推送</span></div><div class="ts_btn">确定</div><input type="hidden" value="'+data.wx+'" id="wx" /><input type="hidden" value="'+data.email+'" id="email_chack" /></article></article>'
		    $('.rightTemlate').html(ts_html);
			    if(data.old_weixin==1){
			    	var $old_weixin = true;//微信后台传值
			    }else{
			    	var $old_weixin = false;//微信后台传值
			    }
			    if(data.old_mail==1){
			    	var $old_mail = true;//邮箱后台传值	
			    }else{
			    	var $old_mail = false;//邮箱后台传值	
			    }
		    	

				if($old_weixin){//根据后台传值设置微信
					$('.ck_weixin').prop('checked','checked');
					$('.ts').prop('checked','checked');
				}
				if($old_mail){//根据后台传值设置邮箱
					$('.ck_email').prop('checked','checked');
					$('.ts').prop('checked','checked');
				}
				if($old_mail===false&&$old_weixin === false){
					$('.nots').prop('checked','checked');
				}
			
			},
			error: function(xhr, type) {
				
			}
		});
		//推送设置//
		//如果推送方式有一个是勾选的就把推送时间改为10点推送
		$(document).on('click','.ck_email,.ck_weixin',function(){
			var $wxState = $('.ck_weixin:checked').val();
			var $yxState = $('.ck_email:checked').val();
			
			if($wxState == undefined && $yxState == undefined){
				$('.nots').prop('checked','checked');
			}else{
				$('.ts').prop('checked','checked');
			}
		});
	});
	//推送设置//
	//通点击不推送则把下面的推送方式清掉。点击10点推送不关联下面的推送方式
	$(document).on('click','.nots',function(){
		$('.ck_weixin').removeProp('checked');
		$('.ck_email').removeProp('checked');
	});
	//推送设置//
	//设置推送时间
	$(document).on('click','input:radio[name="radio"]',function(){
		console.log($(this).val());
	});
	
	//推送设置//
	//通过点击微信接收方式判断是有推送还是没推送
	$(document).on('click','.ck_weixin',function(){
		if($weixin==0){//判断是否已经设置
			if($('.ck_weixin:checked').val()=='on'){//判断勾选才弹出模态框
				$('.tips').show();
				$('.tips_boxs_weixin').show().siblings().hide();
			}
		}else{
			$('.ts').prop('checked','checked');
		}
	});
	//推送设置//
	//点击微信弹出的模态框“确认”按钮
	$(document).on('click','.weixin_btn',function(){
		fnBtn();
		$('.ck_weixin').prop('checked','checked');
		$('.tips').hide();
		console.log('微信推送方式发起Ajax保存数据！')
	})
	//推送设置//
	//关闭微信弹出的模态框
	$(document).on('click','.weixin_close',function(){
		fnClose();
		$('.ck_weixin').removeProp('checked');
	});
	//推送设置//
	//通过点击邮箱接收方式判断是有推送还是没推送
	$(document).on('click','.ck_email',function(){
		if($email==0){//判断是否已经设置
			if($('.ck_email:checked').val()=='on'){//判断勾选才弹出模态框
				$('.tips').show();
				$('.tips_boxs_email').show().siblings().hide();
			}
		}else{
			$('.ts').prop('checked','checked');
		}
	});
	//推送设置//
	//点击邮箱弹出的模态框“确认”按钮
	$(document).on('click','.email_btn',function(){
		var $email = $('#email').val();
		if(!isEmail($email)){
			$('.email_p').show();
		}else{
			

		    $.ajax({
					type: 'GET',
					data:{
						'email'    :$email,
					},
					url: set_email,
					dataType: 'json',
					success: function(data) {
						console.log(data);
						if(data.code!=1){
						    $('.email_p').html(data.message);
						    $('.email_p').show();

						}else{
						    $('.email_p').hide();
						    fnBtn();
						    $('.ck_email').prop('checked','checked');
							$('.tips').hide();
						}
						
					},
					error: function(xhr, type) {
						
					}
		    });		
		}
	})
	//推送设置//
	//关闭邮箱弹出的模态框
	$(document).on('click','.email_close',function(){
		var $wxState = $('.ck_weixin:checked').val();
		fnClose();
		if($wxState != 'on'){
			$('.nots').prop('checked','checked');
		}
		$('.ck_email').removeProp('checked');
	});
	//推送设置//
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
	//推送设置//
	//封装微信和邮箱点击'确认'关闭模态框和关联的推送时间、推送方式
	function fnBtn(){
		var $wxState = $('.ck_weixin:checked').val();
		var $yxState = $('.ck_email:checked').val();
		console.log($wxState,$yxState);
		if($wxState == 'on'||$yxState == 'on'){
			$('.ts').prop('checked','checked');
		}else{
			$('.nots').prop('checked','checked');
		}
		$('.tips').fadeOut();
	}
	//推送设置//
	//邮箱验证
	function isEmail(str){ 
		var reg =  /^\w+([-+.]\w+)*@\w+([-.]\w+)*\.\w+([-.]\w+)*$/; 
		return reg.test(str); 
	} 
    //推送设置-------
    $(document).on('click','.ts_btn',function(){
       var val_payPlatform = $('input[name="radio"]:checked').val();
       var wxstate = $('.ck_weixin').is(':checked');
	   var emstate = $('.ck_email').is(':checked');
	   var result = val_payPlatform + ',' + wxstate + ',' + emstate;
       $.ajax({
       	type:'POST',
       	data:{
       		'result': result,
       	},
       	url:ts_shezhi_ajax,
       	dataType:"json",
       	success:function(data){
       		if(data.code==1){
       		    $('#success').html(data.message);
            	$('.success_tips').show();
       		}else{
                $('#message').html(data.message);
			    $('.fail_tips').show();
       		}
			selfClose();
       	}
       });
		
	});
	//推送设置-------end
	$(document).on('click','.submenu_gyInfo',function(){
	//点击供应信息
	/*	$('#tobuy_nav').find('i').html($(this).find('i').html());
		delStyle();
		$(this).addClass('blue');
		$(this).find('span').css({'background':'url('+urlPath+'/Images/icon5_1.png) no-repeat'});
		$('.rightTemlate').html('<article class="supply_info_right">'
			+'<div class="supply_info_prompt">发布产品供应信息，页面将跳转雀搜网</div>'
			+'<div class="supply_info_btn">进入</div></article>');*/
		location.href=destoon+'member/my.php?mid=5&action=add';	
	});
	
	$(document).on('click','.submenu_gyList',function(){
	//点击供应列表
	/*	$('#tobuy_nav').find('i').html($(this).find('i').html());
		delStyle();
		$(this).addClass('blue');
		$(this).find('span').css({'background':'url('+urlPath+'/Images/icon6_1.png) no-repeat'});
		$('.rightTemlate').html('<article class="supply_list_right">'
			+'<div class="supply_list_prompt">将跳转雀搜网查看历史产品推送信息</div>'
			+'<div class="supply_list_btn">进入</div></article>');*/
		location.href=destoon+'member/my.php?mid=5';	
	});
	
	$(document).on('click','.submenu_cgInfo',function(){
	//点击发布采购
		/*$('#tobuy_nav').find('i').html($(this).find('i').html());
		delStyle();
		$(this).addClass('blue');
		$(this).find('span').css({'background':'url('+urlPath+'/Images/icon7_1.png) no-repeat'});
		$('.rightTemlate').html('<article class="tobuy_info_right">'
			+'<div class="tobuy_info_prompt">发布产品求购信息，页面将跳转雀搜网</div>'
			+'<div class="tobuy_info_btn">进入</div></article>');*/
	    location.href=destoon+'member/my.php?mid=6&action=add';
	});
	
	$(document).on('click','.submenu_cgList',function(){
	//点击采购列表
/*		$('#tobuy_nav').find('i').html($(this).find('i').html());
		delStyle();
		$(this).addClass('blue');
		$(this).find('span').css({'background':'url('+urlPath+'/Images/icon8_1.png) no-repeat'});
		$('.rightTemlate').html('<article class="tobuy_list_right">'
			+'<div class="tobuy_list_prompt">将跳转雀搜网查看历史求购信息</div>'
			+'<div class="tobuy_list_btn">进入</div></article>');*/
	    location.href=destoon+'member/my.php?mid=6';		
	});
	
	//采购列表点击跳转
	$(document).on('click','.tobuy_list_btn',function(){
		location.href=destoon+'member/my.php?mid=6';
	});
	
	//发布采购点击跳转
	$(document).on('click','.tobuy_info_btn',function(){
		location.href=destoon+'member/my.php?mid=6&action=add';
	});
	
	//供应列表点击跳转
	$(document).on('click','.supply_list_btn',function(){
		location.href=destoon+'member/my.php?mid=5';
	});
	
	//发布供应点击跳转
	$(document).on('click','.supply_info_btn',function(){
		location.href=destoon+'member/my.php?mid=5&action=add';
	});
	
	//用户概况
	//推送设置//
	//先判断微信和邮箱是否已经关联，如果没有关联，点击会弹出关联模板
	// var $weixin = false;//微信后台传值
	// var $email = false;//邮箱后台传值
	
	// var time = 1;//推送时间后台传值,0表示10点推送，1表示不推送
	// $('.tsTime input').eq(time).prop('checked','checked');//根据后台传值设置接收推送时间
	// if(time==0){//如果推送时间选择为每天上午10点推送才判断微信和邮箱是否选择，否则不判断
	// 	if($weixin){//根据后台传值设置微信
	// 		$('.ck_weixin').prop('checked','checked');
	// 	}
	// 	if($email){//根据后台传值设置邮箱
	// 		$('.ck_email').prop('checked','checked');
	// 	}
	// }
	
	
	//编辑时改变选择行业
	//$(document).on('change','.indSelect',function(){
	//	$(this).find('option').removeAttr('selected');
	//});
	//关闭成功或者失败弹窗
	$('.success_tips,.fail_tips').on('click',function(){
		$('.success_tips').hide();
		$('.fail_tips').hide();
	});
	$('.success_box,.fail_box').on('click',function(e){
		e.stopPropagation();
	});
	//自动关闭成功或者失败的弹窗
	function selfClose(){
		var timer1 = setInterval(function(){
			clearInterval(timer1);
			$('.success_tips').fadeOut();
			$('.fail_tips').fadeOut();
		},2000);
	}
	
	//清除样式
	function delStyle(){
		$('#userList_ul').find('.blue').removeClass('blue');
		$('#userList_ul').find('span').css('background','');
	}
	//用户概况右边页面
	function gaikuang(){

		$.ajax({
			type: 'GET',
			url: gaikuang_url,
			dataType: 'json',
			success: function(data) {
				$('.rightTemlate').html('<article class="memberOverview_right"><div class="memberOverview_right_prompt"></div>'
					+'<div class="hy_rz"><div class="indCertified">已认证行业</div><table class="indCertified_table" border="0" cellspacing="0" cellpadding="0">'
					+'<thead><tr><th>行业</th><th>关键词</th><th>推送</th></tr></thead><tfoot class="tfoot"></tfoot></table></div>'
					+'<div class="loginRecord">登录记录</div><div class="passwordHint">如确定非您本人登录，建议您<a href="'+destoon+'member/edit.php">立即修改密码</a></div>'
					+'<table class="loginRecord_table" border="0" cellspacing="0" cellpadding="0"><thead>'
					+'<tr><th>登录时间</th><th>登录IP</th><th>参考地点</th></tr></thead><tfoot class="tfoot"></tfoot></table></article>');
				//判断是否未已认证的会员
				//console.log(data);
				if(data.rz.code==1){
					$('.memberOverview_right_prompt').html(data.rz.message);
				}else if(data.rz.code==2){
                    $('.memberOverview_right_prompt').html(data.rz.message);
				}else{
					$('.memberOverview_right_prompt').html(data.rz.message);
				}
				
				var resultInd = '';
				var resultTime = '';
				
				if(data.hy.code==0){
                   $('.hy_rz').remove();
				}else{

					for(var i = 0; i < data.hy.data.length; i++) {
						if(data.hy.data[i].t_trade_mapping_type==0){
							var type='接收求购推送';
						}else{
							var type='接收产品推送';
						}
					    resultInd += '<tr><td>'+data.hy.data[i].m_trade_name +'</td><td>'+data.hy.data[i].t_keywords_name +'</td><td>'+type+'</td></tr>';
				    }

				    $('.indCertified_table .tfoot').html(resultInd);
				}
				


				for(var i = 0; i < data.loginTime.length; i++) {
					resultTime += '<tr><td>'+data.loginTime[i].time +'</td><td>'+data.loginTime[i].IP +'</td><td>'+data.loginTime[i].adress +'</td></tr>';
				}
				
				$('.loginRecord_table .tfoot').html(resultTime);
			},
			error: function(xhr, type) {
				
			}
		});
	}
	//行业管理
	function hangy(obj){
		$('#tobuy_nav').find('i').html(obj.find('i').html());
		delStyle();
		obj.addClass('blue');
		obj.find('span').css({'background':'url('+urlPath+'/Images/icon3_1.png) no-repeat'});
		
		$.ajax({
			type: 'GET',
			url: get_user_hy,
			dataType: 'json',
			success: function(data) {
				var data_len=data.length-1;
				$('.rightTemlate').html('<article class="industryManagement_right">'
					+'<div class="industryManagement_right_prompt">备注：设定关键词可精准推送行业信息。<br>求购：最多设置'+data[data_len].qg.hy_count+'个行业，每个行业最多设置'+data[data_len].qg.keywords+'个关键词；供应：最多设置'+data[data_len].gy.hy_count+'个行业，每个行业最多设置'+data[data_len].gy.keywords+'个关键词。<span class="ind_colse">X</span></div>'
					+'<table class="industryManagement_table" border="0" cellspacing="0" cellpadding="0">'
					+'<thead><tr><th class="creationTime">创建时间</th><th class="industryName">行业名称</th>'
					+'<th class="keywords">关键词</th><th class="pushType">接收推送类型</th>'
					+'<th class="state">状态</th><th class="operation">操作</th></tr></thead><tfoot class="tfoot"></tfoot></table>'
					+'<div class="indAdd">新增</div></article>');

				if(data[0].code==0){
					var not = '<div class="not_hy" style="text-align:center;font-size:18px;">暂未设置行业</div>';
					$('.industryManagement_table').after(not);
				}else{
					var result = '';
					for(var i = 0; i < data_len; i++) {
					result += '<tr><td>'+data[i].t_trade_mapping_createtime +'</td><td>'+data[i]. m_trade_name+'</td><td>'+data[i].t_keywords_name +'</td>'
					+'<td>'+data[i].hy+'</td><td class="orange">'+data[i]. status+'</td><td><span name="'+data[i].t_trade_mapping_m_trade_id+'" class="edit">编辑 </span><input type="hidden"  value="'+data[i].t_trade_mapping_care_type+'"><span class="delete" name="'+data[i].t_trade_mapping_m_trade_id+'">移除</span><input type="hidden" value="'+data[i].t_trade_mapping_care_type+'"></td></tr>';
					}
					$('.industryManagement_table .tfoot').html(result);
				}
				
			},
			error: function(xhr, type) {
				
			}
		});
	}
	//会员认证
	function huiyuan(obj){
		$('#tobuy_nav').find('i').html(obj.find('i').html());
		delStyle();
		obj.addClass('blue');
		obj.find('span').css({'background':'url('+urlPath+'/Images/icon2_1.png) no-repeat'});
		$.ajax({
			type: 'GET',
			url: get_rz_url,
			dataType: 'json',
			success: function(data) {
				
				var result = '<article class="user-vip-msg"><div class="user-vip-title"><span style="position: relative;left: 20px;">会员基本信息</span></div><div class="user-vip-details">'
				
				if(data.truename != ''){
					result += '<div><span class="user-vip-right">姓名</span><span class="ziti2">'+data.truename+'</span></div>';
				}
				if(data.gender != ''){
					result += '<div><span class="user-vip-right">性别</span><span class="ziti2">'+data.gender+'</span></div>';
				}
				if(data.email != ''){
					result += '<div><span class="user-vip-right">联系邮箱</span><span class="ziti">'+data.email+'</span></div>';
				}
				if(data.telephone != ''){
					result += '<div><span class="user-vip-right">联系电话</span><span class="ziti2">'+data.telephone+'</span></div>';
				}
				if(data.mobile != ''){
					result += '<div><span class="user-vip-right">联系手机</span><span class="ziti2">'+data.mobile+'</span></div>';
				}
				if(data.wx =='0'){
				result += '<div><span class="user-vip-right">三方账户</span><span class="ziti2 orange">您可以通过绑定的微信账号直接登录雀搜</span>'
					+'<div class="New-LayOut"><a href="#"><img src="'+urlPath+'/Images/weixin-sl.png" alt=""><span class="bind-Text bind-wx">绑定微信</span></a></div></div>';
				}else{
				result += '<div><span class="user-vip-right">三方账户</span><span class="ziti2 orange"><img src="'+urlPath+'/Images/weixin-sl.png" alt=""><span class="bind-Text">已绑定微信</span></span></div>';
				}
				if(data.company != ''){
					result += '<div><span class="user-vip-right">公司名称</span><span class="ziti2">'+data.company+'</span></div>';
				}
				if(data.business_licence != ''){
					result += '<div style="height: 120px;"><span class="user-vip-right" style="position:relative;top:-60px;vertical-align: middle;">营业执照</span><span class="ziti2 lincense"><img style="width:130px;position:relative;top:5px;" src="'+data.business_licence+'"></span></div>';
				}
				if(data.validated == '1'){
					result += '<div><span class="user-vip-right">会员认证状态</span><span class="ziti2">已认证</span></div>';
				}else{
					result += '<div><span class="user-vip-right">会员认证状态</span><span class="ziti2">未认证</span></div>';
				}
				result += '<div class="Set-vipMsg"><a href="'+destoon+'member/edit.php" class="btn_xiugai">修改资料</a></div></article></div>';
				
				$('.rightTemlate').html(result);
/*				//判断是否已经绑定了微信
				var hyState = true;
				if(hyState){
					$(".bind-Text").html("已绑定").parent().removeAttr('href');
				}*/				
			},
			error: function(xhr, type) {
				
			}
		});
	}
})
