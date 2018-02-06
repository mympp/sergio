

//分类列表
$(function(){
	$(".nav_sort").hover(function(){
		$(this).find(".sort_hidden").delay(200).slideDown(200);
	},function(){
		$(this).find(".sort_hidden").stop(true,true).slideUp(200);
	});
    $(".all_sort>ul>li").hover(function(){
		$(this).addClass("on");
		$(this).find(".sort_lm1").append("<i>&nbsp</i>");
		if($(this).find(".sort_lm1").height()>$(this).find(".sort_lmr").height()){
			var pad_t=parseFloat($(this).find(".sort_lmr").css("padding-top"));
			var pad_b=parseFloat($(this).find(".sort_lmr").css("padding-bottom"));
			$(this).find(".sort_lm1 i").height($(this).find(".sort_lmr").height()+pad_t+pad_b);
			};
		$(this).find(".sort_lmr").show();
		},function(){
			$(this).removeClass("on");
			$(this).find(".sort_lm1 i").remove();
			$(this).find(".sort_lmr").hide();
		});

	$(".tab_list li").each(function() {
        if($(this).find("a").length!=0){
			$(this).find("a").css({"display":"block"})
		}else{
			$(this).css({"cursor":"pointer"})
		}
    });
	$(".tab_con").each(function(){
		$(this).children("div").first().show();
	});
	$(".tab_list li").mouseover(function(){
		if($(this).parents(".tab_list").is(".tab_click")){
			$(this).click(function(){
				$(this).addClass("on").siblings().removeClass("on");
				$(this).parent().parent(".tab_list").siblings(".tab_con").children("div").eq($(this).index()).show().siblings().hide();
			});
		}else{
			$(this).addClass("on").siblings().removeClass("on");
			$(this).parent().parent(".tab_list").siblings(".tab_con").children("div").eq($(this).index()).show().siblings().hide();
		}
	});

	var picTimer;
	var widli;
	$(".rec_con ul").each(function(){
	    var len=$(this).children("li").length;
	    var wid=$(this).outerWidth();
		$(this).parent(".rec_con").before("<a href='javascript:void(0)' class='rec_prev'><</a>")
		$(this).parent(".rec_con").after("<a href='javascript:void(0)' class='rec_next'>></a>")
		$(this).width(wid*len);
		$(this).css("left",-$(this).find("li").outerWidth())
		$(this).prepend("<li>"+$(this).find("li").last().html()+"</li>");
		$(this).append("<li>"+$(this).find("li").eq(1).html()+"</li>");	
	});

	 $(".tooltip li").hover(function(){
		$(this).addClass("on");
		$(this).find(".tool_nav em").delay(200).animate({"right":"36px","opacity":"1"},200);
		$(this).find(".tool_div").show();
		},function(){
			$(this).removeClass("on");
		    $(this).find(".tool_nav em").stop(true,true).animate({"right":"0px","opacity":"0"},200);
			$(this).find(".tool_div").hide();
			});
	$(".tooltip .back_top").click(function(){
		$("html,body").animate({scrollTop:"0px"},300)
	});
});


