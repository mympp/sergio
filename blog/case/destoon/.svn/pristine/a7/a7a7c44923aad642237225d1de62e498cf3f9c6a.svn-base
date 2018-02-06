/*
	[Destoon B2B System] Copyright (c) 2008-2013 Destoon.COM
	This is NOT a freeware, use is subject to license.txt
*/
var _pp = 0;
function AutoTab2() {
	var c;
	Dd('trades2').onmouseover = function() {_pp = 1;} 
	Dd('trades2').onmouseout = function() {_pp = 0;}
	if(_pp) return;
	for(var i = 1; i < 5; i++) { if(Dd('top_info_t_'+i).className == 'top_info_2') {c = i;} }
	c++; 
	if(c > 4) c = 1;
	Tb(c, 4, 'top_info', 'top_info');
}
if(Dd('trades2') != null) window.setInterval('AutoTab2()',5000);