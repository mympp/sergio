$(function(){
    $('.click').click(function(){
        $('.bg').css({'display':'block'});
        $('.content').css({'display':'block'});
    });
    $('.bg').click(function(){
        $('.bg').css({'display':'none'});
        $('.content').css({'display':'none'});
    });
});
$('.click1').click(function(){
	$('.bg').fadeIn(200);
	$('.content').fadeIn(400);
});
$('.bg').click(function(){
	$('.bg').fadeOut(800);
	$('.content').fadeOut(800);
});


$(function(){
//获取要定位元素距离浏览器顶部的距离
var navH = $(".bkg3").offset().top;

//滚动条事件
$(window).scroll(function(){
//获取滚动条的滑动距离
var scroH = $(this).scrollTop();
//滚动条的滑动距离大于等于定位元素距离浏览器顶部的距离，就固定，反之就不固定
if(scroH>=navH){
$(".bkg3").css({"position":"fixed","top":0});
}else if(scroH＜navH){
$(".bkg3").css({"position":"static"});
}
})
})



$(function(){
    var bkg2-center = 0; // 默认值为0，二级菜单向下滑动显示；值为1，则二级菜单向上滑动显示
    if(bkg2-center ==0){
        $('.bkg2-center li').hover(function(){
            $('.second',this).css('top','300px').show();
        },function(){
            $('.second',this).hide();
        });
    }else if(bkg2-center ==1){
        $('.bkg2-center li').hover(function(){
            $('.second',this).css('bottom','300px').show();
        },function(){
            $('.second',this).hide();
        });
    }
});