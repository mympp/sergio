  //选项卡
	  function tab(topObject, topSubObject, styleName, botObject) {
	      var aLink = document.getElementById(topObject).getElementsByTagName(topSubObject);

	      for (i = 0; i < aLink.length; i++) {
	          aLink[i].index = i;
	          aLink[i].onmouseover = function() {
	              for (i = 0; i < aLink.length; i++) {
	                  aLink[i].className = "";
	                  document.getElementById(botObject + i).style.display = "none";
	              }
	              this.className = styleName;
	              document.getElementById(botObject + [this.index]).style.display = "block";
	          }
	      }
	  }
$(document).ready(function(){
    //左侧菜单导航栏
    $('.listview li').hover(function(){
        var obj = $(this).children(".sub-menu");
        obj.css('display','block');
		$(this).addClass("cur");
    },function(){
        var obj = $(this).children(".sub-menu");
        obj.css('display','none');
		$(this).removeClass("cur");
    });
});