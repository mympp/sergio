	//动态获取高度
    $(function(){
        $(window).on("load",function(){
            getHeight();//设置动态高度
        })
        
        $(window).resize(function(){
            getHeight();//设置动态高度
        });
    })
  
    //定义获取高度方法
    function getHeight(){
        var winH = $(window).height();
        var topH = $(".left_header").height();
        var editorHeight = $("#editor").height();
        $(".left_template").height(winH);
        $(".outer_div").height(winH);
        $(".page-set").height(winH-162);
        $(".white-bg").height(winH-112);
        $(".set-send").height(winH-140);
        $(".editor-box").height(winH-430);
        $(".user-bbox").height(winH-256);
        $("#edui1_iframeholder").height(editorHeight-33);
        $(".set-password-box").height(winH-70);
        //console.log(winH-topH);
        //表格内容高度
        $(".table-content1").height(winH-275);
        //虚拟弹窗高度超出屏幕高度时滚动
        var mainH = $(".moni-main").height();
        if (mainH >= winH) {
            // $(".moni-main").height(winH);
            $(".moni-lbox").css({"height":winH,"overflow":"auto","overflow-x":"hidden"});
        }
        
    }
/*
系统设置页面
 */  
    $(function(){
        // 虚拟弹窗交互
        $(document).on("click",".removeBtn",function(){
            $(".remove-box,.moni-box").fadeIn();
        })
        // 用户组
        $(document).on("click",".addUser",function(){
        	$(".user-main").hide();
        	$(".add-user").fadeIn();
        })
        $(document).on("click",".userRedact",function(){
            $(".user-main").hide();
            $(".redact-user").fadeIn();
        })
        // 发布公告
        $(document).on("click",".allClean",function(){
            var title = $(".consult-form input[type=text]").val();
            var editHtml = $("#editor").find("#ueditor_0").contents().find("body").html();//获得富文本编辑器的html片段
            if (title == "" && editHtml == "<p><br></p>" && editHtml == "<p></p>") {
                alert("公告标题或公告内容已经为空了。")
            } else {
            	$(".send-clean,.moni-box").fadeIn();
            }
        })
        //公告历史
        $(document).on("click",".hisRedact",function(){
            $(".his-redact,.moni-box").fadeIn();
        })
        $(document).on("click",".hisDetails",function(){
            $(".his-details,.moni-box").fadeIn();
        })
        
        //分成设置
        $(document).on("click",".addDivide",function(){
            $(".add-divide,.moni-box").fadeIn();
        })
        
        //关闭所有虚拟弹窗
        var allClean = $(".closeAll").parent().parent();
        $(document).on("click",".closeAll,.cancel",function(){
            $(allClean).hide();
            $(".moni-box,.moni-lbox").fadeOut();
            $(".user-main").fadeIn();
        })
        $(document).on("click",".cleanAll,.cancel",function(){
            // $(allClean).fadeOut();
            $(".moni-box,.moni-lbox").fadeOut();
        })
        //清空
        $(document).on("click",".closesubmit",function(){
            $(".consult-form input[type=text]").val("");
            $(".moni-box,.send-clean").fadeOut();
            $("#editor").find("#ueditor_0").contents().find("body").empty();//
            var editorHeight = $("#editor").height();
            $("#edui1_iframeholder").height(editorHeight-33);
        })
    })
    
/*
新增用户编辑用户页面
 */
    //选择父选项全选子选项
    $(document).on("click",".input-head",function(){
        $(this).each(function(){
            if ($(this).prop("checked")) {
                //全选按钮选中
                $(this).parent().next().children().children().prop("checked",true);
            } else {
                //全选按钮没选中
                $(this).parent().next().children().children().prop("checked",false);
            }
        })
    })
    //子选项打钩的情况下父选项必须打钩。
    $(function(){
        var inputChild = $(".input-head").parent().next().children().children();
        $(inputChild).each(function(){
            $(this).click(function(){
                var inputParent = $(this).parent().parent().prev().children();
                if ($(inputParent).prop("checked") == false) {
                    $(inputParent).prop("checked",true);
                }
                // 子选项为空时父选项也应该为空
                var talaobiao = $(this).parent().siblings().children();
                var taxiongdi = $(this).siblings("input");
                var taziji = $(this);
                var tayeye = $(this).parent().parent().prev().children();
                if(talaobiao.prop("checked") == false && $(taxiongdi).prop("checked") == false && $(taziji).prop("checked") == false){
                    $(tayeye).prop("checked",false);
                }
            })
        })
    })