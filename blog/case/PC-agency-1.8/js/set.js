$(function() {
	getHeight(); //设置动态高度

	$(window).resize(function() {
		getHeight(); //设置动态高度
	});

	// 表格鼠标悬停显示文字
	$("td,th").each(function(){
		this.onmouseover = function(){
	        this.title = this.innerHTML;
	    }
	})


	//系统设置页面
	//虚拟弹窗交互
	$(document).on("click", ".removeBtn", function() {
		$(".remove-box,.moni-box").fadeIn();
		getHeight(); //设置动态高度
	})

	//用户组
	$(document).on("click", ".addUser", function() {
		$(".user-main").hide();
		$(".add-user").fadeIn();
		getHeight(); //设置动态高度
	})

	$(document).on("click", ".userRedact", function() {
		$(".user-main").hide();
		$(".redact-user").fadeIn();
		getHeight(); //设置动态高度
	})

	//发布公告
	$(document).on("click", ".allClean", function() {
		var title = $(".consult-form input[type=text]").val();
		var editHtml = $("#editor").find("#ueditor_0").contents().find("body").html(); //获得富文本编辑器的html片段
		if(title == "" && editHtml == "<p><br></p>" && editHtml == "<p></p>") {
			error("公告标题或公告内容已经为空了。")
		} else {
			$(".send-clean,.moni-box").fadeIn();
			getHeight(); //设置动态高度
		}
	})

	//公告历史
	$(document).on("click", ".hisRedact", function() {
		$(".his-redact,.moni-box").fadeIn();
		getHeight(); //设置动态高度
	})

	$(document).on("click", ".hisDetails", function() {
		$(".his-details,.moni-box").fadeIn();
		getHeight(); //设置动态高度
	})

	//分成设置
	$(document).on("click", ".addDivide", function() {
		$(".add-divide0,.moni-box").fadeIn();
		getHeight(); //设置动态高度
	})
	$(document).on("click", ".divide-box1", function() {
		$(".add-divide1,.moni-box").fadeIn();
		getHeight(); //设置动态高度
	})
	$(document).on("click", ".divide-box2", function() {
		$(".add-divide2,.moni-box").fadeIn();
		getHeight(); //设置动态高度
	})
	$(document).on("click", ".divide-box3", function() {
		$(".add-divide3,.moni-box").fadeIn();
		getHeight(); //设置动态高度
	})
	$(document).on("click", ".divide-box4", function() {
		$(".add-divide4,.moni-box").fadeIn();
		getHeight(); //设置动态高度
	})
	$(document).on("click", ".divide-box5", function() {
		$(".add-divide5,.moni-box").fadeIn();
		getHeight(); //设置动态高度
	})
	$(document).on("click",".cleanAll1",function(){
		$(".add-divide1,.add-divide2,.add-divide3,.add-divide4,.add-divide5").fadeOut();
	})

	//关闭所有虚拟弹窗
	var allClean = $(".closeAll").parent().parent();
	$(document).on("click", ".closeAll,.cancel", function() {
		$(allClean).hide();
		$(".moni-box,.moni-lbox").fadeOut();
		$(".user-main").fadeIn();
		getHeight(); //设置动态高度
	})

	$(document).on("click", ".cleanAll,.cancel", function() {
		// $(allClean).fadeOut();
		$(".moni-box,.moni-lbox,.set-password-box").fadeOut();
	})

	//清空
	$(document).on("click", ".closesubmit", function() {
		$(".consult-form input[type=text]").val("");
		$(".moni-box,.send-clean").fadeOut();
		$("#editor").find("#ueditor_0").contents().find("body").empty();
		var editorHeight = $("#editor").height();
		$("#edui1_iframeholder").height(editorHeight - 33);
        success("操作成功");
	})
	
	// 新增用户编辑用户页面
	// 选择父选项全选子选项
	$(document).on("click", ".input-head", function() {
		$(this).each(function() {
			if($(this).prop("checked")) {
				//全选按钮选中
				$(this).parent().next().children().children().prop("checked", true);
			} else {
				//全选按钮没选中
				$(this).parent().next().children().children().prop("checked", false);
			}
		})
	})
	//子选项有打钩时父选项打钩，否则不打勾。
	$(".user-lbox").each(function(){
		var childInput = $(this).children(".lbox-right").children();
		var parentInput = $(this).children(".lbox-left").children("input");
		// $(childInput).click(function(){
		$(document).on("click",childInput,function(){
			var allLength = childInput.length; //所有子选项的长度
			var notChecked = childInput.children("input").not("input:checked").parent().length;//取得子选项中没选中的input长度
			// var notChecked1 = $("input:checkbox").not("input:checked").length ;//获取未被选择的checkbox
			if (notChecked == allLength) {
				parentInput.prop("checked", false);
			} else {
				parentInput.prop("checked", true);
			}
		})
	})
})

//定义获取高度方法
function getHeight() {
	var winH = $(window).height();
	var topH = $(".left_header").height();
	var editorHeight = $("#editor").height();
	$(".left_template").height(winH);
	$(".outer_div").height(winH);
	$(".page-set").height(winH - 162);
	$(".white-bg").height(winH - 112);
	$(".set-send").height(winH - 140);
	$(".editor-box").height(winH - 430);
	$(".user-bbox").height(winH - 256);
	$("#edui1_iframeholder").height(editorHeight - 33);
	$(".set-password-box").height(winH - 70);
	//console.log(winH-topH);
	//表格内容高度
	$(".table-content1").height(winH - 275);
    //虚拟弹窗高度超出屏幕高度时滚动
    var fatherH = $(".scroHide-father").height();
    var mainH = winH-100;
    if (fatherH >= winH) {
    	$(".page-set .moni-lbox.add-divide").css({"margin-top":"0"});
        $(".scroHide-father").css({"height":winH});
        $(".scroHide").css({"height":mainH,"overflow":"auto","overflow-x":"hidden"});
        $(".scroHide.moni-lbox-agent,.scroHide.add-admin").css({"width":"830px","height":winH,"overflow":"auto","overflow-x":"hidden"});
    }
}
//操作提示框
function success(text){
	 $(document.body).append('<div class="sucuess-modal"><div class="sucuess-modal-cell"><img src="../Images/common_icon_success01_nor.png" alt="" /><p class="is_state1">'+text+'</p></div></div>');
	 $(".sucuess-modal").fadeIn();
	 setTimeout(function(){
	 	$(".sucuess-modal").remove();	
    },1500);
}

function error(text){
	$(document.body).append('<div class="sucuess-modal" style="z-index:9999999"><div class="sucuess-modal-cell"><img src="../Images/common_icon_x_nor@2x.png" alt="" /><p class="is_state1">'+text+'</p></div></div>');
	$(".sucuess-modal").fadeIn();
	setTimeout(function(){
		$(".sucuess-modal").remove();	
	},1500);
}

function message(text){

	$(document.body).append('<div class="sucuess-modal style="z-index:9999999"><div class="sucuess-modal-cell"><img src="../Images/common_icon_gantan_nor@2x.png" alt="" /><p class="is_state1">'+text+'</p></div></div>');
	$(".sucuess-modal").fadeIn();
	setTimeout(function(){
		$(".sucuess-modal").remove();	
	},1500);
}

function ajax_message(type){
	$(document.body).append('<div class="ajax_loadModal"><div class="ajax_load_img"><img src="/Public/Home/1.6/Images/load-1.gif" alt="" /></div></div>');
	if(type=='show'){
		$(".ajax_loadModal").fadeIn();
	}else{
		$(".ajax_loadModal").remove();
	}
}
    //密码输入框显示提示文字
    $(document).on("focus",".input-showPwd",function(){
        var text_value=$(this).val();
        if(text_value == this.defaultValue){
            $('.input-showPwd').hide();
            $('.input-password').show().focus();
        }
    });
    $(document).on("blur",".input-password",function(){
        var text_value = $(this).val();
        if(text_value==""){
            $('.input-showPwd').show();
            $('.input-password').hide();
        }
    });