$(function(){
    getHeight(); //动态设置高度

	$(window).resize(function(){
        getHeight();
    })

    pcContactList();

    function pcContactList(kewod,page,size){
        $('.ajax_loadModal').fadeIn();
        var datas = {'page':page,'size':size,'kewod':kewod};
        var result = '';
        $.ajax({
            type: 'POST',
            url : pcLxrIndex,
            data: datas,
            dataType: 'json',
            success: function(data){
                $('#lxrlist').empty();
                $('.xiansuo_Page_div').html('');
                console.log(data);
                var length = data['list'].length;
                for(var i=0;i<length;i++){
                    result +=
                    '<li name="'+data['list'][i].m_contact_id+'">'+
                        '<label class="checkbox licheckbox" onselectstart="return false;">'+
                        '<input type="checkbox" class="vam" name="checkedres" />'+
                        '<i></i>'+
                        '</label>'+
                        '<div class="LiBox">'+
                            '<span>'+data['list'][i].m_contact_name+'</span>'+
                            '<span>'+data['list'][i].m_contact_mobile+'</span>'+
                            '<span>'+data['list'][i].m_contact_mail+'</span>'+
                            '<span>'+data['list'][i].m_contact_job+'</span>'+
                            '<span>'+data['list'][i].m_contact_department+'</span>'+
                            '<span class="Contact-BJ"></span>'+
                            '<input type="hidden" value="'+data['list'][i].m_contact_id+'"/>'
                        '</div>'+
                    '</li>';
                }
                // 为了测试，延迟1秒加载
                setTimeout(function() {
                    //如果小于10或者等于0
                    if(length < 10 || length == 0) {
                        //console.log("小于10",arrLen);
                        //$('.xiansuo_List').append(result);
                        $('#lxrlist').append(result);
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
						//console.log("大于10");
                        //$('.xiansuo_List').append(result);
                        $('#lxrlist').append(result);
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
    //为分页器每个li绑定单击事件
    $(document).on("click",".xiansuo_Page_list li",function(){
        var index = $(this).index();
        var page = $(this).html();
        $(this).addClass("active").siblings().removeClass("active");
        $(".that_Page").val(page);              
        var page_keyword = $('.search-input').val();                                                              
        var page_size= $('.xiansuo_Page_Three').val();
        // pcContactList(kewod = '',page=1,size=10)
        pcContactList(page_keyword,page,page_size);               
    })

    //为跳转至输入框监听键盘事件
    $(document).on("keydown",".that_Page",function(e){
        var page = $(this).val();
        var num = $('#xiansuo_pages_count').html();
        if(page>num){
            page=1;
        }               
        var page_keyword = $('.search-input').val();                                                              
        var page_size= $('.xiansuo_Page_Three').val();
        if(e.keyCode==13){
            pcContactList(page_keyword,page,page_size);               
        }
    })

    //为首页判定事件
    $(document).on('click','.first_page',function(e){
        var page = 1;               
        var page_keyword = $('.search-input').val();                                                              
        var page_size= $('.xiansuo_Page_Three').val();
        pcContactList(page_keyword,page,page_size); 
        e.stopPropagation();
    })

    //为上一页绑定事件
    $(document).on('click','.prev_page',function(e){
        var page = $(this).attr('name');                
        var page_keyword = $('.search-input').val();                                                              
        var page_size= $('.xiansuo_Page_Three').val();
        pcContactList(page_keyword,page,page_size); 
        e.stopPropagation();
    })

    //为下一页绑定事件
    $(document).on('click','.next_page',function(e){
        var page = $(this).attr('name');            
        var page_keyword = $('.search-input').val();                                                              
        var page_size= $('.xiansuo_Page_Three').val();
        pcContactList(page_keyword,page,page_size); 
        e.stopPropagation();
    })

    //为尾页绑定事件
    $(document).on('click','.last_page',function(e){
        var page = $(this).attr('name');                
        var page_keyword = $('.search-input').val();                                                              
        var page_size= $('.xiansuo_Page_Three').val();
       pcContactList(page_keyword,page,page_size); 
        e.stopPropagation();
    })

    //搜索按钮点击
    $(".search-btn").on("click",function(){
        //获取input框内容
        var inputtext = $(".search-input").val();
        $('#lxrlist').empty();
        pcContactList(inputtext);
    })

    $(document).on("keydown",'.search-input', function(e) { //监听键盘事件
        console.log(e);
        if(e.keyCode == 13) {
            var inputtext = $(".search-input").val();
            $('#lxrlist').empty();
            pcLoadDownFn(inputtext);
        }
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
        $('.ajax_loadModal').fadeIn();
        var lxr_id = '';
        //遍历每个选中的checkbox
        $("input[type='checkbox'][name='checkedres']:checked").each(function(){
            divids =  $(this).parents("li").attr("name");//每条数据的id
            lxr_id += divids+",";
            // $("[name= '"+ divids +"' ]").remove();//发起ajax
            console.log(divids);
            if($(".xiansuo_List li").length == 0){//如果页面的li长度等于0
                $("#checkall").prop("disabled", "false");//禁用全选
                $(".xiansuo_Page_border").hide();//隐藏分割线
                $(".xiansuo_Page_div").hide();//隐藏分页器
            }
        })
        console.log(lxr_id);
        var url = pcLxrDel;
        $.post(url,{'lxr_id':lxr_id},function(data){
            var leng = data.divids.length;
            console.log(data);
            $('.ajax_loadModal').hide();
            if(data.status == 1){
                message(data.data);
            }else{
                for(var i=0;i<leng;i++){
                $("#checkall").prop("checked", false);//关闭全选
                    $("[name= '"+ data.divids[i] +"' ]").remove();//发起ajax
                }
            }
        },'json');
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
            // alert("手机号码有误，请重填");
        }else if(!emailreg.test(keEmail)) {
            message("你的邮箱有误，请重填");
            // alert("你的邮箱有误，请重填");
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
        var numreg = /^1(3|4|5|7|8)\d{9}$/;
        var emailreg = /^[a-z0-9-_.]+@[\da-z][\.\w-]+\.[a-z]{2,4}$/i;
        if(lxname =='' || lxtel =='' ||lxren =='') {
            $(".sucuess-modal-box02").fadeIn()
            setTimeout(function(){
                $(".sucuess-modal-box02").fadeOut();
            },1500);
        } else if(!numreg.test(lxtel)) {
            message("手机号码有误，请重填");
            return false;
        }else if($(".lxEmail").val().length !=0){
            if(!emailreg.test(lxEmail)) {
                message("你的邮箱有误，请重填");
                return false;
            }
        }else if($('input[name=m_contact_birthday]').val().length !=0){
            if(!shengri.test(lxshengri)){
                message("您输入的生日格式错误");
                return false;
            }
        }
        // else  {
        //     $(".sucuess-modal-box01").fadeIn()
        //     setTimeout(function(){
        //         $(".sucuess-modal-box01").fadeOut();
        //     },1500);
        // }
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
        console.log(index);
        console.log($(this));
        $(this).addClass("activeBottom").siblings().removeClass("activeBottom");
    })

	//新增联系人保存
    $(document).on("click",".bj-btn4",function(){

        var tj = $('#bjzxlxr p').text().split('×')[0];
        var lxr_customer_name = $("input[name=lxr_customer_name]").val();
        var lxr_name = $('input[name=lxr_m_contact_name]').val();
        var lxr_mobile = $('input[name=lxr_m_contact_mobile]').val();
        var lxr_mail = $('input[name=lxr_m_contact_mail]').val();
        var lxr_weixin = $('input[name=lxr_m_contact_weixin]').val();
        var lxr_job = $('input[name=lxr_m_contact_job]').val();
        var lxr_department = $('input[name=lxr_m_contact_department]').val();
        var lxr_birthday = $('input[name=m_contact_birthday]').val();
        var lxr_resume = $('textarea[name=m_contact_resume]').val();

        var numreg = /^1(3|4|5|7|8)\d{9}$/;
        var emailreg = /^[a-z0-9-_.]+@[\da-z][\.\w-]+\.[a-z]{2,4}$/i;
        if(lxr_name =='' || lxr_mobile =='' ||lxr_customer_name =='') {
            $(".sucuess-modal-box02").fadeIn()
            setTimeout(function(){
                $(".sucuess-modal-box02").fadeOut();
            },1500);
        } else if(!numreg.test(lxr_mobile)) {
            error("手机号码有误，请重填");
            return false;
        }else if($(".lxEmail").val().length !=0){
            if(!emailreg.test(lxr_mail)) {
                error("你的邮箱有误，请重填");
                return false;
            }
        }
        
        if( tj == '新增联系人'){
            $('.ajax_loadModal').fadeIn();
            var url = pcLxrAdd;
            var data = {'customer_name':lxr_customer_name,'name':lxr_name,'mobile':lxr_mobile,'mail':lxr_mail,'weixin':lxr_weixin,'job':lxr_job,'department':lxr_department,'birthday':lxr_birthday,'resume':lxr_resume}
            var result = '';
            $.post(url,data,function(data){
                $('.ajax_loadModal').hide();
                if(data.status == 1){
                    error(data.data);
                    return false;
                }else{
                    result +=
                    '<li name="'+data.data.m_contact_id+'">'+
                        '<label class="checkbox licheckbox" onselectstart="return false;">'+
                        '<input type="checkbox" class="vam" name="checkedres" />'+
                        '<i></i>'+
                        '</label>'+
                        '<div class="LiBox">'+
                            '<span>'+data.data.m_contact_name+'</span>'+
                            '<span>'+data.data.m_contact_mobile+'</span>'+
                            '<span>'+data.data.m_contact_mail+'</span>'+
                            '<span>'+data.data.m_contact_job+'</span>'+
                            '<span>'+data.data.m_contact_department+'</span>'+
                            '<span class="Contact-BJ"></span>'+
                            '<input type="hidden" value="'+data.data.m_contact_id+'"/>'
                        '</div>'+
                    '</li>';
                    $('#lxrlist').prepend(result);
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
                    return;
                }
            },'json')
        }else if(tj == '修改联系人'){
            $('.ajax_loadModal').fadeIn();
            var url = pcLxrUpd;
            var lxr_id = $('#user_lxr_id').val();
            var data = {'customer_name':lxr_customer_name,'name':lxr_name,'mobile':lxr_mobile,'mail':lxr_mail,'weixin':lxr_weixin,'job':lxr_job,'department':lxr_department,'birthday':lxr_birthday,'resume':lxr_resume,'lxr_id':lxr_id}
            $.post(url,data,function(data){
                $('.ajax_loadModal').hide();
                if(data.status == 1){
                    error(data.data);
                    return;
                }else{
                    var top = $('#lxrlist').children();
                    var toplenth = top.length;
                    for(var i=0;i<toplenth;i++){
                        var lxrtj = $(top[i]).find('.LiBox').find('input[type=hidden]').val();
                        if(lxrtj == data.data.m_contact_id){
                            $(top[i]).find('.LiBox').find('input[type=hidden]').prev().prev().prev().prev().prev().prev().html(data.data.m_contact_name);
                            $(top[i]).find('.LiBox').find('input[type=hidden]').prev().prev().prev().prev().prev().html(data.data.m_contact_mobile);
                            $(top[i]).find('.LiBox').find('input[type=hidden]').prev().prev().prev().prev().html(data.data.m_contact_mail);
                            $(top[i]).find('.LiBox').find('input[type=hidden]').prev().prev().prev().html(data.data.m_contact_job);
                            $(top[i]).find('.LiBox').find('input[type=hidden]').prev().prev().html(data.data.m_contact_department);
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
                    $(".modal-box").css({
                        "display": "none"
                    })
                    var inputEmpty = $(".bj-center input");
                    var textareaEmpty = $(".bj-center textarea");
                    inputEmpty.val("");
                    textareaEmpty.val("");
                    return;
                }
            },'json')
        }
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
        $(".delete-modal").hide()
    })
//        点击关闭第一重模态框
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
    //计算高度
    function getHeight() {
        var height = $(window).height();
        var TopH = 76+90;
        var TopH1 = 76+131;
        var cellH = (height-TopH)-15;
        var cellH2 = (height-TopH)-85;
        var FPageH = $(".xiansuo_Page_Div").height();
        $(".left_template,.right_template,.modal-box,.modal-box-2").height(height);
        $(".xiansuo_main").height(cellH);
        $(".xiansuo_List02").height(cellH2-FPageH);
        if($("body").height()<795){
            $(".bj-kehu").height(height)
        }
    }
    //联系人界面开始
    //点击首屏编辑ico按钮
    $(document).on("click",".Contact-BJ",function(){
        $('.ajax_loadModal').fadeIn();
        $('.ClientDetails').empty();
        var lxr_id = $(this).next().val();
        var url = pcLxrList+"?lxr_id="+lxr_id;
        var result = '';
        $.get(url,function(data){
            console.log(data);
            result +=
            '<div class="DetailsTitle">'+
                '<span>联系人详情<a class="close-X"></a></span>'+
            '</div>'+
            '<div class="DatailsButton">'+
                '<span class="BianContact">编辑</span>'+
                '<input type="hidden" value="'+data.m_contact_id+'"/>'+
                '<span class="DeleteContact">删除</span>'+
            '</div>'+
            '<div class="TabDatails">'+
                '<!--选项卡-->'+
                '<ul>'+
                   ' <li class="activeBottom">联系人信息</li>'+
                '</ul>'+
                '<!--客户信息-->'+
                '<div class="TextDatails" >'+
                    '<div class="xiansuo_des_contents">'+
                        '<div class="xiansuo_des_contents_cell">'+
                            '<span class="span_lf1">客户名称：</span><span class="span_rt1 ">'+data.m_customer_name+'</span>'+
                            '<input type="hidden" id="user_lxr_id" value="'+data.m_contact_id+'"/>'+
                        '</div>'+
                        '<div class="xiansuo_des_contents_cell">'+
                            '<span class="span_lf1">姓<span class="text_between">名</span>：</span><span class="span_rt1 ">'+data.m_contact_name+'</span>'+
                        '</div>'+
                        '<div class="xiansuo_des_contents_cell">'+
                            '<span class="span_lf1">电<span class="text_between">话</span>：</span><span class="span_rt1 ">'+data.m_contact_mobile+'</span>'+
                        '</div>'+
                        '<div class="xiansuo_des_contents_cell">'+
                            '<span class="span_lf1">邮<span class="text_between">箱</span>：</span><span class="span_rt1 ">'+data.m_contact_mail+'</span>'+
                       ' </div>'+
                        '<div class="xiansuo_des_contents_cell">'+
                            '<span class="span_lf1">微<span class="text_between">信</span>：</span><span class="span_rt1 ">'+data.m_contact_weixin+'</span>'+
                       ' </div>'+

                       ' <div class="xiansuo_des_contents_cell">'+
                            '<span class="span_lf1">职<span class="text_between">位</span>：</span><span class="span_rt1 ">'+data.m_contact_job+'</span>'+
                        '</div>'+
                        '<div class="xiansuo_des_contents_cell">'+
                            '<span class="span_lf1 ">所在部门：</span></span><span class="span_rt1 ">'+data.m_contact_department+'</span>'+
                       ' </div>'+
                        '<div class="xiansuo_des_contents_cell">'+
                            '<span class="span_lf1">生<span class="text_between">日</span>：</span><span class="span_rt1 ">'+data.m_contact_birthday+'</span>'+
                        '</div>'+
                        '<div class="xiansuo_des_contents_cell">'+
                            '<span class="span_lf1">备<span class="text_between">注</span>：</span><span class="span_rt1 ">'+data.m_contact_resume+'</span>'+
                       ' </div>'+
                    '</div>'+
                '</div>'+
            '</div>';
            $('.ajax_loadModal').hide();
            $('.ClientDetails').append(result);
        },'json');
        $(".modal-box").show()
    })

    $(document).on("click",".BianContact",function(){
        $('.ajax_loadModal').fadeIn();
        $(".bj-kehu01>.bj-top>p").html('<p>修改联系人<span class="bj-top-span">&times;</span></p>');
        $(".modal-box-2").fadeIn();
        $(".bj-kehu01").fadeIn();
        var lxr_id = $(this).next().val();
        var url = pcLxrList+"?lxr_id="+lxr_id;
        $.get(url,function(data){
            if( data.status != 1 ){
                alert(data.message);
                return;
            }
            $('input[name=lxr_customer_name]').val(data.m_customer_name);
            $('input[name=lxr_m_contact_name]').val(data.m_contact_name);
            $('input[name=lxr_m_contact_mobile]').val(data.m_contact_mobile);
            $('input[name=lxr_m_contact_mail]').val(data.m_contact_mail);
            $('input[name=lxr_m_contact_weixin]').val(data.m_contact_weixin);
            $('input[name=lxr_m_contact_job]').val(data.m_contact_job);
            $('input[name=lxr_m_contact_department]').val(data.m_contact_department);
            $('input[name=m_contact_birthday]').val(data.m_contact_birthday);
            $('textarea[name=m_contact_resume]').val(data.m_contact_resume);
            $('.ajax_loadModal').hide();
        },'json');
    })
    $(document).on("click",".DeleteContact",function(){
        $(".delete-modal").fadeIn();
    })
    $(document).on("click",".de_confirm_112",function(){
        $('.ajax_loadModal').fadeIn();
        var lxr_id = $('#user_lxr_id').val();
        var url = pcLxrDel+"?lxr_id="+lxr_id;
        $.get(url,function(data){
            $('.ajax_loadModal').hide();
            console.log(data);
            if(data.status == 1){
                error(data.data);
            }else{
                $("[name= '"+ lxr_id +"' ]").remove();//发起ajax
            }
        },'json');
        $(".modal-box").fadeOut();
    })
    $(document).on("click",".dingyue_cgMsgBtn01",function(){
        $(".bj-kehu01>.bj-top>p").html('<p>新增联系人<span class="bj-top-span">&times;</span></p>');
        $(".modal-box-2").fadeIn();
        $(".bj-kehu01").fadeIn();
    })
})

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
