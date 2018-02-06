<?php
$moduleid = 2;
require '../../../common.inc.php';
require 'init.inc.php';
$success = 0;
$DS = array();
if($_SESSION['wx_access_token']) {
	$par = 'access_token='.$_SESSION['wx_access_token']
		 . '&openid='.$_SESSION['wx_openid'].'&lang=zh_CN';
	$rec = dcurl(WX_USERINFO_URL, $par);
	if(strpos($rec, 'nickname') !== false) {
		$success = 1;
		$arr = json_decode($rec, true);
		$openid = $arr['openid'];
		$nickname = convert($arr['nickname'], 'UTF-8', DT_CHARSET);
		$avatar = $arr['headimgurl'];
		$sex = $arr['sex'];
		$city = $arr['city'];
		$province = $arr['province'];
		$country = $arr['country'];
		$language = $arr['language'];
		$url = '';
		$DS = array('wx_access_token', 'wx_openid');
	}
}

require '../autoreg.inc.php';
?>