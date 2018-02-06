// JavaScript Document

$(document).ready(function(){
	
	$("[placeholder]").each(function(){
		var placeholder = $(this).attr("placeholder");
		if(placeholder== null || placeholder=="") return;
		var v = $.trim($(this).val());
		//记录原先字体颜色
		var oclr = $(this).css("color");
		if(v== "")
		{
			this.value = placeholder;
			$(this).css("color","#ccc");
		}
		$(this).focus(function(){
			var placeholder = $(this).attr("placeholder");
			if($.trim($(this).val())== placeholder)
			{
				this.value="";
				$(this).css("color",oclr);
			}
		});
		$(this).blur(function(){
			var placeholder = $(this).attr("placeholder");
			if($.trim($(this).val())== "")
			{
				this.value=placeholder;
				$(this).css("color","#ccc");
			}
		});
		
	});
	//头部广告位关闭
   $(".xx_clse").click(function(){
	$(".ad_t").hide();   
	$("#keys1").width($("#keys1").width());
	});
	//头部搜索框选中状态 
   $(".sear_put_top a").each(function(i){
    $(this).click(function(){
	  $(this).addClass("vbn").siblings().removeClass("vbn"); 
	 $("#searchItem").val($(this).attr("type"));
    });
   });
   //买家卖家效果切换
   $(".majia_nav a").each(function(i){
    $(this).mouseover(function(){
	  $(this).addClass("okl").siblings().removeClass("okl"); 
	 $(".majia_nu_t dl").eq(i).show().siblings().hide();  
    });
   }); 
   //鼎付宝会员活动切换
   $(".count_nav a").each(function(i){
    $(this).mouseover(function(){
	  $(this).addClass("com_p").siblings().removeClass("com_p"); 
	 $(".count_dl dl").eq(i).show().siblings().hide();  
    });
   });
   //产品分类
   $(".ex_ma_left dl dd").hover(function(){
	 $(this).attr("style","z-index:10");
	 $(this).addClass("onn_lo");  
	 $(this).find(".ex_ma_dl").show();
	  },function(){
	 $(this).attr("style","z-index:0");
	 $(this).removeClass("onn_lo");    
	 $(this).find(".ex_ma_dl").hide();
	});	
   
   /*
	//红黑榜滚动
	var speed=80;
		var MyMar;
		var _i = document.getElementById('item');
		var _i_c = document.getElementById('item_cp');
		var _o = document.getElementById('liScroll');
		 function scrolltop(){ 
				_i_c.innerHTML=_i.innerHTML;
				function qMarquee(){
					if(_i.offsetHeight-_o.scrollTop<=0)
						_o.scrollTop=0;
					else{
						_o.scrollTop++;
					}
				}
				MyMar=setInterval(qMarquee,speed);
				_o.onmouseover=function(){clearInterval(MyMar);}    
				_o.onmouseout=function(){ MyMar=setInterval(qMarquee,speed); }    
							 
			}     	
		scrolltop();
			*/
	$('#marquee1').kxbdSuperMarquee({distance:350,time:5,navId:'#marNav1',direction:'left'});
	$('#marquee2').kxbdSuperMarquee({distance:350,time:3,navId:'#marNav2',direction:'left'});
	$('#marquee3').kxbdSuperMarquee({distance:350,time:4,navId:'#marNav3',direction:'left'});
	$('#marquee4').kxbdSuperMarquee({distance:350,time:5,navId:'#marNav4',direction:'left'});
	$('#marquee5').kxbdSuperMarquee({distance:350,time:4,navId:'#marNav5',direction:'left'});


       		
 });
function f_topnavsearch(form){
	var regex = /^\s+|\s+$/;
	var e = form.elements['keys'];
	e.value = e.value.replace(regex,'');
	if(e.value.length<1 || e.value.indexOf('输入')>=0 || e.value.indexOf('输入')>=0){		
		alert('请输入关键词');e.focus();return false;
	}
	setCookie("searchkey",e.value);
	return true;
}