<?php defined('IN_DESTOON') or exit('Access Denied');?><div class="clear_h20"></div>
<div class="foot_help">
<div class="main">
<ul>
<li><h3>购物指南</h3>
<p><a href="<?php echo $MODULE['2']['linkurl'];?><?php echo $DT['file_login'];?>">登录</a></p>
<p><a href="<?php echo $MODULE['2']['linkurl'];?><?php echo $DT['file_register'];?>">注册</a></p>
<p><a href="<?php echo DT_PATH;?>sell/search.php">产品查找</a></p>
<p><a href="<?php echo DT_PATH;?>member/trade.php">订单查询</a></p>
</li>
<li><h3>会员中心</h3>
<p><a href="<?php echo DT_PATH;?>member/trade.php">我的订单</a></p>
<p><a href="<?php echo DT_PATH;?>member/credit.php">积分管理</a></p>
<p><a href="<?php echo DT_PATH;?>member/my.php?mid=5&action=add">发布供应</a></p>
<p><a href="<?php echo DT_PATH;?>member/my.php?mid=6&action=add">发布求购</a></p>
</li>
<li><h3>服务保障</h3>
<p><a href="<?php echo DT_PATH;?>member/favorite.php?action=add">收藏商机</a></p>
<p><a href="<?php echo DT_PATH;?>member/ask.php">客服中心</a></p>
</li>
<li><h3>商家服务</h3>
<p><a href="<?php echo DT_PATH;?>member/my.php?mid=13&action=add">发布招商</a></p>
<p><a href="<?php echo DT_PATH;?>member/friend.php">我的商友</a></p>
<p><a href="<?php echo DT_PATH;?>member/ad.php">品牌推广</a></p>
</li>
<li class="foc"><h3>关注我们</h3>
<div>
<span><img src="<?php echo DT_SKIN;?>image/erweima_pho.jpg" /><p>微信公众号</p></span>
<span><img src="<?php echo DT_SKIN;?>image/m.5276mall.com.png" /><p>平台移动版</p></span>
</div>
<p>
<!--<a target="_blank" rel="nofollow" href="http://weibo.com/u/5782903017"><i class="sina">新浪</i></a>-->
<!-- <a rel="nofollow" href='javascript:;'><i class="qwb">腾讯微博</i></a> -->
</p>
</li>
<li class="tel"><h3>联系我们<em>（8:30-18:30）</em></h3>
<p><b>020-37362495</b>（业务咨询）</p>
<span class="btn1 fl"><a class="callback">联系客服:400-808-8770</a></span>
</li>
</ul>
</div>
</div>
<div class="foot">
<div class="main">
<div class="foot_nav">
    <a href="<?php echo $MODULE['1']['linkurl'];?>">网站首页</a>
    <?php echo tag("table=webpage&condition=item=1&areaid=$cityid&order=listorder desc,itemid desc&template=list-webpage");?>
| <a href="<?php echo $MODULE['1']['linkurl'];?>sitemap/">网站地图</a>
| <a href="<?php echo $EXT['spread_url'];?>">排名推广</a>
<?php if($EXT['ad_enable']) { ?> | <a href="<?php echo $EXT['ad_url'];?>">广告服务</a><?php } ?>
<?php if($EXT['gift_enable']) { ?> | <a href="<?php echo $EXT['gift_url'];?>">积分换礼</a><?php } ?>
<?php if($EXT['guestbook_enable']) { ?> | <a href="<?php echo $EXT['guestbook_url'];?>">网站留言</a><?php } ?>
<?php if($EXT['feed_enable']) { ?> | <a href="<?php echo $EXT['feed_url'];?>">RSS订阅</a><?php } ?>
<?php if($DT['icpno']) { ?> | <a href="http://www.miibeian.gov.cn" target="_blank" rel="nofollow"><?php echo $DT['icpno'];?></a><?php } ?>
    <!-- <b>丨</b><a href='javascript:;'>九域移动版</a> -->
</div>
<div class="foot_fir">
友情链接：
<?php if($DT['page_text']) { ?>
<?php $tags=tag("table=link&condition=status=3 and level>0 and thumb='' and username=''&areaid=$cityid&pagesize=".$DT['page_text']."&order=listorder desc,itemid desc&template=null")?>
<?php if(is_array($tags)) { foreach($tags as $t) { ?>
<a href="<?php echo $t['linkurl'];?>"><?php echo $t['title'];?></a>
<?php } } ?>
<?php } ?>
</div>
<div class="foot_about"><?php echo $DT['copyright'];?></div>
<!--<div class="foot_bz">
<a><img alt="郑州市网络警察" src="<?php echo DT_SKIN;?>image/160507094148761.png" /></a>
<a><img alt="银联特约商户" src="<?php echo DT_SKIN;?>image/f_icon_yl.jpg" /></a>
<a><img alt="支付宝合作商家" src="<?php echo DT_SKIN;?>image/160507094149111.png" /></a>
<a><img alt="网络社会征信网" src="<?php echo DT_SKIN;?>image/f_icon_zx.jpg" /></a>
<a><img alt="中国互联网举报中心" src="<?php echo DT_SKIN;?>image/160507094149406.png" /></a>
<a><img alt="公共信息网络安全监察" src="<?php echo DT_SKIN;?>image/f_icon_aqjc.jpg" /></a> 
</div>-->
<div class="clear"></div>
</div>
</div>
<div class="tooltip store_tooltip">
  <ul class="tool1">
    <li class="">
      <div class="tool_nav"><a href="http://wpa.qq.com/msgrd?v=3&uin=3503962954&site=qq&menu=yes" target="_blank"><i class="store_tooltip_ser">图标</i></a></div>
    </li>
    <li>
      <div class="tool_nav">
<a href="<?php echo DT_PATH;?>member/message.php" rel="nofollow" target="_blank">
<i class="store_tooltip_mes">消息提醒</i>
      </a>
  </div>
    </li>
    <li>
      <div class="tool_nav"><a href="<?php echo DT_PATH;?>member/message.php?action=send" target="_blank">
  <i class="store_tooltip_idea">意见反馈</i></a></div>
    </li>
    <li>
      <div class="tool_nav back_top"><a href="javascript:void(0)"><i class="store_tooltip_top">返回顶部</i></a></div>
    </li>
  </ul>
</div>
<script type="text/javascript">$(function(){$(".focus_pic").slide({titCell:".hd ul",mainCell:".bd ul",effect:"leftLoop",autoPlay:true,vis:2,autoPage:true,trigger:"click",interTime:5000});$(".in_banner").slide({mainCell:".bd ul",autoPlay:true,interTime:5000,delayTime:500});var bd="";var guideIndex=0;if(bd=="y"){guideIndex=layer.open({type:1,title:false,closeBtn:0,content:$(".pop_guide"),area:"500px"})}$(".bdbtn").live("click",function(){layer.close(guideIndex)});var si;var myDate=new Date();var downad=getCookie("downad");setCookie("downad",myDate.toLocaleDateString(),30*24*60*60*1000);if(downad==null){$(window).load(function(){si=setTimeout("$('.delay-smallbox').slideDown(300)",7700);$(".delay-bigbox").delay(2000).slideDown(300);$(".delay-bigbox").delay(5000).slideUp(300);$(".delay-smallbox span").click(function(){$(this).parent().slideUp(300)})});$(".delay-bigbox span").live("click",function(){$(".delay-bigbox").stop();clearTimeout(si);$(this).parents(".delay-bigbox").slideUp(300);$(this).parents(".delay-bigbox").siblings(".delay-smallbox").slideDown(300)})}else{if(downad==myDate.toLocaleDateString()){$(".delay-smallbox").slideDown(300)}else{$(window).load(function(){si=setTimeout("$('.delay-smallbox').slideDown(300)",7700);$(".delay-bigbox").delay(2000).slideDown(300);$(".delay-bigbox").delay(5000).slideUp(300);$(".delay-smallbox span").click(function(){$(this).parent().slideUp(300)})});$(".delay-bigbox span").live("click",function(){$(".delay-bigbox").stop();clearTimeout(si);$(this).parents(".delay-bigbox").slideUp(300);$(this).parents(".delay-bigbox").siblings(".delay-smallbox").slideDown(300)})}}$(".delay-smallbox span").live("click",function(){$(".delay-smallbox").slideUp(300);setCookie("downad",myDate.toLocaleDateString(),0)})});</script>
<!--<div class="back2top"><a href="javascript:void(0);" title="返回顶部">&nbsp;</a></div>-->
<script type="text/javascript">
<?php if($destoon_task) { ?>
show_task('<?php echo $destoon_task;?>');
<?php } else { ?>
<?php include DT_ROOT.'/api/task.inc.php';?>
<?php } ?>
<?php if($lazy) { ?>$(function(){$("img").lazyload();});<?php } ?>
</script>
</body>
</html>