$(function() {
	//ResetForm();//初始化表格

	loadDownFn(active_type);

	getHeight(); //动态设置高度

	$(window).resize(function() {
		getHeight();
	})

	//发送信息表单验证
	$(document).on("click", ".submit", function() {
		var sendEmail = $("input[name='email']").val(); //获得收件人
		var sendTitle = $("input[name='title']").val(); //获得标题
		var editHtml = $("#editor").find("#ueditor_0").contents().find("body").html(); //获得富文本编辑器的html片段
		var ckEle = $("input[type='checkbox']:checked");

		var msgType = "";
		ckEle.each(function() {
			msgType += $(this).val() + ",";
		})

		var msgType1 = msgType.substring(0, msgType.length - 1); //获取消息类型

		if(sendEmail == "" || sendEmail == undefined) {
			message("请输入收件人");
		} else if(sendTitle == "" || sendTitle == undefined) {
			message("请输入标题");
		} else if(editHtml == "" || editHtml == undefined) {
			message("请输入内容");
		} else {
			console.log(msgType1);
			$.ajax({
				type: 'POST',
				dataType: 'json',
				data: {
					'touser': sendEmail,
					'title': sendTitle,
					'content': editHtml,
					'type': msgType1
				},
				url: '/CrmSend/add_mail',
				success: function(res) {
					if(res.code == 1) {
						success('发送成功');
						chongzhi();
					} else {
						message(res.message);
					}
				}
			})
		}
	})

	//限制用户发送选项1
	$(document).on("click", "input[type='checkbox'][data-type='1']", function() {
		if($(this).is(':checked')) {
			$("input[type='checkbox'][data-type='2']").prop("checked", false);
		}
	})

	//限制用户发送选项2
	$(document).on("click", "input[type='checkbox'][data-type='2']", function() {
		if($(this).is(':checked')) {
			$("input[type='checkbox'][data-type='1']").prop("checked", false);
		}
	})

	//为回收站按钮绑定单击事件
	$(document).on("click", ".huishou_1", function() {
		CheckData(); //判断数据长度	
		//遍历每个选中的checkbox
		var divid1_str = '';
		$("input[type='checkbox'][name='checkedres']:checked").each(function() {
			var id1 = $(this).parents("tr").attr("name"); //每条数据的id
			$("[name= '" + id1 + "' ]").remove(); //发起ajax
			divid1_str += id1 + ',';
		})
		$.ajax({
			type: 'POST',
			dataType: 'json',
			data: {
				'ids': divid1_str,
				'data': '1'
			},
			url: '/CrmSend/change_mail',
			success: function(res) {
				if(res.code == 1) {
					success('操作成功');
				} else {
					message(res.message);
				}
			}
		})
	})

	//要为信件类型导航里切换
	$(".ziti4 li").click(function() {
		$(this).addClass("selected").siblings().removeClass("selected");
		var action = $(this).attr('name');

		if(action != 'send') {
			$('.xj_lx').val(action);
			loadDownFn(action);
		} else {
			location.href = "/CrmSend/send_eamil";
		}
	})

	function add_box(touser,title) {
		var result = ''
		$('.inbox-main').html('');
		result +=
			'<form class="consult-form" method="post" enctype="multipart/form-data" style="margin-top: 0px;">' +
			'<div style="padding: 30px;">' +
			'<span><i>*</i>收件人：</span><input type="email" class="input_cell1" value="' + touser + '" placeholder="请输入您的收件人" name="email">' +
			'<a class="my_frText1"></a><br/>' +
			'<span><i>*</i>标题：</span><input type="text" class="input_cell1" value="' + title + '" placeholder="请输入关键词" name="title" /><br/>' +
			'<span style="vertical-align: top;width: 139px;"><i>*</i>内容：</span>' +
			'<script id="editor" type="text/plain" style="width:730px;height: 500px;display: inline-block;margin-left: 12px;margin-top: 15px;"></script>' +
			'<br/><span>选项：</span>' +
			'<div class="Three-cells_1">' +
			'<label class="checkbox" onselectstart="return false;">' +
			'<input type="checkbox" class="vam" name="checkedres" data-type="1" value="1">' +
			'<i></i>' +
			'</label>' +
			'<em>不发送，保存为草稿</em>' +
			'<label class="checkbox" onselectstart="return false;">' +
			'<input type="checkbox" class="vam" name="checkedres" data-type="2" value="2">' +
			'<i></i>' +
			'</label>' +
			'<em>保存到已发送</em>' +
			'<label class="checkbox" onselectstart="return false;">' +
			'<input type="checkbox" class="vam" name="checkedres" data-type="2" value="3">' +
			'<i></i>' +
			'</label>' +
			'<em>已读回执</em>' +
			'</div>' +
			'<br/>' +
			'<input type="button" value="确认" class="submit">' +
			'</div>' +
			'</form>';
		$('.inbox-main').append(result);
		var ue = UE.getEditor('editor');
	}

	//收件箱表格导航li切换
	$(document).on("click", ".inbox-listnav li", function(e) {
		$(this).addClass("selected").siblings().removeClass("selected");
		var type = $(this).attr('name');
		if(type == '全部') {
			type = '';
		}
		//alert(type);
		var action = $('.xj_lx').val();
		loadDownFn(action, type);
	})

	$(document).on("change", ".xiansuo_Page_Three", function() {

		var checkValue = $(this).val();
		var count = $('.xiansuo_Sizes').html();
		var page_count = Math.ceil(count / checkValue)
		$('#xiansuo_pages_count').html(page_count);
		var page_type = $('#page_type').val();
		var page_keyword = $('#page_keyword').val();
		var page_time = $('#page_time').val();
		var page_hangye = $('#page_hangye').val();
		var page_t1 = $('#page_t1').val();
		var page_t2 = $('#page_t2').val();
		var page_size = $('.xiansuo_Page_Three').val();
		loadDownFn(page_type, page_keyword, page_hangye, page_time, page_t1, page_t2, 1, checkValue);
	})

	//为分页器每个li绑定单击事件
	$(document).on("click", ".xiansuo_Page_list li", function() {
		var index = $(this).index();
		var page = $(this).html();
		$(this).addClass("active").siblings().removeClass("active");
		$(".that_Page").val(page);
		var page_type = $('#page_type').val();
		var page_keyword = $('#page_keyword').val();
		var page_time = $('#page_time').val();
		var page_hangye = $('#page_hangye').val();
		var page_t1 = $('#page_t1').val();
		var page_t2 = $('#page_t2').val();
		var page_size = $('.xiansuo_Page_Three').val();
		loadDownFn(page_type, page_keyword, page_hangye, page_time, page_t1, page_t2, page, page_size);
	})

	//为首页判定事件
	$(document).on('click', '.first_page', function(e) {
		var page = 1;
		var action = $('.xj_lx').val();
		var keyword = $('.search-input1').val();
		if(keyword) {
			var search = '1';
		}
		var size = $('.xiansuo_Page_Three').val();
		var search_type = $('.search_type').val();
		var text_type = $('.text_type').val();
		// var type=$(".inbox-listnav ul li").hasClass("selected").attr("name");
		var liEle = $(".inbox-listnav ul li");
		var type;

		liEle.each(function() {
			//console.log($(this).hasClass("selected"));
			if($(this).hasClass("selected")) {
				type = $(this).attr("name");
			}
		})
		if(type == '全部') {
			type = '';
		}
		loadDownFn(action, type, keyword, page, size, search_type, text_type, search);
		e.stopPropagation();
	})

	//为上一页绑定事件
	$(document).on('click', '.prev_page', function(e) {
		var page = $(this).attr('name');
		var action = $('.xj_lx').val();
		var keyword = $('.search-input1').val();
		if(keyword) {
			var search = '1';
		}
		var size = $('.xiansuo_Page_Three').val();
		var search_type = $('.search_type').val();
		var text_type = $('.text_type').val();
		// var type=$(".inbox-listnav ul li").hasClass("selected").attr("name");
		var liEle = $(".inbox-listnav ul li");
		var type;
		liEle.each(function() {
			//console.log($(this).hasClass("selected"));
			if($(this).hasClass("selected")) {
				type = $(this).attr("name");
			}
		})
		if(type == '全部') {
			type = '';
		}

		loadDownFn(action, type, keyword, page, size, search_type, text_type, search);
		e.stopPropagation();
	})

	//为下一页绑定事件
	$(document).on('click', '.next_page', function(e) {
		var page = $(this).attr('name');
		var action = $('.xj_lx').val();
		var keyword = $('.search-input1').val();
		if(keyword) {
			var search = '1';
		}
		var size = $('.xiansuo_Page_Three').val();
		var search_type = $('.search_type').val();
		var text_type = $('.text_type').val();
		// var type=$(".inbox-listnav ul li").hasClass("selected").attr("name");
		var liEle = $(".inbox-listnav ul li");
		var type;
		liEle.each(function() {
			//console.log($(this).hasClass("selected"));
			if($(this).hasClass("selected")) {
				type = $(this).attr("name");
			}
		})
		if(type == '全部') {
			type = '';
		}

		loadDownFn(action, type, keyword, page, size, search_type, text_type, search);
		e.stopPropagation();
	})

	//为尾页绑定事件
	$(document).on('click', '.last_page', function(e) {
		var page = $(this).attr('name');
		var action = $('.xj_lx').val();
		var keyword = $('.search-input1').val();
		if(keyword) {
			var search = '1';
		}
		var size = $('.xiansuo_Page_Three').val();
		var search_type = $('.search_type').val();
		var text_type = $('.text_type').val();
		// var type=$(".inbox-listnav ul li").hasClass("selected").attr("name");
		var liEle = $(".inbox-listnav ul li");
		var type;
		liEle.each(function() {
			//console.log($(this).hasClass("selected"));
			if($(this).hasClass("selected")) {
				type = $(this).attr("name");
			}
		})
		if(type == '全部') {
			type = '';
		}

		loadDownFn(action, type, keyword, page, size, search_type, text_type, search);
		e.stopPropagation();
	})

	//为跳转至输入框监听键盘事件
	$(document).on("keydown", ".that_Page", function(e) {
		var page = $(this).attr('name');
		var num = $('#xiansuo_pages_count').html();
		if(page > num) {
			page = 1;
		}
		var action = $('.xj_lx').val();
		var keyword = $('.search-input1').val();
		if(keyword) {
			var search = '1';
		}
		var size = $('.xiansuo_Page_Three').val();
		var search_type = $('.search_type').val();
		var text_type = $('.text_type').val();
		// var type=$(".inbox-listnav ul li").hasClass("selected").attr("name");
		var liEle = $(".inbox-listnav ul li");
		var type;
		liEle.each(function() {
			//console.log($(this).hasClass("selected"));
			if($(this).hasClass("selected")) {
				type = $(this).attr("name");
			}
		})
		if(type == '全部') {
			type = '';
		}
		if(e.keyCode == 13) {
			loadDownFn(action, type, keyword, page, size, search_type, text_type, search);
		}
	})

	//为搜索按钮绑定单击事件
	$(document).on("click", ".search-btn2", function(e) {
		var page = $(this).attr('name');
		var action = $('.xj_lx').val();
		var keyword = $('.search-input1').val();
		if(keyword) {
			var search = '1';
		}
		var size = $('.xiansuo_Page_Three').val();
		var search_type = $('.search_type').val();
		var text_type = $('.text_type').val();
		// var type=$(".inbox-listnav ul li").hasClass("selected").attr("name");
		var liEle = $(".inbox-listnav ul li");
		var type;
		liEle.each(function() {
			//console.log($(this).hasClass("selected"));
			if($(this).hasClass("selected")) {
				type = $(this).attr("name");
			}
		})
		if(type == '全部') {
			type = '';
		}

		loadDownFn(action, type, keyword, page, size, search_type, text_type, search);
		e.stopPropagation();
	})

	//监听用户键盘输入事件
	$(document).on('keydown', ".search-input1", function(e) {
		var page = $(this).attr('name');
		var num = $('#xiansuo_pages_count').html();
		if(page > num) {
			page = 1;
		}
		var action = $('.xj_lx').val();
		var keyword = $('.search-input1').val();
		if(keyword) {
			var search = '1';
		}
		var size = $('.xiansuo_Page_Three').val();
		var search_type = $('.search_type').val();
		var text_type = $('.text_type').val();
		// var type=$(".inbox-listnav ul li").hasClass("selected").attr("name");
		var liEle = $(".inbox-listnav ul li");
		var type;
		liEle.each(function() {
			//console.log($(this).hasClass("selected"));
			if($(this).hasClass("selected")) {
				type = $(this).attr("name");
			}
		})
		if(type == '全部') {
			type = '';
		}
		if(e.keyCode == 13) {
			loadDownFn(action, type, keyword, page, size, search_type, text_type, search);
		}
	})
})

//为删除按钮绑定单击事件
$(document).on("click", ".delete_1", function() {
	CheckData(); //判断数据长度

	if($("input[type='checkbox'][name='checkedres']:checked").length == 0) {
		return false;
	}

	$(".delete-modal").fadeIn();

})

//为取消删除绑定单击事件
$(document).on("click", ".de_cancel_1", function() {
	$(".delete-modal").fadeOut();
})

//为确认删除绑定单击事件
$(document).on("click", ".de_confirm_1", function() {
	//遍历每个选中的checkbox
	var divid1_str = '';
	$("input[type='checkbox'][name='checkedres']:checked").each(function() {
		var id1 = $(this).parents("tr").attr("name"); //每条数据的id
		$("[name= '" + id1 + "' ]").remove(); //发起ajax
		divid1_str += id1 + ',';
	})
	$.ajax({
		type: 'POST',
		dataType: 'json',
		data: {
			'ids': divid1_str,
			'data': '2'
		},
		url: '/CrmSend/change_mail',
		success: function(res) {
			if(res.code == 1) {
				success('操作成功');
				$(".delete-modal").fadeOut();
			} else {
				message(res.message);
			}
		}
	})
})

$(document).on("click", ".haiyuan_1", function() {
	var divid1_str = '';
	$("input[type='checkbox'][name='checkedres']:checked").each(function() {
		var id1 = $(this).parents("tr").attr("name"); //每条数据的id
		$("[name= '" + id1 + "' ]").remove(); //发起ajax
		divid1_str += id1 + ',';
	})

	$.ajax({
		type: 'POST',
		dataType: 'json',
		data: {
			'ids': divid1_str,
			'data': '3'
		},
		url: '/CrmSend/change_mail',
		success: function(res) {
			if(res.code == 1) {
				success('操作成功');
				$(".delete-modal").fadeOut();
			} else {
				message(res.message);
			}
		}
	})
})

//查看信件详情
$(document).on("click", ".inbox-tabletext", function() {
	var id = $(this).parents().attr('name');
	var feedback = $(this).parents().attr('feedback');
	var isread = $(this).parents().attr('isread');
	if(feedback == 1 && isread == 0) {
		type = 1;
	} else {
		type = 0
	}
	var result = '';
	$(".ajax_loadModal").fadeIn();
	$.ajax({
		type: 'POST',
		dataType: 'json',
		data: {
			'id': id,
			'type': type
		},
		url: '/CrmSend/get_mail_xq',
		success: function(res) {
			$(".ajax_loadModal").hide();
			if(res.code == 1) {
				$('.inbox-main').html('');
				result +=
					'<div class="inbox-main-dets" name="111">' +
					'<div class="send_header1">' +
					'<div class="send_title1">' +
					res.data.title +
					'</div>' +
					'<div class="send_people1 one-cell_1">' +
					'<span class="span_Tips1">' + (res.data.status == 2 ? '收件人' : '发件人') + '：</span>' +
					'<span class="span_Tips2">' + (res.data.status == 2 ? res.data.touser : (res.data.fromuser ? res.data.fromuser : '信使')) + '</span>' +
					'</div>' +
					'<div class="send_biaohao1 one-cell_1">' +
					'<span class="span_Tips1">编号：</span>' +
					'<span class="span_Tips1">' + res.data.itemid + '</span>' +
					'</div>' +
					'<div class="send_timer1 one-cell_1">' +
					'<span class="span_Tips1">时间：</span>' +
					'<span class="span_Tips1">' + res.data.addtime + '</span>' +
					'</div>' +
					'</div>' +
					'<div class="send_mains1_div">' +
					'<div class="send_mains1">' +
					res.data.content +
					'</div>' +
					'</div>' +
					'<div class="function_List">' +
					'<ul name="' + res.data.itemid + '">' +
					'<li class="return_data">返回</li>' +
					((res.data.status == 1 || res.data.fromuser == '' || res.data.status == 2 || res.data.status == 4) ? '' : '<li class="edit_data">回复</li>') +
					(res.data.status == 4 ? '' : '<li class="delete_data1">回收站</li>') +
					'<li class="delete_data2">彻底删除</li>' +
					'</ul>' +
					'<input type="hidden" id="hf_title" value="' + res.data.title + '">' +
					'<input type="hidden" id="hf_touser" value="' + res.data.fromuser + '">' +
					'</div>' +
					'</div>';
				//console.log(result);
				$('.inbox-main').append(result);
				$(".inbox-main-dets").fadeIn();
				$(".inbox-main").css("overflow","auto");
			} else {
				message('系统繁忙');
			}
		}
	})
})

$(document).on('click', '.return_data', function() {
	var liEle = $(".consult-nav ul li");
	var action;
	liEle.each(function() {
		//console.log($(this).hasClass("selected"));
		if($(this).hasClass("selected")) {
			action = $(this).attr("name");
		}
	})
	loadDownFn(action);
})

$(document).on('click', '.delete_data1', function() {
	var id = $(this).parents().attr('name');
	$.ajax({
		type: 'POST',
		dataType: 'json',
		data: {
			'ids': id,
			'data': '1'
		},
		url: '/CrmSend/change_mail',
		success: function(res) {
			if(res.code == 1) {
				success('操作成功');
			} else {
				message(res.message);
			}
		}
	})

})

$(document).on('click', '.delete_data2', function() {
	var id = $(this).parents().attr('name');
	$.ajax({
		type: 'POST',
		dataType: 'json',
		data: {
			'ids': id,
			'data': '2'
		},
		url: '/CrmSend/change_mail',
		success: function(res) {
			if(res.code == 1) {
				success('操作成功');
			} else {
				message(res.message);
			}
		}
	})

})

//回复
$(document).on('click', '.edit_data', function() {
	var title = $('#hf_title').val();
	var touser = $('#hf_touser').val();
	location.href = "/CrmSend/send_eamil?title=" + title + "&touser=" + touser;
})

//判断数据长度
function CheckData() {
	if($("#inbox_table tbody tr").length == 0) {
		return false;
	}
}

//初始化表格
function ResetForm() {
	if($("#inbox_table tbody tr").length == 0) {
		$("#checkall").prop("checked", false); //关闭全选
		$("#checkall").prop("disabled", "false"); //禁用全选
		$("#inbox_table thead").hide(); //隐藏表格头
		$(".xiansuo_Page_Div").hide(); //隐藏分页器
	}
}

//操作成功提示
function success(text) {
	$(document.body).append('<div class="sucuess-modal"><div class="sucuess-modal-cell"><img src="/Public/Home/1.6/Images/common_icon_success_nor.png" alt="" /><p class="is_state1">' + text + '</p></div></div>');
	$(".sucuess-modal").fadeIn();
	setTimeout(function() {
		$(".sucuess-modal").remove();
	}, 1500);
}

/**
 * type  
 * keyword
 * hangye
 */

//定义获取数据方法
function loadDownFn(action,type,keyword,page,size,search_type,text_type,search ) {
	$(".ajax_loadModal").fadeIn();
	if(search_type != '') {
		type = search_type;
	}
	$('.upload a').css('display', 'block').siblings().css('display', 'none');
	var result = '';
	$.ajax({
		type: 'POST',
		url: "/CrmSend/get_all_mail_list",
		dataType: 'json',
		data: {
			"page": page,
			"size": size,
			"keyword": keyword,
			"type": type,
			'action': action,
			'search_type': search_type,
			'text_type': text_type,
			'search': search
		},
		success: function(data) {
			$('.inbox-main').html('');
			//console.log(data);
			if(data.code == 1) {
				var arrLen = data.list.length;
			} else {
				var arrLen = 0;
			}
			//console.log(arrLen);
			result +=
				'<div class="inbox-nav">' +
				'<ul class="fl">' +
				'<span class="fl">筛选：</span>' +
				'<li class="fl">' +
				'<select class="search_type">' +
				'<option value="" ' + (search_type == '' ? selected = "selected" : '') + '>类型</option>' +
				'<option value="0" ' + (search_type == '0' ? selected = "selected" : '') + '>普通</option>' +
				'<option value="1" ' + (search_type == '1' ? selected = "selected" : '') + '>询价</option>' +
				'<option value="2" ' + (search_type == '2' ? selected = "selected" : '') + '>报价</option>' +
				'<option value="3" ' + (search_type == '3' ? selected = "selected" : '') + '>留言</option>' +
				'<option value="4" ' + (search_type == '4' ? selected = "selected" : '') + '>信使</option>' +
				'</select>' +
				'</li>' +
				'<li class="fl">' +
				'<select class="text_type">' +
				'<option value="0" ' + (text_type == '0' ? selected = "selected" : '') + '>标题</option>' +
				'<option value="1" ' + (text_type == '1' ? selected = "selected" : '') + '>全文</option>' +
				'</select>' +
				'</li>' +
				'</ul>' +
				'<div class="inbox-nav-input">' +
				'<input type="text" value="' + (keyword ? keyword : '') + '" class="search-input1"/>' +
				'<span class="search-btn2"></span>' +
				'</div>' +

				'<div class="inbox-list">' +
				'<div class="inbox-listnav">' +
				'<ul class="fl">' +
				'<li name="全部" class="fl ' + (type == '' ? selected : '') + '">全部</li>' +
				'<li name="0" class="fl ' + (type == '0' ? selected : '') + '">普通</li>' +
				'<li name="1" class="fl ' + (type == '1' ? selected : '') + '">询价</li>' +
				'<li name="2" class="fl ' + (type == '2' ? selected : '') + '">报价</li>' +
				'<li name="3" class="fl ' + (type == '3' ? selected : '') + '">留言</li>' +
				'<li name="4" class="fl ' + (type == '4' ? selected : '') + '">信使</li>' +
				'</ul>' +
				'<div class="fr fus_list1">' +
				(action == "inbox" ? '<a class="huishou_1">回收站</a><a class="delete_1">彻底删除</a>' : (action == "recycle" ? '<a class="haiyuan_1">还原</a><a class="delete_1">彻底删除</a>' : '<a class="delete_1">彻底删除</a>')) +
				'</div>' +
				'</div>' +
				'<div class="scroll_table">' +
				' <table id="inbox_table">' +
				'<thead>' +
				'<tr>' +
				'<th>' +
				'<label class="checkbox checkboxAll1" onselectstart="return false;">' +
				'<input id="checkall" type="checkbox" class="vam" name="checkall" onclick="selectAll()"/>' +
				'<i></i>' +
				'</label>' +
				'</th>' +
				'<th>类型</th>' +
				'<th>标题</th>' +
				'<th>' + (action == "sent" ? "收件人" : (action == "drafts" ? "收件人" : "发件人")) + '</th>' +
				'<th>时间</th>' +
				'</tr>' +
				'</thead>' +
				'<tbody id="inbox_tbody">';
			if(arrLen > 0) {
				for(var i = 0; i < arrLen; i++) {
					result +=
						'<tr name="' + data.list[i].itemid + '" feedback="' + data.list[i].feedback + '" isread="' + data.list[i].isread + '">' +
						'<td>' +
						'<label class="checkbox" onselectstart="return false;">' +
						'<input type="checkbox" class="vam" name="checkedres" />' +
						'<i></i>' +
						'</label>' +
						'</td>' +
						'<td><span data-style="' + data.list[i].typeid + '"></span></td>' +
						'<td class="inbox-tabletext">' + data.list[i].title + '</td>' +
						'<td>' + (action == "sent" ? (data.list[i].touser ? data.list[i].touser : '未知') : (action == "drafts" ? data.list[i].touser : (data.list[i].fromuser ? data.list[i].fromuser : '信使'))) + '</td>' +
						'<td>' + data.list[i].addtime + '</td>' +
						'</tr>';
				}
			}

			result +=
				'</tbody>' +
				'</table>' +
				'</div>' +
				'</div>' +
				'</div>' +

				'<div class="inbox-footer">' +

				' <div class="xiansuo_Page_Div">' +
				'<div class="xiansuo_Page_border"></div>' +
				'<div class="xiansuo_Page_div">' +
				(data.page ? data.page : '') +
				'</div>' +
				'</div>' +

				'</div>';

			// 为了测试，延迟1秒加载
			setTimeout(function() {
				//如果小于10或者等于0
				if(arrLen < 10 || arrLen == 0) {
					//console.log("小于10",arrLen);
					$('.inbox-main').append(result);
					$('.ajax_loadModal').hide();
					$(".inbox-main").css("overflow","hidden");
					getHeight();
					if($("#inbox_table tbody tr").length == 0) { //如果页面的li长度等于0
						$(".xiansuo_Page_Div").hide(); //隐藏分页器
					} else {
						$(".xiansuo_Page_Div").show(); //显示分页器
					}
				} else {
					// console.log("大于10");
					$('.inbox-main').append(result);
					$('.ajax_loadModal').hide();
					$(".inbox-main").css("overflow","hidden");
					getHeight();
					if($("#inbox_table tbody tr").length == 0) { //如果页面的li长度等于0
						$(".xiansuo_Page_Div").hide(); //隐藏分页器
					} else {
						$(".xiansuo_Page_Div").show(); //显示分页器
					}
				}
			}, 150);
		}
	});
}

//定义获取高度方法
function getHeight() {
	var winH = $(window).height();
	var TopH1 = $(".left_header").height(); //页面顶部高度
	var TopH2 = $(".consult-nav").height(); //咨询信息导航高度
	var padH = parseInt($(".consult-main").css("padding")) * 2; //外层容器外边距
	var magT = parseInt($(".inbox-main").css("marginTop")); //容器盒子上外边距
	var FPageH = $(".xiansuo_Page_Div").height(); //分页器高度
	var TopH3 = $(".inbox-nav-input").height() + $(".inbox-listnav").outerHeight(true); //内容盒子导航头部 搜索框＋导航列表
	$(".left_template,.right_template").height(winH);
	$(".consult-main").height(winH - TopH1 - padH);
	$(".inbox-main").height(winH - TopH1 - TopH2 - padH - magT - 4); //兼容360浏览器及火狐浏览器
	$(".inbox-list").height(winH - TopH1 - TopH2 - padH - magT - 4 - TopH3 - FPageH + 30); //动态设置表格外层容器高度     16 17 18 ↘
																													//相差    16	 `!if(16)else{"BUG"}!`
	$(".scroll_table").height(winH - TopH1 - TopH2 - padH - magT - 4 - TopH3 - FPageH + 14); //动态设置表格滚动容器高度  1 2  3    ↗
}

//重置表单值
function chongzhi() {
	$("input[type='email']").val("");
	$("input[type='text']").val("");
	$("input[type='checkbox']").prop("checked", false);
	$("#editor").find("#ueditor_0").contents().find("body").empty();
	$("#edui1_iframeholder").css("height", "500px");
}