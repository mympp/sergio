$(function(){
	var pageVal = $(".xiansuo_Page_Three").val();
	$(".xiansuo_Pages").html(pageVal+"页");
	
	getHeight(); //动态设置高度
	
	$(window).resize(function(){
		getHeight(); 
	})
	
	var maxTime = {
		elem: '#expiration_time',
		min: laydate.now()
		// max: laydate.now()//此处为截止时间的值
	};
	
	//截止时间
	$('#expiration_time').click(function() {
		laydate(maxTime);
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
	
	//为发布产品单选项绑定单击事件
	$(document).on("click",".radius_cell",function(){
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
		var start_time1 = $(".start_time1").val();//获取发货期限
		
		//判断用户输入的值
		if( msgType == "" || msgType == undefined){
			message("请输入消息类型");
		}else if( msgTitle == "" || msgTitle == undefined){
			message("请输入消息标题");
		}else if($(".msg_level").val()=="0"){
			message("请选择消息级别");
		}else if( KeyWord == "" || KeyWord == undefined){
			message("请输入关键词");
		}else if($(".select_hangye").val()=="0"){
			message("请选择行业分类");
		}else{
		var datas = {'msgType':msgType,'msgTitle':msgTitle,'msgTitleL':msgTitleL,'KeyWord':KeyWord,'hyVal':hyVal,'brand':brand,'editHtml':editHtml,'dieTime':dieTime,'arg_name1':arg_name1,'arg_name2':arg_name2,'arg_name3':arg_name3,'arg_val1':arg_val1,'arg_val2':arg_val2,'arg_val3':arg_val3,'jl_count':jl_count,'pd_price':pd_price,'smm_count1':smm_count1,'pd_counts1':pd_counts1,'hyData':hyData,"tumps":tumps,'start_time1':start_time1};
		var url = pcGoodsAdd;
		$('.ajax_loadModal').fadeIn();
		//发起ajax
		$.post(url,datas,function(data){
			$('.ajax_loadModal').hide();
			if(data.status == 1){
				success(data.data);
			}else{
				success("发布成功");
				$('.radius_cell').prop("checked",false); 
				$("input:not('.radius_cell'),textarea").val(""); 
				$("select").val(0); 
				$("#editor").find("#ueditor_0").contents().find("body").empty();
				$("#edui1_iframeholder").css("height","500px");
				$('.up-section').remove();
				location.href = pcGoodsIndex ;
			}
		},'json');
			// console.log(msgType,msgTitle,msgTitleL,KeyWord,hyVal,brand,editHtml,src,dieTime,arg_name1,arg_name2,arg_name3,arg_val1,arg_val2,arg_val3,jl_count,pd_price,smm_count1,pd_counts1,stratTime);		
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
}