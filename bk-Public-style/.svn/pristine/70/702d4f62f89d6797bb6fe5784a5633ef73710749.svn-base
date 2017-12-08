$(function(){
    loadDownFn();
	
    getHeight();//动态设置高度
    
    $(window).resize(function(){
        getHeight();
    })

	function loadDownFn(kewod,sx,page,size) {
	    $('.ajax_loadModal').fadeIn();
	    var page = 1;
	    var size = 20;
	    var datas = {'page':page,'size':size,'keyword':kewod,'sx':sx};
	    var result = '';
	    $.ajax({
	        type: 'POST',
	        url: pcGongHai,
	        data : datas,
	        dataType: 'json',
	        success: function(data) {
	            $('.xiansuo_List').html('');
	            $('.xiansuo_Page_div').html('');
	            console.log(data);
	            var length = data['list'].length;
	            for(var i=0;i<length;i++){
	                if(data['list'][i]['m_customer_level'] == 0){
	                    data['list'][i]['m_customer_level'] = '普通客户';
	                }else if(data['list'][i]['m_customer_level'] == 1){
	                    data['list'][i]['m_customer_level'] ='小客户';
	                }else if(data['list'][i]['m_customer_level'] == 2){
	                    data['list'][i]['m_customer_level'] ='主要客户';
	                }else if(data['list'][i]['m_customer_level'] == 3){
	                    data['list'][i]['m_customer_level'] ='VIP客户';
	                }
	                data['list'][i]['m_customer_tel'] = data['list'][i]['m_customer_tel']?data['list'][i]['m_customer_tel']:'暂无' ;
	                data['list'][i]['m_customer_address'] = data['list'][i]['m_customer_address']?data['list'][i]['m_customer_address']:'暂无';
	
	                result +=
	                '<li name="'+data['list'][i]['m_customer_id']+'">'+
	                        '<div class="xiansuo_List_no1">'+
	                        '<label class="checkbox" onselectstart="return false;">'+
	                        '<input type="checkbox" class="vam" name="checkedres" />'+
	                        '<i></i>'+
	                        '</label>'+
	                        '<div class="xiansuo_List_title">'+data['list'][i]['m_customer_company_name']+'</div>'+
	                        '</div>'+
	                        '<div class="xiansuo_List_dets">'+
	                        '<div class="xiansuo_List_dets_lf">'+
	                        '<div class="xiansuo_List_dets_div1">'+'联系人：'+'<span class="xiansuo_List_dets_span1">'+data['list'][i]['lxr']+'</span>'+'</div>'+
	                        '<div class="xiansuo_List_dets_div1">'+'电&nbsp;&nbsp;&nbsp;话：'+'<span class="xiansuo_List_dets_span1">'+data['list'][i]['m_customer_tel']+'</span>'+'</div>'+
	                        '<div class="xiansuo_List_dets_div1">'+'地&nbsp;&nbsp;&nbsp;址：'+'<span class="xiansuo_List_dets_span1">'+data['list'][i]['m_customer_address']+'</span>'+'</div>'+
	                        '</div>'+
	                        '<div class="xiansuo_List_dets_rt">'+
	                        '<div class="xiansuo_List_dets_div1">'+'客户级别：'+'<span class="xiansuo_List_dets_span1">'+data['list'][i]['m_customer_level']+'</span>'+'</div>'+
	                        '<div class="xiansuo_List_dets_div1">'+'主营产品：'+'<span class="xiansuo_List_dets_span1">'+data['list'][i]['m_customer_main_products']+'</span>'+'</div>'+
	                    '<div class="xiansuo_List_dets_div1">'+'商&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;机：'+'<span class="xiansuo_List_dets_span1">'+data['list'][i]['business']+'</span>'+'</div>'+
	                    '</div>'+
	                    '<div class="chakan_lianxi1">'+
	                        '<span class="ck-phone-val">查看详情</span>'+
	                        '<input type="hidden" value="'+data['list'][i]['m_customer_id']+'"/>'+
	                        '</div>'+
	                        '</div>'+
	                        '<div class="xiansuo_border"></div>'+
	                        '<input type="hidden" value="13268036998" class="tel_val"/>'+
	                        '<input type="hidden" value="642307404@qq.com" class="email_val"/>'+
	                        '</li>';
	            }
            	//为了测试，延迟1秒加载
                setTimeout(function() {
                    //如果小于10或者等于0
                    if(length < 10 || length == 0) {
                        //console.log("小于10",arrLen);
                        $('.xiansuo_List').append(result);
                        $('.xiansuo_Page_div').append(data.page);
                        $('.ajax_loadModal').hide();
						getHeight();
                    	if($(".xiansuo_List li").length == 0){//如果页面的li长度等于0
                    		$("#checkall").prop("checked", false);//关闭全选
                    		$("#checkall").prop("disabled", "false");//禁用全选
                    		$(".xiansuo_Page_Div").hide();//隐藏分页器
                    	}else{
                    		$("#checkall").removeProp("checked");//移除禁用
                    		$("#checkall").removeProp("disabled");//移除禁用
                    		$(".xiansuo_Page_Div").show();//显示分页器
                    	}
                    }else{
                       // console.log("大于10");
                        $('.xiansuo_List').append(result);
                        $('.xiansuo_Page_div').append(data.page);
                        $('.ajax_loadModal').hide();
						getHeight();
                    	if($(".xiansuo_List li").length == 0){//如果页面的li长度等于0
                    		$("#checkall").prop("checked", false);//关闭全选
                    		$("#checkall").prop("disabled", "false");//禁用全选
                    		$(".xiansuo_Page_Div").hide();//隐藏分页器
                    	}else{
                    		$("#checkall").removeProp("checked");//移除禁用
                    		$("#checkall").removeProp("disabled");//移除禁用
                    		$(".xiansuo_Page_Div").show();//显示分页器
                    	}
                    }
                },150);
	        }
	    })
	}
    
    $(document).on("click",".search-btn",function(){
        //获取input框内容
        var inputtext = $(".search-input").val();
        $('.xiansuo_List').empty();
        loadDownFn(inputtext);
    })
    
    $(document).on("keydown",'.search-input', function(e) {//监听键盘事件
        console.log(e);
        if(e.keyCode == 13) {
            var inputtext = $(".search-input").val();
            $('.xiansuo_List').empty();
            loadDownFn(inputtext);
        }
    })

    $(document).on("click",".gonghai_hdleft>ul li",function(){
        var indexL = $(this).index();
        console.log(indexL);
        if(indexL == 1){
            $('.xiansuo_List').empty();
            loadDownFn(kewod,indexL);
            $(".gonghai_hdleft>ul li:eq(0)").addClass("active").siblings().removeClass("active")
        }else if(indexL == 2){
            $('.xiansuo_List').empty();
            loadDownFn(kewod,indexL)
            $(".gonghai_hdleft>ul li:eq(1)").addClass("active").siblings().removeClass("active")
        }else if(indexL == 3){
            $('.xiansuo_List').empty();
            loadDownFn(kewod,indexL)
            $(".gonghai_hdleft>ul li:eq(2)").addClass("active").siblings().removeClass("active")
        }
    })
    
    //点击查看详情
    $(document).on("click",".chakan_lianxi1",function(){
        $('.ajax_loadModal').fadeIn();
        var gonghai_id = $(this).find('input').val();
        $('.modal-box').empty();
        $(".modal-box").show();
        var url = pcGongHaiList+'?gonghai_id='+gonghai_id;
        var result = '';
        $.ajax({
            type: 'GET',
            url : url,
            dataType: 'json',
            success: function(data){
                if(data.status != 1){
                    alert(data.message);
                    return;
                }
                if(data['m_customer_level'] == 0){
                    data['m_customer_level'] = '普通客户';
                }else if(data['m_customer_level'] == 1){
                    data['m_customer_level'] ='小客户';
                }else if(data['m_customer_level'] == 2){
                    data['m_customer_level'] ='主要客户';
                }else if(data['m_customer_level'] == 3){
                    data['m_customer_level'] ='VIP客户';
                }
                data['m_customer_tel'] = data['m_customer_tel']?data['m_customer_tel']:'暂无' ;
                data['m_customer_address'] = data['m_customer_address']?data['m_customer_address']:'暂无';
                data['m_customer_mail'] = data['m_customer_mail']?data['m_customer_mail']:'暂无';
                data['m_customer_fax'] = data['m_customer_fax']?data['m_customer_fax']:'暂无';
                data['m_customer_mobile'] = data['m_customer_mobile']?data['m_customer_mobile']:'暂无';
                data['m_customer_m_trade_id'] = data['m_customer_m_trade_id']?data['m_customer_m_trade_id']:'暂无';
                data['m_customer_url'] = data['m_customer_url']?data['m_customer_url']:'暂无';

                result +=
                '<div class="ClientDetails">'+
            '<div class="DetailsTitle">'+
                '<span>客户详情<a class="close-X"></a></span>'+
           ' </div>'+
            '<div class="DatailsButton">'+
                '<span class="xz-lx" style="display: none">新增</span>'+
                '<input type="hidden" value="'+data['m_customer_id']+'" id="user_kehu_id"/>'+
            '</div>'+
           ' <div class="TabDatails">'+
               ' <!--选项卡-->'+
                '<ul>'+
                   ' <li class="activeBottom">客户信息</li>'+
                   ' <li>商机</li>'+
                   ' <li>联系人</li>'+
                '</ul>'+
                '<!--客户信息-->'+
                '<div class="TextDatails" >'+
                    '<div class="xiansuo_des_contents">'+
                    '<div class="xiansuo_des_contents_cell">'+
                        '<span class="span_lf1">客户名称：</span><span class="span_rt1">'+data['m_customer_company_name']+'</span>'+
                    '</div>'+
                    '<div class="xiansuo_des_contents_cell">'+
                        '<span class="span_lf1">客户级别：</span><span class="span_rt1">'+data['m_customer_level']+'</span>'+
                    '</div>'+
                    '<div class="xiansuo_des_contents_cell">'+
                        '<span class="span_lf1">电<span class="text_between">话</span>：</span><span class="span_rt1">'+data['m_customer_fax']+'</span>'+
                    '</div>'+
                    '<div class="xiansuo_des_contents_cell">'+
                        '<span class="span_lf1">邮<span class="text_between">箱</span>：</span><span class="span_rt1">'+data['m_customer_mail']+'</span>'+
                    '</div>'+
                    '<div class="xiansuo_des_contents_cell">'+
                        '<span class="span_lf1">手<span class="text_between">机</span>：</span><span class="span_rt1">'+data['m_customer_mobile']+'</span>'+
                    '</div>'+
                    '<div class="xiansuo_des_contents_cell">'+
                        '<span class="span_lf1">网<span class="text_between">址</span>：</span><span class="span_rt1">'+data['m_customer_url']+'</span>'+
                    '</div>'+
                    '<div class="xiansuo_des_contents_cell">'+
                        '<span class="span_lf1">地<span class="text_between">址</span>：</span><span class="span_rt1">'+data['m_customer_address']+'</span>'+
                    '</div>'+
                    '<div class="xiansuo_des_contents_cell">'+
                        '<span class="span_lf1">行<span class="text_between">业</span>：</span><span class="span_rt1">'+data['m_customer_m_trade_id']+'</span>'+
                    '</div>'+
                    '<div class="xiansuo_des_contents_cell">'+
                        '<span class="span_lf1">主营产品：</span><span class="span_rt1">'+data['m_customer_main_products']+'</span>'+
                    '</div>'+
                    '<div class="xiansuo_des_contents_cell">'+
                        '<span class="span_lf1">创建时间：</span><span class="span_rt1">'+data['m_customer_rdatetime']+'</span>'+
                    '</div>'+
                    '<div class="xiansuo_des_contents_cell">'+
                        '<span class="span_lf1">备<span class="text_between">注</span>：</span><span class="span_rt1">'+data['m_customer_remark']+'</span>'+
                    '</div>'+
                ' </div>'+
                '</div>'+
                '<!--商机-->'+
                '<div class="shangji" style="display: none;">'+
                    '<ul>';
                    var leng = data["sj"].length;
                    for(var i=0;i<leng;i++){
                        result +='<li>'+
                           '<p>'+data["sj"][i].m_business_rdatetime+'</p>'+
                           '<input type="hidden" value="'+data["sj"][i]['m_business_id']+'" id="user_sj_id"/>'+
                            '<span>'+data["sj"][i].m_business_remark+'</span>'+
                            '<i></i>'+
                        '</li>';
                    }
                   result += '</ul>'+
                '</div>'+
                '<!--联系人-->'+
                '<div class="Contact" style="display: none;">'+
                    '<!--title-->'+
                    '<ul>'+
                        '<li style="width: 128px">联系人</li>'+
                        '<li style="width: 156px">手机</li>'+
                        '<li style="width: 216px">邮件</li>'+
                        '<li style="width: 162px">职位</li>'+
                        '<li style="width: 122px">部门</li>'+
                        '<li style="width: 170px;border-right:none">操作</li>'+
                    '</ul>'+
                    '<!--内容-->';
                    var length = data['lxr'].length;
                    for(var i=0;i<length;i++){
                        result +='<ul class="TextUL">'+
                            '<input type="hidden" value="'+data["lxr"][i]['m_contact_id']+'"/>'+
                            '<li style="width: 128px">'+data['lxr'][i]['m_contact_name']+'</li>'+
                            '<li style="width: 156px">'+data['lxr'][i]['m_contact_mobile']+'</li>'+
                            '<li style="width: 216px">'+data['lxr'][i]['m_contact_mail']+'</li>'+
                            '<li style="width: 162px">'+data['lxr'][i]['m_contact_job']+'</li>'+
                            '<li style="width: 122px">'+data['lxr'][i]['m_contact_department']+'</li>'+
                            '<li style="width: 176px"><span></span><i></i></li>'+
                        '</ul>';
                    }
                result +='</div>'+
            '</div>'+
        '</div>';
        $('.ajax_loadModal').hide();
            $('.modal-box').append(result);
            }
        })
    })

    //阻止div事件冒泡到其他元素
    $(document).on("click", ".zdy_timer_div", function(e) {
        e.stopPropagation();
    })

    //为分页器每个li绑定单击事件
    $(document).on("click",".xiansuo_Page_list li",function(){
        var index = $(this).index();
        var page = $(this).html();
        $(this).addClass("active").siblings().removeClass("active");
        $(".that_Page").val(page);              
        var page_keyword = $('.search-input').val();      
        var sx = $('.gonghai_hdleft>ul').find('.active').index();                                                       
        var page_size= $('.xiansuo_Page_Three').val();
        // loadDownFn(kewod='',sx=1,page='1',size='10')
        loadDownFn(page_keyword,sx,page,page_size);               
    })

    //为跳转至输入框监听键盘事件
    $(document).on("keydown",".that_Page",function(e){
        var page = $(this).val();
        var num = $('#xiansuo_pages_count').html();
        if(page>num){
            page=1;
        }               
        var page_keyword = $('.search-input').val();      
        var sx = $('.gonghai_hdleft>ul').find('.active').index();                                                       
        var page_size= $('.xiansuo_Page_Three').val();
        if(e.keyCode==13){
            loadDownFn(page_keyword,sx,page,page_size);               
        }
    })

    //为首页判定事件
    $(document).on('click','.first_page',function(e){
        var page = 1;               
        var page_keyword = $('.search-input').val();      
        var sx = $('.gonghai_hdleft>ul').find('.active').index();                                                       
        var page_size= $('.xiansuo_Page_Three').val();
        loadDownFn(page_keyword,sx,page,page_size); 
        e.stopPropagation();
    })

    //为上一页绑定事件
    $(document).on('click','.prev_page',function(e){
        var page = $(this).attr('name');                
        var page_keyword = $('.search-input').val();      
        var sx = $('.gonghai_hdleft>ul').find('.active').index();                                                       
        var page_size= $('.xiansuo_Page_Three').val();
        loadDownFn(page_keyword,sx,page,page_size); 
        e.stopPropagation();
    })

    //为下一页绑定事件
    $(document).on('click','.next_page',function(e){
        var page = $(this).attr('name');            
        var page_keyword = $('.search-input').val();      
        var sx = $('.gonghai_hdleft>ul').find('.active').index();                                                       
        var page_size= $('.xiansuo_Page_Three').val();
        loadDownFn(page_keyword,sx,page,page_size); 
        e.stopPropagation();
    })

    //为尾页绑定事件
    $(document).on('click','.last_page',function(e){
        var page = $(this).attr('name');                
        var page_keyword = $('.search-input').val();      
        var sx = $('.gonghai_hdleft>ul').find('.active').index();                                                       
        var page_size= $('.xiansuo_Page_Three').val();
        loadDownFn(page_keyword,sx,page,page_size); 
        e.stopPropagation();
    })

    //default为正常  true为作废   false为恢复   biaoji为标记

    //为恢复按钮绑定单击事件
    $(document).on("click",".btnlist_huifu",function(){
        console.log(123);
        $(".delete-modal").fadeIn();

        if($(".xiansuo_List li").length == 0){
            return false;
        }
    })

     $(document).on("click",".huifu01",function(){
        console.log(2123);
        if($(".xiansuo_List li").length == 0){
            return false;
        }
        if($("input[type='checkbox'][name='checkedres']:checked").length==0){
            return false;
        }
        $(".delete-modal").fadeIn();
    })


    //为删除按钮绑定单击事件
    $(document).on("click",".btnlist_delete",function(){
        if($(".xiansuo_List li").length == 0){
            return false;
        }

        if($("input[type='checkbox'][name='checkedres']:checked").length==0){
            return false;
        }

        $(".delete-modal3").fadeIn();
    })

    //为线索列表确认按钮绑定单击事件
    $(document).on("click",".de_confirm_11",function(){
        $('.ajax_loadModal').fadeIn();
        var delte_id = '';
        //遍历每个选中的checkbox
        $("input[type='checkbox'][name='checkedres']:checked").each(function(){
            divids =  $(this).parents("li").attr("name");//每条数据的id
            delte_id += divids+",";
            console.log(divids);
            if($(".xiansuo_List li").length == 0){//如果页面的li长度等于0
                $("#checkall").prop("disabled", "false");//禁用全选
                $(".xiansuo_Page_border").hide();//隐藏分割线
                $(".xiansuo_Page_div").hide();//隐藏分页器
            }
        })
        $(".delete-modal3").fadeOut();
        var url = pcDelGongHai;
        $.post(url,{'delte_id':delte_id},function(data){
            $('.ajax_loadModal').hide();
            var leng = data.divids.length;
            //console.log(data);
            if(data.status == 1){
                error(data.data);
            }else{
                success('操作成功');
                for(var i=0;i<leng;i++){
                	$("#checkall").prop("checked", false);//关闭全选
                    $("[name= '"+ data.divids[i] +"' ]").remove();//发起ajax
                }
            }
        },'json');
    })

    $(document).on("click",".de_confirm_110",function(){
        $('.ajax_loadModal').fadeIn();
        var huifu_id = '';
        //遍历每个选中的checkbox
        $("input[type='checkbox'][name='checkedres']:checked").each(function(){
            divids =  $(this).parents("li").attr("name");//每条数据的id
            huifu_id += divids+",";
            console.log(divids);
            if($(".xiansuo_List li").length == 0){//如果页面的li长度等于0
                $("#checkall").prop("disabled", "false");//禁用全选
                $(".xiansuo_Page_border").hide();//隐藏分割线
                $(".xiansuo_Page_div").hide();//隐藏分页器
            }
        })
        $(".delete-modal").fadeOut();
        var url = pcHuiFu;
        $.post(url,{'huifu_id':huifu_id},function(data){
            var leng = data.divids.length;
            console.log(data);
            $('.ajax_loadModal').hide();
            if(data.status == 1){
                error(data.data);
            }else{
                success('操作成功');
                for(var i=0;i<leng;i++){
                    $("#checkall").prop("checked", false);//关闭全选
                    $("[name= '"+ data.divids[i] +"' ]").remove();//发起ajax
                }
            }
        },'json');
    })
    

    //各个按钮点击事件
    $(document).on("click",".bian",function(){
        $(".bj-kehu02>.bj-top>p").html('<p>编辑客户<span class="bj-top-span">&times;</span></p>');
        $(".modal-box-2").fadeIn();
        $(".bj-kehu02").fadeIn();
        $(".bj-kehu01").fadeOut();
        $(".bj-kehu03").fadeOut();
    })
    
    $(document).on("click",".fangqi",function(){
        $(".delete-modal").fadeIn();
    })
    
    $(document).on("click",".xz-lx",function(){
        $('.ajax_loadModal').fadeIn();
        $(".bj-kehu01>.bj-top>p").html('<p>新增联系人<span class="bj-top-span">&times;</span></p>');
        $(".modal-box-2").fadeIn();
        $(".bj-kehu01").fadeIn();
        $(".bj-kehu02").fadeOut();
        $(".bj-kehu03").fadeOut();
        var id = $("#user_kehu_id").val();
        var url = pcAddSj+"?id="+id;
        $.get(url,function(data){
            if(data.status != 1){ 
                $('.ajax_loadModal').hide();
                $('input[name=lxr_user_name]').val(data.data);
            }else{
                $('.ajax_loadModal').hide();
                error(data.data);
            }
        },'json');
    })
    
    $(document).on("click",".xz-sj",function(){
        $(".modal-box-2").fadeIn();
        $(".bj-kehu03").fadeIn();
        $(".bj-kehu02").fadeOut();
        $(".bj-kehu01").fadeOut();
    })

    //为放弃按钮绑定单击事件
    $(document).on("click",".xiansuo_hdleft_btnlist",function(){
        if($(".xiansuo_List li").length == 0){
            return false;
        }
        
        if($("input[type='checkbox'][name='checkedres']:checked").length==0){
			return false;
		}
        
        $(".delete-modal1").fadeIn();
    })

    //为列表取消按钮绑定单击事件
    $(document).on("click",".de_cancel_11",function(){
        $(".delete-modal1").fadeOut();
    })

    //为列表确认按钮绑定单击事件
    $(document).on("click",".de_confirm_11",function(){
        //遍历每个选中的checkbox
        $("input[type='checkbox'][name='checkedres']:checked").each(function(){
            divids =  $(this).parents("li").attr("name");//每条数据的id
            $("[name= '"+ divids +"' ]").remove();//发起ajax
            console.log(divids);
            if($(".xiansuo_List li").length == 0){//如果页面的li长度等于0
                $("#checkall").prop("checked", false);//关闭全选
                $("#checkall").prop("disabled", "false");//禁用全选
                $(".xiansuo_Page_border").hide();//隐藏分割线
                $(".xiansuo_Page_div").hide();//隐藏分页器
            }
        })
        $(".delete-modal1").fadeOut();
    })

    //子复选框的事件函数
    $(document).on("click","input[name=checkedres]",function(){
        setSelectAll();
    })

    //表单验证
    function check(){
        var kename = $(".kename").val();
        var ketel = $(".ketel").val();
        var keEmail = $(".keEmail").val();
        var lxEmail = $(".lxEmail").val();
        var lxren = $(".lxren").val();
        var numreg = /^1(3|4|5|7|8)\d{9}$/;
        var emailreg = /^[a-z0-9-_.]+@[\da-z][\.\w-]+\.[a-z]{2,4}$/i;
        if(kename =='' || ketel =='' ||keEmail =='') {
            $(".sucuess-modal-box02").fadeIn()
            setTimeout(function(){
                $(".sucuess-modal-box02").fadeOut();
            },1500);
        } else if(!numreg.test(ketel)) {
            message("手机号码有误，请重填");
        }else if(!emailreg.test(keEmail)) {
            message("你的邮箱有误，请重填");
        }else  {
            $(".sucuess-modal-box01").fadeIn()
            setTimeout(function(){
                $(".sucuess-modal-box01").fadeOut();
            },1500);
        }
    }
    function checklx(){
        var lxname = $(".lxname").val();
        var lxtel = $(".lxtel").val();
        var lxEmail = $(".lxEmail").val();
        var lxren = $(".lxren").val();
        var lxshengri = $('input[name=lxr_birthday]').val();
        var numreg = /^1(3|4|5|7|8)\d{9}$/;
        var tel  =  /^((\+?[0-9]{2,4}\-[0-9]{3,4}\-)|([0-9]{3,4}\-))?([0-9]{7,8})(\-[0-9]+)?$/;
        var emailreg = /^[a-z0-9-_.]+@[\da-z][\.\w-]+\.[a-z]{2,4}$/i;
        var shengri = /^((((1[6-9]|[2-9]\d)\d{2})-(0?[13578]|1[02])-(0?[1-9]|[12]\d|3[01]))|(((1[6-9]|[2-9]\d)\d{2})-(0?[13456789]|1[012])-(0?[1-9]|[12]\d|30))|(((1[6-9]|[2-9]\d)\d{2})-0?2-(0?[1-9]|1\d|2[0-8]))|(((1[6-9]|[2-9]\d)(0[48]|[2468][048]|[13579][26])|((16|[2468][048]|[3579][26])00))-0?2-29-))$/;

        if(lxname =='' || lxtel =='' ||lxren =='') {
            $(".sucuess-modal-box02").fadeIn()
            setTimeout(function(){
                $(".sucuess-modal-box02").fadeOut();
            },1500);
        } else if(!numreg.test(lxtel) && !tel.test(lxtel)) {
            message("手机号码有误，请重填");
        }else if($(".lxEmail").val().length !=0){
            if(!emailreg.test(lxEmail)) {
                message("你的邮箱有误，请重填");
            }
        }else if($('input[name=lxr_birthday]').val().length !=0){
            if(!shengri.test(lxshengri)){
                message('您输入的生日格式错误');
            }
        }
    }

    $(document).on("click",".TabDatails>ul li",function(){
        var index = $(this).index();
        if(index==0){
            $(".xiansuo_des_content1").fadeOut();
            $(".shangji").fadeOut();
            $(".Contact").fadeOut();
            $(".TextDatails").fadeIn();
            $(".fangqi").fadeIn();
            $(".bian").fadeIn();
            $(".xz-lx").hide();
            $(".xz-sj").hide();
        }else if(index==1){
            $(".xiansuo_des_content1").fadeOut();
            $(".Contact").fadeOut();
            $(".TextDatails").fadeOut();
            $(".shangji").fadeIn();
            $(".fangqi").hide();
            $(".bian").hide();
            $(".xz-lx").hide();
            $(".xz-sj").fadeIn();
        }else if(index==2){
            $(".xiansuo_des_content1").fadeOut();
            $(".shangji").fadeOut();
            $(".TextDatails").fadeOut();
            $(".Contact").fadeIn();
            $(".bian").fadeIn();
            $(".fangqi").hide();
            $(".bian").hide();
            $(".xz-lx").fadeIn();
            $(".xz-sj").hide();
        }else if(index==3){
            $(".Contact").fadeOut();
            $(".bian").fadeOut();
            $(".shangji").fadeOut();
            $(".TextDatails").fadeOut();
            $(".xiansuo_des_content1").fadeIn();
            $(".fangqi").hide();
            $(".bian").hide();
            $(".xz-lx").hide();
            $(".xz-sj").hide();
        }
        //console.log(index);
        //console.log($(this));
        $(this).addClass("activeBottom").siblings().removeClass("activeBottom");
    })
    
    //点击首屏新增客户
    $(document).on("click",".xiansuo_hdright>.dingyue_cgMsgBtn02",function(){
        $(".bj-kehu02>.bj-top>p").html('<p>新增客户<span class="bj-top-span">&times;</span></p>');
        $(".modal-box-2").show();
        $(".bj-kehu02").show();
        $(".bj-kehu01").fadeOut();
        $(".bj-kehu03").fadeOut();
    })

    //新增联系人保存
    $(document).on("click",".bj-btn4",function(){
        var tj = $('#bjzxlxr p').text().split('×')[0];
        checklx();
        var lxr_customer_id = $("#user_kehu_id").val();
        var lxr_name = $('input[name=lxr_name]').val();
        var lxr_mobile = $('input[name=lxr_mobile]').val();
        var lxr_mail = $('input[name=lxr_email]').val();
        var lxr_weixin = $('input[name=lxr_weixin]').val();
        var lxr_job = $('input[name=lxr_job]').val();
        var lxr_department = $('input[name=lxr_department]').val();
        var lxr_birthday = $('input[name=lxr_birthday]').val();
        var lxr_resume = $('textarea[name=lxr_resume]').val();
        if( tj == '新增联系人'){
            $('.ajax_loadModal').fadeIn();
            var url = pcAddLxr;
            var data = {'customer_id':lxr_customer_id,'name':lxr_name,'mobile':lxr_mobile,'mail':lxr_mail,'weixin':lxr_weixin,'job':lxr_job,'department':lxr_department,'birthday':lxr_birthday,'resume':lxr_resume}
            var result = '';
            $.post(url,data,function(data){
                if(data.status == 1){
                    error(data.data);
                    $('.ajax_loadModal').hide();
                    return;
                }else{
                    success('操作成功');
                    result +='<ul class="TextUL">'+
                                '<input type="hidden" value="'+data.data['m_contact_id']+'"/>'+
                                '<li style="width: 128px">'+data.data['m_contact_name']+'</li>'+
                                '<li style="width: 156px">'+data.data['m_contact_mobile']+'</li>'+
                                '<li style="width: 216px">'+data.data['m_contact_mail']+'</li>'+
                                '<li style="width: 162px">'+data.data['m_contact_job']+'</li>'+
                                '<li style="width: 122px">'+data.data['m_contact_department']+'</li>'+
                                '<li style="width: 176px"><span></span><i></i></li>'+
                            '</ul>';
                    $('.Contact').append(result);
                    $(".sucuess-modal-box01").fadeIn()
                    setTimeout(function(){
                        $(".sucuess-modal-box01").fadeOut();
                    },1000);
                    $(".modal-box-2").css({
                        "display": "none"
                    })
                    $(".bj-kehu01").css({
                        "display": "none"
                    })
                    $(".bj-kehu02").css({
                        "display": "none"
                    })
                    $(".bj-kehu03").css({
                        "display": "none"
                    })
                    var inputEmpty = $(".bj-center input");
                    var textareaEmpty = $(".bj-center textarea");
                    inputEmpty.val("");
                    textareaEmpty.val("");
                    $('.ajax_loadModal').hide();
                    return;
                }
            },'json')
        }else if(tj == "修改联系人"){
            $('.ajax_loadModal').fadeIn();
            var url = pcUpdLxr;
            var lxr_id = $('input[name=lxr_id]').val();
            var data = {'customer_id':lxr_customer_id,'name':lxr_name,'mobile':lxr_mobile,'mail':lxr_mail,'weixin':lxr_weixin,'job':lxr_job,'department':lxr_department,'birthday':lxr_birthday,'resume':lxr_resume,'lxr_id':lxr_id}
            $.post(url,data,function(data){
                if(data.status == 1){
                    error(data.data);
                    $('.ajax_loadModal').hide();
                    return;
                }else{
                    success('操作成功');
                    var top = $('.Contact').children();
                    var toplenth = top.length;
                    for(var i=0;i<toplenth;i++){
                        var lxrtj = $(top[i]).find('input[type=hidden]').val();
                        if(lxrtj == data.data.m_contact_id){
                            $(top[i]).find('input[type=hidden]').next().html(data.data.m_contact_name);
                            $(top[i]).find('input[type=hidden]').next().next().html(data.data.m_contact_mobile);
                            $(top[i]).find('input[type=hidden]').next().next().next().html(data.data.m_contact_mail);
                            $(top[i]).find('input[type=hidden]').next().next().next().next().html(data.data.m_contact_job);
                            $(top[i]).find('input[type=hidden]').next().next().next().next().next().html(data.data.m_contact_department);
                        }
                    }
                    // return;
                    $(".sucuess-modal-box01").fadeIn()
                    setTimeout(function(){
                        $(".sucuess-modal-box01").fadeOut();
                    },1000);
                    $(".modal-box-2").css({
                        "display": "none"
                    })
                    $(".bj-kehu01").css({
                        "display": "none"
                    })
                    $(".bj-kehu02").css({
                        "display": "none"
                    })
                    $(".bj-kehu03").css({
                        "display": "none"
                    })
                    var inputEmpty = $(".bj-center input");
                    var textareaEmpty = $(".bj-center textarea");
                    inputEmpty.val("");
                    textareaEmpty.val("");
                    $('.ajax_loadModal').hide();
                    return;
                }
            },'json')
        }
    })
    
    //编辑客户保存
    $(document).on("click",".bj-btn3",function(){
        check();
    })
    
    //新增商机保存
    $(document).on("click",".bj-btn5",function(){
        check();
    })
    
    //放弃点击确认后
    $(document).on("click",".de_confirm_1",function(){
        $(".delete-modal").fadeOut();//发起ajax
        $(".sucuess-modal-box01").fadeIn();
        setTimeout(function(){
            $(".sucuess-modal").fadeOut();
        },1500);
    })
    
    //放弃点击取消后
    $(document).on("click",".de_cancel_1",function(){
        $(".delete-modal").hide();
    })
    
    //点击删除商机
    $(document).on("click",".shangji>ul li>i",function(){
        var thi = $(this);
        var id  = $("#user_kehu_id").val();
        var sj_id = $('#user_sj_id').val();
        var url = pcDelSj+"?id="+id+"&sj_id="+sj_id;
        $.get(url,function(data){
            if(data.status == 0){
                success('操作成功');
                thi.parent().remove();
            }else{
                error(data.data);
            }
        },'json');
    })
    
    //点击删除联系人
    $(document).on("click",".TextUL li>i",function(){
        $('.ajax_loadModal').fadeIn();
        var thi = $(this);
        var lxr_id = $(this).parent().parent().find('input[type=hidden]').val();
        var kehu_id= $("#user_kehu_id").val();
        var url    = pcDelLxr+"?lxr_id="+lxr_id+"&kehu_id="+kehu_id;
        $.get(url,function(data){
            $('.ajax_loadModal').hide();
            if(data.status == 0){
                success('操作成功');
                console.log(123);
                thi.parent().parent().remove();
            }else{
                error(data.data);
            }
        },'json');
    })
    
    $(document).on("click",".TextUL li>span",function(){
        $('.ajax_loadModal').fadeIn();
        var lxr_id = $(this).parent().parent().find('input[type=hidden]').val();
        $('input[name=lxr_id]').val(lxr_id);
        var kehu_id= $("#user_kehu_id").val();
        var url    = pcUpdLxr+"?lxr_id="+lxr_id+"&kehu_id="+kehu_id;
        $.get(url,function(data){
            $('input[name=lxr_user_name]').val(data.user_kehu_name);
            $('input[name=lxr_name]').val(data.m_contact_name);
            $('input[name=lxr_mobile]').val(data.m_contact_mobile);
            $('input[name=lxr_email]').val(data.m_contact_mail);
            $('input[name=lxr_weixin]').val(data.m_contact_weixin);
            $('input[name=lxr_job]').val(data.m_contact_job);
            $('input[name=lxr_department]').val(data.m_contact_department);
            $('input[name=lxr_birthday]').val(data.m_contact_birthday);
            $('textarea[name=lxr_resume]').val(data.m_contact_resume);
            $('.ajax_loadModal').hide();
        },'json');
        $(".bj-kehu01>.bj-top>p").html('<p>修改联系人<span class="bj-top-span">&times;</span></p>');
        $(".modal-box-2").fadeIn();
        $(".bj-kehu01").fadeIn();
        $(".bj-kehu02").fadeOut();
        $(".bj-kehu03").fadeOut();
    })
    
    //点击关闭第一重模态框
    $(document).on("click",".close-X",function(){
        $(".modal-box").css({
            "display": "none"
        })
    })
    
    //点击取消和X关闭第二重模态框
    $(document).on("click",".bj-top-span,.bj-btn1",function(){
        var inputEmpty =$(".bj-center input");
        var textareaEmpty =$(".bj-center textarea");
        var optionEmpty =$(".bj-center select");
        optionEmpty.val(1)
        inputEmpty.val("");
        textareaEmpty.val("");
        $(".modal-box-2").css({
            "display": "none"
        })
        $(".bj-kehu01").css({
            "display": "none"
        })
        $(".bj-kehu02").css({
            "display": "none"
        })
        $(".bj-kehu03").css({
            "display": "none"
        })

    })
    
    //联系人界面开始
    //点击首屏编辑ico按钮
    $(document).on("click",".Contact-BJ",function(){
        $(".modal-box").show();
    })

    $(document).on("click",".BianContact",function(){
        $(".bj-kehu01>.bj-top>p").html('<p>修改联系人<span class="bj-top-span">&times;</span></p>');
        $(".modal-box-2").fadeIn();
        $(".bj-kehu01").fadeIn();
    })
    
    $(document).on("click",".DeleteContact",function(){
        $(".delete-modal").fadeIn();
    })
    
    $(document).on("click",".de_confirm_112",function(){
        $(".modal-box").fadeOut();
    })
    
    $(document).on("click",".dingyue_cgMsgBtn01",function(){
        $(".bj-kehu01>.bj-top>p").html('<p>新增联系人<span class="bj-top-span">&times;</span></p>');
        $(".modal-box-2").fadeIn();
        $(".bj-kehu01").fadeIn();
    })
})

//定义获取高度方法
function getHeight(){
	var height = $(window).height();
	var topAllH = $(".left_header").height()+$(".xiansuo_header").height();
	var FPageH = $(".xiansuo_Page_Div").height();
	var wrapH = height - (topAllH + FPageH);
	$(".left_template,.right_template").height(height);
	$(".gonghai_main").height(height-topAllH-15);//公海外层容器高度
	$(".xiansuo_List").height(wrapH-18);//公海列表内容高度
}

//全选、反选的事件函数
function selectAll(){
    console.log($("#checkall").prop("checked"));
    if ($("#checkall").prop("checked")) {
        console.log("全选");
        $("input[type='checkbox'][name='checkedres']").prop("checked",true);//全选
    } else {
        console.log("反选");
        $("input[type='checkbox'][name='checkedres']").prop("checked",false);//反选
    }
}

//子复选框的事件函数
function setSelectAll(){
    //当没有选中某个子复选框时，SelectAll取消选中
    if (!$("input[type='checkbox'][name='checkedres']").checked) {
        console.log("不满足,取消全选");
        $("#checkall").prop("checked", false);
    }
    var chsub = $("input[type='checkbox'][name='checkedres']").length;//获取subcheck的个数
    var checkedsub = $("input[type='checkbox'][name='checkedres']:checked").length;//获取选中的subcheck的个数
    if (checkedsub == chsub) {
        console.log("满足,开启全选");
        $("#checkall").prop("checked", true);
    }
}