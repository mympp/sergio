<?php
defined('DT_ADMIN') or exit('Access Denied');
include tpl('header');
show_menu($menus);
?>
<div class="tt">发票搜索</div>
<form action="?">
<input type="hidden" name="moduleid" value="<?php echo $moduleid;?>"/>
<input type="hidden" name="file" value="<?php echo $file;?>"/>
<table cellpadding="2" cellspacing="1" class="tb">
<tr>
<td>&nbsp;
<?php echo dcalendar('fromtime', $fromtime);?> 至 <?php echo dcalendar('totime', $totime);?>&nbsp;
<!-- 联系电话：<input type="text" name="tel" value="<?php echo $tel;?>" size="10"/>&nbsp;
邮箱：<input type="text" name="email" value="<?php echo $email;?>" size="10"/>&nbsp;
发票抬头：<input type="text" name="company" value="<?php $company;?>" size="10"/>&nbsp; -->
<?php echo $fields_select;?>&nbsp;
<input type="text" size="20" name="kw" value="<?php echo $kw;?>"/>&nbsp;
<select name="type">
<option value="0">状态</option>
<option value="1" <?php if($type == 1) echo 'selected';?>>未开票</option>
<option value="2" <?php if($type == 2) echo 'selected';?>>已开票</option>
</select>&nbsp;
<input type="submit" value="搜 索" class="btn"/>&nbsp;
<input type="button" value="重 置" class="btn" onclick="Go('?moduleid=<?php echo $moduleid;?>&file=<?php echo $file;?>&action=<?php echo $action;?>');"/>
</td>
</tr>
</table>
</form>
<div class="tt">发票记录</div>
<table cellpadding="2" cellspacing="1" class="tb" id="tab">
<tr>
<th>流水号</th>
<th width="130">订单号</th>
<th width="130">发生时间</th>
<th>发票金额</th>
<th>支付平台</th>
<th width="130">发票抬头</th>
<th width="130">纳税人识别号</th>
<th width="130">会员联系电话</th>
<th width="130">邮箱</th>
<th>类型</th>
<th>状态</th>
<th>操作</th>
</tr>
<?php foreach($records as $k=>$v) {?>
<tr onmouseover="this.className='on';" onmouseout="this.className='';" align="center">
<td><?php echo $v['itemid'];?></td>
<td><?php echo $v['itemid'];?></td>
<td><?php echo $v['addtime'];?></td>
<td><?php echo abs($v['amount']);?></td>
<td><?php echo $v['bank'];?></td>
<td><?php echo $v['company'];?></td>
<td><?php echo $v['taxno'];?></td>
<td><?php echo $v['tel'];?></td>
<td><?php echo $v['email'];?></td>
<td>电子发票</td>
<td id="status"><?php if($v['status']==0) echo '未开票' ;else echo '已开票';?></td>
<td class="f_gray" id="email"><?php if($v['status']==0){;?><a href="javascript:;" onclick="if(confirm('邮件是否已经发送')){window.location.href='?moduleid=<?php echo $moduleid;?>&file=<?php echo $file;?>&action=edit&itemid=<?php echo $v['itemid'];?>'}"><?php };?><?php if($v['status']==0) echo '发邮件';else echo '已发送';?></a></td>
</tr>
<?php }?>
</table>
<div class="pages"><?php echo $pages;?></div>
<script type="text/javascript">Menuon(1);</script>
<script>
	
</script>
<br/>
<?php include tpl('footer');?>


