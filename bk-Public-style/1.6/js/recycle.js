$(function(){
	ResetForm();//初始化表格
	
	//为还原按钮绑定单击事件
	$(document).on("click",".huanyuan_1",function(){
		CheckData();//判断数据长度
		
		//遍历每个选中的checkbox
		$("input[type='checkbox'][name='checkedres']:checked").each(function(){
			var id1 =  $(this).parents("tr").attr("name");//每条数据的id
			$("[name= '"+ id1 +"' ]").remove();//发起ajax
			console.log(id1);
			setTimeout(function(){
				success('操作成功');//操作成功提示
				ResetForm();//初始化表格
			},300);	
		})
	})
	
	//为删除按钮绑定单击事件
	$(document).on("click",".delete_1",function(){
		CheckData();//判断数据长度
		
		if($("input[type='checkbox'][name='checkedres']:checked").length==0){
			return false;
		}
		
		$(".delete-modal").fadeIn();
	
	})
	
	//为取消删除绑定单击事件
	$(document).on("click",".de_cancel_1",function(){
		$(".delete-modal").fadeOut();
	})
	
	//为确认删除绑定单击事件
	$(document).on("click",".de_confirm_1",function(){
		//遍历每个选中的checkbox
		$("input[type='checkbox'][name='checkedres']:checked").each(function(){
			var id1 =  $(this).parents("tr").attr("name");//每条数据的id
			$("[name= '"+ id1 +"' ]").remove();//发起ajax
			console.log(id1);
			setTimeout(function(){
				success('操作成功');//操作成功提示
				ResetForm();//初始化表格
			},300);	
		})
		$(".delete-modal").fadeOut();
	})
	
	//为还原按钮绑定单击事件
	$(document).on("click",".delete_1",function(){
		CheckData();//判断数据长度
		
		if($("input[type='checkbox'][name='checkedres']:checked").length==0){
			return false;
		}
	})
	
	//为搜索按钮绑定单击事件
	$(document).on("click",".search-btn2",function(){
		var keyWord = $(".search-input1").val();
		console.log(keyWord);//发起ajax
	})
	
	//监听用户键盘输入事件
	$(".search-input1").on("keydown", function(e) {
        if(e.keyCode == 13) {
           var keyWord = $(".search-input1").val();
           console.log(keyWord);//发起ajax
		   $(this).blur().val("");
        }
    })
})


//判断数据长度
function CheckData(){
	if($("#inbox_table tbody tr").length == 0){
		return false;
	}
}

//初始化表格
function ResetForm(){
	if($("#inbox_table tbody tr").length == 0){
		$("#checkall").prop("checked", false);//关闭全选
		$("#checkall").prop("disabled", "false");//禁用全选
		$("#inbox_table thead").hide();//隐藏表格头
		$(".xiansuo_Page_Div").hide();//隐藏分页器
	}
}

//操作成功提示
function success(text){
	 $(document.body).append('<div class="sucuess-modal"><div class="sucuess-modal-cell"><img src="../../Images/common_icon_success_nor.png" alt="" /><p class="is_state1">'+text+'</p></div></div>');
	 $(".sucuess-modal").fadeIn();
	 setTimeout(function(){
	 	$(".sucuess-modal").remove();	
    },1500);
}