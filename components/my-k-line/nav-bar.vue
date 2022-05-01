<template>
  <view class="box">
    <uni-nav-bar :isIcon="false" :color="color" :border="false" :background-color="backgroundColor" :statusBar="statusBar">
      <view class="header-box">
        <view class="header-box-left">
          <uni-icons type="back" color="#b8c6d8" size="28"@click="back"></uni-icons>
          <text class="header-line">|</text>
          <uni-icons class="header-box-left__drawer" color="#b8c6d8" type="bars" size="28"></uni-icons>
          <text class="header-box-left__symbol">{{ pair.tradeCoin.name }}/{{ pair.coin.name }}</text>
        </view>
        <view class="header-box-right">
          <uni-icons class="header-box-right__more" color="#b8c6d8" type="more-filled" size="28"></uni-icons>
        </view>
      </view>
    </uni-nav-bar>
  </view>
</template>

<script>
import {navigateBack} from "../../utils/common";

export default {
  name: "nav-bar",
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
    color: {
      type: String,
      default: "#b8c6d8"
    },
    backgroundColor: {
      type: String,
      default: "#191E29"
    },
  },
  computed: {
  },
  methods: {
    back() {
      navigateBack()
    }
  }
}
</script>

<style lang="scss" scoped>

.header-box {
  flex: 1;
  height: 40px;
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
  box-sizing: border-box;
}

.header-line {
  margin-left: 5rpx;
  margin-right: 10rpx;
  color: #b8c6d8;
}

.header-box-left {
  display: flex;
  flex-direction: row;
  justify-content: flex-start;
  align-items: center;
  &__symbol {
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