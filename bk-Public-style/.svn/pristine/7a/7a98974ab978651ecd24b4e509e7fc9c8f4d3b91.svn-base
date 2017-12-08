$(function(){
/*	$(".header").load("../index/header.html");//异步加载页面顶部
	$(".user-search").load("../index/search-box.html");//异步加载搜索框
	$(".footer").load("../index/footer.html");//异步加载页面底部*/

	//为搜索按钮绑定单击事件
	$("#submitSearch").click(function() {
		var n = $("#keywordSearch").val();
		$("#searchForm").submit();
	})
	
	//切换下拉菜单1
	$(document).on("click",".dropdown-toggle",function(){
		$(".dropdown-menu").toggle();
	})

	//切换下拉菜单2
	$(document).on("click",'.dropdown-menu>li>a',function(){
		var Ahtml = $(this).html();
		$('.text-tg').html(Ahtml);
		$("#type").val(Ahtml);
		$(".dropdown-menu").fadeOut();
		$("#type-title").html(Ahtml+"标题： ");
	})
	var type=GetQueryString("type");
 	var keyword=GetQueryString("keyword");
 	$("#keywordSearch").val(keyword);
 	
 	if(type == "供应" || type == "求购"){
 		$('.text-tg').html(type);
 		$("#type").val(type);
 	}
 	if(type == ""){
 		type = "求购";
 		$("#type").val(type);
 	}
	if(type == "供应"){
		$("#type-title").html("供应标题： ");
	}
	//手风琴效果
//	$('.link').on('click',function(){
//		$(this).next('.submenu').show();
//		$(this).find('.right_sanjiao').addClass('sanjiaoxuanzhuan');
//		$(this).parent().siblings().find('.submenu').hide();
//		$(this).parent().siblings().find('.right_sanjiao').removeClass('sanjiaoxuanzhuan');
//	});
    

		
})

function GetQueryString(name)
{
    var reg = new RegExp("(^|&)"+ name +"=([^&]*)(&|$)");
    var r = window.location.search.substr(1).match(reg);
    if(r!=null) 
    return decodeURI(r[2]); 
    return null;
}