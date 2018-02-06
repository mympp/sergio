<?php
/*
	亿顺网络手机版 作者一切归零 QQ:811142004
	http://www.e-action.top
*/
require 'common.inc.php';
require 'user/extend.func.php';
require 'user/lang.inc.php';

//微信jssdk开始
if($DT_MOB[browser]=='weixin' && $EXT['gl_wxjssdk']) {
	require DT_ROOT.'/api/weixin/glinit.inc.php';
}
//微信jssdk结束

$mid = isset($mid) ? intval($mid) : 0;
/**
 * 二次开发
 * 用户是否认证，是否完善资料
 */
//用户是否认证
$company_data = $db->get_one("SELECT totime FROM {$DT_PRE}company WHERE userid=$_userid");
$sell_5_data = $db->get_one("SELECT * FROM {$DT_PRE}sell_5 WHERE username='$_username' limit 1");
$yifabu  = 0;
$isCount = 0;
if ($company_data['totime']>=time()) {

	if ($sell_5_data) {
		$yifabu  = 1;
	}
	
	$isVipState = 1;
}else{
	
	
	$upgrade_data = $db->get_one("SELECT * FROM {$DT_PRE}upgrade WHERE userid=$_userid  AND status='2'");
    //是否发布过供应
    
    if ($sell_5_data) {
    	$isCount = 1;
    	$yifabu  = 1;
    }
	if ($upgrade_data){
		$isVipState = 1;
	}else{
	     //是否为7天会员体验
		$member_data = $db->get_one("SELECT regtime FROM {$DT_PRE}member WHERE userid=$_userid");
		if ($member_data['regtime']+60*60*24*7<=time()){
			$isVipState = 0; //未认证
			$isCount = 1;
		}else{
			$isVipState = 1;//体验用户 
		}
		
	}
	
}
//用户是否完善资料
 $validate_old = $db->get_one("SELECT * FROM {$DT_PRE}validate WHERE username='$_username' AND (type='company' or type='truename')");

 if ($validate_old) {
 	$isMessage = 1;
 }else{
 	$isMessage = 0;
 	header("Location:{$wx_host}CrmUser/add_datum");
 }

//二次开发结束

if($mid) {
	include DT_ROOT.'/module/member/admin.inc.php';

    //判断游客发布权限
	$moduleids = explode(",",$MG['moduleids']);
     if($action== 'add' && !$_userid){
	  if(in_array($mid, $moduleids)){
       }else{
       mobile_login();
       }
    }
	$backpath = 1;
    if($_userid && !$EXT['gl_fb_back']) $backpath = 0;
	$group_editor = $MG['editor'];
	in_array($group_editor, array('Default', 'Destoon', 'Simple', 'Basic')) or $group_editor = 'Destoon';
	$MST = cache_read('module-2.php');
	isset($admin_user) or $admin_user = false;
	$show_oauth = $MST['oauth'];
	$show_menu = $MST['show_menu'] ? true : false;
	$viewport = 0;
	if($_userid) $m_user = userinfo($_username);
	if(!$_userid) $action = 'add';//Guest
/*	if($_groupid > 5 && !$_edittime && $action == 'add') {
		//dlayerm('资料尚未完善');
		if($mid<>123) dheader('medit.php');
	}*/
	if($action == 'add' || $action == 'edit') $foot = '';
/*	if($_groupid > 4 && (($MST['vemail'] && $MG['vemail']) || ($MST['vmobile'] && $MG['vmobile']) || ($MST['vtruename'] && $MG['vtruename']) || ($MST['vcompany'] && $MG['vcompany']) || ($MST['deposit'] && $MG['vdeposit']))) {
		$V = $db->get_one("SELECT vemail,vmobile,vtruename,vcompany,deposit FROM {$DT_PRE}member WHERE userid=$_userid");
		if($MST['vemail'] && $MG['vemail']) {
			$V['vemail'] or dheader('mvalidate.php?action=email&itemid=1');
		}
		if($MST['vmobile'] && $MG['vmobile']) {
			$V['vmobile'] or dheader('mvalidate.php?action=mobile&itemid=1');
		}
		if($MST['vtruename'] && $MG['vtruename']) {
			$V['vtruename'] or dheader('mvalidate.php?action=truename&itemid=1');
		}
		if($MST['vcompany'] && $MG['vcompany']) {
			$V['vcompany'] or dheader('mvalidate.php?action=company&itemid=1');
		}
		if($MST['deposit'] && $MG['vdeposit']) {
			$V['deposit'] > 99 or dheader('mdeposit.php?action=add&itemid=1');
		}
	}*/
	if($_credit < 0 && $MST['credit_less'] && $action == 'add') dheader('mcredit.php?action=less');
	if($submit) {
		check_post() or dalert($L['bad_data']);//safe
		$BANWORD = cache_read('banword.php');
		if($BANWORD && isset($post)) {
			$keys = array('title', 'tag', 'introduce', 'content');
			foreach($keys as $v) {
				if(isset($post[$v])) $post[$v] = banword($BANWORD, $post[$v]);
			}
		}
	}

	$MYMODS = array();
	if(isset($MG['moduleids']) && $MG['moduleids']) {
		$MYMODS = explode(',', $MG['moduleids']);
	}


	$vid = $mid;
	if($mid == 9 && isset($resume)) $vid = -9;
	//if(!$MYMODS || !in_array($vid, $MYMODS)) mobile_msg('');

	$IMVIP = isset($MG['vip']) && $MG['vip']; 
	$moduleid = $mid;
	$module = $MODULE[$moduleid]['module'];
	if(!$module) mobile_msg('');
	$MOD = cache_read('module-'.$moduleid.'.php');
	$my_file = 'user/'.$module.'.inc.php';
	include load($module.'.lang');
    include load('my.lang');
	//echo $my_file;
	if(is_file($my_file)) {
		require $my_file;
	} else {
		//dheader($MODULE[2]['linkurl']);
	}
} else {
	require 'user/'.$module.'.inc.php';
}
?>