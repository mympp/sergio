<?php
defined('IN_DESTOON') or exit('Access Denied');
require DT_ROOT.'/module/member/member.class.php';
require DT_ROOT.'/file/config/redis.inc.php';
$db->query("UPDATE {$DT_PRE}finance_charge SET status=3,money=$charge_money,receivetime='$DT_TIME',editor='$editor' WHERE itemid=$charge_orderid");
include load('member.lang');
require DT_ROOT.'/include/module.func.php';
$localhost=$RedisServer[0]['host'];
$port=$RedisServer[0]['port'];
$prefix=$RedisServer[0]['prefix'];
$redis = new Redis();
$redis->connect($localhost,$port);
$ip=$redis->get($prefix.$r['username'].ip);
$username=$r['username'];
$groupid=$redis->get($prefix.$r['username'].groupid);
$member_data=$db->get_one("SELECT * FROM {$DT_PRE}member WHERE username=$username");
$company_data=$db->get_one("SELECT * FROM {$DT_PRE}company WHERE username=$username");

money_add($r['username'], $r['amount']);
money_record($r['username'], $r['amount'], $PAY[$bank]['name'], 'system', $L['charge_online'], $L['charge_id'].':'.$charge_orderid);
money_add($r['username'], -$r['amount']);
money_record($r['username'], -$r['amount'], $L['in_site'], 'system', $L['trade_pay_order_title'], $L['trade_order_id'].$itemid);

$userid=$member_data['userid'];
$username=$username;
$groupid=$groupid;
$company=$member_data['company'];
$truename=$member_data['truename'];
$telephone=$company_data['telephone'];
$mobile=$member_data['mobile'];
$qq= $member_data['qq']?$member_data['qq']:'';
$content='会员认证';
$addtime=time();
$email=$company_data['mail'];
$ip=$ip;
$amount=$charge_money;
$note='会员认证';
$status='2';
$db->query("INSERT INTO {$DT_PRE}upgrade (userid,username,groupid,company,truename,telephone,mobile,qq,content,addtime,email,ip,amount,note,status) VALUES ('$userid','$username','$groupid','$company','$truename','$telephone','$mobile','$qq','$content','$addtime','$email','$ip','$amount','$note','$status')");
$redis->set($prefix.$r['username'].groupid,null);
$redis->set($prefix.$r['username'].ip,null);
?>