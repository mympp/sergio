$(function(){
	$(".header_box").load("../publicity/header.html",function(){
		var index = document.getElementsByClassName('pages')[0].classList[0];
		//console.log(index);
	    $(".left_h1").find('li>a:eq('+index+')').addClass('active');
	});
	$(".footer_box").load("../publicity/footer.html");
	
	var jiaru = '';
	jiaru += 
	`<div class="join-WeAre">
		<div class="join-org">
			<span class="close-x1">&times;</span>
		</div>
		<form action="#" id="join-form">
		<div class="join-form">
			<p class="join-form-title">加盟我们，成为代理商</p>
			<div class="join-form-oneCells" style="margin-top: 0;">
				<p>姓名</p>
				<input class="input_cells" type="text" name="joinName" placeholder="请输入您的姓名"/>
			</div>
			<div class="join-form-oneCells">
				<p>公司名称</p>
				<input class="input_cells" type="text" name="companyName" placeholder="请输入您的公司名称"/>
			</div>
			<div class="join-form-oneCells">
				<p>联系方式</p>
				<input class="input_cells" type="text" name="phone" placeholder="请输入您的联系方式"/>
			</div>
			<div class="join-form-oneCells">
				<p>简单介绍</p>
				<textarea class="tx-jieshao" name="txjieshao" maxlength="200" placeholder="请输入您的简单介绍"></textarea>
			</div>
			<div class="join-form-submit">
				<span class="join-form-submit-btn">马上申请</span>
				<br>
				<p class="join-form-submit-tipsText">我们会在收到您的申请1个工作日由专人与您联系！</p>
			</div>
		</div>
		</form>
	</div>`;
			
	//为加入我们绑定单击事件
	$(document).on("click",".join_We",function(){
		if($(".join-WeAre").css("display")=="block"){
			$(window).scrollTop(0);
			return false;
		}
		$("body").append(jiaru);
		$(".join-WeAre").fadeIn();
	})
	
	//为关闭X绑定单击事件
	$(document).on("click",".close-x1",function(){
		$(".join-WeAre").fadeOut();
		$(".join-WeAre").remove();
	})
	
	//为申请按钮绑定单击事件
	$(document).on("click",".join-form-submit-btn",function(){
		var joinName = $("input[name='joinName']").val();
		var companyName = $("input[name='companyName']").val();
		var phone = $("input[name='phone']").val();
		var txjieshao = $("textarea[name='txjieshao']").val();
		if(joinName == ""){
			alert("请输入您的姓名");
		}else if(companyName == ""){
			alert("请输入您的公司名称");
		}else if(phone == ""){
			alert("请输入您的联系方式");
		}else if(txjieshao == ""){
			alert("请输入您的简单介绍");
		}else{
			alert("信息完善，可以申请！");
		}
	})
})