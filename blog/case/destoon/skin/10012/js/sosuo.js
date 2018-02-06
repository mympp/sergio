function setModuleli(i, o) {
	Dd('destoon_moduleid').value = i;
	searchid = i;
	var lis = Dd('search_moduleli').getElementsByTagName('a');
	for(var i=0;i<lis.length;i++) {
		lis[i].className = lis[i] == o ? 'search_on' : '';
	}
}


$('.skey_input').mouseenter(function(){
	$('.show_ktag').slideDown(300);
	if($(".search_i").val()=='请输入关键词'){$(".search_i").val('');}
	$(".search_i").focus();
});
$(".search_i").keyup(function(){
	STip(this.value);
});
$(".search_i").mouseleave(function(){  
	if( this.value==''){this.value='请输入关键词';}
});
$(".search_i").keypress(function(){
	if($(".search_i").val()=='请输入关键词'){$(".search_i").val('');}
});
$(".skey_input").mouseleave(function(){  
	$('.show_ktag').hide();
});  
$(".search_i").click(function(){  
	if($(".search_i").val()=='请输入关键词'){$(".search_i").val('');}
});
$(".search_i").mouseenter(function(){  
	if($(".search_i").val()=='请输入关键词'){$(".search_i").val('');}
});