/*
 * 绑定dropdown-click组件事件
 */
$(document).on("click", ".dropdown-click:not(.disable)", function(event) {
    event.stopPropagation();
    $(this).toggleClass("opened");
});
$(document).on("click", function() {
    $(".dropdown-click").removeClass("opened");
});
$(document).on("click", ".dropdown-click .dropdown-menu>li", function() {
    $(this).parents(".dropdown-click").children(".dropdown-toggle").html($(this).text());
});
/*
 * tree-select组件事件
 */
/*$(document).on("click", ".tree-toggle", function() {
    $(this).parents(".tree-select").toggleClass("opened");
    if($(this).parents(".tree-select").hasClass("opened")) {
        $(this).removeClass("fa-plus-circle");
        $(this).addClass("fa-minus-circle");
    } else {
        $(this).removeClass("fa-minus-circle");
        $(this).addClass("fa-plus-circle");
    }
});*/
/*
 * 退出事件
 */
$(document).on('click', '#nav-user-quit', function(event) {
    event.preventDefault();
    window.location.href = BASEURL + 'admin/api/logout';
});
/*
 * 获取时间字符串
 */
function getDateStr(AddDayCount, split) {
    split = split == undefined || split == ""? "-" : split;
    var dd = new Date();
    dd.setDate(dd.getDate()+AddDayCount);//获取AddDayCount天后的日期
    var y = dd.getFullYear();
    var m = dd.getMonth()+1;//获取当前月份的日期
    if(m<10) {
        m = "0" + m;
    }
    var d = dd.getDate();
    if(d<10) {
        d = "0" + d;
    }
    return y+split+m+split+d;
}

function getAfterDateStr(startDate, AddDayCount, split) {
    split = split == undefined || split == ""? "-" : split;
    var dd = new Date(startDate);
    dd.setDate(dd.getDate()+AddDayCount);//获取AddDayCount天后的日期
    var y = dd.getFullYear();
    var m = dd.getMonth()+1;//获取当前月份的日期
    if(m<10) {
        m = "0" + m;
    }
    var d = dd.getDate();
    if(d<10) {
        d = "0" + d;
    }
    return y+split+m+split+d;
}

//写Cookie
function addCookie(objName, objValue, objHours) {
    var str = objName + "=" + escape(objValue);
    if (objHours > 0) {//为0时不设定过期时间，浏览器关闭时cookie自动消失
        var date = new Date();
        var ms = objHours * 3600 * 1000;
        date.setTime(date.getTime() + ms);
        str += "; expires=" + date.toGMTString();
    }
    document.cookie = str;
}

//读Cookie
function getCookie(objName) {//获取指定名称的cookie的值
    var arrStr = document.cookie.split("; ");
    for (var i = 0; i < arrStr.length; i++) {
        var temp = arrStr[i].split("=");
        if (temp[0] == objName) return unescape(temp[1]);
    }
    return "";
}

function getUrl(str) {
    var result = "";
    var httpReg = new RegExp(/^https?:\/\//);
    if(httpReg.test(str)) {
        result = str;
    } else {
        result = "http://" + str;
    }
    return result;
}
var ADVERT_STATUS_ARR = ['暂停','播放','审核不通过','待审核','审核中','结束','被退回','待播放'];
/*
 *Pagination 分页器
 */
var Pagination = function(container, params) {
    var s = this;
    s.defaults = {
        pageNo: 1,
        pageCount: 0,
        showRange: 3
    };
    params = params || {};
    var originalParams = {};
    for (var param in params) {
        if (typeof params[param] === 'object' && params[param] !== null && !(params[param].nodeType || params[param] === window || params[param] === document || (typeof Dom7 !== 'undefined' && params[param] instanceof Dom7) || (typeof jQuery !== 'undefined' && params[param] instanceof jQuery))) {
            originalParams[param] = {};
        } else {
            originalParams[param] = params[param];
        }
    }
    for (var def in s.defaults) {
        if (typeof params[def] === 'undefined') {
            params[def] = s.defaults[def];
        }
    }

    s.update = function(params) {
        for (var def in s.defaults) {
            if (typeof params[def] === 'undefined') {
                params[def] = s.defaults[def];
            }
        }
        var html = '';
        if(params.pageCount == null || params.pageCount == 0) {
            $(container).attr("data-page", params.pageNo).html(html);
        } else {
            html = '<div class="pagination-prev"><a class="fa fa-angle-left"></a></div><ul class="pagination">';
            for(var i = 1; i <= params.pageCount; i++) {
                if(params.pageNo == i) {
                    html += '<li class="active"><a>' + i + '</a></li>';
                    continue;
                } else if(Math.abs(params.pageNo - i) <= params.showRange) {
                    html += '<li><a>' + i + '</a></li>';
                    continue;
                }else if(i == 1) {
                    if(params.pageNo > params.showRange + 2) {
                        html += '<li><a>' + i + '</a></li><li class="ellipsis"><a>...</a></li>';
                        continue;
                    } else {
                        html += '<li><a>' + i + '</a></li>';
                        continue;
                    }
                } else if(i == params.pageCount) {
                    if(params.pageCount - params.pageNo > params.showRange + 1) {
                        html += '<li class="ellipsis"><a>...</a></li><li><a>' + i + '</a></li>';
                        continue;
                    } else {
                        html += '<li><a>' + i + '</a></li>';
                        continue;
                    }
                }
            }
            html += '</ul><div class="pagination-next"><a class="fa fa-angle-right"></a></div>';
            $(container).attr("data-page", params.pageNo).html(html);

            if(params.pageNo == 1) {
                $(container + ">.pagination-prev").addClass("disabled");
            } else {
                $(container + ">.pagination-prev").removeClass("disabled");
            }
            if(params.pageNo == params.pageCount) {
                $(container + ">.pagination-next").addClass("disabled");
            } else {
                $(container + ">.pagination-next").removeClass("disabled");
            }

            $(container + " .pagination>li").on("click", function() {
                $(this).addClass("active").siblings().removeClass("active");
                $(container).attr("data-page", $(this).text());
            });
        }
    }
    s.update(params);
}

// 获取终端的相关信息
var Terminal = {
    // 辨别移动终端类型
    platform : function(){
        var u = navigator.userAgent, app = navigator.appVersion;
        return {
            // 是否为windows
            windows: u.indexOf('Windows NT') > -1 ,
            // 是否为mac
            mac: u.indexOf('Mac')
        };
    }(),
    // 辨别移动终端的语言：zh-cn、en-us、ko-kr、ja-jp...
    language : (navigator.browserLanguage || navigator.language).toLowerCase()
}
if(Terminal.platform.windows){
    $('html').addClass('windows').removeClass('mac');
}else if(Terminal.platform.mac){
    $('html').addClass('mac').removeClass('windows');
}else{
    $('html').removeClass('windows').removeClass('mac');
}


//自助添加广告
var addTestAdvert = {};
addTestAdvert.index = 1;
addTestAdvert.init = function() {
    var _this = this;

    var dateRange = new pickerDateRange('ad-search-date', {
        isTodayValid : false,
        startDateId : 'ad-startDate', // 开始日期输入框ID
        endDateId : 'ad-endDate', // 结束日期输入框ID
        startDate : getDateStr(-30),
        endDate : getDateStr(0),
        isTodayValid : true,
        calendars : 2, // 展示的月份数，最大是2
        defaultText : ' - ',
        inputTrigger : 'ad-search-date',
        autoSubmit : false, //没有确定，取消按钮，直接提交
        theme : 'ta'
    });

    _this.getDiySceneSelector("#scene-test-selector-box");


    _this.renderListPage(1);
    _this.bindEvent();
    _this.uploadImg();
}

addTestAdvert.getDiySceneSelector = function(dom) {
    var _this = this;
    $.ajax({
        url: BASEURL + 'scene/getScenesList',
        type: 'GET',
        dataType: 'json'
    })
    .done(function(data) {
        if(data.success) {
            if(data.result.scenes == null) {
                return;
            }
            var parents = data.result.scenes;
            var html = "";
            var reviewHtml = "";
            for(var i = 0, ilen = parents.length; i < ilen; i++) {
                var showName = parents[i].current_name ? parents[i].current_name : parents[i].initial_name;
                html += '<li class="tree-select"><div class="tree-parent"><span class="parent-name" id="' + i + '" data-chipId="' + parents[i].chip_id + '" data-name="' + parents[i].initial_name + '">' + showName + '</span></div>';

                html += '</li>';
            }

            $(dom + " .trees").html(html);
        }
        _this.bindDiySceneEvent("#scene-test-review-list");
    })
    .fail(function() {
        console.log("error");
    });

}
addTestAdvert.bindDiySceneEvent = function(dom) {
    $("#scene-test-selector-box .tree-select .tree-parent").on("click", function() {
        var id = $(this).children(".parent-name").attr("id");
        var chipId = $(this).children(".parent-name").attr("data-chipId");
        var initialName = $(this).children(".parent-name").attr("data-name");
        var pname = $(this).children(".parent-name").text();

        $(dom).html('<li data-id="' + id + '" data-chipId="' + chipId + '" data-name="' + initialName + '"><p class="parent-name">' + pname + '<span class="fa fa-close pointer fr"></span></p></li>');
    });

    $(document).on("click", dom + ">li", function(event) {
        event.stopPropagation();
        $(this).remove();
    });
}

addTestAdvert.getDiySceneData = function() {
    var result = {};
    result.diyScene = [];
    $("#scene-diy-review-list").children("li").each(function() {
        result.diyScene.push({
            chip_id: $(this).attr("data-chipid"),
            name: $(this).attr("data-chipid")
        });
    });
    return result;
}


addTestAdvert.bindEvent = function() {
    var _this = this;
    //全选
    $("#select-all").on("change", function() {
        if($(this).prop("checked")) {
            $("#test-advert-show-table").find("input[type='checkbox']").prop("checked", true);
        } else {
            $("#test-advert-show-table").find("input[type='checkbox']").prop("checked", false);
        }
    });

    //标签切换
    $('.datalist-tab').children('div').eq(0).show().siblings('div').hide();
    $('ul.mm-nav li').click(function(){
        //修复上传按钮移动端不能点击的问题
        $(".moxie-shim").css({
            width: 100,
            height: 32
        });
        var Index = $(this).index();
        $(this).addClass('active').siblings().removeClass('active');
        $('.datalist-tab').children('div').eq(Index).show().siblings('div').hide();
        if(Index == 0) {
            _this.index = 1;
            _this.renderListPage(_this.index);
        }
    });

    //查询
    $("#ad-search-btn").on("click", function() {
            _this.index = 1;
            _this.renderListPage(_this.index);
    });

    //变更广告状态
    $("#test-advert-show-table").on("click", ".play-btn", function() {
        var btn = $(this);
        var status = "";
        if(btn.attr("data-status")==0) {
            status = "暂停";
        } else {
            status = "播放";
        }
        layer.confirm("确认" + status + "此广告？", {
            btn: ['确定', '取消'] //按钮
        }, function(){
            _this.changeAdStatus(btn);
        }, function(){});
    });

    //删除广告
    $("#delete-btn").on("click", function() {
        layer.confirm("确认删除广告？", {
            btn: ['确定', '取消'] //按钮
        }, function(){
            var advertArr = [];
            $("#test-advert-show-table").find("input[type='checkbox']:checked").each(function() {
                advertArr.push(parseInt($(this).val()));
            });
            _this.deleteAdvert(advertArr);
        }, function(){});
    });

    //渠道选择
    $("input[name='way']").on("change", function() {
        if($("#way-1").prop("checked")) {
            $("#mac-0").parent().hide();
            $("#mac-1").parent().hide();
            $("#mac-2").click();
        } else {
            $("#mac-0").parent().show();
            $("#mac-1").parent().show();
        }
    });

    //文件上传/场景选择
    $("input[name='mac']").on("change", function() {
        if($("#mac-1").prop("checked")) {
            $(".mac-list-box").show();
            $("#scene-test-selector-box").removeClass("active");
            var input = document.getElementById("add-txt");

            if(typeof FileReader==='undefined'){
                layer.alert("抱歉，你的浏览器不支持读取TXT文件的功能");
                input.setAttribute('disabled','disabled');
            }else{
                input.addEventListener('change', _this.readFile, false);
            }
            $(".text-file-button").removeClass("hide");
            if($("#mac-list").val() == "") {
                $("#mac-list").hide();
            }
        } else if ($("#mac-2").prop("checked")) {
            $("#scene-test-selector-box").addClass("active");
            $(".text-file-button").addClass("hide");
            $(".mac-list-box").hide();
        } else {
            $(".text-file-button").addClass("hide");
            $("#scene-test-selector-box").removeClass("active");
            $(".mac-list-box").show();
            $("#mac-list").show();
        }
    });

    //提交新建广告
    $("#send-btn").on("click", function() {
        _this.sendInfo();
    });

    //校验mac
    $("#mac-list").on("blur input click", function() {
        var macArr = _this.getMacList($("#mac-list").val());
        $("#mac-count").text(macArr.length);
    });

    //校验名称
    $("#ad-name").on("propertychange input", function() {
        if($(this).val().length > 20) {
            $(this).val($(this).val().substring(0, 20));
        }
    });
}
addTestAdvert.deleteAdvert = function(advertArr) {
    var _this = this;
    $.ajax({
        url: BASEURL + 'api/showHowAdvertDelete',
        type: 'POST',
        dataType: 'json',
        data: {
            advert_ids: JSON.stringify(advertArr)
        }
    })
    .done(function(data) {
        console.log(data);
        if(data.success) {
            layer.msg("删除成功");
            _this.renderListPage(_this.index);
        }
    })
    .fail(function() {
        console.log("error");
    });
}
addTestAdvert.renderListPage = function(pageNo) {
    var _this = this;

    var pagi = new Pagination("#advert-list-pagination");//分页
    var perPage = 15;

    if($("#ad-startDate").val() && $("#ad-startDate").val()) {
        var postData = {
            page_index: pageNo,
            page_num: perPage,
            start_time: $("#ad-startDate").val(),//开始时间
            end_time: $("#ad-endDate").val()//结束时间
        }
    } else {
        var postData = {
            page_index: pageNo,
            page_num: perPage
        }
    }
    $(".loading-area").fadeIn();
    $.ajax({
        url: BASEURL + 'api/showHowAdvertList',
        type: 'POST',
        dataType: 'json',
        data: postData
    })
    .done(function(data) {
        //console.log(data);
        if(data.success) {
            var html = [];
            var advert = data.result.advert;
            var pageCount = Math.ceil(data.result.totalCount / perPage);
            for(var i = 0; i < advert.length; i++) {
                var title = advert[i].title == null ? "无名称" : advert[i].title;
                var click_ratio = (advert[i].click_ratio * 100).toFixed(2) + "%";
                var status = advert[i].status ? '有效<span class="play-btn fa fa-pause-circle-o" data-status="0" data-mid="' + advert[i].id + '"></span>' : '暂停<span class="play-btn fa fa-play-circle-o" data-status="1" data-mid="' + advert[i].id + '"></span>';
                html.push('<tr>');
                html.push('<td><input type="checkbox" id="test-advert-' + advert[i].id + '" class="regular-checkbox" name="test-advert-' + advert[i].id + '" value="' + advert[i].id + '"><label for="test-advert-' + advert[i].id + '"></label><label for="test-advert-' + advert[i].id + '">' + title + '</label></td>');
                html.push('<td><p class="advert-link" title="'+advert[i].message_link_url+'">' + advert[i].message_link_url + '</p></td>');
                html.push('<td>' + advert[i].exposure + '</td>');
                html.push('<td>' + advert[i].click + '</td>');
                html.push('<td>' + click_ratio + '</td>');
                html.push('<td>' + advert[i].date + '</td>');
                html.push('<td>' + status + '</td>');
                html.push('</tr>');
            }
            $("#test-advert-show-table>tbody").html(html.join(""));

            pagi.update({
                pageCount: pageCount,
                pageNo: pageNo
            });
            //分页点击
            var activePage = parseInt($("#advert-list-pagination .pagination>.active").text());
            activePage = activePage ? activePage : 1;
            _this.index = activePage;
            $(document).off("click", "#advert-list-pagination .pagination>li").on("click", "#advert-list-pagination .pagination>li", function() {
                _this.index = parseInt($(this).text()) ? parseInt($(this).text()) : 1;
                _this.renderListPage(parseInt($(this).text()));
            });
            $(document).off("click",  "#advert-list-pagination .pagination-prev").on("click", "#advert-list-pagination .pagination-prev", function() {
                if(activePage > 1) {
                    _this.index = activePage - 1;
                    _this.renderListPage(activePage - 1);
                }
            });
            $(document).off("click", "#advert-list-pagination .pagination-next").on("click", "#advert-list-pagination .pagination-next", function() {
                if(pageCount - activePage  > 0) {
                    _this.index = parseInt(activePage + 1);
                    _this.renderListPage(activePage + 1);
                }
            });

            $(".loading-area").fadeOut();
        }
    })
    .fail(function() {
        $(".loading-area").fadeOut();
        console.log("error");
    });
}
addTestAdvert.getMacList = function(str) {
    var arr = str.split("\n");
    var result = [];
    var len = arr.length>1000 ? 1000 : arr.length;  //多于1000条的过滤
    for (var i = 0; i < len; i++) {
        if (new RegExp(/^([0-9a-fA-F]{12})$/).test(arr[i])) {
            result.push(arr[i].toLowerCase());
        } else if (new RegExp(/^([0-9a-fA-F]{2})(([:][0-9a-fA-F]{2}){5})$/).test(arr[i])) {
            result.push(arr[i].replace(new RegExp(/:/g), '').toLowerCase());
        }
    }
    return result;
}
addTestAdvert.getUrl = function(str) {
    var result = "";
    var httpReg = new RegExp(/^https?:\/\//);
    if(httpReg.test(str)) {
        result = str;
    } else {
        result = "http://" + str;
    }
    return result;
}
addTestAdvert.sendInfo = function() {
    var _this = this;
    var message_title = $("#ad-name").val();
    var message_cover = $("#image-qiniu-url").val();
    var message_url = _this.getUrl($("#ad-url").val());
    var message_mac = _this.getMacList($("#mac-list").val());
    var chip_id = $("#scene-test-review-list>li").eq(0).attr("data-chipId");
    var scene_name = $("#scene-test-review-list>li").eq(0).attr("data-name");
    var message_channel = $("input[name='way']:checked").val();
    if(message_channel == 0) {
        if(message_title == "") {
            layer.alert("请输入广告名称");
            return;
        }
        if(message_cover == "") {
            layer.alert("请上传图片");
            return;
        }
        if(message_url == "" || message_url == "http://") {
            layer.alert("请输入链接");
            return;
        }
        if(!$("#mac-2").prop("checked") && message_mac.length <= 0) {
            layer.alert("请输入有效的MAC地址");
            return;
        }
        if($("#mac-2").prop("checked") && $("#scene-test-review-list>li").length == 0) {
            layer.alert("请选择场景");
            return;
        }
    } else if (message_channel == 1) {
        if(message_title == "") {
            layer.alert("请输入广告名称");
            return;
        }
        if(message_cover == "") {
            layer.alert("请上传图片");
            return;
        }
        if(message_url == "" || message_url == "http://") {
            layer.alert("请输入链接");
            return;
        }
        if($("#mac-2").prop("checked") && $("#scene-test-review-list>li").length == 0) {
            layer.alert("请选择场景");
            return;
        }
    }
    $(".loading-area").fadeIn();
    $.ajax({
        url: BASEURL + 'api/addShowAdvert',
        type: 'POST',
        dataType: 'json',
        data: {
            message_title: message_title,
            message_cover: message_cover,
            message_url: message_url,
            message_mac: message_mac,
            chip_id: chip_id,
            scene_name: scene_name,
            message_channel: message_channel
        }
    })
    .done(function(data) {
        if(data.success) {
            layer.alert("发布成功，请点击确定查看效果", function() {
                window.location = BASEURL + "agentTestAdvert";
            });
        } else {
            layer.alert("发布失败");
        }
        $(".loading-area").fadeOut();
    })
    .fail(function() {
        layer.alert("发布失败");
        $(".loading-area").fadeOut();
        console.log("error");
    });
}
addTestAdvert.readFile = function() {
    var file = this.files[0];
    var reader = new FileReader();
    reader.readAsText(file, "UTF-8");
    reader.onload = function(e){
        $("#mac-list").show();
        $("#mac-list").val(this.result);
        $("#mac-list").click();
    }
}
addTestAdvert.changeAdStatus = function(jqDom) {
    $.ajax({
        url: BASEURL + 'api/showHowAdvertChangeStatus',
        type: 'POST',
        data: {
            advert_id: parseInt(jqDom.attr("data-mid")),
            status_id: parseInt(jqDom.attr("data-status"))
        },
        dataType: 'json'
    })
    .done(function(data) {
        if(data.success) {
            layer.msg("操作成功！");
            if(jqDom.attr("data-status") == 1) {
                jqDom.parent().html("有效<span class='play-btn fa fa-pause-circle-o' data-status='0' data-mid='" + jqDom.attr("data-mid") + "'></span>");
            } else {
                jqDom.parent().html("暂停<span class='play-btn fa fa-play-circle-o' data-status='1' data-mid='" + jqDom.attr("data-mid") + "'></span>");
            }
        } else {
            layer.msg("操作失败！"+data.errMsg);
        }
    })
    .fail(function() {
        layer.msg("操作失败！");
        console.log("error");
    });
}
addTestAdvert.uploadImg = function() {
    var domain = 'http://share.soundtooth.cn/';
    var isHover = false;
    var uploadStatus = '';

    var showUploadInfos = function(up, file) {
        if (!isHover) {
            $('#uploading-kidd').text(file.percent + '%');
        }
    };

    var uploader = Qiniu.uploader({
        runtimes: 'html5,html4',
        browse_button: 'ad-img',
        //container: 'img-box',
        // drop_element: 'container',
        max_file_size: '100kb',
        // flash_swf_url: 'js/plupload/Moxie.swf',
        // dragdrop: true,
        multi_selection: false,
        chunk_size: '4mb',
        uptoken_url: BASEURL + "admin/api/getUploadToken",
        domain: domain,
        unique_names: true,
        get_new_uptoken: true,
        auto_start: true,
        filters : {
            max_file_size : '100kb',
            prevent_duplicates: false,
            // Specify what files to browse for
            mime_types: [
                {title : "Image files", extensions : "jpg,gif,png"}, // 限定jpg,gif,png后缀上传
            ]
        },
        init: {
            'FilesAdded': function(up, files) {
                var _up = up;
                plupload.each(files, function(file) {
                    isHover = false;
                    // 文件添加进队列后,处理相关的事情
                    var _file = file;
                    var $btn = $('#uploaded-status');
                    var $status = $('#uploading-kidd');

                    /**
                     * unillegal files
                     */
                    uploadStatus = 'uploading';

                    $btn.hide();
                    $status.text('上传中')
                            .css('display', 'inline-block');

                    var currentText = '';
                    $status.hover(function () {
                        currentText = $(this).text();
                        isHover = true;
                        $(this).text('取消')
                                .click(function () {
                                    _up.removeFile(_file);
                                    $(this).unbind('mouseenter')
                                            .unbind('mouseleave')
                                            .unbind('click');
                                    $status.hide();
                                    $btn.text('选择文件').show();
                                });
                    }, function () {
                        isHover = false;
                        $(this).text(currentText)
                                .unbind('click');
                    });
                });
            },
            'BeforeUpload': function(up, file) {},
            'UploadProgress': function(up, file) {
                showUploadInfos(up, file);
            },
            'UploadComplete': function() {},
            'FileUploaded': function(up, file, info) {
                "use strict";
                uploadStatus = 'uploaded';
                var infoObj = JSON.parse(info);
                var url = domain + infoObj.key;
                var $status = $('#uploading-kidd');
                $status.unbind('click')
                        .unbind('mouseenter')
                        .unbind('mouseleave')
                        .text('上传成功：'+url)
                        .css('cursor', 'auto');
                var $btn = $("#ad-img");
                //$btn.prop("disabled", true);
                //$btn.siblings(".file-button").addClass("disabled");
                //$('#hImg').val(domain + infoObj.key);
                $('#image-qiniu-url').val(url);
            },
            'Error': function(up, err, errTip) {
                uploadStatus = 'error';
                var $btn = $('#uploaded-status');
                var $status = $('#uploading-kidd');

                $status.unbind('mouseenter')
                        .unbind('mouseleave')
                        .unbind('click')
                        .hide();
                if(err.code == -600) {
                    $btn.text('图片不能超过100kb，请重新上传').show();
                } else {
                    $btn.text('请重新上传').show();
                }
            }
        }
    });

    function checkImgPx(width, height) {
        var sizeArr = ["800*120", "600*500", "640*270", "960*640", "600*300", "480*800", "640*960", "720*1280", "768*1024", "728*90", "468*60", "600*500", "1024*768", "1280*800", "1366*768","1242*2208","1080*1920","1536*2048","95*68","1280*720"];
        var imgSize = width + "*" + height;
        if($.inArray(imgSize, sizeArr) < 0) {
            return false;
        } else {
            return true;
        }
    }
}

//场景列表
scenesList = {};
scenesList.init = function() {
    _this = this;
    _this.getStatistics();
    _this.renderListPage(1);
    _this.bindEvent();
    $('#perfect-information-module .withdraw-shadow').on("click", function() {
        $("#perfect-information-module .withdraw-shadow").fadeOut();
        $("#perfect-information-module .perfect-information-box").fadeOut();
    });
};
//获取所有客户和自己帐号的广告统计信息
scenesList.getStatistics = function(){
    var account_type = $("#account-type").val();
    $(".loading-area").fadeIn();
    $.ajax({
        url: BASEURL + 'scene/getScenesCount',
        type: 'POST',
        dataType: 'json',
        data: {
            user_id: ACCOUNT,
        }
    })
    .done(function(data) {
        console.log(data);
        if(data.success) {
            if(account_type == "agent" && data.result.sub_data != null){
                //客户的
                var child_sum_count = data.result.sub_data.sum_count == null ? 0 : data.result.sub_data.sum_count;//场景总数
                var child_undone_count = data.result.sub_data.undone_count == null ? 0 : data.result.sub_data.undone_count;//未完善场景数
                var child_valid_count = data.result.sub_data.valid_count == null ? 0 : data.result.sub_data.valid_count;//已完善场景数
                var child_stype_count = data.result.sub_data.stype_count == null ? 0 : data.result.sub_data.stype_count;//已完善场景类型数量
                $("#child-scenes-total").text(child_sum_count);
                $("#child-not-complete").text(child_undone_count);
                $("#child-complete").text(child_valid_count);
                $("#child-complete-type").text(child_stype_count);
                //客户总数量
                var child_totalCount = data.result.sub_count == null ? 0 : data.result.sub_count;
                $("#child-totalCount").text(child_totalCount);
            }
            if(account_type == "agent" && data.result.sub_data == null){
                $("#child-scenes-total").text("0");
                $("#child-not-complete").text("0");
                $("#child-complete").text("0");
                $("#child-complete-type").text("0");
                $("#child-totalCount").text("0");
            }
            //代理商自己的
            var self_sum_count = data.result.self_data == null ? 0 : data.result.self_data.sum_count;//场景总数
            var self_undone_count = data.result.self_data == null ? 0 : data.result.self_data.undone_count;//未完善场景数
            var self_valid_count = data.result.self_data == null ? 0 : data.result.self_data.valid_count;//已完善场景数
            var self_stype_count = data.result.self_data == null ? 0 : data.result.self_data.stype_count;//已完善场景类型数量
            $("#self-scenes-total").text(self_sum_count);
            $("#self-not-complete").text(self_undone_count);
            $("#self-complete").text(self_valid_count);
            $("#self-complete-type").text(self_stype_count);
        }
        $(".loading-area").fadeOut();
    })
    .fail(function(data) {
        if(account_type == "agent"){
            $("#child-scenes-total").text("0");
            $("#child-not-complete").text("0");
            $("#child-complete").text("0");
            $("#child-complete-type").text("0");
            $("#child-totalCount").text("0");
        }
        $("#self-scenes-total").text("0");
        $("#self-not-complete").text("0");
        $("#self-complete").text("0");
        $("#self-complete-type").text("0");
        console.log("error");
        $(".loading-area").fadeOut();
    });
}
scenesList.bindEvent = function() {
    _this = this;
    $("#scenes-list-table").on("click", ".scene-detail", function() {
        var chip_id = $(this).attr("data-chipId");
        var chip_No = $(this).attr("data-chipNo");
        var init_name = encodeURIComponent($(this).attr("data-id")).replace(/%2f/ig,"%252F");
        var current_name = encodeURIComponent($(this).attr("data-name"));
        var show_name = encodeURIComponent($(this).attr("data-name")).replace(/%2f/ig,"%252F");
        if($(this).attr("data-status") == "0") {
            $("#scene-name").text(decodeURIComponent(current_name));
            $("#perfect-information-module .withdraw-shadow").fadeIn();
            $("#perfect-information-module .perfect-information-box").fadeIn();
            $('#see-data').off("click").on("click", function() {
                window.location.href = BASEURL + 'passengerFlow/chipId/' + chip_id + '/chipNo/' + chip_No + '/sceneName/' + init_name + '/showName/' + show_name;
            });

            $('#perfect-information').off("click").on("click", function() {
                window.location.href = BASEURL + 'vtScene/sceneStatus/0/chipId/' + chip_id + '/chipNo/' + chip_No + '/sceneName/' + init_name;
            });
        } else {
            window.location.href = BASEURL + 'passengerFlow/chipId/' + chip_id + '/chipNo/' + chip_No + '/sceneName/' + init_name + '/showName/' + show_name;
        }
    });
    //删除场景
    $("#scenes-list-table").on("click", ".scene-delete", function() {
        var chip_id = $(this).attr("data-chipId");
        var chip_no = $(this).attr("data-chipNo");
        var init_name = $(this).attr("data-id");
        var scenes_target = [{
            chip_id: chip_id,
            chip_no: chip_no,
            chip_initialname: init_name
        }];
        layer.confirm("确认删除场景？", {
            btn: ['确定', '取消'] //按钮
        }, function(){
            _this.delScenes(JSON.stringify(scenes_target));
        }, function(){});
    });

    //编辑场景
    $("#scenes-list-table").on("click", ".scene-edit", function() {
        var chip_id = $(this).attr("data-chipId");
        var chip_No = $(this).attr("data-chipNo");
        var init_name = encodeURIComponent($(this).attr("data-id")).replace(/%2f/ig,"%252F");
        var current_name = encodeURIComponent($(this).attr("data-name"));
        var status = $(this).attr("data-status");
        window.location.href = BASEURL + 'vtScene/sceneStatus/1/chipId/' + chip_id + '/chipNo/' + chip_No + '/sceneName/' + init_name;
    });

    $(".search-input>.fa-search").on("click", function() {
        _this.renderListPage(1);
    });
    $("#scenes-status-select").find(".dropdown-menu").children("li").on("click", function() {
        $("#scenes-status-select").attr("data-status", $(this).attr("data-status"));
        _this.renderListPage(1);
    });
}
//删除场景异步请求
scenesList.delScenes = function(scenes_target) {
    $(".loading-area").fadeIn();
        $.ajax({
            url: BASEURL + 'scene/delScenes',
            type: 'POST',
            dataType: 'json',
            data: {
                scenes_target: scenes_target
            }
        })
        .done(function(data) {
            if(data.success) {
                layer.alert("删除成功！", function() {
                    window.location.href = BASEURL + 'scenesList';
                });
            } else {
                layer.alert("删除失败！");
            }
            $(".loading-area").fadeOut();
        })
        .fail(function(data) {
            layer.alert("删除失败！");
            $(".loading-area").fadeOut();
            console.log("error");
        });
}
scenesList.renderListPage = function(pageNo) {
    var _this = this;

    var pagi = new Pagination("#advert-list-pagination");//分页
    var perPage = 15;

    $(".loading-area").fadeIn();
    $.ajax({
        url: BASEURL + 'scene/getScenesList',
        type: 'POST',
        dataType: 'json',
        data: {
            user_id: ACCOUNT,
            chip_code: "",
            index: pageNo,
            num: perPage,
            key_name: $("#key-scene-name").val(),
            sta_done: $("#scenes-status-select").attr("data-status")
        }
    })
    .done(function(data) {
        console.log(data);
        if(data.success) {
            var html = [];
            var scenes = data.result.scenes;
            if(scenes != null){
                $("#scene-no-data").hide();
                $("#scene-page-show").show();
                var pageCount = Math.ceil(data.result.total / perPage);
                for(var i = 0; i < scenes.length; i++) {
                    if(scenes[i].is_complete == 0) {
                        var status = 0;
                        var statusText = "未完善";
                    } else {
                        var status = 1;
                        var statusText = "已完善";
                    }
                    html.push('<tr>');
                    html.push('<td>' + (scenes[i].current_name ? scenes[i].current_name : scenes[i].initial_name) + '</td>');
                    html.push('<td>' + (scenes[i].chip_no == undefined ? scenes[i].chip_no : scenes[i].chip_no) + '</td>');
                    html.push('<td>' + statusText + '</td>');
                    /*html.push('<td>' + (scenes[i].boxType==1?"无线":"有线") + '</td>');*/
                    html.push('<td>' + scenes[i].user + '</td>');
                    html.push('<td>' + (scenes[i].scenes_name == undefined ? '—— ——' : scenes[i].scenes_name) + '</td>');
                    html.push('<td><span class="ad-icon addr-tips tipso_style" data-tipso="' + (scenes[i].addr == undefined ? "信息未完善" : scenes[i].addr) + (scenes[i].city == undefined ? "" : scenes[i].city) + '"></span>' + (scenes[i].city == undefined ? "—— ——" : scenes[i].city) + '</td>');
                    html.push('<td>' + scenes[i].scanNum + '</td>');
                    if(ACCOUNT == ""){
                        html.push('<td>');
                        html.push('<a class="scene-detail" data-id="'+ scenes[i].initial_name +'" data-name="'+ (statusText == "未完善" ? scenes[i].initial_name : scenes[i].current_name) +'" data-chipId="'+ scenes[i].chip_id +'" data-chipNo="'+ scenes[i].chip_no +'" data-status="'+ status +'"><span class="fa fa-eye"></span></a>');
                        html.push('<a class="scene-edit" data-id="'+ scenes[i].initial_name +'" data-name="'+ (statusText == "未完善" ? scenes[i].initial_name : scenes[i].current_name) +'" data-chipId="'+ scenes[i].chip_id +'" data-chipNo="'+ scenes[i].chip_no +'" data-status="'+ status +'"><span class="fa fa-pencil"></span></a>');
                        html.push('<a class="scene-delete" data-id="'+ scenes[i].initial_name +'" data-name="'+ (statusText == "未完善" ? scenes[i].initial_name : scenes[i].current_name) +'" data-chipId="'+ scenes[i].chip_id +'" data-chipNo="'+ scenes[i].chip_no +'" data-status="'+ status +'"><span class="fa fa-trash"></span></a>'); //暂不上线
                        html.push('</td>');
                    }else{
                        html.push('<td>—— ——</td>');
                    }
                    html.push('</tr>');
                }
                $("#scenes-list-table>tbody").html(html.join(""));

                pagi.update({
                    pageCount: pageCount,
                    pageNo: pageNo
                });
                //分页点击
                var activePage = parseInt($("#advert-list-pagination .pagination>.active").text());
                activePage = activePage ? activePage : 1;
                _this.index = activePage;
                $(document).off("click", "#advert-list-pagination .pagination>li").on("click", "#advert-list-pagination .pagination>li", function() {
                    _this.index = parseInt($(this).text());
                    _this.renderListPage(parseInt($(this).text()));
                });
                $(document).off("click",  "#advert-list-pagination .pagination-prev").on("click", "#advert-list-pagination .pagination-prev", function() {
                    if(activePage > 1) {
                        _this.index = activePage - 1;
                        _this.renderListPage(activePage - 1);
                    }
                });
                $(document).off("click", "#advert-list-pagination .pagination-next").on("click", "#advert-list-pagination .pagination-next", function() {
                    if(pageCount - activePage  > 0) {
                        _this.index = parseInt(activePage + 1);
                        _this.renderListPage(activePage + 1);
                    }
                });
                $('#scenes-list-table .addr-tips').tipso({
                    useTitle: false,
                    width: 'auto',
                    position: 'bottom',
                    background: '#626262'
                });
            }else{
                $("#scenes-list-table>tbody").html("");
                $("#scene-no-data").show();
                $("#scene-page-show").hide();
            }
        }else {
            $("#scenes-list-table>tbody").html("");
            $("#scene-no-data").show();
            $("#scene-page-show").hide();
        }
        $(".loading-area").fadeOut();
    })
    .fail(function(data) {
        $(".loading-area").fadeOut();
        console.log("error");
    });
}


/*
 *new_index
 */
var passenger = {};
passenger.init = function() {
    BASEURL = BASEURL || "";
    var _this = this;
    var first = true;

    var dateRange = new pickerDateRange('ad-search-date', {
        isTodayValid : false,
        startDateId : 'scene-startDate', // 开始日期输入框ID
        endDateId : 'scene-endDate', // 结束日期输入框ID
        startDate : getDateStr(-30),
        endDate : getDateStr(-1),
        isTodayValid : false,
        calendars : 2, // 展示的月份数，最大是2
        defaultText : ' - ',
        inputTrigger : 'ad-search-date',
        autoSubmit : false, //没有确定，取消按钮，直接提交
        theme : 'ta'
    });


    this.renderPageData();
    $("#search-btn").on("click", function() {
        _this.renderPageData();
    });
    $(".pre-date-box").on("click", ".pre-date", function() {
        $(".pre-date").removeClass("active");
        $(this).addClass("active");
        _this.renderPageData();
    });

    $('.fa-question-circle').tipso({
        useTitle: false,
        width: 'auto',
        position: 'bottom',
        background: '#626262'
    });
    //this.initPieCharts();
}

passenger.getLabelOption = function(chartData) {
    var _this = this;
    var titleText = chartData.name;
    var legendData = [];
    var seriesName = chartData.name;
    var seriesData = chartData.data;
    for (var i = 0; i < chartData.length; i++) {
        legendData.push(chartData.data[i].name);
    }
    //console.log(seriesData);
    var option = {
        color: ['#679aff', '#ff4040', '#cc99ff', '#43ca83', '#ffcaf2',"#fff0ac","#acf4ff"],
        title : {
            text: titleText,
            //subtext: '测试数据',
            x:'center'
        },
        tooltip : {
            trigger: 'item',
            formatter: "{a} <br/>{b} : ({d}%)"
        },
        legend: {
            bottom: 'bottom',
            left: 'left',
            data: legendData
        },
        series : [
            {
                name: seriesName,
                type: 'pie',
                radius : '55%',
                center: ['50%', '50%'],
                data: seriesData,
                itemStyle: {
                    emphasis: {
                        shadowBlur: 10,
                        shadowOffsetX: 0,
                        shadowColor: 'rgba(0, 0, 0, 0.5)'
                    }
                }
            }
        ]
    };
    return option;
}
passenger.getPeriodOption = function(outData, inData, tag) {
    //时间轴
    var xAxisData = [];
    if(tag == "day") {
        for (var i = 0; i <= 24; i+=2) {
            xAxisData.push(i+"-"+(i+2));
        }
    } else {
        var now = new Date();
        for (var i = outData.length; i > 0; i--) {
            var date = new Date(now.getTime() - i * 24 * 3600 * 1000);
            xAxisData.push(date.getDate());
        }
    }
    var option = {
        color: ['#679aff', '#ff4040', '#cc99ff', '#43ca83', '#ffcaf2',"#fff0ac","#acf4ff"],
        title: {
            text: '客流分析',
            x:'center'
        },
        tooltip: {
            trigger: 'axis'
        },
        legend: {
            bottom: 'bottom',
            left: 'left',
            data:['店外人数','店内人数']
        },
        grid: {
            left: '3%',
            right: '4%',
            bottom: '10%',
            containLabel: true
        },
        xAxis: {
            type: 'category',
            //boundaryGap: false,
            data: xAxisData
        },
        yAxis: {
            type: 'value'
        },
        series: [
            {
                name:'店外人数',
                type:'line',
                data: outData
            },
            {
                name:'店内人数',
                type:'line',
                data: inData
            }
        ]
    };
    return option;
}
passenger.newGetLabelOption = function(chartData) {
    var _this = this;
    var option = {
        color: ['#679aff', '#ff4040', '#cc99ff', '#43ca83', '#ffcaf2',"#fff0ac","#acf4ff"],
        title : {
            text: chartData.titleText,
            //subtext: '测试数据',
            x:'center'
        },
        tooltip : {
            trigger: 'item',
            formatter: "{a} <br/>{b} : ({d}%)"
        },
        legend: {
            bottom: 'bottom',
            left: 'left',
            data: chartData.legendData
        },
        series : [
            {
                name: chartData.seriesName,
                type: 'pie',
                radius : '55%',
                center: ['50%', '50%'],
                data: chartData.seriesData,
                itemStyle: {
                    emphasis: {
                        shadowBlur: 10,
                        shadowOffsetX: 0,
                        shadowColor: 'rgba(0, 0, 0, 0.5)'
                    }
                }
            }
        ]
    };
    return option;
}
passenger.newGetDistributeOption = function(chartData) {
    var _this = this;
    var option = {
        color: ['#679aff'],
        title: {
            text: "顾客来源",
            //subtext: '数据来自网络'
        },
        tooltip: {
            trigger: 'axis',
            axisPointer: {
                type: 'shadow'
            }
        },
        legend: {
            data: ['顾客来源']
        },
        grid: {
            left: '3%',
            right: '4%',
            bottom: '3%',
            containLabel: true
        },
        xAxis: {
            type: 'value',
            boundaryGap: [0, 0.01]
        },
        yAxis: {
            type: 'category',
            data: chartData.yAxisData
        },
        series: [
            {
                name: '顾客来源',
                type: 'bar',
                data: chartData.seriesData
            }
        ]
    };
    return option;
}

passenger.renderChart = function(domId, option) {
    // alert(domId);
    var myChart = echarts.init(document.getElementById(domId));
    myChart.setOption(option);
    return myChart;
}

passenger.getVirtualLabel = function(inCount) {
    var _this = this;
    var chipId = $("#chip-id").val();//芯片id
    var chipNo = $("#chip-no").val();//芯片码
    var sceneName = $("#scene-name").val();//场景名称
    var showName = $("#show-name").val();//场景名称

    $.ajax({
        url: BASEURL + 'mcli/getVirtualLabel',
        type: 'POST',
        data: {
            chip_id: chipId,
            inner_count: inCount,
            date_start: $("#scene-startDate").val(),
            date_end: $("#scene-endDate").val()
        },
        dataType: 'json'
    })
    .done(function(data) {
        if(data.success) {
            $(".chart-list").show();
            $(".no-data").hide();
            $(".chart-list").empty();
            for(var i = 0, len = data.result.length; i < len; i++) {
                if(data.result[i].data != undefined && data.result[i] != 0 && data.result[i].data != null) {
                    var options = _this.getLabelOption(data.result[i]);
                    $(".chart-list").append('<li class="chart-box" id="chart-' + i + '"></li>');
                    _this.renderChart("chart-" + i, options);
                }
            }
        }
    })
    .fail(function() {
        $(".chart-list").hide();
        $(".no-data").show();
    });
}
passenger.renderNewLabelChart = function() {
    var _this = this;
    var chip_id = $.getUrlParam('chip_id');
    $("#chip-id").val(chip_id);
    var chip_no = $.getUrlParam('chip_no');
    $("#chip-no").val(chip_no);
    var scene_name = $.getUrlParam('scene_name');
    $("#scene-name").val(scene_name);
    var show_name = $.getUrlParam('show_name');
    $("#show-name").val(show_name);
    var startDate = $("#scene-startDate").val().replace(/-/g,"/");
    var endDate = $("#scene-endDate").val().replace(/-/g,"/");
    var chipNo = $("#chip-no").val();//芯片码
    var sceneName = $("#scene-name").val();//场景名称
    var shopId = $("#shop-id").val();//shop id

    $(".loading-area").fadeIn();

    $.ajax({
        url: '/background/apply/getUserProperty.do',
        type: 'POST',
        data: {
            chip_no: chipNo,
            scene_name: sceneName,
            shop_id: shopId,
            time_start: startDate,
            time_end: endDate
        },
        dataType: 'json'
    })
    .done(function(data) {
        if(data.success) {
            var chipArr = ["e4:95:6e:4d:51:7a","e4:95:6e:4d:50:41"];
            if($.inArray(chipNo, chipArr) >= 0) {
                data.result.dataSet['客流'][0].items = [{label: "女", value: 45.50}, {label: "男", value: 54.50}]
            }
            var result = _this.labelDataAdapter(data.result);
            for (var i = 0; i < result.length; i++) {
                $(".chart-list").append('<div class="section"><div id="chart-'+i+'" style="width: 100%;height:400px;"></div></div>');
                var option = _this.newGetLabelOption(result[i]);
                var chart = _this.renderChart('chart-'+i, option);
            }
            //$("#tab-" + index).append('<div class="section"><p>更多标签维度请联系客服...</p></div>');
            $(".loading-area").fadeOut();
        } else {
            //出现错误重置数据
            console.log("return false");
        }
        $(".loading-area").fadeOut();
        _this.renderNewDistributeChart();
    })
    .fail(function() {
        $(".loading-area").fadeOut();
        //出现错误重置数据
        console.log("error");
    });
}

passenger.renderNewKeywordList = function() {
    var _this = this;

    //百度标签id数据
    var queryTypeData = {
        "2000": {
            "label": "医疗",
            "sub": {
                "1001": "疾病知识",
                "1002": "药品器械",
                "1003": "保健养生美容",
                "1004": "医院类",
                "1005": "医疗其他"
            }
        },
        "2001": {
            "label": "影视动漫",
            "sub": {
                "101": "电视剧",
                "102": "电影",
                "103": "综艺",
                "104": "动漫"
            }
        },
        "2002": {
            "label": "影音其他",
            "sub": {
                "1101": "影视动漫综合",
                "1102": "网络短视频",
                "1103": "电视台",
                "1104": "广播电台"
            }
        },
        "2003": {
            "label": "新闻和体育",
            "sub": {
                "1201": "新闻",
                "1202": "体育"
            }
        },
        "2004": {
            "label": "生活和情感问答",
            "sub": {
                "1301": "生活常识",
                "1302": "情感问答"
            }
        },
        "2005": {
        "label": "金融",
            "sub": {
                "1401": "金融服务综合",
                "1402": "投资理财",
                "1403": "融资贷款"
            }
        },
        "2006": {
            "label": "网购寻址",
            "sub": {
                "1501": "网购寻址"
            }
        },
        "2007": {
            "label": "社交网络平台",
            "sub": {
                "1601": "即时通讯",
                "1602": "社区或问答平台",
                "1603": "SNS"
            }
        },
        "2008": {
            "label": "音乐",
            "sub": {
                "1701": "歌曲",
                "1702": "音乐泛需求",
                "1703": "歌词曲谱"
            }
        },
        "2009": {
            "label": "机动车",
            "sub": {
                "1801": "汽车",
                "1802": "摩托车"
            }
        },
        "2010": {
            "label": "生产制造",
            "sub": {
                "1901": "机械设备",
                "1902": "农林牧渔",
                "1903": "其他生产制造"
            }
        },
        "2011": {
            "label": "政策法规",
            "sub": {
                "2001": "政策法规"
            }
        },
        "2012": {
            "label": "生活服务",
            "sub": {
                "201": "生活信息或商圈商户",
                "202": "位置查询",
                "203": "房产家居",
                "204": "饮食菜谱",
                "205": "博彩",
                "206": "车辆物流",
                "207": "团购",
                "208": "时尚",
                "209": "招聘"
            }
        },
        "2013": {
            "label": "综合门户",
            "sub": {
                "2101": "门户网站",
                "2102": "政务网站"
            }
        },
        "2014": {
            "label": "历史军事",
            "sub": {
                "2201": "历史军事"
            }
        },
        "2015": {
            "label": "母婴",
            "sub": {
                "2301": "母婴购物",
                "2302": "母婴医疗",
                "2303": "母婴育儿"
            }
        },
        "2016": {
            "label": "招商加盟",
            "sub": {
                "2401": "招商加盟"
            }
        },
        "2017": {
            "label": "成人色情",
            "sub": {
                "2501": "成人色情"
            }
        },
        "2018": {
            "label": "旅游",
            "sub": {
                "2601": "火车",
                "2602": "汽车票",
                "2603": "机票",
                "2604": "景点和票务",
                "2605": "酒店",
                "2606": "路线方案",
                "2607": "旅游其他",
                "2608": "本地出行"
            }
        },
        "2019": {
            "label": "工具服务及在线查询",
            "sub": {
                "301": "软件下载",
                "302": "实用查询",
                "303": "运营商服务",
                "304": "邮箱",
                "305": "快递",
                "306": "天气",
                "307": "星座算命",
                "308": "管理安全",
                "309": "应用中心",
                "310": "翻译工具",
                "311": "搜索服务",
                "312": "主题桌面优化",
                "313": "云存储",
                "314": "浏览器",
                "315": "网址导航",
                "316": "其他工具服务及在线查询"
            }
        },
        "2020": {
            "label": "教育培训",
            "sub": {
                "401": "K12",
                "402": "高等教育",
                "403": "外语和留学",
                "404": "职业培训&资格考试",
                "405": "教育综合",
                "406": "兴趣爱好",
                "407": "学前教育"
            }
        },
        "2021": {
            "label": "人物",
            "sub": {
                "501": "娱乐人物",
                "502": "领域内知名人物","503": "普通人名",
                "504": "虚拟人物",
                "505": "人物泛需求"
            }
        },
        "2022": {
            "label": "游戏",
            "sub": {
                "601": "网络游戏-端游",
                "602": "单机游戏",
                "603": "移动端游戏",
                "604": "网络游戏-页游",
                "605": "游戏平台",
                "606": "小游戏",
                "607": "游戏其他"
            }
        },
        "2023": {
            "label": "书籍文档",
            "sub": {
                "701": "文档资料",
                "702": "小说",
                "703": "漫画",
                "704": "图书",
                "705": "报刊杂志"
            }
        },
        "2024": {
            "label": "信息技术",
            "sub": {
                "801": "信息技术"
            }
        },
        "2025": {
            "label": "网络购物",
            "sub": {
                "901": "3C",
                "902": "食品饮料",
                "903": "化妆品",
                "904": "家居生活",
                "905": "眼镜服装配饰",
                "906": "珠宝饰品",
                "907": "鞋靴箱包",
                "908": "玩具文化用品",
                "909": "运动户外",
                "910": "虚拟商品",
                "911": "家装建材",
                "912": "网络购物其他"
            }
        }
    }

    $(".chart-list").append('<div id="keyword_box" class="keyword_box"></div>');
    var html = [];
    var showKeys = ["2000", "2003", "2005", "2009", "2012", "2018", "2020", "2025"];
    html.push('<p class="query_tab_hd">搜索关键词排名</p>');
    html.push('<ul class="query_tab_box">');
    for (var i = 0; i < showKeys.length; i++) {
        html.push('<li class="query_tab" data-key="'+showKeys[i]+'">'+queryTypeData[showKeys[i]].label+'</li>');
    }
    html.push('</ul>');
    html.push('<div class="query_keyword_con"></div>');

    $("#keyword_box").html(html.join(""));
    $(".query_tab").on("click", function() {
        $(".query_tab").removeClass("active");
        $(this).addClass("active");
        _this.getKeywordData($(this).attr("data-key"));
    });
}

passenger.getKeywordData = function(query_type) {
    var _this = this;
    var startDate = $("#scene-startDate").val().replace(/-/g,"/");
    var endDate = $("#scene-endDate").val().replace(/-/g,"/");
    var chipNo = $("#chip-no").val();//芯片码
    var sceneName = $("#scene-name").val();//场景名称
    var shopId = $("#shop-id").val();//shop id

    $(".loading-area").fadeIn();

    $.ajax({
        url: "/background/apply/getKeyword.do",
        type: 'POST',
        data: {
            chip_no: chipNo,
            scene_name: sceneName,
            shop_id: shopId,
            time_start: startDate,
            time_end: endDate,
            query_type: query_type
        },
        dataType: 'json'
    })
    .done(function(data) {
        console.log(data);
        if(data.success) {
            console.log(data);
            var dataSet = data.result.dataSet;
            var html = [];
            for (var i = 0; i < dataSet.length; i++) {
                html.push('<div class="query_keyword_sub"><p class="keyword_sub_title">'+dataSet[i].label+'</p><table><thead><tr><td style="width: 50px;">排名</td><td style="width: 290px;">关键词</td><td style="width: 56px;">搜索热度</td><td style="width: 56px;">搜索趋势</td></tr></thead><tbody>');
                var dataSetLength = dataSet[i].items.length > 10 ? 10 : dataSet[i].items.length;
                for (var j = 0; j < dataSetLength; j++) {
                    html.push('<tr>');
                    html.push('<td><div><span class="keyword_index keyword_index_'+(j+1)+'">'+(j+1)+'</span></div></td>');
                    html.push('<td><div>'+dataSet[i].items[j].word+'</div></td>');
                    html.push('<td><div>'+dataSet[i].items[j].index+'</div></td>');
                    html.push('<td><div>'+(dataSet[i].items[j].trend>0?"上升":"下降")+'</div></td>');
                    html.push('</tr>');
                }

                html.push('</tbody></table></div>')
            }
            // console.log(html);
            $(".query_keyword_con").html(html.join(""));
            $(".loading-area").fadeOut();
        } else {
            //出现错误重置数据
            console.log("return false");
        }
        $(".loading-area").fadeOut();
    })
    .fail(function() {
        $(".loading-area").fadeOut();
        //出现错误重置数据
        console.log("error");
    });
}

passenger.renderNewDistributeChart = function() {
    var _this = this;
    var startDate = $("#scene-startDate").val().replace(/-/g,"/");
    var endDate = $("#scene-endDate").val().replace(/-/g,"/");
    var chipNo = $("#chip-no").val();//芯片码
    var sceneName = $("#scene-name").val();//场景名称
    var shopId = $("#shop-id").val();//shop id

    $(".loading-area").fadeIn();

    $.ajax({
        url: '/background/apply/cliProperty.do',
        type: 'POST',
        data: {
            chip_no: chipNo,
            scene_name: sceneName,
            shop_id: shopId,
            time_start: startDate,
            time_end: endDate
        },
        dataType: 'json'
    })
    .done(function(data) {
        if(data.success) {
            //cheat
            var chipArr = ["e4:95:6e:4d:51:7a","e4:95:6e:4d:50:41"];
            if($.inArray(chipNo, chipArr) >= 0) {
                data.result.topPoiList.unshift({label: "重汽翡翠清河", value: "72.63"}, {label: "幸福苑", value: "13.57"}, {label: "汇源华庭小区", value: "6.31"}, {label: "宋刘村", value: "5.24"}, {label: "其他", value: "2.25"});
                var tempDataSet = data.result.dataSet;
                var newDataSet = [];
                for (var i = 0; i < tempDataSet.length; i++) {
                    var dataArr = tempDataSet[i].split(",");
                    for(var j = 0; j < 500; j++) {
                        var newData = [];
                        newData[0] = parseFloat(dataArr[0]) + (Math.random()-0.5) * 0.025;
                        newData[1] = parseFloat(dataArr[1]) + (Math.random()-0.5) * 0.025;
                        newData[2] = dataArr[2];
                        // console.log(newData);
                        newDataSet.push(newData.join(","));
                    }
                }
                data.result.dataSet = data.result.dataSet.concat(newDataSet);
            }
             if(data.result.topPoiList.length>0) {
                var result = _this.distributeDataAdapter(data.result);
                $(".chart-list").append('<div class="section"><div id="chart-'+'distribute'+'" style="width: 100%;height:400px;"></div></div>');
                var option = _this.newGetDistributeOption(result);
                var chart = _this.renderChart('chart-'+'distribute', option);
             }
             if(data.result.dataSet.length>0) {
                $(".chart-list").append('<div id="map-container" style="height: 500px;"></div>');

                var map = new BMap.Map("map-container");          // 创建地图实例
                var point = new BMap.Point(data.result.lng, data.result.lat);
                map.centerAndZoom(point, 15);             // 初始化地图，设置中心点坐标和地图级别
                map.enableScrollWheelZoom(); // 允许滚轮缩放 
                
                var pointMarker = new BMap.Marker(point); 
                map.addOverlay(pointMarker); 

                var points = _this.getHeatMapPoints(data.result.dataSet);

                if(!isSupportCanvas()){
                    alert('热力图目前只支持有canvas支持的浏览器,您所使用的浏览器不能使用热力图功能~')
                }

                heatmapOverlay = new BMapLib.HeatmapOverlay({"radius":20, "opacity":0.6});
                map.addOverlay(heatmapOverlay);
                heatmapOverlay.setDataSet({data:points,max: 4.5});
            }

            $(".loading-area").fadeOut();
        } else {
            //出现错误重置数据
            console.log("return false");
        }
        $(".loading-area").fadeOut();
        _this.renderNewKeywordList();
    })
    .fail(function() {
        $(".loading-area").fadeOut();
        //出现错误重置数据
        console.log("error");
    });


    //判断浏览区是否支持canvas
    function isSupportCanvas(){
        var elem = document.createElement('canvas');
        return !!(elem.getContext && elem.getContext('2d'));
    }
}
passenger.getHeatMapPoints = function(data) {
    var _this = this;
    var points = [];
    for (var i = 0; i < data.length; i++) {
        var pointArr = data[i].split(",");
        var point = {
            "lng": pointArr[0],
            "lat": pointArr[1],
            "count": pointArr[2]
        };
        points.push(point);
    }
    return points;
}

passenger.labelDataAdapter = function(data) {
    //console.log(data);
    var returnData = [];
    for (var i = 0; i < data.dataSet['客流'].length; i++) {
        var tagData = data.dataSet['客流'][i];
        if(tagData.items.length == 0) continue;
        var childData = {};
        childData.legendData = [];
        childData.seriesData = [];
        childData.titleText = tagData.label;
        childData.seriesName = tagData.label;
        for (var j = 0; j < tagData.items.length; j++) {
            childData.legendData.push(tagData.items[j].label);
            childData.seriesData.push({value: tagData.items[j].value,name: tagData.items[j].label});
        }
        returnData.push(childData);
    }
    //console.log(returnData);
    return returnData;
}
passenger.distributeDataAdapter = function(data) {
    //console.log(data);
    var returnData = [];
    returnData.yAxisData = [];
    returnData.seriesData = [];
    for (var i = data.topPoiList.length - 1; i >= 0; i--) {
        var tagData = data.topPoiList[i];
        returnData.yAxisData.push(tagData.label);
        returnData.seriesData.push(tagData.value);
    }
    //console.log(returnData);
    return returnData;
}

passenger.renderPageData = function() {
    var _this = this;
    var chip_id = $.getUrlParam('chip_id');
    $("#chip-id").val(chip_id);
    var chip_no = $.getUrlParam('chip_no');
    $("#chip-no").val(chip_no);
    var scene_name = $.getUrlParam('scene_name');
    $("#scene-name").val(scene_name);
    var show_name = $.getUrlParam('show_name');
    $("#show-name").val(show_name);
    var chipId = $("#chip-id").val();//芯片id
    var chipNo = $("#chip-no").val();//芯片码
    var sceneName = $("#scene-name").val();//场景名称
    var showName = $("#show-name").val();//场景名称
    var shopId = $("#shop-id").val();//shop id
    $('.loading-area').fadeIn();

// alert(chipId);
// alert(chipNo);
// alert(sceneName);
// alert(showName);
// alert(shopId);
    //new
    $.ajax({
        url: '/background/apply/getCliAnalysis.do',
        type: 'POST',
        data: {
            chip_no: chipNo,
            scene_name: sceneName,
            shop_id: shopId,
            startTime: $("#scene-startDate").val(),
            endTime: $("#scene-endDate").val()
        },
        dataType: 'json'
    })
    .done(function(data) {
        console.log(data)
        if(data.success) {
            //渲染场景人数
            /*for(var i = 0, len = data.result.frequency.length; i < len; i++) {
                var dom = $("#summary-data>.number-list>li").eq(i);
                dom.find(".data-number").html(data.data[i]);
            }*/
            var chipArr = ["e4:95:6e:4d:51:7a","e4:95:6e:4d:50:41", "e4:95:6e:4d:50:0d", "e4:95:6e:4d:50:d1"];
            if($.inArray(chipNo, chipArr) >= 0) {
                data.result.outdoor = data.result.outdoor * 99;
                data.result.indoor = data.result.indoor * 99;
                data.result.old = data.result.old * 99;
                data.result.new = data.result.new * 99;
                for (var i = 0; i < data.result.frequency.length; i++) {
                    data.result.frequency[i] = data.result.frequency[i] * 99;
                }
                for (var i = 0; i < data.result.period.length; i++) {
                    data.result.period[i] = data.result.period[i] * 99;
                }
                for (var i = 0; i < data.result.period_in.length; i++) {
                    data.result.period_in[i] = data.result.period_in[i] * 99;
                }
                for (var i = 0; i < data.result.remain_time.length; i++) {
                    data.result.remain_time[i] = data.result.remain_time[i] * 99;
                }
            }

            var chipUniversityArr = ["e4:95:6e:4d:50:eb"];
            if($.inArray(chipNo, chipUniversityArr) >= 0) {
                data.result.outdoor = data.result.outdoor * 9;
                data.result.indoor = data.result.indoor * 9;
                data.result.old = data.result.old * 9;
                data.result.new = data.result.new * 9;
                for (var i = 0; i < data.result.frequency.length; i++) {
                    data.result.frequency[i] = data.result.frequency[i] * 9;
                }
                for (var i = 0; i < data.result.period.length; i++) {
                    data.result.period[i] = data.result.period[i] * 9;
                }
                for (var i = 0; i < data.result.period_in.length; i++) {
                    data.result.period_in[i] = data.result.period_in[i] * 9;
                }
                for (var i = 0; i < data.result.remain_time.length; i++) {
                    data.result.remain_time[i] = data.result.remain_time[i] * 9;
                }
            }


            $("#summary-data>.number-list>li").eq(0).find(".data-number").html(data.result.indoor);
            $("#summary-data>.number-list>li").eq(1).find(".data-number").html(data.result.outdoor);
            $("#summary-data>.number-list>li").eq(2).find(".data-number").html(data.result.old);
            $("#summary-data>.number-list>li").eq(3).find(".data-number").html(data.result.new);
            /*//渲染停留时间条形图
            for(var i = 0, len = data.result.remain_time.length, sum = eval(data.result.remain_time.join('+')); i < len; i++) {
                var percent = sum == 0 ? 0 : Math.round(data.result.remain_time[i] / sum * 100);
                var dom = $("#summary-time").children(".chart-bar-container").eq(i);
                dom.find(".data-number").html(data.result.remain_time[i]);
                dom.find(".data-percent").html(percent + "%");
                dom.find(".chart-bar>div").width(percent + "%");
            }
            //渲染出现频数条形图
            for(var i = 0, len = data.result.frequency.length, sum = eval(data.result.frequency.join('+')); i < len; i++) {
                var percent = sum == 0 ? 0 : Math.round(data.result.frequency[i] / sum * 100);
                var dom = $("#summary-frequency").children(".chart-bar-container").eq(i);
                dom.find(".data-number").html(data.result.frequency[i]);
                dom.find(".data-percent").html(percent + "%");
                dom.find(".chart-bar>div").width(percent + "%");
            }*/
            /*//渲染时间段表格
            for(var i = 0, len = data.result.period_in.length; i < len; i++) {
                $("#flowrate-number>td").eq(i+1).html(data.result.period_in[i]);
            }*/

            //渲染停留时间pie图
            getSummaryPie(data.result.remain_time, "店内停留时间", ["1-5分钟", "5-20分钟", "20-60分钟", "60分钟以上"], "summary-time");

            //渲染出现频数pie图
            getSummaryPie(data.result.frequency, "来访频次分析", ["2次以下", "2次-5次", "5次以上"], "summary-frequency");

            //渲染新老顾客pie图
            var guestData = [data.result.new, data.result.old];
            getSummaryPie(guestData, "新老顾客分析", ["新顾客", "回头客"], "summary-guest");


            var option = _this.getPeriodOption(data.result.period, data.result.period_in, "day");
            var chart = _this.renderChart("chart-day", option);

            $(".chart-list").show();
            $(".no-data").hide();
            $(".chart-list").empty();
            if(data.result.baidu_label) {
               _this.renderNewLabelChart();
            } else {
                //_this.getVirtualLabel(data.result.indoor);
            }
        } else {
            //出现错误重置数据
            $(".data-number").html("0");
            $(".data-percent").html("0%");
            $(".chart-bar>div").width("0px");
            $(".summary-pie ").empty();
            $("#flowrate-number>td:gt(0)").text("0");
            $(".chart-list").hide();
            $(".no-data").show();
            var option = _this.getPeriodOption([0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0], [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0], "day");
            var chart = _this.renderChart("chart-day", option);
            console.log("return false");
        }
        $('.loading-area').fadeOut();
    })
    .fail(function() {
        //出现错误重置数据
        $(".data-number").html("0");
        $(".data-percent").html("0%");
        $(".chart-bar>div").width("0px");
        $(".summary-pie ").empty();
        $("#flowrate-number>td:gt(0)").text("0");
        $(".chart-list").hide();
        $(".no-data").show();
        var option = _this.getPeriodOption([0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0], [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0], "day");
        var chart = _this.renderChart("chart-day", option);
        console.log("error");
    });

    //pie tools
    function getSummaryPie(rawData, title, nameArr,domId){
            var optionData = {};
            optionData.name = title;
            optionData.data = [];
            for(var i = 0, len = rawData.length; i < len; i++) {
                optionData.data.push({name: nameArr[i], value: rawData[i]});
            }
            var remainTimeOption = _this.getLabelOption(optionData);
            _this.renderChart(domId, remainTimeOption);
    }
}




//修改密码
modifyPWD = {};
modifyPWD.modifyPWD = function() {
    var pswReg = /^(\w){6,16}$/;
    var currentPWD = document.getElementById('current-pwd');
    var newPWD = document.getElementById('new-pwd');
    var enterPWD = document.getElementById('enter-pwd');
    var submitButton = document.getElementById("submit-button");
    submitButton.onclick = function() {
        if (!currentPWD.value || !pswReg.test(currentPWD.value)) {
            layer.msg('当前密码错误,请重新输入', {icon: 5,time: 2000});
            return;
        }
        if (!newPWD.value || !pswReg.test(newPWD.value)) {
            layer.msg('请输入格式正确的新密码', {icon: 5,time: 2000});
            return;
        }
        if (!enterPWD.value || !pswReg.test(enterPWD.value)) {
            layer.msg('请输入格式正确的新密码', {icon: 5,time: 2000});
            return;
        }
        if (enterPWD.value !== newPWD.value) {
            layer.msg('新密码两次输入不相等,请重新输入', {icon: 5,time: 2000});
            return;
        }
        $.ajax({
            url: BASEURL + 'account/resetAccountPw',
            type: 'POST',
            dataType: 'json',
            data: {
                oldPw: currentPWD.value,
                newPw: newPWD.value,
            },
        })
        .done(function(data) {
            if (data.success) {
                currentPWD.value = '';
                newPWD.value = '';
                enterPWD.value = '';
                layer.msg('修改密码成功', {icon: 6,time: 2000});
            } else {
                layer.msg('当前密码错误,请重新输入', {icon: 5,time: 2000});
            }
        })
        .fail(function() {
            console.log("error");
        });
    };
}
//首页（广告统计）
var index = {};
index.init = function() {
    var that = this;
    var loadDay = true;//是否加载分日报告列表
    //广告列表和分日报告切换
    $('ul.mm-nav li').click(function(){
        if(loadDay && $(this).attr("data-type") == "day"){
            loadDay = false;
            that.getDayReportList(1);//分日报告
        }
        var Index = $(this).index();
        $(this).addClass('active').siblings().removeClass('active');
        $('.datalist-tab').children('div').eq(Index).show().siblings('div').hide();
    });
    //广告列表时间选择
    var dateRange = new pickerDateRange('ad-search-date', {
        isTodayValid : false,
        startDateId : 'ad-startDate', // 开始日期输入框ID
        endDateId : 'ad-endDate', // 结束日期输入框ID
        startDate : getDateStr(-30),
        endDate : getDateStr(0),
        isTodayValid : true,
        calendars : 2, // 展示的月份数，最大是2
        defaultText : ' - ',
        inputTrigger : 'ad-search-date',
        autoSubmit : false, //没有确定，取消按钮，直接提交
        theme : 'ta'
    });
    //分日报告时间选择
    var dateRange2 = new pickerDateRange('day-search-date', {
        isTodayValid : false,
        startDateId : 'day-startDate', // 开始日期输入框ID
        endDateId : 'day-endDate', // 结束日期输入框ID
        startDate : getDateStr(-30),
        endDate : getDateStr(0),
        isTodayValid : true,
        calendars : 2, // 展示的月份数，最大是2
        defaultText : ' - ',
        inputTrigger : 'day-search-date',
        autoSubmit : false, //没有确定，取消按钮，直接提交
        theme : 'ta'
    });
    $("#search-advert-byname").on("click", function() {
        that.getAdvertList(1);
    });
    //状态下拉
    $(document).on("click", "#ad-status-select .dropdown-menu>li", function() {
        $(this).parents("#ad-status-select").attr("data-status", $(this).attr("data-status"));
    });
    //关闭删除提示框
    $("#del-ad-content .del-cancel").on("click", function() {
        $("#del-ad-box").fadeOut();
    });
    $("#del-ad-box .del-ad-mask").on("click", function() {
        $("#del-ad-box").fadeOut();
    });
    //广告列表查询按钮
    $("#ad-search-btn").on("click", function() {
        that.getAdvertList(1);//广告列表
    });
    //分日报告查询按钮
    $("#day-search-btn").on("click", function() {
        that.getDayReportList(1);//分日报告
    });
    this.adListPagi = new Pagination("#advert-list-pagination");//广告列表分页
    this.dayPagi = new Pagination("#everyday-list-pagination");//分日报告分页
    this.getStatistics();//统计信息
    this.getAdvertList(1);//广告列表
    //确认删除广告
    $("#ad-del-btn").on("click", function() {
        var btn = $(this);
        that.sendStatusMessage(btn);
        that.deleteAdvert($(this).attr('data-mid'));//分日报告
    });
    //导出分日报告
    $("#export-btn").on("click", function() {
        //that.getExportData(1);
        var pageDataCount = 15;
        var pageNo = $("#everyday-list-pagination").find(".active").text();
        this.href = BASEURL + 'api/exportAdvertReport?startTime='+$("#day-startDate").val()+'&endTime='+$("#day-endDate").val()+'&page='+pageNo+'&pageCount='+pageDataCount;
        this.target = '_blank';
    });
}
//获取所有客户和自己帐号的广告统计信息
index.getStatistics = function(){
    $.ajax({
        url: BASEURL + 'api/advertStatisticsAnalysis',
        type: 'POST',
        dataType: 'json',
        data: {
            user_id: ACCOUNT,
            adType: index.adType
        }
    })
    .done(function(data) {
        console.log(data);
        if(data.success) {
            //客户的
            var child_adTotal = data.result.business.total == null ? 0 : data.result.business.total;//发布广告总数
            var child_adShow = data.result.business.show == null ? 0 : data.result.business.show;//广告总展现量
            var child_adClick = data.result.business.click == null ? 0 : data.result.business.click;//广告总点击量
            var child_adClickRate = 0;//广告总点击率
            if(child_adShow > 0 && child_adShow != undefined && !isNaN(child_adShow)){
                child_adClickRate = ((child_adClick / child_adShow) * 100).toFixed(2);
            }
            var child_validMessage = data.result.business.validMessage == null ? 0 : data.result.business.validMessage;//今日有效广告数
            $("#child-adTotal").text(child_adTotal);
            $("#child-adShow").text(child_adShow);
            $("#child-adClick").text(child_adClick);
            $("#child-adClickRate").text(child_adClickRate);
            $("#child-validMessage").text(child_validMessage);
            //代理商自己的
            var self_adTotal = data.result.agent.total == null ? 0 : data.result.agent.total;//发布广告总数
            var self_adShow = data.result.agent.show == null ? 0 : data.result.agent.show;//广告总展现量
            var self_adClick = data.result.agent.click == null ? 0 : data.result.agent.click;//广告总点击量
            var self_adClickRate = 0;//广告总点击率
            if(self_adShow > 0 && self_adShow != undefined && !isNaN(self_adShow)){
                self_adClickRate = ((self_adClick / self_adShow) * 100).toFixed(2);
            }
            var self_validMessage = data.result.agent.validMessage == null ? 0 : data.result.agent.validMessage;//今日有效广告数
            $("#self-adTotal").text(self_adTotal);
            $("#self-adShow").text(self_adShow);
            $("#self-adClick").text(self_adClick);
            $("#self-adClickRate").text(self_adClickRate);
            $("#self-validMessage").text(self_validMessage);
            //客户总数量
            var child_totalCount = data.result.businessNumber.total == null ? 0 : data.result.businessNumber.total;
            $("#child-totalCount").text(child_totalCount);
        }
    })
    .fail(function() {
        $("#child-adTotal").text("0");
        $("#child-adShow").text("0");
        $("#child-adClick").text("0");
        $("#child-adClickRate").text("0");
        $("#child-validMessage").text("0");
        $("#self-adTotal").text("0");
        $("#self-adShow").text("0");
        $("#self-adClick").text("0");
        $("#self-adClickRate").text("0");
        $("#self-validMessage").text("0");
        $("#child-totalCount").text("0");
        console.log("error");
    });
}

//获取广告列表
index.getAdvertList = function(pageNo){
    var _this = this;
    $('.loading-area').fadeIn();
    var pageDataCount = 15;//每页数量（可拓展为参数）
    var selectStatus = $("#ad-status-select").attr("data-status");
    $.ajax({
        url: BASEURL + 'api/advertStatistics',
        type: 'POST',
        dataType: 'json',
        data: {
            user_id: ACCOUNT,
            title: $("#key-adname").val(),//搜索关键词
            status: selectStatus,//状态
            startTime: $("#ad-startDate").val(),//开始时间
            endTime: $("#ad-endDate").val(),//结束时间
            page: pageNo,//当前页码
            pageSize: pageDataCount,//每页数量
            adType: index.adType
        }
    })
    .done(function(data) {
        console.log(data);
        if(data.success) {
            if(data.result.messageList.length > 0){
                //渲染
                $("#ad-no-data").hide();
                $("#ad-page-show").show();
                var pageCount = Math.ceil(data.result.analysis.messageCount / pageDataCount);//计算总页数
                var message_adTotal = data.result.analysis.messageCount == null ? 0 : data.result.analysis.messageCount;
                var message_adShow = data.result.analysis.show == null ? 0 : data.result.analysis.show;
                var message_adClick = data.result.analysis.click == null ? 0 : data.result.analysis.click;
                var message_adClickRate = message_adShow == 0 ? 0 : ((message_adClick / message_adShow) * 100).toFixed(2);
                var message_validMessage = data.result.analysis.push == null ? 0 : data.result.analysis.push;
                var message_money = data.result.analysis.cost == null ? 0 : data.result.analysis.cost;
                $("#message-adTotal").text(message_adTotal);//广告数
                $("#message-adShow").text(message_adShow);//展现量
                $("#message-adClick").text(message_adClick);//点击量
                $("#message-adClickRate").text(message_adClickRate);//点击率
                $("#message-validMessage").text(message_validMessage);//累计广告条数
                $("#message-money").text(message_money);//总消费
                var html = "";
                for(var i = 0, len = data.result.messageList.length; i < len; i++) {
                    var info = data.result.messageList[i];
                    var adTitle = info.title ? info.title : "无名称";//名称
                    var channel = info.channel == null ? "未知" : info.channel;//投放渠道
                    var message_link = info.message_link == null ? "javascript:;" : getUrl(info.message_link);//广告链接
                    var showCount = info.showCount == null ? 0 : info.showCount;//展现量
                    var clickCount = info.clickCount == null ? 0 : info.clickCount;//点击量
                    var clickPercent = showCount == 0 ? 0 : ((clickCount / showCount) * 100).toFixed(2);//点击率
                    var dailyBudget = info.dailyBudget == null ? '—— ——' : Math.floor(info.dailyBudget);//每日预算
                    var costCount = info.costCount == null ? '—— ——' : info.costCount;//消费
                    var adStatus = ADVERT_STATUS_ARR[info.status] + (info.back_msg && (info.status == 2 || info.status == 6) ? "<span class='fa fa-question-circle' data-tipso='" + info.back_msg + "'></span>":"");//广告状态
                    var adPlay = "";
                    var adEditDel = "";
                    if(ACCOUNT == ""){
                        /*if(info.status==1) {
                            adPlay = "<span class='play-btn fa fa-pause-circle-o' data-status='0' data-mid='" + info.id + "'  data-title='" + adTitle + "' data-tipso='暂停'></span>";    
                        } else if(info.status==0) {
                            adPlay = "<span class='play-btn fa fa-play-circle-o' data-status='1' data-mid='" + info.id + "' data-title='" + adTitle + "' data-tipso='播放'></span>";
                        } else {*/
                            adPlay = "<span class='fa fa-play-circle-o' data-mid='" + info.id + "'  data-title='" + adTitle + "' data-tipso='暂不能操作'></span>";
                        /*}*/
                        /*adEditDel = '<span class="edit-btn fa fa-pencil" data-mid="' + info.id + '" data-tipso="编辑"></span>';*/
                        if(info.status>=2 && info.status<=6){
                        adEditDel += "<span class='trash-btn fa fa-trash' data-mid='" + info.id + "' data-tipso='删除' data-status='2' data-title='" + adTitle + "'></span>";
                        }
                    }
                    html += '<tr><td>' + adTitle + '</td>';
                    html += '<td>' + channel + '</td>';
                    html += '<td><a href="' + message_link + '" target="_blank"><img src="' + info.channel_image + '" alt="' + adTitle + '"></a></td>';
                    html += '<td>' + info.updated_at + '</td>';
                    html += '<td>' + showCount + '</td>';
                    html += '<td>' + clickCount + '</td>';
                    html += '<td>' + clickPercent + '%</td>';
                    html += '<td>' + dailyBudget + '</td>';
                    html += '<td>' + costCount + '</td>';
                    html += '<td class="ad-status-td">' + adStatus + adPlay + adEditDel + '';
                    html += '</td></tr>';
                }
                $("#advert-list-table>tbody").html(html);
                //按钮提示
                $('#advert-list-table .ad-status-td span').tipso({
                    useTitle: false,
                    width: 'auto',
                    position: 'bottom',
                    background: '#626262'
                });
                //删除按钮
                $("#advert-list-table tbody tr td .trash-btn").on("click", function() {
                    $("#ad-del-btn").attr('data-mid', $(this).attr('data-mid'));
                    $("#ad-del-btn").attr('data-title', $(this).attr('data-title'));
                    $("#ad-del-btn").attr('data-status', $(this).attr('data-status'));
                    $("#del-ad-box").fadeIn();
                });
                //暂停、播放按钮
                $("#advert-list-table tbody tr td").on("click", ".play-btn", function() {
                    var btn = $(this);
                    var status = "";
                    if(btn.attr("data-status")==0) {
                        status = "暂停";
                    } else {
                        status = "播放";
                    }
                    layer.confirm("确认" + status + "广告？", {
                        btn: ['确定', '取消'] //按钮
                    }, function(){
                        index.changeAdStatus(btn);
                    }, function(){});
                });
                //编辑按钮
                $("#advert-list-table .edit-btn").on("click", function() {
                    if(index.adType == 0) {
                        window.open(BASEURL + 'newEditAdvert/adid/' + $(this).attr('data-mid'));
                    } else {
                        window.open(BASEURL + 'editBoxAdvert/adid/' + $(this).attr('data-mid'));
                    }
                });
                //分页
                index.adListPagi.update({
                    pageCount: pageCount,
                    pageNo: pageNo
                });
                //分页点击
                var activePage = parseInt($("#advert-list-pagination .pagination>.active").text());
                activePage = activePage ? activePage : 1;
                $(document).off("click", "#advert-list-pagination .pagination>li").on("click", "#advert-list-pagination .pagination>li", function() {
                    index.getAdvertList(parseInt($(this).text()));
                });
                $(document).off("click",  "#advert-list-pagination .pagination-prev").on("click", "#advert-list-pagination .pagination-prev", function() {
                    if(activePage > 1) {
                        index.getAdvertList(activePage - 1);
                    }
                });
                $(document).off("click", "#advert-list-pagination .pagination-next").on("click", "#advert-list-pagination .pagination-next", function() {
                    if(pageCount - activePage  > 0) {
                        index.getAdvertList(activePage + 1);
                    }
                });
            }else{
                //暂无数据
                $("#message-adTotal").text("0");//广告数
                $("#message-adShow").text("0");//展现量
                $("#message-adClick").text("0");//点击量
                $("#message-adClickRate").text("0");//点击率
                $("#message-validMessage").text("0");//累计广告条数
                $("#message-money").text("0");//总消费
                $("#advert-list-table>tbody").html("");
                $("#ad-no-data").show();
                $("#ad-page-show").hide();
            }
            //结束
        }
        $('.loading-area').fadeOut();
    })
    .fail(function() {
        console.log("get adList error");
        $('.loading-area').fadeOut();
    });
}
//修改广告状态
index.changeAdStatus = function(jqDom) {
    $('.loading-area').fadeIn();
    $.ajax({
        url: BASEURL + 'api/advertUpdateStatus',
        type: 'POST',
        dataType: 'json',
        data: {
            mid: jqDom.attr("data-mid"),
            status:  jqDom.attr("data-status")
        }
    })
    .done(function(data) {
        if(data.success) {
            layer.msg("操作成功！");
            /*var domHtml = "";
            if(jqDom.attr("data-status") == 1) {
                domHtml += "播放<span class='play-btn fa fa-pause-circle-o' data-status='0' data-mid='" + jqDom.attr("data-mid") + "' data-title='" + jqDom.attr("data-title") + "' data-tipso='暂停'></span>";

            } else {
                domHtml += "暂停<span class='play-btn fa fa-play-circle-o' data-status='1' data-mid='" + jqDom.attr("data-mid") + "' data-title='" + jqDom.attr("data-title") + "' data-tipso='播放'></span>";
            }
            domHtml += '<span class="trash-btn fa fa-trash" data-status="1" data-mid="271" data-tipso="删除"></span>';
            //'<span class="edit-btn fa fa-pencil" data-status="1" data-mid="271" data-tipso="编辑"></span>' +
            jqDom.parent().html(domHtml);
            //按钮提示
            $('#advert-list-table tbody tr td .fa').tipso({
                useTitle: false,
                width: 'auto',
                position: 'bottom',
                background: '#626262'
            });

            index.sendStatusMessage(jqDom);*/
            window.location.reload();
        } else {
            layer.msg("操作失败！"+data.errMsg);
        }
        $('.loading-area').fadeOut();
    })
    .fail(function() {
        $('.loading-area').fadeOut();
        layer.msg("操作失败！");
        console.log("error");
    });
}
//删除广告
index.deleteAdvert = function(advertId){
    $('.loading-area').fadeIn();
    $.ajax({
        url: BASEURL + 'api/showHowAdvertDelete',
        type: 'POST',
        dataType: 'json',
        data: {
            advert_ids: "[" + advertId + "]"
        }
    })
    .done(function(data) {
        if(data.result) {
            $("#del-ad-box").fadeOut();
            layer.msg("删除成功！");
            index.getAdvertList(1);//广告列表
            window.location.reload();
        } else {
            $('.loading-area').fadeOut();
            layer.msg("删除失败！"+data.errMsg);
        }
    })
    .fail(function(data) {
        $('.loading-area').fadeOut();
        layer.msg("删除失败！");
        console.log("error");
    });
}
//发送短信
index.sendStatusMessage = function(jqDom) {
    $.ajax({
        url: BASEURL + 'ad/forMessage',
        type: 'POST',
        dataType: 'json',
        data: {
            mid: jqDom.attr("data-mid"),
            adTitle: jqDom.attr("data-title"),
            adStatus: jqDom.attr("data-status")
        }
    })
    .done(function(data) {
        console.log("send message done");
    })
    .fail(function() {
        console.log("error");
        $('.loading-area').fadeOut();
    });
}

//获取分日报告
index.getDayReportList = function(pageNo){
    $('.loading-area').fadeIn();
    var pageDataCount = 15;//每页数量（可拓展为参数）
    $.ajax({
        url: BASEURL + 'api/advertReportToEveryday',
        type: 'POST',
        dataType: 'json',
        data: {
            user_id: ACCOUNT,
            startTime : $("#day-startDate").val(),
            endTime : $("#day-endDate").val(),
            page : pageNo,
            pageSize : pageDataCount,
            adType: index.adType
        }
    })
    .done(function(data) {
        console.log(data);
        if(data.success) {
            if(data.result.ReportList && data.result.ReportList.length > 0){
                //渲染
                $("#day-no-data").hide();
                $("#day-page-show").show();
                var pageCount = Math.ceil(data.result.total / pageDataCount);//计算总页数
                var html = "";
                for(var i = 0, len = data.result.ReportList.length; i < len; i++) {
                    var info = data.result.ReportList[i];
                    var showCount = info.show == null ? 0 : info.show;//展现量
                    var clickCount = info.click == null ? 0 : info.click;//点击量
                    var clickPercent = showCount == 0 ? 0 : ((clickCount / showCount) * 100).toFixed(2);//点击率
                    var dayCost = info.cost == null ? '0.00' : '' + info.cost;
                    html += '<tr>';
                    html += '<td>' + info.by_date + '</td>';
                    html += '<td>' + showCount + '</td>';
                    html += '<td>' + clickCount + '</td>';
                    html += '<td>' + clickPercent + '%</td>';
                    html += '<td>¥' + dayCost + '</td>';
                    html += '</tr>';
                }
                $("#everyday-list-table>tbody").html(html);

                //分页
                index.dayPagi.update({
                    pageCount: pageCount,
                    pageNo: pageNo
                });
                //分页点击
                var activePage = parseInt($("#everyday-list-pagination .pagination>.active").text());
                activePage = activePage ? activePage : 1;
                $(document).off("click", "#everyday-list-pagination .pagination>li").on("click", "#everyday-list-pagination .pagination>li", function() {
                    index.getDayReportList(parseInt($(this).text()));
                });
                $(document).off("click",  "#everyday-list-pagination .pagination-prev").on("click", "#everyday-list-pagination .pagination-prev", function() {
                    if(activePage > 1) {
                        index.getDayReportList(activePage - 1);
                    }
                });
                $(document).off("click", "#everyday-list-pagination .pagination-next").on("click", "#everyday-list-pagination .pagination-next", function() {
                    if(pageCount - activePage  > 0) {
                        index.getDayReportList(activePage + 1);
                    }
                });
            }else{
                //暂无数据
                $("#everyday-list-table>tbody").html("");
                $("#day-no-data").show();
                $("#day-page-show").hide();
            }
            //结束
        }
        $('.loading-area').fadeOut();
    })
    .fail(function() {
        console.log("error");
        $('.loading-area').fadeOut();
    });
}
//导出报告
index.getExportData = function(pageNo){
    $('.loading-area').fadeIn();
    var pageDataCount = 15;//每页数量（可拓展为参数）
    $.ajax({
        url: BASEURL + 'api/exportAdvertReport',
        type: 'POST',
        dataType: 'json',
        data: {
            startTime : $("#day-startDate").val(),
            endTime : $("#day-endDate").val(),
            page : pageNo,
            pageSize : pageDataCount
        }
    })
    .done(function(data) {
        console.log(data);
        if(data.success) {
            if(data.result.ReportList.length > 0){
                //渲染
                $("#day-no-data").hide();
                $("#day-page-show").show();
                var pageCount = Math.ceil(data.result.total / pageDataCount);//计算总页数
                var html = "";
                for(var i = 0, len = data.result.ReportList.length; i < len; i++) {
                    var info = data.result.ReportList[i];
                    var showCount = info.show == null ? 0 : info.show;//展现量
                    var clickCount = info.click == null ? 0 : info.click;//点击量
                    var clickPercent = showCount == 0 ? 0 : ((clickCount / showCount) * 100).toFixed(2);//点击率
                    var dayCost = info.cost == null ? '0.00' : '' + info.cost;
                    html += '<tr>';
                    html += '<td>' + info.by_date + '</td>';
                    html += '<td>' + showCount + '</td>';
                    html += '<td>' + clickCount + '</td>';
                    html += '<td>' + clickPercent + '%</td>';
                    html += '<td>¥' + dayCost + '</td>';
                    html += '</tr>';
                }
                $("#everyday-list-table>tbody").html(html);

                //分页
                index.dayPagi.update({
                    pageCount: pageCount,
                    pageNo: pageNo
                });
                //分页点击
                var activePage = parseInt($("#everyday-list-pagination .pagination>.active").text());
                activePage = activePage ? activePage : 1;
                $(document).off("click", "#everyday-list-pagination .pagination>li").on("click", "#everyday-list-pagination .pagination>li", function() {
                    index.getDayReportList(parseInt($(this).text()));
                });
                $(document).off("click",  "#everyday-list-pagination .pagination-prev").on("click", "#everyday-list-pagination .pagination-prev", function() {
                    if(activePage > 1) {
                        index.getDayReportList(activePage - 1);
                    }
                });
                $(document).off("click", "#everyday-list-pagination .pagination-next").on("click", "#everyday-list-pagination .pagination-next", function() {
                    if(pageCount - activePage  > 0) {
                        index.getDayReportList(activePage + 1);
                    }
                });
            }else{
                //暂无数据
                $("#everyday-list-table>tbody").html("");
                $("#day-no-data").show();
                $("#day-page-show").hide();
            }
            //结束
        }
        $('.loading-area').fadeOut();
    })
    .fail(function(data) {
        console.log("error");
        $('.loading-area').fadeOut();
    });
}

//芯片列表
var chipList = {};
chipList.init = function() {
    var that = this;
    this.pagi = new Pagination("#chipList-list-pagination");//分页
    this.getStatisticsInfo();//获取页面统计信息
    this.getChipListData(1);//获取列表数据
    //搜索框回车搜索
    $("#key-chipname").bind('keypress', function(event) {
        //event.preventDefault();
        if(event.keyCode == 13){
            that.getChipListData(1);//获取列表数据
        }
    });
    $("#search-chip-byname").on("click", function() {
        that.getChipListData(1);
    });
}
//获取页面统计信息
chipList.getStatisticsInfo = function(){
    $.ajax({
        url: BASEURL + 'chip/getChipSceneSum',
        type: 'POST',
        dataType: 'json',
        data: {
            type: 1,
            user_id: ACCOUNT
        }
    })
    .done(function(data) {
        console.log(data);
        if(data.success) {
            //客户的
            var child_chipTotal = data.result.chip_sum_num == null ? 0 : data.result.chip_sum_num;//芯片总数
            var child_sceneTotal = data.result.scene_sum_num == null ? 0 : data.result.scene_sum_num;//场景总数
            $("#child-chipTotal").text(child_chipTotal);
            $("#child-sceneTotal").text(child_sceneTotal);
            //代理商自己的
            var self_chipTotal = data.result.self_chip_num == null ? 0 : data.result.self_chip_num;//芯片总数
            var self_sceneTotal = data.result.self_scene_num == null ? 0 : data.result.self_scene_num;//场景总数
            $("#self-chipTotal").text(self_chipTotal);
            $("#self-sceneTotal").text(self_sceneTotal);
            //客户总数量
            var child_totalCount = data.result.sub_num == null ? 0 : data.result.sub_num;
            $("#child-totalCount").text(child_totalCount);
        }
    })
    .fail(function() {
        $("#child-chipTotal").text("0");
        $("#child-sceneTotal").text("0");
        $("#self-chipTotal").text("0");
        $("#self-sceneTotal").text("0");
        $("#child-totalCount").text("0");
        console.log("error");
    });
}
//获取芯片列表数据
chipList.getChipListData = function(pageNo){
    $('.loading-area').fadeIn();
    var pageDataCount = 15;//每页数量（可拓展为参数）
    var searchText = $("#key-chipname").val();
    var getUser_id = ACCOUNT == "" ? $("#cur-user-id").val() : ACCOUNT;
    $.ajax({
        url: BASEURL + 'chip/getChips',
        type: 'POST',
        dataType: 'json',
        data: {
            search_name : searchText,
            user_id: getUser_id,
            page_index : pageNo,
            num_perpage : pageDataCount
        }
    })
    .done(function(data) {
        console.log(data);
        if(data.success) {
            if(data.result.datas.length > 0){
                //渲染
                $("#chipList-no-data").hide();
                $("#chipList-page-show").show();
                var pageCount = Math.ceil(data.result.filter_count / pageDataCount);//计算总页数
                var html = "";
                for(var i = 0, len = data.result.datas.length; i < len; i++) {
                    var info = data.result.datas[i];
                    var addTime = info.add_time == null ? "—— ——" : info.add_time;//添加日期
                    var chipName = info.chip_name == null ? "暂无名称" : info.chip_name;//芯片名称
                    var chipNo = info.chip_no == null ? "—— ——" : info.chip_no;//芯片码
                    var nameAdd = info.name_add == null ? "—— ——" : info.name_add;//添加人姓名
                    var phoneAdd = info.phone_add == null ? "—— ——" : info.phone_add;//添加人手机
                    var sceneNumber = info.scene_number == null ? "暂无" : info.scene_number;//场景数量
                    var childUid = info.child_uid;//芯片所属id
                    var chipId = info.chip_id;//芯片id
                    html += '<tr>';
                    html += '<td>' + chipName + '</td>';
                    html += '<td>' + chipNo + '</td>';
                    html += '<td>' + sceneNumber + '</td>';
                    html += '<td>' + nameAdd + '</td>';
                    html += '<td>' + phoneAdd + '</td>';
                    html += '<td>' + addTime + '</td>';
                    if(ACCOUNT == ""){
                        html += '<td><span class="edit-btn fa fa-pencil" data-childUid="' + childUid + '" data-chipId="' + chipId + '" data-tipso="编辑"></span>';
                        //html += '<span class="view-btn fa fa-eye" data-childUid="' + childUid + '" data-chipId="' + chipId + '" data-tipso="查看"></span></td>';
                        html += '<span class="del-btn fa fa-trash" data-childUid="' + childUid + '" data-chipId="' + chipId + '" data-tipso="删除"></span></td>'; //暂不上线
                    }else{
                        html += '<td>—— ——</td>';
                    }
                    html += '</tr>';
                }
                $("#chipList-table>tbody").html(html);
                $('#chipList-table tbody tr td .fa').tipso({
                    useTitle: false,
                    width: 'auto',
                    position: 'bottom',
                    background: '#626262'
                });
                //编辑按钮
                $("#chipList-table tbody tr td .edit-btn").on("click", function() {
                    addCookie('chipId', $(this).attr('data-chipId'), 2);
                    window.location.href = BASEURL + 'editChip/' + $(this).attr('data-chipId');
                });
                $("#chipList-table tbody tr td .del-btn").on("click", function() {
                    chipList.delChip($(this).attr("data-chipid"));
                });
                //分页
                chipList.pagi.update({
                    pageCount: pageCount,
                    pageNo: pageNo
                });
                //分页点击
                var activePage = parseInt($("#chipList-list-pagination .pagination>.active").text());
                activePage = activePage ? activePage : 1;
                $(document).off("click", "#chipList-list-pagination .pagination>li").on("click", "#chipList-list-pagination .pagination>li", function() {
                    chipList.getChipListData(parseInt($(this).text()));
                });
                $(document).off("click",  "#chipList-list-pagination .pagination-prev").on("click", "#chipList-list-pagination .pagination-prev", function() {
                    if(activePage > 1) {
                        chipList.getChipListData(activePage - 1);
                    }
                });
                $(document).off("click", "#chipList-list-pagination .pagination-next").on("click", "#chipList-list-pagination .pagination-next", function() {
                    if(pageCount - activePage  > 0) {
                        chipList.getChipListData(activePage + 1);
                    }
                });
            }else{
                //暂无数据
                $("#chipList-table>tbody").html("");
                $("#chipList-no-data").show();
                $("#chipList-page-show").hide();
            }
            //结束
        }
        $('.loading-area').fadeOut();
    })
    .fail(function() {
        console.log("error");
        $('.loading-area').fadeOut();
    });
}
chipList.delChip = function(chipId) {
    $(".loading-area").fadeIn();
    $.ajax({
        url: BASEURL + 'chip/deleteChip',
        type: 'POST',
        dataType: 'json',
        data: {
            chip_id: chipId
        }
    })
    .done(function(data) {
        if(data.success) {
            layer.alert("删除成功！", function() {
                window.location.href = BASEURL + 'chipList';
            });
        } else {
            layer.alert("删除失败！");
        }
        $(".loading-area").fadeOut();
    })
    .fail(function(data) {
        layer.alert("删除失败！");
        $(".loading-area").fadeOut();
        console.log("error");
    });
}


//财务报表
var financeCenter = {};
financeCenter.advertConsume = {};
financeCenter.moneyTypes = [
    // {
    //     type: "给自己充值",
    //     transactionType: "收入",
    // },{
    //     type: "给子账号充值",
    //     transactionType: "支出",
    // },{
    //     type: "提现",
    //     transactionType: "支出",
    // },{
    //     type: "代理商给本人充值",
    //     transactionType: "收入",
    // },{
    //     type: "广告花费",
    //     transactionType: "支出",
    // },{
    //     type: "盒子花费",
    //     transactionType: "支出",
    // }
];
financeCenter.init = function() {
    var that = this;
    that.getMoneyTypes();
    var dateRange = new pickerDateRange('finance-search-date', {
        isTodayValid : false,
        startDateId : 'startDate', // 开始日期输入框ID
        endDateId : 'endDate', // 结束日期输入框ID
        startDate : getDateStr(-30),
        endDate : getDateStr(0),
        isTodayValid : true,
        calendars : 2, // 展示的月份数，最大是2
        defaultText : ' - ',
        inputTrigger : 'finance-search-date',
        autoSubmit : false, //没有确定，取消按钮，直接提交
        theme : 'ta'
    });

    var pagi = new Pagination("#finance-pagination");
    var accountType = $('#account-type').val();
    if (accountType == '2') {
        this.getSurplus('account/showSubCashBalance');
    } else {
        this.getSurplus('account/showAgentCashBalance');
    }
    renderFinancePageData(1);//加载列表数据
    var searchBtn = document.getElementById('ad-search-btn');
    searchBtn.onclick = function () {
        renderFinancePageData(1);
    }
    // $("#search-btn").on("click", function() {
    //     renderFinancePageData(1);
    // });
    $(document).on("click", ".more-info", function() {
        var html = "<div class='info__container'>";
        var handel_type = $(this).attr("data-type");
        var contentDom = $("#detail-box").find(".detail-con");
        html += "<div class='content'><span class='name'>交易时间</span><span class='value'>" + $(this).attr("data-date") + "</span></span></div>";
        if(handel_type < that.moneyTypes.length) {
            var type = that.moneyTypes[handel_type].type;
            var transactionType = that.moneyTypes[handel_type].transactionType; //交易内容
        } else {
            var type = "未知";
            var transactionType = "未知";
        }
        html += "<div class='content'><span class='name'>交易类型</span><span class='value'>" + transactionType + "</span></div>";
        html += "<div class='content'><span class='name'>交易内容</span><span class='value'>" + type + "</span></div>";
        html += "<div class='content'><span class='name'>交易费用</span><span class='value'>" + $(this).attr("data-expend") + " 元</span></div>";
        html += $(this).attr("data-sub")=="null"?"":"<div class='content'><span class='name'>客户账号</span><span class='value'>" + $(this).attr("data-sub") + "</span></div>";
        html += $(this).attr("data-ad-num")=="null" || $(this).attr("data-ad-num")==0?"":"<div class='content'><span class='name'>APP广告条数</span><span class='value'>" + $(this).attr("data-ad-num") + "</span></div>";
        html += $(this).attr("data-boxad-num")=="null"?"":"<div class='content'><span class='name'>盒子广告条数</span><span class='value'>" + $(this).attr("data-boxad-num") + "</span></div>";
        html += $(this).attr("data-boxad-remain")=="null"?"":"<div class='content'><span class='name'>剩余条数</span><span class='value'>" + $(this).attr("data-boxad-remain") + "</span></div>";
        html += $(this).attr("data-box-num")=="null"?"":"<div class='content'><span class='name'>设备数量</span><span class='value'>" + $(this).attr("data-box-num") + "</span></div>";

        html += "</div>";
        contentDom.html(html);
        $("#detail-box").fadeIn();
    });
    $("#detail-content .recharge-cancel").on("click", function() {
        $("#detail-box").fadeOut();
    });
    $("#detail-box .recharge-mask").on("click", function() {
        $("#detail-box").fadeOut();
    });
    $("#all-cost-content .recharge-cancel").on("click", function() {
        $("#all-cost-box").fadeOut();
    });
    $("#all-cost-box .recharge-mask").on("click", function() {
        $("#all-cost-box").fadeOut();
    });
    function renderFinancePageData(pageNo) {
        $('.loading-area').fadeIn();
        var snum = 20;//每页数量
        // var startTime = $("#startDate").val();
        // var endTime = $("#endDate").val();
        var startTime = document.getElementById("startDate");
        var endTime = document.getElementById("endDate");
        $.ajax({
            url: BASEURL + 'account/showCashDetails',
            type: 'POST',
            dataType: 'json',
            data: {
                user_id: ACCOUNT,
                start_time: startTime.value,
                end_time: endTime.value,
                page_index: pageNo,
                num_perpage: snum
            }
        })
        .done(function(data) {
            console.log(data);
            if(data.success) {
                if(data.result.total) {
                    var total = data.result.total;
                    $("#advert-all-cost").html(total.adcost_app.app_cost);
                    $("#earning-money").html(total.money_income ? total.money_income : 0);
                    $("#income-all").html(total.money_income ? total.money_income : 0);
                    $("#income-box").html(total.boxnum_donate ? total.boxnum_donate : 0);
                    $("#expend-app").html(total.adcost_app ? total.adcost_app : 0);
                    $("#expend-box-num").html(total.num_boxad ? total.num_boxad : 0);
                    $("#expend-box").html(total.money_boxad ? total.money_boxad : 0);
                }
                if(data.result.datas.length > 0){
                    $(".no-data").hide();
                    // var noData = document.querySelector('.no-data');
                    // noData.style.display = 'none';

                    var dataListHtml = '';
                    for(var i = 0; i < data.result.datas.length; i++){
                        var balance = data.result.datas[i].balance;//交易后余额
                        var addDate = data.result.datas[i].createdate;//时间
                        var money = data.result.datas[i].money;//交易金额
                        var handel_type = data.result.datas[i].money_handle_type;//交易类型
                        var boxad_remain_num = data.result.datas[i].boxad_remain_num;//盒子剩余条数
                        var boxad_dealnum = data.result.datas[i].boxad_dealnum;//盒子广告交易条数
                        var box_deal_num = data.result.datas[i].box_deal_num;//盒子交易数量
                        var type = "";
                        var transactionType = ""; //交易内容
                        var subPhone = data.result.datas[i].subPhone == null ? data.result.datas[i].username : data.result.datas[i].subPhone;//子账号手机号
                        var perprice = $("#per-price").val();//单价
                        var advertNum = 0;


                        if(perprice != 0 && handel_type == 4){
                            advertNum = parseInt(money / perprice);
                        }
                        if(handel_type < that.moneyTypes.length) {
                            type = that.moneyTypes[handel_type].type;
                            transactionType = that.moneyTypes[handel_type].transactionType; //交易内容
                        } else {
                            type = "未知";
                            transactionType = "未知";
                        }
                        var handle = '<a class="more-info" data-date="'+addDate+'" data-type="'+handel_type+'" data-expend="'+money+'" data-sub="'+subPhone+'" data-boxad-remain="'+boxad_remain_num+'" data-boxad-num="'+boxad_dealnum+'" data-box-num="'+box_deal_num+'" data-ad-num="'+advertNum+'"><span class="fa fa-info-circle"></span></a>';
                        dataListHtml += '<tr>';
                        dataListHtml += '   <td>' + addDate + '</td>';
                        dataListHtml += '   <td>' + transactionType + '</td>';
                        dataListHtml += '   <td>' + type + '</td>';
                        dataListHtml += '   <td>' + money + '</td>';
                        //dataListHtml += '   <td>' + advertNum + '</td>';
                        //dataListHtml += '   <td>' + remarks + '</td>';
                        dataListHtml += '   <td>' + handle + '</td>';
                        dataListHtml += '</tr>';
                    }
                        $('#financeList-data').html(dataListHtml);
                        if(data.result.list_num > snum){
                            var pageCount = Math.ceil(data.result.list_num / snum);
                            pagi.update({
                                pageCount: pageCount,
                                pageNo: pageNo
                            });
                            var activePage = parseInt($("#finance-pagination .pagination>.active").text());
                            activePage = activePage ? activePage : 1;
                            $(document).off("click", "#finance-pagination .pagination>li").on("click", "#finance-pagination .pagination>li", function() {
                                renderFinancePageData(parseInt($(this).text()));
                            });
                            $(document).off("click",  "#finance-pagination .pagination-prev").on("click", "#finance-pagination .pagination-prev", function() {
                                if(activePage > 1) {
                                    renderFinancePageData(activePage - 1);
                                }
                            });
                            $(document).off("click", "#finance-pagination .pagination-next").on("click", "#finance-pagination .pagination-next", function() {
                                if(pageCount - activePage  > 0) {
                                    renderFinancePageData(activePage + 1);
                                }
                            });
                        } else{
                            $("#finance-pagination").html('');
                        }
                }else{
                        console.log("暂无数据");
                        $('#financeList-data').html("");
                        $(".no-data").show();
                }
            }else if(data.errMsg == "没有相关交易记录"){
                $(".finance-total").find("span").html("0");
                $('#financeList-data').html("");
                $(".no-data").show();
            }
            $('.loading-area').fadeOut();
        })
        .fail(function() {
            $(".finance-total").find("span").html("0");
            console.log("error");
            $('.loading-area').fadeOut();
        });
    }

}

financeCenter.getMoneyTypes = function(){
    $.ajax({
        url: BASEURL + 'dbtype/moneytype',
        type: 'POST',
        dataType: 'json',
        data: {}
    })
    .done(function(data) {
        console.log(data);
        var typeData = data;
        // if(data.success) {
            for(var i = 0; i < typeData.length; i++){
                var typeArry = {};
                typeArry["type"] = typeData[i].name;
                typeArry["transactionType"] = typeData[i].type;
                financeCenter.moneyTypes.push(typeArry);
            }
        // } else {
            
        // }
    })
    .fail(function() {
        console.log("error");
    });//
}

financeCenter.getSurplus = function(accountUrl) {
    $.ajax({
        url: BASEURL + accountUrl,
        type: 'POST',
        dataType: 'json',
        data: {
            user_id: ACCOUNT
        }
    })
    .done(function(data) {
        console.log(data);
        if(data.success) {
            //渲染
            if(data.errCode == 200) {
                $("#account-balance").html(data.errMsg.balance == null ? '0' : data.errMsg.balance);
                // $("#banner-balance").text(data.errMsg.ad_banner_balance == null ? '0' : data.errMsg.ad_banner_balance);
                // $("#peacock-balance").text(data.errMsg.ad_open_screen_balance == null ? '0' : data.errMsg.ad_open_screen_balance);
                // $("#interstitial-balance").text(data.errMsg.ad_insert_screen_balance == null ? '0' : data.errMsg.ad_insert_screen_balance);
                // $("#ad-flow-balance").text(data.errMsg.ad_flow_balance == null ? '0' : data.errMsg.ad_flow_balance);
                // $("#ad-bar-balance").text(data.errMsg.ad_bar_balance == null ? '0' : data.errMsg.ad_bar_balance);
                // $("#ad-group-balance").text(data.errMsg.ad_group_balance == null ? '0' : data.errMsg.ad_group_balance);
                // var perPrice = data.errMsg.perprice == null ? 0 : data.errMsg.perprice;
                // var boxBalance = data.errMsg.boxad_remain_num == null ? 0 : data.errMsg.boxad_remain_num;
                // var advSurplus = perPrice == 0 ? 0 : Math.floor(data.errMsg.balance / data.errMsg.perprice);
                // $("#messagesOKNum").text(advSurplus);
                // $("#messagesBoxNum").text(boxBalance);
                // $("#per-price").val(perPrice);
            } else {
                $("#account-balance").html("0");
                // $("#banner-balance").text("0");
                // $("#peacock-balance").text("0");
                // $("#interstitial-balance").text("0");
                // $("#messagesOKNum").text("0");
                // $("#messagesBoxNum").text("0");
                // $("#per-price").val(0);
            }
        } else {
            $("#account-balance").html("0");
            // $("#banner-balance").text("0");
            // $("#peacock-balance").text("0");
            // $("#interstitial-balance").text("0");
            // $("#messagesOKNum").text("0");
            // $("#messagesBoxNum").text("0");
            // $("#per-price").val(0);
        }
    })
    .fail(function() {
        $("#account-balance").html("0");
        // $("#banner-balance").text("0");
        // $("#peacock-balance").text("0");
        // $("#interstitial-balance").text("0");
        console.log("error");
    });
}

//客户列表（子账号）
var childAccount = {};
childAccount.init = function(){
    var that = this;
    this.pagi = new Pagination("#childAccount-list-pagination");//分页
    //状态下拉
    $(document).on("click", "#child-key-select .dropdown-menu>li", function() {
        $(this).parents("#child-key-select").attr("data-keytype", $(this).attr("data-keytype"));
    });
    //全选
    $("#select-all").on("change", function() {
        if($(this).prop("checked")) {
            $("#childAccount-table").find("input[type='checkbox']").prop("checked", true);
        } else {
            $("#childAccount-table").find("input[type='checkbox']").prop("checked", false);
        }
    });
    //关闭充值提示框
    $("#recharge-content .recharge-cancel").on("click", function() {
        $("#recharge-box").fadeOut();
    });
    $("#recharge-box .recharge-mask").on("click", function() {
        $("#recharge-box").fadeOut();
    });
    //获取下级客户获得的广告条数
    function getSubAdvertNum(rechargeMoney, subPrice){
        var sub_price = (subPrice == "" ? 0 : parseFloat(subPrice));
        if(sub_price == 0){
            return 0;
        }else{
            return Math.floor(parseFloat(rechargeMoney) / sub_price);
        }
    }

    $('input[name="recharge-type"]').on('change', function() {
        var ad_type = $("input[name='recharge-type']:checked").val();
        var rechargeMoney = /^(([1-9]\d{0,9})|0)(\.\d{0,2})?$/.test($("#advert-recharge-money").val())?$("#advert-recharge-money").val():0;
        var advert_num = 0;
        if(ad_type == "1"){
            $("#self-balance").html($("#self-banner-balance").val());
            advert_num = Math.floor(getSubAdvertNum(rechargeMoney, $("#sub-banner-perprice").val()));
            $("#sub-get-num").text(advert_num);
            $("#cost-money").text(getSubAdvertNum(rechargeMoney, $("#sub-banner-perprice").val()) * parseFloat($("#self-banner-perprice").val()));
        }else if(ad_type == "2"){
            $("#self-balance").html($("#self-peacock-balance").val());
            advert_num = Math.floor(getSubAdvertNum(rechargeMoney, $("#sub-peacock-perprice").val()));
            $("#sub-get-num").text(advert_num);
            $("#cost-money").text(getSubAdvertNum(rechargeMoney, $("#sub-peacock-perprice").val()) * parseFloat($("#self-peacock-perprice").val()));
        }else if(ad_type == "3"){
            $("#self-balance").html($("#self-interstitial-balance").val());
            advert_num = Math.floor(getSubAdvertNum(rechargeMoney, $("#sub-interstitial-perprice").val()));
            $("#sub-get-num").text(advert_num);
            $("#cost-money").text(getSubAdvertNum(rechargeMoney, $("#sub-interstitial-perprice").val()) * parseFloat($("#self-interstitial-perprice").val()));
        }else if(ad_type == "4"){
            $("#self-balance").html($("#self-flow-balance").val());
            advert_num = Math.floor(getSubAdvertNum(rechargeMoney, $("#sub-flow-perprice").val()));
            $("#sub-get-num").text(advert_num);
            $("#cost-money").text(getSubAdvertNum(rechargeMoney, $("#sub-flow-perprice").val()) * parseFloat($("#self-flow-perprice").val()));
        }else if(ad_type == "5"){
            $("#self-balance").html($("#self-notice-balance").val());
            advert_num = Math.floor(getSubAdvertNum(rechargeMoney, $("#sub-notice-perprice").val()));
            $("#sub-get-num").text(advert_num);
            $("#cost-money").text(getSubAdvertNum(rechargeMoney, $("#sub-notice-perprice").val()) * parseFloat($("#self-notice-perprice").val()));
        }
    });
    $("#advert-recharge-money").on("blur", function() {
        var ad_type = $("input[name='recharge-type']:checked").val();
        this.value=/^(([1-9]\d{0,9})|0)(\.\d{0,2})?$/.test(this.value) ? this.value : '';
        var rechargeMoney = this.value;
        var advert_num = 0;
        // if(ad_type == "1"){
        //     advert_num = Math.floor(getSubAdvertNum(rechargeMoney, $("#sub-banner-perprice").val()));
        //     $("#sub-get-num").text(advert_num);
        //     $("#cost-money").text(getSubAdvertNum(rechargeMoney, $("#sub-banner-perprice").val()) * parseFloat($("#self-banner-perprice").val()));
        // }else if(ad_type == "2"){
        //     advert_num = Math.floor(getSubAdvertNum(rechargeMoney, $("#sub-peacock-perprice").val()));
        //     $("#sub-get-num").text(advert_num);
        //     $("#cost-money").text(getSubAdvertNum(rechargeMoney, $("#sub-peacock-perprice").val()) * parseFloat($("#self-peacock-perprice").val()));
        // }else if(ad_type == "3"){
        //     advert_num = Math.floor(getSubAdvertNum(rechargeMoney, $("#sub-interstitial-perprice").val()));
        //     $("#sub-get-num").text(advert_num);
        //     $("#cost-money").text(getSubAdvertNum(rechargeMoney, $("#sub-interstitial-perprice").val()) * parseFloat($("#self-interstitial-perprice").val()));
        // }else if(ad_type == "4"){
        //     advert_num = Math.floor(getSubAdvertNum(rechargeMoney, $("#sub-flow-perprice").val()));
        //     $("#sub-get-num").text(advert_num);
        //     $("#cost-money").text(getSubAdvertNum(rechargeMoney, $("#sub-flow-perprice").val()) * parseFloat($("#self-flow-perprice").val()));
        // }else if(ad_type == "5"){
        //     advert_num = Math.floor(getSubAdvertNum(rechargeMoney, $("#sub-notice-perprice").val()));
        //     $("#sub-get-num").text(advert_num);
        //     $("#cost-money").text(getSubAdvertNum(rechargeMoney, $("#sub-notice-perprice").val()) * parseFloat($("#self-notice-perprice").val()));
        // }
    });

    //充值确认
    $("#child-recharge-btn").on("click", function() {
        /*if($("#advert-recharge-num").val() == "" || parseInt($("#advert-recharge-num").val()) == 0) {
            layer.alert("请输入有效的充值条数");
            return;
        }*/
        if($("#advert-recharge-money").val() == "" || parseFloat($("#advert-recharge-money").val()) == 0) {
            layer.alert("请输入有效的充值金额");
            return;
        }
        that.bindRechargeEvent();
    });
    //关闭删除提示框
    $("#del-child-content .del-cancel").on("click", function() {
        $("#del-child-box").fadeOut();
    });
    $("#del-child-box .del-ad-mask").on("click", function() {
        $("#del-child-box").fadeOut();
    });
    //批量删除
    $("#all-delete-btn").on("click", function() {
        var childArr = [];
        $("#childAccount-table tbody tr td").find("input[type='checkbox']:checked").each(function() {
            childArr.push(parseInt($(this).val()));
        });
        $("#child-del-btn").attr('data-childuid', childArr).attr('data-deltype', 'many');
        $("#del-child-box").fadeIn();
    });
    //单个删除
    $("#child-del-btn").on("click", function() {
        var sub_id = '[' + $(this).attr('data-childuid') + ']';
        that.deleteChildAccount(sub_id);
    });
    //查询按钮
    $("#child-search-btn").on("click", function() {
        that.getChildListData(1);
    });
    this.getChildListData(1);
}
//获取客户列表数据
childAccount.getChildListData = function(pageNo){
    $('.loading-area').fadeIn();
    var pageDataCount = 15;//每页数量（可拓展为参数）
    var searchType = $("#child-key-select").attr("data-keytype");
    var searchNameText = "";//昵称
    var searchPhoneText = "";//手机
    if(searchType == "name"){
        searchNameText = $("#key-word").val();
    }else if(searchType == "phone"){
        searchPhoneText = $("#key-word").val();
    }
    $.ajax({
        url: BASEURL + 'account/getSubAccounts',
        type: 'POST',
        dataType: 'json',
        data: {
            user_id : '',//子账号id（没有则为空）
            key_word : searchNameText,//搜索关键字(昵称)
            key_phone : searchPhoneText,//搜索关键字（手机）
            page_index : pageNo,//页码（1开始）
            num_perpage : pageDataCount//每页数目
        }
    })
    .done(function(data) {
        console.log(data);
        if(data.success) {
            if(data.result.sub_lists.length > 0){
                //渲染
                $("#childAccount-no-data").hide();
                $("#childAccount-page-show").show();
                $("#child-totalCount").text(data.result.sub_num);
                var pageCount = Math.ceil(data.result.filter_count / pageDataCount);//计算总页数
                var subtypeArr = ["", "", "广告主", "开发者", "代理商", "代理商", "代理商"];//客户身份数组
                var html = "";
                for(var i = 0, len = data.result.sub_lists.length; i < len; i++) {
                    var info = data.result.sub_lists[i];
                    var createDate = info.create_date == null ? "—— ——" : info.create_date;//添加日期
                    var advertiserId = info.advertiser_id;//广告主id
                    var compSname = info.comp_sname == null ? "暂无账号名称" : info.comp_sname;//客户简称
                    var nickName = info.client_sname == null ? "暂无联系人" : info.client_sname;//联系人姓名
                    var subPhone = info.client_phone == null ? "—— ——" : info.client_phone;//联系人手机
                    var showPhone = info.comp_sname == null ? info.client_phone : info.comp_sname;//展示手机
                    var sceneAuth = info.scene_auth == 1 ? "已开通" : "未开通";//场景共享权限（芯片管理）
                    var advertiseAuth = info.advertise_auth == 1 ? "已开通" : "未开通";//广告权限
                    var sceneNum = info.scene_num == null ? "暂无" : info.scene_num;//场景数量
                    var validCount = info.valid_count == null ? 0 : info.valid_count;//播放广告数
                    var closeCount = info.close_count == null ? 0 : info.close_count;//暂停广告数
                    var bannerPrice = info.banner_price == null ? 0 : info.banner_price;//横幅广告单价
                    var peacockPrice = info.open_screen_price == null ? 0 : info.open_screen_price;//开屏广告单价
                    var interstitialPrice = info.insert_screen_price == null ? 0 : info.insert_screen_price;//插屏广告单价
                    var advertisePrice = info.advertise_price == null ? 0 : info.advertise_price;//APP广告单价
                    var flowPrice = info.flow_information_price == null ? 0 : info.flow_information_price;//信息流广告单价
                    var friendsPrice = info.circle_friends_price == null ? 0 : info.circle_friends_price;//朋友圈广告单价
                    var noticePrice = info.notice_board_price == null ? 0 : info.notice_board_price;//通知栏广告单价
                    var boxadRemain = info.boxad_remain == null ? 0 : info.boxad_remain;//剩余盒子广告数
                    var boxPerprice = info.box_perprice == null ? 0 : info.box_perprice;//盒子单价
                    var boxNum = info.box_num == null ? 0 : info.box_num;//盒子数量
                    var boxAdperprice = info.box_adperprice == null ? 0 : info.box_adperprice;//盒子广告单价
                    var balance = info.balance == null ? 0 : info.balance;//余额
                    var advertSurplus = 0;//广告剩余条数
                    var subtype = info.subtype == null ? "暂无" : subtypeArr[info.subtype];//客户身份
                    var accountType = 2;//2代表广告主，4代表代理商
                    if(subtype == "代理商"){
                        accountType = 4;
                    }else if(subtype == "广告主"){
                        accountType = 2; 
                    }
                    var agent_area = info.agent_area == null ? "暂无" : info.agent_area;
                    var agent_industry = info.agent_industry == "" ? "暂无" : info.agent_industry;
                    if(advertisePrice > 0 && advertisePrice != undefined && !isNaN(advertisePrice)){
                        advertSurplus = parseInt(balance / advertisePrice);
                    }
                    var detailJson = '{"compSname":"' + compSname + '", "subtype":"' + subtype + '", "agent_area":"' + agent_area + '", ';
                    detailJson += '"nickName":"' + nickName + '", "subPhone": "' + subPhone + '", "createDate": "' + createDate + '", ';
                    detailJson += '"agent_industry":"' + agent_industry + '", "balance":"￥' + balance + '元", "advertisePrice":"￥' + advertisePrice + '元", ';
                    detailJson += '"bannerPrice":"￥' + bannerPrice + '元", "peacockPrice":"￥' + peacockPrice + '元", "interstitialPrice":"￥' + interstitialPrice + '元", "flowPrice":"￥' + flowPrice + '元", "noticePrice":"￥' + noticePrice + '元", ';
                    detailJson += '"boxadRemain":"' + boxadRemain + '", "boxPerprice":"￥' + boxPerprice + '元", "boxNum":"' + boxNum + '", "boxAdperprice":"￥' + boxAdperprice + '元" }';
                    html += '<tr>';
                    html += '<td><input type="checkbox" id="child-account-' + advertiserId + '" class="regular-checkbox" name="child-account-' + advertiserId + '" value="' + advertiserId + '"><label for="child-account-' + advertiserId + '"></label><label for="child-account-' + advertiserId + '">' + compSname + '</label></td>';
                    //html += '<td>' + nickName + '<br>' + subPhone + '</td>';//联系人
                    html += '<td>' + subtype + '</td>';//客户身份
                    html += '<td>' + agent_area + '</td>';//所属区域
                    html += '<td>' + agent_industry + '</td>';//所属行业
                    // html += '<td>' + sceneAuth + '</td>';//场景管理
                    // html += '<td>' + sceneNum + '</td>';//场景个数
                    // html += '<td>' + advertiseAuth + '</td>';//广告管理
                    // html += '<td>' + advertisePrice + '</td>';//广告单价
                    /*html += '<td>' + validCount + '</td>';//播出广告数
                    html += '<td>' + closeCount + '</td>';//暂停广告数*/
                    html += '<td>' + balance + '</td>';//账户余额（元）
                    // html += '<td>' + advertSurplus + '</td>';//剩余广告数
                    html += '<td>' + createDate + '</td>';//添加日期
                    html += '<td class="td_hidden">' + detailJson + '</td>';//详细信息
                    html += '<td><span class="info-btn fa fa-info-circle" token="" data-tipso="详情" title="详情"></span>';
                    html += '<span class="recharge-btn fa fa-cny" data-childuid="' + advertiserId + '" data-childPhone="' + showPhone + '" data-tipso="充值"></span>';
                    html += '<span class="edit-btn fa fa-pencil" data-childuid="' + advertiserId + '" data-childPhone="' + showPhone + '" data-tipso="编辑"></span>';
                    html += '<span class="delete-btn fa fa-trash" data-childuid="' + advertiserId + '" data-childPhone="' + showPhone + '" data-tipso="删除"></span>';
                    html += '<a target="_blank" href="javascript:;" class="goTo-childAccount" data-childuid="' + advertiserId + '" data-childPhone="' + showPhone + '" data-area="' + agent_area + '" data-accType="' + accountType + '">进入账号</a></td>';
                    html += '</tr>';
                }
                $("#childAccount-table>tbody").html(html);
                $('#childAccount-table tbody tr td .fa').tipso({
                    useTitle: false,
                    width: 'auto',
                    position: 'bottom',
                    background: '#626262'
                });
                //进入客户
                $(".goTo-childAccount").on("click", function() {
                    this.href = BASEURL + "accounts/"+$(this).attr("data-childuid") + "/"+$(this).attr("data-childPhone") + "/" + $(this).attr("data-accType") + "/" + $(this).attr("data-area") + "/" + BASEINDEX;
                    console.log(this.href);
                });
                //查看详情按钮
                $("#childAccount-table tbody tr td .info-btn").on("click", function() {
                    var data = JSON.parse($(this).parent().parent().children('.td_hidden').text());
                    var $content = $('#info-user-content .info_container');
                    $content.children().remove();
                    var show = [
                        { key: 'compSname', name: '帐号名称' },
                        { key: 'subtype', name: '客户身份' },
                        { key: 'agent_area', name: '所属区域' },
                        { key: 'agent_industry', name: '所属行业' },
                        { key: 'balance', name: '账户余额' },
                        { key: 'nickName', name: '联系人姓名' },
                        { key: 'subPhone', name: '联系方式' },
                        { key: 'createDate', name: '添加日期' }
                        // { key: 'boxadRemain', name: '剩余盒子广告数' },
                        // { key: 'boxPerprice', name: '盒子单价' },
                        // { key: 'boxNum', name: '盒子数量' },
                        // { key: 'advertisePrice', name: 'APP广告单价' },
                        // { key: 'bannerPrice', name: '横幅广告单价' },
                        // { key: 'peacockPrice', name: '开屏广告单价' },
                        // { key: 'interstitialPrice', name: '插屏广告单价' },
                        // { key: 'flowPrice', name: '信息流广告单价' },
                        // { key: 'friendsPrice', name: '朋友圈广告单价' },
                        // { key: 'noticePrice', name: '通知栏广告单价' }
                        // { key: 'boxAdperprice', name: '盒子广告单价' }
                    ];
                    for (var i = 0; i < show.length; i++) {
                        var key = show[i].key;
                        var name = show[i].name;
                        var value = data[key];
                        $content.append('<div class="content" style="padding: 0 50px;">\
                            <span class="name">' + name + '</span>\
                            <span class="value">' + value + '</span>\
                        </div>');
                    }
                    $("#info-user-box").fadeIn();
                });
                $('.info-cancel, .info-user-mask').click(function(event) {
                    $('#info-user-box').fadeOut();
                });
                //删除按钮
                $("#childAccount-table tbody tr td .delete-btn").on("click", function() {
                    $("#child-del-btn").attr('data-childuid', $(this).attr('data-childuid')).attr('data-deltype', 'one');
                    $("#del-child-box").fadeIn();
                });
                //编辑按钮
                $("#childAccount-table tbody tr td .edit-btn").on("click", function() {
                    window.location.href = BASEURL + "CustomerEdit/" + $(this).attr('data-childuid');
                });

                //充值按钮
                $("#childAccount-table tbody tr td .recharge-btn").on("click", function() {
                    var childData = JSON.parse($(this).parent().parent().children('.td_hidden').text());
                    var sub_banner_price = childData.bannerPrice.replace("￥","").replace("元","");
                    var sub_peacock_price = childData.peacockPrice.replace("￥","").replace("元","");
                    var sub_interstitial_price = childData.interstitialPrice.replace("￥","").replace("元","");
                    var sub_flow_price = childData.flowPrice.replace("￥","").replace("元","");
                    var sub_notice_price = childData.noticePrice.replace("￥","").replace("元","");
                    $("#child-phone").text($(this).attr('data-childPhone'));
                    $("#child-recharge-btn").attr('data-childuid', $(this).attr('data-childuid')).attr('data-childPhone', $(this).attr('data-childPhone'));
                    $.ajax({
                        url: BASEURL + 'account/showAgentCashBalance',
                        type: 'POST',
                        dataType: 'json'
                    })
                    .done(function(data) {
                        if(data.success) {
                            //渲染
                            console.log(data);
                            if(data.errCode == 200) {
                                var balance = data.errMsg.balance == null ? 0 : data.errMsg.balance;
                                $("#self-balance").html(balance);
                                $("#self-zong-balance").val(balance);
                                // if(data.errMsg.perprice == null) {
                                //     layer.alert("广告单价不存在，请联系客服");
                                //     return;
                                // }
                                // var bannerBalance = data.errMsg.ad_banner_balance == null ? 0 : data.errMsg.ad_banner_balance;//横幅广告余额
                                // var peacockBalance = data.errMsg.ad_open_screen_balance == null ? 0 : data.errMsg.ad_open_screen_balance;//开屏广告余额
                                // var interstitialBalance = data.errMsg.ad_insert_screen_balance == null ? 0 : data.errMsg.ad_insert_screen_balance;//插屏广告余额
                                // var flowBalance = data.errMsg.ad_flow_balance == null ? 0 : data.errMsg.ad_flow_balance;//信息流广告余额
                                // var barBalance = data.errMsg.ad_bar_balance == null ? 0 : data.errMsg.ad_bar_balance;//通知栏广告余额
                                // var groupBalance = data.errMsg.ad_group_balance == null ? 0 : data.errMsg.ad_group_balance;//朋友圈广告余额
                                
                                // var bannerPrice = data.errMsg.bannerPrice == null ? 0 : data.errMsg.bannerPrice;//横幅广告单价
                                // var openScreenPrice = data.errMsg.openScreenPrice == null ? 0 : data.errMsg.openScreenPrice;//开屏广告单价
                                // var insertScreenPrice = data.errMsg.insertScreenPrice == null ? 0 : data.errMsg.insertScreenPrice;//插屏广告单价
                                // var flowPrice = data.errMsg.flowPrice == null ? 0 : data.errMsg.flowPrice;//信息流广告单价
                                // var barPrice = data.errMsg.barPrice == null ? 0 : data.errMsg.barPrice;//通知栏广告单价
                                // var perPrice = data.errMsg.perprice == null ? 0 : data.errMsg.perprice;
                                // //本账户余额
                                // $("#self-balance").html(bannerBalance);
                                // $("#self-banner-balance").val(bannerBalance);
                                // $("#self-peacock-balance").val(peacockBalance);
                                // $("#self-interstitial-balance").val(interstitialBalance);
                                // $("#self-flow-balance").val(flowBalance);
                                // $("#self-notice-balance").val(barBalance);
                                // //本账户单价
                                // $("#advert_price").val(bannerPrice);
                                // $("#self-banner-perprice").val(bannerPrice);
                                // $("#self-peacock-perprice").val(openScreenPrice);
                                // $("#self-interstitial-perprice").val(insertScreenPrice);
                                // $("#self-flow-perprice").val(flowPrice);
                                // $("#self-notice-perprice").val(barPrice);
                                // //客户广告单价
                                // $("#sub-banner-perprice").val(sub_banner_price);
                                // $("#sub-peacock-perprice").val(sub_peacock_price);
                                // $("#sub-interstitial-perprice").val(sub_interstitial_price);
                                // $("#sub-flow-perprice").val(sub_flow_price);
                                // $("#sub-notice-perprice").val(sub_notice_price);
                            } else {
                                $("#self-finance-surplus").html("获取失败");
                                $("#self-perprice").html("—— ——");
                            }
                        } else {
                            $("#self-finance-surplus").html("获取失败");
                            $("#self-perprice").html("—— ——");
                        }
                        $("#recharge-box").fadeIn();
                    })
                    .fail(function() {
                        console.log("error");
                        $("#self-finance-surplus").html("获取失败");
                        $("#self-perprice").html("—— ——");
                        $("#recharge-box").fadeIn();
                    });
                    $("#advert-recharge-money").focus();
                });
                //分页
                childAccount.pagi.update({
                    pageCount: pageCount,
                    pageNo: pageNo
                });
                //分页点击
                var activePage = parseInt($("#childAccount-list-pagination .pagination>.active").text());
                activePage = activePage ? activePage : 1;
                $(document).off("click", "#childAccount-list-pagination .pagination>li").on("click", "#childAccount-list-pagination .pagination>li", function() {
                    childAccount.getChildListData(parseInt($(this).text()));
                });
                $(document).off("click",  "#childAccount-list-pagination .pagination-prev").on("click", "#childAccount-list-pagination .pagination-prev", function() {
                    if(activePage > 1) {
                        childAccount.getChildListData(activePage - 1);
                    }
                });
                $(document).off("click", "#childAccount-list-pagination .pagination-next").on("click", "#childAccount-list-pagination .pagination-next", function() {
                    if(pageCount - activePage  > 0) {
                        childAccount.getChildListData(activePage + 1);
                    }
                });
            }else{
                //暂无数据
                $("#child-totalCount").text("0");
                $("#childAccount-table>tbody").html("");
                $("#childAccount-no-data").show();
                $("#childAccount-page-show").hide();
            }
            //结束
        }else{
            if(data.errMsg == "没有信息"){
                $("#child-totalCount").text("0");
                $("#childAccount-table>tbody").html("");
                $("#childAccount-no-data").show();
                $("#childAccount-page-show").hide();
            }
        }
        $('.loading-area').fadeOut();
    })
    .fail(function() {
        console.log("error");
        $('.loading-area').fadeOut();
    });
}
childAccount.bindRechargeEvent = function() {
    // if(!checkTotalNum($("#sub-get-num").text())){
    //     return;
    // }
    $('.loading-area').fadeIn();
    $.ajax({
        /*url: BASEURL + 'account/rechargeForSubAccount',
        type: 'POST',
        dataType: 'json',
        data: {
            sub_id: $("#child-recharge-btn").attr("data-childuid"),
            ad_num: $("#advert-recharge-num").val(),
            ad_perprice: $("#self-perprice").text(),
            ad_type: $("input[name='recharge-type']:checked").val()
        }*/
        url: BASEURL + 'account/rechargeToSubAccount',
        type: 'POST',
        dataType: 'json',
        data: {
            user_id: $("#child-recharge-btn").attr("data-childuid"),
            money: $("#advert-recharge-money").val()//,
            // ad_type: $("input[name='recharge-type']:checked").val()
        }
    })
    .done(function(data) {
        if(data.success) {
            //渲染
            if(data.errCode == 200) {
                layer.msg('充值成功', {icon: 6,time:2000}, function(){
                    window.location.reload();
                });
            } else {
                layer.msg('充值失败', {icon: 5,time:2000});
            }
        } else {
            layer.msg(data.errMsg, {icon: 5,time:2000});
        }
        $('.loading-area').fadeOut();
        $("#recharge-box").fadeOut();
    })
    .fail(function(data) {
        console.log("error");
        $('.loading-area').fadeOut();
        layer.msg('充值失败', {icon: 5,time:2000});
    });
    //检查是否超过最大数量
    function checkTotalNum(ad_num){
        var ad_type = $("input[name='recharge-type']:checked").val();
        var money = 0;//余额
        var price = 0;//单价
        if(ad_type == "1"){
            money = parseFloat($("#self-banner-balance").val());
            price = parseFloat($("#self-banner-perprice").val());
        } else if(ad_type == "2"){
            money = parseFloat($("#self-peacock-balance").val());
            price = parseFloat($("#self-peacock-perprice").val());
        } else if(ad_type == "3"){
            money = parseFloat($("#self-interstitial-balance").val());
            price = parseFloat($("#self-interstitial-perprice").val());
        } else if(ad_type == "4"){
            money = parseFloat($("#self-flow-balance").val());
            price = parseFloat($("#self-flow-perprice").val());
        } else if(ad_type == "5"){
            money = parseFloat($("#self-notice-balance").val());
            price = parseFloat($("#self-notice-perprice").val());
        }
        
        if(price > 0){
            var totalNum = parseInt(money / price);
            if(parseInt(ad_num) > totalNum){
                layer.msg('充值条数不能大余最大值：' + totalNum + '条', {icon: 5,time:2000});
                return false;
            } else{
                return true;
            }
        } else {
            return false;
        }
    }
}

//批量删除
childAccount.deleteChildAccount = function(childArr){
    $('.loading-area').fadeIn();
    $.ajax({
        url: BASEURL + 'account/agentCancelLinkSubAcount',
        type: 'POST',
        dataType: 'json',
        data: {
            sub_ids : childArr
        }
    })
    .done(function(data) {
        if(data.result) {
            $("#del-child-box").fadeOut();
            layer.msg("删除成功！");
            childAccount.getChildListData(1);//广告列表
        } else {
            $('.loading-area').fadeOut();
            layer.msg("删除失败！"+data.errMsg);
        }
    })
    .fail(function(data) {
        $('.loading-area').fadeOut();
        layer.msg("删除失败！");
        console.log("error");
    });
}

//客户编辑
var customserEdit = {};
customserEdit.init = function(){
    var that = this;
    //是否勾选广告管理权限
    $("#message-manage").on("change", function() {
        if($(this).prop("checked")) {
            $("#banner-price").removeAttr('readonly');
            $("#banner-price").removeClass('no-drop');
            $("#banner-price").focus();
            
            $("#peacock-price").removeAttr('readonly');
            $("#peacock-price").removeClass('no-drop');
            
            $("#interstitial-price").removeAttr('readonly');
            $("#interstitial-price").removeClass('no-drop');

            $("#message-price").removeAttr('readonly');
            $("#message-price").removeClass('no-drop');

            $("#flow-price").removeAttr('readonly');
            $("#flow-price").removeClass('no-drop');
            
            $("#friends-price").removeAttr('readonly');
            $("#friends-price").removeClass('no-drop');
            
            $("#notice-price").removeAttr('readonly');
            $("#notice-price").removeClass('no-drop');

            $("#box-message-price").removeAttr('readonly');
            $("#box-message-price").removeClass('no-drop');
        } else {
            $("#banner-price").attr("readonly", "readonly");
            $("#banner-price").val("");
            $("#banner-price").addClass('no-drop');

            $("#peacock-price").attr("readonly", "readonly");
            $("#peacock-price").val("");
            $("#peacock-price").addClass('no-drop');

            $("#interstitial-price").attr("readonly", "readonly");
            $("#interstitial-price").val("");
            $("#interstitial-price").addClass('no-drop');

            $("#message-price").attr("readonly", "readonly");
            $("#message-price").val("");
            $("#message-price").addClass('no-drop');

            $("#flow-price").attr("readonly", "readonly");
            $("#flow-price").val("");
            $("#flow-price").addClass('no-drop');
            
            $("#friends-price").attr("readonly", "readonly");
            $("#friends-price").val("");
            $("#friends-price").addClass('no-drop');
            
            $("#notice-price").attr("readonly", "readonly");
            $("#notice-price").val("");
            $("#notice-price").addClass('no-drop');

            $("#box-message-price").attr("readonly", "readonly");
            $("#box-message-price").val("");
            $("#box-message-price").addClass('no-drop');
        }
    });
    $("input[name='user-type']").on("change", function() {
        if($("#user-type-1").prop("checked")) {
            $(".vital-row.agent-area").show();
            $(".vital-row.agent-industry").show();
        } else {
            $(".vital-row.agent-area").hide();
            $(".vital-row.agent-industry").hide();
        }
    });
    var sub_id = $("#childAccount-id").val();
    if(sub_id == ""){
        layer.ready(function(){
            layer.msg('获取信息失败，请返回重试', {icon: 5,time:2000}, function(){
                window.location.href = BASEURL + 'childAccountList';
            });
        });
    }else{
        that.getChildDetails(sub_id);
    }
    //保存按钮
    $("#submit-button").on("click", function() {
        that.saveChildInfo(sub_id);
    });
}
//获取客户详细信息
customserEdit.getChildDetails = function(sub_id){
    $('.loading-area').fadeIn();
    $.ajax({
        url: BASEURL + 'account/getSubRelateInfo',
        type: 'POST',
        dataType: 'json',
        data: {
            user_id: sub_id
        },
    })
    .done(function(data) {
        console.log(data);
        if (data.success) {
            var cur_addr = data.result.client_addr == null ? "" : data.result.client_addr;
            $("#conpany-name").val(data.result.client_comp);//客户公司名称
            $("#conpany-addr").val(cur_addr.substring(0, cur_addr.indexOf("-")));//省市区地址
            $(".city-picker-span .placeholder").text(cur_addr.substring(0, cur_addr.indexOf("-")));
            $("#conpany-addr-detail").val(cur_addr.substring(cur_addr.indexOf("-")+1));//详细地址
            $("#phone-num").val(data.result.client_phone);//子账号手机号
            $('#nick-name').val(data.result.name);//客户简称
            $("#contacts-people").val(data.result.client_sname);//联系人姓名
            customserEdit.getAgentZone();
            $("#agent-area").attr("data-area", data.result.agent_area);
            $("#agent-area .dropdown-toggle").text((data.result.area?data.result.area:"暂无"));
            $("#agent-area").on("click", ".dropdown-menu>li", function() {
                $("#agent-area").attr("data-area", $(this).attr("data-area"));
            });
            $("#agent-industry").val(data.result.agent_industry);
            $("input[name='user-type']").prop("checked", false);
            var user_type = data.result.user_type == null || data.result.user_type == 2 ? 0 : 1;
            $("#user-type-"+ user_type).prop("checked", true);
            data.result.share_permit == 1 ? $("#share-scene").attr('checked', 'checked') : "";//共享场景数据权限(1：有权限)
            data.result.ad_permit == 1 ? $("#message-manage").attr('checked', 'checked') : "";//广告管理权限（1：有权限）
            if(data.result.ad_permit == 1){
                $('#banner-price').val(data.result.banner_price);//横幅广告单价
                $('#peacock-price').val(data.result.open_screen_price);//开屏广告单价
                $('#interstitial-price').val(data.result.insert_screen_price);//插屏广告单价
                $('#message-price').val(data.result.ad_perprice);//APP广告单价
                $('#flow-price').val(data.result.flow_information_price);//信息流广告单价
                $('#friends-price').val(data.result.circle_friends_price);//朋友圈广告单价
                $('#notice-price').val(data.result.notice_board_price);//通知栏广告单价
                $("#box-message-price").val(data.result.ad_box_perprice); //盒子单价
            }else{
                $("#banner-price").attr("readonly", "readonly");
                $("#peacock-price").attr("readonly", "readonly");
                $("#interstitial-price").attr("readonly", "readonly");
                $("#message-price").attr("readonly", "readonly");
                $("#flow-price").attr("readonly", "readonly");
                $("#friends-price").attr("readonly", "readonly");
                $("#notice-price").attr("readonly", "readonly");
                $("#box-message-price").attr("readonly", "readonly");
                $("#banner-price").val("");
                $("#peacock-price").val("");
                $("#interstitial-price").val("");
                $("#message-price").val("");
                $("#flow-price").val("");
                $("#friends-price").val("");
                $("#notice-price").val("");
                $("#box-message-price").val("");
                $("#banner-price").addClass('no-drop');
                $("#peacock-price").addClass('no-drop');
                $("#interstitial-price").addClass('no-drop');
                $("#message-price").addClass('no-drop');
                $("#flow-price").addClass('no-drop');
                $("#friends-price").addClass('no-drop');
                $("#notice-price").addClass('no-drop');
                $("#box-message-price").addClass('no-drop');
            }
            var chip_type = data.result.chip_type == null || data.result.chip_type == 0 ? 0 : 1;
            $("input[name='box-type']").prop("checked", false);
            $("#box-type-"+ chip_type).prop("checked", true);
            $('#unit-price').val(data.result.chip_perprice);//芯片单价
            $('#hardware-num').val(data.result.chip_num);//芯片数量

            if($("#user-type-1").prop("checked")) {
                $(".vital-row.agent-area").show();
                $(".vital-row.agent-industry").show();
            } else {
                $(".vital-row.agent-area").hide();
                $(".vital-row.agent-industry").hide();
            }
        } else {
            layer.msg(data.errMsg, {icon: 5,time:2000});
        }
        $('.loading-area').fadeOut();
    })
    .fail(function(data) {
        console.log(data);
        console.log("error");
        $('.loading-area').fadeOut();
        layer.msg('读取子账号信息失败，请刷新重试', {icon: 5,time:2000});
    });
}
//保存客户信息
customserEdit.saveChildInfo = function(sub_id){
    var companyName = $("#conpany-name").val();//公司名称
    var companyAddr = $("#conpany-addr").val() + "-" + $("#conpany-addr-detail").val();//公司地址
    var clientSname = $("#contacts-people").val();//客户简称
    var childphone = $('#phone-num').val();//子账号
    var nickname = $('#contacts-people').val();//昵称
    var scene_powers = $("#share-scene").prop("checked") == true ? 1 : 0;//共享场景数据权限(0:没权限，1:有权限)
    var ad_powers = $("#message-manage").prop("checked") == true ? 1 : 0;//广告管理权限(0:没权限，1:有权限)
    var banner_price = 0;//横幅广告单价
    var peacock_price = 0;//开屏广告单价
    var interstitial_price = 0;//插屏广告单价
    var ad_price = 0;//APP广告单价
    var flow_price = 0;//信息流广告单价
    var friends_price = 0;//朋友圈广告单价
    var notice_price = 0;//通知栏广告单价
    if(ad_powers == 1){
        banner_price = $('#banner-price').val();
        peacock_price = $('#peacock-price').val();
        interstitial_price = $('#interstitial-price').val();
        ad_price = $('#message-price').val();
        flow_price = $('#flow-price').val();
        friends_price = $('#friends-price').val();
        notice_price = $('#notice-price').val();
    }
    var boxMessagePrice = $('#box-message-price').val(); //盒子广告单价
    var chip_price = $('#unit-price').val();//芯片单价
    var chipNum = $('#hardware-num').val();//芯片数量
    if (!childphone) {
        layer.msg('请输入正确的子账号', {icon: 5,time:2000});
        $('#child-phone').focus();
        return;
    }
    if (!nickname) {
        layer.msg('请输入正确的账号昵称', {icon: 5,time:2000});
        $('#nick-name').focus();
        return;
    }
    // if(!$("#box-type-0").prop("checked") && !$("#box-type-1").prop("checked")){
    //     layer.msg('请选择单价类型', {icon: 5,time:2000});
    //     return;
    // }
    // if (ad_powers == 1 && !banner_price){
    //     layer.msg('请输入正确的横幅广告单价', {icon: 5,time:2000});
    //     $('#banner-price').focus();
    //     return;
    // }
    // if (ad_powers == 1 && !peacock_price){
    //     layer.msg('请输入正确的开屏广告单价', {icon: 5,time:2000});
    //     $('#peacock-price').focus();
    //     return;
    // }
    // if (ad_powers == 1 && !interstitial_price){
    //     layer.msg('请输入正确的插屏广告单价', {icon: 5,time:2000});
    //     $('#interstitial-price').focus();
    //     return;
    // }
    // if (ad_powers == 1 && !ad_price){
    //     layer.msg('请输入正确的APP广告单价', {icon: 5,time:2000});
    //     $('#message-price').focus();
    //     return;
    // }
    // if (ad_powers == 1 && !flow_price){
    //     layer.msg('请输入正确的信息流广告单价', {icon: 5,time:2000});
    //     $('#flow-price').focus();
    //     return;
    // }
    /*if (ad_powers == 1 && !friends_price){
        layer.msg('请输入正确的朋友圈广告单价', {icon: 5,time:2000});
        $('#friends-price').focus();
        return;
    }*/
    // if (ad_powers == 1 && !notice_price){
    //     layer.msg('请输入正确的通知栏广告单价', {icon: 5,time:2000});
    //     $('#notice-price').focus();
    //     return;
    // }
    $('.loading-area').fadeIn();
    $.ajax({
        url: BASEURL + 'account/updateSubAccount',
        type: 'POST',
        dataType: 'json',
        data: {
            client_addr: companyAddr,//客户公司地址
            client_comp: companyName,//客户公司名称
            client_phone: childphone,//联系人手机
            client_sname: clientSname,//联系人姓名
            share_permit: scene_powers,//场景管理
            ad_permit: ad_powers,//广告管理
            banner_price: banner_price,//横幅广告单价
            open_screen_price: peacock_price,//开屏广告单价
            insert_screen_price: interstitial_price,//插屏广告单价
            ad_perprice: ad_price,//APP广告价格
            flow_information_price: flow_price,//信息流广告单价
            circle_friends_price: friends_price,//朋友圈广告单价
            notice_board_price: notice_price,//通知栏广告单价
            chip_perprice: chip_price,//芯片单价
            chip_num: chipNum,//芯片数量
            sub_id: sub_id,//子帐号id
            user_type: $("input[name='user-type']:checked").val(),//用户类型
            agent_area: $("#agent-area").attr("data-area"),//代理区域
            agent_industry: $("#agent-industry").val(),

            ad_box_perprice: boxMessagePrice, //客户盒子广告单价 new
            chip_type: $("input[name='box-type']:checked").val()//用户单价类型 0购买 1租用 new
        },
    })
    .done(function(data) {
        if (data.success) {
            layer.msg('编辑子账号完成', {icon: 6,time:2000},function(){
                window.location.href = BASEURL + 'childAccountList';
            });
        } else {
            layer.msg(data.errMsg, {icon: 5,time:2000});
        }
        $('.loading-area').fadeOut();
    })
    .fail(function(data) {
        console.log("error");
        $('.loading-area').fadeOut();
        layer.msg('编辑子账号失败，请刷新重试', {icon: 5,time:2000});
    });
}
customserEdit.getAgentZone = function() {
    $.ajax({
        url: BASEURL + 'account/getAreas',
        type: 'POST',
        dataType: 'json',
        data: {}
    })
    .done(function(data) {
        console.log(data);
        if (data.success) {
            var zone = data.result;
            var html = [];
            for (var i = 0, len = zone.length; i < len; i++) {
                html.push('<li id="zone-' + zone[i].id + '" data-area="' + zone[i].id + '"><a>' + zone[i].name + '</a></li>');
            }
            $("#agent-area").children(".dropdown-content").children(".dropdown-menu").html(html.join(""));
        } else {
            console.log("error");
        }
    })
    .fail(function() {
        console.log("error");
    });
}


// 完善信息
var information = {};
information.init = function(){
    var that = this;
    var sceneStatus = parseInt($("#scene-status").val());//状态，0表示完善，1表示修改
    $(".loading-area").fadeIn();
    $.ajax({
        url: BASEURL + 'admin/api/getScenesAtData',
        type: 'POST',
        dataType: 'json'
    })
    .done(function(data) {
        console.log(data);
        if(data.success){
            var parents = data.result;
            var html = "";
            var firstSceneAt = firstSceneAt1 = '<div class="scene-item">';//一级类型
            var secondSceneAt = secondSceneAt1 = '<div class="second-level">';//二级类型
            for(var i = 0, ilen = parents.length; i < ilen; i++) {
                var lv2 = parents[i].children;//二级
                if(i < 7){
                    firstSceneAt += '<a href="javascript:;" class="'+that.getSceneAtIcon(parents[i].name)+'" data-second="scene-item-'+parents[i].id+'" data-bigid="'+parents[i].id+'">'+parents[i].name+'</a>';
                    if(lv2 != null) {
                        secondSceneAt += '<div class="second-level-item" id="scene-item-'+parents[i].id+'"><ul class="clearfix">';
                        for(var j = 0, jlen = lv2.length; j < jlen; j++) {
                            var lv3 = lv2[j].children;
                            secondSceneAt += '<li><span data-atid="'+lv2[j].id+'">'+lv2[j].name+'</span>';
                            if(lv3 != null) {
                                secondSceneAt += '<ul class="three-level-item clearfix" style="display: none;">';
                                for(var k = 0, klen = lv3.length; k < klen; k++) {
                                    secondSceneAt += '<li><a href="javascript:;" data-atid="' + lv3[k].id + '">' + lv3[k].name + '</a></li>';
                                }
                                secondSceneAt += '</ul>';
                            }
                            secondSceneAt += '</li>';
                        }
                        secondSceneAt += '</ul></div>';
                    }
                } else if(i < 14){
                    firstSceneAt1 += '<a href="javascript:;" class="'+that.getSceneAtIcon(parents[i].name)+'" data-second="scene-item-'+parents[i].id+'" data-bigid="'+parents[i].id+'">'+parents[i].name+'</a>';
                    if(lv2 != null) {
                        secondSceneAt1 += '<div class="second-level-item" id="scene-item-'+parents[i].id+'"><ul class="clearfix">';
                        for(var j = 0, jlen = lv2.length; j < jlen; j++) {
                            var lv3 = lv2[j].children;
                            secondSceneAt1 += '<li><span data-atid="'+lv2[j].id+'">'+lv2[j].name+'</span>';
                            if(lv3 != null) {
                                secondSceneAt1 += '<ul class="three-level-item clearfix" style="display: none;">';
                                for(var k = 0, klen = lv3.length; k < klen; k++) {
                                    secondSceneAt1 += '<li><a href="javascript:;" data-atid="' + lv3[k].id + '">' + lv3[k].name + '</a></li>';
                                }
                                secondSceneAt1 += '</ul>';
                            }
                            secondSceneAt1 += '</li>';
                        }
                        secondSceneAt1 += '</ul></div>';
                    }
                    //end
                }
            }
        }
        //
        var AllSceneAt = '';//大的父级
        // var firstSceneAt = firstSceneAt1 = '<div class="scene-item">';//一级类型
        // var secondSceneAt = secondSceneAt1 = '<div class="second-level">';//二级类型
        // var asdfas = data.result[0].length;
        // for(var i = 0; i < data.result[0].length; i++){
        //  if(i < 7){
        //      firstSceneAt += '<a href="javascript:;" class="'+that.getSceneAtIcon(data.result[0][i].scenes_name)+'" data-second="scene-item-'+data.result[0][i].scenes_id+'" data-bigid="'+data.result[0][i].scenes_id+'">'+data.result[0][i].scenes_name+'</a>';
        //      secondSceneAt += '<div class="second-level-item clearfix" id="scene-item-'+data.result[0][i].scenes_id+'">';
        //      var index = parseInt(data.result[0][i].scenes_id);
        //      for(var j = 0; j < data.result[index].length; j++){
        //          secondSceneAt += '<a href="javascript:;" data-atid="'+data.result[index][j].scenes_id+'">'+data.result[index][j].scenes_name+'</a>';
        //      }
        //      secondSceneAt += '</div>';
        //  } else if(i < 14){
        //      firstSceneAt1 += '<a href="javascript:;" class="'+that.getSceneAtIcon(data.result[0][i].scenes_name)+'" data-second="scene-item-'+data.result[0][i].scenes_id+'" data-bigid="'+data.result[0][i].scenes_id+'">'+data.result[0][i].scenes_name+'</a>';
        //      secondSceneAt1 += '<div class="second-level-item clearfix" id="scene-item-'+data.result[0][i].scenes_id+'">';
        //      var index = parseInt(data.result[0][i].scenes_id);
        //      for(var j = 0; j < data.result[index].length; j++){
        //          secondSceneAt1 += '<a href="javascript:;" data-atid="'+data.result[index][j].scenes_id+'">'+data.result[index][j].scenes_name+'</a>';
        //      }
        //      secondSceneAt1 += '</div>';
        //  }
        // }
        firstSceneAt += '</div>', secondSceneAt += '</div>', firstSceneAt1 += '</div>', secondSceneAt1 += '</div>';
        AllSceneAt = firstSceneAt + secondSceneAt + firstSceneAt1 + secondSceneAt1;
        $('#scene-type-list').html(AllSceneAt);
        fillData();
        $(".loading-area").fadeOut();
    })
    .fail(function() {
        console.log("error");
        fillData();
        $(".loading-area").fadeOut();
    });
    function fillData(){
        //根据芯片id和场景原名称获取场景信息
        if(sceneStatus == 1){//1表示为编辑
            $.ajax({
                url: BASEURL + 'scene/getRelateSceneInfo',
                type: 'POST',
                dataType: 'json',
                data: {
                    chip_no: $("#scene-chipNo").val(),
                    initial_name: decodeURIComponent($("#scene-initial_name").val())
                },
            })
            .done(function(data) {
                console.log(data);
                if(data.success){
                    var scenesName = data.result.current_name;
                    if(scenesName == null || scenesName == ""){
                        scenesName = decodeURIComponent($("#scene-initial_name").val());
                    }
                    $('#sceneName').val(scenesName);//赋值名称
                    //$('#city').val(data.result.city);
                    $('#detail-adr').val(data.result.addr);
                    var city = data.result.city;//城市
                    var re = new RegExp("/","g");//匹配斜杠“/”
                    var xindex = city == null ? null : city.match(re);//查找斜杠集合
                    var sheng = xindex == null ? city : "";//省
                    var shi = "";//市
                    var qu = "";//区
                    if(xindex != null){
                        for(var i = 0; i < xindex.length; i++){
                            if(i == 0){
                                sheng = city.substring(0, city.indexOf('/'));
                                city = city.replace(sheng + '/', '');
                                if(xindex.length == 1){
                                    shi = city;
                                }
                            }else if(i == 1){
                                shi = city.substring(0, city.indexOf('/'));
                                city = city.replace(shi + '/', '');
                                qu = city;
                            }
                        }
                    }
                    $('#city').citypicker({
                        province: sheng,
                        city: shi,
                        district: qu
                    });
                    var scenes_id = data.result.scenes_id;//场景id
                    $('#scene-small').val(scenes_id);
                    $(".second-level-item span").attr('data-atid');
                    $(".second-level-item").each(function(){//遍历所有二级场景
                        var secondId = $(this);
                        $(this).children("ul").children('li').each(function(){//遍历当前二级场景下所有li
                            var threeLevel = $(this).children('ul');
                            if($(this).children('span').attr("data-atid") == scenes_id){//当前二级场景和返回数据相匹配
                                $(".scene-item a").each(function() {
                                    if($(this).attr("data-second") == $(secondId).attr("id")){
                                        $(this).addClass('on');
                                    }
                                });
                                $(secondId).parent().addClass('on');
                                $(secondId).show();
                                $(this).children('span').addClass('on');
                            }else if(threeLevel.length > 0){//三级场景不为空
                                $(threeLevel).children('li').each(function() {
                                    var threeSid = $(this).children('a').attr("data-atid");
                                    if(threeSid == scenes_id){
                                        $(this).parent().show();//显示三级场景
                                        $(this).children('a').addClass('on');
                                        $(secondId).parent().addClass('on');//二级场景
                                        $(secondId).show();//显示二级场景
                                        $(this).parent().siblings('span').addClass('on');
                                        $(".scene-item a").each(function() {
                                            if($(this).attr("data-second") == $(secondId).attr("id")){
                                                $(this).addClass('on');
                                            }
                                        });
                                    }
                                });
                            }
                        });
                    });
                }
            })
            .fail(function(data) {
                console.log('error');
            });
        }else if(sceneStatus == 0){
            $('#sceneName').val(decodeURIComponent($("#scene-initial_name").val()));//赋值旧名称
        }
    }

    $(document).on("click", ".scene-item a", function() {
        $('.scene-item a').removeClass('on');
        $('.second-level-item').hide();
        var secondId = $(this).attr('data-second');
        $(this).addClass('on').siblings('a').removeClass('on');
        $("#"+secondId).fadeIn();
        $('#scene-big').val($(this).attr('data-bigid'));
    });
    //二级场景
    $(document).on("click", ".second-level-item span", function(event) {
        $('.second-level-item span').removeClass('on');
        $('.three-level-item a').removeClass('on');
        $(this).addClass('on');
        $('#scene-small').val($(this).attr('data-atid'));
        $('.three-level-item').hide();
        $(this).siblings('.three-level-item').show();
        $(document).one("click", function () {//对document绑定一个影藏Div方法
            $('.three-level-item').hide();
        });
        event.stopPropagation();//阻止事件向上冒泡
    });
    //三级场景
    $(document).on("click", ".three-level-item a", function(event) {
        $('.three-level-item a').removeClass('on');
        $(this).addClass('on');
        $('#scene-small').val($(this).attr('data-atid'));
        event.stopPropagation();//阻止事件向上冒泡
    });
    $(document).on("click", ".three-level-item", function(event) {
        event.stopPropagation();//阻止事件向上冒泡
    });

    $('#save-scene-btn').click(function() {
        var chipNo = $("#scene-chipNo").val();//芯片码
        var oldName = decodeURIComponent($("#scene-initial_name").val());//旧的名称
        var chipId = $("#scene-chipId").val();//芯片id
        if($('#sceneName').val() == ""){
            layer.msg('场景简称不能为空！', {icon: 5,time:2000});
            $('#sceneName').focus();
            return false;
        }else if($('#scene-small').val() == ""){
            layer.msg('请选择场景类型！', {icon: 5,time:2000});
            return false;
        }else if($('#city').val() == ""){
            layer.msg('省市区不能为空！', {icon: 5,time:2000});
            return false;
        }else if(chipNo == "" || oldName == "" || chipId == ""){
            layer.msg('获取信息失败，请返回重试', {icon: 5,time:2000}, function(){
                window.location.href = BASEURL + 'scenesList';
            });
            return false;
        }
        var newName = $('#sceneName').val();//新名称
        var scenes_id = $('#scene-small').val();//类型id
        var city = $('#city').val();//城市
        var address = $('#detail-adr').val();//详细地址
        $.ajax({
            url: BASEURL + 'scene/updateScensInfo',
            type: 'POST',
            dataType: 'json',
            data: {
                initial_name: oldName,
                current_name: newName,
                chip_code: chipNo,
                chip_id: chipId,
                scenes_id: scenes_id,
                city: city,
                addr: address
            },
        })
        .done(function(data) {
            console.log(data);
            if(data.success == true && data.errCode == 200){
                layer.msg('信息更新成功', {icon: 6,time:2000}, function(){
                    window.location.reload();
                });
            }else if(data.success == false){
                layer.msg(data.errMsg, {icon: 5,time:2000});
            }
        })
        .fail(function(data) {
            console.log('error');
            layer.msg("信息更新失败，请刷新重试！", {icon: 5,time:2000});
        });
    });
}
information.getSceneAtIcon = function(atName){
    if(atName == "美食"){
        return "food";
    } else if(atName == "生活服务"){
        return "life";
    } else if(atName == "丽人"){
        return "beauty";
    } else if(atName == "汽车"){
        return "car";
    } else if(atName == "出行服务"){
        return "travel";
    } else if(atName == "教育培训"){
        return "education";
    } else if(atName == "医疗健康"){
        return "health";
    } else if(atName == "旅游/本地游"){
        return "touring";
    } else if(atName == "房产"){
        return "house";
    } else if(atName == "本地酒店"){
        return "hotel";
    } else if(atName == "本地购物"){
        return "shopping";
    } else if(atName == "休闲娱乐"){
        return "leisure";
    } else if(atName == "运动健身"){
        return "sports";
    }
}


var news = {};
news.tab_index = 1;
news.page_index = 1;
news.init = function() {
    var _this = this;

    _this.renderListPage(_this.tab_index, _this.page_index);
    _this.bindEvent();
}
news.renderListPage = function(tab_index, page_index) {
    var _this = this;
    var pagi = new Pagination("#news-list-pagination");//分页
    var perPage = 15;
    var is_read = tab_index == 1 ? "" : 0;
    var readed_tab = tab_index == 1 ? "" : "read-";

    $(".loading-area").fadeIn();
    $.ajax({
        url: BASEURL + 'message/messagesList',
        type: 'POST',
        dataType: 'json',
        data: {
            is_read: is_read,
            page_index: page_index,
            page_num: perPage
        }
    })
    .done(function(data) {
        if(data.success) {
            var len = data.result[0].messages.length;
            var htmlArr = [];
            //全部
            for(var i = 0; i < len; i++) {
                var message = data.result[0].messages[i];
                var read_class = "";
                if(!message.is_read) {
                    read_class = "new-message";
                }
                htmlArr.push('<li class="news-li ' + read_class + '" data-id="' + message.id + '">');
                htmlArr.push('<div class="news-title">');
                htmlArr.push('<input type="checkbox" id="'+readed_tab+'news-check-' + i + '" class="regular-checkbox" data-id="' + message.id + '">');
                htmlArr.push('<label for="'+readed_tab+'news-check-' + i + '"></label>');
                htmlArr.push('<span>' + message.created_at + '</span>');
                htmlArr.push('<span class="title-con">' + message.title + '</span>');
                htmlArr.push('</div>');
                htmlArr.push('<div class="news-detail">' + message.content + '</div>');
                htmlArr.push('</li>');
            }
            $("#news-list-" + tab_index).html(htmlArr.join(""));

            pagi.update({
                pageCount: Math.ceil(data.result[0].count / perPage),
                pageNo: page_index
            });

            //分页点击
            var activePage = parseInt($("#news-list-pagination .pagination>.active").text());
            activePage = activePage ? activePage : 1;
            _this.page_index = activePage;
            $(document).off("click", "#news-list-pagination .pagination>li").on("click", "#news-list-pagination .pagination>li", function() {
                _this.renderListPage(tab_index, parseInt($(this).text()));
            });
            $(document).off("click",  "#news-list-pagination .pagination-prev").on("click", "#news-list-pagination .pagination-prev", function() {
                if(activePage > 1) {
                    _this.renderListPage(tab_index, activePage - 1);
                }
            });
            $(document).off("click", "#news-list-pagination .pagination-next").on("click", "#news-list-pagination .pagination-next", function() {
                if(pageCount - activePage  > 0) {
                    _this.renderListPage(tab_index, activePage + 1);
                }
            });
        }
        $(".loading-area").fadeOut();
    })
    .fail(function() {
        $(".loading-area").fadeOut();
        console.log("error");
    });
}
news.deleteNews = function(m_ids) {
    _this = this;
    $(".loading-area").fadeIn();
    $.ajax({
        url: BASEURL + 'message/messagesDelete',
        type: 'POST',
        dataType: 'json',
        data: {
            m_ids: m_ids
        }
    })
    .done(function(data) {
        if(data.success) {
            layer.alert("删除成功！", function(index) {
                _this.renderListPage(_this.tab_index, _this.page_index);
                $(".select-all").prop("checked", false);
                layer.close(index);
            });
        } else {
            layer.alert("删除失败！");
        }
        $(".loading-area").fadeOut();
    })
    .fail(function() {
        layer.alert("删除失败！");
        $(".loading-area").fadeOut();
        console.log("error");
    });
}
news.updateNews = function(m_ids) {
    _this = this;
    $.ajax({
        url: BASEURL + 'message/messageChangeReadStatus',
        type: 'POST',
        dataType: 'json',
        data: {
            message_ids: m_ids,
            status: 1
        }
    })
    .done(function(data) {
        if(data.success) {
            console.log("success");
        } else {
            console.log("error");
        }
    })
    .fail(function() {
        console.log("error");
    });
}
news.bindEvent = function() {
    var _this = this;
    //全选
    $("#select-all").on("change", function() {
        if($(this).prop("checked")) {
            $("#test-advert-show-table").find("input[type='checkbox']").prop("checked", true);
        } else {
            $("#test-advert-show-table").find("input[type='checkbox']").prop("checked", false);
        }
    });

    //标签切换
    $('.datalist-tab').children('div').eq(0).show().siblings('div').hide();
    $('ul.mm-nav li').click(function(){
        var Index = $(this).index();
        _this.tab_index = Index + 1;
        $(this).addClass('active').siblings().removeClass('active');
        $('.datalist-tab').children('div').eq(Index).show().siblings('div').hide();
        _this.renderListPage(_this.tab_index, 1);
    });

    //列表展开
    $(".news-list").on("click", ".news-title", function(event) {
        event.stopPropagation();
        var newsLi = $(this).parents(".news-li");
        newsLi.toggleClass("opened").removeClass("new-message");
        
        var m_ids = [];
        m_ids.push(newsLi.attr("data-id"));
        _this.updateNews(JSON.stringify(m_ids));
    });


    //全选
    $(".select-all").on("click", function() {
        var newsList = $(this).parents(".search-box").siblings(".news-list");
        if($(this).prop("checked")) {
            newsList.find("input[type='checkbox']").prop("checked", true);
        } else {
            newsList.find("input[type='checkbox']").prop("checked", false);
        }
    });

    //删除
    $(".delete-btn").on("click", function() {
        var newsList = $(this).parents(".search-box").siblings(".news-list");
        var m_ids = [];
        newsList.find("input[type='checkbox']:checked").each(function() {
            m_ids.push($(this).attr("data-id"));
        });
        //TODO:后台删除请求
        layer.confirm("确认删除消息？", {
            btn: ['确定', '取消'] //按钮
        }, function(){
            _this.deleteNews(m_ids);
        }, function(){});
    });

    //标记为已读
    $(".read-btn").on("click", function() {
        var newsList = $("#news-list-1");
        var m_ids = [];
        newsList.find("input[type='checkbox']:checked").each(function() {
            m_ids.push($(this).attr("data-id"));
            $(this).parents(".news-li").removeClass("new-message");
        });
        //TODO:后台已读请求
        _this.updateNews(JSON.stringify(m_ids));
    });
}

var officialMessagesList = {};
officialMessagesList.sceneType = [];
officialMessagesList.init = function() {
    var _this = this;
    _this.renderBaseData();
    _this.bindEvent();
};

officialMessagesList.bindEvent = function() {
    var _this = this;
    //全选
    $("#select-all").on("change", function() {
        if($(this).prop("checked")) {
            $("#officialMessagesList-table").find("input[type='checkbox']").prop("checked", true);
        } else {
            $("#officialMessagesList-table").find("input[type='checkbox']").prop("checked", false);
        }
    });
    //消息场景
    $(document).on("click", "#ad-scene-select .dropdown-menu>li", function() {
        $("#ad-scene-select").attr("data-scene", $(this).attr("data-scene"));
    });
    //消息状态
    $("#ad-status-select").find(".dropdown-menu").children("li").on("click", function() {
        $("#ad-status-select").attr("data-status", $(this).attr("data-status"));
    });
    //查询
    $("#search-msg-byname").on("click", function() {
        _this.renderList(1);
    });
    //播放暂停
    $(document).on("click", ".msg-play", function() {
        if($(this).attr("data-status") == "1") {
            $("#child-pause-btn").attr("data-id", $(this).attr("data-id"));
            $("#pause-msg-box").fadeIn();
        } else {
            $("#child-play-btn").attr("data-id", $(this).attr("data-id"));
            $("#play-msg-box").fadeIn();
        }
    });
    //暂停
    $(document).on("click", "#child-pause-btn", function() {
        $.ajax({
            url: BASEURL + 'wx/updateBoxDocStatus',
            type: 'POST',
            dataType: 'json',
            data: {
                id: $(this).attr("data-id"),
                status: 0
            }
        })
        .done(function(data) {
            if(data.success) {
                layer.msg("暂停成功");
                window.location.reload();
            } else {
                layer.msg("暂停失败");
            }
        })
        .fail(function() {
            layer.msg("暂停失败");
            console.log("error");
        });
        $("#pause-child-box").fadeOut();
    });
    //播放
    $(document).on("click", "#child-play-btn", function() {
        $.ajax({
            url: BASEURL + 'wx/updateBoxDocStatus',
            type: 'POST',
            dataType: 'json',
            data: {
                id: $(this).attr("data-id"),
                status: 1
            }
        })
        .done(function(data) {
            if(data.success) {
                layer.msg("播放成功");
                window.location.reload();
            } else {
                layer.msg("播放失败");
            }
        })
        .fail(function() {
            layer.msg("播放失败");
            console.log("error");
        });
        $("#play-child-box").fadeOut();
    });

    //删除
    $(document).on("click", ".msg-delete", function() {
        $("#msg-del-btn").attr("data-id", $(this).attr("data-id"));
        $("#del-child-box").fadeIn();
    });
    $("#delete-btn").on("click", function() {
        var idArr = [];
        $("input[name='msg-check']:checked").each(function() {
            idArr.push($(this).val());
        });
        var idStr = idArr.join(",");
        $("#msg-del-btn").attr("data-id", idStr);
        $("#del-child-box").fadeIn();
    });
    $("#msg-del-btn").on("click", function() {
        _this.delMsg($(this).attr("data-id"));
        $("#del-child-box").fadeOut();
    });

    //编辑
    $(document).on("click", ".msg-edit", function() {
        window.open(BASEURL + "editOfficialMessage/"+$(this).attr("data-id"));
    });

    //详情
    $(document).on("click", ".msg-detail", function() {
        var html = [];
        var contentDom = $("#detail-box").find(".detail-con");
        html.push("<div class='info__container'>");
        html.push("<div class='content'><span class='name'>消息场景：</span><span class='value'>" + $(this).attr("data-scene") + "</span></div>");
        html.push("<div class='content'><span class='name'>绑定盒子：</span><span class='value'>" + $(this).attr("data-mac") + "</span></div>");
        html.push("<div class='content'><span class='name'>所属公众号：</span><span class='value'>" + $(this).attr("data-wechat") + "</span></div>");
        html.push("<div class='content'><span class='name'>修改日期：</span><span class='value'>" + $(this).attr("data-udate") + "</span></div>");
        html.push("<div class='content'><span class='name'>消息日期：</span><span class='value'>" + $(this).attr("data-start") + "-" + ($(this).attr("data-end")=="9999-01-01"?"":$(this).attr("data-end")) + "</span></div>");
        html.push("<div class='content'><span class='name'>消息内容：</span><span class='value'>" + $(this).attr("data-info") + "</span></div>");
        html.push("</div>");
        contentDom.html(html.join(""));
        $("#detail-box").fadeIn();
    });

    //关闭
    $(".del-cancel").on("click", function() {
        $(".del-ad-box").fadeOut();
    });
    $(".recharge-cancel").on("click", function() {
        $(".recharge-box").fadeOut();
    })
};

officialMessagesList.delMsg = function(idStr) {
    $.ajax({
        url: BASEURL + 'wx/delBoxDocs',
        type: 'POST',
        dataType: 'json',
        data: {
            ids: idStr
        }
    })
    .done(function(data) {
        if(data.success) {
            layer.msg("删除成功");
            window.location.reload();
        } else {
            layer.msg("删除失败");
        }
    })
    .fail(function() {
        layer.msg("删除失败");
        console.log("error");
    });
};

officialMessagesList.renderBaseData = function() {
    var _this = this;
    //场景类别枚举获取
    $.ajax({
        url: BASEURL + 'wx/getSceneStatus',
        type: 'POST',
        dataType: 'json'
    })
    .done(function(data) {
        var html = [];
        _this.sceneType = data;
        for (var i = 0; i < data.length; i++) {
            var list = data[i];
            html.push('<li id="ad-'+list.id+'" data-scene="'+list.id+'"><a>'+list.name+'</a></li>');
        }
        $("#ad-scene-select").find(".dropdown-menu").append(html);
        _this.renderList(1);
    })
    .fail(function() {
        console.log("error");
    });

    //获取某账户下所有已生效的文案的总数
    $.ajax({
        url: BASEURL + 'wx/getListTotalCount',
        type: 'POST',
        dataType: 'json'
    })
    .done(function(data) {
        if(data.success) {
            var count = data.result ? data.result : 0;
            $("#self-officialMessagesTotal").html(count);
        }
    })
    .fail(function() {
        console.log("error");
    });
};

officialMessagesList.renderList = function(pageNo) {
    var _this = this;

    var pagi = new Pagination("#advert-list-pagination");//分页
    var pageDataCount = 15;

    $(".loading-area").fadeIn();
    //获取文案列表
    $.ajax({
        url: BASEURL + 'wx/getBoxDocsList',
        type: 'POST',
        dataType: 'json', 
        data: {
            key_scestatus: $("#ad-scene-select").attr("data-scene"),
            key_msgstatus: $("#ad-status-select").attr("data-status"),
            key_words: $("#key-chipname").val()
        }
    })
    .done(function(data) {
        if(data.success) {
            $("#dataList-no-data").hide();
            var list = data.result.datas;
            var html = [];
            for (var i = 0; i < list.length; i++) {
                html.push('<tr>');
                html.push('<td><input type="checkbox" id="msg-' + list[i].id + '" class="regular-checkbox" name="msg-check" value="' + list[i].id + '"><label for="msg-' + list[i].id + '"></label><label for="msg-' + list[i].id + '">' + _this.sceneType[list[i].scene_status -1].name + '</label></td>');
                html.push('<td>' + (list[i].wx_name?list[i].wx_name:"暂无") + '</td>');
                html.push('<td>' + list[i].updated_at + '</td>');
                html.push('<td><p class="msg_info">' + list[i].msg_info + '</p></td>');
                html.push('<td>' + (list[i].msg_status == 0 ? "暂停":"播放")+ '|');
                var status = list[i].msg_status ? '<a class="msg-play tipso_style" data-id="'+ list[i].id +'" data-status="'+list[i].msg_status+'" data-tipso="播放"><span class="play-btn fa fa-pause-circle-o"></span></a>' : '<a class="msg-play tipso_style" data-id="'+ list[i].id +'" data-status="'+list[i].msg_status+'" data-tipso="暂停"><span class="play-btn fa fa-play-circle-o"></span></a>';
                html.push(status+'<a class="msg-detail tipso_style" data-id="'+ list[i].id +'"  data-scene="'+  _this.sceneType[list[i].scene_status -1].name +'" data-mac="'+list[i].box_mac+'" data-wechat="'+list[i].wx_name+'" data-udate="'+list[i].updated_at+'" data-udate="'+list[i].updated_at+'" data-start="'+list[i].date_start+'" data-end="'+list[i].date_end+'" data-info="'+list[i].msg_info+'"  data-tipso="详情"><span class="fa fa-info-circle"></span></a>');
                html.push('<a class="msg-edit tipso_style" data-id="'+ list[i].id +'" data-tipso="编辑"><span class="fa fa-pencil"></span></a>');
                html.push('<a class="msg-delete tipso_style" data-id="'+ list[i].id +'" data-tipso="删除"><span class="fa fa-trash"></span></a>');
                html.push('</td>');
                html.push('</tr>');
            }

            $("#officialMessagesList-table>tbody").html(html.join(""));

            $('#officialMessagesList-table>tbody td>a').tipso({
                useTitle: false,
                width: 'auto',
                position: 'bottom',
                background: '#626262'
            });

            var pageCount = Math.ceil(data.result.count / pageDataCount);//计算总页数
            $("#after-officialMessagesTotal").html(data.result.count);

            pagi.update({
                pageCount: pageCount,
                pageNo: pageNo
            });
            //分页点击
            var activePage = parseInt($("#advert-list-pagination .pagination>.active").text());
            activePage = activePage ? activePage : 1;
            _this.index = activePage;
            $(document).off("click", "#advert-list-pagination .pagination>li").on("click", "#advert-list-pagination .pagination>li", function() {
                _this.index = parseInt($(this).text());
                _this.renderList(parseInt($(this).text()));
            });
            $(document).off("click",  "#advert-list-pagination .pagination-prev").on("click", "#advert-list-pagination .pagination-prev", function() {
                if(activePage > 1) {
                    _this.index = activePage - 1;
                    _this.renderList(activePage - 1);
                }
            });
            $(document).off("click", "#advert-list-pagination .pagination-next").on("click", "#advert-list-pagination .pagination-next", function() {
                if(pageCount - activePage  > 0) {
                    _this.index = parseInt(activePage + 1);
                    _this.renderList(activePage + 1);
                }
            });
        } else {
            $("#officialMessagesList-table>tbody").html("");
            $("#dataList-no-data").show();
        }
        $(".loading-area").fadeOut();
    })
    .fail(function() {
        $(".loading-area").fadeOut();
        $("#officialMessagesList-table>tbody").html("");
        $("#dataList-no-data").show();
        console.log("error");
    });
};

var addOfficialMessage = {};
addOfficialMessage.init = function() {
    var _this = this;
    _this.renderDateSelector(0);
    _this.renderPage();
    _this.bindEvent();
};
addOfficialMessage.edit = function(id) {
    var _this = this;
    _this.renderDateSelector();
    _this.renderPage(id);
    _this.bindEvent(id);
}

addOfficialMessage.backfill = function(id) {
    $.ajax({
        url: BASEURL + 'wx/getDocInfo',
        type: 'POST',
        dataType: 'json',
        data: {
            id: id
        }
    })
    .done(function(data) {
        if(data.success) {
            var res = data.result[0];
            $("#msg-box-select>.dropdown-toggle").text(res.box_name + "——" + res.box_mac);
            $("#msg-box-select").attr("data-box", res.box_name);
            $("#msg-box-select").attr("data-mac", res.box_mac);
            $("#msg-box-select").addClass("disable");
            $("#msg-account-select>.dropdown-toggle").text(res.wx_name + "——" + res.wechat_id);
            $("#msg-account-select").attr("data-account", res.wx_id);
            $("#msg-account-select").addClass("disable");
            $("#message-scene-"+res.scene_status).prop("checked", true);
            $("#message-content").val(res.msg_info);
            $("#last-word").text(400-$("#message-content").val().length);
            $("#startDate").val(res.date_start);
            if(res.date_end != "9999-01-01") {
                $("#hasTimeEnd").prop("checked", true);
                $("#endDate").val(res.date_end).prop("disabled", false);
            }
        }
    })
    .fail(function() {
        console.log("error");
    });
}
addOfficialMessage.renderPage = function(id) {
    var _this = this;
    //获取盒子列表
    $.ajax({
        url: BASEURL + 'wx/getBoxLists',
        type: 'POST',
        dataType: 'json'
    })
    .done(function(data) {
        if(data.success) {
            var html = [];
            for (var i = 0; i < data.result.length; i++) {
                var list = data.result[i];
                html.push('<li id="box-'+list.id+'" data-box="'+list.id+'" data-mac="'+list.box_mac+'"><a>'+list.box_name+'——'+list.box_mac+'</a></li>');
            }
            $("#msg-box-select").find(".dropdown-menu").html(html);
        }
    })
    .fail(function() {
        console.log("error");
    });

    //场景类别枚举获取
    $.ajax({
        url: BASEURL + 'wx/getSceneStatus',
        type: 'POST',
        dataType: 'json'
    })
    .done(function(data) {
        var html = [];
        _this.sceneType = data;
        for (var i = 0; i < data.length; i++) {
            var list = data[i];
            html.push('<div>');
            html.push('  <input type="radio" name="message-scene" id="message-scene-'+list.id+'" class="regular-radio" value="'+list.id+'">');
            html.push('  <label for="message-scene-'+list.id+'"></label>');
            html.push('  <label for="message-scene-'+list.id+'">'+list.name+'</label>');
            html.push('</div>');
        }
        $("#scene-list").append(html.join(""));
        if(id) {
            _this.backfill(id);
        }
    })
    .fail(function() {
        console.log("error");
    });
};

addOfficialMessage.bindEvent = function(id) {
    var _this = this;
    $("#hasTimeEnd").on("change", function() {
        if($(this).prop("checked")) {
            $("#endDate").prop("disabled", false);
        } else {
            $("#endDate").val("");
            $("#endDate").prop("disabled", true);
        }
    });
    $("#message-content").on("blur input click", function() {
        $("#last-word").text(400-$(this).val().length);
    });
    //盒子mac
    $(document).on("click", "#msg-box-select .dropdown-menu>li", function() {
        $("#msg-box-select").attr("data-box", $(this).attr("data-box"));
        $("#msg-box-select").attr("data-mac", $(this).attr("data-mac"));
    });
    //公众号
    $(document).on("click", "#msg-account-select .dropdown-menu>li", function() {
        $("#msg-account-select").attr("data-account", $(this).attr("data-account"));
    });

    //盒子列表点击
    $(document).on("click", ".dropdown-menu>li", function() {
        $.ajax({
            url: BASEURL + 'wx/getWXIds',
            type: 'POST',
            dataType: 'json',
            data: {
                id: $(this).attr("data-box")
            }
        })
        .done(function(data) {
            if(data.success) {
                var html = [];
                for (var i = 0; i < data.result.length; i++) {
                    var list = data.result[i];
                    html.push('<li id="account-'+list.id+'" data-account="'+list.id+'"><a>' + list.wx_name + '——' + list.wechat_id + '</a></li>');
                }
                $("#msg-account-select").find(".dropdown-menu").html(html);
            }
        })
        .fail(function() {
            console.log("error");
        });
    });
    //提交
    $("#submit-button").on("click", function() {
        if($("#msg-account-select").attr("data-account") == "") {
            layer.alert("请选择发布消息的公众号");
            return;
        }
        if($("input[name='message-scene']:checked").length == 0) {
            layer.alert("请选择消息场景");
            return;
        }
        if($("#startDate").val() == "") {
            layer.alert("请选择开始日期");
            return;
        }
        if($("#hasTimeEnd").prop("checked") && $("#endDate").val() == "") {
            layer.alert("请选择结束日期");
            return;
        }
        if($("#message-content").val() == "") {
            layer.alert("请输入消息内容");
            return;
        }

        _this.updateBoxDoc(id);
    });
};

addOfficialMessage.updateBoxDoc = function(id) {
    if(id) {
        var data = {
            id: id,
            wx_id: $("#msg-account-select").attr("data-account"),
            scene_status: $("input[name='message-scene']:checked").val(),
            msg_status: 0,
            date_start: $("#startDate").val(),
            date_end: ($("#hasTimeEnd").prop("checked") ? $("#endDate").val():"9999-01-01"),
            msg_info: $("#message-content").val()
        };
    } else {
        var data = {
            wx_id: $("#msg-account-select").attr("data-account"),
            scene_status: $("input[name='message-scene']:checked").val(),
            msg_status: 0,
            date_start: $("#startDate").val(),
            date_end: ($("#hasTimeEnd").prop("checked") ? $("#endDate").val():"9999-01-01"),
            msg_info: $("#message-content").val()
        };
    }
    $.ajax({
        url: BASEURL + 'wx/updateBoxDocs',
        type: 'POST',
        dataType: 'json',
        data: data
    })
    .done(function(data) {
        if(data.success) {
            setTimeout(function() {
                window.location.href = BASEURL + "officialMessagesList";
            }, 3000);
            layer.msg("发布成功！3秒后跳转到消息列表页面", {
                time: 6000,
                shade: 0.3
            });
        } else {
            layer.alert(data.errMsg);
        }
    })
    .fail(function() {
        console.log("error");
    });
}

addOfficialMessage.renderDateSelector = function(initialValueStart, initialValueEnd) {
    var startSelector = rome(startDate, {
        time: false,
        initialValue: getDateStr(initialValueStart),
        dateValidator: rome.val.beforeEq(endDate),
        min: getDateStr(0)
    });
    var endSelector = rome(endDate, {
        time: false,
        initialValue: getDateStr(initialValueEnd),
        dateValidator: rome.val.afterEq(startDate),
        min: getDateStr(0)
    });
}
//申请vip画像
var applyVipPortrait = {};
applyVipPortrait.init = function() {
    var _this = this;
    var charReg = /^[\u4E00-\u9FA5A-Za-z0-9]+$/;
    var macReg = /^[A-F0-9]{2}(:[A-F0-9]{2}){5}$/;
    var emailReg = /^\w+([-+.]\w+)*@\w+([-.]\w+)*\.\w+([-.]\w+)*$/;
    var numReg = /^\d{n}$/;
    function strlen(str){
        var len = 0;
        for (var i=0; i<str.length; i++) {
            var c = str.charCodeAt(i);
            //单字节加1
            if ((c >= 0x0001 && c <= 0x007e) || (0xff60<=c && c<=0xff9f)) {
                len++;
            }
            else {
                len+=2;
            }
        }
        return len;
    }
    $("#vip-recharge-box .scan-recharge-mask").on('click', function(event) {
        event.preventDefault();
        clearInterval(_this.paySuccess);
        $("#vip-recharge-box").fadeOut();
    });
    //提交
    $("#submit-button").on("click", function() {
        if($("#vip-brand-name").val() == "") {
            layer.msg('请输入品牌名称', {icon: 5,time: 2000});
            $("#vip-brand-name").focus();
            return;
        }
        if(!charReg.test($("#vip-brand-name").val())){
            layer.msg('品牌名称只支持中英文和数字', {icon: 5,time: 2000});
            $("#vip-brand-name").focus();
            return;
        }
        if(strlen($("#vip-brand-name").val()) < 3 || strlen($("#vip-brand-name").val()) > 30){
            layer.msg('品牌名称长度为3-30个字符', {icon: 5,time: 2000});
            $("#vip-brand-name").focus();
            return;
        }
        if($("#vip-industry").val() == "") {
            layer.msg('请输入品牌所属行业', {icon: 5,time: 2000});
            $("#vip-industry").focus();
            return;
        }
        if(!charReg.test($("#vip-industry").val())){
            layer.msg('品牌所属行业只支持中英文和数字', {icon: 5,time: 2000});
            $("#vip-industry").focus();
            return;
        }
        if(strlen($("#vip-industry").val()) < 3 || strlen($("#vip-industry").val()) > 30){
            layer.msg('品牌所属行业长度为3-30个字符', {icon: 5,time: 2000});
            $("#vip-industry").focus();
            return;
        }
        if($("#vip-address").val() == "") {
            layer.msg('请选择店铺所在地区', {icon: 5,time: 2000});
            $("#vip-address").focus();
            return;
        }
        if($("#vip-detail-address").val() == "") {
            layer.msg('请输入详细地址', {icon: 5,time: 2000});
            $("#vip-detail-address").focus();
            return;
        }
        if($("#vip-business-time").val() == "") {
            layer.msg('请输入营业时间', {icon: 5,time: 2000});
            $("#vip-business-time").focus();
            return;
        }
        if($("#vip-shop-name").val() == "") {
            layer.msg('请输入店铺名称', {icon: 5,time: 2000});
            $("#vip-shop-name").focus();
            return;
        }
        if(!charReg.test($("#vip-shop-name").val())){
            layer.msg('店铺名称只支持中英文和数字', {icon: 5,time: 2000});
            $("#vip-shop-name").focus();
            return;
        }
        if(strlen($("#vip-shop-name").val()) < 3 || strlen($("#vip-shop-name").val()) > 30){
            layer.msg('店铺名称长度为3-30个字符', {icon: 5,time: 2000});
            $("#vip-shop-name").focus();
            return;
        }
        if($("#vip-box-mac").val() == "") {
            layer.msg('请输入盒子mac', {icon: 5,time: 2000});
            $("#vip-box-mac").focus();
            return;
        }
        if(!macReg.test($("#vip-box-mac").val())){
            layer.msg('盒子mac格式不正确', {icon: 5,time: 2000});
            $("#vip-box-mac").focus();
            return;
        }
        if($("#vip-email").val()){
            if(!emailReg.test($("#vip-email").val())){
                layer.msg('邮箱格式不正确', {icon: 5,time: 2000});
                $("#vip-email").focus();
                return;
            }
        }
        layer.confirm('一经提交无法撤回，确定提交吗？', { icon:3, title:'提醒' }, function(index){
            _this.externalChannelsInfo();
        });
        
    });
};
applyVipPortrait.paySuccess = setInterval(function(){
    var a = 0;
}, 60000);
applyVipPortrait.externalChannelsInfo = function(){
    var _this = this;
    $(".loading-area").fadeIn();
    $.ajax({
        url: '/background/apply/applyvip.do',
        type: 'POST',
        dataType: 'json',
        data: {
            brand_name: $("#vip-brand-name").val().trim(),//品牌名称
            industry: $("#vip-industry").val().trim(),//所属行业
            strore_name: $("#vip-shop-name").val().trim(),//店铺名称
            address: $("#vip-address").val().trim(),//地址
            detali_address: $("#vip-detail-address").val().trim(),//详细地址
            shoping_hours: $("#vip-business-time").val().trim(),//营业时间
            mac: $("#vip-box-mac").val().trim(),//设备macid
            email: $("#vip-email").val().trim(),//负责人邮箱
            phone: $("#vip-contact-way").val().trim(),//联系方式
            store_manager: $("#vip-shop-people").val().trim(),//店铺负责人
            cover_floor: $("#vip-storey-num").val().trim(),//覆盖楼层数
            single_sell_area: $("#vip-acreage").val().trim()//单层营业面积
        }
    })
    .done(function(data) {
        $(".loading-area").fadeOut();
        console.log(data);
        if(data.success) {
            $("#check-recharge").attr('data-id', data.result.id);
            $("#pay-qrcode").attr('src', data.result.url);
            layer.closeAll();
            if(data.result != ""){
                $("#vip-recharge-box").fadeIn();
                _this.paySuccess = setInterval(function(){
                    _this.getExternalChannelsInfo();
                }, 3000);
                $("#check-recharge").off('click').on('click', function(event) {
                    event.preventDefault();
                    _this.getExternalChannelsInfo();
                });
            }else{
                setTimeout(function() {
                    window.history.back(-1);
                }, 3000);
                layer.msg("提交成功！3秒后返回上一页", {
                    time: 3000,
                    shade: 0.3
                });
            }
        } else {
            layer.alert(data.errMsg);
        }
    })
    .fail(function() {
        $(".loading-area").fadeOut();
        console.log("error");
        layer.msg('提交失败！', {icon: 5,time: 2000});
    });
}

//查询是否支付成功
applyVipPortrait.getExternalChannelsInfo = function(){
    var _this = this;
    var vipId = $("#check-recharge").attr('data-id');
    $.ajax({
        url: '/background/apply/returnVipPortraitApplyStatus.do',
        type: 'post',
        dataType: 'json',
        data: {
            id: vipId
        }
    })
    .done(function(data) {
        if(data.success && data.errMsg == "用户已充值") {
            clearInterval(_this.paySuccess);
            $(".pay-success").show();
            setTimeout(function(){
                 $("#vip-recharge-box").fadeOut();
                 $(".pay-success").hide();
                 window.location.href = BASEURL + "boxList";
            }, 500);
        }
    })
    .fail(function() {
        console.log("getExternalChannelsInfo error");
    });
}


//添加店铺
var addStore = {};
addStore.init = function() {
    var _this = this;
    _this.getFirstLevelScene();
    $("#one-level").on("click", ".dropdown-menu>li", function() {
        $("#one-level").attr("data-sceneName", $(this).attr("data-sceneName"));
        $("#one-level").attr("data-sceneId", $(this).attr("data-sceneId"));
        $("#two-level").attr("data-sceneName", "");
        $("#two-level").attr("data-sceneId", "");
        $("#two-level .dropdown-toggle").text("请选择二级标签");
        _this.getSecondLevelScene($(this).attr("data-sceneId"));
    });

    //提交
    $("#submit-button").on("click", function() {
        if($("#store-name").val() == "") {
            layer.msg('请输入店铺名称', {icon: 5,time: 2000});
            $("#store-name").focus();
            return;
        }
        if($("#store-address").val() == "") {
            layer.msg('请输入店铺地址', {icon: 5,time: 2000});
            $("#store-address").focus();
            return;
        }
        if($("#store-phone").val() == "") {
            layer.msg('请输入店铺的联系电话', {icon: 5,time: 2000});
            $("#store-phone").focus();
            return;
        }
        if($("#two-level").attr("data-sceneId") == "") {
            layer.msg('请选择店铺场景', {icon: 5,time: 2000});
            return;
        }
        if($("#store-box-name").val() == "") {
            layer.msg('请输入盒子名称', {icon: 5,time: 2000});
            $("#store-box-name").focus();
            return;
        }
        if($("#store-box-mac").val() == "") {
            layer.msg('请输入盒子mac', {icon: 5,time: 2000});
            $("#store-box-mac").focus();
            return;
        }
        if($("#store-box-range").val() == "") {
            layer.msg('请输入盒子的有效采集范围', {icon: 5,time: 2000});
            $("#store-box-range").focus();
            return;
        }
        _this.addStoreInfo();
    });
};
addStore.getFirstLevelScene = function(){
    $.ajax({
        url: BASEURL + 'store/getFirstLevelScene',
        type: 'POST',
        dataType: 'json',
        data: {}
    })
    .done(function(data) {
        console.log(data)
        if(data.success) {
            var scene = data.result;
            var html = [];
            for (var i = 0, len = scene.length; i < len; i++) {
                html.push('<li id="scene-' + scene[i].scenes_id + '" data-sceneName="' + scene[i].scenes_name + '" data-sceneId="' + scene[i].scenes_id + '" data-area="' + scene[i].scenes_id + '"><a>' + scene[i].scenes_name + '</a></li>');
            }
            $("#one-level").children(".dropdown-content").children(".dropdown-menu").html(html.join(""));
        } else {
            layer.alert(data.errMsg);
        }
    })
    .fail(function() {
        console.log("getFirstLevelScene error");
        layer.msg('获取场景信息失败！', {icon: 5,time: 2000});
    });
}
addStore.getSecondLevelScene = function(scene_id){
    $.ajax({
        url: BASEURL + 'store/getSecondLevelScene',
        type: 'POST',
        dataType: 'json',
        data: {
            parent_id: scene_id
        }
    })
    .done(function(data) {
        console.log(data);
        if(data.success) {
            var scene = data.result;
            var html = [];
            for (var i = 0, len = scene.length; i < len; i++) {
                html.push('<li id="scene-' + scene[i].scenes_id + '" data-sceneName="' + scene[i].scenes_name + '" data-sceneId="' + scene[i].scenes_id + '" data-area="' + scene[i].scenes_id + '"><a>' + scene[i].scenes_name + '</a></li>');
            }
            $("#two-level").children(".dropdown-content").children(".dropdown-menu").html(html.join(""));
            $("#two-level").off("click").on("click", ".dropdown-menu>li", function() {
                $("#two-level").attr("data-sceneName", $(this).attr("data-sceneName"));
                $("#two-level").attr("data-sceneId", $(this).attr("data-sceneId"));
            });
        } else {
            layer.alert(data.errMsg);
        }
    })
    .fail(function() {
        console.log("getSecondLevelScene error");
        layer.msg('获取场景信息失败！', {icon: 5,time: 2000});
    });
}
addStore.addStoreInfo = function (){
    $(".loading-area").fadeIn();
    var store_address = $("#store-address").val().trim();//店铺地址
    var strs = new Array();
    strs = store_address.split("/");
    $.ajax({
        url: BASEURL + 'store/addStoreInfo',
        type: 'POST',
        dataType: 'json',
        data: {
            shop_name: $("#store-name").val().trim(),//店铺名称
            phone: $("#store-phone").val().trim(),//联系电话
            scene_name: $("#two-level").attr("data-sceneName"),//店铺场景
            scene_id: $("#two-level").attr("data-sceneId"),//店铺场景ID
            name: $("#store-box-name").val().trim(),//盒子名称
            gw_mac: $("#store-box-mac").val().trim(),//盒子MAC
            scan_distance: $("#store-box-range").val().trim(),//有效范围
            box_type: $("input[name='box_type']:checked").val(),//盒子类型(0 有线盒子 1 无线盒子)
            province: strs[0],
            city: strs[1] == undefined ? "" : strs[1],
            district: strs[2] == undefined ? "" : strs[2],
            address: $("#store-detail-address").val().trim()
        }
    })
    .done(function(data) {
        if(data.success) {
            layer.msg("提交成功！", {time: 2000, shade: 0.3}, function(){
                window.location.href = BASEURL + "storeList";
            });
        } else {
            layer.alert(data.errMsg);
        }
        $(".loading-area").fadeOut();
    })
    .fail(function() {
        console.log("error");
        $(".loading-area").fadeOut();
        layer.msg('提交失败！', {icon: 5,time: 2000});
    });
}

//编辑店铺
var editStore = {};
editStore.init = function(){
    var _this = this;
    var store_id = $("#store-id").val();
    _this.getStoreDetailInfo(store_id);
    addStore.getFirstLevelScene();
    $("#one-level").on("click", ".dropdown-menu>li", function() {
        $("#one-level").attr("data-sceneName", $(this).attr("data-sceneName"));
        $("#one-level").attr("data-sceneId", $(this).attr("data-sceneId"));
        $("#two-level").attr("data-sceneName", "");
        $("#two-level").attr("data-sceneId", "");
        $("#two-level .dropdown-toggle").text("请选择二级标签");
        addStore.getSecondLevelScene($(this).attr("data-sceneId"));
    });
    //提交
    $("#submit-button").on("click", function() {
        if($("#store-name").val() == "") {
            layer.msg('请输入店铺名称', {icon: 5,time: 2000});
            $("#store-name").focus();
            return;
        }
        if($("#store-address").val() == "") {
            layer.msg('请输入店铺地址', {icon: 5,time: 2000});
            $("#store-address").focus();
            return;
        }
        if($("#store-phone").val() == "") {
            layer.msg('请输入店铺的联系电话', {icon: 5,time: 2000});
            $("#store-phone").focus();
            return;
        }
        if($("#two-level").attr("data-sceneId") == "") {
            layer.msg('请选择店铺场景', {icon: 5,time: 2000});
            return;
        }
        if($("#store-box-name").val() == "") {
            layer.msg('请输入盒子名称', {icon: 5,time: 2000});
            $("#store-box-name").focus();
            return;
        }
        if($("#store-box-mac").val() == "") {
            layer.msg('请输入盒子mac', {icon: 5,time: 2000});
            $("#store-box-mac").focus();
            return;
        }
        if($("#store-box-range").val() == "") {
            layer.msg('请输入盒子的有效采集范围', {icon: 5,time: 2000});
            $("#store-box-range").focus();
            return;
        }
        _this.saveStoreInfo(store_id);
    });
}
//获取店铺详情
editStore.getStoreDetailInfo = function(store_id){
    $(".loading-area").fadeIn();
    $.ajax({
        url: BASEURL + 'store/storeDetail',
        type: 'POST',
        dataType: 'json',
        data: {
            id: store_id
        }
    })
    .done(function(data) {
        console.log(data);
        if (data.success === true) {
            var storeInfo = data.result[0];
            $("#store-name").val(storeInfo.shop_name);
            $('#store-address').citypicker({
                province: storeInfo.province,
                city: storeInfo.city,
                district: storeInfo.district
            });
            $("#store-detail-address").val(storeInfo.address);
            $("#store-phone").val(storeInfo.phone);
            $("#one-level").attr("data-sceneName", storeInfo.parent_name);
            $("#one-level").attr("data-sceneId", storeInfo.parent_id);
            $("#two-level").attr("data-sceneName", storeInfo.scene_name);
            $("#two-level").attr("data-sceneId", storeInfo.scene_id);
            $("#one-level .dropdown-toggle").text(storeInfo.parent_name);
            $("#two-level .dropdown-toggle").text(storeInfo.scene_name);
            $("#store-box-name").val(storeInfo.name);
            $("#store-box-mac").val(storeInfo.gw_mac);
            $("#store-box-range").val(storeInfo.scan_distance);
            if(storeInfo.box_type == 0){
                $("#box-type-cable").attr("checked", "checked");
            }else{
                $("#box-type-wifi").attr("checked", "checked");
            }
        }
        $(".loading-area").fadeOut();
    })
    .fail(function() {
        console.log("error");
        $(".loading-area").fadeOut();
        layer.msg('获取失败！', {icon: 5,time: 2000});
    });
}
//保存店铺信息
editStore.saveStoreInfo = function(store_id){
    $(".loading-area").fadeIn();
    var store_address = $("#store-address").val().trim();//店铺地址
    var strs = new Array();
    strs = store_address.split("/");
    $.ajax({
        url: BASEURL + 'store/editStoreInfo',
        type: 'POST',
        dataType: 'json',
        data: {
            id: store_id,
            shop_name: $("#store-name").val().trim(),//店铺名称
            phone: $("#store-phone").val().trim(),//联系电话
            scene_name: $("#two-level").attr("data-sceneName"),//店铺场景
            scene_id: $("#two-level").attr("data-sceneId"),//店铺场景ID
            name: $("#store-box-name").val().trim(),//盒子名称
            gw_mac: $("#store-box-mac").val().trim(),//盒子MAC
            scan_distance: $("#store-box-range").val().trim(),//有效范围
            box_type: $("input[name='box_type']:checked").val(),//盒子类型(0 有线盒子 1 无线盒子)
            province: strs[0],
            city: strs[1] == undefined ? "" : strs[1],
            district: strs[2] == undefined ? "" : strs[2],
            address: $("#store-detail-address").val().trim()
        }
    })
    .done(function(data) {
        if(data.success) {
            layer.msg("保存成功！", {time: 2000, shade: 0.3}, function(){
                window.location.href = BASEURL + "storeList";
            });
        } else {
            layer.alert(data.errMsg);
        }
        $(".loading-area").fadeOut();
    })
    .fail(function() {
        console.log("error");
        $(".loading-area").fadeOut();
        layer.msg('保存失败！', {icon: 5,time: 2000});
    });
}


//店铺列表
var storeList = {};
storeList.init = function(){
    var _this = this;
    
    _this.getStatisticsInfo();
    //全选
    $("#select-all").on("change", function() {
        if($(this).prop("checked")) {
            $("#store-table").find("input[type='checkbox']").prop("checked", true);
        } else {
            $("#store-table").find("input[type='checkbox']").prop("checked", false);
        }
    });
    //查询
    $("#store-search-btn").on("click", function() {
        _this.getStoreListData(1);
    });
    _this.getStoreListData(1);
    /** 远程升级 */
    $('#upgrade-btn').click(function(event) {
        /* Act on the event */
        var count = 0;
        var store_id = [];

        $('#store-table').find('input[type="checkbox"]').each(function () {
            if ($(this).prop('checked') === true) {
                count++;
                store_id.push($(this).attr('data-id'));
            }
        });

        if (count === 0) {
            $('.upgrade-content .title').text('未选中店铺');
            $('.upgrade-content .tips').next().hide();
            $('.upgrade-content .tips').text('请返回选择');
            $('.upgrade-cancel').text('返回');
            
            $('#upgrade-confirm-btn').addClass('a-disabled');
        } else {
            store_id = store_id.join(',');
            /** clear event firstly */
            $('#upgrade-confirm-btn').click(null)
                .click(function () {
                    var version = $('.upgrade-content .tips').next().text();

                    version  = parseInt(version.substr(1, version.length - 1));

                    $.ajax({
                        url: BASEURL + 'store/setVersion',
                        type: 'POST',
                        dataType: 'json',
                        data: {
                            id: store_id,
                            version: version
                        },
                    })
                    .done(function(data) {
                        if (data.success === true) {
                            window.location.reload();
                        }else{
                            layer.msg(data.errMsg, {icon: 5,time: 2000});
                        }
                    })
                    .fail(function() {
                        console.log("upgrade error");
                    });
                });
        }
        
        $('#upgrade-box').fadeIn();
    });
    /** 关闭升级 */
    $('.upgrade-cancel, .upgrade-mask').click(function(event) {
        /* Act on the event */
        setTimeout(function () {
            $('.upgrade-content .title').text('升级盒子');
            $('.upgrade-content .tips').next().show();
            $('.upgrade-content .tips').text('升级版本');
            $('.upgrade-cancel').text('取消');
            
            $('#upgrade-confirm-btn').removeClass('a-disabled');
        }, 400);

        $('#upgrade-box').fadeOut();
    });
    // 批量删除
    $('#all-delete-btn').on('click', function() {
        /** check number */
        var count = 0;
        var store_id = [];

        $('#store-table').find('input[type="checkbox"]').each(function () {
            if ($(this).prop('checked') === true) {
                count++;
                store_id.push($(this).attr('data-id'));
            }
        });

        if (count === 0) {
            $('.del-ad-content .title').text('未选中店铺');
            $('.del-ad-content .tips').text('请返回选择');
            $('.del-cancel').text('返回');

            $('#child-del-btn').addClass('a-disabled');
        } else {
            store_id = store_id.join(',');
        }

        /** clear event firstly */
        $('#child-del-btn').click(null)
            .click(function () {
                _this.deleteStore(store_id);
            });

        $('#del-child-box').fadeIn();
    });
    // 关闭删除提示框
    $('#del-child-content .del-cancel, #del-child-box .del-ad-mask').on('click', function() {
        setTimeout(function () {
            $('.del-ad-content .title').text('删除店铺后将无法还原');
            $('.del-ad-content .tips').text('删除后，该店铺盒子将会失效');
            $('.del-cancel').text('取消');
            
            $('#child-del-btn').removeClass('a-disabled');
        }, 400);

        $('#del-child-box').fadeOut(400);
    });
}

storeList.deleteStore = function(store_id){
    $(".loading-area").fadeIn();
    $.ajax({
        url: BASEURL + 'store/deleteStore',
        type: 'POST',
        dataType: 'json',
        data: { 
            id: store_id 
        },
    })
    .done(function(data) {
        if (data.success === true) {
            layer.msg("删除成功！", {time: 2000, shade: 0.3}, function(){
                window.location.reload();
            });
        }
        $(".loading-area").fadeOut();
    })
    .fail(function() {
        console.log("error");
        $(".loading-area").fadeOut();
        layer.msg('删除失败！', {icon: 5,time: 2000});
    });
}

storeList.getStatisticsInfo = function(){
    $.ajax({
        url: BASEURL + 'store/allSubStoreInfo',
        type: 'POST',
        dataType: 'json',
        data: {}
    })
    .done(function(data) {
        console.log(data);
        if(data.success) {
            $("#child-totalCount").text(data.result.subTotal);
            $("#child-storeTotal").text(data.result.storeTotal);
            $("#child-boxTotal").text(data.result.boxTotal);
        } else {
            layer.msg('获取所有客户店铺统计概况失败！', {icon: 5,time: 2000});
        }
    })
    .fail(function() {
        console.log("allSubStoreInfo error");
    });
    $.ajax({
        url: BASEURL + 'store/allAgentStoreInfo',
        type: 'POST',
        dataType: 'json',
        data: {}
    })
    .done(function(data) {
        console.log(data);
        if(data.success) {
            $("#self-storeTotal").text(data.result.storeTotal);
            $("#self-boxTotal").text(data.result.boxTotal);
        } else {
            layer.msg('获取个人账户店铺统计报表失败！', {icon: 5,time: 2000});
        }
    })
    .fail(function() {
        console.log("allAgentStoreInfo error");
    });
}

storeList.getStoreListData = function(pageNo){
    var _this = this;

    var pagi = new Pagination("#store-list-pagination");//分页
    var perPage = 15;
    $("#store-page-show .page-count").text("每页显示" + perPage + "条");
    
    $(".loading-area").fadeIn();
    $.ajax({
        url: BASEURL + 'store/storeList',
        type: 'POST',
        dataType: 'json',
        data: {
            store_name: $("#key-word").val().trim(),
            page: pageNo,
            pageSize: perPage,
            subid: ACCOUNT
        }
    })
    .done(function(data) {
        console.log(data);
        if(data.success) {
            var html = [];
            var listData = data.result.list;
            var pageCount = Math.ceil(data.result.total / perPage);
            for(var i = 0; i < listData.length; i++) {
                var new_versions = data.result.versions;//最新版本
                $('.upgrade-content .tips').next().text(new_versions);
                var store_id = listData[i].id;
                var store_name = listData[i].shop_name == null ? "无名称" : listData[i].shop_name;//店铺名称
                var province = listData[i].province == null ? "" : listData[i].province;//省份
                var city = listData[i].city == null ? "" : "/" + listData[i].city;//城市
                var district = listData[i].district == null ? "" : "/" + listData[i].district;//区县
                var address = province + city + district;
                var detail_address = listData[i].address == null ? "未填" : listData[i].address;//详细地址
                var box_name = listData[i].name == null ? "暂无" : listData[i].name;//盒子名称
                var phone = listData[i].phone == null ? "暂无" : listData[i].phone;//联系电话
                var box_mac = listData[i].gw_mac == null ? "暂无" : listData[i].gw_mac;//盒子mac
                var effetive_range = listData[i].scan_distance == null ? "暂无" : listData[i].scan_distance;//有效范围
                var store_scene = listData[i].scene_name == null ? "暂无" : listData[i].scene_name;//盒子场景
                var box_type = listData[i].box_type == 0 ? "有线盒子" : "无线盒子";//盒子类型
                var cur_version = listData[i].cur_version == null ? "读取失败" : listData[i].cur_version;//盒子当前的版本号
                var date = listData[i].date;//添加日期
                var token = listData[i].token;//token
                var last_heartbeat_time = listData[i].last_heartbeat_time;//最后上线时间
                var now_time = new Date().getTime();
                var set_version = listData[i].set_version;//添加日期
                var box_status = last_heartbeat_time == 0 ? "未连接" : ((Math.abs(now_time - parseInt(last_heartbeat_time)) < 60 * 5) ? '上线' : '离线');
                var detailJson = '{"store_name":"' + store_name + '", "store_address":"' + address + '", "detail_address":"' + detail_address + '"';
                detailJson += ', "phone":"' + phone + '", "store_scene":"' + store_scene + '", "box_name":"' + box_name + '"';
                detailJson += ', "box_mac":"' + box_mac + '", "store_box_range":"' + effetive_range + '米", "box_type":"' + box_type + '"';
                detailJson += ', "add_date":"' + date + '"}';

                html.push('<tr>');
                html.push('<td><input type="checkbox" id="store-' + store_id + '" class="regular-checkbox" name="store-' + store_id + '" value="' + store_id + '" data-id="' + store_id + '" data-token="' + token + '"><label for="store-' + store_id + '"></label><label for="store-' + store_id + '">' + store_name + '</label></td>');
                html.push('<td>' + phone + '</td>');
                html.push('<td>' + box_status + '</td>');
                html.push('<td>' + cur_version + '（' + new_versions + '）</td>');
                html.push('<td>' + date + '</td>');
                html.push('<td class="td_hidden">' + detailJson + '</td>');//详细信息
                html.push('<td>');
                html.push('<span class="info-btn fa fa-info-circle tips" data-token="' + token + '" data-id="' + store_id + '" data-tipso="详情" title="详情"></span>');
                html.push('<span class="edit-btn fa fa-pencil tips" data-token="' + token + '" data-id="' + store_id + '" data-tipso="编辑" title="编辑"></span>');
                html.push('<span class="delete-btn fa fa-trash tips" data-token="' + token + '" data-id="' + store_id + '" data-tipso="删除" title="删除"></span>');
                html.push('</td>');
                html.push('</tr>');
            }
            $("#store-table>tbody").html(html.join(""));

            $('#store-table>tbody td .tips').tipso({
                useTitle: false,
                width: 'auto',
                position: 'bottom',
                background: '#626262'
            });
            //查看详情
            $("#store-table tbody tr td .info-btn").on("click", function() {
                var data = JSON.parse($(this).parent().parent().children('.td_hidden').text());
                var $content = $('#info-child-content .info__container');
                $content.children().remove();
                var show = [
                    { key: 'store_name', name: '店铺名称' },
                    { key: 'store_address', name: '店铺地址' },
                    { key: 'detail_address', name: '详细地址' },
                    { key: 'phone', name: '联系电话' },
                    { key: 'store_scene', name: '店铺场景' },
                    { key: 'box_name', name: '盒子名称' },
                    { key: 'box_mac', name: '盒子mac' },
                    { key: 'store_box_range', name: '有效范围' },
                    { key: 'box_type', name: '盒子类型' },
                    { key: 'add_date', name: '添加日期' }
                ];
                for (var i = 0; i < show.length; i++) {
                    var key = show[i].key;
                    var name = show[i].name;
                    var value = data[key];
                    $content.append('<div class="content" style="padding: 0 50px;">\
                        <span class="name">' + name + '</span>\
                        <span class="value">' + value + '</span>\
                    </div>');
                }
                $("#info-child-box").fadeIn();
                $('#info-child-box .info-cancel, #info-child-box .info-ad-mask').off("click").click(function(event) {
                    $('#info-child-box').fadeOut();
                });
            });
            //编辑按钮
            $("#store-table tbody tr td .edit-btn").on("click", function() {
                var id = $(this).attr('data-id');
                window.location.href = BASEURL + "editStore/" + id;
            });
            //删除按钮
            $("#store-table tbody tr td .delete-btn").on("click", function() {
                var id = $(this).attr('data-id');
                $('#child-del-btn').click(null)
                    .click(function () {
                        _this.deleteStore(id);
                    });
                $('#del-child-box').fadeIn();
            });
            pagi.update({
                pageCount: pageCount,
                pageNo: pageNo
            });
            //分页点击
            var activePage = parseInt($("#store-list-pagination .pagination>.active").text());
            activePage = activePage ? activePage : 1;
            _this.index = activePage;
            $(document).off("click", "#store-list-pagination .pagination>li").on("click", "#store-list-pagination .pagination>li", function() {
                _this.index = parseInt($(this).text()) ? parseInt($(this).text()) : 1;
                _this.getStoreListData(parseInt($(this).text()));
            });
            $(document).off("click",  "#store-list-pagination .pagination-prev").on("click", "#store-list-pagination .pagination-prev", function() {
                if(activePage > 1) {
                    _this.index = activePage - 1;
                    _this.getStoreListData(activePage - 1);
                }
            });
            $(document).off("click", "#store-list-pagination .pagination-next").on("click", "#store-list-pagination .pagination-next", function() {
                if(pageCount - activePage  > 0) {
                    _this.index = parseInt(activePage + 1);
                    _this.getStoreListData(activePage + 1);
                }
            });
            if(data.result.total == 0){
                $("#store-table>tbody").html("");
                $("#dataList-no-data").show();
                $("#store-page-show .page-count").hide();
            }
        } else {
            $("#store-table>tbody").html("");
            $("#dataList-no-data").show();
            $("#store-page-show .page-count").hide();
        }
        $(".loading-area").fadeOut();
    })
    .fail(function() {
        $(".loading-area").fadeOut();
        console.log("error");
    });
}

//盒子采集数据列表
var boxCollectList = {};
boxCollectList.init = function(){
    var _this = this;
    _this.getBoxCollectListData(1);
}
boxCollectList.getBoxCollectListData = function(pageNo){
    var _this = this;

    _this.getCurrentUserBoxList(1);
    $("#box-search-btn").on("click", function() {
        _this.getCurrentUserBoxList(1);
    });

}
boxCollectList.getCurrentUserBoxList = function(pageNo) {
    var _this = this;

    var pagi = new Pagination("#box-list-pagination");//分页
    var perPage = 15;
    $("#box-page-show .page-count").text("每页显示" + perPage + "条");
    
       $(".loading-area").fadeIn();
    $.ajax({
        url: BASEURL + 'getCurrentUserBoxList',
        type: 'POST',
        dataType: 'json',
        data: {
            name: $("#key-word").val().trim(),
            page: pageNo,
            pageSize: perPage
        }
    })
    .done(function(data) {
        console.log(data);
        if(data.success) {
            var html = [];
            var listData = data.result.list;
            var pageCount = Math.ceil(data.result.total / perPage);
            for(var i = 0; i < listData.length; i++) {
                var name = listData[i].name;//盒子名称
                var initial_name = listData[i].initial_name;//初始场景名称
                var chip_no = listData[i].chip_no;//盒子MAC
                var ScanNum = listData[i].ScanNum;//采集人数
                html.push('<tr>');
                html.push('<td>' + name + '</td>');
                html.push('<td>' + ScanNum + '</td>');
                html.push('<td>');
                html.push('<a target="_blank" href="' + BASEURL + 'dataShow?mac=' + chip_no + '">查看详情</a>');
                html.push('</td>');
                html.push('</tr>');
            }
            $("#box-table>tbody").html(html.join(""));
            pagi.update({
                pageCount: pageCount,
                pageNo: pageNo
            });
            //分页点击
            var activePage = parseInt($("#box-list-pagination .pagination>.active").text());
            activePage = activePage ? activePage : 1;
            _this.index = activePage;
            $(document).off("click", "#box-list-pagination .pagination>li").on("click", "#box-list-pagination .pagination>li", function() {
                _this.index = parseInt($(this).text()) ? parseInt($(this).text()) : 1;
                _this.getCurrentUserBoxList(parseInt($(this).text()));
            });
            $(document).off("click",  "#box-list-pagination .pagination-prev").on("click", "#box-list-pagination .pagination-prev", function() {
                if(activePage > 1) {
                    _this.index = activePage - 1;
                    _this.getCurrentUserBoxList(activePage - 1);
                }
            });
            $(document).off("click", "#box-list-pagination .pagination-next").on("click", "#box-list-pagination .pagination-next", function() {
                if(pageCount - activePage  > 0) {
                    _this.index = parseInt(activePage + 1);
                    _this.getCurrentUserBoxList(activePage + 1);
                }
            });
            if(data.result.total == 0){
                $("#box-table>tbody").html("");
                $("#dataList-no-data").show();
                $("#box-page-show .page-count").hide();
            }
        } else {
            $("#box-table>tbody").html("");
            $("#dataList-no-data").show();
            $("#box-page-show .page-count").hide();
        }
        $(".loading-area").fadeOut();
    })
    .fail(function() {
        $(".loading-area").fadeOut();
        console.log("error");
    });
}


var dataShow = {};
dataShow.init = function(){
    var _this = this;
    _this.getUserQuota();
    function GetRequest() {
        var url = location.search;
        if (url.indexOf("?") != -1) {
            var str = url.substr(1);
            strs = str.split("=");
            $("#box-mac").val(strs[1]);
        }
    }
    GetRequest();
    var box_mac = $("#box-mac").val();
    if(box_mac == ""){
        $(".data-show-box").addClass('no-list');
    }
    _this.getBoxCollectListData(1);
    
    $('#result-table>thead td .tips').tipso({
        useTitle: false,
        width: 'auto',
        position: 'bottom',
        background: '#626262'
    });

    $("#scan-recharge-box .scan-recharge-mask").on('click', function(event) {
        event.preventDefault();
        clearInterval(_this.paySuccess);
        $("#scan-recharge-box").fadeOut();
    });
    $("#send-advert-paybox .send-advert-mask").on('click', function(event) {
        event.preventDefault();
        clearInterval(_this.SendAdpaySuccess);
        $("#send-advert-paybox").fadeOut();
    });

    $("#box-search-btn").on('click', function(event) {
        event.preventDefault();
        var key_word = $("#key-word").val().trim();
        if(key_word == ""){
            layer.msg('请输入查询关键字', {icon: 5,time: 2000});
            return;
        }
        var type = 1;
        if(new RegExp(/^([0-9a-fA-F]{2})(([:]?[0-9a-fA-F]{2}){5})$/).test(key_word)){
            type = 1;//mac验证
        }else if(new RegExp(/^([0-9a-zA-Z]{1,})(([/\s-][0-9a-zA-Z]{1,}){4})$/).test(key_word)){
            type = 3;//idfa验证
        }else if(new RegExp(/^[0-9]*$/).test(key_word)){
            type = 2;//IMEI验证
        }
        _this.getUserDetailPortrait(key_word, type);
    });
}

dataShow.getBoxCollectListData = function(pageNo){
    var _this = this;

    var perPage = 15;
    
    $(".loading-area").fadeIn();
    $.ajax({
        url: BASEURL + 'getNewScanMacs',
        type: 'POST',
        dataType: 'json',
        data: {
            code: $("#box-mac").val(),
            // date: '',//采集日期
            // scene_name: '',//场景名称
            page: pageNo,
            pageSize: perPage
        }
    })
    .done(function(data) {
        console.log(data);
        if(data.success) {
            var html = [];
            var listData = data.result.list;
            var pageCount = Math.ceil(data.result.total / perPage);
            for(var i = 0; i < listData.length; i++) {
                var minTime = new Date(listData[i].minTime*1000).toLocaleString();//最早被扫描时间
                var maxTime = new Date(listData[i].maxTime*1000).toLocaleString();//最后被扫描时间
                var user_mac = listData[i].user_mac;//被扫描到的用户mac
                var idfa = listData[i].idfa;//被扫描到的用户idfa
                if(listData[i].idfa == undefined && listData[i].idfa == null){
                    idfa = "暂无";
                }
                var imei = listData[i].imei;//被扫描到的用户imei
                if(listData[i].imei == undefined && listData[i].imei == null){
                    imei = "暂无";
                }
                var androidid = listData[i].androidid;//被扫描到的用户androidid
                if(listData[i].androidid == undefined && listData[i].androidid == null){
                    androidid = "暂无";
                }
                var scan_count = listData[i].scan_count;//被扫描次数
                var scene = listData[i].scene;//场景名称
                html.push('<div class="list-item">');
                html.push('<div class="item-title clearfix">');
                html.push('<span class="one-title">用户手机Mac</span>');
                /*html.push('<span class="two-title">手机型号</span>');*/
                html.push('<span class="three-title">出现时间</span>');
                html.push('</div>');
                html.push('<div class="item-content clearfix">');
                html.push('<span class="one-con">' + user_mac + '</span>');
                /*html.push('<span class="two-con">暂无</span>');*/
                html.push('<span class="three-con">' + minTime + '</span>');
                // if(idfa == "暂无" || imei == "暂无"){
                //     if(USERTYPE != 2) {
                //         html.push('<a href="javascript:;" class="see-detail" data-mac="' + user_mac + '">查看画像</a>');
                //     }
                // }
                // html.push('</div>');
                if(idfa != "暂无" || imei != "暂无" || androidid != "暂无"){
                    html.push('</div>');
                    html.push('<div class="item-title clearfix">');
                    html.push('<span class="one-title">用户手机IMEI</span>');
                    html.push('<span class="three-title">用户手机IDFA</span>');
                    html.push('</div>');
                    html.push('<div class="item-content clearfix">');
                    html.push('<span class="one-con">' + imei + '</span>');
                    html.push('<span class="three-con idfa">' + idfa + '</span>');
                    html.push('</div>');
                    html.push('<div class="item-title clearfix">');
                    html.push('<span class="one-title">用户手机androidID</span>');
                    html.push('<span class="three-title">&nbsp;</span>');
                    html.push('</div>');
                    html.push('<div class="item-content clearfix">');
                    html.push('<span class="one-con">' + androidid + '</span>');
                    html.push('<span class="three-con">&nbsp;</span>');
                    if(USERTYPE != 2) {
                        html.push('<a href="javascript:;" class="send-advert" data-mac="' + user_mac + '">发送广告</a>');
                        html.push('<a href="javascript:;" class="see-detail" data-mac="' + user_mac + '">查看画像</a>');
                    }
                    html.push('</div>');
                }else{
                    if(USERTYPE != 2) {
                        html.push('<a href="javascript:;" class="send-advert" data-mac="' + user_mac + '">发送广告</a>');
                        html.push('<a href="javascript:;" class="see-detail" data-mac="' + user_mac + '">查看画像</a>');
                        html.push('</div>');
                    }
                }
                html.push('</div>');
            }
            $("#collect-list").html($("#collect-list").html() + html.join(""));
            pageNo = parseInt(pageNo);
            if(pageCount > 1){
                if(pageNo == pageCount){
                    $(".load-more").hide();
                }else{
                    $(".load-more").show();
                    $("#load-more-btn").attr('data-page', pageNo + 1);
                    $("#load-more-btn").off('click').on('click', function(event) {
                        event.preventDefault();
                        var thisPage = parseInt($("#load-more-btn").attr('data-page'));
                        _this.getBoxCollectListData(thisPage);
                    });;
                }
            }else{
                $(".load-more").hide();
            }
            $("#collect-list .list-item .item-content .see-detail").off('click').on('click', function(event) {
                event.preventDefault();
                var userMac = $(this).attr('data-mac');
                if(!$(this).attr("disabled")){
                    _this.getUserDetailPortrait(userMac, 1);
                }
            });

            $("#collect-list .list-item .item-content .send-advert").off('click').on('click', function(event) {
                event.preventDefault();
                var userMac = $(this).attr('data-mac');
                if(!$(this).attr("disabled")){
                    _this.sendUserAdvert(userMac);
                }
            });
            
            if(data.result.total == 0){
                $("#box-table>tbody").html("");
                $("#dataList-no-data").show();
                $("#box-page-show .page-count").hide();
            }
        } else {
            $("#box-table>tbody").html("");
            $("#dataList-no-data").show();
            $("#box-page-show .page-count").hide();
        }
        $(".loading-area").fadeOut();
    })
    .fail(function() {
        $(".loading-area").fadeOut();
        console.log("error");
    });
}

dataShow.dataFormat = {
    'deviceinfo': '设备信息',
    'citiestop': '常出现城市',
    'citiesloc': '城市出现频次',
    'homeloc': '休息时间地址',
    'workloc': '工作时间地址',
    'tags': '标签数据',
    'trackwk': '周聚集',
    'trackmth': '月聚集'
};
//设备信息
dataShow.deviceinfoFormat = [
    { key: 'deviceType', name: '设备类型' },
    { key: 'standardBrand', name: '标准品牌' },
    { key: 'originModel', name: '原始机型' },
    { key: 'standardModel', name: '标准机型' },
    { key: 'screen', name: '屏幕尺寸' },
    { key: 'price', name: '价格区间' },
    { key: 'functionType', name: '功能特性' },
    { key: 'hardwareType', name: '硬件特性' },
    { key: 'timeTomarket', name: '上市时间' }
];

//标签数据
dataShow.tagsFormat = [
    { key: 'app', name: '应用兴趣类标签' },
    { key: 'game', name: '游戏兴趣' },
    { key: 'demograph', name: '人口属性' },
    { key: 'consume', name: '消费偏好' },
    { key: 'gamedeepness', name: '游戏深度' },
    { key: 'finance', name: '金融标签' },
    { key: 'resort', name: '常去场所' }
];

//时间
dataShow.timeFormat = [
    { key: '0' },
    { key: '1' },
    { key: '2' },
    { key: '3' },
    { key: '4' },
    { key: '5' },
    { key: '6' },
    { key: '7' },
    { key: '8' },
    { key: '9' },
    { key: '10' },
    { key: '11' },
    { key: '12' },
    { key: '13' },
    { key: '14' },
    { key: '15' },
    { key: '16' },
    { key: '17' },
    { key: '18' },
    { key: '19' },
    { key: '20' },
    { key: '21' },
    { key: '22' },
    { key: '23' }
];

dataShow.paySuccess = setInterval(function(){
    var a = 0;
}, 60000);
//更新页面配额信息
dataShow.getUserQuota = function() {
    $.ajax({
        url: BASEURL + 'getCurrentUserEnoughQuota',
        type: 'post',
        dataType: 'json',
        data: {}
    })
    .done(function(data) {
        console.log(data);
        if(data.success) {
            $("#user-quota").text(data.result);
        } else {
            $("#user-quota").text(0);
        }
    })
    .fail(function() {
        console.log("getUserQuota error");
        ("#user-quota").text(0);
        layer.msg('查询用户画像配额信息失败！', {icon: 5,time: 2000});
    });
}

dataShow.SendAdpaySuccess = setInterval(function(){
    var a = 0;
}, 60000);
//发送定向广告
dataShow.sendUserAdvert = function(userMac) {
    var _this = this;
    $(".loading-area").fadeIn();
    $("#collect-list .list-item .item-content .send-advert").attr('disabled', 'true');
    $("#collect-list .list-item .item-content .send-advert").css('cursor', 'no-drop');
    $.ajax({
        url: BASEURL + 'task/mapMacImeiIdfa',
        type: 'post',
        dataType: 'json',
        data: {
            type: 'mac',
            id: userMac
        }
    })
    .done(function(data) {
        console.log(data);
        $(".loading-area").fadeOut();
        if(data.success) {
            if(data.result.idfa != null){
                _this.getSendAdPayErcode(userMac, data.result.idfa);
            }else if(data.result.imei != null){
                _this.getSendAdPayErcode(userMac, data.result.imei);
            }else{
                layer.msg('此广告指纹已被占用！', {icon: 5,time: 2000});
            }
        }else{
            layer.msg('此广告指纹已被占用！', {icon: 5,time: 2000});
            $("#collect-list .list-item .item-content .send-advert").removeAttr('disabled');
            $("#collect-list .list-item .item-content .send-advert").css('cursor', 'pointer');
        }
    })
    .fail(function() {
        console.log("sendUserAdvert error");
        $(".loading-area").fadeOut();
        layer.msg('此广告指纹已被占用！', {icon: 5,time: 2000});
        $("#collect-list .list-item .item-content .send-advert").removeAttr('disabled');
        $("#collect-list .list-item .item-content .send-advert").css('cursor', 'pointer');
    });
}
//请求付款二维码
dataShow.getSendAdPayErcode = function(userMac, idfaOrImei){
    var _this = this;
    $.ajax({
        url: BASEURL + 'wxpay/propay/scanadreviewreq',
        type: 'post',
        dataType: 'json',
        data: {
            mac: userMac,
            id: idfaOrImei
        }
    })
    .done(function(data) {
        console.log(data);
        if(data.success) {
            $("#advertpay-qrcode").attr('src', data.result);
            $("#send-advert-paybox").fadeIn();
            _this.SendAdpaySuccess = setInterval(function(){
                _this.checkPaySuccess(userMac);
            }, 3000);
            $("#advert-check-recharge").off('click').on('click', function(event) {
                event.preventDefault();
                _this.checkPaySuccess(userMac);
            });
        }else if(data.errCode == 403){
            layer.msg(data.errMsg, {icon: 5,time: 2000});
            $("#collect-list .list-item .item-content .send-advert").removeAttr('disabled');
            $("#collect-list .list-item .item-content .send-advert").css('cursor', 'pointer');
        }
    })
    .fail(function() {
        console.log("getSendAdPayErcode error");
        layer.msg('付款码获取失败！请重新操作或稍后重试', {icon: 5,time: 2000});
    });
}
//检查是否付款成功
dataShow.checkPaySuccess = function(userMac){
    var _this = this;
    $.ajax({
        url: BASEURL + 'wxpay/propay/scanadreviewstatus',
        type: 'post',
        dataType: 'json',
        data: {
            mac: userMac
        }
    })
    .done(function(data) {
        console.log(data);
        if(data.success) {
            $("#collect-list .list-item .item-content .send-advert").removeAttr('disabled');
            $("#collect-list .list-item .item-content .send-advert").css('cursor', 'pointer');
            clearInterval(_this.SendAdpaySuccess);
            $(".advertpay-success").show();
            setTimeout(function(){
                 $("#send-advert-paybox").fadeOut();
                 $(".advertpay-success").hide();
                 layer.msg('广告投放成功！', {icon: 6,time: 2000});
            }, 500);
        }
    })
    .fail(function() {
        console.log("checkPaySuccess error");
    });
}


dataShow.getUserDetailPortrait = function(userMac, key_type){
    var _this = this;
    $("#collect-list .list-item .item-content .see-detail").attr('disabled', 'true');
    $("#collect-list .list-item .item-content .see-detail").css('cursor', 'no-drop');
    $(".no-data-box").hide();
    $(".result-view-box").hide();
    $("#probar").show();
    $(".load-bar-inner").css({'width': '0'});
    $(".load-bar-inner").animate({
        width: "75%"
    }, 1500);
    var si = window.setInterval(
    function(){
        a = $(".load-bar-inner").width();
        b = (a / 320 * 100).toFixed(0);
        $(".load-bar-percent").text(b + '%');
    }, 50);
    $.ajax({
        url: BASEURL + 'showPlatformUserPortrait',
        type: 'POST',
        dataType: 'json',
        data: {
            code: userMac,
            type: key_type,     //1:mac，2:imei，3:idfa
            source: 0
        }
    })
    .done(function(data) {
        console.log(data);
        if(data.errCode === 2000){
            $("#pay-qrcode").attr('src', data.result);
            $("#scan-recharge-box").fadeIn();
            _this.paySuccess = setInterval(function(){
                _this.getCurrentUserEnoughQuota(userMac, key_type);
            }, 3000);
            $("#check-recharge").off('click').on('click', function(event) {
                event.preventDefault();
                _this.getCurrentUserEnoughQuota(userMac, key_type);
            });
        } else if(data.errCode === 200 && data.success == true){
            _this.getUserQuota();
            var html = [];
            var userData = data.result;
            $(".load-bar-inner").animate({
                width: "100%"
            }, 300, function(){
                $("#probar").hide();
                $(".result-view-box").show();
            });
            $(".result-title").text(userData.type.toUpperCase() + "：" + userData.code.toUpperCase());
            //设备信息
            if(userData.deviceinfo != undefined){
                for (var i = 0; i < _this.deviceinfoFormat.length; i++) {
                    var key = _this.deviceinfoFormat[i].key;
                    var name = _this.deviceinfoFormat[i].name;
                    var value = userData.deviceinfo[key];
                    html.push('<tr>');
                    if(i == 0){
                        html.push('<td align="center" rowspan="' + _this.deviceinfoFormat.length + '" class="brt no-indent">' + _this.dataFormat.deviceinfo + '</td>');
                    }
                    html.push('<td class="brt">' + name + '：' + value + '</td><td class="bt">暂无</td>');
                    html.push('</tr>');
                }
            }
            //tags标签
            if(userData.tags != undefined){
                for (var i = 0; i < _this.tagsFormat.length; i++) {
                    var key = _this.tagsFormat[i].key;
                    var name = _this.tagsFormat[i].name;
                    var tagsData = userData.tags[key];
                    if(tagsData != undefined){
                        for (var j = 0; j < tagsData.length; j++) {
                            html.push('<tr>');
                            if(j == 0){
                                html.push('<td align="center" rowspan="' + tagsData.length + '" class="brt no-indent">' + name + '</td>');
                            }
                            html.push('<td class="brt">' + tagsData[j].name + '</td><td class="bt">' + tagsData[j].weight + '</td>');
                            html.push('</tr>');
                        }
                    }
                }
            }
            //休息时间地址
            var homeloc = userData.homeloc;
            if(homeloc != undefined){
                for (var i = 0; i < homeloc.length; i++) {
                    var value = homeloc[i].poi;
                    html.push('<tr>');
                    if(i == 0){
                        html.push('<td align="center" rowspan="' + homeloc.length + '" class="brt no-indent">' + _this.dataFormat.homeloc + '</td>');
                    }
                    html.push('<td class="brt">' + value + '</td><td class="bt">暂无</td>');
                    html.push('</tr>');
                }
            }
            //工作时间地址
            var workloc = userData.workloc;
            if(workloc != undefined){
                for (var i = 0; i < workloc.length; i++) {
                    var lat = workloc[i].lat;
                    var lng = workloc[i].lng;
                    html.push('<tr>');
                    if(i == 0){
                        html.push('<td align="center" rowspan="' + workloc.length + '" class="brt no-indent">' + _this.dataFormat.workloc + '</td>');
                    }
                    html.push('<td class="brt"><span>经度:' + lng + ',纬度:' + lat + '</span>');
                    html.push('&nbsp;&nbsp;<a href="javascript:;" class="c_aff" data-lat="' + lat + '" data-lng="' + lng + '">点击转换为地址</a></td><td class="bt">暂无</td>');
                    html.push('</tr>');
                }
            }
            //城市出现频次
            var citiesloc = userData.citiesloc;
            if(citiesloc != undefined){
                for (var i = 0; i < citiesloc.length; i++) {
                    var name = citiesloc[i].name;//城市名
                    var cnt = citiesloc[i].cnt;//频次
                    html.push('<tr>');
                    if(i == 0){
                        html.push('<td align="center" rowspan="' + citiesloc.length + '" class="brt no-indent">' + _this.dataFormat.citiesloc + '</td>');
                    }
                    html.push('<td class="brt">' + name + '，频次：' + cnt + '</td><td class="bt">暂无</td>');
                    html.push('</tr>');
                }
            }
            //周聚集
            var trackwk = userData.trackwk;
            var trackwk_count = 0;
            if(trackwk != undefined){
                var w = trackwk.w;//工作日时段的聚集点数据
                var e = trackwk.e;//周末时段的聚集点数据
                if(w != undefined){
                    for (var i = 0; i < _this.timeFormat.length; i++) {
                        var key = _this.timeFormat[i].key;
                        var value = w[key];
                        if(Array.isArray(value)){
                            for (var j = 0; j < value.length; j++) {
                                var lat = value[j].lat;//纬度
                                var lng = value[j].lng;//经度
                                var cnt = value[j].cnt;//频次
                                html.push('<tr>');
                                if(trackwk_count == 0){
                                    html.push('<td align="center" rowspan="' + value.length + '" class="brt no-indent trackwk-td">' + _this.dataFormat.trackwk + '</td>');
                                }
                                html.push('<td class="brt"><span>经度:' + lng + ',纬度:' + lat + '</span>，频次：' + cnt + '');
                                html.push('&nbsp;&nbsp;<a href="javascript:;" class="c_aff" data-lat="' + lat + '" data-lng="' + lng + '">点击转换为地址</a></td><td class="bt">暂无</td>');
                                html.push('</tr>');
                                trackwk_count++;
                            }//for end
                        }else {
                            for(var k in value){
                                var lat = value[k].lat;//纬度
                                var lng = value[k].lng;//经度
                                var cnt = value[k].cnt;//频次
                                html.push('<tr>');
                                if(trackwk_count == 0){
                                    html.push('<td align="center" rowspan="' + value.length + '" class="brt no-indent trackwk-td">' + _this.dataFormat.trackwk + '</td>');
                                }
                                html.push('<td class="brt"><span>经度:' + lng + ',纬度:' + lat + '</span>，频次：' + cnt + '');
                                html.push('&nbsp;&nbsp;<a href="javascript:;" class="c_aff" data-lat="' + lat + '" data-lng="' + lng + '">点击转换为地址</a></td><td class="bt">暂无</td>');
                                html.push('</tr>');
                                trackwk_count++;
                            } 
                        }
                    }//for end
                }//if end
            }//if end
            //月聚集
            var trackmth = userData.trackmth;
            var trackmth_count = 0;
            if(trackmth != undefined){
                var w = trackmth.w;//工作日时段的聚集点数据
                var e = trackmth.e;//周末时段的聚集点数据
                if(w != undefined){
                    for (var i = 0; i < _this.timeFormat.length; i++) {
                        var key = _this.timeFormat[i].key;
                        var value = w[key];
                        if(Array.isArray(value)){
                            for (var j = 0; j < value.length; j++) {
                                var lat = value[j].lat;//纬度
                                var lng = value[j].lng;//经度
                                var cnt = value[j].cnt;//频次
                                html.push('<tr>');
                                if(trackmth_count == 0){
                                    html.push('<td align="center" rowspan="' + value.length + '" class="brt no-indent trackmth-td">' + _this.dataFormat.trackmth + '</td>');
                                }
                                html.push('<td class="brt"><span>经度:' + lng + ',纬度:' + lat + '</span>，频次：' + cnt + '');
                                html.push('&nbsp;&nbsp;<a href="javascript:;" class="c_aff" data-lat="' + lat + '" data-lng="' + lng + '">点击转换为地址</a></td><td class="bt">暂无</td>');
                                html.push('</tr>');
                                trackmth_count++;
                            }//for end
                        }else {
                            for(var k in value){
                                var lat = value[k].lat;//纬度
                                var lng = value[k].lng;//经度
                                var cnt = value[k].cnt;//频次
                                html.push('<tr>');
                                if(trackmth_count == 0){
                                    html.push('<td align="center" rowspan="' + value.length + '" class="brt no-indent trackmth-td">' + _this.dataFormat.trackmth + '</td>');
                                }
                                html.push('<td class="brt"><span>经度:' + lng + ',纬度:' + lat + '</span>，频次：' + cnt + '');
                                html.push('&nbsp;&nbsp;<a href="javascript:;" class="c_aff" data-lat="' + lat + '" data-lng="' + lng + '">点击转换为地址</a></td><td class="bt">暂无</td>');
                                html.push('</tr>');
                                trackmth_count++;
                            } 
                        }
                    }//for end
                }//if end
            }//if end
            $("#result-table tbody").html(html.join(""));
            $(".trackwk-td").attr('rowspan', trackwk_count);
            $(".trackmth-td").attr('rowspan', trackmth_count);
            //转换地址
            $("#result-table tbody tr td .c_aff").on("click", function() {
                _this.getWorkLoc($(this).attr('data-lat'), $(this).attr('data-lng'), $(this));
            });
            $("#collect-list .list-item .item-content .see-detail").removeAttr('disabled');
            $("#collect-list .list-item .item-content .see-detail").css('cursor', 'pointer');
        }else if(data.success == false){
            $("#probar").hide();
            $(".result-view-box").hide();
            $(".no-data-box").show();
            $("#collect-list .list-item .item-content .see-detail").removeAttr('disabled');
            $("#collect-list .list-item .item-content .see-detail").css('cursor', 'pointer');
        }
    })
    .fail(function() {
        console.log("showPlatformUserPortrait error");
        layer.msg('匹配人物画像失败！', {icon: 5,time: 2000});
    });
}

//根据经纬度获取地址
dataShow.getWorkLoc = function(lat, lng, domId){
    var formatted_address = "";
    domId.text("转换中...");
    $.ajax({
        url: 'http://api.map.baidu.com/geocoder/v2/',
        type: 'get',
        dataType: 'jsonp',
        jsonp:'callback',
        async: false,
        data: {
            location: lat + ',' + lng,
            output: 'json',
            pois: 1,
            ak: 'hd0lXCZZrZFqLG7RrGABOtNbaqeieKwh'
        }
    })
    .done(function(data) {
        console.log(data);
        formatted_address = data.result.formatted_address;
        domId.siblings('span').text(formatted_address);
        domId.remove();
    })
    .fail(function() {
        console.log("map.baidu error");
        formatted_address = "经度:" + lng + ",纬度:" + lat;
        domId.siblings('span').text(formatted_address);
        domId.remove();
    });
}

//查询用户画像配额次数
dataShow.getCurrentUserEnoughQuota = function(userMac, key_type){
    var _this = this;
    $.ajax({
        url: BASEURL + 'getCurrentUserEnoughQuota',
        type: 'post',
        dataType: 'json',
        data: {}
    })
    .done(function(data) {
        console.log(data);
        if(data.success && data.result > 0) {
            clearInterval(_this.paySuccess);
            $("#user-quota").text(data.result);
            $(".pay-success").show();
            setTimeout(function(){
                 $("#scan-recharge-box").fadeOut();
                 $(".pay-success").hide();
                 _this.getUserDetailPortrait(userMac, key_type);
            }, 300);
        }
    })
    .fail(function() {
        console.log("getCurrentUserEnoughQuota error");
        layer.msg('查询用户画像配额信息失败！', {icon: 5,time: 2000});
    });
}

//获取支付二维码
dataShow.getPayErcode = function(){
    var ercode_src = "";
    $.ajax({
        url: BASEURL + 'wxpay/propay/scanpayreq',
        type: 'post',
        dataType: 'json',
        data: {
            uid: $("#user-id").val()
        }
    })
    .done(function(data) {
        console.log(data);
        if(data.success) {
            ercode_src = data.result;
            $("#pay-qrcode").attr('src', ercode_src);
            $("#scan-recharge-box").fadeIn();
        }else{
            layer.msg(data.errMsg, {icon: 5,time: 2000});
        }
    })
    .fail(function() {
        console.log("getPayErcode error");
        layer.msg('支付二维码获取失败！', {icon: 5,time: 2000});
    });
}

var inputAdvertData = {};
inputAdvertData.init = function(){
    var _this = this;
    _this.uploadQiniuImage();
    $("#submit-button").on('click', function(event) {
        event.preventDefault();
        $(".loading-area").fadeIn();
        $.ajax({
            url: BASEURL + 'ad/uploadad',
            type: 'post',
            dataType: 'json',
            data: {
                creativeId: $("#idea-id").val(),//广告（创意）id
                advertiserId: $("#user-id").val(),//广告主id
                creativeTradeId: $("#industry-id").val(),//广告行业id
                adwidth: $("#img-width").val(),//广告宽
                adheight: $("#img-height").val(),//广告高
                targetUrl: $("#click-link").val(),//点击链接
                landingPage: $("#go-link").val(),//到达页面链接
                imgurl: $("#idea-portal_ad_img").val()//广告展示页链接
            }
        })
        .done(function(data) {
            console.log(data);
            $(".loading-area").fadeOut();
            if(data.success) {
                layer.msg('录入成功！', {icon: 5,time: 2000});
            }else{
                layer.msg(data.errMsg, {icon: 5,time: 2000});
            }
        })
        .fail(function() {
            console.log("uploadad error");
            $(".loading-area").fadeOut();
            layer.msg('录入失败！', {icon: 5,time: 2000});
        });
    });
}
inputAdvertData.uploadQiniuImage = function(){
    var _this = this;
    var domain = 'http://share.soundtooth.cn/';
    var isHover = false;

    var uploader = Qiniu.uploader({
        runtimes: 'html5,html4',
        browse_button: 'idea-file',
        //container: 'img-box',
        // drop_element: 'container',
        max_file_size: '100kb',
        // flash_swf_url: 'js/plupload/Moxie.swf',
        // dragdrop: true,
        multi_selection: false,
        chunk_size: '4mb',
        uptoken_url: BASEURL + "admin/api/getUploadToken",
        domain: domain,
        unique_names: true,
        get_new_uptoken: true,
        auto_start: true,
        filters : {
            max_file_size : '150kb',
            prevent_duplicates: false,
            // Specify what files to browse for
            mime_types: [
                {title : "Image files", extensions : "jpg,gif,png,jpeg"}, // 限定jpg,gif,png后缀上传
            ]
        },
        init: {
            'FilesAdded': function(up, files) {
                var _up = up;
                plupload.each(files, function(file) {
                    isHover = false;
                    // 文件添加进队列后,处理相关的事情
                    var _file = file;
                    var $status = $('#uploading-kidd');

                    $status.text('上传中')
                            .css('display', 'inline-block');
                });
            },
            'BeforeUpload': function(up, file) {},
            'UploadProgress': function(up, file) {},
            'UploadComplete': function() {},
            'FileUploaded': function(up, file, info) {
                "use strict";
                var infoObj = JSON.parse(info);
                var url = domain + infoObj.key;
                var $status = $('#uploading-kidd');
                $status.text('上传成功')
                        .css('cursor', 'auto');
                $('#idea-portal_ad_img').val(url);
            },
            'Error': function(up, err, errTip) {
                var $status = $('#uploading-kidd');

                if(err.code == -600) {
                    $status.text('图片不能超过150kb，请重新上传').show();
                } else {
                    $status.text('请重新上传').show();
                }
            }
        }
    });
}
//一键监测
var monitorList = {};
monitorList.init = function(){
    var _this = this;
    //广告列表时间选择
    var dateRange = new pickerDateRange('ad-search-date', {
        isTodayValid : false,
        startDateId : 'ad-startDate', // 开始日期输入框ID
        endDateId : 'ad-endDate', // 结束日期输入框ID
        startDate : getDateStr(-30),
        endDate : getDateStr(0),
        isTodayValid : true,
        calendars : 2, // 展示的月份数，最大是2
        defaultText : ' - ',
        inputTrigger : 'ad-search-date',
        autoSubmit : false, //没有确定，取消按钮，直接提交
        theme : 'ta'
    });
    $("#ad-search-btn").on("click", function() {
        _this.getMonitorList(1);
    });
    $("#search-advert-byname").on("click", function() {
        _this.getMonitorList(1);
    });
    //状态下拉
    $(document).on("click", "#ad-status-select .dropdown-menu>li", function() {
        $(this).parents("#ad-status-select").attr("data-status", $(this).attr("data-status"));
    });
    _this.adListPagi = new Pagination("#monitorList-pagination");//广告列表分页
    _this.getMonitorList(1);
    $("#add-monitor-btn").on("click", function() {
        var mid = $(this).attr("data-mid");
        var opera = $(this).attr("data-opera");
        _this.addWatchUrl(mid, opera);
    });
}
//获取一键监测列表
monitorList.getMonitorList = function(pageNo){
    var _this = this;
    $('.loading-area').fadeIn();
    var pageDataCount = 15;//每页数量（可拓展为参数）
    var selectStatus = $("#ad-status-select").attr("data-status");
    $.ajax({
        url: BASEURL + 'baidu/advertStatistics',
        type: 'POST',
        dataType: 'json',
        data: {
            user_id: ACCOUNT,
            title: $("#key-adname").val(),//搜索关键词
            startTime: $("#ad-startDate").val(),//开始时间
            endTime: $("#ad-endDate").val(),//结束时间
            page: pageNo,//当前页码
            pageSize: pageDataCount,//每页数量
            adType: 0
        }
    })
    .done(function(data) {
        console.log(data);
        if(data.success) {
            if(data.result.messageList.length > 0){
                //渲染
                $("#ad-no-data").hide();
                $("#ad-page-show").show();
                var message_adTotal = data.result.analysis.messageCount == null ? 0 : data.result.analysis.messageCount;//广告总数
                var pageCount = Math.ceil(message_adTotal / pageDataCount);//计算总页数
                var html = "";
                for(var i = 0, len = data.result.messageList.length; i < len; i++) {
                    var info = data.result.messageList[i];
                    var advertId = info.id;
                    var adTitle = info.title ? info.title : "无名称";//名称
                    var message_link = info.message_link == null ? "javascript:;" : getUrl(info.message_link);//广告链接
                    var adStatus = ADVERT_STATUS_ARR[info.status];//广告状态
                    var is_watch = info.is_watch == 0 ? "未被监测" : "已监测";
                    var state = info.state;//1启用0禁用
                    var channel_image = info.channel_image == null ? "" : info.channel_image;
                    if(channel_image.indexOf(",")){
                        channel_image = channel_image.split(',')[0];
                    }
                    var opera = "";
                    if(state === 0){
                        //禁用
                        opera += '<span class="lock-btn fa fa-lock tipso_style" data-state="1" data-advertId="' + advertId + '" data-opera="启用" data-tipso="启用监测"></span>';
                    }else if(state === 1){
                        //启用
                        opera += '<span class="lock-btn fa fa-unlock tipso_style" data-state="0" data-advertId="' + advertId + '" data-opera="禁用" data-tipso="禁用监测"></span>';
                    }
                    if(is_watch == "未被监测"){
                        opera += '<a href="javascript:;" class="add-monitor" data-advertId="' + advertId + '" data-opera="add">添加监测</a>';
                    }else{
                        opera += '<a href="javascript:;" class="edit-monitor" data-advertId="' + advertId + '" data-opera="update">编辑监测</a>';
                    }
                    html += '<tr><td>' + adTitle + '</td>';
                    html += '<td><a href="' + message_link + '" target="_blank"><img src="' + channel_image + '" alt="' + adTitle + '"></a></td>';
                    html += '<td>' + adStatus + '';
                    html += '<td>' + is_watch + '';
                    html += '<td class="ad-status-td">' + opera + '';
                    html += '</td></tr>';
                }
                $("#monitorList-table>tbody").html(html);
                $('#monitorList-table>tbody td .tipso_style').tipso({
                    useTitle: false,
                    width: 'auto',
                    position: 'bottom',
                    background: '#626262'
                });
                //添加
                $("#monitorList-table tbody tr td .add-monitor").on("click", function() {
                    var advertId = $(this).attr("data-advertId");
                    $("#add-monitor-btn").attr('data-mid', advertId);
                    $("#add-monitor-btn").attr("data-opera", $(this).attr("data-opera"));
                    layer.open({
                        type: 1,
                        shade: 0.5,
                        title: false,
                        scrollbar: false,
                        area: ['500px', '300px'],
                        content: $('#add-monitor-box'), //捕获的元素
                        cancel: function(index){
                            $("#monitor-js").val("");
                            layer.close(index);
                        }
                    });
                    _this.urlConvert(advertId);
                });
                //编辑
                $("#monitorList-table tbody tr td .edit-monitor").on("click", function() {
                    var advertId = $(this).attr("data-advertId");
                    $("#add-monitor-btn").attr('data-mid', advertId);
                    $("#add-monitor-btn").attr("data-opera", $(this).attr("data-opera"));
                    _this.showWatchUrl(advertId);
                    layer.open({
                        type: 1,
                        shade: 0.5,
                        title: false,
                        scrollbar: false,
                        area: ['500px', '300px'],
                        content: $('#add-monitor-box'), //捕获的元素
                        cancel: function(index){
                            $("#monitor-js").val("");
                            layer.close(index);
                        }
                    });
                    _this.urlConvert(advertId);
                });
                
                //启用、禁用
                $("#monitorList-table tbody tr td .lock-btn").on("click", function() {
                    var state = $(this).attr("data-state");
                    var advertId = $(this).attr("data-advertId");
                    var opera = $(this).attr("data-opera");
                    layer.confirm('确定要' + opera + '广告监测吗？', { icon:3, title:'提醒' }, function(index){
                        _this.stateWatchUrl(state, advertId);
                    });
                });
                //分页
                _this.adListPagi.update({
                    pageCount: pageCount,
                    pageNo: pageNo
                });
                //分页点击
                var activePage = parseInt($("#monitorList-pagination .pagination>.active").text());
                activePage = activePage ? activePage : 1;
                $(document).off("click", "#monitorList-pagination .pagination>li").on("click", "#monitorList-pagination .pagination>li", function() {
                    _this.getMonitorList(parseInt($(this).text()));
                });
                $(document).off("click",  "#monitorList-pagination .pagination-prev").on("click", "#monitorList-pagination .pagination-prev", function() {
                    if(activePage > 1) {
                        _this.getMonitorList(activePage - 1);
                    }
                });
                $(document).off("click", "#monitorList-pagination .pagination-next").on("click", "#monitorList-pagination .pagination-next", function() {
                    if(pageCount - activePage  > 0) {
                        _this.getMonitorList(activePage + 1);
                    }
                });
            }else{
                //暂无数据
                $("#monitorList-table>tbody").html("");
                $("#ad-no-data").show();
                $("#ad-page-show").hide();
            }
            //结束
        }
        $('.loading-area').fadeOut();
    })
    .fail(function() {
        console.log("get advertStatistics error");
        $('.loading-area').fadeOut();
    });
}
//获取转换后的url
monitorList.urlConvert = function(mid){
    var index = layer.load(2);
    $.ajax({
        url: BASEURL + 'baidu/urlConvert',
        type: 'post',
        dataType: 'json',
        data: {
            mid: mid //广告id
        }
    })
    .done(function(data) {
        console.log(data);
        if(data.success){
            $("#monitor-link").text(data.result);
        }
        layer.close(index);
    })
    .fail(function() {
        console.log("urlConvert error");
        layer.close(index);
        layer.msg('获取监测链接失败！', {icon: 5,time: 2000});
    });
}
//百度统计代码
monitorList.addWatchUrl = function(mid, opera){
    var _this = this;
    if($("#monitor-js").val().trim() == ""){
        layer.msg('请输入监测脚本！', {icon: 5,time: 2000});
        $("#monitor-js").focus();
        return;
    }
    var apiUrl = "baidu/addWatchUrl";
    if(opera == "update"){
        apiUrl = "baidu/updateWatchUrl";
    }
    var index = layer.load(2);
    $.ajax({
        url: BASEURL + apiUrl,
        type: 'post',
        dataType: 'json',
        data: {
            mid: mid,//广告id
            baidu_code: $("#monitor-js").val()
        }
    })
    .done(function(data) {
        console.log(data);
        layer.close(index);
        if(data.success){
            layer.msg('提交成功！', {icon: 6,time: 2000}, function(){
                $("#monitor-js").val("");
                layer.closeAll();
                _this.getMonitorList(1);
            });
        }
    })
    .fail(function() {
        console.log("addWatchUrl error");
        layer.close(index);
        layer.msg('提交失败！', {icon: 5,time: 2000});
    });
}
//开启关闭监测
monitorList.stateWatchUrl = function(state, mid){
    var _this = this;
    var index = layer.load(2);
    $.ajax({
        url: BASEURL + 'baidu/stateWatchUrl',
        type: 'post',
        dataType: 'json',
        data: {
            state: state, //(1启用/0禁用)
            mid: mid //广告id
        }
    })
    .done(function(data) {
        console.log(data);
        layer.close(index);
        if(data.success){
            layer.msg('操作成功！', {icon: 6,time: 2000}, function(){
                _this.getMonitorList(1);
            });
        }
    })
    .fail(function() {
        console.log("stateWatchUrl error");
        layer.close(index);
        layer.msg('操作失败！', {icon: 5,time: 2000});
    });
}
//显示单个监测信息
monitorList.showWatchUrl = function(mid){
    var index = layer.load(2);
    $.ajax({
        url: BASEURL + 'baidu/showWatchUrl',
        type: 'post',
        dataType: 'json',
        data: {
            mid: mid //广告id
        }
    })
    .done(function(data) {
        console.log(data);
        if(data.success){
            $("#monitor-js").val(data.result.baidu_code);
        }
    })
    .fail(function() {
        console.log("showWatchUrl error");
        layer.msg('获取信息失败！', {icon: 5,time: 2000});
    });
}

//添加店铺（盒子组合）
var addBoxGroup = {};
addBoxGroup.init = function(){
    var _this = this;
    _this.getBoxLists();
    $("#submit-button").on('click', function(event) {
        event.preventDefault();
        var group_name = $("#group-name").val().trim();
        if(group_name == ""){
            layer.msg('店铺名称不允许为空！', {icon: 5,time: 2000});
            $("#group-name").focus();
            return;
        }
        var count = 0;//选择的盒子个数
        var boxMac = "";
        $('#box-list').find('input[type="checkbox"]').each(function () {
            if ($(this).prop('checked') === true) {
                count++;
                boxMac += this.value + ",";
            }
        });
        if(count < 2){
            layer.msg('至少选择两个盒子！', {icon: 5,time: 2000});
            return;
        }
        boxMac = boxMac.substring(0, boxMac.length - 1);
        _this.addSceneStoreInfo(group_name, boxMac);
    });
}
addBoxGroup.getBoxLists = function(){
    $(".loading-area").fadeIn();
    $.ajax({
        url: BASEURL + 'store/getChipnoList',
        type: 'post',
        dataType: 'json',
        data: {}
    })
    .done(function(data) {
        console.log(data);
        if(data.success) {
            var html = '';
            var listData = data.result;
            for(var i = 0; i < listData.length; i++) {
                var id = listData[i].id;
                var chip_name = listData[i].name == "" ? "未知盒子" : listData[i].name;//盒子名称
                var chip_no = listData[i].chip_no;//盒子mac
                html += '<label class="checkbox-inline pointer">';
                html += '<input name="box-list-checkbox" id="box-ck-' + id + '" class="regular-checkbox" type="checkbox" value="' + chip_no + '">';
                html += '<label for="box-ck-' + id + '"></label>';
                html += '<span class="checkbox-name">' + chip_name + '</span>';
                html += '</label>';
            }
            $("#box-list").html(html);
        }
        $(".loading-area").fadeOut();
    })
    .fail(function() {
        console.log("getChipnoList error");
        $(".loading-area").fadeOut();
        layer.msg('获取盒子列表失败！', {icon: 5,time: 2000});
    });
}
addBoxGroup.addSceneStoreInfo = function(group_name, boxMac){
    $(".loading-area").fadeIn();
    $.ajax({
        url: BASEURL + 'store/addSceneStoreInfo',
        type: 'post',
        dataType: 'json',
        data: {
            store_name: group_name,
            chip_no: boxMac
        }
    })
    .done(function(data) {
        console.log(data);
        $(".loading-area").fadeOut();
        if(data.success) {
            layer.msg('添加店铺成功！', {icon: 6,time: 2000}, function(){
                window.location.href = BASEURL + 'boxGroupList';
            });
        }else{
            layer.msg(data.errMsg, {icon: 5,time: 2000});
        }
    })
    .fail(function() {
        console.log("addSceneStoreInfo error");
        $(".loading-area").fadeOut();
        layer.msg('添加店铺失败!', {icon: 5,time: 2000});
    });
}

//店铺列表（盒子组合）
var boxGroupList = {};
boxGroupList.init = function(){
    var _this = this;
    var dateRange = new pickerDateRange('box-group-date', {
        isTodayValid : false,
        startDateId : 'box-startDate', // 开始日期输入框ID
        endDateId : 'box-endDate', // 结束日期输入框ID
        startDate : getDateStr(-30),
        endDate : getDateStr(0),
        isTodayValid : true,
        calendars : 2, // 展示的月份数，最大是2
        defaultText : ' - ',
        inputTrigger : 'box-group-date',
        autoSubmit : false, //没有确定，取消按钮，直接提交
        theme : 'ta'
    });
    $("#box-search-btn").on('click', function(event) {
        event.preventDefault();
        _this.getBoxGroupList(1);
    });
    $("#del-child-box .del-ad-mask, #del-child-box .del-cancel").on('click', function(event) {
        event.preventDefault();
        $("#del-child-box").fadeOut();
    });
    $("#box-del-btn").on('click', function(event) {
        event.preventDefault();
        var id = $(this).attr('data-id');
        $(".loading-area").fadeIn();
        $.ajax({
            url: BASEURL + 'store/deleteSceneStoreInfo',
            type: 'post',
            dataType: 'json',
            data: {
                shopid: id
            }
        })
        .done(function(data) {
            console.log(data);
            $(".loading-area").fadeOut();
            if(data.success) {
                layer.msg('删除店铺成功！', {icon: 6,time: 2000}, function(){
                    $("#del-child-box").fadeOut();
                    _this.getBoxGroupList(1);
                });
            }
        })
        .fail(function() {
            console.log("deleteSceneStoreInfo error");
            $(".loading-area").fadeOut();
            layer.msg('删除店铺失败!', {icon: 5,time: 2000});
        });
    });
    $("#info-child-box .info-ad-mask, #info-group-content .info-cancel").on('click', function(event) {
        event.preventDefault();
        $("#info-child-box").fadeOut();
        $("#info-group-content .info__container").html("");
    });
    _this.getBoxGroupList(1);
}
boxGroupList.getBoxGroupList = function(pageNo){
    var _this = this;

    var pagi = new Pagination("#box-list-pagination");//分页
    var perPage = 15;
    $("#box-page-show .page-count").text("每页显示" + perPage + "条");
    
    $(".loading-area").fadeIn();
    $.ajax({
        url: BASEURL + 'store/getSceneStoreList',
        type: 'POST',
        dataType: 'json',
        data: {
            store_name: $("#key-word").val().trim(),
            start_date: $("#box-startDate").val(),
            end_date: $("#box-endDate").val(),
            page: pageNo,//当前页数
            pageSize: perPage//每页显示数量
        }
    })
    .done(function(data) {
        console.log(data);
        if(data.success) {
            var html = [];
            var listData = data.result.list;
            var pageCount = Math.ceil(data.result.total / perPage);
            for(var i = 0; i < listData.length; i++) {
                var id = listData[i].id;//id
                var name = listData[i].name;//name
                var date = listData[i].date;//date
                html.push('<tr>');
                html.push('<td>' + name + '</td>');
                html.push('<td>' + date + '</td>');
                html.push('<td>');
                html.push('<span class="info-btn fa fa-info-circle tips" data-id="' + id + '" data-tipso="详情" title="详情"></span>');
                html.push('<span class="scene-btn fa fa-eye tips" data-name="' + name + '" data-id="' + id + '" data-tipso="查看客流分析" title="查看客流分析"></span>');
                html.push('<span class="delete-btn fa fa-trash tips" data-id="' + id + '" data-tipso="删除" title="删除"></span>');
                html.push('</td>');
                html.push('</tr>');
            }
            $("#box-group-table>tbody").html(html.join(""));

            $('#box-group-table>tbody td .tips').tipso({
                useTitle: false,
                width: 'auto',
                position: 'bottom',
                background: '#626262'
            });
            //详情按钮
            $("#box-group-table tbody tr td .info-btn").on("click", function() {
                var id = $(this).attr('data-id');
                $("#info-child-box").fadeIn();
                _this.getBoxGroupInfo(id);
            });
            //查看客流分析
            $("#box-group-table tbody tr td .scene-btn").on("click", function() {
                var id = $(this).attr('data-id');
                var name = encodeURIComponent($(this).attr('data-name'));
                window.open(BASEURL + 'passengerFlow/shopId/' + id + '/shopName/' + name);
            });
            //删除按钮
            $("#box-group-table tbody tr td .delete-btn").on("click", function() {
                var id = $(this).attr('data-id');
                $("#box-del-btn").attr('data-id', id);
                $("#del-child-box").fadeIn();
            });
            pagi.update({
                pageCount: pageCount,
                pageNo: pageNo
            });
            //分页点击
            var activePage = parseInt($("#box-list-pagination .pagination>.active").text());
            activePage = activePage ? activePage : 1;
            _this.index = activePage;
            $(document).off("click", "#box-list-pagination .pagination>li").on("click", "#box-list-pagination .pagination>li", function() {
                _this.index = parseInt($(this).text()) ? parseInt($(this).text()) : 1;
                _this.getBoxGroupList(parseInt($(this).text()));
            });
            $(document).off("click",  "#box-list-pagination .pagination-prev").on("click", "#box-list-pagination .pagination-prev", function() {
                if(activePage > 1) {
                    _this.index = activePage - 1;
                    _this.getBoxGroupList(activePage - 1);
                }
            });
            $(document).off("click", "#box-list-pagination .pagination-next").on("click", "#box-list-pagination .pagination-next", function() {
                if(pageCount - activePage  > 0) {
                    _this.index = parseInt(activePage + 1);
                    _this.getBoxGroupList(activePage + 1);
                }
            });
            if(data.result.total == 0){
                $("#box-group-table>tbody").html("");
                $("#dataList-no-data").show();
                $("#box-page-show .page-count").hide();
            }
        } else {
            $("#box-group-table>tbody").html("");
            $("#dataList-no-data").show();
            $("#box-page-show .page-count").hide();
        }
        $(".loading-area").fadeOut();
    })
    .fail(function() {
        $(".loading-area").fadeOut();
        console.log("error");
    });
}
boxGroupList.getBoxGroupInfo = function(id){
    var _this = this;
    $(".loading-area").fadeIn();
    $.ajax({
        url: BASEURL + 'store/getSceneStoreDetail',
        type: 'post',
        dataType: 'json',
        data: {
            shopid: id
        }
    })
    .done(function(data) {
        console.log(data);
        if(data.success) {
            var html = [];
            var store_name = data.result.store_name;
            var box_name = data.result.box_name;
            var handle_date = data.result.handle_date;
            html.push('<div class="content"><span class="name">店铺名称</span><span class="value">' + store_name + '</span></div>');
            html.push('<div class="content"><span class="name">包含盒子</span><span class="value">' + box_name + '</span></div>');
            html.push('<div class="content"><span class="name">添加时间</span><span class="value">' + handle_date + '</span></div>');
            $("#info-group-content .info__container").html(html.join(""));
        }
        $(".loading-area").fadeOut();
    })
    .fail(function() {
        console.log("getSceneStoreDetail error");
        $(".loading-area").fadeOut();
        layer.msg('获取店铺信息失败!', {icon: 5,time: 2000});
    });
}

dataPackageList = {};
dataPackageList.init = function() {
    var _this = this;
    _this.pagi = new Pagination("#chipList-list-pagination");//分页
    _this.getListData(1);
}

dataPackageList.getListData = function(pageNo) {
    var _this = this;
    $('.loading-area').fadeIn();
    var pageCount = 15;//每页数量（可拓展为参数）
    var searchText = $("#key-word").val();

    $.ajax({
        url: BASEURL + 'tool/getPacketList',
        type: 'POST',
        dataType: 'json',
        data: {
            packet_name : searchText,
            start_date: '',
            end_date: '',
            page : pageNo,
            pageSize : pageCount
        }
    })
    .done(function(data) {
        console.log(data);
        if(data.success) {
            //渲染
            var html = [];
            for (var i = 0; i < data.result.length; i++) {
                var packageName = data.result[i].packet_name;
                var packageId = data.result[i].id;
                var packageUrl = data.result[i].packet_url;
                var packageDate = data.result[i].handle_date;
                html.push('<tr data-packageId="'+packageId+'">');
                html.push('<td><a target="_blank" href="'+packageUrl+'">'+packageName+'</a></td>');
                html.push('<td>'+packageDate+'</td>');
                html.push('</tr>');
            }
            $("#packageList-table>tbody").html(html.join(""));

            //分页
            _this.pagi.update({
                pageCount: pageCount,
                pageNo: pageNo
            });
            //分页点击
            var activePage = parseInt($("#packageList-list-pagination .pagination>.active").text());
            activePage = activePage ? activePage : 1;
            $(document).off("click", "#packageList-list-pagination .pagination>li").on("click", "#packageList-list-pagination .pagination>li", function() {
                _this.getListData(parseInt($(this).text()));
            });
            $(document).off("click",  "#packageList-list-pagination .pagination-prev").on("click", "#packageList-list-pagination .pagination-prev", function() {
                if(activePage > 1) {
                    _this.getListData(activePage - 1);
                }
            });
            $(document).off("click", "#packageList-list-pagination .pagination-next").on("click", "#packageList-list-pagination .pagination-next", function() {
                if(pageCount - activePage  > 0) {
                    _this.getListData(activePage + 1);
                }
            });
            //结束
        } else{
            //暂无数据
            $("#packageList-table>tbody").html("");
            $("#packageList-no-data").show();
            $("#packageList-page-show").hide();
        }
        $('.loading-area').fadeOut();
    })
    .fail(function() {
        console.log("error");
        $('.loading-area').fadeOut();
    });
}


addDataPackage = {};
addDataPackage.init = function() {
    var _this = this;
    _this.uploadPackage();

    $("#submit-button").on("click", function() {
        _this.addPackage();
    });
}

addDataPackage.addPackage = function() {
    var _this = this;
    var pageCount = 15;//每页数量（可拓展为参数）
    var packet_name = $("#package-name").val();
    var packet_url = $("#image-qiniu-url").val();
    if(packet_name == "") {
        layer.alert("请输入数据包名称");
        return false;
    }
    if(packet_url == "") {
        layer.alert("请上传数据包");
        return false;
    }
    $('.loading-area').fadeIn();

    $.ajax({
        url: BASEURL + 'tool/addDataPacket',
        type: 'POST',
        dataType: 'json',
        data: {
            packet_name : packet_name,
            packet_url: packet_url,
        }
    })
    .done(function(data) {
        console.log(data);
        if(data.success) {
            //渲染
            layer.msg("上传成功");
            window.location.href = BASEURL + 'dataPackageList';
            console.log(data);
            //结束
        } else{
            layer.alert("error");
            //暂无数据
        }
        $('.loading-area').fadeOut();
    })
    .fail(function() {
        console.log("error");
        $('.loading-area').fadeOut();
    });
}
addDataPackage.uploadPackage = function() {
    var domain = 'http://share.soundtooth.cn/';
    var isHover = false;
    var uploadStatus = '';

    var showUploadInfos = function(up, file) {
        if (!isHover) {
            $('#uploading-kidd').text(file.percent + '%');
        }
    };

    var uploader = Qiniu.uploader({
        runtimes: 'html5,html4',
        browse_button: 'add-package',
        //container: 'img-box',
        // drop_element: 'container',
        max_file_size: '10mb',
        // flash_swf_url: 'js/plupload/Moxie.swf',
        // dragdrop: true,
        multi_selection: false,
        chunk_size: '4mb',
        uptoken_url: BASEURL + "admin/api/getUploadToken",
        domain: domain,
        unique_names: true,
        get_new_uptoken: true,
        auto_start: true,
        filters : {
            max_file_size : '10mb',
            prevent_duplicates: false,
            // Specify what files to browse for
            mime_types: [
                {title : "txt files", extensions : "txt"},
            ]
        },
        init: {
            'FilesAdded': function(up, files) {
                var _up = up;
                plupload.each(files, function(file) {
                    isHover = false;
                    // 文件添加进队列后,处理相关的事情
                    var _file = file;
                    var $btn = $('#uploaded-status');
                    var $status = $('#uploading-kidd');

                    /**
                     * unillegal files
                     */
                    uploadStatus = 'uploading';

                    $btn.hide();
                    $status.text('上传中')
                            .css('display', 'inline-block');

                    var currentText = '';
                    $status.hover(function () {
                        currentText = $(this).text();
                        isHover = true;
                        $(this).text('取消')
                                .click(function () {
                                    _up.removeFile(_file);
                                    $(this).unbind('mouseenter')
                                            .unbind('mouseleave')
                                            .unbind('click');
                                    $status.hide();
                                    $btn.text('选择文件').show();
                                });
                    }, function () {
                        isHover = false;
                        $(this).text(currentText)
                                .unbind('click');
                    });
                });
            },
            'BeforeUpload': function(up, file) {},
            'UploadProgress': function(up, file) {
                showUploadInfos(up, file);
            },
            'UploadComplete': function() {},
            'FileUploaded': function(up, file, info) {
                "use strict";
                uploadStatus = 'uploaded';
                var infoObj = JSON.parse(info);
                var url = domain + infoObj.key;
                var $status = $('#uploading-kidd');
                $status.unbind('click')
                        .unbind('mouseenter')
                        .unbind('mouseleave')
                        .text('上传成功：'+url)
                        .css('cursor', 'auto');
                var $btn = $("#ad-img");
                //$btn.prop("disabled", true);
                //$btn.siblings(".file-button").addClass("disabled");
                //$('#hImg').val(domain + infoObj.key);
                $('#image-qiniu-url').val(url);
            },
            'Error': function(up, err, errTip) {
                uploadStatus = 'error';
                var $btn = $('#uploaded-status');
                var $status = $('#uploading-kidd');

                $status.unbind('mouseenter')
                        .unbind('mouseleave')
                        .unbind('click')
                        .hide();
                if(err.code == -600) {
                    $btn.text('文件不能超过10mb，请重新上传').show();
                } else {
                    $btn.text('请重新上传').show();
                }
            }
        }
    });
}