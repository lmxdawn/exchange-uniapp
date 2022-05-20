<template>
	<view class="page-box">
    <my-nav-bar-trade
        class="page-header"
        :current="navBarTabIndex"
        :tabBars="tabBars"
        statusBar
        :pair="pair"
        @pairListTo="pairListTo"
        @clickItem="onNavBarTabClickItem">
    </my-nav-bar-trade>

    <view class="page-line"></view>

    <view class="page-body">
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
                         @click="showPayPwd" type="success"
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
          <view class="trade-order-head-box">
            <view class="trade-order-head-tab selected">
              <text class="trade-order-head-tab__text">{{orderCurrentTitle}}</text>
            </view>
            <view class="trade-order-head-tab" @click="historyOrderTo">
              <text class="trade-order-head-tab__text">{{orderHistoryTitle}}</text>
            </view>
          </view>
          <uni-icons color="#E1E8F5" type="list" size="28"></uni-icons>
        </view>

        <view class="trade-order-box">
          <view class="trade-order-empty" v-if="isNoData">
            <my-empty :text="emptyText" height="80px" width="80px" :loadingStatus="loadingStatus"></my-empty>
          </view>
          <view class="trade-order-list" v-else>
            <entrust-order class="trade-order-item" v-for="item in orderList" :key="item.id" :item="item"></entrust-order>
            <view class="load-more" v-if="loadingStatus !== 'noMore' || params.page > 1">
              <uni-load-more :status="loadingStatus" color="#2DBD96" iconType="circle" :contentText="loadingMoreText"></uni-load-more>
            </view>
          </view>
        </view>
      </view>
    </view>

    <!--支付密码弹框-->
    <my-pay-pwd ref="payPwd" @close="closePayPwd" @success="orderSub"></my-pay-pwd>

    <!--选择交易对-->
    <uni-drawer ref="pairList" mode="left" @change="pairListChange" :width="300">
      <view class="pair-list">
        <view class="pair-list-head">
          <text class="pair-list-head-title">{{headTitle}}</text>
          <my-input class="pair-list-head-input" size="mini" :placeholder="searchPlaceholder" v-model="search">
            <template slot="prefix">
              <uni-icons class="pair-list-head-search" type="search" size="20" color="#E1E8F5" />
            </template>
          </my-input>
        </view>
        <view class="pair-list-body">
          <scroll-view class="pair-list-tab-box" :scroll="false" :scroll-x="true" :show-scrollbar="false" :scroll-into-view="scrollInto">
            <view style="display: flex; flex-direction: row;">
              <view v-for="(tab,index) in tabList" :key="tab.id" class="pair-list-tab-item" :id="tab.id" :data-current="index" @click="ontabtap">
                <text class="pair-list-tab-item-title" :class="tabIndex===index ? 'pair-list-tab-item-title-active' : ''">{{tab.name}}</text>
                <view class="pair-list-tab-item-title-active-line" v-if="tabIndex===index"></view>
              </view>
            </view>
          </scroll-view>
          <swiper :current="tabIndex" class="pair-list-page-swiper" :duration="300" @change="ontabchange">
            <swiper-item class="pair-list-page-swiper-item" v-for="(page, index) in tabList" :key="page.id">
              <swiper-list-page class="pair-list-page-swiper-list-item" :loading-more-text="loadingMoreText" :nid="page.nid" :ref="'page' + index" width="300px"></swiper-list-page>
            </swiper-item>
          </swiper>

          <cover-view class="pair-list-head-list" v-if="search.length > 0"></cover-view>
        </view>
      </view>
    </uni-drawer>

  </view>

</template>

<script>
  // #ifdef APP-PLUS
  const dom = weex.requireModule('dom');
  // #endif
  import {initVueI18n} from '@dcloudio/uni-i18n'
  import messages from '../../locale/index';
  import {mapActions, mapGetters} from "vuex";
  import myNavBarTrade from "../../components/my-nav-bar/my-nav-bar-trade"
  import myPopup from "../../components/my-popup/my-popup"
  import myEmpty from "../../components/my-empty/my-empty";
  import myButton from "../../components/my-button/button"
  import myInput from "../../components/my-input/input"
  import myPayPwd from "../../components/my-pay-pwd/index"
  import entrustOrder from "../../components/trade/entrust-order"
  import swiperListPage from "../../components/trade/pair-swiper-list-page"
  import {marketDepthList} from "../../api/market/depth";
  import {memberCoinPairBalance} from "../../api/user/memberCoin";
  import {entrustOrderList} from "../../api/trade/entrustOrder";
  import {accMul,accDiv} from "../../utils/decimal";
  import {entrustOrderCreate} from "../../api/trade/entrustOrder";
  import {navigateTo, navigateToLogin} from "../../utils/common";

  const { t } = initVueI18n(messages)

  // 缓存每页最多
  const MAX_CACHE_DATA = 100;
  // 缓存页签数量
  const MAX_CACHE_PAGE = 3;

  export default {
    components: {
      myNavBarTrade,
      myPopup,
      myEmpty,
      myButton,
      myInput,
      myPayPwd,
      entrustOrder,
      swiperListPage,
    },
    computed: {
      ...mapGetters({
        pair: "pair",
        marketCollect: "marketCollect",
        tradeIsShowInit: "tradeIsShowInit",
        memberInfo: "memberInfo",
        usdtRate: "usdtRate",
      }),
      tabBars() {
        return [t('trade.coin2coin'),t('trade.lever')]
      },
      stepPrice() {
        let precision = this.pair.tradePricePrecision
        if (precision <= 0) {
          return 1
        } else {
          let pow = Math.pow(10, precision)
          return Number(Number(accDiv(1, pow)).toFixed(precision))
        }
      },
      stepAmount() {
        let precision = this.tradeForm.type === 1 ? this.pair.tradeAmountPrecision : this.pair.tradeTotalPrecision
        if (precision <= 0) {
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
          let usdtPrice = this.pair.coin.usdtPrice || 0
          price = price || 0
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
      orderCurrentTitle() {
        return t('trade.order.current')
      },
      orderHistoryTitle() {
        return t('trade.order.history')
      },
      emptyText() {
        return t('common.empty')
      },
      headTitle() {
        return t('trade.coin2coin')
      },
      searchPlaceholder() {
        return t('common.search.placeholder')
      },
    },
		data() {
			return {
        navBarTabIndex: 0,
        params: {
          tradeCoinId: "",
          coinId: "",
          status: 1,
          page: 1,
          limit: 10,
        },
        loadingMoreText: {
          contentdown: t('common.more.down'),
          contentrefresh: t('common.more.refresh'),
          contentnomore: t('common.more.nomore')
        },
        tradeBalance: -1,
        balance: -1,
        depthSell: [],
        depthBuy: [],
        isNoData: true,
        loadingStatus: "more",
        orderList: [],
        isShowPayPwd: false, // 是否在页面显示的时候重新调起支付
        // 交易数据
        tradeFormLoading: false,
        tradeForm: {
          payPwd: "",
          tradeCoinId: 0,
          coinId: 0,
          type: 1,
          direction: 1,
          price: "",
          amount: "",
          total: "",
        },
        depthType: 0,
        // 选择交易对相关
        changeStatus: false,
        tabList: [
          {
            id: "tab00",
            name: t('market.collect'),
            nid: 0
          },
          {
            id: "tab01",
            name: 'USDT',
            nid: 1
          },
          {
            id: "tab02",
            name: 'BTC',
            nid: 2
          },
          {
            id: "tab03",
            name: 'ETH',
            nid: 3
          },
          {
            id: "tab04",
            name: '消费',
            nid: 225
          },
          {
            id: "tab05",
            name: '娱乐',
            nid: 208
          },
        ],
        tabIndex: 0,
        cacheTab: [],
        scrollInto: "",
        search: "",
      }
		},
		onLoad() {
      this.init()

      // 监听深度图数据事件
      uni.$on('depthWs',(res)=>{
        // 判断是不是当前交易对
        if (res.tradeCoinId !== this.pair.tradeCoinId || res.coinId !== this.pair.coinId) {
          return false
        }
        let sellList = res.sellList || []
        this.depthSell = sellList.reverse()
        this.depthBuy = res.buyList || []
      })
		},
    onShow() {
      if (this.tradeIsShowInit === 1) {
        this.setTradeIsShowInit(0)
        this.init()
      }
      if (this.isShowPayPwd) {
        this.isShowPayPwd = false
        this.showPayPwd()
      }
    },
    onUnload() {
      // 移除深度图数据监听事件
      uni.$off('depthWs');
    },
    onReachBottom() {
      this.loadMore()
    },
    onPullDownRefresh() {
      this.init()
    },
    onReady() {
    },
		methods: {
      ...mapActions({
        setPair: "setPair",
        setTradeIsShowInit: "setTradeIsShowInit",
      }),
      onNavBarTabClickItem(index) {
        this.navBarTabIndex = index
      },
      loadMore() {
        this.getOrderList();
      },
      initTradeForm() {
        this.tradeForm.payPwd = ""
        this.tradeForm.price = ""
        this.tradeForm.amount = ""
        this.tradeForm.total = ""

        this.params.page = 1
        this.orderList = []
        this.loadingStatus = "more"

        this.depthBuy = []
        this.depthSell = []
      },
      init() {
        this.initTradeForm()
        this.setPair({})
          .then(b => {
            uni.stopPullDownRefresh()
            if (!b) {
              this.$tui.toast("error")
              return false
            }
            this.tradeForm.coinId = this.pair.coin.id
            this.tradeForm.tradeCoinId = this.pair.tradeCoin.id
            this.params.coinId = this.pair.coin.id
            this.params.tradeCoinId = this.pair.tradeCoin.id
            this.getDepth()
            if (this.memberInfo.memberId > 0) {
              this.getBalance()
              this.getOrderList(true);
            }
          })
      },
      getBalance() {
        memberCoinPairBalance(this.params)
            .then(res => {
              if (res.code > 0) {
                // this.$tui.toast(t('http.code.' + res.code))
                // return false
              }
              this.tradeBalance = res.data.tradeBalance || 0.00
              this.balance = res.data.balance || 0.00
            })
      },
      getDepth() {
        marketDepthList(this.params)
            .then(res => {
              if (res.code > 0) {
                this.$tui.toast(t('http.code.' + res.code))
                return false
              }
              let sellList = res.data.sellList || []
              this.depthSell = sellList.reverse()
              this.depthBuy = res.data.buyList ||[]
            })
            .catch(() => {
            })
      },
      getOrderList(refresh) {
        if (this.loadingStatus !== "more") {
          return false
        }
        this.loadingStatus = "loading";
        entrustOrderList(this.params)
          .then(res => {
            if (res.code > 0) {
              this.loadingStatus = "noMore";
              if (refresh) {
                this.isNoData = true;
              }
              return false
            }
            this.loadingStatus = "more";
            let dataList = res.data || []
            this.isNoData = (dataList.length === 0 && this.orderList.length === 0);
            if (refresh) {
              this.orderList = dataList;
            } else {
              this.orderList = this.orderList.concat(dataList);
            }
            this.params.page++
            if (dataList.length < this.params.limit) {
              this.loadingStatus = "noMore";
            }
          })
          .catch(() => {
            this.isNoData = false
            this.loadingStatus = "noMore";
            if (this.orderList.length === 0) {
              this.isNoData = true;
            }
          })
      },
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
      showPayPwd() {
        if (this.isLoginTo()) {
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

        this.isShowPayPwd = true
        // 打开支付界面
        const redirect = encodeURIComponent("trade/index")
        this.$refs.payPwd.open(this.memberInfo.isPayPwd, redirect)
      },
      closePayPwd() {
        this.isShowPayPwd = false
      },
      orderSub(payPwd) {
        if (this.tradeFormLoading) {
          return false
        }
        if (this.tradeForm.type === 2 && this.tradeForm.direction === 1) {
          this.tradeForm.total = this.tradeForm.amount
        }
        this.tradeFormLoading = true
        this.tradeForm.payPwd = payPwd
        entrustOrderCreate(this.tradeForm)
          .then(res => {
            this.tradeFormLoading = false
            if (res.code > 0) {
              this.$tui.toast(t('http.code.' + res.code))
              return false
            }
            let msg = this.tradeForm.direction === 1 ? t('trade.order.sub.buy.success') : t('trade.order.sub.sell.success')
            this.$tui.toast(msg)
            this.init()
          })
          .catch(() => {
            this.tradeFormLoading = false
            this.$tui.toast(t('http.code.1'))
          })
      },
      isLoginTo() {
        if (this.memberInfo.memberId <= 0) {
          // 打开显示页面时重新加载数据的开关
          this.setTradeIsShowInit(1)
          const redirect = encodeURIComponent("trade/index")
          navigateToLogin(redirect)
          return true
        }
        return false
      },
      historyOrderTo() {
        if (this.isLoginTo()) {
          return false
        }
        navigateTo("trade/history?tabIndex=1")
      },
      pairListTo() {
        this.$refs.pairList.open()
      },
      pairListChange(status) {
        if (!this.changeStatus && status) {
          this.changeStatus = true
          this.pageList = [];
          let len = this.tabList.length
          for (let i = 0; i < len; i++) {
            let item = this.$refs['page' + i]
            if (Array.isArray(item)) {
              this.pageList.push(item[0])
            } else {
              this.pageList.push(item)
            }
          }
          this.switchTab(this.tabIndex);
        }
      },// 滑动相关
      ontabtap(e) {
        let index = e.target.dataset.current || e.currentTarget.dataset.current;
        this.switchTab(index);
      },
      ontabchange(e) {
        let index = e.target.current || e.detail.current;
        this.switchTab(index);
      },
      switchTab(index) {
        if (this.pageList[index].dataList.length === 0) {
          this.loadTabData(index);
        }

        if (this.tabIndex === index) {
          return;
        }

        // 缓存 tabId
        if (this.pageList[this.tabIndex].dataList.length > MAX_CACHE_DATA) {
          let isExist = this.cacheTab.indexOf(this.tabIndex);
          if (isExist < 0) {
            this.cacheTab.push(this.tabIndex);
          }
        }

        this.tabIndex = index;
        this.scrollInto = this.tabList[index].id;

        // 释放 tabId
        if (this.cacheTab.length > MAX_CACHE_PAGE) {
          let cacheIndex = this.cacheTab[0];
          this.clearTabData(cacheIndex);
          this.cacheTab.splice(0, 1);
        }
      },
      loadTabData(index) {
        this.pageList[index].loadData();
      },
      refreshData(index) {
        this.pageList[index].refreshData();
      },
      clearTabData(index) {
        this.pageList[index].clear();
      },
		}
	}
</script>

<style lang="scss" scoped>
  .page-header {
  }
  .page-box {
    background-color: #11151F;
  }
  .page-line {
    height: 3px;
  }
  .page-body {
  }
  .listview {
  }
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
    display: flex;
    flex-direction: column;
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
    border-bottom: solid 1px #292E39;
  }
  .trade-order-head-box {
    flex: 1;
    display: flex;
    flex-direction: row;
    align-items: center;
  }
  .trade-order-head-tab:first-child {
    margin-left: 0;
  }
  .trade-order-head-tab {
    margin-left: 15px;
    padding: 8px 0;
    border-bottom: solid 3px transparent;
    &.selected {
      border-bottom: solid 3px #2DBD96;
      .trade-order-head-tab__text {
        color: #E1E8F5;
      }
    }
    &__text {
      font-size: 13px;
      color: #9197A3;
      font-weight: 600;
    }
  }
  .trade-order-box {
  }
  .trade-order-empty {
    width: 750rpx;
    height: 170px;
    display: flex;
    justify-content: center;
  }
  .trade-order-item {
    background-color: transparent;
  }

  .load-more {
    background-color: #191E29;
  }

  .loading-icon {
    width: 20px;
    height: 20px;
    margin-left: 5px;
    color: #2DBD96;
  }

  .loading-text {
    margin-left: 2px;
    font-size: 16px;
    color: #2DBD96;
  }

  /* 滑动 */
  .pair-list {
    height: 100vh;
    display: flex;
    flex-direction: column;
  }
  .pair-list-head {
    padding: 35px 15px 15px;
    background-color: #11151F;
  }

  .pair-list-head-title {
    font-size: 20px;
    color: #E1E8F5;
  }

  .pair-list-head-input {
    margin-top: 15px;
    background-color: #212631;
    border-radius: 4px;
  }

  .pair-list-head-search {
    margin-left: 5px;
  }

  .pair-list-head-list {
    position: absolute;
    left: 0;
    right: 0;
    top: 0;
    bottom: 0;
    background-color: #1C222B;
    z-index: 10000;
  }
  .pair-list-body {
    flex: 1;
    background-color: #11151F;
    position: relative;
    display: flex;
    flex-direction: column;
  }
  .pair-list-tab-box {
    height: 35px;
    white-space: nowrap;
    position: relative;
    border-bottom: 1px solid #292E39;
    display: flex;
    flex-direction: row;
  }
  .pair-list-tab-back {
    position: absolute;
    left: 10px;
    top: 10px;
  }

  .pair-list-tab-item {
    /* #ifndef APP-PLUS */
    display: inline-block;
    /* #endif */
    flex-wrap: nowrap;
    padding-left: 20px;
    padding-right: 20px;
  }

  .pair-list-tab-item-title {
    color: #9197A3;
    font-size: 15px;
    flex-wrap: nowrap;
    /* #ifndef APP-PLUS */
    white-space: nowrap;
    /* #endif */
    position: relative;
    height: 35px;
    line-height: 35px;
  }

  .pair-list-tab-item-title-active {
    color: #E1E8F5;
    font-size: 16px;
    font-weight: bold;
  }
  .pair-list-tab-scroll-view-indicator {
    position: relative;
    height: 4px;
    background-color: transparent;
  }

  .pair-list-tab-scroll-view-underline {
    position: absolute;
    top: 0;
    bottom: 0;
    width: 0;
    padding-left: 20px;
    padding-right: 20px;
    display: flex;
    flex-direction: row;
  }

  .pair-list-tab-scroll-view-underline-bg {
    flex: 1;
    background-color: #2DBD96;
  }

  .pair-list-page-swiper {
    flex: 1;
    background-color: #11151F;
  }

  .pair-list-page-swiper-item {
    flex: 1;
    flex-direction: column;
  }

  .pair-list-page-swiper-list-item {
    flex: 1;
    flex-direction: row;
    position: absolute;
    left: 0;
    top: 0;
    right: 0;
    bottom: 0;
  }
</style>
