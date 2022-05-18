<template>
  <view class="entrust-order-history">
    <view class="entrust-order-history-info">
      <view class="entrust-order-history-info-right">
        <view class="entrust-order-history-info-right-top">
          <uni-icons color="#2DBD96" type="download" size="25" v-if="item.direction === 1"></uni-icons>
          <uni-icons color="#ED6666" type="upload" size="25" v-else></uni-icons>
          <text class="entrust-order-history-info-right-top-pair">{{this.item.tradeCoin.name}}/{{this.item.coin.name}}</text>
          <text class="entrust-order-history-info-right-top-type">{{ typeText }}</text>
        </view>
        <text class="entrust-order-history-info-right-time">{{cancelText}}</text>
      </view>
      <text class="entrust-order-history-info-cancel">{{cancelText}}</text>
    </view>
    <view class="entrust-order-history-data">
      <view class="entrust-order-history-data-item">
        <text class="entrust-order-history-data-item-head">{{numText}}</text>
        <text class="entrust-order-history-data-item-value">{{num}}</text>
      </view>
      <view class="entrust-order-history-data-item">
        <text class="entrust-order-history-data-item-head">{{priceText}}</text>
        <text class="entrust-order-history-data-item-value">{{price}}</text>
      </view>
      <view class="entrust-order-history-data-item">
        <text class="entrust-order-history-data-item-head">{{completeText}}</text>
        <text class="entrust-order-history-data-item-value bg">{{completeNum}}</text>
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
const { t } = initVueI18n(messages)
export default {
  name: "entrust-order-history",
  props: {
    item: {
      type: Object,
      default() {
        return {
          coin: {},
          tradeCoin: {}
        }
      }
    }
  },
  computed: {
    ...mapGetters({
      pair: "pair",
    }),
    cancelText() {
      const arr = {
        2: t('trade.order.complete'),
        3: t('trade.order.cancel.ok'),
      }
      return arr[this.item.status] ?? "--"
    },
    priceText() {
      return t('trade.order.price')
    },
    completeText() {
      return t('trade.order.complete')
    },
    typeText() {
      const arr = {
        1: t('trade.order.type.limit'),
        2: t('trade.order.type.market'),
      }
      return arr[this.item.type] ?? "--"
    },
    numText() {
      const arr = {
        1: `${t('trade.order.amount')}(${this.item.tradeCoin.name})`,
        2: `${t('trade.order.total')}(${this.item.coin.name})`,
      }
      return arr[this.item.type] ?? "--"
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
    }
  }
}
</script>

<style lang="scss" scoped>

.entrust-order-history {
  border-bottom: 1px solid #292E39;
  padding: 20px 15px;

}
.entrust-order-history-info {
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
}
.entrust-order-history-info-right {
  display: flex;
  flex-direction: column;
}
.entrust-order-history-info-right-top {
  display: flex;
  align-items: center;
}
.entrust-order-history-info-right-top-pair {
  font-size: 19px;
  font-weight: 500;
  color: #E1E8F5;
  margin-left: 5px;
}
.entrust-order-history-info-right-top-type {
  border: 1px solid #9197A3;
  background-color: #292E39;
  padding: 2px 5px;
  border-radius: 2px;
  font-size: 12px;
  color: #9197A3;
  margin-left: 10px;
}
.entrust-order-history-info-right-time {
  font-size: 12px;
  color: #9197A3;
  font-weight: 500;
  margin-top: 5px;
}
.entrust-order-history-info-cancel {
  padding: 5px 10px;
  font-size: 15px;
  color: #2DBD96;
  font-weight: 500;
  border: 1px solid #2DBD96;
  border-radius: 2px;
}
.entrust-order-history-data {
  margin-top: 10px;
  display: flex;
  flex-direction: row;
  justify-content: space-between;
}
.entrust-order-history-data-item {
  display: flex;
  flex-direction: column;
}
.entrust-order-history-data-item-head {
  font-size: 12px;
  color: #9197A3;
}
.entrust-order-history-data-item-value {
  font-size: 13px;
  font-weight: 500;
  color: #E1E8F5;
  margin-top: 5px;
  &.bg {
    padding: 2px 0;
    background-color: #1B2B32;
    width: 180rpx;
  }
}
</style>