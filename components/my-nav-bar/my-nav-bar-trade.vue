<template>
  <view class="box">
    <uni-nav-bar :isIcon="false" :color="color" :border="false" :background-color="backgroundColor" :statusBar="statusBar">
      <view class="nav-bar-center">
        <view class="nav-bar-center-box">
          <uni-segmented-control fontSize="18px" :current="current" :values="tabBars" @clickItem="onClickItem" styleType="text"></uni-segmented-control>
        </view>
      </view>
    </uni-nav-bar>

    <view class="header-box" :style="{backgroundColor: backgroundColor}">
      <view class="header-box-left">
        <uni-icons class="header-box-left__drawer" :color="color" type="bars" size="28" @click="pairListTo"></uni-icons>
        <text class="header-box-left__pair">{{ pair.tradeCoin.name }}/{{ pair.coin.name }}</text>
        <text class="header-box-left__rate" :class="[('header-box-left__rate__' + (rate >= 0 ? 'up' : 'down'))]">{{rate > 0 ? '+' : ''}}{{ rate }}%</text>
      </view>
      <view class="header-box-right">
        <uni-icons class="header-box-right__kline" :color="color" custom-prefix="iconfont" type="icon-kxiantu" size="25" @click="kLineClick"></uni-icons>
        <uni-icons class="header-box-right__more" :color="color" type="more-filled" size="28"></uni-icons>
      </view>
    </view>
  </view>
</template>

<script>
import {navigateTo, switchTab} from "../../utils/common";
import {mapActions} from "vuex";

export default {
  name: "my-nav-bar-trade",
  props: {
    pair: {
      type: Object,
      default() {
        return {}
      }
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
      return Number(this.pair.rate24).toFixed(2)
    }
  },
  methods: {
    ...mapActions({
      setMarketFrom: "setMarketFrom",
    }),
    onClickItem(e) {
      if (this.current !== e.currentIndex) {
        this.$emit('clickItem', e.currentIndex)
      }
    },
    kLineClick() {
      const kLineUrl = `trade/kLine?coinId=${this.pair.coin.id}&tradeCoinId=${this.pair.tradeCoin.id}`
      navigateTo(kLineUrl, "slide-in-right")
    },
    pairListTo() {
      // #ifdef APP-PLUS
      navigateTo("trade/pairList")
      // #endif
      // #ifndef APP-PLUS
      // 设置跳转到行情页面的来源
      this.setMarketFrom("trade")
      switchTab("market/index")
      // #endif
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
  justify-content: space-between;
}

.header-box {
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
  &__pair {
    margin-left: 10px;
    font-size: 20px;
    font-weight: 500;
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