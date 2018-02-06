<?php
require '../../../common.inc.php';
require DT_ROOT.'/module/member/member.class.php';
require DT_ROOT.'/file/config/redis.inc.php';
$username=$_username;
header('content-type:application/json;charset=utf-8');
if(!$username) exit(json_encode(array('code'=>'3','message'=>'请登陆')));
if(!$changephone){
	$mobile_old=get_cookie('phone');
	if($mobile_old!=$mobile) exit(json_encode(array('code'=>'2','message'=>'不要更换手机号码')));
	$code_old=get_cookie('numb');
	if($code_old!=$code_yzm) exit(json_encode(array('code'=>'4','message'=>'验证码错误')));
}
$email_data=$db->get_one("SELECT email FROM {$DT_PRE}member WHERE username!='$username' AND email='$email'");
if($email_data) exit(json_encode(array('code'=>'0','message'=>'邮箱已被注册')));
//验证结束



//写表开始
$areaid=$select2;
$address=$content;
$mail=$email;
$telephone=$telephone;
$business_licence=$img_src;
$company=$company;
$db->query("UPDATE {$DT_PRE}company SET areaid='$areaid',address='$address',mail='$mail',telephone='$telephone',business_licence='$business_licence',company='$company' WHERE username='$username'");
//改变个人资料
$truename=$truename;
$email=$email;
$areaid=$areaid;
$mobile=$mobile;
$groupid=$groupid;
$db->query("UPDATE {$DT_PRE}member SET truename='$truename',email='$email',areaid='$areaid',mobile='$mobile' WHERE username='$username'");
//上传公司资料认证
//营业执照上传到destoon_validate表  company
$title=$company;
$thumb=$business_licence;
$addtime=time();
$editor=$username;    
$type='company';//公司认证
$username=$username;
$status='2';
$ip=$_SERVER["REMOTE_ADDR"];
$validate_old=$db->get_one("SELECT itemid FROM {$DT_PRE}validate WHERE username='$username' AND type='company'");
if($validate_old){
	$id=$validate_old['itemid'];
	$db->query("UPDATE {$DT_PRE}validate SET title='$title',thumb='$thumb',addtime='$addtime',editor='$editor',type='$type',username='$username',status='$status',ip='$ip' WHERE itemid='$id'");
}else{
	$db->query("INSERT INTO {$DT_PRE}validate (title,thumb,addtime,editor,type,username,status,ip) VALUES ('$title','$thumb', '$addtime','$editor','$type','$username','$status','$ip')");
}
//查看是否已付费
$totime=time()-86400*15;
$data=$db->get_one("SELECT * FROM {$DT_PRE}upgrade WHERE username='$username' AND amount > 0  AND status='1' AND edittime>'$totime'");
if($data){
  exit(json_encode(array('code'=>'1','fee'=>'1','message'=>'验证完成,已付钱')));
}else{
	//redis
	$localhost=$RedisServer[0]['host'];
	$port=$RedisServer[0]['port'];
	$prefix=$RedisServer[0]['prefix'];
	$groupid=$groupid;
	$redis = new Redis();
	$redis->connect($localhost,$port);
	$redis->set($prefix.$_username.groupid,$groupid);
	$ip=$_SERVER["REMOTE_ADDR"];
	$redis->set($prefix.$_username.ip,$ip);
	//redis结束
  	exit(json_encode(array('code'=>'1','fee'=>'0','message'=>'验证完成,未付钱')));
}