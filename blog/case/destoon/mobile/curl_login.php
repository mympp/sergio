<?php
$moduleid = 2;
require 'common.inc.php';
require DT_ROOT.'/module/member/common.inc.php';
require DT_ROOT.'/include/post.func.php';
//手机版登陆
global $DT_TIME, $DT_IP, $MOD, $MODULE, $L,$CFG;
$username='b7749768eb5b978057068dbb6f28e58c';
$url="http://www.destoon.cn/mobile/wx_login.php?username=".$username;
header("Location: $url"); 
?>