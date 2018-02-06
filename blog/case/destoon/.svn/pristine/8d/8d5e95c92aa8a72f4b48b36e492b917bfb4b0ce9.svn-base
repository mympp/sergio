
	var tjcompanyall = false;
	var htmlDom ="";
	var topvalue=0;
    var liheight=24;
	var ulheight=0;//获得ul的总高度
	function gettjcompany(companyarr,totalnum){
		 var tjnum = $("#tjcompany li").length;
		 for(var i=0;i<companyarr.length;i++){
			htmlDom+="<li name='"+(tjnum+i+1)+"'>· <a href='"+companyarr[i]['url']+"'>"+companyarr[i]['company']+"</a></li>";
		}
		$("#tjcompany").append(htmlDom);
		htmlDom ="";
		ulheight=$("#tjcompany li").length*liheight;
		if(totalnum <= $("#tjcompany li").length) tjcompanyall=true;
	}
	function ws_tjcompany(){
		$("#tjcompany").animate({ top: topvalue},500,function(){topvalue-=liheight;});
		
		if(topvalue+ulheight<=100){
			if(!tjcompanyall){
				$.ajax({
					 type: "post",
					 url : ajaxurl("apollo","get_tuijian_company"),
					 data:{act:'get',num:$("#tjcompany li").length},
					 dataType: "json",
					 success: function(data){
						 if(data.ok==1){
							gettjcompany(data.company,data.totalnum);
						 }
						
					 }
				});
			}
		}
		if(topvalue+ulheight<=0){
			topvalue=100;$("#tjcompany").css("top",topvalue);
		}
	}
	
$(document).ready(function(){
	$(".tjqy_dw").click(function(){
	   if(!tjcompanyall){
			$.ajax({
				 type: "post",
				 url : ajaxurl("apollo","pagedata"),
				 data:{act:'tjgs_all',num:$("#tjcompany li").length},
				 dataType: "json",
				 success: function(data){
					 if(data.ok==1){
						gettjcompany(data.company,data.totalnum);
					 }
				 }
			});
		}
		if ($(".tjqy_dwtl").css("display") == "none") $(".tjqy_dwtl").show();
		else $(".tjqy_dwtl").hide();
	});
	$("#companysearch").click(function(){
		if($("#companyname").attr("value").length<1){
			 $("#searchrz").html("<li>请输入关键词！</li>");
		}
		$("#searchrz").show();return false;
	});

	$(".dw_inputcc").click(function(){
		$(".tjqy_dwtl").hide();
		$("#searchrz").hide();
	});
	$("#companyname").focus(function(){
		if($(this).attr("value") == "输入公司名称") $(this).attr("value","");
		$(this).css("color","#000000");
	});	
	ulheight = $("#tjcompany li").length*liheight;
	var company2=setInterval(ws_tjcompany,3000);
	$("#tjcompany").hover(function(){clearInterval(company2);},function(){company2=setInterval(ws_tjcompany,3000);});

});    
	
function getcompanydom(text){
	var html="";
	$("#tjcompany li").each(function(key,val){
		if($(this).text().indexOf(text)>-1)
			html+="<li name='"+$(this).attr('name')+"'>"+$(this).text()+"</li>";
	});
	if(html.length>0){
       $("#searchrz").html(html);
       $("#searchrz li").hover(function(){
        $(this).addClass("tjqy_dw_box_lia");},function(){$(this).removeClass("tjqy_dw_box_lia");});
    	 $("#searchrz li").click(function(){
			clickcompany($(this).attr("name"));	
			 $("#searchrz").hide();				 
		});
	}else  $("#searchrz").html("<li>抱歉，没有找到符合的查询结果。</li><li>建议你缩短或修改您的搜索词，重新搜索。</li>");
}
function clickcompany(num){
	
	topvalue=-(Number(num)-2)*liheight;
	$("#tjcompany").css("top",topvalue);
    $("#tjcompany li a").css("color","");
	$("#tjcompany li[name='"+num+"'] a").css("color","#F00");
}
function showcompany(){

	if($("#companyname").attr("value").length>1 && $("#companyname").attr("value")!="输入公司名称"){
		$("#searchrz").show();
		getcompanydom($("#companyname").attr("value"));
	}else{
		$("#searchrz").hide();
	}
}

