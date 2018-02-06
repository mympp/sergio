function TopSubsearch() {
			var dv = document.getElementById("keys2").value;
			if (dv.length < 1 || dv == "请输入您要搜索的关键字") {				
				document.getElementById("keys2").value="";
				document.getElementById("keys2").focus(); 
				return false;
			}
			else {				
				dv = dv.replace(/(^[^\S]+)|([^\S]+$)/g, "");				
			}
			channgeform2();
			return true;
		}
		
		function showSelectBox2(){
			jQuery("#search_select_container2").toggle();
		}
		
		function changeSelect2(obj){			
			jQuery("#changeShow2").text(jQuery(obj).text());
			jQuery("#changevalue2").attr("value",jQuery(obj).attr("value"));
			jQuery("#search_select_container2").hide();
			jQuery("#soption2 li").removeAttr("class");
			jQuery("#soption2 li").removeAttr("selected");
			jQuery(obj).attr("selected","selected");
			jQuery(obj).attr("class","selected");
		}

		function channgeform2()
		{
	        var obj = document.getElementById("soption2");
			var opt = jQuery("#changevalue2").val();
            var s_from = document.getElementById("subsearchForm");
			switch(opt){
				case "1" :
					s_from.action = "/sell/search.php?moduleid=5";
					break;
				case "2" :
					s_from.action = "/photo/search.php?moduleid=12";
					break;
				case "3" :
					s_from.action = "/buy/search.php?moduleid=6";
					break;
				case "4" :
					s_from.action = "/company/search.php?moduleid=4";
					break;
				case "5" :
					s_from.action = "/quote/search.php?moduleid=7";
					break;
				case "6" :
					s_from.action = "/exhibit/search.php?moduleid=8";
					break;
				case "7" :
					s_from.action = "/news/search.php?moduleid=21";
					break;
				case "8" :
					s_from.action = "/brand/search.php?moduleid=13";
					break;

			}            
		}
function hideList2(){ 
document.getElementById("search_select_container2").style.display="none"; 
} 
function showList2(){ 
document.getElementById("search_select_container2").style.display="block"; 
} 