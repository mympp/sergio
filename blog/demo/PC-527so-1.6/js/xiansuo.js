$(function() {
	var state = true; //判断用户是否会员
	if(!state) {
		$(".vip-valid").hide();
	} else {
		$(".vip-valid").show();
	}
	
	var pageVal = $(".xiansuo_Page_Three").val();
	$(".xiansuo_Pages").html(pageVal+"页");
	
	getHeight(); //动态设置高度

	$(window).resize(function(){
		getHeight();
	})
	
	var time1 = new Date().Format("yyyy-MM-dd");//此处为后台传入时间的变量(最小时间)
	var start = {
		elem: '#inputStartTime',
		max: time1,//此处为起始时间的值
		choose: function(datas) {
			end.min = datas;
			end.start = datas;
		}
	};

	var end = {
		elem: '#inputEndTime',
		max: laydate.now()//此处为结束时间的值(为今天截止最大时间)
	};

	//开始时间
	$('#inputStartTime').click(function() {
		laydate(start);
	});

	//结束时间
	$('#inputEndTime').click(function() {
		laydate(end);
	});

	$(".xiansuo_Page_Three").change(function(){
		var checkValue = $(this).val();
		$(".xiansuo_Pages").html(checkValue+"页");
	})
	
	//为自定义时间绑定单击事件
	$(document).on("click",".zdy_timer_btn",function(){
		var startTime = $("#inputStartTime").val();
		var endTime = $("#inputEndTime").val();
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
		$(".More_Actions_ul").slideToggle();
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
		$(".xiansuo_des_modal").fadeIn();
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

	//打开订阅采购商信息
	$(document).on("click",".dingyue_cgMsgBtn",function(){
		$(".dingyue_hy_modal").fadeIn();
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
	
	//为订阅行业删除按钮绑定单击事件
	$(document).on("click",".delete_btn1",function(){
		yizhu = $(this).parents("li");
		$(".delete-modal1").fadeIn();
	})
	
	//为订阅行业取消按钮绑定单击事件
	$(document).on("click",".de_cancel_11",function(){
		$(".delete-modal1").fadeOut();
	})
	
	//为订阅行业确认按钮绑定单击事件
	$(document).on("click",".de_confirm_11",function(){
		$(".delete-modal1").fadeOut();
		yizhu.remove();//发起ajax
	})
	
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
})

//定义获取高度方法
function getHeight() {
	var height = $(window).height();
	var TopH = 76 + 131;
	var cellH = (height - TopH) - 15;
	var FPageH = $(".xiansuo_Page_Div").height();
	$(".left_template,.right_template,.xiansuo_des").height(height);
	$(".xiansuo_main,.xiansuo_vessel").height(cellH);
	$(".xiansuo_List").height(cellH-FPageH);
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