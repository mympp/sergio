$(function(){
	$(window).on("load",function(){
		getHeight();//设置动态高度
		
		$(".table-content").scrollTop(1);
		if($(".table-content").scrollTop()>0){
			$(".table-head").css("paddingRight","17px");
		}
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
	
	//为搜索按钮绑定单击事件
	$(document).on("click",".fund_searchBtn",function(){
		var vipname = $(".this_uname1").val();
		var viptel = $(".this_uphone1").val();
		var statrTime = $("#inputStartTime").val();
		var endTime = $("#inputEndTime").val();
		if(vipname == "" && viptel == "" && statrTime == "" && endTime == ""){
			Tips_User1("搜索条件不能为空");
		}else{
			if((statrTime && endTime == "") || (vipname && viptel == "" && statrTime && endTime == "") || (vipname == "" && viptel && statrTime && endTime == "")){
				Tips_User1("结束时间不能为空");
				return false;
			}
			
			if((statrTime == "" && endTime ) || (vipname && viptel == "" && statrTime == "" && endTime) || (vipname == "" && viptel && statrTime == "" && endTime)){
				Tips_User1("开始时间不能为空");
				return false;
			}
			
			if(statrTime && endTime){
				console.log(vipname,viptel,statrTime,endTime);//发起ajax
				return false;
			}
			
			if(vipname){
				console.log(vipname,viptel,statrTime,endTime);//发起ajax
				return false;
			}
			
			if(viptel){
				console.log(vipname,viptel,statrTime,endTime);//发起ajax
				return false;
			}
		}
	})
	
	//为清空按钮绑定单击事件
	$(document).on("click",".fund_clearBtn",function(){
		Tips_User2("操作成功");
		$(".laydate_box").hide();
		$(".saixuan_divAll_lf input").val("");//清空输入框的值
	})
	
	//打开申请提现
	$(document).on("click",".tixian_btn",function(){
		var str =
		'<div class="tixian_modal">'+
			'<div class="tixian_div">'+
				'<div class="tixian_hd">'+
					'<em>申请提现</em>'+
					'<span class="close-span1">&times;</span>'+
				'</div>'+
				'<div class="tixian_content">'+
					'<div class="tixian_bank1">'+
						'<span class="span1">提现到银行卡：</span>'+
						'<div class="tixian_bank1_dets" onselectstart="return false;">'+
							'<span class="bank1_Type">中国银行</span>'+
							'<span class="bank1_lastText">尾号：</span>'+
							'<span class="bank1_lastnum">5276</span>'+
						'</div>'+
					'</div>'+
					'<div class="tixian_bank2">'+
						'<span class="span1">提现金额：</span>'+
						'<div class="tixian_bank2_dets" onselectstart="return false;">'+
							'<input type="text" class="tixian_money" placeholder="输入金额"/><span class="span2">元</span>'+
							'<span class="get_money">全部提现</span>'+
							'<br>'+
							'<p class="ketixian_p"><span class="span-1">可提现金额：<span class="All_money">100000.00</span>（提现后，7个工作日内审核转账）</span></p>'+
							'<span class="tixian_btn1">提现</span>'+
						'</div>'+
					'</div>'+
				'</div>'+
			'</div>'+
		'</div>';
		$(document.body).append(str);//ajax成功回调
		$(".tixian_modal").fadeIn();
	})
	
	//为全部提现按钮绑定单击事件
	$(document).on("click",".get_money",function(){
		if($(".All_money").text()=="0.00"){
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