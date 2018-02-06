// JavaScript Document

    function listBanner(eve){
		this.banner_box=eve;
        this.defaults = {
            width:$(window).width(),
            height:eve.attr("data-height")!=null&&eve.attr("data-height")!=""? eve.attr("data-height"):800,
            zindex:0,
			length:eve.find("li").length,
			set:null,
			bool:false
        }
	}
	
	listBanner.prototype={
		
		//开始
		init:function(){
			this.resize();
			this.addClass();
			this.leftRightBtn();
			this.cssStyle();
			this.clickBtn();
			this.set();
		},
		
		//浏览窗口拉大缩小事件
		resize:function(){
			var e=this;
			$(window).resize(function(){
				e.defaults.width=$(window).width();
				e.cssStyle();
			});	
		},
		
		//添加左右按钮
		leftRightBtn:function(){
			if(this.defaults.length>1)
			{
				var left_right_btn="<a href='javascript:void(0);' class='lr-btn leftbtn'></a><a href='javascript:void(0);' class='lr-btn rightbtn'></a><div class='button-area'>";
				for(var i=0;i<this.defaults.length;i++)
				{
					if(i==this.defaults.zindex)
					{
						left_right_btn+="<a class='cur'></a>";
					}else
					{
						left_right_btn+="<a></a>";
					}
				}
				left_right_btn+="</div>";
				
				this.banner_box.append(left_right_btn);
			}
		},
		
		//添加class
	   addClass:function(){
			this.banner_box.find("ul").addClass("banner-list");
		},
		
		//添加样式
		cssStyle:function(){
			this.banner_box.css({"height":this.defaults.height+"px"});
			this.banner_box.find("ul").css({"width":this.defaults.width*this.defaults.length,"height":this.defaults.height+"px"});
			for(var i=0;i<=this.defaults.length;i++)
			{
				this.banner_box.find("ul li").eq(i).css({"width":this.defaults.width,"height":this.defaults.height+"px"});
			}
		},
		
		//点击事件
		clickBtn:function(){
			var e=this;
			
			this.banner_box.find(".leftbtn").click(function(){
				if(e.banner_box.find("ul").is(":animated")){return false;}
				e.defaults.zindex--;
				if(e.defaults.zindex<0)
				{
					e.banner_box.find(".button-area a").eq(e.defaults.length-1).addClass("cur").siblings().removeClass("cur");
					e.banner_box.find("ul").prepend(e.banner_box.find("ul li:last"));
					e.banner_box.find("ul").css({"left":-e.defaults.width});
					e.banner_box.find("ul").stop(false,false).animate({"left":0},400,function(){
					e.banner_box.find("ul").css({"left":-(e.defaults.length-1)*e.defaults.width});
					e.banner_box.find("ul li:first").appendTo(e.banner_box.find("ul"));
					e.defaults.zindex=e.defaults.length-1;
					});
				}
				else
				{
					e.animate();
				}
			});
			this.banner_box.find(".rightbtn").click(function(){
				if(e.banner_box.find("ul").is(":animated")){return false;}
				e.defaults.zindex++;
				if(e.defaults.zindex>=e.defaults.length)
				{
					e.banner_box.find(".button-area a").eq(0).addClass("cur").siblings().removeClass("cur");
					e.banner_box.find("ul").css({"left":-e.defaults.width*(e.defaults.length-2)});
					e.banner_box.find("ul li:first").appendTo(e.banner_box.find("ul"));
					e.banner_box.find("ul").stop(false,false).animate({"left":-e.defaults.width*(e.defaults.length-1)},400,function(){
					e.banner_box.find("ul").css({"left":0});
					e.banner_box.find("ul").prepend(e.banner_box.find("ul li:last"));
					e.defaults.zindex=0;
					
					});
				}else
				{
					e.animate();
				}
			});
			this.banner_box.find(".button-area a").mouseenter(function(){
				e.defaults.zindex=$(this).index();
				e.animate();
			});
			
			this.banner_box.find("ul a,.lr-btn,.button-area a").hover(function(){
				clearTimeout(e.defaults.set);
			},function(){
				e.defaults.set=setTimeout(function(){e.set();},4000);
			});
		},
		
		//动画
		animate:function(){
			var index=this.defaults.zindex;
			this.banner_box.find(".button-area a").eq(this.defaults.zindex).addClass("cur").siblings().removeClass("cur");
			this.banner_box.find("ul").stop(false,false).animate({"left":-this.defaults.zindex*this.defaults.width},400);
			this.defaults.zindex=index;
		},
		
		
		//一直执行
		set:function(){
			var e=this;
			if(this.defaults.bool)
			{
				this.defaults.zindex++;
			}
			if(this.defaults.zindex>=this.defaults.length)
			{
				e.banner_box.find(".button-area a").eq(0).addClass("cur").siblings().removeClass("cur");
				e.banner_box.find("ul").css({"left":-e.defaults.width*(e.defaults.length-2)});
				e.banner_box.find("ul li:first").appendTo(e.banner_box.find("ul"));
				e.banner_box.find("ul").stop(false,false).animate({"left":-e.defaults.width*(e.defaults.length-1)},600,function(){
				e.banner_box.find("ul").css({"left":0});
				e.banner_box.find("ul").prepend(e.banner_box.find("ul li:last"));});
				e.defaults.zindex=0;
			}else
			{
				this.animate();
			}
			if(this.defaults.length>1){
				this.defaults.bool=true;
			}
			this.defaults.set=setTimeout(function(){e.set();},4000);
		},
		
		//停止时间
		stopSet:function(){
			this.banner_box.find(".button-area a").mouseenter(function(){
				
			});
		}
		
	}
	
	function Bannershow(banner){
		
		banner.each(function(index, element){
			var banner1=new listBanner($(this));
			banner1.init();
		});
	}
	
	

		
