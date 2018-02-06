$(function () {
    (function (B) {
        B.fn.marquee = function (e, Z) {
            var b = {
                speed: 10, direction: "up", pause: 1000, licount: 1, rowcount: 1, height_padding: 0, width_padding: 0
            };
            if (e) {
                B.extend(b, e)
            }
            Z = B.extend({
                speed: e.speed, step: 1, direction: e.direction, pause: e.pause, licount: e.licount, rowcount: e.rowcount, height_padding: e.height_padding, width_padding: e.width_padding
            }
			, Z || {});
            var A = jQuery.inArray(Z.direction, ["right", "down"]);
            if (A > -1) {
                Z.direction = ["left", "up"][A];
                Z.step = -Z.step
            }
            var f;
            var U = B(this);
            var V = U.innerWidth();
            var W = U.innerHeight();
            var d = B("ul", U);
            var i = B("li", d);
            var T = i.size() / Z.rowcount;
            var g = i.width() + parseInt(Z.width_padding);
            var c = i.height() + parseInt(Z.height_padding);
            var Y = g * T;
            var j = c * T;
            if ((Z.direction == "left" && Y > V) || (Z.direction == "up" && j > W)) {
                if (Z.direction == "left") {
                    d.width(2 * T * g);
                    if (Z.step < 0) {
                        U.scrollLeft(Y)
                    }
                }
                else {
                    d.height(2 * T * c);
                    if (Z.step < 0) {
                        U.scrollTop(j)
                    }
                }
                d.append(i.clone());
                f = setInterval(X, Z.speed);
                U.hover(function () {
                    clearInterval(f)
                }
				, function () {
				    f = setInterval(X, Z.speed)
				})
            }
            var h = 0;
            function X() {
                if (Z.direction == "left") {
                    var D = U.scrollLeft();
                    if (Z.step < 0) {
                        U.scrollLeft((D <= 0 ? Y : D) + Z.step);
                        if ((D - g * Z.licount - 1) % g == 0) {
                            h++;
                            if (h == Z.licount) {
                                a();
                                h = 0
                            }
                        }
                    }
                    else {
                        U.scrollLeft((D >= Y ? 0 : D) + Z.step);
                        if ((D + g * Z.licount + 1) % g == 0) {
                            h++;
                            if (h == Z.licount) {
                                a();
                                h = 0
                            }
                        }
                    }
                }
                else {
                    var C = U.scrollTop();
                    if (Z.step < 0) {
                        U.scrollTop((C <= 0 ? j : C) + Z.step)
                    }
                    else {
                        U.scrollTop((C >= j ? 0 : C) + Z.step)
                    }
                    if (C % c == 0) {
                        a()
                    }
                }
            }
            function a() {
                if (Z.pause > 0) {
                    var C = Z.step;
                    Z.step = 0;
                    setTimeout(function () {
                        Z.step = C
                    }
					, Z.pause)
                }
            }
        }
    })(jQuery);
    $("#leftgun").marquee({
        speed: "1", direction: "left", pause: "6000", licount: "3", rowcount: "1", height_padding: "0", width_padding: "0"
    });
    $("#marquee8").marquee({
        speed: "1", direction: "up", pause: "2000", licount: "1", rowcount: "1", height_padding: "0", width_padding: "0"
    });
    $("#marquee9").marquee({
        speed: "1", direction: "up", pause: "2000", licount: "1", rowcount: "1", height_padding: "0", width_padding: "0"
    })
});




function showthreecompany(tobj,tposition,tisrecommend,tcompany1,tlinkurl1,tcompany2,tlinkurl2,tcompany3,tlinkurl3,url)
{
	var theElement=tobj;
	var _lc0=document.getElementById("position"+tposition);
	var fixWidth=getPosition(_lc0)[0];
	var _lx = getPosition(theElement)[0];
	var _ty = getPosition(theElement)[1];

	var _span=document.getElementById("show_box_bw");
	var _div=document.getElementById("show_box_bw_con");
	if(_span)
	{
		_span.style.visibility="visible";
		_div.style.visibility="visible";
	}
	else
	{
		_span=document.createElement("span");
		_div=document.createElement("div");
		_span.setAttribute("id","show_box_bw");
		_div.setAttribute("id","show_box_bw_con");
		document.body.appendChild(_span);
		document.body.appendChild(_div);
	}

	var dataTag="";
	if (tcompany1!="")
	{
		dataTag+="<li><a href='"+tlinkurl1+"' target='_blank'>"+tcompany1+"</a></li>";
	}
	if (tcompany2!="")
	{
		dataTag+="<li><a href='"+tlinkurl2+"' target='_blank'>"+tcompany2+"</a></li>";
	}
	if (tcompany3!="")
	{
		dataTag+="<li><a href='"+tlinkurl3+"' target='_blank'>"+tcompany3+"</a></li>";
	}

	_div.innerHTML="<div class='out_top_bg'><div><ul>"+dataTag+"</ul></div></div>";

	_span.innerHTML="<a href='"+url+"'  class='"+tobj.className+"' target='_blank'>"+tobj.innerHTML+"</a>"

	var _spana=_span.getElementsByTagName("a")[0];
	var _ieffNum=document.all?9:10;

	var _spanleft=_lx;
	var _spantop=_ty;

	_span.style.left=_spanleft+"px"
	_span.style.top=_spantop+"px";

	var _pd=_lx-_ieffNum-fixWidth-29;
	_leftDis=_pd+_span.offsetWidth/2;

	_span.style.fontWeight="normal";
	_span.style.marginLeft="0px";

	if(_leftDis<50)
		_div.style.left=_spanleft+"px";
	else if (50<=_leftDis && _leftDis<80)
		_div.style.left=_spanleft-30+"px";
	else if(80<=_leftDis && _leftDis<300)
		_div.style.left=_spanleft-80+"px";
	else if (300<=_leftDis && _leftDis<350)
		_div.style.left=(_spanleft+_span.offsetWidth-_div.offsetWidth)+10+"px";
	else
	{
		_span.style.left=(_spanleft-13)+"px"
		_div.style.left=(_spanleft-13)+_span.offsetWidth-_div.offsetWidth+"px";
	}

	_div.style.top=_spantop+19+"px";

	_span.onmouseover=function()
	{
		 this.style.visibility="visible";
		 _div.style.visibility="visible";
	}
	_span.onmouseout=function()
	{
		 this.style.visibility="hidden";
		 _div.style.visibility="hidden";
	}
	_div.onmouseover=function()
	{
		this.style.visibility="visible";
		_span.style.visibility="visible";
	}
	_div.onmouseout=function()
	{
		this.style.visibility="hidden";
		_span.style.visibility="hidden";
	}
}

function getPosition(theElement)
{
	var positionX = 0;
	var positionY = 0;
	while (theElement != null)
	{
		positionX += theElement.offsetLeft;
		positionY += theElement.offsetTop;
		theElement = theElement.offsetParent;
	}
	return [positionX, positionY];
}

