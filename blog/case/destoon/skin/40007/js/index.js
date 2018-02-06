$(document).ready(function(){
	
    //×ó²à²Ëµ¥µ¼º½À¸
    $('.nav_sub_l li').hover(function(){
        var obj = $(this).children(".list_item");
        obj.css('display','block');
		$(this).addClass("cur");
    },function(){
        var obj = $(this).children(".list_item");
        obj.css('display','none');
		$(this).removeClass("cur");
    })
	
	//¶¥²¿×Ó²Ëµ¥
	$(".wx_hover").hover(function(){
		$(".wx_code").show(100);
		},function(){
		$(".wx_code").hide(100);
	});

    //Â¥²ãµ¼º½
    $('div.elevator li').click(function(){
        var ind = $('div.elevator li').index(this)+1;
        var topVal = $('.floor_'+ind).offset().top;
        $('body,html').animate({scrollTop:topVal-41},500);
    })

    //·µ»Ø¶¥²¿
    $('.gotop').click(function(){
        $('body,html').animate({scrollTop:0},500);
    });

    $(window).scroll(scrolls);
});

//Â¥²ã¹ö¶¯¿ØÖÆ
function scrolls(){
    var f1,f2,f3,f4,f5,f6,f7,f8,f9,f10,f11,f12,f13;
    var sTop = $(window).scrollTop();
    var liItem = $('div.elevator li');
    var floor = $('.elevator');

    fl = $('.floor_1').offset().top-200;
    f2 = $('.floor_2').offset().top-200;
    f3 = $('.floor_3').offset().top-200;
    f4 = $('.floor_4').offset().top-200;
    f5 = $('.floor_5').offset().top-200;
    f6 = $('.floor_6').offset().top-200;
    f7 = $('.floor_7').offset().top-200;
    f8 = $('.floor_8').offset().top-200;
    f9 = $('.floor_9').offset().top-200;
    f10 = $('.floor_10').offset().top-200;
    f11 = $('.floor_11').offset().top-200;
    f12 = $('.floor_12').offset().top-200;
    f13 = $('.floor_13').offset().top-200;

    if(sTop>=fl && sTop < fl+210){
        floor.fadeIn(500);
        liItem.eq(0).addClass('cur').siblings().removeClass('cur');
    }
    if(sTop<fl){
        floor.fadeOut(500);
    }
    if(sTop>=f2){
        liItem.eq(1).addClass('cur').siblings().removeClass('cur');
    }
    if(sTop>=f3){
        liItem.eq(2).addClass('cur').siblings().removeClass('cur');
    }
    if(sTop>=f4){
        liItem.eq(3).addClass('cur').siblings().removeClass('cur');
    }
    if(sTop>=f5){
        liItem.eq(4).addClass('cur').siblings().removeClass('cur');
    }
    if(sTop>=f6){
        liItem.eq(5).addClass('cur').siblings().removeClass('cur');
    }
    if(sTop>=f7){
        liItem.eq(6).addClass('cur').siblings().removeClass('cur');
    }
    if(sTop>=f8){
        liItem.eq(7).addClass('cur').siblings().removeClass('cur');
    }
    if(sTop>=f9){
        liItem.eq(8).addClass('cur').siblings().removeClass('cur');
    }
    if(sTop>=f10){
        liItem.eq(9).addClass('cur').siblings().removeClass('cur');
    }
    if(sTop>=f11){
        liItem.eq(10).addClass('cur').siblings().removeClass('cur');
    }
    if(sTop>=f12){
        liItem.eq(11).addClass('cur').siblings().removeClass('cur');
    }
    if(sTop>=f13 && sTop<f13+200){
        floor.fadeIn(500);
        liItem.eq(12).addClass('cur').siblings().removeClass('cur');
    }
    if(sTop>=f13+200){
        floor.fadeOut(500);
    }
}

$(function(){
	$.ajax({
		type: "GET",
		url: "/front/ajaxSataLoginInfo.do?t="+new Date().getTime(),
		dataType:'jsonp',
		jsonp:'callback', 
		success: function(data) {
			if (data.msg == "notLogin") {
				$("#notLoginDIV").show();
				$("#loginDIV").hide();
	   		} else {
	   			$("#notLoginDIV").hide();
	   			$("#loginDIV").show();
	   			$("#enquiryCount").html(data.enquiryCount);
	   			$("#enquiryReplyCount").html(data.enquiryReplyCount);
	   			$("#offerPrice").html(data.offerPrice);
			}
		}
	});
	$("#prevDIV").removeAttr("style");
	$("#nextDIV").removeAttr("style");
});