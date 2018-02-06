<?php defined('IN_DESTOON') or exit('Access Denied');?>var destoon_userid = <?php echo $_userid;?>;
var destoon_username = '<?php echo $_username;?>';
var destoon_message = <?php echo $_message;?>;
var destoon_chat = <?php echo $_chat;?>;
var destoon_cart = get_cart();
var destoon_member = '';
var destoon_login = '';
<?php if($_userid) { ?>
destoon_member += '<span class="f_b" title="<?php echo $MG['groupname'];?>"><?php echo $_truename;?></span> <a href="<?php echo $MODULE['2']['linkurl'];?>line.php" title="<?php if($_online) { ?>在线，点击隐身<?php } else { ?>隐身，点击上线<?php } ?>
"><img src="<?php echo DT_SKIN;?>image/user_<?php if($_online) { ?>on<?php } else { ?>off<?php } ?>
line.png" width="10" height="10" align="absmiddle"/></a> | <a href="<?php echo $MODULE['2']['linkurl'];?>">商务中心</a> | <a href="<?php echo $MODULE['2']['linkurl'];?>message.php">站内信(<span class="head_t" id="destoon_message"><?php if($_message) { ?><strong><?php echo $_message;?></strong><?php if($_sound) { ?>'+sound('message_<?php echo $_sound;?>')+'<?php } ?>
<?php } else { ?>0<?php } ?>
</span>)</a><?php if($DT['im_web']) { ?> | <a href="<?php echo $MODULE['2']['linkurl'];?>chat.php">新对话(<span class="head_t" id="destoon_chat"><?php if($_chat) { ?><strong><?php echo $_chat;?></strong>'+sound('chat_new')+'<?php } else { ?>0<?php } ?>
</span>)</a><?php } ?>
 | <a onclick="return logout()" href="<?php echo $MODULE['2']['linkurl'];?>logout.php">退出</a>';
destoon_login += '<span class="pic"><a class="pic_c"><img src="<?php echo DT_SKIN;?>image/defaultheadpic.jpg" /></a></span><h3>您好!</h3><p>欢迎来到雀搜!</p><p class="lo"><a href="<?php echo $MODULE['2']['linkurl'];?>" rel="nofollow"><i class="icon log"></i>商务中心</a><a onclick="return logout()" href="<?php echo $MODULE['2']['linkurl'];?>logout.php" rel="nofollow"><i class="icon reg"></i>退出</a></p>';
<?php } else { ?>
<?php if($EXT['oauth']) { ?>
var oauth_site = '<?php echo get_cookie('oauth_site');?>';
var oauth_user = '<?php echo get_cookie('oauth_user');?>';
destoon_member += (oauth_user && oauth_site) ? '<img src="<?php echo DT_PATH;?>api/oauth/'+oauth_site+'/ico.png" align="absmiddle"/> 欢迎，<strong>'+oauth_user+'</strong> | <a href="<?php echo DT_PATH;?>api/oauth/'+oauth_site+'/index.php?time=<?php echo $DT_TIME;?>">绑定帐号</a> | <a href="javascript:" onclick="oauth_logout();">注销登录</a>' : '欢迎，<span class="f_red">客人</span> | <a href="<?php echo $MODULE['2']['linkurl'];?><?php echo $DT['file_login'];?>">请登录</a> | <a href="<?php echo $MODULE['2']['linkurl'];?><?php echo $DT['file_register'];?>">免费注册</a> | <a href="<?php echo $MODULE['2']['linkurl'];?>send.php">忘记密码?</a>';
destoon_login += '<span class="pic"><a class="pic_c"><img src="<?php echo DT_SKIN;?>image/defaultheadpic.jpg" /></a></span><h3>HI!&nbsp;请登录！</h3><p>欢迎来到雀搜!</p><p class="lo"><a href="<?php echo $MODULE['2']['linkurl'];?><?php echo $DT['file_login'];?>" rel="nofollow"><i class="icon log">登录</i>立即登录</a><a href="<?php echo $MODULE['2']['linkurl'];?><?php echo $DT['file_register'];?>" rel="nofollow"><i class="icon reg">注册</i>免费注册</a></p>';
<?php } else { ?>
destoon_member += '欢迎，<span class="f_red">客人</span> | <a href="<?php echo $MODULE['2']['linkurl'];?><?php echo $DT['file_login'];?>">请登录</a> | <a href="<?php echo $MODULE['2']['linkurl'];?><?php echo $DT['file_register'];?>">免费注册</a> | <a href="<?php echo $MODULE['2']['linkurl'];?>send.php">忘记密码?</a>';
destoon_login += '<span class="pic"><a class="pic_c"><img src="<?php echo DT_SKIN;?>image/defaultheadpic.jpg" /></a></span><h3>HI!&nbsp;请登录！</h3><p>欢迎来到雀搜!</p><p class="lo"><a href="<?php echo $MODULE['2']['linkurl'];?><?php echo $DT['file_login'];?>" rel="nofollow"><i class="icon log">登录</i>立即登录</a><a href="<?php echo $MODULE['2']['linkurl'];?><?php echo $DT['file_register'];?>" rel="nofollow"><i class="icon reg">注册</i>免费注册</a></p>';
<?php } ?>
<?php } ?>
$('#destoon_member').html(destoon_member);
$('#destoon_login').html(destoon_login);
<?php if($DT['city']) { ?>
$('#destoon_city').html('<?php echo $city_name;?>');
<?php } ?>
<?php if(isset($MODULE['16'])) { ?>
$('#destoon_cart').html(destoon_cart > 0 ? '<strong>'+destoon_cart+'</strong>' : 0);
<?php } ?>
<?php if($_message) { ?>
Dnotification('new_message', '<?php echo $MODULE['2']['linkurl'];?>message.php', '<?php echo useravatar($_username, 'large');?>', '站内信 (<?php echo $_message;?>)', '收到新的站内信件，点击查看');
<?php } ?>
<?php if($_chat) { ?>
Dnotification('new_chat', '<?php echo $MODULE['2']['linkurl'];?>chat.php', '<?php echo useravatar($_username, 'large');?>', '新对话 (<?php echo $_chat;?>)', '收到新的对话请求，点击交谈');
<?php } ?>
<?php if($_userid && $DT['pushtime']) { ?>window.setInterval('PushNew()',<?php echo $DT['pushtime'];?>*1000);<?php } ?>
