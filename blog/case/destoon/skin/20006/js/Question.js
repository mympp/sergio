var aId=1;function clickT(B,A){if(B.className=="proButton"){B.className="proCurrent";document.getElementById("item"+aId).className="proButton";document.getElementById("chag"+aId).style.display="none";document.getElementById("chag"+A).style.display="block";aId=A;if(A!=1){$(".xp_product img").lazyload({effect:"fadeIn"})}}}


var bId = 5; //当前
        function clickTb(obj, sId) {
            if (obj.className == "proButton") {
                obj.className = "proCurrent";
				 
                document.getElementById("item" + bId).className = "proButton";
                document.getElementById("chag" + bId).style.display = "none";
                document.getElementById("chag" + sId).style.display = "block";
                bId = sId;
              
            }
        }









function Answer(){var A=document.getElementById("searchKeyword").value;if(Trim(A.replace("请输入您的问题...",""))==""){alert("搜索条件不能为空");return false}window.open("http://www.glass.cn/zhishi/ask_1_0_1_"+encodeURIComponent(A)+".html");return false}function searchDefault(){var A=window.event.keyCode;if(A==13){document.getElementById("login-submit").click()}}function Trim(A){return A.replace(new RegExp("&nbsp;","g"),"").replace(new RegExp("<br />","g"),"").replace(/^\s+|\s+$/g,"")};

