/*
	[Destoon B2B System] Copyright (c) 2008-2011 Destoon.COM
	This is NOT a freeware, use is subject to license.txt
*/
var ipages = new Array(); var istr = '';
ipages['sell'] = ipages['buy'] = 1;
function ipage(str, type) {
	var page = 0;
	if(type == '+') page = ipages[str] + 1; else page = ipages[str] - 1;
	if(page < 1) {ipages[str] = 1; return false;}
	ipages[str] = page; istr = 'i'+str;
	Dd(istr).innerHTML = '<div class="loading">&nbsp;</div>';
	makeRequest('action=ipage&job='+str+'&page='+page, AJPath, '_ipage');	
}
function _ipage() {if(xmlHttp.readyState==4 && xmlHttp.status==200) {Dd(istr).innerHTML = xmlHttp.responseText ? xmlHttp.responseText : '<center>'+L['last_page']+'</center>';}}

/*2013-11-28 Ê×Ò³Í¼¿â×óÓÒ¹ö¶¯*/
$(function() {
    var B = $("#hot-left");
    var A = $("#hot-right");
    var C = $(".photoc ul");
    var D = C.find("li").innerWidth();
    B.click(function() {
        C.find("li:last").prependTo(C);
        C.css("margin-left", -D);
        C.animate({
            "margin-left": 0
        })
    });
    A.click(function() {
        C.animate({
            "margin-left": -D
        },
        function() {
            C.find("li:first").appendTo(C);
            C.css("margin-left", "0")
        })
    })
});
