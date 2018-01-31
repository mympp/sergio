$(function() {
	$(".right_template").load("right_nav.html",function(){
		HeadNav();
	}); //异步加载左侧导航
	
	//有未读消息的条件下出现小红点在消息图标上方
	var messageRed = true //为true时小红点存在表示有未读消息
	if(messageRed) {
		$(".message_red").show();
	} else {
		$(".message_red").hide();
	}

	$(window).resize(function() {
		HeadNav();
	})

	//点击头部信息的按钮
	$(document).on("click", ".message_button", function() {
		var html = $(".left_template").html();
		sessionStorage['html_left'] = html;
		location.href = "../view/MessageCenter.html";
	})

	//子复选框的事件函数
	$(document).on("click", "input[name=checkedres]", function() {
		setSelectAll();
	})

	//为删除按钮绑定单击事件
	$(document).on("click", ".DeleteMessage", function() {
		if($(".message-body").length == 0) {
			return false;
		}

		if($("input[type='checkbox'][name='checkedres']:checked").length == 0) {
			return false;
		}

		$(".delete-modal").fadeIn();
	})

	$(document).on("click", ".de_confirm_1", function() {
		//遍历每个选中的checkbox
		$("input[type='checkbox'][name='checkedres']:checked").each(function() {
			//divids =  $(this).parent().siblings().find($(".message-body")).children("div").attr("name");//每条数据的id
			divids = $(this).parent().parent().parent().attr("name");
			$("[name= '" + divids + "' ]").remove(); //发起ajax
			console.log(divids);
			console.log($(".message-body").children().length);
			if($(".message-body").children().length == 0) { //如果list长度等于0
				$("#checkall").prop("checked", false); //关闭全选
				$("#checkall").prop("disabled", "false"); //禁用全选
			}
		})
		$(".delete-modal").fadeOut();
	})

	$(document).on("click", ".de_cancel_1", function() {
		$(".delete-modal").fadeOut();
	})

	//复制文本到右键1
	$(document).on("click", ".CopyText01", function() {
		$("#Ctext").select();
		document.execCommand("Copy"); //执行浏览器复制命令此命令兼容各大浏览器
		$(".right_center>p>i").text("复制成功")
		$(".right_center>p>i").css({
			"fontSize": 18
		})
		$(".right_center").fadeIn();
		setTimeout(function() {
			$(".right_center").fadeOut();
		}, 1000);
	})
	//复制文本到右键2
	$(document).on("click", ".CopyText02", function() {
		$("#Ctext02").select();
		document.execCommand("Copy"); //执行浏览器复制命令此命令兼容各大浏览器
		$(".right_center>p>i").text("复制成功")
		$(".right_center>p>i").css({
			"fontSize": 18
		})
		$(".right_center").fadeIn();
		setTimeout(function() {
			$(".right_center").fadeOut();
		}, 1000);
	})
	//为展开元素绑定单击事件
	$(document).on("click",".icon-shopping",function(){
		$(".left_template").find("*").removeClass("active");
		$(this).parents(".slider_List").find("div").slideUp();
		$(this).addClass("active").next("div").stop(true, false).slideToggle();
	})

	//初始化分页器的值
	var pageVal = $(".xiansuo_Page_Three").val();
	$(".xiansuo_Pages").html(pageVal + "页");

	//监听分页值的变动
	$(".xiansuo_Page_Three").change(function() {
		var checkValue = $(this).val();
		$(".xiansuo_Pages").html(checkValue + "页");
	})

	//为分页器每个li绑定单击事件
	$(document).on("click", ".xiansuo_Page_list li", function() {
		var index = $(this).index();
		var str = $(this).html();
		$(this).addClass("active").siblings().removeClass("active");
		$(".that_Page").val(str);
		console.log(index);
	})
})

function HeadNav() {
	var winW = $(window).width();
	var aH = $(".right_header>ul>li:first-child>a").width();
	console.log(aH);
	if(winW < 1800) {
		if(aH > 100) {
			$(".right_header>ul>li:first-child>a").css({
				"display": "inline-block",
				"width": "100",
				"overflow": "hidden",
				"text-overflow": "ellipsis",
				"white-space": "nowrap"
			})
		}
	} else {
		if(aH > 240) {
			$(".right_header>ul>li:first-child>a").css({
				"display": "inline-block",
				"width": "100",
				"overflow": "hidden",
				"text-overflow": "ellipsis",
				"white-space": "nowrap"
			})
		}
	}
}

//全选、反选的事件函数
function selectAll() {
	console.log($("#checkall").prop("checked"));
	if($("#checkall").prop("checked")) {
		console.log("全选");
		$("input[type='checkbox'][name='checkedres']").prop("checked", true); //全选
	} else {
		console.log("反选");
		$("input[type='checkbox'][name='checkedres']").prop("checked", false); //反选
	}
}

//子复选框的事件函数
function setSelectAll() {
	//当没有选中某个子复选框时，SelectAll取消选中
	if(!$("input[type='checkbox'][name='checkedres']").checked) {
		console.log("不满足,取消全选");
		$("#checkall").prop("checked", false);
	}
	var chsub = $("input[type='checkbox'][name='checkedres']").length; //获取subcheck的个数
	var checkedsub = $("input[type='checkbox'][name='checkedres']:checked").length; //获取选中的subcheck的个数
	if(checkedsub == chsub) {
		console.log("满足,开启全选");
		$("#checkall").prop("checked", true);
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

//调用： 
//var time1 = new Date().Format("yyyy-MM-dd");
//var time2 = new Date().Format("yyyy-MM-dd HH:mm:ss");