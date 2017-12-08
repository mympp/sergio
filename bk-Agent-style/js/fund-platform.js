$(function(){
	$(window).on("load",function(){
		getHeight();//设置动态高度
		
		$(".table-content").scrollTop(1);
		if($(".table-content").scrollTop()>0){
			$(".table-head").css("paddingRight","17px");
		}
		
//		$(".icon-shopping").eq(0).addClass("active").siblings().removeClass("active");
//		$(".icon-money-div").css("display","block").find("p").eq(0).addClass("open");
	})

	loadDownFn();
	
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
		var totime   = $("#inputStartTime").val()?$("#inputStartTime").val():'';
		var endTime  = $("#inputEndTime").val()?$("#inputEndTime").val():'';
        var datas    = {'page':page,'size':size,'username':username,'mobile':mobile,'totime':totime,'endTime':endTime};
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
										'<div>'+data.list[i].rz_time+'</div>'+
									'</td>'+
									'<td>'+
										'<div>'+data.list[i].username+'</div>'+
									'</td>'+
									'<td>'+
										'<div>'+(data.list[i].mobile?data.list[i].mobile:(data.list[i].telephone?data.list[i].telephone:'暂无'))+'</div>'+
									'</td>'+
									'<td>'+
										'<div>'+data.list[i].m_stk_cny_reason+'</div>'+
									'</td>'+
									'<td>'+
										'<div>'+data.list[i].amount+'</div>'+
									'</td>'+
									'<td>'+
										'<div>'+data.list[i].rz_fund+'</div>'+
									'</td>'+
									'<td>'+
										'<div>'+data.list[i].m_stk_cny_trainer_fee+'</div>'+
									'</td>'+
									'<td>'+
										'<div>'+data.list[i].m_stk_cny_price+'</div>'+
									'</td>'+
									'<td>'+
										'<div>'+data.list[i].m_stk_cny_parent_fee+'</div>'+
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
})


//定义获取高度方法
function getHeight(){
	var winH = $(window).height();
	var topH = $(".right_template").height();
	var divH = winH-topH;
	var CellH = divH-($(".fund-platform-header").height() + 40 + $(".saixuan_div").height() + 20 + $(".table-head").height() + 10 + $(".xiansuo_Page_Div").height());
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