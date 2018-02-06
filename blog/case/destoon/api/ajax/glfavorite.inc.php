<?php
/*
	亿顺网络手机版 作者一切归零 QQ:811142004
	http://www.e-action.top
*/
defined('IN_DESTOON') or exit('Access Denied');
require DT_ROOT.'/module/'.$module.'/common.inc.php';
$MG['favorite_limit'] > -1 or gl_dojson(lang('message->without_permission_and_upgrade'), 'goback');
$TYPE = get_type('favorite-'.$_userid);
require MD_ROOT.'/favorite.class.php';
$do = new favorite();
$table = get_table($mid);
if(!$_userid) gl_dojson($M['no_login_in']);

switch($job) {
	case 'add':
		if($MG['favorite_limit']) {
			$r = $db->get_one("SELECT COUNT(*) AS num FROM {$DT_PRE}favorite WHERE userid=$_userid");
			if($r['num'] >= $MG['favorite_limit']) gl_dojson(lang($L['limit_add'], array($MG['favorite_limit'], $r['num'])), 'goback');
		}
		if(get_cookie('favorite_add_'.$mid.'_'.$itemid.'_'.$_userid)) gl_dojson($M['favorite_add_yes']);
		if($ok==1) {
			$r = $db->get_one("SELECT title,linkurl FROM {$table} WHERE itemid=$itemid");
			$db->query("INSERT INTO {$DT_PRE}favorite (userid,title,url,note,addtime) VALUES ('$_userid','$r[title]','$furl','','$DT_TIME')");
			set_cookie('favorite_add_'.$mid.'_'.$itemid.'_'.$_userid, 1, $DT_TIME + 86400);
			gl_dojson('ok');
		}
	break;
	default:
	break;
}

?>