$(function() {
	var page_type=$('#page_type').val();
	loadDownFn(page_type,'','','','','',1,10,'');
		
	getHeight(); //动态设置高度

	$(window).resize(function(){
		getHeight();
	});

	var start = {
		elem: '#inputStartTime',
		max: laydate.now(),
		choose: function(datas) {
			end.min = datas;
			end.start = datas;
		}
	};

	var end = {
		elem: '#inputEndTime',
		max: laydate.now(2)
	};

	//开始时间
	$('#inputStartTime').click(function() {
		laydate(start);
	});

	//结束时间
	$('#inputEndTime').click(function() {
		laydate(end);
	});

	$(document).on("change",".xiansuo_Page_Three",function(){
		var checkValue = $(this).val();
		var count=$('.xiansuo_Sizes').html();
		var page_count=Math.ceil(count/checkValue)
		$('#xiansuo_pages_count').html(page_count);
		loadDownFn('all','','','','','',1,checkValue,'');
	})
	
	//为自定义时间绑定单击事件
	$(document).on("click",".zdy_timer_btn",function(){
		var startTime = $("#inputStartTime").val();
		var endTime = $("#inputEndTime").val();
		if(startTime==""){
			alert("请选择起始时间");
			return false;
		}else if(endTime==""){
			alert("请选择结束时间");
			return false;
		}else{
			$(".zdy_timer_div").fadeOut();
			$(".More_Actions_ul").slideUp();
			$("#page_type").val('more');
			$("#page_t1").val(startTime);
			$("#page_t2").val(endTime);
			loadDownFn('more','','','',startTime,endTime,1,10,'');
			console.log(startTime,endTime);	
		}
	})

	//为分页器每个li绑定单击事件
	$(document).on("click",".xiansuo_Page_list li",function(){
		var index = $(this).index();
		var page = $(this).html();
		$(this).addClass("active").siblings().removeClass("active");
		$(".that_Page").val(page);
		var page_type=$('#page_type').val();				
		var page_keyword=$('#page_keyword').val();				
		var page_time=$('#page_time').val();				
		var page_hangye=$('#page_hangye').val();				
		var page_t1=$('#page_t1').val();				
		var page_t2=$('#page_t2').val();				
		var page_size=$('.xiansuo_Page_Three').val();
		loadDownFn(page_type,page_keyword,page_hangye,page_time,page_t1,page_t2,page,page_size,'');				
	})

	//为跳转至输入框监听键盘事件
	$(document).on("keydown",".that_Page",function(e){
		var page =parseInt($(this).val());
		var num = parseInt($('#xiansuo_pages_count').html());
		if(page>num){
			page=1;
		}
		var page_type=$('#page_type').val();				
		var page_keyword=$('#page_keyword').val();				
		var page_time=$('#page_time').val();				
		var page_hangye=$('#page_hangye').val();				
		var page_t1=$('#page_t1').val();				
		var page_t2=$('#page_t2').val();				
		var page_size=$('.xiansuo_Page_Three').val();
		if(e.keyCode==13){
			loadDownFn(page_type,page_keyword,page_hangye,page_time,page_t1,page_t2,page,page_size,'');
		}
	})

	//为首页判定事件
	$(document).on('click','.first_page',function(e){
		var page = 1;
		var page_type=$('#page_type').val();				
		var page_keyword=$('#page_keyword').val();				
		var page_time=$('#page_time').val();				
		var page_hangye=$('#page_hangye').val();				
		var page_t1=$('#page_t1').val();				
		var page_t2=$('#page_t2').val();				
		var page_size=$('.xiansuo_Page_Three').val();
		loadDownFn(page_type,page_keyword,page_hangye,page_time,page_t1,page_t2,page,page_size,'');
		e.stopPropagation();
	})

	//为上一页绑定事件
	$(document).on('click','.prev_page',function(e){
		var page = $(this).attr('name');
		var page_type=$('#page_type').val();				
		var page_keyword=$('#page_keyword').val();				
		var page_time=$('#page_time').val();				
		var page_hangye=$('#page_hangye').val();				
		var page_t1=$('#page_t1').val();				
		var page_t2=$('#page_t2').val();				
		var page_size=$('.xiansuo_Page_Three').val();
		loadDownFn(page_type,page_keyword,page_hangye,page_time,page_t1,page_t2,page,page_size,'');
		e.stopPropagation();
	})

		//为下一页绑定事件
	$(document).on('click','.next_page',function(e){
		var page = $(this).attr('name');
		var page_type=$('#page_type').val();				
		var page_keyword=$('#page_keyword').val();				
		var page_time=$('#page_time').val();				
		var page_hangye=$('#page_hangye').val();				
		var page_t1=$('#page_t1').val();				
		var page_t2=$('#page_t2').val();				
		var page_size=$('.xiansuo_Page_Three').val();
		loadDownFn(page_type,page_keyword,page_hangye,page_time,page_t1,page_t2,page,page_size,'');
		e.stopPropagation();
	})

	//为尾页绑定事件
	$(document).on('click','.last_page',function(e){
		var page = $(this).attr('name');
		var page_type=$('#page_type').val();				
		var page_keyword=$('#page_keyword').val();				
		var page_time=$('#page_time').val();				
		var page_hangye=$('#page_hangye').val();				
		var page_t1=$('#page_t1').val();				
		var page_t2=$('#page_t2').val();				
		var page_size=$('.xiansuo_Page_Three').val();
		loadDownFn(page_type,page_keyword,page_hangye,page_time,page_t1,page_t2,page,page_size,'');
		e.stopPropagation();
	})

	//为左侧导航商品的P段落绑定单击事件
	$(document).on("click", ".icon-shopping-div p", function(e) {
		$(this).addClass("open").siblings().removeClass("open");
		if($(this).hasClass("open")) {
			$(this).parent().prev().addClass("active").siblings().removeClass("active");
		}
		e.stopPropagation();
	})

	//为线索头部导航li绑定单击事件
	$(document).on("click", ".xiansuo_hdleft ul li", function() {
		var index = $(this).index();
		var str = $(this).text();
		$(this).addClass("active").siblings().removeClass("active");
		if($(this).hasClass("More_Actions")){
			return false;
		}else{
			$(".More_Actions_ul").slideUp();
			$('#page_type').val('more');
			$('#page_hangye').val(str);
			loadDownFn('more','',str,'','','',1,10,'');
			console.log(str);
		}
		
	})

	$(document).on("click",".More_Actions",function(){
		index1 = $(this).index();
		$(".More_Actions_ul").slideToggle();
	})

	//阻止下拉菜单父元素事件冒泡
	$(document).on("click", ".More_Actions_ul", function(e) {
		e.stopPropagation();
	})


	//为搜索绑定事件
	$(document).on("click",".search-btn",function(e){
		var keyword=$('.search-input').val();
		$('#page_keyword').val(keyword);
		$('#page_type').val('keyword');
		loadDownFn('keyword',keyword,'','','','',1,10,'');
		e.stopPropagation();
	})

	//为搜监听键盘事件
	$(document).on("keydown",".search-input",function(e){
		var keyword=$('.search-input').val();
		$('#page_type').val('keyword');
		$('#page_keyword').val(keyword);
		if(e.keyCode==13){
			loadDownFn('keyword',keyword,'','','','',1,10,'');
		}
		e.stopPropagation();
	})


	//为下拉菜单P元素绑定单击事件
	$(document).on("click", ".More_Actions_ul p", function(e) {
		var index = $(this).index();
		$(this).addClass("active").siblings().removeClass("active");
		if(index == 0){
			var str1 = $(this).html();
			$('#page_type').val('mark');
			loadDownFn('mark');
			$(".More_Actions_ul").slideUp();
		}else if(index == 1){
			var str2 = $(this).html();
			$('#page_type').val('unuseful');
			loadDownFn('unuseful');
			$(".More_Actions_ul").slideUp();
		}else if(index == 2){
			var str3 = $(this).html();
			$('#page_type').val('more');
			$('#page_time').val('day');
			loadDownFn('more','','','day')
			$(".More_Actions_ul").slideUp();
		}else if(index == 3){
			var str4 = $(this).html();
			$('#page_type').val('more');
			$('#page_time').val('week');
			loadDownFn('more','','','week');
			$(".More_Actions_ul").slideUp();
		}else if(index == 4){
			var str5 = $(this).html();
			$('#page_type').val('more');
			$('#page_time').val('mouth');
			loadDownFn('more','','','mouth');
			$(".More_Actions_ul").slideUp();
		}
		
		if(index == 5) {
			$(".zdy_timer_div").fadeIn();
		} else {
			$(".zdy_timer_div").fadeOut();
		}
		
//		setTimeout(function(){
////			console.log(111);
//			if(index == 5){
//				return false;
//			}
//			$(".More_Actions_ul p").removeClass("active");
//		},1000)
		e.stopPropagation();
	})

	//为查看联系方式1绑定单击事件
	$(document).on("click", ".ck-phone-val", function() {
		if($(this).html() == "查看联系方式") {
			var thi = $(this);
			var id = $(this).parents('li').attr('name');
			var type = $(this).parents('li').attr('type');
			$.post(qitian_number,{'id':id,'type':type},function(data){
				if(data.code==4){
					thi.html('今日体验已满');
				}else{
					var TelVal = thi.parents("li").find(".tel_val").val();
					thi.html(TelVal);
				}
			},'json');
		}
	})

	//为查看联系方式2绑定单击事件
	$(document).on("click", ".ck-email-val", function() {
		if($(this).html() == "查看联系方式") {
			var TelVal = $(this).parents("li").find(".email_val").val();
			$(this).html(TelVal);
		}
	})

	//阻止div事件冒泡到其他元素
	$(document).on("click", ".zdy_timer_div", function(e) {
		e.stopPropagation();
	})

	//为自定义时间筛选绑定单击事件
	$(document).on("click", ".zdy_timer_cell1_s2", function(e) {
		console.log(111);
		$(".zdy_timer_div").fadeOut();
		e.stopPropagation();
	})


	//为线索标题绑定单击事件进入线索详情
	$(document).on("click",".xiansuo_List_title",function(){
		var result=''
		var id=$(this).attr('name');
		var type=$(this).attr('type');
		var panduan = $(this).prev().prev().val();
		$('.xiansuo_des_modal').html('');
		$('.ajax_loadModal').fadeIn();
		if(type==0){
			$.ajax({
				type: 'GET',
				dataType: 'json',
				url: '/CrmSearch/xs_detail',
				data : {'id':id,'type':type,'pandan':panduan},
				success : function(res){
					console.log(111);
					res.data.search_detail_company = res.data.search_detail_company?res.data.search_detail_company:'暂无';
					res.data.search_detail_contacts = res.data.search_detail_contacts?res.data.search_detail_contacts:'暂无';
					res.data.search_detail_company = res.data.search_detail_company?res.data.search_detail_company:'暂无';
					res.data.time = res.data.time?res.data.time:'暂无';
					if(res.code==1){
						result+=
							'<div class="xiansuo_des">'+
							'<div class="xiansuo_des_header">'+
								'<div class="xiansuo_des_title">'+
									'线索详情'+
									'<span class="xiansuo_des_close">&times;</span>'+
								'</div>'+
								'<div class="xiansuo_des_state active">状态：'+res.data.zt+'</div>'+
								'<input type="hidden" id="xiansuo_id" value="'+id+'">'+
								'<input type="hidden" id="type" value="'+res.type+'">'+
								'<input type="hidden" id="xs_status" value="'+res.data.status+'">'+
								'<ul class="xiansuo_des_ul">';
								if(res.data.status==0){
									result+=
									'<li>编辑</li>'+
									'<li>删除</li>'+
									'<li>作废</li>'+
									'<li class="not-click">标记</li>'+
									'<li class="active">已转为客户</li>';
								}else if(res.data.status==1){
									result+=
									'<li class="not-click">编辑</li>'+
									'<li>删除</li>'+
									'<li class="active">恢复</li>'+
									'<li>标记</li>'+
									'<li class="not-click">转为客户</li>';
								}else if(res.data.status==4){
									result+=
									'<li>编辑</li>'+
									'<li>删除</li>'+
									'<li>作废</li>'+
									'<li class="active">已标记</li>'+
									'<li>转为客户</li>';
								}else{
									result+=
									'<li>编辑</li>'+
									'<li>删除</li>'+
									'<li>作废</li>'+
									'<li>标记</li>'+
									'<li>转为客户</li>';
								}
							result+=	
								'</ul>'+
								
								'<div class="des_more_fun1">'+
									'<ul>'+
										'<li class="active">客户信息</li>'+
										'<li>服务</li>'+
									'</ul>'+
									'<div class="clear"></div>'+
									
									'<div class="xiansuo_des_content">'+
										'<div class="xiansuo_des_contents">'+
											'<div class="xiansuo_des_contents_cell">'+
												'<span class="span_lf1">客户名称：</span><span class="span_rt1">'+res.data.search_detail_company+'</span>'+
											'</div>'+
											'<div class="xiansuo_des_contents_cell">'+
												'<span class="span_lf1">联<span style="margin: 0 8px;">系</span><span>人：</span></span><span class="span_rt1">'+(res.data.search_detail_contacts?res.data.search_detail_contacts:res.data.search_detail_company)+'</span>'+
											'</div>'+
											'<div class="xiansuo_des_contents_cell">'+
												'<span class="span_lf1">手<span class="text_between">机</span>：</span><span class="span_rt1">'+(res.data.search_detail_mobile?res.data.search_detail_mobile:'暂无')+'</span>'+
											'</div>'+
											'<div class="xiansuo_des_contents_cell">'+
												'<span class="span_lf1">电<span class="text_between">话</span>：</span><span class="span_rt1">'+(res.data.search_detail_tel?res.data.search_detail_tel:'暂无')+'</span>'+
											'</div>'+
											'<div class="xiansuo_des_contents_cell">'+
												'<span class="span_lf1">邮<span class="text_between">箱</span>：</span><span class="span_rt1">'+(res.data.search_detail_email?res.data.search_detail_email:'暂无')+'</span>'+
											'</div>'+
											'<div class="xiansuo_des_contents_cell">'+
												'<span class="span_lf1">网<span class="text_between">址</span>：</span><span class="span_rt1">'+(res.data.search_detail_url?res.data.search_detail_url:'无')+'</span>'+
											'</div>'+
											'<div class="xiansuo_des_contents_cell">'+
												'<span class="span_lf1">地<span class="text_between">址</span>：</span><span class="span_rt1">'+(res.data.search_detail_address?res.data.search_detail_address:'暂无')+'</span>'+
											'</div>'+
											'<div class="xiansuo_des_contents_cell">'+
												'<span class="span_lf1">线索描述：</span><span class="span_rt1">'+(res.data.remark?res.data.remark:'详情请电联')+'</span>'+
											'</div>'+
											'<div class="xiansuo_des_contents_cell">'+
												'<span class="span_lf1">创建时间：</span><span class="span_rt1">'+res.data.time+'</span>'+
											'</div>'+
										'</div>'+
									'</div>'+
									'<div class="xiansuo_des_content1">'+
										'<div class="new_fuwujilu">新建服务记录</div>'+
										'<textarea class="New_fuwujilu content" id="content1" maxlength="300" placeholder="最多输入300个字..."></textarea>'+
										'<div style="text-align: right;margin: 23px;">'+
											'<span class="add_newjilu" name="'+id+'">发布</span>'+
										'</div>'+
									    '<div id="fuwu">';
									if(res.code_server==1){	
										var leng=res.server.length;	
										for(var i=0;i<leng;i++){
										result+=	
											'<div class="fabu_jilu_list" name="'+res.server[i].m_service_id+'">'+
												'<p class="fabu_jilu_time">'+res.server[i].time+'</p>'+
												'<div class="fabu_jilu_content">'+res.server[i].m_service_remark+'</div>'+
												'<img name="'+res.server[i].m_service_id+'" class="fabu_jilu_delete" src="/Public/Home/1.6/Images/common_icon_det_nor.png" alt="" />'+
											'</div>';
										}	
									}
								result+=		
									'</div>'+
									'</div>'+		
								'</div>'+			
							'</div>'+
						'</div>';
						$('.xiansuo_des_modal').append(result);
						if(res.jingyon == 1){
							$(".xiansuo_des_ul").addClass("isClick_blt");
						}
						$('.ajax_loadModal').hide();
						$(".xiansuo_des_modal").fadeIn();
					}else{
						error('系统繁忙');
					}
				},
				error:function(XMLHttpRequest, textStatus, errorThrown){
					    console.log(XMLHttpRequest.status);
                        console.log(XMLHttpRequest.readyState);
                        console.log(textStatus);
				}

			})
		}else if(type==1){
			
			$.ajax({
				type: 'GET',
				dataType: 'json',
				url: '/CrmSearch/pm_detail',
				data : {'id':id,'type':type,'pandan':panduan},
				success : function(res){
					console.log(111);
					res[0].remark = res[0].remark?res[0].remark:'暂无';
					res[0].search_detail_court = res[0].search_detail_court?res[0].search_detail_court:'暂无';
					res[0].search_detail_city = res[0].search_detail_city?res[0].search_detail_city:'暂无';
					res[0].time = res[0].time?res[0].time:'暂无';
					res[0].totime = res[0].totime?res[0].totime:'暂无';
					res[0].search_detail_context = res[0].search_detail_context?res[0].search_detail_context:'暂无';
					res[0].search_detail_notice = res[0].search_detail_notice?res[0].search_detail_notice:'暂无';
					res[0].search_detail_introduction = res[0].search_detail_introduction?res[0].search_detail_introduction:'暂无';
					if(res[0]){
						result+=
							'<div class="xiansuo_des">'+
							'<div class="xiansuo_des_header">'+
								'<div class="xiansuo_des_title">'+
									'线索详情'+
									'<span class="xiansuo_des_close">&times;</span>'+
								'</div>'+
								'<div class="xiansuo_des_state active">状态：'+res[0].zt+'</div>'+
								'<input type="hidden" id="xiansuo_id" value="'+id+'">'+
								'<input type="hidden" id="type" value="'+res[0].type+'">'+
								'<input type="hidden" id="xs_status" value="'+res[0].status+'">'+
								'<ul class="xiansuo_des_ul">';
								if(res[0].status==0){
									result+=
									'<li>编辑</li>'+
									'<li>删除</li>'+
									'<li>作废</li>'+
									'<li class="not-click">标记</li>'+
									'<li class="active">已转为客户</li>';
								}else if(res[0].status==1){
									result+=
									'<li class="not-click">编辑</li>'+
									'<li>删除</li>'+
									'<li class="active">恢复</li>'+
									'<li>标记</li>'+
									'<li class="not-click">转为客户</li>';
								}else if(res[0].status==4){
									result+=
									'<li>编辑</li>'+
									'<li>删除</li>'+
									'<li>作废</li>'+
									'<li class="active">已标记</li>'+
									'<li>转为客户</li>';
								}else{
									result+=
									'<li>编辑</li>'+
									'<li>删除</li>'+
									'<li>作废</li>'+
									'<li>标记</li>'+
									'<li>转为客户</li>';
								}
							result+=	
								'</ul>'+
								
						'<div class="des_more_fun1">'+
						'<ul>'+
							'<li class="active">客户信息</li>'+
						'</ul>'+
						'<div class="clear"></div>'+
						
						'<div class="paimai_des_content">'+
							'<h2 class="pai-top-text">'+res[0].remark+'</h2>'+
							'<p class="pai-top-text01">司法拍卖&nbsp;&nbsp;&nbsp;'+res[0].search_detail_court+'</p>'+
							'<div class="table-container">'+
								'<table>'+
									'<tbody>'+
									'<tr>'+
										'<td width="36%">所在地区</td>'+
										'<td colspan="2" width="64%">'+res[0].search_detail_city+'</td>'+
									'</tr>'+
									'<tr>'+
										'<td>开始日期</td>'+

										'<td colspan="2" >'+res[0].time+'</td>'+
									'</tr>'+
									'<tr>'+
										'<td>截止时间</td>'+

										'<td colspan="2" >'+res[0].totime+'</td>'+
									'</tr>'+
									'</tbody>'+
								'</table>'+
							'</div>'+
							'<h2 class="pai-center-text">特别提示</h2>'+
							'<div class="pai-details-text">'+
								res[0].search_detail_context+
							'</div>'+
							'<h2 class="pai-center-text">拍卖公告</h2>'+
							'<div class="pai-details-text">'+
								res[0].search_detail_notice+
							'</div>'+
							'<h2 class="pai-center-text">标的介绍</h2>'+
							'<div class="pai-details-text">'+
								res[0].search_detail_introduction+

						'</div>'+
					'</div>';
					    $('.ajax_loadModal').hide();
						$('.xiansuo_des_modal').append(result);
						if(res.jingyon == 1){
							$(".xiansuo_des_ul").addClass("isClick_blt");
						}
						$(".xiansuo_des_modal").fadeIn();
					}else{
						error('系统繁忙');
					}
				},
				error:function(XMLHttpRequest, textStatus, errorThrown){
					    console.log(XMLHttpRequest.status);
                        console.log(XMLHttpRequest.readyState);
                        console.log(textStatus);
				}

			})
		}else if(type==2){
			$.ajax({
				type: 'GET',
				dataType: 'json',
				url: '/CrmSearch/pm_detail',
				data : {'id':id,'type':type,'pandan':panduan},
				success : function(res){
					res[0].remark = res[0].remark?res[0].remark:'暂无';
					res[0].search_detail_agent_company = res[0].search_detail_agent_company?res[0].search_detail_agent_company:'暂无';
					res[0].search_detail_releasetime = res[0].search_detail_releasetime?res[0].search_detail_releasetime :'暂无';
					res[0].search_detail_city = res[0].search_detail_city?res[0].search_detail_city:'暂无';
					res[0].time = res[0].time?res[0].time:'暂无';
					res[0].totime = res[0].totime?res[0].totime:'暂无';
					res[0].search_detail_context = res[0].search_detail_context?res[0].search_detail_context:'暂无';
					if(res[0]){
						result+=
							'<div class="xiansuo_des">'+
							'<div class="xiansuo_des_header">'+
								'<div class="xiansuo_des_title">'+
									'线索详情'+
									'<span class="xiansuo_des_close">&times;</span>'+
								'</div>'+
								'<div class="xiansuo_des_state active">状态：'+res[0].zt+'</div>'+
								'<input type="hidden" id="xiansuo_id" value="'+id+'">'+
								'<input type="hidden" id="type" value="'+res[0].type+'">'+
								'<input type="hidden" id="xs_status" value="'+res[0].status+'">'+
								'<ul class="xiansuo_des_ul">';
								if(res[0].status==0){
									result+=
									'<li>编辑</li>'+
									'<li>删除</li>'+
									'<li>作废</li>'+
									'<li class="not-click">标记</li>'+
									'<li class="active">已转为客户</li>';
								}else if(res[0].status==1){
									result+=
									'<li class="not-click">编辑</li>'+
									'<li>删除</li>'+
									'<li class="active">恢复</li>'+
									'<li>标记</li>'+
									'<li class="not-click">转为客户</li>';
								}else if(res[0].status==4){
									result+=
									'<li>编辑</li>'+
									'<li>删除</li>'+
									'<li>作废</li>'+
									'<li class="active">已标记</li>'+
									'<li>转为客户</li>';
								}else{
									result+=
									'<li>编辑</li>'+
									'<li>删除</li>'+
									'<li>作废</li>'+
									'<li>标记</li>'+
									'<li>转为客户</li>';
								}
							result+=	
								'</ul>'+
								
						'<div class="des_more_fun1">'+
						'<ul>'+
							'<li class="active">客户信息</li>'+
						'</ul>'+
						'<div class="clear"></div>'+
						
						'<div class="paimai_des_content">'+
							'<h2 class="pai-top-text">'+res[0].remark+'</h2>'+
							'<p class="pai-top-text01">政府招标&nbsp;&nbsp;&nbsp;'+res[0].search_detail_agent_company+'&nbsp;&nbsp;&nbsp;'+(res[0].search_detail_releasetime>0?res[0].search_detail_releasetime:'')+'</p>'+
							'<div class="table-container">'+
								'<table>'+
									'<tbody>'+
									'<tr>'+
										'<td width="36%">所在地区</td>'+
										'<td colspan="2" width="64%">'+res[0].search_detail_city+'</td>'+
									'</tr>'+
									'<tr>'+
										'<td>开始日期</td>'+

										'<td colspan="2" >'+res[0].time+'</td>'+
									'</tr>'+
									'<tr>'+
										'<td>截止时间</td>'+

										'<td colspan="2" >'+res[0].totime+'</td>'+
									'</tr>'+
									'</tbody>'+
								'</table>'+
							'</div>'+
							'<h2 class="pai-center-text">招标公告</h2>'+
							'<div class="pai-details-text">'+
								res[0].search_detail_context+
							'</div>'+
					'</div>';
					    $('.ajax_loadModal').hide();
						$('.xiansuo_des_modal').append(result);
						if(res.jingyon == 1){
							$(".xiansuo_des_ul").addClass("isClick_blt");
						}
						$(".xiansuo_des_modal").fadeIn();
					}else{
						error('系统繁忙');
					}
				},
				error:function(XMLHttpRequest, textStatus, errorThrown){
					    console.log(XMLHttpRequest.status);
                        console.log(XMLHttpRequest.readyState);
                        console.log(textStatus);
				}

			})
		}
	})

	//为线索详情关闭按钮绑定单击事件
	$(document).on("click",".xiansuo_des_close",function(){
		$(".xiansuo_des_modal").fadeOut();
	})
	
		//点击确认按钮关闭模态框
	$(document).on("click",".de_confirm_1",function(){
		var xs_status=$('#xs_status').val();
		var id=$('#xiansuo_id').val();
		var type=$('#type').val();
		if(xs_status==3){
			return false;
		}
		change_status(id,3,type);
		$('#xs_status').val('3');
		$(".delete-modal").fadeOut();//发起ajax
		$(".xiansuo_des_modal").fadeOut();
		location.reload();   
	})


//获取地区
	function get_area(id,type_class){
		var result='<option value="0">请选择</option>';
		$.ajax({
			type:'POST',
			dataType:'json',
			url:'/CrmSearch/get_area',
			data:{'id':id},
			success:function(res){
				var length=res.length;
				for(var i=0;i<length;i++){
					result+='<option value="'+res[i].areaid+'">'+res[i].areaname+'</option>';
				}
				if(type_class=='shi1'){
					$('.shi1').html('');
					$('.shi1').append(result);
				}else if(type_class=='quxian1'){
					$('.quxian1').html('');
					$('.quxian1').append(result);
				}
				
			}
		})
	}

	$(document).on("change",".sheng1",function(){
			var id=$('.sheng1').val();
			var type_class='shi1';
			$('#sheng1_id').val(id);
			get_area(id,type_class);
	})

	$(document).on("change",".shi1",function(){
			var id=$('.shi1').val();
			var type_class='quxian1';
			$('#shi1_id').val(id);
			get_area(id,type_class);
	})
    $(document).on("change",".quxian1",function(){
			var id=$('.quxian1').val();
			$('#quxian1_id').val(id);
	})

	//编辑线索提交表单
	$(document).on('click','.btn-submit1',function(){
		var company=$('.company').val();
		var lianxi_ren=$('.lianxi_ren').val();
		var type=$('#type').val();
		var xiansuo_id=$('#xiansuo_id').val();
		var mobile=$('.Phone').val();
		var tle=$('.Tle').val();
		var email=$('.Email').val();
		var com_url=$('.NetCom').val();
		var sheng1_id=$('#sheng1_id').val();
		var shi1_id=$('#shi1_id').val();
		var quxian1_id=$('#quxian1_id').val();
		var dizhi=$('.xianxi_dizhi').val();
		var remark=$('.xiansuo_miaoshu').val();
		if(company==''){
			message('公司名不能为空');
			return false;
		}
		if(lianxi_ren==''){
			message('联系人不能为空');
			return false;
		}
		$(".ajax_loadModal").fadeIn();
		$.ajax({
			type:'POST',
			dataType:'json',
			url:'/CrmSearch/xs_edit_ok',
			data:{'search_detail_company':company,'search_detail_contacts':lianxi_ren,'search_detail_mobile':mobile,'search_detail_tel':tle,'search_detail_email':email,'search_detail_url':com_url,'sheng1_id':sheng1_id,'shi1_id':shi1_id,'quxian1_id':quxian1_id,'search_detail_address':dizhi,'remark':remark,'search_detail_id':xiansuo_id,'type':type},
			success:function(res){
				if(res.code==1){
					$(".ajax_loadModal").fadeOut();
					success('编辑成功');
					$(".modal-box-2").fadeOut();
				}else{
					error(res.message);
				}
			}
		})
	})
//获取地区end

	//为线索详情功能列表li绑定单击事件
	$(document).on("click",".xiansuo_des_ul li",function(){
			var index = $(this).index();
			var result='';
		if( index == 1 || index == 0){
			console.log(index);
			if(index == 0){
				var xiansuo_id=$('#xiansuo_id').val();
				$('.modal-box-2').html('');
				$.ajax({
					type:'get',
					dataType:'json',
					data:{'id':xiansuo_id},
					url:'/CrmSearch/bj_detail',
					success:function(res){
						if(res.code==1){
							result+=
							'<div class="bj-kehu bj-kehu01">'+
								'<div class="bj-top">'+
									'<p>'+
										'编辑线索<span class="bj-top-span">×</span>'+
									'</p>'+
								'</div>'+
								'<div class="bj-center">'+
									'<div class="bj-text">'+
									    '<em>*</em>'+
										'<span>公    司</span>'+
										'<input class="input1 company" type="text" value="'+res.search_detail_company+'" placeholder="请输入公司名称">'+
									'</div>'+
									'<div class="bj-text">'+
										'<em>*</em>'+
										'<span>联 系 人</span>'+
										'<input class="input2 lianxi_ren" type="text" value="'+res.search_detail_contacts+'" placeholder="请输入联系人">'+
									'</div>'+
									'<div class="bj-text">'+
										'<span>手    机</span>'+
										'<input class="input3 Phone" type="text" value="'+res.search_detail_mobile+'" placeholder="请输入手机号码">'+
									'</div>'+
									'<div class="bj-text">'+
										'<span>电    话</span>'+
										'<input class="input4 Tle" type="text" value="'+res.search_detail_tel+'"  placeholder="请输入电话号码">'+
									'</div>'+
									'<div class="bj-text">'+
										'<span>邮    箱</span>'+
										'<input class="Email" type="text" value="'+res.search_detail_email+'" placeholder="请输入邮箱">'+
									'</div>'+
									'<div class="bj-text">'+
										'<span>网    址</span>'+
										'<input class="NetCom" value="'+res.search_detail_url+'" type="text" placeholder="请输入网址">'+
									'</div>';
									if(res.code_type==0){
										var leng=res.area.length;
									result+=
										'<div class="bj-text">'+
											'<span>区    域</span> 省'+
											'<select class="sheng1">'+
												'<option value="0">请选择</option>';
									for(var i=0;i<leng;i++){
										result+='<option value="'+res.area[i].areaid+'">'+res.area[i].areaname+'</option>';
									}			
										result+=		
											'</select>'+
											'市'+
											'<select class="shi1">'+
												'<option value="0">请选择</option>'+	
											'</select>'+
											'县'+
											'<select class="quxian1">'+
												'<option value="0">请选择</option>'+
												
											'</select>'+
										'</div>';
									}else{
										result+='<div class="bj-text">'+
											'<span>区    域</span> 省'+
											'<select class="sheng1">';
										if(res.lev==3){
											var leng=res.area[2].brother.length;
											for(var i=0;i<leng;i++){
												//sheng
												if(res.area[2].brother[i].areaid==res.area[2].sell){
													result+=
													'<option value="'+res.area[2].brother[i].areaid+'" selected="selected">'+res.area[2].brother[i].areaname+'</option>';
												}else{
													result+=
													'<option value="'+res.area[2].brother[i].areaid+'">'+res.area[2].brother[i].areaname+'</option>';
												}
											}
											result+='</select>市<select class="shi1">';

											var leng=res.area[1].brother.length;
											for(var i=0;i<leng;i++){
												//sheng
												if(res.area[1].brother[i].areaid==res.area[1].sell){
													result+=
													'<option value="'+res.area[1].brother[i].areaid+'" selected="selected">'+res.area[1].brother[i].areaname+'</option>';
												}else{
													result+=
													'<option value="'+res.area[1].brother[i].areaid+'">'+res.area[1].brother[i].areaname+'</option>';
												}
											}
											result+='</select>县<select class="quxian1">';
											var leng=res.area[0].brother.length;
											for(var i=0;i<leng;i++){
												//sheng
												if(res.area[0].brother[i].areaid==res.area[0].sell){
													result+=
													'<option value="'+res.area[0].brother[i].areaid+'" selected="selected">'+res.area[0].brother[i].areaname+'</option>';
												}else{
													result+=
													'<option value="'+res.area[0].brother[i].areaid+'">'+res.area[0].brother[i].areaname+'</option>';
												}
											}

											result+=	'</select>'+
														'</div>';
										}else if(res.lev==2){
											var leng=res.area[1].brother.length;
											for(var i=0;i<leng;i++){
												//sheng
												if(res.area[1].brother[i].areaid==res.area[1].sell){
													result+=
													'<option value="'+res.area[1].brother[i].areaid+'" selected="selected">'+res.area[1].brother[i].areaname+'</option>';
												}else{
													result+=
													'<option value="'+res.area[1].brother[i].areaid+'">'+res.area[1].brother[i].areaname+'</option>';
												}
											}
											result+='</select>市<select class="shi1">';

											var leng=res.area[0].brother.length;
											for(var i=0;i<leng;i++){
												//sheng
												if(res.area[0].brother[i].areaid==res.area[0].sell){
													result+=
													'<option value="'+res.area[0].brother[i].areaid+'" selected="selected">'+res.area[0].brother[i].areaname+'</option>';
												}else{
													result+=
													'<option value="'+res.area[0].brother[i].areaid+'">'+res.area[0].brother[i].areaname+'</option>';
												}
											}
											result+='</select>县<select class="quxian1">'+
													'<option value="0">请选择</option>'+
												     '</select>'+
													'</div>';
										}else if(res.lev==1){
											var leng=res.area[0].brother.length;
											for(var i=0;i<leng;i++){
												//sheng
												if(res.area[0].brother[i].areaid==res.area[0].sell){
													result+=
													'<option value="'+res.area[0].brother[i].areaid+'" selected="selected">'+res.area[0].brother[i].areaname+'</option>';
												}else{
													result+=
													'<option value="'+res.area[0].brother[i].areaid+'">'+res.area[0].brother[i].areaname+'</option>';
												}
											}
											result+='</select>市<select class="shi1">'+
													'<option value="0">请选择</option>'+
													'</select>县<select class="quxian1">'+
													'<option value="0">请选择</option>'+
												    '</select>'+
													'</div>';
										}else{

										}
									}
									result+=
									'<div class="bj-text">'+
										'<span>详细地址</span>'+
										'<input type="text" class="xianxi_dizhi" value="'+res.search_detail_address+'" placeholder="请输入详细地址">'+
									'</div>'+
									'<div class="bj-text" style="height: 120px;">'+
										'<span>线索描述</span>'+
										'<textarea class="xiansuo_miaoshu"  placeholder="请输入线索描述 . . .">'+res.remark+'</textarea>'+
									'</div>';
									if(res.lev==3){
									result+=
									'<input type="hidden" id="sheng1_id" value="'+(res.area[2].sell?res.area[2].sell:0)+'">'+
									'<input type="hidden" id="shi1_id" value="'+(res.area[1].sell?res.area[1].sell:0)+'">'+
									'<input type="hidden" id="quxian1_id" value="'+(res.area[0].sell?res.area[0].sell:0)+'">';
									}else if(res.lev==2){
										result+=
										'<input type="hidden" id="sheng1_id" value="'+(res.area[1].sell?res.area[1].sell:0)+'">'+
										'<input type="hidden" id="shi1_id" value="'+(res.area[0].sell?res.area[0].sell:0)+'">'+
										'<input type="hidden" id="quxian1_id" value="0">';
									}else if(res.lev==1){
										result+=
										'<input type="hidden" id="sheng1_id" value="'+(res.area[0].sell?res.area[0].sell:0)+'">'+
										'<input type="hidden" id="shi1_id" value="0">'+
										'<input type="hidden" id="quxian1_id" value="0">';
									}else{
										result+=
										'<input type="hidden" id="sheng1_id" value="0">'+
										'<input type="hidden" id="shi1_id" value="0">'+
										'<input type="hidden" id="quxian1_id" value="0">';
									}
									result+=
									'<div class="bj-btn">'+
										'<span class="bj-btn1">取消</span>'+
										'<span class="bj-btn2 btn-submit1">保存</span>'+
									'</div>'+
								'</div>'+
							'</div>';
							$('.modal-box-2').append(result);
							$('.modal-box-2').fadeIn();
						}else{
							error('系统繁忙');
						}
					}
				})	
			}
			if(index == 1){
				$(".delete-modal").fadeIn();
			}
			return false;
		}
		
		//作废按钮
		if( index == 2){
			var str = $(this).html();
			var xs_status=$('#xs_status').val();
			var id=$('#xiansuo_id').val();
			var type=$('#type').val();
			if(str=="恢复"){
				change_status(id,5,type);
				$('#xs_status').val('5');
				$(this).html("作废");//发起ajax
			}else if(str=="作废"){
				change_status(id,1,type);
				$('#xs_status').val('1');
				$(this).html("恢复");//发起ajax
			}
		}
		
		//标记按钮
		if( index == 3){
			var str = $(this).html();
			var class_name=$(this).attr('class');
			var xs_status=$('#xs_status').val();
			var id=$('#xiansuo_id').val();
			var type=$('#type').val();
			if(xs_status=='0' || xs_status=='1'){
				return false;
			}
			if(str=="已标记"){
				change_status(id,5,type);
				xs_status=$('#xs_status').val('5');
				$(this).html("标记");//发起ajax
			}else if(str=="标记"){
				change_status(id,4,type);
				xs_status=$('#xs_status').val('4');
				$(this).html("已标记");//发起ajax
			}
		}
		
		//转为客户按钮
		if( index == 4){
			var str = $(this).html();
			var type=$('#type').val();
			var id=$('#xiansuo_id').val();
			var xs_status=$('#xs_status').val();
			if( xs_status=='1'){
				return false;
			}
			if(str=="已转为客户"){
				
				change_status(id,5,type);
				xs_status=$('#xs_status').val('5');
				$(this).html("转为客户");//发起ajax
				
			}else if(str=="转为客户"){
				
				if(xs_status==0){
					return false;
				}
				change_status(id,0,type);
				xs_status=$('#xs_status').val('0');
				$(this).html("已转为客户");
			}
		}
		
		//切换按钮样式
		if($(this).hasClass("active")){
			$(this).removeClass("active");
		}else{
			$(this).addClass("active").siblings().removeClass("active");
		}
	})

	//转化线索状态
	function change_status($sid,$lev,$type){	
		$(".ajax_loadModal").fadeIn();		
		var data={"sid":$sid,"lev":$lev,"type":$type};
		$.ajax({
			type: 'POST',
			url: '/CrmSearch/as_customer',
			data:data,
			dataType: 'json',
			success: function(data) {
					$(".ajax_loadModal").hide();
					if(data.code == 1){
						success("操作成功");
					}else{
						error("操作失败");
					}		
			}
		})
	}

	//为更多功能列表li绑定单击事件
	$(document).on("click",".des_more_fun1 li",function(){
		var index = $(this).index();
		if(index==0){
			$(".xiansuo_des_content1").fadeOut();
			$(".xiansuo_des_content").fadeIn();
		}else if(index==1){
			$(".xiansuo_des_content").fadeOut();
			$(".xiansuo_des_content1").fadeIn();
		}
		console.log(index);
		$(this).siblings().removeClass("not-click");
		$(this).addClass("active").siblings().removeClass("active");
	})

	//为服务记录删除按钮绑定单击事件
	$(document).on("click",".fabu_jilu_delete",function(){
		var id = $(this).attr("name");
		var that = $(this);
		$(".ajax_loadModal").fadeIn();
		$.ajax({
			type:'POST',
			dataType:'json',
			url:'/CrmSearch/del_fuwu',
			data:{'id':id},
			success:function(res){
				$('.ajax_loadModal').hide();
				if(res.code==1){		
					success('删除成功');	
					that.parent().remove();
				}else{
					error('系统繁忙');
				}
			}
		})
	})

	//为添加服务绑定事件
	$(document).on('click','.add_newjilu',function(){
		var id=$(this).attr('name');
		var content=$(this).parents().prev().val();
		var that=$(this);
		var result='';
		if(content==''){
			error('内容不能为空');
			return false;
		}
		$(".ajax_loadModal").fadeIn();
		$.ajax({
			type:'POST',
			dataType:'json',
			data:{'id':id,'content':content},
			url:"/CrmSearch/add_fuwu",
			success:function(res){
				if(res.code==1){
					$(".ajax_loadModal").hide();
					result+=	
						'<div class="fabu_jilu_list" name="'+res.data.id+'">'+
							'<p class="fabu_jilu_time">'+res.data.m_service_rdatetime+'</p>'+
							'<div class="fabu_jilu_content">'+res.data.m_service_remark+'</div>'+
							'<img name="'+res.data.id+'" class="fabu_jilu_delete" src="/Public/Home/1.6/Images/common_icon_det_nor.png" alt="" />'+
						'</div>';
					$('#fuwu').before(result);	
					success('添加成功');
				}
			}
		})
	})

	//为订阅行业绑定单击事件
	$(document).on('click','.php_hy_list li',function(){
		hangye = $(this).attr('name');
		$('.php_key_list ul').html('');
		var result='';
		$(".ajax_loadModal").fadeIn();
		$.ajax({
			type: 'POST',
			url: '/CrmSubscibe/get_hy_keyword',
			data:{'id':hangye},
			dataType: 'json',
			success: function(res) {
				if(res.code==1){
					var leng=res.data.length;
					//var res.data=JSON.stringify(res.data);
				    console.log(res.data);
					for(i=0;i<leng;i++){
						result+='<li title="'+res.data[i].keywords+'">'+res.data[i].key+'</li>';
					}
					$('.php_key_list ul').append(result);
					$('.ajax_loadModal').hide();
				}else{
					$('.ajax_loadModal').hide();
					error();
				}
				
			}
		})
		$(this).addClass('active').siblings().removeClass("active");
	})
	
	//为订阅行业关键词绑定单击事件
	$(document).on('click','.php_key_list li',function(){
		var liTrue1 = $(this).hasClass('active');
		$(this).addClass('active');
		if(liTrue1) {
			$(this).removeClass('active');
		}
	})
	
	//为保存关键词按钮绑定单击事件
	var result = "";
	$(document).on('click',".dy_save_1",function(){
		var hy = hangye;//获取行业的值
		var zdykey = $(".zdy_keyWord_form").val();//文本域的值
		var Allli = $('.php_key_list ul li');//获取所有的li
		var liTrue1 = Allli.hasClass('active');//检测li含有的状态
		var result = '';
		if(liTrue1) {
			for(var i=0;i<Allli.length;i++){//遍历满足的li元素长度
				if(Allli[i].className=='active'){
			　　　　result += Allli[i].getAttribute("title")+',';
			   }
			}
		}
		result+=zdykey;
		if(result==''){
			message('关键字不能为空');
			return false;
		}
		$(".ajax_loadModal").fadeIn();
		$.ajax({
			type:'POST',
			dataType:'json',
			url:'/CrmSubscibe/add_hy',
			data:{hy_id:hy,keywords:result},
			success:function(res){
				if(res.code==1){
					$('.ajax_loadModal').hide();
					success('添加成功');
					$(".dingyue_hy_modal").fadeOut();
				}else{
					$('.ajax_loadModal').hide();
					error(res.message);
				}
			}
		})
	})

	//打开订阅采购商信息
	$(document).on("click",".dingyue_cgMsgBtn",function(){
		var result = '<ul>';
		var result_hy = '';
		var result_hy_del='';
		$(".ajax_loadModal").fadeIn();
		$.ajax({
			type: 'POST',
			url: '/CrmSubscibe/dingyue_hyList',
			dataType: 'json',
			success: function(res) {
				console.log(res.code_hy);
				$('.dingyue_hy_user_list').html('');
				$('.php_hy_list').html('');
				$('.user_dyhy_list ul').html('');
				if(res.code==1){
					
					var arrhy = res.hy.length;
					if(res.code_hy==1){
						var arrLen = res.data.length;
						for (var i =0; i < arrLen; i++) {

							result+=
								'<li>'+res.data[i].m_trade_name+'</li>';
							result_hy_del+=
											'<li>'+
											'<div>'+res.data[i].m_trade_name+'</div>'+
											'<span class="delete_btn1" name='+res.data[i].t_trade_mapping_m_trade_id+'>删除</span>'+
											'</li>';
						}
					}
					for (var j =0; j < arrhy; j++) {
						
						result_hy+=
							'<li name="'+res.hy[j].m_trade_id+'">'+res.hy[j].m_trade_name+'</li>';
					}

					result+=
							'</ul>'+
							'<img class="dingyue_hy_delete" src="/Public/Home/1.6/Images/common_icon_det_nor.png" alt="" />';
					$('.ajax_loadModal').hide();
					$('.dingyue_hy_user_list').append(result);
					$('.user_dyhy_list ul').append(result_hy_del);
					$('.php_hy_list').append(result_hy);
					$(".dingyue_hy_modal").fadeIn();
				}else{
					$('.ajax_loadModal').hide();
					error('系统繁忙');
				}
			}
		})
		
	})

	//关闭订阅采购商信息
	$(document).on("click",".dingyue_hy_header_close,.dy_cancel_1",function(){
		$(".dingyue_hy_modal").fadeOut();
	})

	//打开删除订阅行业模块
	$(document).on("click",".dingyue_hy_delete",function(){
		$(".user_dyhy_list").fadeIn();
	})

	//关闭删除订阅行业模块
	$(document).on("click",".close_span",function(){
		$(".user_dyhy_list").fadeOut();
	})
	

	//点击取消按钮关闭模态框
	$(document).on("click",".de_cancel_1",function(){
		$(".delete-modal").fadeOut();//无需发起
	})
	
	//子复选框的事件函数
	$(document).on("click","input[name=checkedres]",function(){
		setSelectAll();
	})
	
	//default为正常 true为作废  false为恢复  biaoji为标记
	
	//为标记按钮绑定单击事件
	$(document).on("click",".btnlist_biaoji",function(){	
		if($(".xiansuo_List li").length == 0){
			return false;
		}

		if($("input[type='checkbox'][name='checkedres']:checked").length==0){
			return false;
		}

		if($(this).parent().hasClass("noVip")){
			return false;
		}

		var divid1_str='';
		var type_str='';
		//遍历每个选中的checkbox
		$("input[type='checkbox'][name='checkedres']:checked").each(function(){
			if($(this).parents("li").attr("data-null")=="true"){//如果含有作废数据
				return false;
			}
			var divid1 =  $(this).parents("li").attr("name");//每条数据的id
			var type =  $(this).parents("li").attr("type");//每条数据的id
			$("[name= '"+ divid1 +"' ][data-null='default']").find(".xiansuo_List_state").html("已标记").addClass("yi_biaoji");//标记选中的li
			console.log(divid1);//打印测试有多少个正常的
		    divid1_str+=divid1+',';
		    type_str+=type+',';
			//change_status(divid1,4,type,0);
			$(".yi_biaoji").parents("li").attr("data-null","biaoji");
		})
		change_status(divid1_str,4,type_str);
	})
	
	//为作废按钮绑定单击事件
	$(document).on("click",".btnlist_zuofei",function(){
		if($(".xiansuo_List li").length == 0){
			return false;
		}

		if($("input[type='checkbox'][name='checkedres']:checked").length==0){
			return false;
		}

		if($(this).parent().hasClass("noVip")){
			return false;
		}

		var divid1_str='';
		var type_str='';
		//遍历每个选中的checkbox
		$("input[type='checkbox'][name='checkedres']:checked").each(function(){
			var divid1 =  $(this).parents("li").attr("name");//每条数据的id
			var type =  $(this).parents("li").attr("type");//每条数据的id
			var class_old=$("[name= '"+ divid1 +"' ]").find(".xiansuo_List_state").hasClass('yi_zuofei');
			if(class_old){
				return true;
			}
			$("[name= '"+ divid1 +"' ]").find(".xiansuo_List_state").removeClass("yi_biaoji").html("作废").addClass("yi_zuofei");//作废选中的li(标记跟正常都可作废)
			divid1_str+=divid1+',';
		    type_str+=type+',';
			console.log(divid1);
			//change_status(divid1,1,type,0);
			$(".yi_zuofei").parents("li").attr("data-null","true");
		})
		change_status(divid1_str,1,type_str);

	})
	
	//为恢复按钮绑定单击事件
	$(document).on("click",".btnlist_huifu",function(){
		if($(".xiansuo_List li").length == 0){
			return false;
		}

		if($("input[type='checkbox'][name='checkedres']:checked").length==0){
			return false;
		}

		if($(this).parent().hasClass("noVip")){
			return false;
		}
		var divid1_str='';
		var type_str='';
		$("input[type='checkbox'][name='checkedres']:checked").each(function(){
			if($(this).parents("li").attr("data-null")=="biaoji"){//如果含有标记数据
				return false;
			}
			var divid1 =  $(this).parents("li").attr("name");//每条数据的id
			var type =  $(this).parents("li").attr("type");//每条数据的id
			var class_old=$("[name= '"+ divid1 +"' ]").find(".xiansuo_List_state").hasClass('yi_zuofei');
			if(class_old){	
				$("[name= '"+ divid1 +"' ][data-null='true']").find(".yi_zuofei").removeClass("yi_zuofei").html("").parents("li").attr("data-null","default");//恢复选中的li
				console.log(divid1);
				divid1_str+=divid1+',';
		    	type_str+=type+',';
				//change_status(divid1,5,type,0);
			}
		})
		change_status(divid1_str,5,type_str);
	
	})
	
	//为删除按钮绑定单击事件
	$(document).on("click",".btnlist_delete",function(){
		if($(".xiansuo_List li").length == 0){
			return false;
		}
		
		if($("input[type='checkbox'][name='checkedres']:checked").length==0){
			return false;
		}
		
		if($(this).parent().hasClass("noVip")){
			return false;
		}
		$(".delete-modal3").fadeIn();
	})
	
	//为线索列表取消按钮绑定单击事件
	$(document).on("click",".de_cancel_13",function(){
		$(".delete-modal3").fadeOut();
	})
	
	//为线索列表确认按钮绑定单击事件
	$(document).on("click",".de_confirm_13",function(){
		//遍历每个选中的checkbox
		var divid1_str='';
		var type_str='';
		$("input[type='checkbox'][name='checkedres']:checked").each(function(){
			var divids =  $(this).parents("li").attr("name");//每条数据的id
			var type =  $(this).parents("li").attr("type");//每条数据的id
			//change_status(divids,3,type,0);
			divid1_str+=divids+',';
		    type_str+=type+',';
			$("[name= '"+ divids +"' ]").remove();//发起ajax
			console.log(divids);
			if($(".xiansuo_List li").length == 0){//如果页面的li长度等于0
				$("#checkall").prop("checked", false);//关闭全选
				$("#checkall").prop("disabled", "false");//禁用全选
				$(".xiansuo_Page_border").hide();//隐藏分割线
				//$(".xiansuo_Page_div").hide();//隐藏分页器
			}
		})
		change_status(divid1_str,3,type_str);
		$(".delete-modal3").fadeOut();
	})
	
	
	//为订阅行业删除按钮绑定单击事件
	$(document).on("click",".delete_btn1",function(){
		yizhu = $(this).parents("li");
		hy_id=$(this).attr('name');
		$(".delete-modal1").fadeIn();
	})
	
	//为订阅行业取消按钮绑定单击事件
	$(document).on("click",".de_cancel_11",function(){
		$(".delete-modal1").fadeOut();
	})
	
	//为订阅行业确认按钮绑定单击事件
	$(document).on("click",".de_confirm_11",function(){
		$(".delete-modal1").fadeOut();
		$.ajax({
			type: 'GET',
			url: '/CrmSubscibe/del_hy',
			dataType: 'json',
			data:{'hy_id':hy_id},
			success:function(res){
				if(res.code==1){
					success('删除成功');
					yizhu.remove();
					$(".user_dyhy_list").fadeOut();
					$(".dingyue_hy_modal").fadeOut();
				}else{
					error('系统繁忙');
				}
			}
		})
	})
	
	//为编辑线索关闭按钮绑定单击事件
	$(document).on("click",".bj-top-span",function(){
		$(".modal-box-2").fadeOut();
	})
})

function loadDownFn(type,keyword,hangye,time,t1,t2,page,size,ids) {
	ids=$ids;
	$(".ajax_loadModal").fadeIn();
	$('.upload a').css('display', 'block').siblings().css('display', 'none');
	var result = '';
	  $.ajax({
		type: 'POST',
		url: "/CrmSearch/get_search_list",
		dataType: 'json',
		data:{"page":page,"size":size,"keyword":keyword,"type":type,'hangye':hangye,'time':time,'t1':t1,'t2':t2,'ids':ids},
		success: function(data) {
			$('.xiansuo_List').html('');
			$('.xiansuo_Page_div').html('');
			console.log(data);
			if(data.list){
				var arrLen = data.list.length;
			}else{
				var arrLen = 0;
			}
			
		   //console.log(arrLen);
			if(arrLen > 0 ) {
				for(var i = 0; i < arrLen; i++) {
					if(data.list[i].search_detail_type==0){
					result +=
						'<li name="'+data.list[i].search_detail_id+'" data-null="'+(data.list[i].m_sale_thread_status==4?'biaoji':(data.list[i].m_sale_thread_status==1?'true':'default'))+'" type="'+data.list[i].search_detail_type+'">'+
							'<div class="xiansuo_List_no1">';
								if(data.panduan == 1){
									result +=
									'<input type="hidden" class="qitianhuiyuan" name="tell" value="qitian" />';
								}
							result +=
								'<label class="checkbox" onselectstart="return false;">'+
									'<input type="checkbox" class="vam" name="checkedres" />'+
									'<i></i> '+
								'</label>'+
								'<div class="xiansuo_List_title" name="'+data.list[i].search_detail_id+'" type="'+data.list[i].search_detail_type+'">'+ data.list[i].search_detail_title+'</div>';
								if(data.list[i].m_sale_thread_status==4){
									result +='<span class="xiansuo_List_state yi_biaoji">已标记</span>';
								}else if(data.list[i].m_sale_thread_status==1){
									result +='<span class="xiansuo_List_state yi_zuofei">作废</span>';
								}else{
									result +='<span class="xiansuo_List_state"></span>';
								}
							 result +=	
							'</div>'+
							'<div class="xiansuo_List_dets">'+
								'<div class="xiansuo_List_dets_lf">'+
									'<div class="xiansuo_List_dets_div1">采购价格：<span class="xiansuo_List_dets_span1">'+ data.list[i].search_detail_amount+'</span></div>'+
									'<div class="xiansuo_List_dets_div1">采购数量：<span class="xiansuo_List_dets_span1">'+ data.list[i].search_detail_qty+'</span></div>'+
									'<div class="xiansuo_List_dets_div1">供货地址：<span class="xiansuo_List_dets_span1">'+ data.list[i].search_detail_address+'</span></div>'+
								'</div>'+
								'<div class="xiansuo_List_dets_rt">'+
									'<div class="xiansuo_List_dets_div1"><span class="xiansuo_List_dets_span1"></span></div>'+
									'<div class="xiansuo_List_dets_div1">发布时间：<span class="xiansuo_List_dets_span1">'+ data.list[i].search_detail_createtime+'</span></div>'+
									'<div class="xiansuo_List_dets_div1">截止时间：<span class="xiansuo_List_dets_span1">'+ data.list[i].search_detail_endtime+'</span></div>'+
									
								'</div>';
								
								if(data.list[i].search_detail_mobile!='' ||data.list[i].search_detail_tel!=''){
									if(data.list[i].m_sale_thread_is_browse==1){
									result+=	
										'<div class="chakan_lianxi1 " onselectstart="return false;">'+
										'<span class="ck-phone-icon"></span>'+
										'<span class="ck-phone-val">'+(data.list[i].search_detail_mobile?data.list[i].search_detail_mobile:(data.list[i].search_detail_tel?data.list[i].search_detail_tel:'未知'))+'</span>'+
										'</div>';
									}else{
									result+=	
										'<div class="chakan_lianxi1 " onselectstart="return false;">'+
											'<span class="ck-phone-icon"></span>'+
											'<span class="ck-phone-val">查看联系方式</span>'+
										'</div>';
									}
								}else{
									if(data.list[i].m_sale_thread_is_browse==1){
									result+=	
										'<div class="chakan_lianxi2 " onselectstart="return false;">'+
										'<span class="ck-phone-icon"></span>'+
										'<span class="ck-phone-val">'+(data.list[i].search_detail_email?data.list[i].search_detail_email:'未知')+'</span>'+
										'</div>';
									}else{
									result+=	
										'<div class="chakan_lianxi1 " onselectstart="return false;">'+
											'<span class="ck-phone-icon"></span>'+
											'<span class="ck-phone-val">查看联系方式</span>'+
										'</div>';
									}
								}

							result+=	
							'</div>'+
							'<div class="xiansuo_border"></div>'+
							'<input type="hidden" value="'+(data.list[i].search_detail_mobile?data.list[i].search_detail_mobile:(data.list[i].search_detail_tel?data.list[i].search_detail_tel:'未知'))+'" class="tel_val"/>'+
							'<input type="hidden" value="'+(data.list[i].search_detail_email?data.list[i].search_detail_email:'未知')+'" class="email_val"/>'+
						'</li>'	;
					}else if(data.list[i].search_detail_type==1){
						result +=
						'<li name="'+data.list[i].search_detail_id+'" data-null="'+(data.list[i].m_sale_thread_status==4?'biaoji':(data.list[i].m_sale_thread_status==1?'true':'default'))+'" type="'+data.list[i].search_detail_type+'">'+
							'<div class="xiansuo_List_no1">';
								if(data.panduan == 1){
									result +=
									'<input type="hidden" class="qitianhuiyuan" name="tell" value="qitian" />';
								}
							result +=
								'<label class="checkbox" onselectstart="return false;">'+
									'<input type="checkbox" class="vam" name="checkedres" />'+
									'<i></i> '+
								'</label>'+
								'<div class="xiansuo_List_title" name="'+data.list[i].search_detail_id+'" type="'+data.list[i].search_detail_type+'">'+ data.list[i].search_detail_title+'</div>';
								if(data.list[i].m_sale_thread_status==4){
									result +='<span class="xiansuo_List_state yi_biaoji">已标记</span>';
								}else if(data.list[i].m_sale_thread_status==1){
									result +='<span class="xiansuo_List_state yi_zuofei">作废</span>';
								}else{
									result +='<span class="xiansuo_List_state"></span>';
								}
							 result +=	
							'</div>'+
							'<div class="xiansuo_List_dets">'+
								'<div class="xiansuo_List_dets_lf">'+
									'<div class="xiansuo_List_dets_div1">起拍价格：<span class="xiansuo_List_dets_span1">'+ (data.list[i].search_detail_startprice!=0.00?data.list[i].search_detail_startprice:'电议')+'</span></div>'+
									'<div class="xiansuo_List_dets_div1">评&ensp;估&ensp;值：<span class="xiansuo_List_dets_span1">'+ (data.list[i].search_detail_evaluate!=0.00?data.list[i].search_detail_evaluate:'暂未评估')+'</span></div>'+
									'<div class="xiansuo_List_dets_div1">所属类型：<span class="xiansuo_List_dets_span1">'+(data.list[i].search_detail_type==1?'司法拍卖':'招标')+'</span></div>'+
								'</div>'+
								'<div class="xiansuo_List_dets_rt">'+
									'<div class="xiansuo_List_dets_div1"><span class="xiansuo_List_dets_span1"></span></div>'+
									'<div class="xiansuo_List_dets_div1">发布时间：<span class="xiansuo_List_dets_span1">'+ data.list[i].search_detail_createtime+'</span></div>'+
									'<div class="xiansuo_List_dets_div1">所在地区：<span class="xiansuo_List_dets_span1">'+ data.list[i].search_detail_address+'</span></div>'+
									
								'</div>';
								
								if(data.list[i].search_detail_mobile!='' ||data.list[i].search_detail_tel!=''){
									if(data.list[i].m_sale_thread_is_browse==1){
									result+=	
										'<div class="chakan_lianxi1 " onselectstart="return false;">'+
										'<span class="ck-phone-icon"></span>'+
										'<span class="ck-phone-val">'+(data.list[i].search_detail_mobile?data.list[i].search_detail_mobile:(data.list[i].search_detail_tel?data.list[i].search_detail_tel:'未知'))+'</span>'+
										'</div>';
									}else{
									result+=	
										'<div class="chakan_lianxi1 " onselectstart="return false;">'+
											'<span class="ck-phone-icon"></span>'+
											'<span class="ck-phone-val">查看联系方式</span>'+
										'</div>';
									}
								}else{
									if(data.list[i].m_sale_thread_is_browse==1){
									result+=	
										'<div class="chakan_lianxi2 " onselectstart="return false;">'+
										'<span class="ck-phone-icon"></span>'+
										'<span class="ck-phone-val">'+(data.list[i].search_detail_email?data.list[i].search_detail_email:'未知')+'</span>'+
										'</div>';
									}else{
									result+=	
										'<div class="chakan_lianxi1 " onselectstart="return false;">'+
											'<span class="ck-phone-icon"></span>'+
											'<span class="ck-phone-val">查看联系方式</span>'+
										'</div>';
									}
								}

							result+=	
							'</div>'+
							'<div class="xiansuo_border"></div>'+
							'<input type="hidden" value="'+(data.list[i].search_detail_mobile?data.list[i].search_detail_mobile:(data.list[i].search_detail_tel?data.list[i].search_detail_tel:'未知'))+'" class="tel_val"/>'+
							'<input type="hidden" value="'+(data.list[i].search_detail_email?data.list[i].search_detail_email:'未知')+'" class="email_val"/>'+
						'</li>'	;
					}else if(data.list[i].search_detail_type==2){
													result +=
							'<li name="'+data.list[i].search_detail_id+'" data-null="'+(data.list[i].m_sale_thread_status==4?'biaoji':(data.list[i].m_sale_thread_status==1?'true':'default'))+'" type="'+data.list[i].search_detail_type+'">'+
								'<div class="xiansuo_List_no1">';
								if(data.panduan == 1){
									result +=
									'<input type="hidden" class="qitianhuiyuan" name="tell" value="qitian" />';
								}
							result +=
									'<label class="checkbox" onselectstart="return false;">'+
										'<input type="checkbox" class="vam" name="checkedres" />'+
										'<i></i> '+
									'</label>'+
									'<div class="xiansuo_List_title" name="'+data.list[i].search_detail_id+'" type="'+data.list[i].search_detail_type+'">'+ data.list[i].search_detail_title+'</div>';
									if(data.list[i].m_sale_thread_status==4){
										result +='<span class="xiansuo_List_state yi_biaoji">已标记</span>';
									}else if(data.list[i].m_sale_thread_status==1){
										result +='<span class="xiansuo_List_state yi_zuofei">作废</span>';
									}else{
										result +='<span class="xiansuo_List_state"></span>';
									}
								 result +=	
								'</div>'+
								'<div class="xiansuo_List_dets">'+
									'<div class="xiansuo_List_dets_lf">'+	
										'<div class="xiansuo_List_dets_div1">采购价格：<span class="xiansuo_List_dets_span1">'+ (data.list[i].search_detail_evaluate!=0.00?data.list[i].search_detail_evaluate:'暂未评估')+'万元</span></div>'+
										'<div class="xiansuo_List_dets_div1">所属类型：<span class="xiansuo_List_dets_span1">政府招标</span></div>'+
									'</div>'+
									'<div class="xiansuo_List_dets_rt">'+
										'<div class="xiansuo_List_dets_div1">发布时间：<span class="xiansuo_List_dets_span1">'+ data.list[i].search_detail_createtime+'</span></div>'+
										'<div class="xiansuo_List_dets_div1">所在区域：<span class="xiansuo_List_dets_span1">'+ data.list[i].search_detail_city+'</span></div>'+
										
									'</div>';
									
									if(data.list[i].search_detail_mobile!='' ||data.list[i].search_detail_tel!=''){
										if(data.list[i].m_sale_thread_is_browse==1){
										result+=	
											'<div class="chakan_lianxi1 " onselectstart="return false;">'+
											'<span class="ck-phone-icon"></span>'+
											'<span class="ck-phone-val">'+(data.list[i].search_detail_mobile?data.list[i].search_detail_mobile:(data.list[i].search_detail_tel?data.list[i].search_detail_tel:'未知'))+'</span>'+
											'</div>';
										}else{
										result+=	
											'<div class="chakan_lianxi1 " onselectstart="return false;">'+
												'<span class="ck-phone-icon"></span>'+
												'<span class="ck-phone-val">查看联系方式</span>'+
											'</div>';
										}
									}else{
										if(data.list[i].m_sale_thread_is_browse==1){
										result+=	
											'<div class="chakan_lianxi2 " onselectstart="return false;">'+
											'<span class="ck-phone-icon"></span>'+
											'<span class="ck-phone-val">'+(data.list[i].search_detail_email?data.list[i].search_detail_email:'未知')+'</span>'+
											'</div>';
										}else{
										result+=	
											'<div class="chakan_lianxi1 " onselectstart="return false;">'+
												'<span class="ck-phone-icon"></span>'+
												'<span class="ck-phone-val">查看联系方式</span>'+
											'</div>';
										}
									}

								result+=	
								'</div>'+
								'<div class="xiansuo_border"></div>'+
								'<input type="hidden" value="'+(data.list[i].search_detail_mobile?data.list[i].search_detail_mobile:(data.list[i].search_detail_tel?data.list[i].search_detail_tel:'未知'))+'" class="tel_val"/>'+
								'<input type="hidden" value="'+(data.list[i].search_detail_email?data.list[i].search_detail_email:'未知')+'" class="email_val"/>'+
							'</li>'	;
					}
				}
			}
			// 为了测试，延迟1秒加载
			setTimeout(function() {
				//如果小于10或者等于0
				if(arrLen < 10 || arrLen == 0) {
					//console.log("小于10",arrLen);
					$('.xiansuo_List').append(result);
					$('.xiansuo_Page_div').append(data.page);
					$('.ajax_loadModal').hide();
					getHeight();
					if($(".xiansuo_List li").length == 0){//如果页面的li长度等于0
						$("#checkall").prop("checked", false);//关闭全选
						$("#checkall").prop("disabled", "false");//禁用全选
						$(".xiansuo_Page_Div").hide();//隐藏分页器
					}else{
						$("#checkall").removeProp("checked");//移除禁用
						$("#checkall").removeProp("disabled");//移除禁用
						$(".xiansuo_Page_Div").show();//显示分页器
					}
				}else{
				   // console.log("大于10");
					$('.xiansuo_List').append(result);
					$('.xiansuo_Page_div').append(data.page);
					$('.ajax_loadModal').hide();
					getHeight();
					if($(".xiansuo_List li").length == 0){//如果页面的li长度等于0
						$("#checkall").prop("checked", false);//关闭全选
						$("#checkall").prop("disabled", "false");//禁用全选
						$(".xiansuo_Page_Div").hide();//隐藏分页器
					}else{
						$("#checkall").removeProp("checked");//移除禁用
						$("#checkall").removeProp("disabled");//移除禁用
						$(".xiansuo_Page_Div").show();//显示分页器
					}
				}
				var state = data.jingyon;//0为未认证会员  1为已认证会员
				if(state == 1){
					$(".xiansuo_hdleft_btnlist").addClass("noVip");
					// $(".xiansuo_des_ul").addClass("isClick_blt"); 
				}else{
					$(".xiansuo_hdleft_btnlist").removeClass("noVip");
				}

				//未认证会员时点击按钮提示用户
				$(document).on("click",".xiansuo_hdleft_btnlist.noVip span",function(){
					$(".ren-zheng-Tips1").fadeIn();
				})

				//关闭未认证会员提示框
				$(document).on("click",".closex-RZ,.ren-zheng-Tips-ct span",function(){
					$(".ren-zheng-Tips1").fadeOut();
				})
			},150);
		}
	});
}	

//定义获取高度方法
function getHeight() {
	var height = $(window).height();
	var TopH = 76 + 120;
	var cellH = (height - TopH) - 15;
	var FPageH = $(".xiansuo_Page_Div").height();
	$(".left_template,.right_template,.xiansuo_des").height(height);
	$(".xiansuo_main,.xiansuo_vessel").height(cellH);
	$(".xiansuo_List").height(cellH-FPageH);
	if(height<974){
		$(".paimai_des_content").height(height-330);
		$(".php_hy_list").css({
			"height": 140,
			"overflow": "auto"
		})
		$(".php_hy_list li").css({
			"marginRight":24,
			"marginLeft":0
		})

	}else {
		$(".paimai_des_content").height(630);
		$(".php_hy_list li").css({
			"marginLeft":10
		})
	}
}

//全选、反选的事件函数  
function selectAll(){ 
    console.log($("#checkall").prop("checked"));
    if ($("#checkall").prop("checked")) { 
    	console.log("全选");           
        $("input[type='checkbox'][name='checkedres']").prop("checked",true);//全选
    } else { 
        console.log("反选");              
        $("input[type='checkbox'][name='checkedres']").prop("checked",false);//反选     
    }
}  

//子复选框的事件函数
function setSelectAll(){  
    //当没有选中某个子复选框时，SelectAll取消选中  
    if (!$("input[type='checkbox'][name='checkedres']").checked) {
    	console.log("不满足,取消全选");
        $("#checkall").prop("checked", false);  
    }  
    var chsub = $("input[type='checkbox'][name='checkedres']").length;//获取subcheck的个数  
    var checkedsub = $("input[type='checkbox'][name='checkedres']:checked").length;//获取选中的subcheck的个数  
    if (checkedsub == chsub) {
    	console.log("满足,开启全选");
        $("#checkall").prop("checked", true);  
    }  
}