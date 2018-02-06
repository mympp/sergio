<?php
defined('DT_ADMIN') or exit('Access Denied');
include tpl('header');
show_menu($menus);
?>
<form action="?">
<div class="tt">搜索条件</div>
<input type="hidden" name="moduleid" value="<?php echo $moduleid;?>"/>
<input type="hidden" name="file" value="<?php echo $file;?>"/>
<input type="hidden" name="action" value="<?php echo $action;?>"/>
<table cellpadding="2" cellspacing="1" class="tb">
<tr>
<td>
&nbsp;客户名称:&nbsp;
<input type="text" size="15" name="kh" value="<?php echo $kh;?>" title="客户"/>&nbsp;
关键词:&nbsp;
<input type="text" size="10" name="kw" value="<?php echo $kw;?>" title="关键词"/>
&nbsp;
时间:
&nbsp;
<?php echo dcalendar('fromtime', $fromtime);?> 至 <?php echo dcalendar('totime', $totime);?>
&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
接收类型:
<select name="type">
    <option value="0">全部</option>
    <option value="1" <?php if($type == 1) echo 'selected';?>>采购</option>
    <option value="2" <?php if($type == 2) echo 'selected';?>>供应</option>
</select>&nbsp;
<!--<input type="text" name="psize" value="<?php /*echo $pagesize;*/?>" size="2" class="t_c" title="条/页"/>-->

<input type="submit" value="搜 索" class="btn"/>&nbsp;
<input type="button" value="重 置" class="btn" onclick="Go('?moduleid=<?php echo $moduleid;?>&file=<?php echo $file;?>&action=<?php echo $action;?>');"/>
</td>
</tr>
</table>
</form>
<div class="tt">关键词列表</div>
<table cellpadding="2" cellspacing="1" class="tb">
<tr>
<th width="35">序号</th>
<th width="200">行业</th>
<th >关键词</th>
<th width="80">接收类型</th>
<th>客户名称</th>
<th>公司</th>
<th width="100">身份</th>
</tr>
<?php foreach($lists as $k=>$v) {?>
<tr onmouseover="this.className='on';" onmouseout="this.className='';" align="center">
<td><?php echo ($page-1)?($page-1)*$pagesize+$k+1:($k+1);?></td>
<td ><?php echo $v['trade_name']?></td>
<td align="left"><?php echo trim($v['t_trade_mapping_keywords'],',');?></td>
<td><?php echo $v['t_trade_mapping_care_type']==0?'采购':'供应';?></td>
<td><?php echo $v['username'];?></td>
<td class="px11"><?php echo $v['company'];?></td>
<td><?php echo $v['t_trade_mapping_care_type']==0?'供应商':'采购商';?></td>

</tr>
<?php }?>
</table>
<div class="pages"><?php echo $pages;?></div>
<script type="text/javascript">Menuon(0);</script>
<br/>
<?php include tpl('footer');?>