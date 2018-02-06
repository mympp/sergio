$(document).ready(function(){

	$(".top_bar .item").hover(function(){
		$(this).children().next().show(100);
		$(this).addClass("hover");
		},function(){
		$(this).children().next().hide(100);
		$(this).removeClass("hover");
	});	

	$(".close_ad_ico").click(
		function(){
			$(".top_ad").slideUp("slow");
		}
	)
	
	$(".focus_input .focus_text").each(function(){
		var thisVal=$(this).val();
		if(thisVal!=""){
		 $(this).siblings(".focus_input label").hide();
		}else{
		 $(this).siblings(".focus_input label").show();
		}
		
		$(this).focus(function(){
		 $(this).siblings(".focus_input label").hide();
		}).blur(function(){
		  var val=$(this).val();
		  if(val!=""){
		   $(this).siblings(".focus_input label").hide();
		  }else{
		   $(this).siblings(".focus_input label").show();
		  }
		});
	})

	//公司档案主营产品
	$(".main_pro_btn").toggle(function(){
		$(this).toggleClass("main_pro_btn_up");
		$(".main_pro_con").toggleClass("main_pro_con_more");
     },function(){
		$(this).toggleClass("main_pro_btn_up");
		$(".main_pro_con").toggleClass("main_pro_con_more");
	});
	
	//侧导航栏
	$(document).ready(function(){
		$(".sidebar_menu_more").click(function(){//点击til
			$(this).parents(".sidebar_menu_til").next().slideToggle("slow");//当前的下一个显示或隐藏
			if($(this).hasClass("up")){//如果有UP的样式
				$(this).removeClass("up");//就移除
			}else{
				$(this).addClass("up");//如果没有就加上
			}
		  });
	});
});


function setTab(name,cursel,n){
	var hover="hover";
	for(var i=1;i<=n;i++){
	var menu=$("#"+name+i);
	var con=document.getElementById("con_"+name+"_"+i);
	if(i==cursel){
			menu.addClass(hover);
		}
		else{
			menu.removeClass(hover);
		}
	
	if (con)con.style.display=i==cursel?"block":"none";
	}
}

$(document).ready(function() {
	$.ajax({  
		type:'GET',    
		url :'/front/ajaxCheckLogin.do?t='+new Date().getTime(), 
		dataType:'jsonp',
		jsonp:'jsoncallback', 
		success : function(data) {  
			if (data.msg == "notLogin") {						
				$("#loginHeaderDiv").hide();
	   			$("#notLoginHeaderDiv").show();
	   		} else {
	   			$("#loginHeaderDiv").show();
	   			$("#notLoginHeaderDiv").hide();
	   			$("#userNameSpan").html(data.loginName);
			}
		}
	});
});

function changeCaptcha() {
	$("#codeCheck").val("");
	document.getElementById("captchaText").src = "/front/captcha.do?rnd=" + Math.random();
}

function getCookie(name) {
	var mycookie = unescape(document.cookie);
	var cindex = mycookie.indexOf(name + "=");
	if (cindex != -1) {
	    var cstart = cindex+name.length + 1;
	    var cend = mycookie.indexOf(";", cstart);
	    if (cend == -1) 
	        cend = mycookie.length;
	    return mycookie.substring(cstart, cend);
	}
	return null;
}

function getRndVal() {
	var val = parseInt(Math.random()*10000000000) + 5180000000000;
	return val.toString(16);
}

var ind_vst = getCookie("ind_vst");
if (ind_vst == null || ind_vst == "") {
	ind_vst = getRndVal();
	var expDate = new Date();
	expDate.setTime(expDate.getTime() + 10*365*24*60*60*1000);
	document.cookie = "ind_vst="+escape(ind_vst) + ";expires="+expDate.toGMTString() + ";path=/";
}
