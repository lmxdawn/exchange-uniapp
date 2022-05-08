<template>
  <view class="content">
    <!-- #ifdef APP-PLUS || H5 -->
    <view class="echarts-box">
      <view class="echarts-box-loading echarts" v-if="loadingStatus === 'loading'">
        <uni-load-more color="#2DBD96" iconType="circle" :status="loadingStatus" :contentText="{}"></uni-load-more>
      </view>
      <view @click="echarts.onClick" :prop="option" :change:prop="echarts.updateEcharts" id="echarts" class="echarts"></view>
    </view>
    <view class="echarts-bar-label" v-if="loadingStatus !== 'loading'">
      <view class="echarts-VOL">
        VOL:
        <text>{{volMA5}}</text>
      </view>
      <view class="echarts-MA5">
        MA10:
        <text>{{MA5}}</text>
      </view>
      <view class="echarts-MA10">
        MA10:
        <text>{{MA10}}</text>
      </view>
    </view>
    <view class="echarts-division"></view>
    <view class="echarts-division2"></view>
    <view class="echarts-middle-tab">
      <view class="echarts-middle-tab-item">
        <text class="echarts-middle-tab-item-text selected">买卖盘</text>
        <view class="echarts-middle-tab-item-under w48 selected"></view>
      </view>
      <view class="echarts-middle-tab-item">
        <text class="echarts-middle-tab-item-text">近期成交</text>
        <view class="echarts-middle-tab-item-under w64"></view>
      </view>
      <view class="echarts-middle-tab-item">
        <text class="echarts-middle-tab-item-text">币种简介</text>
        <view class="echarts-middle-tab-item-under w64"></view>
      </view>
    </view>
    <view class="depth-echarts-box">
      <view class="depth-echarts-box-loading depth-echarts" v-if="depthLoadingStatus === 'loading'">
        <uni-load-more color="#2DBD96" iconType="circle" :status="depthLoadingStatus" :contentText="{}"></uni-load-more>
      </view>
      <view :prop="depthOption" :change:prop="echarts.updateDepthEcharts" id="depthEcharts" class="depth-echarts"></view>
    </view>
    <view class="depth-division">
      <view class="depth-division-item">
        <view class="depth-division-icon buy"></view>
        <text class="depth-division-text">买</text>
      </view>
      <view class="depth-division-item">
        <view class="depth-division-icon sell"></view>
        <text class="depth-division-text">卖</text>
      </view>
    </view>
    <view class="depth-list-header">
      <text class="depth-list-header-left">累计(TRX)</text>
      <text class="depth-list-header-middle">价格(USDT)</text>
      <text class="depth-list-header-right">累计(TRX)</text>
    </view>
    <view class="depth-list-view">
      <view class="depth-list-view-loading depth-list-view" v-if="depthLoadingStatus === 'loading'">
        <uni-load-more color="#2DBD96" iconType="circle" :status="depthLoadingStatus" :contentText="{}"></uni-load-more>
      </view>
      <view class="depth-list">
        <view class="depth-list-box">
          <view class="depth-list-item" v-for="item in buyData" :key="item[0]">
            <text class="depth-list-item-buy-amount">{{item[2]}}</text>
            <text class="depth-list-item-buy-price">{{item[0]}}</text>
            <view class="depth-list-item-buy-percentage" :style="{width: (item[2] / buySum * 100 + 5) + '%'}"></view>
          </view>
        </view>
        <view class="depth-list-division"></view>
        <view class="depth-list-box">
          <view class="depth-list-item" v-for="item in sellData" :key="item[0]">
            <text class="depth-list-item-sell-price">{{item[0]}}</text>
            <text class="depth-list-item-sell-amount">{{item[2]}}</text>
            <view class="depth-list-item-sell-percentage" :style="{width: (item[2] / sellSum * 100 + 5) + '%'}"></view>
          </view>
        </view>
      </view>
    </view>
    <!-- #endif -->
    <!-- #ifndef APP-PLUS || H5 -->
    <view>非 APP、H5 环境不支持</view>
    <!-- #endif -->
  </view>
</template>

<script>
  // 解析数据 数据意义(下标)：[1]开盘(open)，[2]收盘(close)，[3]最低(lowest)，[4]最高(highest)，[5]数量(vol)
  function splitData(raw) {
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
      result.push((sum / dayCount).toFixed(2));
    }
    return result;
  }

  /**
    ** 加法函数，用来得到精确的加法结果
    ** 说明：javascript的加法结果会有误差，在两个浮点数相加的时候会比较明显。这个函数返回较为精确的加法结果。
    ** 调用：accAdd(arg1,arg2)
    ** 返回值：arg1加上arg2的精确结果
  **/
  function accAdd(arg1, arg2) {
    var r1, r2, m, c;
    try {
      r1 = arg1.toString().split(".")[1].length;
    } catch (e) {
      r1 = 0;
    }
    try {
      r2 = arg2.toString().split(".")[1].length;
    } catch (e) {
      r2 = 0;
    }
    c = Math.abs(r1 - r2);
    m = Math.pow(10, Math.max(r1, r2));
    if (c > 0) {
      var cm = Math.pow(10, c);
      if (r1 > r2) {
        arg1 = Number(arg1.toString().replace(".", ""));
        arg2 = Number(arg2.toString().replace(".", "")) * cm;
      } else {
        arg1 = Number(arg1.toString().replace(".", "")) * cm;
        arg2 = Number(arg2.toString().replace(".", ""));
      }
    } else {
      arg1 = Number(arg1.toString().replace(".", ""));
      arg2 = Number(arg2.toString().replace(".", ""));
    }
    return (arg1 + arg2) / m;
  }
  let upColor = '#2DBD96';
  let downColor = '#ED6666';
  let colorList = ['#c23531', '#2f4554', '#61a0a8', '#d48265', '#91c7ae', '#749f83', '#ca8622', '#bda29a', '#6e7074',
    '#546570', '#c4ccd3'
  ];
  export default {
    props: {
      timeType: {
        type: String,
        default: ""
      },
      loadingStatus: {
        type: String,
        default: "loading"
      },
      depthLoadingStatus: {
        type: String,
        default: "loading"
      },
    },
    data() {
      return {
        option: {},
        kLineData: [],
        buyData: [],
        buySum: 0,
        sellData: [],
        sellSum: 0,
        MA5: 0,
        MA10: 0,
        MA30: 0,
        volMA5: 0,
        volMA10: 0,
        depthOption: {},
      }
    },
    mounted() {
    },
    methods: {
      // 初始化数据
      init(kLineData, buyData, sellData) {
        this.kLineData = kLineData;


        this.createKline(this.kLineData)
        this.createDepth(buyData.reverse(), sellData)
      },
      // 追加数据
      addData(oo) {
        let isUp = false;
        let isUpIndex = -1;
        for (let i = 0; i < this.kLineData.length; i++) {
          if (this.kLineData[i][0] === oo[0]) {
            isUp = true;
            isUpIndex = i;
            this.kLineData[isUpIndex] = oo
          }
        }
        if (!isUp) {
          this.kLineData.shift();
          this.kLineData.push(oo)
        }
        this.createKline(this.kLineData)
      },
      // 获取k线数据,生成k线
      createKline(optionData) {
        const data = splitData(optionData)
        let dataMA5 = calculateMA(5, data.values);
        let dataMA10 = calculateMA(10, data.values);
        let dataMA30 = calculateMA(30, data.values);
        let volumeMA5 = calculateMA(5, data.volumes);
        let volumeMA10 = calculateMA(10, data.volumes);
        this.option = {
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
              data: data.categoryData, //类目数据，在类目轴（type: 'category'）中有效。
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
              data: data.categoryData, //类目数据，在类目轴（type: 'category'）中有效。
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
                color: '#9197A3',
                // formatter: this.formatterTime()
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
                // formatter: this.formatterToFixed(2)
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
            formatFunClue: 'formatFunClue',//对应echarts.vue
            // formatter(params) {
            //   let tooltip = '';
            //   let time = '', open = 0, high = 0, low = 0, close = 0, amount = 0;
            //   for (let i = 0; i < params.length; i++) {
            //     if (params[i].seriesName === '日K') {
            //       time = params[i].name;
            //       open = params[i].data.length > 1 ? Number(that.formatterNum(params[i].data[1], 2)) : 0;
            //       close = params[i].data.length > 1 ? Number(that.formatterNum(params[i].data[2], 2)) : 0;
            //       low = params[i].data.length > 1 ? Number(that.formatterNum(params[i].data[3], 2)) : 0;
            //       high = params[i].data.length > 1 ? Number(that.formatterNum(params[i].data[4], 2)) : 0;
            //       amount = params[i].data.length > 1 ? Number(that.formatterNum(params[i].data[5], 2)) : 0;
            //       tooltip = '<div class="charts-tooltip">' +
            //           '<div class="charts-tooltip-row"><div class="ctr-label">' + '时间' + '</div><div class="ctr-value">' + time + '</div></div>' +
            //           '<div class="charts-tooltip-row"><div class="ctr-label">' + '开' + '</div><div class="ctr-value">' + open + '</div></div>' +
            //           '<div class="charts-tooltip-row"><div class="ctr-label">' + '高' + '</div><div class="ctr-value">' + high + '</div></div>' +
            //           '<div class="charts-tooltip-row"><div class="ctr-label">' + '低' + '</div><div class="ctr-value">' + low + '</div></div>' +
            //           '<div class="charts-tooltip-row"><div class="ctr-label">' + '收' + '</div><div class="ctr-value">' + close + '</div></div>' +
            //           '<div class="charts-tooltip-row"><div class="ctr-label">' + '数量' + '</div><div class="ctr-value">' + amount + '</div></div></div>';
            //     }
            //     if (params[i].seriesName === 'MA5') {
            //       let MA5 = params[i].data !== 'NAN' ? Number(that.formatterNum(params[i].data, 2)) : 0
            //       that.MA5 = MA5
            //     }
            //     if (params[i].seriesName === 'MA10') {
            //       let MA10 = params[i].data !== 'NAN' ? Number(that.formatterNum(params[i].data, 2)) : 0
            //       that.MA10 = MA10
            //     }
            //     if (params[i].seriesName === 'MA30') {
            //       let MA30 = params[i].data !== 'NAN' ? Number(that.formatterNum(params[i].data, 2)) : 0
            //       that.MA30 = MA30
            //     }
            //     if (params[i].seriesName === 'VolumeMA5') {
            //       let volMA5 = params[i].data !== 'NAN' ? Number(that.formatterNum(params[i].data, 2)) : 0
            //       that.volMA5 = volMA5
            //     }
            //     if (params[i].seriesName === 'VolumeMA10') {
            //       let volMA10 = params[i].data !== 'NAN' ? Number(that.formatterNum(params[i].data, 2)) : 0
            //       that.volMA10 = volMA10
            //     }
            //   }
            //   return tooltip;
            // },
            triggerOn: 'click', //提示框触发的条件 'mousemove','click','mousemove|click','none'
            textStyle: {
              fontSize: 10
            }, //提示框浮层的文本样式
            backgroundColor: 'rgba(30,42,66,0.8);', //提示框浮层的背景颜色。
            borderColor: '#2f3a56', //提示框浮层的边框颜色。
            borderWidth: 2,
            // position: (pos, params, el, elRect, size) => { //提示框浮层的位置，默认不设置时位置会跟随鼠标的位置。
            //   let obj = {
            //     top: 20
            //   };
            //   obj[['left', 'right'][+(pos[0] < size.viewSize[0] / 2)]] = 10;
            //   return obj;
            // },
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
              },
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
              data: dataMA5,
              symbol: 'none',//去除圆点
              smooth: true,
              lineStyle: {normal: {opacity: 1, width: 1, color: "#eef4ba"}},
              z: 5
            },
            {
              name: 'MA10',
              type: 'line',
              data: dataMA10,
              symbol: 'none',//去除圆点
              smooth: true,
              lineStyle: {normal: {opacity: 1, width: 1, color: '#83c1c5'}},
              z: 4
            },
            {
              name: 'MA30',
              type: 'line',
              data: dataMA30,
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
              data: data.volumes
            },
            {
              name: 'VolumeMA5',
              type: 'line',
              xAxisIndex: 1,
              yAxisIndex: 1,
              data: volumeMA5,
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
              data: volumeMA10,
              symbol: 'none',//去除圆点
              smooth: true,
              lineStyle: {normal: {opacity: 1, width: 1, color: '#83c1c5'}},
              z: 4
            },
          ]
        }
        // this.option = {
        //   xAxis: [
        //     {
        //       data: data.categoryData
        //     },
        //     {
        //       data: data.categoryData
        //     },
        //   ],
        //   series: [
        //     {
        //       name: '日K',
        //       data: data.values,
        //       markLine: {
        //         symbol: 'none', //去掉警戒线最后面的箭头
        //         data: [
        //           {
        //             silent: false,//鼠标悬停事件  true没有，false有
        //             yAxis: data.values[data.values.length - 1][1],// 这里收盘价作为警戒线的标注值，可以有多个yAxis,多条警示线   或者采用   {type : 'average', name: '平均值'}，type值有  max  min  average，分为最大，最小，平均值
        //             lineStyle: {               //警戒线的样式  ，虚实  颜色
        //               type: "dotted",
        //               color: '#5A96E8',
        //               dashOffset: 10,
        //             },
        //             label: {
        //               position: "end",//将警示值放在哪个位置，三个值“start”,"middle","end"  开始  中点 结束
        //               distance: 5,
        //               color: '#5A96E8',
        //               // backgroundColor:"#00b6ff",
        //               fontSize: "12px",
        //               formatter: ['{c}'].join('\n'),
        //               // formatter:"{c}\n最新价",
        //             },
        //           }
        //         ]
        //       }
        //     },
        //     {
        //       name: 'MA5',
        //       data: dataMA5
        //     },
        //     {
        //       name: 'MA10',
        //       data: dataMA10
        //     },
        //     {
        //       name: 'MA30',
        //       data: dataMA30
        //     },
        //     {
        //       name: 'Volume',
        //       data: data.volumes
        //     },
        //     {
        //       name: 'VolumeMA5',
        //       data: volumeMA5
        //     },
        //     {
        //       name: 'VolumeMA10',
        //       data: volumeMA10
        //     },
        //   ]
        // }
      },
      createDepth(buy, sell) {
        // 买盘数据
        let buyDataList = [];
        let buyData = [];
        let buySum = 0;
        let buyLen = buy.length > 20 ? 20 : buy.length;
        for (let i = 0; i < buyLen; i++) {
          buySum = accAdd(buySum, buy[i][1]);
          buyDataList.push([buy[i][0], buy[i][1], buySum])
          buyData.push([buy[i][0], buySum])
        }
        this.buySum = buySum;
        this.buyData = buyDataList;

        // 卖盘数据
        let sellDataList = [];
        let sellData = [];
        let sellSum = 0;
        let sellLen = sell.length > 20 ? 20 : sell.length;
        for (let i = 0; i < sellLen; i++) {
          sellSum = accAdd(sellSum, sell[i][1]);
          sellDataList.push([sell[i][0], sell[i][1], sellSum])
          sellData.push([sell[i][0], sellSum])
        }
        this.sellSum = sellSum;
        this.sellData = sellDataList;

        this.depthOption = {
          animation: false,
          grid: [
            {
              top: 0,
              left: 0,
              right: 0,
              bottom: 20,
            },
          ],
          tooltip: {
            trigger: 'axis',
            confine: true,
            showContent: false,
            axisPointer: {
              lineStyle: {
                color: 'rgba(0, 0, 0, 0)',
              }
            },
          },
          xAxis: {
            type: 'category',
            axisLine: {
              show: false
            }, //坐标轴轴线相关设置。
            axisTick: {
              show: true,
              width: 1,
              lineStyle: {
                color: '#9197A3'
              }
            },
            axisLabel: { //坐标轴刻度标签的相关设置。
              show: true,
              margin: 6,
              fontSize: 12,
              color: '#9197A3'
            },
          },
          yAxis: [
            {
              type: 'value',
              position: 'right',
              splitNumber: 4,
              axisTick: {
                inside: true,
              },
              axisLabel: {
                inside: true,
                showMinLabel: false,
              },
              splitLine: {
                show: false,
              }
            }
          ],
          series: [
            {
              name: 'buy',
              data: buyData.reverse(),
              type: 'line',
              symbol: 'circle',
              showSymbol: false,
              symbolSize: 10,
              itemStyle: {
                color: 'rgba(45, 189, 150, 1)',
                borderColor: 'rgba(45, 189, 150, 0.2)',
                borderWidth: 10,
              },
              label: {
                show: true,
                position: 'right',
                distance: 10,
                padding: [5, 8, 2, 8],
                fontSize: 12,
                color: 'rgba(153, 151, 151, 0.8)',
                backgroundColor: 'rgba(0, 0, 0, .5)',
                // formatter(params) {
                //   return [`价格 ：{a|${params.data[0]}}`, `总量 ：{a|${Math.round(params.data[1])}}`].join('\n')
                // },
                rich: {
                  a: {
                    color: 'rgba(153, 151, 151, 0.8)',
                    fontSize: '12',
                    lineHeight: '15',
                  },
                }
              },
              lineStyle: {
                color: '#2DBD96',
              },
              areaStyle: {
                color: '#2DBD96',
                opacity: .2,
              },
            },
            {
              name: 'sell',
              data: sellData,
              type: 'line',
              symbol: 'circle',
              showSymbol: false,
              symbolSize: 10,
              itemStyle: {
                color: 'rgba(237, 102, 102, 1)',
                borderColor: 'rgba(237, 102, 102, 0.2)',
                borderWidth: 10,
              },
              label: {
                show: true,
                position: 'left',
                distance: 10,
                padding: [5, 8, 2, 8],
                fontSize: 12,
                color: 'rgba(153, 151, 151, 0.8)',
                backgroundColor: 'rgba(0, 0, 0, .5)',
                // formatter (params) {
                //   return [`价格 ：{a|${params.data[0]}}`, `总量 ：{a|${Math.round(params.data[1])}}`].join('\n')
                // },
                rich: {
                  a: {
                    color: 'rgba(153, 151, 151, 0.8)',
                    fontSize: '12',
                    lineHeight: '15',
                  },
                }
              },
              lineStyle: {
                color: '#ED6666',
              },
              areaStyle: {
                color: '#ED6666',
                opacity: .2,
              },
            },
          ]
        }
      },
      onViewClick(options) {
        console.log(options)
      },
      onTooltipMA5(value) {
        this.MA5 = value
      },
      onTooltipMA10(value) {
        this.MA10 = value
      },
      onTooltipMA30(value) {
        this.MA30 = value
      },
      onTooltipVolMA5(value) {
        this.volMA5 = value
      },
      onTooltipVolMA10(value) {
        this.volMA10 = value
      },
      // 截取数字字符串 保留precision小数
      formatterNum(value, precision) {
        let reg = new RegExp('^\\d+(?:\\.\\d{0,' + precision + '})?')
        return value.toString().match(reg)
      },
    }
  }
</script>

<script module="echarts" lang="renderjs">
	let myChart
	let depthMyChart
	export default {
		mounted() {
			if (typeof window.echarts === 'function') {
				this.initEcharts()
				this.initDepthEcharts()
			} else {
				// 动态引入较大类库避免影响页面展示
				const script = document.createElement('script')
				// view 层的页面运行在 www 根目录，其相对路径相对于 www 计算
				script.src = 'static/echarts.min.js'
				script.onload = this.initEcharts.bind(this)
				document.head.appendChild(script)
			}
		},
		methods: {
			initEcharts() {
				myChart = echarts.init(document.getElementById('echarts'))
				// 观测更新的数据在 view 层可以直接访问到
				this.updateEcharts(this.option)
				// 监听左右滑动
				myChart.on('dataZoom', (params) => {
            let num = params.batch[0]['start'];
            console.log('NUM为：', num)
            if (num === 0) {
                console.log('到最左边了')
            }
        })

        // 深度图
				depthMyChart = echarts.init(document.getElementById('depthEcharts'))
				// 观测更新的数据在 view 层可以直接访问到
				this.updateDepthEcharts(this.depthOption)
			},
			updateEcharts(newValue, oldValue, ownerInstance, instance) {
				// 监听 service 层数据变更
        if (myChart) {
          // 因App端，回调函数无法从renderjs外传递，故在此自定义设置相关回调函数
          if (newValue.tooltip) {
            // 格式化tooltip
            newValue.tooltip.formatter = this.tooltipFormatter(ownerInstance)
            // 设置tooltip的位置
            newValue.tooltip.position = this.tooltipPosition()
          }
          if (newValue.xAxis && newValue.xAxis.length > 1) {
            newValue.xAxis[1].axisLabel.formatter = this.formatterTime()
          }
          if (newValue.yAxis && newValue.yAxis.length > 0) {
            newValue.yAxis[0].axisLabel.formatter = this.formatterToFixed(2)
          }
          myChart.setOption(newValue)
        }
			},
			initDepthEcharts() {
				depthMyChart = echarts.init(document.getElementById('depthEcharts'))
				// 观测更新的数据在 view 层可以直接访问到
				this.updateDepthEcharts(this.depthOption)
			},
			updateDepthEcharts(newValue, oldValue, ownerInstance, instance) {
				// 监听 service 层数据变更
        if (depthMyChart) {
          if(newValue.series && newValue.series.length > 0) {
            newValue.series[0].label.formatter = this.depthTooltipFormatter()
          }
          if(newValue.series && newValue.series.length > 1) {
            newValue.series[1].label.formatter = this.depthTooltipFormatter()
          }
          depthMyChart.setOption(newValue)
        }
			},
			onClick(event, ownerInstance) {
				// 调用 service 层的方法
				ownerInstance.callMethod('onViewClick', {
					test: 'sss'
				})
			},
			/**
			 * 设置tooltip的位置，防止超出画布
			 */
			tooltipPosition() {
			  return (pos, params, el, elRect, size) => {
          let obj = {
            top: 20
          };
          obj[['left', 'right'][+(pos[0] < size.viewSize[0] / 2)]] = 10;
          return obj;
			  }
			},
			/**
			 * tooltip格式化
			 */
			tooltipFormatter(ownerInstance) {
        return params => {
          let tooltip = '';
          let time = '', open = 0, high = 0, low = 0, close = 0, amount = 0;
          for (let i = 0; i < params.length; i++) {
            if (params[i].seriesName === '日K') {
              time = params[i].name;
              open = params[i].data.length > 1 ? Number(this.formatterNum(params[i].data[1], 2)) : 0;
              close = params[i].data.length > 1 ? Number(this.formatterNum(params[i].data[2], 2)) : 0;
              low = params[i].data.length > 1 ? Number(this.formatterNum(params[i].data[3], 2)) : 0;
              high = params[i].data.length > 1 ? Number(this.formatterNum(params[i].data[4], 2)) : 0;
              amount = params[i].data.length > 1 ? Number(this.formatterNum(params[i].data[5], 2)) : 0;
              tooltip = '<view>' +
                  '<view style="display: flex;flex-direction: row;align-items: center;justify-content: space-between;padding: 5px 0;"><view style="color: #51617b;">' + '时间' + '</view><view style="color: #acbadf;margin-left: 30px">' + time + '</view></view>' +
                  '<view style="display: flex;flex-direction: row;align-items: center;justify-content: space-between;padding: 5px 0;"><view style="color: #51617b;">' + '开' + '</view><view style="color: #acbadf;margin-left: 30px">' + open + '</view></view>' +
                  '<view style="display: flex;flex-direction: row;align-items: center;justify-content: space-between;padding: 5px 0;"><view style="color: #51617b;">' + '高' + '</view><view style="color: #acbadf;margin-left: 30px">' + high + '</view></view>' +
                  '<view style="display: flex;flex-direction: row;align-items: center;justify-content: space-between;padding: 5px 0;"><view style="color: #51617b;">' + '低' + '</view><view style="color: #acbadf;margin-left: 30px">' + low + '</view></view>' +
                  '<view style="display: flex;flex-direction: row;align-items: center;justify-content: space-between;padding: 5px 0;"><view style="color: #51617b;">' + '收' + '</view><view style="color: #acbadf;margin-left: 30px">' + close + '</view></view>' +
                  '<view style="display: flex;flex-direction: row;align-items: center;justify-content: space-between;padding: 5px 0;"><view style="color: #51617b;">' + '数量' + '</view><view style="color: #acbadf;margin-left: 30px">' + amount + '</view></view></view>';
            }
            if (params[i].seriesName === 'MA5') {
              let MA5 = params[i].data !== 'NAN' ? Number(this.formatterNum(params[i].data, 2)) : 0
              // 调用 service 层的方法
              ownerInstance.callMethod('onTooltipMA5', MA5)
            }
            if (params[i].seriesName === 'MA10') {
              let MA10 = params[i].data !== 'NAN' ? Number(this.formatterNum(params[i].data, 2)) : 0
              // 调用 service 层的方法
              ownerInstance.callMethod('onTooltipMA10', MA10)
            }
            if (params[i].seriesName === 'MA30') {
              let MA30 = params[i].data !== 'NAN' ? Number(this.formatterNum(params[i].data, 2)) : 0
              // 调用 service 层的方法
              ownerInstance.callMethod('onTooltipMA30', MA30)
            }
            if (params[i].seriesName === 'VolumeMA5') {
              let volMA5 = params[i].data !== 'NAN' ? Number(this.formatterNum(params[i].data, 2)) : 0
              // 调用 service 层的方法
              ownerInstance.callMethod('onTooltipVolMA5', volMA5)
            }
            if (params[i].seriesName === 'VolumeMA10') {
              let volMA10 = params[i].data !== 'NAN' ? Number(this.formatterNum(params[i].data, 2)) : 0
              // 调用 service 层的方法
              ownerInstance.callMethod('onTooltipVolMA10', volMA10)
            }
          }
          return tooltip;
        }
      },
      // 格式化时间
      formatterTime() {
        return value => {
          let formatText = ""
          // 分秒格式
          if (this.timeType === 'm') {
            formatText = "hh:mm"
          }
          // 小时格式
          if (this.timeType === 'h') {
            formatText = "yyyy-MM-dd hh:mm"
          }
          // 天格式
          if (this.timeType === 'd') {
            formatText = "yyyy-MM-dd"
          }
          return echarts.format.formatTime(formatText, new Date(value));
        }
      },
      // 保留位数
      formatterToFixed(fixed) {
        return value => {
          return Number(value).toFixed(fixed)
        }
      },
			/**
			 * tooltip格式化
			 */
			depthTooltipFormatter() {
			  return params => {
			    return [`价格 ：{a|${params.data[0]}}`, `总量 ：{a|${Math.round(params.data[1])}}`].join('\n')
			  }
			},
      // 截取数字字符串 保留precision小数
      formatterNum(value, precision) {
        let reg = new RegExp('^\\d+(?:\\.\\d{0,' + precision + '})?')
        return value.toString().match(reg)
      },
		}
	}
</script>

<style lang="scss" scoped>
.content {
  position: relative;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
}

.echarts-box {
  position: relative;
  width: 750rpx;
  height: 500px;
}

.echarts-box-loading {
  position: absolute;
  top: 0;
  left: 0;
  padding-top: 200px;
  z-index: 9999;
  box-sizing: border-box;
}

.echarts {
  width: 750rpx;
  height: 500px;
  overflow: hidden;
  background-color: #121620;
  background-image: linear-gradient(rgba(153, 151, 151, 0.1) 1px, transparent 0),
  linear-gradient(90deg, rgba(153, 151, 151, 0.1) 1px, transparent 0),
  linear-gradient(white 1px, transparent 0),
  linear-gradient(90deg, white 1px, transparent 0);
  background-size: 80px 80px, 80px 80px, 0 0, 0 0;
}

.echarts-VOL {
  color: #ED6666;
  margin-right: 10px;
}

.echarts-MA5 {
  color: #5A96E8;
  margin-right: 10px;
}

.echarts-MA10 {
  color: #FFD70E;
  margin-right: 10px;
}

.echarts-bar-label {
  position: absolute;
  left: 10px;
  top: 370px;
  font-size: 10px;
  display: flex;
  justify-content: center;
  align-items: center;
}

.echarts-bar-label view {
  margin-right: 14px;
}

.echarts-division {
  height: 2px;
  width: 750rpx;
  background-color: #191E29;
}

.echarts-division2 {
  height: 8px;
  width: 750rpx;
  background-color: #000000;
}

.echarts-middle-tab {
  display: flex;
  flex-direction: row;
  padding: 5px 15px;
  width: 750rpx;
  box-sizing: border-box;
}
.echarts-middle-tab-item {
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  margin-right: 20px;
}
.echarts-middle-tab-item-text {
  color: #b8c6d8;
  font-size: 17px;
  &.selected {
     color: #E1E8F5;
  }
}
.echarts-middle-tab-item-under {
  margin-top: 3px;
  width: 18px;
  height: 4px;
  &.selected {
     background-color: #2DBD96;
  }
  &.w48 {
     width: 48px;
  }
  &.w64 {
     width: 64px;
  }
}

/*深度图*/
.depth-echarts-box {
  position: relative;
  width: 750rpx;
  height: 260px;
}
.depth-echarts-box-loading {
  position: absolute;
  top: 0;
  left: 0;
  padding-top: 100px;
  z-index: 9999;
  box-sizing: border-box;
}
.depth-echarts {
  width: 750rpx;
  height: 260px;
  background-color: #191E29;
  background-image: linear-gradient(rgba(153, 151, 151, 0.1) 1px, transparent 0),
  linear-gradient(90deg, rgba(153, 151, 151, 0.1) 1px, transparent 0),
  linear-gradient(white 1px, transparent 0),
  linear-gradient(90deg, white 1px, transparent 0);
  background-size: 40px 40px, 80px 80px, 0 0, 0 0;
}

//分割文字
.depth-division {
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  margin-top: 10px;
  width: 100px;
}
.depth-division-item {
  display: flex;
  flex-direction: row;
  justify-content: center;
  align-items: center;
}
.depth-division-icon {
  width: 10px;
  height: 10px;
  background-color: #2DBD96;
  margin-right: 8px;
  &.sell {
    background-color: #ED6666;
  }
}
.depth-division-text {
  color: #9197A3;
  font-size: 12px;
}

//深度数据的头部
.depth-list-header {
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  margin-top: 5px;
  color: #9197A3;
  font-size: 12px;
  width: 750rpx;
  padding: 10px 15px;
  box-sizing: border-box;
  border-bottom: 1px solid rgba(153, 151, 151, 0.1);
}

.depth-list-view {
  position: relative;
  width: 750rpx;
  height: 450px;
}
.depth-list-view-loading {
  position: absolute;
  top: 0;
  left: 0;
  padding-top: 100px;
  z-index: 9999;
  box-sizing: border-box;
  background-color: #191E29;
}
.depth-list {
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  width: 750rpx;
  padding: 3px 15px;
  box-sizing: border-box;
  margin-top: 10px;
}
.depth-list-division {
  width: 2px;
}
.depth-list-box {
  flex: 1;
}
.depth-list-item {
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  position: relative;
}
.depth-list-item-buy-amount {
  font-size: 13px;
  color: #b8c6d8;
  margin-bottom: 5px;
}
.depth-list-item-buy-price {
  font-size: 13px;
  color: #2DBD96;
  margin-bottom: 5px;
}
.depth-list-item-buy-percentage {
  position: absolute;
  top: 0;
  right: 0;
  background-color: rgba(45, 189, 150, 0.2);
  width: 1%;
  height: 100%;
}
.depth-list-item-sell-amount {
  font-size: 13px;
  color: #b8c6d8;
  margin-bottom: 5px;
}
.depth-list-item-sell-price {
  font-size: 13px;
  color: #ED6666;
  margin-bottom: 5px;
}
.depth-list-item-sell-percentage {
  position: absolute;
  top: 0;
  left: 0;
  background-color: rgba(237, 102, 102, 0.2);
  width: 1%;
  height: 100%;
}

</style>
