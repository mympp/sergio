function SubstringDemo(str,lenght)
{
   var detail;                              
   detail = str.substring(0, lenght);   
   return(detail);                    
}


function $(s){
	if(document.getElementById){
		return document.getElementById(s);
	}
	else{
		return document.all[s];
	}
}
function $n(s, o){
	if (o == null){
		return document.getElementsByName(s);
	}
	else{
		return o.getElementsByName(s);
	}
}
function $t(s, o){
	if (o == null){
		return document.getElementsByTagName(s);
	}
	else{
		return o.getElementsByTagName(s);
	}
}
function $r(s){
	for (var i = 0; i < $n(s).length; i++){
		if ($n(s)[i].checked)
			return $n(s)[i]; 
	}
}
function $$(s){
	return document.frames?document.frames[s]:$(s).contentWindow;
}
function $c(s){
	return document.createElement(s);
}
function exist(s){
	return s != null;
}
function dw(s){
	document.write(s);
}
function hidden(obj){
	obj.style.display = (obj.style.display == 'none') ? '' : 'none';
}
function isNull(_sVal){
	return (_sVal === "" || _sVal == null || _sVal == "undefined");
}
function removeNode(s){//此处在ＦＦ不能运行
	if(exist(s)){
		s.removeNode?s.removeNode(true):s.parentNode.removeChild(s);
	}
}

//图片自适应宽高
function ChangePicSize(id,w){
    var p;
    if(parent.parent.document.getElementById(id))
        p = parent.parent.document.getElementById(id);
    else
        p = $(id);
    var newimg = new Image();//新建一个image对象，以获取新图片的大小
    newimg.src = p.src;
    var pw = newimg.width;
    var ph = newimg.height;
    
    w = parseInt(w);
    if(pw>w||ph>w){
        if(pw>ph){//宽大于高，以宽度为标准缩放
            p.width = w;
            var scale = w/pw;
            p.height = ph*scale;
        }
        else if(pw<=ph){//高大于等于宽
            p.height = w;
            var scale = w/ph;
            p.width = pw*scale;
        }
    }
    else{//小于标准的图片，都还原。
        p.width = pw;
        p.height = ph;
    }
}

//检查textarea的长度
function chkTextareaMaxLength(oInObj)
{
    var iMaxLen = parseInt(oInObj.getAttribute('maxlength'));
    var iCurLen = oInObj.value.length;

    if ( oInObj.getAttribute && iCurLen > iMaxLen )
    {
        oInObj.value = oInObj.value.substring(0, iMaxLen);
    }
}

///得到div中被选种的checkbox值
function ChkValue(object){
            var  str=new StringBuilder();
            var object=$(object);
            var objchk=object.getElementsByTagName("input");
            for(i=0;i<=objchk.length-1;i++){  
                 if(objchk[i].type=="checkbox"){   
                       if(objchk[i].checked){
                          str.append(objchk[i].value);
                          str.append(",");
                       }
                    }  
                } 
             var result = str.toString();
             result=result.substring(0,result.length-1);
             return result;
 
}


function StringBuilder(){
	this._str= new Array();
}
//按先后顺序追加字符串
StringBuilder.prototype.append = function(str){
	this._str.push(str);
}
StringBuilder.prototype.toString = function(){
	return this._str.join('');
}
//清除数组
StringBuilder.prototype.clear = function (){
    this._str.length = 0;
}
//获取长度
StringBuilder.prototype.size = function (){
    return this._str.length;
}
///按降序
StringBuilder.prototype.asc = function (){
    return this._str.sort();
}
//获取数组的第一个值
StringBuilder.prototype.first=function() {
    return this._str[0];
  }
//获取最后一个值
StringBuilder.prototype.last=function() {
    return this._str[this._str.length - 1];
  }
//返回指定元素的索引若没有侧返回-1
StringBuilder.prototype.indexOf=function(object){
    for (var i = 0; i < this._str.length; i++)
      if (this._str[i] == object) return i;
    return -1;
  }
//返回倒的数组值
StringBuilder.prototype.desc=function() {
    return this._str.reverse();
 }
 
 /*js的Request实现*/
function GetQueryString(name){
	
    var reg = new RegExp("(^|&)"+ name +"=([^&]*)(&|$)");  
    var r = window.location.search.substr(1).match(reg);  
    if (r!=null) return unescape(r[2]); return null;  
}  




//linkObj:被点击的连接,index：这个链接显示的是第几个div,total:一共有多少id以个divTab开头的div
function changestyle(linkObj,index,total){
    for(var i=1;i<=total;i++){
       if(i==index){
           $("divTab"+i).style.display = "";           
       }
       else{
           $("divTab"+i).style.display = "none";
       }
    }
    
    var links = document.getElementsByName("clickLink");
    for(var i = 0;i<links.length;i++){
        if(links[i]==linkObj){
            links[i].className = "atitel02";
        }
        else{
            links[i].className = "atitel01";
        }
    }
}

function ReadCookies(name){
      var   cookieValue   =   "";   
      var   search   =   name   +   "=";   
      if(document.cookie.length   >   0)   
      {
      
          offset   =   document.cookie.indexOf(search);   
          if   (offset   !=   -1)   
          {     
              offset   +=   search.length;   
              end   =   document.cookie.indexOf(";",   offset);   
              if   (end   ==   -1)   end   =   document.cookie.length;   
              cookieValue   =   unescape(document.cookie.substring(offset,   end))   
          }   
      }
      //alert(cookieValue);
      return cookieValue;   
}

//添加cook
function WriteCookies(c_name,value,expiredays)
{
 var exdate = new Date();
 exdate.setDate(exdate.getDate() + expiredays);
 // 使设置的有效时间正确。增加toGMTString()
 document.cookie = c_name + "=" +escape(value) + ((expiredays == null) ? "" : ";expires=" + exdate.toGMTString()) + ";path=/";
}

//删除cookie
function DelCookies(name)
{
    var exp = new Date();
    exp.setTime(exp.getTime() - 1);
    var cval=ReadCookies(name);
    if(cval!=null) document.cookie= name + "="+cval+";expires="+exp.toGMTString() + ";path=/";
}

function trim(str)
{str=(str+"");for(var i=0;i<str.length&&str.charAt(i)==" ";i++);for(var j=str.length;j>0&&str.charAt(j-1)==" ";j--);if(i>j)return"";return str.substring(i,j);}

function GetCharLength(str)
{var iLength=0;for(var i=0;i<str.length;i++)
{if(str.charCodeAt(i)>255)
{iLength+=2;}
else
{iLength+=1;}}
return iLength;}

//修正IE下document.getElementsByName无法获取DIV SPAN标签 .
var getElementsByName = function(tag, name){
    var returns = document.getElementsByName(name);
    if(returns.length > 0) return returns;
    returns = new Array();
    var e = document.getElementsByTagName(tag);
    for(var i = 0; i < e.length; i++){
        if(e[i].getAttribute("name") == name){
            returns[returns.length] = e[i];
        }
    }
    return returns;
}