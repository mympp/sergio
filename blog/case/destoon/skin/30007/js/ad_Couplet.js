/*
对联广告v1.0.2版
不清楚请联系技术部
2012.02.08 周志坚
*/

/*对联广告全局变量*/
//toTopHeight:距离浏览器可见区域上方距离
var _toTopHeight = toTopHeight;
//toSideSpace:显示浏览器可见区域侧边距离
var _toSideSpace = toSideSpace;
//advHideTime:页面加载后几秒钟切换为小图
var _advHideTime = advHideTime*1000;
//isClose:是否需要关闭，1代表需要，0代表不需要
var _isClose = isClose;
//advPair:几对对联广告,和下面填写的广告参数要对应;最多2对对联
var _advPair = advPair;

//以下为对联广告信息
var _leftBigAdv1 = "";
var _leftSmallAdv1 = "";
var _rightBigAdv1 = "";
var _rightSmallAdv1 = "";
var _leftBigAdv2 = "";
var _leftSmallAdv2 = "";
var _rightBigAdv2 = "";
var _rightSmallAdv2 = "";

if(_advPair==1){
	var _leftBigAdv1 = leftBigAdv1;
	var _leftSmallAdv1 = leftSmallAdv1;
	var _rightBigAdv1 = rightBigAdv1;
	var _rightSmallAdv1 = rightSmallAdv1;
}

if(_advPair == 2){
	_leftBigAdv2 = leftBigAdv2;
	_leftSmallAdv2 = leftSmallAdv2;
	_rightBigAdv2 = rightBigAdv2;
	_rightSmallAdv2 = rightSmallAdv2;
}

//<[[
function load(){
	if(_advPair>0){
		main();
		move();
		setTimeout("HideAD('leftBigAdv1','leftSamllAdv1');",_advHideTime);
		setTimeout("HideAD('rightBigAdv1','rightSamllAdv1');",_advHideTime);
		if(_advPair==2){
			setTimeout("HideAD('leftBigAdv2','leftSamllAdv2');",_advHideTime);		
			setTimeout("HideAD('rightBigAdv2','rightSamllAdv2');",_advHideTime);
		}
	}
}

function move() {
	main();
	setTimeout("move();",80)				
}

function CloseAD(Ad_div){
	document.getElementById(Ad_div).style.display="none";
}

function OpenAD(){
	document.getElementById("leftBigAdv1").style.display="block";
	document.getElementById("leftSamllAdv1").style.display="none";
	document.getElementById("rightBigAdv1").style.display="block";
	document.getElementById("rightSamllAdv1").style.display="none";
	if(_advPair==2){
		document.getElementById("leftBigAdv2").style.display="block";
		document.getElementById("leftSamllAdv2").style.display="none";
		document.getElementById("rightBigAdv2").style.display="block";
		document.getElementById("rightSamllAdv2").style.display="none";
	}
}

function HideAD(){
	document.getElementById("leftBigAdv1").style.display="none";
	document.getElementById("leftSamllAdv1").style.display="block";
	document.getElementById("rightBigAdv1").style.display="none";
	document.getElementById("rightSamllAdv1").style.display="block";
	if(_advPair==2){
		document.getElementById("leftBigAdv2").style.display="none";
		document.getElementById("leftSamllAdv2").style.display="block";
		document.getElementById("rightBigAdv2").style.display="none";
		document.getElementById("rightSamllAdv2").style.display="block";
	}
}

function main(){
	document.getElementById("LeftAdv1").style.top = (document.body.scrollTop?document.body.scrollTop:document.documentElement.scrollTop) + Number(_toTopHeight) + 'px';
	document.getElementById("RightAdv1").style.top = (document.body.scrollTop?document.body.scrollTop:document.documentElement.scrollTop) + Number(_toTopHeight) + 'px';
	document.getElementById("LeftAdv1").style.left = _toSideSpace + 'px';
	document.getElementById("RightAdv1").style.right = _toSideSpace + 'px';
	
	if(_advPair == 2){
		document.getElementById("LeftAdv2").style.top = (document.body.scrollTop?document.body.scrollTop:document.documentElement.scrollTop) + Number(_toTopHeight) + Number(_leftBigAdv1[3]) + 20 + 'px';
		document.getElementById("RightAdv2").style.top = (document.body.scrollTop?document.body.scrollTop:document.documentElement.scrollTop) + Number(_toTopHeight) + Number(_rightBigAdv1[3]) + 20 + 'px';
		document.getElementById("LeftAdv2").style.left = _toSideSpace + 'px';
		document.getElementById("RightAdv2").style.right = _toSideSpace + 'px';
	}
}

if(_advPair>0){
	/*leftAdv1开始*/
	document.write("<div id=\"LeftAdv1\" style=\"position: absolute;z-index:99999;width:"+_leftBigAdv1[2]+"px;\"><div id=\"leftBigAdv1\" onMouseOut=\"HideAD()\" width=\"" + _leftBigAdv1[2] + "\" height=\"" + _leftBigAdv1[3] + "\"><a href=\"" + _leftBigAdv1[1] +"\" target=\"_blank\">");
	if (_leftBigAdv1[4] == 1) {
		document.write("<embed src=\"" + _leftBigAdv1[0] + "\" quality=\"high\" width=\"" + _leftBigAdv1[2] + "\" height=\"" + _leftBigAdv1[3] + "\" type=\"application/x-shockwave-flash\" wmode=\"opaque\"></embed>");
	}else{
		document.write("<img src=\"" + _leftBigAdv1[0] + "\" width=\"" + _leftBigAdv1[2] + "\" height=\"" + _leftBigAdv1[3] + "\" border=\"0\" />");
	}
	document.write("</a></div><div id=\"leftSamllAdv1\" style=\"display: none;\" onMouseOver=\"OpenAD()\" width=\"" + _leftSmallAdv1[2] + "\" height=\"" + _leftSmallAdv1[3] + "\">");
	if (_leftSmallAdv1[4] == 1) {
		document.write("<embed src=\"" + _leftSmallAdv1[0] + "\" quality=\"high\" width=\"" + _leftSmallAdv1[2] + "\" height=\"" + _leftSmallAdv1[3] + "\" type=\"application/x-shockwave-flash\" wmode=\"opaque\"></embed>");
	}else{
		document.write("<img src=\"" + _leftSmallAdv1[0] + "\" width=\"" + _leftSmallAdv1[2] + "\" height=\"" + _leftSmallAdv1[3] + "\" border=\"0\" />");
	}
	document.write("</div>");
	if(_isClose==1){
		document.write("<div style=\"height:20px;text-align:left;width:"+_leftBigAdv1[2]+"px;\"><a href=\"Javascript:CloseAD('LeftAdv1')\" style=\"color:#b9b9b9\" target=\"_parent\">×</a></div>");
	}
	document.write("<br /><br /></div>");
	/*leftAdv1结束*/


	/*leftAdv2开始*/
	if(_advPair==2){	
		document.write("<div id=\"LeftAdv2\" style=\"position: absolute;z-index:99999;width:"+_leftBigAdv2[2]+"px;\"><div id=\"leftBigAdv2\" onMouseOut=\"HideAD()\" width=\"" + _leftBigAdv2[2] + "\" height=\"" + _leftBigAdv2[3] + "\"><a href=\"" + _leftBigAdv2[1] +"\" target=\"_blank\">");
		if (_leftBigAdv2[4] == 1) {
			document.write("<embed src=\"" + _leftBigAdv2[0] + "\" quality=\"high\" width=\"" + _leftBigAdv2[2] + "\" height=\"" + _leftBigAdv2[3] + "\" type=\"application/x-shockwave-flash\" wmode=\"opaque\"></embed>");
		}else{
			document.write("<img src=\"" + _leftBigAdv2[0] + "\" width=\"" + _leftBigAdv2[2] + "\" height=\"" + _leftBigAdv2[3] + "\" border=\"0\" />");
		}
		document.write("</a></div><div id=\"leftSamllAdv2\" style=\"display: none;\" onMouseOver=\"OpenAD()\" width=\"" + _leftSmallAdv2[2] + "\" height=\"" + _leftSmallAdv2[3] + "\">");
		if (_leftSmallAdv2[4] == 1) {
			document.write("<embed src=\"" + _leftSmallAdv2[0] + "\" quality=\"high\" width=\"" + _leftSmallAdv2[2] + "\" height=\"" + _leftSmallAdv2[3] + "\" type=\"application/x-shockwave-flash\" wmode=\"opaque\"></embed>");
		}else{
			document.write("<img src=\"" + _leftSmallAdv2[0] + "\" width=\"" + _leftSmallAdv2[2] + "\" height=\"" + _leftSmallAdv2[3] + "\" border=\"0\" />");
		}
		document.write("</div>");
		if(_isClose==1){
			document.write("<div style=\"height:20px;text-align:left;width:"+_leftBigAdv2[2]+"px;\"><a href=\"Javascript:CloseAD('LeftAdv2')\" style=\"color:#b9b9b9\" target=\"_parent\">×</a></div>");
		}
		document.write("<br /><br /></div>");	
	}
	/*leftAdv2结束*/


	/*rightAdv1开始*/
	document.write("<div id=\"RightAdv1\" style=\"position: absolute;z-index:99999;width:"+_rightBigAdv1[2]+"px;\"><div style=\"text-align:right;\" id=\"rightBigAdv1\" onMouseOut=\"HideAD()\" width=\"" + _rightBigAdv1[2] + "\" height=\"" + _rightBigAdv1[3] + "\"><a href=\"" + _rightBigAdv1[1] +"\" target=\"_blank\">");
	if (_rightBigAdv1[4] == 1) {
		document.write("<embed src=\"" + _rightBigAdv1[0] + "\" quality=\"high\" width=\"" + _rightBigAdv1[2] + "\" height=\"" + _rightBigAdv1[3] + "\" type=\"application/x-shockwave-flash\" wmode=\"opaque\"></embed>");
	}else{
		document.write("<img src=\"" + _rightBigAdv1[0] + "\" width=\"" + _rightBigAdv1[2] + "\" height=\"" + _rightBigAdv1[3] + "\" border=\"0\" />");
	}
	document.write("</a></div><div style=\"text-align:right;display: none;\" id=\"rightSamllAdv1\"  onMouseOver=\"OpenAD()\" width=\"" + _rightSmallAdv1[2] + "\" height=\"" + _rightSmallAdv1[3] + "\">");
	if (_rightSmallAdv1[4] == 1) {
		document.write("<embed src=\"" + _rightSmallAdv1[0] + "\" quality=\"high\" width=\"" + _rightSmallAdv1[2] + "\" height=\"" + _rightSmallAdv1[3] + "\" type=\"application/x-shockwave-flash\" wmode=\"opaque\"></embed>");
	}else{
		document.write("<img src=\"" + _rightSmallAdv1[0] + "\" width=\"" + _rightSmallAdv1[2] + "\" height=\"" + _rightSmallAdv1[3] + "\" border=\"0\" />");
	}
	document.write("</div>");
	if(_isClose==1){
		document.write("<div style=\"height:20px;text-align:right;width:"+_rightBigAdv1[2]+"px;\"><a href=\"Javascript:CloseAD('RightAdv1')\" style=\"color:#b9b9b9;\" target=\"_parent\">×</a></div>");
	}
	document.write("<br /><br /></div>");
	/*rightAdv1结束*/


	/*rightAdv2开始*/
	if(_advPair==2){	
		document.write("<div id=\"RightAdv2\" style=\"position: absolute;z-index:99999;width:"+_rightBigAdv2[2]+"px;\"><div style=\"text-align:right;\" id=\"rightBigAdv2\" onMouseOut=\"HideAD()\" width=\"" + _rightBigAdv2[2] + "\" height=\"" + _rightBigAdv2[3] + "\"><a href=\"" + _rightBigAdv2[1] +"\" target=\"_blank\">");
		if (_rightBigAdv2[4] == 1) {
			document.write("<embed src=\"" + _rightBigAdv2[0] + "\" quality=\"high\" width=\"" + _rightBigAdv2[2] + "\" height=\"" + _rightBigAdv2[3] + "\" type=\"application/x-shockwave-flash\" wmode=\"opaque\"></embed>");
		}else{
			document.write("<img src=\"" + _rightBigAdv2[0] + "\" width=\"" + _rightBigAdv2[2] + "\" height=\"" + _rightBigAdv2[3] + "\" border=\"0\" />");
		}
		document.write("</a></div><div style=\"text-align:right;display: none;\" id=\"rightSamllAdv2\"  onMouseOver=\"OpenAD()\" width=\"" + _rightSmallAdv2[2] + "\" height=\"" + _rightSmallAdv2[3] + "\">");
		if (_rightSmallAdv2[4] == 1) {
			document.write("<embed src=\"" + _rightSmallAdv2[0] + "\" quality=\"high\" width=\"" + _rightSmallAdv2[2] + "\" height=\"" + _rightSmallAdv2[3] + "\" type=\"application/x-shockwave-flash\" wmode=\"opaque\"></embed>");
		}else{
			document.write("<img src=\"" + _rightSmallAdv2[0] + "\" width=\"" + _rightSmallAdv2[2] + "\" height=\"" + _rightSmallAdv2[3] + "\" border=\"0\" />");
		}
		document.write("</div>");
		if(_isClose==1){
			document.write("<div style=\"height:20px;text-align:right;width:"+_rightBigAdv2[2]+"px;\"><a href=\"Javascript:CloseAD('RightAdv2')\" style=\"color:#b9b9b9\" target=\"_parent\">×</a></div>");
		}
		document.write("<br /><br /></div>");	
	}
	/*rightAdv2结束*/
}
load();
//]]>


			



