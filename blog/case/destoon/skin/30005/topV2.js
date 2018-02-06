
//图片按比例缩放
var flag=false;
function DrawImage(ImgD,iwidth,iheight)
{
	//参数(图片,允许的宽度,允许的高度)
	var image=new Image();
	image.src=ImgD.src;
	if(image.width>0 && image.height>0)
	{
		flag=true;
		if(image.width/image.height>= iwidth/iheight)
		{
			if(image.width>iwidth){ 
				ImgD.width=iwidth;
				ImgD.height=(image.height*iwidth)/image.width;
			}else{
				ImgD.width=image.width; 
				ImgD.height=image.height;
			}
		}
		else
		{
			if(image.height>iheight){ 
				ImgD.height=iheight;
				ImgD.width=(image.width*iheight)/image.height; 
			}else{
				ImgD.width=image.width; 
				ImgD.height=image.height;
			}
		}
	}
}
//图片处理函数
  function changeImageSize(img) {
    if(img.height > 100 || img.width > 100){
      if(img.height >= img.width)
      {
        img.height=100;
      } else {
        img.width=100;
      }
    }
  }
	function loginOut(){
		var preUrl = encodeURI(encodeURI(document.location.href));
		document.location.href="/member/quit_v2.jsp?pre_url="+preUrl;
	}
	
	//顶部菜单-----------start-------------
	function topMenu(){
		var topDds = new Array();
		var topDl = document.getElementById("topMenu");
		topDds = topDl.getElementsByTagName("a");
		var topDd = null;
		for(var i =0;i<topDds.length;i++){
			topDd = topDds[i];
			if(topDd.className==null || topDd.className==""){
				continue;
			}
			if(topDd.className.indexOf("zx_pkvg")==-1){
				continue;
			}
			topDd.parentNode.onmouseover= function(){
				//showPop(this);
			}
		}
	}
	
	/*
	function showPop(p){
	   var a = p.getElementsByTagName("a")[0];
	    p.style.zIndex="999";
		a.className = a.className+" zx_onn";
		var popDivs = new Array();
		var popDiv = p.getElementsByTagName("div")[0];
		popDiv.style.display="block";
		a.style.zIndex = "1";
		popDiv.style.zIndex = "9999";
		popDiv.parentNode.onmouseout= function(){
			hidePop(a);
		}
	}
	function hidePop(a){
		a.className = "zx_pkvg";
		var popDivs = new Array();
		var popDiv = a.parentNode.getElementsByTagName("div")[0];
		popDiv.style.display="none";
		a.style.zIndex = "0";
	}
	*/
	//顶部菜单-----------end-------------
	
	if (typeof jQuery == 'undefined'){
		document.write("\<script src=\'/include/v2/js/jquery-1.8.3.min.js\' type=\'text/javascript\'\>\</script\>");
	}
	//刷新采购单
	function t_timea()  
	{  
	    if(document && document.getElementsByTagName && document.getElementById && document.body && typeof jQuery != 'undefined')  
	    {  
	        clearInterval(timer);
	        refcgd();
	    }
	}  
 	var timer = setInterval(t_timea,10);
	function refcgd(flag)
	{
  		if(flag!= null && flag && document.title=="我的采购单")
  		{
  			parent.location.reload();return;
      	}
		$("#cgd_top").html("&nbsp;&nbsp;正在加载，请稍候....");
		$.ajax({url:"/tradeonline/jsp/common/ajaxJsonV2.jsp?ajax=1&r=" + new Date().getTime(),success:function(back){
			var data=back.split("*********");
			if(data.length==2)
			{
				$(".fl_zxx").html("<span>欢迎来到食品商务网，</span>" + data[0]);
				$("#cgd_top").html(data[1]);
				$("#topCarProNum").html($("#cgd_proids").attr("num"));
				if (typeof proCateNum != 'undefined')
				{
					proCateNum = parseInt($("#cgd_proids").attr("num"));
				}

				var tloginUser = $.trim($(".fl_zxx i").html()); //用户名
				$("#divlogin").hide();
				$("#divnologin").hide();
				if(tloginUser.length>0)
				{
					$("#divlogin").show();	
					$("#divlogin i").html(cutstr(tloginUser,8));
				}
				else $("#divnologin").show();
			}
		}});
	}
	function cutstr(str, len){
	    var char_length = 0;
	    for (var i = 0; i < str.length; i++){
	        var son_str = str.charAt(i);
	        encodeURI(son_str).length > 2 ? char_length += 2 : char_length += 1;
	        if (char_length >= len){
	            var sub_len = char_length == len ? i+1 : i;
	            return str.substr(0, sub_len) + "...";
	            break;
	        }
	    }
	    return str;
	}