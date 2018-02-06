/**
 * Created by sq on 15/10/23.
 */
var sqLib = (function() {
    //initialize tab
    //tab切换
    var initTab = function($tabCtrlContainer, $tabContent) {
        $tabCtrlContainer.children().find('li').hover(function() {
            var $this = $(this);
            var targetContentId = $this.attr('data-target');
            var $target = $('#' + targetContentId);
            $tabCtrlContainer.children().find('li').removeClass('act');
            $this.addClass('act');
            $tabContent.children().removeClass('current');
            $target.addClass('current');
        },function() {
        });
        $tabCtrlContainer.children().find('li').eq(0).trigger('hover');
    };
    return{
        initTab: initTab
    };
})();