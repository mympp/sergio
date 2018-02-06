var myScroll,
	pullDownEl, pullDownOffset,
	pullUpEl, pullUpOffset,
	generatedCount = 0;

function pullDownAction () {
location.reload();		
myScroll.refresh();
}

function pullUpAction () {
//alert(pageIndex);

pageLoad = false;
$.get(AJPath+'?action=pullpage',{"page": pageIndex, "moduleid":5 ,"catid":catid,"kw":kw}, function(ret){
					itemNum = ret.totalCount;
                    pageNum = ret.totalPages;
                    if(ret.data){
                    if(pageIndex > pageNum){
						pageLoad = false;
							alert('就只有这么多了！');
							myScroll.refresh();
							$("#pullUp").hide();
                            setTimeout(function () {
                           $("#nomuch").show();
						    },200)
							
						}else{
							var html="";
							for(var i = 0; i < ret.data.length; i++) {
								var sthumb = ret.data[i].thumb;
								var svip = ret.data[i].vip;;
								//sthumb=(sthumb==""||sthumb==undefined)?sthumb:"static/img/nopic-60.png"
								sthumb ? sthumb:"static/img/nopic-60.png";
								if(svip>0) svip = 'class="vip" title="VIP:'+ret.data[i].vip+'';
html+='<div class="list-img"> <a href="'+ret.data[i].linkurl+'"><img src="'+sthumb+'" width="60" height="60" alt="" onerror="this.src="static/img/nopic-60.png";"/></a><ul><li><a href="'+ret.data[i].title+'"><strong>'+ret.data[i].title+'</strong></a></li><li><em>'+ret.data[i].data+'</em></li><li '+svip+'"><a href="index.php?moduleid=4&username='+ret.data[i].username+'"><span>'+ret.data[i].company+'</span></a></li></ul></div>';
							}
							$("#pullUp").before(html); 
                            pageIndex++;
							myScroll.refresh();
							pageLoad = true;

						}

}
},'json');  

}

function loaded() {
	pullDownEl = document.getElementById('pullDown');
	pullDownOffset = pullDownEl.offsetHeight;
	pullUpEl = document.getElementById('pullUp');	
	pullUpOffset = pullUpEl.offsetHeight;
	
	myScroll = new iScroll('selllists', {
		useTransition: true,
		topOffset: pullDownOffset,
		onRefresh: function () {
			if (pullDownEl.className.match('loading')) {
				pullDownEl.className = '';
				pullDownEl.querySelector('.pullDownLabel').innerHTML = '松手立刻刷新...';
			} else if (pullUpEl.className.match('loading')) {
				pullUpEl.className = '';
				pullUpEl.querySelector('.pullUpLabel').innerHTML = '向上滑动加载更多...';
			}
		},
		onScrollMove: function () {
			////$(window).scroll(function () {
if ($(window).scrollTop() > 10) {alert('a');
$("#topmenu_keleyi_com").fadeIn(100);
}
else {
$("#topmenu_keleyi_com").fadeOut(100);
}
//});

			if (this.y > 5 && !pullDownEl.className.match('flip')) {
				pullDownEl.className = 'flip';
				pullDownEl.querySelector('.pullDownLabel').innerHTML = '松手立刻刷新...';
				this.minScrollY = 0;
			} else if (this.y < 5 && pullDownEl.className.match('flip')) {
				pullDownEl.className = '';
				pullDownEl.querySelector('.pullDownLabel').innerHTML = '下拉刷新...';
				this.minScrollY = -pullDownOffset;
			} else if (this.y < (this.maxScrollY - 5) && !pullUpEl.className.match('flip') && pageLoad) {
				pullUpEl.className = 'flip';
				pullUpEl.querySelector('.pullUpLabel').innerHTML = '松手立刻加载...';
				this.maxScrollY = this.maxScrollY;
			} else if (this.y > (this.maxScrollY + 5) && pullUpEl.className.match('flip') && pageLoad) {
				pullUpEl.className = '';
				pullUpEl.querySelector('.pullUpLabel').innerHTML = '向上滑动加载更多...';
				this.maxScrollY = pullUpOffset;
			}
		},
		onScrollEnd: function () {
			if (pullDownEl.className.match('flip')) {
				pullDownEl.className = 'loading';
				pullDownEl.querySelector('.pullDownLabel').innerHTML = 'Loading...';				
				pullDownAction();	// Execute custom function (ajax call?)
			} else if (pullUpEl.className.match('flip')) {
				pullUpEl.className = 'loading';
				pullUpEl.querySelector('.pullUpLabel').innerHTML = 'Loading...';				
				pullUpAction();	// Execute custom function (ajax call?)
			}
		},
		onScrollLimit: function(){  
           //alert('滚动到底部了');
        }
	});
	
	setTimeout(function () { document.getElementById('selllists').style.left = '0'; }, 200);
}

document.addEventListener('touchmove', function (e) { e.preventDefault(); }, false);

document.addEventListener('DOMContentLoaded', function () { setTimeout(loaded, 200); }, false);
