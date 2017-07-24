<%@ page contentType="text/html;charset=UTF-8" language="java" %>
<!DOCTYPE html>
<html lang="zh">
<head>
	<meta charset="UTF-8">
	<meta name="viewport" content="width=device-width,initial-scale=1">
	<link rel="shortcut icon" href="images/favicon.ico" type="favicon.ico" />
	<title>聚派数据科技-后台登录</title>
	<meta name="csrf-token" content="F66Pn8mTVtbiQw8kY3OMZGqzQMGIKoR8imsnYqPI" />
	<meta name="renderer" content="webkit">
	<meta http-equiv="X-UA-Compatible" content="IE=edge,chrome=IE8">
	<meta name="description" content="">
	<meta name="keywords" content="">
	<meta http-equiv="X-UA-Compatible" content="IE=edge,chrome=IE8">
	<link rel="stylesheet" href="../css/newLogin.css">
	<link rel="stylesheet" type="text/css" href="../css/progressButton/component.css">
	<link href="css/bootstrap.min.css" rel="stylesheet">
	<link href="css/font-awesome.css" rel="stylesheet">
	<link href="css/style.css" rel="stylesheet">
	<link rel="stylesheet" type="text/css" href="css/index.css">
	<script>
        if (window.top !== window.self) {
            window.top.location = window.location;
        }
    </script>
	<script>
        var _hmt = _hmt || [];
        (function() {
          var hm = document.createElement("script");
          hm.src = "//hm.baidu.com/hm.js?4b01d2b2a7a52c41065c6feb59092d19";
          var s = document.getElementsByTagName("script")[0];
          s.parentNode.insertBefore(hm, s);
        })();
    </script>
</head>
<body class="signin">
	<div class="main-box container clearfix">
		<div id="sign" class="sign">
			<div class="view view-signin">
				<div class="signin-logo"><img src="../images/logo1.png"></div>
				<div class="login-tips">用户不存在或密码错误！</div>
				<div class="input-box">
					<input class="input-control" id="username" type="text" required="required" placeholder="请输入用户名或手机" name="username">
					<label class="icon-user" for="username"></label>
				</div>
				<div class="input-box">
					<input class="input-control" id="password" type="password" required="required" placeholder="请输入密码" name="password">
					<label class="icon-pwd" for="password"></label>
				</div>
				<input type="hidden" id="goDirect" name="goDirect" value="http://www.soundtooth.cn/boxList">
				<div class="progress-button elastic">
					<button id="login-button">
						<span>
							登录 <i class="fa fa-angle-right"></i>
						</span>
					</button>
				</div>
				<!-- <p class="go-register">
					没有账号？
					<a href="javascript:;" id="register-active">立即注册</a>
				</p> -->
			</div>
			<div class="view view-signup">
				<h3 class="singup-title">注册</h3>
				<div class="qrcode-box">
					<img src="images/33818.jpg" alt="微信二维码">
					<p class="description">注册请微信联系公司客服</p>
				</div>
				<p class="go-login">
					已有账号？
					<a href="javascript:;" id="login-active">立即登录</a>
				</p>
			</div>
		</div>
	</div>
	<div class="loading-area" style="display: none;">
		<div class="loading-mask"></div>
		<div class="loading-icon"></div>
	</div>
	<!-- <div id="particles-js"></div> -->
	<div class="foo"><p>欢迎访问广东聚派数据科技系统</p></div>
	<!--[if !IE]>
	-->
	<script src="/js/jquery-2.1.4.min.js"></script>
	<!-- <![endif]-->
	<!--[if IE]>
	<script src="/js/jquery-1.11.3.min.js"></script>
	<![endif]-->
	<script src="/js/layer.js?v=2.3"></script>
	<!-- <script src="/js/particles/particles.min.js"></script>-->
	<script type="text/javascript">
		var BASEURL = "http://www.soundtooth.cn/";
		$(document).ready(function() {
		    $("#login-button").click(function(event) {
		    	/* Act on the event */
		    	$.ajax({
		    		url: '/background/login.do',
		    		type: 'post',
		    		dataType: 'json',
		    		async:false,
		    		data: {username: $("#username").val(),"password":$("#password").val()},
		    	})
		    	.done(function(json) {;
		    		if(json.errCode=='200'){
		    			window.location.href="/background/index.do";
		    		}else{
		    			layer.alert(json.errMsg);
		    		}
		    	})
		    	.fail(function() {
		    		console.log("error");
		    	})
		    	.always(function() {
		    		console.log("complete");
		    	});
		    	
		    });
		});
	</script>
</body>
</html>