$(function(){
	//删除右边列表提示的备注
	$('.ind_colse').on('click',function(){
		$('.industryManagement_right_prompt').remove();
	});
	//点击新增
	$('.indAdd').on('click',function(){
		$('.tips').show();//弹出模态框
		$('.tips_box_title').html('新增行业');//改变模态框的标题
	});
	//点击编辑
	$(document).on('click','.edit',function(){
		$('.tips').show();//弹出模态框
		$('.tips_box_title').html('编辑行业');//改变模态框的标题
		$('.indSubmit').addClass('editSubmit').removeClass('indSubmit');//添加编辑类名editSubmit，删除新增提交类名indSubmit
	});
	//关闭弹出的新增或者编辑模态框
	$('.tips_box_close').on('click',function(){
		$('.tips').hide();//关闭模态框
	})
	//删除当前的tr
	$(document).on('click','.delete',function(){
		$(this).parents('tr').remove();
	});
	//点击新增提交按钮
	$(document).on('click','.indSubmit',function(){
		var mydate = new Date();
		var indTime = mydate.getFullYear() + "-" + (mydate.getMonth() + 1) + "-" + mydate.getDate();//获取提交的时间
		var indSelectText = $('.indSelect').find("option:selected").text();//获取选择的行业值
		var indKeywords = $('.indKeywords').val();//获取关键词的值
		var indType=$('input:radio[name="radio"]:checked').val();//获取推送类型的值
		console.log(indTime,indSelectText,indKeywords,indType);
		if(indKeywords==''){//判断输入的关键词是否为空
			$('.indKeywords').css({'border':'1px solid red'});
			$('.tips_keyWords p').html('*关键字不能为空！');
			return false;
		}else{
			$('.indKeywords').css({'border':'1px solid #999'})
			$('.tips_keyWords p').html('');
		}		
		$('.tfoot').append('<tr><td>'+indTime+'</td><td>'+indSelectText+'</td><td>'+indKeywords+'</td><td>'+indType+'</td><td class="orange">无效</td><td><span class="edit">编辑 </span><span class="delete">移除</span></td></tr>')
		$('.tips').hide();
	});
	//点击编辑提交按钮
	$(document).on('click','.editSubmit',function(){
		console.log('编辑提交');
		$('.tips').hide();
	})
	//获取到输入关键词时执行事件
	$('.indKeywords').on('keydown',function(){
		$('.indKeywords').css({'border':'1px solid #999'});
		$('.tips_keyWords p').html('');
	});
})