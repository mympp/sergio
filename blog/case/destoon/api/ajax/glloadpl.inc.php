<?php
/*
	亿顺网络手机版 作者一切归零 QQ:811142004
	http://www.e-action.top
*/
defined('IN_DESTOON') or exit('Access Denied');
if($EXT['comment_api']) exit;
$mid = isset($mid) ? intval($mid) : exit;
$itemid = isset($itemid) ? intval($itemid) : exit;

if($DT_TOUCH) require DT_ROOT.'/mobile/include/global.func.php';
require DT_ROOT.'/module/'.$module.'/common.inc.php';

switch($job) {
    case 'vote':
		if(!check_group($_groupid, $MOD['comment_vote_group']) || !$MOD['comment_vote']) exit('{"status":"抱歉，您没有投票权限"}');
		$cid = isset($cid) ? intval($cid) : 0;
		$cid or exit('{"status":"参数错误，如有疑问请联系管理员"}');
		$op = $op ? 1 : 0;
		$f = $op ? 'agree' : 'against';
		if(get_cookie('comment_vote_'.$mid.'_'.$itemid.'_'.$cid)) exit('{"status":"您已经对此评论表过态了"}');
		$db->query("UPDATE {$DT_PRE}comment SET `{$f}`=`{$f}`+1 WHERE itemid=$cid");
		set_cookie('comment_vote_'.$mid.'_'.$itemid.'_'.$cid, 1, $DT_TIME + 86400);
		exit('{"status":"ok"}');
    break;
	default:
	    $pagesize = isset($psize)?intval($psize):$pagesize;
        $offset = ($page-1)*$pagesize;
	    $lists = array();
			$condition = "item_mid=$mid AND item_id=$itemid AND status=3";
			$r = $db->get_one("SELECT COUNT(*) AS num FROM {$DT_PRE}comment WHERE {$condition}");
			$items = $r['num'];
			$pages = defined('CATID') ? listpages(1, CATID, $items, $page, $pagesize, 10, $MOD['linkurl']) : pages($items, $page, $pagesize);
			if($items) {
				$result = $db->query("SELECT * FROM {$DT_PRE}comment WHERE {$condition} ORDER BY itemid desc LIMIT $offset,$pagesize");
				$floor = $page == 1 ? 0 : ($page-1)*$pagesize;
				while($r = $db->fetch_array($result)) {
					$r['adddata'] = timetodate($r['addtime'], 3);
					if(DT_CHARSET != 'UTF-8') $r['content'] = convert($r['content'], $CFG['charset'],  'utf-8');
		            $r['useravatar'] = useravatar($r['username'], 'smaill');
					$r['truename'] = get_user($r['username'], 'username', 'truename');
					$r['adddate'] = gl_format_date($r['addtime']);
		            $r['areaid'] = get_user($r['username'], 'username', 'areaid');
		            $r['livearea'] = ($r['areaid']!=0)?gl_area_name($r['areaid']):'未知';
					$r['floor'] = ++$floor;
					if($r['username']) {
						$r['name'] = $r['hidden'] ? $MOD['comment_am'] : $r['passport'];
						$r['uname'] = $r['hidden'] ? '' : $r['username'];
					} else {
						$r['name'] = 'IP:'.hide_ip($r['ip']);
						$r['uname'] = '';
					}
					$lists[] = $r;
				}
			}
$totalCount = $items;
$totalPages = ceil($items/$pagesize);
$itemnum = $items - ($page*$pagesize);
if($itemnum<0) $itemnum = 0;
$datalist = array('data' => $lists,'totalCount' => $totalCount,'totalPages' => $totalPages,'itemnum' => $itemnum);

exit(json_encode($datalist));
break;
}		

?>