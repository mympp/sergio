<?php
$moduleid = 2;
require 'common.inc.php';
require DT_ROOT.'/module/member/member.class.php';
require DT_ROOT.'/include/post.func.php';
//手机版登陆
global $DT_TIME, $DT_IP, $MOD, $MODULE, $L,$CFG;
$username=$_GET['username'];
$url=$_GET['action']?base64_decode($_GET['action']):$_SERVER['HTTP_HOST'];
$cookietime =$DT_TIME+86400*30;
$user_data=$db->get_one("SELECT * FROM {$DT_PRE}member WHERE username='$username'");
$auth = encrypt($user_data['userid'].'|'.$user_data['password'], DT_KEY.'USER');
set_cookie('auth', $auth, $cookietime);
set_cookie('username', $user_data['username'], $DT_TIME + 30*86400);
header("Location:$url");die;
?>