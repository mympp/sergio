var searchtype = 1;
function show(){
	document.getElementById("otherlogin").className = "otherlogin hover1";
	document.getElementById("otherlogin_ul").style.display = "block";
}

function hide(){
	document.getElementById("otherlogin").className = "otherlogin";
	document.getElementById("otherlogin_ul").style.display = "none";
}
jQuery(function () {	
	jQuery(".ad2Info").hover(function () {
		var scrollObj = jQuery(this);
		if (!scrollObj.is(":animated")) {
			jQuery(this).find(".ad2ScrollUp").stop().animate({ top: -95 }, 300);
		}
	}, function () {
		var scrollObj = jQuery(this);
		if (!scrollObj.is(":animated")) {
			jQuery(this).find(".ad2ScrollUp").stop().animate({ top: 0 },100);
		}
	});
});


jQuery(document).ready(function() {
		jQuery("#search_select").selectbox();
			

	});
		function search() {
			var dv = document.getElementById("keys").value;
                        dv = dv.replace(/(^[^\S]+)|([^\S]+$)/g, "");
                        okeys="";
                        
			if (dv.length<1) {
                                document.getElementById("keys").value="";				
                                				
			}
			else {		
                                dv = dv.replace("多个关键词间加空格，如：","");		
				dv = dv.replace(/\s/gi, "+");
                                okeys="_k"+unescape(escape(dv));		
			}
                        channgeform();
			return true;
		}

		function channgeform()
		{
	                var obj = document.getElementById("search_select");
			var opt = obj.options[obj.selectedIndex].value;
                        var s_from = document.getElementById("searchForm");
			switch(opt){
				case "1" :
					s_from.action= "/product/t0/list_p0"+okeys+".html";
					break;
				case "2" :
                                        s_from.action= "/offer_sale/t0/list_p0"+okeys+".html";
					break;
				case "3" :
                                        s_from.action= "/offer_buy/t0/list_p0"+okeys+".html";
					break;
				case "4" :
                                        s_from.action= "/offer_tender/t0/list_p0"+okeys+".html";
					break;
				case "5" :
                                        s_from.action= "/news/t0/list_p0"+okeys+".html";
					break;
				case "6" :
                                        s_from.action= "/company_news/t0/list_p0"+okeys+".html";
					break;
				case "7" :
                                        s_from.action= "/company/a_t0/list_p0"+okeys+".html";
					break;
				case "8" :
                                        s_from.action= "/exhibition/t0/list_p0"+okeys+".html";
					break;
				case "9" :
                                        s_from.action= "/tech_news/t0/list_p0"+okeys+".html";
					break;
				case "10" :
                                        s_from.action= "/technology/t0/list_p0"+okeys+".html";
					break;
				case "11" :
                                        s_from.action= "/sample/t0/list_p0"+okeys+".html";
					break;
				case "12" :;
                                        s_from.action= "/brands/t0/list_p0"+okeys+".html";
					break;
				case "13" :
                                        s_from.action= "/video/t0/list_p0"+okeys+".html";
					break;	
				case "14" :
                                        s_from.action= "/job/recruitment/t0/list_p0"+okeys+".html";
					break;
				default :
                                        s_from.action= "/product/t0/list_p0"+okeys+".html";
					break;
			}            
		}

		function UserSelected(employe) {
        jQuery("#keys").val(employe.Keyword);
    }

    function GetData(value, displayData) {
        Vivian.GetSearchResult(10, value, function (objs) {
            displayData(objs.value);
        });
    }
    function keyPressSearch(item, propertyName) {
        var obj = document.getElementById("search_select");
	searchtype = obj.options[obj.selectedIndex].value;
        if (searchtype == 1) {
            jtips.getKeyWord(item, propertyName)
        }
    }

function UserConfirm(employe) {
        if (employe == null) {
            jQuery("#keys").val("");
        } else if(employe == ""){
            jQuery("#searchbtn").click();
        } else {
            jQuery("#keys").val(employe.Keyword);
            jQuery("#searchbtn").click();
        }
    }
