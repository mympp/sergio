<?php
/*
	亿顺网络手机版 作者一切归零 QQ:811142004
	http://www.e-action.top
*/
defined('IN_DESTOON') or exit('Access Denied');
require DT_ROOT.'/module/'.$module.'/common.inc.php';
if($DT_TOUCH) require DT_ROOT.'/mobile/include/global.func.php';

function putftext($msg) {
	global $EXT, $CFG;
	$msg = convert($msg, $CFG['charset'],  'utf-8');
	return $msg;
}

//$mids = isset($mids) ? intval($mids) : 5;
$table = get_table($moduleid);
$condition = 'status=3';
$order = isset($MOD['order'])?$MOD['order']:'addtime desc';
$pagesize = isset($MOD['pagesize'])?$MOD['pagesize']:$pagesize;
$offset = ($page-1)*$pagesize;

unset($CAT['moduleid']);
extract($CAT);
if($catid)$condition .= ($CAT['child']) ? " AND catid IN (".$CAT['arrchildid'].")" : " AND catid=$catid";
if($kw) $condition .= " AND keyword LIKE '%$kw%'";

if($page > 1 && $sum) {
	$items = $sum;
	} else {
	$r = $db->get_one("SELECT COUNT(*) AS num FROM {$table} WHERE $condition", $cache);
	$items = $r['num'];
	}

$pages = defined('CATID') ? listpages(1, CATID, $items, $page, $pagesize, 10, $MOD['linkurl']) : pages($items, $page, $pagesize);
if($items < 1) return array();
$lists = $catids = $CATS = array();

$result = $db->query("SELECT * FROM {$table} WHERE $condition ORDER BY ".$order." LIMIT $offset,$pagesize");
	while($r = $db->fetch_array($result)) {
		if($DT_TOUCH) $r['linkurl'] = mobileurl($moduleid, 0, $r['itemid']);
		if($r['username']) $r['useravatar'] = useravatar($r['username'], 'smaill');
		if($r['thumb']) $r['thumb'] = str_replace('.thumb.'.file_ext($r['thumb']), '.middle.'.file_ext($r['thumb']), $r['thumb']);
		if($r['price']) $r['price'] = floatval($r['price']);
		$r['adddata'] = timetodate($r['addtime'], 3);
		$r['date'] = timetodate($r['addtime'], 5);
		$r['adddates'] = timetodate($r['addtime'], 4);
		$r['money_sign'] = $DT['money_sign'];
		$lists[] = putftext($r);
}

//var_dump($result);
$totalCount = $items;
$totalPages = ceil($items/$pagesize);
$datalist = array('data' => $lists,'totalCount' => $totalCount,'totalPages' => $totalPages);

exit(json_encode($datalist));

?>