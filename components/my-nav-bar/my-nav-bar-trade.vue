<template>
  <view class="box">
    <uni-nav-bar :isIcon="false" :color="color" :border="false" :background-color="backgroundColor" :statusBar="statusBar">
      <view class="nav-bar-center">
        <view class="nav-bar-center-box">
          <uni-segmented-control fontSize="18px" :current="current" :values="tabBars" @clickItem="onClickItem" styleType="text"></uni-segmented-control>
        </view>
      </view>
    </uni-nav-bar>

    <view class="header-box">
      <view class="header-box-left">
        <uni-icons class="header-box-left__drawer" color="#b8c6d8" type="bars" size="28"></uni-icons>
        <text class="header-box-left__symbol">{{ symbol.tradeCoin.name }}/{{ symbol.coin.name }}</text>
        <text class="header-box-left__rate" :class="[('header-box-left__rate__' + (rate >= 0 ? 'up' : 'down'))]">{{rate > 0 ? '+' : ''}}{{ rate }}%</text>
      </view>
      <view class="header-box-right">
        <uni-icons class="header-box-right__kline" color="#b8c6d8" custom-prefix="iconfont" type="icon-kxiantu" size="25" @click="kLineClick"></uni-icons>
        <uni-icons class="header-box-right__more" color="#b8c6d8" type="more-filled" size="28"></uni-icons>
      </view>
    </view>
  </view>
</template>

<script>
import {navigateTo} from "../../utils/common";

export default {
  name: "my-nav-bar-trade",
  props: {
    symbol: {
      type: Object,
      default() {
        return {}
      }
    },
    rate24: {
      type: Number,
      default: 0
    },
    statusBar: {
      type: Boolean,
      default: false
    },
    current: {
      type: Number,
      default: 0
    },
    tabBars: {
      type: Array,
      default() {
        return []
      }
    },
    color: {
      type: String,
      default: "#b8c6d8"
    },
    backgroundColor: {
      type: String,
      default: "#11151F"
    },
  },
  computed: {
    rate() {
      return Number(this.rate24).toFixed(2)
    }
  },
  methods: {
    onClickItem(e) {
      if (this.current !== e.currentIndex) {
        this.$emit('clickItem', e.currentIndex)
      }
    },
    kLineClick() {
      navigateTo("trade/kLine")
    }
  }
}
</script>

<style lang="scss" scoped>
.nav-bar-center {
  flex: 1;
}
.nav-bar-center-box {
  width: 100px;
  display: flex;
  justify-content: center;
}

.header-box {
  width: 750rpx;
  height: 40px;
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
  //background-color: red;
  padding: 0 13px;
}

.header-box-left {
  display: flex;
  flex-direction: row;
  justify-content: flex-start;
  align-items: center;
  &__symbol {
    margin-left: 10px;
    font-size: 20px;
    font-weight: bold;
    color: #b8c6d8;
  }
  &__rate {
    padding: 3px 8px;
    border-radius: 2px;
    font-size: 14px;
    margin-left: 10px;
    &__up {
      background-color: rgba(26,187,151,.08);
      color: #2DBD96;
    }
    &__down {
      background-color: rgba(237,102,102,.08);
      color: #ED6666;
    }
  }
}
.header-box-right {
  display: flex;
  flex-direction: row;
  justify-content: flex-end;
  align-items: center;
  &__kline {
    margin-right: 10px;
  }
}

</style>