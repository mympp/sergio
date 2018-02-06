<?php
/*
	[Destoon B2B System] Copyright (c) 2008-2015 www.destoon.com
	This is NOT a freeware, use is subject to license.txt
*/
$moduleid = 2;
require 'common.inc.php';
require DT_ROOT.'/module/'.$module.'/common.inc.php';
!$_userid or dheader('my.php?reload='.$DT_TIME);
$MOD['enable_register'] or mobile_msg($L['register_msg_close']);
if($MOD['iptimeout']) {
	$timeout = $DT_TIME - $MOD['iptimeout']*3600;
	$r = $db->get_one("SELECT userid FROM {$DT_PRE}member WHERE regip='$DT_IP' AND regtime>'$timeout'");
	if($r) mobile_msg(lang($L['register_msg_ip'], array($MOD['iptimeout'])));
}
require DT_ROOT.'/include/post.func.php';
$session = new dsession();
$GROUP = cache_read('group.php');

if($MOD['question_register']) $MOD['captcha_register'] = 1;
if(!$DT['sms']) {
	$MOD['welcome_sms'] = 0;
	$MOD['mobilecode_register'] = 0;
}
if($DT['mail_type'] == 'close') {
	if($MOD['checkuser'] == 2) $MOD['checkuser'] = 1;
	$MOD['welcome_email'] = 0;
	$MOD['emailcode_register'] = 0;
}
$verify_type = '';
$need_check = 0;
if($MOD['mobilecode_register']) {
	$verify_type = 'mobile';
	$need_check = 1;
} else if($MOD['emailcode_register'] || $MOD['checkuser'] == 2) {
	$verify_type = 'email';
	$need_check = 1;
} else if($MOD['checkuser'] == 1) {
	$need_check = 1;
}

$m_user = get_cookie($promote_user);
$m_truename = get_user($user, 'username', 'truename');
if($m_truename && !$m_user){
set_cookie($promote_user, $user, $DT_TIME + 1800);
}

switch($action) {
	case 'send':
            $could_mobilecode = ($MOD['mobilecode_register'] && $DT['sms']);
            $action_sendscode = crypt_action('sendscode');
            if($could_mobilecode) {
			$post['mobile'] = isset($mobile) ? input_trim($mobile) : '';
			$t = $db->get_one("SELECT userid FROM {$DT_PRE}member WHERE mobile='$mobile'");
			!$t or exit('hasbeen');
			is_mobile($mobile) or exit('ko');
			isset($_SESSION['mobile_send']) or $_SESSION['mobile_send'] = 0;
			isset($_SESSION['mobile_time']) or $_SESSION['mobile_time'] = 0;
			if($_SESSION['mobile_time'] && $DT_TIME - $_SESSION['mobile_time'] < 180) exit('ko');
			if($_SESSION['mobile_send'] > 4) exit('max');
			if(max_sms($mobile)) exit('max');
			$mobilecode = random(6, '0123456789');
			$_SESSION['mobile'] = $mobile;
			$_SESSION['mobile_code'] = md5($mobile.'|'.$mobilecode.'|RM');
			$_SESSION['mobile_time'] = $DT_TIME;
			$_SESSION['mobile_send'] = $_SESSION['mobile_send'] + 1;
			$content = lang('sms->sms_code', array($mobilecode, $MOD['auth_days']*10)).$DT['sms_sign'];
			if($EXT['gl_loginmsm_type']==1){
			require DT_ROOT.'/api/alidayu/sendsms.php';
			alidayu_sms($mobile, $mobilecode);
			exit('ok');
			}else{
			send_sms($mobile, $content);
			exit('ok');
			}
		} else if($verify_type == 'email') {
			$t = $db->get_one("SELECT email,groupid FROM {$DT_PRE}member WHERE username='$username'");
			$t or exit('ko');
			$t['groupid'] == 4 or exit('ko');
			is_email($t['email']) or exit('ko');
			$email = $t['email'];
			isset($_SESSION['email_send']) or $_SESSION['email_send'] = 0;
			isset($_SESSION['email_time']) or $_SESSION['email_time'] = 0;
			if($_SESSION['email_time'] && $DT_TIME - $_SESSION['email_time'] < 60) exit('ko'.($DT_TIME - $_SESSION['email_time']));
			if($_SESSION['email_send'] > 9) exit('max');
			$emailcode = random(6, '0123456789');
			$_SESSION['email'] = $email;
			$_SESSION['email_code'] = md5($email.'|'.$emailcode.'|RE');
			$_SESSION['email_time'] = $DT_TIME;
			$_SESSION['email_send'] = $_SESSION['email_send'] + 1;
			$title = $L['register_msg_emailcode'];
			$content = ob_template('emailcode', 'mail');
			send_mail($email, $title, stripslashes($content));
			exit('ok');
		}
		exit('ko');
	break;
	case 'post':
		if($MOD['captcha_register']) {
			$captcha = isset($captcha) ? convert(input_trim($captcha), 'UTF-8', DT_CHARSET) : '';
			$msg = captcha($captcha, $MOD['captcha_register'], true);
			if($msg) exit('captcha');
		}
		$post = array();
		$post['regid'] = isset($regid) ? intval($regid) : 0;
		$post['username'] = isset($username) ? input_trim($username) : '';
		$post['password'] = isset($password) ? input_trim($password) : '';
		$post['email'] = isset($email) ? input_trim($email) : '';
		$post['email'] = $post['username'];
		$post['mobile'] = isset($mobile) ? input_trim($mobile) : '';
		$post['code'] = isset($code) ? input_trim($code) : '';
		$post['truename'] = isset($truename) ? convert(input_trim($truename), 'UTF-8', DT_CHARSET) : '';
		$post['company'] = isset($company) ? convert(input_trim($company), 'UTF-8', DT_CHARSET) : '';
		$post['passport'] = $post['username'];
		$post['cpassword'] = $post['password'];

		$RG = array();
		foreach($GROUP as $k=>$v) {
			if($k > 4 && $v['vip'] == 0) $RG[] = $k;
		}
		if(!in_array($post['regid'], $RG)) exit('group');
		if($MOD['passport'] == 'uc') {
			$passport = convert($post['passport'], DT_CHARSET, $MOD['uc_charset']);
			require DT_ROOT.'/api/uc.inc.php';
			list($uid, $rt_username, $rt_password, $rt_email) = uc_user_login($passport, $post['password']);
			if($uid == -2) exit('passport');
		}
		if($EXT['gl_jianhua_type']) $post['mobile'] = $post['username'];
		if($verify_type == 'mobile') {
			$_SESSION['mobile_code'] == md5($post['mobile'].'|'.$post['code'].'|RM') or exit('mobilecode');
		} else if($verify_type == 'email') {
			$_SESSION['email_code'] == md5($post['email'].'|'.$post['code'].'|RE') or exit('emailcode');
		}
		if($post['regid'] == 5) $post['company'] = $post['truename'] = $post['username'];
		$post['company'] = $post['username'];
		$post['groupid'] = $need_check ? 4 : $post['regid'];
		$post['groupid'] = $post['regid'];
		$post['passport'] = $post['truename'] = $post['username'];
		$post['content'] = $post['introduce'] = $post['thumb'] = $post['banner'] = $post['catid'] = $post['catids'] = '';
		$post['edittime'] = 0;
		$inviter = get_cookie('inviter');
		$post['inviter'] = $inviter ? decrypt($inviter, DT_KEY.'INVITER') : '';
		check_name($post['inviter']) or $post['inviter'] = '';
		require DT_ROOT.'/module/member/glmember.class.php';
		$do = new member;
		if($do->add($post)) {
			$note = timetodate($DT_TIME, 5).'|system|'.$L['register_note'];
			$db->query("UPDATE {$DT_PRE}member SET ".($verify_type == 'mobile' ? 'vmobile' : 'vemail')."=1 WHERE userid='$do->userid'");
			$db->query("UPDATE {$DT_PRE}member SET note='$note' WHERE userid='$do->userid'");
			$_SESSION['m_name'] = $post['username'];
			$_SESSION['m_pass'] = $post['password'];
		
		$username = $_SESSION['m_name'];
		$do = new member;
		$user = $do->login($username, '', 0, true);
		if($user) {
			$post = $user;
			$post['password'] = $_SESSION['m_pass'];
			if($MOD['welcome_sms'] && is_mobile($post['mobile'])) {
				$message = lang('sms->wel_reg', array($post['truename'], $DT['sitename'], $post['username'], $post['password']));
				$message = strip_sms($message);
				//send_sms($post['mobile'], $message);
			}
			if($MOD['welcome_message'] || $MOD['welcome_email']) {
				$title = $L['register_msg_welcome'];
				$content = ob_template('welcome', 'mail');
				if($MOD['welcome_message']) send_message($username, $title, $content);
				if($MOD['welcome_email'] && $DT['mail_type'] != 'close') send_mail($post['email'], $title, $content);
			}
			session_destroy();
		}
		exit('ok');
		} else {
			exit($do->errmsg);
			if(DT_CHARSET != 'UTF-8') toutf8();
			exit;
		}		
	break;
	default:
	break;
}
?>