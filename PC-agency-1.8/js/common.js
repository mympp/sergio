$(function() {
	$(".left_template").load("left_nav.html"); //异步加载左侧导航
	$(".right_template").load("right_nav.html", function() {
		//console.log(pages);
		if(pages) {
			$(".page_state").text(pages);
		}
		HeadNav();
		
		$(".userList_li").eq(index1).addClass("active").siblings().removeClass("active");//父层模块下标
		$(".userList_li").eq(index1).next().show().find("p").eq(index2).addClass("open");//子层模块下标
	}); //异步加载右侧导航

	//有未读消息的条件下出现小红点在消息图标上方
	var messageRed = true //为true时小红点存在表示有未读消息
	if(messageRed) {
		$(".message_red").show();
	} else {
		$(".message_red").hide();
	}

	$(window).resize(function() {
		//console.log($(window).width());
		HeadNav();
	})

	//点击头部信息的按钮
	$(document).on("click", ".message_button", function() {
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

	//复制文本到右键
	$(document).on("click", ".CopyText", function() {
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

	//为左侧导航li绑定单击事件
	$(document).on("click", ".userList_li", function() {
		var index = $(this).index();
		console.log(index);
		if(index == 0) {
			$(".page_state").text("首页");
			location.href = "../view/index.html";

		}
		if(index == 1) {
			$(".icon-money-div").stop(true, false).slideToggle();
			$(".icon-data-div").slideUp()
			$(".icon-person-div").slideUp()
			$(".icon-shopping-div").slideUp()
			$(".icon-shopping-1:eq(0)").addClass("activeDown");
			$(".icon-shopping-1").not(".icon-shopping-1:eq(0)").removeClass("activeDown");
			$(".page_state").text("资金管理")
			location.href = "../view/fund-platform.html";
			$(".icon-money-div p:eq(0)").addClass("open").siblings().removeClass("open");

		}

		if(index == 3) {
			$(".icon-data-div").stop(true, false).slideToggle();
			$(".icon-money-div").slideUp()
			$(".icon-person-div").slideUp()
			$(".icon-shopping-div").slideUp()
			$(".icon-shopping-1:eq(1)").addClass("activeDown");
			$(".icon-shopping-1").not(".icon-shopping-1:eq(1)").removeClass("activeDown");
			$(".page_state").text("数据管理")
			$(".icon-data-div p:eq(0)").addClass("open").siblings().removeClass("open");
			location.href = "../view/data-daili.html";
		}

		if(index == 5) {
			$(".icon-person-div").stop(true, false).slideToggle();
			$(".icon-money-div").slideUp()
			$(".icon-data-div").slideUp()
			$(".icon-shopping-div").slideUp()
			$(".icon-shopping-1:eq(2)").addClass("activeDown");
			$(".icon-shopping-1").not(".icon-shopping-1:eq(2)").removeClass("activeDown");
			$(".page_state").text("角色管理")
			$(".icon-person-div p:eq(0)").addClass("open").siblings().removeClass("open");
			location.href = "../view/juese-admin.html";
		}

		if(index == 7) {
			$(".icon-shopping-div").stop(true, false).slideToggle();
			$(".icon-money-div").slideUp()
			$(".icon-data-div").slideUp()
			$(".icon-person-div").slideUp()
			$(".icon-shopping-1:eq(3)").addClass("activeDown");
			$(".icon-shopping-1").not(".icon-shopping-1:eq(3)").removeClass("activeDown");
			$(".page_state").text("系统管理")
			$(".icon-shopping-div p:eq(0)").addClass("open").siblings().removeClass("open");
			location.href = "../view/set-user.html";
		}
		$(this).addClass("active").siblings().removeClass("active");
	})

	//为左侧导航系统设置下拉菜单绑定单击事件
	$(document).on("click", ".icon-shopping-div p", function(e) {
		var index = $(this).index();
		$(this).addClass("open").siblings().removeClass("open");
		if($(this).hasClass("open")) {
			if(index == 0) {
				location.href = "../view/set-user.html";
			}
			if(index == 1) {
				location.href = "../view/set-send.html";
			}
			if(index == 2) {
				location.href = "../view/set-history.html";
			}
			if(index == 3) {
				location.href = "../view/set-password.html";
			}
			if(index == 4) {
				location.href = "../view/set-divide.html";
			}
			$(this).parent().prev().addClass("active").siblings().removeClass("active");
		}
		e.stopPropagation();
	})

	//为左侧导航角色管理下拉菜单绑定单击事件
	$(document).on("click", ".icon-person-div p", function(e) {
		var index = $(this).index();
		$(this).addClass("open").siblings().removeClass("open");
		if($(this).hasClass("open")) {
			if(index == 0) {
				location.href = "../view/juese-admin.html";
			}
			if(index == 1) {
				location.href = "../view/juese-agent.html";
			}
			if(index == 2) {
				location.href = "../view/juese-check.html";
			}
			if(index == 3) {
				location.href = "../view/juese-salesman.html";
			}
			if(index == 4) {
				location.href = "../view/juese-trainer.html";
			}
			$(this).parent().prev().addClass("active").siblings().removeClass("active");
		}
		e.stopPropagation();
	})

	//为左侧导航数据管理下拉菜单绑定单击事件
	$(document).on("click", ".icon-data-div p", function(e) {
		var index = $(this).index();
		$(this).addClass("open").siblings().removeClass("open");
		if($(this).hasClass("open")) {
			if(index == 0) {
				location.href = "../view/data-daili.html";
			}
			if(index == 1) {
				location.href = "../view/data-market.html";
			}
			if(index == 2) {
				location.href = "../view/data-train.html";
			}
			if(index == 3) {
				location.href = "../view/data-vip.html";
			}
			$(this).parent().prev().addClass("active").siblings().removeClass("active");
		}
		e.stopPropagation();
	})

	//为左侧导航资金管理下拉菜单绑定单击事件
	$(document).on("click", ".icon-money-div p", function(e) {
		var index = $(this).index();
		$(this).addClass("open").siblings().removeClass("open");
		if($(this).hasClass("open")) {
			if(index == 0) {
				var state = 1; //0为平台 1为代理商 2为培训师
				if(state == 0) {
					location.href = "fund-platform.html";
				}

				if(state == 1) {
					location.href = "fund-daili.html";
				}

				if(state == 2) {
					location.href = "fund-trainer.html";
				}
			}
			if(index == 1) {
				location.href = "fund-money.html";
			}
			$(this).parent().prev().addClass("active").siblings().removeClass("active");
		}
		e.stopPropagation();
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