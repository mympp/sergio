	   //选项卡
	  function tab(topObject, topSubObject, styleName, botObject) {
	      var aLink = document.getElementById(topObject).getElementsByTagName(topSubObject);

	      for (i = 0; i < aLink.length; i++) {
	          aLink[i].index = i;
	          aLink[i].onmouseover = function() {
	              for (i = 0; i < aLink.length; i++) {
	                  aLink[i].className = "";
	                  document.getElementById(botObject + i).style.display = "none";
	              }
	              this.className = styleName;
	              document.getElementById(botObject + [this.index]).style.display = "block";
	          }
	      }
	  }
	  
	  	   //选项卡
	  function tab1(topObject, topSubObject, styleName, botObject) {
	      var aLink = document.getElementById(topObject).getElementsByTagName(topSubObject);

	      for (i = 0; i < aLink.length; i++) {
	          aLink[i].index = i;
	          aLink[i].onmouseover = function() {
	              for (i = 0; i < aLink.length; i++) {
	                  aLink[i].className = "";
	                  document.getElementById(botObject + i).style.display = "none";
	              }
	              this.className = styleName;
	              document.getElementById(botObject + [this.index]).style.display = "block";
	          }
	      }
	  }
	  
	  	  	   //选项卡
	  function tab2(topObject, topSubObject, styleName, botObject) {
	      var aLink = document.getElementById(topObject).getElementsByTagName(topSubObject);

	      for (i = 0; i < aLink.length; i++) {
	          aLink[i].index = i;
	          aLink[i].onmouseover = function() {
	              for (i = 0; i < aLink.length; i++) {
	                  aLink[i].className = "";
	                  document.getElementById(botObject + i).style.display = "none";
	              }
	              this.className = styleName;
	              document.getElementById(botObject + [this.index]).style.display = "block";
	          }
	      }
	  }

	   //导航高亮
	  function toFocus_old(obj, style) {
	      var nav = document.getElementById(obj);
	      var aA = nav.getElementsByTagName("*");
	      var currenturl = document.location.href;
	      var last = 0;
	      for (var i = 0; i < aA.length; i++) {
	          var linkurl = aA[i].getAttribute("href");
	          if (currenturl.indexOf(linkurl) != -1) {
	              last = i;
	          }
	      }
	      aA[last].className = style;
	  }

          //导航高亮(改良版)
	  function toFocus(obj, style) {
	      var nav = document.getElementById(obj);
	      var aA = nav.getElementsByTagName("*");
	      var currenturl = document.location.href;
	      var last = 0;
	      for (var i = 0; i < aA.length; i++) {
	          var linkurl = aA[i].getAttribute("href");
                  var alinkurl=linkurl.split(".html");
	          if (currenturl.toLowerCase().indexOf(alinkurl[0].toLowerCase()) != -1) {
	              last = i;
	          }
	      }
	      aA[last].className = style;
	  }

	   //鼠标经过添加CLASS
	  function hover(obj,subObj) {
	      var oUl = document.getElementById(obj);
	      var aLi = oUl.getElementsByTagName(subObj);

	      for (i = 0; i < aLi.length; i++) {

	          aLi[i].onmouseover = function() {

	              for (var i = 0; i < aLi.length; i++) {
	                  aLi[i].className = "";
	              }
	              this.className = "hover";
	          }
	      }
	      oUl.onmouseout = function() {
	          for (i = 0; i < aLi.length; i++) {
	              aLi[i].className = "";
	          }
	      }
	  }

	   //显示隐藏
	  function showHide(obj) {
	      var oDiv = document.getElementById(obj);
	      var aLi = oDiv.children;

	      for (i = 0; i < aLi.length; i++) {
	          aLi[i].onmouseover = function() {
	              this.getElementsByTagName("div")[1].style.display = "block";
//	              this.getElementsByTagName("div")[0].className += " active_on";
                  this.className = "hover";
	          }
	          aLi[i].onmouseout = function() {
	              this.getElementsByTagName("div")[1].style.display = "none";
//	              this.getElementsByTagName("div")[0].className += " active_out";
                  this.className = "";
	          }
	      }
	  }

	   //图片缩放
	  function DrawImage(ImgD, FitWidth, FitHeight) {
	      var image = new Image();
	      image.src = ImgD.src;
	      if (image.width > 0 && image.height > 0) {
	          if (image.width / image.height >= FitWidth / FitHeight) {
	              if (image.width > FitWidth) {
	                  ImgD.width = FitWidth;
	                  ImgD.height = (image.height * FitWidth) / image.width;
	              } else {
	                  ImgD.width = image.width;
	                  ImgD.height = image.height;
	              }
	          } else {
	              if (image.height > FitHeight) {
	                  ImgD.height = FitHeight;
	                  ImgD.width = (image.width * FitHeight) / image.height;
	              } else {
	                  ImgD.width = image.width;
	                  ImgD.height = image.height;
	              }
	          }
	      }
	  }

	   //模拟Select
	  function toSelect(selectTop, selectBot, option) {
	      document.getElementById(selectTop).onmouseover = function() {
	          window.onclick = null;
	      }
	      document.getElementById(selectTop).onmouseout = function() {
	          window.onclick = function() {
	              document.getElementById(selectBot).style.display = "none";
	          }
	      }

	      var oTop = document.getElementById(selectTop);
	      oTop.onclick = function() {
	          document.getElementById(selectBot).style.display = document.getElementById(selectBot).style.display == "none" ? "" : "none";
	      }

	      var aSpan = document.getElementById(selectBot).getElementsByTagName(option);

	      for (i = 0; i < aSpan.length; i++) {
	          aSpan[i].onclick = function(ev) {
	              document.getElementById(selectTop).value = this.innerHTML;
	              var oEvent = ev || event;
	              document.getElementById(selectBot).style.display = "none";
	              oEvent.cancelBubble = true;
	          }
	      }
	  }


	   //左侧页面固定
	  function toFixed(object) {
	      var mt = 0;

	      var mydiv = document.getElementById(object);
	      var mt = mydiv.offsetTop;
	      window.onscroll = function() {
	          var t = document.documentElement.scrollTop || document.body.scrollTop;
	          if (t > mt) {
	              mydiv.style.position = "fixed";
	              mydiv.style.margin = "0";
	              mydiv.style.top = "0";
	          } else {
	              mydiv.style.position = "static";
	          }
	      }
	  }

	   //单行文字向上滚动
	  function scrollUp(object, hieght) {
	      var textRoll = document.getElementById(object);
	      var move = function() {
	          scrollup(textRoll, hieght, 0);
	      }
	      var timer = setInterval(move, 5000);
	      textRoll.onmouseover = function() {
	          clearInterval(timer);
	      };

	      textRoll.onmouseout = function() {
	          timer = setInterval(move, 5000);
	      };
	  }

	  function scrollup(o, d, c) {
	      if (d == c) {
	          var t = getFirstChild(o.firstChild).cloneNode(true);
	          o.removeChild(getFirstChild(o.firstChild));
	          o.appendChild(t);
	          t.style.marginTop = "0px";
	      } else {
	          c += 2;
	          getFirstChild(o.firstChild).style.marginTop = -c + "px";
	          window.setTimeout(function() {
	              scrollup(o, d, c)
	          }, 10); //滚动时间
	      }
	  }

	  function getFirstChild(node) {
	      while (node.nodeType != 1) {
	          node = node.nextSibling;
	      }
	      return node;
	  }

	   //文字向左滚动
	  function ScrollLeft(scroll_div, speed) {
	      var speed = speed;     
	      var scroll_div = document.getElementById(scroll_div);
	      var scroll_begin = scroll_div.getElementsByTagName("div")[0];
	      var scroll_end = scroll_div.getElementsByTagName("div")[1];
	      scroll_end.innerHTML = scroll_begin.innerHTML;

	      function Marquee() {
	          if (scroll_end.offsetWidth - scroll_div.scrollLeft <= 0)
	              scroll_div.scrollLeft -= scroll_begin.offsetWidth;
	          else
	              scroll_div.scrollLeft++;
	      }
	      var MyMar = setInterval(Marquee, speed);
	      scroll_div.onmouseover = function() {
	          clearInterval(MyMar);
	      }
	      scroll_div.onmouseout = function() {
	          MyMar = setInterval(Marquee, speed);
	      }
	  }

	   //数字切换大图轮播
	  function flashImg(swfImg, swfNum, swfHight) {
	      var listItem = document.getElementById(swfImg);
	      var tList = document.getElementById(swfNum).childNodes;
	      var controlItem = [];
	      for (var i = 0; i < tList.length; i++) {
	          if (tList[i].nodeName.toLowerCase() == "li") {
	              controlItem.push(tList[i]);
	          }
	      }
	      var picCount = controlItem.length;
	      var cid = 0;
	      var tid = Math.floor(Math.random() * picCount);
	      window.cTop = 0
	      window.gTop = 0;
	      window.speed = 0;
	      window.controlAction = "";
	      window.timeCount = 0;
	      setInterval(function() {
	          if (cid != tid) {
	              gTop = tid * swfHight; //上翻高度要与图片实际高度相符
	              speed = (gTop - cTop) / 10;
	              cid = tid;
	              for (var i = 0; i < picCount; i++) {
	                  controlItem[i].className = ((i == cid) ? "current" : "");
	              }
	          }
	          if (window.cTop != window.gTop) {
	              window.cTop += parseInt(speed);
	              listItem.style.marginTop = "-" + parseInt(window.cTop) + "px";
	          }
	          document.getElementById(swfNum).style.display = "block";
	      }, 20);

	      for (var i = 0; i < picCount; i++) {
	          controlItem[i].onmouseover = function() {
	              var goId = parseInt(this.innerHTML) - 1;
	              clearTimeout(window.controlAction);
	              window.controlAction = setTimeout(function() {
	                  tid = goId;
	                  timeCount = 0;
	              }, 300);
	          }
	          controlItem[i].onmouseout = function() {
	              clearTimeout(window.controlAction);
	          }
	      }

	      setInterval(function() {
	          timeCount += 1
	          if (timeCount >= 5) {
	              window.controlAction = setTimeout(function() {
	                  tid = tid + 1;
	                  if (tid >= picCount) {
	                      tid = 0;
	                  }
	              }, 30);
	              timeCount = 0;
	          }
	      }, 500);
	  }

	   //图片加载
	  function loadImg(obj) {
	      var oUl = document.getElementById(obj);
	      var img = oUl.getElementsByTagName("img");
	      for (var i = 0; i < img.length; i++) {
	          var att = img[i].getAttribute("data");
	          if (att != "" && att != null) {
	              //没有定义data属性的图片我们不检查
	              (function(a, b) {
	                  var pic = new Image();
	                  pic.src = b;
	                  pic.onload = function() {
	                      pic.onload = null;
	                      img[a].src = b;
	                  };
	                  pic.onerror = function() {
	                      pic.onerror = null;
	                      img[a].src = err_url;
	                  }
	              })(i, att)
	          }
	      }
	  }

	   //通过className获取元素
	  function getElementsByClassName(className, root, tagName) { //root：父节点，tagName：该节点的标签名。 这两个参数均可有可无
	      if (root) {
	          root = typeof root == "string" ? document.getElementById(root) : root;
	      } else {
	          root = document.body;
	      }
	      tagName = tagName || "*";
	      if (document.getElementsByClassName) { //如果浏览器支持getElementsByClassName，就直接的用
	          return root.getElementsByClassName(className);
	      } else {
	          var tag = root.getElementsByTagName(tagName); //获取指定元素
	          var tagAll = []; //用于存储符合条件的元素
	          for (var i = 0; i < tag.length; i++) { //遍历获得的元素
	              for (var j = 0, n = tag[i].className.split(' '); j < n.length; j++) { //遍历此元素中所有class的值，如果包含指定的类名，就赋值给tagnameAll
	                  if (n[j] == className) {
	                      tagAll.push(tag[i]);
	                      break;
	                  }
	              }
	          }
	          return tagAll;
	      }
	  }


	  function showSytle(obj, name, value) {
	      var tag = getElementsByClassName(obj);
	      for (var i = 0; i < tag.length; i++) {
	          tag[i].style[name] = value;
	      }
	  }

	   //运动框架
	  function getStyle(obj, name) {
	      if (obj.currentStyle) {
	          return obj.currentStyle[name];
	      } else {
	          return getComputedStyle(obj, false)[name];
	      }
	  }

	  function startMove(obj, json, fnEnd) {
	      clearInterval(obj.timer);
	      obj.timer = setInterval(function() {
	          var bStop = true;

	          for (var name in json) {
	              var iTarget = json[name];

	              if (name == 'opacity') {
	                  var cur = Math.round(parseFloat(getStyle(obj, name)) * 100);
	              } else {
	                  var cur = parseInt(getStyle(obj, name));
	              }

	              var speed = (iTarget - cur) / 3;
	              speed = speed > 0 ? Math.ceil(speed) : Math.floor(speed);

	              if (name == 'opacity') {
	                  obj.style.filter = 'alpha(opacity:' + (cur + speed) + ')';
	                  obj.style.opacity = (cur + speed) / 100;
	              } else {
	                  obj.style[name] = cur + speed + 'px';
	              }

	              if (cur != iTarget) {
	                  bStop = false;
	              }
	          }

	          if (bStop) {
	              clearInterval(obj.timer);

	              if (fnEnd) {
	                  fnEnd();
	              }
	          }
	      }, 20);
	  }


	   //延时加载图片
	  function loadImgs(imgList) {
	      var fgm = {
	          on: function(element, type, handler) {
	              return element.addEventListener ? element.addEventListener(type, handler, false) : element.attachEvent("on" + type, handler)
	          },
	          bind: function(object, handler) {
	              return function() {
	                  return handler.apply(object, arguments)
	              }
	          },
	          pageX: function(element) {
	              return element.offsetLeft + (element.offsetParent ? arguments.callee(element.offsetParent) : 0)
	          },
	          pageY: function(element) {
	              return element.offsetTop + (element.offsetParent ? arguments.callee(element.offsetParent) : 0)
	          },
	          hasClass: function(element, className) {
	              return new RegExp("(^|\\s)" + className + "(\\s|$)").test(element.className)
	          },
	          attr: function(element, attr, value) {
	              if (arguments.length == 2) {
	                  return element.attributes[attr] ? element.attributes[attr].nodeValue : undefined
	              } else if (arguments.length == 3) {
	                  element.setAttribute(attr, value)
	              }
	          }
	      };
	      //延时加载
	      function LazyLoad(obj) {
	          this.lazy = typeof obj === "string" ? document.getElementById(obj) : obj;
	          this.aImg = this.lazy.getElementsByTagName("img");
	          this.fnLoad = fgm.bind(this, this.load);
	          this.load();
	          fgm.on(window, "scroll", this.fnLoad);
	          fgm.on(window, "resize", this.fnLoad);
	      }
	      LazyLoad.prototype = {
	          load: function() {
	              var iScrollTop = document.documentElement.scrollTop || document.body.scrollTop;
	              var iClientHeight = document.documentElement.clientHeight + iScrollTop;
	              var i = 0;
	              var aParent = [];
	              var oParent = null;
	              var iTop = 0;
	              var iBottom = 0;
	              var aNotLoaded = this.loaded(0);
	              if (this.loaded(1).length != this.aImg.length) {
	                  for (i = 0; i < aNotLoaded.length; i++) {
	                      oParent = aNotLoaded[i].parentElement || aNotLoaded[i].parentNode;
	                      iTop = fgm.pageY(oParent);
	                      iBottom = iTop + oParent.offsetHeight;
	                      if ((iTop > iScrollTop && iTop < iClientHeight) || (iBottom > iScrollTop && iBottom < iClientHeight)) {
	                          aNotLoaded[i].src = fgm.attr(aNotLoaded[i], "data-img") || aNotLoaded[i].src;
	                          aNotLoaded[i].className = "loaded";
	                      }
	                  }
	              }
	          },
	          loaded: function(status) {
	              var array = [];
	              var i = 0;
	              for (i = 0; i < this.aImg.length; i++)
	                  eval("fgm.hasClass(this.aImg[i], \"loaded\")" + (!!status ? "&&" : "||") + "array.push(this.aImg[i])");
	              return array
	          }
	      };
	      //应用
	      fgm.on(window, "load", function() {
	          new LazyLoad(imgList)
	      });
	  }



function iconSwitch(obj,objsub){
		  var oBtn=document.getElementById(obj);
		  var aem=oBtn.getElementsByTagName(objsub);
		  oBtn.onmouseover=function()
		  {
					aem[0].style.display="none";
					aem[1].style.display="block";
		  }
		  oBtn.onmouseout=function()
		  {
					aem[0].style.display="block";
					aem[1].style.display="none";
		  }
	  }

function showMenuZ(obj,styo,styt,objsub)
{
   var oDiv=document.getElementById(obj);
   var aDiv=oDiv.getElementsByTagName(objsub);   
   oDiv.onmouseover=function()
   {
        aDiv[0].className=styt;
		aDiv[1].style.display="block";
   }
   oDiv.onmouseout=function()
   {
       aDiv[0].className=styo;
	   aDiv[1].style.display="none";
   }
}