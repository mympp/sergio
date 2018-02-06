<?php defined('IN_DESTOON') or exit('Access Denied');?><?php $CSS = array('index');?>
<?php include template('header1');?>
<div class="main">
<div class="nav_d_c" style="margin-left: 200px;">
<div id="slideBox" class="in_banner"><?php echo ad(26);?></div>
<div class="in_banner_r">
<?php echo ad(27);?>
<?php echo ad(28);?>
<?php echo ad(29);?>
</div>
</div>
<!--nav_d_r-->
<div class="nav_d_r">
<div class="in_login" id="destoon_login">
<span class="pic">
<a class="pic_c"><img src="<?php echo DT_SKIN;?>image/defaultheadpic.jpg" /></a>
</span>
<h3>HI!&nbsp;请登录！</h3>
<p>欢迎来到雀搜!</p>
<p class="lo">
<a href="<?php echo $MODULE['2']['linkurl'];?><?php echo $DT['file_login'];?>" rel="nofollow"><i class="icon log">登录</i>立即登录</a>
<a href="<?php echo $MODULE['2']['linkurl'];?><?php echo $DT['file_register'];?>" rel="nofollow"><i class="icon reg">注册</i>免费注册</a>
</p>
</div>
<div class="r_nav">
<ul>
<li><a href="<?php echo DT_PATH;?>member/my.php?mid=6&action=add">
<i class="tb1">图标</i><p>发布采购</p></a>
</li>
<li><a href="<?php echo DT_PATH;?>member/my.php?mid=5&action=add">
<i class="tb4">图标</i><p>发布供应</p></a>
</li>
<li><a href="<?php echo DT_PATH;?>brand/search.php/">
<i class="tb7">图标</i><p>品牌搜索</p></a>
</li>
<li><a href="<?php echo $MODULE['8']['linkurl'];?>">
<i class="tb2">图标</i><p>最新展会</p></a>
</li>
<li><a href="<?php echo $MODULE['2']['linkurl'];?><?php echo $DT['file_register'];?>" rel="nofollow" rel="nofollow">
<i class="tb5">图标</i><p>商家入驻</p></a>
</li>
<li><a href="<?php echo DT_PATH;?>member" rel="nofollow">
<i class="tb8">图标</i><p>商家认证</p></a>
</li>
<li><a href="<?php echo DT_PATH;?>member/my.php?mid=16&action=add" rel="nofollow">
<i class="tb3">图标</i><p>发布产品</p></a>
</li>
<li><a><i class="tb6">图标</i>
<p class="c999">返利佣金</p></a>
</li>
</ul>
</div>
<div class="r_new">
<div class="tab_list">
<ul>
<li class="on">规则</li>
<li>活动</li>
<li>公告</li>
</ul>
</div>
<div class="tab_con">
<div style="display:block;">
<ul>
<?php $tags=tag("table=announce&condition=(totime=0 or totime>$today_endtime-86400) and typeid=4&itemid=2&areaid=$cityid&pagesize=5&datetype=2&order=listorder desc,addtime desc&template=null")?>
<?php if(is_array($tags)) { foreach($tags as $t) { ?>
<li><a href="<?php echo $t['linkurl'];?>"><?php echo $t['title'];?></a></li>
<?php } } ?>
</ul>
</div>
<div style="display:none;">
<ul>
<?php $tags=tag("table=announce&condition=(totime=0 or totime>$today_endtime-86400) and typeid=3&itemid=3&areaid=$cityid&pagesize=5&datetype=2&order=listorder desc,addtime desc&template=null")?>
<?php if(is_array($tags)) { foreach($tags as $t) { ?>
<li><a href="<?php echo $t['linkurl'];?>"><?php echo $t['title'];?></a></li>
<?php } } ?>
</ul>
</div>
<div>
<ul>
<?php $tags=tag("table=announce&condition=(totime=0 or totime>$today_endtime-86400) and typeid=2&itemid=4&areaid=$cityid&pagesize=5&datetype=2&order=listorder desc,addtime desc&template=null")?>
<?php if(is_array($tags)) { foreach($tags as $t) { ?>
<li><a href="<?php echo $t['linkurl'];?>"><?php echo $t['title'];?></a></li>
<?php } } ?>
</ul>
</div>
</div>
</div>
</div>
</div>
<div class="clear_h20"></div>
<div class="main">
<div class="in_recent_news_l">
<div class="tab_list">
<ul>
<li class="on">
<h3>行业新闻</h3>
<!--<b>/</b>-->
</li>
<!--<li>价格行情</li>-->
</ul>
</div>
<div class="clear_h10"></div>
<div class="in_recent_news_lad mr10">
<img src="<?php echo DT_SKIN;?>image/16110110124262.jpg"/>
<img src="<?php echo DT_SKIN;?>image/16110110124262.jpg"/>
<img src="<?php echo DT_SKIN;?>image/16110110124262.jpg"/>
</div>
<div class="tab_con">
<div>
<ul>
<?php $tags=tag("moduleid=21&condition=status=3&pagesize=8&datetype=2&order=addtime desc&template=null")?>
<?php if(is_array($tags)) { foreach($tags as $t) { ?>
<li>
<h3 class="fl">
<a target="_blank" href="<?php echo $t['linkurl'];?>" title="<?php echo $t['title'];?>"><?php echo $t['title'];?></a>
</h3>
<span class="fr c999"><?php echo date('m-d',$t['addtime']);?></span>
</li>
<?php } } ?>
</ul>
</div>
<div>
<ul>
<?php $tags=tag("moduleid=7&condition=status=3&pagesize=8&datetype=2&order=addtime desc&template=null")?>
<?php if(is_array($tags)) { foreach($tags as $t) { ?>
<li>
<h3 class="fl">
<a target="_blank" href="<?php echo $t['linkurl'];?>" title="<?php echo $t['title'];?>"><?php echo $t['title'];?></a>
</h3>
<span class="fr c999"><?php echo date('m-d',$t['addtime']);?></span>
</li>
<?php } } ?>
</ul>
</div>
</div>
</div>
<div class="in_recent_news_c">
<div class="in_recent_news_tit">
<h3>采购/供应</h3>
</div>
<div class="con">
<ul>
<?php $tags=tag("moduleid=6&condition=status=3&pagesize=4&order=addtime desc&datetype=2&template=null")?>
<?php if(is_array($tags)) { foreach($tags as $t) { ?>
<li>
<h3 class="fl"><a target="_blank" href="<?php echo $t['linkurl'];?>" title="<?php echo $t['title'];?>">
<em >[采购]</em><?php echo $t['title'];?></a>
</h3>
<span class="fr c999"><?php echo date('m-d',$t['addtime']);?></span>
</li>
<?php } } ?>
<?php $tags=tag("moduleid=5&condition=status=3&pagesize=8&order=addtime desc&datetype=2&template=null")?>
<?php if(is_array($tags)) { foreach($tags as $t) { ?>
<li>
<h3 class="fl"><a target="_blank" href="<?php echo $t['linkurl'];?>" title="<?php echo $t['title'];?>">
<em class="on" >[供应]</em><?php echo $t['title'];?></a>
</h3>
<span class="fr c999"><?php echo date('m-d',$t['addtime']);?></span>
</li>
<?php } } ?>
</ul>
</div>
</div>
<div class="in_recent_news_r">
<div class="in_recent_news_tit"><h3>最新入驻供应商</h3></div>
<div class="con">
<ul>
<li>
<img src="<?php echo DT_SKIN;?>image/161101100816491.jpg" width="280" height="80"/>
</li>
<?php $tags=tag("moduleid=4&condition=vip>0 and catids<>''&areaid=$cityid&pagesize=5&order=fromtime desc&template=null")?>
<?php if(is_array($tags)) { foreach($tags as $k => $t) { ?>
<?php $k=$k+1;?>
<li>
<h3 class="fl"><a target="_blank" href="<?php echo $t['linkurl'];?>" title="<?php echo $t['title'];?>"><em><?php echo $k;?></em><?php echo $t['company'];?></a></h3>
<span class="fr c999"><?php echo date('m-d',$t['addtime']);?></span>
</li>
<?php } } ?>
</ul>
</div>
</div>
<div class="clear_h10"></div>
<div class="to_rec">
<div class="tit"><img src="<?php echo DT_SKIN;?>image/mall_tj.png" width="190" height="150"/></div>
<div class="rec_list">
<div class="rec_con">
<ul>
<li><img src="<?php echo DT_SKIN;?>image/shop001.jpg" width="249" height="150"/></li>
<li><img src="<?php echo DT_SKIN;?>image/shop002.jpg" width="249" height="150"/></li>
<li><img src="<?php echo DT_SKIN;?>image/shop003.jpg" width="249" height="150"/></li>
<li><img src="<?php echo DT_SKIN;?>image/shop004.jpg" width="249" height="150"/></li>
</ul>
</div>
</div>
</div>
<div class="clear_h20"></div>
<!--楼层-->
<div class="in_tit bor_b2">
<h3 class="fl">定制加工<em></em></h3>
<span class="fr tj">
<?php $sub = get_maincat(9114, 5, -1);?>
 <?php if(is_array($sub)) { foreach($sub as $j => $s) { ?>
<?php if($j < 4) { ?><a href="<?php echo $MODULE['5']['linkurl'];?><?php echo $s['linkurl'];?>" target="_blank"><?php echo set_style($s['catname'], $s['style']);?></a><?php } ?>
 <?php } } ?>
</span>
</div>
<div class="in_f">
<div class="in_f_l fl">
<img class="imglazy" src="<?php echo DT_SKIN;?>image/160616144605809.jpg_m.jpg"/>
<div class="lm1"><i>遮罩</i>
<span>
<?php $tags=tag("moduleid=5&catid=9115&condition=status=3&order=addtime desc&pagesize=2&template=null")?>
<?php if(is_array($tags)) { foreach($tags as $t) { ?>
<a title="<?php echo $t['title'];?>"  href="<?php echo $t['linkurl'];?>" target="_blank"><?php echo $t['title'];?></a>
<?php } } ?>
</span>
</div>
<div class="lm2"><i>遮罩</i>
<span>
<?php $tags=tag("moduleid=5&catid=9115&condition=status=3&order=addtime asc&pagesize=4&template=null")?>
<?php if(is_array($tags)) { foreach($tags as $t) { ?>
<a title="<?php echo $t['title'];?>"  href="<?php echo $t['linkurl'];?>" target="_blank"><?php echo $t['title'];?></a>
<?php } } ?>
</span>
</div>
</div>
<div class="in_f_c fl">
<ul>
<li class="pic">
<div class="focus_pic">
<div class="hd">
<ul>
<li></li>
<li></li>
<li></li>
</ul>
</div>
<div class="bd">
<ul>
<?php $tags=tag("moduleid=5&catid=9115&condition=status=3 and level>0 and thumb<>''&order=addtime desc&pagesize=3&template=null")?>
<?php if(is_array($tags)) { foreach($tags as $t) { ?>
<li>
<a title="<?php echo $t['linkurl'];?>"  href="<?php echo $t['linkurl'];?>" width="399" height="218">
<img src="<?php echo $t['thumb'];?>" /></a>
</li>
<?php } } ?>
</ul>
</div>
<a href="javascript:void(0)" class="prev">&lt;</a>
<a href="javascript:void(0)" class="next">&gt;</a>
</div>
</li>
<?php $tags=tag("moduleid=5&catid=9115&condition=status=3 and thumb<>''&order=addtime desc&pagesize=6&template=null")?>
<?php if(is_array($tags)) { foreach($tags as $t) { ?>
<li>
<span class="fl">
<a href="<?php echo $t['linkurl'];?>" class="pic_c">
<img class="imglazy img_zoom" src="<?php echo $t['thumb'];?>" width="127" height="140"/></a>
</span>
<h3><a href="<?php echo $t['linkurl'];?>"><?php echo $t['title'];?></a></h3>
<p class="pri">￥<?php echo $t['price'];?></p>
</li>
<?php } } ?>
</ul>
</div>
<div class="in_f_r fl">
<div class="tit">
<h3>热销排行</h3>
</div>
<div class="hot">
<ul>
<?php $tags=tag("moduleid=5&catid=9115&condition=status=3 and thumb<>''&order=hits desc&pagesize=4&template=null")?>
<?php if(is_array($tags)) { foreach($tags as $t) { ?>
<li>
<span>
<a title="<?php echo $t['title'];?>" href="<?php echo $t['linkurl'];?>" class="pic_c">
<img class="imglazy img_zoom" src="<?php echo $t['thumb'];?>" alt="<?php echo $t['alt'];?>" width="58" height="58"/>
</a>
</span>
<h3><a title="<?php echo $t['title'];?>" href="<?php echo $t['linkurl'];?>"><?php echo $t['title'];?></a></h3>
<p class="hot-xl">月销量：<i><?php echo $t['hits'];?></i></p>
</li>
<?php } } ?>
</ul>
</div>
<div class="clear"></div>
<div class="tit"><h3>新品推荐</h3></div>
<div class="new">
<ul>
<?php $tags=tag("moduleid=5&catid=9115&condition=status=3&order=addtime desc&pagesize=3&template=null")?>
<?php if(is_array($tags)) { foreach($tags as $t) { ?>
<li><a title="<?php echo $t['title'];?>" href="<?php echo $t['linkurl'];?>"><?php echo $t['title'];?></a></li>
<?php } } ?>
</ul>
</div>
</div>
<div class="in_f_d"><ul></ul></div>
<div class="clear_h20"></div>
</div>
<div class="in_tit bor_b2">
<h3 class="fl">包装<em></em></h3>
<span class="fr tj">
<?php $sub = get_maincat(9069, 5, -1);?>
 <?php if(is_array($sub)) { foreach($sub as $j => $s) { ?>
<?php if($j < 4) { ?><a href="<?php echo $MODULE['5']['linkurl'];?><?php echo $s['linkurl'];?>" target="_blank"><?php echo set_style($s['catname'], $s['style']);?></a><?php } ?>
 <?php } } ?>
</span>
</div>
<div class="in_f">
<div class="in_f_l fl">
<img class="imglazy" src="<?php echo DT_SKIN;?>image/160616144706850.jpg_m.jpg" />
<div class="lm1"><i>遮罩</i>
<span>
<?php $tags=tag("moduleid=5&catid=9393&condition=status=3&order=addtime desc&pagesize=2&template=null")?>
<?php if(is_array($tags)) { foreach($tags as $t) { ?>
<a title="<?php echo $t['title'];?>"  href="<?php echo $t['linkurl'];?>" target="_blank"><?php echo $t['title'];?></a>
<?php } } ?>
</span>
</div>
<div class="lm2"><i>遮罩</i>
<span>
<?php $tags=tag("moduleid=5&catid=9393&condition=status=3&order=addtime asc&pagesize=4&template=null")?>
<?php if(is_array($tags)) { foreach($tags as $t) { ?>
<a title="<?php echo $t['title'];?>"  href="<?php echo $t['linkurl'];?>" target="_blank"><?php echo $t['title'];?></a>
<?php } } ?>
</span>
</div>
</div>
<div class="in_f_c fl">
<ul>
<li class="pic">
<div class="focus_pic">
<div class="hd">
<ul>
<li></li>
<li></li>
</ul>
</div>
<div class="bd">
<ul>
<?php $tags=tag("moduleid=5&catid=9393&condition=status=3 and level>0 and thumb<>''&order=addtime desc&pagesize=3&template=null")?>
<?php if(is_array($tags)) { foreach($tags as $t) { ?>
<li>
<a title="<?php echo $t['linkurl'];?>"  href="<?php echo $t['linkurl'];?>" width="399" height="218">
<img src="<?php echo $t['thumb'];?>" /></a>
</li>
<?php } } ?>
</ul>
</div>
<a href="javascript:void(0)" class="prev">&lt;</a>
<a href="javascript:void(0)" class="next">&gt;</a>
</div>
</li>
<?php $tags=tag("moduleid=5&catid=9393&condition=status=3 and thumb<>''&order=addtime desc&pagesize=6&template=null")?>
<?php if(is_array($tags)) { foreach($tags as $t) { ?>
<li>
<span class="fl">
<a href="<?php echo $t['linkurl'];?>" class="pic_c">
<img class="imglazy img_zoom" src="<?php echo $t['thumb'];?>" alt="<?php echo $t['alt'];?>" /></a>
</span>
<h3>
<a href="<?php echo $t['linkurl'];?>"><?php echo $t['title'];?></a>
</h3>
<p class="pri">￥<?php echo $t['price'];?></p>
</li>
<?php } } ?>
</ul>
</div>
<div class="in_f_r fl">
<div class="tit"><h3>热销排行</h3></div>
<div class="hot">
<ul>
<?php $tags=tag("moduleid=5&catid=9393&condition=status=3 and thumb<>''&order=hits desc&pagesize=4&template=null")?>
<?php if(is_array($tags)) { foreach($tags as $t) { ?>
<li>
<span>
<a title="<?php echo $t['title'];?>" href="<?php echo $t['linkurl'];?>" class="pic_c">
<img class="imglazy img_zoom" src="<?php echo $t['thumb'];?>" alt="<?php echo $t['alt'];?>" width="58" height="58"/>
</a>
</span>
<h3><a title="<?php echo $t['title'];?>" href="<?php echo $t['linkurl'];?>"><?php echo $t['title'];?></a></h3>
<p class="hot-xl">月销量：<i><?php echo $t['hits'];?></i></p>
</li>
<?php } } ?>
</ul>
</div>
<div class="clear"></div>
<div class="tit"><h3>新品推荐</h3></div>
<div class="new">
<ul>
<?php $tags=tag("moduleid=5&catid=9393&condition=status=3&order=addtime desc&pagesize=3&template=null")?>
<?php if(is_array($tags)) { foreach($tags as $t) { ?>
<li><a title="<?php echo $t['title'];?>" href="<?php echo $t['linkurl'];?>"><?php echo $t['title'];?></a></li>
<?php } } ?>
</ul>
</div>
</div>
<div class="in_f_d"><ul></ul></div>
<div class="clear_h20"></div>
</div>
<div class="in_tit bor_b2">
<h3 class="fl">五金、工具<em></em></h3>
<span class="fr tj">
<?php $sub = get_maincat(9461, 5, -1);?>
 <?php if(is_array($sub)) { foreach($sub as $j => $s) { ?>
<?php if($j < 4) { ?><a href="<?php echo $MODULE['5']['linkurl'];?><?php echo $s['linkurl'];?>" target="_blank"><?php echo set_style($s['catname'], $s['style']);?></a><?php } ?>
 <?php } } ?>
</span>
</div>
<div class="in_f">
<div class="in_f_l fl">
<img class="imglazy" src="<?php echo DT_SKIN;?>image/16061614474231.jpg_m.jpg" />
<div class="lm1"><i>遮罩</i>
<span>
<?php $tags=tag("moduleid=5&catid=9464&condition=status=3&order=addtime desc&pagesize=2&template=null")?>
<?php if(is_array($tags)) { foreach($tags as $t) { ?>
<a title="<?php echo $t['title'];?>"  href="<?php echo $t['linkurl'];?>" target="_blank"><?php echo $t['title'];?></a>
<?php } } ?>
</span>
</div>
<div class="lm2"><i>遮罩</i>
<span>
<?php $tags=tag("moduleid=5&catid=9464&condition=status=3&order=addtime asc&pagesize=4&template=null")?>
<?php if(is_array($tags)) { foreach($tags as $t) { ?>
<a title="<?php echo $t['title'];?>"  href="<?php echo $t['linkurl'];?>" target="_blank"><?php echo $t['title'];?></a>
<?php } } ?>
</span>
</div>
</div>
<div class="in_f_c fl">
<ul>
<li class="pic">
<div class="focus_pic">
<div class="hd">
<ul>
<li></li>
<li></li>
</ul>
</div>
<div class="bd">
<ul>
<?php $tags=tag("moduleid=5&catid=9464&condition=status=3 and level>0 and thumb<>''&order=addtime desc&pagesize=3&template=null")?>
<?php if(is_array($tags)) { foreach($tags as $t) { ?>
<li>
<a title="<?php echo $t['linkurl'];?>"  href="<?php echo $t['linkurl'];?>" width="399" height="218">
<img src="<?php echo $t['thumb'];?>" /></a>
</li>
<?php } } ?>
</ul>
</div>
<a href="javascript:void(0)" class="prev">&lt;</a>
<a href="javascript:void(0)" class="next">&gt;</a>
</div>
</li>
<?php $tags=tag("moduleid=5&catid=9464&condition=status=3 and thumb<>''&order=addtime desc&pagesize=6&template=null")?>
<?php if(is_array($tags)) { foreach($tags as $t) { ?>
<li>
<span class="fl">
<a href="<?php echo $t['linkurl'];?>" class="pic_c">
<img class="imglazy img_zoom" src="<?php echo $t['thumb'];?>" alt="<?php echo $t['alt'];?>" /></a>
</span>
<h3>
<a href="<?php echo $t['linkurl'];?>"><?php echo $t['title'];?></a>
</h3>
<p class="pri">￥<?php echo $t['price'];?></p>
</li>
<?php } } ?>
</ul>
</div>
<div class="in_f_r fl">
<div class="tit"><h3>热销排行</h3></div>
<div class="hot">
<ul>
<?php $tags=tag("moduleid=5&catid=9464&condition=status=3 and thumb<>''&order=hits desc&pagesize=4&template=null")?>
<?php if(is_array($tags)) { foreach($tags as $t) { ?>
<li>
<span>
<a title="<?php echo $t['title'];?>" href="<?php echo $t['linkurl'];?>" class="pic_c">
<img class="imglazy img_zoom" src="<?php echo $t['thumb'];?>" alt="<?php echo $t['alt'];?>" width="58" height="58"/>
</a>
</span>
<h3><a title="<?php echo $t['title'];?>" href="<?php echo $t['linkurl'];?>"><?php echo $t['title'];?></a></h3>
<p class="hot-xl">月销量：<i><?php echo $t['hits'];?></i></p>
</li>
<?php } } ?>
</ul>
</div>
<div class="clear"></div>
<div class="tit"><h3>新品推荐</h3></div>
<div class="new">
<ul>
<?php $tags=tag("moduleid=5&catid=9464&condition=status=3&order=addtime desc&pagesize=3&template=null")?>
<?php if(is_array($tags)) { foreach($tags as $t) { ?>
<li><a title="<?php echo $t['title'];?>" href="<?php echo $t['linkurl'];?>"><?php echo $t['title'];?></a></li>
<?php } } ?>
</ul>
</div>
</div>
<div class="in_f_d"><ul></ul></div>
<div class="clear_h20"></div>
</div>
<div class="in_tit bor_b2"><h3 class="fl">汽车用品<em></em></h3>
<span class="fr tj">
<?php $sub = get_maincat(9799, 5, -1);?>
 <?php if(is_array($sub)) { foreach($sub as $j => $s) { ?>
<?php if($j < 4) { ?><a href="<?php echo $MODULE['5']['linkurl'];?><?php echo $s['linkurl'];?>" target="_blank"><?php echo set_style($s['catname'], $s['style']);?></a><?php } ?>
 <?php } } ?>
</span>
</div>
<div class="in_f">
<div class="in_f_l fl">
<img class="imglazy" src="<?php echo DT_SKIN;?>image/160616144816898.jpg_m.jpg" />
<div class="lm1"><i>遮罩</i>
<span>
<?php $tags=tag("moduleid=5&catid=9805&condition=status=3&order=addtime desc&pagesize=2&template=null")?>
<?php if(is_array($tags)) { foreach($tags as $t) { ?>
<a title="<?php echo $t['title'];?>"  href="<?php echo $t['linkurl'];?>" target="_blank"><?php echo $t['title'];?></a>
<?php } } ?>
</span>
</div>
<div class="lm2"><i>遮罩</i>
<span>
<?php $tags=tag("moduleid=5&catid=9805&condition=status=3&order=addtime asc&pagesize=4&template=null")?>
<?php if(is_array($tags)) { foreach($tags as $t) { ?>
<a title="<?php echo $t['title'];?>"  href="<?php echo $t['linkurl'];?>" target="_blank"><?php echo $t['title'];?></a>
<?php } } ?>
</span>
</div>
</div>
<div class="in_f_c fl">
<ul>
<li class="pic">
<div class="focus_pic">
<div class="hd">
<ul>
<li></li>
</ul>
</div>
<div class="bd">
<ul>
<?php $tags=tag("moduleid=5&catid=9805&condition=status=3 and level>0 and thumb<>''&order=addtime desc&pagesize=3&template=null")?>
<?php if(is_array($tags)) { foreach($tags as $t) { ?>
<li>
<a title="<?php echo $t['linkurl'];?>"  href="<?php echo $t['linkurl'];?>" width="399" height="218">
<img src="<?php echo $t['thumb'];?>" /></a>
</li>
<?php } } ?>
</ul>
</div>
<a href="javascript:void(0)" class="prev">&lt;</a>
<a href="javascript:void(0)" class="next">&gt;</a>
</div>
</li>
<?php $tags=tag("moduleid=5&catid=9805&condition=status=3 and thumb<>''&order=addtime desc&pagesize=6&template=null")?>
<?php if(is_array($tags)) { foreach($tags as $t) { ?>
<li>
<span class="fl">
<a href="<?php echo $t['linkurl'];?>" class="pic_c">
<img class="imglazy img_zoom" src="<?php echo $t['thumb'];?>" alt="<?php echo $t['alt'];?>" /></a>
</span>
<h3>
<a href="<?php echo $t['linkurl'];?>"><?php echo $t['title'];?></a>
</h3>
<p class="pri">￥<?php echo $t['price'];?></p>
</li>
<?php } } ?>
</ul>
</div>
<div class="in_f_r fl">
<div class="tit">
<h3>热销排行</h3>
</div>
<div class="hot">
<ul>
<?php $tags=tag("moduleid=5&catid=9805&condition=status=3 and thumb<>''&order=hits desc&pagesize=4&template=null")?>
<?php if(is_array($tags)) { foreach($tags as $t) { ?>
<li>
<span>
<a title="<?php echo $t['title'];?>" href="<?php echo $t['linkurl'];?>" class="pic_c">
<img class="imglazy img_zoom" src="<?php echo $t['thumb'];?>" alt="<?php echo $t['alt'];?>" width="58" height="58"/>
</a>
</span>
<h3><a title="<?php echo $t['title'];?>" href="<?php echo $t['linkurl'];?>"><?php echo $t['title'];?></a></h3>
<p class="hot-xl">月销量：<i><?php echo $t['hits'];?></i></p>
</li>
<?php } } ?>
</ul>
</div>
<div class="clear"></div>
<div class="tit">
<h3>新品推荐</h3>
</div>
<div class="new">
<ul>
<?php $tags=tag("moduleid=5&catid=9805&condition=status=3&order=addtime desc&pagesize=3&template=null")?>
<?php if(is_array($tags)) { foreach($tags as $t) { ?>
<li><a title="<?php echo $t['title'];?>" href="<?php echo $t['linkurl'];?>"><?php echo $t['title'];?></a></li>
<?php } } ?>
</ul>
</div>
</div>
<div class="in_f_d"><ul></ul></div>
<div class="clear_h20"></div>
</div>
<div class="in_tit bor_b2"><h3 class="fl">机械及行业设备<em></em></h3>
<span class="fr tj">
<?php $sub = get_maincat(9505, 5, -1);?>
 <?php if(is_array($sub)) { foreach($sub as $j => $s) { ?>
<?php if($j < 4) { ?><a href="<?php echo $MODULE['5']['linkurl'];?><?php echo $s['linkurl'];?>" target="_blank"><?php echo set_style($s['catname'], $s['style']);?></a><?php } ?>
 <?php } } ?>
</span>
</div>
<div class="in_f">
<div class="in_f_l fl">
<img class="imglazy" src="<?php echo DT_SKIN;?>image/160616144901933.jpg_m.jpg" />
<div class="lm1"><i>遮罩</i>
<span>
<?php $tags=tag("moduleid=5&catid=9515&condition=status=3&order=addtime desc&pagesize=2&template=null")?>
<?php if(is_array($tags)) { foreach($tags as $t) { ?>
<a title="<?php echo $t['title'];?>"  href="<?php echo $t['linkurl'];?>" target="_blank"><?php echo $t['title'];?></a>
<?php } } ?>
</span>
</div>
<div class="lm2"><i>遮罩</i>
<span>
<?php $tags=tag("moduleid=5&catid=9515&condition=status=3&order=addtime asc&pagesize=4&template=null")?>
<?php if(is_array($tags)) { foreach($tags as $t) { ?>
<a title="<?php echo $t['title'];?>"  href="<?php echo $t['linkurl'];?>" target="_blank"><?php echo $t['title'];?></a>
<?php } } ?>
</span>
</div>
</div>
<div class="in_f_c fl">
<ul>
<li class="pic">
<div class="focus_pic">
<div class="hd">
<ul>
<li></li>
<li></li>
</ul>
</div>
<div class="bd">
<ul>
<?php $tags=tag("moduleid=5&catid=9515&condition=status=3 and level>0 and thumb<>''&order=addtime desc&pagesize=3&template=null")?>
<?php if(is_array($tags)) { foreach($tags as $t) { ?>
<li>
<a title="<?php echo $t['linkurl'];?>"  href="<?php echo $t['linkurl'];?>" width="399" height="218">
<img src="<?php echo $t['thumb'];?>" /></a>
</li>
<?php } } ?>
</ul>
</div>
<a href="javascript:void(0)" class="prev">&lt;</a>
<a href="javascript:void(0)" class="next">&gt;</a>
</div>
</li>
<?php $tags=tag("moduleid=5&catid=9515&condition=status=3 and thumb<>''&order=addtime desc&pagesize=6&template=null")?>
<?php if(is_array($tags)) { foreach($tags as $t) { ?>
<li>
<span class="fl">
<a href="<?php echo $t['linkurl'];?>" class="pic_c">
<img class="imglazy img_zoom" src="<?php echo $t['thumb'];?>" alt="<?php echo $t['alt'];?>" /></a>
</span>
<h3>
<a href="<?php echo $t['linkurl'];?>"><?php echo $t['title'];?></a>
</h3>
<p class="pri">￥<?php echo $t['price'];?></p>
</li>
<?php } } ?>
</ul>
</div>
<div class="in_f_r fl">
<div class="tit"><h3>热销排行</h3></div>
<div class="hot">
<ul>
<?php $tags=tag("moduleid=5&catid=9515&condition=status=3 and thumb<>''&order=hits desc&pagesize=4&template=null")?>
<?php if(is_array($tags)) { foreach($tags as $t) { ?>
<li>
<span>
<a title="<?php echo $t['title'];?>" href="<?php echo $t['linkurl'];?>" class="pic_c">
<img class="imglazy img_zoom" src="<?php echo $t['thumb'];?>" alt="<?php echo $t['alt'];?>" width="58" height="58"/>
</a>
</span>
<h3><a title="<?php echo $t['title'];?>" href="<?php echo $t['linkurl'];?>"><?php echo $t['title'];?></a></h3>
<p class="hot-xl">月销量：<i><?php echo $t['hits'];?></i></p>
</li>
<?php } } ?>
</ul>
</div>
<div class="clear"></div>
<div class="tit"><h3>新品推荐</h3></div>
<div class="new">
<ul>
<?php $tags=tag("moduleid=5&catid=9515&condition=status=3&order=addtime desc&pagesize=3&template=null")?>
<?php if(is_array($tags)) { foreach($tags as $t) { ?>
<li><a title="<?php echo $t['title'];?>" href="<?php echo $t['linkurl'];?>"><?php echo $t['title'];?></a></li>
<?php } } ?>
</ul>
</div>
</div>
<div class="in_f_d"><ul></ul></div>
<div class="clear_h20"></div>
</div>
<div class="in_tit bor_b2">
<h3 class="fl">机床<em></em></h3>
<span class="fr tj">
<?php $sub = get_maincat(9314, 5, -1);?>
 <?php if(is_array($sub)) { foreach($sub as $j => $s) { ?>
<?php if($j < 4) { ?><a href="<?php echo $MODULE['5']['linkurl'];?><?php echo $s['linkurl'];?>" target="_blank"><?php echo set_style($s['catname'], $s['style']);?></a><?php } ?>
 <?php } } ?>
</span>
</div>
<div class="in_f">
<div class="in_f_l fl">
<img class="imglazy" src="<?php echo DT_SKIN;?>image/160616144940742.jpg_m.jpg" />
<div class="lm1"><i>遮罩</i>
<span>
<?php $tags=tag("moduleid=5&catid=9315&condition=status=3&order=addtime desc&pagesize=2&template=null")?>
<?php if(is_array($tags)) { foreach($tags as $t) { ?>
<a title="<?php echo $t['title'];?>"  href="<?php echo $t['linkurl'];?>" target="_blank"><?php echo $t['title'];?></a>
<?php } } ?>
</span>
</div>
<div class="lm2"><i>遮罩</i>
<span>
<?php $tags=tag("moduleid=5&catid=9315&condition=status=3&order=addtime asc&pagesize=4&template=null")?>
<?php if(is_array($tags)) { foreach($tags as $t) { ?>
<a title="<?php echo $t['title'];?>"  href="<?php echo $t['linkurl'];?>" target="_blank"><?php echo $t['title'];?></a>
<?php } } ?>
</span>
</div>
</div>
<div class="in_f_c fl">
<ul>
<li class="pic">
<div class="focus_pic">
<div class="hd">
<ul>
<li></li>
<li></li>
</ul>
</div>
<div class="bd">
<ul>
<?php $tags=tag("moduleid=5&catid=9315&condition=status=3 and level>0 and thumb<>''&order=addtime desc&pagesize=3&template=null")?>
<?php if(is_array($tags)) { foreach($tags as $t) { ?>
<li>
<a title="<?php echo $t['linkurl'];?>"  href="<?php echo $t['linkurl'];?>" width="399" height="218">
<img src="<?php echo $t['thumb'];?>" /></a>
</li>
<?php } } ?>
</ul>
</div>
<a href="javascript:void(0)" class="prev">&lt;</a>
<a href="javascript:void(0)" class="next">&gt;</a>
</div>
</li>
<?php $tags=tag("moduleid=5&catid=9315&condition=status=3 and thumb<>''&order=addtime desc&pagesize=6&template=null")?>
<?php if(is_array($tags)) { foreach($tags as $t) { ?>
<li>
<span class="fl">
<a href="<?php echo $t['linkurl'];?>" class="pic_c">
<img class="imglazy img_zoom" src="<?php echo $t['thumb'];?>" alt="<?php echo $t['alt'];?>" /></a>
</span>
<h3>
<a href="<?php echo $t['linkurl'];?>"><?php echo $t['title'];?></a>
</h3>
<p class="pri">￥<?php echo $t['price'];?></p>
</li>
<?php } } ?>
</ul>
</div>
<div class="in_f_r fl">
<div class="tit"><h3>热销排行</h3></div>
<div class="hot">
<ul>
<?php $tags=tag("moduleid=5&catid=9315&condition=status=3 and thumb<>''&order=hits desc&pagesize=4&template=null")?>
<?php if(is_array($tags)) { foreach($tags as $t) { ?>
<li>
<span>
<a title="<?php echo $t['title'];?>" href="<?php echo $t['linkurl'];?>" class="pic_c">
<img class="imglazy img_zoom" src="<?php echo $t['thumb'];?>" alt="<?php echo $t['alt'];?>" width="58" height="58"/>
</a>
</span>
<h3><a title="<?php echo $t['title'];?>" href="<?php echo $t['linkurl'];?>"><?php echo $t['title'];?></a></h3>
<p class="hot-xl">月销量：<i><?php echo $t['hits'];?></i></p>
</li>
<?php } } ?>
</ul>
</div>
<div class="clear"></div>
<div class="tit"><h3>新品推荐</h3></div>
<div class="new">
<ul>
<?php $tags=tag("moduleid=5&catid=9315&condition=status=3&order=addtime desc&pagesize=3&template=null")?>
<?php if(is_array($tags)) { foreach($tags as $t) { ?>
<li><a title="<?php echo $t['title'];?>" href="<?php echo $t['linkurl'];?>"><?php echo $t['title'];?></a></li>
<?php } } ?>
</ul>
</div>
</div>
<div class="in_f_d"><ul></ul></div>
<div class="clear_h20"></div>
</div>
<div class="in_tit bor_b2">
<h3 class="fl">照明工业<em></em></h3>
<span class="fr tj">
<?php $sub = get_maincat(10137, 5, -1);?>
 <?php if(is_array($sub)) { foreach($sub as $j => $s) { ?>
<?php if($j < 4) { ?><a href="<?php echo $MODULE['5']['linkurl'];?><?php echo $s['linkurl'];?>" target="_blank"><?php echo set_style($s['catname'], $s['style']);?></a><?php } ?>
 <?php } } ?>
</span>
</div>
<div class="in_f">
<div class="in_f_l fl">
<img class="imglazy" src="<?php echo DT_SKIN;?>image/160616145444274.jpg_m.jpg" />
<div class="lm1"><i>遮罩</i>
<span>
<?php $tags=tag("moduleid=5&catid=10138&condition=status=3&order=addtime desc&pagesize=2&template=null")?>
<?php if(is_array($tags)) { foreach($tags as $t) { ?>
<a title="<?php echo $t['title'];?>"  href="<?php echo $t['linkurl'];?>" target="_blank"><?php echo $t['title'];?></a>
<?php } } ?>
</span>
</div>
<div class="lm2"><i>遮罩</i>
<span>
<?php $tags=tag("moduleid=5&catid=10138&condition=status=3&order=addtime asc&pagesize=4&template=null")?>
<?php if(is_array($tags)) { foreach($tags as $t) { ?>
<a title="<?php echo $t['title'];?>"  href="<?php echo $t['linkurl'];?>" target="_blank"><?php echo $t['title'];?></a>
<?php } } ?>
</span>
</div>
</div>
<div class="in_f_c fl" 7>
<ul>
<li class="pic">
<div class="focus_pic">
<div class="hd">
<ul>
<li></li>
<li></li>
</ul>
</div>
<div class="bd">
<ul>
<?php $tags=tag("moduleid=5&catid=10138&condition=status=3 and level>0 and thumb<>''&order=addtime desc&pagesize=3&template=null")?>
<?php if(is_array($tags)) { foreach($tags as $t) { ?>
<li>
<a title="<?php echo $t['linkurl'];?>"  href="<?php echo $t['linkurl'];?>" width="399" height="218">
<img src="<?php echo $t['thumb'];?>" /></a>
</li>
<?php } } ?>
</ul>
</div>
<a href="javascript:void(0)" class="prev">&lt;</a>
<a href="javascript:void(0)" class="next">&gt;</a>
</div>
</li>
<?php $tags=tag("moduleid=5&catid=10138&condition=status=3 and thumb<>''&order=addtime desc&pagesize=6&template=null")?>
<?php if(is_array($tags)) { foreach($tags as $t) { ?>
<li>
<span class="fl">
<a href="<?php echo $t['linkurl'];?>" class="pic_c">
<img class="imglazy img_zoom" src="<?php echo $t['thumb'];?>" alt="<?php echo $t['alt'];?>" /></a>
</span>
<h3>
<a href="<?php echo $t['linkurl'];?>"><?php echo $t['title'];?></a>
</h3>
<p class="pri">￥<?php echo $t['price'];?></p>
</li>
<?php } } ?>
</ul>
</div>
<div class="in_f_r fl">
<div class="tit"><h3>热销排行</h3></div>
<div class="hot">
<ul>
<?php $tags=tag("moduleid=5&catid=10138&condition=status=3 and thumb<>''&order=hits desc&pagesize=4&template=null")?>
<?php if(is_array($tags)) { foreach($tags as $t) { ?>
<li>
<span>
<a title="<?php echo $t['title'];?>" href="<?php echo $t['linkurl'];?>" class="pic_c">
<img class="imglazy img_zoom" src="<?php echo $t['thumb'];?>" alt="<?php echo $t['alt'];?>" width="58" height="58"/>
</a>
</span>
<h3><a title="<?php echo $t['title'];?>" href="<?php echo $t['linkurl'];?>"><?php echo $t['title'];?></a></h3>
<p class="hot-xl">月销量：<i><?php echo $t['hits'];?></i></p>
</li>
<?php } } ?>
</ul>
</div>
<div class="clear"></div>
<div class="tit"><h3>新品推荐</h3></div>
<div class="new">
<ul>
<?php $tags=tag("moduleid=5&catid=10138&condition=status=3&order=addtime desc&pagesize=3&template=null")?>
<?php if(is_array($tags)) { foreach($tags as $t) { ?>
<li><a title="<?php echo $t['title'];?>" href="<?php echo $t['linkurl'];?>"><?php echo $t['title'];?></a></li>
<?php } } ?>
</ul>
</div>
</div>
<div class="in_f_d"><ul></ul></div>
<div class="clear_h20"></div>
</div>
<div class="in_ad"><img class="imglazy" src="<?php echo DT_SKIN;?>image/16080217430053.png"/></div>
<div class="clear_h20"></div>
<!--资讯-->
<div class="in_tit bor_b2">
<h3 class="fl">资讯<em>行业权威信息，技术交流分享</em></h3>
</div>
<div class="clear_h20"></div>
<div class="in_news">
<div class="in_news_tab fl mr10">
<div class="tab_list tab_click">
<ul>
<li class="on">展会</li>
<!--<li>市场分析</li>-->
</ul>
</div>
<div class="tab_con">
<div>
<ul>
<?php $tags=tag("moduleid=8&condition=status=3&order=addtime desc&datetype=2&pagesize=6&template=null")?>
<?php if(is_array($tags)) { foreach($tags as $t) { ?>
<li>
<h3 class="fl"><a target="_blank" href="<?php echo $t['linkurl'];?>"
title="<?php echo $t['title'];?>"><?php echo $t['title'];?></a>
</h3>
<span class="fr c999"><?php echo date("m-d",$t['addtime']);?></span>
</li>
<?php } } ?>
</ul>
</div>
<div>
<ul>
<?php $tags=tag("moduleid=21&condition=status=3&order=addtime desc&datype=2&pagesize=6&template=null")?>
<?php if(is_array($tags)) { foreach($tags as $t) { ?>
<li>
<h3 class="fl"><a target="_blank" href="<?php echo $t['linkurl'];?>"
title="<?php echo $t['title'];?>"><?php echo $t['title'];?></a>
</h3>
<span class="fr c999"><?php echo date("m-d",$t['addtime']);?></span>
</li>
<?php } } ?>
</ul>
</div>
</div>
</div>
<div class="in_news_tab fl mr10">
<div class="tab_list tab_click">
<ul>
<li class="on">知识</li>
<!--<li>政策法规</li>-->
</ul>
</div>
<div class="tab_con">
<div>
<ul>
<?php $tags=tag("moduleid=21&catid=13901&condition=status=3&order=addtime desc&datype=2&pagesize=6&template=null")?>
<?php if(is_array($tags)) { foreach($tags as $t) { ?>
<li>
<h3 class="fl"><a target="_blank" href="<?php echo $t['linkurl'];?>"
title="<?php echo $t['title'];?>"><?php echo $t['title'];?></a>
</h3>
<span class="fr c999"><?php echo date("m-d",$t['addtime']);?></span>
</li>
<?php } } ?>
</ul>
</div>
<div>
<ul>
<?php $tags=tag("moduleid=21&condition=status=3&order=addtime desc&datype=2&pagesize=6&template=null")?>
<?php if(is_array($tags)) { foreach($tags as $t) { ?>
<li>
<h3 class="fl"><a target="_blank" href="<?php echo $t['linkurl'];?>"
title="<?php echo $t['title'];?>"><?php echo $t['title'];?></a>
</h3>
<span class="fr c999"><?php echo date("m-d",$t['addtime']);?></span>
</li>
<?php } } ?>
</ul>
</div>
</div>
</div>
<div class="in_news_list fl">
<div class="tit"><h3>企业专访</h3></div>
<div class="con">
<ul>
<?php $tags=tag("moduleid=21&catid=13900&condition=status=3&order=addtime desc&datype=2&pagesize=6&template=null")?>
<?php if(is_array($tags)) { foreach($tags as $t) { ?>
<li>
<h3 class="fl"><a target="_blank" href="<?php echo $t['linkurl'];?>"
title="<?php echo $t['title'];?>"><?php echo $t['title'];?></a>
</h3>
<span class="fr c999"><?php echo date("m-d",$t['addtime']);?></span>
</li>
<?php } } ?>
</ul>
</div>
</div>
</div>
<div class="clear_h20"></div>
<!--ad-->
<div class="in_ad_m">
<img class="imglazy w710 mr10" src="<?php echo DT_SKIN;?>image/161020144511488.gif" title="-" alt="-" />
<img class="imglazy w230 mr10" src="<?php echo DT_SKIN;?>image/161107153009737.png" title="-" alt="-" />
<img class="imglazy w230 " src="<?php echo DT_SKIN;?>image/161020141844942.jpg"/>
</div>
<div class="clear"></div>
</div>
<script type="text/javascript" src="<?php echo DT_STATIC;?>file/script/index.js"></script>
<script type="text/javascript" src="<?php echo DT_STATIC;?>file/script/marquee.js"></script>
<script type="text/javascript">
new dmarquee(22, 10, 3000, 'site_stats');
new dmarquee(22, 30, 3000, 'company');
if(get_cookie('auth')) {
$('.iuser_l')[0].title = '商务中心';
$('.iuser_l')[0].href = '<?php echo $MODULE['2']['linkurl'];?>';
$('.iuser_l')[0].className = 'iuser_u';
$('.iuser_r')[0].title = '完善我的会员资料';
$('.iuser_r')[0].href = '<?php echo $MODULE['2']['linkurl'];?>edit.php';
$('.iuser_r')[0].className = 'iuser_e';
}
</script>
<?php include template('footer');?>