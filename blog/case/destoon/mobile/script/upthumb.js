/*
	[dtjia System] Copyright (c) 2016 www.e-action.top
	作者一切归零 QQ:811142004

*/

function fupthumbs(moduleid,tid,width,height,nums,type) {
	moduleid = moduleid;
	fimgname = tid;
	thumbwidth = width;
	thumbheight = height
	tmaxnums = nums;
	tmthpe = type ? type : 'thumb';
    fimgnums = $("#thumbd"+fimgname+" li:not(#thumba-"+fimgname+")").size();
	  if(fimgnums>=tmaxnums){
	   laymsg("您只能上传1张图片");
	  return false;
}

ffilechooser.click();
}

var fprogress = $("#containerf").Progress({
	percent: 10,
	width: 180,
	height: 20,
	fontSize: 14
});
var ffilechooser = document.getElementById("upthumbimg");
var fmaxsize = 100 * 1024;
var tmaxnums = 1;

document.querySelector('#upthumbimg').addEventListener('change', function () {
	if (!this.files.length) return;
    var files = Array.prototype.slice.call(this.files);

    var ffilenums = files.length;
    if (ffilenums + fimgnums>1) {

      laymsg("最多同时只可上传1张图片");
      return;
    }
    laymsg("图片压缩上传中...");
	$("#upthumbing").show();
	    files.forEach(function(file, i) {

      if (!/\/(?:jpeg|png|gif)/i.test(file.type)) return;
	  
	  	 var reader = new FileReader();
		 reader.onload = function() {
        var result = this.result;
		fprogress.percent(20);
		fupthumb(result);
		 };
		 reader.readAsDataURL(file);
		});
});


function fupthumb(files) {

    // this.files[0] 是用户选择的文件
    lrz(files, {
        width: 880,
		quality: 0.5
    })
        .then(function (rst) {
            // 把处理的好的图片给用户看看呗
            var img = new Image();
            img.src = rst.base64;
			img.size = rst.fileLen;
			sourceSize = toFixed2(files.size / 1024),
            resultSize = toFixed2(rst.base64Len / 1024),
            img.onload = function () {
            };
            return rst;
        })
        .then(function (rst) {
            fprogress.percent(100);
			var from = tmthpe;
			var theimg = rst.base64;
			$.ajax({
		   type: "POST",
		   url: "upload.php",
		   data: {"moduleid":moduleid,"from":from,"base64":rst.base64,"size":resultSize,"width":thumbwidth,"height":thumbheight},
		   dataType:"json",
		   success: function(data){
			   //fprogress.percent(60);
			   if (data.status == 0) {
			   var showImgHtml = '<li id="thumb-'+fimgname+'"><a href="'+data.url+'"><img src="'+data.url+'" id="coverthumb"></a><span class="thumb-del" onclick=\"Delthumb(\''+fimgname+'\')\"><i class="aui-iconfont aui-icon-close aui-text-white fz22"></i></span></li>';
			   $("#"+fimgname+"").val(data.url);
			   $("#thumba-"+fimgname+"").before(showImgHtml);
			   $("#upthumbing").hide();
			   fprogress.percent(10);

				laymsg('上传成功');
				return false;
			 }else{
				laymsg(data.content);
				//$(".imglist").append(attstr); 
			 }
		   }, 
			complete :function(XMLHttpRequest, textStatus){
			},
			error:function(XMLHttpRequest, textStatus, errorThrown){ //上传失败 
			   laymsg('上传失败，请重新上传');
			   $("#delAlbum").css('display','none');
			   $("#upthumbing").hide();
			   fprogress.percent(10);
			   $("#upfieldsimg").val(null);
			}
		}); 
            return rst;
        })
}

function toFixed2 (num) {
    return parseFloat(+num.toFixed(2));
}

function Delthumb(id) {
dialog.alert({
  title:"温馨提示",
  msg:'确定删除图片吗',
  buttons:['取消','确定']
    },function(ret){
    if(ret){
	  if(ret.buttonIndex==2){
			$('#thumb-'+id+'').remove();
		    laymsg('已经删除了');
	}
 }
})
}