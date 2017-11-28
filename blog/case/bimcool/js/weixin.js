$(function () {
    $(".contact-panel").on("mouseenter", function () {
        $("#tlzbmask").fadeIn(400);
        $("#tlzbmask").css({
            width: $(window).width(),
            height: $(window).height()
        });
        $(this).stop().animate({
            right: "0px"
        }, 800);

    }).on("mouseleave", function () {
        $("#tlzbmask").stop().fadeOut(800);
        $(this).stop().animate({
            right: "-130px"
        });

    });
});