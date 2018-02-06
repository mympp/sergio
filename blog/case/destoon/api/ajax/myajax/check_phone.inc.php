<?php
require '../../../common.inc.php';
require DT_ROOT.'/file/config/redis.inc.php';
header('content-type:application/json;charset=utf-8');
$localhost=$RedisServer[0]['host'];
$port=$RedisServer[0]['port'];
$prefix=$RedisServer[0]['prefix'];
$redis = new Redis();
$res=$redis->connect($localhost,$port);
$code_phone=$redis->get($prefix.$_username);
if($code_phone>=$CODE_HZ){
    exit(json_encode(array('code'=>'4','message'=>'发送验证码次数超过'.$CODE_HZ.'次')));
}
$username=$_username;
if(!$username){
	exit(json_encode(array('code'=>'3','message'=>'用户不存在')));
}
$mobile_data=$db->get_one("SELECT mobile FROM {$DT_PRE}member WHERE username!='$username' AND mobile='$mobile'");
if($mobile_data){
	exit(json_encode(array('code'=>'0','message'=>'手机号码已被注册')));
}else{
	$numb=rand_string(4);
	$content="您的验证码：".$numb." 。验证码将在30分钟后失效。";
	$res=phone_verify($mobile,$content);
	if($res=='404'){
	//请求失败
		exit(json_encode(array('code'=>'2','message'=>'网络错误请稍后再试')));
	}


	//验证码次数自增
	$i=$redis->get($prefix.$_username);
    $i++;
	$redis->set($prefix.$_username,$i);
	//流水编号
	$m_mobilelog_msgid=mobile_numb();
	$m_mobilelog_msgid=$m_mobilelog_msgid;
	$m_mobilelog_mobile=$mobile;
	$m_mobilelog_authcode=$numb;
	$m_mobilelog_sendtime=time();
	$m_mobilelog_send_page=1;
	$m_mobilelog_terminal_type=2;
	$m_mobilelog_client_ip=ip2long($_SERVER["REMOTE_ADDR"]);
	$m_mobilelog_memo=$content;
	$res_str=simplexml_load_string($res);
	$res_arr=json_decode(json_encode($res_str),true);
	$m_mobilelog_returncode=$res_arr['0'];
	if(strlen($m_mobilelog_returncode)>=15){
		//成功写入表
		set_cookie('numb',$numb,$DT_TIME+1800);
		set_cookie('phone',$mobile);
		$m_mobilelog_returncode=$m_mobilelog_returncode;
		$m_mobilelog_status=0;

	}else{
		//失败写入表  
		$m_mobilelog_returncode=$m_mobilelog_returncode;
		$m_mobilelog_status=1;
		
	}
    $db->query("INSERT INTO {$QS_DB_NAME}.m_mobilelog (m_mobilelog_mobile,m_mobilelog_authcode,m_mobilelog_client_ip,m_mobilelog_sendtime,m_mobilelog_send_page,m_mobilelog_status,m_mobilelog_terminal_type,m_mobilelog_msgid,m_mobilelog_returncode,m_mobilelog_memo) VALUES ('$m_mobilelog_mobile','$m_mobilelog_authcode', '$m_mobilelog_client_ip','$m_mobilelog_sendtime','$m_mobilelog_send_page','$m_mobilelog_status','$m_mobilelog_terminal_type','$m_mobilelog_msgid','$m_mobilelog_returncode','$m_mobilelog_memo')");
	exit(json_encode(array('code'=>'1','message'=>'发送成功')));
}


    /**
     * 获取手机验证码
     * @param string or array $phone 手机号码
     * @param string $content 发送内容
     * @return string 
     */  
    function  phone_verify($phone,$content){
        if(is_array($phone)){
           $phone=implode(',',$phone);
        }
         $url = 'http://61.145.229.26:8086/MWGate/wmgw.asmx/MongateSendSubmit';
         $post = array(
                        'userId' => 'J92517',
                        'password' => '122375',
                        'pszMobis' => $phone,
                        'pszMsg' => $content,
                        'iMobiCount' => 2,
                        'pszSubPort' => '*',
                        'MsgId' => '29836372593265376'
                      );
        $result = https_request($url,$post);
        return $result;

    }  

    /*
     *短信流水编号
     */
    function mobile_numb(){
              $m_mobilelog_msgid='qs_mb';
              $m_mobilelog_msgid.=time();
              $m_mobilelog_msgid.=mt_rand(10000,99999);
              return $m_mobilelog_msgid;
    }
        /**
     * 产生随机字串，可用来自动生成密码 默认长度6位 字母和数字混合
     * @param string $len 长度
     * @return string
     */ 
    function rand_string($len=6) { 
        $str =''; 
        $chars= str_repeat('0123456789',3); 
        $chars  =  str_shuffle($chars); 
        $str   =  substr($chars,0,$len); 
        return $str; 
    } 


    /**
     * 发送HTTP请求方法，目前只支持CURL发送请求
     * @param  string $url    请求URL
     * @param  array  $params 请求参数
     * @param  string $method 请求方法GET/POST
     * @return array  $data   响应数据
     */   
function https_request($url, $params, $method = 'POST', $header = array(), $multi = false){
        $arr=$params;
        try {
            $opts = array(
                    CURLOPT_TIMEOUT        => 100,
                    CURLOPT_RETURNTRANSFER => 1,
                    CURLOPT_SSL_VERIFYPEER => false,
                    CURLOPT_SSL_VERIFYHOST => false,
                    CURLOPT_HTTPHEADER     => $header
            );
            /* 根据请求类型设置特定参数 */
            switch(strtoupper($method)){
                case 'GET':
                    $opts[CURLOPT_URL] = $params?$url . '?' . http_build_query($params):$url;
                    break;
                case 'POST':
                    //判断是否传输文件
                    $params = $multi ? $params : http_build_query($params);
                    $opts[CURLOPT_URL] = $url;
                    $opts[CURLOPT_POST] = 1;
                    $opts[CURLOPT_POSTFIELDS] = $params;
                    break;
                default:
                    throw new Exception('不支持的请求方式！');
            }
            
        
            /* 初始化并执行curl请求 */
            $ch = curl_init();
            curl_setopt_array($ch, $opts);
            $data  = curl_exec($ch);
            $error = curl_error($ch);
            curl_close($ch);
            if($error) {
                $str = '';
                if (is_array($arr) && !empty($arr)) {
                    foreach ($arr as $key => $value) {
                        $str .= $key.'='.$value.'&';
                    }
                    $str = substr($str, 0,-1);
                }
               // throw new Exception('请求发生错误'. $error." /r/n url:{$url} /r/n params:{$str} /r/n return:{$data}" );
               return $error;
            }
            return  $data;
        }catch (Exception $e){
            echo $e->getMessage();
        }
}

