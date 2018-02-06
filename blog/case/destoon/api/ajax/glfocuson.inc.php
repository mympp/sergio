<?php
/*
	亿顺网络手机版 作者一切归零 QQ:811142004
	http://www.e-action.top
*/
defined('IN_DESTOON') or exit('Access Denied');
require DT_ROOT.'/module/'.$module.'/common.inc.php';
//$MG['gl_focuson_limit'] > -1 or gl_dojson(lang('message->without_permission_and_upgrade'), 'goback');
include load('gllang.lang');
$typeid = isset($typeid) ? intval($typeid) : 0;
($EXT['gl_zan'] || $EXT['gl_focuson'] || $EXT['gl_pingfen']) or gl_dojson($L['gl_no_openall']);

if(!$_userid) gl_dojson($L['gl_login_check']);
$table = get_table($mid);

switch($typeid) {//typeid 默认关注 1为点赞 2为评分 
	case '1':
	 $gl_cf_info = $L['gl_zan_cf'];
	 $gl_s_msg = $L['gl_zan_s'];
	break;
	default:
	 $gl_s_msg = $L['gl_focuson_s'];
	 $gl_cf_info = $L['gl_focuson_cf'];
	break;
}

switch($job) {
	case 'add':
		if($EXT['gl_focuson_nums']) {
			$r = $db->get_one("SELECT COUNT(*) AS num FROM {$DT_PRE}extend_focuson WHERE userid=$_userid and typeid=$typeid");
			if($r['num'] >= $EXT['gl_focuson_limit']) gl_dojson(lang($L['gl_focuson_limit'], array($EXT['gl_focuson_limit'])));
		}
		if(get_cookie('focuson_add_'.$mid.'_'.$itemid.'_'.$typeid.'_'.$_userid))gl_dojson($gl_cf_info);
		$r = $db->get_one("SELECT pid FROM {$DT_PRE}extend_focuson WHERE userid=$_userid and itemid=$itemid and moduleid=$mid and typeid=$typeid");
		if($r)gl_dojson($gl_cf_info);
		$r = $db->get_one("SELECT title FROM {$table} WHERE itemid=$itemid");
		$db->query("INSERT INTO {$DT_PRE}extend_focuson (userid,moduleid,itemid,typeid,title,star,addtime) VALUES ('$_userid','$mid','$itemid','$typeid','$r[title]','$star','$DT_TIME')");
		set_cookie('focuson_add_'.$mid.'_'.$itemid.'_'.$typeid.'_'.$_userid, 1, $DT_TIME + 86400);
		gl_dojson('ok',$gl_s_msg);
	break;
	default:
	break;
}

?>