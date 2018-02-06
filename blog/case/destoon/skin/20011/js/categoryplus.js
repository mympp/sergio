function txtlength_sy2(){
		var txt=document.getElementById("product_name").value;
		if(txt=="«Î ‰»Îƒ˙“™À—À˜µƒ≤˙∆∑πÿº¸¥ ") return false;
		//document.getElementById('searchdiv').style.display=''
		if(txt.length>0){
			changeinput_sy("product_name");
		}else if(txt.length<1){
			document.getElementById("searchdiv").style.display='none';
		}
}
function changeinput_new(elementx){
	var elementxx=document.getElementById(elementx).value;
	$.ajax({
			url:ajaxurl("member","prod_sort_kwd"),
			type:"post",
			dataType:"json",
			data:{kwd:elementxx,v:Math.random()},
			success:function(data, textStatus){
				var innerH="";
				if(data.ok==1){
					if(elementxx!=document.getElementById(elementx).value) return ;
					for(var i=0;i<data.cat.length;i++){
						innerH+="<span id=listspan onmouseover=this.style.background='#ceebff' onmouseout=this.style.background='' onkeydown='sy_keydown()'><a href='http://www.goepe.com/search/search.php?catid="+data.cat[i].id+"&keyword="+elementxx+"'  target='_blank' onclick='getkeyword(this)' onmouseover='javascript:$(this).focus()'>&nbsp;"+showprodcatname(data.cat[i].id.substr(0,2))+"&nbsp;<font style='color:#666666'>>></font><font class='searchdiv_col'>&nbsp;"+data.cat[i].name+"</font></a></span>";
					}
					document.getElementById("searchdiv").innerHTML=innerH;
					document.getElementById("searchdiv").style.display='block';
					if(!innerH)document.getElementById("searchdiv").style.display='none';
					hiddenblur('searchdiv','visible');
				}
			},
			error:function(XMLHttpRequest, textStatus, errorThrown){
				//alert("≤Ÿ◊˜ ß∞‹£¨«Î÷ÿ ‘£°");
			}
			
		});	
}
function txtlength_syindex(){

		var txt=document.getElementById("tsearch_input").value;
		if(txt=="«Î ‰»ÎÀ—À˜πÿº¸¥ ") return false;
		if(txt.length>0){
			changeinput_newindex("tsearch_input");
		}else if(txt.length<1){
			document.getElementById("tsearch_div").style.display='none';
		}
}

function changeinput_newindex(elementx){
	var elementxx=document.getElementById(elementx).value;
	$.ajax({
			url:ajaxurl("member","prod_sort_kwd"),
			type:"post",
			dataType:"json",
			data:{kwd:elementxx,v:Math.random()},
			success:function(data, textStatus){
				var innerH="";
				if(data.ok==1){
					if(elementxx!=document.getElementById(elementx).value) return ;
					for(var i=0;i<data.cat.length;i++){
						innerH+="<span id=listspan onmouseover=this.style.background='#ceebff' onmouseout=this.style.background='' onkeydown='sy_keydown()'><a href='http://www.goepe.com/search/search.php?catid="+data.cat[i].id+"&keyword="+elementxx+"'  target='_blank' onclick='getkeyword(this)' onmouseover='javascript:$(this).focus()'>&nbsp;"+showprodcatname(data.cat[i].id.substr(0,2))+"&nbsp;<font style='color:#666666'>>></font><font class='searchdiv_col'>&nbsp;"+data.cat[i].name+"</font></a></span>";
					}
					document.getElementById("tsearch_div").innerHTML=innerH;
					document.getElementById("tsearch_div").style.display='block';
					if(!innerH)document.getElementById("tsearch_div").style.display='none';
					hiddenblur('tsearch_div','visible');
				}
			},
			error:function(XMLHttpRequest, textStatus, errorThrown){
				//alert("≤Ÿ◊˜ ß∞‹£¨«Î÷ÿ ‘£°");
			}
		});	
}

