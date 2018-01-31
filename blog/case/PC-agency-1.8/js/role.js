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
        $(".table-content1").height(winH-275);
        $(".table-content2").height(winH-agentHeadH-365);
        $(".table-content3").height(winH-agentHeadH-285);
        //虚拟弹窗高度超出屏幕高度时滚动
        var fatherH = $(".scroHide-father").height();
        var mainH = winH-100;
        if (fatherH >= winH) {
            // $(".moni-main").height(winH);
            $(".scroHide-father").css({"height":winH})
            $(".scroHide").css({"height":mainH,"overflow":"auto","overflow-x":"hidden"});
            $(".scroHide.moni-lbox-agent,.scroHide.add-admin").css({"width":"830px","height":winH,"overflow":"auto","overflow-x":"hidden"});
        }
    }

    // 虚拟弹窗交互
    $(function(){
        //管理员
        $(document).on("click",".addAdmin",function(){
            $(".add-admin,.moni-box").fadeIn();
            getHeight();//设置动态高度
        })
        // 管理员详情
        $(document).on("click",".adminDetails",function(){
            $(".admin-details,.moni-box").fadeIn();
            getHeight();//设置动态高度
        })
        // 通过审核
        $(document).on("click",".passCheck",function(){
            $(".pass-check,.moni-box").fadeIn();
            getHeight();//设置动态高度
        })
        // 拒绝通过审核
        $(document).on("click",".nopassCheck",function(){
            $(".nopass-check,.moni-box").fadeIn();
            getHeight();//设置动态高度
        })
        // 业务员新增
        $(document).on("click",".addSalesman",function(){
            $(".add-salesman,.moni-box").fadeIn();
            getHeight();//设置动态高度
        })
        // 业务员详情
        $(document).on("click",".salesmanDetails",function(){
            $(".salesman-details,.moni-box").fadeIn();
            getHeight();//设置动态高度
        })
        // 业务员编辑
        $(document).on("click",".salesmanRedact",function(){
            $(".salesman-redact,.moni-box").fadeIn();
            getHeight();//设置动态高度
        })
        // 培训师新增
        $(document).on("click",".addTrainer",function(){
            $(".add-trainer,.moni-box").fadeIn();
            getHeight();//设置动态高度
        })
        // 培训师详情
        $(document).on("click",".trainerDetails",function(){
            $(".trainer-details,.moni-box").fadeIn();
            getHeight();//设置动态高度
        })
        // 培训师编辑
        $(document).on("click",".trainerRedact",function(){
            $(".trainer-redact,.moni-box").fadeIn();
            getHeight();//设置动态高度
        })
        // 培训代理商明细
        $(document).on("click",".trainerAgent",function(){
            $(".trainer-agent,.moni-box").fadeIn();
            getHeight();//设置动态高度
        })
        // 培训师分配代理商
        $(document).on("click",".trainerAllot",function(){
            $(".trainer-allot,.moni-box").fadeIn();
            getHeight();//设置动态高度
        })
        // 审核代理商点击查看大图
        $(document).on("click",".big-img",function(){
            $(this).addClass('bbig-img');
            var winH = $(window).height();
            //企业资质点击图片查看大图
            $(".bbig-img").css({
                "height":winH,
                "width":"auto",
                "top":-winH/2-66,
                "left":"50%"
            });
            // $(".bbig-img").fadeIn();
        })
        $(document).on("click",".bbig-img",function(){
            $(this).removeClass('bbig-img')
            var winH = $(window).height();
            //企业资质点击图片查看大图
            $(".big-img").css({
                "height":"100px",
                "width":"100",
                "top":"0",
                "left":"0"
            });
            // $(".bbig-img").fadeIn();
            getHeight();//设置动态高度
        })
        //关闭所有虚拟弹窗
        $(document).on("click",".cleanAll,.cancel",function(){
            $(".moni-box,.moni-lbox").fadeOut();
        })
        //清空搜索框
        $(document).on("click","input[name=clear]",function(){
            $("input[name=searchName],input[name=searchEmail]").val("");
           success("操作成功");
        })
    });

    // 表单验证
    function checkForm(){
        var name = $("input[name=name]:visible").val(),
        phone = $("input[name=phone]:visible").val(),
        ID = $("input[name=ID]:visible").val(),
        password = $("input[name=password]:visible").val(),
        numreg = /^1(3|4|5|7|8)\d{9}$/,
        emailreg = /^[a-z0-9-_.]+@[\da-z][\.\w-]+\.[a-z]{2,4}$/i;
        if (name == "" || phone == "" || ID == "" || password == "") {
            error("选项不能为空");
        } else if(!numreg.test(phone)){
            error("请输入正确的电话号码");
        } else if(!emailreg.test(ID)){
            error("请输入正确的账号（邮箱格式如：quesou@527so.com）");
        } else {
            return ;
        };
    };

    $(function(){
        //格式化银行卡号
        $("input[name=bankCode]").keyup(function() {
                var val = $(this).val();
                val = val.replace(/(\d{4})(?=\d)/g, "$1 ");
                $(this).val( val );
            });
    })

    // 上传图片事件代理点击事件
    $(document).on("click", ".modal_SetUp", function() {
        $("#file0").click();
    })

    $("#file0").change(function() {
        var objUrl = getObjectURL(this.files[0]);
        // console.log("objUrl = " + objUrl);
        if(objUrl) {
            $("#img0").attr("src", objUrl);
        }
    });
    // 上传图片保存路径函数及兼容性处理
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
    //操作提示框
    function success(text){
         $(document.body).append('<div class="sucuess-modal"><div class="sucuess-modal-cell"><img src="../Images/common_icon_success01_nor.png" alt="" /><p class="is_state1">'+text+'</p></div></div>');
         $(".sucuess-modal").fadeIn();
         setTimeout(function(){
            $(".sucuess-modal").remove();   
        },1500);
    }

    function error(text){
        $(document.body).append('<div class="sucuess-modal" style="z-index:9999999"><div class="sucuess-modal-cell"><img src="../Images/common_icon_x_nor@2x.png" alt="" /><p class="is_state1">'+text+'</p></div></div>');
        $(".sucuess-modal").fadeIn();
        setTimeout(function(){
            $(".sucuess-modal").remove();   
        },1500);
    }

    function message(text){

        $(document.body).append('<div class="sucuess-modal style="z-index:9999999"><div class="sucuess-modal-cell"><img src="../Images/common_icon_gantan_nor@2x.png" alt="" /><p class="is_state1">'+text+'</p></div></div>');
        $(".sucuess-modal").fadeIn();
        setTimeout(function(){
            $(".sucuess-modal").remove();   
        },1500);
    }

    function ajax_message(type){
        $(document.body).append('<div class="ajax_loadModal"><div class="ajax_load_img"><img src="/Public/Home/1.6/Images/load-1.gif" alt="" /></div></div>');
        if(type=='show'){
            $(".ajax_loadModal").fadeIn();
        }else{
            $(".ajax_loadModal").remove();
        }
    }

    //密码输入框显示提示文字
    $(document).on("focus",".input-showPwd",function(){
        var text_value=$(this).val();
        if(text_value == this.defaultValue){
            $('.input-showPwd').hide();
            $('.input-password').show().focus();
        }
    });
    $(document).on("blur",".input-password",function(){
        var text_value = $(this).val();
        if(text_value==""){
            $('.input-showPwd').show();
            $('.input-password').hide();
        }
    });