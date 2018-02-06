<?php
/*
	亿顺网络手机版 作者一切归零 QQ:811142004
	http://www.e-action.top
*/
defined('IN_DESTOON') or exit('Access Denied');
$ak = !empty($EXT['gl_bdmap_ak'])?$EXT['gl_bdmap_ak']:'waKl9cxyGpfdPbon7PXtDXIf';
switch($job) {
	case 'gps':
	    $x = isset($x) ? $x : '';
        $y = isset($y) ? $y : '';
		//$x = 119.651083;
		//$y = 29.083517;

        $url = 'http://api.map.baidu.com/geoconv/v1/?coords='.$x.','.$y.'&from=1&to=5&ak='.$ak.'';
		$res = dcurl($url);
	    $location = json_decode($res,true);
		$location = $location['result'][0];
		$lat = $location[y].','.$location[x];
		$url = 'http://api.map.baidu.com/geocoder/v2/?ak='.$ak.'&location='.$lat.'&output=json&pois=1';
        $myres = dcurl($url);
	    $mylocation = json_decode($myres,true);
	    $myaddrs = $mylocation['result']['formatted_address']; // formatted_address
		$mycity = $mylocation['result']['addressComponent']['city']; // formatted_address
        set_cookie('my_addrs', $myaddrs, $DT_TIME + 86400);
		set_cookie('my_city', $mycity, $DT_TIME + 86400);
	    set_cookie('my_lng', $location[x], $DT_TIME + 86400);
	    set_cookie('my_lat', $location[y], $DT_TIME + 86400);
        exit(json_encode($location));
	break;
	case 'mylocal':
	set_cookie('my_lng', $my_lng, $DT_TIME + 86400);
	set_cookie('my_lat', $my_lat, $DT_TIME + 86400);
	break;
	case 'setcity':
		//set_cookie('mcity', $mcityid, $DT_TIME + 7*86400);
		$history_number = 3;
        $m_history = get_cookie('mcity');
        if (!empty($m_history))
       {
        $history = explode(',', $m_history);
        array_unshift($history, $mcityid);
        $history = array_unique($history);
        while (count($history) > $history_number)
       {
        array_pop($history);
        }
       set_cookie('mcity', implode(',', $history), $DT_TIME + 7*86400);
       }
       else
       {
        set_cookie('mcity', $mcityid, $DT_TIME + 7*86400);
        }
		gl_exit('ok');
	break;
	case 'history':
		$m_history = get_cookie('mcity');
		$tags=array();
		$condition = 'areaid IN ('.$m_history.') ';
	    $result = $db->query("SELECT areaid,areaname FROM {$DT_PRE}area WHERE {$condition}{$order} LIMIT {$offset},{$pagesize}");
	while($r = $db->fetch_array($result)) {
		$r['areaname'] = gl_utftext($r['areaname']);
		$tags[] = $r;
	}
   exit(json_encode($tags));
	break;
	case 'initial':
		
	    $x = isset($x) ? $x : '';
        $y = isset($y) ? $y : '';
		//$x = 119.651083;
		//$y = 29.083517;
        $url = 'http://api.map.baidu.com/geoconv/v1/?coords='.$x.','.$y.'&from=1&to=5&ak='.$ak.'';
		$res = dcurl($url);
	    $locations = json_decode($res,true);

		$url = 'http://api.map.baidu.com/geocoder/v2/?ak='.$ak.'&location='.$locations['result'][0][y].','.$locations['result'][0][x].'&output=json&pois=0';
        $res = dcurl($url);
	    $location = json_decode($res,true);
		//gl_parray($location);
	    if($location['status']==0) {
         $arcity = $location['result']['addressComponent']['city'];
		 $bddistrict = $location['result']['addressComponent']['district'];
		 $formatted_address = $location['result']['formatted_address'];
		 set_cookie('my_addrs', $formatted_address, $DT_TIME + 86400);
		 set_cookie('my_city', $arcity, $DT_TIME + 86400);
		 set_cookie('my_lng', $locations['result'][0][x], $DT_TIME + 86400);
	     set_cookie('my_lat', $locations['result'][0][y], $DT_TIME + 86400);

		}else{
		}

        //if($cityid==0) {
		$areaname = isset($bddistrict) ?$bddistrict : $arcity;
		$arcity = str_replace('市',"",$arcity);
        $result = $db->query("SELECT areaid,areaname FROM {$DT_PRE}area ORDER BY areaid");
        while($r = $db->fetch_array($result)) {
	    if(preg_match("/".$arcity."/i", gl_utftext($r['areaname']))) {
	    //set_cookie('mcity', $r['areaid'], $DT_TIME + 7*86400);
	    $cityid = $r['areaid'];
	    $cityname = $r['areaname'];
	    //if($r['domain']) dheader($r['domain']);
	    $c = $r;
	    break;
	           }
		     }
        //$cityid = 12;

	//exit(json_encode($cityid));
	$areaid = gl_get_parareaid($cityid);
	$areaname = gl_area_name($cityid);
    $areaname = isset($areaname)?gl_utftext($areaname):'全国';
    if(!isset($areaid) || $areaid==''){exit;}
    $sql="select areaid,areaname from {$DT_PRE}area where parentid='$areaid'";
    $param = array();
    $res = $db->query($sql);
    while($r = $db->fetch_array($res)){
	$r['areaname'] = gl_utftext($r['areaname']);
	$param[] = $r;
    }
	if($cityid==0) $param='';
	//echo $areaname;
    $datalist = array('arealist' => $param,'areaname' => $areaname,'areaid' => $cityid,'localaddress' => $formatted_address);
	exit(json_encode($datalist));
    break;
}
?>