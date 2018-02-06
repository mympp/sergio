
//tab自动切换+左右切换
function tabSwitch(topObject, topSubObject, styleName, botObject,botSubObject,evt,time,leftbot,rightbot)
	 {
	        var aLink = document.getElementById(topObject).getElementsByTagName(topSubObject);
		var aDiv = document.getElementById(botObject).getElementsByTagName(botSubObject);
                var aleft= document.getElementById(leftbot);
                var aright= document.getElementById(rightbot);
	        var timer=null;
		var i=0;
		var num=0;
		for(i=0;i<aLink.length;i++)
		{
		  aLink[i].index=i;
		  aLink[i][evt]=function()
		  {
		    clearInterval(timer);
		    num = this.index;
			tabChange();
		  }
		aLink[i].onmouseout=function()
		  {
		    tabplay();
		  }
		}
		function tabChange()
		{
		   for(i=0;i<aLink.length;i++)
		   {
		      aLink[i].className="";
			  aDiv[i].style.display="none";
		   }
		    aLink[num].className=styleName;
			aDiv[num].style.display="block";
		}
		function tabplay()
		{
		   timer=setInterval(function(){
		     num++;
			 if(num>=aLink.length) num=0;
             tabChange();
		   },time)
		}
               
              if(leftbot)
              {
                  aleft.onclick=function()
               {      
                  clearInterval(timer);
                  num = num-1;
                  if(num<0)num=aLink.length-1;
		  tabChange();
                  tabplay();    
               }
              }
               if(rightbot)
               {
                   aright.onclick=function()
               {
                      clearInterval(timer);
                       num = num+1;
                        if(num==aLink.length)num=0;
			tabChange();
                        tabplay();
               }
               }
		tabplay();
	 }

//下拉菜单缓冲显示隐藏
                     function dropDownZ(obj,objBtn,objDiv,startvalue,time,objico,classNameone,classNametwo)
			{
				var oUl=document.getElementById(obj);
				var oBtn=oUl.getElementsByTagName(objBtn);
				var oDiv=oUl.getElementsByTagName(objDiv);
                                var oIco=oUl.getElementsByTagName(objico);
				var a=[];
				for(i=0;i<oBtn.length;i++)
			    {
			    	var nowheight=oDiv[i].offsetHeight;
			    	a.push(nowheight);
			    	if(oDiv[i].offsetHeight>startvalue)
			    	{
			    		oDiv[i].style.height=startvalue+"px";
			    	}
			    	oBtn[i].index=i;
			    	oBtn[i].onclick=function()
			    	{
			    		if(oDiv[this.index].offsetHeight>startvalue)
			    		{
			    			 
                                                 startMoveZ(oDiv[this.index],{height:startvalue},time);
			    		}
			    		else
			    		{
                                                
			    			 startMoveZ(oDiv[this.index],{height:a[this.index]},time);
			    		}
                                        if(objico)
                                       {
                                            if(oIco[this.index].className==classNameone)
                                        {
                                              oIco[this.index].className=classNametwo;
                                        }
                                        else
                                        {
                                              oIco[this.index].className=classNameone;
                                        }
                                       }
			    	}
			    }
			}



//运动框架
//获取行间非行间样式
function getStyleZ(obj, name) {
    if (obj.currentStyle) {
        return obj.currentStyle[name];
    }
    else {
        return getComputedStyle(obj, false)[name];
    }
}
var time = null;
function startMoveZ(obj, Json, num, fnEnd) {
    clearInterval(obj.time);
    obj.time = setInterval(function () {
        var bStop = true;
        for (var attr in Json) {
            var cur = 0;
            if (attr == 'opacity') {
                cur = Math.round(parseFloat(getStyleZ(obj, attr)) * 100);
            }
            else {
                cur = parseInt(getStyleZ(obj, attr));
            }
            var speed = (Json[attr] - cur) / num;
            speed = speed > 0 ? Math.ceil(speed) : Math.floor(speed);

            if (cur != Json[attr]) {
                bStop = false;
            }
           
            if (attr == 'opacity') {
                obj.style.filter = 'alpha(opacity:' + (cur + speed) + ')';
                obj.style.opacity = (cur + speed) / 100;
            }
            else {
                obj.style[attr] = cur + speed + 'px';
            }
            if (bStop) {
                clearInterval(obj.time);
                if (fnEnd) fnEnd();
            }
        }
    }, 30);
};



//自动切换+左右跨区域切换
 function  tabSwitchTwoZ(obj,objsub,objsmall,objsmallsub,objUl,leftbtn,rightbtn,number,time,styleName,ev,padnum)
           {
           	 var oFlashBox=document.getElementById(obj);
           	 var oSmallBox=document.getElementById(objsmall);
           	 var aFDiv=oFlashBox.getElementsByTagName(objsub);
           	 var aLi=oSmallBox.getElementsByTagName(objsmallsub);
           	 var oUl=document.getElementById(objUl);
           	 var oLeftBtn=document.getElementById(leftbtn);
           	 var oRightBtn=document.getElementById(rightbtn);
           	 var num=0;
           	 var timer=null;
           	 for(var i=0;i<aLi.length;i++)
           	 {
                oUl.style.width=aLi[0].offsetWidth*aLi.length+padnum+"px";
           	 	aLi[i].index=i;
           	 	aLi[i][ev]=function()
           	 	{
           	 		clearInterval(timer);
           	 		num=this.index;
           	 		tabchange();
           	 	}
           	 	aLi[i].onmouseout = function() {
						tabplay();
					}
           	 }
           	 function tabchange()
           	 {
           	 	for(i=0;i<aLi.length;i++)
           	 		{
           	 			aFDiv[i].style.display="none";
           	 			aLi[i].className="";
           	 		}
           	 		aFDiv[num].style.display="block";
           	 		aLi[num].className=styleName;
           	 }
           	 var numleft=0;
           	 function tabplay() {
					timer = setInterval(function() {
						num++;
						if(num%number==0)
						{
							 numleft=numleft-aLi[0].offsetWidth*number;
							 oUl.style.left=numleft+"px";
						}
						if (num >= aLi.length)
						{
							num = 0;
							oUl.style.left=0;
							numleft=0;
						}
						tabchange();
					}, time)
				}
           	 oRightBtn.onclick=function()
           	 {
           	 	clearInterval(timer);
           	 	//num=num+number;
                num=num+number-(num+number)%number;
                numleft=numleft-aLi[0].offsetWidth*number;
           	 	if(num>=aLi.length-1)
           	 	{
           	 		num=0;
           	 		numleft=0;
           	 	}
           	 	
                oUl.style.left=numleft+"px";
           	 	tabchange();
           	 	tabplay();
           	 }
           	  oLeftBtn.onclick=function()
           	 {
           	 	clearInterval(timer);
           	 	//num=num-number;
                      num=num-number-(num+number)%number;
                      numleft=numleft+aLi[0].offsetWidth*number;
           	 	if(num<0)
           	 	{
           	 		num=aLi.length-1;
           	 		numleft=-(parseInt(num/number))*aLi[0].offsetWidth*number;
           	 	}
           	 	
                oUl.style.left=numleft+"px";
           	 	
           	 	tabchange();
           	 	tabplay();
           	 }
           	 tabplay();
           }



//图片等比例缩放
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
