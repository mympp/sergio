/*
 *global
 */
var allPage = {};
allPage.renderDateSelector = function(initialValueStart, initialValueEnd) {
	var startSelector = rome(startDate, {
		time: false,
		initialValue: getDateStr(initialValueStart),
		dateValidator: rome.val.beforeEq(endDate),
		min: getDateStr(0)
	});
	var endSelector = rome(endDate, {
		time: false,
		initialValue: getDateStr(initialValueEnd),
		dateValidator: rome.val.afterEq(startDate),
		min: getDateStr(0)
	});
}

/*
 * new_addAd
 */
var addAdvert = {};
var prices = {};

var priceconfigs = {};
var price = 0;
var putprices = new Array();
var putpricesscenes = new Array();
var putpricesscenesarea = new Array();
var finalprice = 0;
addAdvert.zoneTypes = {};
addAdvert.sceneTypes = {};
addAdvert.sizeArr = ["800*120", "600*500", "640*270", "960*640", "600*300", "480*800", "640*960", "720*1280", "768*1024", "728*90", "468*60", "600*500", "1024*768", "1280*800", "1366*768", "1242*2208", "1080*1920", "1536*2048", "95*68", "1280*720", "600*600", "300*300", "960*150", "640*100", "480*75"];
addAdvert.bannerSizeArr = ["800*120", "600*500", "640*270", "960*640", "600*300", "480*800", "640*960", "720*1280", "768*1024", "728*90", "468*60", "600*500", "1024*768", "1280*800", "1366*768", "600*600", "300*300", "960*150", "640*100", "480*75"];
addAdvert.chapingSizeArr = ["600*500", "600*600"];
addAdvert.friendSizeArr = ["800*800", "800*640", "640*800"];
addAdvert.noticeSizeArr = ["72*72"];
addAdvert.kaipingSizeArr = ["600*500", "640*960", "480*800", "720*1280", "1080*1920", "1242*2208", "768*1024", "1536*2048", "1024*768", "1280*800", "1366*768", "600*600"];
addAdvert.infoSizeArr = ["95*68", "600*300", "600*500", "640*270", "960*640", "800*120", "640*960", "1280*720"];
addAdvert.step = 1;
addAdvert.imgUrls = {
	'img': []
};
addAdvert.init = function() {
	allPage.renderDateSelector(0);

	//this.getChildAccount();
	this.renderPage();
	this.bindStepEvent();
	// this.uploadImg();

	this.renderPiriodSelector("piriod-selector");

	$("input[name='promotion-position']").on("change", function() {
		var type = $("input[name='promotion-position']:checked").attr("id").replace("promotion-position-", "");
		//图片预览
		$(".preview-type").attr("class", "preview-type preview-type-" + type).html("");
		$("#infoflow_title").on("blur", function() {
			$(".info-preview-head").text($(this).val());
		});
		$("#infoflow_con").on("blur", function() {
			$(".info-preview-con").text($(this).val());
		});
		if (type == 0) {} else if (type == 1) {
			$(".preview-type").html('<div class="preview-img-container"></div>');
		} else if (type == 2) {
			$(".preview-type").html('<div class="preview-img-container"></div>');
		} else if (type == 3) {
			$(".preview-type").html('<div class="preview-img-container"></div>');
		} else if (type == 4) {
			$(".preview-type").html('<p class="info-preview-head">广告标题</p><p class="info-preview-con">广告内容</p>');
		} else if (type == 5) {
			$(".preview-type").html('<p class="info-preview-head">广告标题</p><p class="info-preview-con">广告内容</p><div class="preview-img-container"></div>');
		}

		if (type == 0) {
			$("#infoflow-box").hide();
			$("#infoflow-box input").prop("disabled", true);
			$(".img-tips").hide();
			$(".img-tip").show();
		} else if (type == 1) {
			$("#infoflow-box").hide();
			$("#infoflow-box input").prop("disabled", true);
			$(".img-tips").hide();
			$(".img-tip-chaping").show();
		} else if (type == 2) {
			$("#infoflow-box").hide();
			$("#infoflow-box input").prop("disabled", true);
			$(".img-tips").hide();
			$(".img-tip-kaiping").show();
		} else if (type == 3) {
			$("#infoflow-box").show();
			$("#infoflow-box input").prop("disabled", false);
			$(".img-tips").hide();
			$(".img-tip-box").show();
			$("#infoflow_con").attr("maxlength", "140").attr("placeholder", "信息流广告内容，140个字符以内");
		} else if (type == 4) {
			$("#infoflow-box").show();
			$("#infoflow-box input").prop("disabled", false);
			$(".img-tips").hide();
			$(".img-tip-notice").show();
			$("#infoflow_con").attr("maxlength", "30").attr("placeholder", "通知栏广告内容，30个字符以内");
		} else if (type == 5) {
			$("#infoflow-box").show();
			$("#infoflow-box input").prop("disabled", false);
			$(".img-tips").hide();
			$(".img-tip-friend").show();
			$("#infoflow_con").attr("maxlength", "50").attr("placeholder", "朋友圈广告内容，50个字符以内");
		} else {
			$("#infoflow-box").hide();
			$("#infoflow-box input").prop("disabled", true);
			$(".img-tips").hide();
			$(".img-tip").show();
		}
		//收费状态
		if (type == 0 || type == 1 || type == 2) {
			$(".account-type").hide();
			$("#account-type-0").show();
		} else if (type == 3) {
			$(".account-type").hide();
			$("#account-type-1").show();
		} else if (type == 4) {
			$(".account-type").hide();
			$("#account-type-2").show();
		} else if (type == 5) {
			$(".account-type").hide();
			$("#account-type-3").show();
		}
		if (USER_TYPE_ID != 2) {
			//通知栏
			if (type == 4) {
				$("#white-list").val("");
				$("#white-list-group").hide();
			} else {
				$("#white-list-group").show();
			}
			//朋友圈输入微信号
			if (type == 5) {
				$("#white-list").attr("placeholder", "请输入接受广告者的微信号，最多10条，按回车键换行");
			} else if (type == 3) {
				$("#white-list").attr("placeholder", "请输入接受广告者的手机号，最多10条，按回车键换行");
			} else {
				$("#white-list").attr("placeholder", "请输入接受广告者的QQ号码，最多10条，按回车键换行");
			}
		}
	});
}

//获取所有子账号
/*addAdvert.getChildAccount = function() {
	$.ajax({
		url: BASEURL + 'admin/api/ChildAccountGet',
		type: 'POST',
		dataType: 'json'
	})
	.done(function(data) {
		if(data.success) {
			var html = '';
			if(data.data.length <= 0){
				var html = '<li id="child-all" data-childid="undefined" data-phone="undefined"><a>暂无子账号</a></li>';
			}
			for(var i = 0; i < data.data.length; i++) {
				var userInfo = data.data[i];
				html += '<li data-childid="' + userInfo.uid + '" data-phone="' + userInfo.phone + '"><a>' + userInfo.phone + '</a></li>';
			}
			$("#child-account-select .dropdown-menu").html(html);
		}
	})
	.fail(function(data) {
		console.log("error");
	});
	$(document).on("click", "#child-account-select .dropdown-menu>li", function() {
		$(this).parents("#child-account-select").attr("data-childid", $(this).attr("data-childid"));
		addAdvert.reviewData();
	});
}*/


addAdvert.renderPiriodSelector = function(dom) {
	var html = [];
	var weekdayArr = ["", "星期一", "星期二", "星期三", "星期四", "星期五", "星期六", "星期日"];
	for (var i = 0; i < 8; i++) {
		html.push('<div class="piriod-weekday clearfix">');
		if (i == 0) {
			html.push('<div class="none-select fl">' + weekdayArr[i] + '</div>');
			for (var j = 0; j < 24; j++) {
				var space = "";
				if (j % 6 == 0) {
					space = " space";
				}
				html.push('<div class="piriod-select' + space + ' active fl"><span class="fa fa-arrow-down"></span></div>');
			}
		} else {
			html.push('<div class="weekday-select fl"><label><input type="checkbox" id="weekday-check-' + i + '" class="regular-checkbox" checked><label for="weekday-check-' + i + '"></label>' + weekdayArr[i] + '</label></div>');
			for (var j = 0; j < 24; j++) {
				var rowId = i - 1;
				var colId = j;
				var space = "";
				if (j % 6 == 0) {
					space = " space";
				}
				html.push('<div class="piriod-hour' + space + ' active fl" data-rowid="' + rowId + '" data-colid="' + colId + '">' + j + '</div>');
			}
		}

		html.push('</div>');
	}
	$("#" + dom).html(html.join(""));

	$("#" + dom).find(".weekday-select input[type='checkbox']").on("change", function() {
		var hour = $(this).parents(".weekday-select").siblings(".piriod-hour");
		if ($(this).prop("checked")) {
			hour.addClass("active");
		} else {
			hour.removeClass("active");
		}
	});
	$("#" + dom).find(".piriod-select").on("click", function() {
		var hour = $(this).parents(".piriod-selector").find(".piriod-weekday").find(".piriod-hour:eq(" + $(".piriod-select").index($(this)) + ")");
		$(this).toggleClass("active");
		if ($(this).hasClass("active")) {
			hour.addClass("active");
		} else {
			hour.removeClass("active");
		}
	});
	$("#" + dom).find(".piriod-hour").on("click", function() {
		if ($(this).hasClass("active")) {
			$(this).removeClass("active");
		} else {
			$(this).addClass("active");
		}
	});

	$("input[name='piriod']").on("change", function() {
		if ($("#piriod-1").prop("checked")) {
			$("#piriod-selector-box").addClass("active");
		} else {
			$("#piriod-selector-box").removeClass("active");
		}
	});
}

addAdvert.bindStepEvent = function() {
	if ($(".step-process>li").length > 0) {
		checkStep(addAdvert.step);
		$("#next-step").on("click", function() {
			if (addAdvert.step == 1) {
				/*if($("#child-account-select").attr("data-childid") == "") {
					layer.alert("请选择子账号");
					return;
				}*/
				if ($("#ad-name").val() == "") {
					layer.alert("请输入广告名称");
					return;
				}
				if ($("#startDate").val() == "") {
					layer.alert("请选择开始日期");
					return;
				}
				if (($("#daily-budget").val() == "")) {
					layer.alert("请输入您的每日预算");
					return;
				}
				/*if(($("#promotion-channel-0").prop("checked") && $("#daily-budget").val() == "")
					|| ($("#promotion-channel-1").prop("checked") && $("#daily-budget-box").val() == "")) {
					layer.alert("请输入您的每日预算");
					return;
				}
				if($("input[name='promotion-channel']:checked").length == 0) {
					layer.alert("请选择投放渠道");
					return;
				}*/
				if ($("#piriod-1").prop("checked") && $("#piriod-selector").find(".piriod-hour.active").length == 0) {
					layer.alert("请选择投放时段");
					return;
				}
				if ($("#hasTimeEnd").prop("checked") && $("#endDate").val() == "") {
					layer.alert("请选择结束日期");
					return;
				}
				$("#hasTimeEnd").on("change", function() {
					if ($(this).prop("checked")) {
						$("#endDate").prop("disabled", false);
					} else {
						$("#endDate").prop("disabled", true);
					}
				});
			}
			if (addAdvert.step == 2) {
				if ($("#areas-2").prop("checked") && $("#region-selector-box input[type='checkbox']:checked").length == 0) {
					layer.alert("请选择投放省市");
					return;
				}
				if ($("#areas-3").prop("checked") && $("#zone-selector-box input[type='checkbox']:checked").length == 0) {
					layer.alert("请选择投放行政区/商圈");
					return;
				}
				if ($("#scenes-2").prop("checked") && $("#scene-review-list").children("li").length == 0) {
					layer.alert("请选择推广场景");
					return;
				}
				if ($("#scenes-3").prop("checked") && $("#scene-diy-review-list").children("li").length == 0) {
					layer.alert("请选择推广场景");
					return;
				}
				//修复上传按钮移动端不能点击的问题
				$(".moxie-shim").css({
					left: 10,
					width: 122,
					height: 34
				});
			}
			//盒子复选框相关逻辑判断
			/*if(addAdvert.step == 1 && !$("#promotion-channel-0").prop("checked")) {
				addAdvert.step++;
			}*/
			addAdvert.step++;
			checkStep(addAdvert.step);
			addAdvert.reviewData();
		});
		$("#prev-step").on("click", function() {
			//盒子复选框相关逻辑判断
			/*if(addAdvert.step == 3 && !$("#promotion-channel-0").prop("checked")) {
				addAdvert.step--;
			}*/
			addAdvert.step--;
			checkStep(addAdvert.step);
			addAdvert.reviewData();
		});
		$("#save-step").on("click", function() {
			if (addAdvert.imgUrls.img.length == 0) {
				layer.alert("请上传推广图片");
				return false;
			}
			if ($("#promotion-position-3").prop("checked") && $("#infoflow_title").val() && $("#infoflow_title").val().length < 6) {
				layer.alert("信息流标题不能少于6个字符");
				return false;
			}
			if ($("#add-ad-url").val() == "") {
				layer.alert("请输入推广链接");
				return false;
			}
			addAdvert.bindDataEvent(); //组装返回数据
		});
	}

	function checkStep(step) {
		$(window).scrollTop(0);
		$(".step-process").children("li").removeClass("active");
		$(".step-process").children("li").eq(step - 1).addClass("active");
		$(".add-ad-step").removeClass("active");
		$(".add-ad-step" + step).addClass("active");
		if (step == 1) {
			$("#prev-step").hide();
			$("#next-step").show();
			$("#save-step").hide();
			$(".step-process").children("li").removeClass("done");
		} else if (step == $(".step-process>li").length) {
			$("#prev-step").show();
			$("#next-step").hide();
			$("#save-step").show();
			$(".step-process").children("li").addClass("done");
			$(".step-process").children("li").last().removeClass("done");
		} else {
			$("#prev-step").show();
			$("#next-step").show();
			$("#save-step").hide();
			$(".step-process").children("li").removeClass("done");
			$(".step-process").children("li:lt(" + (step - 1) + ")").addClass("done");
		}
	}
}

addAdvert.renderPage = function() {
	//$('.loading-area').fadeIn();
	// if (window.location.href.indexOf('agentAddAdvert') > 0) {
	var ajax_url = "advert/renderAdvertDB.do?rand=" + Math.random() * 1000;
	// } else {
	// var ajax_url = "advert/renderAdvertBox.do";
	// }
	$.ajax({
			url: BASEURL + ajax_url,
			type: 'GET',
			dataType: 'json'
		})
		.done(function(data) {
			// console.log(JSON.stringify(data));
			priceconfigs = data.priceconfigs;
			prices = data.prices;
			console.log("priceconfigs:" + JSON.stringify(priceconfigs));
			console.log("prices:" + JSON.stringify(prices));
			if (data.success) {
				addAdvert.zoneTypes = data.result.areaJson;
				addAdvert.sceneTypes = data.result.sceneJson;
				addAdvert.scenesMessage = data.result.scenesMessage;
				for (var key in data.result) {
					if (key == "areas" || key == "scenes") {
						// console.log(data.result[key]);
						$(".add-ad-step2").append(makeRadiobox(key, data.result[key]));
					} else if (key == "areaJson") {
						getRegionBox();
					} else if (key == "sceneJson") {
						getSceneBox();
					} else if (key == "scenesMessage") {
						getDiySceneBox();
					} else if (key == "adPrice") {
						/*$("#advert-price").text(data.result.adPrice.advertise_price);
						$("#flow-price").text(data.result.adPrice.flow_information_price);
						$("#circle-price").text(data.result.adPrice.circle_friends_price);
						$("#notice-price").text(data.result.adPrice.notice_board_price);*/
					} else {
						$(".add-ad-step2").append(makeCheckbox(key, data.result[key]));
					}
				}
				if (USER_TYPE_ID != 2) {
					$(".add-ad-step2").append($("#white-list-group").detach());
					var input = document.getElementById("add-txt");

					$("#white-list").on("input", function() {
						var arr = $(this).val().split("\n");
						var result = [];
						var len = arr.length > 10 ? 10 : arr.length; //多于10条的过滤
						for (var i = 0; i < len; i++) {
							result.push(arr[i]);
						}
						$(this).val(result.join("\n"));
					});
					if (typeof FileReader === 'undefined') {
						layer.alert("抱歉，你的浏览器不支持读取TXT文件的功能");
						input.setAttribute('disabled', 'disabled');
					} else {
						// input.addEventListener('change', readFile, false);
					}
				}



				addAdvert.bindSelectEvent();
				addAdvert.getRegionSelector("#region-selector-box", addAdvert.zoneTypes);
				addAdvert.getZoneDropdown();
				addAdvert.bindRegionEvent();

				addAdvert.getSceneSelector("#scene-selector-box", addAdvert.sceneTypes);
				addAdvert.bindSceneEvent();
				addAdvert.getDiySceneSelector("#scene-diy-selector-box", addAdvert.scenesMessage);
				addAdvert.bindDiySceneEvent();

				//$('.loading-area').fadeOut();
			}
		})
		.fail(function() {
			console.log("error");
		});
	addAdvert.reviewData();

	function readFile() {
		var file = this.files[0];
		var reader = new FileReader();
		reader.readAsText(file, "UTF-8");
		reader.onload = function(e) {
			$("#white-list").show();
			$("#white-list").val(this.result);
			$("#white-list").click();
		}
	}

	function makeCheckbox(key, data) {
		var html = '<div class="form-group"><label>' + data.name + '</label><div>';
		for (var i = 0, len = data.data.length; i < len; i++) {
			if (i == 0) {
				html += '<label class="radio-inline pointer select-all">';
				html += '	<input name="' + key + '" id="' + key + '-all" class="regular-radio" data-key="' + data.data[i].key + '" type="radio" value="' + data.data[i].id + '" checked="">';
				html += '	<label for="' + key + '-all"></label>';
				html += '	<span class="radio-name">' + data.data[i].text + '</span>';
				html += '</label>';
			} else {
				html += '<label class="checkbox-inline pointer select">';
				html += '	<input name="' + key + '" id="' + key + '-' + data.data[i].id + '" class="regular-checkbox" data-key="' + data.data[i].key + '"  type="checkbox" value="' + data.data[i].id + '">';
				html += '	<label for="' + key + '-' + data.data[i].id + '"></label>';
				html += '	<span class="checkbox-name">' + data.data[i].text + '</span>';
				html += '</label>';
			}
		}
		html += '</div></div>';
		return html;
	}

	function makeRadiobox(key, data) {
		var html = '<div class="form-group"><label>' + data.name + '</label><div>';
		if (key == 'scenes') {
			html += '<label class="radio-inline pointer select-all">';
			html += '	<input name="' + key + '" id="' + key + '-all" class="regular-radio" data-key="' + data.data[0].key + '"  type="radio" value="' + data.data[0].id + '" checked="">';
			html += '	<label for="' + key + '-all"></label>';
			html += '	<span class="radio-name">' + data.data[0].text + '</span>';
			html += '</label>';
			for (var i = data.data.length - 1; i >= 1; i--) {
				html += '<label class="radio-inline pointer select">';
				html += '	<input name="' + key + '" id="' + key + '-' + data.data[i].id + '" class="regular-radio"  data-key="' + data.data[i].key + '" type="radio" value="' + data.data[i].id + '">';
				html += '	<label for="' + key + '-' + data.data[i].id + '"></label>';
				html += '	<span class="radio-name">' + data.data[i].text + '</span>';
				html += '</label>';
			}
		} else {
			for (var i = 0, len = data.data.length; i < len; i++) {
				if (i == 0) {
					html += '<label class="radio-inline pointer select-all">';
					html += '	<input name="' + key + '" id="' + key + '-all" class="regular-radio" data-key="' + data.data[i].key + '"  type="radio" value="' + data.data[i].id + '" checked="">';
					html += '	<label for="' + key + '-all"></label>';
					html += '	<span class="radio-name">' + data.data[i].text + '</span>';
					html += '</label>';
				} else {
					html += '<label class="radio-inline pointer select">';
					html += '	<input name="' + key + '" id="' + key + '-' + data.data[i].id + '" class="regular-radio" data-key="' + data.data[i].key + '"  type="radio" value="' + data.data[i].id + '">';
					html += '	<label for="' + key + '-' + data.data[i].id + '"></label>';
					html += '	<span class="radio-name">' + data.data[i].text + '</span>';
					html += '</label>';
				}
			}
		}
		html += '</div></div>';
		return html;
	}

	function getRegionBox() {
		$(".add-ad-step2").append($("#region-selector-box").detach());
		$(".add-ad-step2").append($("#zone-selector-box").detach());
	}

	function getSceneBox() {
		$(".add-ad-step2").append($("#scene-selector-box").detach());
	}

	function getDiySceneBox() {
		$(".add-ad-step2").append($("#scene-diy-selector-box").detach());
	}
}



addAdvert.isDirect = function(text) {
	var isDirect = text == '北京市' || text == '上海市' || text == '天津市' || text == '重庆市' || text == '澳门特别行政区' || text == '香港特别行政区' || text == '台湾省';
	return isDirect;
}


addAdvert.bindSelectEvent = function() {
	$("#hasTimeEnd").on("change", function() {
		if ($(this).prop("checked")) {
			$("#endDate").prop("disabled", false);
		} else {
			$("#endDate").val("");
			$("#endDate").prop("disabled", true);
		}
	});

	$(".select-all>input").on("change", function() {
		if ($(this).prop("checked")) {
			$(this).parent().siblings(".select").children("input").prop("checked", false);
		}
	});
	$(".select-all").siblings(".select").children("input[type=checkbox]").on("change", function() {
		var checked = $(this).parent().parent().children(".select").children("input[type=checkbox]:checked");
		var children = $(this).parent().parent().children(".select").children("input[type=checkbox]");
		var all = $(this).parent().siblings(".select-all").children("input");
		if (checked.length == 0 || checked.length == children.length) {
			all.prop("checked", true);
			children.prop("checked", false);
		} else {
			all.prop("checked", false);
		}
		addAdvert.reviewData();
	});
	$("#areas-2").on("change", function() {
		if ($(this).prop("checked")) {
			$("#zone-selector-box").removeClass("active");
			$("#region-selector-box").addClass("active");
		} else {
			$("#region-selector-box").removeClass("active");
		}
		addAdvert.reviewData();
	});
	$("#areas-3").on("change", function() {
		if ($(this).prop("checked")) {
			// console.log("regular-checkbox:"+$(this).val());
			$("#region-selector-box").removeClass("active");
			$("#zone-selector-box").addClass("active");
		} else {
			$("#zone-selector-box").removeClass("active");
		}
		addAdvert.reviewData();
	});
	$("#areas-all").on("change", function() {
		if ($(this).prop("checked")) {
			// console.log("regular-checkbox:"+$(this).val());
			$("#region-selector-box").removeClass("active");
			$("#zone-selector-box").removeClass("active");
		}
		addAdvert.reviewData();
	});
	$("#scenes-2").on("change", function() {
		if ($(this).prop("checked")) {
			$("#scene-diy-selector-box").removeClass("active");
			$("#scene-selector-box").addClass("active");
		} else {
			$("#scene-selector-box").removeClass("active");
		}
	});
	$("#scenes-3").on("change", function() {
		if ($(this).prop("checked")) {
			$("#scene-selector-box").removeClass("active");
			$("#scene-diy-selector-box").addClass("active");
		} else {
			$("#scene-diy-selector-box").removeClass("active");
		}
	});
	$("#scenes-all").on("change", function() {
		if ($(this).prop("checked")) {
			$("#scene-selector-box").removeClass("active");
			$("#scene-diy-selector-box").removeClass("active");
		}
	});

	$(".form-group input").on("change blur", function() {
		addAdvert.reviewData();
	});

	$("#img-review").on("click", ".close-btn", function(event) {
		event.stopPropagation();
		if ($(this).parents("li").index() == $("#img-review").find("li").length - 1) {
			$('.preview-img-container').empty();
		}
		$(this).parents("li").remove();
		addAdvert.imgUrls.img.splice($(this).parents("li").index(), 1);
		$("#img-count").text(addAdvert.imgUrls.img.length);
	});
	$("#img-review").on("click", ".close-all-btn", function() {
		layer.confirm("确认删除全部广告？", {
			btn: ['确定', '取消'] //按钮
		}, function() {
			$("#img-review").children("ul").empty();
			$('.preview-img-container').empty();
			addAdvert.imgUrls.img = [];
			$("#img-count").text(0);
			layer.msg("删除成功", {
				time: 1000
			});
		}, function() {});
	});
	//点击预览
	$("#img-review").on("click", "li", function() {
		var img = $(this).children(".img-review-pic");
		$(".preview-img-container").html(img.html());
	});

	$("#ad-name").on("propertychange input", function() {
		if ($(this).val().length > 20) {
			$(this).val($(this).val().substring(0, 20));
		}
	});
	$("#daily-budget").on("propertychange input", function() {
		if (isNaN($(this).val())) {
			$(this).val("");
			layer.alert("请输入数字");
		}
	});
	$("#daily-budget").on("blur", function() {
		if (!isNaN($(this).val()) && parseInt($(this).val()) < 1000) {
			$(this).val("");
			layer.alert("请输入大于等于1000的数字");
			return;
		}
		if (!isNaN(parseInt($(this).val()))) {
			$(this).val(parseInt($(this).val()));
		}
	});
	$("#promotion-frequency").on("blur", function() {
		if (isNaN($(this).val()) || $(this).val() == "") {
			$(this).val("1");
			layer.alert("请输入数字");
		}
	});

	$("#tab-phone").on("click", function() {
		$(".preview-tab").removeClass("active");
		$(this).addClass("active");
		$(".preview-content").removeClass("active");
		$(".preview-phone").addClass("active");
	});
	$("#tab-pad").on("click", function() {
		$(".preview-tab").removeClass("active");
		$(this).addClass("active");
		$(".preview-content").removeClass("active");
		$(".preview-pad").addClass("active");
	});

	$(".scene-clear").on("click", function() {
		$(this).siblings(".scene-review-list").empty();
	});
}

addAdvert.getRegionSelector = function(dom, data) {
	var province = data;
	var html = "";
	var reviewHtml = "";
	if (province != undefined) {
		for (var i = 0, ilen = province.length; i < ilen; i++) {
			var name = province[i].text.replace(/市|省|壮族|回族|维吾尔|自治区|特别行政区/g, "");
			html += '<li title="' + name + '"><label class="checkbox-inline pointer"><input  data-key=\"' + province[i].key + '\" name="region" id="region-province-' + province[i].id + '" class="regular-checkbox region-lv1" type="checkbox" value="' + province[i].id + '"><label for="region-province-' + province[i].id + '"></label><span class="checkbox-name">' + name + '</span></label>';
			reviewHtml += '<li title="' + name + '" data-rid="region-province-' + province[i].id + '" data-key=\"' + province[i].key + '\"><p>' + name + '<span class="fa fa-close pointer"></span></p>';
			var isDirect = addAdvert.isDirect(province[i].text);
			// console.log("province[i].text:"+province[i].text+" isDirect:"+isDirect)
			if (!isDirect && province[i].put_city != undefined) {
				var city = province[i].put_city;
				html += '<ul class="city-select-list">';
				reviewHtml += '<ul class="city-review-list clearfix">';
				for (var j = 0, jlen = city.length; j < jlen; j++) {
					html += '<li title="' + city[j].text + '"><label class="checkbox-inline pointer"><input  data-key=\"' + city[j].key + '\" name="region" id="region-city-' + city[j].id + '" class="regular-checkbox region-lv2" type="checkbox" value="' + city[j].id + '"><label for="region-city-' + city[j].id + '"></label><span class="checkbox-name">' + city[j].text + '</span></label></li>';
					reviewHtml += '<li title="' + city[j].text + '" data-rid="region-city-' + city[j].id + '" class="fl" data-key=\"' + city[j].key + '\">' + city[j].text + '<span class="fa fa-close pointer"></span></li>';
				}
				html += '</ul>';
				reviewHtml += '</ul>';
			}

			html += '</li>';
			reviewHtml += '</li>';
		}
	}

	$(dom + " .region-select-list").html(html);
	$(dom + " .region-review-list").html(reviewHtml);
}

addAdvert.getZoneSelector = function(dom, data) {
	var city = data.put_area != undefined ? data.put_area : data.put_city;
	var html = "";
	var reviewHtml = "";

	for (var i = 0, ilen = city.length; i < ilen; i++) {
		var name = city[i].text;
		html += '<li title="' + name + '"><label class="checkbox-inline pointer"><input name="region" id="region-area-' + city[i].id + '" class="regular-checkbox region-lv1" type="checkbox" value="' + city[i].id + '"><label for="region-area-' + city[i].id + '"></label><span class="checkbox-name">' + name + '</span></label>';
		reviewHtml += '<li title="' + name + '" data-rid="region-area-' + city[i].id + '"><p>' + name + '<span class="fa fa-close pointer"></span></p>';

		var zone = city[i].put_zone != undefined ? city[i].put_zone : city[i].put_area;
		html += '<ul class="city-select-list">';
		reviewHtml += '<ul class="city-review-list clearfix">';
		for (var j = 0, jlen = zone.length; j < jlen; j++) {
			html += '<li title="' + zone[j].text + '"><label class="checkbox-inline pointer"><input name="region" id="region-zone-' + zone[j].id + '" class="regular-checkbox region-lv2" type="checkbox" value="' + zone[j].id + '"><label for="region-zone-' + zone[j].id + '"></label><span class="checkbox-name">' + zone[j].text + '</span></label></li>';
			reviewHtml += '<li title="' + zone[j].text + '" data-rid="region-zone-' + zone[j].id + '" class="fl">' + zone[j].text + '<span class="fa fa-close pointer"></span></li>';
		}
		html += '</ul>';
		reviewHtml += '</ul>';

		html += '</li>';
		reviewHtml += '</li>';
	}


	$(dom + " .region-select-list").html(html);
	$(dom + " .region-review-list").html(reviewHtml);
}

addAdvert.getZoneDropdown = function() {
	var province = this.zoneTypes;
	var html = "";
	for (var i = 0, ilen = province.length; i < ilen; i++) {
		if (i == 0) {
			$("#province-dropdown .dropdown-toggle").html("请选择省份");
			//$("#province-dropdown .dropdown-toggle").parent().attr("data-provinceid", province[i].id);
		}
		html += '<li data-provinceId="' + province[i].id + '">' + province[i].text + '</li>';

	}
	$("#province-dropdown .dropdown-menu").html(html);

	//addAdvert.getZoneList(addAdvert.zoneTypes[0]);
	this.bindZoneEvent();
}

addAdvert.getZoneCityDropdown = function(data) {
	var city = data.put_city;
	var html = "";
	for (var i = 0, ilen = city.length; i < ilen; i++) {
		if (i == 0) {
			$("#city-dropdown .dropdown-toggle").html("请选择城市");
			//$("#city-dropdown .dropdown-toggle").parent().attr("data-cityId", city[i].id);
		}
		html += '<li data-cityId="' + city[i].id + '">' + city[i].text + '</li>';
	}
	$("#city-dropdown .dropdown-menu").html(html);
	//addAdvert.getZoneList(city[0]);
	this.bindZoneCityEvent(city);
}

addAdvert.bindZoneEvent = function() {
	$(document).on("click", "#province-dropdown .dropdown-menu>li", function() {
		var data = addAdvert.zoneTypes[$(this).index()];
		if (addAdvert.isDirect(data.text)) {
			addAdvert.getZoneList(data);
			$(".region-select-all input").prop("checked", false);
			$("#city-dropdown").hide();
		} else {
			addAdvert.getZoneCityDropdown(data);
			$(".region-select-all input").prop("checked", false);
			$("#zone-selector-box .region-review-list").empty();
			$("#zone-selector-box .region-select-list").empty();
			$("#city-dropdown").show();
		}
		$(this).parents(".dropdown-click").attr("data-provinceid", $(this).attr("data-provinceid"));
	});
}

addAdvert.bindZoneCityEvent = function(cityData) {
	$(document).on("click", "#city-dropdown .dropdown-menu>li", function() {
		var data = cityData[$(this).index()];
		addAdvert.getZoneList(data);
		$(this).parents(".dropdown-click").attr("data-cityid", $(this).attr("data-cityid"));
	});
}

addAdvert.bindRegionEvent = function() {
	$(".region-select-all input").on("change", function() {
		if ($(this).prop("checked")) {
			$(this).parents(".region-select-all").siblings(".region-select-list").find("input").prop("checked", true);
			//review
			$(this).parents(".region-selector-box").find(".region-review-list li").addClass("review-show");
		} else {
			$(this).parents(".region-select-all").siblings(".region-select-list").find("input").prop("checked", false);
			//review
			$(this).parents(".region-selector-box").find(".region-review-list li").removeClass("review-show");
		}
	});

	$(".region-select-list").on("change", ".region-lv1", function() {
		$(this).removeClass("check-half");
		if ($(this).prop("checked")) {
			//判断同级标签勾选个数决定是否勾选全选按钮
			if ($(this).parents(".region-select-list").find(".region-lv1").length == $(this).parents(".region-select-list").find(".region-lv1:checked").length) {
				$(this).parents(".region-select-list").siblings(".region-select-all").find("input").prop("checked", true);
			}
			//勾选二级按钮
			$(this).parent().siblings(".city-select-list").find(".region-lv2").prop("checked", true);
			//review
			$(this).parents(".region-selector-box").find(".region-review-list li[data-rid=" + $(this).attr("id") + "]").addClass("review-show");
			$(this).parents(".region-selector-box").find(".region-review-list li[data-rid=" + $(this).attr("id") + "] li").addClass("review-show");
		} else {
			$(this).parents(".region-select-list").siblings(".region-select-all").find("input").prop("checked", false);
			$(this).parent().siblings(".city-select-list").find(".region-lv2").prop("checked", false);
			//review
			$(this).parents(".region-selector-box").find(".region-review-list li[data-rid=" + $(this).attr("id") + "]").removeClass("review-show");
			$(this).parents(".region-selector-box").find(".region-review-list li[data-rid=" + $(this).attr("id") + "] li").removeClass("review-show");
		}
		addAdvert.reviewData();
	});

	$(".region-select-list").on("change", ".region-lv2", function() {
		if ($(this).prop("checked")) {
			//判断同级标签个数决定是否勾选父一级标签
			$(this).parents(".city-select-list").parent().find(".region-lv1").prop("checked", true);
			//判断一级标签勾选个数决定是否勾选全选按钮
			if ($(this).parents(".region-select-list").find("input").length == $(this).parents(".region-select-list").find("input:checked").length) {
				$(this).parents(".region-select-list").siblings(".region-select-all").find("input").prop("checked", true);
			}
			//review
			$(this).parents(".region-selector-box").find(".region-review-list li[data-rid=" + $(this).attr("id") + "]").addClass("review-show");
			$(this).parents(".region-selector-box").find(".region-review-list li[data-rid=" + $(this).attr("id") + "]").parents("li").addClass("review-show");
		} else {
			if ($(this).parents(".city-select-list").find(".region-lv2:checked").length == 0) {
				$(this).parents(".city-select-list").parent().find(".region-lv1").prop("checked", false);
			}
			$(this).parents(".region-select-list").siblings(".region-select-all").find("input").prop("checked", false);
			//review
			$(this).parents(".region-selector-box").find(".region-review-list li[data-rid=" + $(this).attr("id") + "]").removeClass("review-show");
			if ($(this).parents(".region-selector-box").find(".region-review-list li[data-rid=" + $(this).attr("id") + "]").siblings(".review-show").length == 0) {
				$(this).parents(".region-selector-box").find(".region-review-list li[data-rid=" + $(this).attr("id") + "]").parents("li").removeClass("review-show");
			}
		}
		if ($(this).parents(".city-select-list").find(".region-lv2").length != $(this).parents(".city-select-list").find(".region-lv2:checked").length && $(this).parents(".city-select-list").find(".region-lv2:checked").length != 0) {
			$(this).parents(".city-select-list").parent().find(".region-lv1").addClass("check-half");
		} else {
			$(this).parents(".city-select-list").parent().find(".region-lv1").removeClass("check-half");
		}
		addAdvert.reviewData();
	});

	$(document).off("click", ".review-show span").on("click", ".review-show span", function() {
		var rid = $(this).parents(".review-show").attr("data-rid");
		//console.log($("#region-" + rid));
		$("#" + rid).click();
	});
}

addAdvert.getZoneList = function(data) {
	//var zoneTypes = this.zoneTypes;
	//var data = zoneTypes.children[0];
	this.getZoneSelector("#zone-selector-box", data);
}

addAdvert.getSceneSelector = function(dom, data) {
	if (data == null) {
		return;
	}
	var parents = data;
	var html = "";
	var reviewHtml = "";
	var circle_class = "";
	for (var i = 0, ilen = parents.length; i < ilen; i++) {
		var lv2 = data[i].children;
		circle_class = lv2 ? "fa-plus-circle pointer" : "fa-circle";
		html += '<li class="tree-select tree-lv1-select"><div class="tree-parent tree-lv1-parent"><span class="tree-toggle fa ' + circle_class + '"></span><span class="parent-name" id="scene-' + parents[i].id + '">' + parents[i].name + '</span></div>';
		if (lv2 != null) {
			html += '<ul class="tree-children tree-lv1-children">';
			for (var j = 0, jlen = lv2.length; j < jlen; j++) {
				var lv3 = lv2[j].children;
				circle_class = lv3 ? "fa-plus-circle pointer" : "fa-circle";
				html += '<li class="tree-select tree-lv2-select"><div class="tree-parent tree-lv2-parent"><span class="tree-toggle fa ' + circle_class + '"></span><span class="parent-name" id="scene-' + lv2[j].id + '">' + lv2[j].name + '</span></div>';
				if (lv3 != null) {
					html += '<ul class="tree-children tree-lv2-children">';
					for (var k = 0, klen = lv3.length; k < klen; k++) {
						html += '<li class="tree-select tree-lv3-select"><div class="tree-parent tree-lv3-parent"><span class="tree-toggle fa fa-circle"></span><span class="parent-name" id="scene-' + lv3[k].id + '">' + lv3[k].name + '</span></div></li>';
					}
					html += "</ul>";
				}
				html += "</li>";
			}
			html += '</ul>';
		}
		html += '</li>';
	}

	$(dom + " .trees").html(html);

	/*	var tree = {};
		tree.children = data;
		tree.name = "root";

		function traverse(jsonObj) {
			if( typeof jsonObj == "object" ) {
				$.each(jsonObj, function(k, v) {
					// k is either an array index or object key
						console.log(k +""+ v);
					traverse(v);
				});
			} else {
				// jsonOb is a number or string
			}
		}
		traverse(tree);*/
}

addAdvert.getDiySceneSelector = function(dom, data) {
	if (data == null) {
		return;
	}
	if (data instanceof Array) { //普通
		var parents = data;
		if (parents != null) {
			var html = "";
			var reviewHtml = "";
			for (var i = 0, ilen = parents.length; i < ilen; i++) {
				html += '<li class="tree-select"><div class="tree-parent"><span class="parent-name" data-key="' + parents[i].key + '" id="scene-diy-' + parents[i].scenes_id + '">' + parents[i].current_name + '</span></div>';

				/*var leaves = data[parents[i].scenes_id];
				html += '<ul class="tree-children">';
				for(var j = 0, jlen = leaves.length; j < jlen; j++) {
					html += '<li><span class="child-name" id="scene-' + leaves[j].scenes_id + '">' + leaves[j].scenes_name + '</span></li>';
				}
				html += '</ul>';*/

				html += '</li>';
			}
		}
	} else { //包含子账号
		var parents = data.selfScenes;
		if (parents != null) {
			var html = "<li class='tree-tag'>本账号场景</li>";
			var reviewHtml = "";
			for (var i = 0, ilen = parents.length; i < ilen; i++) {
				html += '<li class="tree-select"><div class="tree-parent"><span class="parent-name" data-key="' + parents[i].key + '" id="scene-diy-' + parents[i].scenes_id + '">' + parents[i].current_name + '</span></div>';

				/*var leaves = data[parents[i].scenes_id];
				html += '<ul class="tree-children">';
				for(var j = 0, jlen = leaves.length; j < jlen; j++) {
					html += '<li><span class="child-name" id="scene-' + leaves[j].scenes_id + '">' + leaves[j].scenes_name + '</span></li>';
				}
				html += '</ul>';*/

				html += '</li>';
			}
		}
		parents = data.subScenes;
		if (parents != null) {
			html += "<li class='tree-tag'>子账号场景</li>";
			for (var i = 0, ilen = parents.length; i < ilen; i++) {
				html += '<li class="tree-select"><div class="tree-parent"><span class="parent-name" data-key="' + parents[i].key + '" id="scene-diy-' + parents[i].scenes_id + '">' + parents[i].current_name + '</span></div>';

				/*var leaves = data[parents[i].scenes_id];
				html += '<ul class="tree-children">';
				for(var j = 0, jlen = leaves.length; j < jlen; j++) {
					html += '<li><span class="child-name" id="scene-' + leaves[j].scenes_id + '">' + leaves[j].scenes_name + '</span></li>';
				}
				html += '</ul>';*/

				html += '</li>';
			}
		}
	}
	$(dom + " .trees").html(html);
}

addAdvert.bindSceneEvent = function() {
	$("#scene-selector-box").find(".tree-select>.tree-parent").on("click", function(event) {
		event.stopPropagation();

		if ($(this).hasClass("tree-lv1-parent")) {
			var htmlOuter = '';
			var html = '';
			var lv1Li = $(this).parent(".tree-select");
			var lv1Dom = lv1Li.children(".tree-parent").children(".parent-name");
			var lv1Sid = lv1Dom.attr("id").replace(/scene-/g, "");
			var lv1Name = lv1Dom.text();
			var lv2len = lv1Li.children(".tree-children").children(".tree-select").length;
			htmlOuter += '<li data-sid="' + lv1Sid + '">';
			html += '<p class="parent-name">' + lv1Name + '<span class="fa fa-close pointer fr"></span></p><ul class="scene-children-review-list">';
			for (var i = 0; i < lv2len; i++) {
				var lv2Li = lv1Li.children(".tree-children").children(".tree-select").eq(i);
				var lv2Dom = lv2Li.children(".tree-parent").children(".parent-name");
				var lv2Sid = lv2Dom.attr("id").replace(/scene-/g, "");
				var lv2Name = lv2Dom.text();
				var lv3len = lv2Li.children(".tree-children").children(".tree-select").length;
				html += '<li data-sid="' + lv2Sid + '"><p class="parent-name">' + lv2Name + '<span class="fa fa-close pointer fr"></span></p><ul class="scene-children-review-list">';
				for (var j = 0; j < lv3len; j++) {
					var lv3Li = lv2Li.children(".tree-children").children(".tree-select").eq(j);
					var lv3Dom = lv3Li.children(".tree-parent").children(".parent-name");
					var lv3Sid = lv3Dom.attr("id").replace(/scene-/g, "");
					var lv3Name = lv3Dom.text();
					html += '<li title="' + lv3Name + '" data-sid="' + lv3Sid + '"><p class="parent-name">' + lv3Name + '<span class="fa fa-close pointer fr"></span></p></li>';
				}
				html += '</ul></li>';
			}
			html += '</ul>';
			htmlOuter += html + '</li>';

			if ($("#scene-review-list li[data-sid=" + lv1Sid + "]").length == 0) {
				$("#scene-review-list").append(htmlOuter);
			} else {
				$("#scene-review-list li[data-sid=" + lv1Sid + "]").html(html);
			}
		} else if ($(this).hasClass("tree-lv2-parent")) {
			var html1 = '';
			var html2 = '';
			var html2Outer = '';
			var lv1Li = $(this).parents(".tree-lv1-select");
			var lv1Dom = lv1Li.children(".tree-parent").children(".parent-name");
			var lv1Sid = lv1Dom.attr("id").replace(/scene-/g, "");
			var lv1Name = lv1Dom.text();
			var lv2len = lv1Li.children(".tree-children").children(".tree-select").length;
			html1 += '<li data-sid="' + lv1Sid + '"><p class="parent-name">' + lv1Name + '<span class="fa fa-close pointer fr"></span></p><ul class="scene-children-review-list">';

			var lv2Li = $(this).parent(".tree-select");
			var lv2Dom = lv2Li.children(".tree-parent").children(".parent-name");
			var lv2Sid = lv2Dom.attr("id").replace(/scene-/g, "");
			var lv2Name = lv2Dom.text();
			var lv3len = lv2Li.children(".tree-children").children(".tree-select").length;
			html2Outer += '<li data-sid="' + lv2Sid + '">';
			html2 += '<p class="parent-name">' + lv2Name + '<span class="fa fa-close pointer fr"></span></p><ul class="scene-children-review-list">';
			for (var j = 0; j < lv3len; j++) {
				var lv3Li = lv2Li.children(".tree-children").children(".tree-select").eq(j);
				var lv3Dom = lv3Li.children(".tree-parent").children(".parent-name");
				var lv3Sid = lv3Dom.attr("id").replace(/scene-/g, "");
				var lv3Name = lv3Dom.text();
				html2 += '<li title="' + lv3Name + '" data-sid="' + lv3Sid + '"><p class="parent-name">' + lv3Name + '<span class="fa fa-close pointer fr"></span></p></li>';
			}
			html2 += '</ul>';
			html2Outer += html2 + '</li>';

			html1 += html2Outer;
			html1 += '</ul></li>';

			if ($("#scene-review-list li[data-sid=" + lv1Sid + "]").length == 0) {
				$("#scene-review-list").append(html1);
			} else {
				if ($("#scene-review-list li[data-sid=" + lv2Sid + "]").length == 0) {
					$("#scene-review-list li[data-sid=" + lv1Sid + "]>.scene-children-review-list").append(html2Outer);
				} else {
					$("#scene-review-list li[data-sid=" + lv2Sid + "]").html(html2);
				}
			}
		} else if ($(this).hasClass("tree-lv3-parent")) {
			var html1 = "";
			var html2 = "";
			var html3 = "";
			var html3Outer = "";
			var lv1Li = $(this).parents(".tree-lv1-select");
			var lv1Dom = lv1Li.children(".tree-parent").children(".parent-name");
			var lv1Sid = lv1Dom.attr("id").replace(/scene-/g, "");
			var lv1Name = lv1Dom.text();
			var lv2len = lv1Li.children(".tree-children").children(".tree-select").length;
			html1 += '<li data-sid="' + lv1Sid + '"><p class="parent-name">' + lv1Name + '<span class="fa fa-close pointer fr"></span></p><ul class="scene-children-review-list">';

			var lv2Li = $(this).parents(".tree-lv2-select");
			var lv2Dom = lv2Li.children(".tree-parent").children(".parent-name");
			var lv2Sid = lv2Dom.attr("id").replace(/scene-/g, "");
			var lv2Name = lv2Dom.text();
			var lv3len = lv2Li.children(".tree-children").children(".tree-select").length;
			html2 += '<li data-sid="' + lv2Sid + '"><p class="parent-name">' + lv2Name + '<span class="fa fa-close pointer fr"></span></p><ul class="scene-children-review-list">';

			var lv3Li = $(this).parent(".tree-select");
			var lv3Dom = lv3Li.children(".tree-parent").children(".parent-name");
			var lv3Sid = lv3Dom.attr("id").replace(/scene-/g, "");
			var lv3Name = lv3Dom.text();
			html3Outer += '<li title="' + lv3Name + '" data-sid="' + lv3Sid + '">';
			html3 += '<p class="parent-name">' + lv3Name + '<span class="fa fa-close pointer fr"></span></p>';
			html3Outer += html3 + '</li>';

			html2 += html3Outer;
			html2 += '</ul></li>';

			html1 += html2;
			html1 += '</ul></li>';

			if ($("#scene-review-list li[data-sid=" + lv1Sid + "]").length == 0) {
				$("#scene-review-list").append(html1);
			} else {
				if ($("#scene-review-list li[data-sid=" + lv2Sid + "]").length == 0) {
					$("#scene-review-list li[data-sid=" + lv1Sid + "]>.scene-children-review-list").append(html2);
				} else {
					if ($("#scene-review-list li[data-sid=" + lv3Sid + "]").length == 0) {
						$("#scene-review-list li[data-sid=" + lv2Sid + "]>.scene-children-review-list").append(html3Outer);
					} else {
						$("#scene-review-list li[data-sid=" + lv3Sid + "]").html(html3);
					}
				}
			}
		}
	});

	$("#scene-selector-box").find(".tree-select>.tree-parent>.tree-toggle:not(.fa-circle)").on("click", function(event) {
		event.stopPropagation();
		$(this).parent().parent().toggleClass("opened");
		if ($(this).parent().parent().hasClass("opened")) {
			$(this).removeClass("fa-plus-circle");
			$(this).addClass("fa-minus-circle");
		} else {
			$(this).removeClass("fa-minus-circle");
			$(this).addClass("fa-plus-circle");
		}
	});

	$(document).on("click", "#scene-review-list li", function(event) {
		event.stopPropagation();
		$(this).remove();
	});
}

addAdvert.bindDiySceneEvent = function() {
	$("#scene-diy-selector-box .tree-select .tree-parent").on("click", function() {
		var key = $(this).children(".parent-name").data("key");
		console.log("key:" + key);
		if (key && $(this).is(":checked")) {
			if (priceconfigs[$(this).data("key")]) {
				console.log("key:" + key + "---" + priceconfigs[$(this).data("key")]);
				putpricesscenes.push(priceconfigs[$(this).data("key")]);
			}
		}

		var psid = $(this).children(".parent-name").attr("id").replace(/scene-diy-/g, "");
		var pname = $(this).children(".parent-name").text();

		var html = '';
		for (var i = 0; i < $(this).parents(".tree-select").find(".tree-children li").length; i++) {
			var child = $(this).parents(".tree-select").find(".tree-children li span").eq(i);
			var csid = child.attr("id").replace(/scene-diy-/g, "");
			html += '<li title="' + child.text() + '" data-sid="' + csid + '"><p class="child-name">' + child.text() + '<span class="fa fa-close pointer fr"></span></p></li>';
		}

		if ($("#scene-diy-review-list li[data-sid=" + psid + "]").length == 0) {
			$("#scene-diy-review-list").append('<li data-sid="' + psid + '"><p class="parent-name">' + pname + '<span class="fa fa-close pointer fr"></span></p><ul class="scene-children-review-list"></ul></li>');
		}
		$("#scene-diy-review-list li[data-sid=" + psid + "] .scene-children-review-list").html(html);
	});

	$("#scene-diy-selector-box .tree-select .child-name").on("click", function() {
		var key = $(this).children(".parent-name").data("key");
		if (key && $(this).is(":checked")) {
			if (priceconfigs[$(this).data("key")]) {
				console.log("key:" + key + "---" + priceconfigs[$(this).data("key")]);
				putpricesscenes.push(priceconfigs[$(this).data("key")]);
			}
		}
		var csid = $(this).attr("id").replace(/scene-diy-/g, "");
		var cname = $(this).text();
		var psid = $(this).parents(".tree-select").find(".parent-name").attr("id").replace(/scene-diy-/g, "");
		var pname = $(this).parents(".tree-select").find(".parent-name").text();
		if ($("#scene-diy-review-list li[data-sid=" + psid + "]").length == 0) {
			$("#scene-diy-review-list").append('<li data-sid="' + psid + '">' + pname + '<span class="fa fa-close pointer fr"></span><ul class="scene-children-review-list"></ul></li>');
		}
		if ($("#scene-diy-review-list li[data-sid=" + csid + "]").length == 0) {
			$("#scene-diy-review-list li[data-sid=" + psid + "] .scene-children-review-list").append('<li data-sid="' + csid + '">' + cname + '<span class="fa fa-close pointer fr"></span></li>');
		}
	});

	$(document).on("click", "#scene-diy-review-list .scene-children-review-list>li", function(event) {
		event.stopPropagation();
		$(this).remove();
	});
	$(document).on("click", "#scene-diy-review-list>li", function(event) {
		event.stopPropagation();
		$(this).remove();
	});
}

addAdvert.uploadImg = function() {
	var _this = this;
	var domain = 'http://share.soundtooth.cn/';
	var isHover = false;
	var uploadStatus = '';
	var upSizeArr = [];

	var showUploadInfos = function(dom, up, file) {
		if (!isHover) {
			$(dom).text(file.percent + '%');
		}
	};

	var uploader = Qiniu.uploader({
		runtimes: 'html5,html4',
		browse_button: 'add-ad-img',
		//container: 'img-box',
		// drop_element: 'container',
		max_file_size: '100kb',
		// flash_swf_url: 'js/plupload/Moxie.swf',
		// dragdrop: true,
		multi_selection: true,
		chunk_size: '4mb',
		uptoken_url: BASEURL + "admin/api/getUploadToken",
		domain: domain,
		unique_names: true,
		get_new_uptoken: true,
		auto_start: false,
		filters: {
			max_file_size: '100kb',
			prevent_duplicates: false,
			// Specify what files to browse for
			mime_types: [{
					title: "Image files",
					extensions: "jpg,gif,png"
				}, // 限定jpg,gif,png后缀上传
			]
		},
		init: {
			'FilesAdded': function(up, files) {
				var _up = up;
				var len = files.length;
				var cnt = 1;
				plupload.each(files, function(file) {
					isHover = false;
					// 文件添加进队列后,处理相关的事情
					var _file = file;
					var $btn = $('#uploaded-status');
					var $status = $('#uploading-kidd');

					//checkfiles
					var reader = new FileReader();
					reader.onload = function(e) {
						var clip = document.createElement('img');
						clip.src = e.target.result;

						clip.addEventListener('load', function() {
							var imgWidth = clip.width || clip.naturalWidth;
							var imgHeight = clip.height || clip.naturalHeight;
							console.log('width: ' + (clip.width || clip.naturalWidth) + ', height: ' + (clip.height || clip.naturalHeight));

							if (checkImgPx(imgWidth, imgHeight)) {
								upSizeArr.push({
									width: imgWidth,
									height: imgHeight
								});
								if (cnt++ === len) {
									//upload
									up.start();
								}
							} else {
								up.splice(0, up.files.length);
								upSizeArr = [];
								console.log("尺寸错误");
								$status.text('尺寸错误')
									.css('display', 'inline-block');
							}
						}, false);


						/**
						 * unillegal files
						 */
						uploadStatus = 'uploading';

						$btn.hide();
						$status.text('上传中')
							.css('display', 'inline-block');

						var currentText = '';
						$status.hover(function() {
							currentText = $(this).text();
							isHover = true;
							$(this).text('取消').click(function() {
								_up.removeFile(_file);
								$(this).unbind('mouseenter')
									.unbind('mouseleave')
									.unbind('click');
								$status.hide();
								$btn.text('选择文件').show();
							});
						}, function() {
							isHover = false;
							$(this).text(currentText).unbind('click');
						});
					};
					reader.readAsDataURL(file.getSource().getSource());
				});
			},
			'BeforeUpload': function(up, file) {},
			'UploadProgress': function(up, file) {
				showUploadInfos('#uploading-kidd', up, file);
			},
			'UploadComplete': function() {},
			'FileUploaded': function(up, file, info) {
				"use strict";
				uploadStatus = 'uploaded';
				var infoObj = JSON.parse(info);
				var $status = $('#uploading-kidd');
				$status.unbind('click')
					.unbind('mouseenter')
					.unbind('mouseleave')
					.text('上传成功')
					.css('cursor', 'auto');
				//$('#add-image').attr('disabled','disabled');
				//$('#hImg').val(domain + infoObj.key);
				//var imageInfoObj = Qiniu.imageInfo(file.target_name);
				//if(checkImgPx(imageInfoObj.width, imageInfoObj.height)) {
				var url = domain + infoObj.key;
				$('#image-qiniu-url').val(url);
				addAdvert.imgUrls.img.push({
					'url': url,
					'size': file.size,
					'width': upSizeArr[0].width,
					'height': upSizeArr[0].height,
					'channel_type': 0,
					'fundsLimit': $("#daily-budget").val()
				});
				//console.log(file);
				$("#img-count").text(addAdvert.imgUrls.img.length);
				var size = file.size > 1000 ? Math.ceil(file.size / 1000) + "KB" : Math.ceil(file.size) + "B";
				var type = "APP广告";
				var html = '<li class="clearfix"><div class="img-review-pic fl"><img src="' + url + '"/></div><div class="img-review-size fl">尺寸:' + upSizeArr[0].width + '*' + upSizeArr[0].height + '</div><div class="img-review-type fl">格式:' + getFileType(file.name) + '</div><div class="img-review-space fl">大小:' + size + '</div><div class="img-review-space fl">' + type + '</div><div class="fa fa-close close-btn"></div></li>';
				$('#img-review').children("ul").html(html);
				var preview = '<img src="' + url + '">';
				$('.preview-img-container').empty().append(preview);
				upSizeArr.shift();
				/*				} else {
									layer.alert("图片宽高不符合要求，请重新上传");
									var $status = $('#uploading-kidd');
									$status.text('请重新上传');
								}*/
			},
			'Error': function(up, err, errTip) {
				uploadStatus = 'error';
				var $btn = $('#uploaded-status');
				var $status = $('#uploading-kidd');

				$status.unbind('mouseenter')
					.unbind('mouseleave')
					.unbind('click')
					.hide();
				if (err.code == -600) {
					$btn.text('图片过大，请重新上传').show();
				} else {
					$btn.text('请重新上传').show();
				}
			}
		}
	});

	var uploaderBox = Qiniu.uploader({
		runtimes: 'html5,html4',
		browse_button: 'add-ad-img-box',
		//container: 'img-box',
		// drop_element: 'container',
		max_file_size: '1000kb',
		// flash_swf_url: 'js/plupload/Moxie.swf',
		// dragdrop: true,
		multi_selection: false,
		chunk_size: '4mb',
		uptoken_url: BASEURL + "admin/api/getUploadToken",
		domain: domain,
		unique_names: true,
		get_new_uptoken: true,
		auto_start: true,
		filters: {
			max_file_size: '1000kb',
			prevent_duplicates: false,
			// Specify what files to browse for
			mime_types: [{
					title: "Image files",
					extensions: "jpg,gif,png"
				}, // 限定jpg,gif,png后缀上传
			]
		},
		init: {
			'FilesAdded': function(up, files) {
				var _up = up;
				plupload.each(files, function(file) {
					isHover = false;
					// 文件添加进队列后,处理相关的事情
					var _file = file;
					var $btn = $('#uploaded-status-box');
					var $status = $('#uploading-kidd-box');

					/**
					 * unillegal files
					 */
					uploadStatus = 'uploading';

					$btn.hide();
					$status.text('上传中')
						.css('display', 'inline-block');

					var currentText = '';
					$status.hover(function() {
						currentText = $(this).text();
						isHover = true;
						$(this).text('取消').click(function() {
							_up.removeFile(_file);
							$(this).unbind('mouseenter')
								.unbind('mouseleave')
								.unbind('click');
							$status.hide();
							$btn.text('选择文件').show();
						});
					}, function() {
						isHover = false;
						$(this).text(currentText).unbind('click');
					});
				});
			},
			'BeforeUpload': function(up, file) {},
			'UploadProgress': function(up, file) {
				showUploadInfos('#uploading-kidd-box', up, file);
			},
			'UploadComplete': function() {},
			'FileUploaded': function(up, file, info) {
				"use strict";
				uploadStatus = 'uploaded';
				var infoObj = JSON.parse(info);
				var $status = $('#uploading-kidd-box');
				$status.unbind('click')
					.unbind('mouseenter')
					.unbind('mouseleave')
					.text('上传成功')
					.css('cursor', 'auto');
				//$('#add-image').attr('disabled','disabled');
				//$('#hImg').val(domain + infoObj.key);
				//var imageInfoObj = Qiniu.imageInfo(file.target_name);
				//获取宽高后再操作
				var reader = new FileReader();
				reader.onload = function(e) {
					var clip = document.createElement('img');
					clip.src = e.target.result;

					clip.addEventListener('load', function() {
						var imgWidth = clip.width || clip.naturalWidth;
						var imgHeight = clip.height || clip.naturalHeight;

						console.log('width: ' + (clip.width || clip.naturalWidth) + ', height: ' + (clip.height || clip.naturalHeight));

						var upSizeObj = {
							width: imgWidth,
							height: imgHeight
						};

						var url = domain + infoObj.key;
						$('#image-qiniu-url-box').val(url);
						addAdvert.imgUrls.img = [{
							'url': url,
							'size': file.size,
							'width': upSizeObj.width,
							'height': upSizeObj.height,
							'channel_type': 1,
							'fundsLimit': $("#daily-budget").val()
						}];
						//console.log(file);
						$("#img-count").text(addAdvert.imgUrls.img.length);
						var size = file.size > 1000 ? Math.ceil(file.size / 1000) + "KB" : Math.ceil(file.size) + "B";
						var type = "盒子广告";
						var html = '<li class="clearfix"><div class="img-review-pic fl"><img src="' + url + '"/></div><div class="img-review-size fl">尺寸:' + upSizeObj.width + '*' + upSizeObj.height + '</div><div class="img-review-type fl">格式:' + getFileType(file.name) + '</div><div class="img-review-space fl">大小:' + size + '</div><div class="img-review-space fl">' + type + '</div><div class="fa fa-close close-btn"></div></li>';
						$('#img-review').children("ul").html(html);
						var preview = '<img src="' + url + '">';
						$('.preview-img-container').empty().append(preview);
					}, false);
				};
				reader.readAsDataURL(file.getSource().getSource());
			},
			'Error': function(up, err, errTip) {
				uploadStatus = 'error';
				var $btn = $('#uploaded-status');
				var $status = $('#uploading-kidd');

				$status.unbind('mouseenter')
					.unbind('mouseleave')
					.unbind('click')
					.hide();
				if (err.code == -600) {
					$btn.text('图片过大，请重新上传').show();
				} else {
					$btn.text('请重新上传').show();
				}
			}
		}
	});

	function checkImgPx(width, height) {
		if ($("#promotion-position-0").prop("checked")) {
			var sizeArr = addAdvert.bannerSizeArr;
		} else if ($("#promotion-position-1").prop("checked")) {
			var sizeArr = addAdvert.chapingSizeArr;
		} else if ($("#promotion-position-2").prop("checked")) {
			var sizeArr = addAdvert.kaipingSizeArr;
		} else if ($("#promotion-position-3").prop("checked")) {
			var sizeArr = addAdvert.infoSizeArr;
		} else if ($("#promotion-position-4").prop("checked")) {
			var sizeArr = addAdvert.noticeSizeArr;
		} else if ($("#promotion-position-5").prop("checked")) {
			var sizeArr = addAdvert.friendSizeArr;
		} else {
			var sizeArr = addAdvert.sizeArr;
		}
		var imgSize = width + "*" + height;
		if ($.inArray(imgSize, sizeArr) < 0) {
			return false;
		} else {
			return true;
		}
	}


}



addAdvert.bindDataEvent = function() {
	var fd = {};

	$("#add-ad-url").val(getUrl($("#add-ad-url").val()));

	var formData = getFormData(".step-box");
	var dateData = getDateData();
	var piriodData = getPiriodData();
	var accountData = getAccountData();

	var fd = $.extend({}, formData, dateData, addAdvert.imgUrls, accountData, piriodData);
	if ($("#areas-2").prop("checked")) {
		var regionData = getRegionData();
		fd = $.extend({}, fd, regionData);
	} else if ($("#areas-3").prop("checked")) {
		var zoneData = getZoneData();
		fd = $.extend({}, fd, zoneData);
	}

	if ($("#scenes-2").prop("checked")) {
		var sceneData = getSceneData();
		fd = $.extend({}, fd, sceneData);
	} else if ($("#scenes-3").prop("checked")) {
		var sceneData = getDiySceneData();
		fd = $.extend({}, fd, sceneData);
	}
	if (USER_TYPE_ID != 2) {
		var whiteListData = {
			white_list: $("#white-list").val()
		}
		fd = $.extend({}, fd, whiteListData);
	}
	var pricejson={
		"payType":$("input[name='pay-type']:checked").val(),
		"showType":$("input[name='show-type']:checked").val(),
		"putType":$("input[name='put-type']:checked").val(),
		"pushType2":$("input[name='push-type2']:checked").val(),
		"finalprice":finalprice.toFixed(2)
	}
	fd = $.extend({}, fd, pricejson);
	// console.log(fd);
	console.log(JSON.stringify(fd));

	layer.confirm('请确认您的广告信息' + $("#ad-summary").html(), {
		btn: ['确定', '取消'] //按钮
	}, function() {
		$('.loading-area').fadeIn();
		$.ajax({
				url: BASEURL + 'advert/advertAdd.do',
				type: 'POST',
				dataType: 'json',
				data: {
					data: JSON.stringify(fd)
				}
			})
			.done(function(data) {
				if (data.success) {
					$(".step-process-flex").children("li").last().removeClass("active").addClass("done");
					setTimeout(function() {
						if (window.location.href.indexOf('agentAddAdvert') > 0) {
							window.location.href = "";
						} else {
							window.location.href = "AdvertList.html";
						}
					}, 3000);
					layer.msg("发布成功！3秒后跳转到广告列表页面", {
						time: 6000,
						shade: 0.3
					});
				}
				$('.loading-area').fadeOut();
			})
			.fail(function() {
				console.log("error");
			});
	}, function() {});

	function getAccountData() {
		var result = {};
		result['user_id'] = $("#child-account-select").attr("data-childid");
		return result;
	}

	function getPiriodData() {
		var result = {};
		result.piriodArr = [];
		$("#piriod-selector").find(".piriod-weekday").each(function() {
			if ($(this).index() == 0) {
				return;
			}
			var weekday = [];
			$(this).find(".piriod-hour.active").each(function() {
				weekday.push(parseInt($(this).text()));
			});
			result.piriodArr.push(weekday);
		});
		result.piriodArr = JSON.stringify(result.piriodArr);
		return result;
	}

	function getFormData(parentDom) {
		var result = {};
		$(parentDom).find(".form-group input").each(function() {
			if ($(this).prop("disabled")) {
				return;
			}
			var type = $(this).attr("type");
			if (type && (type.toLocaleLowerCase() == "radio" || type.toLocaleLowerCase() == "checkbox") && !$(this).prop("checked")) {
				return;
			}
			var name = $(this).attr("name");
			var value = $(this).val();
			if (name && value) {
				if (type.toLocaleLowerCase() == "checkbox") {
					var tempArr = [];
					if (!result[name]) {
						result[name] = value;
					} else {
						tempArr.push(result[name]);
						tempArr.push(value);
						result[name] = tempArr.join("|");
					}
				} else {
					result[name] = value;
				}
			}
		});
		return result;
	}

	function getDateData() {
		var result = {};
		result.adDate = {};
		result.adDate.startDate = $("#startDate").val();
		if ($("#hasTimeEnd").prop("checked") && $("#endDate").val() != "") {
			result.adDate.endDate = $("#endDate").val();
		} else {
			result.adDate.endDate = "";
		}
		return result;
	}

	function getRegionData() {
		var result = {};
		result.province = [];
		var province = result.province;
		var provinceLi = $("#region-selector-box").find(".region-select-list").children("li");
		if (provinceLi.children("label").children("input").length > provinceLi.children("label").children("input:checked").length) {
			provinceLi.children("label").children("input:checked").each(function() {
				var pdom = $(this).parent().parent();
				province.push({
					'id': $(this).val()
				});
				var cityLi = pdom.children(".city-select-list").children("li");
				if (cityLi.children("label").children("input").length > cityLi.children("label").children("input:checked").length) {
					province[province.length - 1].city = [];
					cityLi.children("label").children("input:checked").each(function() {
						province[province.length - 1].city.push({
							'id': $(this).val()
						});
					});
				}
			});
		}
		return result;
	}

	function getZoneData() {
		var result = {};
		//result.province = $("#province-dropdown").attr("data-provinceid");
		//result.city = $("#city-dropdown").attr("data-cityid");
		result.area = [];
		var areaLi = $("#zone-selector-box").find(".region-select-list").children("li");
		if (areaLi.children("label").children("input").length > areaLi.children("label").children("input:checked").length) {
			areaLi.children("label").children("input:checked").each(function() {
				var pdom = $(this).parent().parent();
				result.area.push({
					'id': $(this).val()
				});
				var cityLi = pdom.children(".city-select-list").children("li");
				if (cityLi.children("label").children("input").length > cityLi.children("label").children("input:checked").length) {
					result.area[result.area.length - 1].zone = [];
					cityLi.children("label").children("input:checked").each(function() {
						result.area[result.area.length - 1].zone.push({
							'id': $(this).val()
						});
					});
				}
			});
		}
		return result;
	}

	function getSceneData() {
		var result = {};
		result.scene = [];
		$("#scene-review-list").children("li").each(function() {
			var lv2Data = [];
			$(this).children(".scene-children-review-list").children("li").each(function() {
				var lv3Data = [];
				$(this).children(".scene-children-review-list").children("li").each(function() {
					lv3Data.push({
						'id': $(this).attr("data-sid")
					});
				});
				lv2Data.push({
					'id': $(this).attr("data-sid"),
					'children': lv3Data
				});
			});
			result.scene.push({
				'id': $(this).attr("data-sid"),
				'children': lv2Data
			});
		});
		return result;
	}

	function getDiySceneData() {
		var result = {};
		result.diyScene = [];
		$("#scene-diy-review-list").children("li").each(function() {
			result.diyScene.push($(this).attr("data-sid"));
		});
		return result;
	}
}

addAdvert.reviewData = function() {
	var html = '';
	var result = {};
	putprices = new Array();
	putpricesscenesarea=new Array();
	var dateHtml = '<p class="clearfix"><span class="summary-title">推广日期</span><span class="summary-con">' + $("#startDate").val();
	if ($("input[name='pay-type']:checked").val() && $("input[name='put-type']:checked").val() && $("input[name='show-type']:checked").val()) {
		var id = $("input[name='pay-type']:checked").val() + ":" + $("input[name='show-type']:checked").val() + ":" + $("input[name='put-type']:checked").val();
		if ($("input[name='show-type']:checked").val() == "1") {
			id += ":" + $("input[name='push-type2']:checked").val()
		}
		price = prices[id];
		console.log("id:"+id+"---"+price);
	}
	dateHtml += '</span></p>';

	/*var accountHtml = '<p>关联子账号：' + $("#child-account-select>.dropdown-toggle").text();
	html += accountHtml;*/
	var dom = '';
	var selector = "";
	//盒子复选框相关逻辑判断
	/*if(!$("#promotion-channel-0").prop("checked")) {
		selector = ".add-ad-step:lt(" + addAdvert.step + "):not('.add-ad-step2')  .form-group input";
	} else {*/
	selector = ".add-ad-step:lt(" + addAdvert.step + ")  .form-group input";

	$.each($("li.review-show"), function(i, v) {
		console.log("areskey:" + $(this).data("key"));
		if (priceconfigs[$(this).data("key")]) {
			putpricesscenesarea.push($(this).data("key"));
		}
	});

	/*}*/
	$(selector).each(function() {
		if ($(this).prop("disabled")) {
			return;
		}
		var key = $(this).data("key");
				console.log("key:"+key);

		if (key && $(this).is(":checked")) {
			if (priceconfigs[$(this).data("key")]) {
				// console.log("key:"+key+"---"+priceconfigs[$(this).data("key")]);
				putprices.push(priceconfigs[$(this).data("key")]);
			}
		}



		var type = $(this).attr("type");
		if (type && (type.toLocaleLowerCase() == "radio" || type.toLocaleLowerCase() == "checkbox") && !$(this).prop("checked")) {
			return;
		}
		var name = $(this).attr("name");
		var value = $(this).val();
		console.log("type:"+type+" "+$(this).data("key"));

		if (name) {
			if (type.toLocaleLowerCase() == "checkbox") {
				if (!result[name]) {
					result[name] = [];
				}
				result[name].push($(this).siblings("span").text());
				if ($(".form-group input[type='checkbox'][name='" + name + "']:checked").length == result[name].length) {
					html += '<p class="clearfix"><span class="summary-title">' + $(this).parents(".form-group").children("label").text() + '</span><span class="summary-con">' + result[name].join(",") + '</span></p>';
				}
			} else if (type.toLocaleLowerCase() == "radio") {
				html += '<p class="clearfix"><span class="summary-title">' + $(this).parents(".form-group").children("label").text() + '</span><span class="summary-con">' + $(this).siblings("span").text() + '</span></p>';
			} else {
				if (name == "add-ad-img") {
					return;
				}
				html += '<p class="clearfix"><span class="summary-title">' + $(this).parents(".form-group").children("label").text() + '</span><span class="summary-con">' + $(this).val() + '</span></p>';
				if (name == "daily-budget") {
					html += dateHtml;
				}
			}
		}
	});
	// console.log($("li.review-show").eq(0).data("key"));


	var level = 0;
	putprices.push(putpricesscenes);
	putprices.push(putpricesscenesarea);
	// console.log("putprices:"+putprices+"   length:"+putprices.length);
	for (var i = 0; i < putprices.length; i++) {
		// console.log("i:" + i + " putprices:" + putprices[i]);
		level += putprices[i];
	}
	if (level != 0) {
		level = 1 + (level / putprices.length);
	}
	// console.log("level:"+level);
	finalprice = (level != 0 ? level * price : price);
	html += '<p class="clearfix"><span class="summary-title">广告</span><span class="summary-con">' + (finalprice?finalprice.toFixed(2):0) + '元</span></p>';
	$("#ad-summary>p").remove();
	$("#ad-summary").append(html);
}

/*addAdvert.finalData = {
	"adName": "地方美食",
	"adDate": {
		"startDate": "2016-06-01",
		"endDate": "2016-06-28"
	},
	"promotionWay": 0, //推广方式
	"dailyBudget": 10,  //预算
	"operators": "",  //运营商
	"network": "",  //网络类型
	"system": "",  //操作系统
	"area": {
		"type": "",  //省市region   /	商圈zone
		"data": ""  //1|2|3
	},
	"scene": {
		"type": "",  //自定义diy
		"data": ""  //123|456
	},
	"sex": "",
	"age": "",
	"marry": "",
	"kids": "",
	"img": [{
		"url": "http://www.soundtooth.cn",
		"width": 300,
		"height": 50,
		"size": 102400
	},
	{
		"url": "",
		"width": "",
		"height": "",
		"size": ""
	},
	{
		"url": "",
		"width": "",
		"height": "",
		"size": ""
	}],
	"url": ""
}*/

function getDateString(timeStamp) {
	Date.prototype.format = function(format) {
		var date = {
			"M+": this.getMonth() + 1,
			"d+": this.getDate(),
			"h+": this.getHours(),
			"m+": this.getMinutes(),
			"s+": this.getSeconds(),
			"q+": Math.floor((this.getMonth() + 3) / 3),
			"S+": this.getMilliseconds()
		};
		if (/(y+)/i.test(format)) {
			format = format.replace(RegExp.$1, (this.getFullYear() + '').substr(4 - RegExp.$1.length));
		}
		for (var k in date) {
			if (new RegExp("(" + k + ")").test(format)) {
				format = format.replace(RegExp.$1, RegExp.$1.length == 1 ? date[k] : ("00" + date[k]).substr(("" + date[k]).length));
			}
		}
		return format;
	}
	var date = new Date();
	date.setTime(timeStamp * 1000);
	var dateString = date.format('yyyy-MM-dd');
	return dateString;
}

function getUrl(str) {
	var result = "";
	var httpReg = new RegExp(/^https?:\/\//);
	if (httpReg.test(str)) {
		result = str;
	} else {
		result = "http://" + str;
	}
	return result;
}

function getFileType(filename) {
	return filename.substring(filename.lastIndexOf(".") + 1, filename.length);
}