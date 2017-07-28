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
var editAdvert = {};
editAdvert.zoneTypes = {};
editAdvert.sceneTypes = {};
editAdvert.sizeArr = ["800*120", "600*500", "640*270", "960*640", "600*300", "480*800", "640*960", "720*1280", "768*1024", "728*90", "468*60", "1024*768", "1280*800", "1366*768", "1242*2208", "1080*1920", "1536*2048", "95*68", "1280*720", "600*600", "300*300", "960*150", "640*100", "480*75"];
editAdvert.bannerSizeArr = ["800*120", "600*500", "640*270", "960*640", "600*300", "480*800", "640*960", "720*1280", "768*1024", "728*90", "468*60", "1024*768", "1280*800", "1366*768", "600*600", "300*300", "960*150", "640*100", "480*75"];
editAdvert.chapingSizeArr = ["600*500", "600*600"];
editAdvert.friendSizeArr = ["800*800", "800*640", "640*800"];
editAdvert.noticeSizeArr = ["72*72"];
editAdvert.kaipingSizeArr = ["600*500", "640*960", "480*800", "720*1280", "1080*1920", "1242*2208", "768*1024", "1536*2048", "1024*768", "1280*800", "1366*768", "600*600"];
editAdvert.infoSizeArr = ["95*68", "600*300", "600*500", "640*270", "960*640", "800*120", "640*960", "1280*720"];
editAdvert.step = 1;
editAdvert.imgUrls = {
	'img': []
};
editAdvert.init = function() {
	allPage.renderDateSelector();

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
		} else if (type == 4) {
			$("#infoflow-box").show();
			$("#infoflow-box input").prop("disabled", false);
			$(".img-tips").hide();
			$(".img-tip-notice").show();
		} else if (type == 5) {
			$("#infoflow-box").show();
			$("#infoflow-box input").prop("disabled", false);
			$(".img-tips").hide();
			$(".img-tip-friend").show();
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
/*editAdvert.getChildAccount = function() {
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
		editAdvert.reviewData();
	});
}*/


editAdvert.renderPiriodSelector = function(dom) {
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

editAdvert.bindStepEvent = function() {
	var _this = this;
	if ($(".step-process>li").length > 0) {
		checkStep(_this.step);
		$("#next-step").on("click", function() {
			if (_this.step == 1) {
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
			if (_this.step == 2) {
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
			/*if(editAdvert.step == 1 && !$("#promotion-channel-0").prop("checked")) {
				editAdvert.step++;
			}*/
			_this.step++;
			checkStep(_this.step);
			_this.reviewData();
		});
		$("#prev-step").on("click", function() {
			//盒子复选框相关逻辑判断
			/*if(editAdvert.step == 3 && !$("#promotion-channel-0").prop("checked")) {
				editAdvert.step--;
			}*/
			_this.step--;
			checkStep(_this.step);
			_this.reviewData();
		});
		$("#save-step").on("click", function() {
			if (_this.imgUrls.img.length == 0) {
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
			_this.bindDataEvent(); //组装返回数据
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

editAdvert.renderPage = function() {
	var _this = this;
	$('.loading-area').fadeIn();
	var ajax_url = "advert/getAdvertPageRender.do?rand="+Math.random()*1000;
	$.ajax({
			url: BASEURL + ajax_url,
			type: 'GET',
			dataType: 'json'
		})
		.done(function(data) {
			if (data.success) {
				_this.zoneTypes = data.result.areaJson;
				_this.sceneTypes = data.result.sceneJson;
				_this.scenesMessage = data.result.scenesMessage;
				console.log(_this.scenesMessage);
				for (var key in data.result) {
					if (key == "areas" || key == "scenes") {
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

				_this.bindSelectEvent();
				_this.getRegionSelector("#region-selector-box", _this.zoneTypes);
				_this.getZoneDropdown();
				_this.bindRegionEvent();

				_this.getSceneSelector("#scene-selector-box", _this.sceneTypes);
				_this.bindSceneEvent();
				_this.getDiySceneSelector("#scene-diy-selector-box", _this.scenesMessage);
				_this.bindDiySceneEvent();

				$('.loading-area').fadeOut();
				// alert(getParam("mid"));
				_this.editAdvert(getParam("mid")); //回填编辑信息
			}
		})
		.fail(function() {
			$('.loading-area').fadeOut();
			console.log("error");
		});
	_this.reviewData();

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
				html += '	<input name="' + key + '" id="' + key + '-all" class="regular-radio" type="radio" value="' + data.data[i].id + '" checked="">';
				html += '	<label for="' + key + '-all"></label>';
				html += '	<span class="radio-name">' + data.data[i].text + '</span>';
				html += '</label>';
			} else {
				html += '<label class="checkbox-inline pointer select">';
				html += '	<input name="' + key + '" id="' + key + '-' + data.data[i].id + '" class="regular-checkbox" type="checkbox" value="' + data.data[i].id + '">';
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
			html += '	<input name="' + key + '" id="' + key + '-all" class="regular-radio" type="radio" value="' + data.data[0].id + '" checked="">';
			html += '	<label for="' + key + '-all"></label>';
			html += '	<span class="radio-name">' + data.data[0].text + '</span>';
			html += '</label>';
			for (var i = data.data.length - 1; i >= 1; i--) {
				html += '<label class="radio-inline pointer select">';
				html += '	<input name="' + key + '" id="' + key + '-' + data.data[i].id + '" class="regular-radio" type="radio" value="' + data.data[i].id + '">';
				html += '	<label for="' + key + '-' + data.data[i].id + '"></label>';
				html += '	<span class="radio-name">' + data.data[i].text + '</span>';
				html += '</label>';
			}
		} else {
			for (var i = 0, len = data.data.length; i < len; i++) {
				if (i == 0) {
					html += '<label class="radio-inline pointer select-all">';
					html += '	<input name="' + key + '" id="' + key + '-all" class="regular-radio" type="radio" value="' + data.data[i].id + '" checked="">';
					html += '	<label for="' + key + '-all"></label>';
					html += '	<span class="radio-name">' + data.data[i].text + '</span>';
					html += '</label>';
				} else {
					html += '<label class="radio-inline pointer select">';
					html += '	<input name="' + key + '" id="' + key + '-' + data.data[i].id + '" class="regular-radio" type="radio" value="' + data.data[i].id + '">';
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



editAdvert.isDirect = function(text) {
	var isDirect = text == '北京市' || text == '上海市' || text == '天津市' || text == '重庆市' || text == '澳门特别行政区' || text == '香港特别行政区' || text == '台湾省';
	return isDirect;
}


editAdvert.bindSelectEvent = function() {
	var _this = this;
	$("#hasTimeEnd").on("change", function() {
		if ($(this).prop("checked")) {
			$("#endDate").prop("disabled", false);
		} else {
			$("#endDate").val("");
			$("#endDate").prop("disabled", true);
		}
	});
	/*$("#promotion-channel-0").on("change", function() {
		if($(this).prop("checked")) {
			$("#daily-budget").prop("disabled", false);
			$("#daily-budget").parents(".form-group").show();
			$("#add-ad-img").parents(".form-group").show();
		} else {
			$("#daily-budget").prop("disabled", true);
			$("#daily-budget").parents(".form-group").hide();
			$("#add-ad-img").parents(".form-group").hide();
		}
	});
	$("#promotion-channel-1").on("change", function() {
		if($(this).prop("checked")) {
			$("#daily-budget-box").prop("disabled", false);
			$("#daily-budget-box").parents(".form-group").show();
			$("#add-ad-img-box").parents(".form-group").show();
		} else {
			$("#daily-budget-box").prop("disabled", true);
			$("#daily-budget-box").parents(".form-group").hide();
			$("#add-ad-img-box").parents(".form-group").hide();
		}
	});*/
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
	});
	$("#areas-2").on("change", function() {
		if ($(this).prop("checked")) {
			$("#zone-selector-box").removeClass("active");
			$("#region-selector-box").addClass("active");
		} else {
			$("#region-selector-box").removeClass("active");
		}
	});
	$("#areas-3").on("change", function() {
		if ($(this).prop("checked")) {
			$("#region-selector-box").removeClass("active");
			$("#zone-selector-box").addClass("active");
		} else {
			$("#zone-selector-box").removeClass("active");
		}
	});
	$("#areas-all").on("change", function() {
		if ($(this).prop("checked")) {
			$("#region-selector-box").removeClass("active");
			$("#zone-selector-box").removeClass("active");
		}
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
		_this.reviewData();
	});

	$("#img-review").on("click", ".close-btn", function(event) {
		event.stopPropagation();
		if ($(this).parents("li").index() == $("#img-review").find("li").length - 1) {
			$('.preview-img-container').empty();
		}
		$(this).parents("li").remove();
		_this.imgUrls.img.splice($(this).parents("li").index(), 1);
		$("#img-count").text(_this.imgUrls.img.length);
	});
	$("#img-review").on("click", ".close-all-btn", function() {
		layer.confirm("确认删除全部广告？", {
			btn: ['确定', '取消'] //按钮
		}, function() {
			$("#img-review").children("ul").empty();
			$('.preview-img-container').empty();
			_this.imgUrls.img = [];
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

editAdvert.getRegionSelector = function(dom, data) {
	var _this = this;
	var province = data;
	var html = "";
	var reviewHtml = "";
	if (province != undefined) {
		for (var i = 0, ilen = province.length; i < ilen; i++) {
			var name = province[i].text.replace(/市|省|壮族|回族|维吾尔|自治区|特别行政区/g, "");
			html += '<li title="' + name + '"><label class="checkbox-inline pointer"><input name="region" id="region-province-' + province[i].id + '" class="regular-checkbox region-lv1" type="checkbox" value="' + province[i].id + '"><label for="region-province-' + province[i].id + '"></label><span class="checkbox-name">' + name + '</span></label>';
			reviewHtml += '<li title="' + name + '" data-rid="region-province-' + province[i].id + '"><p>' + name + '<span class="fa fa-close pointer"></span></p>';
			var isDirect = _this.isDirect(province[i].text);
			if (!isDirect && province[i].put_city != undefined) {
				var city = province[i].put_city;
				html += '<ul class="city-select-list">';
				reviewHtml += '<ul class="city-review-list clearfix">';
				for (var j = 0, jlen = city.length; j < jlen; j++) {
					html += '<li title="' + city[j].text + '"><label class="checkbox-inline pointer"><input name="region" id="region-city-' + city[j].id + '" class="regular-checkbox region-lv2" type="checkbox" value="' + city[j].id + '"><label for="region-city-' + city[j].id + '"></label><span class="checkbox-name">' + city[j].text + '</span></label></li>';
					reviewHtml += '<li title="' + city[j].text + '" data-rid="region-city-' + city[j].id + '" class="fl">' + city[j].text + '<span class="fa fa-close pointer"></span></li>';
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

editAdvert.getZoneSelector = function(dom, data) {
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

editAdvert.getZoneDropdown = function() {
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

	//editAdvert.getZoneList(editAdvert.zoneTypes[0]);
	this.bindZoneEvent();
}

editAdvert.getZoneCityDropdown = function(data) {
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
	//editAdvert.getZoneList(city[0]);
	this.bindZoneCityEvent(city);
}

editAdvert.bindZoneEvent = function() {
	var _this = this;
	$(document).on("click", "#province-dropdown .dropdown-menu>li", function() {
		var data = _this.zoneTypes[$(this).index()];
		if (_this.isDirect(data.text)) {
			_this.getZoneList(data);
			$(".region-select-all input").prop("checked", false);
			$("#city-dropdown").hide();
		} else {
			_this.getZoneCityDropdown(data);
			$(".region-select-all input").prop("checked", false);
			$("#zone-selector-box .region-review-list").empty();
			$("#zone-selector-box .region-select-list").empty();
			$("#city-dropdown").show();
		}
		$(this).parents(".dropdown-click").attr("data-provinceid", $(this).attr("data-provinceid"));
	});
}

editAdvert.bindZoneCityEvent = function(cityData) {
	var _this = this;
	$(document).on("click", "#city-dropdown .dropdown-menu>li", function() {
		var data = cityData[$(this).index()];
		_this.getZoneList(data);
		$(this).parents(".dropdown-click").attr("data-cityid", $(this).attr("data-cityid"));
	});
}

editAdvert.bindRegionEvent = function() {
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
	});

	$(document).off("click", ".review-show span").on("click", ".review-show span", function() {
		var rid = $(this).parents(".review-show").attr("data-rid");
		//console.log($("#region-" + rid));
		$("#" + rid).click();
	});
}

editAdvert.getZoneList = function(data) {
	//var zoneTypes = this.zoneTypes;
	//var data = zoneTypes.children[0];
	this.getZoneSelector("#zone-selector-box", data);
}

editAdvert.getSceneSelector = function(dom, data) {
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

editAdvert.getDiySceneSelector = function(dom, data) {
	if (data == null) {
		return;
	}
	if (data instanceof Array) { //普通
		var parents = data;
		if (parents != null) {
			var html = "";
			var reviewHtml = "";
			for (var i = 0, ilen = parents.length; i < ilen; i++) {
				html += '<li class="tree-select"><div class="tree-parent"><span class="parent-name" id="scene-diy-' + parents[i].scenes_id + '">' + parents[i].current_name + '</span></div>';

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
				html += '<li class="tree-select"><div class="tree-parent"><span class="parent-name" id="scene-diy-' + parents[i].scenes_id + '">' + parents[i].current_name + '</span></div>';

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
				html += '<li class="tree-select"><div class="tree-parent"><span class="parent-name" id="scene-diy-' + parents[i].scenes_id + '">' + parents[i].current_name + '</span></div>';

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

editAdvert.bindSceneEvent = function() {
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

editAdvert.bindDiySceneEvent = function() {
	$("#scene-diy-selector-box .tree-select .tree-parent").on("click", function() {
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

editAdvert.uploadImg = function() {
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
		multi_selection: false,
		chunk_size: '4mb',
		uptoken_url: BASEURL + "admin/api/getUploadToken",
		domain: domain,
		unique_names: true,
		get_new_uptoken: true,
		auto_start: true,
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
				_this.imgUrls.img = [{
					'url': url,
					'size': file.size,
					'width': upSizeArr[0].width,
					'height': upSizeArr[0].height,
					'channel_type': 0,
					'fundsLimit': $("#daily-budget").val()
				}];
				//console.log(file);
				$("#img-count").text(_this.imgUrls.img.length);
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
						_this.imgUrls.img = [{
							'url': url,
							'size': file.size,
							'width': upSizeObj.width,
							'height': upSizeObj.height,
							'channel_type': 1,
							'fundsLimit': $("#daily-budget").val()
						}];
						//console.log(file);
						$("#img-count").text(_this.imgUrls.img.length);
						var size = file.size > 1000 ? Math.ceil(file.size / 1000) + "KB" : Math.ceil(file.size) + "B";
						var type = "盒子广告";
						var html = '<li class="clearfix"><div class="img-review-pic fl"><img src="' + url + '"/></div><div class="img-review-size fl">尺寸:' + upSizeObj.width + '*' + upSizeObj.height + '</div><div class="img-review-type fl">格式:' + getFileType(file.name) + '</div><div class="img-review-space fl">大小:' + size + '</div><div class="img-review-space fl">' + type + '</div><div class="fa fa-close close-btn"></div></li>';
						$('#img-review').children("ul").html(html);
						var preview = '<img src="' + url + '">';
						$('.preview-screen').empty().append(preview);
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
			var sizeArr = editAdvert.bannerSizeArr;
		} else if ($("#promotion-position-1").prop("checked")) {
			var sizeArr = addAdvert.chapingSizeArr;
		} else if ($("#promotion-position-2").prop("checked")) {
			var sizeArr = addAdvert.kaipingSizeArr;
		} else if ($("#promotion-position-3").prop("checked")) {
			var sizeArr = editAdvert.infoSizeArr;
		} else if ($("#promotion-position-4").prop("checked")) {
			var sizeArr = editAdvert.noticeSizeArr;
		} else if ($("#promotion-position-5").prop("checked")) {
			var sizeArr = editAdvert.friendSizeArr;
		} else {
			var sizeArr = editAdvert.sizeArr;
		}
		var sizeArr = editAdvert.sizeArr;
		var imgSize = width + "*" + height;
		if ($.inArray(imgSize, sizeArr) < 0) {
			return false;
		} else {
			return true;
		}
	}


}



editAdvert.bindDataEvent = function() {
	var _this = this;
	var fd = {};

	$("#add-ad-url").val(getUrl($("#add-ad-url").val()));

	var formData = getFormData(".step-box");
	var dateData = getDateData();
	var piriodData = getPiriodData();
	var accountData = getAccountData();

	var fd = $.extend({}, formData, dateData, _this.imgUrls, accountData, piriodData);
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

	fd = $.extend({}, fd, {
		mid: $("#adid").val()
	});

	console.log(fd);
	//return false;  // 待接口完善后开放

	layer.confirm('请确认您的广告信息' + $("#ad-summary").html(), {
		btn: ['确定', '取消'] //按钮
	}, function() {
		$('.loading-area').fadeIn();
		$.ajax({
				url: BASEURL + 'advert/updateAdvertToDB.do',
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
							window.location.href = "/background/";
						} else {
							window.location.href = "/background/AdvertList.html";
						}
					}, 3000);
					layer.msg("修改成功！3秒后跳转到广告列表页面", {
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

editAdvert.reviewData = function() {
	var _this = this;
	var html = '';
	var result = {};
	var dateHtml = '<p class="clearfix"><span class="summary-title">推广日期</span><span class="summary-con">' + $("#startDate").val();
	if ($("#hasTimeEnd").prop("checked") && $("#endDate").val() != "") {
		dateHtml += ' 至 ' + $("#endDate").val();
	} else {
		dateHtml += ' 起';
	}
	dateHtml += '</span></p>';

	/*var accountHtml = '<p>关联子账号：' + $("#child-account-select>.dropdown-toggle").text();
	html += accountHtml;*/
	var dom = '';
	var selector = "";
	//盒子复选框相关逻辑判断
	/*if(!$("#promotion-channel-0").prop("checked")) {
		selector = ".add-ad-step:lt(" + _this.step + "):not('.add-ad-step2')  .form-group input";
	} else {*/
	selector = ".add-ad-step:lt(" + _this.step + ")  .form-group input";
	/*}*/
	$(selector).each(function() {
		if ($(this).prop("disabled")) {
			return;
		}
		var type = $(this).attr("type");
		if (type && (type.toLocaleLowerCase() == "radio" || type.toLocaleLowerCase() == "checkbox") && !$(this).prop("checked")) {
			return;
		}
		var name = $(this).attr("name");
		var value = $(this).val();
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
	$("#ad-summary>p").remove();
	$("#ad-summary").append(html);
}

/*editAdvert.finalData = {
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

editAdvert.editAdvert = function(mid) {
	var _this = this;
	$('.loading-area').fadeIn();
	$.ajax({
			url: BASEURL + 'advert/editAdvert.do',
			type: 'POST',
			dataType: 'json',
			data: {
				mid: mid
			}
		})
		.done(function(data) {
			if (data.success) {
				// console.log(JSON.stringify(data));
				var res = data.result;
				$("#ad-name").val(res.title); //标题
				if (res.promotionChannel) {
					var channelArr = res.promotionChannel.split("|");
					if ($.inArray("0", channelArr) >= 0) {
						$("#daily-budget").prop("disabled", false);
						$("#daily-budget").parents(".form-group").show();
						$("#add-ad-img").parents(".form-group").show();
					}
					if ($.inArray("0", channelArr) >= 0) {
						$("#daily-budget-box").prop("disabled", false);
						$("#daily-budget-box").parents(".form-group").show();
						$("#add-ad-img-box").parents(".form-group").show();
					}
				} else {
					$("#promotion-channel-0").prop("checked", true);
					$("#promotion-channel-1").prop("checked", false);
					$("#daily-budget-box").prop("disabled", true);
					$("#daily-budget-box").parents(".form-group").hide();
					$("#add-ad-img-box").parents(".form-group").hide();
				}
				$("#promotion-position-" + res.spreadPosition).prop("checked", true); //展示方式
				if ($("#promotion-position-3").prop("checked")) {
					$("#infoflow-box").show();
					$(".img-tip").hide();
					$(".img-tip-box").show();
					$("#infoflow-box input").prop("disabled", false);
					$("#infoflow_title").val(res.infoflow_title);
					$("#infoflow_con").val(res.infoflow_con);
				}
				$("#promotion-way-" + res.spreadWay).prop("checked", true); //点击效果
				$("#daily-budget").val(Math.floor(res.funds_limit)); //每日预算
				//渠道
				$("#startDate").val(getDateString(res.put_in_start_date)); //开始日期
				//采用新时间字段
				if (res.put_in_end_date && res.put_in_end_date != "9999-12-30") {
					$("#hasTimeEnd").prop("checked", true);
					$("#endDate").prop("disabled", false);
					$("#endDate").val(getDateString(res.put_in_end_date)); //结束日期	
				}
				//时间段
				$("#piriod-" + res.piriod).prop("checked", true);
				if (res.piriod == 1) {
					$("#piriod-selector-box").addClass("active");
				} else {
					$("#piriod-selector-box").removeClass("active");
				}
				var piriodArr = JSON.parse(res.piriodArr);
				$('.piriod-hour').removeClass("active");
				for (var i in piriodArr) {
					for (var j in piriodArr[i]) {
						$('.piriod-hour[data-rowid="' + i + '"][data-colid="' + piriodArr[i][j] + '"]').addClass("active");
					}
				}
				/*for (var i = 0; i <  piriodArr.length; i++) {
					for (var j = 0; j <  piriodArr[i].length; j++) {
						$('.piriod-hour[data-rowid="'+i+'"][data-colid="'+piriodArr[i][j]+'"]').addClass("active");
					}
				}*/
				$("#promotion-frequency").val(Math.floor(res.promotion_frequency)); //投放频次
				_this.renderEditSelector("#scenes", res.spreadScene); //推广场景
				if (res.spreadScene == 2) {
					_this.renderEditSceneSelector(res.spreadSceneType);
				} else if (res.spreadScene == 3) {
					_this.renderEditDiySceneSelector(res.diyScene);
				}

				_this.renderEditSelector("#areas", res.spreadArea); //投放区域
				if (res.spreadArea == 2) {
					_this.renderEditRegionSelector(res.province);
				} else if (res.spreadArea == 3) {
					_this.renderEditZoneSelector(res.spreadAreaType);
				}


				_this.renderEditSelector("#operators", res.operator); //运营商
				_this.renderEditSelector("#network", res.netType); //网络类型
				_this.renderEditSelector("#system", res.operationSystem); //操作系统
				_this.renderEditSelector("#sex", res.spreadSex); //性别
				_this.renderEditSelector("#age", res.spreadAge); //年龄
				_this.renderEditSelector("#marry", res.marryStatus); //婚姻
				_this.renderEditSelector("#kids", res.babyStatus); //育儿

				$("#add-ad-url").val(res.message_link); //链接

				_this.renderEditImage(res); //图片
			}
			$('.loading-area').fadeOut();
		})
		.fail(function() {
			console.log("error");
		});
}
editAdvert.renderEditSelector = function(dom, data) {
	if (data == null || data == "") {
		$(dom + "-all").prop("checked", true);
		return;
	}
	if (data == "1") {
		$(dom + "-all").prop("checked", true);
	} else {
		$(dom + "-all").prop("checked", false);
		var arr = data.split("|");
		for (var i = 0; i < arr.length; i++) {
			$(dom + "-" + arr[i]).prop("checked", true);
		}
	}
}
editAdvert.renderEditImage = function(data) {
	_this = this;
	var imageSize = data.imageSize.split("*");
	var type = data.channel_image.substring(data.channel_image.lastIndexOf(".") + 1, data.channel_image.length);
	if (window.location.href.indexOf('editAdvert') > 0) {
		var channel_type = "APP广告";
		$("#add-ad-img").parents(".form-group").show();
	} else {
		var channel_type = "盒子广告"
		$("#add-ad-img-box").parents(".form-group").show();
	}


	_this.imgUrls.img.push({
		'url': data.channel_image,
		'size': data.imageSize,
		'width': imageSize[0],
		'height': imageSize[1],
		'channel_type': window.location.href.indexOf('editAdvert') > 0 ? 0 : 1
	});
	$("#img-review").children("ul").append('<li class="clearfix"><div class="img-review-pic fl"><img src="' + data.channel_image + '"></div><div class="img-review-size fl">尺寸:' + data.imageSize + '</div><div class="img-review-type fl">格式:' + type + '</div><div class="img-review-space fl">大小:未知</div><div class="img-review-space fl">' + channel_type + '</div><div class="fa fa-close close-btn"></div></li>');
}
editAdvert.renderEditSceneSelector = function(data) {
	$("#scene-selector-box").addClass("active");
	if (data == null || data == "null" || data == "") return;
	var scene_root = JSON.parse(data);
	for (var i = 0; i < scene_root.length; i++) {
		var scene_lv1 = scene_root[i];
		if (!scene_lv1.children) {
			$("#scene-selector-box").find("#scene-" + scene_lv1.id).click();
		} else {
			for (var j = 0; j < scene_lv1.children.length; j++) {
				var scene_lv2 = scene_lv1.children[j];
				if (!scene_lv2.children) {
					$("#scene-selector-box").find("#scene-" + scene_lv2.id).click();
				} else {
					for (var k = 0; k < scene_lv2.children.length; k++) {
						var scene_lv3 = scene_lv2.children[k];
						$("#scene-selector-box").find("#scene-" + scene_lv3.id).click();
					}
				}
			}
		}
	}
}
editAdvert.renderEditDiySceneSelector = function(data) {
	$("#scene-diy-selector-box").addClass("active");
	if (data == null || data == "null" || data == "") return;
	var scene_root = JSON.parse(data);
	for (var i = 0; i < scene_root.length; i++) {
		var scene_lv1 = scene_root[i];
		$("#scene-diy-selector-box").find("#scene-diy-" + scene_lv1).click();
	}
}
editAdvert.renderEditRegionSelector = function(data) {
	$("#region-selector-box").addClass("active");
	if (data == null || data == "null" || data == "") return;
	var region_root = JSON.parse(data);
	for (var i = 0; i < region_root.length; i++) {
		var region_lv1 = region_root[i];
		if (!region_lv1.city) {
			$("#region-province-" + region_lv1.id).click();
		} else {
			for (var j = 0; j < region_lv1.city.length; j++) {
				var region_lv2 = region_lv1.city[j];
				$("#region-city-" + region_lv2.id).click();
			}
		}
	}
}
editAdvert.renderEditZoneSelector = function(data) {
	var _this = this;
	$("#zone-selector-box").addClass("active");
	if (data == null || data == "null" || data == "") return;
	var region_root = JSON.parse(data);
	for (var i = 0; i < _this.zoneTypes.length; i++) {
		var province = _this.zoneTypes[i];
		//判断是否为直辖市
		if (_this.isDirect(province.text)) {
			for (var j = 0; j < province.put_city.length; j++) {
				var city = province.put_city[j];
				if (region_root[0].id == city.id) {
					$("#province-dropdown").find("li[data-provinceid='" + province.id + "']").click();
					$("#city-dropdown").find("li[data-cityid='" + city.id + "']").click();
				}
			}
		} else {
			for (var j = 0; j < province.put_city.length; j++) {
				var city = province.put_city[j];
				for (var k = 0; k < city.put_area.length; k++) {
					var area = city.put_area[k];
					if (region_root[0].id == area.id) {
						$("#province-dropdown").find("li[data-provinceid='" + province.id + "']").click();
						$("#city-dropdown").find("li[data-cityid='" + city.id + "']").click();
					}
				}
			}
		}
	}

	for (var i = 0; i < region_root.length; i++) {
		var region_lv1 = region_root[i];
		if (!region_lv1.zone) {
			$("#region-area-" + region_lv1.id).click();
		} else {
			for (var j = 0; j < region_lv1.zone.length; j++) {
				var region_lv2 = region_lv1.zone[j];
				$("#region-zone-" + region_lv2.id).click();
			}
		}
	}
}

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

function getParam(paramName) {
	paramValue = "";
	isFound = false;
	//alert(location.href);
	if (this.location.search.indexOf("?") == 0 && this.location.search.indexOf("=") > 1) {
		arrSource = unescape(this.location.search).substring(1, this.location.search.length).split("&");
		i = 0;
		while (i < arrSource.length && !isFound) {
			if (arrSource[i].indexOf("=") > 0) {
				if (arrSource[i].split("=")[0].toLowerCase() == paramName.toLowerCase()) {
					paramValue = arrSource[i].split("=")[1];
					isFound = true;
				}
			}
			i++;
		}
	}
	return paramValue;
}

function getFileType(filename) {
	return filename.substring(filename.lastIndexOf(".") + 1, filename.length);
}