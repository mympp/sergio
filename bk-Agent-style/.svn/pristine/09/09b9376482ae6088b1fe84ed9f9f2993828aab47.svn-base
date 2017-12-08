$(function(){
	$(window).on("load",function(){
		getHeight();//设置动态高度
		
		$(".table-content").scrollTop(1);
		if($(".table-content").scrollTop()>0){
			$(".table-head").css("paddingRight","17px");
		}
		loadDownFn();
//		$(".icon-shopping").eq(0).addClass("active").siblings().removeClass("active");
//		$(".icon-money-div").css("display","block").find("p").eq(0).addClass("open");
	})
	
	$(window).resize(function(){
		var windowH = $(window).height();
		if(windowH>600){
			getHeight();//设置动态高度
			//console.log("大于600 "+windowH);
		}
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
		min: laydate.now()
	};

	//开始时间
	$('#inputStartTime').click(function() {
		laydate(start);
	});

	//结束时间
	$('#inputEndTime').click(function() {
		laydate(end);
	});
	
	    //为分页器每个li绑定单击事件
    $(document).on("click",".xiansuo_Page_list li",function(){
        var page = $(this).html();     
        var page_size=$('.xiansuo_Page_Three').val();
        loadDownFn(page,page_size);                
    })

    //为跳转至输入框监听键盘事件
    $(document).on("keydown",".that_Page",function(e){
        var page = $(this).val();
        var num = $('#xiansuo_pages_count').html();
        if(page>num){
            page=1;
        }        
        var page_size=$('.xiansuo_Page_Three').val();
        if(e.keyCode==13){
            loadDownFn(page,page_size);
        }
    })

    //为首页判定事件
    $(document).on('click','.first_page',function(e){
        var page = 1;   
        var page_size=$('.xiansuo_Page_Three').val();
        loadDownFn(page,page_size);
        e.stopPropagation();
    })

    //为上一页绑定事件
    $(document).on('click','.prev_page',function(e){
        var page = $(this).attr('name');       
        var page_size=$('.xiansuo_Page_Three').val();
        loadDownFn(page,page_size);
        e.stopPropagation();
    })

    //为下一页绑定事件
    $(document).on('click','.next_page',function(e){
        var page = $(this).attr('name');       
        var page_size=$('.xiansuo_Page_Three').val();
        loadDownFn(page,page_size);
        e.stopPropagation();
    })

    //为尾页绑定事件
    $(document).on('click','.last_page',function(e){
        var page = $(this).attr('name'); 
        var page_size=$('.xiansuo_Page_Three').val();
        loadDownFn(page,page_size);
        e.stopPropagation();
    })

	function loadDownFn(page='1',size='10') {
        $('.ajax_loadModal').fadeIn();
        var username = $(".this_uname1").val()?$(".this_uname1").val():'';
		var mobile   = $(".this_uphone1").val()?$(".this_uphone1").val():'';
        var datas    = {'page':page,'size':size,'username':username,'mobile':mobile};
        var result   = '';
        ajax_message('show');
        $.ajax({
            type: 'POST',
            url: '/Fund/get_user_list',
            data : datas,
            dataType: 'json',
            success: function(data) {
                if(data.code==1){
                    var len=data.list.length;
                    $('.table_ctbody').html('');
                    $('.xiansuo_Page_div').html('');
                    for (var i = 0; i < len; i++) {
                        result+=
	                            '<tr name='+(i+1)+'>'+
									'<td>'+
										'<div>'+data.list[i].m_traineramount_m_agent_company+'</div>'+
									'</td>'+
									'<td>'+
										'<div>'+data.list[i].m_traineramount_tel+'</div>'+
									'</td>'+
									'<td>'+
										'<div>'+data.list[i].m_traineramount_members+'</div>'+
									'</td>'+
									'<td>'+
										'<div>'+data.list[i].m_traineramount_sum+'</div>'+
									'</td>'+
								'</tr>';
                    }
                    $('.table_ctbody').append(result);
                    $('.xiansuo_Page_div').html(data.page_html);
                    ajax_message();
                }
              
            }
        })
    }

	
	//为搜索按钮绑定单击事件
	$(document).on("click",".fund_searchBtn",function(){
			loadDownFn();
	})
	
	//为清空按钮绑定单击事件
	$(document).on("click",".fund_clearBtn",function(){
		Tips_User2("操作成功");
		$(".laydate_box").hide();
		$(".saixuan_divAll_lf input").val("");//清空输入框的值
	})
	
	//打开申请提现
	$(document).on("click",".tixian_btn",function(){
		var str =`
			<div class="tixian_modal">
				<div class="tixian_div">
					<div class="tixian_hd">
						<em>申请提现</em>
						<span class="close-span1">&times;</span>
					</div>
					<div class="tixian_content">
						<div class="tixian_bank1">
							<span class="span1">提现到银行卡：</span>
							<div class="tixian_bank1_dets" onselectstart="return false;">
								<span class="bank1_Type">中国银行</span>
								<span class="bank1_lastText">尾号：</span>
								<span class="bank1_lastnum">5276</span>
							</div>
						</div>
						<div class="tixian_bank2">
							<span class="span1">提现金额：</span>
							<div class="tixian_bank2_dets" onselectstart="return false;">
								<input type="text" class="tixian_money" placeholder="输入金额"/><span class="span2">元</span>
								<br>
								<p class="ketixian_p"><span class="span-1">可提现金额&yen;<span class="All_money">100000.00</span></span><span class="span-1">，</span><span class="get_money">全部提现</span></p>
								<span class="tixian_btn1">提现</span>
							</div>
						</div>
					</div>
				</div>
			</div>
		`;
		$(document.body).append(str);//ajax成功回调
		$(".tixian_modal").fadeIn();
	})
	
	//为全部提现按钮绑定单击事件
	$(document).on("click",".get_money",function(){
		if($(".tixian_money").val().length>0){
			return false;
		}
		$(".tixian_money").val($(".All_money").text());
	})
	
	//为提现按钮绑定单击事件
	$(document).on("click",".tixian_btn1",function(){
		var money = $(".tixian_money").val();
		if(money == "" || money == undefined){
			Tips_User2("请输入金额");
		}else{
			Tips_User2("操作成功");
			console.log(money);//发起ajax
			$(this).parents(".tixian_modal").fadeOut().remove();//ajax成功回调
		}
	})
	
	//关闭申请提现
	$(document).on("click",".close-span1",function(){
		$(this).parents(".tixian_modal").fadeOut().remove();
	})
})


//定义获取高度方法
function getHeight(){
	var winH = $(window).height();
	var topH = $(".right_template").height();
	var divH = winH-topH;
	var CellH = divH-($(".fund-platform-header").height() + 40 + $(".saixuan_div").height() + $(".p2_text").height() + 18 + 15 + $(".table-head").height() + 10 + $(".xiansuo_Page_Div").height());
	$(".left_template").height(winH);
	$(".fund-platform-warp").height(divH);
	//为了兼容火狐及360浏览器－2px
	$(".table-content").height(CellH-2);
	//console.log(divH,CellH);
}

//定义提示用户方法1
function Tips_User1(text){
	$(".right_center>p>i").text(text);
	$(".right_center>p>i").css({
		"fontSize": 13
	})
	$(".right_center").fadeIn();
	setTimeout(function(){
		$(".right_center").fadeOut();
	},1000)
}

//定义提示用户方法2
function Tips_User2(text){
	$(".right_center>p>i").text(text);
	$(".right_center>p>i").css({
		"fontSize": 16
	})
	$(".right_center").fadeIn();
	setTimeout(function(){
		$(".right_center").fadeOut();
	},1000)
}