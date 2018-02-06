//头部搜索切换特效
$(function(){
	$(".searchbox ul li").click(function(){
		var val = $(this).attr('val');
		$(".border1 li").find("a").removeClass("style1");
		$(this).find("a").addClass("style1");
		$("#moduleid").val(val);
	});
});

//二级导航显示隐藏
$(function(){
	var i = $("#Zfl_category").attr('i');
	if(i==1){
		$("#Zfl_category").mousemove(function(){
			$(this).addClass('on');
			$('#allsort').css('display','block');
		});
		$("#Zfl_category").mouseleave(function(){
			$('#allsort').css('display','none');
			$(this).removeClass('on');
		});
	}
	$("#allsort .item").mousemove(function(){
		$("#Zfl_category").addClass('on');
		$(this).addClass('on');
	});
	$("#allsort .item").mouseleave(function(){
		$("#Zfl_category").removeClass('on');
		$(this).removeClass('on');
	});
});



//右侧banner图公告切换
$(function(){	
	$('.tabPanel ul li').click(function(){
		$(this).addClass('hit').siblings().removeClass('hit');
		$('.panes>div:eq('+$(this).index()+')').show().siblings().hide();	
	})
})
//供应链banner图下方推荐板块切换
$(function(){	
	$('.tabGyl li').mouseover(function(){
		$(this).addClass('hit').siblings().removeClass('hit');
		$('.gyls>div:eq('+$(this).index()+')').show().siblings().hide();	
	})
})
//供应链主体企业、下游企业板块切换
$(function(){	
	$('.tabZtqy li').click(function(){
		$(this).addClass('hit').siblings().removeClass('hit');
		$('.ztqys>div:eq('+$(this).index()+')').show().siblings().hide();	
	})
})

$(function(){	
	$('.tabXyqy li').click(function(){
		$(this).addClass('hit').siblings().removeClass('hit');
		$('.xyqys>div:eq('+$(this).index()+')').show().siblings().hide();	
	})
})

$(function(){	
	$('.tabZbgg li').click(function(){
		$(this).addClass('hit').siblings().removeClass('hit');
		$('.zbggs>div:eq('+$(this).index()+')').show().siblings().hide();	
	})
})


//首页优质路线推荐	
$(function(){	
	$(".list-info-sd").slide({ mainCell:".bd ul",effect:"leftLoop",vis:4,autoPlay:false}); 	 	 
})
//物流页优质路线推荐
$(function(){	
	$(".line_recommend").slide({ mainCell:".bd ul",effect:"leftLoop",vis:4,autoPlay:false});
})


//物流页实时数据
$(function(){
	$(".time_data").slide({ mainCell:".bd ul",effect:"topLoop",autoPlay:true,vis:5,trigger:"click"});
})


$(document).ready(function () {
		style = 'easeOutQuart';
		$('.xypl2_pic').hover(
			function() {
				$(this).children('div:last').stop(false,true).animate({bottom:0},{duration:200, easing: style});
			},
			function() {
				$(this).children('div:last').stop(false,true).animate({bottom:-226},{duration:200, easing: style});
			}
		);
});


//进行中的集采报名特效	
//$(function(){
//
//	$(".icon").toggle(function(){
//		$(this).parent().next().show();
//		$(this).removeClass("jia");
//		$(this).addClass("jian");
//	},function(){
//		$(this).parent().next().hide();
//		$(this).removeClass("jian");
//		$(this).addClass("jia");
//	});
//
//})
