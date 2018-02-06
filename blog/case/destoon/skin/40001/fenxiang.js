function initFeatureSlide(strId) {








    var domRoot = document.getElementById('feature-slide-block');








    if (!domRoot) return;








    domRoot.list = [];








    var children = domRoot.childNodes;








    var offset = 0;








    for (var i in children) {








        var domItem = children[i];








        if (domItem && domItem.className == 'feature-slide-preview') {








            domRoot.list.push(domItem);








            domItem.offset = offset;








            offset++;








        }








    }








    var domList = document.getElementById('feature-slide-list-items');








    if (!domList) return;








    domList.innerHTML = '';








    domList.items = [];








    for (var i = 0; i < domRoot.list.length; i++) {








        var temp = domRoot.list[i];








        var domItem = document.createElement('a');








        domList.appendChild(domItem);








        domItem.href = 'javascript:void(0)';








        domItem.innerHTML = i + 1;








        domItem.onclick = function() {








            return false;








        }








        domList.items.push(domItem);








        domItem.offset = i;








    }








    var domPreviousBtn = document.getElementById('feature-slide-list-previous');








    var domNextBtn = document.getElementById('feature-slide-list-next');








    domPreviousBtn.onclick = function(evt) {








        evt = evt || window.event;








        var target = evt.target || evt.srcElement;








        var offset = domList.current.offset;








        offset--;








        if (offset >= domList.items.length || offset < 0)








        offset = domList.items.length - 1;








        target.blur();








        doSlide(offset);








        return false;








    }








    domNextBtn.onclick = function(evt) {








        evt = evt || window.event;








        var target = evt.target || evt.srcElement;








        var offset = domList.current.offset;








        offset++;








        if (offset >= domList.items.length || offset < 0)








        offset = 0;








        target.blur();








        doSlide(offset);








        return false;








    }








    domRoot.current = domRoot.list[0];








    domList.current = domList.items[0];








    domRoot.current.style.display = 'block';








    domList.current.className = 'current';








    function doSlide(offset, timeStamp) {








        if (timeStamp && (domRoot.boolHover || timeStamp != domRoot.timeStamp)) return;








        if (typeof(offset) != 'number') {








            offset = domList.current.offset - ( - 1);








            if (offset >= domList.items.length || offset < 0)








            offset = 0;








        }








        domRoot.current.style.display = 'none';








        domList.current.className = '';








        domRoot.current = domRoot.list[offset];








        domList.current = domList.items[offset];








        domRoot.current.style.display = 'block';








        domList.current.className = 'current';








        if (domRoot.boolHover) return;








        var now = new Date();








        domRoot.timeStamp = now.valueOf();








        window.setTimeout(function() {








            doSlide(null, now.valueOf());








        },








        6000);








    }








    domList.onmouseover = domList.onclick = function(evt) {








        evt = evt || window.event;








        var target = evt.target || evt.srcElement;








        while (target && target != domList) {








            if (target.tagName.toLowerCase() == 'a') {








                target.blur();








                doSlide(target.offset);








                return false;








            }








            target = target.parentNode;








        }








    }








    domRoot.onmouseover = domRoot.onmousemove = function() {








        domRoot.boolHover = true;








    }








    domRoot.onmouseout = function(evt) {








        domRoot.boolHover = false;








        var now = new Date();








        domRoot.timeStamp = now.valueOf();








        window.setTimeout(function() {








            doSlide(null, now.valueOf());








        },








        6000);








    }








    var now = new Date();








    domRoot.timeStamp = now.valueOf();








    window.setTimeout(function() {








        doSlide(null, now.valueOf());








    },








    6000);








}var cid = 0;








var cmids = [5, 6, 4];








function catalog(id) {








    try {








        $('catalog').style.visibility = 'hidden';








        $('catalog_' + cid).className = 'catalog_li';








        $('catalog_' + id).className = 'catalog_on';








        makeRequest('mid=' + cmids[id] + '&action=catalog', AJPath, '_catalog');








        if (id < 2) $('iadd').href = member_myurl + '?action=add&mid=' + cmids[id];








        cid = id;








        window.setTimeout(function() {








            $('catalog').style.visibility = 'visible';








        },








        200);








    }








    catch(e) {}








}








function _catalog() {








    if (xmlHttp.readyState == 4 && xmlHttp.status == 200) {








        $('catalog').innerHTML = xmlHttp.responseText;








    }








}








var index_timeout,








index_l = '';








function index_timer(l) {








    index_timeout = setTimeout(function() {








        $('#index_' + l).parent().find('li').attr('class','catalog_letter_li');








        index_l = l;








        $('#index_' + l).addClass ('catalog_letter_on');








        var url ='/ajax.php?moduleid=' + cmids[cid] + '&action=letter&cols=5&letter=' + l ;








        $.get(url,function(html){








            $('#catalog_index').html(html + '<div onclick="index_hide()" title="鏀惰捣">&nbsp;</div>').show().addClass('catalog_index');

















        });

















    }








    ,








    0);








}








function index_out() {








   clearTimeout(index_timeout);








}

















function index_hide() {








   $('#catalog_index').html('').hide();








   $('#catalog_index li').attr('class','catalog_letter_li');








}








function index_leave(o, e) {








    if (e.currentTarget) {








        if (typeof(HTMLElement) != "undefined") {








            HTMLElement.prototype.contains = function(obj) {








                if (obj == this) return true;








                while (obj = obj.parentNode) {








                    if (obj == this) return true;








                }








                return false;








            }








        }








        if (o.contains(e.relatedTarget)) {








            return;








        }








    } else {








        if (o.contains(e.toElement)) return;








    }








    setTimeout(index_hide, 200);








}








var ipages = new Array();








ipages['sell'] = ipages['buy'] = ipages['product'] = 1;








var istr = '';








function ipage(str, type) {








    var page = 0;








    if (type == '+') {








        page = ipages[str] + 1;








    } else {








        page = ipages[str] - 1;








    }








    if (page < 1) {








        ipages[str] = 1;








        return false;








    }








    ipages[str] = page;








    istr = 'i' + str;








    $(istr).innerHTML = '<div class="loading">&nbsp;</div>';








    makeRequest('action=ipage&job=' + str + '&page=' + page, AJPath, '_ipage');








}








function _ipage() {








    if (xmlHttp.readyState == 4 && xmlHttp.status == 200) {








        $(istr).innerHTML = xmlHttp.responseText ? xmlHttp.responseText: '<center>宸茶嚦鏈€鍚庝竴椤�</center>';








    }








}








var announceTime = 10000;








var TextTime = 20;








var announcei = 0;








var txti = 0;








var txttimer;








var announcetimer;








function showannounce() {








    var endstr = "_"








    hwannouncetr = announcetitle[announcei];








    announcelink = announcehref[announcei];








    if (txti == (hwannouncetr.length - 1)) {








        endstr = "";








    }








    if (txti >= hwannouncetr.length) {








        clearInterval(txttimer);








        clearInterval(announcetimer);








        announcei++;








        if (announcei >= announcetitle.length) announcei = 0








        announcetimer = setInterval("showannounce()", announceTime);








        txti = 0;








        return;








    }








    clearInterval(txttimer);








    $("printAnnounce").href = announcelink;








    $("printAnnounce").innerHTML = hwannouncetr.substring(0, txti + 1) + endstr;








    txti++;








    txttimer = setInterval("showannounce()", TextTime);








}








 (function($) {








    $(document).ready(function() {

















		








        //initFeatureSlide();








		/*








        var scrtime;

















        $('.weibolist').hover(function() {








            //婊氬姩璇勮








            clearInterval(scrtime);

















        },








        function() {








            scrtime = setInterval(function() {








                var $block = $('.weibolist');








                var liHeight = $block.find('li:last').height();








                $block.animate({








                    marginTop: liHeight + 'px'








                },








                1000,








                function() {








                    $block.find('li:last').prependTo($block);








                    $block.find('li:first').hide();








                    $block.css({








                        marginTop: 0








                    });








                    $block.find('li:first').fadeIn(1000);

















                });

















            },








            5000);

















        }).trigger('mouseleave');








		*/








        //$('.scrollCompany').Scroll({line:1,speed:500,timer:3000});








        /*$('.goldeninvest img').hover(function() {








            $(this).stop(true).parents('li').addClass('zin').end().animate({








                left: -17,








                top: -3,








                width: 170,








                height: 54








            },








            200);

















        },








        function() {








            $(this).stop(true).parents('li').removeClass('zin').end().animate({








                left: 0,








                top: 0,








                width: 135,








                height: 43








            },








            200);

















        });

















        $('#rank1 dl').hover(








        function() {








            $('#rank1 dl').removeClass('fore');








            $(this).addClass('fore');

















        }








        );








        $('.topicsList li').hover(








        function() {








            //$('.topicsList li').removeClass('topic_select');








            //$(this).addClass('topic_select');








            }








        );

















        $('#rank2 dl').hover(








        function() {








            $('#rank2 dl').removeClass('fore');








            $(this).addClass('fore');

















        }








        );*/

















    });

















    $.fn.extend({








        //鍚戜笂婊氬睆鍑芥暟锛屽彲鎺у埗澶氳鎴栬€呭崟琛�








        Scroll: function(opt, callback) {








            //鍙傛暟鍒濆鍖�
            if (!opt) var opt = {};








            var _this = this.eq(0).find('ul:first');








            var lineH = _this.find('li:first').height(),








            //鑾峰彇琛岄珮








            line = opt.line ? parseInt(opt.line, 10) : parseInt(this.height() / lineH, 10),








            //姣忔婊氬姩鐨勮鏁帮紝榛樿涓轰竴灞忥紝鍗崇埗瀹瑰櫒楂樺害








            speed = opt.speed ? parseInt(opt.speed, 10) : 500,








            //鍗峰姩閫熷害锛屾暟鍊艰秺澶э紝閫熷害瓒婃參锛堟绉掞級








            timer = opt.timer ? parseInt(opt.timer, 10) : 3000;








            //婊氬姩鐨勬椂闂撮棿闅旓紙姣锛�
            if (line == 0) line = 1;








            var upHeight = 0 - line * lineH;








            //婊氬姩鍑芥暟








            scrollUp = function() {








                _this.animate({








                    marginTop: upHeight

















                },








                speed,








                function() {








                    for (i = 1; i <= line; i++) {








                        _this.find('li:first').appendTo(_this);

















                    }








                    _this.css({








                        marginTop: 0








                    });

















                });

















            }

















            _this.hover(function() {








                //榧犳爣浜嬩欢缁戝畾








                clearInterval(timerID);

















            },








            function() {








                timerID = setInterval('scrollUp()', timer);

















            }).mouseout();

















        }

















    })








    $(document).ready(function(){








       // $(".bulletin").Scroll({line:1,speed:3000,timer:4000});//淇敼姝ゆ暟瀛楄皟鏁存粴鍔ㄦ椂闂�
    });

















} (jQuery));

















function setTab(name, cursel, n) {








    for (i = 1; i <= n; i++) {








        var menu = document.getElementById(name + i);








        var con = document.getElementById('con_' + name + '_' + i);








        menu.className = i == cursel ? 'seton': '';








        con.style.display = i == cursel ? 'block': 'none';

















    }








}



































$(function(){








    var timer=null;








    var offect=3000;








    if(!timer)








    {








        timer=window.setTimeout(showAuto,offect);








    }








    function showAuto(){








        var $ul=$(".sharecont_ul ul");








        var liheight=$(".sharecont_ul").find("li:first").height()+20;








        $ul.animate({marginTop:liheight+"px"},1000,function(){








            $ul.find("li:last").prependTo($ul);








            $ul.find("li:first").hide();








            $ul.css({marginTop:0});








            $ul.find("li:first").fadeIn(1000);








            clearTimeout(timer);








            timer=window.setTimeout(showAuto,offect);








        });








    }








	$(".sharecont_ul li").hover(function(){ clearTimeout(timer);},function(){ timer=window.setTimeout(showAuto,offect);});








});function AutoScroll(obj) {
	$(obj).find("ul:first").animate({
		marginTop: "-25px"
	}, 500, function() {
		$(this).css({ marginTop: "0px" }).find("li:first").appendTo(this);
	});
}
$(document).ready(function() {
	var myar = setInterval('AutoScroll(".bulletin")', 3000)
	$(".bulletin").hover(function() { clearInterval(myar); }, function() { myar = setInterval('AutoScroll(".bulletin")', 3000) }); //
});
