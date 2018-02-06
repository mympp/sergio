<?php
/*
	[Destoon B2B System] Copyright (c) 2016-2016 www.e-action.top
	This is NOT a freeware, use is subject to license.txt
*/
require 'myuser.php';
if($EXT['comment_api']){
	$_iscomment = 0;
}else{
    $_iscomment = 1;
}
        $db->halt = 0;
		$today = strtotime(timetodate($DT_TIME, 3).' 00:00:00');
        $mobile_modules = array('member', 'sell', 'buy', 'quote', 'company', 'exhibit', 'article', 'info', 'job', 'know', 'brand', 'mall', 'group', 'video', 'photo', 'club');
		foreach($MODULE as $m) {

			//if(in_array($m['moduleid'], array(5,6,10,16,21,12))){//仅加载指定id的模块 可自行添加修改模块id
			//if($m['moduleid'] < 5 || $m['islink']) continue;
			if(in_array($m['module'], $mobile_modules) && $m['module'] != 'member' && $m['ismenu']){
			$moduleid = $m['moduleid'];
			$table = get_table($m['moduleid']);
			//ALL
			$numall = $db->count($table, '1',1800);
			//PUB
			$num3 = $db->count($table, "status=3 AND username='$_username'",1800);
			//CHECK
			$num2 = $db->count($table, "status=2 AND username='$_username'",1800);
			//NEW
			$numtoday = $db->count($table, "addtime>$today AND username='$_username'",1800);
			if($_iscomment==1){
			$comm3 = $db->count($DT_PRE.'comment', "item_mid='$moduleid' and  status=3 AND username='$_username'",1800);
			$comm2 = $db->count($DT_PRE.'comment', "item_mid='$moduleid' and  status=2 AND username='$_username'",1800);
			$commtoday = $db->count($DT_PRE.'comment', "item_mid='$moduleid' and addtime>$today AND username='$_username',1800");
			}

			if($m['moduleid'] == 9) {
				$table = $DT_PRE.'resume';
				//ALL
				$numall = $db->count($table, '1',1800);
				//PUB
				$num3 = $db->count($table, "status=3",1800);
				//CHECK
				$num2 = $db->count($table, "status=2",1800);
				//NEW
				$numtoday = $db->count($table, "addtime>$today",1800);
			}
			$module_name .= $m['name'].',';
			$num_status2 .= $num2.',';
			$num_status3 .= $num3.',';
			$num_today .= $numtoday.',';
			$comm_status2 .= $comm2.',';
			$comm_status3 .= $comm3.',';
			$comm_today .= $commtoday.',';
		}
	}
$message1_data = $db->count($DT_PRE.'message', "typeid=1 and touser='$_username'",1800);//询盘
$message2_data = $db->count($DT_PRE.'message', "typeid=2 and fromuser='$_username'",1800);//报价
//$message1_data = explode(",",substr($message1, 0, -1));
//$message2_data = explode(",",substr($message2, 0, -1));

$name_data = explode(",",substr($module_name, 0, -1)); //生成数组
$num2_data = explode(",",substr($num_status2, 0, -1));
$num3_data = explode(",",substr($num_status3, 0, -1));
$num_today_data = explode(",",substr($num_today, 0, -1));

$comm2_data = explode(",",substr($comm_status2, 0, -1));
$comm3_data = explode(",",substr($comm_status3, 0, -1));
$comm_today_data = explode(",",substr($comm_today, 0, -1));
//var_dump($comm_today_data);
$head_name = '我的数据图表';
$foot = '';
include template('mcount', 'mobile');
if(DT_CHARSET != 'UTF-8') toutf8();
?>