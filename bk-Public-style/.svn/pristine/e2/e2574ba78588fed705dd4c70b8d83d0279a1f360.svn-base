$(function(){
	var start = {
		elem: '#inputStartTime',
		max: laydate.now(),
		choose: function(datas) {
			end.min = datas;
			end.start = datas;
		}
	};

	var end = {
		elem: '#inputEndTime',
		max: laydate.now(2)
	};

	//开始时间
	$('#inputStartTime').click(function() {
		laydate(start);
	});
	
	//结束时间
	$('#inputEndTime').click(function() {
		laydate(end);
	});

	$(".start-select").on('click',function() {
		var keyword=$(".chaxun-list").find("input[name=keyword]").val();
		var company=$(".chaxun-list").find("input[name=company]").val();
		var tel=$(".chaxun-list").find("input[name=tel]").val();
		var sdate=$(".chaxun-list").find("input[name=sdate]").val();
		var edate=$(".chaxun-list").find("input[name=edate]").val();
		if(sdate != "" && edate ==""){
			alert("请输入结束时间");
			return false;
		}	
		if(sdate == "" && edate !=""){
			alert("请输入开始时间");
			return false;
		}
		if(sdate>=edate && edate !="" && sdate != ""){
			alert("起始时间不能大于或等于结束时间");
			return false;
		}
		if(edate =="" && sdate == "" &&  keyword ==""){
			return false;
		}
		var type=$("#type").val();
		var ty=1;
		if(type=="求购"){
 			ty=1;
		}
		if(type=="供应"){
			ty=2;
		}
		var data={"page":1,"ty":ty,"keyword":keyword,"company":company,"tel":tel,"sdate":sdate,"edate":edate};
        // console.log(data);
        ajax_data($switch_url,data,ty);
      
		// ajax_data($swtich_url,data);
	});
})
function dump($url,$page,$ty,$keyword) {
	var data={"page":$page,"ty":$ty,"keyword":$keyword};
	ajax_data($url,data,$ty);
}
function switch_search($url,$page,$ty,$keyword,$company,$tel,$sdate,$edate){
	var data={"page":$page,"ty":$ty,"keyword":$keyword,"company":$company,"tel":$tel,"sdate":$sdate,"edate":$edate};
	ajax_data($url,data,$ty);
}
function ajax_data($url,data,ty){
	$.ajax({
		url:$url,
		data:data,
		type:"POST",
		dataType: 'json',
		success:function(data) {
			//未登录
			// console.log(data.pages);
			if(data.is_login === 0){
				//page
					//组建html				
					var html='<thead><tr style="border-bottom:1px solid #dddddd;height:35px;"><th class="center col-10">发布时间</th><th class="center col-25 line-overflow fabu-biaoti col-40">标题</th><th class="center col-10 line-overflow fabu-diqu col-40">地区</th><th class="center col-8 fabu-caozu col-10">操作</th></tr></thead>';
					for (var i =0;i<data.list.length;i++) {
						html += '<tbody><tr><td class="center col-10">'+data.list[i].addtime+'</td><td class="center col-25 line-overflow">'+data.list[i].title+'</td><td class="center col-10 line-overflow">'+data.list[i].address+'</td><td class="center col-8"><a href="/Index/details/ty/'+ty+'/id/'+data.list[i].id+'.html" class="handle" target="_blank">详情</a></td></tr>';
					}
					if(data.list.length == 0){
						html+='<tr class="search-null"><td class="center" colspan="8">暂无相关数据</td></tr>';
					}
					html+="</tbody>";
					html+='<tfoot><tr><td colspan="8" class="center"><nav><ul class="pagination">'+data.pages+'</ul></nav></td></tr></tfoot>';
					$('#Show-data-Table').html(html);
			}else if(data.is_login === 1){
                	var html='<thead><tr style="border-bottom:1px solid #dddddd;height:35px;"><th class="center col-10">发布时间</th><th class="center col-25 line-overflow fabu-biaoti">标题</th><th class="center col-10 lianxi_hide">联系用户</th><th class="center col-15 lianxi_hide">联系电话</th><th class="center col-22 lianxi_hide">公司名称</th><th class="center col-10 line-overflow fabu-diqu">地区</th><th class="center col-8 fabu-caozu">操作</th></tr></thead>';
                	for (var i =0;i<data.list.length;i++) {
						html += '<tbody><tr><td class="center col-10">'+data.list[i].addtime+'</td><td class="center col-25 line-overflow">'+data.list[i].title+'</td><td class="center col-10">'+data.list[i].truename+'</td><td class="center col-15">'+data.list[i].telephone+'</td><td class="center col-22">'+data.list[i].company+'</td><td class="center col-10 line-overflow">'+data.list[i].address+'</td><td class="center col-8"><a href="/Index/details/ty/'+ty+'/id/'+data.list[i].id+'.html" class="handle" target="_blank">详情</a></td></tr>';
					}
					if(data.list.length == 0){
						html+='<tr class="search-null"><td class="center" colspan="8">暂无相关数据</td></tr>';
					}
					html+="</tbody>";
					html+='<tfoot><tr><td colspan="8" class="center"><nav><ul class="pagination">'+data.pages+'</ul></nav></td></tr></tfoot>';
					$('#Show-data-Table').html(html);    
			}
		}

	})
}
//判断是否为空
function is_not_null(val){
	if(val !== null || val !== undefined || val !== ''){
		return true;
	}else{
		return false;
	}	
}