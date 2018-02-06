(function($){
		Date.prototype.Format = function (fmt) { 
	    var o = {
	        "M+": this.getMonth() + 1, //月份 
	        "d+": this.getDate(), //日 
	        "h+": this.getHours(), //小时 
	        "m+": this.getMinutes(), //分 
	        "s+": this.getSeconds(), //秒 
	        "q+": Math.floor((this.getMonth() + 3) / 3), //季度 
	        "S": this.getMilliseconds() //毫秒 
	    };
	    if (/(y+)/.test(fmt)) fmt = fmt.replace(RegExp.$1, (this.getFullYear() + "").substr(4 - RegExp.$1.length));
	    for (var k in o)
	    if (new RegExp("(" + k + ")").test(fmt)) fmt = fmt.replace(RegExp.$1, (RegExp.$1.length == 1) ? (o[k]) : (("00" + o[k]).substr(("" + o[k]).length)));
	    return fmt;
	 }
	 
	 Array.prototype.unique=function(){
	    var newArr=[],obj={};
	    for(var i=0,len=this.length;i<len;i++){
	        if(!obj[this[i].cateId]){ 
	            newArr.push(this[i]);
	            obj[this[i].cateId]=true;
	        }
	    }
	    return newArr;
	}
	
}(jQuery));


function formatBigDecimal(count){
	if(count){		
		if(count>=10000){
			return  (count/10000).toFixed(1).toString()+"万";
		}else if(count>1000){
			return  (count/1000).toFixed(1).toString()+"千";
		}else{
			return count;
		}
	}else{
		return count;
	}
}



$(document).ready(function(){
		setTimeout(function(){
			loadData("supply-tab1","0",1);
			loadData("purchase-tab1","0",2);
			displayIphoneIco();
			
			updateMarket();	
		},100);
});

function displayIphoneIco(){
	if($(".hn-tbar-tab-iphone").length>0){
			if(getCookie(iphoneCookie)){
					$(".hn-tbar-tab-iphone").show();
			}else{
					$(".hn-tbar-tab-iphone").hide();
			}
	}
}


function getMarketDetailUrl(marketDetail){
	var newsDetailUrl=newsurl+"market/"+marketDetail.areaId+"_"+marketDetail.category1Id+"_"+marketDetail.collectPoint+"_"+marketDetail.keyWorld+"_0";
	return newsDetailUrl;
}




	
	

	function _fillProductsSelectorAttention(){
		//输入信息
		_keyword = $.trim(_search_input);
		_fillProductSelectorTimeout = setTimeout(_fillProductsDataAttention,500)
	}
	
	
	function _fillProductsDataAttention(){
		if(_lastkeyword == _keyword && $(_selected_focus +' ul li').length > 0 ) return ;
		$.ajax({
			type:'post',
			url: _search_url + _initProductsData_url,
			data: {keyword: encodeURIComponent(_keyword) , t: Math.random()},
			dataType:'jsonp',
			jsonp :'callback',
			cache:false  ,
			jsonpCallback :'_fillProductsAttention',
			success:function(data){
				//清空原有数据
 				_fillProductsAttention(data);
				if(data && data.length > 0){
					search_drop = 1;
				}
			}
		});
		_lastkeyword = _keyword;
	}


//重刷类目TAB
function refreshCategories(categories){
	var supplies=categories.supplies;
	var purchases=categories.purchases;
	var analysisSupplies=categories.analysisSupplies;
	var analysisPurchases=categories.analysisPurchases;
	var recommends=categories.recommends;
	var mergedSupplies=mergeCategories(supplies,analysisSupplies,recommends);
	var mergedPurchases=mergeCategories(purchases,analysisPurchases,recommends);
	
	if(mergedSupplies){
		$("#supplyTabUl li a[fid!=0]").each(function(index, val){
			var tabIndex=index+2;
			if(mergedSupplies[index]){
				$(this).attr("fid",mergedSupplies[index].cateId);
				$(this).attr("ulLink","supply-tab"+tabIndex);
				$(this).text(mergedSupplies[index].cateName);
			}
		});
	}
	if(mergedPurchases){
		$("#purchaseTabUl li a[fid!=0]").each(function(index, val){
			var tabIndex=index+2;
			if(mergedPurchases[index]){
				$(this).attr("fid",mergedPurchases[index].cateId);
				$(this).attr("ulLink","purchase-tab"+tabIndex);
				$(this).text(mergedPurchases[index].cateName);
			}
		});
	}
	
}

function getDomain(){
 	  var domain = window.document.domain; //http://www.cnhnb.com
 	  var domainchars = domain.split(".");
 	  domain = "";
 	  for(var i = 1 ; i < domainchars.length ; i ++){
 		 domain += (i == 1 ? "" : ".") + domainchars[i] ;
 	  }
 	  return domain ;
}

function mergeCategories(attentionArray, analysisArray, recommendsArray){
	var result=[];
	var max=5;
	if(attentionArray){
		result=result.concat(attentionArray);
	}
	var size=result.length;
	if(analysisArray){
		$.map(analysisArray,function(item){
			var contained=false;
			if(size<max){
				if(attentionArray){
					$.map(attentionArray, function(item1){
						if(item.cateId==item1.cateId){
							contained=true;
						}
					});
				}
				if(!contained){
					result.push(item);
					size=size+1;
				}
			}
		});
	}
	if(recommendsArray){
		size=result.length;
		$.map(recommendsArray, function(item){
			var contained=false;
			if(size<max){
				$.map(result, function(item1){
					if(item.cateId==item1.cateId){
						contained=true;
					}
				});
				if(!contained){
					result.push(item);
					size=size+1;
				}
			}
		});
	}
	return result;
}

function attentionJsonpCallback (data) {
	
}	 