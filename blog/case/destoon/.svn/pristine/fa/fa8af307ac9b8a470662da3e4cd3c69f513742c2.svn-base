<?php 
$moduleid = 2;
require 'common.inc.php';
require 'user/extend.func.php';
require 'user/lang.inc.php';

$m_history = get_cookie('mcity');
$history = explode(',', $m_history);
$cityid = $history[0];
$areaname = gl_area_name($cityid);

$sql="select areaid,areaname from {$DT_PRE}area WHERE parentid=0 order by areaid desc";
$lists = array();
$res = $db->query($sql);
while($r = $db->fetch_array($res)){
	$lists[] = $r;
}
$foot = '';
include template('arealist', 'mobile');
if(DT_CHARSET != 'UTF-8') toutf8();
?>