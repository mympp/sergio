<?php defined('IN_DESTOON') or exit('Access Denied');?><!DOCTYPE html PUBLIC "-//W3C//DTD XHTML 1.0 Transitional//EN" "http://www.w3.org/TR/xhtml1/DTD/xhtml1-transitional.dtd">
<html xmlns="http://www.w3.org/1999/xhtml">
<head>
<meta http-equiv="Content-Type" content="text/html;charset=<?php echo DT_CHARSET;?>"/>
<title><?php if($seo_title) { ?><?php echo $seo_title;?><?php } else { ?><?php if($head_title) { ?><?php echo $head_title;?><?php echo $DT['seo_delimiter'];?><?php } ?>
<?php if($city_sitename) { ?><?php echo $city_sitename;?><?php } else { ?><?php echo $DT['sitename'];?><?php } ?>
<?php } ?>
</title>
<?php if($head_keywords) { ?>
<meta name="keywords" content="<?php echo $head_keywords;?>"/>
<?php } ?>
<?php if($head_description) { ?>
<meta name="description" content="<?php echo $head_description;?>"/>
<?php } ?>
<?php if($head_mobile) { ?>
<meta http-equiv="mobile-agent" content="format=html5;url=<?php echo $head_mobile;?>">
<?php } ?>
<meta name="generator" content="DESTOON B2B - www.destoon.com"/>
<link rel="shortcut icon" type="image/x-icon" href="<?php echo DT_STATIC;?>favicon.ico"/>
<link rel="bookmark" type="image/x-icon" href="<?php echo DT_STATIC;?>favicon.ico"/>
<?php if($head_canonical) { ?>
<link rel="canonical" href="<?php echo $head_canonical;?>"/>
<?php } ?>
<?php if($EXT['archiver_enable']) { ?>
<link rel="archives" title="<?php echo $DT['sitename'];?>" href="<?php echo $EXT['archiver_url'];?>"/>
<?php } ?>
<link rel="stylesheet" type="text/css" href="<?php echo DT_SKIN;?>style.css"/>
<link rel="stylesheet" type="text/css" href="<?php echo DT_SKIN;?>style1.css"/>
<link rel="stylesheet" type="text/css" href="<?php echo DT_SKIN;?>malls.css"/>
<?php if($moduleid>4) { ?><link rel="stylesheet" type="text/css" href="<?php echo DT_SKIN;?><?php echo $module;?>.css"/><?php } ?>
<?php if($CSS) { ?>
<?php if(is_array($CSS)) { foreach($CSS as $css) { ?>
<link rel="stylesheet" type="text/css" href="<?php echo DT_SKIN;?><?php echo $css;?>.css"/>
<?php } } ?>
<?php } ?>
<!--[if lte IE 6]>
<link rel="stylesheet" type="text/css" href="<?php echo DT_SKIN;?>ie6.css"/>
<![endif]-->
<?php if(!DT_DEBUG) { ?><script type="text/javascript">window.onerror=function(){return true;}</script><?php } ?>
<script type="text/javascript" src="<?php echo DT_STATIC;?>lang/<?php echo DT_LANG;?>/lang.js"></script>
<script type="text/javascript" src="<?php echo DT_STATIC;?>file/script/config.js"></script>
<script type="text/javascript" src="<?php echo DT_STATIC;?>file/script/jquery.js"></script>
<script type="text/javascript" src="<?php echo DT_STATIC;?>file/script/common.js"></script>
<script type="text/javascript" src="<?php echo DT_STATIC;?>file/script/page.js"></script>
<script type="text/javascript" src="<?php echo DT_SKIN;?>jquery.SuperSlide.2.1.1.js"></script>
<script type="text/javascript" src="<?php echo DT_SKIN;?>page2.js"></script>
<script type="text/javascript" src="<?php echo DT_SKIN;?>platform.js"></script>
<script type="text/javascript" src="<?php echo DT_STATIC;?>file/script/jsonp.js"></script>
<?php if($lazy) { ?><script type="text/javascript" src="<?php echo DT_STATIC;?>file/script/jquery.lazyload.js"></script><?php } ?>
<?php if($JS) { ?>
<?php if(is_array($JS)) { foreach($JS as $js) { ?>
<script type="text/javascript" src="<?php echo DT_STATIC;?>file/script/<?php echo $js;?>.js"></script>
<?php } } ?>
<?php } ?>
<?php $searchid = ($moduleid > 3 && $MODULE[$moduleid]['ismenu'] && !$MODULE[$moduleid]['islink']) ? $moduleid : 5;?>
<script type="text/javascript">
<?php if($head_mobile && $EXT['mobile_goto']) { ?>
GoMobile('<?php echo $head_mobile;?>');
<?php } ?>
var searchid = <?php echo $searchid;?>;
<?php if($itemid && $DT['anticopy']) { ?>
document.oncontextmenu=function(e){return false;};
document.onselectstart=function(e){return false;};
<?php } ?>
</script>
</head>
<body onload="login()">
<div class="top">
<div class="main" id="head">
<div class="head_m">
<div class="f_r" id="destoon_member"></div>
<div class="head_l">
<ul>
<?php if($DT['city']) { ?><li class="h_city">[<span id="destoon_city"><?php echo $city_name;?></span>] <a href="<?php echo DT_PATH;?>api/city.php" title="点击切换城市" rel="nofollow">切换</a></li><?php } ?>
<li class="h_fav"><script type="text/javascript">addFav('收藏本页');</script></li>
<?php if($EXT['mobile_enable']) { ?><li class="h_mobile"><a href="<?php echo $EXT['mobile_url'];?>mobile.php">手机版</a>&nbsp;</li><?php } ?>
<?php if($head_mobile) { ?><li class="h_qrcode"><a href="javascript:Dqrcode();">二维码</a>&nbsp;</li><?php } ?>
<?php if(isset($MODULE['16'])) { ?><li class="h_cart"><a href="<?php echo $MODULE['16']['linkurl'];?>cart.php" rel="nofollow">购物车</a>(<span class="head_t" id="destoon_cart">0</span>)</li><?php } ?>
</ul>
</div>
</div>
</div>
</div>
<?php if($head_mobile) { ?><div id="destoon_qrcode" style="display:none;"></div><?php } ?>
<div class="m head_s" id="destoon_space"></div>
<?php $searchid = ($moduleid > 3 && $MODULE[$moduleid]['ismenu'] && !$MODULE[$moduleid]['islink']) ? $moduleid : 5;?>
<?php $searchids = array(5,16,21,22);?>
<?php if(!in_array($searchid, $searchids)) { ?>
<?php $searchids[] = $searchid;?>
<?php } ?>
<script type="text/javascript">var searchid = <?php echo $searchid;?>;</script>
<div class="m">
<div class="logo f_l">
<a href="<?php echo $MODULE['1']['linkurl'];?>">
<img src="<?php if($MODULE[$moduleid]['logo']) { ?><?php echo DT_SKIN;?>image/logo_<?php echo $moduleid;?>.gif<?php } else if($DT['logo']) { ?><?php echo $DT['logo'];?><?php } else { ?><?php echo DT_SKIN;?>image/logo.gif<?php } ?>
" alt="<?php echo $DT['sitename'];?>"/></a>
</div>
<div class="search fl">
<form id="destoon_search" action="<?php echo DT_PATH;?>api/search.php" onsubmit="return Dsearch();">
<input type="hidden" name="moduleid" value="<?php echo $searchid;?>" id="destoon_moduleid"/>
<input type="hidden" name="spread" value="0" id="destoon_spread"/>
<div class="lm" id="search_moduleli" style="overflow:hidden;">
<?php if(is_array($searchids)) { foreach($searchids as $s) { ?>
<?php if(isset($MODULE[$s])) { ?>
<a<?php if($searchid == $s) { ?> class="cur"<?php } ?>
 onclick="setModuleli(<?php echo $s;?>, this);">
<?php echo $MODULE[$s]['name'];?></a><b>丨</b>
<?php } ?>
<?php } } ?>
</div>
<div class="sear">
<input type="text" value="<?php if($kw) { ?><?php echo $kw;?><?php } else { ?>请输入关键词<?php } ?>
" id="destoon_kw" class="inp" name="kw" maxlength="30" onfocus="if(this.value=='请输入关键词') this.value='';"<?php if($DT['search_tips']) { ?> onkeyup="STip(this.value);" autocomplete="off"<?php } ?>
 x-webkit-speech speech/>
<button type="submit" value=" " class="btn">搜&nbsp;索</button>
</div>
</form>
</div>
<div class="hot">
<!--
<a href="" onclick="Dsearch_top();return false;"><strong>标王</strong></a> 
<a href="" onclick="Dsearch_adv();return false;"><strong>热搜：</strong></a>
-->
<span id="destoon_word">
<?php echo tag("moduleid=$searchid&table=keyword&condition=moduleid=$searchid and status=3&pagesize=10&order=total_search desc&template=list-search_kw");?>
</span>
</div>
<div class="index_bz fr">
<ul>
<li><span class="index_bz_icon index_bz_icon1 fl"></span><span class="bz_txt fl">正品保障</span></li>
<li><span class="index_bz_icon index_bz_icon2 fl"></span><span class="bz_txt fl">极速响应</span></li>
<li><span class="index_bz_icon index_bz_icon3 fl"></span><span class="bz_txt fl">15天退换</span></li>
</ul>
</div>
</div>
<div class="top_nav">
<div class="main">
<div class="nav_sort">
<h2>产业链分类</h2>
<div class="all_sort sort_por_ab">
<ul>
<li>
<div class="sort_lm1">
<?php $mid = 5;?>
<?php $child = get_maincat(0, $mid, -1);?>
<?php if(is_array($child)) { foreach($child as $i => $c) { ?>
<?php if($i < 1 && $c['child']) { ?>
<h3><a href="<?php echo $MODULE[$mid]['linkurl'];?><?php echo $c['linkurl'];?>" target="_blank"><?php echo set_style($c['catname'], $c['style']);?> &nbsp;&nbsp;</a></h3>
<?php $sub = get_maincat($c['catid'], $mid, -1);?>
<p>
<?php if(is_array($sub)) { foreach($sub as $j => $s) { ?>
<?php if($j < 3) { ?><a href="<?php echo $MODULE[$mid]['linkurl'];?><?php echo $s['linkurl'];?>" target="_blank"><?php echo set_style($s['catname'], $s['style']);?> &nbsp;&nbsp;</a><?php } ?>
<?php } } ?>
</p>
<?php } ?>
<?php } } ?>
</div>
<div class="sort_lmr">
<ul>
<li>
<?php $mid=5;?>
<?php $child=get_maincat(0,$mid,1)?>
<?php if(is_array($child)) { foreach($child as $i => $c) { ?>
<?php if($i < 1 && $c['child']) { ?>
<?php $sub = get_maincat($c['catid'], $mid, -1);?>
<?php if(is_array($sub)) { foreach($sub as $j => $s) { ?>
<?php if($j < 6) { ?>
<div class="sort_lm2">
<a href="<?php echo $MODULE[$mid]['linkurl'];?><?php echo $s['linkurl'];?>" target="_blank"><?php echo set_style($s['catname'], $s['style']);?></a>
</div>
<?php $t=get_maincat($s['catid'],$CATEGORY,-1);?>
<div class="sort_lm3">
<?php if(is_array($t)) { foreach($t as $k => $m) { ?>
<?php if($k < 10) { ?>
<a href="<?php echo $MODULE[$mid]['linkurl'];?><?php echo $m['linkurl'];?>" target="_blank"><?php echo set_style($m['catname'], $m['style']);?></a>
<?php } ?>
<?php } } ?>
</div>
<?php } ?>
<?php } } ?>
<?php } ?>
<?php } } ?>
</li>
</ul>
<ul class="sort_ad">
<div class="bran">
<?php $tags=tag("moduleid=13&condition=status=3 and thumb<>''&order=addtime desc&pagesize=8&template=null")?>
<?php if(is_array($tags)) { foreach($tags as $t) { ?>
<span>
<a title="<?php echo $t['title'];?>" href="<?php echo $t['linkurl'];?>" class="pic_c" target="">
<img src="<?php echo $t['thumb'];?>" title="<?php echo $t['title'];?>" alt="<?php echo $t['alt'];?>" width="73" height="37" /></a>
</span>
<?php } } ?>
</div>
<div class="ad"><a class="pic_c" target="_blank"><img src="<?php echo DT_SKIN;?>image/160615161843452.jpg"class="ad3" width="189" height="228" /></a></div>
</ul>
</div>
</li>
<li>
<div class="sort_lm1">
<?php $mid = 5;?>
<?php $child = get_maincat(0, $mid, -1);?>
<?php if(is_array($child)) { foreach($child as $i => $c) { ?>
<?php if($i >0 && $i < 2 && $c['child']) { ?>
<h3><a href="<?php echo $MODULE[$mid]['linkurl'];?><?php echo $c['linkurl'];?>" target="_blank"><?php echo set_style($c['catname'], $c['style']);?> &nbsp;&nbsp;</a></h3>
<?php $sub = get_maincat($c['catid'], $mid, -1);?>
<p>
<?php if(is_array($sub)) { foreach($sub as $j => $s) { ?>
<?php if($j< 3) { ?><a href="<?php echo $MODULE[$mid]['linkurl'];?><?php echo $s['linkurl'];?>" target="_blank"><?php echo set_style($s['catname'], $s['style']);?> &nbsp;&nbsp;</a><?php } ?>
<?php } } ?>
</p>
<?php } ?>
<?php } } ?>
</div>
<div class="sort_lmr">
<ul>
<li>
<?php $mid=5;?>
<?php $child=get_maincat(0,$mid,-1)?>
<?php if(is_array($child)) { foreach($child as $i => $c) { ?>
<?php if($i > 0 && $i < 2 && $c['child']) { ?>
<?php $sub = get_maincat($c['catid'], $mid, -1);?>
<?php if(is_array($sub)) { foreach($sub as $j => $s) { ?>
<?php if($j < 6) { ?>
<div class="sort_lm2">
<a href="<?php echo $MODULE[$mid]['linkurl'];?><?php echo $s['linkurl'];?>" target="_blank"><?php echo set_style($s['catname'], $s['style']);?></a>
</div>
<?php $t=get_maincat($s['catid'],$CATEGORY,-1);?>
<div class="sort_lm3">
<?php if(is_array($t)) { foreach($t as $k => $m) { ?>
<?php if($k < 10) { ?>
<a href="<?php echo $MODULE[$mid]['linkurl'];?><?php echo $m['linkurl'];?>" target="_blank"><?php echo set_style($m['catname'], $m['style']);?></a>
<?php } ?>
<?php } } ?>
</div>
<?php } ?>
<?php } } ?>
<?php } ?>
<?php } } ?>
</li>
</ul>
<ul class="sort_ad">
<div class="bran">
<?php $tags=tag("moduleid=13&condition=status=3 and thumb<>''&order=addtime desc&pagesize=8&template=null")?>
<?php if(is_array($tags)) { foreach($tags as $t) { ?>
<span>
<a title="<?php echo $t['title'];?>" href="<?php echo $t['linkurl'];?>" class="pic_c" target="">
<img src="<?php echo $t['thumb'];?>" title="<?php echo $t['title'];?>" alt="<?php echo $t['alt'];?>" width="73" height="37" /></a>
</span>
<?php } } ?>
</div>
<div class="ad"><a class="pic_c" target="_blank"><img src="<?php echo DT_SKIN;?>image/160615161843452.jpg"class="ad3" width="189" height="228" /></a></div>
</ul>
</div>
</li>
<li>
<div class="sort_lm1">
<?php $mid = 5;?>
<?php $child = get_maincat(0, $mid, -1);?>
<?php if(is_array($child)) { foreach($child as $i => $c) { ?>
<?php if($i > 1 && $i < 3 && $c['child']) { ?>
<h3><a href="<?php echo $MODULE[$mid]['linkurl'];?><?php echo $c['linkurl'];?>" target="_blank"><?php echo set_style($c['catname'], $c['style']);?> &nbsp;&nbsp;</a></h3>
<?php $sub = get_maincat($c['catid'], $mid, -1);?>
<p>
<?php if(is_array($sub)) { foreach($sub as $j => $s) { ?>
<?php if($j < 3) { ?><a href="<?php echo $MODULE[$mid]['linkurl'];?><?php echo $s['linkurl'];?>" target="_blank"><?php echo set_style($s['catname'], $s['style']);?> &nbsp;&nbsp;</a><?php } ?>
<?php } } ?>
</p>
<?php } ?>
<?php } } ?>
</div>
<div class="sort_lmr">
<ul>
<li>
<?php $mid=5;?>
<?php $child=get_maincat(0,$mid,-1)?>
<?php if(is_array($child)) { foreach($child as $i => $c) { ?>
<?php if($i > 1 && $i < 3 && $c['child']) { ?>
<?php $sub = get_maincat($c['catid'], $mid, -1);?>
<?php if(is_array($sub)) { foreach($sub as $j => $s) { ?>
<?php if($j < 6) { ?>
<div class="sort_lm2">
<a href="<?php echo $MODULE[$mid]['linkurl'];?><?php echo $s['linkurl'];?>" target="_blank"><?php echo set_style($s['catname'], $s['style']);?></a>
</div>
<?php $t=get_maincat($s['catid'],$CATEGORY,-1);?>
<div class="sort_lm3">
<?php if(is_array($t)) { foreach($t as $k => $m) { ?>
<?php if($k < 10) { ?>
<a href="<?php echo $MODULE[$mid]['linkurl'];?><?php echo $m['linkurl'];?>" target="_blank"><?php echo set_style($m['catname'], $m['style']);?></a>
<?php } ?>
<?php } } ?>
</div>
<?php } ?>
<?php } } ?>
<?php } ?>
<?php } } ?>
</li>
</ul>
<ul class="sort_ad">
<div class="bran">
<?php $tags=tag("moduleid=13&condition=status=3 and thumb<>''&order=addtime desc&pagesize=8&template=null")?>
<?php if(is_array($tags)) { foreach($tags as $t) { ?>
<span>
<a title="<?php echo $t['title'];?>" href="<?php echo $t['linkurl'];?>" class="pic_c" target="">
<img src="<?php echo $t['thumb'];?>" title="<?php echo $t['title'];?>" alt="<?php echo $t['alt'];?>" width="73" height="37" /></a>
</span>
<?php } } ?>
</div>
<div class="ad"><a class="pic_c" target="_blank"><img src="<?php echo DT_SKIN;?>image/160615161843452.jpg"class="ad3" width="189" height="228" /></a></div>
</ul>
</div>
</li>
<li>
<div class="sort_lm1">
<?php $mid = 5;?>
<?php $child = get_maincat(0, $mid, -1);?>
<?php if(is_array($child)) { foreach($child as $i => $c) { ?>
<?php if($i > 2 && $i < 4 && $c['child']) { ?>
<h3><a href="<?php echo $MODULE[$mid]['linkurl'];?><?php echo $c['linkurl'];?>" target="_blank"><?php echo set_style($c['catname'], $c['style']);?> &nbsp;&nbsp;</a></h3>
<?php $sub = get_maincat($c['catid'], $mid, -1);?>
<p>
<?php if(is_array($sub)) { foreach($sub as $j => $s) { ?>
<?php if($j < 3) { ?><a href="<?php echo $MODULE[$mid]['linkurl'];?><?php echo $s['linkurl'];?>" target="_blank"><?php echo set_style($s['catname'], $s['style']);?> &nbsp;&nbsp;</a><?php } ?>
<?php } } ?>
</p>
<?php } ?>
<?php } } ?>
</div>
<div class="sort_lmr">
<ul>
<li>
<?php $mid=5;?>
<?php $child=get_maincat(0,$mid,-1)?>
<?php if(is_array($child)) { foreach($child as $i => $c) { ?>
<?php if($i > 2 && $i < 4 && $c['child']) { ?>
<?php $sub = get_maincat($c['catid'], $mid, -1);?>
<?php if(is_array($sub)) { foreach($sub as $j => $s) { ?>
<?php if($j < 6) { ?>
<div class="sort_lm2">
<a href="<?php echo $MODULE[$mid]['linkurl'];?><?php echo $s['linkurl'];?>" target="_blank"><?php echo set_style($s['catname'], $s['style']);?></a>
</div>
<?php $t=get_maincat($s['catid'],$CATEGORY,-1);?>
<div class="sort_lm3">
<?php if(is_array($t)) { foreach($t as $k => $m) { ?>
<?php if($k<10) { ?>
<a href="<?php echo $MODULE[$mid]['linkurl'];?><?php echo $m['linkurl'];?>" target="_blank"><?php echo set_style($m['catname'], $m['style']);?></a>
<?php } ?>
<?php } } ?>
</div>
<?php } ?>
<?php } } ?>
<?php } ?>
<?php } } ?>
</li>
</ul>
<ul class="sort_ad">
<div class="bran">
<?php $tags=tag("moduleid=13&condition=status=3 and thumb<>''&order=addtime desc&pagesize=8&template=null")?>
<?php if(is_array($tags)) { foreach($tags as $t) { ?>
<span>
<a title="<?php echo $t['title'];?>" href="<?php echo $t['linkurl'];?>" class="pic_c" target="">
<img src="<?php echo $t['thumb'];?>" title="<?php echo $t['title'];?>" alt="<?php echo $t['alt'];?>" width="73" height="37" /></a>
</span>
<?php } } ?>
</div>
<div class="ad"><a class="pic_c" target="_blank"><img src="<?php echo DT_SKIN;?>image/160615161843452.jpg"class="ad3" width="189" height="228" /></a></div>
</ul>
</div>
</li>
<li>
<div class="sort_lm1">
<?php $mid = 5;?>
<?php $child = get_maincat(0, $mid, -1);?>
<?php if(is_array($child)) { foreach($child as $i => $c) { ?>
<?php if($i > 3 && $i < 5 && $c['child']) { ?>
<h3><a href="<?php echo $MODULE[$mid]['linkurl'];?><?php echo $c['linkurl'];?>" target="_blank"><?php echo set_style($c['catname'], $c['style']);?> &nbsp;&nbsp;</a></h3>
<?php $sub = get_maincat($c['catid'], $mid, -1);?>
<p>
<?php if(is_array($sub)) { foreach($sub as $j => $s) { ?>
<?php if($j < 3) { ?><a href="<?php echo $MODULE[$mid]['linkurl'];?><?php echo $s['linkurl'];?>" target="_blank"><?php echo set_style($s['catname'], $s['style']);?> &nbsp;&nbsp;</a><?php } ?>
<?php } } ?>
</p>
<?php } ?>
<?php } } ?>
</div>
<div class="sort_lmr">
<ul>
<li>
<?php $mid=5;?>
<?php $child=get_maincat(0,$mid,-1)?>
<?php if(is_array($child)) { foreach($child as $i => $c) { ?>
<?php if($i > 3 && $i < 5 && $c['child']) { ?>
<?php $sub = get_maincat($c['catid'], $mid, -1);?>
<?php if(is_array($sub)) { foreach($sub as $j => $s) { ?>
<?php if($j < 6) { ?>
<div class="sort_lm2">
<a href="<?php echo $MODULE[$mid]['linkurl'];?><?php echo $s['linkurl'];?>" target="_blank"><?php echo set_style($s['catname'], $s['style']);?></a>
</div>
<?php $t=get_maincat($s['catid'],$CATEGORY,-1);?>
<div class="sort_lm3">
<?php if(is_array($t)) { foreach($t as $k => $m) { ?>
<?php if($k < 10) { ?>
<a href="<?php echo $MODULE[$mid]['linkurl'];?><?php echo $m['linkurl'];?>" target="_blank"><?php echo set_style($m['catname'], $m['style']);?></a>
<?php } ?>
<?php } } ?>
</div>
<?php } ?>
<?php } } ?>
<?php } ?>
<?php } } ?>
</li>
</ul>
<ul class="sort_ad">
<div class="bran">
<?php $tags=tag("moduleid=13&condition=status=3 and thumb<>''&order=addtime desc&pagesize=8&template=null")?>
<?php if(is_array($tags)) { foreach($tags as $t) { ?>
<span>
<a title="<?php echo $t['title'];?>" href="<?php echo $t['linkurl'];?>" class="pic_c" target="">
<img src="<?php echo $t['thumb'];?>" title="<?php echo $t['title'];?>" alt="<?php echo $t['alt'];?>" width="73" height="37" /></a>
</span>
<?php } } ?>
</div>
<div class="ad"><a class="pic_c" target="_blank"><img src="<?php echo DT_SKIN;?>image/160615161843452.jpg"class="ad3" width="189" height="228" /></a></div>
</ul>
</div>
</li>
<li>
<div class="sort_lm1">
<?php $mid = 5;?>
<?php $child = get_maincat(0, $mid, -1);?>
<?php if(is_array($child)) { foreach($child as $i => $c) { ?>
<?php if($i > 4 && $i < 6 && $c['child']) { ?>
<h3><a href="<?php echo $MODULE[$mid]['linkurl'];?><?php echo $c['linkurl'];?>" target="_blank"><?php echo set_style($c['catname'], $c['style']);?> &nbsp;&nbsp;</a></h3>
<?php $sub = get_maincat($c['catid'], $mid, -1);?>
<p>
<?php if(is_array($sub)) { foreach($sub as $j => $s) { ?>
<?php if($j<3) { ?><a href="<?php echo $MODULE[$mid]['linkurl'];?><?php echo $s['linkurl'];?>" target="_blank"><?php echo set_style($s['catname'], $s['style']);?> &nbsp;&nbsp;</a><?php } ?>
<?php } } ?>
</p>
<?php } ?>
<?php } } ?>
</div>
<div class="sort_lmr">
<ul>
<li>
<?php $mid=5;?>
<?php $child=get_maincat(0,$mid,-1)?>
<?php if(is_array($child)) { foreach($child as $i => $c) { ?>
<?php if($i>4 && $i < 6 && $c['child']) { ?>
<?php $sub = get_maincat($c['catid'], $mid, -1);?>
<?php if(is_array($sub)) { foreach($sub as $j => $s) { ?>
<?php if($j < 6) { ?>
<div class="sort_lm2">
<a href="<?php echo $MODULE[$mid]['linkurl'];?><?php echo $s['linkurl'];?>" target="_blank"><?php echo set_style($s['catname'], $s['style']);?></a>
</div>
<?php $t=get_maincat($s['catid'],$CATEGORY,-1);?>
<div class="sort_lm3">
<?php if(is_array($t)) { foreach($t as $k => $m) { ?>
<?php if($k < 10) { ?>
<a href="<?php echo $MODULE[$mid]['linkurl'];?><?php echo $m['linkurl'];?>" target="_blank"><?php echo set_style($m['catname'], $m['style']);?></a>
<?php } ?>
<?php } } ?>
</div>
<?php } ?>
<?php } } ?>
<?php } ?>
<?php } } ?>
</li>
</ul>
<ul class="sort_ad">
<div class="bran">
<?php $tags=tag("moduleid=13&condition=status=3 and thumb<>''&order=addtime desc&pagesize=8&template=null")?>
<?php if(is_array($tags)) { foreach($tags as $t) { ?>
<span>
<a title="<?php echo $t['title'];?>" href="<?php echo $t['linkurl'];?>" class="pic_c" target="">
<img src="<?php echo $t['thumb'];?>" title="<?php echo $t['title'];?>" alt="<?php echo $t['alt'];?>" width="73" height="37" /></a>
</span>
<?php } } ?>
</div>
<div class="ad"><a class="pic_c" target="_blank"><img src="<?php echo DT_SKIN;?>image/160615161843452.jpg"class="ad3" width="189" height="228" /></a></div>
</ul>
</div>
</li>
<li>
<div class="sort_lm1">
<?php $mid = 5;?>
<?php $child = get_maincat(0, $mid, -1);?>
<?php if(is_array($child)) { foreach($child as $i => $c) { ?>
<?php if($i > 5 && $i < 7 && $c['child']) { ?>
<h3><a href="<?php echo $MODULE[$mid]['linkurl'];?><?php echo $c['linkurl'];?>" target="_blank"><?php echo set_style($c['catname'], $c['style']);?> &nbsp;&nbsp;</a></h3>
<?php $sub = get_maincat($c['catid'], $mid, -1);?>
<p>
<?php if(is_array($sub)) { foreach($sub as $j => $s) { ?>
<?php if($j < 3) { ?><a href="<?php echo $MODULE[$mid]['linkurl'];?><?php echo $s['linkurl'];?>" target="_blank"><?php echo set_style($s['catname'], $s['style']);?> &nbsp;&nbsp;</a><?php } ?>
<?php } } ?>
</p>
<?php } ?>
<?php } } ?>
</div>
<div class="sort_lmr">
<ul>
<li>
<?php $mid=5;?>
<?php $child=get_maincat(0,$mid,-1)?>
<?php if(is_array($child)) { foreach($child as $i => $c) { ?>
<?php if($i > 5 && $i < 7 && $c['child']) { ?>
<?php $sub = get_maincat($c['catid'], $mid, -1);?>
<?php if(is_array($sub)) { foreach($sub as $j => $s) { ?>
<?php if($j < 6) { ?>
<div class="sort_lm2">
<a href="<?php echo $MODULE[$mid]['linkurl'];?><?php echo $s['linkurl'];?>" target="_blank"><?php echo set_style($s['catname'], $s['style']);?></a>
</div>
<?php $t=get_maincat($s['catid'],$CATEGORY,-1);?>
<div class="sort_lm3">
<?php if(is_array($t)) { foreach($t as $k => $m) { ?>
<?php if($k < 10) { ?>
<a href="<?php echo $MODULE[$mid]['linkurl'];?><?php echo $m['linkurl'];?>" target="_blank"><?php echo set_style($m['catname'], $m['style']);?></a>
<?php } ?>
<?php } } ?>
</div>
<?php } ?>
<?php } } ?>
<?php } ?>
<?php } } ?>
</li>
</ul>
<ul class="sort_ad">
<div class="bran">
<?php $tags=tag("moduleid=13&condition=status=3 and thumb<>''&order=addtime desc&pagesize=8&template=null")?>
<?php if(is_array($tags)) { foreach($tags as $t) { ?>
<span>
<a title="<?php echo $t['title'];?>" href="<?php echo $t['linkurl'];?>" class="pic_c" target="">
<img src="<?php echo $t['thumb'];?>" title="<?php echo $t['title'];?>" alt="<?php echo $t['alt'];?>" width="73" height="37" /></a>
</span>
<?php } } ?>
</div>
<div class="ad"><a class="pic_c" target="_blank"><img src="<?php echo DT_SKIN;?>image/160615161843452.jpg"class="ad3" width="189" height="228" /></a></div>
</ul>
</div>
</li>
</ul>
</div>
</div>
<ul class="nav_r">
<li <?php if($moduleid<4) { ?> class="menuon"<?php } ?>
><a href="<?php echo $MODULE['1']['linkurl'];?>" class="cur">首页</a></li>
<?php if(is_array($MODULE)) { foreach($MODULE as $i => $m) { ?><?php if($m['ismenu'] ) { ?>
<li <?php if($m['moduleid']==$moduleid) { ?> class="menuon" <?php } ?>
><a target="_blank" href="<?php echo $m['linkurl'];?>" <?php if($m['isblank']) { ?> target="_blank"<?php } ?>
><?php echo $m['name'];?></a></li>
<?php } ?>
<?php } } ?>
</ul>
<div class="nav_ad">
<a target="_blank" href="<?php echo $MODULE['2']['linkurl'];?><?php echo $DT['file_register'];?>" rel="nofollow">
<img src="<?php echo DT_SKIN;?>image/sidebar.gif" /></a>
</div>
</div>
</div>
<div class="m b10">&nbsp;</div>