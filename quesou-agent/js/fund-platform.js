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