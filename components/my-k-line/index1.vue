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
      <view class="k-line-tab-item">
        <text class="k-line-tab-item-text selected">分时</text>
        <view class="k-line-tab-item-under selected"></view>
      </view>
      <view class="k-line-tab-item">
        <text class="k-line-tab-item-text">8小时</text>
        <view class="k-line-tab-item-under"></view>
      </view>
      <view class="k-line-tab-item">
        <text class="k-line-tab-item-text">日K</text>
        <view class="k-line-tab-item-under"></view>
      </view>
      <view class="k-line-tab-item">
        <text class="k-line-tab-item-text">周K</text>
        <view class="k-line-tab-item-under"></view>
      </view>
      <view class="k-line-tab-item">
        <text class="k-line-tab-item-text">更多</text>
        <view class="k-line-tab-item-under"></view>
      </view>
      <view class="k-line-tab-item">
        <text class="k-line-tab-item-text">指标</text>
        <view class="k-line-tab-item-under"></view>
      </view>
    </view>
    <view class="k-line-webview">
      <web-view ref="kLineWebview" class="k-line-webview" name='child' src="/hybrid/html/kline.html"></web-view>
    </view>
    <view class="k-line-division"></view>
    <view class="k-line-division2"></view>
    <view class="k-line-middle-tab">
      <view class="k-line-middle-tab-item">
        <text class="k-line-middle-tab-item-text selected">买卖盘</text>
        <view class="k-line-middle-tab-item-under w48 selected"></view>
      </view>
      <view class="k-line-middle-tab-item">
        <text class="k-line-middle-tab-item-text">近期成交</text>
        <view class="k-line-middle-tab-item-under w64"></view>
      </view>
      <view class="k-line-middle-tab-item">
        <text class="k-line-middle-tab-item-text">币种简介</text>
        <view class="k-line-middle-tab-item-under w64"></view>
      </view>
    </view>
    <view class="k-line-tab1">
      <view class="k-depth-webview">
        <web-view ref="kDepthWebview" class="k-depth-webview" name='depthChild' src="/hybrid/html/depth.html"></web-view>
      </view>
    </view>
  </view>
</template>

<script>
import navBar from './nav-bar'
export default {
  components: {
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
  display: flex;
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
  color: #23AD8F;
  margin-bottom: 5px;
}
.k-line-header-left-bottom {
  display: flex;
  flex-direction: row;
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
  margin-bottom: 5px;
}
.k-line-header-right-item-left {
  color: #9197A3;
  font-size: 12px;
}
.k-line-header-right-item-right {
  color: #E1E8F5;
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
    color: #E1E8F5;
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
.k-line-webview {
  width: 750rpx;
  height: 800rpx
}

.k-line-division {
  height: 2px;
  width: 750rpx;
  background-color: #191E29;
}

.k-line-division2 {
  height: 8px;
  width: 750rpx;
  background-color: #000000;
}

.k-line-middle-tab {
  display: flex;
  flex-direction: row;
  padding: 5px 15px;
}
.k-line-middle-tab-item {
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  margin-right: 20px;
}
.k-line-middle-tab-item-text {
  color: #9197A3;
  font-size: 17px;
  &.selected {
    color: #E1E8F5;
  }
}
.k-line-middle-tab-item-under {
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

.k-depth-webview {
  width: 750rpx;
  height: 400rpx
}
</style>