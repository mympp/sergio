$(function () {
    (function ($) {
        $.fn.extend({
            sqCarousel: function () {
                this.each(function () {
                    var $carousel = $(this);
                    var ul = $carousel.find('ul');
                    var paddingRight = parseInt(ul.find('li').css('marginRight'));
                    var paddingLeft = parseInt(ul.find('li').css('marginLeft'));
                    var direction = 'left';
                    var scrolling = false;
                    var interval = null;
                    $carousel.find('.control-fl1').on('click',function(){
                        if(interval)
                            clearInterval(interval);
                        direction = 'left';
                        /*clearInterval(leftInterval);*/
                        scrollInterval();
                        scrollLeft();
                    });
                    $carousel.find('.control-fr1').on('click',function(){
                        if(interval)
                            clearInterval(interval);
                        direction = 'left';
                        scrollInterval();
                        scrollRight();
                    });

                    function scrollLeft() {
                        if(!scrolling) {
                            scrolling = true;
                            ul.find('li:first').clone().appendTo(ul);
                            ul.animate({left: -ul.find('li').width() - paddingRight-paddingLeft + 'px'}, 1500, function () {
                                ul.find('li:first').remove();
                                ul.css('left', 0);
                                scrolling = false;
                            });
                        }
                    }
                    function scrollRight() {
                        if(!scrolling) {
                            scrolling = true;
                            ul.find('li:last').clone().prependTo(ul);
                            ul.css('left', -ul.find('li').width() - paddingRight-paddingLeft  + 'px');

                            ul.animate({left: 0}, 1500, function () {
                                ul.find('li:last').remove();
                                scrolling = false;
                            });
                        }
                    }
                    function scrollInterval(){
                        interval = setInterval(function(){
                            if(direction == 'left'){
                                scrollLeft();
                            }
                            else{
                                scrollRight();
                            }
                        }, 3000);
                    }
                    scrollInterval();
                    ul.hover(function() {
                        if(interval)
                            clearInterval(interval);
                    },function() {
                        scrollInterval();
                    });
                });
            }
        })
    })(jQuery);
    $('.honor-wrap').sqCarousel();
    (function () {
        $('.ban-tit ul li').hover(function () {
            var act = $('.ban-tit ul li').index($(this));
            var num = ['0px','65px','128px','195px'];
            $('.bg').css('top',num[act]);
        });
    })();

    (function () {
        $('.tab-tit ul li').hover(function () {
            var act = $('.tab-tit ul li').index($(this));
            var num = ['url(image/bg1.jpg) no-repeat','url(../image/bg2.jpg) no-repeat','url(../image/bg3.jpg) no-repeat'];
            var num1 = ['0px','155px','310px'];
            $('.bg2').css({'background':num[act],'left':num1[act]});
        })

    })();
    sqLib.initTab($('.tab-tit'),$('.tab-content'));
    sqLib.initTab($('.brand-tab-tit'),$('.brand-tab-wrap'));
    sqLib.initTab($('.ban-tit'),$('.ban-content'));
});


/*返回顶部*/
$(function () {
    $(window).scroll(function () {
        var top = $(document).scrollTop();
        if (top > 670) {
            $('.backtop').fadeIn();
        } else {
            $('.backtop').fadeOut();
        };
    });

    $('.backtop').click(function () {
        $('body,html').animate({ scrollTop: 0 }, 200);
    });

    //去掉品牌聚焦中2、4、6[margin-right]样式
    var u = 0;
    $("#hot-read-lis").find("li").each(function () {
        u++;
        if (u % 2 == 0)
            $(this).css({ "margin-right": "0px" });
    });
});