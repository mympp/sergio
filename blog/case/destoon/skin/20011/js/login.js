$(document).ready(function(){
	var htmlStr5 = '<span ><font color="#000000">你好</font>，欢迎来到谷瀑<br /> </span>热线：<span class="font_c1">'+$(".f_phones").text()+'</span>';
	var htmlStr6 = '<div class="login_tl2_in1"><a href="http://www.goepe.com/member/" target="_blank">登录</a></div><div class="login_tl2_in1"><a href="http://www.goepe.com/member/reg.php" target="_blank">注册</a></div><div class="login_tl2_in1"><a href="http://cg.goepe.com/" target="_blank">采购</a></div><div class="cl"></div>';
	$(".login_tl1").html(htmlStr5);
	$(".login_tl2").html(htmlStr6);
	function login_success(res){
		if(res.info){
			var htmlStr1 = '<span ><font color="#000000">'+res.info+'</font>，你好<br /> </span>热线：<span class="font_c1">'+$(".f_phones").text()+'</span>';
			var htmlStr2 = '<div class="login_tl2_in1"><a href="http://www.goepe.com/member/">供应后台</a></div><div class="login_tl2_in1"><a href="http://cg.goepe.com/?src=index.php&act=membertocg">采购后台</a></div><div class="login_tl2_in1"><a href="http://www.goepe.com/about/hyfw.php">环宝通</a></div><div class="cl"></div>';
			var htmlStr3 = '<ul><li class="nav_li1" id="myuid"><p><a href="http://www.goepe.com/member/index.php" target="_blank">'+res.info+'</a></p><div class="nav_li1in" style="display:none;"><table border="0" cellspacing="0" cellpadding="0" width="200"><tr><td rowspan="2" width="70"><div class="gs_logo"><a href="http://www.goepe.com/member/index.php" target="_blank"><img src="'+res.logo+'"/></a></div></td><td style="border-bottom:1px solid #f5f5f5;">';
			if(res.fwurl) htmlStr3 += '<a href="<?=$fwurl?>" target="_blank"><div class="<?=$class?>" style="float:left; width:60px;"></div></a>';
			else htmlStr3 += '<div class="'+res['class']+'"></div>';
			htmlStr3 += '<div class="left"><a href="http://www.goepe.com/about/hyfw.php" target="_blank" ><strong>会员特权</strong></a></div></td></tr><tr><td><a href="http://www.goepe.com/member/?src=zhanghaobd.php" target="_blank" >账号管理</a> <font color="#e5e5e5">&nbsp;|&nbsp;</font> <span style="cursor:pointer" id="logout">退出</span></td></tr></table></div></li>';
			htmlStr3 += '<li class="nav_li2" id="noread"><div style="background:url(http://style.goepe.com/css/1408/19index/images/nsy2014_navico1.jpg) 6px no-repeat;">消息';
			if(res.xiaoxi_num!=0) htmlStr3 += res.xiaoxi_num;
			htmlStr3 += '</div><div class="nav_li2in" style="display:none;"><ul>';
			if(res.refresh) htmlStr3 += '<li><table border="0" cellspacing="0" cellpadding="0"><tr><td rowspan="2" width="65"><div class="xx_1"><img src="http://style.goepe.com/css/1408/19index/images/nsy2014_navico8.jpg" /></div></td><td><strong style="color:#000;">精品刷新</strong></td></tr><tr><td>倒计时已到，您可以操作<br /><a href="http://www.goepe.com/member/?src=refresh.php" target="_blank" >马上操作</a></td></tr></table></li>';
			if(res.xunjia) htmlStr3 += '<li><table border="0" cellspacing="0" cellpadding="0"><tr><td rowspan="2" width="65"><div class="xx_1"><img src="http://style.goepe.com/css/1408/19index/images/nsy2014_navico7.jpg" /></div></td><td><strong style="color:#000;">询价信息</strong></td></tr><tr><td>您有 '+res.xunjia_num+' 条询价未查看<br /><a href="'+res.chakan_now+'">马上查看</a></td></tr></table></li>';
			if(res.xiaoxi_num=="0") htmlStr3 += '<li class="no_messge">暂无任何信息</li>';
			htmlStr3 += '</ul></div></li><li class="nav_li3"><a href="http://www.goepe.com/about/newmphone/mphone.php" target="_blank" >手机谷瀑</a></li><li class="nav_li3"><a href="http://www.goepe.com/about/fangpiangonggao.php" target="_blank"  style="color:red">防骗公告</a></li></ul></div>';
			$(".login_tl1").html(htmlStr1);
			$(".login_tl2").html(htmlStr2);
			$(".nav_in>.left").html(htmlStr3);
			
			$("#logout").click(function(){
				function logout_success(){
					location.href = "http://www.goepe.com/";
				}
				_g_.ajax("member.memlogout",{},logout_success);
			});
			
			var myparam = {
				uid : {displayDom:$("#myuid .nav_li1in"),on:"nav_li1a",off:"nav_li1"},
				noread : {displayDom:$("#noread .nav_li2in"),on:"nav_li2a",off:"nav_li2"}
			};
			$("#myuid").hoverDisplay(myparam.uid);	
			$("#noread").hoverDisplay(myparam.noread);
		}
	}
	
	_g_.ajax("member.memlogstats",{},login_success);
	
	
})


