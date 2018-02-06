<?php
/*
	亿顺网络手机版 作者一切归零 QQ:811142004
	http://www.e-action.top
*/
defined('IN_DESTOON') or exit('Access Denied');
$MG['club_reply_limit'] > -1 or dlayerm(lang('message->without_permission_and_upgrade'), 'goback');
require MD_ROOT.'/reply.class.php';
$do = new reply();
$sql = $_userid ? "username='$_username'" : "ip='$DT_IP'";
$limit_used = $limit_free = $need_password = $need_captcha = $need_question = $fee_add = 0;
$today = $today_endtime - 86400;
if(in_array($action, array('', 'add')) && $MG['club_reply_limit']) {
	$r = $db->get_one("SELECT COUNT(*) AS num FROM {$table}_reply WHERE $sql AND status>1 AND addtime>$today");
	$limit_used = $r['num'];
	$limit_free = $MG['club_reply_limit'] > $limit_used ? $MG['club_reply_limit'] - $limit_used : 0;
}

switch($action) {
	case 'add':
	    $head_name = $M['add_mobile'].$L['my_manage_type_reply'];
		$back_link = $MYURL.'?action=info';
		check_group($_groupid, $MOD['group_reply']) or dlayerm(lang('message->without_permission_and_upgrade'), 'goback');
		$tid = isset($tid) ? intval($tid) : 0;
		$tid or dlayerm($L['my_choose_post'], $MOD['linkurl']);
		$T = $db->get_one("SELECT * FROM {$table} WHERE itemid=$tid");
		($T && $T['status'] == 3) or dlayerm($L['my_not_post']);
		$gid = $T['gid'];
		$GRP = get_group($gid);
		($GRP && $GRP['status'] == 3) or dlayerm($L['my_not_group']);
		if($MG['club_reply_limit'] && $limit_used >= $MG['club_reply_limit']) dlayerm(lang($L['day_limit'], array($MG['club_reply_limit'], $limit_used)), 'goback');
		if($GRP['reply_type'] && !is_fans($GRP)) {
			$action = 'reply';
			$head_title = lang('message->without_permission');
			exit(include template('nofans', $module));
		}
		$rid = isset($rid) ? intval($rid) : 0;
		$R = array();
		if($rid) {
			$R = $db->get_one("SELECT * FROM {$table}_reply WHERE itemid=$rid");
			($R && $R['status'] == 3 && $R['tid'] == $tid) or dlayerm($L['my_not_reply']);
			$str = $R['content'];
			if(strpos($str, '<hr class="club_break" />') !== false) {
				$str = substr($str, strpos($str, '<hr class="club_break" />'));
			} else if(strpos($str, '<hr class="club_break">') !== false) {
				$str = substr($str, strpos($str, '<hr class="club_break">'));
			} else if(strpos($str, '<hr class="club_break"/>') !== false) {
				$str = substr($str, strpos($str, '<hr class="club_break"/>'));
			}
			$str = get_intro($str, 500);
			$R['quote'] = '<div class="club_quote"><div><a href="'.$MOD['linkurl'].'goto.php?itemid='.$rid.'"><p>'.$R['passport'].$L['my_reply_at'].timetodate($R['addtime'], 5).'</p>'.$str.'</a></div></div><hr class="club_break" />';
		}
		$need_captcha = $MOD['captcha_reply'] == 2 ? $MG['captcha'] : $MOD['captcha_reply'];
		$need_question = $MOD['question_reply'] == 2 ? $MG['question'] : $MOD['question_reply'];
		if(isset($_POST['ok'])) {
			foreach($post as $k=>$v) {
				$post[$k] = convert(input_trim($v), 'UTF-8', DT_CHARSET);
			}
			$msg = captcha($captcha, $need_captcha, true);
			//if($msg) dalert($msg);
			$msg = question($answer, $need_question, true);
			//if($msg) dalert($msg);
			if($do->pass($post)) {
				$post['tid'] = $tid;
				$post['gid'] = $gid;
				if($R) $post['content'] = addslashes($R['quote']).$post['content'];
				$need_check =  $MOD['check_reply'] == 2 ? $MG['check'] : $MOD['check_reply'];
				$post['status'] = get_status(3, $need_check);
				$post['username'] = $_username;
				$post['passport'] = $_passport;
				$do->add($post);
				$js = '';
				if($post['status'] == 3) {
					$forward = $MOD['linkurl'].'goto.php?itemid='.$do->itemid;
					$msg = '';
				} else {
					if($_userid) {
						set_cookie('dmsg', $msg);
						$forward = $MODULE[2]['linkurl'].$DT['file_my'].'?mid='.$mid.'&job='.$job.'&status='.$post['status'];
						$msg = '';
					} else {
						$forward = $MOD['linkurl'].$T['linkurl'];
						$msg = $L['success_check'];
					}
				}
				$js .= 'window.onload=function(){parent.window.location="'.$forward.'";}';
				dtexit('ok','?mid='.$mid.'&status='.$post['status'].'&job='.$job.'',''.$msg.'');
				dtexit($msg, '', $js);
			} else {
				glerror($do->errmsg, '', ($need_captcha ? reload_captcha() : '').($need_question ? reload_question() : ''));
			}
		} else {
			$_tid = $tid;
			foreach($do->fields as $v) {
				$$v = '';
			}
			$tid = $_tid;
			$content = '';
			$item = array();
		}
	break;
	case 'edit':
	    $head_name = $M['edit_mobile'].$L['my_manage_type_reply'];
		$back_link = $MYURL.'?action=info';
		$itemid or dlayerm();
		$do->itemid = $itemid;
		$item = $do->get_one();
		if(!$item || $item['username'] != $_username) dlayerm();
		$tid = $item['tid'];
		$T = $db->get_one("SELECT * FROM {$table} WHERE itemid=$tid");

		if($MG['edit_limit'] < 0) dlayerm($L['edit_refuse']);
		if($MG['edit_limit'] && $DT_TIME - $item['addtime'] > $MG['edit_limit']*86400) dlayerm(lang($L['edit_limit'], array($MG['edit_limit'])));

		if(isset($_POST['ok'])) {
			foreach($post as $k=>$v) {
				$post[$k] = convert(input_trim($v), 'UTF-8', DT_CHARSET);
			}
			
			if(strpos($post['content'], '<hr class="club_break">') !== false) {
				$post['content'] = str_replace('<hr class="club_break">','<hr class="club_break" />',$post['content']);
			}
			if($do->pass($post)) {
				$need_check =  $MOD['check_add'] == 2 ? $MG['check'] : $MOD['check_add'];
				$post['status'] = get_status($item['status'], $need_check);			
				$do->edit($post);
				set_cookie('dmsg', $L['success_edit']);
				dtexit('ok','?mid='.$mid.'&status='.$post['status'].'&job='.$job.'',''.$msg.'');
				dtexit('', '', 'parent.window.location="'.$forward.'"');
			} else {
				dtexit($do->errmsg);
			}
		} else {
			extract($item);
		}
	break;
	case 'delete':
	    $MG['delete'] or dtexit($M['delect_noyes']);
		$itemid or dtexit('no itemid');
		$itemids = is_array($itemid) ? $itemid : array($itemid);
		foreach($itemids as $itemid) {
			$do->itemid = $itemid;
			$item = $db->get_one("SELECT username FROM {$table}_reply WHERE itemid=$itemid");
			if(!$item || $item['username'] != $_username) dtexit('no itemid');
			$do->recycle($itemid);
		}
		dtexit('ok');
		dmsg($L['success_delete'], $forward);
	break;
	default:
	    $head_name = $L['my_reply_title'];
		$back_link = $MYURL.'?action=info';
		$status = isset($status) ? intval($status) : 3;
		in_array($status, array(1, 2, 3)) or $status = 3;
		$condition = "username='$_username'";
		$condition .= " AND status=$status";
		if($keyword) $condition .= " AND content LIKE '%$keyword%'";
		$timetype = strpos($MOD['order'], 'edit') === false ? 'add' : '';
		$lists = $do->get_list($condition, $MOD['order']);
		foreach($lists as $k=>$v) {
			$lists[$k]['mycat'] = $v['mycatid'];
			if(strpos($lists[$k]['content'], '<hr class="club_break">') !== false) $lists[$k]['content'] = substr($lists[$k]['content'], strpos($lists[$k]['content'], '<hr class="club_break">'));
			$lists[$k]['title'] = get_intro($lists[$k]['content'], 50);
		}

	break;
}
if($_userid) {
	$nums = array();
	for($i = 1; $i < 4; $i++) {
		$r = $db->get_one("SELECT COUNT(*) AS num FROM {$table}_reply WHERE username='$_username' AND status=$i");
		$nums[$i] = $r['num'];
	}
}
$head_title = $L['my_reply_title'];
?>