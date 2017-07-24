var intervalObj=window.setInterval(next,3000);/*使用setInterval循环执行next函数*/
var picArr=$("#picList li");
    $("#picList").css("width",picArr.length*335);
    function next(){
        $("#picList li:first-child").animate({
            marginLeft:"-335px"
        },1000,function(){
            var temp=$(this).clone();
            $(this).remove();
            temp.css({marginLeft:"0"});
            $("#picList").append(temp);
        });
    }
    /*鼠标滑过停止功能*/
    $("#container").mouseover(function(){
      window.clearInterval(intervalObj);
    });
    $("#container").mouseout(function(){
      intervalObj=window.setInterval(next,3000);
    })