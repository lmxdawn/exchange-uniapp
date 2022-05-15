<template>
  <view class="list-box">
    <view class="operation-part">
      <view class="operation-part-left">

        <view>
          <view class="side-btn-box">
            <view class="side-btn"
                  :class="[index === tradeForm.direction - 1 ? 'activate' : '', index === 0 ? 'side-btn__buy' : 'side-btn__sell']"
                  v-for="(item, index) in tradeDirectionArr"
                  @click="tradeDirectionClick(index)"
                  :key="index">
              <text class="side-btn__text">{{item}}</text>
            </view>
          </view>

          <my-popup ref="tradeTypePopup" @selected="tradeTypeSelected" :current="tradeForm.type - 1" :list="tradeTypeArr" :cancel-text="cancelText">
            <view class="trade-type" @click="tradeTypeShow">
              <text class="trade-type__text">{{ tradeTypeArr[tradeForm.type - 1] }}</text>
              <uni-icons class="trade-type__down" color="#c1cdde" custom-prefix="iconfont" type="icon-xiangxia1" size="13"></uni-icons>
            </view>
          </my-popup>


          <view class="trade-dotted-box" v-if="tradeForm.type === 2">
            <text class="trade-dotted">{{tradeMarketArr[tradeForm.direction - 1]}}</text>
            <view class="trade-line"></view>
          </view>

          <view class="trade-input-box" v-else>
            <uni-number-box class="trade-input" background="rgba(184,198,216,.08)" color="#9197A3" :placeholder="limitPricePlaceholder" placeholderColor="#4F5460" v-model="tradeForm.price" :step="stepPrice" :max="999999999999"></uni-number-box>
            <view class="trade-line">
              <text class="trade-line__text">≈{{priceRate(tradeForm.price)}} {{usdtRate.name}}</text>
            </view>
          </view>

          <view class="trade-input-box">
            <uni-number-box class="trade-input" background="rgba(184,198,216,.08)" color="#9197A3" :placeholder="amountPlaceholder" placeholderColor="#4F5460" v-model="tradeForm.amount" :step="stepAmount" :max="999999999999"></uni-number-box>
          </view>

          <view class="trade-balance">
            <text class="trade-balance__pair">{{usableTitle}}{{tradeForm.direction === 1 ? pair.coin.name : pair.tradeCoin.name}}</text>
            <text class="trade-balance__text">{{ balanceNum < 0 ? '--' : balanceNum }}</text>
          </view>

          <view class="trade-percentage">
            <view class="trade-percentage-item">
              <text class="trade-percentage-item__text">25%</text>
            </view>
            <view class="trade-percentage-item">
              <text class="trade-percentage-item__text">50%</text>
            </view>
            <view class="trade-percentage-item">
              <text class="trade-percentage-item__text">75%</text>
            </view>
            <view class="trade-percentage-item">
              <text class="trade-percentage-item__text">100%</text>
            </view>
          </view>

          <view class="trade-line"></view>

          <view class="trade-total" v-if="tradeForm.type === 1">
            <text class="trade-total__text">{{moneyTitle}} {{money}} {{ pair.coin.name }}</text>
          </view>
          <view class="trade-total" v-if="tradeForm.type === 1">
            <text class="trade-total__text">≈{{priceRate(money)}} {{usdtRate.name}}</text>
          </view>
        </view>


        <view class="trade-sub-btn-box">
          <my-button class="trade-sub-btn"
                     :class="[tradeForm.direction === 1 ? 'buy' : 'sell']"
                     @click="orderSub" type="success"
                     :loading="tradeFormLoading">
            <text class="trade-sub-btn__text">{{ memberInfo.memberId <= 0 ? loginText : tradeDirectionArr[tradeForm.direction - 1] + " " + pair.tradeCoin.name }}</text>
          </my-button>
        </view>

      </view>

      <view class="operation-part-right">
        <view class="depth-list">
          <view class="depth-list-head">
            <text class="depth-list-head__text">{{priceTitle}}({{ pair.coin.name }})</text>
            <text class="depth-list-head__text">{{amountTitle}}({{ pair.tradeCoin.name }})</text>
          </view>
          <view class="depth-list-body">
            <view class="depth-list-item" v-for="(item, index) in depthSellList" :key="index">
              <text class="depth-list-item__price sell">{{item.price < 0 ? '--' : Number(item.price).toFixed(pair.tradePricePrecision)}}</text>
              <text class="depth-list-item__amount">{{ item.amount < 0 ? '--' : Number(item.amount).toFixed(pair.tradeAmountPrecision) }}</text>
            </view>
          </view>
          <view class="depth-list-line">
            <text class="depth-list-line__price" :class="[pair.rate24 >= 0 ? 'buy' : 'sell']">{{pair.price < 0 ? '--' : Number(pair.price).toFixed(pair.tradePricePrecision)}}</text>
            <text class="depth-list-line__rate">≈{{pair.price < 0 ? '--' : priceRate(pair.price)}} {{usdtRate.name}}</text>
          </view>
          <view class="depth-list-body">
            <view class="depth-list-item" v-for="(item, index) in depthBuyList" :key="index">
              <text class="depth-list-item__price buy">{{item.price < 0 ? '--' : Number(item.price).toFixed(pair.tradePricePrecision)}}</text>
              <text class="depth-list-item__amount">{{ item.amount < 0 ? '--' : Number(item.amount).toFixed(pair.tradeAmountPrecision) }}</text>
            </view>
          </view>
        </view>

        <view class="depth-btn-box">
          <view class="depth-btn-decimal">
            <text class="depth-btn-decimal__text">{{pair.tradePricePrecision}} {{decimalTitle}}</text>
          </view>

          <my-popup ref="depthTypePopup" @selected="depthTypeSelected" :current="depthType" :list="depthTypeArr" :cancel-text="cancelText">
            <view class="depth-btn-type" @click="depthTypeShow">
              <view class="depth-btn-type__item" :class="depthType === 1 ? 'sell' : (depthType === 2 ? 'buy' : 'buy')"></view>
              <view class="depth-btn-type__item" :class="depthType === 1 ? 'sell' : (depthType === 2 ? 'buy' : '')"></view>
              <view class="depth-btn-type__item" :class="depthType === 1 ? 'sell' : (depthType === 2 ? 'buy' : 'sell')"></view>
            </view>
          </my-popup>

        </view>

      </view>
    </view>

    <view class="trade-order-head">
      <view class="trade-order-head-tab">
        <text class="trade-order-head-tab__text">{{orderHeadTitle}}</text>
      </view>
      <uni-icons color="#E1E8F5" type="list" size="28"></uni-icons>
    </view>

    <view class="trade-order-box">
      <view class="trade-order-empty" v-if="isNoData">
        <my-empty :text="emptyText" height="80px" width="80px" :loadingStatus="loadingStatus"></my-empty>
      </view>
      <view class="trade-order-list" v-else>
        <view class="trade-order-item" v-for="item in orderList" :key="item.id">{{item.modifiedTime}}</view>
      </view>
    </view>
  </view>
</template>

<script>
import {initVueI18n} from '@dcloudio/uni-i18n'
import messages from '../../locale/index';
import {mapGetters} from "vuex";
import myPopup from "../../components/my-popup/my-popup"
import myEmpty from "../../components/my-empty/my-empty";
import myButton from "../../components/my-button/button"
import {accMul,accDiv} from "../../utils/decimal";
import {entrustOrderCreate} from "../../api/trade/entrustOrder";
import {navigateTo} from "../../utils/common";

const { t } = initVueI18n(messages)

export default {
  name: "trade-list",
  props: {
    pair: {
      type: Object,
      default() {
        return {}
      }
    },
    balance: {
      type: Number,
      default: -1
    },
    tradeBalance: {
      type: Number,
      default: -1
    },
    depthSell: {
      type: Array,
      default() {
        return []
      }
    },
    depthBuy: {
      type: Array,
      default() {
        return []
      }
    },
    isNoData: {
      type: Boolean,
      default: false
    },
    loadingStatus: {
      type: String,
      default: "noMore"
    },
    orderList: {
      type: Array,
      default() {
        return []
      }
    }
  },
  components: {
    myPopup,
    myEmpty,
    myButton,
  },
  computed: {
    ...mapGetters({
      memberInfo: "memberInfo",
      usdtRate: "usdtRate",
    }),
    stepPrice() {
      let precision = this.pair.tradePricePrecision
      if (precision == 0) {
        return 1
      } else {
        let pow = Math.pow(10, precision)
        return Number(Number(accDiv(1, pow)).toFixed(precision))
      }
    },
    stepAmount() {
      let precision = this.tradeForm.type === 1 ? this.pair.tradeAmountPrecision : this.pair.tradeTotalPrecision
      if (precision == 0) {
        return 1
      } else {
        let pow = Math.pow(10, precision)
        return Number(Number(accDiv(1, pow)).toFixed(precision))
      }
    },
    balanceNum() {
      return this.tradeForm.direction === 1 ? this.balance : this.tradeBalance
    },
    priceRate() {
      return price => {
        let usdtPrice = this.pair.coin.usdtPrice
        return Number(accMul(accMul(this.usdtRate.price, usdtPrice), price)).toFixed(this.usdtRate.precision)
      }
    },
    limitPricePlaceholder() {
      return t('trade.limit.text') + `(${this.pair.coin.name})`
    },
    amountPlaceholder() {
      // 如果是市价单，并且是买入的情况
      if (this.tradeForm.type === 2 && this.tradeForm.direction === 1) {
        return t('common.money') + `(${this.pair.coin.name})`
      }
      return t('common.amount') + `(${this.pair.tradeCoin.name})`
    },
    money() {
      return accMul(this.tradeForm.amount, this.tradeForm.price)
    },
    depthSellList() {
      let len = this.depthType === 0 ? 7 : (this.depthType === 1 ? 14 : 0)
      let list = []
      for (let i = 0; i < len; i++) {
        let item = this.depthSell[i] || {price: -1, amount: -1}
        list.push(item)
      }
      return list
    },
    depthBuyList() {
      let len = this.depthType === 0 ? 7 : (this.depthType === 2 ? 14 : 0)
      let list = []
      for (let i = 0; i < len; i++) {
        let item = this.depthBuy[i] || {price: -1, amount: -1}
        list.push(item)
      }
      return list
    },
    loginText() {
      return t('common.login')
    },
    cancelText() {
      return t('common.cancel')
    },
    tradeTypeArr() {
      return [t('trade.limit'),t('trade.market')]
    },
    tradeMarketArr() {
      return [t('trade.market.buy'),t('trade.market.sell')]
    },
    tradeDirectionArr() {
      return [t('trade.direction.buy'),t('trade.direction.sell')]
    },
    depthTypeArr() {
      return [t('trade.depth.type.all'),t('trade.depth.type.sell'),t('trade.depth.type.buy')]
    },
    priceTitle() {
      return t('common.price')
    },
    amountTitle() {
      return t('common.amount')
    },
    usableTitle() {
      return t('common.usable')
    },
    moneyTitle() {
      return t('trade.limit.money')
    },
    decimalTitle() {
      return t('common.decimal')
    },
    orderHeadTitle() {
      return t('trade.order.head')
    },
    emptyText() {
      return t('common.empty')
    },
  },
  data() {
    return {
      tradeFormLoading: false,
      tradeForm: {
        tradeCoinId: 0,
        coinId: 0,
        type: 1,
        direction: 1,
        price: 0,
        amount: 0,
        total: 0,
      },
      depthType: 0,
    }
  },
  methods: {
    tradeTypeShow() {
      this.$refs.tradeTypePopup.open('bottom')
    },
    tradeTypeSelected(index) {
      this.tradeForm.type = index + 1
    },
    tradeDirectionClick(index) {
      this.tradeForm.direction = index + 1
    },
    depthTypeShow() {
      this.$refs.depthTypePopup.open('bottom')
    },
    depthTypeSelected(index) {
      this.depthType = index
    },
    orderSub() {
      if (this.memberInfo.memberId <= 0) {
        let redirect = encodeURIComponent("trade/index")
        navigateTo("other/login?redirect=" + redirect, "slide-in-bottom")
        return false
      }
      if (this.tradeFormLoading) {
        return false
      }
      if (this.tradeForm.type === 1 && (!this.tradeForm.price || this.tradeForm.price <= 0)) {
        this.$tui.toast( t('trade.order.sub.not.price'))
        return false
      }
      if (!this.tradeForm.amount || this.tradeForm.amount <= 0) {
        this.$tui.toast( t('trade.order.sub.not.amount'))
        return false
      }
      if (this.tradeForm.type === 2 && this.tradeForm.direction === 1) {
        this.tradeForm.total = this.tradeForm.amount
      }
      this.tradeFormLoading = true
      this.tradeForm.coinId = this.pair.coin.id
      this.tradeForm.tradeCoinId = this.pair.tradeCoin.id
      entrustOrderCreate(this.tradeForm)
        .then(res => {
          this.tradeFormLoading = false
          if (res.code > 0) {
            this.$tui.toast(t('http.code.' + res.code))
            return false
          }
        })
        .catch(() => {
          this.tradeFormLoading = false
          this.$tui.toast(t('http.code.1'))
        })
    }
  }
}
</script>

<style lang="scss" scoped>
.list-box {
  width: 750rpx;
  background-color: #191E29;
  border-top-left-radius: 20px;
  border-top-right-radius: 20px;
}
.operation-part {
  display: flex;
  flex-direction: row;
  /* #ifndef APP-NVUE */
  //width: 100%;
  /* #endif */
  flex: 1;
  padding: 20px 15px;
}
.operation-part-left {
  width: 170px;
  padding-right: 15px;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
}
.operation-part-right {
  flex: 1;
}

.side-btn-box {
  display: flex;
  flex-direction: row;
  justify-content: space-between;
}
.side-btn {
  display: flex;
  flex-direction: row;
  justify-content: center;
  align-items: center;
  height: 35px;
  padding: 0 20px;
  border-radius: 2px;
  background-color: rgba(184,198,216,.08);
  .side-btn__text {
    color: #E1E8F5;
  }
  &__buy {
    &.activate {
      background-color: #2DBD96!important;
      .side-btn__text {
        color: #FFFFFF;
      }
    }
  }
  &__sell {
    &.activate {
      background-color: #ED6666!important;
      .side-btn__text {
        color: #FFFFFF;
      }
    }
  }
}

.trade-type {
  display: flex;
  flex-direction: row;
  justify-content: flex-start;
  align-items: center;
  padding: 10px 0;
  &__text {
    font-size: 13px;
    color: #E1E8F5;
  }
  &__down {
    margin-left: 5px;
  }
}

.trade-line {
  display: flex;
  flex-direction: row;
  align-items: center;
  height: 18px;
  &__text {
    color: #9197A3;
    font-size: 12px;
  }
}

.trade-dotted-box {
  display: flex;
  flex-direction: column;
}
.trade-dotted {
  flex: 1;
  padding: 7px 20px;
  text-align: center;
  border-top: dotted 1px #9197A3;
  border-bottom: dotted 1px #9197A3;
  border-left: dotted 1px #9197A3;
  border-right: dotted 1px #9197A3;
  border-top-right-radius: 2px;
  border-top-left-radius: 2px;
  border-bottom-left-radius: 2px;
  // nvue 边框线虚线时，圆角都一样的话会有问题
  border-bottom-right-radius: 3px;
  color: #9197A3;
  font-size: 14px;
}

.trade-input-box {
}
.trade-input {
}

.trade-balance {
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
  height: 40px;
  &__pair {
    color: #9197A3;
    font-size: 12px;
  }
  &__text {
    font-size: 12px;
    color: #c1cdde;
  }
}

.trade-percentage {
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
}

.trade-percentage-item {
  background-color: rgba(184,198,216,.08);
  border: solid 1px #404550;
  padding: 1px 4px;
  &__text {
    color: #9197A3;
    font-size: 12px;
  }
}

.trade-total {
  &__text {
    font-size: 13px;
    color: #c1cdde;
  }
}
.trade-sub-btn-box {

}
.trade-sub-btn {
  font-size: 16px;
  &.buy {
    background-color: #2DBD96
  }
  &.sell {
    background-color: #ED6666
  }
}

.depth-list {

}
.depth-list-head {
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
  padding: 3px 0;
  &__text {
    font-size: 12px;
    color: #9197A3;
  }
}

.depth-list-line {
  border-top: solid 1px #292E39;
  border-bottom: solid 1px #292E39;
  padding: 5px 0;
  &__price {
    font-size: 16px;
    font-weight: bold;
    &.sell {
      color: #ED6666;
    }
    &.buy {
      color: #2DBD96;
    }
  }
  &__rate {
    font-size: 12px;
    color: #9197A3;
  }
}

.depth-list-item {
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
  padding: 3px 0;
  &__price {
    font-size: 14px;
    &.sell {
      color: #ED6666;
    }
    &.buy {
      color: #2DBD96;
    }
  }
  &__amount {
    font-size: 14px;
    color: #E1E8F5;
  }
}

.depth-btn-box {
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
  margin-top: 10px;
}
.depth-btn-decimal {
  flex: 1;
  padding: 6px 0;
  text-align: center;
  border: solid 1px #292E39;
  display: flex;
  justify-content: center;
  align-items: center;
  border-radius: 1px;
  &__text {
    font-size: 14px;
    color: #E1E8F5;
  }
}
.depth-btn-type {
  height: 20px;
  margin-left: 10px;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  border: solid 1px rgba(184,198,216,.08);
  padding: 6px;
  border-radius: 1px;
  &__item {
    width: 20px;
    height: 3px;
    border-radius: 2px;
    background-color: #9197A3;
    &.sell {
      background-color: #ED6666;
    }
    &.buy {
      background-color: #2DBD96;
    }
  }
}

.trade-order-head {
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
  padding: 0 15px;
  border-bottom: solid 1px rgba(184,198,216,.08);
}
.trade-order-head-tab {
  padding: 8px 0;
  border-bottom: solid 3px #2DBD96;
  &__text {
    font-size: 13px;
    color: #E1E8F5;
  }
}
.trade-order-box {
}
.trade-order-empty {
  position: relative;
  width: 750rpx;
  height: 170px;
}
</style>