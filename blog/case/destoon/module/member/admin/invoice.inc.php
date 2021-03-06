<?php
defined('DT_ADMIN') or exit('Access Denied');
isset($username) or $username = '';
$menus = array (
    array('发票申请', '?moduleid='.$moduleid.'&file='.$file),
);
$BANKS = explode('|', trim($MOD['pay_banks']));
$table = $DT_PRE.'invoice';
if(!$action){
		$sfields = array('按条件', '联系电话', '邮箱', '发票抬头');
		$dfields = array('tel', 'tel', 'email', 'company');
		$dorder  = array('itemid asc');
		isset($fields) && isset($dfields[$fields]) or $fields = 0;
		isset($fromtime) or $fromtime = '';
		isset($totime) or $totime = '';
		isset($dfromtime) or $dfromtime = '';
		isset($dtotime) or $dtotime = '';
		isset($type) or $type = 0;
		$fields_select = dselect($sfields, 'fields', '', $fields);
		$condition = '1';
		if($keyword) $condition .= " AND $dfields[$fields] LIKE '%$keyword%'";
		if($fromtime) $condition .= " AND a.addtime>".(strtotime($fromtime.' 00:00:00'));
		if($totime) $condition .= " AND a.addtime<".(strtotime($totime.' 23:59:59'));
		if($type) $condition .= $type == 1 ? " AND status=0" : " AND status=1";
		if($itemid) $condition .= " AND itemid=$itemid";
		if($page > 1 && $sum) {
			$items = $sum;
		} else {
			$r = $db->get_one("SELECT COUNT(*) AS num FROM {$table} as a,{$DT_PRE}finance_record as b WHERE a.finance_record_id = b.itemid AND $condition");
			$items = $r['num'];
		}
		$pages = pages($items, $page, $pagesize);	
		$records = array();
		$result = $db->query("SELECT a.itemid,a.addtime,b.amount,b.bank,a.company,a.taxno,a.tel,a.email,a.status FROM {$table} as a , {$DT_PRE}finance_record as b where a.finance_record_id = b.itemid and $condition  ORDER BY b.addtime DESC LIMIT $offset,$pagesize");
		while($r = $db->fetch_array($result)) {
			$r['addtime'] = timetodate($r['addtime'], 5);
			$r['amount'] > 0 ? $r['amount'] : $r['amount'];
			$records[] = $r;
		}
		
		include tpl('invoice', $module);
}else if($action=='edit'){
	$db->query("UPDATE {$table} SET status=1,updatetime=".time()." WHERE itemid=$itemid");
	msg('操作成功', '?moduleid='.$moduleid.'&file='.$file);
}