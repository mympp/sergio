<?php
/*
	[Destoon B2B System] Copyright (c) 2008-2016 www.destoon.com
	This is NOT a freeware, use is subject to license.txt
*/
defined('IN_DESTOON') or exit('Access Denied');
if($itemid) {
	$item = $db->get_one("SELECT * FROM {$table} WHERE itemid=$itemid");
	($item && $item['status'] > 2) or mobile_msg($L['msg_not_exist']);
	$dorder  = array('addtime DESC', 'addtime DESC', 'addtime ASC', 'edittime DESC', 'edittime ASC', 'price DESC', 'price ASC');
	extract($item);
	$CAT = get_cat($catid);
    if(!check_group($_groupid, $CAT['group_show'])) include load('403.inc');
    $content_table = content_table($moduleid, $itemid, $MOD['split'], $table_data);
    $t = $db->get_one("SELECT content FROM {$content_table} WHERE itemid=$itemid");
    $content = $t['content'];
    if($lazy) $content = img_lazy($content);

    $CP = $MOD['cat_property'] && $CAT['property'];
    if($CP) {
	  require DT_ROOT.'/include/property.func.php';
	  $options = property_option($catid);
	  $values = property_value($moduleid, $itemid);
    }

    $TYPE = array();
    foreach(get_type('special-'.$itemid) as $v) {
	 $v['linkurl'] = $MOD['linkurl'].rewrite('type.php?tid='.$v['typeid']);
	 $TYPE[] = $v;
    }
    $adddate = timetodate($addtime, 3);
    $editdate = timetodate($edittime, 3);
    $linkurl = $MOD['linkurl'].$linkurl;
    $user_status = 3;
	$condition = ' specialid='.$itemid.'';
	$S = array();
	$table_item = $table.'_item';
	$r = $db->get_one("SELECT COUNT(*) AS num FROM {$table_item} WHERE $condition", 'CACHE');
	$items = $r['num'];
	$pagesize = isset($MOD['pagesize'])?$MOD['pagesize']:$pagesize;
	$offset = ($page-1)*$pagesize;
	$spepages = mobile_pages($items, $page, $pagesize);
	$result = $db->query("SELECT itemid,specialid,typeid,level,title,thumb,username,linkurl FROM {$table_item} WHERE {$condition} ORDER BY addtime desc,itemid desc LIMIT $offset,$pagesize");
	while($r = $db->fetch_array($result)) {
		$r['middle'] = str_replace('.thumb.', '.middle.', $r['thumb']);
		$r['typename'] = gl_type_name(''.$module.'-'.$r['specialid'].'',$r['typeid']);
		$r['modulename'] = $MODULE[$r['mid']]['name'];
		if($r['thumb'] && $r['thumb1'] && $r['thumb2'])$r['thumbs'] = 1;
		//if($DT_TOUCH) $r['linkurl'] = mobileurl($r['mid'],0, $r['item_id']);
		$S[] = $r;
	}

    $update = '';
	include DT_ROOT.'/include/update.inc.php';
	$seo_file = 'show';
	$head_title = $title.$DT['seo_delimiter'].$MOD['name'].$DT['seo_delimiter'].$head_title;
	$head_name = $CAT['catname'];
	$back_link = 'javascript:Dback(\''.mobileurl($moduleid, $catid).'\', \''.$DT_REF.'\', \'share|comment\');';
	$foot = '';
} else {
	if($kw) {
		check_group($_groupid, $MOD['group_search']) or mobile_msg($L['msg_no_search']);
	} else if($catid) {
		$CAT or mobile_msg($L['msg_not_cate']);
		if(!check_group($_groupid, $MOD['group_list']) || !check_group($_groupid, $CAT['group_list'])) {
			mobile_msg($L['msg_no_right']);
		}
	} else {
		check_group($_groupid, $MOD['group_index']) or mobile_msg($L['msg_no_right']);
	}
	$head_title = $MOD['name'].$DT['seo_delimiter'].$head_title;
	if($kw) $head_title = $kw.$DT['seo_delimiter'].$head_title;
	$condition = "status=3";
	if($keyword) $condition .= " AND keyword LIKE '%$keyword%'";
	if($catid) $condition .= $CAT ? " AND catid IN (".$CAT['arrchildid'].")" : " AND catid=$catid";
	if($areaid) $condition .= $ARE['child'] ? " AND areaid IN (".$ARE['arrchildid'].")" : " AND areaid=$areaid";
	$r = $db->get_one("SELECT COUNT(*) AS num FROM {$table} WHERE $condition", 'CACHE');
	$items = $r['num'];
	$pagesize = isset($MOD['pagesize'])?$MOD['pagesize']:$pagesize;
    $offset = ($page-1)*$pagesize;
	$pages = mobile_pages($items, $page, $pagesize);
	$lists = array();
	if($items) {
		$order = $MOD['order'];
		$time = strpos($MOD['order'], 'add') !== false ? 'addtime' : 'edittime';
		$result = $db->query("SELECT ".$MOD['fields']." FROM {$table} WHERE $condition ORDER BY $order LIMIT $offset,$pagesize");
		while($r = $db->fetch_array($result)) {
		    $r['adddate'] = timetodate($r['addtime'], 3);
		    $r['editdate'] = timetodate($r['edittime'], 3);
			if($kw) $r['title'] = str_replace($kw, '<b class="f_red">'.$kw.'</b>', $r['title']);
			$r['linkurl'] = mobileurl($moduleid, 0, $r['itemid']);
			$lists[] = $r;
		}
		$db->free_result($result);
	}
	$back_link = mobileurl($moduleid);
	if($kw) {
		$seo_file = 'search';
		$head_name = $MOD['name'].$L['search'];
	} else if($catid) {
		$seo_file = 'list';
		$head_title = $CAT['catname'].$DT['seo_delimiter'].$head_title;
		$head_name = $CAT['catname'];
		if($CAT['parentid']) $back_link = mobileurl($moduleid, $CAT['parentid']);
	} else {
		$seo_file = 'index';
		$head_name = $MOD['name'];
	}
}
include DT_ROOT.'/include/seo.inc.php';
include template($module, 'mobile');
?>