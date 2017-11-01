$(function(){
	//为左侧导航li绑定单击事件
	$(document).on("click",".userList_li",function() {
		var index = $(this).index();
		console.log(index);
		if(index == 0){
			location.href = "../CRM/index.html";
		}
		
		if(index == 1){
			location.href = "../CRM/xiansuo.html";
		}
		
		if(index == 2){
			location.href = "../CRM/kehu-admin.html";
		}
		
		if(index == 3){
			location.href = "../CRM/contact.html";
		}
		
		if(index == 4){
			location.href = "../CRM/gonghai.html";
		}
		
		if(index == 5) {
			$(".icon-shopping-div").slideToggle();
		}
		
		if(index == 7){
			location.href = "../consult/send.html";
		}
		
		if(index == 8){
			location.href = "../CRM/setup.html";
		}
		
		if(index == 9){
			location.href = "../CRM/feedback.html";
		}
		$(this).addClass("active").siblings().removeClass("active");
	})

	//为左侧导航商品的P段落绑定单击事件
	$(document).on("click", ".icon-shopping-div p", function(e) {
		var index = $(this).index();
		$(this).addClass("open").siblings().removeClass("open");
		if($(this).hasClass("open")) {
			if(index==0){
				location.href="../CRM/commodity-guanli.html";
			}
			if(index==1){
				location.href="../CRM/release-product.html";
			}
			$(this).parent().prev().addClass("active").siblings().removeClass("active");
		}
		e.stopPropagation();
	})
})


Date.prototype.Format = function (fmt) { //author: meizz
    var o = {
        "M+": this.getMonth() + 1, //月份 
        "d+": this.getDate(), //日 
        "h+": this.getHours(), //小时 
        "m+": this.getMinutes(), //分 
        "s+": this.getSeconds(), //秒 
        "q+": Math.floor((this.getMonth() + 3) / 3), //季度 
        "S": this.getMilliseconds() //毫秒 
    };
    if (/(y+)/.test(fmt)) fmt = fmt.replace(RegExp.$1, (this.getFullYear() + "").substr(4 - RegExp.$1.length));
    for (var k in o)
    if (new RegExp("(" + k + ")").test(fmt)) fmt = fmt.replace(RegExp.$1, (RegExp.$1.length == 1) ? (o[k]) : (("00" + o[k]).substr(("" + o[k]).length)));
    return fmt;
}

//调用： 
//var time1 = new Date().Format("yyyy-MM-dd");
//var time2 = new Date().Format("yyyy-MM-dd HH:mm:ss");