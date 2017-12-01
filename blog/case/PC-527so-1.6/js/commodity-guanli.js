$(function() {
	var pageVal = $(".xiansuo_Page_Three").val();
	$(".xiansuo_Pages").html(pageVal+"页");
	
	getHeight(); //动态设置高度
	
	$(window).resize(function() {
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

	wordlimit("jiequ_str",56);//截取字符串

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

	var jiezhi = {
		elem: '#expiration_time',
		min: laydate.now()//此处为截止时间的值
	};
	
	//开始时间
	$(document).on("click","#inputStartTime",function(){
		laydate(start);
	});
	
	//结束时间	
	$(document).on("click","#inputEndTime",function(){
		laydate(end);
	});
	
	//截止时间	
	$(document).on("click","#expiration_time",function(){
		laydate(jiezhi);
	});
	
	
	//为确认筛选按钮绑定单击事件
	$(document).on("click",".saixuan_btn",function(){
		var startTime = $("#inputStartTime").val();
		var endTime = $("#inputEndTime").val();
		if(startTime == ""){
			alert("请输入开始时间");
		}else if(endTime == ""){
			alert("请输入结束时间");
		}else{
			console.log(startTime,endTime);
		}
	})
	
	//检测分页器的值变动事件函数
	$(".xiansuo_Page_Three").change(function(){
		var checkValue = $(this).val();
		$(".xiansuo_Pages").html(checkValue+"页");
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

	//为筛选的li元素绑定单击事件
	$(document).on("click", ".li_1", function() {
		var index = $(this).index();
		if(index == 1) {
			console.log(111);
			if($(this).hasClass("down")) {
				if($(this).hasClass("active")) {
					$(this).addClass("active").next().removeClass("active");
					console.log($(this).hasClass("active"));
					$(this).removeClass("down").addClass("up");
					console.log("蓝向上");
				} else {
					$(this).addClass("active").next().removeClass("active");
					console.log($(this).hasClass("active"));
					console.log("黑向下加蓝");
				}
			} else if($(this).hasClass("up")) {
				if($(this).hasClass("active")) {
					$(this).addClass("active").next().removeClass("active");
					console.log($(this).hasClass("active"));
					$(this).removeClass("up").addClass("down");
					console.log("蓝向下");
				} else {
					$(this).addClass("active").next().removeClass("active");
					console.log($(this).hasClass("active"));
					console.log("黑向上加蓝");
				}
			}
		}
		if(index == 2) {
			console.log(111);
			if($(this).hasClass("down")) {
				if($(this).hasClass("active")) {
					$(this).addClass("active").prev().removeClass("active");
					console.log($(this).hasClass("active"));
					$(this).removeClass("down").addClass("up");
					console.log("蓝向上");
				} else {
					$(this).addClass("active").prev().removeClass("active");
					console.log($(this).hasClass("active"));
					console.log("黑向下加蓝");
				}
			} else if($(this).hasClass("up")) {
				if($(this).hasClass("active")) {
					$(this).addClass("active").prev().removeClass("active");
					console.log($(this).hasClass("active"));
					$(this).removeClass("up").addClass("down");
					console.log("蓝向下");
				} else {
					$(this).addClass("active").prev().removeClass("active");
					console.log($(this).hasClass("active"));
					console.log("黑向上加蓝");
				}
			}
		}
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
	
	//为取消按钮绑定单击事件
	$(document).on("click",".de_cancel_13",function(){
		$(".delete-modal3").fadeOut();
	})
	
	//为确认按钮绑定单击事件
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
	
	//为加入推送按钮绑定单击事件
	$(document).on("click",".add-ts1",function(){
		var id = $(this).parents("li").attr("name");
		if($(this).find("p").html()=="取消推送"){
			console.log("取消推送");
			$(this).find("img").attr("src","../../Images/goods_icon_push_nor.png").siblings("p").html("加入推送").parents("li").attr("data-ts","false").find(".xiansuo_List_state").removeClass("yi_tuisong").html("");
			$(".sucuess-modal").fadeIn();
			setTimeout(function(){
				$(".sucuess-modal").fadeOut();
			},1500);
			console.log(id);
		}else{
			console.log("加入推送")
			$(this).find("img").attr("src","../../Images/goods_icon_push_pre.png").siblings("p").html("取消推送").parents("li").attr("data-ts","true").find(".xiansuo_List_state").addClass("yi_tuisong").html("已加入推送");
			$(".sucuess-modal").fadeIn();
			setTimeout(function(){
				$(".sucuess-modal").fadeOut();
			},1500);
			console.log(id);
		}
	})
	
	//为分享按钮绑定单击事件
	$(document).on("click",".share-1",function(){
		console.log("调用微信接口");
	})
	
	//为滑动箭头a元素绑定单击事件
	$(document).on("click",".click_sjbtn",function(){
		var str = "";
		var that = $(this);
		if($(this).hasClass("open")){
			$(this).removeClass("open").addClass("close").siblings(".slider_content1").stop(true,false).slideUp();
			setTimeout(function(){
				console.log(that);
				that.next().next().remove();
			},300);	
		}else{
			str+=`<div class="slider_content1">
					<div class="slider_content1_lf">
						<div>联系人：陈先生</div>
						<div>手<span class="pdlf-14"></span>机：13580546695</div>
						<div>电<span class="pdlf-14"></span>话：020-8678888</div>
						<div>邮<span class="pdlf-14"></span>箱：642307404@qq.com</div>
					</div>
					<div class="slider_content1_rt">
						<div>地<span style="padding-left: 28px;"></span>址： 陈先生</div>
						<div class="jiequ_str">线索描述：肯德基撒恐龙当家萨洛克的撒娇快乐的撒线索描述：肯德基撒恐龙当家萨洛克的撒娇快乐的撒线索描述：肯德基撒恐龙当家萨洛克</div>
						<div>创建时间：2017-09-13 18:15</div>
					</div>
				</div>`;
			$(this).next().after(str);
			$(this).removeClass("close").addClass("open").siblings(".slider_content1").stop(true,false).slideDown();
		}
	})
	
	//为推送日志图片绑定单击事件
	$(document).on("click",".ts-rizhi1",function(){
		$(".tsRz-modal").fadeIn();
	})
	
	//为推送日志X按钮绑定单击事件
	$(document).on("click",".tsRz-div_header_close",function(){
		$(".tsRz-modal").fadeOut();
	})
	
	//为推送日志图片绑定单击事件
	$(document).on("click",".edit-1",function(){
		$(".tsXq-modal").fadeIn();
	})
	
	//为编辑详情X按钮绑定单击事件
	$(document).on("click",".tsXq-div_header_close",function(){
		$(".tsXq-modal").fadeOut();
	})
	
	//为编辑详情单选项绑定单击事件
	$(document).on("click",".radius_cell",function(){
		var value1 = $(this).val();
		$(this).prop("checked", true).siblings().prop("checked", false);
	})
	
	//为编辑详情重置按钮绑定单击事件
	$(document).on("click",".btn_reset_1",function(){
		$('input:radio').prop('checked',false); 
		$("input:not('.radius_cell'),textarea").val("");
		$("select").val(0); 
		$("#editor").find("#ueditor_0").contents().find("body").empty();
		$("#edui1_iframeholder").css("height","500px");
	})
	
	//为编辑详情确认按钮绑定单击事件
	$(document).on("click",".btn_yes_1",function(){
		var msgType = $("input[type='radio']:checked").val();//消息类型
		var msgTitle = $(".msg_title").val();//消息标题
		var msgTitleL = $(".msg_level").val();//消息标题级别
		var KeyWord = $(".msg_keyWord").val();//关键词
		var hyVal = $(".select_hangye").val();//行业分类
		var brand = $(".msg_brand").val();//产品品牌
		var editHtml = $("#editor").find("#ueditor_0").contents().find("body").html();//获得富文本编辑器的html片段
		var UpImg = $(".up-img");//获取上传图片的元素
		var dieTime = $("#expiration_time").val();//过期时间
		var str = "";
		UpImg.each(function(){
			str +=$(this).attr("src")+",";
		})
		var src = str.substring(0,str.length-1);//获取图片路径
		var arg_name1 = $(".arg_name1").val();//获取自定义标签1
		var arg_name2 = $(".arg_name2").val();//获取自定义标签2
		var arg_name3 = $(".arg_name3").val();//获取自定义标签3
		var arg_val1 = $(".arg_val1").val();//获取自定义标签1的值
		var arg_val2 = $(".arg_val2").val();//获取自定义标签2的值
		var arg_val3 = $(".arg_val3").val();//获取自定义标签3的值
		var jl_count = $(".jl_count").val();//获取计量单位
		var pd_price = $(".pd_price").val();//获取产品价格
		var smm_count1 = $(".smm_count1").val();//获取最小起订量
		var pd_counts1 = $(".pd_counts1").val();//获取供货总量
		
		//判断用户输入的值
		if( msgType == "" || msgType == undefined){
			alert("请输入消息类型");
		}else if( msgTitle == "" || msgTitle == undefined){
			alert("请输入消息标题");
		}else if($(".msg_level").val()=="0"){
			alert("请选择消息级别");
		}else if( KeyWord == "" || KeyWord == undefined){
			alert("请输入关键词");
		}else if($(".select_hangye").val()=="0"){
			alert("请选择行业分类");
		}else{
			//发起ajax
			console.log(msgType,msgTitle,msgTitleL,KeyWord,hyVal,brand,editHtml,src,dieTime,arg_name1,arg_name2,arg_name3,arg_val1,arg_val2,arg_val3,jl_count,pd_price,smm_count1,pd_counts1);		
		}
	})
	
	//子复选框的事件函数
	$(document).on("click","input[name=checkedres]",function(){
		setSelectAll();
	})
})

//为兼容其他浏览器，则需要js解决，以下为封装的方法。
function wordlimit(cname,wordlength){
    var cname = $(".jiequ_str");//需要加省略符号的元素对象
//  console.log(111);
    for(var i=0;i<cname.length;i++){　　　　　　　　　　　
       var nowhtml=cname[i].innerHTML;//元素的内容
        var nowlength=cname[i].innerHTML.length;//元素文本的长度
        if(nowlength>wordlength){
            cname[i].innerHTML=nowhtml.substr(0,wordlength)+'...';//截取元素的文本的长度并加上省略号
            //console.log(cname[i].offsetWidth);
        }
    }
}

//定义获取高度方法
function getHeight() {
	var height = $(window).height();
	var TopH = 76 + 131;
	var cellH = (height - TopH) - 15;
	var FPageH = $(".xiansuo_Page_Div").height();
	$(".left_template,.right_template").height(height);
	$(".xiansuo_main").height(cellH+10);
	$(".xiansuo_List").height(cellH-FPageH);
	$(".tsXq-div_main").height(height-300);
}

//全选、反选的事件函数  
function selectAll() {
	console.log($("#checkall").prop("checked"));
	if($("#checkall").prop("checked")) {
		console.log("全选");
		$("input[type='checkbox'][name='checkedres']").prop("checked", true); //全选
	} else {
		console.log("反选");
		$("input[type='checkbox'][name='checkedres']").prop("checked", false); //反选     
	}
}

//子复选框的事件函数
function setSelectAll() {
	//当没有选中某个子复选框时，SelectAll取消选中  
	if(!$("input[type='checkbox'][name='checkedres']").checked) {
		console.log("不满足,取消全选");
		$("#checkall").prop("checked", false);
	}
	var chsub = $("input[type='checkbox'][name='checkedres']").length; //获取subcheck的个数  
	var checkedsub = $("input[type='checkbox'][name='checkedres']:checked").length; //获取选中的subcheck的个数  
	if(checkedsub == chsub) {
		console.log("满足,开启全选");
		$("#checkall").prop("checked", true);
	}
}