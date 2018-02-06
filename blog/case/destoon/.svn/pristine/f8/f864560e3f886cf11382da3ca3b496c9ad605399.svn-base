(function($){
		var h = 120;
		var p1 = $("#lf1").position().top-h;
		var p2 = $("#lf2").position().top-h;
		var p3 = $("#lf3").position().top-h;
		var p4 = $("#lf4").position().top-h;
		var p5 = $("#lf5").position().top-h;
		var p6 = $("#lf6").position().top-h;
		var p7 = $("#lf7").position().top-h;
		var p8 = $("#lf8").position().top-h;		
		var p9 = $("#lf9").position().top-h;		
		var p10 = $("#lf10").position().top-h;
		var p11 = $("#lf11").position().top-h;
	$(window).scroll(function(){
		var s_w = window.screen.width;
		var s_h = window.screen.height;
			var s_top = parseInt($(window).scrollTop()+4);
				if(s_w >=1280 && s_h >= 450&&s_top>p1){
					$(".right-nav").fadeIn(300);
					if(s_top>p1&&s_top<=p2){
						$(".right-nav li").removeClass("cur");
						$("#rf1").addClass("cur");	
					}
					if(s_top>p2&&s_top<=p3){
						$(".right-nav li").removeClass("cur");
						$("#rf2").addClass("cur");	
					}
					if(s_top>p3&&s_top<=p4){
						$(".right-nav li").removeClass("cur");
						$("#rf3").addClass("cur");
					}	
					if(s_top>p4&&s_top<=p5){
						$(".right-nav li").removeClass("cur");
						$("#rf4").addClass("cur");
					}
					if(s_top>p5&&s_top<=p6){
						$(".right-nav li").removeClass("cur");
						$("#rf5").addClass("cur");
					}
					if(s_top>p6&&s_top<=p7){
						$(".right-nav li").removeClass("cur");
						$("#rf6").addClass("cur");
					}
					if(s_top>p7&&s_top<=p8){
						$(".right-nav li").removeClass("cur");
						$("#rf7").addClass("cur");
					}
					if(s_top>p8&&s_top<=p9){
						$(".right-nav li").removeClass("cur");
						$("#rf8").addClass("cur");
					}
					if(s_top>p9&&s_top<=p10){
						$(".right-nav li").removeClass("cur");
						$("#rf9").addClass("cur");
					}
					if(s_top>p10&&s_top<=p11){
						$(".right-nav li").removeClass("cur");
						$("#rf10").addClass("cur");
					}
					if(s_top>p11){
						$(".right-nav li").removeClass("cur");
						$("#rf11").addClass("cur");
					}				
				}else{
					$(".right-nav").fadeOut(200);	
				}
			})
			
		$(function(){
			$("#close").click(function(){
				$(".right-nav").remove();	
			})	
		})
		
		$(function(){
		$("#goback").click(function(){
		$("html, body").animate({scrollTop:0},100);
		});
		$('.right-nav li a[href*=#]').click(function() {
        if (location.pathname.replace(/^\//, '') == this.pathname.replace(/^\//, '') && location.hostname == this.hostname) {
            var $target = $(this.hash);
            $target = $target.length && $target || $('[name=' + this.hash.slice(1) + ']');
            if ($target.length) {
                var targetOffset = $target.offset().top;
                $('html,body').animate({
                    scrollTop: targetOffset-36
                },
                400);
                return false;
            }
        }
    });
		
		})
		
	})(jQuery)