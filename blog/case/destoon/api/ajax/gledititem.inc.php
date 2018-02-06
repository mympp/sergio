<?php 
/*
	亿顺网络手机版 作者一切归零 QQ:811142004
	http://www.e-action.top
*/
defined('IN_DESTOON') or exit('Access Denied');
require DT_ROOT.'/module/'.$module.'/common.inc.php';
$post['title'] = trim($post['title']);
$itemid = isset($itemid) ? intval($itemid) : 0;
$post['price'] = !is_numeric($post['price'])? 0 : dround($post['price']);
$post['edittime'] = $DT_TIME;
$post = dhtmlspecialchars($post);

$table = get_table($moduleid);
$fds = $MOD['fields'];
$fields = explode(',',$fds);
$r = $db->get_one("SELECT $fds FROM {$table} WHERE itemid='$itemid'");
//gl_dojson($_groupid);
if($_groupid==1 || ($r && $_username==$r['username'] && $post['title'])) {
$sql = '';
foreach($post as $k=>$v) {
 if(in_array($k, $fields)) $sql .= ",$k='$v'";
}
$sql = substr($sql, 1);
$db->query("UPDATE {$table} SET $sql WHERE itemid=$itemid");
$err = array();
$err['error'] = 'ok';
$err['itemid'] = $itemid;
$err['title'] = $post['title'];
$err['price'] = $post['price'];
exit(json_encode($err));
}else{
gl_dojson('error');
}
?>