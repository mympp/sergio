<%@ page contentType="text/html;charset=UTF-8" language="java" %>
<%@ taglib prefix="shiro" uri="http://shiro.apache.org/tags" %>
<!DOCTYPE html>
<html>

<head>
    <meta charset="utf-8">
    <meta name="renderer" content="webkit">

    <link rel="shortcut icon" href="images/favicon.ico" type="favicon.ico" />
    <title> 聚派- 主页</title>

    <meta name="keywords" content="">
    <meta name="description" content="">

    <!--[if lt IE 9]>
    <meta http-equiv="refresh" content="0;ie.html" />
    <![endif]-->

    <link rel="shortcut icon" href="favicon.ico"> 
    <link href="css/bootstrap.min.css?v=3.3.6" rel="stylesheet">
    <link href="css/animate.css" rel="stylesheet">
    <link href="css/style.css?v=4.1.0" rel="stylesheet">
</head>

<body class="fixed-sidebar full-height-layout gray-bg">
    <div id="wrapper">
        <!--左侧导航开始-->
        <nav class="navbar-default navbar-static-side" role="navigation">
            <div class="nav-close"><i class="fa fa-times-circle"></i>
            </div>
            <div class="sidebar-collapse">
                <ul class="nav" id="side-menu">
                    <li class="nav-header" style="margin:20px auto;">
                            <img src="images/logo.png" width="250px" height="auto">
                    </li>
                    <div class="littlebox">
                        <li>
                            <a class="J_menuItem" href="index_v1.html">
                                <span class="nav-label icon1">首&nbsp;&nbsp;页</span>
                            </a>
                        </li>
                    </div>
                    <div class="littlebox">
                        <li class="hidden-folded padder m-t m-b-sm text-muted text-xs">
                            <span class="ng-scope">推广管理</span>
                        </li>
                        <li>
                            <a class="J_menuItem" href="AdvertList.html"><i class="fa fa-magic"></i> <span class="nav-label icon3">大数据广告</span></a>
                        </li>
                        <!-- <li>
                            <a class="J_menuItem" href="wifidata.html"><i class="fa fa-magic"></i> <span class="nav-label icon4">WiFi广告</span></a>
                        </li> -->
                        <li>
                            <a class="J_menuItem" href="AdvertAdd.html"><i class="fa fa-magic"></i> <span class="nav-label icon5">主流媒体广告</span></a>
                        </li>
                        <li>
                            <a class="J_menuItem" href="AdvertAdd2.html"><i class="fa fa-magic"></i> <span class="nav-label icon5">聚合平台广告</span></a>
                        </li>
                        <li>
                            <a class="J_menuItem" href="AdvertAdd3.html"><i class="fa fa-magic"></i> <span class="nav-label icon5">通知栏广告</span></a>
                        </li>
                        <shiro:hasRole name="admin">
                             <li>
                                <a class="J_menuItem" href="renderList.html?type=1"><i class="fa fa-magic"></i> <span class="nav-label icon15">广告渲染接口</span></a>
                            </li>
                            <li>
                                <a class="J_menuItem" href="pricetree.html"><i class="fa fa-magic"></i> <span class="nav-label icon6">广告费率</span></a>
                            </li>

                            <li>
                                <a class="J_menuItem" href="pricelist.html"><i class="fa fa-magic"></i> <span class="nav-label icon6">广告基础价</span></a>
                            </li>
                            <li>
                                <a class="J_menuItem" href="priceAdd.html"><i class="fa fa-magic"></i> <span class="nav-label icon6">添加广告基础价</span></a>
                            </li>
                        </shiro:hasRole>
                    </div>
                     <!--<div class="littlebox">
                        <li class="hidden-folded padder m-t m-b-sm text-muted text-xs">
                            <span class="ng-scope icon5">数据报告</span>
                        </li>
                        <li>
                            <a class="J_menuItem" href="report_data1.html"><i class="fa fa-flask"></i> <span class="nav-label icon6">大数据广告报告</span></a>
                        </li>
                    </div>--> 
                    <div class="littlebox">
                        <li class="hidden-folded padder m-t m-b-sm text-muted text-xs">
                            <span class="ng-scope icon5">线索信息</span>
                        </li>
                        <li>
                            <a class="J_menuItem" href="importdata.html"><i class="fa fa-magic"></i> <span class="nav-label icon9">导入数据</span></a>
                        </li>
                        <li>
                            <a class="J_menuItem" href="storelist.html"><i class="fa fa-flask"></i> <span class="nav-label icon6">专营店信息</span></a>
                        </li>
                        <li>
                            <a class="J_menuItem" href="provincelist.html"><i class="fa fa-flask"></i> <span class="nav-label icon6">省份</span></a>
                        </li>
                        <li>
                            <a class="J_menuItem" href="citylist.html"><i class="fa fa-flask"></i> <span class="nav-label icon6">城市</span></a>
                        </li>
                        <li>
                            <a class="J_menuItem" href="serieslist.html"><i class="fa fa-flask"></i> <span class="nav-label icon6">车系</span></a>
                        </li>
                        <li>
                            <a class="J_menuItem" href="modellist.html"><i class="fa fa-flask"></i> <span class="nav-label icon6">车型</span></a>
                        </li>
                        <li>
                            <a class="J_menuItem" href="saleclueslist.html"><i class="fa fa-flask"></i> <span class="nav-label icon6">意向订单</span></a>
                        </li>
                    </div>
                    <div class="littlebox">
                        <li class="hidden-folded padder m-t m-b-sm text-muted text-xs">
                            <span class="ng-scope">狐眼设备</span>
                        </li>
                        <li>
                            <a class="J_menuItem" href="box.html"><i class="fa fa-magic"></i> <span class="nav-label icon9">设备列表</span></a>
                        </li>
                        <li>
                            <a class="J_menuItem" href="boxAdd.html"><i class="fa fa-magic"></i> <span class="nav-label icon10">添加设备</span></a>
                        </li>
                    </div>
                    <div class="littlebox">
                        <li class="hidden-folded padder m-t m-b-sm text-muted text-xs">
                            <span class="ng-scope">账号</span>
                        </li>
                        <li>
                            <a class="J_menuItem" href="number.html"><i class="fa fa-magic"></i> <span class="nav-label icon12">财务报告</span></a>
                        </li>
                        <li>
                            <a class="J_menuItem" href="userlist.html"><i class="fa fa-magic"></i> <span class="nav-label icon13">客户列表</span></a>
                        </li>
                        <li>
                            <a class="J_menuItem" href="number2.html"><i class="fa fa-magic"></i> <span class="nav-label icon14">增加客户</span></a>
                        </li>
                        <li>
                            <a class="J_menuItem" href="number3.html"><i class="fa fa-magic"></i> <span class="nav-label icon15">修改密码</span></a>
                        </li>
                    </div>
                    <div class="littlebox">
                        <li class="hidden-folded padder m-t m-b-sm text-muted text-xs">
                            <span class="ng-scope">聚派数据汇</span>
                        </li>
                        <li>
                            <a class="J_menuItem" href="datalist.html"><i class="fa fa-magic"></i> <span class="nav-label icon9">聚派数据汇（开发中）</span></a>
                        </li>
                    </div>
                   
                    
                </ul>
            </div>
        </nav>
    <div class="navtop">
        <span class="icon19">消息</span>
        <a href="" class="icon20">管理</a>
        <div class="navtop_right">
            <a class="" href="index.html">数据平台</a>
            <a class="" href="http://www.gdjupai.cn/index.html">聚派官网</a>
            <a class="" href="logout.do">退出</a>
        </div>
    </div>
        <!--左侧导航结束-->
        <!--右侧部分开始-->
        <div id="page-wrapper" class="gray-bg dashbard-1">
            <div class="row J_mainContent" id="content-main">
                <iframe id="J_iframe" width="100%" height="100%" src="index_v1.html?v=4.0" frameborder="0" data-id="index_v1.html" seamless></iframe>
            </div>
        </div>
        <!--右侧部分结束-->
    </div>

    <!-- 全局js -->
    <script src="js/jquery.min.js?v=2.1.4"></script>
    <script src="js/bootstrap.min.js?v=3.3.6"></script>
    <script src="js/plugins/metisMenu/jquery.metisMenu.js"></script>
    <script src="js/plugins/slimscroll/jquery.slimscroll.min.js"></script>
    <script src="js/plugins/layer/layer.min.js"></script>

    <!-- 自定义js -->
    <script src="js/hAdmin.js?v=4.1.0"></script>
    <script type="text/javascript" src="js/index.js"></script>

    <!-- 第三方插件 -->
    <script src="js/plugins/pace/pace.min.js"></script>
    <script type="text/javascript">
            $(function() {
                //菜单点击
                $(".J_menuItem").on('click', function() {
                    var url = $(this).attr('href');
                    $("#J_iframe").attr('src', url);
                    return false;
                });
            });
    </script>

</body>

</html>