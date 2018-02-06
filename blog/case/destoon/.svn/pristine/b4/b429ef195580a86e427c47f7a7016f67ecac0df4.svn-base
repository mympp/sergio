<?php 
require 'myuser.php';
//$EXT['gl_focuson_limit'] > -1 or dlayerm(lang('message->without_permission_and_upgrade'), 'goback');
require DT_ROOT.'/include/post.func.php';
$TYPE = get_type('focuson-'.$_userid);
require MD_ROOT.'/focuson.class.php';
$do = new focuson();
switch($action) {
	case 'add':
		if($EXT['gl_focuson_limit']) {
			$r = $db->get_one("SELECT COUNT(*) AS num FROM {$DT_PRE}focuson WHERE userid=$_userid");
			if($r['num'] >= $EXT['gl_focuson_limit']) dlayerm(lang($L['limit_add'], array($EXT['gl_focuson_limit'], $r['num'])), 'goback');
		}
		if($submit) {
			if($do->pass($post)) {
				$post['userid'] = $_userid;
				$post['addtime'] = $DT_TIME;
				$do->add($post);
				dmsg($L['op_add_success'], '?action=index');
			} else {
				mobmsg($do->errmsg);
			}
		} else {
			$title = isset($title) ? trim($title) : '';
			$url = isset($url) ? trim($url) : '';
			$typeid = 0;
			$type_select = type_select($TYPE, 0, 'post[typeid]', $L['default_type']);
			$head_name = $L['focuson_title_add'];
		}
	break;
	case 'edit':
	break;
	case 'delete':
		$itemid or mobmsg($L['focuson_msg_choose']);
		$do->itemid = $itemid;
		$r = $do->get_one();
		if(!$r || $r['userid'] != $_userid) mobmsg();
		$do->delete($itemid);
		dmsg($L['op_del_success'], $forward);
	break;
	default:
		$sfields = $L['focuson_sfields'];
		$dfields = array('title', 'title', 'url', 'note');
		isset($fields) && isset($dfields[$fields]) or $fields = 0;
		$typeid = isset($typeid) ? ($typeid === '' ? -1 : intval($typeid)) : -1;
		$fields_select = dselect($sfields, 'fields', '', $fields);
		$type_select = type_select($TYPE, 0, 'typeid', $L['default_type'], $typeid, '', $L['all_type']);
		$focuson_modules = explode(",",$EXT['focuson_module']);
		$focuson_menu = array();
        foreach($MODULE as $v) {
	    if(in_array($v['moduleid'], $focuson_modules)) $focuson_menu[] = $v;
}
		$mid = ($mid && in_array($mid, $focuson_modules))?$mid:$focuson_menu[0]['moduleid'];
		$condition = "userid=$_userid AND moduleid=$mid  AND typeid=0";
		$head_name = '我的关注';
		if($typeid==1) {
			$condition = "userid=$_userid AND moduleid=$mid  AND typeid=1";
			$head_name = '我点过的赞';
		}
		if($keyword) $condition .= " AND $dfields[$fields] LIKE '%$keyword%'";
		
		$lists = $do->get_list($condition);
		if($EXT['gl_focuson_limit']) {
			$r = $db->get_one("SELECT COUNT(*) AS num FROM {$DT_PRE}extend_focuson WHERE userid=$_userid AND typeid=0");
			$limit_used = $r['num'];
			$limit_free = $EXT['gl_focuson_limit'] > $limit_used ? $EXT['gl_focuson_limit'] - $limit_used : 0;
		}
		$action = 'index';
	break;
}
$foot = '';
include template('mfocuson', $glmobpath);
if(DT_CHARSET != 'UTF-8') toutf8();
?>