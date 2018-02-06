    $(function () {
                  var clientW = $(window).width();
                  if (clientW <= 1210) {
                     $(".wrapper,.topnav").css("width","950px");
										 //$("#header .wrapper .search input").css("width","427px");
										 $(".banner,.slideBox").css("width","508px");
										 $(".picScroll-left").css("width","513px");
										 $(".banner").css("width","518px");
										 $(".slideBox .bd ul").css("left","-249px");
											//$(".picScroll-left").css("margin-left","10px");
									        //$(".picScroll-left .bd ul li").css("width","254px");
											//$(".picScroll-left .bd ul li img").css("width","255px");
											$(".persional,.detailType iframe,.marketR,.recRight,.footRight").css("display","none");
											$(".recommend .recCon .recMid").css("width","762px");
											$(".recommend .recCon .recMid .imgDiv,.recommend .recCon .recMid dl").css("width","253.6px");
                       }else {
										$(".wrapper,.topnav").css("width","1200px");
										$(".banner,.slideBox").css("width","758px");
										$(".picScroll-left").css("width","763px");
										$(".banner").css("width","768px");
										$(".slideBox .bd ul").css("left","0");
										$(".persional,.detailType iframe,.marketR,.recRight,.footRight").css("display","block");
										$(".banner .bigBan,.banner .smallBan").css("width","758px");
										//$("#header .wrapper .search input").css("width","437px");
										$(".recommend .recCon .recMid").css("width","780px");
										$(".recommend .recCon .recMid .imgDiv,.recommend .recCon .recMid dl").css("width","256.6px");
                  }
                $(".navBar .navItem .item").mouseenter(function () {
                    $(this).css({
											backgroundColor: '#ff5500',
											color: '#fff',
											margin:'0 0 0 -1px'
										});
                    $(this).find("s,.shadowList").css("display", "block");
                    $(this).find("span").css("backgroundPositionX", -20);
                    $(this).find(".itemCon").addClass('on').css("border", "1px solid #f0eeee");
					/*$(this).find("span").css("color","#fff");
                    $(this).find(".drug").css("color","#fff");*/
                    if ($(document).scrollTop() >= $(this).parent().offset().top) {
                        $(this).find(".itemCon").css("top", $(document).scrollTop() - $(this).parent().offset().top + "px");
                    } else {
                        $(this).find(".itemCon").css("top", "0px");
                    }
                });
                $(".navBar .navItem .item").mouseleave(function () {
                    $(this).css({
											backgroundColor: '#f9f9f9',
											color: '#272727',
											margin:'0'
										});
                    $(this).find("s,.shadowList").css("display", "none");
                    $(this).find("span").css("backgroundPositionX", 0);
                    $(this).find(".itemCon").removeClass('on').css("border", "none");
                    $(this).find("span").css("color","#999");
                    $(this).find(".drug").css("color","#272727");
                });
                $(".recMid img").mouseenter(function () {
                    $(this).addClass('on');
                })
                $(".recMid img").mouseleave(function () {
                    $(this).removeClass('on');
                })
                $(".searchInput input").focus(function (e) {
                    with (e.target)
                        if (value == defaultValue) value = "";
                });
                $(".searchInput input").blur(function (e) {
                    with (e.target)
                        if (value == "") value = defaultValue;
                });
            })
              $(window).resize(function () {
                  var clientW = $(window).width();
                  if (clientW <= 1210) {
                      $(".wrapper,.topnav").css("width","950px");
										//$("#header .wrapper .search input").css("width","427px");
										$(".banner,.slideBox").css("width","508px");
										$(".picScroll-left").css("width","513px");
										$(".banner").css("width","518px");
										$(".slideBox .bd ul").css("left","-249px");
										//$(".picScroll-left").css("margin-left","10px");
									    //$(".picScroll-left .bd ul li").css("width","254px");
										//$(".picScroll-left .bd ul li img").css("width","255px");
										$(".persional,.detailType iframe,.marketR,.recRight,.footRight").css("display","none");
										$(".recommend .recCon .recMid").css("width","762px");
										$(".recommend .recCon .recMid .imgDiv,.recommend .recCon .recMid dl").css("width","253.6px");
                  } else {
                  $(".wrapper,.topnav").css("width","1200px");
									$(".banner,.slideBox").css("width","758px");
									$(".picScroll-left").css("width","763px");
									$(".banner").css("width","768px");
									$(".slideBox .bd ul").css("left","0");
									$(".persional,.detailType iframe,.marketR,.recRight,.footRight").css("display","block");
									//$("#header .wrapper .search input").css("width","437px");
								  $(".recommend .recCon .recMid").css("width","780px");
									$(".recommend .recCon .recMid .imgDiv,.recommend .recCon .recMid dl").css("width","256.6px");
                  }
              })