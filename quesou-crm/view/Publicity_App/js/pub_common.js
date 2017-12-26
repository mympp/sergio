$(function(){
	CheckDevice();//检测用户设备

	// 加盟代理弹窗
	var jiaru = '';
	jiaru += 
	'<div class="join-WeAre">'+
		'<div class="join-org">'+
			'<span class="close-x1">&times;</span>'+
		'</div>'+
		'<form action="#" id="join-form">'+
		'<div class="join-form">'+
			'<div class="join-form-title">加盟我们<br />成为代理商</div>'+
			'<div class="join-form-border"></div>'+
			'<div class="join-form-oneCells join-form-box">'+
				'<input class="input_cells" type="text" name="joinName" placeholder="姓名"/>'+
			'</div>'+
			'<div class="join-form-oneCells">'+
				'<input class="input_cells" type="text" name="companyName" placeholder="公司名称"/>'+
			'</div>'+
			'<div class="join-form-oneCells">'+
				'<input class="input_cells" type="text" name="phone" placeholder="联系方式"/>'+
			'</div>'+
			'<div class="join-form-oneCells">'+
				'<textarea class="tx-jieshao" name="txjieshao" maxlength="200" placeholder="简单介绍"></textarea>'+
			'</div>'+
			'<div class="join-form-submit">'+
				'<span class="join-form-submit-btn">马上申请</span>'+
				'<br>'+
				'<p class="join-form-submit-tipsText">我们会在收到您的申请1个工作日由专人与您联系！</p>'+
			'</div>'+
		'</div>'+
		'</form>'+
	'</div>';
			
	//为加入我们绑定单击事件
	$(document).on("click",".join_We",function(){
		if($(".join-WeAre").css("display")=="block"){
//			$(window).scrollTop(0);
			return false;
		}
		$("body").append(jiaru);
		$(".join-WeAre").fadeIn();
		$("body,html").addClass("ovfHiden");
	})
	
	//为关闭X绑定单击事件
	$(document).on("click",".close-x1",function(){
		$(".join-WeAre").fadeOut();
		$(".join-WeAre").remove();
		$("body,html").removeClass("ovfHiden");
	})
	
	//为申请按钮绑定单击事件
	$(document).on("click",".join-form-submit-btn",function(){
		var joinName = $("input[name='joinName']").val();
		var companyName = $("input[name='companyName']").val();
		var phone = $("input[name='phone']").val();
		var txjieshao = $("textarea[name='txjieshao']").val();
		if(joinName == ""){
			$.alert("请输入您的姓名");
		}else if(companyName == ""){
			$.alert("请输入您的公司名称");
		}else if(phone == ""){
			$.alert("请输入您的联系方式");
		}else if(txjieshao == ""){
			$.alert("请输入您的简单介绍");
		}else{
			$.alert("信息完善，可以申请！");
		}
	})
})

//检测用户设备
function CheckDevice(){
    var sUserAgent = navigator.userAgent.toLowerCase();
    var bIsIpad = sUserAgent.match(/ipad/i) == "ipad";
    var bIsIphoneOs = sUserAgent.match(/iphone os/i) == "iphone os";
    var bIsMidp = sUserAgent.match(/midp/i) == "midp";
    var bIsUc7 = sUserAgent.match(/rv:1.2.3.4/i) == "rv:1.2.3.4";
    var bIsUc = sUserAgent.match(/ucweb/i) == "ucweb";
    var bIsAndroid = sUserAgent.match(/android/i) == "android";
    var bIsCE = sUserAgent.match(/windows ce/i) == "windows ce";
    var bIsWM = sUserAgent.match(/windows mobile/i) == "windows mobile";
    if (bIsIpad || bIsIphoneOs || bIsMidp || bIsUc7 || bIsUc || bIsAndroid || bIsCE || bIsWM) {
		//...check...ing
    }else{
    	console.log("pc");
    	location.href = "http://www.527so.com";
    }
}