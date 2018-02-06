document.write('<style type="text/css">');
document.write('<!--');
//document.write('.keyword {width:150px; height:20px; border:#0066FF 1px solid;}/**//*文本框样式*/');
//document.write('#keytishi {width:150px; height:auto; border:#0066FF 1px solid; position:absolute; display:none;z-index:9997;}/**//*提示层样式*/');
document.write('#keytishi ul { margin:0;}/**//*提示层样式*/');
document.write('#keytishi ul li{margin:0;list-style-type:none;color:#999; line-height:22px; height:22px; font-size:9pt; padding:2px;cursor:hand; overflow:hidden;}/**//*提示层样式*/');
document.write('#keytishi ul li a {display:block; width:100%; height:22px; text-decoration:none;color:#000000}/**//*提示层样式*/');
document.write('#keytishi ul li a:hover {background-color:#0099FF;color:#ffffff}/**//*提示层样式*/');
document.write('#keytishi ul li .suggest-key{color:#999;float:left;padding-left:4px;font-weight:700}/**//*提示层关键字样式*/');
document.write('#keytishi ul li .suggest-result{float:right;padding-right:4px;text-align:right}/**//*提示层关键字样式*/');
document.write('.keytishiliSelected {background-color:#ddd;color:#999}/**//*提示层样式*/');
document.write('-->');
document.write('</style>');
(function() {
    Jtips = function() {
    };
    var index = -1;
    var length = 0;
    var _completed;
    var _obj;
    var _selected;
    var _getJsonData;
    var _propertyName;
    var _propertyRecord;
    var _isHide=true;
    //初始化
    Jtips.prototype.initialize = function(obj/*输入框控件*/, propertyName/*数据属性名*/,propertyRecord/*数据属性名*/, getJsonData/*获取数据方法*/, selected/*选中后执行*/, completed/*完成后执行*/) {
        document.write('<div id="keytishi" style="width:' + jQuery(obj).css("width") + ';padding:'+jQuery(obj).css("padding")+';height:auto; border:#b3b3b3 1px solid; position:absolute; display:none;z-index:10001;background-color:#ffffff"></div>');
        _completed = completed;
        _selected = selected;
        _obj=obj;
        _getJsonData = getJsonData;
        _propertyName = propertyName;
        _propertyRecord=propertyRecord;
        obj.keyup(function(e) {
            switch (e.which) {
            case 13:
                //UserSelected($.parseJSON($("#txtKeytishi" + index).val()));
		if(index<0 || index > length - 1){
		    jtips.completed("");
		}else{
                    jtips.completed(jQuery.parseJSON(jQuery("#txtKeytishi" + index).val()));
		}
                break;
            case 38:
                if (index > 0) {
                    index--;
                } else {
                    index = length - 1;
                }
                if (index < length - 1) {
                    jQuery("#keytishili" + (index + 1)).attr("class", "");
                } else {
                    jQuery("#keytishili0").attr("class", "");
                }
                jQuery("#keytishili" + index).attr("class", "keytishiliSelected");
                selected(jQuery.parseJSON(jQuery("#txtKeytishi" + index).val()));
                break;
            case 40:
                if (index < length - 1) {
                    index++;
                } else {
                    index = 0;
                }
                if (index > 0) {
                    jQuery("#keytishili" + (index - 1)).attr("class", "");
                } else {
                    jQuery("#keytishili" + (length - 1)).attr("class", "");
                }
                jQuery("#keytishili" + index).attr("class", "keytishiliSelected");
                selected(jQuery.parseJSON(jQuery("#txtKeytishi" + index).val()));
                break;
            default:
                jtips.getKeyWord(this, propertyName);
                break;
            }
        });

        obj.keydown(function(e) {
            var curKey = e.which;
            if (curKey == 13) {
                return false;
            }
            return true;
        });
    };

    Jtips.prototype.selected = function(obj) {
        _selected(obj);
    };

    Jtips.prototype.getKeyWord = function(obj) {
      if(searchtype==1){
        if (obj.value == "") {
            _completed();
            jQuery("#keytishi").hide();
            return;
        }
        var objInput = obj;
        var top = 0;
        var left = 0;
        while (obj) { //此循环得到文件域对象在页面中的绝对位置
            top += obj["offsetTop"];
            left += obj["offsetLeft"];
            obj = obj.offsetParent;
        }
        jQuery("#keytishi").css("top", (top + 35) + "px");
        jQuery("#keytishi").css("left", (left)+ "px");
        _getJsonData(objInput.value, displayData);
        }
    };
    function displayData(jsonString) {
        var json = eval("Data=" + jsonString);
        if (json.length == 0) {
            jQuery("#keytishi").hide();
            return;
        }
        jQuery("#keytishi").show();
        var strHtml = "";
        index = -1;
        length = json.length;
        for (var i = 0; i < json.length; i++) {
            strHtml += "<input id='txtKeytishi" + i + "' value='" + JSON.stringify(json[i]) + "' type='hidden'/>";
            strHtml += "<li id='keytishili" + i + "' onclick='jtips.completed(" + JSON.stringify(json[i]) + ")' onmouseover='jtips.selected(" + JSON.stringify(json[i]) + ");jtips.onmouseover(this)' onmouseout='jtips.onmouseout(this)'>";
            strHtml +="<span class=\"suggest-key\" >"+setHtml( _obj.val(),json[i][_propertyName] )+"</span>";
            strHtml +="<span class=\"suggest-result\">约有"+json[i][_propertyRecord]+ "条结果</span></li>";
        }
        strHtml = "<ul>" + strHtml + "</ul>";
        jQuery("#keytishi").html(strHtml);
    }

    function setHtml(keyword,strresult){
       var sk="<font style=\"font-weight:300;color:#999\">"+keyword+"</font>";
       var str=strresult.replace(eval('/'+keyword+'/gi'), sk);
      return str;
    }

    Jtips.prototype.completed = function(obj) {
        jQuery("#keytishi").html("");
        jQuery("#keytishi").hide();
        _completed(obj);
    };

    Jtips.prototype.onmouseover = function(obj) {
        jQuery(obj).css('background-color', '#ddd');
        jQuery(obj).css('color', '#999');
        _isHide=false;
    };

    Jtips.prototype.onmouseout = function(obj) {
        jQuery(obj).css('background-color', '#FFFFFF');
        jQuery(obj).css('color', '#999999');
        _isHide=true;
    };

    Jtips.prototype.hideKeySearch = function() {
       if(_isHide){
        jQuery("#keytishi").hide();
     }
    }
})();
var jtips = new Jtips();