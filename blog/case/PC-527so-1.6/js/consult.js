$(function(){
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
	
	//为左侧导航li绑定单击事件
	$(document).on("click",".userList_li",function() {
		var index = $(this).index();
		console.log(index);
		if(index == 0){
			location.href = "../CRM/index.html";
		}
		
		if(index == 1){
			location.href = "../CRM/xiansuo.html";
		}
		
		if(index == 2){
			location.href = "../CRM/kehu-admin.html";
		}
		
		if(index == 3){
			location.href = "../CRM/contact.html";
		}
		
		if(index == 4){
			location.href = "../CRM/gonghai.html";
		}
		
		if(index == 5) {
			$(".icon-shopping-div").slideToggle();
		}
		
		if(index == 7){
			location.href = "../consult/send.html";
		}
		
		if(index == 8){
			location.href = "../CRM/setup.html";
		}
		
		if(index == 9){
			location.href = "../CRM/feedback.html";
		}
		$(this).addClass("active").siblings().removeClass("active");
	})

	//为左侧导航商品的P段落绑定单击事件
	$(document).on("click", ".icon-shopping-div p", function(e) {
		var index = $(this).index();
		$(this).addClass("open").siblings().removeClass("open");
		if($(this).hasClass("open")) {
			if(index==0){
				location.href="../CRM/commodity-guanli.html";
			}
			if(index==1){
				location.href="../CRM/release-product.html";
			}
			$(this).parent().prev().addClass("active").siblings().removeClass("active");
		}
		e.stopPropagation();
	})
	
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
	
	//收件箱表格导航li切换
	$(".inbox-listnav li").click(function(){
		$(this).addClass("selected").siblings().removeClass("selected");
	})
	
	//子复选框的事件函数
	$(document).on("click","input[name=checkedres]",function(){
		setSelectAll();
	})
})

//定义获取高度方法
function getHeight() {
	var winH = $(window).height();
	var TopH = $(".left_header").height();
	var cellH = winH - TopH;
	$(".left_template,.right_template").height(winH);
	$(".consult-form").height(cellH-100);
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