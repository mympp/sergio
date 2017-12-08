/**
 * Created by Administrator on 2017/10/20 0020.
 */
$(function() {
    //发送请求
   

  $.ajax({
        type:'POST',
        dataType:'json',
        url:'/CrmIndex/jsp',
        success:function(json){ 
        var data = json.list;
        var arr = [];
        var arr_data = [];
        //console.log(json.length);
        for(var i =0 ; i<data.length;i++){
            datas = data[i].SQ;
            datad = data[i].DQ;
           // console.log(datad);
            arr.push(datas);
            arr_data.push(datad);
        }
        //数据排序
        arr.sort(function(a, b) {
            return b - a
        })
        //截取前10条数据
        //var long = arr.slice(0, 10);
        //console.log(long);
        var divEl = $("#mains>ul li div");
        //设置数据条最小宽度以及最大宽度
        divEl.css({
            "min-width":10,
            "max-width":400
        })
        //获取滚动条旁的数据
        var SJEl = $(".SJ");
        var DIQU=$(".LI");
        //遍历数据除以10的比例展示数据
        for(var i = 0; i < 10; i++) {
            //超过4000的数据最大宽度400
            //少于100的数据最大宽度10
            
            newVal = (json.desc[i].SQ)/10;
            divEl.eq(i).width(newVal)
            SJEl.eq(i).text(json.desc[i].SQ)
            DIQU.eq(i).children('span').text(json.desc[i].DQ)
        }


        var flag;
        var arr = new Array();
        for(var i = 0; i < data.length; i++) {
            var d = data[i].SQ;
            if(d < 100) {
                flag = 0;
            } else if(d >= 100 && d < 500) {
                flag = 1;
            } else if(d >= 500 && d < 2000) {
                flag = 2;
            } else if(d >= 2000 && d < 5000) {
                flag = 3;
            } else if(d >= 5000 && d < 10000) {
                flag = 4;
            } else {
                flag = 5;
            }
            arr.push(flag);
        }
        var colors = ["#d7eef8", "#97d6f5", "#3fbeef", "#00a2e9", "#0084be", "#005c86"];
        var R = Raphael("map", 600, 500);

        //调用绘制地图方法
        paintMap(R);

        var i = 0;
        for(var state in china) {
            china[state]['path'].color = Raphael.getColor(0.9);
            (function(st, state) {
                var prodata = data[i].SQ;
                var fillcolor = colors[arr[i]];
                st.attr({
                    fill: fillcolor
                }); //填充背景色
                xOffset = 500;
                yOffset = 280;
                st.hover(function(e) {
                    st.animate({
                        fill: "#fdd",
                        stroke: "#eee"
                    }, 500);
                    R.safari();
                    $("#tip").css({
                        "top": (e.clientY - xOffset) + "px",
                        "left": (e.clientX - yOffset) + "px"
                    }).fadeIn("fast").html("<h4>" + china[state]['name'] + "</h4><p>活跃用户数：" + prodata + "</p>");
                }, function() {
                    st.animate({
                        fill: fillcolor,
                        stroke: "#eee"
                    }, 500);
                    R.safari();
                    $("#tip").hide();
                });

                st.mousemove(function(e) {
                    $("#tip").css({
                        "top": (e.clientY - xOffset) + "px",
                        "left": (e.clientX - yOffset) + "px"
                    });
                    R.safari();
                });

            })(china[state]['path'], state);
            i++;
        }
      }  
    });
});