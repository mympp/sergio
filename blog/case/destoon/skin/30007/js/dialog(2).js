var dlg_def_width = 264;
var dlg_def_height = 157;
var dlg_def_enter = new Image();
var dlg_def_cancel = new Image();
var dlg_def_wait = new Image();
dlg_def_enter.src = "/images/dlg_enter.gif";
dlg_def_cancel.src = "/images/dlg_cancel.gif";
dlg_def_wait.src = "/images/loading.gif";
var dlg_time_out;
dw('<div id="dlg_back" style="position:absolute;top:0px;left:0px;background:#000;-moz-opacity:0.3;filter:Alpha(Opacity = 30);opacity:0.3;z-index:10900;">\
</div>');
dw('\
<div id="dlg" style="border:#E4E9EF 3px solid;background:#FFF;width:' + dlg_def_width + 'px;height:' + dlg_def_height + 'px;position:absolute;overflow:hidden;display:none;z-index:10999;">\
	<iframe style="width:100%;height:100%;position:absolute;top:0px;left:0px;" frameborder="0" scrolling="auto" src="/js/dialog_top.htm"></iframe>\
	<div id="dlg_zone" style="width:100%;height:100%;position:absolute;top:0px;left:0px;display:none;">\
		<div id="dlg_title" style="height:23px;font-size:12px;width:100px;color:#013298;padding-left:15px;padding-top:5px;text-align:left;">信息提示！</div>\
		<div id="dlg_string" style="width:170px;height:50px;font-size:12px;margin:20px auto;line-height:150%;"></div>\
		<div id="dlg_button" style="width:200px;height:30px;text-align:center;margin:20px auto;"></div>\
	</div>\
	<div id="dlg_html" style="width:100%;height:95%;margin-top:25px;margin-left:1px;position:absolute;display:none;">\
	</div>\
	<div style="border:1px #FFF solid;">\
		<div style="height:23px;border:1px #9AC2F5 solid;text-align:left;background:url(/images/dlg_title_bg.gif) repeat-x;overflow:hidden;"><img src="/images/dlg_title_bg2.gif" /></div>\
	</div>\
	<div id="dlg_move" onmousedown="dialog.dlg_move(event);" style="width:80px;height:23px;position:absolute;top:0px;right:30px;cursor:move;">&nbsp;</div>\
	<div style="width:16px;height:16px;position:absolute;top:5px;right:10px;"><input type="image" src="/images/dlg_close.gif" onclick="dialog.reset();" /></div>\
	<div id="dlg_move_back" style="position:absolute;top:0px;left:0px;width:100%;height:100%;background:#FFF;-moz-opacity:0;opacity:0;filter:Alpha(Opacity = 0);display:none;"></div>\
</div>\
');
dw('<div id="dlg_wait" onselectstart="return false" style="position:absolute;top:0px;left:0px;width:' + dlg_def_wait.width + 'px;height:' + dlg_def_wait.height + 'px;display:none;z-index:91;"><img src="' + dlg_def_wait.src + '" border="0" alt="" /></div>');
dw('<div id="dlg_load" onselectstart="return false" style="position:absolute;top:0px;left:0px;width:16px;height:16px;display:none;z-index:92;"><object classid="clsid:D27CDB6E-AE6D-11cf-96B8-444553540000" codebase="http://download.macromedia.com/pub/shockwave/cabs/flash/swflash.cab#version=7,0,19,0" width="16" height="16"><param name="wmode" value="transparent" /><param name="movie" value="/images/loading.swf" /><param name="quality" value="high" /><embed src="/images/loading.swf" quality="high" pluginspage="http://www.macromedia.com/go/getflashplayer" type="application/x-shockwave-flash" wmode="transparent" width="16" height="16"></embed></object></div>');
//叠加层
dw('\
<div id="dlg2" style="border:#E4E9EF 3px solid;background:#FFF;width:' + dlg_def_width + 'px;height:' + dlg_def_height + 'px;position:absolute;overflow:hidden;display:none;z-index:101001;">\
	<iframe style="width:100%;height:100%;position:absolute;top:0px;left:0px;" frameborder="0" scrolling="auto" src="/js/dialog_top.htm"></iframe>\
	<div id="dlg_zone2" style="width:100%;height:100%;position:absolute;top:0px;left:0px;display:none;">\
		<div id="dlg_title2" style="height:23px;font-size:12px;width:100px;color:#013298;padding-left:15px;padding-top:5px;text-align:left;">信息提示！</div>\
		<div id="dlg_string2" style="width:170px;height:50px;font-size:12px;margin:20px auto;line-height:150%;"></div>\
		<div id="dlg_button2" style="width:200px;height:30px;text-align:center;margin:20px auto;"></div>\
	</div>\
	<div style="border:1px #FFF solid;">\
	<div style="height:23px;border:1px #9AC2F5 solid;text-align:left;background:url(/images/dlg_title_bg.gif) repeat-x;overflow:hidden;"><img src="/images/dlg_title_bg2.gif" /></div>\
	</div>\
	<div id="dlg_move2"  style="width:80px;height:23px;position:absolute;top:0px;right:30px;">&nbsp;</div>\
	<div style="width:16px;height:16px;position:absolute;top:5px;right:10px;"><input type="image" src="/images/dlg_close.gif" onclick="dialog.reset2();" /></div>\
	<div id="dlg_move_back2" style="position:absolute;top:0px;left:0px;width:100%;height:100%;background:#FFF;-moz-opacity:0;opacity:0;filter:Alpha(Opacity = 0);display:none;"></div>\
</div>\
');

dw('\
<div id="dlg33" style="width:' + dlg_def_width + 'px;height:' + dlg_def_height + 'px;position:absolute;overflow:hidden;display:none;z-index:10999;">\
	<div id="dlg_zone33" style="width:100%;height:100%;position:absolute;top:0px;left:0px;display:none;">\
		<div id="dlg_title33" style="height:23px;font-size:12px;width:100px;color:#013298;padding-left:15px;padding-top:0px;text-align:left;">信息提示！</div>\
		<div id="dlg_string33" style="width:170px;height:50px;font-size:12px;margin:20px auto;line-height:150%;"></div>\
		<div id="dlg_button33" style="width:200px;height:30px;text-align:center;margin:20px auto;"></div>\
	</div>\
	<div id="dlg_html33" style="width:100%;height:95%;margin-top:0px;margin-left:0px;position:absolute;display:none;">\
	</div>\
	<div id="dlg_move33" onmousedown="dialog.dlg_move33(event);" style="width:80px;height:23px;position:absolute;top:0px;right:30px;cursor:move;">&nbsp;</div>\
	<div id="dlg_move_back33" style="position:absolute;top:0px;left:0px;width:100%;height:100%;background:#FFF;-moz-opacity:0;opacity:0;filter:Alpha(Opacity = 0);display:none;"></div>\
</div>\
');

var dialog = new Object();
dialog.__FUNC;
dialog.alert = function (str, func, bkgrd, full) {	//对话框字符串；执行语句；是否全屏;是否带透明背景
    if (isNull(func)) {
        func = "";
    }
    dialog.__FUNC = "dialog.reset();" + func;
    var but = '<input type="image" src="' + dlg_def_enter.src + '" onclick="eval(dialog.__FUNC)" width="56" height="21" alt="确定" />';
    document.getElementById("dlg").style.display = "";
    document.getElementById("dlg_zone").style.display = "";
    document.getElementById("dlg_string").innerHTML = str;
    document.getElementById("dlg_button").innerHTML = but;
    dialog.dlg_make(document.getElementById("dlg"), full, bkgrd);
}
//添加叠加层
dialog.reset2 = function () {
    //isLogin();
    clearTimeout(dlg_time_out);
    document.getElementById("dlg_move_back2").style.display = "none";
    document.getElementById("dlg2").style.width = dlg_def_width + "px";
    document.getElementById("dlg2").style.height = dlg_def_height + "px";
    document.getElementById("dlg_title2").innerHTML = "信息提示！";
    document.getElementById("dlg_zone2").style.display = "none";
    document.getElementById("dlg2").style.display = "none";
    document.getElementById("dlg_back").style.zIndex = 900;
    document.getElementById("dlg_back").style.display = "none";
}
dialog.alert2 = function (str, func, bkgrd, full) {
    if (isNull(func)) {
        func = "";
    }
    dialog.__FUNC = "dialog.reset2();" + func;
    var but = '<input type="image" src="' + dlg_def_enter.src + '" onclick="eval(dialog.__FUNC)" width="56" height="21" alt="确定" />';
    document.getElementById("dlg2").style.display = "";
    document.getElementById("dlg_zone2").style.display = "";
    document.getElementById("dlg_string2").innerHTML = str;
    document.getElementById("dlg_button2").innerHTML = but;
    dialog.dlg_make(document.getElementById("dlg2"), full, bkgrd);
    document.getElementById("dlg_back").style.zIndex = 1000;
}
//

//yaofeng 新版留言无框头
dialog.alert33 = function (str, func, bkgrd, full) {	//对话框字符串；执行语句；是否全屏;是否带透明背景
    if (isNull(func)) {
        func = "";
    }
    dialog.__FUNC = "dialog.reset33();" + func;
    var but = '<input type="image" src="' + dlg_def_enter.src + '" onclick="eval(dialog.__FUNC)" width="56" height="21" alt="确定" />';
    document.getElementById("dlg33").style.display = "";
    document.getElementById("dlg_zone33").style.display = "";
    document.getElementById("dlg_string33").innerHTML = str;
    document.getElementById("dlg_button33").innerHTML = but;
    dialog.dlg_make(document.getElementById("dlg33"), full, bkgrd);
}
dialog.alert123 = function (str, func, bkgrd, full) {	//对话框字符串；执行语句；是否全屏;是否带透明背景
    if (isNull(func)) {
        func = "";
    }
    dialog.__FUNC = "parent.dialog.reset33();" + func;
    var but = '<input type="image" src="' + dlg_def_enter.src + '" onclick="eval(dialog.__FUNC)" width="56" height="21" alt="确定" />';
    document.getElementById("dlg").style.display = "";
    document.getElementById("dlg_zone").style.display = "";
    document.getElementById("dlg_string").innerHTML = str;
    document.getElementById("dlg_button").innerHTML = but;
    dialog.dlg_make(document.getElementById("dlg"), full, bkgrd);
}
dialog.reset33 = function () {
    clearTimeout(dlg_time_out);
    document.getElementById("dlg_move_back33").style.display = "none";
    document.getElementById("dlg33").style.width = dlg_def_width + "px";
    document.getElementById("dlg33").style.height = dlg_def_height + "px";
    document.getElementById("dlg_html33").innerHTML = "";
    document.getElementById("dlg_title33").innerHTML = "信息提示！";
    document.getElementById("dlg_back").style.display = "none";
    document.getElementById("dlg_zone33").style.display = "none";
    document.getElementById("dlg_html33").style.display = "none";
    document.getElementById("dlg_wait").style.display = "none";
    document.getElementById("dlg_load").style.display = "none";
    document.getElementById("dlg33").style.display = "none";
}
dialog.iframe33 = function (sUrl, sWidth, sHeight, bkgrd, sScroll, full) {
    if (isNull(sScroll)) {
        sScroll = "no";
    }
    var s = '<iframe width="100%" height="100%" scrolling="' + sScroll + '" src="' + sUrl + '" frameborder="0"  allowtransparency="true"></iframe>';
    dialog.html33(s, sWidth, sHeight, bkgrd, full)
}
dialog.html33 = function (str, sWidth, sHeight, bkgrd, full) {
    dialog.reset33();
    document.getElementById("dlg33").style.display = "";
    if (!isNull(sWidth)) {
        document.getElementById("dlg33").style.width = sWidth + "px";
    }
    if (!isNull(sHeight)) {
        document.getElementById("dlg33").style.height = sHeight + "px";
    }
    document.getElementById("dlg_move33").style.width = parseInt(document.getElementById("dlg33").style.width) - 184 + "px";
    document.getElementById("dlg_html33").style.display = "";
    document.getElementById("dlg_html33").innerHTML = str;
    dialog.dlg_make(document.getElementById("dlg33"), full, bkgrd);
}
dialog.dlg_move33 = function (evt) {
    if (!evt) evt = window.event;
    var mLeft = evt.clientX - parseInt(document.getElementById("dlg33").style.left);
    var mTop = evt.clientY - parseInt(document.getElementById("dlg33").style.top);
    document.onmousemove = function () {
        document.getElementById("dlg_move_back33").style.display = "";
        evt = arguments[0] ? arguments[0] : window.event;
        document.getElementById("dlg33").style.left = evt.clientX - mLeft + "px";
        document.getElementById("dlg33").style.top = evt.clientY - mTop + "px";
    };
    document.onmouseup = function () {
        document.getElementById("dlg_move_back33").style.display = "none";
        document.onmouseup = null;
        document.onmousemove = null;
    };
}
//yaofeng end
dialog.confirm = function (str, func, bkgrd, full) {
    if (isNull(func)) {
        func = "";
    }
    dialog.__FUNC = "dialog.reset();" + func;
    var but = '<input type="image" src="' + dlg_def_enter.src + '" onclick="eval(dialog.__FUNC)" width="56" height="21" alt="确定" /> <input type="image" src="' + dlg_def_cancel.src + '" onclick="dialog.reset();" width="56" height="21" alt="取消" />';
    document.getElementById("dlg").style.display = "";
    document.getElementById("dlg_zone").style.display = "";
    document.getElementById("dlg_string").innerHTML = str;
    document.getElementById("dlg_button").innerHTML = but;
    dialog.dlg_make(document.getElementById("dlg"), full, bkgrd);
}
dialog.iframe = function (sUrl, sWidth, sHeight, bkgrd, sScroll, full) {
    if (isNull(sScroll)) {
        sScroll = "no";
    }
    var s = '<iframe width="100%" height="100%" scrolling="' + sScroll + '" src="' + sUrl + '" frameborder="0"  allowtransparency="true"></iframe>';
    dialog.html(s, sWidth, sHeight, bkgrd, full)
}
dialog.html = function (str, sWidth, sHeight, bkgrd, full) {
    reset();
    document.getElementById("dlg").style.display = "";
    if (!isNull(sWidth)) {
        document.getElementById("dlg").style.width = sWidth + "px";
    }
    if (!isNull(sHeight)) {
        document.getElementById("dlg").style.height = sHeight + "px";
    }
    document.getElementById("dlg_move").style.width = parseInt(document.getElementById("dlg").style.width) - 184 + "px";
    document.getElementById("dlg_html").style.display = "";
    document.getElementById("dlg_html").innerHTML = str;
    dialog.dlg_make(document.getElementById("dlg"), full, bkgrd);
}
dialog.resize = function (w, h, obj) {
    var obj = isNull(obj) ? document.getElementById("dlg") : obj;
    if (obj.style.display == "none") {
        return;
    }
    if (isNull(w)) {
        w = parseInt(obj.style.width);
    }
    if (isNull(h)) {
        h = parseInt(obj.style.height);
    }
    obj.style.width = w + "px";
    obj.style.height = h + "px";
    var sDcument = document.documentElement ? document.documentElement : document.body;
    with (sDcument) {
        var scrtop = 0;
        if (navigator.userAgent.toLowerCase().match(/chrome/))//判断是否谷歌浏览器 20120515 yaofeng
            scrtop = document.body.scrollTop;
        else
            scrtop = scrollTop;

        if (h > clientHeight)
            obj.style.top = clientHeight / 2 - h / 2 + scrtop + h - clientHeight + "px";
        else
            obj.style.top = clientHeight / 2 - h / 2 + scrtop + "px";
        obj.style.left = clientWidth / 2 - w / 2 + scrollLeft + "px";
    }
}
dialog.wait = function (_timeout_str) {
    document.getElementById("dlg_wait").style.display = "";
    dialog.dlg_make(document.getElementById("dlg_wait"), false, true);
    _timeout_str = isNull(_timeout_str) ? "连接超时，请重试！" : _timeout_str;
    dlg_time_out = setTimeout(function () {
        dialog.reset();
        dialog.alert(_timeout_str);
    }, 20000);
}
dialog.load = function (_timeout_str) {
    document.getElementById("dlg_load").style.display = "";
    dialog.dlg_make(document.getElementById("dlg_load"), false, true);
    _timeout_str = isNull(_timeout_str) ? "连接超时，请重试！" : _timeout_str;
    dlg_time_out = setTimeout(function () {
        dialog.reset();
        dialog.alert(_timeout_str);
    }, 20000);
}
dialog.title = function (tit) {
    document.getElementById("dlg_title").innerHTML = tit;
}
dialog.dlg_make = function (obj, full, bkgrd) {
    var sDcument = document.documentElement ? document.documentElement : document.body;
    with (sDcument) {
        if (full) {
            obj.style.width = clientWidth + "px";
            obj.style.height = clientHeight + "px";
            obj.style.top = "-3px";
            obj.style.left = "-3px";
        }
        else {
            dialog.resize(null, null, obj);
        }
        if (isNull(bkgrd) || bkgrd) {
            var iHeight = document.documentElement.clientHeight;
            document.getElementById("dlg_back").style.display = "";
            document.getElementById("dlg_back").style.width = scrollWidth + "px";
            document.getElementById("dlg_back").style.height = Math.max(document.body.clientHeight, iHeight) + "px";
        }
    }
    try {
        document.getElementByIdt("input", document.getElementById("dlg_button"))[0].focus();
    } catch (E) { }
}
dialog.dlg_move = function (evt) {
    if (!evt) evt = window.event;
    var mLeft = evt.clientX - parseInt(document.getElementById("dlg").style.left);
    var mTop = evt.clientY - parseInt(document.getElementById("dlg").style.top);
    document.onmousemove = function () {
        document.getElementById("dlg_move_back").style.display = "";
        evt = arguments[0] ? arguments[0] : window.event;
        document.getElementById("dlg").style.left = evt.clientX - mLeft + "px";
        document.getElementById("dlg").style.top = evt.clientY - mTop + "px";
    };
    document.onmouseup = function () {
        document.getElementById("dlg_move_back").style.display = "none";
        document.onmouseup = null;
        document.onmousemove = null;
    };
}
dialog.reset = function () {
    ;
    //isLogin();
    clearTimeout(dlg_time_out);
    document.getElementById("dlg_move_back").style.display = "none";
    document.getElementById("dlg").style.width = dlg_def_width + "px";
    document.getElementById("dlg").style.height = dlg_def_height + "px";
    document.getElementById("dlg_html").innerHTML = "";
    document.getElementById("dlg_title").innerHTML = "信息提示！";
    document.getElementById("dlg_back").style.display = "none";
    document.getElementById("dlg_zone").style.display = "none";
    document.getElementById("dlg_html").style.display = "none";
    document.getElementById("dlg_wait").style.display = "none";
    document.getElementById("dlg_load").style.display = "none";
    document.getElementById("dlg").style.display = "none";
}

//按照以前使用习惯封装到函数中
function reset() {
    dialog.reset();
}
function resize(w, h) {
    dialog.resize(w, h);
}
function show_error(str, func) {
    reset()
    dialog.alert(str, func);
}
function show_error1(str, func) {
    top.reset()
    top.dialog.alert(str, func);
}
function show_success(str, func) {
    reset()
    dialog.alert(str, func);
}
function show_win(str, func) {
    reset()
    dialog.alert(str, func, true, true);
    resize(500, 350);
}
function show_confirm(str, func) {
    reset()
    dialog.confirm(str, func);
}
function show_send(_s) {
    reset()
    dialog.wait(_s);
}
function show_loading(_s) {
    reset()
    dialog.load(_s);
}
function show_frame(Url, sWidth, sHeight, bkgrd, sScroll, full) {
    reset()
    dialog.iframe(Url, sWidth, sHeight, bkgrd, sScroll, full);
}

