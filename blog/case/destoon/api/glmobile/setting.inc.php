<?php
defined('IN_DESTOON') or exit('Access Denied');
?>
<table cellpadding="2" cellspacing="1" class="tb">
<tr>
<td class="tl">亿顺网络手机版设置</td>
<td>
以下功能为 <a href="http://www.e-action.top/" target="_blank"><span class="f_red">亿顺网络手机版</span></a> 特有
</td>
</tr>
<tr>
<td class="tl">微信jssdk</td>
<td>
<input type="radio" name="setting[gl_wxjssdk]" value="1"  <?php if($gl_wxjssdk){ ?>checked <?php } ?> /> 启用&nbsp;&nbsp;
<input type="radio" name="setting[gl_wxjssdk]" value="0"  <?php if(!$gl_wxjssdk){ ?>checked <?php } ?> /> 关闭<?php tips('启用前请确保微信账号通过认证，并取得相关权限，启用后微信内部分享及图片上传将通过微信jssdk进行！');?>
</td>
</tr>
<tr>
<td class="tl">公众微信号</td>
<td><input name="setting[gl_wxname]" type="text" size="20" value="<?php echo $gl_wxname;?>"/> <?php tips('在微信中搜索公众号的名称，显示在网站底部');?></td>
</tr>
<tr>
<td class="tl">供应自动生成图库</td>
<td>
<input type="radio" name="setting[gl_photoauto]" value="1"  <?php if($gl_photoauto){ ?>checked <?php } ?> /> 启用&nbsp;&nbsp;
<input type="radio" name="setting[gl_photoauto]" value="0"  <?php if(!$gl_photoauto){ ?>checked <?php } ?> /> 关闭<?php tips('启用该功能将会在发布供应的时候生成相应的图库，暂不支持开启ftp功能的网站！');?>
</td>
</tr>
<tr>
<td class="tl">供应同步到商城</td>
<td>
<input type="radio" name="setting[gl_mallauto]" value="1"  <?php if($gl_mallauto){ ?>checked <?php } ?> /> 启用&nbsp;&nbsp;
<input type="radio" name="setting[gl_mallauto]" value="0"  <?php if(!$gl_mallauto){ ?>checked <?php } ?> /> 关闭<?php tips('启用该功能将会在发布供应的时候同步信息到商城！');?> <span class="f_red">未开放</span>
</td>
</tr>
<tr>
<td class="tl">商圈广播功能</td>
<td>
<input type="radio" name="setting[gl_clubradio]" value="1"  <?php if($gl_clubradio){ ?>checked <?php } ?> /> 启用&nbsp;&nbsp;
<input type="radio" name="setting[gl_clubradio]" value="0"  <?php if(!$gl_clubradio){ ?>checked <?php } ?> /> 关闭<?php tips('启用该功能用户在广播功能下发布帖子，用户建立过的圈子都会发布该条帖子');?> <span class="f_red">未开放</span>
</td>
</tr>
<tr>
<td class="tl">附近商家功能</td>
<td>
<input type="radio" name="setting[gl_nearcom]" value="1"  <?php if($gl_nearcom){ ?>checked <?php } ?> /> 启用&nbsp;&nbsp;
<input type="radio" name="setting[gl_nearcom]" value="0"  <?php if(!$gl_nearcom){ ?>checked <?php } ?> /> 关闭<?php tips('启用该功能公司列表下将允许按距离远近排列，并显示相距多少km');?>
</td>
</tr>
<tr>
<td class="tl">手机地区定位</td>
<td>
<input type="radio" name="setting[gl_mobile_city]" value="1"  <?php if($gl_mobile_city){ ?>checked <?php } ?> onclick="Ds('gl_mobile_city');" /> 启用&nbsp;&nbsp;
<input type="radio" name="setting[gl_mobile_city]" value="0"  <?php if(!$gl_mobile_city){ ?>checked <?php } ?> onclick="Dh('gl_mobile_city');" /> 关闭<?php tips('启用该功能用户可以自动定位地区！');?> <span class="f_red"></span>
</td>
</tr>
<tr>
<td class="tl">百度地图key(可不填写)</td>
<td><input name="setting[gl_bdmap_ak]" type="text" id="gl_bdmap_ak" value="<?php echo $gl_bdmap_ak;?>" size="50"/><?php tips('百度地图api申请的ak key需创建应用，用于百度地图坐标转换，地理位置识别,地图导航，附近商家等等');?>&nbsp;&nbsp;&nbsp;&nbsp;<a href="http://lbsyun.baidu.com/" target="_blank" class="t">[百度地图ak key,不填写则使用通用key]</a></td> 
</tr>
<tr>
<td class="tl">第三方登录自动创建账号</td>
<td>
<input type="radio" name="setting[gl_loginauto]" value="1"  <?php if($gl_loginauto){ ?>checked <?php } ?> onclick="Ds('gl_loginauto');" /> 启用&nbsp;&nbsp;
<input type="radio" name="setting[gl_loginauto]" value="0"  <?php if(!$gl_loginauto){ ?>checked <?php } ?> onclick="Dh('gl_loginauto');" /> 关闭<?php tips('启用该功能用户使用第三方登录将会提示是否自动创建账号，免去手动创建的过程！');?>
</td>
</tr>
<tbody id="gl_loginauto" style="display:<?php if(!$gl_loginauto) echo 'none';?>">
<tr>
<td class="tl">请指定默认会员组 <span class="f_red">*</span></td>
<td><?php global $db;
	$result = $db->query("SELECT * FROM {$db->pre}member_group WHERE groupid>3");;
	while($r = $db->fetch_array($result)) {
		$select .= '<input type="radio" name="setting[gl_loginauto_id]" value="'.$r['groupid'].'" '.($r['groupid'] == $gl_loginauto_id ? ' checked' : '').' />&nbsp;'.$r['groupname'].'';
	}
	echo $select?></td> 
</tr>
<tr>
<td class="tl">自动创建账号前缀 <span class="f_red">*</span></td>
<td><input type="text" size="3" name="setting[gl_loginauto_qz]" value="<?php echo $EXT['gl_loginauto_qz'];?>"/> 比如dt 生成的用户名为dt加一个时间戳:dt1484309903 以2-4个字母为好</td> 
</tr>
<tr>
<td class="tl">是否允许修改用户名 <span class="f_red">*</span></td>
<td><input type="radio" name="setting[gl_loginauto_edit]" value="1"  <?php if($gl_loginauto_edit){ ?>checked <?php } ?> onclick="Ds('gl_loginauto');" /> 启用&nbsp;&nbsp;
<input type="radio" name="setting[gl_loginauto_edit]" value="0"  <?php if(!$gl_loginauto_edit){ ?>checked <?php } ?> onclick="Dh('gl_loginauto');" /> 关闭<?php tips('启用该功能用户使用第三方登录自动创建的账号 将有一次修改用户名的机会！');?>
</td> 
</tr>
</tbody>
<tr>
</tbody>
<tr>
<td class="tl">简化注册</td>
<td>
<input type="radio" name="setting[gl_jianhua]" value="1"  <?php if($gl_jianhua){ ?>checked <?php } ?> onclick="Ds('gl_jianhua');" /> 启用&nbsp;&nbsp;
<input type="radio" name="setting[gl_jianhua]" value="0"  <?php if(!$gl_jianhua){ ?>checked <?php } ?> onclick="Dh('gl_jianhua');" /> 关闭<?php tips('启用该功能用户前台注册简化流程，后台重新完善资料！');?>
</td>
</tr>
<tbody id="gl_jianhua" style="display:<?php if(!$gl_jianhua) echo 'none';?>">
<tr>
<td class="tl">请指定简化注册方式 <span class="f_red">*</span></td>
<td><input type="radio" name="setting[gl_jianhua_type]" value="0"  <?php if($gl_jianhua_type==0){ ?>checked <?php } ?> />用户名  <input type="radio" name="setting[gl_jianhua_type]" value="1"  <?php if($gl_jianhua_type==1){ ?>checked <?php } ?> /> 手机号</td> 
</tr>
</tbody>
<td class="tl">短信登录</td>
<td>
<input type="radio" name="setting[gl_loginmsm]" value="1"  <?php if($gl_loginmsm){ ?>checked <?php } ?> onclick="Ds('gl_loginmsm');" /> 启用&nbsp;&nbsp;
<input type="radio" name="setting[gl_loginmsm]" value="0"  <?php if(!$gl_loginmsm){ ?>checked <?php } ?> onclick="Dh('gl_loginmsm');" /> 关闭<?php tips('短信发送用于手机版注册、登录、及验证的操作！');?>
</td>
</tr>
<tr>
<td class="tl">请指定短信发送方式</td>
<td><input type="radio" name="setting[gl_loginmsm_type]" value="0"  <?php if($gl_loginmsm_type==0){ ?>checked <?php } ?> />官方默认  <input type="radio" name="setting[gl_loginmsm_type]" value="1"  <?php if($gl_loginmsm_type==1){ ?>checked <?php } ?> /> 阿里大于<?php tips('启用该功能用户使用第三方登录将会提示是否自动创建账号，免去手动创建的过程！');?></td> 
</tr>
<tr>
<td class="tl">滑块验证码</td>
<td>
<input type="radio" name="setting[gl_hk_code]" value="1"  <?php if($gl_hk_code){ ?>checked <?php } ?>/> 启用&nbsp;&nbsp;
<input type="radio" name="setting[gl_hk_code]" value="0"  <?php if(!$gl_hk_code){ ?>checked <?php } ?>/> 关闭<?php tips('是否启用滑块验证');?>
</td>
</tr>

<tr>
<td class="tl">个性首页</td>
<td><input type="radio" name="setting[gl_index_type]" value="0"  <?php if($gl_index_type==0){ ?>checked <?php } ?> />默认首页  <input type="radio" name="setting[gl_index_type]" value="1"  <?php if($gl_index_type==1){ ?>checked <?php } ?> /> 农产品类  <input type="radio" name="setting[gl_index_type]" value="2"  <?php if($gl_index_type==2){ ?>checked <?php } ?> /> 电商类<?php tips('切换个性首页！');?> <span class="f_red">后续更新</span></td> 
</tr>
<tr>
<tr>
<td class="tl">模板色系</td>
<td><input type="radio" name="setting[gl_index_color]" value="0"  <?php if($gl_index_color==0){ ?>checked <?php } ?> />默认颜色  <input type="radio" name="setting[gl_index_color]" value="1"  <?php if($gl_index_color==1){ ?>checked <?php } ?> /> 青色系  <input type="radio" name="setting[gl_index_color]" value="2"  <?php if($gl_index_color==2){ ?>checked <?php } ?> /> 红色系<?php tips('切换网站颜色！');?></td> 
</tr>
<tr>

<td class="tl">模块首页</td>
<td>
<input type="radio" name="setting[gl_module_index]" value="1"  <?php if($gl_module_index){ ?>checked <?php } ?> /> 启用&nbsp;&nbsp;
<input type="radio" name="setting[gl_module_index]" value="0"  <?php if(!$gl_module_index){ ?>checked <?php } ?> /> 关闭<?php tips('启用该功能部分模块将会有首页展示，而不是列表页面！');?>
</td>
</tr>
<tr>
<td class="tl">评论相关</td>
<td>
<input type="radio" name="setting[gl_pinglun_index]" value="1"  <?php if($gl_pinglun_index){ ?>checked <?php } ?> /> 当前页面评论&nbsp;&nbsp;
<input type="radio" name="setting[gl_pinglun_index]" value="0"  <?php if(!$gl_pinglun_index){ ?>checked <?php } ?> /> 跳转评论<?php tips('是否可以直接在当前页面评论！');?>
</td>
</tr>
<tr>
<td class="tl">签到功能</td>
<td>
<input type="radio" name="setting[gl_qiandao_index]" value="1"  <?php if($gl_qiandao_index){ ?>checked <?php } ?> /> 启用&nbsp;&nbsp;
<input type="radio" name="setting[gl_qiandao_index]" value="0"  <?php if(!$gl_qiandao_index){ ?>checked <?php } ?> /> 关闭<?php tips('是否启用签到功能！');?>
</td>
</tr>
<tr>
<td class="tl">图片延时加载</td>
<td>
<input type="radio" name="setting[gl_img_echo]" value="1"  <?php if($gl_img_echo){ ?>checked <?php } ?> /> 启用&nbsp;&nbsp;
<input type="radio" name="setting[gl_img_echo]" value="0"  <?php if(!$gl_img_echo){ ?>checked <?php } ?> /> 关闭<?php tips('是否图片延时加载功能！');?>
</td>
</tr>
<tr>
<td class="tl">页面css过渡动画</td>
<td>
<input type="radio" name="setting[gl_css_am]" value="1"  <?php if($gl_css_am){ ?>checked <?php } ?> /> 启用&nbsp;&nbsp;
<input type="radio" name="setting[gl_css_am]" value="0"  <?php if(!$gl_css_am){ ?>checked <?php } ?> /> 关闭<?php tips('是否启用页面css过渡动画功能！');?>
</td>
</tr>
<tr>
<td class="tl">前台发布返回</td>
<td>
<input type="radio" name="setting[gl_fb_back]" value="1"  <?php if($gl_fb_back){ ?>checked <?php } ?> /> 启用&nbsp;&nbsp;
<input type="radio" name="setting[gl_fb_back]" value="0"  <?php if(!$gl_fb_back){ ?>checked <?php } ?> /> 关闭<?php tips('登录会员在前台点击发布信息，发布成功后是否返回前台，游客默认返回前台！');?>
</td>
</tr>
<tr>
<td class="tl">屏蔽内容过多的详情</td>
<td>
<input type="radio" name="setting[gl_more_content]" value="1"  <?php if($gl_more_content){ ?>checked <?php } ?> /> 启用&nbsp;&nbsp;
<input type="radio" name="setting[gl_more_content]" value="0"  <?php if(!$gl_more_content){ ?>checked <?php } ?> /> 关闭<?php tips('是否在修改信息页面屏蔽内容过多的详情防止页面过长！');?> <span class="f_red">后续更新</span>
</td>
</tr>
<tr>
<td class="tl">手机商铺伪静态</td>
<td>
<input type="radio" name="setting[gl_homepage_html]" value="1"  <?php if($gl_homepage_html){ ?>checked <?php } ?> /> 启用&nbsp;&nbsp;
<input type="radio" name="setting[gl_homepage_html]" value="0"  <?php if(!$gl_homepage_html){ ?>checked <?php } ?> /> 关闭<?php tips('是否在修改信息页面屏蔽内容过多的详情防止页面过长！');?>
</td>
</tr>
<tr>
<td class="tl">手机前台修改信息</td>
<td>
<input type="radio" name="setting[gl_edit_items]" value="1"  <?php if($gl_edit_items){ ?>checked <?php } ?> /> 启用&nbsp;&nbsp;
<input type="radio" name="setting[gl_edit_items]" value="0"  <?php if(!$gl_edit_items){ ?>checked <?php } ?> /> 关闭<?php tips('是否允许管理员及信息发布者在前台简单修改信息！');?>
</td>
</tr>

</table>

<?php include DT_ROOT.'/api/glmobile/glextend.inc.php';?>