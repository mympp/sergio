<?php 
$moduleid = 2;
require 'common.inc.php';
require 'user/extend.func.php';
require 'user/lang.inc.php';
mobile_login();

require DT_ROOT.'/module/'.$module.'/common.inc.php';
require DT_ROOT.'/include/post.func.php';
isset($item) or message();
$names = $L['type_names'];
isset($names[$item]) or message();
require DT_ROOT.'/include/type.class.php';
$do = new dtype;
$do->item = $item.'-'.$_userid;
$TYPE = $do->get_list();

switch($item) {
	case 'news':
		$backurl = 'mnews.php';
	break;
	case 'friend':
		$backurl = 'mfriend.php';
	break;
	case 'favorite':
		$backurl = 'mfavorite.php';
	break;
	default:
		$backurl = 'user.php?mid='.$mid.'';
	break;
}

if($submit) {
	if($MG['type_limit'] && $post[0]['typename'] && count($type) > $MG['type_limit']) dalert(lang($L['type_msg_limit'], array($MG['type_limit'])), 'goback');
	$do->update($post);
	dmsg($L['op_update_success'], $forward);
} else {
	$head_title = lang($L['type_title'], array($names[$item]));
	$types = $TYPE;
	$parent_option = '<option value="0">'.$L['type_parent'].'</option>'.$do->parent_option($TYPE);
	$parent_select = '<select name="post[0][parentid]">'.$parent_option .'</select>';
	foreach($types as $k=>$v) {
		$types[$k]['style_select'] = dstyle('post['.$v['typeid'].'][style]', $v['style']);
		$types[$k]['parent_select'] = '<select name="post['.$v['typeid'].'][parentid]">'.str_replace('"'.$v['parentid'].'"', '"'.$v['parentid'].'" selected', $parent_option).'</select>';
	}
	$new_style = dstyle('post[0][style]');
	$lists = sort_type($types);
	include template('mtype', 'mobile');
}
?>