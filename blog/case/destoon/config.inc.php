<?php
defined('IN_DESTOON') or exit('Access Denied');
/*
	[Destoon B2B System] Copyright (c) 2008-2016 Destoon.COM
	This is NOT a freeware, use is subject to license.txt
*/
$CFG['database'] = 'mysqli';
$CFG['pconnect'] = '0';
$CFG['db_host'] = 'localhost';
$CFG['db_name'] = 'destoon';
$CFG['db_user'] = 'root';
$CFG['db_pass'] = 'root';
$CFG['db_charset'] = 'utf8';
$CFG['db_expires'] = '0';
$CFG['tb_pre'] = 'destoon_';
$CFG['charset'] = 'utf-8';
$CFG['url'] = 'http://wx.destoon.cn/';
$CFG['com_domain'] = '';
$CFG['com_dir'] = '1';
$CFG['com_rewrite'] = '0';
$CFG['com_vip'] = 'VIP';
$CFG['file_mod'] = 0777;
$CFG['cache'] = 'file';
$CFG['cache_pre'] = 'cm2_';
$CFG['cache_dir'] = '';
$CFG['tag_expires'] = '0';
$CFG['template_refresh'] = '1';
$CFG['cookie_domain'] = '';
$CFG['cookie_path'] = '/';
$CFG['cookie_pre'] = 'ce6_';
$CFG['session'] = 'file';
$CFG['editor'] = 'fckeditor';
$CFG['timezone'] = 'Etc/GMT-8';
$CFG['timediff'] = '0';
$CFG['skin'] = '30010';
$CFG['template'] = '30010';
$CFG['language'] = 'zh-cn';
$CFG['authadmin'] = 'session';
$CFG['authkey'] = '1TMHZqJnrU7uM5ox';
$CFG['static'] = '';
$CFG['cloud_uid'] = '';
$CFG['cloud_key'] = '';
$CFG['edittpl'] = '1';
$CFG['executesql'] = '1';
$CFG['founderid'] = '1';
$sso_config=array(
	"sso_web"=>"http://www.quesou-tp.cn",
	);
//定义变量
$CFG['medium_host']='http://medium.quesou-tp.cn';
$CFG['code_hz']='10';
$CFG['qs_db_name']='search';
?>