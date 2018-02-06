var menu_h = {};
var menu_hide  = 0;

$(document).ready(function(e) {
	//$("img").lazyload();

	$("#tsearch_type").hover(function(){
		$(this).find(".top_nav_s1in").show();
	},
	function(){
		$(this).find(".top_nav_s1in").hide();
	});
	$("#tsearch_type").find("li").hover(function(){
		$(this).addClass("top_nav_s1inlia");
	},
	function(){
		$(this).removeClass("top_nav_s1inlia");
	});
	$("#tsearch_type").find("li").click(function(){
		$("#tsearch_type div[name]").text($(this).text());
		$("#tsearch_type").find(".top_nav_s1in").hide();
		var txt = $(this).attr("txt");
		$("#s_search li").eq(txt-1).click();
		if($(this).text()!="产品"){
			$("#tsearch_div").hide();
			$("#tsearch_div").attr("id","notsearch_div");
		}
		else{
			$("#notsearch_div").attr("id","tsearch_div");
		}
	});
	
	$("#tsearch_input").focus(function(){
		if($(this).attr("value") == "请输入搜索关键词")$(this).attr("value","");
		$(this).css("color","#000000");
	});
	$("#tsearch_input").click(function(){
		if($(this).attr("value") == "请输入搜索关键词")$(this).attr("value","");
		$(this).css("color","#000000");
	});
	$("#tsearch_input").blur(function(){
		if(!$(this).attr("value")){
			$(this).attr("value","请输入搜索关键词");
			$(this).css("color","#666666");
		}
	});
	$("#tsearch_input").keydown(function(e){
		if(e.keyCode == 13){
			$("#tsearch_submit").click();
		}
	});
	$("#tsearch_submit").click(function(){
		$("#product_name").val($("#tsearch_input").val());
		$("#formsearch").find("input[type=submit]").click();
	});
	//-----以上topsearch

	function menu_heigh(){
		menu_h = {};
		$(".main_lb_box:visible").each(function(){
			menu_h[$(this).offset().top] = $(this).attr('t');
		});
		menu_hide = $(".main_newstl").offset().top-150;
	}
	function menu_adjust(){
		var block_arr = Array();
		$("#block_show").find("[class=main_sz_box_lia]").each(function(){
			block_arr.push($(this).attr('t'));
		})
		var block_hide = 0;
		if($("#block_hide").attr("class")=="main_sz_box_yctl1a") block_hide = 1;
		if(block_hide){
			$(".main_lb_more").show();
		}
		else{
			$(".main_lb_more").hide();
		}
		for(var i=15;i>0;i--){
			if($.inArray(i.toString(),block_arr)!=-1){
				$("#hyzd li[t="+i.toString()+"]").fadeIn();
				$("#hyzd li[t="+i.toString()+"]").insertBefore($("#hyzd li[t]").eq(0));
			}
			else{
				if(block_hide){
					$("#hyzd li[t="+i.toString()+"]").fadeOut();
				}
				else{
					$("#hyzd li[t="+i.toString()+"]").fadeIn();
				}
			}
		}
		menu_heigh();
	}
	var isroll = false;
	

	
	$(window).scroll(function(){
		if(isroll) return;
		var scrollTop =$(document).scrollTop();
		if(scrollTop<1700){
			if($(".top_nav").css('display')!=='none'){
				$(".top_nav").fadeOut();
			}
			if($("#hyzd").css('display')!=='none'){
				$("#hyzd").fadeOut();
			}
		}
		else{
			if($(".top_nav").css('display')==='none'){
				$(".top_nav").fadeIn();	
			}
			if(scrollTop<menu_hide && $("#hyzd").css('display')==='none'){
				$("#hyzd").fadeIn();
			}
			else if(scrollTop>menu_hide && $("#hyzd").css('display')!=='none'){
				$("#hyzd").fadeOut();
			}
		}
		for(var i in menu_h){
			if(scrollTop<i-150){
				var t = menu_h[i];
				$("#hyzd").find("li").removeClass("main_menuin_liover");
				$("#hyzd").find("li[t="+t+"]").addClass("main_menuin_liover");
				break;
			}
		}
	});
	$('#hyzd li[t]').click(function(e){
		e.preventDefault();
		var ind = $(this).attr('t');
		$("#hyzd").find("li").removeClass("main_menuin_liover");
		$(this).addClass("main_menuin_liover");
		var topVal = $('.main_lb_box[t='+ind+']').offset().top-250;
		isroll = true;
		$('body,html').animate({scrollTop:topVal},{duration:500,complete:function(){isroll=false;}});
		return false;
	})	
	$(".main_lb_more").click(function(){
		$("#block_hide").attr("class","main_sz_box_yctl1");
		$(".main_lb_box[t]").fadeIn();
		menu_adjust();
	})
	$("#gototop").click(function(){
		$('body,html').animate({scrollTop:0},500);
	})
	
	//	-----以上导航部分
	
	$(".phone_goepe").hover(function(){
		$(".nindex_ewm").show();
	},function(){
		$(".nindex_ewm").hide();
	})
	$("#s_search li").click(function(){
		$("#s_search li").each(function(){
			$(this).removeClass("searchtla");
		});
		$(this).addClass("searchtla");
		var tp_v=$(this).text();
		if(tp_v=="供应商")tp_v="公司";
		$("#formsearch").find("input[name=kind]").val(tp_v);
		if($(this).attr('txt')=="searchtl_ebook"){
			$("#formsearch").attr('action','http://www.goepe.com/ebook/list.php');
			$("#product_name").attr('name','textfield2');
		}else{
			$("#formsearch").attr('action','http://www.goepe.com/search/search.php');
			$("#product_name").attr('name','keyword');
		}
		if($("#product_name").attr("value")==""&&$(this).text()=="产品"){
			$("#product_name").attr("value","请输入您要搜索的产品关键词");
			$("#product_name").css("color","#666666");
		}else if($("#product_name").attr("value") == "请输入您要搜索的产品关键词"){
			$("#product_name").attr("value","");
			$("#product_name").css("color","#000000");
		}
		if($(this).text()!="产品"){
			$("#searchdiv").hide();
			$("#searchdiv").attr("id","nosearchdiv");
		}
		else{
			$("#nosearchdiv").attr("id","searchdiv");
		}
	});
	$("#product_name").focus(function(){
		if($(this).attr("value") == "请输入您要搜索的产品关键词")$(this).attr("value","");
		$(this).css("color","#000000");
	});
	$("#product_name").click(function(){
		if($(this).attr("value") == "请输入您要搜索的产品关键词")$(this).attr("value","");
		$(this).css("color","#000000");
	});
	$("#product_name").blur(function(){
		if(!$(this).attr("value")&&$("#s_search .searchtl_on").text()=="产品"){
			$(this).attr("value","请输入您要搜索的产品关键词");
			$(this).css("color","#666666");
		}
	});
	$("#formsearch").blur(function(){
		$("#searchdiv").hide();
		$("#tsearch_div").hide();
	});
	$("body").click(function(){
		$("#searchdiv").hide();
		$("#tsearch_div").hide();
	});	
	//-----------以上seach部分
	$(".top_hyh").click(function(){
		_g_.ajax("apollo.pagedata",
				{act:"index_cyd"},
				function(data){
					if(data['ok']=='1'){
						var sortinfo = "";
						var hotinfo = '<strong style="color:#000;">热门产地：</strong>';
						var mapinfo = "";
						for(var i in data['sortinfo']){
							sortinfo += '<li><a href="http://cyd.goepe.com/search_prod.php?sortid='+data['sortinfo'][i]['sortid']+'">'+data['sortinfo'][i]['sortname']+'</a></li>';
						}
						for(var i in data['hotinfo']){
							hotinfo += '<a href="http://'+data['hotinfo'][i]['siteid']+'.goepe.com">'+data['hotinfo'][i]['hot_title']+'</a>|';
						}
						hotinfo +='<a href="http://cyd.goepe.com">更多&gt;</a>';
						var v = data['mapinfo'];
						mapinfo =  '<tbody><tr> <td width="235" rowspan="2"> <div class="cyd_box1"> <a href="http://'+v[0]['siteid']+'.goepe.com"><img src="http://style.goepe.com/css/1603/25subcyd/images/d1_'+v[0]['siteid']+'.jpg"></a> <div class="cyd_box1bg"></div> <div class="cyd_box1_n1"><a href="http://'+v[0]['siteid']+'.goepe.com">'+v[0]['name']+'</a></div> <div class="cyd_box1_n2"><a href="http://'+v[0]['siteid']+'.goepe.com">'+v[0]['cyd_title']+'</a></div> </div> </td> <td width="220" height="120" valign="top"><div class="cyd_box2"> <a href="http://'+v[1]['siteid']+'.goepe.com"><img src="http://style.goepe.com/css/1603/25subcyd/images/d3_'+v[1]['siteid']+'.jpg"></a> <div class="cyd_box1bg"></div> <div class="cyd_box1_n1"><a href="http://'+v[1]['siteid']+'.goepe.com">'+v[1]['name']+'</a></div> <div class="cyd_box1_n2"><a href="http://'+v[1]['siteid']+'.goepe.com">'+v[1]['cyd_title']+'</a></div> </div></td> <td rowspan="2"><div class="top_cyd_line"></div></td> <td width="235" rowspan="2"><div class="cyd_box1"> <a href="http://'+v[2]['siteid']+'.goepe.com"><img src="http://style.goepe.com/css/1603/25subcyd/images/d1_'+v[2]['siteid']+'.jpg"></a> <div class="cyd_box1bg"></div> <div class="cyd_box1_n1"><a href="http://'+v[2]['siteid']+'.goepe.com">'+v[2]['name']+'</a></div> <div class="cyd_box1_n2"><a href="http://'+v[2]['siteid']+'.goepe.com">'+v[2]['cyd_title']+'</a></div> </div></td> <td width="220" valign="top"><div class="cyd_box2"> <a href="http://'+v[3]['siteid']+'.goepe.com"><img src="http://style.goepe.com/css/1603/25subcyd/images/d1_'+v[3]['siteid']+'.jpg"></a> <div class="cyd_box1bg"></div> <div class="cyd_box1_n1"><a href="http://'+v[3]['siteid']+'.goepe.com">'+v[3]['name']+'</a></div> <div class="cyd_box1_n2"><a href="http://'+v[3]['siteid']+'.goepe.com">'+v[3]['cyd_title']+'</a></div> </div></td> </tr> <tr> <td valign="bottom"><div class="cyd_box2"> <a href="http://'+v[4]['siteid']+'.goepe.com"><img src="http://style.goepe.com/css/1603/25subcyd/images/d2_'+v[4]['siteid']+'.jpg"></a> <div class="cyd_box1bg"></div> <div class="cyd_box1_n1"><a href="http://'+v[4]['siteid']+'.goepe.com">'+v[4]['name']+'</a></div> <div class="cyd_box1_n2"><a href="http://'+v[4]['siteid']+'.goepe.com">'+v[4]['cyd_title']+'</a></div> </div></td> <td valign="bottom"><div class="cyd_box2"> <a href="http://'+v[5]['siteid']+'.goepe.com"><img src="http://style.goepe.com/css/1603/25subcyd/images/d3_'+v[5]['siteid']+'.jpg"></a> <div class="cyd_box1bg"></div> <div class="cyd_box1_n1"><a href="http://'+v[5]['siteid']+'.goepe.com">'+v[5]['name']+'</a></div> <div class="cyd_box1_n2"><a href="http://'+v[5]['siteid']+'.goepe.com">'+v[5]['cyd_title']+'</a></div> </div></td> </tr></tbody>';
						
						$("#cyd_sort").html(sortinfo);
						$("#cyd_map").html(mapinfo);
						$("#cyd_hot").html(hotinfo);
					}
				}
				);
	})
	//-----------以上产业带部分
	$(".tjcp").find("li").hover(function(){
		$(this).addClass("tjcp_lia");
	},
	function(){
		$(this).removeClass("tjcp_lia");
	});
	//===================以上推荐产品================


//感兴趣模块

	if(block_hide!='0'){
		$("#block_hide").attr("class","main_sz_box_yctl1a");
	}
	var block_arr = block_show.split(",");
	for(var i = 0; i < block_arr.length; i++) {
		if(block_arr[i]) $("#block_show").find("[t="+block_arr[i]+"]").attr("class","main_sz_box_lia");
	}
	$("#block_hide").click(function(){
		$class = $(this).attr("class");
		if($class=="main_sz_box_yctl1"){
			$(this).attr("class","main_sz_box_yctl1a");
		}
		else{
			$(this).attr("class","main_sz_box_yctl1");
		}
	})
	$("#block_show li").click(function(){
		$class = $(this).attr("class");
		if($class=="main_sz_box_lia"){
			$(this).attr("class","main_sz_box_li");
		}
		else{
			$(this).attr("class","main_sz_box_lia");
		}
	})
	$("#ganxingqu").hover(function(){
		$(".main_sz_box").show();
	},
	function(){
		$(".main_sz_box").show();
	})
	$(".main_sz_box").mouseover(function(){
		$(".main_sz_box").show();
	})
	$(".main_sz_box").mouseout(function(){
		$(".main_sz_box").hide();
	})
	$(".main_sz_box_ipt1").click(function(){
		$(".main_sz_box").hide();
	})
	$(".main_sz_box_ipt2").click(function(){
		var block_arr = Array();
		$("#block_show").find("[class=main_sz_box_lia]").each(function(){
			block_arr.push($(this).attr('t'));
		})
		var block_hide = 0;
		if($("#block_hide").attr("class")=="main_sz_box_yctl1a") block_hide = 1;
		var myblocks = block_arr.join(",")+"|"+block_hide;
		$(".main_sz_box").hide();
		setCookie("bids",myblocks,365);
		for(var i=15;i>0;i--){
			if($.inArray(i.toString(),block_arr)!=-1){
				$(".main_lb_box[t="+i.toString()+"]").fadeIn();
				$(".main_lb_box[t="+i.toString()+"]").insertBefore($(".main_lb_box[t]").eq(0));
				
			}
			else{
				if(block_hide){
					$(".main_lb_box[t="+i.toString()+"]").fadeOut();
				}
				else{
					$(".main_lb_box[t="+i.toString()+"]").fadeIn();
				}
			}
		}
		menu_adjust();
		_g_.ajax("member.act_myblocks",
					{act:'set',myblocks:myblocks},
					function(data){
					}
		 );
	})
	menu_adjust();
	function setCookie(c_name,value,expiredays)
	{
		var exdate=new Date()
		exdate.setDate(exdate.getDate()+expiredays)
		document.cookie=c_name+ "=" +escape(value)+
		((expiredays==null) ? "" : ";expires="+exdate.toGMTString())
	}
});


