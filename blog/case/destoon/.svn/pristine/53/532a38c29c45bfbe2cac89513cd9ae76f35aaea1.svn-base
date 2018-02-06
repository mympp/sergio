<?php
require 'common.inc.php';
$star = isset($star) ? strip_tags($star) : '';
$end = isset($end) ? strip_tags($end) : '';
$myaddrs = get_cookie('my_addrs');
$mycity = get_cookie('my_city');
$mlat = get_cookie('my_lat');
$mlng = get_cookie('my_lng');
$myPoint='116.404, 39.915';
if($mlat) $myPoint=$mlng.','.$mlat;
if($type==1){
$bdmode = 'BMAP_MODE_TRANSIT';
}elseif($type==2){
$bdmode = 'BMAP_MODE_DRIVING';
}else{
$bdmode = 'BMAP_MODE_WALKING';
}
$ak = isset($DT['cloud_bdmap_ak'])?$DT['cloud_bdmap_ak']:'waKl9cxyGpfdPbon7PXtDXIf';
$foot = '';
include template('bdmap', 'mobile');
?>