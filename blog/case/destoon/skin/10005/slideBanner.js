var	num=$(".banner .bigBan li").length;
var	nNum=$(".bannerR .newPro .news li").length;
var smallNum=$(".banner .smallBan li").length;
var pageNum=Math.ceil(smallNum/3);
var i=0,t=0,n=0;
var liWidth=$(".banner .bigBan li").width();
$(function () {
    var doitDiv = '<div class="doit">'
    for (var j = 0; j < num; j++) {
        doitDiv += '<b></b>';
    }
    doitDiv += '</div>'
    $(".banner .bigBan").append(doitDiv);
    doitW = $(".doit").width();
    $(".doit").css("margin-left", -doitW / 2);
    $(".banner .bigBan b").eq(i).addClass("current");
    var myInterval = setInterval("moveAuto()", 4000);
    var myInterval2 = setInterval("moveAuto2()", 4000);
    $(".banner .doit b").click(function () {
        var bIndex = $(this).index();
        i = bIndex;
        $(".banner .bigBan ul").animate({ left: -liWidth * i }, 1000);
        $(".banner b").eq(i).addClass("current").siblings().removeClass("current");
    });
    /*smallBan*/
    var myTimeout1 = setTimeout(function () {
        myInterval1 = setInterval("moveAuto1()", 4000);
    }, 2000);
    if (!$(".smallBan").is(":animated")) {
        $(".banner .smallBan a.next").click(function () {
            if (t == pageNum - 2) {
                t++;
                $(".banner .smallBan ul").animate({ left: -liWidth * t }, 1000);
                $(".banner .smallBan a.next").css("backgroundColor", "#b8b7b7");
                $(".banner .smallBan a.prev").css("backgroundColor", "#000");
            } else if (t == pageNum - 1) {
                return false;
            } else {
                t++;
                $(".banner .smallBan ul").animate({ left: -liWidth * t }, 1000);
            }
            $(".banner .smallBan a.prev").css("backgroundColor", "#000");
        })
        $(".banner .smallBan a.prev").click(function () {
            if (t != 0 && t != 1) {
                t--;
                $(".banner .smallBan ul").animate({ left: -liWidth * t }, 1000);
                $(".banner .smallBan a.prev").css("backgroundColor", "#000");
                $(".banner .smallBan a.next").css("backgroundColor", "#000");
            } else if (t == 0) {
                return false;
            } else {
                t--;
                $(".banner .smallBan ul").animate({ left: 0 }, 1000);
                $(".banner .smallBan a.next").css("backgroundColor", "#000");
                $(".banner .smallBan a.prev").css("backgroundColor", "#b8b7b7");
            }
        })

    }

    $(".bigBan").mouseenter(function () {
        clearInterval(myInterval);
    });
    $(".smallBan").mouseenter(function () {
        clearTimeout(myTimeout1);
        clearInterval(myInterval1);
    });
    $(".bigBan,.smallBan").mouseout(function () {
        clearInterval(myInterval);
        clearTimeout(myTimeout1);
        clearInterval(myInterval1);
        myInterval = setInterval("moveAuto()", 4000);
        myTimeout1 = setTimeout(function () {
            myInterval1 = setInterval("moveAuto1()", 4000);
        }, 2000);
    });
})
function moveAuto(){
	i++;
	if(i>=num){
		$(".banner .bigBan ul").animate({left: 0},1000);
		$(".banner b").eq(0).addClass("current").siblings().removeClass("current");
		i=0;
	}else{
	$(".banner .bigBan ul").animate({left: -liWidth*i},1000);
	$(".banner b").eq(i).addClass("current").siblings().removeClass("current");
	}
}
/*smallBan*/
function moveAuto1(){
	//console.log("8888888888")
	t++;
	//console.log(t);
	if(t>=pageNum){
		$(".banner .smallBan ul").animate({left: 0},1000);
		t=0;
		$(".banner .smallBan a.prev").css("backgroundColor","#b8b7b7");
		$(".banner .smallBan a.next").css("backgroundColor","#000");
	}else if(t==pageNum-1){
		$(".banner .smallBan ul").animate({left: -liWidth*t},1000);
		$(".banner .smallBan a.next").css("backgroundColor","#b8b7b7");
	}else{
		$(".banner .smallBan ul").animate({left: -liWidth*t},1000);
		$(".banner .smallBan a.prev").css("backgroundColor","#000");
		$(".banner .smallBan a.next").css("backgroundColor","#000");
	}
}
function moveAuto2(){
	n++;
	if(n>=nNum-2){
		$(".bannerR .newPro .news ul").animate({top: 0},1000);
		n=0;
	}else{
	$(".bannerR .newPro .news ul").animate({top: -23*n},1000);
	}
}