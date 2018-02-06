<?php
defined('DT_ADMIN') or exit('Access Denied');
require MD_ROOT.'/keyword.class.php';
$menus = array (
		array('关键词列表', '?moduleid='.$moduleid.'&file='.$file),
		array('待审核关键词', '?moduleid='.$moduleid.'&file='.$file.'&action=await'),
);
$do = new message;
$this_forward = '?moduleid='.$moduleid.'&file='.$file;

$NAME = array('普通', '询价', '报价', '留言', '信使');

switch($action) {
	case 'check':
		if(empty($mapping_id)) msg('请选择关键词', '?moduleid='.$moduleid.'&file='.$file.'&action=await');
		$chack = $do->chack_hy($mapping_id);
		if($chack){
			msg('关键词的行业不能为空,请把关键词移至到相应的行业', '?moduleid='.$moduleid.'&file='.$file.'&action=await');die;
		}
		$mesg_chack = $do->audit_keyword($mapping_id);
		msg($mesg_chack, '?moduleid='.$moduleid.'&file='.$file.'&action=await');
		break;
	case 'move':
		if(empty($mapping_id)) msg('请选择关键词', '?moduleid='.$moduleid.'&file='.$file.'&action=await');
		if(empty($hy)) msg('请选择行业', '?moduleid='.$moduleid.'&file='.$file.'&action=await');
		//var_dump($hy);die;
		$move = $do->move($mapping_id,$hy);
		if($move){
			msg('移动成功', '?moduleid='.$moduleid.'&file='.$file.'&action=await');
		}else{
			msg("移动失败".$move['messge'], '?moduleid='.$moduleid.'&file='.$file.'&action=await');
		}
		break;
	case 'delete':
		if(empty($mapping_id)) msg('请选择关键词', '?moduleid='.$moduleid.'&file='.$file.'&action=await');
		//var_dump($hy);die;
		$move = $do->delete($mapping_id);
		msg("删除成功".$move['messge'], '?moduleid='.$moduleid.'&file='.$file.'&action=await');

		break;
	case 'repulse':
		if(empty($mapping_id)) msg('请选择关键词', '?moduleid='.$moduleid.'&file='.$file.'&action=await');

        $i = 0;
        foreach($mapping_id as $id) {
            $r = $db->get_one("SELECT * FROM {$DB_NAME1}t_trade_mapping WHERE t_trade_mapping_id=$id");
            $userid = $r['t_trade_mapping_m_customer_id'];
            if ($userid){
                $user = $db->get_one("SELECT * FROM {$DT_PRE}member WHERE userid={$r['t_trade_mapping_m_customer_id']}");
                $username = $user['username'];

                if ($user&&$username){
                    if($r) {
                        if($msg || $eml) {
                            $content = $title = '您的关键词('.trim($r['t_trade_mapping_keywords'],',').')没有通过审核';
                            if($reason) $content .= '<br/>失败原因:'.nl2br($reason);
                            if($msg) send_message($username, $title, $content);
                            if($eml) send_mail($user['email'], $title, $content);
                        }
                        $content =  '您的关键词('.trim($r['t_trade_mapping_keywords'],',').')没有通过审核';
                        if($reason) $content .= ',失败原因:'.$reason;
                        if($sms) send_sms($user['mobile'], $content.$DT['sms_sign']);
                        $db->query("UPDATE {$DB_NAME1}t_trade_mapping SET t_trade_mapping_status=2,t_trade_mapping_reason='".$reason."' WHERE t_trade_mapping_id=$id");
                       // if($wec) send_weixin($user['username'], $content);
                        $i++;
                    }
                }

            }
        }
        msg('拒绝关键词 '.$i.' 条', '?moduleid='.$moduleid.'&file='.$file.'&action=await');
		break;
	case 'await':
		$trade_data = $do->get_trade();
		$condition = " WHERE a.t_trade_mapping_status=0  AND a.t_trade_mapping_keywords!='' AND a.t_trade_mapping_keywords!=',' ";
		if ($kh) $condition .= " AND b.username like '%".$kh."%'";
		if ($kw) $condition .= " AND a.t_trade_mapping_keywords like '%".$kw."%'";
		$type = isset($type) ? intval($type) : 0;
		if ($type==1) $condition .= " AND a.t_trade_mapping_care_type =0 ";
		if ($type==2) $condition .= " AND a.t_trade_mapping_care_type =1 ";
		$fromtime = isset($fromtime) && is_date($fromtime) ? $fromtime : '';
		$fromdate = $fromtime ? strtotime($fromtime.' 0:0:0') : 0;
		$totime = isset($totime) && is_date($totime) ? $totime : '';
		$todate = $totime ? strtotime($totime.' 23:59:59') : 0;
		if($fromdate) $condition .= " AND a.t_trade_mapping_createtime>=$fromdate";
		if($todate) $condition .= " AND a.t_trade_mapping_createtime<=$todate";
		$lists = $do->get_list($condition);
		include tpl('keyword_await', $module);
		break;
	default:
		$condition = " WHERE a.t_trade_mapping_status=1 AND a.t_trade_mapping_m_trade_id!=0 AND a.t_trade_mapping_keywords!='' AND a.t_trade_mapping_keywords!=',' ";
		if ($kh) $condition .= " AND b.username like '%".$kh."%'";
		if ($kw) $condition .= " AND a.t_trade_mapping_keywords like '%".$kw."%'";
		$type = isset($type) ? intval($type) : 0;
		if ($type==1) $condition .= " AND a.t_trade_mapping_care_type =0 ";
		if ($type==2) $condition .= " AND a.t_trade_mapping_care_type =1 ";
		$fromtime = isset($fromtime) && is_date($fromtime) ? $fromtime : '';
		$fromdate = $fromtime ? strtotime($fromtime.' 0:0:0') : 0;
		$totime = isset($totime) && is_date($totime) ? $totime : '';
		$todate = $totime ? strtotime($totime.' 23:59:59') : 0;
		if($fromdate) $condition .= " AND a.t_trade_mapping_createtime>=$fromdate";
		if($todate) $condition .= " AND a.t_trade_mapping_createtime<=$todate";
		$lists = $do->get_list($condition);
		include tpl('keyword', $module);
		break;
}
?>