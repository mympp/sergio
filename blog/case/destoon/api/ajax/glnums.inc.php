<?php
/*
	亿顺网络手机版 作者一切归零 QQ:811142004
	http://www.e-action.top
*/
defined('IN_DESTOON') or exit('Access Denied');
require DT_ROOT.'/module/'.$module.'/common.inc.php';

$moduleid = isset($moduleid) ? intval($moduleid) : 5;
$itemid = isset($itemid) ? intval($itemid) : 5;
$table = get_table($moduleid);
$r = $db->get_one("SELECT hits FROM {$table} WHERE itemid=$itemid");
$hitsinit = floor($r['hits']/3) + strlen($itemid);
$hitsinit1 = floor($r['hits']/5) + strlen($itemid);

switch($job) {
	case 'glnums':
	 $focuson_modules = explode(",",$EXT['focuson_module']);
	 $glzan_module = explode(",",$EXT['glzan_module']);
	 if(in_array($moduleid, $focuson_modules) && $EXT['gl_focuson']) $focuson_check = 1;
	 if(in_array($moduleid, $glzan_module) && $EXT['gl_zan']) $zan_check = 1;
	 $mid = ($mid && in_array($mid, $focuson_modules))?$mid:$focuson_menu[0]['moduleid'];
     $focusenum = $db->get_one("SELECT COUNT(*) AS num FROM {$DT_PRE}extend_focuson WHERE itemid=$itemid and moduleid=$moduleid and typeid=0");
     $zannum = $db->get_one("SELECT COUNT(*) AS num FROM {$DT_PRE}extend_focuson WHERE itemid=$itemid and moduleid=$moduleid and typeid=1");
     $datalist = array('focusenum' => $focusenum['num'],'zannum' => $zannum['num'],'focuson_check' => $focuson_check,'zan_check' => $zan_check);
    exit(json_encode($datalist));
	break;
	default:
	break;
}
?>