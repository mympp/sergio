/*鎵嬫満鑿滃崟鏍忓睍寮€*/
$('#NavBtn').click(function(){
    var NavHeight = $('.wd .pc_nav').height();
    if($('#nav').hasClass('active')){
        $('#NavBox').css('height','0');
        setTimeout(function(){
            $('#nav').removeClass('active');
        },500)
    }else{
        $('#NavBox').css('height',NavHeight);
        $('#nav').addClass('active');
    }
});
//閫夐」鍗″垏鎹�
function setTab2(name,cursel,n,css){
    for(i=1;i<=n;i++){
        var menu = $("#"+name+""+i),
            con = $("#con_"+name+"_"+i),
            menuThis = $("#"+name+""+cursel),
            conThis = $("#con_"+name+"_"+cursel);
        if(i == cursel ){
            if(conThis.css("display")=='block'){
                conThis.hide();
            }else{
                conThis.show();
            }
        }else{
            menu.removeClass(css);
            menuThis.addClass(css);
            con.hide();
        }
    }
};
/*鍒嗙被婊氬姩*/   
if($('#navScroll').length>0){
    function Trundle(){
        var _width = $('#navScroll li').size() * $('#navScroll li').width();
        $('#navScroll ul').css('width',_width);
        var scroll = new iScroll('navScroll');
    }
    Trundle();
    $(window).on('ortchange', function () {
        $.later(function () {
             Trundle();
        }, 150, false);
    });
}
jQuery.fn.extend({
    "loading": function() {
        $(this).html('<div class=\"slide-loading\">姝ｅ湪鍔犺浇锛岃绋嶅€�...</div>');
        return this;
    },
    "error": function() {
        var msg_obj = $(this).html("<div class=\"slide-error\">缃戠粶璇锋眰澶辫触锛岃绋嶅悗閲嶈瘯锛�</div>")
    },
    "validform": function(form_id, callback) {
        if (form_id) {
            var form = $("#" + form_id);
        }
        else {
            var form = $(this).find("form:first");
        }
        $.validform(form, callback);
        return this;
    },
    "category": function(category_json) {
        /*鐢熸垚缂栬緫鏄撹涓氶€夋嫨*/
        var category_dom = $(this);
        category_dom.html('<span class="Validform_checktip Validform_loading">姝ｅ湪鍔犺浇...</span>');
        if (category_json) {
            var value = parseInt(category_json[0])
        } else {
            var value = 0;
        }
        $.ajax({
            data: "pid=001",
            type: "GET",
            dataType: "json",
            url: "/Public/getPDCCategory",
            success: function(data) {
                category_dom.html('');
                var select_dom = $('<select class="form-control form-category"  name="category[]"><option value="">璇烽€夋嫨</option></select>');
                $(data).each(function(k, v) {
                    if (v.id == value) {
                        select_dom.append('<option value="' + v.categoryID + '" selected>' + v.name + '</option>');
                    } else {
                        select_dom.append('<option value="' + v.categoryID + '">' + v.name + '</option>');
                    }
                })
                select_dom.bind("change", $.category);
                category_dom.html('');
                category_dom.append(select_dom).append('<span class="Validform_checktip"></span>');
                if (category_json) {
                    for (i = 0; i < category_json.length - 1; i++) {
                        $.category(category_json[i], eval(category_json[i + 1]), category_dom);
                    }
                }
            },
            error: function(response, status) {
                alert('琛屼笟杈撳叆鍑洪敊锛岃绋嶅悗閲嶈瘯');
            },
        })

    }
})
jQuery.extend({
    "category": function(pid, value, category_dom) {
        if (category_dom) {
            var parent_dom = $(category_dom).find("select:last");
        } else {
            var parent_dom = $(this);
        }
        if ($.type(pid) == "object") {
            var pid = parent_dom.val();
        }
        $(parent_dom).nextAll("select").remove();
        if (!pid)
            return false;
        $(parent_dom).nextAll(".Validform_checktip").removeClass("Validform_right Validform_wrong").addClass("Validform_loading").html("姝ｅ湪妫€绱笅绾у垎绫伙紝璇风◢鍊�...");
        $.ajax({
            type: "GET",
            url: "/Public/getPDCCategory",
            data: "pid=" + pid,
            dataType: "json",
            error: function(response, status) {
                alert('琛屼笟杈撳叆鍑洪敊锛岃绋嶅悗閲嶈瘯');
            },
            success: function(data) {
                if (data == null || data == '') {
                    $(parent_dom).nextAll(".Validform_checktip").removeClass("Validform_loading").addClass("Validform_right").html('鏃犱笅绾у垎绫�');
                    return false;
                }
                var select_dom = $('<select class="form-control form-category" datatype="n" name="category[]"><option value="">璇烽€夋嫨</option></select>');
                $(data).each(function(k, v) {
                    if (v.categoryID == value) {
                        select_dom.append('<option value="' + v.categoryID + '" selected>' + v.name + '</option>');
                    } else {
                        select_dom.append('<option value="' + v.categoryID + '">' + v.name + '</option>');
                    }
                })
                select_dom.bind("change", $.category);
                $(parent_dom).nextAll(".Validform_checktip").removeClass("Validform_right Validform_wrong Validform_loading").html('');
                parent_dom.after(select_dom);
                parent_dom.next().focus();
            }
        })
    },
    "ValidformCallback": function(data) {
        // 瀹氫箟榛樿琛ㄥ崟鎻愪氦鎴愬姛鍥炶皟
        if (data.status == 1) {
            $("#Validform_msg").delay(500).fadeOut();
        }
        else if (data.status == 0) {
            $("#Validform_msg").delay(3000).fadeOut();
        }
    },
    "hideValidMsg": function() {
        $("#Validform_msg").delay(500).fadeOut();
    },
    "confirm": function(msg, e, callback) {
        var confirm = $("#confirm_modal");
        if (confirm.length <= 0) {
            var confirm = $('<div class="modal fade132" id="confirm_modal" tabindex="-1" role="dialog" aria-hidden="true"><div class="modal-dialog"><div class="modal-content"></div></div></div>');
        }
        var url = $(e).attr("data-url");
        if (!url) {
            alert('鏃犳晥鐨勬搷浣滃湴鍧€');
            return false;
        }
        var success_reload = $(e).attr("data-reload");
        var callbacks = $.Callbacks();
        if (callback) {
            if ($.isFunction(callback) || $.isFunction(eval(callback))) {
                callbacks.add(eval(callback));
            }
            else {
                alert('鍥炶皟鍑芥暟涓嶅瓨鍦�');
                return false;
            }
        } else {
            callbacks.add($.confirmCallback);
        }
        var confirm_content = $(confirm).find(".modal-content");
        confirm_content.html('');
        confirm_content.append('<div class="modal-header"><button type="button" class="close" data-dismiss="modal"><span aria-hidden="true">&times;</span><span class="sr-only">Close</span></button><h4 class="modal-title">鎿嶄綔纭</h4></div>');
        confirm_content.append('<div class="modal-body">' + msg + '</div>');
        confirm_content.append('<div class="modal-footer"><button type="button" class="btn btn-default" data-dismiss="modal">鍏抽棴</button><button type="button" class="btn btn-primary" id="confirm_button" data-dismiss="modal">纭</button></div>');
        confirm_content.find("#confirm_button").bind("click", function() {
            callbacks.fire(url, e, success_reload);
        })
        $("body").append(confirm);
        $(confirm).modal("show");
    },
    "confirmonly": function(msg, e, el) {
        var confirm = $("#confirm_modal");
        if (confirm.length <= 0) {
            var confirm = $('<div class="modal fade" id="confirm_modal" tabindex="-1" role="dialog" aria-hidden="true"><div class="modal-dialog"><div class="modal-content"></div></div></div>');
        }
        var url = $(e).attr("data-url");
        if (!url) {
            alert('鏃犳晥鐨勬搷浣滃湴鍧€');
            return false;
        }

        var confirm_content = $(confirm).find(".modal-content");
        confirm_content.html('');
        confirm_content.append('<div class="modal-header"><button type="button" class="close" data-dismiss="modal"><span aria-hidden="true">&times;</span><span class="sr-only">Close</span></button><h4 class="modal-title">鎿嶄綔纭</h4></div>');
        confirm_content.append('<div class="modal-body">' + msg + '</div>');
        confirm_content.append('<div class="modal-footer"><button type="button" class="btn btn-default" data-dismiss="modal">鍏抽棴</button><button type="button" class="btn btn-primary" id="confirm_button" data-dismiss="modal">纭</button></div>');
        confirm_content.find("#confirm_button").bind("click", function() {
            $.get(url);
            $(el).click();
        })
        $("body").append(confirm);
        $(confirm).modal("show");
    },
    "confirmCallback": function(url, e, success_reload) {
        $("#confirm_modal .modal-body").loading();
        $.ajax({
            type: "GET",
            dataType: "json",
            url: url,
            success: function(msg) {
                $("#confirm_modal .modal-body").html(msg.info);
                if (msg.status == 1) {
                    $("#confirm_modal").modal("hide");
                } else {
                    $("#confirm_button").remove();
                    $("#confirm_modal").modal("show");
                }
                if (success_reload) {
                    $.dataTbales($(success_reload))
                }
            },
            error: function(request, status, errorThrown) {
                $("#confirm_modal .modal-body").error();
            }
        });
    },
    "dataTbales": function(e, param) {
        console.log(e);
        console.log(param);
        // 涓篸atatables琛ㄦ牸瑙﹀彂鏁版嵁鍔犺浇
        var url = $(e).attr("data-url");
        if (!url) {
            alert("鏃犳晥閾炬帴");
            return false;
        }
        $(e).html('<div class=\"datatable-loading\">姝ｅ湪鍔犺浇锛岃绋嶅€�...</div>');
        $(e).load(url, param, function(respone, status) {
            if (status == 'error' || status == 'timeout') {
                $(this).error();
                return false;
            }
        })
    },
    "validform": function(f, callback) {
        // 鍒濆鍖栬〃鍗曢獙璇佹彃浠�
        var option = {};
        option.url = $(f).attr("data-action");
        if (!option.url) {
            return false;
        }
        option.ajaxPost = true;
        option.showAllError = true;
        option.tiptype = 3;
        if (callback) {
            option.callback = callback;
        }
        else {
            option.callback = function(result) {
                $.ValidformCallback(result);
            }
        }
        return $(f).Validform(option);
    },
    "ueditor": function(e) {
        var um_id = e.id;
        UE.delEditor(um_id);
        UE.getEditor(um_id);
    },
    "slideLink": function(e) {
        // 涓讳綋鍐呭閾炬帴
        var id = $(e).attr("data-id");
        var url = $(e).attr("data-url");
        if (!url) {
            alert("鏃犳晥閾炬帴");
            return false;
        }
        var effect = ["blind", "clip", "drop", "fold", "scale", "slide"];
        var raund_effect = effect[Math.floor(Math.random() * effect.length)]
        if ($("#" + id).length > 0) {
            var obj = $("#" + id);
        }
        else {
            var obj = $("#slide_content");
        }
        $(".slide").hide();
        $(obj).addClass("slide-mask").loading();
        $(obj).show(raund_effect, {}, 500, function() {
            $(this).load(url, function(respone, status) {
                if (status == 'error' || status == 'timeout') {
                    $(this).error();
                    return false;
                }
                $(this).removeClass("slide-mask");
                $(this).find("div[data-type='ajax']").each(function() {
                    $.dataTbales(this);
                });
                $(this).find("textarea[data-type='umeditor']").each(function() {
                    $.ueditor(this);
                });
                $(this).find("form").each(function() {
                    var form_callback = $(this).attr("callback");
                    if (typeof (form_callback) != "undefined" && $.isFunction(eval(form_callback))) {
                        $.validform(this, eval(form_callback))
                    }
                    else {
                        $.validform(this)
                    }
                });
            });
        });
        if ($(".ui-dialog[aria-describedby='editor-dialog']").size()) {
            $("#editor-dialog").dialog("close");
        }
    },
    "pageLink": function(e) {
        var url = $(e).attr("data-url");
        if (!url) {
            alert("鏃犳晥閾炬帴");
            return false;
        }
        var obj = $(e).parents(".slide:first").find("#page_content");
        if (obj.lenth <= 0) {
            alert("鏃犳硶鑾峰彇page_content瀵硅薄");
            return false;
        }
        else {
            $(obj).html('<div class=\"slide-loading\">姝ｅ湪鍔犺浇锛岃绋嶅€�...</div>');
            $(obj).load(url, function(respone, status) {
                if (status == 'error' || status == 'timeout') {
                    $(this).error();
                    return false;
                }
                $(this).find("div[data-type='ajax']").each(function() {
                    $.dataTbales(this);
                });
                $(this).find("textarea[data-type='umeditor']").each(function() {
                    $.ueditor(this);
                });
                $(this).find("form").each(function() {
                    var form_callback = $(this).attr("callback");
                    if ($.isFunction(eval(form_callback))) {
                        $.validform(this, eval(form_callback))
                    } else {
                        $.validform(this)
                    }
                })
            });
        }
    },
    "goToPage": function(page, e) {
        var url = window.location.href;
        url = url.replace(".html", "");
        if (url.indexOf("/p/") === -1) {
            url += "/p/" + page + ".html";
        } else {
            var url_length = url.split("/p/")[1].length;
            url = url.substring(0, url.length - url_length);
            url += page + ".html";
        }
        window.location.href = url;
    },
    //鏄惁纭鎿嶄綔寮瑰嚭鎻愮ず妗� $.isConfirm('xx');涓巇ata-url閰嶅悎浣跨敤锛屾搷浣滄垚鍔熷埛鏂板師椤甸潰
    "isConfirm": function(msg, e) {
        if($(e).attr('disabled')){
            return false;
        }
        
        var confirm = $("#confirm_modal");
        if (confirm.length <= 0) {
            var confirm = $('<div class="modal fade132" id="confirm_modal" tabindex="-1" role="dialog" aria-hidden="true"><div class="modal-dialog"><div class="modal-content"></div></div></div>');
        }
        var url = $(e).attr("data-url");
        if (!url) {
            alert('鏃犳晥鐨勬搷浣滃湴鍧€');
            return false;
        }
        var html = '';
        html += '<div class="popBox">';
        html += '<div class="iconBox iconfont icon-bangzhu" id="icon"></div>';
        html += '<div class="text" name="tipsTitle">' + msg + '</div>';
        html += '<div class="btn BgBlue" id="confirmBtn" name="tipsBtn">纭畾</div>';
        html += '<div class="btn BgGray" id="cancelBtn" name="tipsBtn">鍙栨秷</div>';
        html += '</div>';
        html += '<div class="popBg"></div>';
        $("body").append(html);
//        $("div").delegate("button","click",function(){ 
        $("#confirmBtn").bind("click", function() {
            if($(e).attr('is-load')){
                $('[name="tipsTitle"]').html('');//鍔犺浇涓仿仿仿�
                $('#icon').removeClass('icon-bangzhu');
                $('#icon').addClass('loading');
                $('[name="tipsBtn"]').remove();
            }
            $.ajax({
                type: "GET",
                dataType: "json",
                url: url,
                success: function(msg) {
                    $('div.popBox').remove();
                    $('div.popBg').remove();
//                    $('.title').html(msg.info);
                    if(msg.status == 1){
//                        $('.iconBox').removeClass('icon-bangzhu').addClass('icon-quangou');
                        $.showTips(msg.info,1);
                        setTimeout("location.reload()",1000);
                    }else{
                        $.showTips(msg.info,3);
//                        $('.iconBox').removeClass('icon-bangzhu').addClass('icon-55');
                    }
//                    $('div.btn').remove();
                },
                error: function(request, status, errorThrown) {
                    $('div.popBox').remove();
                    $('div.popBg').remove();
                    console.log(request);
                    $.showTips(msg.info,3);
                }
            });
        })
        $("#cancelBtn").bind('click', function(){
            $(".popBox").remove();
            $(".popBg").remove();
        });
//        <!--icon-quangou鎵撳嬀   icon-information鎰熷徆鍙�  icon-55閿欒   icon-bangzhu闂彿-->
    },
    //寮圭獥鏄剧ず鎻愮ず淇℃伅 $.showTips('xx',1);//type:1 icon-quangou鎵撳嬀  2 icon-information鎰熷徆鍙� 3 icon-55閿欒 4  icon-bangzhu闂彿
    "showTips": function(msg,type) {
        if(!type){
            type = 2;
        }
        var html = '';
        html += '<div class="popBox" id="msgTips">';
        html += '<div class="iconBox iconfont ';
        if(type == 1){
            html += 'icon-quangou';
        }else if(type == 2){
            html += 'icon-information';
        }else if(type == 3){
            html += 'icon-55';
        }else if(type == 4){
            html += 'icon-bangzhu';
        }
        html += '"></div>';
        html += '<div class="text">' + msg + '</div>';
//        html += '<div class="btn BgBlue" id="confirmBtn">纭畾</div>';
        html += '<div class="btn BgBlue" id="cancelBtn">纭畾</div>';
        html += '</div>';
        html += '<div class="popBg" id="msgTipsBg"></div>';
        $("body").append(html);
        $("#cancelBtn").bind('click', function(){
            $("#msgTips").remove();
            $("#msgTipsBg").remove();
        });
    }
})
//娣诲姞楠岃瘉姝ｅ垯瑙勫垯
$.Datatype.kong = /^(\s)*$/;
$.Datatype.currency = /^\d+(\.\d+)?$/;
$.Datatype.zh = /^[\u4E00-\u9FA5\uf900-\ufa2d]{1,}$/;
$.Datatype.zhh = /^[\u4E00-\u9FA5\uf900-\ufa2d]{2,10}$/;
$.Datatype.zhe = /^[a-zA-Z0-9_]{2,20}$/;
$.Datatype.emp = /^\s*$\s*/;
$.Datatype.ip = /((?:(?:25[0-5]|2[0-4]\d|[01]?\d?\d)\.){3}(?:25[0-5]|2[0-4]\d|[01]?\d?\d))/;
$.Datatype.phone = /\d{3,4}?[-\s]{1,}?\d{7,8}$/;
$.Datatype.phone400 = /^400[-\s]{1,}?\d{3}[-\s]{1,}?\d{4}$/;
$.Datatype.uname = /^[A-Za-z0-9]{4,20}$/;
$.Datatype.domain = /^[A-Za-z]{1}[A-Za-z0-9\-]{2,19}$/;
$.Datatype.hurl = /^http:\/\/\w+(\.\w+)+.*$/;
$.Datatype.zhurl = /^(\w+:\/\/)?([\w\u4E00-\u9FA5\uf900-\ufa2d\-]+)+(\.[\w\u4E00-\u9FA5\uf900-\ufa2d]+)+.*$/;
$.Datatype.price = /^[0-9]+(.[0-9]{1,2})?$/;
$.Datatype.price8 = /^[0-9]{1,8}[.\s][0-9]{1,2}?$/;
$.Datatype.isHK = /^[Hh]{1}([0-9]{10}|[0-9]{8})$/;//娓境閫氳璇佹牸寮�
$.Datatype.isMacao = /^[Mm]{1}([0-9]{10}|[0-9]{8})$/;
$.Datatype.isTaiwan = /^([0-9]{8}|[0-9]{10})$/;
/**
 * 鐧诲綍椤甸潰
 */
function login(param){
    if(param=='beta'){
        window.location.href = "http://user.beta.258.com/Public/login.html?return_url=" + window.location.hostname+window.location.pathname;
    }else{
        window.location.href = "http://user.258.com/Public/login.html?return_url=" + window.location.hostname+window.location.pathname;
    }
}
/**
 * 娉ㄥ唽椤甸潰
 */
function register(param){
    if(param=='beta'){
        window.location.href = "http://user.beta.258.com/Public/register.html";
    }else{
        window.location.href = "http://user.258.com/Public/register.html";
    }
}

/**
 * 閫€鍑虹櫥褰�
 * 
 */
function logout(){
    $.ajax({
        type: "POST",
        url: "/Common/logout.html",
        data: { "logout":1},
        dataType: "json",
        success: function(response) {
            if(response.s==1){
                topHtml(response);
                rightHtml(response);
            }
            if(response.name=='User'){
                window.location.reload();
            }
        }
    });
}
/**
 * 椤堕儴淇℃伅
 */
function topHtml(response){
    var html = '';
    if(response.is_develop==1){
        var user_url = 'http://user.beta.258.com';
        if(response.logout==1){
            html += '<a href="javascript:;" class="Themefont" onclick="login('+"'beta'"+')"  rel="nofollow">[鐧诲綍]</a>  <a href="javascript:;" class="Themetxthover" onclick="register('+"'beta'"+')" rel="nofollow">鍏嶈垂娉ㄥ唽</a>';
        }else{
            html += '鎮ㄥソ锛�<a href="'+user_url+'/Account/index.html" class="Themetxthover" target="_blank" rel="nofollow"><span class="hym blue">'+response.user.username+'</span></a>  <a href="javascript:;" class="Themefont" onclick="logout()" rel="nofollow">[閫€鍑篯</a>';
        }
    }else{
        var user_url = 'http://user.258.com';
        if(response.logout==1){
            html += '<a href="javascript:;" class="Themefont" onclick="login()"  rel="nofollow">[鐧诲綍]</a>  <a href="javascript:;" class="Themetxthover" onclick="register()" rel="nofollow">鍏嶈垂娉ㄥ唽</a>';
        }else{
            html += '鎮ㄥソ锛�<a href="'+user_url+'/Account/index.html" class="Themetxthover" target="_blank" rel="nofollow"><span class="hym blue">'+response.user.username+'</span></a>  <a href="javascript:;" class="Themefont" onclick="logout()" rel="nofollow">[閫€鍑篯</a>';
        }
    }
    $("#topUser").html(html);
}
/**
 * 鐢ㄦ埛鍙宠竟淇℃伅
 */
function rightHtml(response){
    var html = '';
    var user_url = '';
    if(response.is_develop==1){
        user_url = 'http://user.beta.258.com';
    }else{
        user_url = 'http://user.258.com';
    }
    if(response.logout==1){
        html += '<div class="headImg"><div class="imgBox fl mr10"><img class="img100" src="/Public/New/Common/Images/head_picture.png" alt=""></div>';
        html += '<p>Hi锛屾偍濂�!</p>';
        html += '<p class="blue">娆㈣繋鏉ュ埌258.com</p>';
        html += '<div class="clear"></div></div>';
        html += '<a href="'+user_url+'/Public/login.html" class="login Themebg iconfont icon-Supplier" rel="nofollow">鐧诲綍</a>';
        html += '<a href="'+user_url+'/Public/register.html" class="regist OrangeBg" rel="nofollow">鍏嶈垂娉ㄥ唽</a>';
    }else{
        if(response.user.logo!=''){
            html += '<div class="imgBox fl mr10"><img class="img100" src="'+response.user.logo+'" alt=""></div>';
        }else{
            html += '<div class="imgBox fl mr10"><img class="img100" src="/Public/New/Common/Images/head_picture.png" alt=""></div>';
        }
        html += '<p class="Welcome">'+response.user.username+'锛屾偍濂�!</p>';
        html += '<p class="blue"><a href="'+user_url+'" target="_blank" class="Themefont" rel="nofollow">鎴戠殑258</a></p>';
    }
    $("#rightUser").html(html);
}
/**
 * 鐧婚檰楠岃瘉
 */
$(document).ready(function(){
    $.ajax({
        type: "POST",
        url: "/Common/getSession",
        data: "url=" + window.location.href,
        dataType: "json",
        success: function(response) {
            if(response.s==-1){
                return false;
            }
            topHtml(response);
            rightHtml(response);
            $('#ruzhubtn').remove();
        }
    });
    /**
    * lazyload
    * placeholder 鍗犱綅鍥剧墖
    * effect 鏄剧ず鏁堟灉
    * skip_invisible false浠ｈ〃disable鐨勫浘鐗囦篃鍔犺浇锛岄拡瀵箃ab鏍囩鍜宐anner
    * threshold 璺濈鍥剧墖浣嶇疆1300鍍忕礌灏辨彁鍓嶅姞杞�
    */
    $("img").lazyload({
        placeholder : 'http://www258com.b0.upaiyun.com/Public/New/Common/Js/LazyLoad/noneImg.jpg', 
        effect      : 'fadeIn',
        skip_invisible : false,
        threshold : 1300
    });
});
//鎻愮ず妗嗭紝姝ｇ‘浠ュ悗锛岀偣鍑荤‘瀹氬彲鍒锋柊褰撳墠椤甸潰,type:1 icon-quangou鎵撳嬀  2 icon-information鎰熷徆鍙� 3 icon-55閿欒 4  icon-bangzhu闂彿
function showTips(msg,type) {
    if(!type){
        type = 2;
    }
    var html = '';
    html += '<div class="popBox" id="msgTips">';
    html += '<div class="iconBox iconfont ';
    if(type == 1){
        html += 'icon-quangou';
    }else if(type == 2){
        html += 'icon-information';
    }else if(type == 3){
        html += 'icon-55';
    }else if(type == 4){
        html += 'icon-bangzhu';
    }
    html += '"></div>';
    html += '<div class="text">' + msg + '</div>';
    if(type==1){
        html += '<div class="btn BgBlue" id="confirmBtn">纭畾</div>';
    }else{
        html += '<div class="btn BgBlue" id="cancelBtn">鍏抽棴</div>';
    }
    html += '</div>';
    html += '<div class="popBg" id="msgTipsBg"></div>';
    $("body").append(html);
    $("#confirmBtn").bind('click', function(){
        $("#msgTips").remove();
        $("#msgTipsBg").remove();
        window.location.reload();
    });
    $("#cancelBtn").bind('click', function(){
        $("#msgTips").remove();
        $("#msgTipsBg").remove();
    });
}
// 浼佷笟鍟嗛摵banner
(function ($) {
   $.fn.swBanner=function(options){
     var defaults={
         animateTime:300,
         delayTime:5000
     }
   var setting=$.extend({},defaults,options);
   
   return this.each(function(){
      $obj=$(this);
      var o=setting.animateTime;
      var d=setting.delayTime;
      var $oban=$obj.find(".banList li");
      var _len=$oban.length;
      var $nav=$obj.find(".fomW a");
      var _index=0;
      var timer;
      //鍥剧墖杞崲
      function showImg(n){
         $oban.eq(n).addClass("active").siblings().removeClass("active");
         $nav.eq(n).addClass("current").siblings().removeClass("current");
      }
      //鑷姩鎾斁
      function player(){
        timer=setInterval(function(){
           var _index=$obj.find(".fomW").find("a.current").index();
           showImg((_index+1)%_len);
        },d)
      }
      //
      $nav.click(function(){
         if(!($oban.is(":animated"))){
         _index=$(this).index();
         showImg(_index);
         }
      });
      //
      $oban.hover(function(){
        clearInterval(timer);
      
      },function(){
        player();
      
      });
       player();
   });
   
   }
})(jQuery);
// 鍟嗛摵banner end