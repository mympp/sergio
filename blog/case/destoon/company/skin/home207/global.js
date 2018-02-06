var Domain = window.location.host.substring(window.location.host.indexOf(".") + 1);
//页面加载完执行函数
document.onreadystatechange = function () {
    if (document.readyState == 'complete') {
        $(window).scroll(function (e) {
            //获取滚动距离 
            var scroll_h = 307;
            if ($(".top").length <= 0) {
                scroll_h = 200;
            }
            var scrollTop = $(document).scrollTop();
            if (scrollTop > (scroll_h)) {
                $(".nav").addClass("fixed");
            }
            else {
                $(".nav").removeClass("fixed");
            }
        })
    }
    if (document.getElementById("search1")) {
        document.getElementById("search1").onclick = function () {
            var key = document.searchform.key.value;
            if (yzSearch(key)) {
                location.href = "/product/search.html?keyword=" + encodeURI(key);
            }
        }
    }
    if (document.getElementById("search2")) {
        document.getElementById("search2").onclick = function () {
            var key = document.searchform.key.value;
            if (yzSearch(key)) {
                window.open("http://www." + Domain + "/stock/search.asp?key=" + encodeURI(key));
            }
        } 
    }
    if (document.getElementById("search3")) {
        document.getElementById("search3").onclick = function () {
            var key = document.searchform.key.value;
            if (yzSearch(key)) {
                location.href = "/demand/search.html?keyword=" + encodeURI(key);
            }
        }
    }
}

function searchstock(key, type) {
    if (yzSearch(key)) {
        if (type == 0) {
            location.href = "/stock/search.html?keyword=" + encodeURI(key);
        }
        else {
            location.href = "/product/search.html?keyword=" + encodeURI(key);
        }
    }
    return false;
}

function yzSearch(key) {
    if (key != surnam_keyup(key)) {
        alert("输入查询条件有非法字符");
        return false;
    }
    else if (key == "" || key == "请输入关键词") {
        alert("请输入关键词");
        return false;
    }
    else if (key.length < 3) {
        alert("请输入字符个数大于3的查询条件");
        return false;
    }
    return true;
}

function search(type) {
    var key = document.getElementById("key").value;
    searchstock(key, type);
}

function searchic() {
    var key = document.getElementById("keyword").value;
    searchstock(key, 0);
}

//在线留言
function subleave() {
    var form = document.myform;
    var valuid = form.userid.value;
    var valcompany = form.company.value;
    var valpname = form.pname.value;
    var valtel = form.tel.value;
    var valemail = form.email.value;
    var valMSN = form.MSN.value;
    var valQQ = form.QQ.value;
    var valbody = form.body.value;
    if (valpname.Trim() == "") {
        alert("联系人为必填项");
        return;
    }
    if (valtel.Trim() == "" && valemail.Trim() == "" && valMSN.Trim() == "" && valQQ.Trim() == "") {
        alert("联系方式至少添一项");
        return;
    }
    $.ajax({
        type: "POST",
        url: "/lib/saveorder.aspx",
        data: { userid: valuid, company: valcompany, pname: valpname, tel: valtel, email: valemail, MSN: valMSN, QQ: valQQ, body: valbody },
        success: function (msg) {
            //document.getElementById("leave").innerHTML = "<div class='tipmsg'>" + msg + ",点击 <a href='/leave/'>返回</a></div>";
            alert(msg);
        }
    });
}

//过滤非法字符
function surnam_keyup(text) {
    //控件值
    var textvalue = text;
    //非法字符集
    var codes = '<>/@#%';
    //非法字符数组
    var codearray = codes.split('');
    //循环替换非法字符
    for (i = 0; i < codearray.length; i++) {
        while (textvalue.indexOf(codearray[i]) != -1) {
            textvalue = textvalue.replace(codearray[i], '');
        }
    }
    //重新给控件赋值
    return textvalue;
}

//去左右空格;
String.prototype.Trim = function () {
    return this.replace(/(^\s*)|(\s*$)/g, "");
}