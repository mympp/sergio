<?php 
require 'common.inc.php';
require 'config.inc.php';
require DT_ROOT.'/file/config/redis.inc.php';
$type=isset($_GET['type'])?$_GET['type']:"";
$web=$sso_config['sso_web'];
$localhost=$RedisServer[0]['host'];
$port=$RedisServer[0]['port'];
$prefix=$RedisServer[0]['prefix'];
switch ($type) {
	case 'login':
		# code...
		$username=get_cookie('username');
		if(!empty($username)){
			$redis = new Redis();
			$ticket=md5($username."quest_sso");
			set_cookie($ticket,md5(MD5($username.time().uniqid())));
			$res=$redis->connect($localhost,$port);
			if($res){
				$redis->set($prefix.get_cookie($ticket),$username);
			    $token=get_cookie($ticket);
			    // @file_put_contents("login.txt",$token);
			}
			header("Location:{$web}/Common/quest_sso?token={$token}");
		}
		break;
	case 'logout':
		# code...
		$username=get_cookie('username');
		if(!empty($username)){
			$redis = new Redis();
			$ticket=md5($username."quest_sso");
			set_cookie($ticket,"");
		}
		header("Location:{$web}/Common/quest_logout");
		break;
	default:
		# code...
		break;
}



?>