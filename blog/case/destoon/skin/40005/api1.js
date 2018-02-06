//鍏ㄥ眬閫氱敤api1鏂囦欢
var api1 = {
    //閰嶇疆淇℃伅
    config: {
        //绠€鍗曞鐞嗘枃浠�
        serverAshxPath: '/api/ashx/api1.ashx'
        //鍗曟枃浠舵墽琛�
        , serverAspxPath: '/api/aspx/api1.aspx'
        //鑷畾涔夌粍浠剁殑浣嶇疆
        , itemPath: '/api/item/'
    }
    //寮瑰嚭淇℃伅
    , alert: {
        //褰撳墠寮圭獥鐨勭储寮�
        index: 0,
        //鍔犺浇瀹屾垚鍚庢墽琛�
        ready: function (fun) {
            if (fun != undefined)
                layer.ready(fun);
        }
        //test
        , test: function () {
            this.msg({ fileName: "test.aspx?a1t=" + new Date().getTime(), area: ['500px', '500px'] });
            //alert(this.index);
        }
        //鐣欒█璇环
        , liuyanxunjia: function () {
            this.msg({ fileName: "liuyanxunjia.aspx?a1t=" + new Date().getTime(), area: ['500px', '500px'] });
            //alert(this.index);
        }
        //鍙戦€侀偖浠�
        , maill: function () {
            this.msg({ fileName: "liuyanxunjia.aspx?a1t=" + new Date().getTime(), area: ['500px', '500px'] });
            //alert(this.index);
        }
        //寮瑰嚭鍩虹淇℃伅,杩斿洖寮圭獥鐨勭储寮�
        , msg: function (opt) {
            //鍔犺浇瀹屾垚鍚庢墽琛屽脊绐椾簨浠�
            this.ready(function () {
                //鏄剧ず鍔犺浇灞�
                api1.alert._loadIndex = layer.load(1, {
                    //5绉掑悗鑷姩鍏抽棴
                    time: 5000,
                    shade: [0.1, '#fff'] //0.1閫忔槑搴︾殑鐧借壊鑳屾櫙
                    , success: function (layero, indesx1) {
                        //鍞竴缂栧彿
                        var id = 'a' + new Date().getTime();

                        //椤甸潰灞�
                        api1.alert.index = layer.open({
                            type: 1,
                            area: opt.area,
                            skin: 'layui-layer-rim', //鍔犱笂杈规
                            content: '<div style="" id="' + id + '"></div>',
                            //褰撳眰琚攢姣佹椂鎵ц锛屽叧闂椂涔熸墽琛�
                            end: function () {
                                //鍏抽棴鎸囧畾鐨勫脊绐�
                                layer.close(indesx1);
                            }
                        });
                        //鍔犺浇鎸囧畾鍐呭
                        $("#" + id).load(api1.config.itemPath + opt.fileName, function (a) {
                            //鍏抽棴鎸囧畾鐨勫脊绐�
                            layer.close(indesx1);
                        });
                    }
                });
            }); //end ready
        }
    },
    /********************************DataConverter鏁版嵁绫诲瀷杞崲 begin*******************************/
    DataConverter: {
        //杞崲鎴愭暣鏁�
        toInt: function (_value1) {
            if (_value1 == undefined) return 0;
            var v = parseInt(_value1);
            if (isNaN(v)) v = 0;
            return v;
        },
        //杞崲鎴愬甫灏忔暟鐐规暟瀛�
        toFolat: function (_value1) {
            if (_value1 == undefined) return 0;
            var v = parseFloat(_value1);
            if (isNaN(v)) v = 0;
            return v;
        },
        //鏄惁鏄暟瀛�
        isFinite: function (_value1) {
            var v = isFinite(_value1);
            return v;
        }
    },
    /********************************DataConverter鏁版嵁绫诲瀷杞崲 end*******************************/
    /********************************json鎿嶄綔 begin*******************************/
    json: {
        //鍙傛暟瑙ｈ
        /*
        _obj:闇€瑕佹搷浣滅殑json瀵硅薄 
        _key1锛氶渶瑕佸彇寰楄妭鐐瑰悕, 
        _value1锛氬鏋滆妭鐐逛笉瀛樺湪鏃讹紝闇€瑕佽繑鍥炵殑榛樿鍊�
        */
        get: function (_obj, _key1, _value1) {
            if (_value1 == undefined) _value1 = "";
            if (!this.is(_obj, _key1)) { return _value1; }
            return _obj["" + _key1];
        },
        //鏄惁瀛樺湪鑺傜偣
        is: function (_obj, _key1) {
            return ("" + _key1 in _obj);
        }
    },
    /********************************json鎿嶄綔 end*******************************/
    /********************************鑾峰彇鎵€鍦ㄥ湴鍖� begin*******************************/
    cityjsonName: 'cityjsonName11q11211qq1',
    //閫氳繃鏂版氮
    cityjson: function (fun1, fun2) {
        //鑾峰彇鍦板尯淇℃伅
        var sval = api1.ls.get(api1.cityjsonName);
        //alert(sval);
        //鏈湴缂撳瓨涓槸鍚︽湁鍊笺€�
        if (sval != '') {
            eval('var datass201544=' + sval + ';');
            //瑙ｆ瀽骞舵墽琛�
            api1.citySpl(datass201544, fun1, fun2);
            return;
        }
        //绗笁鏂硅幏鍙�  杩斿洖鍊硷細var remote_ip_info = {"ret":1,"start":-1,"end":-1,"country":"\u4e2d\u56fd","province":"\u6d59\u6c5f","city":"\u5b81\u6ce2","district":"","isp":"","type":"","desc":""};
        $.getScript('http://int.dpool.sina.com.cn/iplookup/iplookup.php?format=js', function (_result) {
            //瀛樺偍鍦ㄦ湰鍦�
            api1.ls.set(api1.cityjsonName, JSON.stringify(remote_ip_info));
            //瑙ｆ瀽骞舵墽琛�
            api1.citySpl(remote_ip_info, fun1, fun2);
        });
    },
    cityjsonName2: 'cityjsonName211qcqq1',
    //閫氳繃鎼滅嫄
    cityjson2: function (fun1, fun2) {
        //鑾峰彇鍦板尯淇℃伅
        var sval = api1.ls.get(api1.cityjsonName2);
        //alert(sval);
        //鏈湴缂撳瓨涓槸鍚︽湁鍊笺€�
        if (sval != '') {
            eval('var datass201544=' + sval + ';');
            //瑙ｆ瀽骞舵墽琛�
            api1.citySpl(datass201544, fun1, fun2);
            return;
        }
        //绗笁鏂硅幏鍙�  杩斿洖鍊硷細var returnCitySN = {"cip": "115.238.140.134", "cid": "330200", "cname": "娴欐睙鐪佸畞娉㈠競"};
        $.getScript('http://pv.sohu.com/cityjson', function (_result) {
            returnCitySN.ret = '1';
            //瀛樺偍鍦ㄦ湰鍦�
            api1.ls.set(api1.cityjsonName2, JSON.stringify(returnCitySN));
            //瑙ｆ瀽骞舵墽琛�
            api1.citySpl(returnCitySN, fun1, fun2);
        });
    },
    //瑙ｆ瀽骞舵墽琛�
    citySpl: function (remote_ip_info, fun1, fun2) {
        //鏄惁鏈変俊鎭�
        if (remote_ip_info.ret == '1') {
            //鎵惧埌瀵瑰簲鍦板潃鏃舵墽琛�
            if (fun1 != undefined) fun1(remote_ip_info);
            //alert('鍥藉锛�' + remote_ip_info.country + '<BR>鐪侊細' + remote_ip_info.province + '<BR>甯傦細' + remote_ip_info.city + '<BR>鍖猴細' + remote_ip_info.district + '<BR>ISP锛�' + remote_ip_info.isp + '<BR>绫诲瀷锛�' + remote_ip_info.type + '<BR>鍏朵粬锛�' + remote_ip_info.desc);
        } else {
            //娌℃湁鎵惧埌瀵瑰簲鍦板潃鏃舵墽琛�
            if (fun2 != undefined) fun2(remote_ip_info);
            //alert('娌℃湁鎵惧埌鍖归厤鐨処P鍦板潃淇℃伅锛�');
        }
    },
    /********************************鑾峰彇鎵€鍦ㄥ湴鍖� end*******************************/
    /********************************鏈湴瀛樺偍localStorage begin*******************************/
    ls: {
        //鍒犻櫎鏁版嵁
        del: function (key) {
            if (window.localStorage) {
                window.localStorage.removeItem(key);
            } else {
                //褰撳墠娴忚鍣ㄤ笉鏀寔 localStorage
            }
        },
        //鑾峰彇鏁版嵁
        get: function (key) {
            if (window.localStorage) {
                var retStr = '';
                retStr = window.localStorage.getItem(key);
                if (retStr == null) retStr = '';
                if (retStr == undefined) retStr = '';
                return retStr;
            } else {
                //褰撳墠娴忚鍣ㄤ笉鏀寔 localStorage
            }
            return '';
        },
        //瀛樺偍鏁版嵁
        set: function (key, val) {
            if (window.localStorage) {
                this.del(key);
                window.localStorage.setItem(key, val);
            } else {
                //褰撳墠娴忚鍣ㄤ笉鏀寔 localStorage
            }
        }
    },
    /********************************鏈湴瀛樺偍localStorage end*******************************/
    /********************************cookie begin*******************************/
    cookie: function (name, value, options) {
        if (typeof value != 'undefined') { // name and value given, set cookie
            options = options || {};
            if (value === null) {
                value = '';
                options.expires = -1;
            }
            var expires = '';
            if (options.expires && (typeof options.expires == 'number' || options.expires.toUTCString)) {
                var date;
                if (typeof options.expires == 'number') {
                    date = new Date();
                    date.setTime(date.getTime() + (options.expires * 24 * 60 * 60 * 1000));
                } else {
                    date = options.expires;
                }
                expires = '; expires=' + date.toUTCString(); // use expires attribute, max-age is not supported by IE
            }
            var path = options.path ? '; path=' + options.path : '';
            var domain = options.domain ? '; domain=' + options.domain : '';
            var secure = options.secure ? '; secure' : '';
            document.cookie = [name, '=', encodeURIComponent(value), expires, path, domain, secure].join('');
        } else { // only name given, get cookie
            var cookieValue = null;
            if (document.cookie && document.cookie != '') {
                var cookies = document.cookie.split(';');
                for (var i = 0; i < cookies.length; i++) {
                    var cookie = jQuery.trim(cookies[i]);
                    // Does this cookie string begin with the name we want?
                    if (cookie.substring(0, name.length + 1) == (name + '=')) {
                        cookieValue = decodeURIComponent(cookie.substring(name.length + 1));
                        break;
                    }
                }
            }
            return cookieValue;
        }
    },
    /********************************cookie end*******************************/
    /**********************************鏁版嵁绫诲瀷杞崲 begin***************************************/
    //瀛楃涓茶浆鎹㈡垚鏁存暟
    StrToInt: function (v) {
        if (v == undefined) return 0;
        if (isNaN(v)) return 0;
        if (v == null) return 0;
        return parseInt(v);
    },
    //瀛楃涓茶浆鎹㈡垚甯﹀皬鏁扮偣鏁板瓧
    StrToInt1: function (v) {
        if (v == undefined) return 0;
        if (isNaN(v)) return 0;
        if (v == null) return 0;
        return parseFloat(v);
    },
    /**********************************鏁版嵁绫诲瀷杞崲 end***************************************/
    //缁撴潫
    end: {}
};


/*
浣跨敤鏂规硶锛� $(function () {
$(".hot_item img").srcload();
});
HTML锛�<img srcload="http://www.eastled.com/UpLoadStorage/201301/5a34ecac-1d49-47fd-8eb8-5994ef46cff0.jpg" src="#" />
*/


(function ($) {
    $.fn.srcload = function () {
        var that = this;
        $(window).bind("scroll resize", function () {
            __Run(that);
        });
        __Run(that);
    }

})(jQuery);

var __Run = function (elem) {
    elem.each(function () {
        var self = this;
        var lazys = $(self).attr("srcload");
        //楠岃瘉鏄惁闇€瑕佸欢闀挎樉绀�
        if (lazys != undefined && lazys != "" && lazys != "undefined") {
            //鑾峰彇瀵硅薄鐨勭浉瀵逛簬绐楀彛鐨勮窛绂讳互鍙婂楂�
            var dom = {
                top: parseInt($(self).offset().top),
                height: parseInt($(self).height())
            };
            //杩斿洖绐楀彛鐨勬粴鍔ㄨ窛绂讳互鍙婂楂�
            var win = {
                top: parseInt($(window).scrollTop()),
                height: parseInt($(window).height())
            };
            //楠岃瘉鏄惁鍦ㄦ樉绀鸿寖鍥村唴
            var tp2 = win.top + win.height + 100;
            //楠岃瘉鏄惁鍦ㄦ樉绀鸿寖鍥村唴
            if (tp2 > dom.top) {
                //寤惰繜鍚庣殑鏁堟灉
                //$(self).css("display", "none");
                //鏇存崲閾炬帴
                $(self).attr("src", lazys);

                //鐩存帴鏄剧ず
                //$(self).css("display", "block");

                //姣忔鍙欢杩熸樉绀轰竴娆″嵆鍙�
                $(self).attr("srcload", "");
            }
        }
    });
}