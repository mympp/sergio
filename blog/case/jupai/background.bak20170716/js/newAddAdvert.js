var addAdvert = {};
var prices = {};
var priceconfigs = {};
var price = 0;
var putprices = new Array();
var putpricesscenes = new Array();
var putpricesscenesarea = new Array();
var putpricesscenescg = new Array();
var finalprice = 0;
var SERVERURL = "http://120.77.182.200";
addAdvert.imgUrls = {
	'img': [],
	'infoflow_share_pic': [],
	'logo': []
};
addAdvert.fileUrls = {
	'files': []
};

addAdvert.step = 1;
//初始化
addAdvert.init = function() {
	var _this = this;

	_this.renderPage();
}

addAdvert.bindStepEvent = function() {
	var _this = this;
	if ($(".step-process>li").length > 0) {
		checkStep(_this.step);
		$("#next-step").on("click", function() {
			if (!checkInput(_this.step)) {
				return false;
			}
			_this.step++;
			checkStep(_this.step);
			if (_this.step == 4) {
				_this.reviewData();
			}
		});
		$("#prev-step").on("click", function() {
			/*if(!checkInput(_this.step)) {
				return false;
			}*/
			_this.step--;
			checkStep(_this.step);
		});
		$("#save-step").on("click", function() {
			_this.bindDataEvent(); //组装返回数据
		});
	}

	function checkStep(step) {
		$("#wrapper").scrollTop(0);
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

	function checkInput(step) {
		var flag = true;
		var emptyIndex = 0;
		var checkList = [];
		switch (step) {
			case 1:
				checkList = ["ad-name", "startDate", "add-ad-url"];
				if ($("#hasTimeEnd").prop("checked")) {
					checkList.push("endDate");
				}
				break;
			case 2:
				//checkList = ["general-budget"];
				if ($("input[name='promotion-position']:checked").length == 0) {
					flag = false;
					layer.alert("请选择广告规格");
					return false;
				}
				$("input[id^='image-qiniu-url']:not(.ignore)").each(function() {
					if ($(this).val() == "" && $(this).attr("id") != "image-qiniu-url-files") {
						flag = false;
						layer.alert("请上传图片");
						return false;
					}
				});
				$(".add-ad-step2").find("input[type='text']:not(.ignore)").each(function() {
					if ($(this).val() == "") {
						flag = false;
						_this.warn($(this), "此项未填");
						return false;
					}
				});
				/*if(_this.imgUrls.img.length == 0 || _this.imgUrls.infoflow_share_pic.length == 0) {
					layer.alert("请上传图片");
					return false;
				}*/
				break;
			case 3:
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
				break;
			default:
				break;
		}

		for (var i = 0; i < checkList.length; i++) {
			if ($("#" + checkList[i]).val() == "") {
				flag = false;
				index = i;
				break;
			}
		}
		if (!flag) {
			_this.warn($("#" + checkList[index]), "此项未填");
		}
		return flag;

		/*		if(_this.step == 1) {
					if($("#piriod-1").prop("checked") && $("#piriod-selector").find(".piriod-hour.active").length == 0) {
						layer.alert("请选择投放时段");
						return;
					}
					if($("#hasTimeEnd").prop("checked") && $("#endDate").val() == "") {
						layer.alert("请选择结束日期");
						return;
					}
					$("#hasTimeEnd").on("change", function() {
						if($(this).prop("checked")) {
							$("#endDate").prop("disabled", false);
						} else {
							$("#endDate").prop("disabled", true);
						}
					});
				}
				if(_this.step == 2) {
					if($("#areas-2").prop("checked") && $("#region-selector-box input[type='checkbox']:checked").length == 0) {
						layer.alert("请选择投放省市");
						return;
					}
					if($("#areas-3").prop("checked") && $("#zone-selector-box input[type='checkbox']:checked").length == 0) {
						layer.alert("请选择投放行政区/商圈");
						return;
					}
					if($("#scenes-2").prop("checked") && $("#scene-review-list").children("li").length == 0) {
						layer.alert("请选择推广场景");
						return;
					}
					if($("#scenes-3").prop("checked") && $("#scene-diy-review-list").children("li").length == 0) {
						layer.alert("请选择推广场景");
						return;
					}
					//修复上传按钮移动端不能点击的问题
					$(".moxie-shim").css({
						left: 10,
						width: 122,
						height: 34
					});
				}*/
	}
}

addAdvert.warn = function(item, msg) {
	item.focus();

	var originalPlaceholder = item.attr('placeholder');
	var oroginalValue = item.val();

	item.val('');
	item.attr('placeholder', msg);
	item.addClass('warn-input');

	setTimeout(function() {
		item.val(oroginalValue);
		item.attr('placeholder', originalPlaceholder);
		item.removeClass('warn-input');
	}, 1000);
}

//绑定页面事件
addAdvert.bindEvent = function() {
	var _this = this;
	$("input[name='piriod']").parents(".form-group").hide();
	$("input[name='piriod']").on("change", function() {
		if ($("#piriod-1").prop("checked")) {
			$("#piriod-selector-box").addClass("active");
		} else {
			$("#piriod-selector-box").removeClass("active");
		}
	});

	$("#hasTimeEnd").on("change", function() {
		if ($(this).prop("checked")) {
			$("#endDate").prop("disabled", false);
		} else {
			$("#endDate").val("");
			$("#endDate").prop("disabled", true);
		}
	});

	//checkbox
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

	//渠道选择事件
	$("input[name='promotion-channel']").on("change", function() {
		var channel_inputs = $("input[name='promotion-channel']");
		var channelArr = ['27', '28', '29', '30', '31', '32', '33', '35', '39'];
		for (var i = 0; i < channel_inputs.length; i++) {
			if (channel_inputs[i].checked && $.inArray(channel_inputs[i].value, channelArr) >= 0) {
				var data = _this.config.pages[1].content[1].content[1].content; //ugly  寻找渠道配置
				_this.getAccordionCon(data);
			} else if (channel_inputs[i].checked) {
				var data = _this.config.pages[1].content[1].content[i].content; //ugly  寻找渠道配置
				_this.getAccordionCon(data);
			}
		}
	});

	//scenes
	$("input[name='scenes']").on("change", function() {
		if ($(this).prop("checked")) {
			switch ($(this).val()) {
				case '1':
					$(".scene-selector-box").removeClass("active");
					break;
				case '2':
					$(".scene-selector-box").removeClass("active");
					$("#scene-selector-box").addClass("active");
					break;
				case '3':
					$(".scene-selector-box").removeClass("active");
					$("#scene-diy-selector-box").addClass("active");
					break;
				default:
					$(".scene-selector-box").removeClass("active");
					break;
			}
		}
	});

	//areas
	$("input[name='areas']").on("change", function() {
		if ($(this).prop("checked")) {
			switch ($(this).val()) {
				case '1':
					$(".region-selector-box").removeClass("active");
					break;
				case '2':
					$(".region-selector-box").removeClass("active");
					$("#region-selector-box").addClass("active");
					break;
				case '3':
					$(".region-selector-box").removeClass("active");
					$("#zone-selector-box").addClass("active");
					break;
				default:
					$(".region-selector-box").removeClass("active");
					break;
			}
		}
	});

	//input check
	$("#ad-name").on("propertychange input", function() {
		if ($(this).val().length > 20) {
			$(this).val($(this).val().substring(0, 20));
		}
	});
	$("#daily-budget").on("blur", function() {
		if (!isNaN($(this).val()) && parseInt($(this).val()) < 10000) {
			$(this).val("");
			layer.alert("请输入大于等于10000的数字");
			return;
		}
		if (!isNaN(parseInt($(this).val()))) {
			$(this).val(parseInt($(this).val()));
		}
	});
	$("#general-budget").on("blur", function() {
		//var day = (new Date($("#endDate").val()).getTime() - new Date($("#startDate").val()).getTime()) / (3600 * 24 *1000) + 1;
		var per = $("input[name='promotion-channel']:checked").val();

		var dspArr = ['27', '28', '29', '30', '31', '32', '33', '35', '39'];
		if ($.inArray(per, dspArr) >= 0) {
			per = '9';
		}
		//var price = 1500;
		switch (per) {
			case '5':
				var price = 25000;
				break;
			case '6':
				var price = 25000;
				break;
			case '7':
				var price = 25000;
				break;
			case '8':
				var price = 500;
				break;
			case '9':
				var price = 500;
				break;
			case '10':
				var price = 15000;
				break;
			default:
				var price = 15000;
				break;
		}
		var limit = price;
		if (!isNaN($(this).val()) && parseInt($(this).val()) < limit) {
			$(this).val("");
			layer.alert("请输入大于等于" + limit + "的数字");
			return;
		}
		if (!isNaN(parseInt($(this).val()))) {
			$(this).val(parseInt($(this).val()));
		}
	});
}

//渲染页面
addAdvert.getPages = function(pages) {
	var _this = this;
	var html = [];
	var step = [];

	for (var i = 0; i < pages.length; i++) {
		step.push('<li class="' + (pages[i].active ? "active" : "") + '"><div class="ball"><span class="ball-in">' + pages[i].id + '</span><div class="ball-title">' + pages[i].text + '</div></div></li>');

		html.push('<div class="add-ad-step add-ad-step' + pages[i].id + (pages[i].active ? " active" : " active") + '"></div>');
	}

	$(".step-process").html(step.join(""));
	$(".step-box").html(html.join(""));

	for (var i = 0; i < pages.length; i++) {
		_this.getPage($(".add-ad-step" + pages[i].id), pages[i]);
	}

	$("#promotion-channel-8").siblings(".radio-name").attr("title", "包含和腾讯合作的所有APP").append('<i class="fa fa-question-circle"></i>');
	$("#promotion-channel-9").siblings(".radio-name").attr("title", "包含和百度合作的所有APP").append('<i class="fa fa-question-circle"></i>');

	_this.bindEvent();
	_this.bindStepEvent();
	_this.bindRegionEvent();
	_this.bindSceneEvent();
	_this.bindBoxSceneEvent();
}

//依据配置json生成输入框
addAdvert.getPage = function(page, config) {
	var _this = this;

	for (var i = 0; i < config.content.length; i++) {
		var inputConfig = config.content[i];
		switch (inputConfig.type) {
			case 'text':
				_this.getTextInput(page, inputConfig);
				break;
			case 'date':
				_this.getDateInput(page, inputConfig);
				break;
			case 'piriod':
				_this.getPiriodInput(page, inputConfig);
				break;
			case 'radio':
				_this.getRadioInput(page, inputConfig);
				break;
			case 'checkbox':
				_this.getCheckboxInput(page, inputConfig);
				break;
			case 'radio_checkbox':
				_this.getRadioCheckboxInput(page, inputConfig);
				break;
			case 'region':
				_this.getRegionInput(page, inputConfig);
				break;
			case 'zone':
				_this.getZoneInput(page, inputConfig);
				break;
			case 'scene':
				_this.getSceneInput(page, inputConfig);
				break;
			case 'box_scene':
				_this.getBoxSceneInput(page, inputConfig);
				break;
			case 'accordion':
				_this.getAccordion(page, inputConfig);
				break;
			case 'white-list':
				_this.getWhiteListInput(page, inputConfig);
				break;
			case 'files':
				//_this.getFileInput(page, inputConfig);
				break;
			default:
				break;
		}
	}
}

//文本
addAdvert.getTextInput = function(dom, config) {
	var _this = this;
	var html = [];

	html.push('<div class="form-group">');
	html.push('  <label for="' + config.id + '">' + config.text + '</label>');
	html.push('  <div class="from-group-con">');
	html.push('    <div class="form-input-box">');
	html.push('      <input id="' + config.id + '" type="text" name="' + config.id + '" placeholder="' + (config.placeholder ? config.placeholder : config.text) + '">');
	if (config.unit) {
		html.push('<span>' + config.unit + '</span>');
	}
	html.push('    </div>');
	html.push('    <div class="form-tip-box">');
	html.push('      <p>' + config.tip + '</p>');
	html.push('    </div>');
	html.push('  </div>');
	html.push('</div>');

	dom.append(html.join(""));
}

//日期
addAdvert.getDateInput = function(dom, config) {
	var _this = this;
	var html = [];

	html.push('<div class="form-group">');
	html.push('  <label for="startDate">开始时间</label>');
	html.push('  <div class="date-range">');
	html.push('    <div class="date-selector-box">');
	html.push('      <input class="date-selector" id="startDate" placeholder="开始日期"/>');
	html.push('    </div>');
	html.push('    <input type="checkbox" id="hasTimeEnd" class="regular-checkbox" checked>');
	html.push('    <label for="hasTimeEnd" style="display:none;"></label>');
	html.push('    <label>结束时间</label>');
	html.push('    <div class="date-selector-box">');
	html.push('      <input class="date-selector" id="endDate" placeholder="结束日期" />');
	html.push('    </div>');
	html.push('    <p>审核需要3个工作日</p>');
	html.push('  </div>');
	html.push('</div>');

	dom.append(html.join(""));

	if (config.hasEnd) {
		renderDateSelector(config.start, config.end);
	} else {
		renderDateSelector(config.start);
	}

	function renderDateSelector(initialValueStart, initialValueEnd) {
		var startSelector = rome(startDate, {
			time: false,
			initialValue: getDateStr(initialValueStart),
			//dateValidator: rome.val.beforeEq(endDate),
			dateValidator: function(d) {
				var temp = new Date(endDate.value).getTime() - d.getTime();
				var week = d.getDay();
				return week != 6 && week != 0 && temp > 0;
			},
			min: getDateStr(3)
		});
		var endSelector = rome(endDate, {
			time: false,
			initialValue: getDateStr(initialValueEnd),
			dateValidator: rome.val.afterEq(startDate),
			/*dateValidator:  function(d) {
				var temp = d.getTime() - new Date(startDate.value).getTime();
				var days = parseInt(temp / (1000 * 60 * 60 * 24));
				return days >= 0;
			},*/
			min: getDateStr(3)
		});
	}
}

//时间段
addAdvert.getPiriodInput = function(dom, config) {
	var _this = this;
	var html = [];

	html.push('<div class="piriod-selector-box" id="' + config.id + '">');
	html.push('<div class="legend"><span class="rect active"></span><span>投放时段</span><span class="rect"></span><span>暂停时段</span></div>');
	html.push('<div class="triangle"></div>');
	html.push('<div class="piriod-selector" id="piriod-selector"></div>');
	html.push('</div>');

	dom.append(html.join(""));

	renderPiriodSelector($("#piriod-selector"));

	function renderPiriodSelector(dom) {
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
		$(dom).html(html.join(""));

		$(dom).find(".weekday-select input[type='checkbox']").on("change", function() {
			var hour = $(this).parents(".weekday-select").siblings(".piriod-hour");
			if ($(this).prop("checked")) {
				hour.addClass("active");
			} else {
				hour.removeClass("active");
			}
		});
		$(dom).find(".piriod-select").on("click", function() {
			var hour = $(this).parents(".piriod-selector").find(".piriod-weekday").find(".piriod-hour:eq(" + $(".piriod-select").index($(this)) + ")");
			$(this).toggleClass("active");
			if ($(this).hasClass("active")) {
				hour.addClass("active");
			} else {
				hour.removeClass("active");
			}
		});
		$(dom).find(".piriod-hour").on("click", function() {
			if ($(this).hasClass("active")) {
				$(this).removeClass("active");
			} else {
				$(this).addClass("active");
			}
		});
	}
}

//单选
addAdvert.getRadioInput = function(dom, config) {
		var _this = this;
		var html = [];
		var data = config.content;
		html.push('<div class="form-group ">');
		html.push('  <label>' + config.text + '</label>');
		html.push('  <div class="form-group-con">');
		for (var i = 0; i < data.length; i++) {
			html.push('    <label class="radio-inline pointer ' + (data[i].cssClass ? data[i].cssClass : '') + '">');
			html.push('      <input name="' + config.id + '" id="' + config.id + '-' + data[i].id + '" class="regular-radio" type="radio" value="' + data[i].value + '"');
			if (data[i].checked) {
				html.push(' checked=""');
			}
			html.push('>');
			html.push('      <label for="' + config.id + '-' + data[i].id + '"></label>');
			html.push('      <span class="radio-name">' + data[i].text + '</span>');
			html.push('    </label>');
		}
		html.push('  </div>');
		html.push('</div>');

		dom.append(html.join(""));
		if (config.onchange) {
			config.onchange();
			$("input[name='" + config.id + "']").bind('change', config.onchange);
		}
		if (config.init) {
			config.init();
		}
	}
	//全选+多选
addAdvert.getRadioCheckboxInput = function(dom, config) {
	var _this = this;
	var html = [];
	var data = config.content;

	html.push('<div class="form-group">');
	html.push('  <label>' + config.text + '</label>');
	html.push('  <div class="form-group-con">');
	for (var i = 0; i < data.length; i++) {
		if (i == 0) {
			html.push('<label class="radio-inline pointer select-all">');
			html.push('	<input name="' + config.id + '" id="' + config.id + '-' + data[i].id + '" class="regular-radio" type="radio" value="' + data[i].value + '" checked="" data-key="' + data[i].key + '">');
			html.push('	<label for="' + config.id + '-all"></label>');
			html.push('	<span class="radio-name">' + data[i].text + '</span>');
			html.push('</label>');
		} else {
			html.push('<label class="checkbox-inline pointer select">');
			html.push('	<input name="' + config.id + '" id="' + config.id + '-' + data[i].id + '" class="regular-checkbox" type="checkbox" value="' + data[i].value + '" data-key="' + data[i].key + '">');
			html.push('	<label for="' + config.id + '-' + data[i].id + '"></label>');
			html.push('	<span class="checkbox-name">' + data[i].text + '</span>');
			html.push('</label>');
		}
	}
	html.push('  </div>');
	html.push('</div>');

	dom.append(html.join(""));
}

//多选
addAdvert.getCheckboxInput = function(dom, config) {
	var _this = this;
	var html = [];
	var data = config.content;

	html.push('<div class="form-group">');
	html.push('  <label>' + config.text + '</label>');
	html.push('  <div class="form-group-con">');
	for (var i = 0; i < data.length; i++) {
		html.push('<label class="checkbox-inline pointer select">');
		html.push('	<input name="' + config.id + '" id="' + config.id + '-' + data[i].id + '" class="regular-checkbox" type="checkbox" value="' + data[i].value + '" data-key="' + data[i].key + '"');
		if (data[i].checked) {
			html.push(' checked=""');
		}
		html.push('>');
		html.push('	<label for="' + config.id + '-' + data[i].id + '"></label>');
		html.push('	<span class="checkbox-name">' + data[i].text + '</span>');
		html.push('</label>');
	}
	html.push('  </div>');
	html.push('</div>');

	dom.append(html.join(""));
}

//省市
addAdvert.getRegionInput = function(dom, config) {
	var _this = this;
	var selectorHtml = [];

	selectorHtml.push('<div class="region-selector-box" id="' + config.id + '">');
	selectorHtml.push('  <div class="region-selector">');
	selectorHtml.push('    <div class="region-select-all">');
	selectorHtml.push('      <label class="checkbox-inline pointer">');
	selectorHtml.push('        <input name="region" id="region-all" class="regular-checkbox" type="checkbox" value="all">');
	selectorHtml.push('        <label for="region-all"></label>');
	selectorHtml.push('        <span class="checkbox-name">全选</span>');
	selectorHtml.push('      </label>');
	selectorHtml.push('    </div>');
	selectorHtml.push('    <ul class="region-select-list clearfix"></ul>');
	selectorHtml.push('  </div>');
	selectorHtml.push('  <div class="region-reviewer">');
	selectorHtml.push('    <ul class="region-review-list"></ul>')
	selectorHtml.push('  </div>');
	selectorHtml.push('  <div class="triangle"></div>');
	selectorHtml.push('</div>');

	dom.append(selectorHtml.join(""));

	renderRegionData($("#" + config.id), config.content);

	function renderRegionData(dom, data) {
		var province = data;
		var html = "";
		var reviewHtml = "";

		if (province != undefined) {
			for (var i = 0, ilen = province.length; i < ilen; i++) {
				var text = province[i].text == undefined ? province[i].name : province[i].text;
				var name = text.replace(/市|省|壮族|回族|维吾尔|自治区|特别行政区/g, "");
				html += '<li title="' + name + '"><label class="checkbox-inline pointer"><input name="region" id="region-province-' + province[i].id + '" class="regular-checkbox region-lv1" type="checkbox" value="' + province[i].id + '" data-key="' + province[i].key + '"><label for="region-province-' + province[i].id + '"></label><span class="checkbox-name">' + name + '</span></label>';
				reviewHtml += '<li title="' + name + '" data-rid="region-province-' + province[i].id + '"><p>' + name + '<span class="fa fa-close pointer"></span></p>';
				var isDirect = checkDirect(text);
				if (!isDirect && province[i].childs != undefined) {
					var city = province[i].childs;
					html += '<ul class="city-select-list">';
					reviewHtml += '<ul class="city-review-list clearfix">';
					for (var j = 0, jlen = city.length; j < jlen; j++) {
						var cityText = city[j].text == undefined ? city[j].name : city[j].text;
						html += '<li title="' + cityText + '"><label class="checkbox-inline pointer"><input name="region" id="region-city-' + city[j].id + '" class="regular-checkbox region-lv2" type="checkbox" value="' + city[j].id + '" data-key="' + city[j].key + '"><label for="region-city-' + city[j].id + '"></label><span class="checkbox-name">' + cityText + '</span></label></li>';
						reviewHtml += '<li title="' + cityText + '" data-rid="region-city-' + city[j].id + '" class="fl">' + cityText + '<span class="fa fa-close pointer"></span></li>';
					}
					html += '</ul>';
					reviewHtml += '</ul>';
				}

				html += '</li>';
				reviewHtml += '</li>';
			}
		}

		dom.find(".region-select-list").html(html);
		dom.find(".region-review-list").html(reviewHtml);
	}

	function checkDirect(text) {
		var isDirect = text == '北京市' || text == '上海市' || text == '天津市' || text == '重庆市' || text == '澳门特别行政区' || text == '香港特别行政区' || text == '台湾省';
		return isDirect;
	}
}

//区县
addAdvert.getZoneInput = function(dom, config) {
	var _this = this;
	var selectorHtml = [];

	selectorHtml.push('<div class="region-selector-box" id="' + config.id + '">');
	selectorHtml.push('  <div class="region-selector">');
	selectorHtml.push('    <div class="province-dropdown dib">');
	selectorHtml.push('      <div class="province-selector dropdown-click" id="province-dropdown" data-provinceId="">');
	selectorHtml.push('        <a class="dropdown-toggle"></a>');
	selectorHtml.push('        <div class="dropdown-content">');
	selectorHtml.push('          <ul class="dropdown-menu"></ul>');
	selectorHtml.push('          <span class="dropdown-arrow"><em></em></span>');
	selectorHtml.push('        </div>');
	selectorHtml.push('      </div>');
	selectorHtml.push('    </div>');
	/*	selectorHtml.push('    <div class="city-dropdown dib">');
		selectorHtml.push('      <div class="city-selector dropdown-click" id="city-dropdown" data-provinceId="">');
		selectorHtml.push('        <a class="dropdown-toggle"></a>');
		selectorHtml.push('        <div class="dropdown-content">');
		selectorHtml.push('          <ul class="dropdown-menu"></ul>');
		selectorHtml.push('          <span class="dropdown-arrow"><em></em></span>');
		selectorHtml.push('        </div>');
		selectorHtml.push('      </div>');
		selectorHtml.push('    </div>');*/
	selectorHtml.push('    <div class="region-select-all">');
	selectorHtml.push('      <label class="checkbox-inline pointer">');
	selectorHtml.push('        <input name="zone" id="zone-all" class="regular-checkbox" type="checkbox" value="all">');
	selectorHtml.push('        <label for="zone-all"></label>');
	selectorHtml.push('        <span class="checkbox-name">全选</span>');
	selectorHtml.push('      </label>');
	selectorHtml.push('    </div>');
	selectorHtml.push('    <ul class="region-select-list clearfix"></ul>');
	selectorHtml.push('  </div>');
	selectorHtml.push('  <div class="region-reviewer">');
	selectorHtml.push('    <ul class="region-review-list"></ul>');
	selectorHtml.push('  </div>');
	selectorHtml.push('  <div class="triangle"></div>');
	selectorHtml.push('</div>');

	dom.append(selectorHtml.join(""));

	var selectorDom = $("#" + config.id);
	renderZoneData(selectorDom, config.content[0]);
	getZoneDropdown(selectorDom);
	bindZoneEvent(selectorDom);

	function renderZoneData(dom, data) {
		var city = data.childs;
		var html = "";
		var reviewHtml = "";

		for (var i = 0, ilen = city.length; i < ilen; i++) {
			var name = city[i].text == undefined ? city[i].name : city[i].text;
			html += '<li title="' + name + '"><label class="checkbox-inline pointer"><input name="region" id="region-area-' + city[i].id + '" class="regular-checkbox region-lv1" type="checkbox" value="' + city[i].id + '" data-key="' + city[i].key + '"><label for="region-area-' + city[i].id + '"></label><span class="checkbox-name">' + name + '</span></label>';
			reviewHtml += '<li title="' + name + '" data-rid="region-area-' + city[i].id + '"><p>' + name + '<span class="fa fa-close pointer"></span></p>';

			var zone = city[i].childs;
			html += '<ul class="city-select-list">';
			reviewHtml += '<ul class="city-review-list clearfix">';
			for (var j = 0, jlen = zone.length; j < jlen; j++) {
				var zoneText = zone[j].text == undefined ? zone[j].name : zone[j].text;
				html += '<li title="' + zoneText + '"><label class="checkbox-inline pointer"><input name="region" id="region-zone-' + zone[j].id + '" class="regular-checkbox region-lv2" type="checkbox" value="' + zone[j].id + '" data-key="' + zone[j].key + '"><label for="region-zone-' + zone[j].id + '"></label><span class="checkbox-name">' + zoneText + '</span></label></li>';
				reviewHtml += '<li title="' + zoneText + '" data-rid="region-zone-' + zone[j].id + '" class="fl">' + zoneText + '<span class="fa fa-close pointer"></span></li>';
			}
			html += '</ul>';
			reviewHtml += '</ul>';

			html += '</li>';
			reviewHtml += '</li>';
		}

		dom.find(".region-select-list").html(html);
		dom.find(".region-review-list").html(reviewHtml);
	}

	function getZoneDropdown(dom) {
		var province = config.content;
		var html = "";
		for (var i = 0, ilen = province.length; i < ilen; i++) {
			var provinceText = province[i].text == undefined ? province[i].name : province[i].text;
			if (i == 0) {
				$("#province-dropdown .dropdown-toggle").html("请选择省份");
				//$("#province-dropdown .dropdown-toggle").parent().attr("data-provinceid", province[i].id);
			}
			html += '<li data-provinceId="' + province[i].id + '">' + provinceText + '</li>';
		}
		$("#province-dropdown .dropdown-menu").html(html);

		renderZoneData(dom, province[0]);
	}

	/*	function getZoneCityDropdown(data) {
			var _this = this;
			var city = data.childs;
			var html = "";
			for(var i = 0, ilen = city.length; i < ilen; i++) {
				var cityText = city[i].text == undefined ? city[i].name : city[i].text;
				if(i == 0) {
					$("#city-dropdown .dropdown-toggle").html("请选择城市");
					//$("#city-dropdown .dropdown-toggle").parent().attr("data-cityId", city[i].id);
				}
				html += '<li data-cityId="' + city[i].id + '">' + cityText + '</li>';
			}
			$("#city-dropdown .dropdown-menu").html(html);
			//addAdvert.getZoneList(city[0]);
			_this.bindZoneCityEvent(city);
		}*/

	function bindZoneEvent(dom) {
		$(document).on("click", "#province-dropdown .dropdown-menu>li", function() {
			var data = config.content[$(this).index()];
			//if(_this.isDirect(data.text)) {
			renderZoneData(dom, data);
			$(".region-select-all input").prop("checked", false);
			$("#city-dropdown").hide();
			/*} else {
				_this.getZoneCityDropdown(data);
				$(".region-select-all input").prop("checked", false);
				$("#zone-selector-box .region-review-list").empty();
				$("#zone-selector-box .region-select-list").empty();
				$("#city-dropdown").show();
			}*/
			$(this).parents(".dropdown-click").attr("data-provinceid", $(this).attr("data-provinceid"));
		});
	}
}

//场景
addAdvert.getSceneInput = function(dom, config) {
	var _this = this;
	var selectorHtml = [];

	selectorHtml.push('<div class="scene-selector-box" id="' + config.id + '">');
	selectorHtml.push('  <div class="scene-selector">');
	selectorHtml.push('    <ul class="trees"></ul>');
	selectorHtml.push('  </div>')
	selectorHtml.push('  <div class="scene-reviewer">');
	selectorHtml.push('    <div class="scene-clear"><a>删除全部</a></div>');
	selectorHtml.push('    <ul class="scene-review-list" id="scene-review-list"></ul>');
	selectorHtml.push('  </div>');
	selectorHtml.push('</div>');

	dom.append(selectorHtml.join(""));
	// console.log(JSON.stringify(config.content));
	renderSceneData($("#" + config.id), config.content);

	function renderSceneData(dom, data) {
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
			html += '<li class="tree-select tree-lv1-select"><div class="tree-parent tree-lv1-parent"><span class="tree-toggle fa ' + circle_class + '"></span><span class="parent-name" id="scene-' + parents[i].id + '" data-key="' + parents[i].key + '">' + parents[i].name + '</span></div>';
			if (lv2 != null) {
				html += '<ul class="tree-children tree-lv1-children">';
				for (var j = 0, jlen = lv2.length; j < jlen; j++) {
					var lv3 = lv2[j].children;
					circle_class = lv3 ? "fa-plus-circle pointer" : "fa-circle";
					html += '<li class="tree-select tree-lv2-select"><div class="tree-parent tree-lv2-parent"><span class="tree-toggle fa ' + circle_class + '"></span><span class="parent-name" id="scene-' + lv2[j].id + '"' + '" data-key="' + lv2[j].key + '" >' + lv2[j].name + '</span></div>';
					if (lv3 != null) {
						html += '<ul class="tree-children tree-lv2-children">';
						for (var k = 0, klen = lv3.length; k < klen; k++) {
							html += '<li class="tree-select tree-lv3-select"><div class="tree-parent tree-lv3-parent"><span class="tree-toggle fa fa-circle"></span><span class="parent-name" id="scene-' + lv3[k].id + '"' + '" data-key="' + lv3[k].key + '">' + lv3[k].name + '</span></div></li>';
						}
						html += "</ul>";
					}
					html += "</li>";
				}
				html += '</ul>';
			}
			html += '</li>';
		}

		dom.find(".trees").html(html);
	}
}

//盒子场景
addAdvert.getBoxSceneInput = function(dom, config) {
	var _this = this;
	var selectorHtml = [];

	selectorHtml.push('<div class="scene-selector-box" id="' + config.id + '">');
	selectorHtml.push('  <div class="scene-selector">');
	selectorHtml.push('    <ul class="trees"></ul>');
	selectorHtml.push('  </div>')
	selectorHtml.push('  <div class="scene-reviewer">');
	selectorHtml.push('    <div class="scene-clear"><a>删除全部</a></div>');
	selectorHtml.push('    <ul class="scene-review-list" id="scene-diy-review-list"></ul>');
	selectorHtml.push('  </div>');
	selectorHtml.push('</div>');

	dom.append(selectorHtml.join(""));

	renderBoxSceneData($("#" + config.id), config.content);

	function renderBoxSceneData(dom, data) {
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
		dom.find(".trees").html(html);
	}
}

addAdvert.getWhiteListInput = function(dom, config) {
	var _this = this;
	var html = [];

	html.push('<div class="form-group" id="white-list-group">');
	html.push('	<label>白名单</label>');
	html.push('	<div>');
	html.push('		<div class="text-inline">');
	html.push('			<label class="file-button text-file-button hide" for="add-txt-' + config.id + '">上传</label>');
	html.push('			<input name="add-txt-' + config.id + '" id="add-txt-' + config.id + '" class="file-input" type="file">');
	html.push('		</div>');
	html.push('		<div class="text-inline">');
	html.push('			<textarea class="white-list" id="' + config.id + '" name="' + config.id + '" placeholder="' + config.placeholder + '"></textarea>');
	html.push('		</div>');
	html.push('	</div>');
	html.push('</div>');

	dom.append(html.join(""));

	var input = document.getElementById("add-txt-" + config.id);
	$("#" + config.id).on("input", function() {
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
		input.addEventListener('change', readFile, false);
	}

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
}

addAdvert.getImageInput = function(dom, config) {
	var _this = this;
	var html = [];

	html.push('<div class="form-group">');
	html.push('  <label for="image-qiniu-' + config.id + '">' + config.text + '</label>');
	html.push('    <div class="from-group-con">');
	html.push('  <div class="form-input-box">');
	html.push('    <label class="file-button" id="label_' + config.id + '" for="image-qiniu-' + config.id + '">上传</label>');
	html.push('    <label id="uploading-kidd-' + config.id + '"></label>');
	html.push('    <label id="uploaded-status-' + config.id + '"></label>');
	html.push('    <input name="image-qiniu-' + config.id + '" id="image-qiniu-' + config.id + '" class="file-input" type="button">');
	html.push('    <input type="hidden" id="image-qiniu-url-' + config.id + '">');
	html.push('  </div>');
	html.push('  <div class="form-tip-box">');
	html.push('    <div class="img-tips">');
	html.push('      <p>' + config.tip + '</p>');
	html.push('    </div>');
	html.push('  </div>');
	html.push('  </div>');
	html.push('</div>');

	dom.append(html.join(""));
	var editor = KindEditor.editor({
		uploadJson: '/kindeditor/jsp/upload_json.jsp',
		fileManagerJson: '/kindeditor/jsp/file_manager_json.jsp',
		allowFileManager: true
	});
	$('#image-qiniu-' + config.id).bind("click", function() {
		// alert(config.id);
		editor.loadPlugin('image', function() {
			editor.plugin.imageDialog({
				showRemote: false,
				imageUrl: $('#' + "image-qiniu-url-" + config.id).val(),
				clickFn: function(url, title, width, height, border, align) {

					// $('#' + "image-qiniu-url-" + config.id).val(url);
					var configId=config.id;
					// alert($('#'+urlid).val());
					var upSizeObj = {
						width: width,
						height: height
					};
					// addAdvert.imgUrls.img.push({
					// 	'url': SERVERURL + url,
					// 	"size": "未知",
					// 	'width': width,
					// 	'height': height,
					// 	'channel_type': 0,
					// 	'fundsLimit': $("#daily-budget").val()
					// });

					$('#image-qiniu-url-' + configId).val(url);
					if (configId.indexOf("infoflow_share_pic") >= 0) {
						_this.imgUrls.infoflow_share_pic.push({
							'url': url,
							'size': "未知",
							'width': width,
							'height': height
						});
					} else if (configId.indexOf("logo") >= 0) {
						_this.imgUrls.logo.push({
							'url': url,
							'size': "未知",
							'width': width,
							'height': height
						});
					} else {
						_this.imgUrls.img.push({
							'url': url,
							'size': "未知",
							'width': width,
							'height': height
						});
					}
					editor.hideDialog();
				}
			});
		});
	});
	// alert("#image-qiniu-"+config.id);
	// initEditor("#label_"+config.id,"image-qiniu-url-"+config.id);



	// _this.getQiniuUploader(config.id, config.size, config.space, config.ext);
}

addAdvert.getAccordion = function(dom, config) {
	var _this = this;
	var html = [];

	html.push('<div class="form-group">');
	html.push('  <label for="' + config.id + '">' + config.text + '</label>');
	html.push('  <div class="from-group-con">');
	html.push('    <div class="ad-accordion">');


	html.push('    </div>');
	html.push('  </div>');
	html.push('</div>');

	dom.append(html.join(""));

	var data = config.content[0].content;
	_this.getAccordionCon(data);
}

addAdvert.getAccordionCon = function(data) {
	var _this = this;
	var html = [];
	data = data || [];

	html.push('      <div class="accordion-hd clearfix"><div class="accordion-title fl">展现样式</div><div class="accordion-title fl">结算方式</div></div>');

	for (var i = 0; i < data.length; i++) {
		html.push('<div class="accordion-con"><div class="accordion-hd clearfix"><div class="accordion-title fl">');
		html.push('    <label class="radio-inline pointer">');
		html.push('      <input name="promotion-position" id="accordion-radio-' + data[i].id + '" class="regular-radio" type="radio" value="' + data[i].value + '">');
		html.push('      <label for="accordion-radio-' + data[i].id + '"></label>');
		html.push('      <span class="radio-name">' + data[i].text + '</span>');
		html.push('    </label>');
		html.push('</div><div class="accordion-title fl"><p style="padding: 7px 0;">' + data[i].billing + '</p></div></div>');
		html.push('  <div class="advert-input" id="advert-input-' + i + '"></div>');
		html.push('</div>');
	}
	$(".ad-accordion").empty().html(html.join(""));

	//绑定手风琴事件
	$("input[name='promotion-position']").on("change", function() {
		var channel_id = $("input[name='promotion-position']:checked").attr("id").replace(/accordion-radio-/g, "");
		var accordion_id = $(this).attr("id").replace(/accordion-radio-/g, "");

		//隐藏但不删除
		/*$(".advert-input").find("input").addClass("ignore");
		$(".advert-input").hide();

		if($("#advert-input-"+accordion_id).html().trim() == "") {
			_this.getAdvertInput(accordion_id, data);
		}*/

		//删除未选择元素
		$(".advert-input").empty().hide();
		_this.imgUrls = {
			'img': [],
			'infoflow_share_pic': [],
			'logo': []
		};
		_this.getAdvertInput(accordion_id, data);

		$("#advert-input-" + accordion_id).find("input").removeClass("ignore");
		$("#advert-input-" + accordion_id).show();
	});
}

//绑定省市选择事件
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

//绑定场景选择事件
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

	$(".scene-clear").on("click", function() {
		$(this).siblings(".scene-review-list").empty();
	});
}

//绑定盒子场景选择事件
addAdvert.bindBoxSceneEvent = function() {
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

//第三页数据适配器
addAdvert.page3RenderDataAdapter = function(data) {
	var _this = this;
	var resultArr = [];

	for (var key in data) {
		switch (key) {
			case 'adPrice':
				break;
			case 'areas':
				var dataArr = getDataArr(data[key].data);
				resultArr.push({
					id: key,
					text: data[key].name,
					type: 'radio',
					content: dataArr
				});
				resultArr.push({
					id: 'region-selector-box',
					text: '',
					type: 'region',
					content: data['areaJson'].data
				});
				resultArr.push({
					id: 'zone-selector-box',
					text: '',
					type: 'zone',
					content: data['areaJson'].data
				});
				break;
			case 'scenes':
				var dataArr = getDataArr(data[key].data);
				resultArr.push({
					id: key,
					text: data[key].name,
					type: 'radio',
					content: dataArr
				});
				resultArr.push({
					id: 'scene-selector-box',
					text: '',
					type: 'scene',
					content: data['sceneJson']
				});
				resultArr.push({
					id: 'scene-diy-selector-box',
					text: '',
					type: 'box_scene',
					content: data['scenesMessage']
				});
				break;
			case 'areaJson':
				break;
			case 'sceneJson':
				break;
			case 'scenesMessage':
				break;
			case 'channelType':
				break;
			default:
				var dataArr = getDataArr(data[key].data);
				resultArr.push({
					id: key,
					text: data[key].name,
					type: 'radio_checkbox',
					content: dataArr
				});
				break;
		}
	}
	if (window.location.href.indexOf('addDspAdvert') <= 0) {
		resultArr.push({
			id: 'white-list',
			text: '白名单',
			type: 'white-list',
			placeholder: "请输入接受广告者的mac、idfa或imei，按回车键换行, 按回车键换行，最多50条"
		});
	}
	resultArr.push({
		id: 'files',
		text: '数据包',
		type: 'files',
		space: '10mb',
		ext: ['txt'],
		tip: 'txt文档, 不少于10万条, >10kb, 回车换行, 号码类型为手机号、mac、idfa或imei，一个数据包只能上传一种类型的号码',
	});
	addAdvert.config.pages[2].content = resultArr;

	function getDataArr(data, firstCheck) {
		firstCheck = arguments[1] == undefined ? true : arguments[1];
		var dataArr = [];
		for (var i = 0; i < data.length; i++) {
			var dataText = data[i].text ? data[i].text : data[i].type;
			if (firstCheck && i == 0) {
				dataArr.push({
					id: data[i].id,
					text: dataText,
					value: data[i].id,
					checked: true
				});
			} else {
				dataArr.push({
					id: data[i].id,
					text: dataText,
					value: data[i].id
				});
			}
		}
		return dataArr;
	}
}

addAdvert.page2RenderDataAdapter = function(data) {
	var _this = this;
	/*	var channelArr = [];

		for (var i = 0; i < data['channelType'].data.length; i++) {
			var channelData = data['channelType'].data[i];
			channelArr.push({
				id: channelData.id,
				text: channelData.type,
				value: channelData.id,
				checked: i==0
			});
		}

		addAdvert.config.pages[1].content[0].content = channelArr;*/
}

//获取数据+渲染页面
addAdvert.renderPage = function() {
	var _this = this;
	//$('.loading-area').fadeIn();
	var ajax_url = "/advert/renderAdvertDB.do";
	$.ajax({
			url: ajax_url,
			type: 'GET',
			dataType: 'json'
		})
		.done(function(data) {
			if (data.success) {
				priceconfigs = data.priceconfigs;
				prices = data.prices;
				console.log(JSON.stringify(data.prices));
				console.log(data);
				_this.page2RenderDataAdapter(data.result);
				_this.page3RenderDataAdapter(data.result);
				_this.getPages(_this.config.pages);
				//edit
				if ($("#adid").length > 0 && $("#adid").val() != "") {
					_this.editAdvert($("#adid").val()); //回填编辑信息
				}
			}
		})
		.fail(function() {
			console.log("error");
		});
}

//渲染广告素材输入框
addAdvert.getAdvertInput = function(channel, data) {
	var _this = this;

	var inputData = data[channel].content;
	if (data[channel].thumb != "") {
		$('#advert-input-' + channel).append('<div class="advert-thumb"><img src="' + data[channel].thumb + '"></div>');
	}
	for (var i = 0; i < inputData.length; i++) {
		//console.log(inputData[i].type);
		switch (inputData[i].type) {
			case 'text':
				_this.getTextInput($('#advert-input-' + channel), inputData[i]);
				break;
			case 'img':
				_this.getImageInput($('#advert-input-' + channel), inputData[i]);
				break;
			default:
				break;
		}
	}
}

addAdvert.getQiniuFileUploader = function(configId, space, extArr) {
	var _this = this;
	var domain = 'http://share.soundtooth.cn/';
	var isHover = false;
	var uploadStatus = '';

	var showUploadInfos = function(dom, up, file) {
		if (!isHover) {
			$(dom).text(file.percent + '%');
		}
	};

	var uploader = Qiniu.uploader({
		runtimes: 'html5,html4',
		browse_button: 'image-qiniu-' + configId,
		//container: 'img-box',
		// drop_element: 'container',
		min_file_size: '10kb',
		max_file_size: space,
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
			min_file_size: '10kb',
			max_file_size: space,
			prevent_duplicates: false,
			// Specify what files to browse for
			mime_types: [{
					title: "txt files",
					extensions: 'txt'
				}, // 限定jpg,gif,png后缀上传
			]
		},
		init: {
			'FilesAdded': function(up, files) {
				var _up = up;
				var len = files.length;
				plupload.each(files, function(file) {
					isHover = false;
					// 文件添加进队列后,处理相关的事情
					var _file = file;
					var $btn = $('#uploaded-status-' + configId);
					var $status = $('#uploading-kidd-' + configId);

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
				showUploadInfos('#uploading-kidd-' + configId, up, file);
			},
			'UploadComplete': function() {},
			'FileUploaded': function(up, file, info) {
				"use strict";
				uploadStatus = 'uploaded';
				var infoObj = JSON.parse(info);
				var url = domain + infoObj.key;
				var $status = $('#uploading-kidd-' + configId);
				$status.unbind('click')
					.unbind('mouseenter')
					.unbind('mouseleave')
					.text('上传成功' + url)
					.css('cursor', 'auto');
				//$('#add-image').attr('disabled','disabled');
				//$('#hImg').val(domain + infoObj.key);
				//var imageInfoObj = Qiniu.imageInfo(file.target_name);
				//if(checkImgPx(imageInfoObj.width, imageInfoObj.height)) {

				$('#image-qiniu-url-' + configId).val(url);
				_this.fileUrls.files.push({
					'url': url,
					'size': file.size
				});
			},
			'Error': function(up, err, errTip) {
				uploadStatus = 'error';
				var $btn = $('#uploaded-status-' + configId);
				var $status = $('#uploading-kidd-' + configId);

				$status.unbind('mouseenter')
					.unbind('mouseleave')
					.unbind('click')
					.hide();
				if (err.code == -600) {
					$btn.text('文件过大，请重新上传').show();
				} else {
					$btn.text('请重新上传').show();
				}
			}
		}
	});

	function getFileType(filename) {
		return filename.substring(filename.lastIndexOf(".") + 1, filename.length);
	}
}

addAdvert.getQiniuUploader = function(configId, sizeArr, space, extArr) {
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
		browse_button: 'image-qiniu-' + configId,
		//container: 'img-box',
		// drop_element: 'container',
		max_file_size: space,
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
			max_file_size: space,
			prevent_duplicates: false,
			// Specify what files to browse for
			mime_types: [{
					title: "Image files",
					extensions: extArr.join(",")
				}, // 限定jpg,gif,png后缀上传
			]
		},
		init: {
			'FilesAdded': function(up, files) {
				var _up = up;
				var len = files.length;
				plupload.each(files, function(file) {
					isHover = false;
					// 文件添加进队列后,处理相关的事情
					var _file = file;
					var $btn = $('#uploaded-status-' + configId);
					var $status = $('#uploading-kidd-' + configId);

					//checkfiles
					var reader = new FileReader();
					reader.onload = function(e) {
						var clip = document.createElement('img');
						clip.src = e.target.result;

						clip.addEventListener('load', function() {
							var imgWidth = clip.width || clip.naturalWidth;
							var imgHeight = clip.height || clip.naturalHeight;
							console.log('width: ' + (clip.width || clip.naturalWidth) + ', height: ' + (clip.height || clip.naturalHeight));

							if (checkImgPx(imgWidth, imgHeight, sizeArr)) {
								upSizeArr.push({
									width: imgWidth,
									height: imgHeight
								});
								//upload
								up.start();
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
				showUploadInfos('#uploading-kidd-' + configId, up, file);
			},
			'UploadComplete': function() {},
			'FileUploaded': function(up, file, info) {
				"use strict";
				uploadStatus = 'uploaded';
				var infoObj = JSON.parse(info);
				var url = domain + infoObj.key;
				var $status = $('#uploading-kidd-' + configId);
				$status.unbind('click')
					.unbind('mouseenter')
					.unbind('mouseleave')
					.text('上传成功' + url)
					.css('cursor', 'auto');
				//$('#add-image').attr('disabled','disabled');
				//$('#hImg').val(domain + infoObj.key);
				//var imageInfoObj = Qiniu.imageInfo(file.target_name);
				//if(checkImgPx(imageInfoObj.width, imageInfoObj.height)) {

				$('#image-qiniu-url-' + configId).val(url);
				if (configId.indexOf("infoflow_share_pic") >= 0) {
					_this.imgUrls.infoflow_share_pic.push({
						'url': url,
						'size': file.size,
						'width': upSizeArr[0].width,
						'height': upSizeArr[0].height
					});
				} else if (configId.indexOf("logo") >= 0) {
					_this.imgUrls.logo.push({
						'url': url,
						'size': file.size,
						'width': upSizeArr[0].width,
						'height': upSizeArr[0].height
					});
				} else {
					_this.imgUrls.img.push({
						'url': url,
						'size': file.size,
						'width': upSizeArr[0].width,
						'height': upSizeArr[0].height
					});
				}
				//console.log(file);
				/*					$("#img-count").text(_this.imgUrls.img.length);
									var size = file.size > 1000 ? Math.ceil(file.size / 1000) + "KB" : Math.ceil(file.size) + "B";
									var type = "APP广告";
									var html = '<li class="clearfix"><div class="img-review-pic fl"><img src="' + url + '"/></div><div class="img-review-size fl">尺寸:' + upSizeArr[0].width + '*' + upSizeArr[0].height + '</div><div class="img-review-type fl">格式:' + getFileType(file.name) + '</div><div class="img-review-space fl">大小:' + size+ '</div><div class="img-review-space fl">' + type+ '</div><div class="fa fa-close close-btn"></div></li>';
									$('#img-review').children("ul").html(html);
									var preview = '<img src="' + url + '">';
									$('.preview-img-container').empty().append(preview);
									upSizeArr.shift();*/
				/*				} else {
									layer.alert("图片宽高不符合要求，请重新上传");
									var $status = $('#uploading-kidd');
									$status.text('请重新上传');
								}*/
			},
			'Error': function(up, err, errTip) {
				uploadStatus = 'error';
				var $btn = $('#uploaded-status-' + configId);
				var $status = $('#uploading-kidd-' + configId);

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

	function checkImgPx(width, height, sizeArr) {
		var imgSize = width + "*" + height;
		if ($.inArray(imgSize, sizeArr) < 0) {
			return false;
		} else {
			return true;
		}
	}

	function getFileType(filename) {
		return filename.substring(filename.lastIndexOf(".") + 1, filename.length);
	}
}


addAdvert.reviewData = function() {
	var _this = this;
	var html = '';
	var result = {};
	var dateHtml = '<p class="clearfix"><span class="summary-title">推广日期</span><span class="summary-con">' + $("#startDate").val();
	if ($("input[name='pay-type']:checked").val() && $("input[name='put-type']:checked").val() && $("input[name='show-type']:checked").val()) {
		var id = $("input[name='pay-type']:checked").val() + ":" + $("input[name='show-type']:checked").val() + ":" + $("input[name='put-type']:checked").val();
		if ($("input[name='show-type']:checked").val() == "1") {
			id += ":" + $("input[name='push-type2']:checked").val()
		}
		price = prices[id];
		console.log("id:" + id + "---" + price);
	}
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

	$.each($("li.review-show"), function(i, v) {
		console.log("areskey:" + $(this).data("key"));
		if (priceconfigs[$(this).data("key")]) {
			putpricesscenesarea.push(priceconfigs[$(this).data("key")]);
		}
	});
	$(".scene-review-list li").each(function() {
		console.log("scenekey:" + $(this).attr("data-key"));
		if (priceconfigs[$(this).data("key")]) {
			putpricesscenesarea.push(priceconfigs[$(this).data("key")]);
		}
	});

	$(selector).each(function() {
		if ($(this).prop("disabled")) {
			return;
		}
		var key = $(this).data("key");
		// console.log("key:" + key);

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
				if (name.indexOf("infoflow_share_pic") >= 0 || name.indexOf("image-qiniu-img") >= 0 || name.indexOf("image-qiniu-logo") >= 0) {
					html += '<p class="clearfix"><span class="summary-title">' + $(this).parents(".form-group").children("label[for='" + name + "']").text() + '</span><span class="summary-img"><img src="' + $(this).siblings("input[id^='image-qiniu-url-']").val() + '"></span></p>';
				} else {
					html += '<p class="clearfix"><span class="summary-title">' + $(this).parents(".form-group").children("label[for='" + name + "']").text() + '</span><span class="summary-con">' + $(this).val() + '</span></p>';
				}
				if (name == "daily-budget") {
					html += dateHtml;
				}
			}
		}
	});
	var level = 0;
	putprices = putprices.concat(putpricesscenes);
	putprices = putprices.concat(putpricesscenesarea);
	console.log("putprices:" + putprices + "   length:" + putprices.length);
	for (var i = 0; i < putprices.length; i++) {
		console.log("i:" + i + " putprices:" + putprices[i]);
		if (putprices[i]) {
			level += putprices[i] ? putprices[i] : 0;
		}
	}
	if (level != 0) {
		console.log("level:" + level)
		level = (level / putprices.length);
	}
	console.log("level:" + level);
	finalprice = (level != 0 ? level * price : price);
	var _finalprice=finalprice;
	if($("input[name='finalprice']")){
		_finalprice=parseInt($("input[name='finalprice']").val());
	}
	html += '<p class="clearfix"><span class="summary-title">广告</span><span class="summary-con">' + (_finalprice ? _finalprice : 0) + '元</span></p>';
	$(".add-ad-step4").empty();
	$(".add-ad-step4").append(html);
}

addAdvert.bindDataEvent = function() {
	var _this = this;
	var fd = {};

	$("#add-ad-url").val(getUrl($("#add-ad-url").val()));

	var formData = getFormData(".step-box");
	var dateData = getDateData();
	var piriodData = getPiriodData();
	var accountData = getAccountData();

	var fd = $.extend({}, formData, dateData, _this.imgUrls, _this.fileUrls, accountData, piriodData);
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
	var whiteListData = {
		white_list: $("#white-list").val()
	}
	fd = $.extend({}, fd, whiteListData);

	var _finalprice=finalprice?finalprice.toFixed(2):0;
	if($("input[name='finalprice']")){
		_finalprice=$("input[name='finalprice']").val();
	}
	// alert(_finalprice);
	var pricejson = {
		"payType": $("input[name='pay-type']:checked").val(),
		"showType": $("input[name='show-type']:checked").val(),
		"putType": $("input[name='put-type']:checked").val(),
		"pushType2": $("input[name='push-type2']:checked").val(),
		"finalprice": _finalprice*100
	}
	fd = $.extend({}, fd, pricejson);
	console.log(fd);
	console.log(JSON.stringify(fd));

	layer.confirm('请确认您的广告信息', {
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
						window.location.href = BASEURL + "background/AdvertList.html";
					}, 3000);
					layer.msg("发布成功！3秒后跳转到广告列表页面", {
						time: 6000,
						shade: 0.3
					});
				} else {
					layer.alert(data.errMsg);
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
			if ($(this).hasClass("ignore")) {
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
		if (areaLi.children("label").children("input").length >= areaLi.children("label").children("input:checked").length) {
			areaLi.children("label").children("input:checked").each(function() {
				var pdom = $(this).parent().parent();
				result.area.push({
					'id': $(this).val()
				});
				var cityLi = pdom.children(".city-select-list").children("li");
				if (cityLi.children("label").children("input").length >= cityLi.children("label").children("input:checked").length) {
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

//edit start

addAdvert.editAdvert = function(mid) {
	var _this = this;
	$('.loading-area').fadeIn();
	$.ajax({
			url: BASEURL + 'api/editAdvert',
			type: 'POST',
			dataType: 'json',
			data: {
				mid: mid
			}
		})
		.done(function(data) {
			if (data.success) {
				console.log(data);
				var res = data.result;
				$("#ad-name").val(res.title); //标题
				/*if(res.promotionChannel) {
					var channelArr = res.promotionChannel.split("|");
					if($.inArray("0", channelArr) >= 0) {
						$("#daily-budget").prop("disabled", false);
						$("#daily-budget").parents(".form-group").show();
						$("#add-ad-img").parents(".form-group").show();
					}
					if($.inArray("0", channelArr) >= 0) {
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
				}*/
				$("#promotion-position-" + res.spreadPosition).prop("checked", true); //展示方式
				//_this.checkPromotionPosition(res.spreadPosition);
				/*if(_this.typeInfo[res.spreadPosition].infoflow_con){
					$("#infoflow-box").show();
					$(".img-tip").hide();
					$(".img-tip-box").show();
					$("#infoflow-box input").prop("disabled", false);
					$("#infoflow_title").val(res.infoflow_title);
					$("#infoflow_con").val(res.infoflow_con);
				}*/
				//$("#promotion-way-"+res.spreadWay).prop("checked", true); //点击效果
				$("#daily-budget").val(Math.floor(res.funds_limit)); //每日预算
				//渠道
				$("#startDate").val(res.date_start); //开始日期
				//采用新时间字段
				if (res.date_end && res.date_end != "9999-12-30") {
					$("#hasTimeEnd").prop("checked", true);
					$("#endDate").prop("disabled", false);
					$("#endDate").val(res.date_end); //结束日期	
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
				_this.renderEditSelector("scenes", res.spreadScene); //推广场景
				if (res.spreadScene == 2) {
					_this.renderEditSceneSelector(res.spreadSceneType);
				} else if (res.spreadScene == 3) {
					_this.renderEditDiySceneSelector(res.diyScene);
				}

				_this.renderEditSelector("areas", res.spreadArea); //投放区域
				if (res.spreadArea == 2) {
					_this.renderEditRegionSelector(res.province);
				} else if (res.spreadArea == 3) {
					_this.renderEditZoneSelector(res.spreadAreaType);
				}


				_this.renderEditSelector("operators", res.operator); //运营商
				_this.renderEditSelector("network", res.netType); //网络类型
				_this.renderEditSelector("system", res.operationSystem); //操作系统
				_this.renderEditSelector("sex", res.spreadSex); //性别
				_this.renderEditSelector("age", res.spreadAge); //年龄
				_this.renderEditSelector("marry", res.marryStatus); //婚姻
				_this.renderEditSelector("kids", res.babyStatus); //育儿
				_this.renderEditSelector("deviceTag", res.devicetag); //设备标签
				$("#promotion-channel-" + res.channel).click();
				$("#accordion-radio-" + res.spreadPosition).click();

				$("input[name='promotion-channel']").prop("disabled", true);
				$("input[name='promotion-position']").prop("disabled", true);

				$("#add-ad-url").val(res.message_link); //链接

				_this.renderEditImage(res); //图片
			}
			$('.loading-area').fadeOut();
		})
		.fail(function() {
			console.log("error");
		});
}
addAdvert.renderEditSelector = function(name, data) {
	if (data == null || data == "") {
		$(".select-all").find("input[name='" + name + "']").prop("checked", true);
		return;
	}
	if (typeof data == "string") {
		if (data == "1") {
			$(".select-all").find("input[name='" + name + "']").prop("checked", true);
		} else {
			$(".select-all").find("input[name='" + name + "']").prop("checked", false);
			var arr = data.split("|");
			for (var i = 0; i < arr.length; i++) {
				$("#" + name + "-" + arr[i]).prop("checked", true);
			}
		}
	} else {
		if (data == [1]) {
			$(".select-all").find("input[name='" + name + "']").prop("checked", true);
		} else {
			$(".select-all").find("input[name='" + name + "']").prop("checked", false);
			var arr = data;
			for (var i = 0; i < arr.length; i++) {
				$("#" + name + "-" + arr[i]).prop("checked", true);
			}
		}
	}
}
addAdvert.renderEditImage = function(data) {
	_this = this;
	var imageSize = data.imageSize ? data.imageSize.split("*") : [0, 0];
	var infoflow_share_pic_size = data.infoflow_share_pic_size ? data.infoflow_share_pic_size.split("*") : [0, 0];
	//var type = data.channel_image.substring(data.channel_image.lastIndexOf(".") + 1, data.channel_image.length);

	$("#image-qiniu-url-img-" + data.channel + "-" + data.spreadPosition + "-0").val(data.channel_image);
	_this.imgUrls.img.push({
		'url': data.channel_image,
		'width': imageSize[0],
		'height': imageSize[1]
	});
	if (data.infoflow_share_pic) {
		$("#image-qiniu-url-infoflow_share_pic-" + data.channel + "-" + data.spreadPosition).val(data.infoflow_share_pic);
		_this.imgUrls.infoflow_share_pic.push({
			'url': data.infoflow_share_pic,
			'width': infoflow_share_pic_size[0],
			'height': infoflow_share_pic_size[1]
		});
	}
	//$("#img-review").children("ul").append('<li class="clearfix"><div class="img-review-pic fl"><img src="'+data.channel_image+'"></div><div class="img-review-size fl">尺寸:'+data.imageSize+'</div><div class="img-review-type fl">格式:'+type+'</div><div class="img-review-space fl">大小:未知</div><div class="img-review-space fl">' + channel_type+ '</div><div class="fa fa-close close-btn"></div></li>');
}
addAdvert.renderEditSceneSelector = function(data) {
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
addAdvert.renderEditDiySceneSelector = function(data) {
	$("#scene-diy-selector-box").addClass("active");
	if (data == null || data == "null" || data == "") return;
	var scene_root = JSON.parse(data);
	for (var i = 0; i < scene_root.length; i++) {
		var scene_lv1 = scene_root[i];
		$("#scene-diy-selector-box").find("#scene-diy-" + scene_lv1).click();
	}
}
addAdvert.renderEditRegionSelector = function(data) {
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
addAdvert.renderEditZoneSelector = function(data) {
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