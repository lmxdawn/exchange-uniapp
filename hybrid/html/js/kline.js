let oldData = [
    ["2004-01-05", 10411.85, 10544.07, 10411.85, 10575.92, 221290000],
    ["2004-01-06", 10543.85, 10538.66, 10454.37, 10584.07, 191460000],
    ["2004-01-07", 10535.46, 10529.03, 10432.12, 10587.55, 225490000],
    ["2004-01-08", 10530.07, 10592.44, 10480.59, 10651.99, 237770000],
    ["2004-01-09", 10589.25, 10458.89, 10420.52, 10603.48, 223250000],
    ["2004-01-12", 10461.55, 10485.18, 10389.85, 10543.03, 197960000],
    ["2004-01-13", 10485.18, 10427.18, 10341.19, 10539.25, 197310000],
    ["2004-01-14", 10428.67, 10538.37, 10426.89, 10573.85, 186280000],
    ["2004-01-15", 10534.52, 10553.85, 10454.52, 10639.03, 260090000],
    ["2004-01-16", 10556.37, 10600.51, 10503.71, 10666.88, 254170000],
    ["2004-01-20", 10601.42, 10528.66, 10447.92, 10676.96, 224300000],
    ["2004-01-21", 10522.77, 10623.62, 10453.11, 10665.72, 214920000],
    ["2004-01-22", 10624.22, 10623.18, 10545.03, 10717.41, 219720000],
    ["2004-01-23", 10625.25, 10568.29, 10490.14, 10691.77, 234260000],
    ["2004-01-26", 10568.12, 10702.51, 10510.44, 10725.18, 186170000],
    ["2004-01-27", 10701.11, 10609.92, 10579.33, 10748.81, 206560000],
    ["2004-01-28", 10610.07, 10468.37, 10412.44, 10703.25, 247660000],
    ["2004-01-29", 10467.41, 10510.29, 10369.92, 10611.56, 273970000],
    ["2004-01-30", 10510.22, 10488.07, 10385.56, 10551.03, 208990000],
    ["2004-02-02", 10487.78, 10499.18, 10395.55, 10614.44, 224800000],
    ["2004-02-03", 10499.48, 10505.18, 10414.15, 10571.48, 183810000],
    ["2004-02-04", 10503.11, 10470.74, 10394.81, 10567.85, 227760000],
    ["2004-02-05", 10469.33, 10495.55, 10399.92, 10566.37, 187810000],
    ["2004-02-06", 10494.89, 10593.03, 10433.74, 10634.81, 182880000],
    ["2004-02-09", 10592.41, 10579.03, 10433.72, 10634.81, 160720000],
    ["2004-02-10", 10578.74, 10613.85, 10511.18, 10667.03, 160590000],
    ["2004-02-11", 10605.48, 10737.72, 10561.55, 10779.41, 277850000],
    ["2004-02-12", 10735.18, 10694.07, 10636.44, 10775.03, 197560000],
    ["2004-02-13", 10696.22, 10627.85, 10578.66, 10755.47, 208340000],
    ["2004-02-17", 10628.88, 10714.88, 10628.88, 10762.07, 169730000],
    ["2004-02-18", 10706.68, 10671.99, 10623.62, 10764.36, 164370000],
    ["2004-02-19", 10674.59, 10664.73, 10626.44, 10794.95, 219890000],
    ["2004-02-20", 10666.29, 10619.03, 10559.11, 10722.77, 220560000],
    ["2004-02-23", 10619.55, 10609.62, 10508.89, 10711.84, 229950000],
    ["2004-02-24", 10609.55, 10566.37, 10479.33, 10681.41, 225670000],
    ["2004-02-25", 10566.59, 10601.62, 10509.42, 10660.73, 192420000],
    ["2004-02-26", 10598.14, 10580.14, 10493.71, 10652.96, 223230000],
    ["2004-02-27", 10581.55, 10583.92, 10519.03, 10689.55, 200050000],
];

// 解析数据 数据意义(下标)：[1]开盘(open)，[2]收盘(close)，[3]最低(lowest)，[4]最高(highest)，[5]数量(vol)
function splitData(rawData) {
    let raw = JSON.parse(JSON.stringify(rawData))
    let categoryData = [];
    let values = [];
    let volumes = [];
    for (let i = 0; i < raw.length; i++) {
        categoryData.push(raw[i][0]);
        values.push([+raw[i][1], +raw[i][2], raw[i][3], raw[i][4], raw[i][5]]);
        volumes.push([i, raw[i][5], raw[i][1] > raw[i][2] ? 1 : -1]);
    }
    return {
        categoryData: categoryData,
        values: values,
        volumes: volumes
    };
}

// 计算MA
function calculateMA(dayCount, data) {
    let result = [];
    for (let i = 0, len = data.length; i < len; i++) {
        if (i < dayCount) {
            result.push('-');
            continue;
        }
        let sum = 0;
        for (let j = 0; j < dayCount; j++) {
            sum += data[i - j][1];
        }
        // console.log(sum, dayCount)
        result.push((sum / dayCount).toFixed(2));
    }
    return result;
}

// 截取数字字符串 保留precision小数
function formatterNum(value, precision) {
    // console.log(value)
    let reg = new RegExp('^\\d+(?:\\.\\d{0,' + precision + '})?')
    return value.toString().match(reg)
}

// 追加数据
function addData(oo) {
    let isUp = false;
    let isUpIndex = -1;
    for (let i = 0; i < oldData.length; i++) {
        if (oldData[i][0] === oo[0]) {
            isUp = true;
            isUpIndex = i;
            oldData[isUpIndex] = oo
        }
    }
    if (!isUp) {
        oldData.shift();
        oldData.push(oo)
    }
    createKline(oldData)
}

// 获取k线数据,生成k线
function createKline(optionData) {
    const data = splitData(optionData)
    let dataMA5 = calculateMA(5, data.values);
    let dataMA10 = calculateMA(10, data.values);
    let dataMA30 = calculateMA(30, data.values);
    let volumeMA5 = calculateMA(5, data.volumes);
    let volumeMA10 = calculateMA(10, data.volumes);
    myChart.setOption({
        xAxis: [
            {
                data: data.categoryData
            },
            {
                data: data.categoryData
            },
        ],
        series: [
            {
                name: '日K',
                data: data.values,
                markLine: {
                    symbol: 'none', //去掉警戒线最后面的箭头
                    data: [
                        {
                            silent: false,//鼠标悬停事件  true没有，false有
                            yAxis: data.values[data.values.length - 1][1],// 这里收盘价作为警戒线的标注值，可以有多个yAxis,多条警示线   或者采用   {type : 'average', name: '平均值'}，type值有  max  min  average，分为最大，最小，平均值
                            lineStyle: {               //警戒线的样式  ，虚实  颜色
                                type: "dotted",
                                color: '#5A96E8',
                                dashOffset: 10,
                            },
                            label: {
                                position: "end",//将警示值放在哪个位置，三个值“start”,"middle","end"  开始  中点 结束
                                distance: 5,
                                color: '#5A96E8',
                                // backgroundColor:"#00b6ff",
                                fontSize: "12px",
                                formatter: ['{c}'].join('\n'),
                                // formatter:"{c}\n最新价",
                            },
                        }
                    ]
                }
            },
            {
                name: 'MA5',
                data: dataMA5
            },
            {
                name: 'MA10',
                data: dataMA10
            },
            {
                name: 'MA30',
                data: dataMA30
            },
            {
                name: 'Volume',
                data: data.volumes
            },
            {
                name: 'VolumeMA5',
                data: volumeMA5
            },
            {
                name: 'VolumeMA10',
                data: volumeMA10
            },
        ]
    })
}

// 初始化(配置项)
function chartInit() {
    let upColor = '#23AD8F';
    let downColor = '#ED6666';
    let colorList = ['#c23531', '#2f4554', '#61a0a8', '#d48265', '#91c7ae', '#749f83', '#ca8622', '#bda29a', '#6e7074',
        '#546570', '#c4ccd3'
    ];
    let option = {
        backgroundColor: 'transparent',
        title: {
            show: false
        },
        legend: {
            show: false
        },
        visualMap: {
            show: false,
            seriesIndex: 4,
            dimension: 2,
            pieces: [{
                value: 1,
                color: downColor
            }, {
                value: -1,
                color: upColor
            }]
        },
        grid: [
            {
                top: 10,
                left: 0,
                right: 80,
                height: '70%',
            },
            {
                top: '80%',
                left: 0,
                right: 80,
                height: '16%',
            },
        ],
        axisPointer: { //坐标轴指示器配置项
            link: {
                xAxisIndex: 'all'
            },
            label: {
                backgroundColor: '#0d1723',
                color: '#fff',
                borderColor: 'rgb(99, 117, 139)',
                borderWidth: 1,
                borderRadius: 2,
                fontSize: 10
            }
        },
        xAxis: [
            {
                type: 'category', //坐标轴类型。(value:数值轴，适用于连续数据。,category:类目轴，适用于离散的类目数据,time: 时间轴，适用于连续的时序数据,log:对数轴。适用于对数数据)
                data: [], //类目数据，在类目轴（type: 'category'）中有效。
                scale: true,
                boundaryGap: true, //坐标轴两边留白策略，类目轴和非类目轴的设置和表现不一样。
                axisLine: {
                    show: false
                }, //坐标轴轴线相关设置
                axisTick: {
                    show: false
                }, //坐标轴刻度相关设置。
                axisLabel: {
                    show: false,
                }, //坐标轴刻度标签的相关设置。
                splitLine: {
                    show: false,
                    lineStyle: {
                        color: 'rgba(255,255,255, 0.1)'
                    }
                }, //坐标轴在 grid 区域中的分隔线。
                min: 'dataMin', //坐标轴刻度最小值。可以设置成特殊值 'dataMin'，此时取数据在该轴上的最小值作为最小刻度。
                max: 'dataMax', //坐标轴刻度最大值。可以设置成特殊值 'dataMax'，此时取数据在该轴上的最大值作为最大刻度。
                axisPointer: {
                    label: {
                        margin: 200
                    }
                },
            },
            {
                type: 'category',
                gridIndex: 1, //x 轴所在的 grid 的索引，默认位于第一个 grid。
                data: [], //类目数据，在类目轴（type: 'category'）中有效。
                scale: true,
                boundaryGap: true, //坐标轴两边留白策略，类目轴和非类目轴的设置和表现不一样。
                axisLine: {
                    show: false,
                    lineStyle: {
                        color: 'rgba(255,255,255,1)',
                        width: 1
                    }
                }, //坐标轴轴线相关设置
                axisTick: {
                    show: false
                }, //坐标轴刻度相关设置。
                axisLabel: { //坐标轴刻度标签的相关设置。
                    show: true,
                    margin: 6,
                    fontSize: 10,
                    color: 'rgba(99, 117, 139, 1.0)',
                    formatter: function (value) {
                        return echarts.format.formatTime('MM-dd', value);
                    }
                },
                splitNumber: 20,
                splitLine: {
                    show: false,
                    lineStyle: {
                        color: 'rgba(255,255,255, 0.1)'
                    }
                }, //坐标轴在 grid 区域中的分隔线。
                min: 'dataMin', //坐标轴刻度最小值。可以设置成特殊值 'dataMin'，此时取数据在该轴上的最小值作为最小刻度。
                max: 'dataMax', //坐标轴刻度最大值。可以设置成特殊值 'dataMax'，此时取数据在该轴上的最大值作为最大刻度。
                // axisPointer: { show: true, type: 'none', label: { show: false }},
            }
        ],
        yAxis: [
            {
                position: 'right', //y 轴的位置。'left','right'
                scale: true, //是否是脱离 0 值比例。设置成 true 后坐标刻度不会强制包含零刻度。在双数值轴的散点图中比较有用。(在设置 min 和 max 之后该配置项无效。)
                axisLine: {
                    show: false
                }, //坐标轴轴线相关设置。
                axisLabel: { //坐标轴刻度标签的相关设置。
                    show: true,
                    color: 'rgba(99, 117, 139, 1.0)',
                    fontSize: 10,
                    margin: 75,
                    align: 'right',
                    formatter: function (value) {
                        return Number(value).toFixed(2)
                    }
                },
                splitLine: {
                    show: false,
                    lineStyle: {
                        color: 'rgba(255,255,255, 0.1)'
                    }
                }, //坐标轴在 grid 区域中的分隔线。
            },
            {
                scale: true,
                gridIndex: 1,
                axisLine: {
                    show: false
                },
                axisTick: {
                    show: false
                },
                axisLabel: {
                    show: false
                },
                splitLine: {
                    show: false
                }
            }
        ],
        animation: false, //是否开启动画。
        color: colorList,
        tooltip: {
            show: true, //是否显示提示框组件，包括提示框浮层和 axisPointer。
            trigger: 'axis', //触发类型。item,axis,none
            formatter(params) {
                let tooltip = '';
                let time = '', open = 0, high = 0, low = 0, close = 0, amount = 0;
                for (let i = 0; i < params.length; i++) {
                    if (params[i].seriesName === '日K') {
                        time = params[i].name;
                        open = params[i].data.length > 1 ? Number(formatterNum(params[i].data[1], 2)) : 0;
                        close = params[i].data.length > 1 ? Number(formatterNum(params[i].data[2], 2)) : 0;
                        low = params[i].data.length > 1 ? Number(formatterNum(params[i].data[3], 2)) : 0;
                        high = params[i].data.length > 1 ? Number(formatterNum(params[i].data[4], 2)) : 0;
                        amount = params[i].data.length > 1 ? Number(formatterNum(params[i].data[5], 2)) : 0;
                        // console.log(time,open,close,low,high,amount)
                        tooltip = '<div class="charts-tooltip">' +
                            '<div class="charts-tooltip-row"><div class="ctr-label">' + '时间' + '</div><div class="ctr-value">' + time + '</div></div>' +
                            '<div class="charts-tooltip-row"><div class="ctr-label">' + '开' + '</div><div class="ctr-value">' + open + '</div></div>' +
                            '<div class="charts-tooltip-row"><div class="ctr-label">' + '高' + '</div><div class="ctr-value">' + high + '</div></div>' +
                            '<div class="charts-tooltip-row"><div class="ctr-label">' + '低' + '</div><div class="ctr-value">' + low + '</div></div>' +
                            '<div class="charts-tooltip-row"><div class="ctr-label">' + '收' + '</div><div class="ctr-value">' + close + '</div></div>' +
                            '<div class="charts-tooltip-row"><div class="ctr-label">' + '数量' + '</div><div class="ctr-value">' + amount + '</div></div></div>';
                    }
                    if (params[i].seriesName === 'MA5') {
                        let MA5 = params[i].data !== 'NAN' ? Number(formatterNum(params[i].data, 2)) : 0
                        // that.MA5 = MA5
                        document.getElementById("chartsMA5").innerHTML = MA5.toString()
                    }
                    if (params[i].seriesName === 'MA10') {
                        let MA10 = params[i].data !== 'NAN' ? Number(formatterNum(params[i].data, 2)) : 0
                        // that.MA10 = MA10
                        document.getElementById("chartsMA10").innerHTML = MA10.toString()
                    }
                    if (params[i].seriesName === 'MA30') {
                        let MA30 = params[i].data !== 'NAN' ? Number(formatterNum(params[i].data, 2)) : 0
                        // that.MA30 = MA30
                    }
                    if (params[i].seriesName === 'VolumeMA5') {
                        let volMA5 = params[i].data !== 'NAN' ? Number(formatterNum(params[i].data, 2)) : 0
                        // that.volMA5 = volMA5
                        document.getElementById("chartsVOL").innerHTML = volMA5.toString()
                    }
                    if (params[i].seriesName === 'VolumeMA10') {
                        let volMA10 = params[i].data !== 'NAN' ? Number(formatterNum(params[i].data, 2)) : 0
                        // that.volMA10 = volMA10
                    }
                }
                return tooltip;
            },
            triggerOn: 'click', //提示框触发的条件 'mousemove','click','mousemove|click','none'
            textStyle: {
                fontSize: 10
            }, //提示框浮层的文本样式
            backgroundColor: 'rgba(30,42,66,0.8);', //提示框浮层的背景颜色。
            borderColor: '#2f3a56', //提示框浮层的边框颜色。
            borderWidth: 2,
            position: (pos, params, el, elRect, size) => { //提示框浮层的位置，默认不设置时位置会跟随鼠标的位置。
                let obj = {
                    top: 20
                };
                obj[['left', 'right'][+(pos[0] < size.viewSize[0] / 2)]] = 10;
                return obj;
            },
            axisPointer: { //坐标轴指示器配置项。
                label: {
                    color: 'rgba(99, 117, 139, 1.0)',
                    fontSize: 10,
                    backgroundColor: '#020204',
                    borderColor: "rgba(99, 117, 139, 1.0)",
                    shadowBlur: 0,
                    borderWidth: 1,
                    padding: [5, 3, 5, 3],
                },
                animation: false,
                type: 'cross',
                lineStyle: {
                    type: 'solid',
                    color: 'rgba(30, 42, 66, 0.2)',
                    width: 10,
                    shadowColor: 'rgba(30, 42, 66, 1)',
                    shadowBlur: 0,
                    shadowOffsetY: 68,
                },
                crossStyle: {
                    type: 'solid',
                    color: 'rgba(99, 117, 139, 1.0)',
                    width: 0.5,
                }
            }
        },

        dataZoom: [{ //用于区域缩放
            type: 'inside',
            xAxisIndex: [0, 1],
            realtime: false,
            start: 50,
            end: 100,
        }
        ],
        series: [
            {
                type: 'candlestick',
                name: '日K',
                data: [],
                itemStyle: {
                    color: upColor,
                    color0: downColor,
                    borderColor: upColor,
                    borderColor0: downColor
                },
                markPoint: {
                    symbol: 'rect',
                    symbolSize: [-10, 0.5],
                    symbolOffset: [5, 0],
                    itemStyle: {
                        color: 'rgba(255,255,255,.87)'
                    },
                    label: {
                        color: 'rgba(255,255,255,.87)',
                        offset: [10, 0],
                        fontSize: 10,
                        align: 'left',
                        formatter: function (params) {
                            return Number(params.value).toFixed(2)
                        }
                    },
                    data: [{
                        name: 'max',
                        type: 'max',
                        valueDim: 'highest'
                    },
                        {
                            name: 'min',
                            type: 'min',
                            valueDim: 'lowest'
                        }
                    ]
                },
            },
            {
                name: 'MA5',
                type: 'line',
                data: [],
                symbol: 'none',//去除圆点
                smooth: true,
                lineStyle: {normal: {opacity: 1, width: 1, color: "#eef4ba"}},
                z: 5
            },
            {
                name: 'MA10',
                type: 'line',
                data: [],
                symbol: 'none',//去除圆点
                smooth: true,
                lineStyle: {normal: {opacity: 1, width: 1, color: '#83c1c5'}},
                z: 4
            },
            {
                name: 'MA30',
                type: 'line',
                data: [],
                symbol: 'none',//去除圆点
                smooth: true,
                lineStyle: {normal: {opacity: 1, width: 1, color: '#b39cd8'}},
                z: 3
            },
            {
                name: 'Volume',
                type: 'bar',
                xAxisIndex: 1,
                yAxisIndex: 1,
                data: []
            },
            {
                name: 'VolumeMA5',
                type: 'line',
                xAxisIndex: 1,
                yAxisIndex: 1,
                data: [],
                symbol: 'none',//去除圆点
                smooth: true,
                lineStyle: {normal: {opacity: 1, width: 1, color: "#eef4ba"}},
                z: 5
            },
            {
                name: 'VolumeMA10',
                type: 'line',
                xAxisIndex: 1,
                yAxisIndex: 1,
                data: [],
                symbol: 'none',//去除圆点
                smooth: true,
                lineStyle: {normal: {opacity: 1, width: 1, color: '#83c1c5'}},
                z: 4
            },
        ]
    };
    myChart.setOption(option);
    // 加载上一页数据
    setTimeout(() => {
        myChart.on('dataZoom', (params) => {
            let num = params.batch[0]['start'];
            console.log('NUM为：', num)
            if (num === 0) {
                console.log('到最左边了')
            }
        })
    }, 3000)
    window.addEventListener('resize', () => {
        myChart.resize()
    })
}

const myChart = echarts.init(document.getElementById('main'));
chartInit()
createKline(oldData)

window.addKline = (obj) => {
    addData(obj)
}