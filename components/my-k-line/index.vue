<template>
  <view>
    <nav-bar :pair="pair" :statusBar="true"></nav-bar>
    <view class="k-line-header">
      <view class="k-line-header-left">
        <view class="k-line-header-left-up">0.064129</view>
        <view class="k-line-header-left-bottom">
          <text class="k-line-header-left-bottom-price">¥0.064129</text>
          <text class="k-line-header-left-bottom-rate">+0.77%</text>
        </view>
      </view>
      <view class="k-line-header-right">
        <view class="k-line-header-right-item">
          <view class="k-line-header-right-item-left">24h高</view>
          <view class="k-line-header-right-item-right">0.070016</view>
        </view>
        <view class="k-line-header-right-item">
          <view class="k-line-header-right-item-left">24h低</view>
          <view class="k-line-header-right-item-right">0.070016</view>
        </view>
        <view class="k-line-header-right-item">
          <view class="k-line-header-right-item-left">成交额(USDT)</view>
          <view class="k-line-header-right-item-right">0.070016</view>
        </view>
      </view>
    </view>
    <view class="k-line-tab">
      <view class="k-line-tab-item">
        <text>分时</text>
        <view class="k-line-tab-item-under selected"></view>
      </view>
      <view class="k-line-tab-item">
        <text>8小时</text>
        <view class="k-line-tab-item-under"></view>
      </view>
      <view class="k-line-tab-item">
        <text>日K</text>
        <view class="k-line-tab-item-under"></view>
      </view>
      <view class="k-line-tab-item">
        <text>周K</text>
        <view class="k-line-tab-item-under"></view>
      </view>
      <view class="k-line-tab-item">
        <text>更多</text>
        <view class="k-line-tab-item-under"></view>
      </view>
      <view class="k-line-tab-item">
        <text>指标</text>
        <view class="k-line-tab-item-under"></view>
      </view>
    </view>
    <k-echarts ref="kEcharts" :init-data="data" />
  </view>
</template>

<script>
import navBar from './nav-bar'
import kEcharts from '../../components/k-echart/index'
export default {
  components: {
    kEcharts,
    navBar
  },
  props: {
    pair: {
      type: Object,
      default() {
        return {}
      }
    },
  },
  data() {
    return {
      data: [],
    }
  },
  methods: {
    init(data) {
      this.$refs.kEcharts.init(data)
    }
  }
}
</script>

<style lang="scss" scoped>
.k-line-header {
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  padding: 10px 15px 11px;
}
.k-line-header-left {
  width: 280rpx;
}
.k-line-header-left-up {
  font-size: 25px;
  color: #23AD8F;
  margin-bottom: 5px;
}
.k-line-header-left-bottom-price {
  font-size: 13px;
  color: #E1E8F5;
}
.k-line-header-left-bottom-rate {
  color: #23AD8F;
  font-size: 13px;
}
.k-line-header-right {
  flex: 1;
}
.k-line-header-right-item {
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  font-size: 12px;
  margin-bottom: 5px;
}
.k-line-header-right-item-left {
  color: #9197A3;
}
.k-line-header-right-item-right {
  color: #E1E8F5;
}
.k-line-tab {
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  color: #9197A3;
  padding: 0 13px;
  font-size: 14px;
}
.k-line-tab-item {
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
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