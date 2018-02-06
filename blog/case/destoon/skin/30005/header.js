// JavaScript Document

$(document).ready(function(){
 $(".fr_zxx dl dd").hover(function(){
	 $(this).attr("style","z-index:3");
	 $(this).find(".zx_pkv,.zx_pkvg").addClass("zx_onn");  
	 $(this).find(".nav_two_t").show();
	  },function(){
	 $(this).attr("style","z-index:0");
	 $(this).find(".zx_pkv,.zx_pkvg").removeClass("zx_onn");    
	 $(this).find(".nav_two_t").hide();
  });	 
  $(".wap_phone").hover(function(){
	$(this).attr("style","z-index:3");
	$(this).addClass("wap_phones");  
    $(this).find(".wet").show();
	  },function(){
	$(this).attr("style","z-index:0");
    $(this).removeClass("wap_phones");    
	$(this).find(".wet").hide();
   });	 
 $(".float_right ul li").hover(function(){
	 $(this).attr("style","z-index:3");
	 $(this).addClass("oop");
	$(this).find(".float_right_two").show();  
	},function(){
	 $(this).attr("style","z-index:0");
	 $(this).removeClass("oop");
	$(this).find(".float_right_two").hide();  
	});
  $(".back_to").click(function(){
	$('body,html').animate({scrollTop:0},1000);
	return false;
  });

  		
 });