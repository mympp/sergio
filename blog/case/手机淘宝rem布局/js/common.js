/**common公共js**/
/**作者:sergiolin**/
/**创建于:2017.12.30**/
// 考虑屏幕旋转，手机系统字体大小不同等情况下的最终rem解决方案：
function adapt(designWidth, rem2px){
	var d = window.document.createElement('div');
	d.style.width = '1rem';
	d.style.display = "none";
	var head = window.document.getElementsByTagName('head')[0];
	head.appendChild(d);
	var defaultFontSize = parseFloat(window.getComputedStyle(d, null).getPropertyValue('width'));
	d.remove();
	document.documentElement.style.fontSize = window.innerWidth / designWidth * rem2px / defaultFontSize * 100 + '%';
	var st = document.createElement('style');
	var portrait = "@media screen and (min-width: "+window.innerWidth+"px) {html{font-size:"+((window.innerWidth/(designWidth/rem2px)/defaultFontSize)*100) +"%;}}";
	var landscape = "@media screen and (min-width: "+window.innerHeight+"px) {html{font-size:"+((window.innerHeight/(designWidth/rem2px)/defaultFontSize)*100) +"%;}}"
	st.innerHTML = portrait + landscape;
	head.appendChild(st);
	return defaultFontSize
};
var defaultFontSize = adapt(750, 100);//设计稿宽度为640
// window.onresize = location.reload();//窗口改变是刷新页面

// //显示数据信息，测试用。
// var h = document.getElementsByTagName('html')[0];
// var el = document.getElementById('foo');
// var bg = document.getElementById('bg');
// var beforeRootFontSize = window.getComputedStyle(h, null).getPropertyValue('font-size');
// document.documentElement.style.fontSize = window.innerWidth / 640 / 16 * 100 * 100 + '%';
// var afterRootFontSize = window.getComputedStyle(h, null).getPropertyValue('font-size');
// var pfontSize = window.getComputedStyle(el, null).getPropertyValue('width');
// var bgwidth = window.getComputedStyle(bg, null).getPropertyValue('width');
// document.getElementById('font').innerHTML = ''
// + "<br> 设置前html的 fontSize: " + beforeRootFontSize
// + "<br> html fontSize的设置值: " + h.style.fontSize
// + "<br> 设置后html的 fontSize: " + afterRootFontSize
// + "<br>  1rem 目标值: " + (window.innerWidth/640 * 100)
// + "<br>  1rem 实际值: " + pfontSize
// + "<br> 6.4rem 目标值: " + window.innerWidth + "（屏宽）" 
// + "<br> 6.4rem 实际值: " + bgwidth
// + "<br> 6.4rem 计算值: " + (6.4 * (window.innerWidth/640 * 100)) + "（按公式计算）"
// + "<br> 6.4rem 计算值: " + (6.4 * parseFloat(afterRootFontSize)) + "（按设置后html的fontSize计算）"
 
//高清方案：
// 'use strict';
// /** 
// * * @param {Number} [baseFontSize = 100] - 基础fontSize, 默认100px;
// * @param {Number} [fontscale = 1] - 有的业务希望能放大一定比例的字体;
// */
// const win = window;
// exportdefault win.flex = (baseFontSize, fontscale) => {  
// 	const _baseFontSize = baseFontSize || 100;
// 	const _fontscale = fontscale || 1;
// 	const doc = win.document;
// 	const ua = navigator.userAgent;
// 	const matches = ua.match(/Android[\S\s]+AppleWebkit\/(\d{3})/i);
// 	const UCversion = ua.match(/U3\/((\d+|\.){5,})/i);
// 	const isUCHd = UCversion && parseInt(UCversion[1].split('.').join(''), 10) >= 80;
// 	const isIos = navigator.appVersion.match(/(iphone|ipad|ipod)/gi);
// 	let dpr = win.devicePixelRatio || 1;
// 	if (!isIos && !(matches && matches[1] > 534) && !isUCHd) {    // 如果非iOS, 非Android4.3以上, 非UC内核, 就不执行高清, dpr设为1;
// 		dpr = 1;
// 	}  
// 	const scale = 1 / dpr;
// 	let metaEl = doc.querySelector('meta[name="viewport"]');
// 	if (!metaEl) {    
// 		metaEl = doc.createElement('meta');
// 		metaEl.setAttribute('name', 'viewport');
// 		doc.head.appendChild(metaEl);
// 	}  
// 	metaEl.setAttribute('content', `width=device-width,user-scalable=no,initial-scale=${scale},maximum-scale=${scale},minimum-scale=${scale}`);
// 	doc.documentElement.style.fontSize = `${_baseFontSize / 2 * dpr * _fontscale}px`;
// };