<?php
/*
	亿顺网络手机版 作者一切归零 QQ:811142004
	http://www.e-action.top
*/
defined('IN_DESTOON') or exit('Access Denied');
$CAT or exit;
$CAT['property'] or exit;
include DT_ROOT.'/include/property.func.php';
$admin = (isset($admin) && $admin) ? 1 : 0;
$moduleid = $CAT['moduleid'];
$options = property_option($catid);
$values = $itemid ? property_value($moduleid, $itemid) : array();
$select = '<select id="property_required" style="display:none;">';
$table = '';
foreach($options as $k=>$v) {
	isset($values[$v['oid']]) or $values[$v['oid']] = '';
	if($v['required']) {
		$star = 'aui-text-red';
	} else {
		$star = $admin ? '' : '';
	}
	if(DT_CHARSET != 'UTF-8') $v['name'] = convert($v['name'], DT_CHARSET, 'UTF-8');
	$table .=  '<div class="aui-input-row"><span class="aui-input-addon '.$star.'">'.$v['name'].'</span>'.mproperty_html($values[$v['oid']], $v['oid'], $v['type'], $v['value'], $v['extend']).'</div>';
	//$select .= $v['required'] ? '<option value="'.$v['oid'].'">'.$v['name'].'</option>' : '';
}
$select .= '</select>';
echo substr($table, 0, -10).$select.'';
?>