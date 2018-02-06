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
    <form method="post" action="?">
    <div class="tt">待审核关键词列表</div>
    <table cellpadding="2" cellspacing="1" class="tb">
        <tr>
            <th width="25"><input type="checkbox" onclick="checkall(this.form);"/></th>
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
                <td><input type="checkbox" name="mapping_id[]" value="<?php echo $v['t_trade_mapping_id'];?>"/></td>
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
    <table>
        <tbody><tr>
            <td>
                &nbsp;<textarea style="width:300px;height:16px;" name="reason" id="reason" onfocus="if(this.value=='操作原因')this.value='';">操作原因</textarea>
            </td>
            <td>
                <input type="checkbox" name="msg" id="msg" value="1" onclick="Dn();" checked=""><label for="msg"> 站内通知</label>
                <input type="checkbox" name="eml" id="eml" value="1" onclick="Dn();"><label for="eml"> 邮件通知</label>
               <!-- <input type="checkbox" name="sms" id="sms" value="1" onclick="Dn();"><label for="sms"> 短信通知</label>-->
            </td>
        </tr>
        </tbody>
    </table>
    <div class="btns">
        <input type="submit" value=" 通过审核 " class="btn" onclick="if(_check()){this.form.action='?moduleid=2&amp;action=check&amp;file=keyword';}">&nbsp;
        <input type="submit" value="拒绝 " class="btn" onclick="if(_reject()){this.form.action='?moduleid=2&amp;action=repulse&amp;file=keyword';}else{return false;}">&nbsp;
        <input type="submit" value=" 彻底删除 " class="btn" onclick="if(confirm('确定要删除选中关键词吗？此操作将不可撤销')){this.form.action='?moduleid=2&amp;action=delete&amp;file=keyword'}else{return false;}">&nbsp;
        <input type="submit" value=" 移动至 " class="btn" onclick="if(Dd('trade_id').value==0){alert('请选择会行业');return false;}this.form.action='?moduleid=2&amp;action=move&amp;file=keyword';">
        <select name="hy" id="trade_id">
            <option value="0">请选择</option>
            <?php foreach($trade_data as $v) { ?>
                <option value="<?php echo $v['m_trade_id'];?>" ><?php echo $v['m_trade_name'];?></option>;
            <?php } ?>
        </select>
    </div>
    </form>
    <script type="text/javascript">Menuon(1);</script>
    <script type="text/javascript">
        function is_reason() {
            return Dd('reason').value.length > 2 && Dd('reason').value != '操作原因';
        }
        function _check() {
            return true;
        }
        function _reject() {
            if((Dd('msg').checked || Dd('eml').checked) && !is_reason()) {
                alert('请填写操作原因或者拒绝通知');
                return false;
            }
            if(is_reason() && (!Dd('msg').checked && !Dd('eml').checked)) {
                alert('至少需要选择一种通知方式');
                return false;
            }
            return true;
        }
        function _cancel() {
            if((Dd('msg').checked || Dd('eml').checked) && !is_reason()) {
                alert('请填写操作原因或者取消通知');
                return false;
            }
            if(is_reason() && (!Dd('msg').checked && !Dd('eml').checked)) {
                alert('至少需要选择一种通知方式');
                return false;
            }
            return confirm('此操作不可撤销，确定要继续吗？');
        }
    </script>
    <br/>
<?php include tpl('footer');?>