/**
 * Created by Administrator on 2017/10/24 0024.
 */
$(function(){
    getHeight(); //动态设置高度
    //点击查看详情
    $(".chakan_lianxi1").on("click",function(){
        $(".modal-box").show()
    })
    //搜索按钮点击
    $(".search-btn").on("click",function(){
        //获取input框内容
        var inputtext = $(".search-input").val();
    })

    //各个按钮点击事件
    $(".bian").on("click",function(){
        $(".bj-kehu02>.bj-top>p").text("编辑客户");
        $(".modal-box-2").fadeIn();
        $(".bj-kehu02").fadeIn();
        $(".bj-kehu01").fadeOut();
        $(".bj-kehu03").fadeOut();
    })
    $(".fangqi").on("click",function(){
        $(".delete-modal").fadeIn();
    })
    $(".xz-lx").on("click",function(){
        $(".bj-kehu01>.bj-top>p").text("新增联系人");
        $(".modal-box-2").fadeIn();
        $(".bj-kehu01").fadeIn();
        $(".bj-kehu02").fadeOut();
        $(".bj-kehu03").fadeOut();
    })
    $(".xz-sj").on("click",function(){
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
        $(".delete-modal1").fadeIn();
    })

    //为线索列表取消按钮绑定单击事件
    $(document).on("click",".de_cancel_11",function(){
        $(".delete-modal1").fadeOut();
    })

    //为线索列表确认按钮绑定单击事件
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
        var input1 = $(".input1").val();
        var input2 = $(".input2").val();
        var input3 = $(".input3").val();
        var input4 = $(".input4").val();
        var numreg = /^1(3|4|5|7|8)\d{9}$/;
        var emailreg = /^[a-z0-9-_.]+@[\da-z][\.\w-]+\.[a-z]{2,4}$/i;
        if(input1 =='' || input2 =='' ||input3 =='') {
            $(".sucuess-modal-box02").fadeIn()
            setTimeout(function(){
                $(".sucuess-modal-box02").fadeOut();
            },1500);
        } else if(!numreg.test(input3)) {
            alert("手机号码有误，请重填");
        }else if(!emailreg.test(input4)) {
            alert("你的邮箱有误，请重填");
        }else  {
            $(".sucuess-modal-box01").fadeIn()
            setTimeout(function(){
                $(".sucuess-modal-box01").fadeOut();
            },1500);
        }
    }

    $(document).on("click",".TabDatails>ul li",function(){
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
    //点击首屏新增客户
    $(".xiansuo_hdright>.dingyue_cgMsgBtn").on("click",function(){
        $(".bj-kehu02>.bj-top>p").text("新增客户");
        $(".modal-box-2").show();
        $(".bj-kehu02").show();
        $(".bj-kehu01").fadeOut();
        $(".bj-kehu03").fadeOut();
    })

//        新增联系人保存
    $(".bj-btn4").on("click",function(){
        check()
    })
//        编辑客户保存
    $(".bj-btn3").on("click",function(){
        check()
    })
    //新增商机保存
    $(".bj-btn5").on("click",function(){
        check()
    })
    //点击服务的发布按钮
    $(".add_newjilu").on("click",function(){
        var text = $(".New_fuwujilu").val();

    })
    //点击服务的垃圾桶删除
    $(".fabu_jilu_delete").on("click",function(){
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
    $(".shangji>ul li>i").on("click",function(){
        $(this).parent().remove();
    })
    //点击删除联系人
    $(".TextUL li>i").on("click",function(){
        $(this).parent().parent().remove();
    })
    $(".TextUL li>span").on("click",function(){

        $(".bj-kehu01>.bj-top>p").text("修改联系人");
        $(".modal-box-2").fadeIn();
        $(".bj-kehu01").fadeIn();
        $(".bj-kehu02").fadeOut();
        $(".bj-kehu03").fadeOut();
    })
//        点击关闭第一重模态框
    $(".close-X").on("click",function(){
        $(".modal-box").css({
            "display": "none"
        })
    })
    //点击取消和X关闭第二重模态框
    $(".bj-top>p>span,.bj-btn1").on("click",function(){
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
        var cellH = (height-TopH)-15;
        console.log(TopH,cellH);
        $(".left_template,.right_template,.xiansuo_des").height(height);
        $(".xiansuo_main,.xiansuo_vessel").height(cellH);
        $(".modal-box").height(height);
        $(".modal-box-2").height(height);

    }
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
