/**
 * Created by Administrator on 2017/10/25 0025.
 */
$(function() {
    //发送请求
    loadDownFn()
    var state = true; //判断用户是否会员
    if(!state) {
        $(".vip-valid").hide();
    } else {
        $(".vip-valid").show();
    }

    //getHeight(); //动态设置高度
    //
    //$(window).resize(function(){
    //    getHeight();
    //})


    $(document).on("click",".gonghai_hdleft>ul li",function(){
            var indexL = $(this).index();
        console.log(indexL);
        if(indexL == 1){
            loadDownFn()

            $(".gonghai_hdleft>ul li:eq(0)").addClass("active").siblings().removeClass("active")
        }else if(indexL == 2){
            loadDownFn()
            $(".gonghai_hdleft>ul li:eq(1)").addClass("active").siblings().removeClass("active")
        }else if(indexL == 3){
            loadDownFn()
            $(".gonghai_hdleft>ul li:eq(2)").addClass("active").siblings().removeClass("active")
        }
    })
    $(document).on("click",".chakan_lianxi1",function(){
        $(".modal-box").show()
    })


    //阻止div事件冒泡到其他元素
    $(document).on("click", ".zdy_timer_div", function(e) {
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

    //子复选框的事件函数
    $(document).on("click","input[name=checkedres]",function(){
        setSelectAll();
    })


    //为恢复按钮绑定单击事件
    $(document).on("click",".huifu01",function(){


        if($(".xiansuo_List li").length == 0){
            return false;
        }
        if($("input[type='checkbox'][name='checkedres']:checked").length==0){
            return false;
        }
        $(".delete-modal").fadeIn();
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
    //为线索列表确认按钮绑定单击事件
    $(document).on("click",".de_confirm_110",function(){
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
        $(".delete-modal").fadeOut();
    })

})
////定义获取高度方法
//function getHeight() {
//    var height = $(window).height();
//    var TopH = 76+131;
//    var cellH = (height-TopH)-15;
//    //console.log(TopH,cellH);
//    $(".left_template,.right_template,.xiansuo_des").height(height);
//    $(".xiansuo_main,.xiansuo_vessel").height(cellH);
//}

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
//发送ajax请求
function loadDownFn() {
    var result = '';
    $.ajax({
        type: 'GET',
        url: '../../js/tsconfig.json',
        dataType: 'json',
        success: function(data) {
            console.log(data);
            var arrLen = data.keJson.length;
            console.log(arrLen);
            if(arrLen > 0 ) {
                for(var i = 0; i < arrLen; i++) {
                    result +=
                '<li name="555">'+
                        '<div class="xiansuo_List_no1">'+
                        '<label class="checkbox" onselectstart="return false;">'+
                        '<input type="checkbox" class="vam" name="checkedres" />'+
                        '<i></i>'+
                        '</label>'+
                        '<div class="xiansuo_List_title">'+data.keJson[i].khof+'</div>'+
                        '</div>'+
                        '<div class="xiansuo_List_dets">'+
                        '<div class="xiansuo_List_dets_lf">'+
                        '<div class="xiansuo_List_dets_div1">'+'联系人：'+'<span class="xiansuo_List_dets_span1">'+data.keJson[i].khname+'</span>'+'</div>'+
                        '<div class="xiansuo_List_dets_div1">'+'电&nbsp;&nbsp;&nbsp;话：'+'<span class="xiansuo_List_dets_span1">'+data.keJson[i].khtel+'</span>'+'</div>'+
                        '<div class="xiansuo_List_dets_div1">'+'地&nbsp;&nbsp;&nbsp;址：'+'<span class="xiansuo_List_dets_span1">'+data.keJson[i].khdz+'</span>'+'</div>'+
                        '</div>'+
                        '<div class="xiansuo_List_dets_rt">'+
                        '<div class="xiansuo_List_dets_div1">'+'客户级别：'+'<span class="xiansuo_List_dets_span1">'+data.keJson[i].khvip+'</span>'+'</div>'+
                        '<div class="xiansuo_List_dets_div1">'+'主营产品：'+'<span class="xiansuo_List_dets_span1">'+data.keJson[i].khcp+'</span>'+'</div>'+
                    '<div class="xiansuo_List_dets_div1">'+'商&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;机：'+'<span class="xiansuo_List_dets_span1">'+data.keJson[i].khsj+'</span>'+'</div>'+
                    '</div>'+
                    '<div class="chakan_lianxi1">'+
                        '<span class="ck-phone-val">查看详情</span>'+
                        '</div>'+
                        '</div>'+
                        '<div class="xiansuo_border"></div>'+
                        '<input type="hidden" value="13268036998" class="tel_val"/>'+
                        '<input type="hidden" value="642307404@qq.com" class="email_val"/>'+
                        '</li>'

                }
            }
            $('.xiansuo_List').append(result);
        }
    });
}