$(function(){
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
   	
    //点击查看详情
    $(document).on("click",".chakan_lianxi1",function(){
        $(".modal-box").show();
    })
    
    //搜索按钮点击
    $(".search-btn").on("click",function(){
        //获取input框内容
        var inputtext = $(".search-input").val();
    })

    //各个按钮点击事件
    $(document).on("click",".bian",function(){
        $(".bj-kehu02>.bj-top>p").html('<p>编辑客户<span class="bj-top-span">&times;</span></p>');
        $(".modal-box-2").fadeIn();
        $(".bj-kehu02").fadeIn();
        $(".bj-kehu01").fadeOut();
        $(".bj-kehu03").fadeOut();
    })
    
    $(document).on("click",".fangqi",function(){
        $(".delete-modal").fadeIn();
    })
    
    $(document).on("click",".xz-lx",function(){
        $(".bj-kehu01>.bj-top>p").html('<p>新增联系人<span class="bj-top-span">&times;</span></p>');
        $(".modal-box-2").fadeIn();
        $(".bj-kehu01").fadeIn();
        $(".bj-kehu02").fadeOut();
        $(".bj-kehu03").fadeOut();
    })
    
    $(document).on("click",".xz-sj",function(){
        $(".modal-box-2").fadeIn();
        $(".bj-kehu03").fadeIn();
        $(".bj-kehu02").fadeOut();
        $(".bj-kehu01").fadeOut();
    })

    //为放弃按钮绑定单击事件
    $(document).on("click",".xiansuo_hdleft_btnlist",function(){
        if($(".xiansuo_List li").length == 0){
            return false;
        }

        if($("input[type='checkbox'][name='checkedres']:checked").length==0){
			return false;
		}

        $(".delete-modal1").fadeIn();
    })

    //为列表取消按钮绑定单击事件
    $(document).on("click",".de_cancel_11",function(){
        $(".delete-modal1").fadeOut();
    })

    //为列表确认按钮绑定单击事件
    $(document).on("click",".de_confirm_11",function(){
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
        $(".delete-modal1").fadeOut();
    })

    //子复选框的事件函数
    $(document).on("click","input[name=checkedres]",function(){
        setSelectAll();
    })

    $(window).resize(function(){
        getHeight();
    })
    //表单验证
    function check(){
        var kename = $(".kename").val();
        var ketel = $(".ketel").val();
        var keEmail = $(".keEmail").val();
        var lxEmail = $(".lxEmail").val();
        var lxren = $(".lxren").val();
        var numreg = /^1(3|4|5|7|8)\d{9}$/;
        var emailreg = /^[a-z0-9-_.]+@[\da-z][\.\w-]+\.[a-z]{2,4}$/i;
        if(kename =='' || ketel =='' ||keEmail =='') {
            $(".sucuess-modal-box02").fadeIn()
            setTimeout(function(){
                $(".sucuess-modal-box02").fadeOut();
            },1500);
        } else if(!numreg.test(ketel)) {
            alert("手机号码有误，请重填");
        }else if(!emailreg.test(keEmail)) {
            alert("你的邮箱有误，请重填");
        }else  {
            $(".sucuess-modal-box01").fadeIn()
            setTimeout(function(){
                $(".sucuess-modal-box01").fadeOut();
            },1500);
        }
    }
    function checklx(){
        var lxname = $(".lxname").val();
        var lxtel = $(".lxtel").val();
        var lxEmail = $(".lxEmail").val();
        var lxren = $(".lxren").val();
        var numreg = /^1(3|4|5|7|8)\d{9}$/;
        var emailreg = /^[a-z0-9-_.]+@[\da-z][\.\w-]+\.[a-z]{2,4}$/i;
        if(lxname =='' || lxtel =='' ||lxren =='') {
            $(".sucuess-modal-box02").fadeIn()
            setTimeout(function(){
                $(".sucuess-modal-box02").fadeOut();
            },1500);
        } else if(!numreg.test(lxtel)) {
            alert("手机号码有误，请重填");
        }else if($(".lxEmail").val().length !=0){
            if(!emailreg.test(lxEmail)) {
                alert("你的邮箱有误，请重填");
            }
        }
        else  {
            $(".sucuess-modal-box01").fadeIn()
            setTimeout(function(){
                $(".sucuess-modal-box01").fadeOut();
            },1500);
        }
    }
    //客户右边栏选项卡判断
    $(document).on("click",".TabDatailskehu>ul li",function(){
        var index = $(this).index();
        if(index==0){
            $(".xiansuo_des_content1").fadeOut();
            $(".shangji").fadeOut();
            $(".Contact").fadeOut();
            $(".TextDatails").fadeIn();
            $(".fangqi").fadeIn();
            $(".bian").fadeIn();
            $(".xz-lx").hide();
            $(".xz-sj").hide();
        }else if(index==1){
            $(".xiansuo_des_content1").fadeOut();
            $(".Contact").fadeOut();
            $(".TextDatails").fadeOut();
            $(".shangji").fadeIn();
            $(".fangqi").hide();
            $(".bian").hide();
            $(".xz-lx").hide();
            $(".xz-sj").fadeIn();
        }else if(index==2){
            $(".xiansuo_des_content1").fadeOut();
            $(".shangji").fadeOut();
            $(".TextDatails").fadeOut();
            $(".Contact").fadeIn();
            $(".bian").fadeIn();
            $(".fangqi").hide();
            $(".bian").hide();
            $(".xz-lx").fadeIn();
            $(".xz-sj").hide();
        }else if(index==3){
            $(".Contact").fadeOut();
            $(".bian").fadeOut();
            $(".shangji").fadeOut();
            $(".TextDatails").fadeOut();
            $(".xiansuo_des_content1").fadeIn();
            $(".fangqi").hide();
            $(".bian").hide();
            $(".xz-lx").hide();
            $(".xz-sj").hide();
        }
        console.log(index);
        console.log($(this));
        $(this).addClass("activeBottom").siblings().removeClass("activeBottom");
    })
    //拍卖右边选项卡判断
    $(document).on("click",".TabDatailspaimai>ul li",function(){
        var index = $(this).index();
        if(index==0){
            $(".xiansuo_des_content1").fadeOut();
            $(".shangji").fadeOut();
            $(".Contact").fadeOut();
            $(".TextDatails").fadeIn();
            $(".fangqi").fadeIn();
            $(".bian").fadeIn();
            $(".xz-lx").hide();
            $(".xz-sj").hide();
        }else if(index==1) {
            $(".xiansuo_des_content1").fadeOut();
            $(".shangji").fadeOut();
            $(".TextDatails").fadeOut();
            $(".Contact").fadeIn();
            $(".bian").fadeIn();
            $(".fangqi").hide();
            $(".bian").hide();
            $(".xz-lx").fadeIn();
            $(".xz-sj").hide();
        }
        console.log(index);
        console.log($(this));
        $(this).addClass("activeBottom").siblings().removeClass("activeBottom");
    })
    //点击首屏新增客户
    $(document).on("click",".xiansuo_hdright>.dingyue_cgMsgBtn02",function(){
        $(".bj-kehu02>.bj-top>p").html('<p>新增客户<span class="bj-top-span">&times;</span></p>');
        $(".modal-box-2").show();
        $(".bj-kehu02").show();
        $(".bj-kehu01").fadeOut();
        $(".bj-kehu03").fadeOut();
    })

//        新增联系人保存
    $(document).on("click",".bj-btn4",function(){
        checklx()
    })
//        编辑客户保存
    $(document).on("click",".bj-btn3",function(){
        check()
    })
    //新增商机保存
    $(document).on("click",".bj-btn5",function(){
        check()
    })
    //点击服务的发布按钮
    $(document).on("click",".add_newjilu",function(){
        var text = $(".New_fuwujilu").val();
        if(text == "") {
            alert("内容不能为空!")
            return false
        }

    })
    //点击服务的垃圾桶删除
    $(document).on("click",".fabu_jilu_delete",function(){
        $(this).parent().remove();
    })
    //放弃点击确认后
    $(document).on("click",".de_confirm_1",function(){
        $(".delete-modal").fadeOut();//发起ajax
        $(".sucuess-modal-box01").fadeIn();
        setTimeout(function(){
            $(".sucuess-modal").fadeOut();
        },1500);
    })
    //放弃点击取消后
    $(document).on("click",".de_cancel_1",function(){
        $(".delete-modal").hide()
    })
    //点击删除商机
    $(document).on("click",".shangji>ul li>i",function(){
        $(this).parent().remove();
    })
    //点击删除联系人
    $(document).on("click",".TextUL li>i",function(){
        $(this).parent().parent().remove();
    })
    $(document).on("click",".TextUL li>span",function(){

        $(".bj-kehu01>.bj-top>p").html('<p>修改联系人<span class="bj-top-span">&times;</span></p>');
        $(".modal-box-2").fadeIn();
        $(".bj-kehu01").fadeIn();
        $(".bj-kehu02").fadeOut();
        $(".bj-kehu03").fadeOut();
    })
//        点击关闭第一重模态框
    $(document).on("click",".close-X",function(){
        $(".modal-box").css({
            "display": "none"
        })
    })
    //点击取消和X关闭第二重模态框
    $(document).on("click",".bj-top-span,.bj-btn1",function(){
        var inputEmpty =$(".bj-center input");
        var textareaEmpty =$(".bj-center textarea");
        var optionEmpty =$(".bj-center select");
        optionEmpty.val(1)
        inputEmpty.val("");
        textareaEmpty.val("");
        $(".modal-box-2").css({
            "display": "none"
        })
        $(".bj-kehu01").css({
            "display": "none"
        })
        $(".bj-kehu02").css({
            "display": "none"
        })
        $(".bj-kehu03").css({
            "display": "none"
        })

    })

    //计算高度
    function getHeight() {
        var height = $(window).height();
        var TopH = 76+90;
        var TopH1 = 76+120;
        var cellH = (height-TopH)-15;
        var cellH2 = (height-TopH)-66-51-15;
        var cellH1 = (height-TopH1)-15;
        var FPageH = $(".xiansuo_Page_Div").height();
        $(".left_template,.right_template,.xiansuo_des").height(height);
        $(".xiansuo_main,.xiansuo_vessel").height(cellH);
        $(".gonghai_main,.xiansuo_vessel").height(cellH1);
        $(".modal-box").height(height);
        $(".modal-box-2").height(height);
        $(".xiansuo_List01").height(cellH-FPageH);
        $(".xiansuo_List02").height(cellH2-FPageH);
        $(".xiansuo_List03").height(cellH1-FPageH);
        if($("body").height()<795){
            $(".bj-kehu").height(height)
        }
        if(height<974){
            $(".paimai_des_content").height(height-330)
        }else {
            $(".paimai_des_content").height(630)
        }
    }
    
    //点击查看司法详情
    $(document).on("click",".sf-paimai",function(){
        $(".paimai_des_content_model").show();
    })
    
    //盒子内X关闭按钮跟随盒子滚动条滚动
    $(".paimai_des_content").on("scroll",function(){
        var h = $(".paimai_des_content").scrollTop();
        $(".close-paimai").css({
            "top":h
        })
    })
    //点击查看详情按妞页面的关闭按钮关闭操作
    $(document).on("click",".close-paimai",function(){
        $(".paimai_des_content_model").hide();
    })
    //联系人界面开始
    //点击首屏编辑ico按钮
    $(document).on("click",".Contact-BJ",function(){
        $(".modal-box").show()
    })

    $(document).on("click",".BianContact",function(){
        $(".bj-kehu01>.bj-top>p").html('<p>修改联系人<span class="bj-top-span">&times;</span></p>');
        $(".modal-box-2").fadeIn();
        $(".bj-kehu01").fadeIn();
    })
    $(document).on("click",".DeleteContact",function(){
        $(".delete-modal").fadeIn();
    })
    $(document).on("click",".de_confirm_112",function(){
        $(".modal-box").fadeOut();
    })
    $(document).on("click",".dingyue_cgMsgBtn01",function(){
        $(".bj-kehu01>.bj-top>p").html('<p>新增联系人<span class="bj-top-span">&times;</span></p>');
        $(".modal-box-2").fadeIn();
        $(".bj-kehu01").fadeIn();
    })
})

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
