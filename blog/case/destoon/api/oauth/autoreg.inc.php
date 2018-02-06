<?php
/*
	[Destoon B2B System] Copyright (c) 2008-2015 www.destoon.com
	This is NOT a freeware, use is subject to license.txt
*/
defined('IN_DESTOON') or exit('Access Denied');

if($EXT['gl_loginauto']){
function del_token($arr) {
	if($arr) {
		foreach($arr as $v) {
			$_SESSION[$v] = '';
		}
	}
}
if($success) {
	$U = $db->get_one("SELECT * FROM {$DT_PRE}oauth WHERE openid='$openid' AND site='$site'");
	$at_name = $U['username'];
	$auto_u = $db->get_one("SELECT username FROM {$DT_PRE}member WHERE username='$at_name'");
	if($at_name && $auto_u) {
	} else {
		
			include load('member.lang');
            require DT_ROOT.'/module/'.$module.'/common.inc.php';
            require DT_ROOT.'/include/post.func.php';
            require DT_ROOT.'/module/member/member.class.php';
            $nameqz = !empty($EXT['gl_loginauto_qz'])?$EXT['gl_loginauto_qz']:'qn';
			$post['regid'] = $EXT['gl_loginauto_id'];
            $post['username'] = $nameqz.$DT_TIME;
            $post['password'] = random(8, '0123456789');
            $post['email'] = $post['username'].'@qq.com';
            $post['mobile'] = '';
            $post['code'] = '';
            $post['truename'] = $nickname;
            $post['company'] = $nickname;
			if($EXT['gl_loginauto_id']==5) $post['company'] = $nickname.'(个人)';;
            $post['passport'] = $post['username'];
            $post['cpassword'] = $post['password'];
			$post['areaid'] = 1;

            $post['groupid'] = $need_check ? 4 : $post['regid'];
            $post['content'] = $post['introduce'] = $post['thumb'] = $post['banner'] = $post['catid'] = $post['catids'] = '';
            $post['edittime'] = 0;
			
		$do = new member;

		if($do->add($post)) {
			$note = timetodate($DT_TIME, 5).'|'.$site.'login|'.$L['register_note'];
			$db->query("UPDATE {$DT_PRE}member SET ".($verify_type == 'mobile' ? 'vmobile' : 'vemail')."=1 WHERE userid='$do->userid'");
			$db->query("UPDATE {$DT_PRE}member SET note='$note' WHERE userid='$do->userid'");
			$_SESSION['m_name'] = $post['username'];
			$_SESSION['m_pass'] = $post['password'];
			$username = $_SESSION['m_name'];
		}else{
			//dalert($do->errmsg);
			}
		
		$db->query("UPDATE {$DT_PRE}oauth SET username=$username WHERE openid='$openid'");
		$auto_u = $db->get_one("SELECT itemid FROM {$DT_PRE}oauth WHERE username='$username'");
		$U = array();
		$U['itemid'] = $auto_u['itemid'];
		$U['username'] = $username;
		$U['site'] = $site;
		$U['openid'] = $openid;
		$U['nickname'] = $nickname;
		$U['avatar'] = $avatar;
		$U['url'] = $url;
		$U['addtime'] = $DT_TIME;
		$U['logintime'] = $DT_TIME;
		$U['logintimes'] = 1;
		if($site=='wechat') {
		  $wopenid = $arr['openid'];
		  $r = $db->get_one("SELECT * FROM {$DT_PRE}weixin_user WHERE openid='$wopenid'");
		  if($r) {
			 $witmeid = $r['itemid'];
		     $db->query("UPDATE {$DT_PRE}weixin_user SET nickname='$nickname',headimgurl='$avatar',edittime='$DT_TIME' WHERE itemid=$witmeid");
			 }else{
		     $db->query("INSERT INTO {$DT_PRE}weixin_user (username,openid,nickname,sex,headimgurl,country,province,city,language,subscribe,addtime,edittime) VALUES ('$username','$openid','$nickname','$sex','$avatar','$country','$province','$city','$language','2','$DT_TIME','$DT_TIME')");
			 }
	       }
	}
	if($_userid) {
		del_token($DS);
		dheader($MODULE[2]['linkurl'].'oauth.php');
	} else {
		if($U['username']) {
			$do = new member;
			$user = $do->login($U['username'], '', 0, true);
			if($user) {
				
			$post['password'] = $_SESSION['m_pass'];
			if($MOD['welcome_sms'] && is_mobile($post['mobile'])) {
				$message = lang('sms->wel_reg', array($post['truename'], $DT['sitename'], $post['username'], $post['password']));
				$message = strip_sms($message);
				send_sms($post['mobile'], $message);
			}
			if($MOD['welcome_message'] || $MOD['welcome_email']) {
				$title = $L['register_msg_welcome'];
				$content = ob_template('welcome', 'mail');
				if($MOD['welcome_message']) send_message($username, $title, $content);
				if($MOD['welcome_email'] && $DT['mail_type'] != 'close') send_mail($post['email'], $title, $content);
			}

				$forward = get_cookie('forward_url');
				if($forward) set_cookie('forward_url', '');
				if(strpos($forward, 'api/oauth') !== false) $forward = '';
				$forward or $forward = $MODULE[2]['linkurl'];
				if($DT_TOUCH && strpos($forward, $EXT['mobile_url']) === false) $forward = $EXT['mobile_url'].'my.php';
				del_token($DS);
				$api_msg = '';
				if($MOD['passport'] == 'uc') {				
					$action = 'oauth';
					$passport = $user['passport'];
					include DT_ROOT.'/api/'.$MOD['passport'].'.inc.php';
				}
				if($api_msg) message($api_msg, $forward, -1);
				dheader($forward);
			} else {
				message($do->errmsg, $MODULE[2]['linkurl'].$DT['file_login']);
			}
		} else {
			set_cookie('bind', encrypt($U['itemid'].'|'.$site, DT_KEY.'BIND'));
			if($DT_TOUCH) {
				dheader($EXT['mobile_url'].'bind.php');
			} else {
				if(!get_cookie('oauth_site')) {
					set_cookie('oauth_user', $nickname);
					set_cookie('oauth_site', $site);
					dheader(DT_PATH);
				}				
				$moduleid = 2;
				$module = 'member';
				$MOD = cache_read('module-2.php');
				include template('bind', 'member');
			}
		}
	}
} else {
	del_token($DS);
	set_cookie('oauth_user', '');
	set_cookie('oauth_site', '');
	dheader($MODULE[2]['linkurl'].$DT['file_login'].'?error=oauth&step=userinfo&site='.$site);
}
}
?>