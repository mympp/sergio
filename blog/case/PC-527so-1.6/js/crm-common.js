$(function() {
	PayCRM();

	//点击关闭引导页面
	$(document).on("click", ".GuidanceClos", function() {
		$(".Guidance-box").hide();
	})

	//页面头部会员状态
	var state = 0; //用户状态  0为未认证会员 1为会员认证中 2为以认证会员
	if(state == 0) {
		$(".vip-valid").hide();
	} else if(state == 1) {
		$(".vip-valid").hide();
		$(".buy_xiansuoli1,.buy_xiansuoli1>a").css("cursor", "default");
		$(".buy_xiansuoli1>a").text("会员认证中");
	} else if(state == 2) {
		$(".vip-valid").show();
		$(".buy_xiansuoli1").hide();
	}

	var explorer = navigator.userAgent;
	//判断浏览器内核兼容火狐浏览器
	//修复一系列火狐浏览器bug
	if(explorer.indexOf("Firefox") >= 0) {
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
			"margin-top": "24" + "px"
		})
		window.onresize = resize;

		function resize() { //解决火狐上对resize的不响应
			setTimeout("location.reload();", 100);
		}
		var bw = $("body").width();
		if(bw < 1880) {
			$("#map").css({
				"margin": "-54px 0 0 -460px"
			})
		}

	}
	//判断用户名长度超过指定长度超出隐藏
	var aH = $(".right_header>ul>li:eq(3)>a").width();
	console.log(aH + "宽度");
	if(aH > 200) {
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

	$(document).on("click", ".buy_xiansuoli1>a", function() {
		if($(this).text() == "会员认证中") {
			return false;
		}
		$(".pay_model").fadeIn();
		$(".pay01").show();
		$(".pay02").hide();
		$(".pay03").hide();
		$(".invoice01").hide();
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
	$(document).on("click", ".userList_li", function() {
		var index = $(this).index();
		console.log(index);
		if(index == 0) {
			location.href = "../CRM/index.html";
		}

		if(index == 1) {
			location.href = "../CRM/xiansuo.html";

		}

		if(index == 2) {
			location.href = "../CRM/kehu-admin.html";
		}

		if(index == 3) {
			location.href = "../CRM/contact.html";
		}

		if(index == 4) {
			location.href = "../CRM/gonghai.html";
		}

		if(index == 5) {
			$(".icon-shopping-div").stop(true, false).slideToggle();
		}

		if(index == 7) {
			location.href = "../consult/send.html";
		}

		if(index == 8) {
			location.href = "../CRM/setup.html";
		}

		if(index == 9) {
			location.href = "../CRM/feedback.html";
		}
		$(this).addClass("active").siblings().removeClass("active");
	})

	//为左侧导航商品的P段落绑定单击事件
	$(document).on("click", ".icon-shopping-div p", function(e) {
		var index = $(this).index();
		$(this).addClass("open").siblings().removeClass("open");
		if($(this).hasClass("open")) {
			if(index == 0) {
				location.href = "../CRM/commodity-guanli.html";
			}
			if(index == 1) {
				location.href = "../CRM/release-product.html";
			}
			$(this).parent().prev().addClass("active").siblings().removeClass("active");
		}
		e.stopPropagation();
	})

	//支付付款js开始
	//点击关闭X关闭窗口
	$(document).on("click", ".PayTop>i", function() {
		$(".pay_model").hide();
	})

	//购买会员点击下一步开始
	$(document).on("click", ".pay-open", function(e) {
		e.preventDefault
		if($(".pay-check[type='checkbox']").prop('checked') == true) {
			$(".pay01").hide();
			$(".pay02").show();
		} else {
			alert("支付需先勾选同意服务条例")
		}
	})

	//服务条例
	$(document).on("click", ".QueSever", function() {
		window.open("../../view/Publicity/serve.html")
	})
	//点击选择付款方式上一步返回上一个窗口
	$(document).on("click", ".PayUp", function() {
		$(".pay01").show();
		$(".pay02").hide();
		$(".pay03").hide();
	})

	//点击付款二维码上一步返回上一个窗口
	$(document).on("click", ".PayUp01", function() {
		$(".pay01").hide();
		$(".pay02").show();
		$(".pay03").hide();
	})

	//点击勾选框选支付方式事件
	//true为选中,false为不选中
	$(document).on("click", ".PayZhifubao>i", function(e) {
		e.preventDefault();
		if(zhifubao) {
			zhifubao = false;
			weixin = true;
			$(".PayZhifubao>i").css("background-image", "url(../../Images/set_icon_xioaxi_nor.png)");
			$(".PayWeixin>i").css("background-image", "url(../../Images/set_icon_pay_sel.png)");

		} else {
			zhifubao = true;
			weixin = false;
			$(".PayZhifubao>i").css("background-image", "url(../../Images/set_icon_pay_sel.png)");
			$(".PayWeixin>i").css("background-image", "url(../../Images/set_icon_xioaxi_nor.png)");
		}
		console.log(weixin);
		console.log(zhifubao);
	})

	$(document).on("click", ".PayWeixin>i", function(e) {
		e.preventDefault();
		if(weixin) {
			weixin = false;
			zhifubao = true;
			$(".PayWeixin>i").css("background-image", "url(../../Images/set_icon_xioaxi_nor.png)");
			$(".PayZhifubao>i").css("background-image", "url(../../Images/set_icon_pay_sel.png)");
		} else {
			weixin = true;
			zhifubao = false;
			$(".PayWeixin>i").css("background-image", "url(../../Images/set_icon_pay_sel.png)");
			$(".PayZhifubao>i").css("background-image", "url(../../Images/set_icon_xioaxi_nor.png)");
		}
		console.log(weixin);
		console.log(zhifubao);
	})

	//点击确认判断支付方式
	$(document).on("click", ".pay-affirm", function() {
		console.log(weixin);
		console.log(weixin == false);
		if(zhifubao != false) {
			alert("支付宝支付") //弹窗测试后台对接请删除
			$(".pay01").hide();
			$(".pay02").hide();
			$(".pay03").show()
			$(".pay-code-img").attr('src', "../../Images/zhifubao2.png");
			$(".pay-code>p").html("<p>使用支付宝扫码支付</p>")
		} else if(weixin != false) {
			alert("微信支付") //弹窗测试后台对接请删除
			$(".pay01").hide();
			$(".pay02").hide();
			$(".pay03").show()
			$(".pay-code-img").attr('src', "../../Images/weixin1.png");
			$(".pay-code>p").html("<p>使用微信扫码支付</p>")
		}
	})
	//判断支付成功或者失败后的状态
	if(payYesandNo) {
		setTimeout(function() {
			$(".pay-yes").fadeIn()
		}, 500);
		setTimeout(function() {
			$(".pay_model").fadeOut()
		}, 2000);
	} else if(payYesandNo == false) {
		setTimeout(function() {
			$(".pay-no").fadeIn()
		}, 500);
		setTimeout(function() {
			$(".pay_model").fadeOut()
		}, 2000);
	}
	//支付付款js结束

	//点击上一步
	$(document).on("click", ".PayUp99", function() {
		$(".invoice01").hide();
		$(".pay01").show();
	})
	
	//点击发票进入开发票页面
	$(document).on("click", ".invoice", function() {
		$(".pay01").hide();
		$(".invoice01").show();
	})
	
	//不开发票的时候点击确认
	$(document).on("click", ".invoiceBtn02", function() {
		$(".invoiceCss").val('');
		$(".openCode").css({
			"background": "#dcdcdc",
			"pointer-events": "none"
		})
		$(".invoice").text("无需发票")
		$(".invoice01").hide();
		$(".pay01").show();
	})
	
	//判断按钮变色结束
	//获取焦点清除状态
	$(document).on("focus", ".invoiceCss", function() {
		$(this).next(".ivx").hide();
	})
	
	$(document).on("focus", ".invoiceCode", function() {
		$(".ivx04").hide();
	})
	
	//开发票以及不开发票按钮切换
	$(document).on("click", ".ivTop-left", function() {
		$(".openInvoice").hide();
		$(".ivTop-left").addClass("ivTop-avi")
		$(".ivTop-right").removeClass("ivTop-avi")
		$(".BtnBOX02").show();
	})
	
	$(document).on("click", ".ivTop-right", function() {
		$(".BtnBOX02").hide();
		$(".openInvoice").show();
		$(".ivTop-right").addClass("ivTop-avi")
		$(".ivTop-left").removeClass("ivTop-avi")
	})
	
	//监控邮箱输入框数据变化按钮变化
	$(document).on("input propertychange", ".invoiceEmail", function() {
		var invoiceEmail = $(".invoiceEmail").val().length //获取输入框内容
		console.log(invoiceEmail);
		if(invoiceEmail > 0) {
			$(".openCode").css({
				"background": "#1da1f2",
				"cursor": "pointer",
				"pointer-events": "auto"
			})
		} else if(invoiceEmail == 0) {
			$(".openCode").css({
				"background": "#dcdcdc",
				"pointer-events": "none"
			})
		}
	})

	//点击发送验证码
	$(document).on("click", ".openCode", function() {
		var emailreg = /^[a-z0-9-_.]+@[\da-z][\.\w-]+\.[a-z]{2,4}$/i; //邮箱正则
		var invoiceEmail = $(".invoiceEmail").val();
		if(!emailreg.test(invoiceEmail)) {
			$(".ivx03>span").text("邮箱不符合规范")
			$(".ivx03").show()
		} else {
			sendMessage1();
		}
	})


	//判断用户是否已经绑定邮箱
	var EmailState = false; //为true表示用户已经绑定邮箱,为false表示用户尚未绑定
	//判断按钮变色
	var invoiceName = 0; //单位名称
	var invoiceNumber = 0; //识别码
	var invoiceEmail = 0; //邮箱
	var invoiceCode = 0; //验证码
	console.log(invoiceName);
	var VipRank = 1; //0:为认证会员购买页;1:处于认证会员下升级;2:处于黄金套餐下升级;3:处于砖石套餐下升级
	if(VipRank == 0){
		$(".Updata-Vip").hide();
		$(".pay01").css({
			height:"636",
			width:"1100"
		})
		$(".BuyVip_title").text("认证会员")
		$(".Limit").hide();
	}else if(VipRank == 1 ){
		$(".buy_xiansuoli1").hide();
		$(".BuyVip_title").text("升级套餐")
		$(".pay01").css({
			height:"636",
			width:"1100"
		})
		$(".PayMoney>p>i").text("100")
		$(".hade_title").text("升级会员套餐，更多专属权")
		$(".left_price>em").text("100")
		$(".right_price>em").text("1480")
		$(".center_price>em").text("880")
		$(".bottom_xq").hide();
		$(".left_box>.h2_price").text("升级当月套餐：")
		$(".center_box>.h2_price").text("升级黄金套餐：")
		$(".right_box>.h2_price").text("升级砖石套餐：")
		$(".pay0Center>p").hide();
		$(".left_box>.pay0Center p:eq(0)").show();
		$(".right_box>.pay0Center p:eq(0)").show();
		$(".center_box>.pay0Center p:eq(0)").show();
		$(".left_box>.pay0Center p:eq(1)").show();
		$(".right_box>.pay0Center p:eq(1)").show();
		$(".center_box>.pay0Center p:eq(1)").show();
		$(".left_box>.pay0Center p:eq(0)>span").html('<span>30天内可增加<em class="pay0color">1个</em>商品邮件群发</span>')
		$(".left_box>.pay0Center p:eq(1)>span").html('<span>30天内可增加订阅<em class="pay0color">1个</em>关键词</span>')
		$(".center_box>.pay0Center p:eq(0)>span").html('<span>每月可增加<em class="pay0color">10个</em>商品邮件群发</span>')
		$(".center_box>.pay0Center p:eq(1)>span").html('<span>每月可增加订阅<em class="pay0color">10个</em>关键词</span>')
		$(".right_box>.pay0Center p:eq(0)>span").html('<span>每月可增加<em class="pay0color">20个</em>商品邮件群发</span>')
		$(".right_box>.pay0Center p:eq(1)>span").html('<span>每月可增加订阅<em class="pay0color">20个</em>关键词</span>')
		$(".right_box,.center_box,.left_box").height(304)
		$(".payServe").css({
			"margin-top": "0"
		})
	}else if(VipRank == 2){
		$(".buy_xiansuoli1").hide();
		$(".hade_title").text("升级会员套餐，更多专属权")
		$(".BuyVip_title").text("升级套餐")
		$(".pay01").css({
			height:"636",
			width:"842"
		})
		$(".vip0_centerbox").width(622)
		$(".right_box").hide();
		$(".center_box").css({
			"margin-left": "42",
			"margin-right": "0"
		})
		$(".invoice").css({
			"margin-left": "422"+"px"
		})
		$(".PayMoney>p>i").text("100")
		$(".left_price>em").text("100")
		$(".center_price>em").text("600")
		$(".bottom_xq").hide();
		$(".left_box>.h2_price").text("升级当月套餐：")
		$(".center_box>.h2_price").text("升级砖石套餐：")
		$(".pay0Center>p").hide();
		$(".left_box>.pay0Center p:eq(0)").show();
		$(".center_box>.pay0Center p:eq(0)").show();
		$(".left_box>.pay0Center p:eq(1)").show();
		$(".center_box>.pay0Center p:eq(1)").show();
		$(".left_box>.pay0Center p:eq(0)>span").html('<span>30天内可增加<em class="pay0color">1个</em>商品邮件群发</span>')
		$(".left_box>.pay0Center p:eq(1)>span").html('<span>30天内可增加订阅<em class="pay0color">1个</em>关键词</span>')
		$(".center_box>.pay0Center p:eq(0)>span").html('<span>每月可增加<em class="pay0color">10个</em>商品邮件群发</span>')
		$(".center_box>.pay0Center p:eq(1)>span").html('<span>每月可增加订阅<em class="pay0color">10个</em>关键词</span>')
	}else if(VipRank == 3){
		$(".buy_xiansuoli1").hide();
		$(".hade_title").text("升级会员套餐，更多专属权")
		$(".BuyVip_title").text("升级套餐")
		$(".rzvip0_box").hide();
		$(".rzvip3_box").show();
		$(".invoice").css({
			"margin-left": "300"+"px"
		})
		$(".Limit").css({
			"margin-top": "10"+"px",
			"margin-bottom": "10"+"px",
		})
		$(".PayMoney>p>i").text("100")
		$(".pay03>h5").text(100+".00")
	}
	//套餐tab切换事件
	$(document).on("click",".vip0_centerbox>div",function(){
		$(this).children("div").children("span").addClass("Add_Text")
		$(this).siblings().children("div").children("span").removeClass("Add_Text")
		$(this).children("div").addClass("Add_Back")
		$(this).siblings().children("div").removeClass("Add_Back")
		$(this).addClass("Add_border")
		$(this).siblings().removeClass("Add_border")
		$(this).children("div").children(".bottom_xq").addClass("Add_Color");
		$(this).siblings().children("div").children(".bottom_xq").removeClass("Add_Color");
		var TextColor = $(this).children("div").children("span").children("em").text();
		$(".PayMoney>p>i").text(TextColor)
		console.log($(".PayMoney>p>i").text());
		$(".pay03>h5").text(TextColor+".00")
	})
	//设置页套餐升级按钮事件
	$(document).on("click",".Updata-Vip",function(){
		$(".pay_model").fadeIn();
		$(".pay01").show();
		$(".pay02").hide();
		$(".pay03").hide();
		$(".invoice01").hide();
	})
function PayCRM() {
	//动态创建付款页面
	var html = ' <div class="pay_model" style="display: none">' +
		<!--会员购买-->
		'<div class="PayMoney pay01" style="display: none">' +
		'<span class="PayTop"><span class="BuyVip_title">购买会员</span> <i>&#215;</i></span>' +
		'<div class="rzvip3_box" style="display: none">'+
		'<div class="hade_title">升级会员套餐，更多专属权</div>'+
		'<div class="PayText"><i>￥</i><em>100</em>元</div>' +
		'<span class="payCenter">' +
		'<h2>升级当月套餐：</h2>' +
		'<p><em class="HuiDian"></em><span>30天内可增加<em class="pay0color">1个</em>商品邮件群发</span></p>' +
		'<p><em class="HuiDian"></em><span>30天内可增加订阅<em class="pay0color">1个</em>关键词</span></p>' +
		'<span class="Limit">（套餐有效期日期：购买后30天内有效，可与其他套餐叠加使用，需在认证会员期间使用）</span>'+
		'</span>' +
		'</div>'+
		//	新加部分
		'<div class="rzvip0_box" >'+
			'<div class="hade_title">购买会员，更多专属权</div>'+
			'<div class="vip0_centerbox">' +
			'<div class="left_box Add_border">' +
			'<div class="left_top_box Add_Back">' +
			'<span class="left_price Add_Text">￥<em>500</em>元/年</span>'+
			'<p class="bottom_xq Add_Color">含会员认证费500元/年</p>'+
			'</div>'+
			'<h2 class="h2_price">免费基础套餐0元/年：</h2>'+
			'<span class="pay0Center">'+
			'<p><em class="HuiDian"></em><span>每月可选<em class="pay0color">4个</em>商品邮件群发</span></p>' +
			'<p><em class="HuiDian"></em><span>可以订阅<em class="pay0color">4个</em>关键词</span></p>' +
			'<p style="padding-bottom:10px"><em class="HuiDian"></em><span>基础版公司宣传主页<em class="pay0color">1个</em></span></p>' +
			'<p><em class="HuiDian" style="opacity: 0;"></em><span>有<em class="pay0color">200</em>多套模板可供选择</span></p>' +
			'<p><em class="HuiDian"></em><span>基础版商城<em class="pay0color">1个</em></span></p>' +
			'</span>'+
			'<span class="Limit">（购买后30天内有效，可与其他套餐叠加使用，需在认证会员期间使用）</span>'+
			'</div>'+
			'<div class="center_box">' +
			'<div class="center_top_box">' +
			'<span class="center_price">￥<em>800</em>元/年</span>'+
			'<p class="bottom_xq">含会员认证费500元/年</p>'+
			'</div>'+
			'<h2 class="h2_price">黄金套餐880元/年：</h2>'+
			'<span class="pay0Center">'+
			'<p><em class="HuiDian"></em><span>每月可选<em class="pay0color">15个</em>商品邮件群发</span></p>' +
			'<p><em class="HuiDian"></em><span>可以订阅<em class="pay0color">15个</em>关键词</span></p>' +
			'<p style="padding-bottom:10px"><em class="HuiDian"></em><span>基础版公司宣传主页<em class="pay0color">1个</em></span></p>' +
			'<p><em class="HuiDian" style="opacity: 0;"></em><span>有<em class="pay0color">200</em>多套模板可供选择</span></p>' +
			'<p><em class="HuiDian"></em><span>基础版商城<em class="pay0color">1个</em></span></p>' +
			'</span>'+
			'<span class="Limit">（套餐有效期日期：2019-01-02）</span>'+
			'</div>'+
			'<div class="right_box">' +
			'<div class="right_top_box">' +
			'<span class="right_price">￥<em>1480</em>元/年</span>'+
			'<p class="bottom_xq">含会员认证费500元/年</p>'+
			'</div>'+
			'<h2 class="h2_price">砖石套餐1480元/年：</h2>'+
			'<span class="pay0Center">'+
			'<p><em class="HuiDian"></em><span>每月可选<em class="pay0color">25个</em>商品邮件群发</span></p>' +
			'<p><em class="HuiDian"></em><span>可以订阅<em class="pay0color">25个</em>关键词</span></p>' +
			'<p style="padding-bottom:10px"><em class="HuiDian"></em><span>基础版公司宣传主页<em class="pay0color">1个</em></span></p>' +
			'<p><em class="HuiDian" style="opacity: 0;"></em><span>有<em class="pay0color">200</em>多套模板可供选择</span></p>' +
			'<p><em class="HuiDian"></em><span>基础版商城<em class="pay0color">1个</em></span></p>' +
			'</span>'+
			'<span class="Limit">（套餐有效期日期：2019-01-02）</span>'+
			'</div>'+
			'</div>'+
		'</div>'+
		//新加部分
		'<div class="payServe">' +
		'<input class="pay-check" type="checkbox" checked="checked">' +
		'<i>购买即为同意' + '<em class="QueSever">《雀搜服务条例》</em>' + '</i>' +
		'<span class="invoice">发票	&rsaquo;</span>' +
		'</div>' +
		'<span class="cer"></span>'+
		'<p>应付金额：<i>500</i>元</p>' +
		'<em class="pay-open">立即支付</em>' +
		'</div>' +
		<!--选择支付页面开始-->
		'<div class="PayMoney pay02" style="display: none">' +
		'<span class="PayTop"><em class="PayUp">上一步</em><i>&#215;</i></span>' +
		'<h3 class="fang">选择支付方式付款</h3>' +
		'<div class="PayXuan">' +
		'<div class="PayWeixin"><span></span>微信支付<i></i></div>' +
		'<div class="PayZhifubao"><span></span>支付宝支付<i></i></div>' +
		'</div>' +
		'<i class="pay-affirm">确认</i>' +
		'</div>' +
		<!--选择支付页面结束-->
		'<div class="PayMoney pay03" style="display: none">' +
		'<span class="PayTop"><em class="PayUp01">上一步</em><i>&#215;</i></span>' +
		'<h6>扫一扫支付（元）</h6>' +
		'<h5>500.00</h5>' +
		'<span class="pay-code">' +
		'<img class="pay-code-img">' +
		'<p>使用微信扫码付款</p>' +
		'</span>' +
		'</div>' +
		<!--选择支付页面结束-->
		<!--选择填写发票-->
		'<div class="PayMoney invoice01" style="display: none" >' +
		'<span class="PayTop"><em class="PayUp99">上一步</em><i>&#215;</i></span>' +
		'<form action="" method="post" target="nm_iframe" id="invoiceSub">' +
		'<h3 class="fang01">发票详情</h3>' +
		'<div class="ivTop"><span class="ivTop-left">不开发票</span><span class="ivTop-right ivTop-avi">普通发票</span></div>' +
		'<div class="BtnBOX02"><span class="invoiceBtn02">确定</span></div>' +
		'<div class="openInvoice">' +
		'<h3 class="fang01">发票抬头</h3>' +
		'<span class="invoicexq">（发票须填写纳税人识别号，以免影响报销）</span>' +
		'<div class="ivinput">' +
		'<input class="invoiceCss invoiceName" name="invoiceName" type="text" placeholder="请填写单位名称">' +
		'<span class="ivx ivx01"><em>*</em>单位名称不能为空</span>' +
		'</div>' +
		'<div class="ivinput">' +
		'<input class="invoiceCss invoiceNumber" name="invoiceNumber" type="text" placeholder="请在此填写纳税人识别号">' +
		'<span class="ivx ivx02"><em>*</em><span>纳税人识别号不符合规范</span></span>' +
		'</div>' +
		'<div class="ivE">' +
		'<h6>请填写正确的邮箱，我们将把开具的电子发票发至您的邮箱</h6>' +
		'<div class="ivinput">' +
		'<input class="invoiceCss invoiceEmail" name="invoiceEmail" type="text" placeholder="邮箱">' +
		'<span class="ivx ivx03"><em>*</em><span>邮箱不符合规范</span></span>' +
		'</div>' +
		'<div class="ivinput">' +
		'<input class="invoiceCss invoiceCode" name="invoiceCode" placeholder="请填写邮箱验证码" maxlength="4">' +
		'<span class="openCode">发送验证码</span>' +
		'<span class="ivx ivx04" style="top:50px"><em>*</em><span>验证码错误</span></span>' +
		'</div>' +
		'</div>' +
		'<div class="BtnBOX"><span class="invoiceBtn">保存</span></div>' +
		'</div>' +
		'</form>' +
		'<iframe id="id_iframe" name="nm_iframe" style="display:none;"></iframe>' +
		'</div>' +
		<!--选择填写发票-->
		<!--支付完成弹出模态框-->
		'<div class="pay-modal-cell pay-yes" style="display: none">' +
		'<img src="../../Images/common_icon_success_nor.png" alt="" />' +
		'<p>支付成功！</p>' +
		'<span class="pay_state2">您的会员有效期日期为2017-10-23至2018-10-23！</span>' +
		'</div>' +
		<!--支付失败弹出模态框-->
		'<div class="pay-modal-cell pay-no" style="display: none">' +
		'<img src="../../Images/icon_payfail_nor.png" alt="" />' +
		'<p>支付失败！</p>' +
		'<span class="pay_state2">抱歉！您此次支付未能成功，请尝试重新操作！</span>' +
		'</div>' +
		'</div>'
	var payclick = $(".outer_div");
	payclick.append(html);
}

	if(EmailState) {
	$(".ivE").css({
		"display": "none"
	});

	//实时监控输入框内容
	$(document).on("input propertychange", ".invoiceName", function() {
		invoiceName = $(".invoiceName").val().length;
		if(invoiceNumber != 0 && invoiceName != 0) {
			$(".invoiceBtn").css({
				"background": "#1da1f2",
				"cursor": "pointer",
				"pointer-events": "auto"
			})
		} else {
			$(".invoiceBtn").css({
				"background": "#dcdcdc",
				"pointer-events": "none"
			})
		}
		console.log(invoiceName);
	})

	$(document).on("input propertychange", ".invoiceNumber", function() {
		invoiceNumber = $(".invoiceNumber").val().length;
		if(invoiceName != 0 && invoiceNumber != 0) {
			$(".invoiceBtn").css({
				"background": "#1da1f2",
				"cursor": "pointer",
				"pointer-events": "auto"
			})
		} else {
			$(".invoiceBtn").css({
				"background": "#dcdcdc",
				"pointer-events": "none"
			})
		}
		console.log(invoiceNumber);
	})

	//保存点击事件
	$(document).on("click", ".invoiceBtn", function() {
		$(".invoice").text("已开发票")
		var NumberVal = $(".invoiceNumber").val();
		console.log(NumberVal);
		if(invoiceNumber < 10) {
			$(".ivx02>span").text("纳税人识别号不符合规范")
			$(".ivx02").show();
		} else if(/[\u4E00-\u9FA5]/i.test(NumberVal)) {
			$(".ivx02>span").text("请不要输入中文")
			$(".ivx02").show();
		} else {
			$("#invoiceSub").submit();
			$(".invoice01").hide();
			$(".pay01").show();
		}
	})
} else {
	$(".ivE").show();
	//实时监控输入框内容
	$(document).on("input propertychange", ".invoiceName", function() {
		invoiceName = $(".invoiceName").val().length;
	})
	$(document).on("input propertychange", ".invoiceNumber", function() {
		invoiceNumber = $(".invoiceNumber").val().length;
	})
	$(document).on("input propertychange", ".invoiceEmail", function() {
		invoiceEmail = $(".invoiceEmail").val().length;
		if(invoiceCode != 0 && invoiceEmail != 0) {
			$(".invoiceBtn").css({
				"background": "#1da1f2",
				"cursor": "pointer",
				"pointer-events": "auto"
			})
		} else {
			$(".invoiceBtn").css({
				"background": "#dcdcdc",
				"pointer-events": "none"
			})
		}
	})
	$(document).on("input propertychange", ".invoiceCode", function() {
		invoiceCode = $(".invoiceCode").val().length;
		if(invoiceEmail != 0 && invoiceCode != 0) {
			$(".invoiceBtn").css({
				"background": "#1da1f2",
				"cursor": "pointer",
				"pointer-events": "auto"
			})
		} else {
			$(".invoiceBtn").css({
				"background": "#dcdcdc",
				"pointer-events": "none"
			})
		}
	})

	//保存点击事件
	$(document).on("click", ".invoiceBtn", function() {
		$(".invoice").text("已开发票")
		var NameVal = $(".invoiceName").val();
		var NumberVal = $(".invoiceNumber").val();
		var CodeVal = $(".invoiceCode").val();
		var codenum = 1234;
		console.log(NumberVal);
		if(NameVal == "") {
			$(".ivx01>span").text("单位名称不能为空")
			$(".ivx01").show();
		} else if(NumberVal == "") {
			$(".ivx02>span").text("纳税人识别号不能为空")
			$(".ivx02").show();
		} else if(invoiceNumber < 10) {
			$(".ivx02>span").text("纳税人识别号不符合规范")
			$(".ivx02").show();
		} else if(/[\u4E00-\u9FA5]/i.test(NumberVal)) {
			$(".ivx02>span").text("请不要输入中文")
			$(".ivx02").show();
		} else if(CodeVal == "") {
			$(".ivx04>span").text("验证码不能为空")
			$(".ivx04").show();
		} else if(CodeVal != codenum) {
			$(".ivx04>span").text("验证码错误")
			$(".ivx04").show();
		} else {
			$("#invoiceSub").submit();
			$(".invoice01").hide();
			$(".pay01").show();
		}
	})
}

//发送消息函数
function sendMessage1() {
	curCount = 60; //设置button效果，开始计时
	console.log(curCount);
	$(".openCode").text(curCount + "秒后重获").addClass('code-state12');
	InterValObj = window.setInterval(SetRemainTime1, 1000); //启动计时器，1秒执行一次
}

//timer处理函数
function SetRemainTime1() {
	if(curCount == 0) {
		window.clearInterval(InterValObj); //停止计时器
		$(".openCode").text("重新获取").removeClass('code-state12');
	} else {
		curCount--;
		$(".openCode").text(curCount + "秒后重获").addClass('code-state12');
	}
}


Date.prototype.Format = function(fmt) { //author: meizz
	var o = {
		"M+": this.getMonth() + 1, //月份 
		"d+": this.getDate(), //日 
		"h+": this.getHours(), //小时 
		"m+": this.getMinutes(), //分 
		"s+": this.getSeconds(), //秒 
		"q+": Math.floor((this.getMonth() + 3) / 3), //季度 
		"S": this.getMilliseconds() //毫秒 
	};
	if(/(y+)/.test(fmt)) fmt = fmt.replace(RegExp.$1, (this.getFullYear() + "").substr(4 - RegExp.$1.length));
	for(var k in o)
		if(new RegExp("(" + k + ")").test(fmt)) fmt = fmt.replace(RegExp.$1, (RegExp.$1.length == 1) ? (o[k]) : (("00" + o[k]).substr(("" + o[k]).length)));
	return fmt;
}
})
//调用： 
//var time1 = new Date().Format("yyyy-MM-dd");
//var time2 = new Date().Format("yyyy-MM-dd HH:mm:ss");