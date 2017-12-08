/*
公共js
 */
    //动态获取高度
    $(function(){
        $(window).on("load",function(){
            getHeight();//设置动态高度
            // setTimeout(function(){
            //     $(".icon-shopping").eq(1).addClass("active").siblings().removeClass("active");
            //     $(".icon-person-div").css("display","block").find("p").eq(0).addClass("open");
            // },100);
        })
        loadDownFn();
        $(window).resize(function(){
            getHeight();//设置动态高度
        });
    })
    //定义获取高度方法
    function getHeight(){
        var winH = $(window).height();
        var topH = $(".left_header").height();
        var editorHeight = $("#editor").height();
        $(".left_template").height(winH);
        $(".outer_div").height(winH);
        $(".page-set").height(winH-162);
        $(".user-bbox").height(winH-295);
        $("#edui1_iframeholder").height(editorHeight-33);
        //表格内容高度
        var agentHeadH = $(".agent-head").height();
        $(".table-content1").height(winH-300);
        $(".table-content2").height(winH-agentHeadH-360);
    }

    // 虚拟弹窗交互
    $(function(){
        //管理员
        $(".addAdmin").click(function(){
            $(".add-admin,.moni-box").fadeIn();
        })
   
        $(".passCheck").click(function(){
            $(".pass-check,.moni-box").fadeIn();
        })
        $(".nopassCheck").click(function(){
            $(".nopass-check,.moni-box").fadeIn();
        })
        $(".addSalesman").click(function(){
            $(".add-salesman,.moni-box").fadeIn();
        })
        $(".salesmanDetails").click(function(){
            $(".salesman-details,.moni-box").fadeIn();
        })
        $(".salesmanRedact").click(function(){
            $(".salesman-redact,.moni-box").fadeIn();
        })
        $(".addTrainer").click(function(){
            $(".add-trainer,.moni-box").fadeIn();
        })
        $(".trainerDetails").click(function(){
            $(".trainer-details,.moni-box").fadeIn();
        })
        $(".trainerRedact").click(function(){
            $(".trainer-redact,.moni-box").fadeIn();
        })
        $(".trainerAgent").click(function(){
            $(".trainer-agent,.moni-box").fadeIn();
        })
        $(".trainerAllot").click(function(){
            $(".trainer-allot,.moni-box").fadeIn();
        })

        // ".add-admin,.admin-details,.admin-redact,.admin-remove,.check-details,.pass-check,.nopass-check,.add-salesman,.salesman-details,.salesman-redact,.salesman-remove,.add-trainer,.trainer-details,.trainer-redact,.trainer-remove,.trainer-agent,.trainer-allot"
        //关闭所有虚拟弹窗
        // var allClean = $(".cleanAll").parent().parent();
    });


    //清空搜索框
    $(function(){
        $("input[name=clear]").click(function(){
            $("input[name=searchName],input[name=searchEmail]").val("");
        })
    })

    //格式化银行卡号
    $("input[name=bankCode]").keyup(function() {
            var val = $(this).val();
            val = val.replace(/(\d{4})(?=\d)/g, "$1 ");
            $(this).val( val );
        });

    // 更换头像事件代理点击事件
    $(document).on("click", ".modal_SetUp", function() {
        $("#file0").click();
    })

    $("#file0").change(function() {
        var objUrl = getObjectURL(this.files[0]);
        console.log("objUrl = " + objUrl);
        if(objUrl) {
            $("#img0").attr("src", objUrl);
        }
    });
    //上传图片保存路径函数及兼容性处理
    function getObjectURL(file) {
        var url = null;
        if(window.createObjectURL != undefined) { // basic
            url = window.createObjectURL(file);
        } else if(window.URL != undefined) { // mozilla(firefox)
            url = window.URL.createObjectURL(file);
        } else if(window.webkitURL != undefined) { // webkit or chrome
            url = window.webkitURL.createObjectURL(file);
        }
        return url;
    }
    //为分页器每个li绑定单击事件
    $(document).on("click",".xiansuo_Page_list li",function(){
        var page = $(this).html();     
        var page_size=$('.xiansuo_Page_Three').val();
        loadDownFn(page,page_size);                
    })

    //为跳转至输入框监听键盘事件
    $(document).on("keydown",".that_Page",function(e){
        var page = $(this).val();
        var num = $('#xiansuo_pages_count').html();
        if(page>num){
            page=1;
        }        
        var page_size=$('.xiansuo_Page_Three').val();
        if(e.keyCode==13){
            loadDownFn(page,page_size);
        }
    })

    //为首页判定事件
    $(document).on('click','.first_page',function(e){
        var page = 1;   
        var page_size=$('.xiansuo_Page_Three').val();
        loadDownFn(page,page_size);
        e.stopPropagation();
    })

    //为上一页绑定事件
    $(document).on('click','.prev_page',function(e){
        var page = $(this).attr('name');       
        var page_size=$('.xiansuo_Page_Three').val();
        loadDownFn(page,page_size);
        e.stopPropagation();
    })

    //为下一页绑定事件
    $(document).on('click','.next_page',function(e){
        var page = $(this).attr('name');       
        var page_size=$('.xiansuo_Page_Three').val();
        loadDownFn(page,page_size);
        e.stopPropagation();
    })

    //为尾页绑定事件
    $(document).on('click','.last_page',function(e){
        var page = $(this).attr('name'); 
        var page_size=$('.xiansuo_Page_Three').val();
        loadDownFn(page,page_size);
        e.stopPropagation();
    })

    function loadDownFn(page='1',size='10') {
        $('.ajax_loadModal').fadeIn();
        var datas = {'page':page,'size':size};
        var result = '';
        ajax_message('show');
        $.ajax({
            type: 'POST',
            url: '/Role/get_manager',
            data : datas,
            dataType: 'json',
            success: function(data) {
                if(data.code==1){
                    var len=data.list.length;
                    $('.table_ctbody').html('');
                    $('.xiansuo_Page_div').html('');
                    for (var i = 0; i < len; i++) {
                        result+=
                            '<tr name="'+data.list[i].m_user_id+'">'+
                                '<td>'+(i+1)+'</td>'+
                               '<td><a href="javascript:;" class="adminDetails">'+data.list[i].m_user_name+'</a></td>'+
                                '<td>'+(data.list[i].m_user_account?data.list[i].m_user_account:'暂无')+'</td>'+
                                '<td>'+(data.list[i].m_user_tel?data.list[i].m_user_tel:'暂无')+'</td>'+
                                '<td>'+(data.list[i].m_user_name_kana?data.list[i].m_user_name_kana:'未知')+'</td>'+
                                '<td>'+data.list[i].login_time+'</td>'+
                                '<td>'+data.list[i].status+'</td>'+
                                '<td class="tda2">'+
                                    '<a href="javascript:;" class="adminRedact fl">编辑</a>'+
                                    '<a href="javascript:;" class="removeBtn fr">删除</a>'+
                                '</td>'+
                            '</tr>';       
                    }
                    $('.table_ctbody').append(result);
                    $('.xiansuo_Page_div').html(data.page_html);
                    ajax_message();
                }
              
            }
        })
    }

    //查看详情
    //  
    $(document).on('click','.adminDetails',function(e){
        var $id=$(this).parents().parents().attr('name');
        $.ajax({
            type: 'POST',
            url: '/Role/get_manager_details',
            data : {'id':$id},
            dataType: 'json',
            success: function(data) {
                if(data.code==1){
                   $(".name").html(data.data.m_user_name);
                   $(".ID").html(data.data.m_user_account);
                   $(".phone").html(data.data.m_user_tel);
                   $(".section").html(data.data.m_user_name_kana);
                   $(".status").html(data.data.status);
                   $(".addTime").html(data.data.m_user_rdatetime);
                   $(".updateTime").html(data.data.m_user_udatetime);
                   $(".admin-details,.moni-box").fadeIn(); 
                } 
            }
        })
            
    })

    //删除
    $(document).on('click','.removeBtn',function(e){
        that=$(this).parents().parents();
        $id=$(this).parents().parents().attr('name');
        $(".remove-box,.moni-box").fadeIn();
    })

    $(document).on('click','.cleanAll,.cancel',function(e){
        $(".moni-box,.moni-lbox").fadeOut();
    })


     //删除管理员
    // 删除按钮
   $(document).on('click','.removeSubmit',function(e){
        $.ajax({
            type: 'POST',
            url: '/Role/del_manager',
            data : {'id':$id},
            dataType: 'json',
            success: function(data) {
                    if(data.code==1){
                        that.remove();
                        message('删除成功');
                    }else{
                        message(data.message);
                    }
                } 
        })
    })

   //编辑管理员
    $(document).on("click",".adminRedact",function(){
        var  $id=$(this).parents().parents().attr('name');
        var result = '';
        $('.admin-redact').html('');
        $.ajax({
            type: 'POST',
            url: '/Role/edit_manager',
            data : {'id':$id},
            dataType: 'json',
            success: function(data) {
                    if(data.code==1){
                       console.log(data.data);
                       result+='<div class="moni-head">'+
                                    '<p class="fl">编辑管理员</p>'+
                                    '<em class="DataCenterBox-cols cleanAll fr">&#215;</em>'+
                                '</div>'+
                                '<form class="moni-main">'+
                                   '<label class="long-text">姓名</label><i>：</i> <input type="text" name="name" value="'+data.data.m_user_name+'"><br />'+
                                    '<label class="long-text">电话</label><i>：</i> <input type="text" name="phone" value="'+data.data.m_user_tel+'"><br />'+
                                    '<label class="long-text">账号</label><i>：</i> <input type="text" name="ID" value="'+data.data.m_user_account+'"><br />'+
                                    '<label class="long-text">密码</label><i>：</i> <input type="password" name="password" value=""><br />'+
                                    '<label class="long-text">部门</label><i>：</i> <input type="text" name="bumen" value="'+data.data.m_user_name_kana+'"><br />'+
                                    '<label class="long-text">启动状态：</label>'+
                                    '<select class="status" name="flag">'+
                                        '<option class="select-box" '+(data.data.m_user_void_flag==0?"selected":"")+' value="有效">有效</option>'+
                                        '<option class="select-box" '+(data.data.m_user_void_flag==1?"selected":"")+' value="无效">无效</option>'+
                                    '</select><br />'+
                                    '<label class="long-text">所属权限组</label><i>：</i> <span class="quanxian">管理员</span><br />'+
                                    '<label class="long-text">创建日期</label><i>：</i> <span class="addTime">'+data.data.m_user_rdatetime+'</span><br />'+
                                    '<label class="long-text">更新日期</label><i>：</i> <span class="updateTime">'+data.data.m_user_udatetime+'</span><br />'+
                                    '<input type="hidden" name="m_user_id" value="'+data.data.m_user_id+'">'+
                                    '<div class="remove-btn">'+
                                        '<input type="button" name="cancel" value="取消" class="cancel white-btn">'+
                                        '<input type="button" name="submit" value="确认" class="submit blue-btn" id="adminRedactSub">'+
                                    '</div>'+
                                '</form>';     
                        $('.admin-redact').append(result);
                        //$(".admin-redact,.moni-box").fadeIn();              
                         $(".admin-redact,.moni-box").fadeIn();              
                    }else{
                        message(data.message);
                    }
                } 
        })
    });

    // 表单验证
    function checkForm(){
        var name = $("input[name=name]:visible").val(),
        phone = $("input[name=phone]:visible").val(),
        ID = $("input[name=ID]:visible").val(),
        password = $("input[name=password]:visible").val(),
        numreg = /^1(3|4|5|7|8)\d{9}$/,
        emailreg = /^[a-zA-Z]{2,20}$/i;
        if (name == "" || phone == "" || ID == "" ) {
            alert("选项不能为空");return false;
        } else if(!numreg.test(phone)){
            alert("请输入正确的电话号码");return false;
        } else if(!emailreg.test(ID)){
            alert("请输入正确的账号");
            return false;
        } else {
            return true;
        };
    };

    function checkForm_add(){
        var name = $("input[name=name]:visible").val(),
        phone = $("input[name=phone]:visible").val(),
        ID = $("input[name=ID]:visible").val(),
        password = $("input[name=password]:visible").val(),
        numreg = /^1(3|4|5|7|8)\d{9}$/,
        emailreg = /^[a-zA-Z]{2,20}$/i;
        if (name == "" || phone == "" || ID == "" || password == "") {
            alert("选项不能为空");return false;
        } else if(!numreg.test(phone)){
            alert("请输入正确的电话号码");return false;
        } else if(!emailreg.test(ID)){
            alert("请输入正确的账号");
            return false;
        } else {
            return true;
        };
    };
    //编辑管理员
    $(document).on("click","#adminRedactSub",function(){
            var name        = $("input[name=name]:visible").val();
            var tel         = $("input[name=phone]:visible").val();
            var ID          = $("input[name=ID]:visible").val();
            var password    = $("input[name=password]:visible").val();
            var bumen       = $("input[name=bumen]:visible").val();
            var flag        = $(".status").val();
            var m_user_id   = $("input[name=m_user_id]").val();
            if(checkForm()){
                $.ajax({
                    type: 'POST',
                    url: '/Role/edit_manager_ok',
                    data : {'name':name,'tel':tel,'ID':ID,'password':password,'bumen':bumen,'flag':flag,'m_user_id':m_user_id},
                    dataType: 'json',
                    success: function(data) {
                            if(data.code==1){
                                success('编辑成功');
                                setTimeout(function(){
                                    window.location.reload(true);
                                }, 1500);
                            }else{
                                message(data.message);
                            }
                        } 
                })
            }
   });

