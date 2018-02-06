<?php
defined('IN_DESTOON') or exit('Access Denied');
?>
<a name="gldashang"></a>
<div class="tt">打赏设置</div>
<table cellpadding="2" cellspacing="1" class="tb">
<tr>
<td class="tl">打赏功能</td>
<td>
<input type="radio" name="setting[gl_dashang]" value="1"  <?php if($gl_dashang) echo 'checked';?> onclick="Ds('gl_dashang');"/> 开启&nbsp;&nbsp;&nbsp;&nbsp;
<input type="radio" name="setting[gl_dashang]" value="0"  <?php if(!$gl_dashang) echo 'checked';?> onclick="Dh('gl_dashang');"/> 关闭
</td>
</tr>
<tbody id="gl_dashang" style="display:<?php if(!$gl_dashang) echo 'none';?>">
<tr>
<td class="tl">请指定打赏方式 <span class="f_red">*</span></td>
<td><input type="radio" name="setting[gl_dashang_type]" value="0"  <?php if($gl_dashang_type==0){ ?>checked <?php } ?> />积分  <input type="radio" name="setting[gl_dashang_type]" value="1"  <?php if($gl_dashang_type==1){ ?>checked <?php } ?> /> 现金</td> 
</tr>
</tbody>

<tr>
<td class="tl">重复打赏</td>
<td>
<input type="radio" name="setting[gl_dashang_cf]" value="1"  <?php if($gl_dashang_cf) echo 'checked';?> onclick="Ds('gl_dashang_cf');"/> 开启&nbsp;&nbsp;&nbsp;&nbsp;
<input type="radio" name="setting[gl_dashang_cf]" value="0"  <?php if(!$gl_dashang_cf) echo 'checked';?> onclick="Dh('gl_dashang_cf');"/> 关闭
</td>
</tr>
<tbody id="gl_dashang_cf" style="display:<?php if(!$gl_dashang_cf) echo 'none';?>">
<tr>
<td class="tl">重复打赏最多次数 <span class="f_red">*</span></td>
<td><input type="text" size="3" name="setting[gl_dashang_nums]" value="<?php echo $EXT['gl_dashang_nums'];?>"/> 次</td> 
</tr>
</tbody>
<tr>
<td class="tl"><span class="f_blue"><?php echo $DT['credit_name'];?></span>打赏数值设置</td>
<td><input type="text" size="20" name="setting[gl_dashang_credit]" value="<?php if($EXT['gl_dashang_nums']){echo $EXT['gl_dashang_credit'];}else{echo '5|10|15|20';}?>"/> typeid=1不同数值 | 分隔，建议设置4个就够了 <img src="admin/image/help.png" width="11" height="11" title="不同数值 | 分隔，设置好后，请勿频繁改动" alt="tips" class="c_p" onclick="Dconfirm(this.title, '', 450);" /></td>
</tr>
<tr>
<td class="tl"><span class="f_red"><?php echo $DT['money_name'];?></span>打赏数值设置</td>
<td><input type="text" size="20" name="setting[gl_dashang_money]" value="<?php if($EXT['gl_dashang_nums']){echo $EXT['gl_dashang_money'];}else{echo '5|10|15|20';}?>"/> typeid=2不同数值 | 分隔，建议设置4个就够了 <img src="admin/image/help.png" width="11" height="11" title="不同数值 | 分隔，设置好后，请勿频繁改动" alt="tips" class="c_p" onclick="Dconfirm(this.title, '', 450);" /></td>
</tr>
<tr>
<td class="tl">打赏说明</td>
<td><textarea name="setting[gl_dashang_help]" id="gl_dashang_help" style="width:500px;height:50px;"><?php echo $gl_dashang_help;?></textarea><br/>支持HTML语法， 空格 &amp;nbsp; 换行  &lt;br/&gt;
</td> 
</tr>
</table>
<a name="glfocuson"></a>
<div class="tt">关注、点赞、评分设置</div>
<table cellpadding="2" cellspacing="1" class="tb">
<tr>
<td class="tl">点赞功能 <span class="f_red">*</span></td>
<td>
<input type="radio" name="setting[gl_zan]" value="1"  <?php if($gl_zan) echo 'checked';?>/> 开启&nbsp;&nbsp;&nbsp;&nbsp;
<input type="radio" name="setting[gl_zan]" value="0"  <?php if(!$gl_zan) echo 'checked';?>/> 关闭
</td>
</tr>
<tr>
<td class="tl">允许点赞的模块</td>
<td><?php echo module_checkbox('setting[glzan_module][]', $glzan_module, '1,2,3');?></td>
</tr>
<tr>
<tr>
<td class="tl">关注功能 <span class="f_red">*</span></td>
<td>
<input type="radio" name="setting[gl_focuson]" value="1"  <?php if($gl_focuson) echo 'checked';?>/> 开启&nbsp;&nbsp;&nbsp;&nbsp;
<input type="radio" name="setting[gl_focuson]" value="0"  <?php if(!$gl_focuson) echo 'checked';?>/> 关闭
</td>
</tr>
<tr>
<td class="tl">允许关注的模块</td>
<td><?php echo module_checkbox('setting[focuson_module][]', $focuson_module, '1,2,3');?></td>
</tr>
<tr>
<td class="tl">关注上限 </td>
<td><input type="text" size="3" name="setting[gl_focuson_limit]" value="<?php echo $EXT['gl_focuson_limit'];?>"/> 次</td> 
</tr>
<tr>
<td class="tl">评分功能 <span class="f_red">*</span></td>
<td>
<input type="radio" name="setting[gl_pingfen]" value="1"  <?php if($gl_pingfen) echo 'checked';?> /> 开启&nbsp;&nbsp;&nbsp;&nbsp;
<input type="radio" name="setting[gl_pingfen]" value="0"  <?php if(!$gl_pingfen) echo 'checked';?> /> 关闭
</td>
</tr>
<tr>
<td class="tl">允许评分的模块</td>
<td><?php echo module_checkbox('setting[glpingfen_module][]', $glpingfen_module, '1,2,3');?></td>
</tr>
<tr>
<tr>
<td class="tl">数据初始化</td>
<td>
<input type="radio" name="setting[gl_nums_init]" value="1"  <?php if($gl_nums_init) echo 'checked';?>/> 开启&nbsp;&nbsp;&nbsp;&nbsp;
<input type="radio" name="setting[gl_nums_init]" value="0"  <?php if(!$gl_nums_init) echo 'checked';?>/> 关闭 <img src="admin/image/help.png" width="11" height="11" title="关注、点赞初始化一定的数值，通过一定的公式计算得出！" alt="tips" class="c_p" onclick="Dconfirm(this.title, '', 450);" />
</td>
</tr>
</table>