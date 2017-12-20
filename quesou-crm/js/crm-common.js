$(function(){
	PayCRM();
	
	//点击关闭引导页面
	$(document).on("click",".GuidanceClos",function(){
		$(".Guidance-box").hide();
	})
	
	//页面头部会员状态
	var state = 0; //用户状态  0为未认证会员 1为会员认证中 2为以认证会员
	if(state == 0){
		$(".vip-valid").hide();
	}else if(state == 1){
		$(".vip-valid").hide();
		$(".buy_xiansuoli1,.buy_xiansuoli1>a").css("cursor","default");
		$(".buy_xiansuoli1>a").text("会员认证中");
	}else if(state == 2){
		$(".vip-valid").show();
		$(".buy_xiansuoli1").hide();
	}

	var explorer =navigator.userAgent;
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
		{	//解决火狐上对resize的不响应
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
	var aH = $(".right_header>ul>li:eq(3)>a").width();
	console.log(aH+"宽度");
	if(aH>200){
		$(".right_header>ul>li:eq(3)>a").css({
			"display": "inline-block",
			"width": "200",
			"overflow": "hidden",
			"text-overflow": "ellipsis",
			"-o-text-overflow": "ellipsis",
			"white-space": "nowrap"
		})
	}

	//设置页面开通会员状态
	//判断用户是否会员
	var state1 = true;
	if(!state1) {
		$(".SetupCenter-top>em,.SetupCenter-top>span").hide();
		$(".SetupCenter-top>p>span").html('<span>用户类型：VIP会员</span>');
	} else {
		$(".SetupCenter-top>em,.SetupCenter-top>span").show();
		$(".SetupCenter-top>p>span").html('<span>用户类型：体验会员</span>');
	}
	
	$(document).on("click",".buy_xiansuoli1>a",function(){
		if($(this).text()=="会员认证中"){
			return false;
		}
		$(".pay_model").fadeIn();
		$(".pay01").show();
		$(".pay02").hide();
		$(".pay03").hide();
	})

	//微信支付或支付宝支付状态
	//true为选中,false为不选中
	var weixin = true;
	var zhifubao = false;

	//支付成功的状态为true;
	//支付失败的状态为false;
	//无支付状态为null
	var payYesandNo = null;
	//为左侧导航li绑定单击事件
	$(document).on("click",".userList_li",function() {
		var index = $(this).index();
		console.log(index);
		if(index == 0){
			location.href = "../CRM/index.html";
		}
		
		if(index == 1){
			location.href = "../CRM/xiansuo.html";

		}
		
		if(index == 2){
			location.href = "../CRM/kehu-admin.html";
		}
		
		if(index == 3){
			location.href = "../CRM/contact.html";
		}
		
		if(index == 4){
			location.href = "../CRM/gonghai.html";
		}
		
		if(index == 5) {
			$(".icon-shopping-div").stop(true, false).slideToggle();
		}
		
		if(index == 7){
			location.href = "../consult/send.html";
		}
		
		if(index == 8){
			location.href = "../CRM/setup.html";
		}
		
		if(index == 9){
			location.href = "../CRM/feedback.html";
		}
		$(this).addClass("active").siblings().removeClass("active");
	})

	//为左侧导航商品的P段落绑定单击事件
	$(document).on("click", ".icon-shopping-div p", function(e) {
		var index = $(this).index();
		$(this).addClass("open").siblings().removeClass("open");
		if($(this).hasClass("open")) {
			if(index==0){
				location.href="../CRM/commodity-guanli.html";
			}
			if(index==1){
				location.href="../CRM/release-product.html";
			}
			$(this).parent().prev().addClass("active").siblings().removeClass("active");
		}
		e.stopPropagation();
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
			alert("支付需先勾选同意服务条例")
		}
	})
	
	//服务条例
	$(document).on("click",".QueSever",function(){
		window.open("../../view/Publicity/serve.html")
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
			$(".PayZhifubao>i").css("background-image","url(../../Images/set_icon_xioaxi_nor.png)");
			$(".PayWeixin>i").css("background-image","url(../../Images/set_icon_pay_sel.png)");

		}else {
			zhifubao = true;
			weixin = false;
			$(".PayZhifubao>i").css("background-image","url(../../Images/set_icon_pay_sel.png)");
			$(".PayWeixin>i").css("background-image","url(../../Images/set_icon_xioaxi_nor.png)");
		}
		console.log(weixin);
		console.log(zhifubao);
	})
	
	$(document).on("click",".PayWeixin>i",function(e){
		e.preventDefault();
		if(weixin){
			weixin = false;
			zhifubao = true;
			$(".PayWeixin>i").css("background-image","url(../../Images/set_icon_xioaxi_nor.png)");
			$(".PayZhifubao>i").css("background-image","url(../../Images/set_icon_pay_sel.png)");
		}else {
			weixin = true;
			zhifubao = false;
			$(".PayWeixin>i").css("background-image","url(../../Images/set_icon_pay_sel.png)");
			$(".PayZhifubao>i").css("background-image","url(../../Images/set_icon_xioaxi_nor.png)");
		}
		console.log(weixin);
		console.log(zhifubao);
	})

	//点击确认判断支付方式
	$(document).on("click",".pay-affirm",function(){
		console.log(weixin);
		console.log(weixin == false);
		if(zhifubao != false){
			alert("支付宝支付")//弹窗测试后台对接请删除
			$(".pay01").hide();
			$(".pay02").hide();
			$(".pay03").show()
			$(".pay-code-img").attr('src',"../../Images/zhifubao2.png");
			$(".pay-code>p").html("<p>使用支付宝扫码支付</p>")
		}else if(weixin != false) {
			alert("微信支付")//弹窗测试后台对接请删除
			$(".pay01").hide();
			$(".pay02").hide();
			$(".pay03").show()
			$(".pay-code-img").attr('src',"../../Images/weixin1.png");
			$(".pay-code>p").html("<p>使用微信扫码支付</p>")
		}
	})
	//判断支付成功或者失败后的状态
	if(payYesandNo) {
		setTimeout(function(){
			$(".pay-yes").fadeIn()
		},500);
		setTimeout(function(){
			$(".pay_model").fadeOut()
		},2000);
	}else if(payYesandNo == false) {
		setTimeout(function(){
			$(".pay-no").fadeIn()
		},500);
		setTimeout(function(){
			$(".pay_model").fadeOut()
		},2000);
	}
	//支付付款js结束
})
function PayCRM(){
	//动态创建付款页面
	var html = ' <div class="pay_model" style="display: none">'+
		<!--会员购买-->
		'<div class="PayMoney pay01" style="display: none">'+
		'<span class="PayTop">购买会员 <i>&#215;</i></span>'+
		'<div class="PayText">认证服务费：<i>￥</i><em>500</em>元/1年</div>'+
	'<span class="payCenter">'+
		'<h2>认证会员有以下权利：</h2>'+
	'<p><em class="HuiDian"></em><span>基础客户管理功能</span></p>'+
	'<p><em class="HuiDian"></em><span>可以订阅一个行业，<em>5</em>个关键词</span></p>'+
	'<p><em class="HuiDian"></em><span>支持查看采购线索的联系方式</span></p>'+
	'<p><em class="HuiDian"></em><span>每月可选<em>5</em>个商品一键推送，自动开发客户，自动邮件营销</span></p>'+
	'<p><em class="HuiDian"></em><span>公司宣传主页一个（基础版），有<em>200</em>多套模板可供选择</span></p>'+
	'<p><em class="HuiDian"></em><span>商城基础版一个</span></p>'+
	'</span>'+
	'<div class="payServe">'+
		'<input class="pay-check" type="checkbox" checked="checked">'+
		'<i>购买即为同意'+'<em class="QueSever">《雀搜服务条例》</em>'+'</i>'+
	'</div>'+
	'<p>应付金额：<i>500</i>元</p>'+
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
		'<span class="PayTop"><em class="PayUp01">上一步</em><i>&#215;</i></span>'+
	'<h6>扫一扫支付（元）</h6>'+
	'<h5>500.00</h5>'+
	'<span class="pay-code">'+
		'<img class="pay-code-img">'+
		'<p>使用微信扫码付款</p>'+
		'</span>'+
		'</div>'+
		<!--支付完成弹出模态框-->
		'<div class="pay-modal-cell pay-yes" style="display: none">'+
		'<img src="../../Images/common_icon_success_nor.png" alt="" />'+
		'<p>支付成功！</p>'+
	'<span class="pay_state2">您的会员有效期日期为2017-10-23至2018-10-23！</span>'+
	'</div>'+
	<!--支付失败弹出模态框-->
	'<div class="pay-modal-cell pay-no" style="display: none">'+
		'<img src="../../Images/icon_payfail_nor.png" alt="" />'+
		'<p>支付失败！</p>'+
	'<span class="pay_state2">抱歉！您此次支付未能成功，请尝试重新操作！</span>'+
	'</div>'+
	'</div>'
	var payclick =$(".outer_div");
	payclick.append(html);
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