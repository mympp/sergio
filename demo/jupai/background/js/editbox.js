// var API_URL= 'http://192.168.10.29/authlaravel/public/';
var API_URL = 'http://auth.soundtooth.cn';
//var API_URL= 'http://testauth.soundtooth.cn';
//var API_URL= 'http://192.168.199.215/authlaravel/public/';
//var API_URL= 'http://localhost/auth_laravel/public';
/** Array Override */
/** polyfill for includes */
if (!Array.prototype.includes) {
	Array.prototype.includes = function(searchElement /*, fromIndex*/ ) {
		'use strict';
		var O = Object(this);
		var len = parseInt(O.length) || 0;

		if (len === 0) {
			return false;
		}

		var n = parseInt(arguments[1]) || 0;
		var k;

		if (n >= 0) {
			k = n;
		} else {
			k = len + n;
			if (k < 0) {
				k = 0;
			}
		}

		var currentElement;

		while (k < len) {
			currentElement = O[k];

			if (searchElement === currentElement || (searchElement !== searchElement && currentElement !== currentElement)) {
				return true;
			}

			k++;
		}

		return false;
	};
}

Array.prototype.eachItem = function(fn) {

	fn = fn || Function.K;
	var a = [];
	var args = Array.prototype.slice.call(arguments, 1);

	for (var i = 0; i < this.length; i++) {
		var res = fn.apply(this, [this[i], i].concat(args));
		if (res != null) {
			a.push(res);
		}
	}

	return a;
};

Array.prototype.uniquelize = function() {
	var ra = new Array();

	for (var i = 0; i < this.length; i++) {
		if (!ra.includes(this[i])) {
			ra.push(this[i]);
		}
	}

	return ra;
};

Array.minus = function(a, b) {
	return a.uniquelize().eachItem(function(o) {
		return b.includes(o) ? null : o
	});
};

Array.union = function(a, b) {
	return a.concat(b).uniquelize();
};

Array.deleteItem = function(operArry, item) {
	$.each(operArry, function(index, val) {
		if (item == val) {
			operArry.splice(index, 1);
		}
	});
}

/** Date Operations */
Date.prototype.format = function(format) {
	var date = {
		'M+': this.getMonth() + 1,
		'd+': this.getDate(),
		'h+': this.getHours(),
		'm+': this.getMinutes(),
		's+': this.getSeconds(),
		'q+': Math.floor((this.getMonth() + 3) / 3),
		'S+': this.getMilliseconds()
	};

	if (/(y+)/i.test(format)) {
		format = format.replace(RegExp.$1, (this.getFullYear() + '').substr(4 - RegExp.$1.length));
	}

	for (var k in date) {
		if (new RegExp('(' + k + ')').test(format)) {
			format = format.replace(RegExp.$1, RegExp.$1.length == 1 ? date[k] : ('00' + date[k]).substr(('' + date[k]).length));
		}
	}

	return format;
}

function macFormat(mac, split) {
	split = split ? split : ":";
	var re = new RegExp("\\w{1,2}", "g");
	ma = mac.toLowerCase().match(re);
	return ma.join(split);
}

/*
 *Pagination 分页器
 */
var Pagination = function(container, params) {
	var s = this;
	s.defaults = {
		pageNo: 1,
		pageCount: 0,
		showRange: 3
	};
	params = params || {};
	var originalParams = {};
	for (var param in params) {
		if (typeof params[param] === 'object' && params[param] !== null && !(params[param].nodeType || params[param] === window || params[param] === document || (typeof Dom7 !== 'undefined' && params[param] instanceof Dom7) || (typeof jQuery !== 'undefined' && params[param] instanceof jQuery))) {
			originalParams[param] = {};
		} else {
			originalParams[param] = params[param];
		}
	}
	for (var def in s.defaults) {
		if (typeof params[def] === 'undefined') {
			params[def] = s.defaults[def];
		}
	}

	s.update = function(params) {
		for (var def in s.defaults) {
			if (typeof params[def] === 'undefined') {
				params[def] = s.defaults[def];
			}
		}
		var html = '';
		if (params.pageCount == null || params.pageCount == 0) {
			$(container).attr("data-page", params.pageNo).html(html);
		} else {
			html = '<div class="pagination-prev"><a class="fa fa-angle-left"></a></div><ul class="pagination">';
			for (var i = 1; i <= params.pageCount; i++) {
				if (params.pageNo == i) {
					html += '<li class="active"><a>' + i + '</a></li>';
					continue;
				} else if (Math.abs(params.pageNo - i) <= params.showRange) {
					html += '<li><a>' + i + '</a></li>';
					continue;
				} else if (i == 1) {
					if (params.pageNo > params.showRange + 2) {
						html += '<li><a>' + i + '</a></li><li class="ellipsis"><a>...</a></li>';
						continue;
					} else {
						html += '<li><a>' + i + '</a></li>';
						continue;
					}
				} else if (i == params.pageCount) {
					if (params.pageCount - params.pageNo > params.showRange + 1) {
						html += '<li class="ellipsis"><a>...</a></li><li><a>' + i + '</a></li>';
						continue;
					} else {
						html += '<li><a>' + i + '</a></li>';
						continue;
					}
				}
			}
			html += '</ul><div class="pagination-next"><a class="fa fa-angle-right"></a></div>';
			$(container).attr("data-page", params.pageNo).html(html);

			if (params.pageNo == 1) {
				$(container + ">.pagination-prev").addClass("disabled");
			} else {
				$(container + ">.pagination-prev").removeClass("disabled");
			}
			if (params.pageNo == params.pageCount) {
				$(container + ">.pagination-next").addClass("disabled");
			} else {
				$(container + ">.pagination-next").removeClass("disabled");
			}

			$(container + " .pagination>li").on("click", function() {
				$(this).addClass("active").siblings().removeClass("active");
				$(container).attr("data-page", $(this).text());
			});
		}
	}
	s.update(params);
};

var verify = {
	init: function() {
		$('#get-verify-code').click(function(event) {
			/* Act on the event */
			var $inputElem = $('#box-phone_add');

			if ($inputElem.val() === '' || /(^(([0\+]\d{2,3}-)?(0\d{2,3})-)(\d{7,8})(-(\d{3,}))?$)|(^0{0,1}1[3|4|5|6|7|8|9][0-9]{9}$)/.test($inputElem.val()) === false) {
				$inputElem.focus();

				var originalPlaceholder = $inputElem.attr('placeholder');
				var oroginalValue = $inputElem.val();
				$inputElem.val('');
				$inputElem.attr('placeholder', '电话无效');

				$inputElem.addClass('warn-input');
				setTimeout(function() {
					$inputElem.val(oroginalValue);
					$inputElem.attr('placeholder', originalPlaceholder);
					$inputElem.removeClass('warn-input');
				}, 2000);
				return;
			} else {
				$(this).attr('disabled', 'disabled')
					.text('发送中')
					.css({
						color: '#e9e9e9'
					});

				$.ajax({
						url: BASEURL + 'admin/api/verifyMessage',
						type: "POST",
						dataType: 'json',
						data: {
							phone: $inputElem.val()
						}
					}).done(function(data) {
						if (data.status === 0) {
							this.attr('disabled', 'disabled')
								.text('已发送')
								.css({
									color: '#6799ff'
								});

							$inputElem = $('#box-verify_code');

							$inputElem.focus();

							$inputElem.addClass('warn-input');
							setTimeout(function() {
								$inputElem.removeClass('warn-input');
							}, 800);

							var timer = 60;
							setTimeout(function() {
								var times = setInterval(function() {
									timer--;
									this.text(timer + '秒');

									if (timer < 0) {
										this.removeAttr('disabled')
											.text('获取验证码');

										clearInterval(times);
									}
								}.bind(this), 1000);
							}.bind(this), 500);
						} else {
							alert(data.errMsg);
						}
					}.bind($(this)))
					.fail(function() {
						alert('服务器错误');
					});
			}
		});
	}
};

var qiniu = {
	uploadImg: function(btnId, imgContainer) {
		var domain = 'http://share.soundtooth.cn/';
		var uploadStatus = '';

		var uploader = Qiniu.uploader({
			runtimes: 'html5,html4',
			browse_button: btnId,
			//container: 'img-box',
			// drop_element: 'container',
			max_file_size: '1024kb',
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
				max_file_size: '1024kb',
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
						// 文件添加进队列后,处理相关的事情
						var _file = file;

						/**
						 * unillegal files
						 */
						uploadStatus = 'uploading';
					});
					var $uploadBtnId = $('#' + btnId);
					var $uploadInfo = $uploadBtnId.siblings('.upload-info');
					var $progress = $uploadBtnId.siblings('.file-button').children('.progress');

					$uploadInfo.fadeOut(400);
					$progress.css({
						width: 0 + '%'
					});
				},
				'BeforeUpload': function(up, file) {},
				'UploadProgress': function(up, file) {
					var $uploadBtnId = $('#' + btnId);
					var $btn = $uploadBtnId.siblings('.file-button').children('.btn-name');
					var $progress = $uploadBtnId.siblings('.file-button').children('.progress');

					$btn.html(file.percent + '%');
					$progress.width(file.percent + '%');
				},
				'UploadComplete': function() {},
				'FileUploaded': function(up, file, info) {
					"use strict";
					uploadStatus = 'uploaded';
					var infoObj = JSON.parse(info);
					var url = domain + infoObj.key;
					var $uploadBtnId = $('#' + btnId);
					var $uploadInfo = $uploadBtnId.siblings('.upload-info');
					var $progress = $uploadBtnId.siblings('.file-button').children('.progress');
					var $btn = $uploadBtnId.siblings('.file-button').children('.btn-name');

					setTimeout(function() {
						$btn.text('上传');
						$progress.width(0);
						$uploadInfo.text('上传成功').fadeIn();

						$uploadBtnId.parent().siblings('.preview__area').find('.portal_pic').css({
							'background-image': 'url(' + url + ')'
						});
						var btnIdNum = "";
						if (btnId != "box-file") {
							btnIdNum = btnId.substring(btnId.length - 1, btnId.length);
						}
						$('#box-portal_ad_img' + btnIdNum).val(url);
					}, 1000);
				},
				'Error': function(up, err, errTip) {
					uploadStatus = 'error';
					var $uploadBtnId = $('#' + btnId);
					var $uploadInfo = $uploadBtnId.siblings('.upload-info');
					var $progress = $uploadBtnId.siblings('.file-button').children('.progress');
					var $btn = $uploadBtnId.siblings('.file-button').children('.btn-name');

					setTimeout(function() {
						$btn.text('上传');
						$progress.width(0);

						if (err.code == -600) {
							$uploadInfo.text('图片不能超过1024kb，请重新上传').fadeIn(400);
						} else {
							$uploadInfo.text('上传失败，请重新上传').fadeIn(400);
						}
					}, 1000);
				}
			}
		});
	}
}

var box = {
	pagi: null,

	postData: {},

	wx_token: '',

	checkStep2Num: 1, //记录进入第二步的次数

	runForNum: 1, //编辑时读取数据2个盒子以上执行的次数

	editCheck: false, //是否是编辑状态
	//'verify_code', 
	optionParams: ['address', 'detailed_address', 'portal_ad_img', 'white_list', 'url_white_list'],
	//未开通微信公众号功能编辑时用
	checkWechatParams: ['wx_id', 'wx_name', 'wx_shopid', 'wx_appid', 'wx_secretkey', 'wx_appsecret'],
	//'name_add', 'phone_add', 'verify_code', 
	checkParams: ['gw_id', 'name', 'shopname', 'address', 'detailed_address', 'white_list', 'portal_ad_img', 'phone', 'ssid', 'offline_limit', 'url_white_list', 'wx_id', 'wx_name', 'wx_shopid', 'wx_appid', 'wx_secretkey', 'wx_appsecret'],
	//'name_add', 'phone_add', 'verify_code', 
	stepParams: [
		['gw_id', 'name', 'shopname', 'address', 'detailed_address', 'phone', 'ssid', 'white_list'],
		// ['portal_ad_img', 'wx_id', 'wx_name', 'wx_shopid', 'wx_appid', 'wx_secretkey', 'wx_appsecret']
		['portal_ad_img']
	],

	/** initiate modules */
	modules: [{
		key: 'box-modular-wechat',
		checked: $('#box-modular-wechat').prop('checked'),
		options: ['file', 'preview-img', 'wx_id', 'wx_name', 'wx_shopid', 'wx_appid', 'wx_secretkey', 'wx_appsecret', 'row_button', 'offline_limit']
	}, {
		key: 'box-modular-ad',
		checked: $('#box-modular-ad').prop('checked'),
		options: ['url_white_list']
	}],

	init: function() {
		/** log out */
		$(document).on('click', '#nav-user-quit', function(event) {
			event.preventDefault();
			window.location.href = BASEURL + 'admin/api/logout';
		});

		// var boxAddress = $('#box-address')
		// if (boxAddress.length > 0) {
		// 	boxAddress.attr('data-toggle', 'city-picker');
		// 	boxAddress.attr('readonly', 'true');
		// }

		// box.getStatisticsInfo();
	},

	listBox: function(pageNo) {
		var that = this;

		// 分页
		this.pagi = new Pagination('#box-list-pagination');

		// 状态下拉
		$(document).on('click', '#child-key-select .dropdown-menu > li', function() {
			$(this).parents('#child-key-select').attr('data-keytype', $(this).attr('data-keytype'));
		});

		$(document).on('click', '.dropdown-click:not(.disable)', function(event) {
			event.stopPropagation();
			$(this).toggleClass('opened');
		});

		$(document).on('click', function() {
			$('.dropdown-click').removeClass('opened');
		});

		$(document).on('click', '.dropdown-click .dropdown-menu > li', function() {
			$(this).parents('.dropdown-click').children('.dropdown-toggle').html($(this).text());
		});

		// 全选
		$('#select-all').on('change', function() {
			if ($(this).prop('checked')) {
				$('#box-table').find('input[type="checkbox"]').prop('checked', true);
			} else {
				$('#box-table').find('input[type="checkbox"]').prop('checked', false);
			}
		});

		// 关闭删除提示框
		$('#del-child-content .del-cancel, #del-child-box .del-ad-mask').on('click', function() {
			setTimeout(function() {
				$('.del-ad-content .title').text('删除盒子后将无法还原');
				$('.del-ad-content .tips').text('删除后，该盒子将会失效');
				$('.del-cancel').text('取消');

				$('#child-del-btn').removeClass('a-disabled');
			}, 400);

			$('#del-child-box').fadeOut(400);
		});

		/** upgrade button */
		$('#upgrade-btn').click(function(event) {
			/* Act on the event */
			var count = 0;
			var token = [];

			$('#box-table').find('input[type="checkbox"]').each(function() {
				if ($(this).prop('checked') === true) {
					count++;

					token.push($(this).attr('token'));
				}
			});

			if (count === 0) {
				$('.upgrade-content .title').text('未选中盒子');
				$('.upgrade-content .tips').next().hide();
				$('.upgrade-content .tips').text('请返回选择');
				$('.upgrade-cancel').text('返回');

				$('#upgrade-confirm-btn').addClass('a-disabled');
			} else {
				token = token.join(',');

				/** clear event firstly */
				$('#upgrade-confirm-btn').click(null)
					.click(function() {
						var version = $('.upgrade-content .tips').next().text();

						version = parseInt(version.substr(1, version.length - 1));

						$.ajax({
								url: API_URL + '/api/setVersion',
								type: 'POST',
								dataType: 'json',
								data: {
									token: token,
									version: version
								},
							})
							.done(function(data) {
								if (data.success === true) {
									window.location.reload();
								}
							})
							.fail(function() {
								console.log("upgrade error");
							});
					});
			}

			$('#upgrade-box').fadeIn();
		});

		// 批量删除
		$('#all-delete-btn').on('click', function() {
			/** check number */
			var count = 0;
			var token = [];

			$('#box-table').find('input[type="checkbox"]').each(function() {
				if ($(this).prop('checked') === true) {
					count++;

					token.push($(this).attr('token'));
				}
			});

			if (count === 0) {
				$('.del-ad-content .title').text('未选中盒子');
				$('.del-ad-content .tips').text('请返回选择');
				$('.del-cancel').text('返回');

				$('#child-del-btn').addClass('a-disabled');
			} else {
				token = token.join(',');
			}

			/** clear event firstly */
			$('#child-del-btn').click(null)
				.click(function() {
					$.ajax({
							url: API_URL + '/api/v3/unregisterRouter',
							type: 'POST',
							dataType: 'json',
							data: {
								token: token
							},
						})
						.done(function(data) {
							if (data.success === true) {
								window.location.reload();
							}
						})
						.fail(function() {
							console.log("error");
						});
				});

			$('#del-child-box').fadeIn();
		});

		// 单个删除
		$('.delete-btn').on('click', function() {
			/** clear event firstly */
			var token = $(this).attr('token');

			$('#child-del-btn').click(null)
				.click(function() {
					$.ajax({
							url: API_URL + '/api/v3/unregisterRouter',
							type: 'POST',
							dataType: 'json',
							data: {
								token: token
							},
						})
						.done(function(data) {
							if (data.success === true) {
								window.location.reload();
							}
						})
						.fail(function() {
							console.log("error");
						});
				});

			$('#del-child-box').fadeIn();
		});

		/** info */
		$('.info-btn').click(function(event) {
			/* Act on the event */
			var data = JSON.parse($(this).parent().parent().children('.td__hidden').text());

			var $content = $('.info-ad-content .info__container');

			/** clear firstly */
			$content.children().remove();

			var show = [{
				key: 'name',
				name: '盒子名称'
			}, {
				key: 'gw_mac',
				name: '盒子Mac'
			}, {
				key: 'phone',
				name: '联系电话'
			}, {
				key: 'ctime',
				name: '添加日期'
			}, {
				key: 'box_type',
				name: '盒子类型'
			}];

			for (var i = 0; i < show.length; i++) {
				var name = show[i].name;

				if (show[i].key === 'is_ad') {
					var value = data[show[i].key] === 0 ? '否' : '是';
				} else if (show[i].key === 'ctime') {
					var value = new Date(data[show[i].key] * 1000).format('yyyy-MM-dd hh:mm:ss');
				} else if (show[i].key === 'box_type') {
					var value = data.box_type == '1' ? '无线盒子' : '有线盒子';

					if (data.box_type != '1') {
						show = show.concat([{
							key: 'address',
							name: '路由所在地'
						}, {
							key: 'providers',
							name: '网络运营商'
						}, {
							key: 'ssid',
							name: 'ssid'
						}, {
							key: 'is_ad',
							name: '是否开通广告'
						}, {
							key: 'is_weixin',
							name: '是否开通微信认证'
						}, {
							key: 'white_list',
							name: '白名单'
						}]);
					}
				} else if (show[i].key === 'white_list') {
					var value = data[show[i].key] === null ? '' : data[show[i].key].split(',').join('<br />');
				} else if (show[i].key === 'is_weixin') {
					var value = data.wx_info.length === 0 ? '否' : '是';

					/** wechat module */
					if (data.wx_info.length !== 0) {
						/** white_list always in the last one */
						for (var j = 0; j < data.wx_info.length; j++) {
							show = show.slice(0, show.length - 1).concat([{
								key: 'wx_id',
								name: '微信公众号id',
								index: j
							}, {
								key: 'wx_name',
								name: '微信公众号名称',
								index: j
							}]).concat(show[show.length - 1]);
						}
					}
				} else if (show[i].key === 'wx_id' || show[i].key === 'wx_name') {
					var value = typeof data.wx_info[show[i].index][show[i].key] === 'undefined' ? '' : data.wx_info[show[i].index][show[i].key];
				} else {
					var value = typeof data[show[i].key] === 'undefined' ? data.under_shops[show[i].key] : data[show[i].key];
				}

				value = value === null ? '' : value;

				$content.append('<div class="content" style="padding: 0 50px;">\
					<span class="name">' + name + '</span>\
					<span class="value">' + value + '</span>\
				</div>');
			}

			$('#info-child-box').fadeIn();
		});

		/** scene */
		$('.scene-btn').click(function(event) {
			var clickdom = this;
			var boxName = $(clickdom).attr('data-name');
			var boxChip = macFormat($(clickdom).attr('data-chipNo'));
			var page = layer.open({
				type: 1,
				title: boxName + '的场景',
				content: '<table class="table table-striped daydata-table" id="scenes-list-table"><colgroup><col style="width: 12%;"><col style="width: 14%;"><col style="width: 7%;"><col style="width: 12%;"><col style="width: 10%;"><col style="width: 18%;"><col style="width: 10%;"><col style="width: 10%;"></colgroup><thead><tr><th>场景名称</th><th>芯片码</th><th>场景状态</th><th>场景归属</th><th>场景类型</th><th>场景地址</th><th>采集Mac数量</th><th>操作</th></tr></thead><tbody></tbody></table>',
				area: ['80%', '80%'], //宽高
				success: function(elem) {
					$.ajax({
							url: BASEURL + 'scene/getBoxMacSceneInfo?Mac=' + boxChip,
							type: 'POST',
							dataType: 'json'
						})
						.done(function(data) {
							console.log(data);
							if (data.success) {
								var scenes = data.result;
								if (scenes.length == 0) {
									$(elem).find(".layui-layer-content").html('<p class="no-data" style="display: block;">暂无数据</p>');
									return;
								}
								var html = [];
								var scenes = data.result;
								if (scenes != null) {
									$("#scene-no-data").hide();
									$("#scene-page-show").show();
									for (var i = 0; i < scenes.length; i++) {
										if (scenes[i].is_perfect == 0) {
											var status = 0;
											var statusText = "未完善";
										} else {
											var status = 1;
											var statusText = "已完善";
										}
										html.push('<tr>');
										html.push('<td>' + (scenes[i].current_name ? scenes[i].current_name : scenes[i].initial_name) + '</td>');
										html.push('<td>' + (scenes[i].chip_no == undefined ? scenes[i].chip_no : scenes[i].chip_no) + '</td>');
										html.push('<td>' + statusText + '</td>');
										/*html.push('<td>' + (scenes[i].boxType==1?"无线":"有线") + '</td>');*/
										html.push('<td>' + scenes[i].name + '</td>');
										html.push('<td>' + (scenes[i].sceneName == undefined ? '—— ——' : scenes[i].sceneName) + '</td>');
										html.push('<td><span class="ad-icon addr-tips tipso_style" data-tipso="' + (scenes[i].addr == undefined ? "信息未完善" : scenes[i].addr) + (scenes[i].city == undefined ? "" : scenes[i].city) + '"></span>' + (scenes[i].city == undefined ? "—— ——" : scenes[i].city) + '</td>');
										html.push('<td>' + scenes[i].sceneNum + '</td>');
										if (ACCOUNT == "") {
											html.push('<td>');
											html.push('<a class="scene-detail" data-id="' + scenes[i].initial_name + '" data-name="' + (statusText == "未完善" ? scenes[i].initial_name : scenes[i].current_name) + '" data-chipId="' + scenes[i].chip_id + '" data-chipNo="' + scenes[i].chip_no + '" data-status="' + status + '"><span class="fa fa-eye"></span></a>');
											html.push('<a class="scene-edit" data-id="' + scenes[i].initial_name + '" data-name="' + (statusText == "未完善" ? scenes[i].initial_name : scenes[i].current_name) + '" data-chipId="' + scenes[i].chip_id + '" data-chipNo="' + scenes[i].chip_no + '" data-status="' + status + '"><span class="fa fa-pencil"></span></a>');
											html.push('<a class="scene-delete" data-id="' + scenes[i].initial_name + '" data-name="' + (statusText == "未完善" ? scenes[i].initial_name : scenes[i].current_name) + '" data-chipId="' + scenes[i].chip_id + '" data-chipNo="' + scenes[i].chip_no + '" data-status="' + status + '"><span class="fa fa-trash"></span></a>'); //暂不上线
											html.push('</td>');
										} else {
											html.push('<td>—— ——</td>');
										}
										html.push('</tr>');
									}
									$(elem).find("#scenes-list-table>tbody").html(html.join(""));
									scenesList.bindEvent();
								}
								//$(elem).find("#scenes-list-table").html(html.join(""));
							} else {
								$(elem).find(".layui-layer-content").html('<p class="no-data" style="display: block;">暂无数据</p>');
							}
						})
						.fail(function(data) {
							console.log("error");
						});
				}
			});
		});

		/** close upgrade */
		$('.upgrade-cancel, .upgrade-mask').click(function(event) {
			/* Act on the event */
			setTimeout(function() {
				$('.upgrade-content .title').text('升级盒子');
				$('.upgrade-content .tips').next().show();
				$('.upgrade-content .tips').text('升级版本');
				$('.upgrade-cancel').text('取消');

				$('#upgrade-confirm-btn').removeClass('a-disabled');
			}, 400);

			$('#upgrade-box').fadeOut();
		});

		/** close info */
		$('.info-cancel, .info-ad-mask').click(function(event) {
			/* Act on the event */
			$('#info-child-box').fadeOut();
		});

		// 编辑
		$('.edit-btn').click(function() {
			window.location.href = 'editBox?token=' + $(this).attr('token');
		});

		// 查询按钮
		$('#child-search-btn').on('click', function() {
			window.location.href = 'box.html?page=1&kw=' + $('#child-key-select').attr('data-keytype') + '&q=' + $('#key-word').val();
		});

		// this.initPage(pageNo);
		getdatajson(getQueryParam(pageNo));
	},

	initVerify: function() {
		/** verify message */
		verify.init();
	},

	initQiniu: function() {
		/** qiniu uploader */
		qiniu.uploadImg('box-file', $('.portal_pic'));
	},

	/**
	 * [initPage: init page for a number]
	 * @param  {[type]} pageNo [description]
	 * @return {[type]}		[description]
	 */
	initPage: function(pageNo) {
		$('.loading-area').fadeIn();
		var pageDataCount = PER; //每页数量（可拓展为参数）
		var searchType = $('#child-key-select').attr("data-keytype");

		var pageCount = Math.ceil(TOTAL / pageDataCount);

		this.pagi.update({
			pageCount: pageCount,
			pageNo: pageNo
		});

		$('.loading-area').fadeOut();

		/** PREV PAGE */
		if (CURRENT > 1) {
			$('.fa-angle-left').click(function(event) {
				/* Act on the event */
				window.location.href = 'box.html?page=' + (CURRENT - 1);
			});
		}

		/** NEXT PAGE */
		if (CURRENT < pageCount) {
			$('.fa-angle-right').click(function(event) {
				/* Act on the event */
				window.location.href = 'box.html?page=' + (CURRENT + 1);
			});
		}

		/** NUMBER JUMP */
		$('#box-list-pagination .pagination > li > a').each(function() {
			$(this).click(function(event) {
				/* Act on the event */
				window.location.href = 'box.html?page=' + $(this).html();
			});
		});
	},

	/**
	 * [warn: warn when input error]
	 * @param  {[type]} item [description]
	 * @param  {[type]} msg  [description]
	 * @return {[type]}      [description]
	 */
	warn: function(item, msg) {
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
		}, 2000);
	},

	initSubmit: function(url, token, step) {
		/** clear click function firstly */
		$('#back-button').unbind('click');
		$('.preview .type').unbind('click');
		$('#submit-button').unbind('click');
		$('#box-modular-ad').unbind('click');
		
		// alert("init step=="+step+",box.runForNum="+box.runForNum);
		token = token || '';

		step = step || 1;
		step = (step > 3 || step < 0) ? 1 : step;

		$('.step-process > li').removeClass('active');
		$('.step-process > li').eq(step - 1).addClass('active');
		
		//编辑读取数据
		if (token != "" && box.runForNum == 1) {
			$('.loading-area').fadeIn();
			box.wx_token = token;
			//编辑时读取数据
			$.ajax({
					url:'/router/editRouter.do',
					type: 'get',
					dataType: 'json',
					data: {
						token: token
					},
				})
				.done(function(data) {
					console.log(data);
					if (data.success =='true') {
						var getData = data.result;
						if (getData.box_type == "1") {
							$("#box-type-cable").removeAttr('checked')
							$("#box-type-wifi").attr('checked', 'checked');
							$("#box-ssid").parent().fadeOut();
							$("#box-white_list").parent().fadeOut();
							$(".step-process").hide();
							$(".step-only-one").show();
							box.editCheck = true;
							$('#submit-button').text('确定').fadeIn();
							$('#submit-button').off('click').click(function() {
								stepTwo();
							});
						}
						// $("#box-name_add").val(getData.name_add);//添加人
						// $("#box-phone_add").val(getData.phone_add);//绑定手机号
						$("#box-gw_id").val(getData.gw_mac); //盒子Mac
						$("#box-name").val(getData.name); //盒子名称
						$("#box-shopname").val(getData.shopname); //商店名称
						$("#box-address").val(getData.address); //商店地址
						$('#box-address').citypicker(); //
						$("#box-detailed_address").val(getData.addressDetail); //详细地址
						$("#box-phone").val(getData.phone); //联系电话
						if (getData.box_type == "0" || getData.box_type == null) {
							$("#box-ssid").val(getData.ssid); //路由ssid
							$("#box-white_list").val(getData.white_list); //白名单
						}
						// alert("box.editCheck=="+box.editCheck);
						if (box.editCheck == false) {
							if (getData.checked_module_wechat == true) { //微信公众号认证功能
								$("#box-modular-wechat").attr('checked', 'checked');
								$("#box-portal_ad_img").val(getData.portal_img); //公众号图片隐藏域
								$('.portal_pic').css('background-image', 'url(' + getData.portal_img + ')');
							} else {
								$("#box-modular-wechat").removeAttr('checked');
								$("#box-router-token").parent().hide();
								box.modules[0].checked = false;
								// alert("getData.portal_img==="+getData.portal_img);
								$("#box-portal_ad_img").val(getData.portal_img); //公众号图片隐藏域
								$('.portal_pic').css('background-image', 'url(' + getData.portal_img + ')');
								
								// $.each(box.checkWechatParams, function(index, val) {
								// 	Array.deleteItem(box.checkParams, val);
								// 	//Array.deleteItem(box.modules[0].options, val);
								// 	$('#box-' + val).parent().fadeOut();
								// 	$('#box-' + val).parent().siblings('.angle-down').fadeOut().siblings('.angle-up').fadeOut();
								// 	$('.add-row-con').hide();
								// });
							}
						}
						box.modules[0].options.push("router-token");
						//广告投放功能
						if (getData.checked_module_ad) {
							$("#box-modular-ad").attr('checked', 'checked');
							$("#box-url_white_list").val(getData.url_white_list); //url白名单
						} else {
							box.modules[1].checked = false;
							$("#box-modular-ad").removeAttr('checked');
							$("#box-url_white_list").parent().fadeOut(); //url白名单
						}
						
						//微信公众号集合
						// if (data.result.wechat != undefined && getData.box_type == "0") {
						// 	var wechatData = data.result.wechat;
						// 	// $('#box-offline_limit').val(data.result.offline_limit);
						// 	$("#box-row_button").attr('data-num', wechatData.length);
						// 	for (var i = 0; i < wechatData.length; i++) {
						// 		if (i == 0) {
						// 			//第一个公众号
						// 			$("#box-router-token").val('http://auth.soundtooth.cn/success?token=' + token + '&wx_wechat_id=' + wechatData[i].wx_wechat_id);
						// 			$("#box-wx_id").val(wechatData[i].wx_id); //微信公众号id
						// 			$("#box-wx_id").attr('disabled', 'disabled'); //编辑时无法修改公众号id
						// 			$("#box-wx_name").val(wechatData[i].wx_name); //微信公众号名称
						// 			$("#box-wx_shopid").val(wechatData[i].wx_shopid); //公众号改造设备shopId
						// 			$("#box-wx_appid").val(wechatData[i].wx_appid); //公众号改造设备appId
						// 			$("#box-wx_secretkey").val(wechatData[i].wx_secretkey); //公众号改造设备secretKey
						// 			$("#box-wx_appsecret").val(wechatData[i].wx_appsecret); //公众号开发密钥appSecret
						// 			$("#box-portal_ad_img").val(wechatData[i].portal_ad_img); //公众号图片隐藏域
						// 			$("#box-iphone-con").find('.portal_pic').css('background-image', 'url(' + wechatData[i].portal_ad_img + ')');
						// 		} else {
						// 			$(".add-row-con").before(box.beforeHtml(i, wechatData[i], true)); //添加一个新盒子
						// 			qiniu.uploadImg('box-file' + i, $('.portal_pic' + i)); //初始化上传按钮
						// 			//box.copy_token(i);//初始化复制按钮
						// 			//添加集合进数组
						// 			box.modules[0].options.push('router-token' + i, 'file' + i, 'iphone-con' + i, 'wx_id' + i, 'wx_name' + i, 'wx_shopid' + i, 'wx_appid' + i, 'wx_secretkey' + i, 'wx_appsecret' + i);
						// 			box.checkParams.push('portal_ad_img' + i, 'wx_id' + i, 'wx_name' + i, 'wx_shopid' + i, 'wx_appid' + i, 'wx_secretkey' + i, 'wx_appsecret' + i);
						// 			box.stepParams[1].push('portal_ad_img' + i, 'wx_id' + i, 'wx_name' + i, 'wx_shopid' + i, 'wx_appid' + i, 'wx_secretkey' + i, 'wx_appsecret' + i);
						// 			roll(); //预览图片部分
						// 			$('.preview .type').off('click').click(function(event) { //切换预览手机型号
						// 				roll();
						// 			});
						// 			BindOpenClose();
						// 		}
						// 	}
						// }

						// if (data.result.wechat == undefined) {
						// 	$("#box-router-token").val('http://auth.soundtooth.cn/success?token=' + token);
						// }

						box.runForNum = 2;
					} else {
						layer.alert('读取数据失败！', {
							icon: 5
						});
					}
					$('.loading-area').fadeOut();
				})
				.fail(function(data) {
					console.log("读取数据失败！");
					$('.loading-area').fadeOut();
					layer.alert('读取数据失败！', {
						icon: 5
					});
				});
		}

		//盒子类型选择
		$('input[name="box_type"]').on('change', function(event) {
			var radioId = this.id;
			if (radioId == "box-type-cable") {
				//有线盒子
				$("#box-ssid").parent().fadeIn(); //隐藏ssid
				$("#box-white_list").parent().fadeIn(); //隐藏白名单
				$(".step-process").show(); //显示步骤
				$(".step-only-one").hide(); //隐藏单步骤
				step = 1;
				$('#submit-button').text('下一步').fadeIn();
				$('#submit-button').off('click').click(function() {
					stepOne();
				});
			} else if (radioId == "box-type-wifi") {
				//无线盒子
				$("#box-ssid").parent().fadeOut();
				$("#box-white_list").parent().fadeOut();
				$(".step-process").hide();
				$(".step-only-one").show();
				step = 3;
				$('#submit-button').text('确定').fadeIn();
				$('#submit-button').off('click').click(function() {
					stepTwo();
				});
			}
		});

		//提示
		function tipso() {
			$('.vital-row .cankao').tipso({
				useTitle: false,
				width: 'auto',
				position: 'bottom',
				background: '#626262'
			});
		}
		tipso();
		/** init options show */
		/** clear first */
		$('.step1, .step2, #back-button').fadeOut();
		$('#submit-button').attr('step', step).fadeOut();
		/** show step options */
		setTimeout(function() {
			$('.step' + step).fadeIn();
			// alert("box.editCheck "+box.editCheck);
			if (box.editCheck == false) {
				$('#submit-button').text(step === 1 ? '下一步' : '确定').fadeIn();
				if(step === 1){
					$('#submit-button').off('click').click(function() {
					stepOne();
				});
				}
			} else if (box.editCheck == true) {
				$('#submit-button').text('确定').fadeIn();
			}
			if (step === 2) {
				$('.loading-area').fadeOut();
				$('#back-button').fadeIn().click(function(event) {
					/* Act on the event */
					box.checkStep2Num++;
					box.initSubmit(url, token, 1);
				});
				var dv_num = 0;

				// $(".weixin-advert").each(function() { //遍历现在有多少个盒子
				// 	dv_num += 1;
				// });
				// // $('#copy_app_master').zclip({
				// // 	path: BASEURL + "js/ZeroClipboard.swf",
				// // 	copy: function() {
				// // 		return $('#box-router-token').val();
				// // 	},
				// // 	afterCopy: function() {
				// // 		$('#copy_app_master #msg').show().fadeOut(2000);
				// // 	}
				// // });
				// for (var i = 1; i < dv_num; i++) {
				// 	$('#copy_app_master' + i).zclip({
				// 		path: BASEURL + "js/ZeroClipboard.swf",
				// 		copy: function(event) {
				// 			return $('#' + event.currentTarget.id).siblings('input').val();
				// 		},
				// 		afterCopy: function(event) {
				// 			$('#' + event.currentTarget.id).children('i').show().fadeOut(2000);
				// 		}
				// 	});
				// }
			}
		}, 400);

		//新增一个公众号
		$("#box-row_button").off('click').on('click', function(event) {
			event.preventDefault();
			//获取将要添加的公众号的编号
			var dv_num = parseInt($("#box-row_button").attr('data-num'));
			//验证是否填写完整
			var idPrefix = '#box-';
			var params = box.stepParams[1];
			/** check empty */
			for (var param = 0; param < params.length; param++) {
				var $inputElem = $(idPrefix + params[param]);
				if (($inputElem.val() === '' && !box.optionParams.includes(params[param])) || !box.checkParams.includes(params[param])) {
					if (box.checkParams.includes(params[param])) {
						if (params[param].indexOf("portal_ad_img") >= 0) {
							layer.msg('请上传广告位图片！', {
								icon: 5,
								time: 2000
							});
						} else {
							box.warn($inputElem, '此项未填');
						}
						return;
					} else {
						/** if not in checkParams, then pass a empty string to the server */
						box.postData[params[param]] = '';
						continue;
					}
				}
				if (params[param].indexOf("wx_id") != -1) {
					var checkVal = checkWxIdRepeat($inputElem);
					if (checkVal == false) {
						return;
					}
				}
			}
			//添加集合进数组
			box.modules[0].options.push('file' + dv_num, 'iphone-con' + dv_num, 'wx_id' + dv_num, 'wx_name' + dv_num, 'wx_shopid' + dv_num, 'wx_appid' + dv_num, 'wx_secretkey' + dv_num, 'wx_appsecret' + dv_num);
			box.checkParams.push('portal_ad_img' + dv_num, 'wx_id' + dv_num, 'wx_name' + dv_num, 'wx_shopid' + dv_num, 'wx_appid' + dv_num, 'wx_secretkey' + dv_num, 'wx_appsecret' + dv_num);
			box.stepParams[1].push('portal_ad_img' + dv_num, 'wx_id' + dv_num, 'wx_name' + dv_num, 'wx_shopid' + dv_num, 'wx_appid' + dv_num, 'wx_secretkey' + dv_num, 'wx_appsecret' + dv_num);
			//隐藏上一个盒子
			var $prevBox = $(".add-row-con").prev(".weixin-advert");
			if ($prevBox.hasClass('the-first-box')) { //第一个盒子
				$prevBox.children('.v-hide').fadeOut(); //隐藏子元素
				$prevBox.children(".angle-down").show().find('.fair_id em').text($("#box-wx_id").val());
				$prevBox.children(".angle-up").hide();
			} else {
				$prevBox.children('div').hide(); //隐藏所有div子元素
				$prevBox.children(".angle-down").show().find('.fair_id em').text($("#box-wx_id" + (dv_num - 1)).val());
				$prevBox.children(".angle-up").hide();
			}
			$(".add-row-con").before(box.beforeHtml(dv_num, '', false)); //添加一个新盒子
			qiniu.uploadImg('box-file' + dv_num, $('.portal_pic' + dv_num)); //初始化上传按钮
			roll(); //预览图片部分
			$('.preview .type').off('click').click(function(event) { //切换预览手机型号
				roll();
			});
			BindOpenClose();
			deleteItem();
			dv_num++;
			tipso();
			$("#box-row_button").attr('data-num', dv_num);
		});
		
		//删除一个
		function deleteItem() {
			$(".angle-down a.delete, .angle-up a.delete").off('click').on('click', function(event) {
				event.preventDefault();
				var $thisBox = $(this).parent().parent('.weixin-advert');
				var boxId = parseInt($thisBox.attr('data-boxId'));
				layer.confirm("确认删除该公众号？", {
					btn: ['确定', '取消'] //按钮
				}, function(index) {
					if (boxId > 0) {
						var boxTotalNum = 0;
						$(".weixin-advert").each(function(index, el) {
							boxTotalNum++;
						});
						if (boxTotalNum == 1) {
							//只剩最后一个
							var delModules = ['file' + boxId, 'iphone-con' + boxId];
							//删除对应大集合中的数据
							$.each(delModules, function(i, val) {
								Array.deleteItem(box.modules[0].options, val);
							});
							$thisBox.children('.del').children('input').val('');
							$thisBox.children('.del').children('.wechat-id').removeAttr('disabled');
						} else if (boxTotalNum > 1) {
							var tIndex = parseInt($(".weixin-advert").index($thisBox)); //当前公众号的索引
							var delModules = ['router-token' + boxId, 'file' + boxId, 'iphone-con' + boxId, 'wx_id' + boxId, 'wx_name' + boxId, 'wx_shopid' + boxId, 'wx_appid' + boxId, 'wx_secretkey' + boxId, 'wx_appsecret' + boxId];
							if (tIndex == 0) {
								delModules.push('file' + (boxId + 1));
								delModules.push('iphone-con' + (boxId + 1));
							}
							//需要从大集合中删除的部分
							var delCheckParams = ['router-token' + boxId, 'file' + boxId, 'iphone-con' + boxId, 'portal_ad_img' + boxId, 'wx_id' + boxId, 'wx_name' + boxId, 'wx_shopid' + boxId, 'wx_appid' + boxId, 'wx_secretkey' + boxId, 'wx_appsecret' + boxId];
							var delStepParams = ['portal_ad_img' + boxId, 'wx_id' + boxId, 'wx_name' + boxId, 'wx_shopid' + boxId, 'wx_appid' + boxId, 'wx_secretkey' + boxId, 'wx_appsecret' + boxId];
							//删除对应大集合中的数据
							$.each(delModules, function(i, val) {
								Array.deleteItem(box.modules[0].options, val);
							});
							$.each(delCheckParams, function(i, val) {
								Array.deleteItem(box.checkParams, val);
							});
							$.each(delStepParams, function(i, val) {
								Array.deleteItem(box.stepParams[1], val);
							});
							$thisBox.remove();
						}
					} else if (boxId == 0) {
						var boxTotalNum = 0;
						var token_check = $thisBox.find('.token_check')[0].id;
						token_check = token_check.substring(4, token_check.length);
						$nextBox = $(".weixin-advert").eq(1);
						//需要从大集合中删除的部分
						var delModules = ['file' + (boxId + 1), 'iphone-con' + (boxId + 1), 'wx_id', 'wx_name', 'wx_shopid', 'wx_appid', 'wx_secretkey', 'wx_appsecret'];
						var delCheckParams = ['wx_id', 'wx_name', 'wx_shopid', 'wx_appid', 'wx_secretkey', 'wx_appsecret'];
						var delStepParams = ['wx_id', 'wx_name', 'wx_shopid', 'wx_appid', 'wx_secretkey', 'wx_appsecret'];
						delModules.push(token_check);
						delCheckParams.push(token_check);
						$(".weixin-advert").each(function(index, el) {
							boxTotalNum++;
						});
						if (boxTotalNum > 1) {
							delCheckParams.push("portal_ad_img");
							delStepParams.push("portal_ad_img");
						}
						if (boxTotalNum == 1) {
							//只剩最后一个
							// $(".weixin-advert").eq(boxId).children('.del').remove();
							$thisBox.children('.del').children('input').val('');
							$thisBox.children('.del').children('.wechat-id').removeAttr('disabled');
							// $("#box-modular-wechat").removeAttr('checked');
							// $("#box-router-token").parent().hide();
							// box.modules[0].checked = false;
						} else if (boxTotalNum > 1) {
							//删除对应大集合中的数据
							$.each(delModules, function(i, val) {
								Array.deleteItem(box.modules[0].options, val);
							});
							$.each(delCheckParams, function(i, val) {
								Array.deleteItem(box.checkParams, val);
							});
							$.each(delStepParams, function(i, val) {
								Array.deleteItem(box.stepParams[1], val);
							});
							$thisBox.remove();
							$(".weixin-advert").eq(0).addClass('the-first-box');
						}
					}
					layer.close(index);
				});
			});
		}
		deleteItem();

		//展开和收起
		function BindOpenClose() {
			//展开
			$(".angle-down a.open").off('click').on('click', function(event) {
				event.preventDefault();
				var userType = $('input:radio[name="user_type"]:checked').val();
				if (userType == 1) {
					$(this).parent('.angle-down').fadeOut().siblings('div').fadeIn();
				} else {
					$(this).parent('.angle-down').fadeOut().siblings('div').not('.access-token-row').fadeIn();
				}
			});
			//收起
			$(".angle-up a.close").off('click').on('click', function(event) {
				event.preventDefault();
				var $prevBox = $(this).parent('.angle-up').parent('.weixin-advert');
				$(this).parent('.angle-up').fadeOut();
				if ($prevBox.hasClass('the-first-box')) { //第一个盒子
					$prevBox.children('.v-hide').fadeOut(); //隐藏子元素
					$prevBox.children(".angle-down").show().find('.fair_id em').text($("#box-wx_id").val());
				} else {
					$prevBox.children('div').fadeOut(); //隐藏所有div子元素
					$prevBox.children(".angle-down").show().find('.fair_id em').text($("#box-wx_id" + $(this).attr("data-id")).val());
				}
			});
		}
		BindOpenClose();
		
		$(document).on('blur', ".wechat-id", function(event) {
			event.preventDefault();
			checkWxIdRepeat($(this));
		});

		//检查微信id是否重复
		function checkWxIdRepeat(wx_idElement) {
			var index = $(".wechat-id").index(wx_idElement);
			var value = wx_idElement.val();
			var isRight = true;
			$(".wechat-id").each(function(i, el) {
				if (index != i) {
					var val = el.value;
					if (val == value) {
						//layer.msg('请勿填写重复公众号id！', {icon: 5,time: 2000});
						$('html,body').animate({
							scrollTop: wx_idElement.offset().top
						}, 800);
						box.warn($(".wechat-id").eq(index), '请勿填写重复公众号id！');
						isRight = false;
						return false;
					}
				}
			});
			return isRight;
		}

		/** preview ration */
		var whRatio = {
			'i6': {
				name: 'iPhone 6',
				width: 375,
				height: 667
			},
			'i6p': {
				name: 'iPhone 6 Plus',
				width: 414,
				height: 736
			},
			'i5': {
				name: 'iPhone 5',
				width: 320,
				height: 568
			},
			'gs5': {
				name: 'Galaxy S5',
				width: 360,
				height: 640
			}
		}

		var whRatioArray = ['i6', 'i6p', 'i5', 'gs5'];
		var whRatioCount = 0;

		function changePreview(type) {
			var previewRight = ($('.container__relative').width() - 525) / 2 / 2 - ($('.container__relative').width() / 5 / 2);

			// $('.preview__area').css({
			// 	'right': previewRight > 0 ? previewRight + 'px' : 10 + 'px'
			// });//2016.09.18 11:51 聂楠注释

			$('.preview__area').css({
				'right': '-' + (277 * ($('.container__relative').width() / 5 / 277) + 10) + 'px'
			});

			var $preview = $('.preview');
			$preview.width($preview.parent().width());

			var previewHeight = $preview.width() / (whRatio[type].width / whRatio[type].height);
			$preview.parent().height(previewHeight);
			$preview.parent().parent().height(previewHeight + 560 - 374)
				.css({
					'transform': 'scale(' + $('.container__relative').width() / 5 / 277 + ')',
					'-webkit-transform': 'scale(' + $('.container__relative').width() / 5 / 277 + ')',
					'-ms-transform': 'scale(' + $('.container__relative').width() / 5 / 277 + ')',
					'-o-transform': 'scale(' + $('.container__relative').width() / 5 / 277 + ')'
				});
			$preview.height($preview.width() / (whRatio[type].width / whRatio[type].height));
			$('.preview .type').text(whRatio[type].name);

			var ratio = $preview.width() / whRatio[type].width;

			$('.preview .portal_pic').height(300 * ratio);

			$('.preview .operation-container').css({
				'bottom': 50 * ratio + 'px'
			});
			$('.preview .operation-container .btn').css({
				'height': 50 * ratio + 'px',
				'border-radius': 5 * ratio + 'px',
				'font-size': 16 * ratio + 'px',
				'line-height': 50 * ratio + 'px',
			});

			$('.preview .operation-container .sub-title').css({
				'font-size': 12 * ratio + 'px',
				'margin': 10 * ratio + 'px'
			});
		}

		function roll() {
			changePreview(whRatioArray[whRatioCount]);
			whRatioCount = (whRatioCount + 1) % whRatioArray.length;
		}

		function changePreviewTrigger() {
			changePreview(whRatioArray[whRatioCount - 1]);
		}

		window.removeEventListener('resize', changePreviewTrigger);
		window.addEventListener('resize', changePreviewTrigger);

		roll();
		$('.preview .type').click(function(event) {
			/* Act on the event */
			roll();
		});

		// for (var item = 0; item < box.modules.length; item++) {
		// 	$('#' + box.modules[item].key).attr('module-index', item);
		// 	$('#' + box.modules[item].key).off('change').change(function(event) {
		// 		/* Act on the event */
		// 		var item = parseInt($(this).attr('module-index'));

		// 		box.modules[item].checked = !box.modules[item].checked;
		// 		$(this).prop('checked', box.modules[item].checked);

		// 		if (box.modules[item].checked) {
		// 			/** add options to checkParams array */
		// 			box.checkParams = Array.union(box.checkParams, box.modules[item].options);

		// 			for (var option = 0; option < box.modules[item].options.length; option++) {
		// 				$('#box-' + box.modules[item].options[option]).parent().fadeIn();
		// 				$('#box-' + box.modules[item].options[option]).parent().siblings('.angle-up').fadeIn();
		// 			}
		// 		} else {
		// 			/** remove options from checkParams array */
		// 			box.checkParams = Array.minus(box.checkParams, box.modules[item].options);

		// 			for (var option = 0; option < box.modules[item].options.length; option++) {
		// 				$('#box-' + box.modules[item].options[option]).parent().fadeOut();
		// 				$('#box-' + box.modules[item].options[option]).parent().siblings('.angle-down').fadeOut().siblings('.angle-up').fadeOut();
		// 			}
		// 			if(box.modules[item].key == "box-modular-wechat"){
		// 				$(".the-first-box .preview__area").show();
		// 				$(".the-first-box .vital-row .upload-info").parent().show();
		// 			}
		// 		}
		// 	});

		// 	if (box.modules[item].checked) {
		// 		/** add options to checkParams array */
		// 		box.checkParams = Array.union(box.checkParams, box.modules[item].options);
		// 		if (box.checkStep2Num == 1) { //返回第一步后再进入第二步不执行
		// 			for (var option = 0; option < box.modules[item].options.length; option++) {
		// 				$('#box-' + box.modules[item].options[option]).parent().fadeIn();
		// 			}
		// 		}
		// 	} else {
		// 		/** remove options from checkParams array */
		// 		box.checkParams = Array.minus(box.checkParams, box.modules[item].options);
		// 		if (box.checkStep2Num == 1) { //返回第一步后再进入第二步不执行
		// 			for (var option = 0; option < box.modules[item].options.length; option++) {
		// 				$('#box-' + box.modules[item].options[option]).parent().fadeOut();
		// 			}
		// 		}
		// 	}
		// }

		// $('#box-offline_limit').change(function(event) {
		// 	/* Act on the event */
		// 	var that = $(this);
		// 	var val = parseInt(that.val());

		// 	if (val < 2) {
		// 		that.val(2);
		// 	} else {
		// 		that.val(val);
		// 	}
		// });
		
		$('#submit-button')
			.click(function() {
				
				var idPrefix = '#box-';
				var stepNum = parseInt($(this).attr('step'));
				var params = box.stepParams[parseInt($(this).attr('step')) - 1];
				var boxFairArry = [];
				var box_mess = {};
				var p_index = 1;
				/** check empty */

				for (var param = 0; param < params.length; param++) {
					var $inputElem = $(idPrefix + params[param]);

					if (($inputElem.val() === '' && !box.optionParams.includes(params[param])) || !box.checkParams.includes(params[param])) {
						if (box.checkParams.includes(params[param])) {
							if (params[param].indexOf("portal_ad_img") >= 0) {
								layer.msg('请上传广告位图片！', {
									icon: 5,
									time: 2000
								});
							} else {
								box.warn($inputElem, '此项未填');
							}
							return;
						} else {
							/** if not in checkParams, then pass a empty string to the server */
							box.postData[params[param]] = '';
							continue;
						}
					} else if ($inputElem.val() !== '' && params[param] === 'gw_id' && /[A-F\d]{2}[A-F\d]{2}[A-F\d]{2}[A-F\d]{2}[A-F\d]{2}[A-F\d]{2}/.test($inputElem.val()) === false) {
						box.warn($inputElem, 'Mac无效');
						return;
					} else if ($inputElem.val() !== '' && params[param] === 'white_list' && /^([a-fA-F\d]{2}:[a-fA-F\d]{2}:[a-fA-F\d]{2}:[a-fA-F\d]{2}:[a-fA-F\d]{2}:[a-fA-F\d]{2}[,])*([a-fA-F\d]{2}:[a-fA-F\d]{2}:[a-fA-F\d]{2}:[a-fA-F\d]{2}:[a-fA-F\d]{2}:[a-fA-F\d]{2}$)/.test($inputElem.val()) === false) {
						box.warn($inputElem, '白名单无效');
						return;
					} else if ($inputElem.val() !== '' && (params[param] === 'phone' || params[param] === 'phone_add') && /(^(([0\+]\d{2,3}-)?(0\d{2,3})-)(\d{7,8})(-(\d{3,}))?$)|(^0{0,1}1[3|4|5|6|7|8|9][0-9]{9}$)/.test($inputElem.val()) === false) {
						box.warn($inputElem, '电话无效');
						return;
					} else {
						// if (params[param].indexOf("wx_id") != -1) {
						// 	var checkVal = checkWxIdRepeat($inputElem);
						// 	if (checkVal == false) {
						// 		return;
						// 	}
						// }
						if (params[param] === 'detailed_address') {
							box.postData['address'] = $inputElem.val().trim();

							continue;
						}

						if (params[param] === 'address') {
							$('.city-picker-span .select-item').each(function(index, el) {
								box.postData[$(this).attr('data-count')] = $(this).html().trim();
							});

							if (typeof(box.postData['province']) == 'undefined' || typeof(box.postData['city']) == 'undefined' || typeof(box.postData['district']) == 'undefined') {
								box.postData['province'] = '';
								box.postData['city'] = '';
								box.postData['district'] = '';
							}

							continue;
						}

						if (params[param] === 'gw_id') {
							box.postData['gw_mac'] = $inputElem.val().trim();
							continue;
						}
						if (stepNum === 1) {
							box.postData[params[param]] = $inputElem.val().trim();
						} else if (stepNum === 2) {
							// if (box.modules[0].checked) {
							// 	//勾选了微信公众号认证
							// 	box_mess[params[param]] = $inputElem.val().trim();
							// 	if (p_index % 7 == 0) {
							// 		boxFairArry.push(box_mess);
							// 		box_mess = {};
							// 	}
							// 	if (p_index == params.length) {
							// 		box.postData['boxFairArry'] = boxFairArry;
							// 	}
							// 	p_index++;
							// } else {
							// 	delete box.postData['boxFairArry'];
								if (params[param].indexOf('portal_ad_img') != -1 && box.postData['portal_ad_img'] == undefined) {
									box.postData['portal_ad_img'] = $inputElem.val().trim();
								} else {
									box.postData[params[param]] = $inputElem.val().trim();
								}
							// }
						}
					}
				}

				$('.loading-area').fadeIn();
				if (parseInt($(this).attr('step')) === 1) {
					/** check mac and verfication code */
					
					var url = API_URL + '/router/editRouter.do';

					box.initSubmit(url, token, 2);

				} else if (parseInt($(this).attr('step')) === 2) {
					box.postData['uid'] = UID;
					box.postData['gw_address'] = '192.168.1.1';
					box.postData['gw_port'] = '2060';
					box.postData['token'] = token;
					box.postData['is_ad'] = $('#box-modular-ad').prop('checked');
					box.postData['box_type'] = $('#box-type-cable').prop('checked') == true ? "0" : "1"; //0：有线盒子，1：无线盒子

					box.postData['url_white_list'] = $('#box-url_white_list').val().trim();
					// box.postData['offline_limit'] = parseInt($('#box-offline_limit').val().trim());
					


					var jb = box.postData;
					var sta;
					for (var key in jb) {
						sta = sta + key + ":" + jb[key] + "\n"

					}
					
					$.ajax({
							url: '/router/editRouterAct.do',
							type: 'POST',
							dataType: 'json',
							data: {
							data: JSON.stringify(box.postData)
					}
						})
						.done(function(data) {
							if (data.success =='true') {
								layer.msg('保存盒子成功!', {
									icon: 6,
									time: 2000
								});
								window.location.href = 'box.html';
								$('.loading-area').fadeOut();
							} else {

								switch (data.errCode) {
									case 605:
										/** Router Already Registered */
										$('.loading-area').fadeOut();
										box.warn($('#box-gw_id'), '盒子Mac已被注册');
										layer.msg('盒子Mac已被注册!', {
											icon: 5,
											time: 2000
										});
										return;
									default:
										return;
								}
							}
							$('.loading-area').fadeOut();
						})
						.fail(function(data) {
							
							console.log("error");
							$('.loading-area').fadeOut();
						});
				}
			});

		//第一步
		function stepOne() {

			box.postData['box_type'] = $('#box-type-cable').prop('checked') == true ? "0" : "1"; //0：有线盒子，1：无线盒子
			var idPrefix = '#box-';
			var stepNum = parseInt($('#submit-button').attr('step'));
			var params = box.stepParams[parseInt($('#submit-button').attr('step')) - 1];
			var boxFairArry = [];
			var box_mess = {};
			var p_index = 1;

			/** check empty */
			for (var param = 0; param < params.length; param++) {
				var $inputElem = $(idPrefix + params[param]);

				if (($inputElem.val() === '' && !box.optionParams.includes(params[param])) || !box.checkParams.includes(params[param])) {
					// if (box.checkParams.includes(params[param])) {
					// 	box.warn($inputElem, '此项未填');
					// 	return;
					// } else {
					// 	* if not in checkParams, then pass a empty string to the server 
					// 	box.postData[params[param]] = '';
					// 	continue;
					// }
				} else if ($inputElem.val() !== '' && params[param] === 'gw_id' && /[A-F\d]{2}[A-F\d]{2}[A-F\d]{2}[A-F\d]{2}[A-F\d]{2}[A-F\d]{2}/.test($inputElem.val()) === false) {
					box.warn($inputElem, 'Mac无效');
					return;
				} else if ($inputElem.val() !== '' && params[param] === 'white_list' && /^([a-fA-F\d]{2}:[a-fA-F\d]{2}:[a-fA-F\d]{2}:[a-fA-F\d]{2}:[a-fA-F\d]{2}:[a-fA-F\d]{2}[,])*([a-fA-F\d]{2}:[a-fA-F\d]{2}:[a-fA-F\d]{2}:[a-fA-F\d]{2}:[a-fA-F\d]{2}:[a-fA-F\d]{2}$)/.test($inputElem.val()) === false) {
					box.warn($inputElem, '白名单无效');
					return;
				} else if ($inputElem.val() !== '' && (params[param] === 'phone' || params[param] === 'phone_add') && /(^(([0\+]\d{2,3}-)?(0\d{2,3})-)(\d{7,8})(-(\d{3,}))?$)|(^0{0,1}1[3|4|5|6|7|8|9][0-9]{9}$)/.test($inputElem.val()) === false) {
					box.warn($inputElem, '电话无效');
					return;
				} else {
					if (params[param] === 'detailed_address') {
						box.postData['address'] = $inputElem.val().trim();

						continue;
					}

					if (params[param] === 'address') {
						$('.city-picker-span .select-item').each(function(index, el) {
							box.postData[$(this).attr('data-count')] = $(this).html().trim();
						});

						if (typeof(box.postData['province']) == 'undefined' || typeof(box.postData['city']) == 'undefined' || typeof(box.postData['district']) == 'undefined') {
							box.postData['province'] = '';
							box.postData['city'] = '';
							box.postData['district'] = '';
						}

						continue;
					}

					if (params[param] === 'gw_id') {
						box.postData['gw_mac'] = $inputElem.val().trim();
						continue;
					}
					if (stepNum === 1) {
						box.postData[params[param]] = $inputElem.val().trim();
					} else if (stepNum === 2) {
						if (box.modules[0].checked) {
							//勾选了微信公众号认证
							box_mess[params[param]] = $inputElem.val().trim();
							if (p_index % 7 == 0) {
								boxFairArry.push(box_mess);
								box_mess = {};
							}
							if (p_index == params.length) {
								box.postData['boxFairArry'] = boxFairArry;
							}
							p_index++;
						} else {
							delete box.postData['boxFairArry'];
							box.postData[params[param]] = $inputElem.val().trim();
						}
					}
				}
			}

			$('.loading-area').fadeIn();
			if (parseInt($('#submit-button').attr('step')) === 1) {
				/** check mac and verfication code */
				
				box.initSubmit(url, token, 2);
				$('.loading-area').fadeOut();
				// $.ajax({
				// 		url: API_URL + '/router/editRouterAct',
				// 		type: 'POST',
				// 		dataType: 'json',
				// 		data: {
				// 			phone_add: box.postData['phone_add'],
				// 			verify_code: box.postData['verify_code'],
				// 			gw_mac: box.postData['gw_mac'],
				// 			token: token
				// 		},
				// 	})
				// 	.done(function(data) {
				// 		if (data.success === true) {
				// 			box.initSubmit(url, token, 2);
				// 		} else {
				// 			switch (data.errCode) {
				// 				case 305:
				// 					/** Router Already Registered */
				// 					$('.loading-area').fadeOut();
				// 					box.warn($('#box-gw_id'), '盒子Mac已被注册2');
				// 					return;
				// 				case 306:
				// 					/** Verify code wrong */
				// 					box.warn($('#box-verify_code'), '验证码无效');
				// 					return;
				// 				default:
				// 					return;
				// 			}
				// 		}
				// 		$('.loading-area').fadeOut();
				// 	})
				// 	.fail(function(data) {
				// 		console.log("error");
				// 		$('.loading-area').fadeOut();
				// 	});
			} else if (parseInt($('#submit-button').attr('step')) === 2) {
				
				box.postData['uid'] = UID;
				box.postData['gw_address'] = '192.168.1.1';
				box.postData['gw_port'] = '2060';
				box.postData['token'] = token;
				box.postData['is_ad'] = $('#box-modular-ad').prop('checked');
				box.postData['box_type'] = $('#box-type-cable').prop('checked') == true ? "0" : "1"; //0：有线盒子，1：无线盒子
				box.postData['name_add'] = 'test';
				box.postData['verify_code'] = '8888';
				box.postData['phone_add'] = "12345678912";
				$.ajax({
						url: API_URL + url,
						type: 'POST',
						dataType: 'json',
						data: box.postData,
					})
					.done(function(data) {
						if (data.success === true) {
							layer.msg('保存盒子成功!', {
								icon: 6,
								time: 2000
							});
							window.location.href = 'box.html';
						}
						$('.loading-area').fadeOut();
					})
					.fail(function(data) {
						console.log("error");
						$('.loading-area').fadeOut();
					});
			}

		} //end
		//第二步
		function stepTwo() {
			
			var idPrefix = '#box-';
			var stepNum = 1;
			box.stepParams[0].splice(6, 2);
			var params = box.stepParams[0];

			/** check empty */
			for (var param = 0; param < params.length; param++) {
				var $inputElem = $(idPrefix + params[param]);

				if (($inputElem.val() === '' && !box.optionParams.includes(params[param])) || !box.checkParams.includes(params[param])) {
					if (box.checkParams.includes(params[param])) {
						if (params[param].indexOf("portal_ad_img") >= 0) {
							layer.msg('请上传广告位图片！', {
								icon: 5,
								time: 2000
							});
						} else {
							box.warn($inputElem, '此项未填');
						}
						return;
					} else {
						/** if not in checkParams, then pass a empty string to the server */
						box.postData[params[param]] = '';
						continue;
					}
				} else if ($inputElem.val() !== '' && params[param] === 'gw_id' && /[A-F\d]{2}[A-F\d]{2}[A-F\d]{2}[A-F\d]{2}[A-F\d]{2}[A-F\d]{2}/.test($inputElem.val()) === false) {
					box.warn($inputElem, 'Mac无效');
					return;
				} else if ($inputElem.val() !== '' && params[param] === 'white_list' && /^([a-fA-F\d]{2}:[a-fA-F\d]{2}:[a-fA-F\d]{2}:[a-fA-F\d]{2}:[a-fA-F\d]{2}:[a-fA-F\d]{2}[,])*([a-fA-F\d]{2}:[a-fA-F\d]{2}:[a-fA-F\d]{2}:[a-fA-F\d]{2}:[a-fA-F\d]{2}:[a-fA-F\d]{2}$)/.test($inputElem.val()) === false) {
					box.warn($inputElem, '白名单无效');
					return;
				} else if ($inputElem.val() !== '' && (params[param] === 'phone' || params[param] === 'phone_add') && /(^(([0\+]\d{2,3}-)?(0\d{2,3})-)(\d{7,8})(-(\d{3,}))?$)|(^0{0,1}1[3|4|5|6|7|8|9][0-9]{9}$)/.test($inputElem.val()) === false) {
					box.warn($inputElem, '电话无效');
					return;
				} else {
					if (params[param].indexOf("wx_id") != -1) {
						var checkVal = checkWxIdRepeat($inputElem);
						if (checkVal == false) {
							return;
						}
					}
					if (params[param] === 'detailed_address') {
						box.postData['address'] = $inputElem.val().trim();

						continue;
					}

					if (params[param] === 'address') {
						$('.city-picker-span .select-item').each(function(index, el) {
							box.postData[$(this).attr('data-count')] = $(this).html().trim();
						});

						if (typeof(box.postData['province']) == 'undefined' || typeof(box.postData['city']) == 'undefined' || typeof(box.postData['district']) == 'undefined') {
							box.postData['province'] = '';
							box.postData['city'] = '';
							box.postData['district'] = '';
						}

						continue;
					}

					if (params[param] === 'gw_id') {
						box.postData['gw_mac'] = $inputElem.val().trim();
						continue;
					}
					box.postData[params[param]] = $inputElem.val().trim();
				}
			}

			box.postData['uid'] = UID;
			box.postData['gw_address'] = '192.168.1.1';
			box.postData['gw_port'] = '2060';
			box.postData['token'] = token;
			box.postData['box_type'] = $('#box-type-cable').prop('checked') == true ? "0" : "1"; //0：有线盒子，1：无线盒子
			
			$('.loading-area').fadeIn();

			$.ajax({
					url: '/router/editRouterAct.do',
					type: 'POST',
					dataType: 'json',
					data: {
						data: JSON.stringify(box.postData)
					}
				})
				.done(function(data) {
					if (data.success === true) {
						layer.msg('保存盒子成功!', {
							icon: 6,
							time: 2000
						});
						window.location.href = 'box.html';
					}
					$('.loading-area').fadeOut();
				})
				.fail(function(data) {
					console.log("error");
					$('.loading-area').fadeOut();
				});
		} //end
	},

	copy_token: function(num) {
		$('#copy_app_master' + num).zclip({
			path: BASEURL + "js/ZeroClipboard.swf",
			copy: function() {
				return $('#box-router-token' + num).val();
			},
			afterCopy: function() {
				$('#copy_app_master' + num + ' #msg' + num).show().fadeOut(2000);
			}
		});
	},

	addBox: function() {
		var boxAddress = $('#box-address')
		if (boxAddress.length > 0) {
			boxAddress.attr('data-toggle', 'city-picker');
			boxAddress.attr('readonly', 'true');
		}
		this.initVerify();
		// this.initQiniu();
		this.initSubmit('/api/v3/registerRouter');
	},

	editBox: function(token) {
		this.initVerify();
		// this.initQiniu();
		this.initSubmit('/router/editRouter.do', token);
	},
	//获取统计信息
	getStatisticsInfo: function() {
		$.ajax({
				url: BASEURL + 'box/getBoxSceneSum',
				type: 'POST',
				dataType: 'json',
				data: {
					type: 0,
					user_id: ACCOUNT
				}
			})
			.done(function(data) {
				console.log(data);
				if (data.success) {
					//客户的
					var child_chipTotal = data.result.chip_sum_num == null ? 0 : data.result.chip_sum_num; //芯片总数
					var child_sceneTotal = data.result.scene_sum_num == null ? 0 : data.result.scene_sum_num; //场景总数
					$("#child-chipTotal").text(child_chipTotal);
					$("#child-sceneTotal").text(child_sceneTotal);
					//代理商自己的
					var self_chipTotal = data.result.self_chip_num == null ? 0 : data.result.self_chip_num; //芯片总数
					var self_sceneTotal = data.result.self_scene_num == null ? 0 : data.result.self_scene_num; //场景总数
					//$("#self-chipTotal").text(self_chipTotal);
					$("#self-sceneTotal").text(self_sceneTotal);
					//客户总数量
					var child_totalCount = data.result.sub_num == null ? 0 : data.result.sub_num;
					$("#child-totalCount").text(child_totalCount);
				}
			})
			.fail(function() {
				$("#child-chipTotal").text("0");
				$("#child-sceneTotal").text("0");
				//$("#self-chipTotal").text("0");
				$("#self-sceneTotal").text("0");
				$("#child-totalCount").text("0");
				console.log("error");
			});
	},

	/*
	 *id_num：用作区别id的数字
	 *box_data：用作填充文本框和隐藏域的值
	 *wx_id_disabled：判断是否禁用微信公众号id文本框（编辑时禁用；true：禁用）
	 */
	// beforeHtml: function (id_num, box_data, wx_id_disabled) {
	// 	var wx_id = wx_id_disabled == true ? 'disabled="disabled"' : '';
	// 	var html = '<div class="weixin-advert">';
	// 	html += '<div class="vital-row">';
	// 	html += '<span class="span__title">广告位图片:</span>';
	// 	html += '<label class="file-button" for="box-file' + id_num + '"><span class="btn-name">上传</span><label class="progress"></label></label>';
	// 	html += '<span class="upload-info">Warning</span>';
	// 	html += '<input id="box-file' + id_num + '" class="file-input" type="file">';
	// 	html += '<input type="hidden" id="box-portal_ad_img' + id_num + '" value="' + (box_data != '' ? box_data.portal_ad_img : '') + '">';
	// 	html += '</div>';//
	// 	html += '<div class="preview__area" id="preview_img' + id_num + '"><div class="iphone4" id="box-iphone-con' + id_num + '"><div class="iphone4__header">';
	// 	html += '<div style="float: left; margin-top: -4px; width: 16px; height: 16px; border: 1px solid #ededed; border-radius: 9px 9px;"></div>';
	// 	html += '<div style="float: left; width: 54px; height: 5px; margin-left: 15px; border: 1px solid #ededed; border-radius: 7px 7px;"></div>';
	// 	html += '</div><div class="iphone4__screen"><span class="preview"><div class="type"></div><div class="portal_pic" style="background-image: url(' + (box_data != '' ? box_data.portal_ad_img : '') + ');"></div>';
	// 	html += '<div class="operation-container"><div class="btn">xxxxx</div><div class="sub-title">xxxxxxxxxxxx</div></div></span></div>';
	// 	html += '<div class="iphone4__home-outer"><div class="iphone4__home-inner"></div></div></div></div>';//
	// 	html += '<div class="vital-row"><span class="span__title">微信公众号id:</span><input type="text" placeholder="请输入正确的微信公众号id" maxlength="" id="box-wx_id' + id_num + '" value="' + (box_data != '' ? box_data.wx_id : '') + '" ' + wx_id + '>';
	// 	html += '</div>';//
	// 	html += '<div class="vital-row"><span class="span__title">微信公众号名称:</span>';
	// 	html += '<input type="text" placeholder="请输入正确的微信公众号名称" maxlength="" id="box-wx_name' + id_num + '" value="' + (box_data != '' ? box_data.wx_name : '') + '">';
	// 	html += '</div>';//
	// 	html += '<div class="vital-row"><span class="span__title">公众号改造设备shopId:</span><input type="text" placeholder="请输入正确的改造设备shopId" maxlength="" id="box-wx_shopid' + id_num + '" value="' + (box_data != '' ? box_data.wx_shopid : '') + '">';
	// 	html += '</div>';//
	// 	html += '<div class="vital-row"><span class="span__title">公众号改造设备appId:</span><input type="text" placeholder="请输入正确的改造设备appId" maxlength="" id="box-wx_appid' + id_num + '" value="' + (box_data != '' ? box_data.wx_appid : '') + '">';
	// 	html += '</div>';//
	// 	html += '<div class="vital-row"><span class="span__title">公众号改造设备secretKey:</span><input type="text" placeholder="请输入正确的改造设备secretKey" maxlength="" id="box-wx_secretkey' + id_num + '" value="' + (box_data != '' ? box_data.wx_secretkey : '') + '">';
	// 	html += '</div>';//
	// 	html += '<div class="vital-row"><span class="span__title">公众号开发密钥appSecret:</span><input type="text" placeholder="请输入正确的开发密钥appSecret" maxlength="" id="box-wx_appsecret' + id_num + '" value="' + (box_data != '' ? box_data.wx_appsecret : '') + '">';
	// 	html += '</div>';//
	// 	html += '<div class="angle-down clearfix"><span class="fl fair_id">公众号id：<em></em></span>';
	// 	html += '<a href="javascript:" class="fr open">展开</a><a href="javascript:" class="fr delete" data-id="' + id_num + '">删除</a></div>';
	// 	html += '<div class="angle-up" ' + (box_data != '' ? 'style="display:block;"' : '') + '><a href="javascript:" class="delete" data-id="' + id_num + '">删除</a><a href="javascript:" class="close" data-id="' + id_num + '">收起</a></div>';
	// 	html += '</div>';
	// 	return html;
	// }

	beforeHtml: function(id_num, box_data, wx_id_disabled) {
		var wx_id = wx_id_disabled == true ? 'disabled="disabled"' : '';
		var html = '<div class="weixin-advert" data-boxId="' + id_num + '">';
		var userType = $('input:radio[name="user_type"]:checked').val();
		if (box_data != "") {
			html += '<div class="vital-row v-hide">';
			html += '<span class="span__title">公众号一键上网配置:</span>';
			html += '<input type="text" id="box-router-token' + id_num + '" class="token_check" value="http://auth.soundtooth.cn/success?token=' + box.wx_token + '&wx_wechat_id=' + box_data.wx_wechat_id + '" disabled style="margin-right:4px;" />';
			html += '<a href="javascript:;" id="copy_app_master' + id_num + '" class="copy_app_master">复制<i id="msg' + id_num + '"></i></a>';
			html += '<span class="span__description">若用户无法通过微信进行认证<br />需关注公众号后通过公众号的一键上网按钮上网</span>';
			html += '</div>'; //
		}
		html += '<div class="vital-row v-hide">';
		html += '<span class="span__title">广告位图片:</span>';
		html += '<label class="file-button" for="box-file' + id_num + '"><span class="btn-name">上传</span><label class="progress"></label></label>';
		html += '<span class="upload-info">Warning</span>';
		html += '<input id="box-file' + id_num + '" class="file-input" type="file">';
		html += '<input type="hidden" id="box-portal_ad_img' + id_num + '" value="' + (box_data != '' ? box_data.portal_ad_img : '') + '">';
		html += '<br><span class="span__description">图片不大于1M，支持jpg，gif，png</span></div>'; //
		html += '<div class="preview__area v-hide" id="preview_img' + id_num + '"><div class="iphone4" id="box-iphone-con' + id_num + '"><div class="iphone4__header">';
		html += '<div style="float: left; margin-top: -4px; width: 16px; height: 16px; border: 1px solid #ededed; border-radius: 9px 9px;"></div>';
		html += '<div style="float: left; width: 54px; height: 5px; margin-left: 15px; border: 1px solid #ededed; border-radius: 7px 7px;"></div>';
		html += '</div><div class="iphone4__screen"><span class="preview"><div class="type"></div><div class="portal_pic" style="background-image: url(' + (box_data != '' ? box_data.portal_ad_img : '') + ');"></div>';
		html += '<div class="operation-container"><div class="btn">xxxxx</div><div class="sub-title">xxxxxxxxxxxx</div></div></span></div>';
		html += '<div class="iphone4__home-outer"><div class="iphone4__home-inner"></div></div></div></div>'; //
		html += '<div class="vital-row v-hide del"><span class="span__title">微信公众号id:</span><input type="text" placeholder="请输入正确的微信公众号id" maxlength="" id="box-wx_id' + id_num + '" class="wechat-id" value="' + (box_data != '' ? box_data.wx_id : '') + '" ' + wx_id + '>';
		html += '<span class="span__description">*指微信公众号的微信号，由店铺提供。一旦添加，无法修改！<br>登录微信公共平台，点击公众号设置，即可获取微信号</span></div>'; //
		html += '<div class="vital-row v-hide del"><span class="span__title">微信公众号名称:</span>';
		html += '<input type="text" placeholder="请输入正确的微信公众号名称" maxlength="" id="box-wx_name' + id_num + '" value="' + (box_data != '' ? box_data.wx_name : '') + '">';
		html += '<span class="span__description">*指微信公众号的名称，由店铺提供。<br>登录微信公共平台，点击公众号设置，即可获取公众号的名称</span></div>'; //
		html += '<div class="vital-row v-hide del"><span class="span__title">公众号改造设备shopId:</span><input type="text" placeholder="请输入正确的改造设备shopId" maxlength="" id="box-wx_shopid' + id_num + '" value="' + (box_data != '' ? box_data.wx_shopid : '') + '">';
		html += '<span class="span__description">*可在微信公众平台查询，由店铺提供。<br>登录微信公众平台,点击微信连Wi-Fi,选择设备管理，点击查看设备改造信息</span></div>'; //
		html += '<div class="vital-row v-hide del"><span class="span__title">公众号改造设备appId:</span><input type="text" placeholder="请输入正确的改造设备appId" maxlength="" id="box-wx_appid' + id_num + '" value="' + (box_data != '' ? box_data.wx_appid : '') + '">';
		html += '<span class="span__description">*可在微信公众平台查询，由店铺提供。<br>登录微信公众平台,点击微信连Wi-Fi,选择设备管理，点击查看设备改造信息</span></div>'; //
		html += '<div class="vital-row v-hide del"><span class="span__title">公众号改造设备secretKey:</span><input type="text" placeholder="请输入正确的改造设备secretKey" maxlength="" id="box-wx_secretkey' + id_num + '" value="' + (box_data != '' ? box_data.wx_secretkey : '') + '">';
		html += '<span class="span__description">*可在微信公众平台查询，由店铺提供。<br>登录微信公众平台,点击微信连Wi-Fi,选择设备管理，点击查看设备改造信息</span></div>'; //
		html += '<div class="vital-row v-hide del"><span class="span__title">公众号开发密钥appSecret:</span><input type="text" placeholder="请输入正确的开发密钥appSecret" maxlength="" id="box-wx_appsecret' + id_num + '" value="' + (box_data != '' ? box_data.wx_appsecret : '') + '">';
		html += '<span class="span__description">*可在微信公众平台查询，由店铺提供。<br>登录微信公众平台,点击基本配置,点击显示密钥</span></div>'; //
		html += '<div class="angle-down clearfix"><span class="fl fair_id">公众号id：<em></em></span>';
		html += '<a href="javascript:" class="fr open">展开</a><a href="javascript:" class="fr delete" data-id="' + id_num + '">删除</a></div>';
		html += '<div class="angle-up clearfix" style="display:block;"><a href="javascript:" class="close fr" data-id="' + id_num + '">收起</a><a href="javascript:" class="delete fr" data-id="' + id_num + '">删除</a></div>';
		html += '</div>';
		return html;
	}
};

var scenesList = {};
scenesList.bindEvent = function() {
		_this = this;
		$("#scenes-list-table").on("click", ".scene-detail", function() {
			var chip_id = $(this).attr("data-chipId");
			var chip_No = $(this).attr("data-chipNo");
			var init_name = encodeURIComponent($(this).attr("data-id")).replace(/%2f/ig, "%252F");
			var current_name = encodeURIComponent($(this).attr("data-name"));
			var show_name = encodeURIComponent($(this).attr("data-name")).replace(/%2f/ig, "%252F");
			if ($(this).attr("data-status") == "0") {
				layer.confirm("为了便于数据分析，建议您完善“" + decodeURIComponent(current_name) + "”场景信息", {
					btn: ['查看数据', '完善信息'] //按钮
				}, function() {
					window.open(BASEURL + 'passengerFlow/chipId/' + chip_id + '/chipNo/' + chip_No + '/sceneName/' + init_name + '/showName/' + show_name);
				}, function() {
					window.open(BASEURL + 'vtScene/sceneStatus/0/chipId/' + chip_id + '/chipNo/' + chip_No + '/sceneName/' + init_name);
				});
			} else {
				window.open(BASEURL + 'passengerFlow/chipId/' + chip_id + '/chipNo/' + chip_No + '/sceneName/' + init_name + '/showName/' + show_name);
			}
		});
		//删除场景
		$("#scenes-list-table").on("click", ".scene-delete", function() {
			var chip_id = $(this).attr("data-chipId");
			var chip_no = $(this).attr("data-chipNo");
			var init_name = $(this).attr("data-id");
			var scenes_target = [{
				chip_id: chip_id,
				chip_no: chip_no,
				chip_initialname: init_name
			}];
			layer.confirm("确认删除场景？", {
				btn: ['确定', '取消'] //按钮
			}, function() {
				_this.delScenes(JSON.stringify(scenes_target));
			}, function() {});
		});

		//编辑场景
		$("#scenes-list-table").on("click", ".scene-edit", function() {
			var chip_id = $(this).attr("data-chipId");
			var chip_No = $(this).attr("data-chipNo");
			var init_name = encodeURIComponent($(this).attr("data-id")).replace(/%2f/ig, "%252F");
			var current_name = encodeURIComponent($(this).attr("data-name"));
			var status = $(this).attr("data-status");
			window.open(BASEURL + 'vtScene/sceneStatus/1/chipId/' + chip_id + '/chipNo/' + chip_No + '/sceneName/' + init_name);
		});

		$(".search-input>.fa-search").on("click", function() {
			_this.renderListPage(1);
		});
		$("#scenes-status-select").find(".dropdown-menu").children("li").on("click", function() {
			$("#scenes-status-select").attr("data-status", $(this).attr("data-status"));
			_this.renderListPage(1);
		});
	}
	//删除场景异步请求
scenesList.delScenes = function(scenes_target) {
	$(".loading-area").fadeIn();
	$.ajax({
			url: BASEURL + 'scene/delScenes',
			type: 'POST',
			dataType: 'json',
			data: {
				scenes_target: scenes_target
			}
		})
		.done(function(data) {
			if (data.success) {
				layer.alert("删除成功！", function() {
					window.location.href = BASEURL + 'scenesList';
				});
			} else {
				layer.alert("删除失败！");
			}
			$(".loading-area").fadeOut();
		})
		.fail(function(data) {
			layer.alert("删除失败！");
			$(".loading-area").fadeOut();
			console.log("error");
		});
}