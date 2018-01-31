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
	$(document).on("click",".daili_searchBtn",function(){
		var vipname = $(".daili-text").val();
		var viptel = $(".daili-iphone").val();
		var statrTime = $("#inputStartTime").val();
		var endTime = $("#inputEndTime").val();
		var vlevel  = $(".daili-area").val();
		if(vipname == "" && viptel == "" && statrTime == "" && endTime == "" && vlevel == ""){
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
				console.log(vipname,viptel,statrTime,endTime,vlevel);//发起ajax
				return false;
			}
			
			if(vipname){
				console.log(vipname,viptel,statrTime,endTime,vlevel);//发起ajax
				return false;
			}
			
			if(viptel){
				console.log(vipname,viptel,statrTime,endTime,vlevel);//发起ajax
				return false;
			}
			
			if(vlevel){
				console.log(vipname,viptel,statrTime,endTime,vlevel);//发起ajax
				return false;
			}
		}
	})
	
	//为清空按钮绑定单击事件
	$(document).on("click",".daili_clearBtn",function(){
		Tips_User2("操作成功");
		$(".filtrate input").val("");//清空输入框的值
		$(".filtrate select").val("");//清空select的值
	})
	
	//为批准按钮绑定单击事件
	$(document).on("click",".pizhun",function(){
		that1 = $(this); 
		var str = 
		'<div class="tixian_modal">'+
			'<div class="tixian_div">'+
				'<div class="tixian_text">'+
					'<p>批准提现？</p>'+
					'<span class="confirm_1 pizhun_0">确认</span>'+
					'<span class="cancel_1">取消</span>'+
				'</div>'+
			'</div>'+
		'</div>';
		$(document.body).append(str);
		$(".tixian_modal").fadeIn();
	})
	
	//为批准确认按钮绑定单击事件
	$(document).on("click",".pizhun_0",function(){
		var id0 = that1.parents("tr").attr("name");
		console.log(id0);//发起ajax
		that1.parent().empty().text(that1.text());//ajax成功回调
		$(".tixian_modal").fadeOut().remove();
		Tips_User2("操作成功");
	})
	
	//为不批准按钮绑定单击事件
	$(document).on("click",".bu_pizhun",function(){
		that2 = $(this); 
		var str =
		'<div class="tixian_modal">'+
			'<div class="tixian_div">'+
				'<div class="tixian_text">'+
					'<p>不批准提现？</p>'+
					'<span class="confirm_1 pizhun_1">确认</span>'+
					'<span class="cancel_1">取消</span>'+
				'</div>'+
			'</div>'+
		'</div>';
		$(document.body).append(str);
		$(".tixian_modal").fadeIn();
	})
	
	//为不批准确认按钮绑定单击事件
	$(document).on("click",".pizhun_1",function(){
		var id1 = that2.parents("tr").attr("name");
		console.log(id1);//发起ajax
		that2.parent().empty().text(that2.text());//ajax成功回调
		$(".tixian_modal").fadeOut().remove();
		Tips_User2("操作成功");
	})
	
	//为已转账按钮绑定单击事件
	$(document).on("click",".isInt",function(){
		var id = $(this).parents("tr").attr("name");
		console.log(id);//发起ajax
		$(this).parent().empty().text($(this).text());//ajax成功回调
		Tips_User2("操作成功");
	})
	
	//为未转账按钮绑定单击事件
	$(document).on("click",".noInt",function(){
		var id = $(this).parents("tr").attr("name");
		console.log(id);//发起ajax
		$(this).parent().empty().text($(this).text());//ajax成功回调
		Tips_User2("操作成功");
	})
	
	//关闭提现模态框
	$(document).on("click",".close-span1,.cancel_1",function(){
		$(this).parents(".tixian_modal").fadeOut().remove();
	})
	
	//为名称绑定单击事件
	$(document).on("click",".user_name",function(){
		var id = $(this).parents("tr").attr("name");
		console.log(id);//发起ajax
		var str = 
		'<div class="dailiShop_dets_modal">'+
			'<div class="dailiShop_dets_div">'+
				'<div class="dailiShop_dets_hd">'+
					'<span class="close-span2">&times;</span>'+
				'</div>'+
				'<div class="dailiShop_dets_warp">'+
					'<div class="dailiShop_dets_content">'+
						'<div class="one-cell1">'+
							'<span class="left_span1">姓<span class="textck-1"></span>名：</span>'+
							'<span class="right_span1">嘛哩嘛哩哄</span>'+
						'</div>'+
						'<div class="one-cell1">'+
							'<span class="left_span1">账<span class="textck-1"></span>号：</span>'+
							'<span class="right_span1">zhanjunhao@527so.com</span>'+
						'</div>'+
						'<div class="one-cell1">'+
							'<span class="left_span1">电<span class="textck-1"></span>话：</span>'+
							'<span class="right_span1">13580546695</span>'+
						'</div>'+
						'<div class="one-cell1">'+
							'<span class="left_span1">区<span class="textck-1"></span>域：</span>'+
							'<span class="right_span1">广东广州天河</span>'+
						'</div>'+
						'<div class="one-cell1">'+
							'<span class="left_span1">详细地址：</span>'+
							'<span class="right_span1">广东广州天河大观中路95号A栋407-408</span>'+
						'</div>'+
						'<div class="one-cell1">'+
							'<span class="left_span1">状<span class="textck-1"></span>态：</span>'+
							'<span class="right_span1">启用</span>'+
						'</div>'+
						'<div class="one-cell1">'+
							'<span class="left_span1">推<span class="textck-2"></span>荐<span class="textck-2"></span>码：</span>'+
							'<span class="right_span1">YGSGE110001</span>'+
						'</div>'+
						'<div class="one-cell1 bank_cell1">'+
							'<span class="left_span1">银行账号：</span>'+
							'<span class="right_span1">中国银行</span><br>'+
							'<span class="right_span1 bank_num1">6222023602008574899</span><br>'+
							'<span class="right_span1 bank_name1">陈凯文</span>'+
						'</div>'+
						'<div class="one-cell1">'+
							'<span class="left_span1">备<span class="textck-1"></span>注：</span>'+
							'<span class="right_span1 user_beizhu1">打算恐龙当家阿斯利康大数据达拉斯建档立卡京东卡来点击阿萨德库拉索打了卡加大路口的骄傲离开的立刻大声就离开</span>'+
						'</div>'+
						'<div class="one-cell1">'+
							'<span class="left_span1">创建日期：</span>'+
							'<span class="right_span1">2017-10-30 11:45</span>'+
						'</div>'+
						'<div class="one-cell1">'+
							'<span class="left_span1">更新日期：</span>'+
							'<span class="right_span1">2017-10-30 18:30</span>'+
						'</div>'+
					'</div>'+
				'</div>'+
			'</div>'+
		'</div>';
		$(document.body).append(str);//ajax成功回调
		wordlimit("user_beizhu1",25);//防止备注字符串过长
		$(".dailiShop_dets_modal").fadeIn();
	})
	
	//关闭代理商详情模态框
	$(document).on("click",".close-span2",function(){
		$(this).parents(".dailiShop_dets_modal").fadeOut().remove();
	})
})

//定义获取高度方法
function getHeight(){
	var winH = $(window).height();
	var topH = $(".right_template").height();
	var divH = winH-topH;
	var CellH = divH-($(".fund-platform-header").outerHeight(true) + $(".saixuan_div").outerHeight() + $(".daili-header_border").outerHeight() + 20 + $(".table-head").outerHeight() + $(".xiansuo_Page_Div").outerHeight(true));
	$(".left_template").height(winH);
	$(".fund-platform-warp").height(divH);
	//为了兼容火狐及360浏览器－2px
	$(".table-content").height(CellH-2);
	//console.log(divH,CellH);
}

//为兼容其他浏览器，则需要js解决，以下为封装的方法。
function wordlimit(cname,wordlength){
    var cname = $('.'+cname+'');//需要加省略符号的元素对象
    for(var i=0;i<cname.length;i++){　　　　　　　　　　　
       var nowhtml=cname[i].innerHTML;//元素的内容
        var nowlength=cname[i].innerHTML.length;//元素文本的长度
        if(nowlength>wordlength){
            cname[i].innerHTML=nowhtml.substr(0,wordlength)+'...';//截取元素的文本的长度并加上省略号
        }
    }
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