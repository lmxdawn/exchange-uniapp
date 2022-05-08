<template>
  <view class="my-k-line">
    <nav-bar :pair="pair" :statusBar="true"></nav-bar>
    <view class="k-line-header">
      <view class="k-line-header-left">
        <text class="k-line-header-left-up">0.064129</text>
        <view class="k-line-header-left-bottom">
          <text class="k-line-header-left-bottom-price">¥0.064129</text>
          <text class="k-line-header-left-bottom-rate">+0.77%</text>
        </view>
      </view>
      <view class="k-line-header-right">
        <view class="k-line-header-right-item">
          <text class="k-line-header-right-item-left">24h高</text>
          <text class="k-line-header-right-item-right">0.070016</text>
        </view>
        <view class="k-line-header-right-item">
          <text class="k-line-header-right-item-left">24h低</text>
          <text class="k-line-header-right-item-right">0.070016</text>
        </view>
        <view class="k-line-header-right-item">
          <text class="k-line-header-right-item-left">成交额(USDT)</text>
          <text class="k-line-header-right-item-right">0.070016</text>
        </view>
      </view>
    </view>
    <view class="k-line-tab">
      <view class="k-line-tab-item" v-for="(item, index) in tabList" :key="item.id" @click="tabClick(index,item)">
        <text class="k-line-tab-item-text" :class="[index === tabIndex ? 'selected' : '']">{{item.name}}</text>
        <view class="k-line-tab-item-under" :class="[index === tabIndex ? 'selected' : '']"></view>
      </view>
    </view>
    <k-echart ref="kEcharts" :time-type="timeType" :loading-status="loadingStatus" :depth-loading-status="depthLoadingStatus"></k-echart>
  </view>
</template>

<script>
import navBar from './nav-bar'
import kEchart from '../k-echart/index'
export default {
  components: {
    navBar,
    kEchart
  },
  props: {
    pair: {
      type: Object,
      default() {
        return {}
      }
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
      data: [],
      tabList: [
        {
          id: 'time-sharing',
          timeType: 'm',
          name: '分时',
        },
        {
          id: '15min',
          timeType: 'h',
          name: '15分钟',
        },
        {
          id: '1h',
          timeType: 'h',
          name: '1小时',
        },
        {
          id: '4h',
          timeType: 'h',
          name: '4小时',
        },
        {
          id: 'one-day',
          timeType: 'd',
          name: '日K',
        },
        {
          id: 'more',
          name: '更多',
        },
      ],
      tabIndex: 1,
      timeType: 'h'
    }
  },
  methods: {
    tabClick(index,item) {
      this.tabIndex = index
      this.timeType = item.timeType
      this.$emit('tabSelected', item)
    },
    init(kLineData, buyData, sellData) {
      this.$refs.kEcharts.init(kLineData, buyData, sellData)
    },
    // 调用 webview 内部逻辑
    evalJs() {
      let obj = ["2004-02-28", 10583.92, 10985.92, 10519.03, 10689.55, 200050000]
      // #ifdef APP-PLUS
      this.$refs.webview.evalJs(`addKline(${JSON.stringify(obj)})`);
      // #endif
      // #ifdef H5
      window.child.window.addKline(obj);
      // #endif
    }
  }
}
</script>

<style lang="scss" scoped>
.my-k-line {
  width: 750rpx;
}
.k-line-header {
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  padding: 10px 15px 11px;
}
.k-line-header-left {
  width: 280rpx;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  padding-bottom: 10px;
}
.k-line-header-left-up {
  font-size: 25px;
  color: #2DBD96;
  margin-bottom: 5px;
}
.k-line-header-left-bottom {
  display: flex;
  flex-direction: row;
}
.k-line-header-left-bottom-price {
  font-size: 13px;
  color: #b8c6d8;
}
.k-line-header-left-bottom-rate {
  color: #2DBD96;
  font-size: 13px;
}
.k-line-header-right {
  flex: 1;
}
.k-line-header-right-item {
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  margin-bottom: 5px;
}
.k-line-header-right-item-left {
  color: #9197A3;
  font-size: 12px;
}
.k-line-header-right-item-right {
  color: #b8c6d8;
  font-size: 12px;
}
.k-line-tab {
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  padding: 0 15px;
}
.k-line-tab-item {
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
}
.k-line-tab-item-text {
  color: #9197A3;
  font-size: 14px;
  &.selected {
    color: #b8c6d8;
  }
}
.k-line-tab-item-under {
  margin-top: 3px;
  width: 18px;
  height: 4px;
  &.selected {
    background-color: #2DBD96;
  }
}
</style>