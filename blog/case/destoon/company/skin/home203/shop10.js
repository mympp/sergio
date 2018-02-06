// JavaScript Document

$(function(){
	/*多个焦点图*/
	var banner=new listBanner($("div[data-inset='bannrShow']"));
	banner.init();
	 
	 /*精品推荐*/
	$(".recommend-container .item-box").hover(function(){
		var img=$(this).find("img").attr("src");
		$(this).find(".text-bg").stop().animate({opacity:1},400);
		$("#RecommendImg").find("img").attr("src",img);
	},function(){
		$(this).find(".text-bg").stop().animate({opacity:0},400);
	});
	
	/*热销产品*/
	$("#SellingBox .pic-box").hover(function(){
		$(this).find(".text-bg").stop().animate({opacity:1},400);
	},function(){
		$(this).find(".text-bg").stop().animate({opacity:0},400);
	});

	/**/

});