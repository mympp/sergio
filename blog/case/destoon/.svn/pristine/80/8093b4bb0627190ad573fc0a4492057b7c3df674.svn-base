var index={
	init:function(){
		this.nav(".item-nav");
		this.banner(".banner-wrap");
        this.toolDate(".tool-fitness .blank");
        this.tabAuto(".layout-con .left");
        this.tab(".layout-con .right");
        this.clickAuto(".toolBox");
        this.fresh(".appBox");
        this.rankUl(".rank-ul");
        this.banner(".tb-tab",{
            bannerClass: ".tabwrap",
            inClass:     ".tabContent",
            inLi:        ".c"
        });
        this.tab(".baike-wrap");
        this.tab(".newest-con");
	},

    nav:function(o){
    	var o=$(o);
    	o.hover(function(){
    		fnClass($(this))
    	},function(){
    		fnClass(o)
    	})

    },
    banner:function(o,options){
        var defaults = {
                bannerClass:".banner-left",
                inClass:"ul",
                inLi:    "li",
                auto:    true, //自动滚
                isHover: true, //手动切
                time:    4000 //滚定时间
        }
        var opts = $.extend({},defaults,options);
        $(o).each(function(){
        	var o = $(this),timer = null,now1 = 0,now2 = 0;
        	var left = o.find(opts.bannerClass);
            var left_ul = left.find(opts.inClass);
        	var oli_l = left.find(opts.inLi).length;
            var right = o.find(".banner-right");
            var right_ul= right.find("ul");
        	var circle = o.find(".circle");
            var left_w = left.width();
            left_ul.width(left_w*oli_l)
        	circle.html(html('<i></i>',oli_l)).find("i:first").addClass("active");
        	right_ul.html(left_ul.html()).find("li:first").addClass("active");
            right_ul.find("li").append("<em></em>");

            //初始化
            function init(i){
                fnClass(right.find("li").eq(i));
                fnClass(circle.find("i").eq(i));
            };
            init(0);

            //手动切换
            function hoverAuto(){
                var index = $(this).index();
                now1 = now2 = index;
                init(index);
                bugImg();
                if (opts.isHover){
                    left_ul.stop(false,true).animate({"left":-index*left_w+'px'});
                }
            };

        	right.find("li").on("mouseenter",hoverAuto);
            circle.find("i").on("mouseenter",hoverAuto);

            //滚动切换
            if (opts.auto){
                timer=setInterval(auto,opts.time);
                o.hover(function(){
                    clearInterval(timer);
                },function(){
                    timer = setInterval(auto,opts.time)
                })
            }
            //滚动函数  
            function auto(){
                if (now1 >= oli_l-1){
                    now1 = 0;
                    left_ul.find(opts.inLi).eq(0).css({"position":"relative","left":left_w*oli_l});
                } else {
                    now1++;
                }
                now2++;
                left_ul.stop(false,true).animate({"left":-now2*left_w+'px'},function(){
                    if (now1 == 0){
                        left_ul.find(opts.inLi).eq(0).css({"position":"static","left":0});
                        left_ul.css("left",0);
                        now2 = 0;
                    }
                });
                init(now1);
                bugImg();
            }
        });
    },
    toolDate:function(o){
        $(o).each(function(){
            $(this).stop().hover(function(){
                $(this).stop(true,false).animate({'width':'79px'}).siblings('.blank').animate({'width':'13px'});
                $(this).html($(this).attr('title'))
            },function(){
                $(this).stop(true,false).animate({'width':'13px'});
                $(this).html("")
            });
        });
    },
    tabAuto:function(o){
        $(o).each(function(){
            var item=$(this).find(".item");
            var item_l=item.length;
            var item_w=$(this).width();
            var main=$(this).find(".autoBox-main");
            main.width(item_l*item_w)
            $(this).find(".nav-ul li").click(function(){
                fnClass($(this));
                bugImg();
                fnClass(item.eq($(this).index()),{className: "current"});
                main.animate({"margin-left":-$(this).index()*item_w+"px"})
            })
        })
    },
    tab:function(o){
        $(o).each(function(){
            var item = $(this).find(".tab-item");
            $(this).find(".con-nav li").click(function(){
                fnClass($(this));
                fnClass(item.eq($(this).index()),{className: "current"});
            })
        })
    },
    clickAuto:function(o){
        $(o).each(function(){
            var item = $(this).find("a");
            var item_w = item.outerWidth(true);
            var item_l = item.length;
            var btn_l = $(this).find(".prev");
            var btn_r = $(this).find(".next");
            var op= $(this).find("p");
            var i=0,nub=3;
            op.width(item_w*item_l);
            btn_l.click(function(){auto("prev")});
            btn_r.click(auto);

            function auto(dir){
                if (dir=="prev"){
                    i<=0?i=item_l-nub:i--;
                } else {
                    i>=item_l-nub?i=0:i++;
                }
                op.animate({"marginLeft":-i*item_w+"px"})
            };

        })
    },
    fresh:function(o){
        $(o).each(function(){
            var btn = $(this).find(".fresh");
            var oul=$(this).find("ul");
            var oli = oul.find("li");
            var nub = 4;
            var i=0;
            var page = Math.ceil(oli.length/nub);
            btn.click(function(){
                i>=page-1?i=0:i++;
                oli.hide();
                oul.find("li").slice(i*4,i*4+4).show();
            })
        })
    },
    rankUl:function(o){
        var o = $(o);
        o.each(function() {
            $(this).find('li').hover(function() {
                $(this).addClass('active').siblings().removeClass('active')
            });
            $(this).find('li').each(function() {
                var a = $(this).index();
                $(this).find('.nub').html(a + 1)
            })
        })
    }
}

//调用对象
$(function(){
	index.init();
})
