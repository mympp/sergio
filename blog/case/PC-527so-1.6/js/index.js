/**
 * all js
 */
// 首页
// 首页轮播
$(document).ready(function(){
	var length,
		currentIndex = 0,
		interval,
		hasStarted = false,
		t = 60000;
	length = $(".alider-panel").length;
	//除了第一张图片其他隐藏
	$(".slider-panel:not(:first)").hide();
	//将第一张为激活状态
	$(".slider-panel:first").addClass("slider-item-selected");
	//隐藏向前向后按钮
	$(".slider-page").hide();

	//鼠标悬停时显示向前先后按钮
	$(".slider-panel, .slider-pre, .slider-next").hover(function(){
		stop();
		$("slider-page").show();
	},function(){
		$("slider-page").hide();
		start();
	});

	

});
//首页视频