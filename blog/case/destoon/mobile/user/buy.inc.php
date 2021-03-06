<?php 
/*
	亿顺网络手机版 作者一切归零 QQ:811142004
	http://www.e-action.top
*/
defined('IN_DESTOON') or exit('Access Denied');
require DT_ROOT.'/module/'.$module.'/common.inc.php';
//mobile_login();
$MG['buy_limit'] > -1 or dlayerm(lang('message->without_permission_and_upgrade'),'goback');
require DT_ROOT.'/include/post.func.php';
include load($module.'.lang');
include load('my.lang');
require MD_ROOT.'/buy.class.php';
$do = new buy($moduleid);
if(in_array($action, array('add', 'edit'))) {
	$FD = cache_read('fields-'.substr($table, strlen($DT_PRE)).'.php');
	if($FD) require DT_ROOT.'/include/fields.func.php';
	isset($post_fields) or $post_fields = array();
	$CP = $MOD['cat_property'];
	if($CP) require DT_ROOT.'/include/property.func.php';
	isset($post_ppt) or $post_ppt = array();
}
$sql = $_userid ? "username='$_username'" : "ip='$DT_IP'";
$limit_used = $limit_free = $need_password = $need_captcha = $need_question = $fee_add = 0;
if(in_array($action, array('', 'add'))) {
	$r = $db->get_one("SELECT COUNT(*) AS num FROM {$table} WHERE $sql AND status>1");
	$limit_used = $r['num'];
	$limit_free = $MG['buy_limit'] > $limit_used ? $MG['buy_limit'] - $limit_used : 0;
}
if(check_group($_groupid, $MOD['group_refresh'])) $MOD['credit_refresh'] = 0;
switch($action) {
	case 'add':
	    $head_name = $MOD['name'].$M['add_mobile'];
		if($MG['buy_limit'] && $limit_used >= $MG['buy_limit']) dlayerm(lang($L['info_limit'], array($MG[$MOD['module'].'_limit'], $limit_used)),'goback');
		if($MG['day_limit']) {
			$today = $today_endtime - 86400;
			$r = $db->get_one("SELECT COUNT(*) AS num FROM {$table} WHERE $sql AND addtime>$today");
			if($r && $r['num'] >= $MG['day_limit']) dlayerm(lang($L['day_limit'], array($MG['day_limit'])),'goback');
		}

		if($MG['buy_free_limit'] >= 0) {
			$fee_add = ($MOD['fee_add'] && (!$MOD['fee_mode'] || !$MG['fee_mode']) && $limit_used >= $MG['buy_free_limit'] && $_userid) ? dround($MOD['fee_add']) : 0;
		} else {
			$fee_add = 0;
		}
		$fee_currency = $MOD['fee_currency'];
		$fee_unit = $fee_currency == 'money' ? $DT['money_unit'] : $DT['credit_unit'];
		$need_password = $fee_add && $fee_currency == 'money';
		$need_captcha = $MOD['captcha_add'] == 2 ? $MG['captcha'] : $MOD['captcha_add'];
		$need_question = $MOD['question_add'] == 2 ? $MG['question'] : $MOD['question_add'];
		$could_color = check_group($_groupid, $MOD['group_color']) && $MOD['credit_color'] && $_userid;

		if(isset($_POST['ok'])) {
		$thumbs= explode(",", $thumbs);
         //foreach ($thumbs as $k=>$v) {
			 //$thumb[] = $v;
         //}
		 $post['thumb'] = $thumbs[0];
		 $post['thumb1'] = $thumbs[1];
		 $post['thumb2'] = $thumbs[2];
		   //dtexit($thumbs[1]);
			foreach($post as $k=>$v) {
				$post[$k] = convert(input_trim($v), 'UTF-8', DT_CHARSET);
			}
			if($fee_add && $fee_add > ($fee_currency == 'money' ? $_money : $_credit)) dtexit($L['balance_lack']);
			if($need_password && !is_payword($_username, $password)) dtexit($L['error_payword']);

			if(!$_userid) {
				if(strlen($post['company']) < 10) dtexit($L['type_company']);
				if($AREA) {
					if(!isset($AREA[$post['areaid']])) dtexit($L['type_area']);
				} else {
					if(!$post['areaid']) dtexit($L['type_area']);
				}
				if(strlen($post['truename']) < 4) dtexit($L['type_true']);
				if(strlen($post['mobile']) < 7) dtexit($L['type_mobile']);
			}

			if($MG['add_limit']) {
				$last = $db->get_one("SELECT addtime FROM {$table} WHERE $sql ORDER BY itemid DESC");
				if($last && $DT_TIME - $last['addtime'] < $MG['add_limit']) dtexit(lang($L['add_limit']));
			}
			$msg = captcha($captcha, $need_captcha, true);
			//if($msg) dtexit($msg);
			$msg = question($answer, $need_question, true);
			//if($msg) dtexit($msg);

			if($do->pass($post)) {
				$CAT = get_cat($post['catid']);
				if(!$CAT || !check_group($_groupid, $CAT['group_add'])) dtexit(lang($L['group_add']));
				$post['addtime'] = $post['level'] = $post['fee'] = 0;
				$post['style'] = $post['template'] = $post['note'] = $post['filepath'] = '';
				if(!$IMVIP && $MG['uploadpt']) $post['thumb1'] = $post['thumb2'] = '';
				$need_check =  $MOD['check_add'] == 2 ? $MG['check'] : $MOD['check_add'];
				$post['status'] = get_status(3, $need_check);
				$post['hits'] = 0;
				$post['username'] = $_username;
				
				if($could_color && $color && $_credit > $MOD['credit_color']) {
					$post['style'] = $color;
					credit_add($_username, -$MOD['credit_color']);
					credit_record($_username, -$MOD['credit_color'], 'system', $L['title_color'], '['.$MOD['name'].']'.$post['title']);
				}

				if($FD) mfields_check($post_fields);
				if($CP) mproperty_check($post_ppt);
				$do->add($post);
				if($FD) fields_update($post_fields, $table, $do->itemid);
				if($CP) property_update($post_ppt, $moduleid, $post['catid'], $do->itemid);
				if($MOD['show_html'] && $post['status'] > 2) $do->tohtml($do->itemid);

				if($fee_add) {
					if($fee_currency == 'money') {
						money_add($_username, -$fee_add);
						money_record($_username, -$fee_add, $L['in_site'], 'system', lang($L['credit_record_add'], array($MOD['name'])), 'ID:'.$do->itemid);
					} else {
						credit_add($_username, -$fee_add);
						credit_record($_username, -$fee_add, 'system', lang($L['credit_record_add'], array($MOD['name'])), 'ID:'.$do->itemid);
					}
				}
				
				$msg = $post['status'] == 2 ? $L['success_check'] : $L['success_add'];
				$js = '';
				if(isset($post['sync_sina']) && $post['sync_sina']) $js .= sync_weibo('sina', $moduleid, $do->itemid);
				if(isset($post['sync_qq']) && $post['sync_qq']) $js .= sync_weibo('qq', $moduleid, $do->itemid);
				if($_userid) {
					//set_cookie('dmsg', $msg);
					$forward = $MODULE[2]['linkurl'].$DT['file_my'].'?mid='.$mid.'&status='.$post['status'];
					dtexit('ok','?mid='.$mid.'&status='.$post['status'].'',$msg);
					dtexit('', '', 'parent.window.location="'.$forward.'";');
				} else {
					dtexit('ok','?mid='.$mid.'&status='.$post['status'].'',$msg);
					dtexit($msg, '', 'parent.window.location=parent.window.location;');
				}
			} else {
				dtexit($do->errmsg);
			}
		} else {
			if($itemid) {
				$MG['copy'] && $_userid or dtexit(lang('message->without_permission_and_upgrade'));

				$do->itemid = $itemid;
				$item = $do->get_one();
				if(!$item || $item['username'] != $_username) message();
				extract($item);
				$thumb = $thumb1 = $thumb2 = '';
				$totime = $totime > $DT_TIME ? timetodate($totime, 3) : '';
			} else {
				foreach($do->fields as $v) {
					$$v = '';
				}
				$content = '';
				$catid = 0;
				$totime = '';
				$typeid = 0;
			}
			$item = array();
		}
	break;
	case 'edit':
	    $head_name = $MOD['name'].$M['edit_mobile'];
		$back_link = $MYURL.'?action=info';
		$itemid or dlayerm($L['select_info'],'goback');
		$do->itemid = $itemid;
		$item = $do->get_one();
		if($item['thumb']){
		$bigimg = str_replace('.thumb.jpg', '', $item['thumb']);
		}
		if(!$item || $item['username'] != $_username) dlayerm($L['select_info'],'goback');

		if($MG['edit_limit'] < 0) dlayerm($L['edit_refuse']);
		if($MG['edit_limit'] && $DT_TIME - $item['addtime'] > $MG['edit_limit']*86400) dlayerm(lang($L['edit_limit'], array($MG['edit_limit'])));

		if(isset($_POST['ok'])) {
			
		 $thumbs= explode(",", $thumbs);
		 $post['thumb'] = $thumbs[0];
		 $post['thumb1'] = $thumbs[1];
		 $post['thumb2'] = $thumbs[2];

			foreach($post as $k=>$v) {
				$post[$k] = convert(input_trim($v), 'UTF-8', DT_CHARSET);
			}
			if($do->pass($post)) {
				$CAT = get_cat($post['catid']);
				if(!$CAT || !check_group($_groupid, $CAT['group_add'])) dtexit(lang($L['group_add'], array($CAT['catname'])));
				$post['addtime'] = timetodate($item['addtime']);
				$post['level'] = $item['level'];
				$post['fee'] = $item['fee'];
				$post['style'] = addslashes($item['style']);
				$post['template'] = addslashes($item['template']);
				$post['filepath'] = addslashes($item['filepath']);
				$post['note'] = addslashes($item['note']);
				if(!$IMVIP && $MG['uploadpt']) {
					$post['thumb1'] = $item['thumb1'];
					$post['thumb2'] = $item['thumb2'];
				}
				$need_check =  $MOD['check_add'] == 2 ? $MG['check'] : $MOD['check_add'];
				$post['status'] = get_status($item['status'], $need_check);
				$post['hits'] = $item['hits'];
				$post['username'] = $_username;
				if($FD) mfields_check($post_fields);
				if($CP) mproperty_check($post_ppt);
				if($FD) fields_update($post_fields, $table, $do->itemid);
				if($CP) property_update($post_ppt, $moduleid, $post['catid'], $do->itemid);
				$do->edit($post);
				//set_cookie('dmsg', $L['success_edit']);
                dtexit('ok','?mid='.$mid.'&status='.$post['status'].'');
				dtexit('', '', 'parent.window.location="'.$forward.'"');
			} else {
				dtexit($do->errmsg);
			}
		} else {
			extract($item);
			$totime = $totime ? timetodate($totime, 3) : '';
			$theyear = timetodate($item['totime'], 1);
		}
	break;
	case 'delete':
	    $MG['delete'] or dtexit($M['delect_noyes']);
		$itemid or dtexit('no itemid');
		$itemids = is_array($itemid) ? $itemid : array($itemid);
		foreach($itemids as $itemid) {
			$do->itemid = $itemid;
			$item = $db->get_one("SELECT username FROM {$table} WHERE itemid=$itemid");
			if(!$item || $item['username'] != $_username) dtexit('no itemid');
			$do->recycle($itemid);
		}
		dtexit('ok');
		dmsg($L['success_delete'], $forward);
	break;
	case 'refresh':
		$MG['refresh_limit'] > -1 or dtexit(lang('message->without_permission_and_upgrade'), 'goback');
		$do->_update($_username);
		$itemid or dtexit($L['select_info']);
		$itemids = $itemid;
		$s = $f = 0;
		foreach($itemids as $itemid) {
			$do->itemid = $itemid;
			$item = $do->get_one();
			$could_refresh = $item && $item['username'] == $_username;
			if($could_refresh && $MG['refresh_limit'] && $DT_TIME - $item['edittime'] < $MG['refresh_limit']) $could_refresh = false;
			if($could_refresh && $MOD['credit_refresh'] && $MOD['credit_refresh'] > $_credit) $could_refresh = false;
			if($could_refresh) {
				$do->refresh($itemid);
				$s++;
				if($MOD['credit_refresh']) $_credit = $_credit - $MOD['credit_refresh'];
			} else {
				$f++;
			}			
		}
		if($MOD['credit_refresh'] && $s) {
			$credit = $s*$MOD['credit_refresh'];
			credit_add($_username, -$credit);
			credit_record($_username, -$credit, 'system', lang($L['credit_record_refresh'], array($MOD['name'])), lang($L['refresh_total'], array($s)));
		}
		$msg = lang($L['refresh_success'], array($s));
		if($f) $msg = $msg.' '.lang($L['refresh_fail'], array($f));
		dtexit('ok');
		dmsg($msg, $forward);
	break;
	default:
	    $head_name = $MOD['name'].$M['manage_mobile'];
		$back_link = $MYURL.'?action=info';
		$status = isset($status) ? intval($status) : 3;
		in_array($status, array(1, 2, 3, 4)) or $status = 3;
		$condition = "username='$_username'";
		$condition .= " AND status=$status";
		$typeid = isset($typeid) ? ($typeid === '' ? -1 : intval($typeid)) : -1;
		if($keyword) $condition .= " AND keyword LIKE '%$keyword%'";
		if($catid) $condition .= ($CATEGORY[$catid]['child']) ? " AND catid IN (".$CATEGORY[$catid]['arrchildid'].")" : " AND catid=$catid";
		if($typeid >=0 ) $condition .= " AND typeid=$typeid";
		$timetype = strpos($MOD['order'], 'add') !== false ? 'add' : '';
		$lists = $do->get_list($condition, $MOD['order']);
		foreach($lists as $k=>$v) {
			$lists[$k]['mycat'] = $v['mycatid'] && isset($MTYPE[$v['mycatid']]) ? set_style($MTYPE[$v['mycatid']]['typename'], $MTYPE[$v['mycatid']]['style']) : $L['type_default'];
		}
	break;
}
$head_title = lang($L['module_manage'], array($MOD['name']));
if($_userid) {
	$nums = array();
	for($i = 1; $i < 5; $i++) {
		$r = $db->get_one("SELECT COUNT(*) AS num FROM {$table} WHERE username='$_username' AND status=$i");
		$nums[$i] = $r['num'];
	}
}
include template('my_'.$module, 'mobile');
if(DT_CHARSET != 'UTF-8') toutf8();
?>