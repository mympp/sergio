$(function() {
	var kewode = '';
	LoadDownFn();

	getHeight(); //动态设置高度
	
	wordlimit("jiequ_str",56);//截取字符串
	
	$(window).resize(function() {
		getHeight();
	})

	function LoadDownFn(kewode,str,px,page,size){
		$('.ajax_loadModal').fadeIn();
		$('#goodslist').empty();
		var url = pcGoods;
		var result = '';
		var data = {"page":page,"size":size,"keyword":kewode,"str":str,'px':px}
		$.post(url,data,function(data){
            $('.xiansuo_Page_div').html('');
			var length = data['list'].length;
			for(var i=0;i<length;i++){
				result +=
				'<li name="'+data['list'][i].itemid+'">';
				if(data['list'][i].status == 3){
					result +=
					'<a href="'+data['list'][i].lj+'" class="shopping-img1">';
				}else{
					result +=
					'<a href="javascript:;" class="shopping-img1 edit-1">';
				}
						result +=
								'<img src="'+data['list'][i].thumb+'" alt="" />'+
							'</a>'+
					'<div class="xiansuo_List_no1">'+
						'<label class="checkbox" onselectstart="return false;">'+
							'<input type="checkbox" class="vam" name="checkedres">'+
							'<i></i> '+
						'</label>';
					if(data['list'][i].status == 3){
						result +=
						'<a class="xiansuo_List_title" href="'+data['list'][i].lj+'">'+data['list'][i].title+'</a>';
					}else{
						result +=
						'<a class="xiansuo_List_title edit-1" href="javascript:;">'+data['list'][i].title+'</a>';
					}
					if(data['list'][i].push != null){
						result +=
						'<span class="xiansuo_List_state yi_tuisong">已加入推送</span>';
					}else{
						result +=
						'<span class="xiansuo_List_state"></span>';
					}
					result +=
					'</div>'+
					'<div class="commodity_dets">'+
						'<div class="commodity_dets_lf">';
						if(data['list'][i].status == 1){
							result +=
								'<span class="state_t1">状态：<span class="state_t2">审核未通过</span></span>';
						}else if(data['list'][i].status == 2){
							result +=
								'<span class="state_t1">状态：<span class="state_t2">审核中</span></span>';
						}else if(data['list'][i].status == 3){
							result +=
								'<span class="state_t1">状态：<span class="state_t2">在线销售</span></span>';
						}
						result +=
							'<span class="state_time">'+data['list'][i].addtime+'</span>'+
							'<br>'+
							'<span class="state_price">&yen;'+data['list'][i].price+'</span>'+
							'<span class="state_count1">库存：<span class="state_count2">'+data['list'][i].amount+'</span></span>'+
						'</div>'+
						'<div class="commodity_dets_rt">';
						if(data['list'][i].status == 3){
							result +=
								'<div class="commodity_dets_rt_cell edit-1">'+
									'<img src="'+tump+'/goods_icon_edit_nor.png" alt="" />'+
									'<p>编辑</p>'+
								'</div>'+
								'<div class="commodity_dets_rt_cell share-110">'+
									'<div class="social-share" data-initialized="true" data-url="'+data['list'][i].lj+'" data-title="'+data['list'][i].title+'" data-image="'+data['list'][i].thumb+'" data-weiboKey="2726283324">'+
										'<a href="#" class="social-share-icon icon-weibo"></a>'+
									'</div>'+
									'<p>分享</p>'+
								'</div>';
							if(data['list'][i].push != null){
								result +=
								'<div class="commodity_dets_rt_cell add-ts1">'+
									'<img src="'+tump+'/goods_icon_push_pre.png" alt="" />'+
									'<p>取消推送</p>'+
								'</div>';
							}else{
								result +=
								'<div class="commodity_dets_rt_cell add-ts1">'+
									'<img src="'+tump+'/goods_icon_push_nor.png" alt="" />'+
									'<p>加入推送</p>'+
								'</div>';
							}
								result +=
								'<div class="commodity_dets_rt_cell ts-rizhi1">'+
									'<img src="'+tump+'/goods_icon_daily_nor.png" alt="" />'+
									'<p>推送日志</p>'+
								'</div>';
						}else{
							result +=
								'<div class="commodity_dets_rt_cell edit-1">'+
									'<img src="'+tump+'/goods_icon_edit_nor.png" alt="" />'+
									'<p>编辑</p>'+
								'</div>'+
								'<div class="commodity_dets_rt_cell share-110 jy_btn">'+
									'<div class="social-share" data-initialized="true" >'+
										'<a href="#" class="social-share-icon icon-weibo"></a>'+
									'</div>'+
									'<p>分享</p>'+
								'</div>'+
								'<div class="commodity_dets_rt_cell add-ts1 jy_btn">'+
									'<img src="'+tump+'/goods_icon_push_nor.png" alt="" />'+
									'<p>加入推送</p>'+
								'</div>'+
								'<div class="commodity_dets_rt_cell ts-rizhi1 jy_btn">'+
									'<img src="'+tump+'/goods_icon_daily_nor.png" alt="" />'+
									'<p>推送日志</p>'+
								'</div>';
						}
						result +=
						'</div>'+
					'</div>'+
					'<div class="xiansuo_border"></div>'+
				'</li>';
			}
			// $('.ajax_loadModal').hide();
			// 为了测试，延迟1秒加载
                setTimeout(function() {
                    //如果小于10或者等于0
                    if(length < 10 || length == 0) {
                        //console.log("小于10",arrLen);
                        // $('.xiansuo_List').append(result);
                        $('#goodslist').append(result);
                        $('.xiansuo_Page_div').append(data.page);
                        $('.ajax_loadModal').hide();
						getHeight();
						wordlimit("jiequ_str",56);
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
                        // $('.xiansuo_List').append(result);
                        $('#goodslist').append(result);
                        $('.xiansuo_Page_div').append(data.page);
                        $('.ajax_loadModal').hide();
						getHeight();
						wordlimit("jiequ_str",56);
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
                },150);

		},'json');
	}

	//为分页器每个li绑定单击事件
	$(document).on("click",".xiansuo_Page_list li",function(){
		var index = $(this).index();
		var page = $(this).html();
		$(this).addClass("active").siblings().removeClass("active");
		$(".that_Page").val(page);				
		var page_keyword = $('.search-input').val();												
		var page_str = $('.active').find("input[type=hidden]").attr('name');				
		var page_px  = $('.active').find("input[type=hidden]").val();				
		var page_size= $('.xiansuo_Page_Three').val();
		// LoadDownFn(kewode='',str='addtime',px='desc',page='1',size='10')
		LoadDownFn(page_keyword,page_str,page_px,page,page_size);				
	})

	//为跳转至输入框监听键盘事件
	$(document).on("keydown",".that_Page",function(e){
		var page = $(this).val();
		var num = $('#xiansuo_pages_count').html();
		if(page>num){
			page=1;
		}				
		var page_keyword = $('.search-input').val();												
		var page_str = $('.active').find("input[type=hidden]").attr('name');				
		var page_px  = $('.active').find("input[type=hidden]").val();				
		var page_size= $('.xiansuo_Page_Three').val();
		if(e.keyCode==13){
			LoadDownFn(page_keyword,page_str,page_px,page,page_size);				
		}
	})

	//为首页判定事件
	$(document).on('click','.first_page',function(e){
		var page = 1;				
		var page_keyword = $('.search-input').val();												
		var page_str = $('.active').find("input[type=hidden]").attr('name');				
		var page_px  = $('.active').find("input[type=hidden]").val();				
		var page_size= $('.xiansuo_Page_Three').val();
		LoadDownFn(page_keyword,page_str,page_px,page,page_size);	
		e.stopPropagation();
	})

	//为上一页绑定事件
	$(document).on('click','.prev_page',function(e){
		var page = $(this).attr('name');				
		var page_keyword = $('.search-input').val();												
		var page_str = $('.active').find("input[type=hidden]").attr('name');				
		var page_px  = $('.active').find("input[type=hidden]").val();				
		var page_size= $('.xiansuo_Page_Three').val();
		LoadDownFn(page_keyword,page_str,page_px,page,page_size);	
		e.stopPropagation();
	})

	//为下一页绑定事件
	$(document).on('click','.next_page',function(e){
		var page = $(this).attr('name');			
		var page_keyword = $('.search-input').val();												
		var page_str = $('.active').find("input[type=hidden]").attr('name');				
		var page_px  = $('.active').find("input[type=hidden]").val();				
		var page_size= $('.xiansuo_Page_Three').val();
		LoadDownFn(page_keyword,page_str,page_px,page,page_size);
		e.stopPropagation();
	})

	//为尾页绑定事件
	$(document).on('click','.last_page',function(e){
		var page = $(this).attr('name');				
		var page_keyword = $('.search-input').val();												
		var page_str = $('.active').find("input[type=hidden]").attr('name');				
		var page_px  = $('.active').find("input[type=hidden]").val();				
		var page_size= $('.xiansuo_Page_Three').val();
		LoadDownFn(page_keyword,page_str,page_px,page,page_size);
		e.stopPropagation();
	})

	var pageVal = $(".xiansuo_Page_Three").val();
	$(".xiansuo_Pages").html(pageVal+"页");
	
	var time1 = new Date().Format("yyyy-MM-dd");//此处为后台传入时间的变量(最小时间)
	var start = {
		elem: '#inputStartTime',
		max: time1,//此处为起始时间的值
		choose: function(datas) {
			end.min = datas;
			end.start = datas;
		}
	};

	var end = {
		elem: '#inputEndTime',
		max: laydate.now()//此处为结束时间的值(为今天截止最大时间)
	};

	var jiezhi = {
		elem: '#expiration_time',
		min: laydate.now()//此处为截止时间的值
	};
	
	//开始时间
	$(document).on("click","#inputStartTime",function(){
		laydate(start);
	})

	//结束时间
	$(document).on("click","#inputEndTime",function(){
		laydate(end);
	})
	
	
	//截止时间
	$('#expiration_time').click(function() {
		laydate(jiezhi);
	});
	
	//为搜索按钮绑定单击事件
	$(document).on("click",".search-btn",function(){
		var keyWord = $(".search-input").val();
		LoadDownFn(keyWord);
	})

	//为确认筛选按钮绑定单击事件
	$(document).on("click",".saixuan_btn",function(){
		var startTime = $("#inputStartTime").val();
		var endTime = $("#inputEndTime").val();
		var id = $('input[name=goodsitemid]').val();
		if(startTime == ""){
			message("请输入开始时间");
		}else if(endTime == ""){
			message("请输入结束时间");
		}else{
			$('.ajax_loadModal').fadeIn();
			$('#tsRz_List').empty();
			var url = pcPushList;
			var data = {'id':id,'start':startTime,'end':endTime}
			var result = '';
			$.post(url,data,function(data){
				result +=
				'<div class="tsRz-div_limain">'+
						'<div class="tsRz-div_liImg">'+
							'<img src="'+data[0].img+'" alt="" />'+
						'</div>'+
						'<div class="tsRz-div_dts">'+
							'<p class="tsRz-div_title">'+data[0].title+'</p>'+
							'<p style="margin-top: 10px;"><span class="span_1">&yen;'+data[0].price+'</span>'+
							'<span class="span_2">'+
								'发布时间：'+
								'<span class="span_21">'+data[0].push_setting_createtime+'</span>'+
							'</span></p>'+
						'</div>'+
					'</div>'+
				'<div class="tsRz_saixuan">'+
						'<div class="tsRz_saixuan_hd">'+
							'<div class="oneLine-cell" style="text-align: initial;">'+
								'<span class="span-text11">按时间筛选</span>'+
								'<input type="datetime" class="input-sm laydate-icon" id="inputStartTime" name="sdate" placeholder="开始时间">'+
								'<sapn class="most">至</sapn>'+
								'<input type="datetime" class="input-sm laydate-icon" id="inputEndTime" name="edate" placeholder="结束时间">'+
								'<input type="hidden" value="'+data[0].itemid+'" name="goodsitemid"/>'+
								'<span class="saixuan_btn">确认</span>'+
							'</div>'+
						'</div>'+
						'<div class="tsRz-saixuan-box">'+
							'<div class="tsRz-saixuan-box-hd">'+
								'<p class="hd_p1">推送渠道</p>'+
								'<p class="hd_p2">推送时间</p>'+
							'</div>'+
							'<ul class="tsRz-saixuan-ul">';
							if( data.tuison != null){
								var leng = data.tuison.length;
								for(var i=0;i<leng;i++){
									result +=
								'<li class="tsRz-saixuan-li">';
								if(data.tuison[i].member == 1 ){
									result +=
									'<input type="hidden" value="'+data.tuison[i].push_log_member_id+'" name="member_id"/>';
								}else{
									result +=
									'<input type="hidden" value="'+data.tuison[i].push_search_log_search_detail_id+'" name="detail_id"/>';
								}
								result +=
										'<a class="click_sjbtn close"></a>'+
										'<div class="tsRz-saixuan-lihd">'+
											'<div class="tsRz-saixuan-qudao">'+data.tuison[i].qudao+'</div>'+
											'<div class="tsRz-saixuan-timer">'+data.tuison[i].date+'</div>'+
										'</div>'+
								'</li>';
								 }
							}else{
								result +=
								'<li class="tsRz-saixuan-li"><p>暂无数据</p></li>';
							}
							result += 
							'</ul>'+
						'</div>'+
					'</div>';
				$('.ajax_loadModal').hide();
				$('#tsRz_List').append(result);
			},'json');
		}
	})

	//为左侧导航li绑定单击事件
	$(document).on("click", ".userList_li", function() {
		var index = $(this).index();
		var text = $(this).find(".icon-text").html();
		$(".page_state").html(text);
		//console.log(text);
		if(index == 5) {
			$(".icon-shopping-div").slideToggle();
			$(this).addClass("active").siblings().removeClass("active");
		} else {
			$(".icon-shopping-div p").removeClass("open");
			$(this).addClass("active").siblings().removeClass("active");
		}
	})

	//为左侧导航商品的P段落绑定单击事件
	$(document).on("click", ".icon-shopping-div p", function(e) {
		$(this).addClass("open").siblings().removeClass("open");
		if($(this).hasClass("open")) {
			$(this).parent().prev().addClass("active").siblings().removeClass("active");
		}
		e.stopPropagation();
	})
	
	//检测分页器的值变动事件函数
	$(".xiansuo_Page_Three").change(function(){
		var checkValue = $(this).val();
		$(".xiansuo_Pages").html(checkValue+"页");
	})

	//为筛选的li元素绑定单击事件
	$(document).on("click", ".li_1", function() {
		var index = $(this).index();
		if(index == 1) {
			console.log(111);
			if($(this).hasClass("down")) {
				if($(this).hasClass("active")) {
					$(this).addClass("active").next().removeClass("active");
					$(this).removeClass("down").addClass("up");
					$(this).find("input[type=hidden]").val('asc');
					var str = $(this).find("input[type=hidden]").attr('name');
					var px = $(this).find("input[type=hidden]").val();
					LoadDownFn(kewode,str,px);
					console.log("蓝向上");
				} else {
					$(this).addClass("active").next().removeClass("active");
					$(this).find("input[type=hidden]").val('desc');
					var str = $(this).find("input[type=hidden]").attr('name');
					var px = $(this).find("input[type=hidden]").val();
					LoadDownFn(kewode,str,px);
					console.log("黑向下加蓝");
				}
			} else if($(this).hasClass("up")) {
				if($(this).hasClass("active")) {
					$(this).addClass("active").next().removeClass("active");
					$(this).removeClass("up").addClass("down");
					$(this).find("input[type=hidden]").val('desc');
					var str = $(this).find("input[type=hidden]").attr('name');
					var px = $(this).find("input[type=hidden]").val();
					LoadDownFn(kewode,str,px);
					console.log("蓝向下");
				} else {
					$(this).addClass("active").next().removeClass("active");
					$(this).find("input[type=hidden]").val('asc');
					var str = $(this).find("input[type=hidden]").attr('name');
					var px = $(this).find("input[type=hidden]").val();
					LoadDownFn(kewode,str,px);
					console.log("黑向上加蓝");
				}
			}
		}
		if(index == 2) {
			console.log(111);
			if($(this).hasClass("down")) {
				if($(this).hasClass("active")) {
					$(this).addClass("active").prev().removeClass("active");
					$(this).find("input[type=hidden]").val('asc');
					var str = $(this).find("input[type=hidden]").attr('name');
					var px = $(this).find("input[type=hidden]").val();
					LoadDownFn(kewode,str,px);
					$(this).removeClass("down").addClass("up");
					console.log("蓝向上2");
				} else {
					$(this).addClass("active").prev().removeClass("active");
					$(this).find("input[type=hidden]").val('desc');
					var str = $(this).find("input[type=hidden]").attr('name');
					var px = $(this).find("input[type=hidden]").val();
					LoadDownFn(kewode,str,px);
					console.log("黑向下加蓝2");
				}
			} else if($(this).hasClass("up")) {
				if($(this).hasClass("active")) {
					$(this).addClass("active").prev().removeClass("active");
					$(this).find("input[type=hidden]").val('desc');
					var str = $(this).find("input[type=hidden]").attr('name');
					var px = $(this).find("input[type=hidden]").val();
					LoadDownFn(kewode,str,px);
					$(this).removeClass("up").addClass("down");
					console.log("蓝向下2");
				} else {
					$(this).addClass("active").prev().removeClass("active");
					$(this).find("input[type=hidden]").val('asc');
					var str = $(this).find("input[type=hidden]").attr('name');
					var px = $(this).find("input[type=hidden]").val();
					LoadDownFn(kewode,str,px);
					console.log("黑向上加蓝2");
				}
			}
		}
	})
	
	//为删除按钮绑定单击事件
	$(document).on("click",".btnlist_delete",function(){
		if($(".xiansuo_List li").length == 0){
			return false;
		}
		
		if($("input[type='checkbox'][name='checkedres']:checked").length==0){
			return false;
		}
		
		$(".delete-modal3").fadeIn();
	})
	
	//为取消按钮绑定单击事件
	$(document).on("click",".de_cancel_13",function(){
		$(".delete-modal3").fadeOut();
	})
	
	//为确认按钮绑定单击事件
	$(document).on("click",".de_confirm_13",function(){
		$('.ajax_loadModal').fadeIn();
		var id = '';
		//遍历每个选中的checkbox
		$("input[type='checkbox'][name='checkedres']:checked").each(function(){
			divids =  $(this).parents("li").attr("name");//每条数据的id
			// $("[name= '"+ divids +"' ]").remove();//发起ajax
			id += divids+",";
			if($(".xiansuo_List li").length == 0){//如果页面的li长度等于0
				$("#checkall").prop("disabled", "false");//禁用全选
				$(".xiansuo_Page_border").hide();//隐藏分割线
				$(".xiansuo_Page_div").hide();//隐藏分页器
			}
		})
		$(".delete-modal3").fadeOut();
		var url = pcGoodsDel;
        $.post(url,{'id':id},function(data){
                    $('.ajax_loadModal').hide();
            var leng = data.divids.length;
            if(data.status == 1){
                error(data.data);
            }else{
            	success('删除成功');
                for(var i=0;i<leng;i++){
				$("#checkall").prop("checked", false);//关闭全选
                    $("[name= '"+ data.divids[i] +"' ]").remove();//发起ajax
                }
            }
        },'json');
	})
	
	//为加入推送按钮绑定单击事件
	$(document).on("click",".add-ts1",function(){
		var id = $(this).parents("li").attr("name");
		var thi = $(this);
		if($(this).find("p").html()=="取消推送"){
			$('.ajax_loadModal').fadeIn();
			console.log("取消推送");
			var url = pcQXPush+"?id="+id;
			$.get(url,function(data){
				if(data.status == 1){
					error(data.message);
					return;
				}
				success('操作成功');
				thi.find("img").attr("src",""+tump+"/goods_icon_push_nor.png").siblings("p").html("加入推送").parents("li").attr("data-ts","false").find(".xiansuo_List_state").removeClass("yi_tuisong").html("");
				$(".sucuess-modal").fadeIn();
				$('.ajax_loadModal').hide();
				setTimeout(function(){
					$(".sucuess-modal").fadeOut();
				},1500);
			});
			console.log(id);
		}else{
			$('.ajax_loadModal').fadeIn();
			console.log("加入推送");
			var url = pcAddPush+"?id="+id;
			$.get(url,function(data){
				if(data.status == 1){
					error(data.message);
					$('.ajax_loadModal').hide();
					return;
				}
				success('操作成功');
				thi.find("img").attr("src",""+tump+"/goods_icon_push_pre.png").siblings("p").html("取消推送").parents("li").attr("data-ts","true").find(".xiansuo_List_state").addClass("yi_tuisong").html("已加入推送");
				$(".sucuess-modal").fadeIn();
				$('.ajax_loadModal').hide();
				setTimeout(function(){
					$(".sucuess-modal").fadeOut();
				},1500);
			},'json');
			console.log(id);
		}
	})

	//为分享按钮绑定单击事件
	$(document).on("click",".share-110",function(){
		socialShare('.social-share');
	})

	//为滑动箭头a元素绑定单击事件
	$(document).on("click",".click_sjbtn",function(){
		$('.ajax_loadModal').fadeIn();
		var result = '';
		var thi = $(this);
		var id = $(this).prev().val();
		var name = $(this).prev().attr('name');
		var str = "";
		var that = $(this);
		if($(this).hasClass("open")){
			$('.ajax_loadModal').hide();
			$(this).removeClass("open").addClass("close").siblings(".slider_content1").slideUp().remove();
		}else{
			if(name == 'member_id' ){
			var url = pcPushXx+"?str=member&id="+id;
			$.get(url,function(data){
			data.data.mobile = data.data.mobile?data.data.mobile:'暂无';
			data.data.email = data.data.email?data.data.email:'暂无';
			result += 
				'<div class="slider_content1">'+
					'<div class="slider_content1_lf">'+
						'<div>联系人：'+data.data.truename+'</div>'+
							'<div>手<span class="pdlf-14"></span>机：'+data.data.mobile+'</div>'+
							'<div>电<span class="pdlf-14"></span>话：暂无</div>'+
							'<div>邮<span class="pdlf-14"></span>箱：'+data.data.email+'</div>'+
						'</div>'+
						'<div class="slider_content1_rt">'+
							'<div>地<span style="padding-left: 28px;"></span>址： 暂无</div>'+
							'<div class="jiequ_str">线索描述：暂无</div>'+
						'</div>'+
				'</div>';
				thi.next().after(result);
				$('.ajax_loadModal').hide();
				that.removeClass("close").addClass("open").siblings(".slider_content1").slideDown();
				},'json');
			}else if(name == 'detail_id'){
				var url = pcPushXx+"?str=detail&id="+id;
				$.get(url,function(data){
					data.data.search_detail_contacts = data.data.search_detail_contacts?data.data.search_detail_contacts:'暂无';
					data.data.search_detail_mobile = data.data.search_detail_mobile?data.data.search_detail_mobile:'暂无';
					data.data.search_detail_tel = data.data.search_detail_tel?data.data.search_detail_tel:'暂无';
					data.data.search_detail_email = data.data.search_detail_email?data.data.search_detail_email:'暂无';
					data.data.search_detail_address = data.data.search_detail_address?data.data.search_detail_address:'暂无';
					data.data.search_detail_title = data.data.search_detail_title?data.data.search_detail_title:'暂无';
					result += 
						'<div class="slider_content1">'+
							'<div class="slider_content1_lf">'+
								'<div>联系人：'+data.data.search_detail_contacts+'</div>'+
									'<div>手<span class="pdlf-14"></span>机：'+data.data.search_detail_mobile+'</div>'+
									'<div>电<span class="pdlf-14"></span>话：'+data.data.search_detail_tel+'</div>'+
									'<div>邮<span class="pdlf-14"></span>箱：'+data.data.search_detail_email+'</div>'+
								'</div>'+
								'<div class="slider_content1_rt">'+
									'<div>地<span style="padding-left: 28px;"></span>址： '+data.data.search_detail_address+'</div>'+
									'<div class="jiequ_str">线索描述：'+data.data.search_detail_title+'</div>'+
								'</div>'+
						'</div>';
					thi.next().after(result);
					$('.ajax_loadModal').hide();
					that.removeClass("close").addClass("open").siblings(".slider_content1").slideDown();
				},'json');
			}
		}
	})
	
	//为推送日志图片绑定单击事件
	$(document).on("click",".ts-rizhi1",function(){
		$('.ajax_loadModal').fadeIn();
		var id = $(this).parents("li").attr("name");
		var url = pcPushList;
		var data = {'id':id}
		var result = '';
		$.post(url,data,function(data){
			result +=
			'<div class="tsRz-div_limain">'+
					'<div class="tsRz-div_liImg">'+
						'<img src="'+data[0].img+'" alt="" />'+
					'</div>'+
					'<div class="tsRz-div_dts">'+
						'<p class="tsRz-div_title">'+data[0].title+'</p>'+
						'<p style="margin-top: 10px;"><span class="span_1">&yen;'+data[0].price+'</span>'+
						'<span class="span_2">'+
							'发布时间：'+
							'<span class="span_21">'+data[0].push_setting_createtime+'</span>'+
						'</span></p>'+
					'</div>'+
				'</div>'+
			'<div class="tsRz_saixuan">'+
					'<div class="tsRz_saixuan_hd">'+
						'<div class="oneLine-cell" style="text-align: initial;">'+
							'<span class="span-text11">按时间筛选</span>'+
							'<input type="datetime" class="input-sm laydate-icon" id="inputStartTime" name="sdate" placeholder="开始时间">'+
							'<sapn class="most">至</sapn>'+
							'<input type="datetime" class="input-sm laydate-icon" id="inputEndTime" name="edate" placeholder="结束时间">'+
							'<input type="hidden" value="'+data[0].itemid+'" name="goodsitemid"/>'+
							'<span class="saixuan_btn">确认</span>'+
						'</div>'+
					'</div>'+
					'<div class="tsRz-saixuan-box">'+
						'<div class="tsRz-saixuan-box-hd">'+
							'<p class="hd_p1">推送渠道</p>'+
							'<p class="hd_p2">推送时间</p>'+
						'</div>'+
						'<ul class="tsRz-saixuan-ul">';
						if( data.tuison != null){
							var leng = data.tuison.length;
							for(var i=0;i<leng;i++){
								result +=
							'<li class="tsRz-saixuan-li">';
							if(data.tuison[i].member == 1 ){
								result +=
								'<input type="hidden" value="'+data.tuison[i].push_log_member_id+'" name="member_id"/>';
							}else{
								result +=
								'<input type="hidden" value="'+data.tuison[i].push_search_log_search_detail_id+'" name="detail_id"/>';
							}
							result +=
									'<a class="click_sjbtn close"></a>'+
									'<div class="tsRz-saixuan-lihd">'+
										'<div class="tsRz-saixuan-qudao">'+data.tuison[i].qudao+'</div>'+
										'<div class="tsRz-saixuan-timer">'+data.tuison[i].date+'</div>'+
									'</div>'+
							'</li>';
							 }
						}else{
							result +=
							'<li class="tsRz-saixuan-li"><p>暂无数据</p></li>';
						}
						result += 
						'</ul>'+
					'</div>'+
				'</div>';
			$('#tsRz_List').append(result);
			$('.ajax_loadModal').hide();
			$(".tsRz-modal").fadeIn();//父元素显示
			getHeight();//动态获取高度
		},'json');
	})
	
	//为推送日志X按钮绑定单击事件
	$(document).on("click",".tsRz-div_header_close",function(){
		$(".tsRz-modal").fadeOut();
		$('#tsRz_List').empty();
	})
	
	//为编辑绑定单击事件
	$(document).on("click",".edit-1",function(){
		$(".category").empty();
		$('.ajax_loadModal').fadeIn();
		var id = $(this).parents("li").attr("name");
		var url = pcUpdGoods+"?id="+id;
		$.ajax({
            type:'get',
            dataType:'json',
            url:url,
            success:function(data){
                $('input[name=goods_id]').val(id);
				$(".radius_cell").eq(data.typeid).prop("checked",true);//消息类型
				$(".msg_title").val(data.title);//消息标题
				$(".msg_level").val(data.level);//消息标题级别
				$(".msg_keyWord").val(data.keyword);//关键词
				$(".category").append(data.catid);//行业分类
				$(".msg_brand").val(data.brand);//产品品牌
				if(data.html != null){
					$("#editor").find("#ueditor_0").contents().find("body").html(data.html.content);//获得富文本编辑器的文本值
				}
				$(".arg_name1").val(data.n1);//获取自定义标签1
				$(".arg_name2").val(data.n2);//获取自定义标签2
				$(".arg_name3").val(data.n3);//获取自定义标签3
				$(".arg_val1").val(data.v1);//获取自定义标签1的值
				$(".arg_val2").val(data.v2);//获取自定义标签2的值
				$(".arg_val3").val(data.v3);//获取自定义标签3的值
				$(".jl_count").val(data.unit);//获取计量单位
				$(".pd_price").val(data.price);//获取产品价格
				$(".smm_count1").val(data.minamount);//获取最小起订量
				$(".pd_counts1").val(data.amount);//获取供货总量
				$(".start_time1").val(data.days);//获取发货期限 data.xx
				$('.ajax_loadModal').hide();
				$(".tsXq-modal").fadeIn();//父元素显示
				getHeight();//动态获取高度
            }
        })
	})
	
	//为编辑详情X按钮绑定单击事件
	$(document).on("click",".tsXq-div_header_close",function(){
		$('.radius_cell').prop("checked",false); 
		$("input:not('.radius_cell'),textarea").val(""); 
		$("select").val(0); 
		$("#editor").find("#ueditor_0").contents().find("body").empty();
		$("#edui1_iframeholder").css("height","500px");
		$('.up-section').remove();
		$(".tsXq-modal").fadeOut();
	})
	
	//为编辑详情单选项绑定单击事件
	$(document).on("click",".radius_cell",function(){
		var value1 = $(this).val();
		$(this).prop("checked", true).siblings().prop("checked", false);
	})
	
	//为编辑详情重置按钮绑定单击事件
	$(document).on("click",".btn_reset_1",function(){
		$('.radius_cell').prop("checked",false); 
		$("input:not('.radius_cell'),textarea").val(""); 
		$("select").val(0); 
		$("#editor").find("#ueditor_0").contents().find("body").empty();
		$("#edui1_iframeholder").css("height","500px");
		$('.up-section').remove();
	})
	
	//为编辑详情确认按钮绑定单击事件
	$(document).on("click",".btn_yes_1",function(){
		$('.ajax_loadModal').fadeIn();
		var id = $('input[name=goods_id]').val();
		var msgType = $("input[type='radio']:checked").val();//消息类型
		var msgTitle = $(".msg_title").val();//消息标题
		var msgTitleL = $(".msg_level").val();//消息标题级别
		var KeyWord = $(".msg_keyWord").val();//关键词
		var i = $(".category").find('.select_hangye').length;
        var hyVal = $($(".category").find('.select_hangye')[i-1]).find(':selected').val();//行业分类
		var hyData = $($(".category").find('.select_hangye')[i-1]).find(':selected').text();
		var brand = $(".msg_brand").val();//产品品牌
		var editHtml = $("#editor").find("#ueditor_0").contents().find("body").html();//获得富文本编辑器的文本值
		var UpImgs = $("input[name=file_name]");//获取上传图片的元素
		var tumps = "";
		var len = UpImgs.length;
		for(var i=0;i<len;i++){
			tumps += $(UpImgs[i]).val()+",";
		}
		var dieTime = $("#expiration_time").val();//过期时间
		var arg_name1 = $(".arg_name1").val();//获取自定义标签1
		var arg_name2 = $(".arg_name2").val();//获取自定义标签2
		var arg_name3 = $(".arg_name3").val();//获取自定义标签3
		var arg_val1 = $(".arg_val1").val();//获取自定义标签1的值
		var arg_val2 = $(".arg_val2").val();//获取自定义标签2的值
		var arg_val3 = $(".arg_val3").val();//获取自定义标签3的值
		var jl_count = $(".jl_count").val();//获取计量单位
		var pd_price = $(".pd_price").val();//获取产品价格
		var smm_count1 = $(".smm_count1").val();//获取最小起订量
		var pd_counts1 = $(".pd_counts1").val();//获取供货总量
		var start_time1 = $(".start_time1").val();//买家付款后多少天内发货
		
		//判断用户输入的值
		if( msgType == "" || msgType == undefined){
			$('.ajax_loadModal').hide();
			message("请输入消息类型");
		}else if( msgTitle == "" || msgTitle == undefined){
			$('.ajax_loadModal').hide();
			message("请输入消息标题");
		}else if($(".msg_level").val()=="0"){
			$('.ajax_loadModal').hide();
			message("请选择消息级别");
		}else if( KeyWord == "" || KeyWord == undefined){
			$('.ajax_loadModal').hide();
			message("请输入关键词");
		}else if($(".select_hangye").val()=="0"){
			$('.ajax_loadModal').hide();
			message("请选择行业分类");
		}else{
			//发起ajax
		var datas = {'id':id,'msgType':msgType,'msgTitle':msgTitle,'msgTitleL':msgTitleL,'KeyWord':KeyWord,'hyVal':hyVal,'brand':brand,'editHtml':editHtml,'dieTime':dieTime,'arg_name1':arg_name1,'arg_name2':arg_name2,'arg_name3':arg_name3,'arg_val1':arg_val1,'arg_val2':arg_val2,'arg_val3':arg_val3,'jl_count':jl_count,'pd_price':pd_price,'smm_count1':smm_count1,'pd_counts1':pd_counts1,'hyData':hyData,"tumps":tumps,"start_time1":start_time1};
		var url = pcUpdGoods;
		$.post(url,datas,function(data){
			$('.ajax_loadModal').hide();
			if(data.status == 1){
				error(data.data);
			}else{
				success("修改成功");
				$('.radius_cell').prop("checked",false); 
				$("input:not('.radius_cell'),textarea").val(""); 
				$("select").val(0); 
				$(".z_file").fadeIn();
				$("#editor").find("#ueditor_0").contents().find("body").empty();
				$("#edui1_iframeholder").css("height","500px");
				$('.up-section').remove();
				$(".tsXq-modal").fadeOut();
			}
		},'json');
		}
	})

	//子复选框的事件函数
	$(document).on("click","input[name=checkedres]",function(){
		setSelectAll();
	})
})

//为兼容其他浏览器，则需要js解决，以下为封装的方法。
function wordlimit(cname,wordlength){
    var cname = $(''+cname+'');//需要加省略符号的元素对象
    for(var i=0;i<cname.length;i++){　　　　　　　　　　　
       var nowhtml=cname[i].innerHTML;//元素的内容
        var nowlength=cname[i].innerHTML.length;//元素文本的长度
        if(nowlength>wordlength){
            cname[i].innerHTML=nowhtml.substr(0,wordlength)+'...';//截取元素的文本的长度并加上省略号
            //console.log(cname[i].offsetWidth);
        }
    }
}

//定义获取高度方法
function getHeight() {
	var height = $(window).height();
	var TopH = 76 + 131;
	var cellH = (height - TopH) - 15;
	var FPageH = $(".xiansuo_Page_Div").height();
	$(".left_template,.right_template").height(height);
	$(".xiansuo_main").height(cellH+10);
	$(".xiansuo_List").height(cellH-FPageH);
	if($(".tsXq-modal").css("display") === "block"){
		var eidtDivH = $(".tsXq-div").height();
		var eidtAllH = $(".tsXq-div_header").height() + $(".Two_Btn_cells_1").height() + 20;
		$(".tsXq-div_main").height(eidtDivH-eidtAllH);
		//console.log(eidtDivH,eidtDivH-eidtAllH);
	}

	if($(".tsRz-modal").css("display") === "block"){
		var tsRzDivH = $(".tsRz-div").height();
		var tsRzAllH = $(".tsRz-div_header").height() + $(".tsRz-div_limain").outerHeight(true) + $(".tsRz_saixuan_hd").height() + 15;
		$(".tsRz-saixuan-box").height(tsRzDivH-tsRzAllH);
		//console.log(tsRzDivH-tsRzAllH);
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