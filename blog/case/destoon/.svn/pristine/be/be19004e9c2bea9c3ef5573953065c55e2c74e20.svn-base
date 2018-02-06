<?php 
/*
	亿顺网络手机版 作者一切归零 QQ:811142004
	http://www.e-action.top
*/
defined('IN_DESTOON') or exit('Access Denied');
require DT_ROOT.'/module/'.$module.'/common.inc.php';
require MD_ROOT.'/member.class.php';
require DT_ROOT.'/mobile/user/lang.inc.php';
$do = new member;

//$forward = $forward ? linkurl($forward, 1) : $CFG['url'];
if($EXT['gl_loginmsm']){
$session = new dsession(); 
if($job == 'sendscode') {
		$mobile = isset($mobile) ? trim($mobile) : '';
		if(!is_mobile($mobile)) gl_dojson($L['send_mobile_bad']);
		isset($_SESSION['mobile_send']) or $_SESSION['mobile_send'] = 0;
		if(!$do->mobile_exists($mobile)) gl_dojson($L['send_bad_mobile']);
		
		//判断多个手机号码
		$r = $db->get_one("SELECT COUNT(*) AS num FROM {$DT_PRE}member WHERE mobile='$mobile'");
	    $mobiles = $r['num'];
	    if($mobiles>1) gl_dojson($M['send_mobile_mores']);

		if($_SESSION['mobile_time'] && (($DT_TIME - $_SESSION['mobile_time']) < 180)) gl_dojson($L['send_too_quick']);
		if($_SESSION['mobile_send'] > 4) gl_dojson($L['send_too_many']);
		if(max_sms($mobile)) gl_dojson($L['send_too_many']);
		
		$mobilecode = random(6, '0123456789');
		$_SESSION['mobile_save'] = $mobile;
		$_SESSION['mobile_code'] = md5($mobile.'|'.$mobilecode);
		$_SESSION['mobile_time'] = $DT_TIME;
		$_SESSION['mobile_send'] = $_SESSION['mobile_send'] + 1;
		$content = lang('sms->sms_code', array($mobilecode, $MOD['auth_days']*10)).$DT['sms_sign'];
		if($EXT['gl_loginmsm_type']==1){
		require DT_ROOT.'/api/alidayu/sendsms.php';
		alidayu_sms($mobile, $mobilecode,3);
		}else{
        send_sms($mobile, $content);
		}
		gl_dojson('ok');
	}

if($job == 'phonelogin'){
		$mobile = isset($mobile) ? trim($mobile) : '';
		$cookietime = isset($cookietime) ? 86400*30 : 0;
		if(!$do->mobile_exists($mobile)) gl_dojson($L['send_bad_mobile']);	
		if(!is_mobile($mobile)) gl_dojson($L['send_mobile_bad']);
		
		//判断多个手机号码
		$r = $db->get_one("SELECT COUNT(*) AS num FROM {$DT_PRE}member WHERE mobile='$mobile'");
	    $mobiles = $r['num'];
	    if($mobiles>1) gl_dojson($M['send_mobile_mores']);
		if($DT_TIME - $_SESSION['mobile_time'] > 300) {
		   gl_dojson($M['captcha_expired']);
        }
		if(!preg_match("/[0-9]{6}/", $mobilecode) || $_SESSION['mobile_code'] != md5($mobile.'|'.$mobilecode)) gl_dojson($L['register_pass_mobilecode']);
		$r = $db->get_one("SELECT username,passport FROM {$DT_PRE}member WHERE mobile='$mobile'");
		if($r) {
		$username = $r['username'];
		$passport = $r['passport'];
	} else {
		gl_dojson($M['dt_wrong_location']);
		}
		$user = $do->login($username, $mobile, $cookietime, 1);
		if($user) {
			
			if($DT['login_log'] == 2) $do->login_log($username, $password, $user['passsalt'], 0);
			gl_dojson('ok');
	           } else {
		        if($DT['login_log'] == 2) $do->login_log($username, $password, $user['passsalt'], 0, $do->errmsg);
				gl_dojson($do->errmsg);
	           }
			   

}
}else{
gl_dojson('error');
}
?>