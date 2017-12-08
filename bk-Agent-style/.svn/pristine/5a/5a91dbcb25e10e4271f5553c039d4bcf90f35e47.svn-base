/**
 * Created by Administrator on 2017/11/13 0013.
 */
var myChart = echarts.init(document.getElementById('main'));
var myChart2 = echarts.init(document.getElementById('main2'));
var myChart3 = echarts.init(document.getElementById('main3'));
option =  {
    tooltip: {
        trigger: 'item',
        formatter: "{a} <br/>{b}: {c} ({d}%)"
    },
    legend: {
        orient: 'vertical',
        x: '60%',
        y:'50%',
        itemGap:15,
        data:['新增人数','上月人数'],
        textStyle: {
            fontSize: '14',
            color: '#aaa'// 图例文字颜色
        }
    },
    series: [
        {
            name:'统计',
            type:'pie',
            center : ['30%', '50%'],
            radius: ['40%', '60%'],
            avoidLabelOverlap: false,
            label: {
                normal: {
                    show: false,
                    position: 'center'
                },
                emphasis: {
                    show: true,
                    textStyle: {
                        fontSize: '15',
                        fontWeight: 'bold'
                    }
                }
            },
            color: ['#72e7de','#76c3f2'],
            labelLine: {
                normal: {
                    show: false
                }
            },
            data:[
                {value:$("#agent_num").html(), name:'新增人数'},
                {value:$('input[name=top_agent]').val(), name:'上月人数'}
            ]
        }
    ]
};

option2 = {
    tooltip : {
        trigger: 'axis',
        axisPointer: {
            type: 'cross',
            label: {
                backgroundColor: '#76c3f2'
            },
        },
    },
    grid: {
        left: '3%',
        right: '4%',
        bottom: '3%',
        containLabel: true
    },
    xAxis : [
        {
            type : 'category',
            boundaryGap : false,
            data : [$($('.member_array')[6]).attr('name')+'月',$($('.member_array')[5]).attr('name')+'月',$($('.member_array')[4]).attr('name')+'月',$($('.member_array')[3]).attr('name')+'月',$($('.member_array')[2]).attr('name')+'月',$($('.member_array')[1]).attr('name')+'月',$($('.member_array')[0]).attr('name')+'月'],
//                splitLine:{show: false},//去除网格线
            axisLine: {
                lineStyle: {
                    type: 'solid',
                    color: '#a0acb4',//左边线的颜色
                    width:'1'//坐标线的宽度
                }
            },
            axisLabel: {
                textStyle: {
                    color: '#a0acb4',//坐标值得具体的颜色


                }
            },

        }


    ],
    yAxis : [
        {
            type : 'value',
            axisLine: {
                lineStyle: {
                    type: 'solid',
                    color: '#a0acb4',//左边线的颜色
                    width:'1'//坐标线的宽度
                }
            },
            axisLabel: {
                textStyle: {
                    color: '#a0acb4',//坐标值得具体的颜色

                }
            },
            splitLine: {
                show: true,
                lineStyle:{
                    color: ['#f0f0f0'],//改变网格线的颜色
                    width: 1,
                    type: 'solid'
                }
            },
        }
    ],
    series : [
        {
            name:'新增会员',
            type:'line',
            stack: '总量',
            label: {
                normal: {
                    show: true,
                    position: 'top',
                    color: '#a0acb4',//坐标值得具体的颜色
                },
            },
            itemStyle: {
                normal: {
                    color: {
                        type: 'linear',
                        x: 0,
                        y: 0,
                        x2: 0,
                        y2: 1,
                        colorStops: [{
                            offset: 0, color: '#76f2e8' // 0% 处的颜色
                        }, {
                            offset: 1, color: '#ffffff' // 100% 处的颜色
                        }],
                        globalCoord: false // 缺省为 false
                    },
                    lineStyle: {
                        color: "#76c3f2"
                    }
                },

            },
            areaStyle: {normal: {}},
            data:[$($('.member_array')[6]).val(), $($('.member_array')[5]).val(), $($('.member_array')[4]).val(), $($('.member_array')[3]).val(), $($('.member_array')[2]).val(),$($('.member_array')[1]).val(), $($('.member_array')[0]).val()]
        }
    ]
};
option3 = {
    color: ['#76c3f2'],
    tooltip : {
        trigger: 'axis',
        axisPointer : {            // 坐标轴指示器，坐标轴触发有效
            type : 'shadow'        // 默认为直线，可选为：'line' | 'shadow'
        },
    },
    grid: {
        left: '3%',
        right: '4%',
        bottom: '3%',
        containLabel: true
    },

    xAxis : [
        {
            type : 'category',
            data : [$($('.trainer_array')[6]).attr('name')+'月', $($('.trainer_array')[5]).attr('name')+'月', $($('.trainer_array')[4]).attr('name')+'月', $($('.trainer_array')[3]).attr('name')+'月', $($('.trainer_array')[2]).attr('name')+'月', $($('.trainer_array')[1]).attr('name')+'月', $($('.trainer_array')[0]).attr('name')+'月'],
            axisTick: {
                alignWithLabel: true
            },
            axisLine: {
                lineStyle: {
                    type: 'solid',
                    color: '#a0acb4',//左边线的颜色
                    width:'1'//坐标线的宽度
                }
            },
            axisLabel: {
                textStyle: {
                    color: '#a0acb4',//坐标值得具体的颜色

                }
            },
        }
    ],
    yAxis : [
        {
            type : 'value',
            axisLine: {
                lineStyle: {
                    type: 'solid',
                    color: '#a0acb4',//左边线的颜色
                    width:'1'//坐标线的宽度
                }
            },
            axisLabel: {
                textStyle: {
                    color: '#a0acb4',//坐标值得具体的颜色

                }
            },
            splitLine: {
                show: true,
                lineStyle:{
                    color: ['#f0f0f0'],//改变网格线的颜色
                    width: 1,
                    type: 'solid'
                }
            },
        }
    ],
    series : [
        {
            name:'团队成员',
            type:'bar',
            barWidth: '60%',
            data:[$($('.trainer_array')[6]).val(), $($('.trainer_array')[5]).val(), $($('.trainer_array')[4]).val(), $($('.trainer_array')[3]).val(), $($('.trainer_array')[2]).val(), $($('.trainer_array')[1]).val(), $($('.trainer_array')[0]).val()]
        }
    ]
};


myChart.setOption(option);
myChart2.setOption(option2);
myChart3.setOption(option3);