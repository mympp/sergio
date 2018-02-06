// JavaScript Document

$(function () {

    $(".media-right-list li").hover(function () {                               
        $(this).find("div.person-title").slideToggle("fast");
        $(this).siblings("div.person-title").hide()
    });

    $(".jg-column > ul > li").hover(function () {                              
        $(".nav-yc").show("slow")
    });

    $(".seach-more-upload").click(function () {                               
        $(".seach-more-info").toggle("slow")
    });

    $(".guanbi").click(function () {                               
        $(".seach-more-info").hide("slow")
    });


    $(".seach-more-upload").click(function () {                               
        $(".seach-more-info").toggle("slow")
    });

    $(".guanbi").click(function () {                               
        $(".seach-more-info").hide("slow")
    });

    $(".index_top_list>ul> a li").hover(function () {
        $(this).children().stop(false, true);
        $(this).children(".pic1").animate({ right: -110 }, 400);
        $(this).children(".pic2").animate({ left: 59 }, 400);
        $(this).children(".txt1").animate({ left: -220 }, 400);
        $(this).children(".txt2").animate({ right: 0 }, 400);
    }, function () {
        $(this).children().stop(false, true);
        $(this).children(".pic1").animate({ right: 59 }, 400);
        $(this).children(".pic2").animate({ left: -110 }, 400);
        $(this).children(".txt1").animate({ left: 0 }, 400);
        $(this).children(".txt2").animate({ right: -220 }, 400);
    });

    $('.notice-dynamic-title span').hover(function () {
        $(this).addClass("li-hover").siblings().removeClass();
        $(".notice-dynamic-list > ul").hide().eq($('.notice-dynamic-title span').index(this)).show();
    });


    $('#by-tab span').hover(function () {
        $(this).addClass("li-hover").siblings().removeClass();
        $("#by-tab-list > ul").hide().eq($('#by-tab span').index(this)).show();
    });


    $('#shop-tab span').hover(function () {
        $(this).addClass("li-hover").siblings().removeClass();
        $("#shop-tab-list > ul").hide().eq($('#shop-tab span').index(this)).show();
    });

    $('#supply-tab span').hover(function () {
        $(this).addClass("li-hover").siblings().removeClass();
        $("#supply-list > ul").hide().eq($('#supply-tab span').index(this)).show();
        $("#supply-list > ul").eq($('#supply-tab span').index(this)).find("img").each(function () {
            DrawImg(this, 100, 85);
        })
    });

    $('#exhibition-tab span').hover(function () {
        $(this).addClass("li-hover").siblings().removeClass();
        $("#exhibition-tab-list > ul").hide().eq($('#exhibition-tab span').index(this)).show();
        $(".exhibition-left-top-list > ul").hide().eq($('#exhibition-tab span').index(this)).show();
    });


    $('#indsutry-midle-tab-top span').hover(function () {
        $(this).addClass("li-hover").siblings().removeClass();
        $("#indsutry-midle-list-top > ul").hide().eq($('#indsutry-midle-tab-top span').index(this)).show();
    });


    $('#indsutry-midle-tab-bottom span').hover(function () {
        $(this).addClass("li-hover").siblings().removeClass();
        $("#indsutry-midle-list-bottom > ul").hide().eq($('#indsutry-midle-tab-bottom span').index(this)).show();
    });
    $('#industry-right-tab-top span').hover(function () {
        $(this).addClass("li-hover").siblings().removeClass();
        $("#industry-right-list-top > ul").hide().eq($('#industry-right-tab-top span').index(this)).show();
    });


    $('#industry-right-tab-bottom span').hover(function () {
        $(this).addClass("li-hover").siblings().removeClass();
        $("#industry-right-list-bottom > ul").hide().eq($('#industry-right-tab-bottom span').index(this)).show();
    });


    $('#mq-tab span').hover(function () {
        $(this).addClass("li-hover").siblings().removeClass();
        $("#mq-tab-list > ul").hide().eq($('#mq-tab span').index(this)).show();
    });

    $('#sjrw-title span').hover(function () {
        $(this).addClass("span-hover").siblings().removeClass();
        $("#sjre-list > ul").hide().eq($('#sjrw-title span').index(this)).show();
        $("#sjrw-top > ul").hide().eq($('#sjrw-title span').index(this)).show();
    });

    $('#jgtg-title span').hover(function () {
        $(this).addClass("span-hover").siblings().removeClass();
        $("#jgtg-list > ul").hide().eq($('#jgtg-title span').index(this)).show();
        $("#jgtg-top > ul").hide().eq($('#jgtg-title span').index(this)).show();
    });


    $('#hydt-title span').hover(function () {
        $(this).addClass("span-hover").siblings().removeClass();
        $("#hydt-list > ul").hide().eq($('#hydt-title span').index(this)).show();
        $("#hydt-top > ul").hide().eq($('#hydt-title span').index(this)).show();
    });

    $('#gjbl-title span').hover(function () {
        $(this).addClass("span-hover").siblings().removeClass();
        $("#gjbl-list > ul").hide().eq($('#gjbl-title span').index(this)).show();
    });

    $('#zx-jg-title span').hover(function () {
        $(this).addClass("li-hover").siblings().removeClass();
        $("#zx-jg-list > ul").hide().eq($('#zx-jg-title span').index(this)).show();
    });

    $('#db-jt-title span').hover(function () {
        $(this).addClass("li-hover").siblings().removeClass();
        $("#db-jg-list > ul").hide().eq($('#db-jt-title span').index(this)).show();
    });

    $('.registered-login li').hover(function () {
        $('span', this).stop().animate({ 'top': '-39px' });
    }, function () {
        $('span', this).stop().animate({ 'top': '0px' });
    });

    $("#Shop").click(function () {                         
        location.href = "/about/member_serve.aspx";
    });
    $("#PurchaseAdd").click(function () {                              
        location.href = "http://miaoruyi.huamu.cn";
    });
    $(".right-list ul li:last-child").css("border-right", "none");

});
function DrawImg(pic, boxWidth, boxHeight) {
    var imgWidth = $(pic).width();

    var imgHeight = $(pic).height();

    if ((boxWidth / boxHeight) >= (imgWidth / imgHeight)) {

        $(pic).width((boxHeight * imgWidth) / imgHeight);

        $(pic).height(boxHeight);

        var margin = (boxWidth - $(pic).width()) / 2;

    }

    else {

        $(pic).width(boxWidth);

        $(pic).height((boxWidth * imgHeight) / imgWidth);

        var margin = (boxHeight - $(pic).height()) / 2;

        $(pic).css("margin-top", margin);

    }
}