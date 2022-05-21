<template>
  <view class="entrust-order" @click="forwardTo">
    <view class="entrust-order-info">
      <view class="entrust-order-info-right">
        <view class="entrust-order-info-right-top">
          <uni-icons color="#2DBD96" type="download" size="25" v-if="item.direction === 1"></uni-icons>
          <uni-icons color="#ED6666" type="upload" size="25" v-else></uni-icons>
          <text class="entrust-order-info-right-top-pair">{{this.item.tradeCoin.name}}/{{this.item.coin.name}}</text>
          <text class="entrust-order-info-right-top-type">{{ typeText }}</text>
        </view>
        <text class="entrust-order-info-right-time">{{item.createTime}}</text>
      </view>
      <view class="entrust-order-info-cancel-box" :class="typeClass">
        <text class="entrust-order-info-cancel">{{cancelText}}</text>
        <uni-icons class="entrust-order-info-forward" v-if="item.status !== 1 && forward" type="forward" color="#E1E8F5" size="17"></uni-icons>
      </view>
    </view>
    <view class="entrust-order-data">
      <view class="entrust-order-data-item" :style="dataItemStyle">
        <text class="entrust-order-data-item-head">{{numText}}</text>
        <text class="entrust-order-data-item-value">{{num}}</text>
      </view>
      <view class="entrust-order-data-item" :style="dataItemStyle">
        <text class="entrust-order-data-item-head">{{priceText}}</text>
        <text class="entrust-order-data-item-value">{{price}}</text>
      </view>
      <view class="entrust-order-data-item" v-if="item.status !== 1" :style="dataItemStyle">
        <text class="entrust-order-data-item-head">{{priceAvgText}}</text>
        <text class="entrust-order-data-item-value">{{priceAvg}}</text>
      </view>
      <view class="entrust-order-data-item" :style="dataItemStyle">
        <text class="entrust-order-data-item-head">{{completeText}}</text>
        <text class="entrust-order-data-item-value" :class="totalClass">{{completeNum}}</text>
      </view>
    </view>
  </view>
</template>

<script>
import {mapGetters} from "vuex";
import {
  initVueI18n
} from '@dcloudio/uni-i18n'
import messages from '../../locale/index';
import {accDiv} from "../../utils/decimal";
import {navigateTo} from "../../utils/common";
const { t } = initVueI18n(messages)
export default {
  name: "entrust-order",
  props: {
    item: {
      type: Object,
      default() {
        return {
          coin: {},
          tradeCoin: {}
        }
      }
    },
    forward: {
      type: Boolean,
      default() {
        return false;
      }
    },
    typeClass: {
      type: String,
      default: ""
    },
    totalClass: {
      type: String,
      default: ""
    },
    dataItemStyle: Object
  },
  computed: {
    ...mapGetters({
      pair: "pair",
    }),
    cancelText() {
      if (this.item.status === 1) {
        return t('trade.order.cancel')
      }
      if (this.item.status === 2) {
        return t('trade.order.complete')
      }
      if (this.item.status === 3) {
        return t('trade.order.cancel.ok')
      }
      return "--"
    },
    priceText() {
      return t('trade.order.price')
    },
    priceAvgText() {
      return t('trade.order.avg')
    },
    completeText() {
      return t('trade.order.complete')
    },
    typeText() {
      if (this.item.type === 1) {
        return t('trade.order.type.limit')
      }
      if (this.item.type === 2) {
        return t('trade.order.type.market')
      }
      return "--"
    },
    numText() {
      if (this.item.type === 1) {
        return `${t('trade.order.amount')}(${this.item.tradeCoin.name})`
      }
      if (this.item.type === 2) {
        return `${t('trade.order.total')}(${this.item.coin.name})`
      }
      return "--"
    },
    num() {
      if (this.item.type === 1) {
        return Number(this.item.amount).toFixed(this.pair.tradeAmountPrecision)
      }
      if (this.item.type === 2) {
        return Number(this.item.total).toFixed(this.pair.tradeTotalPrecision)
      }
      return "--"
    },
    completeNum() {
      if (this.item.type === 1) {
        return Number(this.item.amountComplete).toFixed(this.pair.tradeAmountPrecision)
      }
      if (this.item.type === 2) {
        return Number(this.item.totalComplete).toFixed(this.pair.tradeTotalPrecision)
      }
      return "--"
    },
    price() {
      if (this.item.type === 1) {
        return Number(this.item.price).toFixed(this.pair.tradePricePrecision)
      }
      return "--"
    },
    priceAvg() {
      if (this.item.status !== 1 && this.item.totalComplete > 0 && this.item.amountComplete > 0) {
        // 均价 = 已完成的成交额 / 已完成的数量
        return Number(accDiv(this.item.totalComplete, this.item.amountComplete)).toFixed(this.pair.tradePricePrecision)
      }
      return "--"
    }
  },
  methods: {
    forwardTo() {
      if (this.item.status === 1 || !this.forward) {
        return false
      }
      navigateTo("trade/historyDetails?id=" + this.item.id)
    }
  }
}
</script>

<style lang="scss" scoped>

.entrust-order {
  border-bottom: 1px solid #292E39;
  padding: 20px 15px;
}
.entrust-order-info {
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  &.center {
    align-items: center;
  }
}
.entrust-order-info-right {
  display: flex;
  flex-direction: column;
}
.entrust-order-info-right-top {
  display: flex;
  flex-direction: row;
  align-items: center;
}
.entrust-order-info-right-top-pair {
  font-size: 19px;
  font-weight: 500;
  color: #E1E8F5;
  margin-left: 5px;
}
.entrust-order-info-right-top-type {
  background-color: #212631;
  padding: 2px 4px;
  border-radius: 2px;
  font-size: 12px;
  color: #9197A3;
  margin-left: 10px;
}
.entrust-order-info-right-time {
  font-size: 12px;
  color: #9197A3;
  font-weight: 500;
  margin-top: 5px;
}
.entrust-order-info-cancel-box {
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
  &.gray {
    align-items: flex-start;
    .entrust-order-info-cancel {
      color: #9197A3;
      border: 0;
      padding: 5px 0 0;
      /* #ifndef APP-NVUE */
      padding-top: 3px
      /* #endif */
    }
  }
}
.entrust-order-info-cancel {
  padding: 2px 10px;
  font-size: 14px;
  color: #2DBD96;
  font-weight: 500;
  border: 1px solid #2DBD96;
  border-radius: 2px;
}
.entrust-order-info-forward {
  padding-top: 5px;
  margin-left: 5px;
}

.entrust-order-data {
  margin-top: 10px;
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  flex-flow: row wrap;
}
.entrust-order-data-item {
  display: flex;
  justify-content: space-between;
  flex-direction: column;
  align-items: flex-start;
}
.entrust-order-data-item-head {
  font-size: 12px;
  color: #9197A3;
}
.entrust-order-data-item-value {
  font-size: 13px;
  font-weight: 500;
  color: #E1E8F5;
  margin-top: 5px;
  &.bg {
    padding: 2px 0;
    background-color: #1B2B32;
    width: 100px;
    border-radius: 2px;
  }
}
</style>