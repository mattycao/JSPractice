var myChart = echarts.init(document.getElementById('main'));
var option = {
    title: {
        text: '存量房签约数量'
    },
    tooltip : {
        trigger: 'axis'
    },
    legend: {
        data:['住宅签约','非住宅签约']
    },
    toolbox: {
        feature: {
            saveAsImage: {}
        }
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
            data : []
        }
    ],
    yAxis : [
        {
            type : 'value'
        }
    ],
    series : [
        {
            name:'住宅签约',
            type:'line',
            stack: '总量',
            areaStyle: {normal: {}},
            data:[]
        },
        {
            name:'非住宅签约',
            type:'line',
            stack: '总量',
            areaStyle: {normal: {}},
            data:[]
        }
    ]
};
window.onload = function() {

    var xhr = new XMLHttpRequest();
    xhr.open('GET', '/data', true);
    xhr.responseType = 'json';
    xhr.onreadystatechange = function () {
        if (xhr.readyState == 4) {
            if (xhr.status == 200) {
                var data = xhr.response;
                //console.log(data);
                data.forEach(function(item) {
                    option.xAxis[0].data.unshift(item.date);
                    option.series[0].data.unshift(item.h2);
                    option.series[1].data.unshift(item.h1 - item.h2);
                });
                console.log(option);
                myChart.setOption(option);
            }
        }
    };
    xhr.send();
}
