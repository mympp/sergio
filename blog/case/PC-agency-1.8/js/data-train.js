/**
 * Created by Administrator on 2017/11/13 0013.
 */
$(window).on("load",function(){
    getHeight();//设置动态高度
    //console.log($(".icon-shopping").eq(1).text());
    //console.log(111);
    $(".table-content").scrollTop(1);
    if($(".table-content").scrollTop()>0){
        $(".table-head").css("paddingRight","17px");
    }


})

$(function(){
    //点击复制
    $(document).on("click",".CopyText",function(){
        $(".right_center>p>i").text("复制成功")
        $(".right_center>p>i").css({
            "fontSize": 18
        })
    })
    
    //判断搜索条件
    //点击搜索按钮
    $(document).on("click",".daili_searchBtn",function(){
        var dailiiphone = $(".daili-iphone").val();
        var dailiiname = $(".daili-name").val();
        if(dailiiphone == ""&&dailiiname == ""){
            $(".right_center>p>i").css({
                "fontSize": 13
            })
            $(".right_center>p>i").text("搜索条件不能为空")
            $(".right_center").fadeIn();
            setTimeout(function() {
                $(".right_center").fadeOut();
            }, 1000);
        }
        else {
            alert("发送请求");
        }
    })
    //关闭详情按妞
    $(document).on("click",".DataCenterBox-cols",function(){
        $(".data-model").hide()
    })
    //查看详情按钮
    $(document).on("click",".Click-Span",function(){
        $(".data-model").fadeIn()
    })
    //查看详情模态框
    var datalength = $(".DataTable-body").children().length;
        if(datalength>4){
             $(".DataTable-body .DataTable-haed:last-child").css({
                 border: 0
        })

    }
        if(datalength>5){
            $(".DataTable>.DataTable-haed span").css({
                "paddingRight": 25
            })
        }

    //点击清空按钮
    $(document).on("click",".daili_clearBtn",function(){
        $(".filtrate input").val('');
        $(".right_center>p>i").text("操作成功")
        $(".right_center>p>i").css({
            "fontSize": 18
        })
        $(".right_center").fadeIn();
        setTimeout(function() {
            $(".right_center").fadeOut();
        }, 1000);
        $(".laydate_box").hide();
    })

    $(window).resize(function(){
        var windowH = $(window).height();
//      window.location.href=window.location.href;
        if(windowH>600){
            getHeight();//设置动态高度
            //console.log("大于600 "+windowH);
        }
    });

    var start = {
        elem: '#inputStartTime',
        max: laydate.now(),
        choose: function(datas) {
            end.min = datas;
            end.start = datas;
        }
    };

    var end = {
        elem: '#inputEndTime',
        min: laydate.now()
    };

    //开始时间
    $('#inputStartTime').click(function() {
        laydate(start);
    });

    //结束时间
    $('#inputEndTime').click(function() {
        laydate(end);
    });
})

//定义获取高度方法
function getHeight() {
    var winH = $(window).height();
    var topH = $(".right_template").height();
    $(".left_template").height(winH);
    $(".messageCenter").height(winH - topH);
    var messH =$(".messageCenter").height()
    var pH = $(".messageCenter>p").outerHeight();
    var h2H = $(".messageCenter>h2").outerHeight();
    var tiaojianH = $(".tiaojian").outerHeight();
    var filtrateH = $(".filtrate").outerHeight();
    var searchBtnH = $(".daili_searchBtn").outerHeight();
    var tablehead = $(".table-head").outerHeight();
    var xiansuoDiv = $(".xiansuo_Page_Div").outerHeight();
    var allH = messH-(pH+h2H+tiaojianH+filtrateH+searchBtnH+tablehead+40+xiansuoDiv);
    $(".table-content").height(allH+20);
    $(".data-model").height(winH);

}