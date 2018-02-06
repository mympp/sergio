<?php
/*
	亿顺网络手机版 作者一切归零 QQ:811142004
	http://www.e-action.top
*/
defined('IN_DESTOON') or exit('Access Denied');

function dtexit($error='error',$path='',$msg='') {
	$err=array();
	$err['error']=$error;
	$err['path']=$path;
	$err['msg']=$msg;
	exit(json_encode($err));
}

function glerror($error='error',$msg='',$func='') {
	exit('{"error":"'.$error.'","msg":"'.$msg.'"}');
}

function dmexit($error='error',$path='') {
	exit('{"error":"'.$error.'","path":"'.$path.'"}');
}

function mobile_ismobile() {
	global $UAType, $DT_URL;
	if($UAType=='computer') mobile_msg('PC浏览请使用电脑发布信息！');
}

function dlayerm($dmessage = errmsg, $dforward = '', $time = '') {
	global $CFG, $DT;
	$dforward = ($dforward=='') ? ('goback') : ($dforward);
	if(DT_CHARSET != 'UTF-8') $dmessage = convert($dmessage, DT_CHARSET, 'UTF-8');
	exit(include template('layerm', 'mobile'));
}

function mobmsg($dmessage = errmsg, $dforward = 'goback', $dtime = 1) {
	global $CFG, $DT;
	if(!$dmessage && $dforward && $dforward != 'goback') dheader($dforward);
	exit(include template('mobmsg', 'mobile'));
}

function dtjiam_pages($total, $page = 1, $perpage = 20, $demo = '') {
	global $DT_URL, $DT, $CFG, $L;
	if($total <= $perpage) return '';
	$total = ceil($total/$perpage);
	$page = intval($page);
	if($page < 1 || $page > $total) $page = 1;
	if($demo) {
		$demo_url = $demo;
	} else {
		if(substr($DT_URL, -5) == '.html') {
			$demo_url = preg_replace("/[0-9]{1,}\.html/", "{destoon_page}.html", $DT_URL);
		} else {
			$demo_url = preg_replace("/(.*)([&?]page=[0-9]*)(.*)/i", "\\1\\3", $DT_URL);
			$s = strpos($demo_url, '?') === false ? '?' : '&';
			$demo_url = $demo_url.$s.'page={destoon_page}';
			$demo_url = urldecode($demo_url);
		}
	}
	$pages = '<a href="javascript:GoPage('.$total.', \''.$demo_url.'\');"><b>'.$page.'</b>/'.$total.'</a> ';
	$_page = $page >= $total ? 1 : $page + 1;
	$url = str_replace('{destoon_page}', $_page, $demo_url);
	$pages .= '<a href="'.$url.'" data-transition="none" id="page-next">'.$L['next_page'].'</a> ';

	$_page = $page <= 1 ? $total : ($page - 1);
	$url = str_replace('{destoon_page}', $_page, $demo_url);
	$pages .= '<a href="'.$url.'" data-transition="none" id="page-prev">'.$L['prev_page'].'</a> ';

	$_page = 1;
	$url = str_replace('{destoon_page}', $_page, $demo_url);
	$pages .= '<a href="'.$url.'" data-transition="none" id="page-home">'.$L['home_page'].'</a> ';

	$_page = $total;
	$url = str_replace('{destoon_page}', $_page, $demo_url);
	$pages .= '<a href="'.$url.'" id="page-last">'.$L['last_page'].'</a> ';
	return $pages;
}

function utftext($msg) {
	global $EXT, $CFG;
	$msg = $msg;
	$msg = convert($msg, $CFG['charset'],  'utf-8');
	return $msg;
}

function hideStars($str) { //用户名、邮箱、手机账号中间字符串以*隐藏 
    if (strpos($str, '@')) { 
        $email_array = explode("@", $str); 
        $prevfix = (strlen($email_array[0]) < 4) ? "" : substr($str, 0, 3); //邮箱前缀 
        $count = 0; 
        $str = preg_replace('/([\d\w+_-]{0,100})@/', '***@', $str, -1, $count); 
        $rs = $prevfix . $str; 
    } else { 
        $pattern = '/(1[3458]{1}[0-9])[0-9]{4}([0-9]{4})/i'; 
        if (preg_match($pattern, $str)) { 
            $rs = preg_replace($pattern, '$1****$2', $str); // substr_replace($name,'****',3,4); 
        } else { 
            $rs = substr($str, 0, 3) . "***" . substr($str, -1); 
        } 
    } 
    return $rs; 
}

function im_mobweb($id, $style = 0) {
	global $MODULE;
	return $id ? '<a href="chat.php?touser='.$id.'" target="_blank" rel="nofollow"><img src="'.DT_PATH.'api/online.png.php?username='.$id.'&style='.$style.'" title="点击交谈/留言" alt="" align="absmiddle" onerror="this.src=DTPath+\'file/image/web-off.gif\';"/></a>' : '';
}

function mfields_html($left = '<td class="tl">', $right = '<td>', $values = array(), $fd = array()) {
	extract($GLOBALS, EXTR_SKIP);
	if($fd) $FD = $fd;
	$html = '';
	foreach($FD as $k=>$v) {
		if(!$v['display']) continue;
		if(!defined('DT_ADMIN') && !$v['front']) continue;
		$html .= mfields_show($k, $left, $right, $values, $fd);
	}
	return $html;
}

function mfields_show($itemid, $left = '<span class="aui-input-addon">', $right = '<td>', $values = array(), $fd = array()) {
	extract($GLOBALS, EXTR_SKIP);
	if($fd) $FD = $fd;
	if(!$values) {
		if(isset($item)) $values = $item;
		if(isset($user)) $values = $user;
	}
	$leftred = '<span class="aui-input-addon aui-text-red">';
	$html = '';
	$v = $FD[$itemid];
	$value = $v['default_value'];
	if(isset($values[$v['name']])) {
		$value = $values[$v['name']];
	} else if($v['default_value']) {
		eval('$value = "'.$v['default_value'].'";');
	}
	if($v['html'] == 'hidden') {
		$html .= '<input type="hidden" name="post_fields['.$v['name'].']" id="'.$v['name'].'" value="'.$value.'" '.$v['addition'].'/>';
	} else {
		$html .= '<div class="aui-input-row">';
		if($v['input_limit']) {
			$html .= $leftred;
		} else {
			$html .= $left;
		}
		$html .= $v['title'];
		$html .= '</span>';
		$html .= $right;
		switch($v['html']) {
			case 'text':
				$html .= '<input type="text" name="post_fields['.$v['name'].']" class="aui-input" id="'.$v['name'].'" value="'.$value.'" '.$v['addition'].' placeholder="'.$v['title'].'"/>';
			break;
			case 'textarea':
				$html .= '<textarea name="post_fields['.$v['name'].']" id="'.$v['name'].'" class="H-textarea H-form-text H-flex-item" '.$v['addition'].'>'.$value.'</textarea>';
			break;
			case 'select':
				if($v['option_value']) {
					$html .= '<select name="post_fields['.$v['name'].']" id="'.$v['name'].'" class="aui-ml-10"><option value="">'.$L['choose'].'</option>';
					$rows = explode("*", $v['option_value']);
					foreach($rows as $row) {
						if($row) {
							$cols = explode("|", trim($row));
							$html .= '<option value="'.$cols[0].'"'.($cols[0] == $value ? ' selected' : '').'>'.$cols[1].'</option>';
						}
					}
					$html .= '</select>';
				}
			break;
			case 'radio':
				if($v['option_value']) {
					$html .= '<span id="'.$v['name'].'">';
					$rows = explode("*", $v['option_value']);
					foreach($rows as $rw => $row) {
						if($row) {
							$cols = explode("|", trim($row));
							$html .= '<input type="radio" name="post_fields['.$v['name'].']" class="aui-radio" value="'.$cols[0].'" id="'.$v['name'].'_'.$rw.'"'.($cols[0] == $value ? ' checked' : '').'><div class="aui-radio-name fz12">'.$cols[1].'</div>';
						}
					}
					$html .= '</span>';
				}
			break;
			case 'checkbox':
				if($v['option_value']) {
					$html .= '<span id="'.$v['name'].'">';
					$value = explode(',', $value);
					$rows = explode("*", $v['option_value']);
					foreach($rows as $rw => $row) {
						if($row) {
							$cols = explode("|", trim($row));
							$html .= '<input type="checkbox" name="post_fields['.$v['name'].'][]" class="aui-checkbox aui-checkbox-info" value="'.$cols[0].'" id="'.$v['name'].'_'.$rw.'"'.(in_array($cols[0], $value) ? ' checked' : '').'><div class="aui-checkbox-name fz12">'.$cols[1].'</div>';
						}
					}
					$html .= '</span>';
				}
			break;
			case 'date':
			    $fieldsdate = $v['name'];
				//$html .= '<input type="text" name="post_fields['.$v['name'].']" id="post_fields'.$v['name'].'" class="aui-input" value="'.$value.'" placeholder="'.$value.'"/>';
				$html .= '<div class="fields-date">'.dcalendar('post_fields['.$v['name'].']', $value).'</div>';
				//$html .= ' <span class="f_red" id="post_dfields'.$v['name'].'"></span>';
			break;
			case 'thumb':
			if($value) $thumbli = '<li id="tfieldspic"><a href="'.$value.'"><img src="'.$value.'" id="coverthumb"></a></li>';
				$html .= '<input name="post_fields['.$v['name'].']" type="hidden" size="60" id="'.$v['name'].'" value="'.$value.'" '.$v['addition'].' class="aui-input" /><div class="pic-list" id="fieldspicd'.$v['name'].'" onclick="fuploadids(\''.$v['name'].'\')">'.$thumbli.'<li id="fieldspic'.$v['name'].'" data="'.$v['name'].'"><img src="image/add.jpg"></li>
</div>';
				//$html .= ' <span class="f_red" id="d'.$v['name'].'"></span>';
			break;
			case 'file':
				$html .= '<input name="post_fields['.$v['name'].']" type="text" size="60" id="'.$v['name'].'" value="'.$value.'" '.$v['addition'].'/>&nbsp;&nbsp;<span onclick="Dfile('.$moduleid.', Dd(\''.$v['name'].'\').value, \''.$v['name'].'\');" class="jt">['.$L['upload'].']</span>&nbsp;&nbsp;<span onclick="if(Dd(\''.$v['name'].'\').value) window.open(Dd(\''.$v['name'].'\').value);" class="jt">['.$L['preview'].']</span>';
				$html .= ' <span class="f_red" id="d'.$v['name'].'"></span>&nbsp;&nbsp;<span onclick="Dd(\''.$v['name'].'\').value=\'\';" class="jt">['.$L['delete'].']</span>';
				//$html .= ' <span class="f_red" id="d'.$v['name'].'"></span>';
			break;
			case 'editor':
				$toolbar = isset($group_editor) ? $group_editor : 'Destoon';
				if(DT_EDITOR == 'fckeditor') {
					$html .= '<textarea name="post_fields['.$v['name'].']" id="'.$v['name'].'" style="display:none">'.$value.'</textarea><iframe id="'.$v['name'].'___Frame" src="'.$MODULE[2]['linkurl'].'editor/fckeditor/editor/fckeditor.html?InstanceName='.$v['name'].'&Toolbar='.$toolbar.'" width="'.$v['width'].'" height="'.$v['height'].'" frameborder="no" scrolling="no"></iframe>';
					//$html .= '<br/><span class="f_red" id="d'.$v['name'].'"></span>';
				} else {
					$html .= '<textarea name="post_fields['.$v['name'].']" id="'.$v['name'].'" style="display:none">'.$value.'</textarea>'. deditor($moduleid, $v['name'], $toolbar, $v['width'], $v['height']);
				}
			break;
			case 'area':
				$html .= ajax_area_select('post_fields['.$v['name'].']', $GLOBALS['L']['choose'], $value);
				//$html .= ' <span class="f_red" id="d'.$v['name'].'"></span>';
			break;
		}
		$html .= $v['note'];
		$html .= '</div>';
	}
	//if($fieldsdate)return $html.gl_fieldsdate($fieldsdate);
	return $html;
}

function mfields_check($post_fields, $fd = array()) {
	global $FD, $session;
	include load('include.lang');
	if($fd) $FD = $fd;
	if(!is_object($session)) $session = new dsession();
	$uploads = isset($_SESSION['uploads']) ? $_SESSION['uploads'] : array();
	foreach($FD as $k=>$v) {
		$value = isset($post_fields[$v['name']]) ? $post_fields[$v['name']] : '';
		if(in_array($v['html'], array('thumb', 'file', 'editor')) && $uploads) {
			foreach($uploads as $sk=>$sv) {
				if($v['html'] == 'editor') {
					if(strpos($value, $sv) !== false) unset($_SESSION['uploads'][$sk]);
				} else {
					if($sv == $value) unset($_SESSION['uploads'][$sk]);
				}
			}
		}
		if(!$v['input_limit']) continue;
		if(!defined('DT_ADMIN') && !$v['front']) continue;
		if($v['input_limit'] == 'is_date') {
			if(!is_date($value)) dtexit(lang($L['fields_input'], array($v['title'])));
		} else if($v['input_limit'] == 'is_email') {
			if(!is_email($value)) dtexit(lang($L['fields_valid'], array($v['title'])));
		} else if(is_numeric($v['input_limit'])) {
			$length = $value ? ($v['html'] == 'checkbox' ? count($value) : word_count($value)) : 0;
			if($length < $v['input_limit']) dtexit(lang($L['fields_less'], array($v['title'], $v['input_limit'])));
		} else if(preg_match("/^([0-9]{1,})\-([0-9]{1,})$/", $v['input_limit'], $m)) {			
			$length = $value ? ($v['html'] == 'checkbox' ? count($value) : word_count($value)) : 0;
			if($m[1] && $length < $m[1]) dtexit(lang($L['fields_less'], array($v['title'], $m[1])));
			if($m[2] && $length > $m[2]) dtexit(lang($L['fields_more'], array($v['title'], $m[2])));
		} else {
			if(!preg_match("/^".$v['input_limit']."$/", $value)) dtexit(lang($L['fields_match'], array($v['title'])));
		}
	}
}

function mproperty_html($var, $oid, $type, $value, $extend = '') {
	global $L;
	$str = '';
	if($type == 0) {
		if(strpos($extend, 'size=') === false) $extend .= ' size="50"';
		$str = '<input type="text" name="post_ppt['.$oid.']" id="property-'.$oid.'" class="aui-input" value="'.($var ? $var : $value).'" '.$extend.'/>';
	} else if($type == 1) {
		if(strpos($extend, 'rows=') === false) $extend .= ' rows="5"';
		if(strpos($extend, 'cols=') === false) $extend .= ' cols="80"';
		$str = '<textarea name="post_ppt['.$oid.']" id="property-'.$oid.'" '.$extend.'>'.($var ? $var : $value).'</textarea><br/>';
	} else if($type == 2) {
		$str = '<select name="post_ppt['.$oid.']" id="property-'.$oid.'" '.$extend.' class="aui-ml-15"><option value="">'.$L['choose'].'</option>';
		$ops = explode('|', $value);
		foreach($ops as $o) {
			if($var) {
				$o = str_replace('(*)', '', $o);
				$selected = $o == $var ? ' selected' : '';
			} else {
				$selected = strpos($o, '(*)') !== false ? ' selected' : '';
				$o = str_replace('(*)', '', $o);
			}
			$str .= '<option value="'.$o.'"'.$selected.'>'.$o.'</option>';
		}
		$str .= '</select>';
	} else if($type == 3) {
		$str = '<span id="property-'.$oid.'" '.$extend.'>';
		$ops = explode('|', $value);
		foreach($ops as $o) {
			if($var) {
				$o = str_replace('(*)', '', $o);
				$tmp = explode(',', $var);
				$selected = in_array($o, $tmp) ? ' checked' : '';
			} else {
				$selected = strpos($o, '(*)') !== false ? ' checked' : '';
				$o = str_replace('(*)', '', $o);
			}
			$str .= '<input type="checkbox" name="post_ppt['.$oid.'][]" class="aui-checkbox aui-checkbox-info" value="'.$o.'"'.$selected.'><div class="aui-checkbox-name fz12">'.$o.'</div>';
		}
		$str .= '</span>';
	}
	$str .= ' <span id="dproperty-'.$oid.'" class="f_red"></span>';
	if(DT_CHARSET != 'UTF-8') $str = convert($str, DT_CHARSET, 'UTF-8');
	return $str;
}

function mproperty_check($post_ppt) {
	global $post;
	include load('include.lang');
	$OP = $post['catid'] ? property_option($post['catid']) : array();
	if(!$OP) return;
	foreach($OP as $v) {
		if($v['required'] && !$post_ppt[$v['oid']]) {
			$msg = lang($v['type'] > 1 ? $L['fields_choose'] : $L['fields_input'], array($v['name']));
			defined('DT_ADMIN') ? dtexit($msg) : dtexit($msg);
		}
	}
} 

function mget_com_setting($userid, $key = '', $cache = '') {
	global $db;
	if($key) {
		$r = $db->get_one("SELECT * FROM {$db->pre}company_setting WHERE userid=$userid AND item_key='$key'", $cache);
		return $r ? $r['item_value'] : '';
	} else {
		$setting = array();
		if($cache) {
			$query = $db->query("SELECT * FROM {$db->pre}company_setting WHERE userid=$userid AND item_key<>'mypage'", $cache);
		} else {
			$query = $db->query("SELECT * FROM {$db->pre}company_setting WHERE userid=$userid", $cache);
		}
		while($r = $db->fetch_array($query)) {
			$setting[$r['item_key']] = $r['item_value'];
		}
		return $setting;
	}
}

function match_catname($catname,$moduleid){
	if($catname!=''){
	$arrcat = cache_read('category-'.$moduleid.'.php');
		  foreach($arrcat as $value){
			  if(array_search($catname,$value)){
				$catid = $value['catid'];
				break;
			  }
		  }
		return $catid;
	}else{
		return '0';
	}
}

function mnew_filecopy($file,$thumb=0){
global $DT, $DT_TIME, $_userid;

$file_ext = file_ext($file);
$theurl = str_replace('.thumb.'.$file_ext, '', $file);
$middleurl = str_replace('.thumb.'.$file_ext, '.middle.'.$file_ext, $file);
$thumburl = $file;

$filedir = 'file/upload/'.timetodate($DT_TIME, $DT['uploaddir']).'/';
$filepath = DT_PATH.$filedir;
$fileroot = DT_ROOT.'/'.$filedir;

$thumbname = timetodate($DT_TIME, 'His').mt_rand(10, 99).$_userid.'.'.$file_ext.'.thumb.'.$file_ext;
$middlename = str_replace('.thumb.', '.middle.', $thumbname);
$filename = str_replace('.thumb.'.$file_ext, '', $thumbname);

$thumbfile = $fileroot.$thumbname;
$middlefile = $fileroot.$middlename;
$photofile = $fileroot.$filename;
if($thumb<>0){
file_copy($middleurl, $middlefile);
return $filepath.$middlename;
}else{
file_copy($thumburl, $thumbfile);
file_copy($middleurl, $middlefile);
file_copy($theurl, $photofile);
return $filepath.$thumbname;
}
}

function gl_fieldsdate($fdate){
	
$fieldsdate .= '<script type="text/javascript">';
$fieldsdate .= '$(function () {';
$fieldsdate .= 'var currYear = (new Date()).getFullYear();	';
$fieldsdate .= 'var optt={};';
$fieldsdate .= 'optt.date = {preset : \'date\'};';
$fieldsdate .= 'optt.time = {preset : \'time\'};';
$fieldsdate .= 'optt.default = {';
$fieldsdate .= 'theme: \'android-ics light\',display: \'modal\',mode: \'scroller\',dateFormat: \'yyyy-mm-dd\',lang: \'zh\',showNow: true,nowText: "今天",startYear: currYear-1,endYear: currYear + 10';
$fieldsdate .= '};';
$fieldsdate .= '$("#post_fields'.$fdate.'").mobiscroll($.extend(optt[\'date\'], optt[\'default\']));';
$fieldsdate .= '});';
$fieldsdate .= '</script>';
return $fieldsdate;
}
?>