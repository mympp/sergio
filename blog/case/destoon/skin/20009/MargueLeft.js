var TimeSpan = 5000;
var IsStop = false;
var Index = 0;

$(function () {
    var sPliLength = $("#hotProductDivsrcollPos li").length;
    var sPliWid = $("#hotProductDivsrcollPos li").width();
    var sPmainWid = $("#hotProductDiv").width();
    var sPnowad = 0;
    $("#hotProductDivsrcollPos").css({ "width": sPliLength * sPliWid + "px" });

    $("#hpPrev,#hpNext").mousedown(function () {
        if ($(this).is(".sP-Perv")) {
            sPnowad += 5;
            if (sPnowad >= 0) {
                sPnowad = 0;
            }
        } else {
            sPnowad -= 5;
            if (sPnowad <= (sPliLength - sPmainWid / sPliWid) * -1) {
                sPnowad = (sPliLength - sPmainWid / sPliWid) * -1;
            }
        }
        $("#hotProductDivsrcollPos").stop(true).animate({ left: sPnowad * sPliWid + "px" }, 500);
    });

    var sPliLength1 = $("#fpsrcollpos li").length;
    var sPliWid1 = $("#fpsrcollpos li").width();
    var sPmainWid1 = $("#fpsrcollMain").width();
    var sPnowad1 = 0; //用户自动滚动用
    $("#fpsrcollpos").css({ "width": sPliLength1 * sPliWid1 + "px" });

    $("#fpPrev,#fpNext").mousedown(function () {
        if ($(this).is(".sP-Perv")) {
            Index += 5;
            if (Index >= 0) {
                Index = 0;
            }
        } else {
            Index -= 5;
            if (Index == (sPliLength1 - sPmainWid1 / sPliWid1) * -1) {
                Index = (sPliLength1 - sPmainWid1 / sPliWid1) * -1;
            }
            if (Index < (sPliLength1 - sPmainWid1 / sPliWid1) * -1)
                Index = 0;
          
        }
        $("#fpsrcollpos").stop(true).animate({ left: Index * sPliWid1 + "px" });
    });
    GunDong2(5, sPliLength1, sPmainWid1, sPliWid1);



    $("#fpPrev,#fpNext").bind("mouseover", function () {
        clearInterval(IsStop);
    });
    $("#fpPrev,#fpNext").bind("mouseout", function () {
        IsStop = setTimeout(function () { GunDong2(Index, sPliLength1, sPmainWid1, sPliWid1); }, TimeSpan);
    });

});

function GunDong2(wad, plilength, spmainwid, spliWid) {
    wad -= 5;
    Index = wad;
    if (wad == (plilength - spmainwid / spliWid) * -1) {
        wad = (plilength - spmainwid / spliWid) * -1;
    }
    if (wad < (plilength - spmainwid / spliWid) * -1)
        wad = 0;
    $("#fpsrcollpos").stop(true).animate({ left: wad * spliWid + "px" }, 200);
    IsStop = setTimeout(function () { GunDong2(wad, plilength, spmainwid, spliWid); }, TimeSpan);
}