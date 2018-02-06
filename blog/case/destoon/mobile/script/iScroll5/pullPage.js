$(function(){
    var counter = 0;
    // 每页展示4个
    var num = 4;
    var pageStart = 0,pageEnd = 0;

    // dropload
    $('#content').dropload({
        scrollArea : window,
        domUp : {
            domClass   : 'dropload-up',
            domRefresh : '<div class="dropload-refresh">↓下拉刷新内容</div>',
            domUpdate  : '<div class="dropload-update">↑释放更新内容</div>',
            domLoad    : '<div class="dropload-load"><span class="loading"></span>加载中...</div>'
        },
        domDown : {
            domClass   : 'dropload-down',
            domRefresh : '<div class="dropload-refresh">↑上拉加载更多内容</div>',
            domLoad    : '<div class="dropload-load"><span class="loading"></span>加载中请稍等...</div>',
            domNoData  : '<div class="dropload-noData">就只有这么多了</div>'
        },
        //loadUpFn : function(me){
			//location.reload();
			//me.resetload();
        //},
        loadDownFn : function(me){
        pageLoad = false;
        $.get(AJPath+'?action=pullpage',{"page": pageIndex, "moduleid":moduleid ,"catid":catid,"kw":kw}, function(ret){
					itemNum = ret.totalCount;
                    pageNum = ret.totalPages;
                    if(ret.data){
                    if(pageIndex > pageNum){
						pageLoad = false;
							openDialog('text','加载完毕','就只有这么多了')
							me.lock();
							me.noData();
							me.resetload();							
						}else{
							var html="";
							for(var i = 0; i < ret.data.length; i++) {
								var sthumb = ret.data[i].thumb;
								var svip = ret.data[i].vip;;
								//sthumb=(sthumb==""||sthumb==undefined)?sthumb:"static/img/nopic-60.png"
								sthumb ? sthumb:"image/nopic-80.png";
								if(svip>0) svip = 'class="vip" title="VIP:'+ret.data[i].vip+'';
html+='<li class="aui-list-item aui-padded-t-5 aui-padded-b-5"><div class="aui-media-list-item-inner"><div class="aui-list-item-media"><a href="'+ret.data[i].linkurl+'"><img src="'+sthumb+'" height="70" /></a></div><div class="aui-list-item-inner"><div class="aui-list-item-text"><div class="aui-list-item-title"><a href="'+ret.data[i].linkurl+'">'+ret.data[i].title+'</a></div><div class="aui-list-item-right"></div></div><div class="aui-info dt-margin-t-5" style="padding:0"><div class="aui-info-item"><img src="'+ret.data[i].useravatar+'" style="width:0.85rem" class="aui-img-round" /><span class="aui-margin-l-5 dt-margin-t-5 dt-text-ellipsis"><a href="index.php?moduleid=4&username='+ret.data[i].username+'">'+ret.data[i].company+'</a></span></div><div class="aui-info-item dt-margin-t-5"><span class="dt-text-ellipsis aui-pull-right">'+ret.data[i].adddates+'</span></div></div></div></div></li>';
							}
							$("#slistdiv").append(html)
                            pageIndex++;
							me.resetload();
							pageLoad = true;

						}

}
},'json');  
        },
        threshold : 50
    });
});