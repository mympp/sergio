<?php  
require 'common.inc.php';
require DT_ROOT.'/module/member/member.class.php';
require DT_ROOT.'/file/config/redis.inc.php';
$localhost=$RedisServer[0]['host'];
$port=$RedisServer[0]['port'];
$prefix=$RedisServer[0]['prefix'];
function dpassword($password, $salt) {
	 // return md5((is_md5($password) ? md5($password) : md5(md5($password))).$salt);
	 return $password;
}
// @file_put_contents("info.txt",serialize($_GET));
//验证token
if(isset($_GET['type']) && !empty($_GET['type'])){
   $type=$_GET['type'];
}else{
	return false;
}
// @file_put_contents("info.txt",$type);
switch ($type) {
	case 'login':
		# code...
		if(isset($_GET['token']) && !empty($_GET['token'])){
			$redis = new Redis();
			$token=$_GET['token'];
		    @file_put_contents("info1.txt",$token);
			$res=$redis->connect($localhost,$port);
		    if($res){
		    	$username=$redis->get($prefix.$token);
		        //获取用户信息
		        $key=MD5('user_'.MD5($username));
		        $info=json_decode($redis->get("Redis_".$key),JSON_UNESCAPED_UNICODE);
		         @file_put_contents("info.txt",$info['username']);
		        if($info){
		        	$cookietime = isset($cookietime) ? 86400*30 : 0;
					$do = new member;
					$do->login($info['username'],$info['password'],$cookietime);
		        }
		    }
		}
		break;
	case 'logout':
		# code...
		$do = new member;
		$do->logout();
		break;
	default:
		# code...
		break;
}





//连接redis

// $user['userid']=2;
// $user['password']="111111";
// $user['username']="hhhj";

// $redis = new Redis();
// $res=$redis->connect('192.168.1.110',6379);
// if($res){
//    //echo "连接成功";
//    // echo $key=MD5('user_'.MD5("liuliuqiu"));
//    var_dump($redis->get("Redis_".$key));
// }else{
//    echo "连接失败";
// }


// $do->login($user['username'],$user['password'],$cookietime);
?>