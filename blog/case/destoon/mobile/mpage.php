<?php 
require 'myuser.php';
if($_groupid > 5 && !$_edittime && $action == 'add') dheader('medit.php');
$MG['homepage'] && $MG['page_limit'] > -1 or dlayerm(lang('mobmsg->without_permission_and_upgrade'), 'goback');
require DT_ROOT.'/include/post.func.php';
require MD_ROOT.'/page.class.php';
$do = new page();
switch($action) {
	case 'add':
		if($MG['page_limit']) {
			$r = $db->get_one("SELECT COUNT(*) AS num FROM {$DT_PRE}page WHERE username='$_username' AND status>0");
			if($r['num'] >= $MG['page_limit']) dlayerm(lang($L['limit_add'], array($MG['page_limit'], $r['num'])), 'goback');
		}
		if($submit) {
			if($do->pass($post)) {
				$post['username'] = $_username;
				$post['level'] = 0;
				$need_check =  $MOD['page_check'] == 2 ? $MG['check'] : $MOD['page_check'];
				$post['status'] = get_status(3, $need_check);
				$do->add($post);
				dmsg($L['op_add_success'], '?status='.$post['status']);
			} else {
				mobmsg($do->errmsg);
			}
		} else {
			foreach($do->fields as $v) {
				$$v = '';
			}
			$content = '';
			$status = 5;
			$head_name = $L['page_title_add'];
		}
	break;
	case 'edit':
		$itemid or mobmsg();
		$do->itemid = $itemid;
		$r = $do->get_one();
		if(!$r || $r['username'] != $_username) mobmsg();
		if($submit) {
			if($do->pass($post)) {
				$post['username'] = $_username;
				$need_check =  $MOD['page_check'] == 2 ? $MG['check'] : $MOD['page_check'];
				$post['status'] = get_status($r['status'], $need_check);
				$post['level'] = $r['level'];
				$do->edit($post);
				dmsg($L['op_edit_success'], $forward);
			} else {
				mobmsg($do->errmsg);
			}
		} else {
			extract($r);
			$head_name = $L['page_title_edit'];
		}
	break;
	case 'delete':
		$itemid or mobmsg($L['page_msg_choose']);
		$itemids = is_array($itemid) ? $itemid : array($itemid);
		foreach($itemids as $itemid) {
			$do->itemid = $itemid;
			$item = $do->get_one();
			if(!$item || $item['username'] != $_username) mobmsg();
			$do->recycle($itemid);
		}
		dmsg($L['op_del_success'], $forward);
	break;
	default:
		$status = isset($status) ? intval($status) : 3;
		in_array($status, array(1, 2, 3)) or $status = 3;
		$condition = "username='$_username' AND status=$status";
		if($keyword) $condition .= " AND title LIKE '%$keyword%'";
		$lists = $do->get_list($condition);
		$head_name = $L['page_title'];
	break;
}
$nums = array();
$limit_used = 0;
for($i = 1; $i < 4; $i++) {
	$r = $db->get_one("SELECT COUNT(*) AS num FROM {$DT_PRE}page WHERE username='$_username' AND status=$i");
	$nums[$i] = $r['num'];
	$limit_used += $r['num'];
}
$limit_free = $MG['page_limit'] && $MG['page_limit'] > $limit_used ? $MG['page_limit'] - $limit_used : 0;
$foot = '';
include template('mpage', $glmobpath);
if(DT_CHARSET != 'UTF-8') toutf8();
?>