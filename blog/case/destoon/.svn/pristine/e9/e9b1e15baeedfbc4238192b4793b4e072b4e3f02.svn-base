(function($){ 
	$.fn.domainleftright = function(options){ //左右移动
		var defaults = {
				time:"111",//不自动滚
				intervaltime:2000,
				classlefton:"slide-prev",
				classleftoff:"slide-prev",
				classrighton:"slide-next",
				classrightoff:"slide-next",
				classlion:"vip_banner_tab_li",
				classlioff:"vip_banner_tab_li2",
				leftid:"#banner_leftid",
				rightid:"#banner_rightid",
				indexul:"#bannerindex",
				hover:true,
				trigger:"click",//click,mouseover
				backscroll:true,//来回滚动
				duration:800
		}
		var options = $.extend(defaults, options);
		this.each(function(){ 
			var left;
			var thisDom=$(this);
			var scrollright = true;
			function tjcompany(){
				if(options.backscroll){
					if(scrollright){
						//$(options.rightid).click();
						goright(1,options.duration);
						var txt = $(options.indexul).find("li:[class='"+options.classlion+"']").attr("txt");
						if(txt == $(options.indexul).find("li").length-1) scrollright = false;
					}else{
						//$(options.leftid).click();
						goleft(1,options.duration)
						var txt = $(options.indexul).find("li:[class='"+options.classlion+"']").attr("txt");
						if(txt == 1) scrollright = true;
					}
				}else{
					goright(1,options.duration);
				}
			}
			function setindexul(index){
				$(options.indexul).find("li").removeClass(options.classlion).addClass(options.classlioff);
				$(options.indexul).find("li").eq(index-1).removeClass(options.classlioff).addClass(options.classlion);
			}
			if(options.time=="one"){
				//tjcompany();
			}else{
				var company=setInterval(tjcompany,options.intervaltime);
				thisDom.hover(function(){
					clearInterval(company);},function(){company=setInterval(tjcompany,options.intervaltime);});
				$(options.leftid).hover(function(){
					clearInterval(company);},function(){});
				$(options.rightid).hover(function(){
					clearInterval(company);},function(){});
			}
			
			$(options.rightid).click(function(){							 
				goright(1,300);
				return false;									 
			});
			$(options.leftid).click(function(){
				goleft(1,300);
				return false;										 
			})
			if(options.hover){//if---start---
				$(options.leftid).hover(function(){$(this).removeClass(options.classleftoff).addClass(options.classlefton);},
										function(){$(this).removeClass(options.classlefton).addClass(options.classleftoff);
										});	
				$(options.rightid).hover(function(){$(this).removeClass(options.classrightoff).addClass(options.classrighton);},
										function(){$(this).removeClass(options.classrighton).addClass(options.classrightoff);
										});
			}//if----end----
			thisDom.hover(function(){$(options.rightid).show();$(options.leftid).show();},function(){
					$(options.rightid).hide();$(options.leftid).hide();	
			});	
			$(options.leftid).mouseover(function(){$(options.leftid).show();$(options.rightid).show();});
			$(options.rightid).mouseover(function(){$(options.leftid).show();$(options.rightid).show();});		
			function goright(linum,duration){
				left = -linum*(thisDom.find("li").eq(0).outerWidth(true)) + 'px';
				thisDom.find("ul").animate({left:left}, {
					duration:duration,
					complete:function(){
						for(var i=1;i<=linum;i++){
							thisDom.find("ul").append(thisDom.find("li").eq(0));
						}
						thisDom.find("ul").css("left","0");
						setindexul(thisDom.find("li:first").attr("txt"));
					}
				});	
			}
			function goleft(linum,duration){
				left = -linum*(thisDom.find("li:last").eq(0).outerWidth(true)) + 'px';
				for(var i=1;i<=linum;i++){
					thisDom.find("li:last").insertBefore(thisDom.find("li:first"));
				}
				thisDom.find("ul").css("left",left);
				setindexul(thisDom.find("li:first").attr("txt"));
				thisDom.find("ul").animate({left:0}, {
					duration:duration,
					complete:function(){}
				});	
			}
			if(options.trigger == "click"){
				$(options.indexul).find("li").click(function(){
					var thistxt = $(this).attr("txt");
					var ontxt = $(options.indexul).find("li:[class='"+options.classlion+"']").attr("txt");
					if(Math.abs(thistxt - ontxt) == 1){
						if(thistxt > ontxt) goright(1,300);else goleft(1,300);
					}else if(Math.abs(thistxt - ontxt) == 2){
						if(thistxt > ontxt) goright(2,300);else goleft(2,300);
					}else if(Math.abs(thistxt - ontxt) == 3){
						if(thistxt > ontxt) goright(3,300);else goleft(3,300);
					}
				});	
				$(options.indexul).find("li").mouseover(function(){clearInterval(company);});
			}else if(options.trigger == "mouseover"){
				$(options.indexul).find("li").mouseover(function(){
					var thistxt = $(this).attr("txt");
					var ontxt = $(options.indexul).find("li:[class='"+options.classlion+"']").attr("txt");
					if(Math.abs(thistxt - ontxt) == 1){
						if(thistxt > ontxt) goright(1,300);else goleft(1,300);
					}else if(Math.abs(thistxt - ontxt) == 2){
						if(thistxt > ontxt) goright(2,300);else goleft(2,300);
					}else if(Math.abs(thistxt - ontxt) == 3){
						if(thistxt > ontxt) goright(3,300);else goleft(3,300);
					}
					clearInterval(company);
				});	
			}
		}); 	 
	}; 
	$.fn.domainChange = function(options){ //渐变，显示/隐藏
		var defaults = {
				time:"33",//不自动滚
				intervaltime:1000,
				classlefton:"slide-prev",
				classleftoff:"slide-prev",
				classrighton:"slide-next",
				classrightoff:"slide-next",
				classlion:"vip_banner_tab_li",
				classlioff:"vip_banner_tab_li2",
				leftid:"#banner_leftid",
				rightid:"#banner_rightid",
				indexul:"#bannerindex",
				hover:false,
				trigger:"mouseover",//click,mouseover
				effect:"show",//show,fadeIn
				backscroll:false,//true 来回滚动
				duration:800
		}
		var options = $.extend(defaults, options);
		this.each(function(){ 
			var left;
			var thisDom=$(this);
			var scrollright = true;
			function tjcompany(){
				var ontxt = Number($(options.indexul).find("li:[class='"+options.classlion+"']").attr("txt"));
				if(options.backscroll){
					if(scrollright){
						if(ontxt == $(options.indexul).find("li").length){
							ontxt = ontxt-1; scrollright = false;
						}else ontxt += 1;
					}else{
						if(ontxt == 1){
							ontxt += 1;
							scrollright = true;
						}else ontxt -= 1;
					}
				}else{
					if(ontxt == $(options.indexul).find("li").length)ontxt = 1;
					else ontxt += 1;
				}
				show(ontxt);
			}
			function setindexul(index){
				$(options.indexul).find("li").removeClass(options.classlion).addClass(options.classlioff);
				$(options.indexul).find("li").eq(index-1).removeClass(options.classlioff).addClass(options.classlion);
			}
			function show(txt){
				thisDom.find("li").hide();
				if(options.effect == "show") thisDom.find("li:[txt='"+txt+"']").show();
				else if(options.effect == "fadeIn")thisDom.find("li:[txt='"+txt+"']").fadeIn(options.duration);
				setindexul(txt);
			}
			if(options.time=="one"){
				//tjcompany();
			}else{
				var company=setInterval(tjcompany,options.intervaltime);
				thisDom.hover(function(){
					clearInterval(company);},function(){company=setInterval(tjcompany,options.intervaltime);});
				$(options.leftid).hover(function(){
					clearInterval(company);},function(){});
				$(options.rightid).hover(function(){
					clearInterval(company);},function(){});
			}
			
			$(options.rightid).click(function(){							 
				var ontxt = Number($(options.indexul).find("li:[class='"+options.classlion+"']").attr("txt"));
				if(ontxt == $(options.indexul).find("li").length)ontxt = 1;
				else ontxt += 1;
				show(ontxt);
				return false;									 
			});
			$(options.leftid).click(function(){
				var ontxt = Number($(options.indexul).find("li:[class='"+options.classlion+"']").attr("txt"));
				if(ontxt == 1)ontxt = $(options.indexul).find("li").length;
				else ontxt -= 1;
				show(ontxt);
				return false;										 
			})
			if(options.hover){//if---start---
				$(options.leftid).hover(function(){$(this).removeClass(options.classleftoff).addClass(options.classlefton);},
										function(){$(this).removeClass(options.classlefton).addClass(options.classleftoff);
										});	
				$(options.rightid).hover(function(){$(this).removeClass(options.classrightoff).addClass(options.classrighton);},
										function(){$(this).removeClass(options.classrighton).addClass(options.classrightoff);
										});
			}//if----end----
			thisDom.hover(function(){$(options.rightid).show();$(options.leftid).show();},function(){
					$(options.rightid).hide();$(options.leftid).hide();
			});	
			$(options.leftid).mouseover(function(){$(options.leftid).show();$(options.rightid).show();});
			$(options.rightid).mouseover(function(){$(options.leftid).show();$(options.rightid).show();});	
			if(options.trigger == "click"){
				$(options.indexul).find("li").click(function(){
					show(Number($(this).attr("txt")));
					setindexul($(this).attr("txt"));
				});	
				$(options.indexul).find("li").mouseover(function(){clearInterval(company);});
			}else if(options.trigger == "mouseover"){
				$(options.indexul).find("li").mouseover(function(){
					show(Number($(this).attr("txt")));
					setindexul($(this).attr("txt"));
					clearInterval(company);
				});	
			}
		}); 	 
	}; 
	$.fn.domainUpDown = function(options){ //上下滚动
		var defaults = {
				time:"111",//不自动滚
				intervaltime:2000,
				classlefton:"slide-prev",
				classleftoff:"slide-prev",
				classrighton:"slide-next",
				classrightoff:"slide-next",
				classlion:"vip_banner_tab_li",
				classlioff:"vip_banner_tab_li2",
				leftid:"#banner_leftid",
				rightid:"#banner_rightid",
				indexul:"#bannerindex",
				hover:true,
				trigger:"click",//click,mouseover
				backscroll:false,//来回滚动
				duration:800
		}
		var options = $.extend(defaults, options);
		this.each(function(){ 
			var left;
			var thisDom=$(this);
			var scrollright = true;
			function tjcompany(){
				if(options.backscroll){
					if(scrollright){
						//$(options.rightid).click();
						goup(1,options.duration);
						var txt = $(options.indexul).find("li:[class='"+options.classlion+"']").attr("txt");
						if(txt == $(options.indexul).find("li").length-1) scrollright = false;
					}else{
						//$(options.leftid).click();
						godown(1,options.duration)
						var txt = $(options.indexul).find("li:[class='"+options.classlion+"']").attr("txt");
						if(txt == 1) scrollright = true;
					}
				}else{
					goup(1,options.duration);
				}
			}
			function setindexul(index){
				$(options.indexul).find("li").removeClass(options.classlion).addClass(options.classlioff);
				$(options.indexul).find("li").eq(index-1).removeClass(options.classlioff).addClass(options.classlion);
			}
			if(options.time=="one"){
				//tjcompany();
			}else{
				var company=setInterval(tjcompany,options.intervaltime);
				thisDom.hover(function(){
					clearInterval(company);},function(){company=setInterval(tjcompany,options.intervaltime);});
				$(options.leftid).hover(function(){
					clearInterval(company);},function(){});
				$(options.rightid).hover(function(){
					clearInterval(company);},function(){});
			}
			
			if(options.hover){//if---start---
				$(options.leftid).hover(function(){$(this).removeClass(options.classleftoff).addClass(options.classlefton);},
										function(){$(this).removeClass(options.classlefton).addClass(options.classleftoff);
										});	
				$(options.rightid).hover(function(){$(this).removeClass(options.classrightoff).addClass(options.classrighton);},
										function(){$(this).removeClass(options.classrighton).addClass(options.classrightoff);
										});
			}//if----end----
				
			function goup(linum,duration){
				//alert(-linum*(thisDom.find("li").eq(0).outerHeight(true))+ 'px');
				try{
				var top1 = -linum*(thisDom.find("li").eq(0).outerHeight(true)) + 'px';
				thisDom.find("ul").animate({top:top1}, {
					duration:duration,
					complete:function(){
						for(var i=1;i<=linum;i++){
							thisDom.find("ul").append(thisDom.find("li").eq(0));
						}
						thisDom.find("ul").css("top","0px");
						setindexul(thisDom.find("li:first").attr("txt"));
					}
				});	
				}catch(e){alert(e.description);}
			}
			function godown(linum,duration){
				top1 = -linum*(thisDom.find("li:last").eq(0).outerHeight(true)) + 'px';
				for(var i=1;i<=linum;i++){
					thisDom.find("li:last").insertBefore(thisDom.find("li:first"));
				}
				thisDom.find("ul").css("top",top1);
				setindexul(thisDom.find("li:first").attr("txt"));
				thisDom.find("ul").animate({top:0}, {
					duration:duration,
					complete:function(){}
				});	
			}
			if(options.trigger == "click"){
				$(options.indexul).find("li").click(function(){
					var thistxt = $(this).attr("txt");
					var ontxt = $(options.indexul).find("li:[class='"+options.classlion+"']").attr("txt");
					if(Math.abs(thistxt - ontxt) == 1){
						if(thistxt > ontxt) goup(1,300);else godown(1,300);
					}else if(Math.abs(thistxt - ontxt) == 2){
						if(thistxt > ontxt) goup(2,300);else godown(2,300);
					}else if(Math.abs(thistxt - ontxt) == 3){
						if(thistxt > ontxt) goup(3,300);else godown(3,300);
					}
				});	
				$(options.indexul).find("li").mouseover(function(){clearInterval(company);});
			}else if(options.trigger == "mouseover"){
				$(options.indexul).find("li").mouseover(function(){
					var thistxt = $(this).attr("txt");
					var ontxt = $(options.indexul).find("li:[class='"+options.classlion+"']").attr("txt");
					if(Math.abs(thistxt - ontxt) == 1){
						if(thistxt > ontxt) goup(1,300);else godown(1,300);
					}else if(Math.abs(thistxt - ontxt) == 2){
						if(thistxt > ontxt) goup(2,300);else godown(2,300);
					}else if(Math.abs(thistxt - ontxt) == 3){
						if(thistxt > ontxt) goup(3,300);else godown(3,300);
					}
					clearInterval(company);
				});	
			}
		}); 	 
	};
})(jQuery);