/*
	@Author HuangJianSheng
	根据手机屏幕大小动态设置默认字体大小
	依赖：jQuery 1.9+
*/
(function(window, document){
	/*
		由于在某些宿主环境中，顶层对象不一定是window对象
		为了提高设备兼容性，这里使用this关键字，它将总是指向顶层对象
	*/
	var _this = this;
    setRootFs();

    $(window).resize(function(event) {
        setRootFs();
    });

    function setRootFs () {
        /*JQuery(window)对象的Width()方法返回的数值会受到viewport参数的影响，
            从而返回一个不确定的数值；
            应该使用window.screen.width属性获取屏幕宽度
        */
        var vw = document.body.clientWidth;
        /*
            对照640设计稿，设置默认字体大小为20px;
            640/2 * 0.0625 = 20px
        */
        $('html').css('font-size', vw*0.0625 + 'px');
    }
}(window, document));
