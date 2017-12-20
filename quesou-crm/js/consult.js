$(function(){
	var pageVal = $(".xiansuo_Page_Three").val();
	$(".xiansuo_Pages").html(pageVal+"页");
	
	getHeight(); //动态设置高度

	if($("#inbox_table tbody tr").length == 0){//如果页面的li长度等于0
		$(".xiansuo_Page_Div").hide();//隐藏分页器
	}else{
		$(".xiansuo_Page_Div").show();//隐藏分页器
	}

	$(window).resize(function(){
		getHeight();
	})

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

	//为跳转至输入框监听键盘事件
	$(document).on("keydown",".that_Page",function(e){
		var page = $(this).val();
		if(e.keyCode==13){
			alert(page);
		}
	})
	
	//收件箱表格导航li切换
	$(".inbox-listnav li").click(function(){
		$(this).addClass("selected").siblings().removeClass("selected");
	})
	
	//子复选框的事件函数
	$(document).on("click","input[name=checkedres]",function(){
		setSelectAll();
	})
})

//定义获取高度方法
function getHeight() {
	var winH = $(window).height();
	var TopH1 = $(".left_header").height();//页面顶部高度
	var TopH2 = $(".consult-nav").height();//咨询信息导航高度
	var padH = parseInt($(".consult-main").css("padding"))*2;//外层容器外边距
	var magT = parseInt($(".inbox-main").css("marginTop"));//容器盒子上外边距
	var FPageH = $(".xiansuo_Page_Div").height();//分页器高度
	var TopH3 = $(".inbox-nav-input").height()+$(".inbox-listnav").outerHeight(true);//内容盒子导航头部 搜索框＋导航列表
	$(".left_template,.right_template").height(winH);
	$(".consult-main").height(winH-TopH1-padH);
	$(".inbox-main").height(winH-TopH1-TopH2-padH-magT-4);//兼容360浏览器及火狐浏览器
	$(".inbox-list").height(winH-TopH1-TopH2-padH-magT-4-TopH3-FPageH+30);//动态设置表格外层容器高度     16 17 18 ↘
																								   //相差    16	 `!if(16)else{"BUG"}!`
	$(".scroll_table").height(winH-TopH1-TopH2-padH-magT-4-TopH3-FPageH+14);//动态设置表格滚动容器高度  1 2  3    ↗
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