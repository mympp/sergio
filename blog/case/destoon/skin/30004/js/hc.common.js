(function(g,p,n){function r(b,m,h){b=h[b];h=b.length;for(var k=0;k<h;k++)try{b[k](m)}catch(a){}}function q(b){var m=location.host,h={data:{domainurl:m},callback:"callbackparam"};/.?hc360\.com$/.test(m)?b(!0):f.jsonp("//detail.b2b.hc360.com/detail/turbine/template/webim,domain.html",h,function(k){k&&(k.success&&0===k.isDomain&&b(!0),b(!1))})}function l(){var b=window[n];b.barInitialized||(b.barInitialized=!0,b&&(b.loadedTime=(new Date).getTime()),f.checkFP()&&q(function(b){d.FLLMLoaded=v;var h=c.localmsg,
k=d.b,a=k.name.substr(0,1),k=k.cover?k.cover.substr(0,1):"";f.addSWF(p.body,h.id,h.url,"SWFLoaded=HC.FLLMLoaded&MLCHPrefix="+a+k+"&isAllowDomain="+b,0,0)}))}if(!g[n]||"object"!==typeof g[n]){var c={localmsg:{id:"localMsg",url:"//style.org.hc360.cn/js/build/source/core/fl/localmsg/localmsg.swf"},iflm:{id:"iLocalMsg",htmlurl:"//style.org.hc360.cn/js/build/source/core/iflm.html",jsurl:""},bar:{url:"//style.org.hc360.cn/js/build/source/core/hc.bar.min.js"}},d={};d.startTime=(new Date).getTime();d.barInitialized=
!1;var f={clickRecorder:function(b){var m=new Image,h=(new Date).getTime()+"_"+Math.random()*Math.pow(10,18);window["_img_"+h]=m;m.onload=m.onerror=function(){window["_img_"+h]=null};m.src="//log.info.hc360.com/click.htm?"+b+"&r="+h},getBrowser:function(){var b={},m=g.navigator.userAgent,h=/(Trident)\/([\d\.]+)/,k=/(Chrome)\/([\d.]+)/,a=/(Firefox)\/([\d.]+)/,e=/(Safari)\/([\d.]+)/,d=/(Opera)\/([\d.]+)/;if(h=m.match(/(MSIE) ([\d.]+)/)||m.match(h)||m.match(k)||m.match(a)||m.match(e)||m.match(d))"Opera"===
h[1]&&(h[2]=m.match(/(Version)\/([\d.]+)/)[2]),m=m.match(/(QQBrowser)|(Maxthon)|(360EE)|(360SE)|(SE 2.X MetaSr 1.0)/),b[h[1]]=h[2],b.name=h[1],b.version=h[2],m&&m[0]&&(b.cover=m[0]);return b},addEvent:function(b,m,h){b.addEventListener(h,m,!1)},removeEvent:function(b,m,h){b.removeEventListener(h,m,!1)},parseXML:function(b){return(new DOMParser).parseFromString(b,"text/xml")},addCss:function(b,m){if(b){var h=p.createElement("link");h.href=b;h.type="text/css";h.rel="stylesheet";/(6.0)|(7.0)|(8.0)/.test(d.b.MSIE)?
h.onreadystatechange=function(){"loaded"!==this.readyState&&"complete"!==this.readyState||!m||m()}:h.onload=function(){m&&m()};p.getElementsByTagName("head")[0].appendChild(h)}},addScript:function(b,m){if(b){var h=p.createElement("script");/(6.0)|(7.0)|(8.0)/.test(d.b.MSIE)?h.onreadystatechange=function(){"loaded"!==this.readyState&&"complete"!==this.readyState||!m||m()}:h.onload=function(){m&&m()};h.type="text/javascript";h.src=b;h.setAttribute("charset","utf-8");p.getElementsByTagName("head")[0].appendChild(h)}},
addScriptList:function(b,m){function h(){k.push(1);k.length===a&&m&&m()}for(var k=[],a=b.length,e=0;e<a;e++)this.addScript(b[e],h)},jsonp:function(b,m,a){var k="HC_"+Math.floor(1E10*Math.random())+"_"+(new Date).getTime(),e=m.data;b+="?"+m.callback+"="+k;if(e)for(parm in e)b+="&"+parm+"="+e[parm];window[k]=function(b){"function"===typeof a&&a(b);window[k]=null};this.addScript(b)},checkFP:function(){var b=null,m=null;(b=navigator.plugins["Shockwave Flash"])&&(m=parseFloat(b.description.split(" ")[2]));
return m},getSWFObject:function(b){return document.embeds[b]},addSWF:function(b,m,a,k,e,d){var c=p.createElement("embed");e&&d?(c.width=e,c.height=d):(c.style.visibility="hidden",c.width=0,c.height=0);c.type="application/x-shockwave-flash";c.id=m;c.setAttribute("name",m);c.setAttribute("allowScriptAccess","always");c.setAttribute("flashvars",k);c.src=a;b.appendChild(c)},addIframe:function(b,m,a,k,e,c){var d=p.createElement("iframe");d.id=a;d.setAttribute("name",a);d.width=e;d.height=c;e&&c||(d.style.display=
"none");b.appendChild(d);this.addEvent(d,k,"load");d.src=m},contentLoaded:function(b){function a(){if(!h){try{document.documentElement.doScroll("left")}catch(b){setTimeout(a,1);return}h()}}var h=b,k;document.addEventListener?k=function(){document.removeEventListener("DOMContentLoaded",k,!1);h()}:document.attachEvent&&(k=function(){"complete"===document.readyState&&(document.detachEvent("onreadystatechange",k),h())});if(document.addEventListener)document.addEventListener("DOMContentLoaded",k,!1),window.addEventListener("load",
h,!1);else if(document.attachEvent){document.attachEvent("onreadystatechange",k);window.attachEvent("onload",h);b=!1;try{b=null==window.frameElement}catch(e){}document.documentElement.doScroll&&b&&a()}},LocalCookie:{getTodayLastTime:function(){var b=new Date,a=23-b.getHours(),h=59-b.getMinutes(),b=60-b.getSeconds();return 1E3*(3600*a+60*h+b)},getExpireTimeString:function(b){b=0===b?this.getTodayLastTime():864E5*b;var a=(new Date).getTime();return(new Date(a+b)).toUTCString()},set:function(b){var a=
";expires=",a=isNaN(b.day)?"":a+this.getExpireTimeString(b.day),h=b.domain?";domain="+b.domain:"",k=b.path?";path="+b.path:"";p.cookie=b.key+"="+encodeURIComponent(b.value)+a+h+k},get:function(b){var a;return(a=document.cookie.match(RegExp("(^| )"+b+"=([^;]*)(;|$)")))?decodeURIComponent(a[2]):null},remove:function(b){this.set({key:b,value:"",day:-1})}}};d.b=f.getBrowser();"MSIE"===d.b.name&&(f.checkFP=function(){var b=null,a=null;try{b=new ActiveXObject("ShockwaveFlash.ShockwaveFlash")}catch(h){}b&&
(a=parseFloat(b.GetVariable("$version").split(" ")[1].replace(",",".")));return a},f.getSWFObject=function(b){return document[b]},f.parseXML=function(b){var a=new ActiveXObject("Microsoft.XMLDOM");a.async="false";a.loadXML(b);return a});/6.0|7.0|8.0|9.0|10.0/.test(d.b.MSIE)&&(f.addEvent=function(b,a,h){b.attachEvent("on"+h,a)},f.removeEvent=function(a,e,h){a.detachEvent("on"+h,e)},f.addSWF=function(a,e,h,k,c,d){k='<object id="'+e+'" name="'+e+'" classid="clsid:D27CDB6E-AE6D-11cf-96B8-444553540000" width="'+
c+'" height="'+d+'"><param name="allowScriptAccess" value="always" />'+('<param name="flashvars" value="'+k+'" />')+"</object>";var u=p.createElement("div");u.innerHTML=k;a.appendChild(u);p[e].movie=h;c&&d||(u.style.display="none")});if(/6.0|7.0|8.0/.test(d.b.MSIE)){var a="";document.attachEvent("onpropertychange",function(b){"title"===b.propertyName&&document.title!==a&&(a||(a=p.title.split("#")[0]),setTimeout(function(){document.title=a},1))})}d.W={};d.HUB=f;g[n]=d;var e=function(a){var e=this,
h=f.getSWFObject(c.localmsg.id);this.status=this.readyState=0;this.responseJSON=this.responseXML=this.responseText=null;this.questNum=-1;this.rNum=parseInt(1E5*Math.random(),10);this.open=function(k,c,d){k=this.questNum=h.open(c,a);HC.HTTP["FLXHRCB"+k]=e};this.send=function(a){h.send(this.questNum,a)};this.abort=function(){try{h.abort()}catch(a){}this.status=this.readyState=0;this.responseJSON=this.responseXML=this.responseText=null};this.loaded=function(k){var e=k.readyState;this.readyState=e;4==
e&&(this.status=k.status,k.responseText&&(this.responseText=k.responseText,"XML"===a&&(this.responseXML=f.parseXML(k.responseText)),"JSON"===a&&(this.responseJSON=h.getJSONByStr(k.responseText))));this.onreadystatechange()}},u={},w={},s={connected:[],message:[],receiveListener:[],changedSpeaker:[],changedListener:[],pingSpeakerSucceed:[],pingSpeakerError:[],broadcastComplete:[],ldsLoaded:[]},x={},t={inited:!1,loadedCB:function(a){this.inited?a():void 0!==s.ldsLoaded&&s.ldsLoaded.push(a)}};d.LDS=t;
var v=function(){delete d.FLLMLoaded;var a=f.getSWFObject(c.localmsg.id);try{a.init({HTTP:"HC.HTTP.FLXHRCB",LM:"HC.LM",LS:"HC.LS"})}catch(m){}w={init:function(){a.LMinit()},speaker:function(){a.LMspeaker()},changetoSpeaker:function(){a.LMchangetoSpeaker()},changetoListener:function(){a.LMchangetoListener()},receiveListener:function(){a.LMreceiveListener()},broadcast:function(e){a.LMbroadcast(e)},pingSpeaker:function(){a.LMpingSpeaker()},addEvent:function(a,k){void 0!==s[a]&&s[a].push(k)},removeEvent:function(a,
k){var b=s[a],e=b.length;if(0!=e)for(e-=1;0<=e;e--)if(b[e]===k){b.splice(e,1);break}},runEvents:function(a,e){r(a,e,s)}};x={set:function(e,k){a.LSset(e,k)},get:function(e){return a.LSget(e)},getAll:function(){return a.LSgetAll()},remove:function(e){a.LSremove(e)},clear:function(){a.LSclear()},size:function(e){return a.LSsize()},allowDomain:function(e){a.LSdomain(e)}};u.crossDomainPost=function(){};d.FLLMSet=function(){a.showSeting()};d.FLXHR=e;d.HTTP=u;d.LM=w;d.LS=x;f.addScript(c.bar.url,null);t.inited=
!0;r("ldsLoaded",null,s)};f.contentLoaded(l)}})(window,document,"HC");window.jQuery||document.write("<script src='//style.org.hc360.cn/js/build/source/core/jquery.min.js'>\x3c/script>");
(function(g,p){var n={},r={},q={},l=function(c,d){this.init.call(this,c,d)};l.prototype={init:function(c,d){for(var f=this,a=document.getElementsByTagName("link"),e=0,u=a.length;e<u;e++)q[a[e].href]=1;HC.W[c+"Urls"]?f.loadUrls(0,HC.W[c+"Urls"],d):n[c]?f.addTaskQueue(c,function(){f.loadUrls(0,HC.W[c+"Urls"],d)}):(n[c]=1,HC.HUB.addScript("//style.org.hc360.cn/js/build/source/widgets/loader/hc."+c+".urls.js",function(){n[c]=0;f.loadUrls(0,HC.W[c+"Urls"],d);f.callTaskQueue(c)}))},addTaskQueue:function(c,
d){r[c]||(r[c]=[]);r[c].push(d)},callTaskQueue:function(c){if(r[c]){for(var d=0,f=r[c].length;d<f;d++)r[c][d]();r[c].length=0}},loadUrls:function(c,d,f){var a=this,e=c;if(e===d.length)f&&f(),f=null;else{c=d[e];var u=function(c,u){n[c]?a.addTaskQueue(c,function(){a.loadUrls(++e,d,f)}):(n[c]=1,HC.HUB[u](c,function(){n[c]=0;a.loadUrls(++e,d,f);"css"===u&&(q[c]=1);a.callTaskQueue(c)}))};if(c.css)q[c.css]?a.loadUrls(++e,d,f):u(c.css,"addCss");else try{eval(c.isExisted)?a.loadUrls(++e,d,f):u(c.js,"addScript")}catch(w){u(c.js,
"addScript")}}}};HC.W.Loader=l;HC.W.load=function(c,d){new l(c,d)}})(window,document);
(function(){function g(){this.id=this.createUUID()}function p(a,e,c,d,s,f){var g="";0!=c&&(g=c?"; expires="+c.toGMTString():"");c=a+"="+escape(e)+g+(d?"; path="+d:"")+(s?"; domain="+s:"")+(f?"; secure":"");4E3>=(a+"="+escape(e)).length?document.cookie=c:confirm("cookie\u5927\u5c0f\u8d85\u51fa4KB")&&(document.cookie=c)}function n(a){var e="";window.RegExp&&(e=RegExp(";\\s*"+a+"=([^;]*)","i").exec(";"+document.cookie));return e?unescape(e[1]):""}function r(a){var e=(new Date(0)).getTime();0<e&&a.setTime(a.getTime()-
e)}if(!HC.UUID){g.prototype.valueOf=function(){return this.id};g.prototype.toString=function(){return this.id};g.prototype.createUUID=function(){var a=new Date(1582,10,15,0,0,0,0),e=(new Date).getTime()-a.getTime(),a=g.getIntegerBits(e,0,31),c=g.getIntegerBits(e,32,47),e=g.getIntegerBits(e,48,59)+"1",d=g.getIntegerBits(g.rand(4095),0,7),s=g.getIntegerBits(g.rand(4095),0,7),f=g.getIntegerBits(g.rand(8191),0,7)+g.getIntegerBits(g.rand(8191),8,15)+g.getIntegerBits(g.rand(8191),0,7)+g.getIntegerBits(g.rand(8191),
8,15)+g.getIntegerBits(g.rand(8191),0,15);return a+""+c+""+e+""+d+s+""+f};g.getIntegerBits=function(a,e,c){a=g.returnBase(a,16);for(var d=[],s="",f=0,f=0;f<a.length;f++)d.push(a.substring(f,f+1));for(f=Math.floor(e/4);f<=Math.floor(c/4);f++)s=d[f]&&""!=d[f]?s+d[f]:s+"0";return s};g.returnBase=function(a,e){var c="0123456789ABCDEFGHIJKLMNOPQRSTUVWXYZ".split("");if(a<e)c=c[a];else var d=""+Math.floor(a/e),f=a-d*e,c=d>=e?this.returnBase(d,e)+c[f]:c[d]+c[f];return c};g.rand=function(a){return Math.floor(Math.random()*
a)};HC.UUID=g;window.setCookie=p;window.getCookie=n;HC.setCookie=p;HC.getCookie=n;var q=n("hc360visitid"),l=new Date;r(l);l.setTime(l.getTime()+31536E7);if(!q||""==q){var q=(new g).createUUID(),c=new Date,d=c.getFullYear()+"-"+(c.getMonth()+1)+"-"+c.getDate();visitid_time=d+" "+c.getHours()+":"+c.getMinutes()+":"+c.getSeconds();p("visitid_time",visitid_time,l,"/",".hc360.com");var f=".hc360.com";-1==document.domain.indexOf(f)&&(f=document.domain);p("hc360visitid",q,l,"/",f)}n("hc360first_time")||
(c=new Date,f=".hc360.com",-1==document.domain.indexOf(f)&&(f=document.domain),d=c.getFullYear()+"-"+("0"+(c.getMonth()+1)).slice(-2)+"-"+("0"+c.getDate()).slice(-2),p("hc360first_time",d,l,"/",f));n("hcbrowserid")||(q=(new g).id,p("hcbrowserid",q,l,"/",".hc360.com"));HC.LDS.loadedCB(function(){var a=HC.HUB.LocalCookie.get("hc360visitid"),e=(new g).createUUID();a?HC.LS.set("hc360visitid",a):((a=HC.LS.get("hc360visitid"))?e=a:HC.LS.set("hc360visitid",e),a=".hc360.com",-1==document.domain.indexOf(a)&&
(a=document.domain),HC.HUB.LocalCookie.set({key:"hc360visitid",value:e,day:3650,path:"/",domain:a}))});HC.hck={_curCookieList:["viewwords1","viewwords2","viewwords5","viewwords","regkeyword"],callback:{set:null,get:null,del:null,rec:null},hckGetJSON:function(a,e,c,d,f){var g=HC.hck,n=(Math.random()+"").substring(2),n=e+n;a=a+"&callback=HC.hck.callback."+n;var l=document.getElementsByTagName("head");g.callback[n]=function(a){if(a)switch(e){case "get":"null"==a.value?g.hckRecord("get_backError",d.key,
"null"):g.hckRecord("get_backSuccess",d.key,a.value);c&&c("null"==a.value||"undefined"==a.value?"":a.value.replace(/&quot;/g,'"'));break;case "set":var b=d.sp1,k=d.sp2,n=d._domain_,l=d._hckExistTime_,r=d._exp_,t=d.lastValue,q=d.isIndex;key=d.key;if("true"==a.value){g.hckRecord("set_backSuccess",key,"true");a=1;for(var v=t.length;a<v;a+=1){var y=t[a].split(k);if(y[0]==n&&y[1]==key){q=a;break}}-1!=q?(a=t[q].split(k),a[2]=r,a=a.join(k),t.splice(q,1,a),t=t.join(b),p("hckIndex",t,l,"/",n)):(t.push(n+k+
key+k+r),t.join(b));c&&c()}else g.hckRecord("set_backError",key,"null")}else f&&"function"==typeof f&&f()};script=document.createElement("script");script.setAttribute("src",a);l[0].appendChild(script);script.onload=script.onreadystatechange=function(){if(!script.readyState||/loaded|complete/.test(script.readyState))script.onload=script.onreadystatechange=null,script.id="loaded"};script.onerror=function(){f&&"function"==typeof f&&f()};var b=function(a,e,c,d,f,g){-1==a||0<a?setTimeout(function(){g=
d()?1:0;b(g?0:0<a?--a:a,e+(c?c:0),c,d,f,g)},g||0>e?0.1:e):"function"==typeof f&&setTimeout(f,1)};b(15,2E3,0,function(){return"loaded"==script.id},function(){"loaded"!=script.id&&f&&"function"==typeof f&&f()})},hckRecord:function(a,e,c){HC.hck.callback.rec=function(a){}},hckCreateExp:function(){var a=new Date,e=a.getFullYear()+10;_curMonth_=a.getMonth()+1;_curDate_=a.getDate();return _hckExistTime_=new Date(e+"/"+_curMonth_+"/"+_curDate_)},hckSet:function(a,e,c,d,f,l){var t=HC.hck,q,b=(arguments[3]||
"hc360.com").replace(/^\./,""),m=t.hckCreateExp();_exp_=Math.abs((c||m)-(new Date).getTime());lastValue="";isIndex=-1;n("hckIndex")||(q=(new g).id,p("hckIndex",q,m,"/",b));q=n("hckIndex");var h=n("hcktemp");q="url:"+location.href+"<br>hckIndex:"+q+"<br>hcktemp:"+h;if(!a||!e||""==a.replace(/[\s\xA0\u1680\u180E\u2000-\u200A\u2028\u2029\u202F\u205F\u3000]/gm,"")||""==e.replace(/[\s\xA0\u1680\u180E\u2000-\u200A\u2028\u2029\u202F\u205F\u3000]/gm,""))return t.hckRecord("set_whenCall",a,q),f&&f(!1),null;
var k="//sessiondata.org.hc360.com/SessionData/cookieServlet?action=set&domain="+b+"&key="+encodeURIComponent(a)+"&expiry="+_exp_+"&value="+encodeURIComponent(e);q=n("hckIndex");h=n("hcktemp");t.hckRecord("set_whenSend",a,"url:"+k+"<br>hckIndex:"+q+"<br>hcktemp:"+h);lastValue=n("hckIndex").replace(/^"|"$/g,"").split("#1#");2>lastValue.length&&0==arguments.length||t.hckGetJSON(k,"set",f,{key:a,sp1:"#1#",sp2:"#2#",_domain_:b,_hckExistTime_:m,_exp_:_exp_,lastValue:lastValue,isIndex:isIndex})},hckGet:function(a,
e,c,d){var f=HC.hck,g=n("hckIndex");e=(e||"hc360.com").replace(/^\./,"");if(!g||!g.length||!a||""==a.replace(/[\s\xA0\u1680\u180E\u2000-\u200A\u2028\u2029\u202F\u205F\u3000]/gm,"")||0>g.indexOf("#2#"+a+"#2#")){var g=n("hckIndex"),l=n("hcktemp"),g="url:"+location.href+"<br>hckIndex:"+g+"<br>hcktemp:"+l;f.hckRecord("get_whenCall",a,g);c&&c("");return null}e=e.replace(/^\./,"");e="//sessiondata.org.hc360.com/SessionData/cookieServlet?action=get&domain="+e+"&key="+encodeURIComponent(a);g=n("hckIndex");
l=n("hcktemp");g="url:"+location.href+"<br>hckIndex:"+g+"<br>hcktemp:"+l;f.hckRecord("get_whenSend",a,g);f.hckGetJSON(e,"get",c,{key:a},d)},hckDel:function(a,e,c){var d=HC.hck,f=n("hckIndex");d.hckCreateExp();e=(e||"hc360.com").replace(/^\./,"");if(!f||!f.length||!a||""==a.replace(/[\s\xA0\u1680\u180E\u2000-\u200A\u2028\u2029\u202F\u205F\u3000]/gm,"")||0>f.indexOf("#2#"+a+"#2#"))return c&&c(""),null;f.split(",");a="//sessiondata.org.hc360.com/SessionData/cookieServlet?action=del&domain="+e+"&key="+
encodeURIComponent(a);n("hckIndex");d.hckGetJSON(a,"del",c)},hckBakeCookie:function(a){var e=HC.hck;a=a||e._curCookieList;for(var c=0,d=a.length;c<d;c+=1){var f=n(a[c]),g=new Date((new Date).getTime()+864E6),l=new Date("1900/01/01");f&&""!=f.replace(/[\s\xA0\u1680\u180E\u2000-\u200A\u2028\u2029\u202F\u205F\u3000]/gm,"")&&(p(a[c]+"_bak",f,g,"/","hc360.com"),e.hckSet(a[c],f,l,"hc360.com"),p(a[c],null,l,"/","hc360.com"))}},hckRevert:function(a){var c=HC.hck,d=c._curCookieList;!a&&function(){c.hckInit=
function(){return null}}();for(var f=0,g=d.length;f<g;f+=1){var l=n(d[f]+"_bak"),q=c.hckCreateExp(),r=new Date("1900/01/01");l&&""!=l.replace(/[\s\xA0\u1680\u180E\u2000-\u200A\u2028\u2029\u202F\u205F\u3000]/gm,"")&&(!a&&p(d[f],l,q,"/","hc360.com"),p("hckIndex",null,r,"/","hc360.com"),p(d[f]+"_bak",null,r,"/","hc360.com"))}},hckAdd:function(a,c,d,f){encodeURIComponent(c);c=(new Date).getTime();var g=new Image;f="&expiry="+(f||this.hckCreateExp());g.src="//sessiondata.org.hc360.com/SessionData/cookieServlet?action=append&domain="+
d+f+"&key="+a+"&r="+c},hckInit:function(){var a=HC.hck;if(n("viewwords")||n("viewwords1")||n("viewwords2")||n("viewwords5")||n("regkeyword")||!n("hckIndex"))a.hckBakeCookie(),a.hckSet();n("hcktemp")&&p("hcktemp","",this.hckCreateExp(),"/","hc360.com")}};HC.hckSet=HC.hck.hckSet;HC.hckGet=HC.hck.hckGet;HC.hckDel=HC.hck.hckDel;HC.hckBakeCookie=HC.hck.hckBakeCookie;HC.hckRevert=HC.hck.hckRevert;HC.hckInit=HC.hck.hckInit;HC.hckInit()}})();
(function(g){var p=/iPhone/i,n=/iPod/i,r=/iPad/i,q=/(?=.*\bAndroid\b)(?=.*\bMobile\b)/i,l=/Android/i,c=/(?=.*\bAndroid\b)(?=.*\bSD4930UR\b)/i,d=/(?=.*\bAndroid\b)(?=.*\b(?:KFOT|KFTT|KFJWI|KFJWA|KFSOWI|KFTHWI|KFTHWA|KFAPWI|KFAPWA|KFARWI|KFASWI|KFSAWI|KFSAWA)\b)/i,f=/IEMobile/i,a=/(?=.*\bWindows\b)(?=.*\bARM\b)/i,e=/BlackBerry/i,u=/BB10/i,w=/Opera Mini/i,s=/(CriOS|Chrome)(?=.*\bMobile\b)/i,x=/(?=.*\bFirefox\b)(?=.*\bMobile\b)/i,t=/(?:Nexus 7|BNTV250|Kindle Fire|Silk|GT-P1000)/i,v=function(b){b=b||navigator.userAgent;
var g=b.split("[FBAN");"undefined"!==typeof g[1]&&(b=g[0]);this.apple={phone:p.test(b),ipod:n.test(b),tablet:!p.test(b)&&r.test(b),device:p.test(b)||n.test(b)||r.test(b)};this.amazon={phone:c.test(b),tablet:!c.test(b)&&d.test(b),device:c.test(b)||d.test(b)};this.android={phone:c.test(b)||q.test(b),tablet:!c.test(b)&&!q.test(b)&&(d.test(b)||l.test(b)),device:c.test(b)||d.test(b)||q.test(b)||l.test(b)};this.windows={phone:f.test(b),tablet:a.test(b),device:f.test(b)||a.test(b)};this.other={blackberry:e.test(b),
blackberry10:u.test(b),opera:w.test(b),firefox:x.test(b),chrome:s.test(b),device:e.test(b)||u.test(b)||w.test(b)||x.test(b)||s.test(b)};this.seven_inch=t.test(b);this.any=this.apple.device||this.android.device||this.windows.device||this.other.device||this.seven_inch;this.phone=this.apple.phone||this.android.phone||this.windows.phone;this.tablet=this.apple.tablet||this.android.tablet||this.windows.tablet;if("undefined"===typeof window)return this},b=function(){var a=new v;a.Class=v;return a};"undefined"!==
typeof module&&module.exports&&"undefined"===typeof window?module.exports=v:"undefined"!==typeof module&&module.exports&&"undefined"!==typeof window?module.exports=b():"function"===typeof define&&define.amd?define("isMobile",[],g.isMobile=b()):g.isMobile=b();var m,h;g=function(a,b){for(var c=0;c<a.length;c++)if(b===a[c])return c;return-1};this.isMobile.any&&(m=/info.([\w-]+).hc360.com/i.exec(this.location.host))&&(h=/\/(\d{4})\/(\d{2})\/([\w-]+?).shtml/i.exec(this.location.pathname))&&(b="bpq b2b huafei power bjp jiaju nc flower top10 ganxi fs tea engine ll baozhuang agri momo sdgj clean hunjia pcrm hw xt led printer syc zl ehome glass shicai jgj jdpj jcdd zs jjcn ledp leather traffic gift service bag med shipin gcgj sf fruit nh shipol solar jeans chinabreed biz finance house hotel d sport textile dn cyd newair nongji weldcut hp chat machine jj bm energy motor metal office cloth audio av xjd ceramic pharm jieju news hvacr shoes fushi piju lamp wujin steel beauty jewelry screen ad paper printing electric secu it toys ec test laser pv mt ceo unite cs floor suoju daoju mc nvz instrument nongyao feed chilun jxjg neiyi fl csyp zcdy fojiao qdgj jiashi ttm wl wash sjd robot kitchen seller jiadianexpo yx shuma zc zyc tianjiaji jg jdmuseum 2s jdcgt 56 siji shaxian canyin dd shui jjf cars pt jsj nanz muju jinshu ml schl monitor y yw sp tz lj chugui bgl jdmall dscppt tqmall nk bgjj liantiao kf gnsc cc th jjcl bossmba hbjx dzqjd air fxb siwang zyz artware motors fj ddgj sn cool hm jiadiancity jcz".split(" "),
m[1]&&-1!=g(b,m[1])&&(this.location.href="http://m.hc360.com/info-#domainIdentifier#/#year#/#month#/#random#.html".replace(/#domainIdentifier#/,m[1]).replace(/#year#/,h[1]).replace(/#month#/,h[2]).replace(/#random#/,h[3])))})(this);
(function(g,p,n){if(n){var r=!1;try{r=g.self==g.top}catch(q){}/(6.0)/.test(n.b.MSIE)&&"ignore"!=n.getCookie("ie6UpgradeVersionPrompt")&&r&&g.attachEvent("onload",function(){n.HUB.addCss("http://style.org.hc360.cn/css/IE6/style.css",function(){var l=[];l.push('<div class="ie6UpgradeVersionPrompt">');l.push('<div class="ie6Box">');l.push('<div class="ie6alertCon">');l.push('<div class="ie6alertBorder"></div>');l.push('<div class="ie6proTop">');l.push("<h2>");l.push("\u63d0\u793a");l.push("</h2>");l.push('<a class="ie6close" href="javascript:void(0);" onclick="return false;"></a>');
l.push("</div>");l.push('<div class="ie6proBox">');l.push("<h3>");l.push("\u4f60\u77e5\u9053\u4f60\u7684Internet Explorer\u8fc7\u65f6\u4e86\u5417?");l.push("</h3>");l.push("<p>");l.push("\u4e3a\u4e86\u8ba9\u60a8\u5f97\u5230\u6700\u597d\u7684\u4f53\u9a8c\u6548\u679c,\u6211\u4eec\u5efa\u8bae\u60a8\u5347\u7ea7\u5230\u6700\u65b0\u7248\u672c\u7684IE\u6d4f\u89c8\u5668\u6216\u9009\u62e9\u5176\u4ed6\u6d4f\u89c8\u5668.\u63a8\u8350\u7ed9\u5927\u5bb6\u51e0\u6b3e\u725b\u903c\u7684\u6d4f\u89c8\u5668\u5427\uff01");
l.push("</p>");l.push("</div>");l.push('<div class="ie6BoxIco">');l.push('<a href="http://www.google.cn/chrome/browser/desktop/index.html" class="chrome" target="_blank">chrome</a> <a href="http://windows.microsoft.com/zh-cn/internet-explorer/download-ie" class="IE" target="_blank">IE</a> <a href="http://se.360.cn/" class="l360" target="_blank">360\u5b89\u5168</a> <a href="http://www.firefox.com.cn/" class="huohu" target="_blank">\u706b\u72d0</a> <a href="http://ie.sogou.com/" class="sougou" target="_blank">\u641c\u72d7</a> <a href="http://browser.qq.com/" class="LQQ" target="_blank">QQ</a>');
l.push("</div>");l.push("</div>");l.push("</div>");l.push('<div class="ie6Bg"><iframe frameborder="0" scrolling="no" class="ie6BgFrame"></iframe></div>');l.push("</div>");jQuery(".ie6UpgradeVersionPrompt",jQuery(p)).remove();var c=jQuery(l.join("")).appendTo(jQuery("body",jQuery(p)));setTimeout(function(){jQuery("a.ie6close",c).focus()},0);p.getElementsByTagName("html")[0].style.overflow="hidden";p.body.onmousewheel=function(c){return!1};jQuery("div.ie6Bg",c).css({height:jQuery(p).height()+"px"});
jQuery("a.ie6close",c).click(function(d){c.remove();d=new Date;var f=(new Date(0)).getTime();0<f&&d.setTime(d.getTime()-f);d.setTime(d.getTime()+864E5);n.setCookie("ie6UpgradeVersionPrompt","ignore",d,"/",".hc360.com");p.getElementsByTagName("html")[0].style.overflowX="auto";p.getElementsByTagName("html")[0].style.overflowY="scroll";p.body.onmousewheel=function(a){return!0}});jQuery(g).resize(function(){var d=jQuery(g).height(),f=jQuery(g).width(),a=jQuery(g).scrollTop(),e=jQuery("body").height();
e<d&&(e=d);var l=jQuery("div.ie6Box",c).outerWidth(),n=jQuery("div.ie6Box",c).height(),f=f/2-l/2,d=a+(d-n)/2;jQuery("div.ie6Box",c).css({left:f+"px",top:d+"px",position:"absolute",margin:"0px"});jQuery("div.ie6Bg",c).css({height:e+"px"})});jQuery(g).resize()})})}})(window,document,HC);
