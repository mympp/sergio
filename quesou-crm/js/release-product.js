$(function(){
	var pageVal = $(".xiansuo_Page_Three").val();
	$(".xiansuo_Pages").html(pageVal+"页");
	
	getHeight(); //动态设置高度
	
	$(window).resize(function(){
		getHeight(); 
	})
	
	var jiezhi = {
		elem: '#expiration_time',
		min: laydate.now()//此处为截止时间的值
	};
	
	//截止时间	
	$(document).on("click","#expiration_time",function(){
		laydate(jiezhi);
	});
	
	//检测分页器的值变动事件函数
	$(".xiansuo_Page_Three").change(function(){
		var checkValue = $(this).val();
		$(".xiansuo_Pages").html(checkValue+"页");
	})

	//为分页器每个li绑定单击事件
	$(document).on("click",".xiansuo_Page_list li",function(){
		var index = $(this).index();
		var str = $(this).html();
		$(this).addClass("active").siblings().removeClass("active");
		$(".that_Page").val(str);
		console.log(index);
	})
	
	//为发布产品单选项绑定单击事件
	$(document).on("click",".radius_cell",function(){
		var value1 = $(this).val();
		$(this).prop("checked", true).siblings().prop("checked", false);
	})
	
	//为发布产品重置按钮绑定单击事件
	$(document).on("click",".btn_reset_1",function(){
		$('input:radio').prop('checked',false); 
		$("input:not('.radius_cell'),textarea").val("");
		$("select").val(0); 
		$("#editor").find("#ueditor_0").contents().find("body").empty();
		$("#edui1_iframeholder").css("height","500px");
	})
	
	//为发布产品确认按钮绑定单击事件
	$(document).on("click",".btn_yes_1",function(){
		var msgType = $("input[type='radio']:checked").val();//消息类型
		var msgTitle = $(".msg_title").val();//消息标题
		var msgTitleL = $(".msg_level").val();//消息标题级别
		var KeyWord = $(".msg_keyWord").val();//关键词
		var hyVal = $(".select_hangye").val();//行业分类
		var brand = $(".msg_brand").val();//产品品牌
		var editHtml = $("#editor").find("#ueditor_0").contents().find("body").html();//获得富文本编辑器的html片段
		var UpImg = $(".up-img");//获取上传图片的元素
		var dieTime = $("#expiration_time").val();//过期时间
		var str = "";
		UpImg.each(function(){
			str +=$(this).attr("src")+",";
		})
		var src = str.substring(0,str.length-1);//获取图片路径
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
		var stratTime = $(".start_time1").val();//获取发货期限
		
		//判断用户输入的值
		if( msgType == "" || msgType == undefined){
			alert("请输入消息类型");
		}else if( msgTitle == "" || msgTitle == undefined){
			alert("请输入消息标题");
		}else if($(".msg_level").val()=="0"){
			alert("请选择消息级别");
		}else if( KeyWord == "" || KeyWord == undefined){
			alert("请输入关键词");
		}else if($(".select_hangye").val()=="0"){
			alert("请选择行业分类");
		}else{
			//发起ajax
			console.log(msgType,msgTitle,msgTitleL,KeyWord,hyVal,brand,editHtml,src,dieTime,arg_name1,arg_name2,arg_name3,arg_val1,arg_val2,arg_val3,jl_count,pd_price,smm_count1,pd_counts1,stratTime);		
		}
	})
})

//定义获取高度方法
function getHeight() {
	var height = $(window).height();
	var cellMg = parseInt($(".release-product_main").css("marginTop"));//IE 火狐天大巨坑 margin需分开设置css样式 否则js无法获取到其属性值
	var formH = height - 76 - (cellMg*2) - 5;
	$(".left_template,.right_template").height(height);
	$(".release-product_main").height(formH);
	$(".tsXq-div_main").height(formH-110);
//	console.log(typeof height,typeof cellMg,typeof formH);
//	console.log(height,cellMg,formH);
}