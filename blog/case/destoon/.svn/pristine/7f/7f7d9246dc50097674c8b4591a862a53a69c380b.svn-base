<?php
defined('IN_DESTOON') or exit('Access Denied');
$glmobileurl = !empty($EXT['mobile_domain'])?$EXT['mobile_domain']:DT_PATH.'mobile/';
if($DT_TOUCH){
$pay_recordurl = $glmobileurl.'mcharge.php?action=record';
$pay_indexurl = $glmobileurl.'mcharge.php';
}else{
$pay_recordurl = $MODULE[2]['linkurl'].'charge.php?action=record';
$pay_indexurl = $MODULE[2]['linkurl'].'charge.php';
}
?>