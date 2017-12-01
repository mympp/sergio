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
        $(".table-content1").height(winH-300);
        $(".table-content2").height(winH-agentHeadH-347);
        $(".table-content3").height(winH-agentHeadH-315);
        //虚拟弹窗高度超出屏幕高度时滚动
        var mainH = $(".moni-main").height();
        if (mainH >= winH) {
            // $(".moni-main").height(winH);
            $(".moni-lbox").css({"height":winH,"overflow":"auto","overflow-x":"hidden"});
        }
    }
        

    // 虚拟弹窗交互
    $(function(){
        //管理员
        $(document).on("click",".addAdmin",function(){
            $(".add-admin,.moni-box").fadeIn();
        })
        $(document).on("click",".adminDetails",function(){
            $(".admin-details,.moni-box").fadeIn();
        })
        $(document).on("click",".passCheck",function(){
            $(".pass-check,.moni-box").fadeIn();
        })
        $(document).on("click",".nopassCheck",function(){
            $(".nopass-check,.moni-box").fadeIn();
        })
        $(document).on("click",".addSalesman",function(){
            $(".add-salesman,.moni-box").fadeIn();
        })
        $(document).on("click",".salesmanDetails",function(){
            $(".salesman-details,.moni-box").fadeIn();
        })
        $(document).on("click",".salesmanRedact",function(){
            $(".salesman-redact,.moni-box").fadeIn();
        })
        $(document).on("click",".addTrainer",function(){
            $(".add-trainer,.moni-box").fadeIn();
        })
        $(document).on("click",".trainerDetails",function(){
            $(".trainer-details,.moni-box").fadeIn();
        })
        $(document).on("click",".trainerRedact",function(){
            $(".trainer-redact,.moni-box").fadeIn();
        })
        $(document).on("click",".trainerAgent",function(){
            $(".trainer-agent,.moni-box").fadeIn();
        })
        $(document).on("click",".trainerAllot",function(){
            $(".trainer-allot,.moni-box").fadeIn();
        })
        $(document).on("click",".big-img",function(){
            $(".bbig-img").fadeIn();
        })
        $(document).on("click",".bbig-img",function(){
            $(".bbig-img").fadeOut();
        })

        // ".add-admin,.admin-details,.admin-redact,.admin-remove,.check-details,.pass-check,.nopass-check,.add-salesman,.salesman-details,.salesman-redact,.salesman-remove,.add-trainer,.trainer-details,.trainer-redact,.trainer-remove,.trainer-agent,.trainer-allot"
        //关闭所有虚拟弹窗
        // var allClean = $(".cleanAll").parent().parent();
        $(document).on("click",".cleanAll,.cancel",function(){
            // $(allClean).fadeOut();
            $(".moni-box,.moni-lbox").fadeOut();
        })
        //清空搜索框
        $(document).on("click","input[name=clear]",function(){
            $("input[name=searchName],input[name=searchEmail]").val("");
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
            alert("选项不能为空");
        } else if(!numreg.test(phone)){
            alert("请输入正确的电话号码");
        } else if(!emailreg.test(ID)){
            alert("请输入正确的账号（邮箱格式如：quesou@527so.com）");
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