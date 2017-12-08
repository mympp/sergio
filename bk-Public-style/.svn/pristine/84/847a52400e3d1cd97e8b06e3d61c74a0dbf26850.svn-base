/**
 * Created by Administrator on 2017/10/20 0020.
 */
var myChart = echarts.init(document.getElementById('main'));

option = {
    tooltip: {
        trigger: 'item',
        formatter: "{a} <br/>{b}: {c} ({d}%)"
    },
    legend: {
        orient: 'vertical',
        x: '60%',
        y:'15%',
        itemGap:10,
        data:['VIP客户','主要客户','普通客户','小客户'],
        textStyle: {
            fontSize: '12',
            color: '#aaa'// 图例文字颜色
        }
    },
    series: [
        {
            name:'新增客户2',
            type:'pie',
            center : ['27%', '40%'],
            radius: ['40%', '50%'],
            avoidLabelOverlap: false,
            label: {
                normal: {
                    show: false,
                    position: 'center'
                },
                emphasis: {
                    show: true,
                    textStyle: {
                        fontSize: '14',
                        fontWeight: 'bold'
                    }
                }
            },
            color: ['#03abff','#f9e19b','#6bf9d0','#8dccf3'],
            labelLine: {
                normal: {
                    show: false
                }
            },
            data:[
                 {value:$vip, name:'VIP客户'},
                {value:$main, name:'主要客户'},
                {value:$ordinary, name:'普通客户'},
                {value:$small, name:'小客户'},
            ]
        }
    ]
};
myChart.setOption(option);