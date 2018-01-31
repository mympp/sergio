/**
 * Created by Administrator on 2017/11/13 0013.
 */
var myChart = echarts.init(document.getElementById('main'));
var myChart2 = echarts.init(document.getElementById('main2'));
var myChart3 = echarts.init(document.getElementById('main3'));
option = {
    title: {
    },
    tooltip : {
        trigger: 'axis',
        axisPointer: {
            type: 'cross',
            label: {
                backgroundColor: '#72e7de'
            },
        },
    },
    //toolbox: {
    //    show: true,
    //    feature: {
    //        saveAsImage: {}
    //    }
    //},
    xAxis:  {
        show:false,
        splitLine:{show: false},//去除网格线
        type: 'category',
        boundaryGap: false,
        data: ['6月', '7月', '8月', '9月','10月', '11月',"12月"]
    },
    yAxis: {
        show:false,
        splitLine:{show: false},//去除网格线
        type: 'value',
        axisLabel: {
            formatter: '{value} W'
        },
        axisPointer: {
            snap: true
        }
    },
    visualMap: {
        show: false,
        dimension: 0,
        pieces: [{
            lte: 6,
            color: '#72e7de'
        },
            {
            gt: 6,
            lte: 8,
            color: 'red'
        }, {
            gt: 8,
            lte: 14,
            color: 'red'
        }, {
            gt: 14,
            lte: 17,
            color: 'red'
        }, {
            gt: 17,
            color: 'red'
        }
        ]
    },
    //移动悬浮显示
    series: [
        {
            name:'累积数量',
            type:'line',
            smooth: true,
            data: [10, 800, 200,360,100,600 ],
            markArea: {
                data: [ [{
                    xAxis: '07:30'
                }, {
                    xAxis: '10:00'
                }],[{
                    xAxis: '07:30'
                }, {
                    xAxis: '10:00'
                }], [{
                    xAxis: '17:30'
                }, {
                    xAxis: '21:15'
                }] ]
            }
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
            data : ['6月','7月','8月','9月','10月','11月','12月'],
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
            name:'新增业务员',
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
            data:[820, 932, 901, 934, 1290, 1330, 1320]
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
            data : ['6月', '7月', '8月', '9月', '10月', '11月', '12月'],
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
            name:'贡献提成',
            type:'bar',
            barWidth: '60%',
            data:[10, 52, 200, 334, 390, 330, 220]
        }
    ]
};


myChart.setOption(option);
myChart2.setOption(option2);
myChart3.setOption(option3);
