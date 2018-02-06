<?php
/*
	[Destoon B2B System] Copyright (c) 2008-2015 www.destoon.com
	This is NOT a freeware, use is subject to license.txt
*/
require '../common.inc.php';
switch($action){
	case 'notarize':
	sleep(2);
	$r = $db->get_one("SELECT * FROM {$DT_PRE}finance_charge WHERE itemid=$itemid");
	if($r&&$r['status']=='3'){
		message($L['grade_msg_success'], DT_PATH, 5);
	}else{
		message('支付失败 , 如有疑问请与客服联系',DT_PATH,5);
	}
	exit;
	break;
	case 'cancel':
		$r = $db->get_one("SELECT * FROM {$DT_PRE}finance_charge WHERE itemid=$itemid");
		if($r){
			 $db->query("UPDATE {$DT_PRE}finance_charge SET status=1,note='用户取消支付' WHERE itemid=$itemid");
			 message('您取消了支付',DT_PATH,5);
		}
	break;

}
?>