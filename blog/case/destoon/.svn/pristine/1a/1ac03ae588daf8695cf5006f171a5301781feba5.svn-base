/*
	[Destoon B2B System] Copyright (c) 2008-2013 Destoon.COM
	This is NOT a freeware, use is subject to license.txt
*/
$(function() {
	$('.head_l li').hover(
		function () {
		$(this).addClass("hover");
		if($(this).attr("id") == 'topli1'){$('#topdiv1').css({"display":""});}
		if($(this).attr("id") == 'topli2'){$('#topdiv2').css({"display":""});}
		if($(this).attr("id") == 'topli3'){$('#topdiv3').css({"display":""});}
		},
		function(){
		$(this).removeClass("hover");
		if($(this).attr("id") == 'topli1'){$('#topdiv1').css({"display":"none"});}
		if($(this).attr("id") == 'topli2'){$('#topdiv2').css({"display":"none"});}
		if($(this).attr("id") == 'topli3'){$('#topdiv3').css({"display":"none"});}
		}
	);
});
$(function() {
	$('#topsub div').hover(
		function () {
		if($(this).attr("id") == 'topdiv1' || $(this).attr("id") == 'topdiv2' || $(this).attr("id") == 'topdiv3') $(this).css({"display":""});
		if($(this).attr("id") == 'topdiv1'){$('#topli1').addClass("hover");}
		if($(this).attr("id") == 'topdiv2'){$('#topli2').addClass("hover");}
		if($(this).attr("id") == 'topdiv3'){$('#topli3').addClass("hover");}
		},
		function(){
		if($(this).attr("id") == 'topdiv1' || $(this).attr("id") == 'topdiv2' || $(this).attr("id") == 'topdiv3') $(this).css({"display":"none"});
		if($(this).attr("id") == 'topdiv1'){$('#topli1').removeClass("hover");}
		if($(this).attr("id") == 'topdiv2'){$('#topli2').removeClass("hover");}
		if($(this).attr("id") == 'topdiv3'){$('#topli3').removeClass("hover");}
		}
	);
});
function setModuleli(i, o) {
	Dd('destoon_moduleid').value = i;
	searchid = i;
	var lis = Dd('search_moduleli').getElementsByTagName('li');
	for(var i=0;i<lis.length;i++) {
		lis[i].className = lis[i] == o ? 'head_search_on' : '';
	}
}

$(function() {
	$('.tabNav span').hover(
		function () {
			var $this = $(this);
			var $id = $(this).attr("id");
			for(var i=1; i<=8; i++) {
				if($id == 'topad_l_'+i) {$(this).addClass("current");$('#topad_r_'+i).css({"display":""});} else {$('#topad_l_'+i).removeClass("current");$('#topad_r_'+i).css({"display":"none"});}
			}
		}
	);
});

