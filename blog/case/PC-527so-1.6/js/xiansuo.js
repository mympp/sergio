$(function() {
	wordlimit("More-bigbox-btn",5);//调用方法

	//用户是否绑定邮箱状态
	var vipEmail = false;
	if(vipEmail == true){
		$(".dy_Email_Bigbox").hide();
	}else {
		$(".dy_Email_Bigbox").show();
	}
	//用户是否进入订阅关键词修改界面
	var antistop = false;
	if(antistop == true){
		$(".hy_input").css({
			"padding-right": 40
		})
		$(".dy_hy_box").height(560)
		$(".dy_hy_title").width(560);
		$(".dy_hy_title").text("设置关键词，系统将根据您所设置的关键词为您匹配对应的求购信息，每天定时推送给您。您本月还有N次修改关键词的机会（修改一个关键词算一次）。")
		$(".dy_Email_Bigbox").hide();
		$(".hy_empty").show();
	}

	//引导页设置开始
	var XianIndex = false;
	if(XianIndex) {
		$(".Guidance-box").show();
		$(".xiansuo_header").hide();
		$(".xiansuo_main").hide();
		$(".One-Tao").show();
	}else {
		$(".Guidance-box").hide();
		$(".xiansuo_header").show();
		$(".xiansuo_main").show();
		$(".One-Tao").hide();
	}
	//首次进入不显示数据页面XX关闭点击事件
	$(".close-One-Tao").on("click",function(){
		$(".One-Tao").hide();
		$(".xiansuo_header").show();
		$(".xiansuo_main").show();
	})

	var clicknum = 0; //记录点击次数判断上一步与下一步;
	$(document).on("click",".GuidanceBtn",function(){
		if(clicknum %2 == 0) {
			$(".Guidance").attr("src","../../Images/xiaosuo2.jpg");
		}else  {
			$(".Guidance").attr("src","../../Images/xiaosuo1.jpg");
		}
		clicknum++;
	})
	//引导页设置结束
	var state = 0;//0为未认证会员  1为已认证会员
	if(state == 0){
		$(".xiansuo_hdleft_btnlist").addClass("noVip");
	}else if(state == 1){
		$(".xiansuo_hdleft_btnlist").removeClass("noVip");
	}
	
	getHeight(); //动态设置高度

	$(window).resize(function(){
		getHeight();
	})
	
	if($(".xiansuo_List li").length == 0){//如果页面的li长度等于0
		$("#checkall").prop("checked", false);//关闭全选
		$("#checkall").prop("disabled", "false");//禁用全选
		$(".xiansuo_Page_Div").hide();//隐藏分页器
	}else{
		$("#checkall").removeProp("checked");//移除禁用
		$("#checkall").removeProp("disabled");//移除禁用
		$(".xiansuo_Page_Div").show();//隐藏分页器
	}
	
	var pageVal = $(".xiansuo_Page_Three").val();
	$(".xiansuo_Pages").html(pageVal+"页");
	
	var time1 = new Date().Format("yyyy-MM-dd");//此处为后台传入时间的变量(最小时间)
	var start = {
		elem: '#inputStartTime',
		min: time1,//此处为起始时间的值
		choose: function(datas) {
			end.min = datas;
			end.start = datas;
		}
	};

	var end = {
		elem: '#inputEndTime',
		min: laydate.now()//此处为结束时间的值(为今天截止最大时间)
	};

	//开始时间
	$('#inputStartTime').click(function() {
		laydate(start);
	});

	//结束时间
	$('#inputEndTime').click(function() {
		laydate(end);
	});

	//未认证会员时点击按钮提示用户
	$(document).on("click",".xiansuo_hdleft_btnlist.noVip span",function(){
		$(".ren-zheng-Tips1").fadeIn();
	})

	//关闭未认证会员提示框
	$(document).on("click",".closex-RZ,.ren-zheng-Tips-ct span",function(){
		$(".ren-zheng-Tips1").fadeOut();
	})
	
	$(".xiansuo_Page_Three").change(function(){
		var checkValue = $(this).val();
		$(".xiansuo_Pages").html(checkValue+"页");
	})
	var startTime;
	var endTime;
	//为自定义时间绑定单击事件
	$(document).on("click",".zdy_timer_btn",function(){
		startTime = $("#inputStartTime").val();
		endTime = $("#inputEndTime").val();
		if(startTime==""){
			alert("请选择起始时间");
			return false;
		}else if(endTime==""){
			alert("请选择结束时间");
			return false;
		}else{
			$(".zdy_timer_div").fadeOut();
			$(".More_Actions_ul").slideUp();
			console.log(startTime,endTime);	
		}
	})
    //
	//为线索头部导航li绑定单击事件
	$(document).on("click", ".xiansuo_hdleft ul li", function() {
		var index = $(this).index();
		var str = $(this).text();
		$(this).addClass("active").siblings().removeClass("active");
		if($(this).hasClass("More_Actions")){
			return false;
		}else{
			$(".More_Actions_ul").slideUp();
			console.log(str);
		}
	})

	//为更多操作绑定单击事件
	$(document).on("click",".More_Actions",function(){
		//$(".More_Actions_ul").slideToggle();旧
		$(".More-X").slideToggle();
	})

	//阻止下拉菜单父元素事件冒泡
	$(document).on("click", ".More_Actions_ul", function(e) {
		e.stopPropagation();
	})

	//为下拉菜单P元素绑定单击事件
	$(document).on("click", ".More_Actions_ul p", function(e) {
		var index = $(this).index();
		$(this).addClass("active").siblings().removeClass("active");
		if(index == 0){
			var str1 = $(this).html();
			console.log(str1);
			$(".More_Actions_ul").slideUp();
		}else if(index == 1){
			var str2 = $(this).html();
			console.log(str2);
			$(".More_Actions_ul").slideUp();
		}else if(index == 2){
			var str3 = $(this).html();
			console.log(str3);
			$(".More_Actions_ul").slideUp();
		}else if(index == 3){
			var str4 = $(this).html();
			console.log(str4);
			$(".More_Actions_ul").slideUp();
		}else if(index == 4){
			var str5 = $(this).html();
			console.log(str5);
			$(".More_Actions_ul").slideUp();
		}
		
		if(index == 5) {
			$(".zdy_timer_div").fadeIn();
		} else {
			$(".zdy_timer_div").fadeOut();
		}
		e.stopPropagation();
	})

	//为查看联系方式1绑定单击事件
	$(document).on("click", ".ck-phone-val", function() {
		if($(this).html() == "查看联系方式") {
			var TelVal = $(this).parents("li").find(".tel_val").val();
			$(this).html(TelVal);
		}
	})

	//为查看联系方式2绑定单击事件
	$(document).on("click", ".ck-email-val", function() {
		if($(this).html() == "查看联系方式") {
			var TelVal = $(this).parents("li").find(".email_val").val();
			$(this).html(TelVal);
		}
	})

	//阻止div事件冒泡到其他元素
	$(document).on("click", ".zdy_timer_div", function(e) {
		e.stopPropagation();
	})

	//为自定义时间筛选绑定单击事件
	$(document).on("click", ".zdy_timer_cell1_s2", function(e) {
		console.log(111);
		$(".zdy_timer_div").fadeOut();
		$(".Time-btn").removeClass("btn_aiv")
		e.stopPropagation();
	})

	//为分页器每个li绑定单击事件
	$(document).on("click",".xiansuo_Page_list li",function(){
		var index = $(this).index();
		var str = $(this).html();
		$(this).addClass("active").siblings().removeClass("active");
		$(".that_Page").val(str);
		console.log(index);
	})

	//为跳转至输入框监听键盘事件
	$(document).on("keydown",".that_Page",function(e){
		var page = $(this).val();
		if(e.keyCode==13){
			alert(page);
		}
	})

	//为线索标题绑定单击事件进入线索详情
	$(document).on("click",".xiansuo_List_title",function(){
		if(state == 0){
			$(".xiansuo_des_ul").addClass("isClick_blt");
		}
		$(".xiansuo_des_modal01").fadeIn();
	})
	
	//为拍卖标题绑定单击事件进入线索详情
	$(document).on("click",".xiansuo_List_title01",function(){
		if(state == 0){
			$(".xiansuo_des_ul").addClass("isClick_blt");
		}
		$(".xiansuo_des_modal02").fadeIn();
	})

	//为线索详情关闭按钮绑定单击事件
	$(document).on("click",".xiansuo_des_close",function(){
		$(".xiansuo_des_modal").fadeOut();
	})
	
	//为线索详情功能列表li绑定单击事件
	$(document).on("click",".xiansuo_des_ul li",function(){
		var index = $(this).index();
		if( index == 1 || index == 0){
			console.log(index);
			if(index == 0){
				$(".modal-box-2").fadeIn();
			}
			
			if(index == 1){
				$(".delete-modal").fadeIn();
			}
			return false;
		}
		
		//作废按钮
		if( index == 2){
			var str = $(this).html();
			if(str=="恢复"){
				$(this).html("作废");//发起ajax
				$(".sucuess-modal").fadeIn();
				setTimeout(function(){
					$(".sucuess-modal").fadeOut();
				},1500);
			}else if(str=="作废"){
				$(this).html("恢复");//发起ajax
				$(".sucuess-modal").fadeIn();
				setTimeout(function(){
					$(".sucuess-modal").fadeOut();
				},1500);
			}
		}
		
		//标记按钮
		if( index == 3){
			var str = $(this).html();
			if(str=="已标记"){
				$(this).html("标记");//发起ajax
				$(".sucuess-modal").fadeIn();
				setTimeout(function(){
					$(".sucuess-modal").fadeOut();
				},1500);
			}else if(str=="标记"){
				$(this).html("已标记");//发起ajax
				$(".sucuess-modal").fadeIn();
				setTimeout(function(){
					$(".sucuess-modal").fadeOut();
				},1500);
			}
		}
		
		//转为客户按钮
		if( index == 4){
			var str = $(this).html();
			if(str=="已转为客户"){
				$(this).html("转为客户");//发起ajax
				$(".sucuess-modal").fadeIn();
				setTimeout(function(){
					$(".sucuess-modal").fadeOut();
				},1500);
			}else if(str=="转为客户"){
				$(this).html("已转为客户");//发起ajax
				$(".sucuess-modal").fadeIn();
				setTimeout(function(){
					$(".sucuess-modal").fadeOut();
				},1500);
			}
		}
		
		//切换按钮样式
		if($(this).hasClass("active")){
			$(this).removeClass("active");
		}else{
			$(this).addClass("active");
		}
	})

	//为更多功能列表li绑定单击事件
	$(document).on("click",".des_more_fun1 li",function(){
		var index = $(this).index();
		if(index==0){
			$(".xiansuo_des_content1").fadeOut();
			$(".xiansuo_des_content").fadeIn();
		}else if(index==1){
			$(".xiansuo_des_content").fadeOut();
			$(".xiansuo_des_content1").fadeIn();
		}
		console.log(index);
		$(this).addClass("active").siblings().removeClass("active");
	})

	//为服务记录删除按钮绑定单击事件
	$(document).on("click",".fabu_jilu_delete",function(){
		var id = $(this).parent().attr("name");
		console.log(id);
		$(this).parent().remove();//发起ajax
	})
	
	//为订阅行业绑定单击事件
	$(document).on('click','.php_hy_list li',function(){
		$(this).addClass('active').siblings().removeClass("active");
		hangye = $(this).html();
	})
	
	//为订阅行业关键词绑定单击事件
	$(document).on('click','.php_key_list li',function(){
		var liTrue1 = $(this).hasClass('active');
		$(this).addClass('active');
		if(liTrue1) {
			$(this).removeClass('active');
		}
	})
	
	//为保存关键词按钮绑定单击事件
	var result = "";
	$(document).on('click',".dy_save_1",function(){
		var hy = hangye;//获取行业的值
		var zdykey = $(".zdy_keyWord_form").val();//文本域的值
		var Allli = $('.php_key_list ul li');//获取所有的li
		var liTrue1 = Allli.hasClass('active');//检测li含有的状态
		var result = '';
		if(liTrue1) {
			for(var i=0;i<Allli.length;i++){//遍历满足的li元素长度
				if(Allli[i].className=='active'){
			　　　　result += Allli[i].innerHTML;
			   }
			}
		}
		console.log(hy,result,zdykey);//发起ajax
		$(".dingyue_hy_modal").fadeOut();
	})

	//新-打开订阅采购商信息
	$(document).on("click",".dingyue_cgMsgBtn",function(){
		$(".dy_hy_modal").fadeIn();
		getHeight();
	})

	//关闭订阅采购商信息
	$(document).on("click",".dingyue_hy_header_close,.dy_cancel_1",function(){
		$(".dingyue_hy_modal").fadeOut();
	})

	//打开删除订阅行业模块
	$(document).on("click",".dingyue_hy_delete",function(){
		$(".user_dyhy_list").fadeIn();
	})

	//关闭删除订阅行业模块
	$(document).on("click",".close_span",function(){
		$(".user_dyhy_list").fadeOut();
	})
	
	//点击确认按钮关闭模态框
	$(document).on("click",".de_confirm_1",function(){
		$(".delete-modal").fadeOut();//发起ajax
		$(".sucuess-modal").fadeIn();
		setTimeout(function(){
			$(".sucuess-modal").fadeOut();
		},1500);
	})

	//点击取消按钮关闭模态框
	$(document).on("click",".de_cancel_1",function(){
		$(".delete-modal").fadeOut();//无需发起
	})
	
	//子复选框的事件函数
	$(document).on("click","input[name=checkedres]",function(){
		setSelectAll();
	})
	
	//default为正常  true为作废   false为恢复   biaoji为标记
	
	//为标记按钮绑定单击事件
	$(document).on("click",".btnlist_biaoji",function(){	
		if($(".xiansuo_List li").length == 0){
			return false;
		}
		
		if($("input[type='checkbox'][name='checkedres']:checked").length==0){
			return false;
		}
		
		if($(this).parent().hasClass("noVip")){
			return false;
		}
		
		//遍历每个选中的checkbox
		$("input[type='checkbox'][name='checkedres']:checked").each(function(){
			if($(this).parents("li").attr("data-null")=="true"){//如果含有作废数据
				return false;
			}
			var divid1 =  $(this).parents("li").attr("name");//每条数据的id
			$("[name= '"+ divid1 +"' ][data-null='default']").find(".xiansuo_List_state").html("已标记").addClass("yi_biaoji");//标记选中的li
			console.log(divid1,$("[name= '"+ divid1 +"' ][data-null='default']"));//打印测试有多少个正常的
			$(".yi_biaoji").parents("li").attr("data-null","biaoji");
		})
	})
	
	//为作废按钮绑定单击事件
	$(document).on("click",".btnlist_zuofei",function(){
		if($(".xiansuo_List li").length == 0){
			return false;
		}
		
		if($("input[type='checkbox'][name='checkedres']:checked").length==0){
			return false;
		}
		
		if($(this).parent().hasClass("noVip")){
			return false;
		}
		
		//遍历每个选中的checkbox
		$("input[type='checkbox'][name='checkedres']:checked").each(function(){
			var divid1 =  $(this).parents("li").attr("name");//每条数据的id
			$("[name= '"+ divid1 +"' ]").find(".xiansuo_List_state").removeClass("yi_biaoji").html("作废").addClass("yi_zuofei");//作废选中的li(标记跟正常都可作废)
			console.log(divid1);
			$(".yi_zuofei").parents("li").attr("data-null","true");
		})
	})
	
	//为恢复按钮绑定单击事件
	$(document).on("click",".btnlist_huifu",function(){
		if($(".xiansuo_List li").length == 0){
			return false;
		}
		
		if($("input[type='checkbox'][name='checkedres']:checked").length==0){
			return false;
		}
		
		if($(this).parent().hasClass("noVip")){
			return false;
		}
		
		//遍历每个选中的checkbox
		$("input[type='checkbox'][name='checkedres']:checked").each(function(){
			if($(this).parents("li").attr("data-null")=="biaoji"){//如果含有标记数据
				return false;
			}
			var divid1 =  $(this).parents("li").attr("name");//每条数据的id
			$("[name= '"+ divid1 +"' ][data-null='true']").find(".yi_zuofei").removeClass("yi_zuofei").html("").parents("li").attr("data-null","default");//恢复选中的li
			console.log(divid1);
		})
	})
	
	//为删除按钮绑定单击事件
	$(document).on("click",".btnlist_delete",function(){
		if($(".xiansuo_List li").length == 0){
			return false;
		}
		
		if($("input[type='checkbox'][name='checkedres']:checked").length==0){
			return false;
		}
		
		if($(this).parent().hasClass("noVip")){
			return false;
		}
		
		$(".delete-modal3").fadeIn();
	})
	
	//为线索列表取消按钮绑定单击事件
	$(document).on("click",".de_cancel_13",function(){
		$(".delete-modal3").fadeOut();
	})
	
	//为线索列表确认按钮绑定单击事件
	$(document).on("click",".de_confirm_13",function(){
		//遍历每个选中的checkbox
		$("input[type='checkbox'][name='checkedres']:checked").each(function(){
			divids =  $(this).parents("li").attr("name");//每条数据的id
			$("[name= '"+ divids +"' ]").remove();//发起ajax
			console.log(divids);
			if($(".xiansuo_List li").length == 0){//如果页面的li长度等于0
				$("#checkall").prop("checked", false);//关闭全选
				$("#checkall").prop("disabled", "false");//禁用全选
				$(".xiansuo_Page_border").hide();//隐藏分割线
				$(".xiansuo_Page_div").hide();//隐藏分页器
			}
		})
		$(".delete-modal3").fadeOut();
	})
	
	////为订阅行业删除按钮绑定单击事件
	//$(document).on("click",".delete_btn1",function(){
	//	yizhu = $(this).parents("li");
	//	$(".delete-modal1").fadeIn();
	//})
	//
	////为订阅行业取消按钮绑定单击事件
	//$(document).on("click",".de_cancel_11",function(){
	//	$(".delete-modal1").fadeOut();
	//})
	//
	////为订阅行业确认按钮绑定单击事件
	//$(document).on("click",".de_confirm_11",function(){
	//	$(".delete-modal1").fadeOut();
	//	yizhu.remove();//发起ajax
	//})
	
	//为编辑线索关闭按钮绑定单击事件
	$(document).on("click",".bj-top-span,.bj-btn1",function(){
		$(".modal-box-2").fadeOut();
	})
	
	//为编辑线索保存按钮绑定单击事件
	$(document).on("click",".btn-submit1",function(){
		var company = $(".company").val();//公司
		var lianxiR = $(".lianxi_ren").val();//联系人
		var Phone = $(".Phone").val();//手机号码
		var Tle = $(".Tle").val();//电话号码
		var Email = $(".Email").val();//电子邮箱
		var NetCom = $(".NetCom").val();//网址
		var sheng1 = $(".sheng1").val();//省份
		var shi1 = $(".shi1").val();//城市
		var quxian1 = $(".quxian1").val();//区县
		var xianxiDZ = $(".xianxi_dizhi").val();//详细地址
		var cpName = $(".cp-name1").val();//产品名称
		var xiansuoMS = $(".xiansuo_miaoshu").val();//线索描述
		if(lianxiR==""){
			alert("请输入联系人");
		}else{
			console.log(company,lianxiR,Phone,Tle,Email,NetCom,sheng1,shi1,quxian1,xianxiDZ,cpName,xiansuoMS);
			$(".modal-box-2").fadeOut();//关闭编辑线索
			$(".sucuess-modal").fadeIn();//操作成功显示
			setTimeout(function(){
				$(".sucuess-modal").fadeOut();//操作成功隐藏
			},1500)
		}
	})
	
	//新-点击自定义时间
	$(document).on("click",".Time-btn",function(event){
		event.stopPropagation();
		$(".zdy_timer_div").fadeIn();
	})
	
	//新-阻止冒泡
	$(document).on("click",".More-X",function(event){
		event.stopPropagation();
		//$(".zdy_timer_div").fadeIn();
	})
	
	//新-增加筛选所有选项点击添加效果
	$(document).on("click",".More-bigbox-btn",function(event){
		event.stopPropagation();
		//$(this).toggleClass("btn_aiv");
		//$(this).addClass("btn_aiv").siblings().removeClass("btn_aiv")
		$(this).toggleClass("btn_aiv").siblings().removeClass("btn_aiv");
		//$(this).addClass("btn_aiv");
		//$(this).parent().parent().find($(".More-bigbox-btn")).not($(this)).removeClass("btn_aiv");
	})
	
	//新-XX关闭按钮
	$(document).on("click",".More-coles",function(event){
		event.stopPropagation();
		$(".More-X").hide();
	})
	
	//新-增加筛选确定按钮
	$(document).on("click",".More-bigbox-confirm",function(){
		//获取选项状态
		var frombtn =  $(this).parent().parent().parent().find($(".More-bigbox-btn")).not($(this)).hasClass("btn_aiv");
		var zdy_Time = $(".zdy_timer_div").is(':hidden'); //获取自定义时间框状态
		if(frombtn == false) {
			$(".More-model").fadeIn();
			setTimeout(function(){
				$(".More-model").fadeOut();
			},1500);
		}else {
			$(".More-X").fadeOut();
			//这里发送请求
			//获取第一个属性名
			var ids = $(".hy-box .btn_aiv").attr("data-ids");
			console.log(ids);
			//获取属性名
			var time =  $(".time-box .btn_aiv").attr("name")
			var mk =  $(".mk-box .btn_aiv").attr("name")
			console.log(time);
			console.log(mk);
			//获取文本名
			var idsT =  $(".hy-box .btn_aiv").text();
			var timeT =  $(".time-box .btn_aiv").text();
			console.log(timeT);
			console.log(idsT);
			console.log(startTime,endTime);
			$(".sucuess-modalnew1").fadeIn();
			setTimeout(function(){
				$(".sucuess-modalnew1").fadeOut();
			},1500);
		}
	})
	//新-修改关键词清空点击事件
	$(document).on("click",".hy_empty",function(){
		$(this).prev().val("")
	})
	//新-订阅行业
	//实时获取邮箱输输入情况
	$(".hy_Email").on("input propertychange",function(){
		var hy_Email = $(".hy_Email").val().length;
		if(hy_Email != 0){
			$(".hy_btn").css({
				"background": "#1da1f2",
				"cursor": "pointer",
				"pointer-events": "auto"
			})
		}else {
			$(".hy_btn").css({
				"background": "#dcdcdc",
				"pointer-events": "none"
			})
		}
	})
	//关闭订阅行业窗口
	$(document).on("click",".dy_hy_top_close",function(){
		$(".dy_hy_modal").hide();
	})
	//多行业勾选确定点击事件
	$(document).on("click",".dy_check_btn_affirm",function(){


		var inputC = $(".checkbox_input")
		var addcheck = 0;
		$(".checkbox_input").each(function(){
			if(this.checked == true){
				addcheck = 1;
				var inputtext = $(this).next().text();
				console.log($(this));
				console.log(inputtext);
				$(".hy_list_model").remove();
			}
		});
		if(addcheck == 0) {
			alert(1)
			$(".sucuess-modalnew2").show();
			setTimeout(function(){
				$(".sucuess-modalnew2").hide();
			},1000)
		}
	})
	//开启模糊搜索
	$(".dy_hy_input_box>.dy_big_box>.hy_input").keyup(function(){
		//动态插入模糊搜索代码段
		$(this).parents(".dy_big_box").siblings().children(".hy_input").attr("disabled","disabled");
		var html = `<div class="dy_hy_List">
								<div class="List_center">
									<div class="list_num">富士山红苹果</div>
									<div class="list_num">苹果7p</div>
									<div class="list_num">苹果6p</div>
									<div class="list_num">苹果X</div>
									<div class="list_num">小苹果video</div>
									<div class="list_num">苹果树之恋</div>
									<div class="list_num">苹果节</div>
								</div>
								<div class="List_bottom">
									<div class="list_close">关闭</div>
								</div>
							</div>`
		var inputLength = $(this).val().length;
		console.log(inputLength);
		if(inputLength > 1){
			$(this).parent().append(html)

		}else if(inputLength < 3) {
			$(".dy_hy_List").remove();
		}
	})
	//触发勾选框行业开始
	var hy_html = `	<div class="hy_list_model"><div class="dy_hy_name">
						<div class="dy_hy_name_top">为了更精准的筛选您的采购商，请选择想订阅与“<span>苹果</span>”相关的行业（可多选）</div>
						<div class="dy_check_box">
							<div class="checkbox_list">
								<input type="checkbox" class="checkbox_input" >
								<span class="checkbox_text">手机数码</span>
							</div>
							<div class="checkbox_list">
								<input type="checkbox" class="checkbox_input">
								<span class="checkbox_text">家具家电</span>
							</div>
							<div class="checkbox_list">
								<input type="checkbox" class="checkbox_input">
								<span class="checkbox_text">牛奶水饮</span>
							</div>
							<div class="checkbox_list">
								<input type="checkbox" class="checkbox_input">
								<span class="checkbox_text">飞机坦克</span>
							</div>
							<div class="checkbox_list">
								<input type="checkbox" class="checkbox_input">
								<span class="checkbox_text">飞机坦克</span>
							</div>
							<div class="checkbox_list">
								<input type="checkbox" class="checkbox_input">
								<span class="checkbox_text">飞机坦克</span>
							</div>
						</div>
						<div class="dy_check_btn">
							<span class="dy_check_btn_affirm">确认</span>
						</div>
					</div></div>`
	$(document).on("click",".list_num",function(){
		//模糊搜索选中值事件
		var listText = $(this).text();
		console.log(listText);
		$(this).parents(".dy_big_box").children(".hy_input").val(listText);
		//删除模糊搜索窗口
		$(".dy_hy_List").remove();
		$(".dy_hy_center").prepend(hy_html);
		$(".hy_input").attr("disabled",false);
	})
	//点击关闭触发
	$(document).on("click",".list_close",function(){
		$(".dy_hy_List").remove();
		$(".dy_hy_center").prepend(hy_html);
		$(".hy_input").attr("disabled",false);
	})
	//触发勾选框行业结束

	//模糊搜索关闭窗口事件
	$(document).on("click",".list_close",function(){
		$(this).parent().parent().remove();
	})
	//获取焦点清除错误状态
	$(document).on("focus",".hy_input",function(){
		$(".hy_error").hide();
	})
	//获取验证码按钮点击事件
	$(document).on("click",".hy_btn",function(){
		var hy_Email = $(".hy_Email").val()
		var emailreg = /^[a-z0-9-_.]+@[\da-z][\.\w-]+\.[a-z]{2,4}$/i;//邮箱正则
		if(hy_Email == ""){
			$(".hy_error").text("请输入您的邮箱")
			$(".Email_box>.hy_error").show();
		}else if(!emailreg.test(hy_Email)) {
			$(".hy_error").text("您输入的邮箱有误")
			$(".Email_box>.hy_error").show();
		}else {
			sendMessage();
		}

	})
	//点击确认提交按钮事件
	$(document).on("click",".hy_affirm_btn",function(){
		var hYval = $(".dy_hy_input_box>.dy_big_box>.hy_input");
		var emali = $(".hy_Email").val();
		var Code = $(".hy_Code").val();
		var emailreg = /^[a-z0-9-_.]+@[\da-z][\.\w-]+\.[a-z]{2,4}$/i;//邮箱正则
		var cat = 0;
		for(var i=0; i<hYval.length; i++){
			if(hYval[i].value != ""){
				console.log('成功')
				cat = 1;
			}
		}
		if(cat == 1){
			if(vipEmail == false){
				if(emali == ""){
					$(".hy_error").text("请输入您的邮箱")
					$(".Email_box>.hy_error").show();
				}else if(!emailreg.test(emali)) {
					$(".hy_error").text("您输入的邮箱有误")
					$(".Email_box>.hy_error").show();
				}else if(Code == "")  {
					$(".hy_error").text("请输入邮箱验证码")
					$(".Code_box>.hy_error").show();
				}else {
					$(".sucuess-modalnew1").fadeIn()
					setTimeout(function() {
						$(".sucuess-modalnew1").fadeOut()
					}, 1000)
				}
			}else {
				$(".sucuess-modalnew1").fadeIn()
				setTimeout(function() {
					$(".sucuess-modalnew1").fadeOut()
				}, 1000)
			}

		}else{
			$(".sucuess-modalnew").fadeIn()
			setTimeout(function() {
				$(".sucuess-modalnew").fadeOut()
			}, 1000)
		}
	})
})

//为兼容其他浏览器，则需要js解决，以下为封装的方法。
function wordlimit(cname,wordlength){
	var cname = $('.'+cname+'');//需要加省略符号的元素对象
	for(var i=0;i<cname.length;i++){
		var nowhtml=cname[i].innerHTML;//元素的内容
		var nowlength=cname[i].innerHTML.length;//元素文本的长度
		if(nowlength>wordlength){
			cname[i].innerHTML=nowhtml.substr(0,wordlength)+'...';//截取元素的文本的长度并加上省略号
		}
	}
}

//定义获取高度方法
function getHeight() {
	var height = $(window).height();
	var hy_h = height - (height*0.1);//新订阅关键词高度
	$(".dy_hy_box").height(720)//新订阅关键词盒子高度
	$(".hy_list_model").height(720)//新订阅关键词勾选行业盒子模态框高度

	var MoreH = $(".left_header").height() + $(".xiansuo_hdleft").height() - 70; //新增筛选关键词计算高度
	var WmoreH = height - MoreH - 45; //新增筛选关键词计算高度
	$(".More-X").height(WmoreH); //新增筛选关键词计算高度
	var TopH = 76 + 120;
	var cellH = (height - TopH) - 15;
	var FPageH = $(".xiansuo_Page_Div").height();
	$(".left_template,.right_template,.xiansuo_des").height(height);
	$(".xiansuo_main,.xiansuo_vessel").height(cellH);
	$(".xiansuo_List").height(cellH-FPageH);
	if(height<974){
		$(".dy_hy_box").height(hy_h);
		$(".hy_list_model").height(hy_h);
		$(".paimai_des_content").height(height-330);
		$(".php_hy_list").css({
			"height": 140,
			"overflow": "auto"
		})
		$(".php_hy_list li").css({
			"marginRight":25,
			"marginLeft":0
		})
		//新增筛选关键词计算高度
		$(".More-X").css({
			"overflow": "auto"
		})
	}else{
		//新增筛选关键词计算高度
		$(".More-X").css({
			"overflow": "visible"
		})
		$(".paimai_des_content").height(630);
		$(".php_hy_list li").css({
			"marginLeft":10
		})
	}
	
	if(height<700){
		//console.log("小于700");
		$(".dingyue_hy").css({
			"height": "85%"
		});
		
		$(".dingyue_hy_btns").css({
			"paddingBottom": "10px",
		});
	}else{
		//console.log("大于700");
		$(".dingyue_hy").css({
			"height": "",
			"overflow": ""
		});
		
		$(".dingyue_hy_btns").css({
			"paddingBottom": "20px",
		});
	}
}

//全选、反选的事件函数  
function selectAll(){ 
    console.log($("#checkall").prop("checked"));
    if ($("#checkall").prop("checked")) { 
    	console.log("全选");           
        $("input[type='checkbox'][name='checkedres']").prop("checked",true);//全选
    } else { 
        console.log("反选");              
        $("input[type='checkbox'][name='checkedres']").prop("checked",false);//反选     
    }
}  

//子复选框的事件函数
function setSelectAll(){  
    //当没有选中某个子复选框时，SelectAll取消选中  
    if (!$("input[type='checkbox'][name='checkedres']").checked) {
    	console.log("不满足,取消全选");
        $("#checkall").prop("checked", false);  
    }  
    var chsub = $("input[type='checkbox'][name='checkedres']").length;//获取subcheck的个数  
    var checkedsub = $("input[type='checkbox'][name='checkedres']:checked").length;//获取选中的subcheck的个数  
    if (checkedsub == chsub) {
    	console.log("满足,开启全选");
        $("#checkall").prop("checked", true);  
    }  
}

//发送消息函数
function sendMessage() {
	curCount = 60; //设置button效果，开始计时
	console.log(curCount);
	$(".hy_btn").text(curCount + "秒后重获").addClass('code-state12');
	InterValObj = window.setInterval(SetRemainTime, 1000); //启动计时器，1秒执行一次
}

//timer处理函数
function SetRemainTime() {
	if(curCount == 0) {
		window.clearInterval(InterValObj); //停止计时器
		$(".hy_btn").text("重新获取").removeClass('code-state12');
	} else {
		curCount--;
		$(".hy_btn").text(curCount + "秒后重获").addClass('code-state12');
	}
}