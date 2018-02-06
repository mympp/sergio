<?php
require '../../../common.inc.php';

$data=$db->query("SELECT * FROM {$DT_PRE}area WHERE parentid='$areaid'");

$data_city=array();
while ($area_res=$db->fetch_array($data)) {
 	$data_city[]=$area_res;
 }
 if(!$data_city){
 	$data=$db->get_one("SELECT * FROM {$DT_PRE}area WHERE areaid='$areaid'");
 	$data_city[]=$data;
 }
exit(json_encode($data_city,JSON_UNESCAPED_UNICODE ));