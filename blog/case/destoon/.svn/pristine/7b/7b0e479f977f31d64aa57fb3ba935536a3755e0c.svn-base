$.fn.extend({
/* 用途:联想搜索插件padding:5px 0;
 * 参数:
 *      1.options type搜索类型(1.供应,2.求购,3.招商,4,公司,5.资讯)
 *      2.callback回调方法
 */
searchKeyword:function( options, callback ) {
    var settings = {
        type: 1,
        maxResult: 10,
        maxPinLei: 5,
        top: 0,
        left: 0,
        width: 0,
        out: "search_toplist search_srtxt",
        innerOn: "",
        innerOff: "search_li_bj"
    }
    
    options = options || {};
    $.extend(settings, options);
    var $this = $(this);
    var _this = this;
    var tagName1 = $this.attr("tagName");
    if(tagName1 != null && tagName1 != 'undefind'){
    	if( $this.attr("tagName").toLowerCase() != "input") {
            return ;
        }
    }
    var identityId =+ new Date,idenName = "";
    idenName = "#searchKeyWord" + identityId;
    var createDom = $( idenName);
    if( createDom.length == 0 ) {
        var createDiv = $('<ul></ul>');	
        $(this).after(createDiv);
        //$(createDiv).css( {'position': 'absolute','z-index': '10000','top':$this.offset().top + $this.height() + settings.top,'left':$this.offset().left + settings.left,'width': settings.width == 0 ? $this.width() : settings.width + "px" } );
        $(createDiv).attr( {'id': "searchKeyWord" + identityId,"class": settings.out} );
        createDom = createDiv;
    }
    $( idenName ).hide();
    $( this ).bind("keydown", function( e ) {
        var key = e.keyCode;
        if( !(key == 38 || key == 40) ) {
            return ;
        }
        (function() {
              var currentObj=null;
              $( idenName).find("li").each( function(i, obj) {
                    if($(obj).attr("class") == settings.innerOff ){
                        currentObj = obj;
                        return false;
                    }
                } )
              if (key == 38) {
                     if(currentObj == null || currentObj == undefined ) {
                        if($( idenName).find("li").length > 0)
                        $( idenName).find("li:last").attr("class",settings.innerOff);
                        if($( idenName).find("li:last").attr("tag") != "1" )
                        $(_this).val($( idenName).find("li:last A").attr("showname"));
                     }
                     else {
                         $(currentObj).attr("class",settings.innerOn);
                         $(currentObj).prev().attr("class",settings.innerOff); 
                         if($(currentObj).prev() != "1" )
                         $(_this).val($(currentObj).prev().find("A").attr("showname"));
                     }
                }
              if (key == 40) {
                    if(currentObj == null || currentObj == undefined ) {
                        if($( idenName).find("li").length > 0)
                        $( idenName).find("li:first").attr("class",settings.innerOff);
                        if($(_this).attr("tag") != "1" )
                        $(_this).val($( idenName).find("DIV:first A").attr("showname"));
                    }
                    else {
                         $(currentObj).attr("class",settings.innerOn);
                         $(currentObj).next().attr("class",settings.innerOff); 
                         if($(currentObj).next().attr("tag") != "1" )
                         $(_this).val($(currentObj).next().find("A").attr("showname"));
                    }
                }
        })();
        
    })
    
    $('body').click(function() {
            $( idenName ).hide();
    })
    
    $( this ).bind("click", function(e) {
        if($(this).val() != "") {
        if(e && e.stopPropagation) {
             e.stopPropagation();
          }else {
             window.event.cancelBubble = true;
          }
          //$( idenName ).show();
        }
    })
    var template = "<li class='" + settings.innerOn + "'  onmouseover='this.className=\"" + settings.innerOff + "\";$(\"#" + $(_this).attr("ID") + "\").val($(this).find(\"a\").attr(\"showname\"))' onmouseout='this.className=\"" + settings.innerOn + "\"'  tag='0' >{NAME}</li>";
    var template1 = "<li class='" + settings.innerOn + "' tag='1' onmouseover='this.className=\"" + settings.innerOff + "\";' onmouseout='this.className=\"" + settings.innerOn + "\"' >{NAME}</li>";
    if( $(this).val() != "" ) {
        
       $this.bind( "keyup", function( e ) {
            var searchUrl = "supply/",current = "";
            current = $("#searchTabUl li[class='on'] A").html();
  
        
           var keyNum = e.keyCode;
           if(keyNum == 38 || keyNum == 40 )
           return ;
           
           var v = $(this).val();
           
           //1:-suplly 供应  2:member 会员 3：purchase 采购 4：Investment 招商 5：news 资讯 6：baike 百科  （默认供应）
         
           var url ="/portal/sousuo?c=10&channel="+channel+"&name="+v;
           
           $.getJSON(url+"&t="+new Date, function(json) {
                if(json != null && json != 'undefind') {
                    $( idenName ).empty();
                    if(json.searchWord!=null && json.searchWord != 'undefind' && json.searchWord.length > 0) {
                        for(var i in json.searchWord){
                            if(json.searchWord[i].Word != undefined ) {
                            	if(channel==1 && i==0){
                            		var b="<a href='http://"+searchUrl+ "listing/"+json.searchWord[i].Word+"' showname = " + json.searchWord[i].Word +" onclick='sendTrackInfoKey(\""+searchUrl+"\",\""+json.searchWord[i].Word+"\");'>"+json.searchWord[i].Word.replace($this.val(),"<font color='red'>" + $this.val() + "</font>")+""+"<span style='float:right;margin-right:5px;'>约"+json.searchWord[i].Count+"条结果</span></a>"
                            		for(var j in json.category){
                            			 var key=encodeURI(json.searchWord[i].Word);
                            			 var a="<p class='sear_key_p clearfix'><a href='http://"+searchUrl+ "list?cp=1&k="+key+"&code=" + json.category[j].code +"' showname = " + json.searchWord[i].Word +" onclick='sendTrackInfo(\""+searchUrl+"\",\""+json.searchWord[i].Word+"\",\""+json.category[j].code+"\");'><em class='fr'>约"+json.category[j].hits+"条结果</em>在<em class='keyPoint'>"+json.category[j].name + "</em>分类中搜索</a></p>";
                            			 b=b+""+a;
                            		 }
                            		createDom.append( $( template.replace(/\{NAME\}/ig,b)));
                            	}else{
                                	createDom.append( $( template.replace(/\{NAME\}/ig,"<a href='http://"+searchUrl+ "listing/"+json.searchWord[i].Word+"' showname = " + json.searchWord[i].Word +" onclick='sendTrackInfoKey(\""+searchUrl+"\",\""+json.searchWord[i].Word+"\");'>"+json.searchWord[i].Word.replace($this.val(),"<font color='red'>" + $this.val() + "</font>")+""+"<span style='float:right;margin-right:5px;'>约"+json.searchWord[i].Count+"条结果</span></a>") ) );
                            	}
                            }
                        }
                    }
                    
                    $( idenName ).show();
                }
                else {
                    $( idenName ).hide();
                }
            }); 
       } );
    }
}
});





$(function(){
	$("#txtSearch").searchKeyword({type: 1,maxResult: 10});
	/*搜索*/
	$(".searchTab ul li").each(function(){
		$(this).click(function(){
			$(".searchTab ul li").removeClass("on")
			$(this).addClass("on");
			var txtSearch=$('#txtSearch').val();
			var indexOfTxtSearch=txtSearch.indexOf('请输入');
			
			if($(".searchTab ul li").eq(0).attr("class")=="on"&&indexOfTxtSearch>=0){$(".searchCon input").eq(0).attr("value","请输入供应商名称");}
			else{
				if($(".searchTab ul li").eq(1).attr("class")=="on"&&indexOfTxtSearch>=0){$(".searchCon input").eq(0).attr("value","请输入求购名称");}
				else{
					if($(".searchTab ul li").eq(2).attr("class")=="on"&&indexOfTxtSearch>=0){$(".searchCon input").eq(0).attr("value","请输入企业名称");}
					else{
						if($(".searchTab ul li").eq(3).attr("class")=="on"&&indexOfTxtSearch>=0){$(".searchCon input").eq(0).attr("value","请输入招商名称");}
						else{
							if($(".searchTab ul li").eq(4).attr("class")=="on"&&indexOfTxtSearch>=0){$(".searchCon input").eq(0).attr("value","请输入资讯名称");}
							else{
								if($(".searchTab ul li").eq(5).attr("class")=="on"&&indexOfTxtSearch>=0){$(".searchCon input").eq(0).attr("value","请输入百科名称");}
							}
						}
					}
				}
			}
			$('.searchTxt').each(function(){  
				var txt = $(this).val();  
				var txtIndexOf=txt.indexOf('请输入');
				$(this).focus(function(){  
					if(txt === $(this).val()&&txtIndexOf>=0) $(this).val("");  
					}).blur(function(){  
					if($(this).val() == "") $(this).val(txt);  
				});  
			}) 
		})
	
	}); 	

	/*搜索*
	/*zminput换文字颜色*/
	function inputTipText() {
		$("[class*=grayTips]") // 所有样式名中含有grayTips的input
		.each(function() {
			var _this = $(this);
		   if($.trim(_this.val()) == '' || _this.val() == '请输入关键字'){
			   _this.css('color', '#888');
		   }else{
			   _this.css('color', '#000');
		   }
			_this.focus(function() {
					if (_this.val() =='请输入关键字') {
						_this.val('').css("color", "#000");
				 }})
				.blur(function() {
				if (!_this.val() || $.trim(_this.val()) == "" || _this.val() =='请输入关键字') {
					_this.val("请输入关键字").css("color", "#888");
				}
			}).keydown(function() {
				_this.css({
					"color" : "#000"
				})
			})
		})
	}  	
	$(function(){     
		inputTipText();  //直接调用就OK了
		return false;     
	})
});

//搜索按钮回车事件
$(document).ready(function(){
	$("#txtSearch").keypress(function(e){
		var curKey = e.which;
		if(curKey == 13){
			btnSearch();
			return false;
		}
		return true;
	});
}); 

// 搜索TAB切换事件
function setSearchTab(searchTab, isTrack) {
	$("#hidSearch").val(searchTab);
	var searchTxt = $.trim($("#txtSearch").val());
	if(isTrack && isTrack == 1) {
		$("#hidSearch").attr("track", 1);
	} else {
		$("#hidSearch").removeAttr("track");
	}
	if (searchTxt == null || searchTxt.length == 0 || searchTxt == "请输入关键字"|| searchTxt == "请输入供应商名称"|| searchTxt == "请输入求购名称"|| searchTxt == "请输入企业名称"|| searchTxt == "请输入招商名称"|| searchTxt == "请输入资讯名称"|| searchTxt == "请输入百科名称") {
		return;
	} else {
		btnSearch();
	}
}





//生成uuid
function uuid() {
	var s = [];
	var hexDigits = "0123456789abcdef";
	for (var i = 0; i < 36; i++) {
		s[i] = hexDigits.substr(Math.floor(Math.random() * 0x10), 1);
	}
	s[14] = "4"; // bits 12-15 of the time_hi_and_version field to 0010
	s[19] = hexDigits.substr((s[19] & 0x3) | 0x8, 1); // bits 6-7 of the clock_seq_hi_and_reserved to 01
	s[8] = s[13] = s[18] = s[23] = "-";
	var uuid = s.join("");
	return uuid;
}

//图片重新加载
function reloadImage(obj) {
	var times = $(obj).attr("times");
	if(!times) {
		$(obj).attr("times", 1);
		times = 1;
	}
	if(parseInt(times) <= 3) {
		var url = $(obj).attr("src");
		if(url.indexOf("?") > 0) {
			url = url.substring(0, url.indexOf("?"));
		}
		$(obj).attr("src", url + "?t=" + new Date().getTime());
		$(obj).attr("times", parseInt(times) + 1);
	}
}