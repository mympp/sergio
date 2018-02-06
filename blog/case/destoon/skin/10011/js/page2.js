/*
	[Destoon B2B System] Copyright (c) 2008-2013 Destoon.COM
	This is NOT a freeware, use is subject to license.txt
*/
function setModuleli(i, o) {
	Dd('destoon_moduleid').value = i;
	searchid = i;
	var lis = Dd('search_moduleli').getElementsByTagName('a');
	for(var i=0;i<lis.length;i++) {
		lis[i].className = lis[i] == o ? 'head_search_on' : '';
	}
}

/****首页滚动效果****/


jQuery(function($){


	//jQuery滚动插件V1.0 2011/11/17;


	$.fn.js_scroll = function(){


		var arg = arguments[0] || {};


		var that = this;


		var opts = $.extend({


			beforeStart:function(){},


			ul:'ul',


			li:'li',


			prev:null,


			next:null,


			hover:null,


			direct:'left',


			num:1,


			btnNum:arg.num||1,


			speed:40,


			btnSpeed:3*arg.speed||120,


			timeout:4000,


			startTime:arg.timeout ||4000,


			delayTime:arg.timeout*0.25 || 1000


		},arg);


		opts.beforeStart();


		$.extend(opts,{


			ul:that.find(opts.ul),


			prev:that.find(opts.prev),


			next:that.find(opts.next)


		});


		opts.hover = that.parent().find(opts.hover).length>0?that.parent().find(opts.hover):opts.ul.add(opts.prev).add(opts.next);


		opts.direct = ('number' == typeof opts.direct)?opts.direct:'up'==opts.direct?1:'right'==opts.direct?2:'down'==opts.direct?3:4;


		var timeout = null;


		var ul = opts.ul;


		var lis = that.find(opts.li);		


		var size = {width:0,height:0,len:lis.length};


		opts.num = opts.num>size.len?opts.num%size.len:opts.num;


		opts.btnNum = opts.btnNum>size.len?opts.btnNum%size.len:opts.btnNum;


		


		opts.beforeStart();


		lis.clone().appendTo(ul).clone().appendTo(ul);


		that.find(opts.li).each(function(){


			var _this = $(this);


			var wd = parseFloat(_this.outerWidth(true));


			var ht = parseFloat(_this.outerHeight(true));


			_this.data('s_wd',wd).data('s_ht',ht);


			size.width += wd;


			size.height += ht;


		});


		size.width/=3;


		size.height/=3;		


		opts.direct%2?ul.css({position:'absolute',top:-size.height,height:3*size.height}):ul.css({position:'absolute',left:-size.width,width:3*size.width});		


		function stop_init(){


			clearTimeout(timeout);


			ul.stop();


		}


		function js_scroll(num,speed,direct,btn){


			stop_init();


			var doms = that.find(opts.li+':lt('+num+')');


			var doms2 = that.find(opts.li+':gt('+(3*size.len-num-1)+')');


			var height = 0;


			var width = 0;


			doms.each(function(){


				height += $(this).data('s_ht')*1;


				width += $(this).data('s_wd')*1;


			});			


			switch (direct){


				case 4: case 2:


					var margin = Math.abs(ul.position().left)-size.width;


					var yidong = 4==direct?(margin>=0?width-margin:-margin):(margin<=0?width+margin:margin);


					var scrollTime = parseInt(yidong/speed*1000);


					ul.animate({left:4==direct?'-='+yidong+'px':'+='+yidong+'px'},scrollTime,function(){						


						4==direct?(margin>=0?ul.append(doms).css({left:-size.width}):null):(margin<=0?ul.prepend(doms2).css({left:-size.width}):null);


						callback();


					});


				break;


				case 1: case 3:


					var margin = Math.abs(ul.position().top)-size.height;


					var yidong = 1==direct?(margin>=0?height-margin:-margin):(margin<=0?height+margin:margin);


					var scrollTime = parseInt(yidong/speed*1000);


					ul.animate({top:1==direct?'-='+yidong+'px':'+='+yidong+'px'},scrollTime,function(){						


						1==direct?(margin>=0?ul.append(doms).css({top:-size.height}):null):(margin<=0?ul.prepend(doms2).css({top:-size.height}):null);


						callback();


					});


				break;


			}


			function callback(){


				timeout = btn?null:setTimeout(function(){							


					js_scroll(num,speed,direct);


				},opts.timeout);


			}


		}


		opts.hover.hover(function(){			


			stop_init();


		},function(){


			timeout = setTimeout(function(){


				js_scroll(opts.num,opts.speed,opts.direct);


			},opts.delayTime);


		});


		opts.prev.click(function(){


			js_scroll(opts.btnNum,opts.btnSpeed,opts.direct%2?3:2,true);


			return false;


		});


		opts.next.click(function(){


			js_scroll(opts.btnNum,opts.btnSpeed,opts.direct%2?1:4,true);


			return false;


		});


		timeout = setTimeout(function(){


			js_scroll(opts.num,opts.speed,opts.direct);


		},opts.startTime);


		that.bind('js_scroll_stop',function(){


			ul.stop(true,true)


			clearTimeout(timeout);


		}).bind('js_scroll_start',function(){


			opts.hover.trigger('mouseout');


		});


		return this;


	}


	//初始化首页滚动效果;


	$('.hotdoing-main').js_scroll({


		speed:40,


		btnSpeed:120,


		direct:'up',


		prev:'.on',


		next:'.next',


		hover:'.hotdoing-main',


		timeout:3000,


		startTime:1500


	});


	$('.googcr-main').js_scroll({


		speed:80,


		btnSpeed:240,


		btnNum:1,


		ul:'.googcr-main-photo ul',


		li:'.googcr-main-photo li',


		direct:4,


		prev:'.button-left',


		next:'.button-right',


		hover:'.googcr-main'


	});


});


/****首页滚动效果End****/





// 首页右侧登录下,当前热点上的引导.


jQuery(document).ready(function($){


	if($("#n01").size()){


		$("#n01,#nn01").parent().children().mouseover(


		function(){


				$(this).addClass("current").siblings().removeClass("current");


				$('#'+$(this).attr("id").replace(/n/g,"d")).show().siblings(':not(.help-center-tabs)').hide();


		})


	}


});


