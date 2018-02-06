<?php  
require 'common.inc.php';
require DT_ROOT.'/module/member/member.class.php';
require DT_ROOT.'/file/config/redis.inc.php';
$localhost=$RedisServer[0]['host'];
$port=$RedisServer[0]['port'];
$prefix=$RedisServer[0]['prefix'];
$upgrade_data=$db->get_one("SELECT company,telephone,mail FROM {$DT_PRE}company WHERE userid='$_userid'");
$member_data=$db->get_one("SELECT truename,mobile,username FROM {$DT_PRE}member WHERE userid='$_userid'");
$company=$upgrade_data['company'];
$truename=$member_data['truename'];
$telephone=$upgrade_data['telephone'];
$mobile=$member_data['mobile'];
$email=$upgrade_data['mail'];
$ip=$_SERVER["REMOTE_ADDR"];
$status='2';
$username=$member_data['username'];
$totime=time()-86400*15;
$db->query("UPDATE {$DT_PRE}upgrade SET company='$company',truename='$truename',email='$email',telephone='$telephone',ip='$ip',mobile='$mobile',status='$status' WHERE username='$username' AND status='1' AND  amount >'0'  AND edittime>'$totime'");
message('申请已经提交到后台，请等待审核', DT_PATH, 5);
?>