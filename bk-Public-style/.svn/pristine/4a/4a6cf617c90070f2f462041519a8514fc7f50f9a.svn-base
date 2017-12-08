$(function(){
	PayCRM();
	//为左侧导航li绑定单击事件
	//微信支付或支付宝支付状态
	//true为选中,false为不选中
	$('.login_out1').siblings().attr('href','/Login/logout');
	var weixin = true;
	var zhifubao = false;
	
	var explorer =navigator.userAgent ;
	//判断浏览器内核兼容火狐浏览器
	//修复一系列火狐浏览器bug
	if (explorer.indexOf("Firefox") >= 0) {
		$(".IndexCenter").css({
			"overflow": "hidden"
		})
		$(".xiansuoli1 a").css({
			"float": "none"
		})
		$(".buy_xiansuoli1 a").css({
			"float": "none"
		})
		$(".user_icon1").css({
			"vertical-align": "top",
			"margin-top": "24"+"px"
		})
		window.onresize = resize;
		function resize()
		{
			setTimeout("location.reload();",100);
		}
		var bw = $("body").width();
		if(bw<1880){
			$("#map").css({
				"margin": "-54px 0 0 -460px"
			})
		}

	}
	
	
	//判断用户名长度超过指定长度超出隐藏
	var aH = $(".right_header>ul>li:eq(1)>a").width();
	if(aH>230){
		$(".right_header>ul>li:eq(1)>a").css({
			"display": "inline-block",
			"width": "230",
			"overflow": "hidden",
			"text-overflow": "ellipsis",
			"white-space": "nowrap"
		})
	}
	//支付成功的状态为true;
	//支付失败的状态为false;
	//无支付状态为null
	var payYesandNo = null;
	$(document).on("click",".userList_li",function() {
		var index = $(this).index();
		if(index==0){
			location.href="/CrmIndex/index";
		}else if(index==1){
			location.href="/CrmSearch/index";
		}else if(index==2){
			location.href="/CrmUser/index";
		}else if(index==3){
			location.href="/CrmContact/index";
		}else if(index==4){
			location.href="/CrmGongHai/index";
		}else if(index==5){
			location.href="/CrmGoods/index";
		}else if(index==7){
			location.href="/CrmSend/index";
		}else if(index==8){
			location.href="/CrmSettings/index";
		}else if(index==9){
			location.href="/CrmGuestbook/index";
		}
	})

    $(document).on("click",".buy_xiansuoli1>a",function(){
		if($(this).text()=="会员认证中"){
			return false;
		}
		$(".pay_model").fadeIn();
		$(".pay01").show();
		$(".pay02").hide();
		$(".pay03").hide();
	})

	//支付付款js开始
	//点击关闭X关闭窗口
	$(document).on("click",".PayTop>i",function(){
		$(".pay_model").hide();
	})
	//购买会员点击下一步开始
	$(document).on("click",".pay-open",function(e){
		e.preventDefault
		if($(".pay-check[type='checkbox']").prop('checked') == true){
			$(".pay01").hide();
			$(".pay02").show();
		}else {
			message("支付需先勾选同意服务条例")
		}
	})
	//服务条例
	$(document).on("click",".QueSever",function(){

		window.open("/Publicity/serve.html")
	})
	//点击选择付款方式上一步返回上一个窗口
	$(document).on("click",".PayUp",function(){
		$(".pay01").show();
		$(".pay02").hide();
		$(".pay03").hide();
	})
	
	//点击付款二维码上一步返回上一个窗口
	$(document).on("click",".PayUp01",function(){
		$(".pay01").hide();
		$(".pay02").show();
		$(".pay03").hide();
	})
	
	//点击勾选框选支付方式事件
	//true为选中,false为不选中
	$(document).on("click",".PayZhifubao>i",function(e){
		e.preventDefault();
		if(zhifubao){
			zhifubao = false;
			weixin = true;
			$(".PayZhifubao>i").css("background-image","url(./Public/Home/1.6/Images/set_icon_xioaxi_nor.png)");
			$(".PayWeixin>i").css("background-image","url(/Public/Home/1.6/Images/set_icon_pay_sel.png)");

		}else {
			zhifubao = true;
			weixin = false;
			$(".PayZhifubao>i").css("background-image","url(/Public/Home/1.6/Images/set_icon_pay_sel.png)");
			$(".PayWeixin>i").css("background-image","url(/Public/Home/1.6/Images/set_icon_xioaxi_nor.png)");
		}
		console.log(weixin);
		console.log(zhifubao);
	})
	
	$(document).on("click",".PayWeixin>i",function(e){
		e.preventDefault();
		if(weixin){
			weixin = false;
			zhifubao = true;
			$(".PayWeixin>i").css("background-image","url(/Public/Home/1.6/Images/set_icon_xioaxi_nor.png)");
			$(".PayZhifubao>i").css("background-image","url(/Public/Home/1.6/Images/set_icon_pay_sel.png)");
		}else {
			weixin = true;
			zhifubao = false;
			$(".PayWeixin>i").css("background-image","url(/Public/Home/1.6/Images/set_icon_pay_sel.png)");
			$(".PayZhifubao>i").css("background-image","url(/Public/Home/1.6/Images/set_icon_xioaxi_nor.png)");
		}
		console.log(weixin);
		console.log(zhifubao);
	})

	//点击确认判断支付方式
	$(document).on("click",".pay-affirm",function(){
		console.log(weixin);
		console.log(weixin == false);
		var result='';
		if(zhifubao != false){
			var test = window.location.href;
			$.ajax({
				type:'POST',
				dataType:'json',
				url:'/CrmAlipay/add_money',
				data:{'url':test},
				success:function(res){
					if(res.code==1){
						var itemid=res.itemid;
						location.href='/CrmAlipay/doalipay?itemid='+itemid;
					}
				}
			})
		}else if(weixin != false) {
			$(".pay01").hide();
			$(".pay02").hide();
			$(".pay03").show();
			$(".pay03").html('');
			$.ajax({
				type:'POST',
				dataType:'json',
				url:'/CrmCommon/get_pay',
				success:function(res){
					if(res.code==1){
						result+=
						'<span class="PayTop"><em class="PayUp01">上一步</em><i>&#215;</i></span>'+
							'<h6>扫一扫支付（元）</h6>'+
							'<h5>'+res.data.fee+'</h5>'+
							'<span class="pay-code" >'+
							'<img class="pay-code-img" src="/CrmWeixinpay/wx_get_qrcode">'+
							'<p>使用微信扫码付款</p>'+
							'</span>'+
						'<script type="text/javascript">'+
						'var interval = window.setInterval('+
							'function() {'+
								'$.get("/CrmWeixinpay/chang_status", function(data) {'+
									'if(data == "ok") {'+
										'clearInterval(interval);'+
										'$(".pay_model").hide();success("支付成功");'+
									'}'+
								'});'+
							'},'+
						'3000);'+
						'</script>';
						$(".pay03").append(result);	
					}
				}
			})
		}
	})
	//判断支付成功或者失败后的状态
	if(payYesandNo) {
		setTimeout(function(){
			$(".pay-yes").fadeIn();
		},500);
		setTimeout(function(){
			$(".pay_model").fadeOut();
		},2000);
	}else if(payYesandNo == false) {
		setTimeout(function(){
			$(".pay-no").fadeIn();
		},500);
		setTimeout(function(){
			$(".pay_model").fadeOut();
		},2000);
	}
	//支付付款js结束

	//点击关闭引导页面
	$(document).on("click",".GuidanceClos",function(){
		$(".Guidance-box").hide();
	})
});

function success(text){
	
	$(document.body).append('<div class="sucuess-modal" style="z-index:9999999"><div class="sucuess-modal-cell"><img src="/Public/Home/1.6/Images/common_icon_success_nor.png" alt="" /><p class="is_state1">'+text+'</p></div></div>');
	$(".sucuess-modal").fadeIn();
	setTimeout(function(){
	 	$(".sucuess-modal").remove();	
    },1500);
}

function error(text){

	$(document.body).append('<div class="sucuess-modal" style="z-index:9999999"><div class="sucuess-modal-cell"><img src="/Public/Home/1.6/Images/common_icon_fail_nor.png" alt="" /><p class="is_state1">'+text+'</p></div></div>');
	$(".sucuess-modal").fadeIn();
	setTimeout(function(){
		$(".sucuess-modal").remove();	
	},1500);
}

function message(text){

	$(document.body).append('<div class="sucuess-modal" style="z-index:9999999"><div class="sucuess-modal-cell"><img src="/Public/Home/1.6/Images/common_icon_gantan_nor.png" alt="" /><p class="is_state1">'+text+'</p></div></div>');
	$(".sucuess-modal").fadeIn();
	setTimeout(function(){
		$(".sucuess-modal").remove();	
	},1500);
}

function ajax_message(type){
	if(type=='show'){
		$(document.body).append('<div class="ajax_loadModal"><div class="ajax_load_img"><img src="/Public/Home/1.6/Images/load-1.gif" alt="" /></div></div>');
		$(".ajax_loadModal").fadeIn();
	}else{
		$(".ajax_loadModal").hide();
		setTimeout(function(){
			$(".ajax_loadModal").remove();
		},1500);
	}
}

function PayCRM(){
	//动态创建付款页面
	$.ajax({
		type:'post',
		dataType:'json',
		url:'/CrmCommon/get_pay',
		success:function(res){
			if(res.code==1){
	   var html = ' <div class="pay_model" style="display: none">'+
						<!--会员购买-->
						'<div class="PayMoney pay01" style="display: none">'+
						'<span class="PayTop">购买会员 <i>&#215;</i></span>'+
					'<span class="payCenter">'+
						'<h2>标准版&nbsp;&nbsp;'+res.data.fee+'元/1年</h2>'+
					'<p>含'+res.data.hy+'个行业，每个可订阅'+res.data.key+'个关键词</p>'+
					'</span>'+
					'<div class="payServe">'+
						'<input class="pay-check" type="checkbox">'+
						'<i>购买即为同意'+'<em class="QueSever">《雀搜服务条例》</em>'+'</i>'+
					'</div>'+
					'<p>应付金额：<i>'+res.data.fee+'</i>元</p>'+
					'<em class="pay-open">立即支付</em>'+
						'</div>'+
						<!--选择支付页面开始-->
						'<div class="PayMoney pay02" style="display: none">'+
						'<span class="PayTop"><em class="PayUp">上一步</em><i>&#215;</i></span>'+
						'<h3 class="fang">选择支付方式付款</h3>'+
						'<div class="PayXuan">'+
						'<div class="PayWeixin"><span></span>微信支付<i></i></div>'+
						'<div class="PayZhifubao"><span></span>支付宝支付<i></i></div>'+
						'</div>'+
						'<i class="pay-affirm">确认</i>'+
						'</div>'+
						<!--选择支付页面结束-->
						'<div class="PayMoney pay03" style="display: none">'+
						
						'</div>'+
						<!--支付完成弹出模态框-->
						'<div class="pay-modal-cell pay-yes" style="display: none">'+
						'<img src="/Public/Home/1.6/Images/common_icon_success_nor.png" alt="" />'+
						'<p>支付成功！</p>'+
						'<span class="pay_state2 success_pay">您的会员有效期日期至2018-10-23！</span>'+
					'</div>'+
					<!--支付失败弹出模态框-->
					'<div class="pay-modal-cell pay-no" style="display: none">'+
						'<img src="/Public/Home/1.6/Images/icon_payfail_nor.png" alt="" />'+
						'<p>支付失败！</p>'+
					'<span class="pay_state2">抱歉！您此次支付未能成功，请尝试重新操作！</span>'+
					'</div>'+
					'</div>'
					var payclick =$(".outer_div");
					payclick.append(html);
			}
		}
	})
	
}

function get(){
	result=		
		'<span class="PayTop"><em class="PayUp01">上一步</em><i>&#215;</i></span>'+
			'<h6>扫一扫支付（元）</h6>'+
			'<h5>500.00</h5>'+
			'<span class="pay-code">'+
			'<img class="pay-code-img">'+
			'<p>使用微信扫码付款</p>'+
			'</span>'+
			'<img src="/Public/Home/1.6/Images/common_icon_success_nor.png" alt="" />'+
		'<p>支付成功！</p>'+
		'<span class="pay_state2">您的会员有效期日期为2017-10-23至2018-10-23！</span>';
}


Date.prototype.Format = function (fmt) { //author: meizz 
    var o = {
        "M+": this.getMonth() + 1, //月份 
        "d+": this.getDate(), //日 
        "h+": this.getHours(), //小时 
        "m+": this.getMinutes(), //分 
        "s+": this.getSeconds(), //秒 
        "q+": Math.floor((this.getMonth() + 3) / 3), //季度 
        "S": this.getMilliseconds() //毫秒 
    };
    if (/(y+)/.test(fmt)) fmt = fmt.replace(RegExp.$1, (this.getFullYear() + "").substr(4 - RegExp.$1.length));
    for (var k in o)
    if (new RegExp("(" + k + ")").test(fmt)) fmt = fmt.replace(RegExp.$1, (RegExp.$1.length == 1) ? (o[k]) : (("00" + o[k]).substr(("" + o[k]).length)));
    return fmt;
}

//调用： 
//var time1 = new Date().Format("yyyy-MM-dd");
//var time2 = new Date().Format("yyyy-MM-dd HH:mm:ss");