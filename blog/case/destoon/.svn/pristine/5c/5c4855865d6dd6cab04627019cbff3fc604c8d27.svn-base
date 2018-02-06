$(function () {
    //搜索
    $('.zx-sel').hover(function () {
        $('.zx-sel ul').css('display','block');
    },function () {
        $('.zx-sel ul').hide();
    });
    $('.zx-sel ul li').on('click', function () {
        $(this).parent('ul').hide();
        $('.zx-sel-lis').text($(this).text());
        $('#txtType').val(TypeID($(this).text().trim()));
    });

    $('.search-btn').on('click', function () {
        //var Type = $('.zx-sel-lis').html().trim();
        var key = $('.ser-input').val();
        if (key == "") {
            return false;
        }
    });

    function TypeID(Type) {
        switch (Type) {
            case '企业新闻':
                return 1;
                break;
            case '行业热读':
                return 2;
                break;
            //case '品牌资讯':
            //    return 3;
            //    break;
            //case '品牌聚焦':
            //    return 4;
            //    break;
            case '数据情报':
                return 5;
                break;
            case '行业透视':
                return 6;
                break;
            case '本网动态':
                return 7;
                break;
        }
    }

    //浏览器是否支持 placeholder
    $(function () {
        if (!placeholderSupport()) {   // 判断浏览器是否支持 placeholder
            $('[placeholder]').focus(function () {
                var input = $(this);
                if (input.val() == input.attr('placeholder')) {
                    input.val('');
                    input.removeClass('placeholder');
                }
            }).blur(function () {
                var input = $(this);
                if (input.val() == '' || input.val() == input.attr('placeholder')) {
                    input.addClass('placeholder');
                    input.val(input.attr('placeholder'));
                }
            }).blur();
        }
    });
    function placeholderSupport() {
        return 'placeholder' in document.createElement('input');
    }
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
});