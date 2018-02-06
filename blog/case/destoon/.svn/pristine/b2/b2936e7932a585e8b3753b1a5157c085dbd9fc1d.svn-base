<?php 
defined('IN_DESTOON') or exit('Access Denied');
login();
require DT_ROOT.'/module/'.$module.'/common.inc.php';
require DT_ROOT.'/include/post.func.php';
if (!$action) {
	//$condition = "1";
		isset($fromtime) or $fromtime = '';
		isset($totime) or $totime = '';
		isset($tel) or $totime = '';
		isset($email) or $totime = '';
		isset($company) or $totime = '';
		
		if($fromtime) $condition .= " AND addtime>".(strtotime($fromtime.' 00:00:00'));
		if($totime) $condition .= " AND addtime<".(strtotime($totime.' 23:59:59'));
		$r = $db->get_one("SELECT COUNT(*) AS num FROM {$DT_PRE}invoice WHERE $condition");
		$pages = pages($r['num'], $page, $pagesize);		
		$lists = array();
		$sql = "SELECT a.itemid,a.addtime,b.amount,b.bank,a.company,a.taxno,a.tel,a.email,a.status FROM {$DT_PRE}invoice as a , {$DT_PRE}finance_record as b where a.finance_record_id = b.itemid and $condition  ORDER BY a.itemid  LIMIT $offset,$pagesize";
		$result = $db->query($sql);
		$amount = 0;
		while($r = $db->fetch_array($result)) {
			$r['addtime'] = timetodate($r['addtime'], 5);
			$amount += $r['amount'];
			$lists[] = $r;
		}
		$amount = number_format($amount, 2, '.', ',');
		$head_title = $L['invoice_title'];
		include template('invoice', $module);
}
?>