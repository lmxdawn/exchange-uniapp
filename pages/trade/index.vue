<template>
	<view class="page-box">
    <my-nav-bar-trade
        class="page-header"
        :current="navBarTabIndex"
        :tabBars="tabBars"
        statusBar
        :pair="pair"
        @clickItem="onNavBarTabClickItem">
    </my-nav-bar-trade>

    <view class="page-line"></view>

    <view class="page-body">
      <view class="listview">
        <trade-list
            :pair="pair"
            :balance="balance"
            :tradeBalance="tradeBalance"
            :depth-buy="depthBuy"
            :depth-sell="depthSell"
            :isNoData="isNoData"
            :loading-status="loadingStatus"
            :orderList="orderList"></trade-list>
        <view class="load-more" v-if="!isNoData && (loadingStatus !== 'noMore' || params.page > 1)">
          <uni-load-more :status="loadingStatus" color="#2DBD96" iconType="circle" :contentText="loadingMoreText"></uni-load-more>
        </view>
      </view>
    </view>

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
  import tradeList from "./trade-list"
  import {marketDepthList} from "../../api/market/depth";
  import {memberCoinPairBalance} from "../../api/user/memberCoin";
  import {entrustOrderList} from "../../api/trade/entrustOrder";

  const { t } = initVueI18n(messages)

  export default {
    components: {
      myNavBarTrade,
      tradeList
    },
    computed: {
      ...mapGetters({
        pair: "pair",
        marketCollect: "marketCollect",
      }),
      tabBars() {
        return [t('trade.coin2coin'),t('trade.lever')]
      },
    },
		data() {
			return {
        navBarTabIndex: 0,
        params: {
          tradeCoinId: 3,
          coinId: 1,
          page: 1,
          limit: 20,
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
        isShowInit: false, // 是否在页面显示的时候重新加载
      }
		},
		onLoad() {
      // 设置参数
      this.params.tradeCoinId = this.pair.tradeCoin.id
      this.params.coinId = this.pair.coin.id

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
      if (this.isShowInit) {
        this.isShowInit = false
        this.init()
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
		methods: {
      ...mapActions({
        setPair: "setPair",
      }),
      onNavBarTabClickItem(index) {
        this.navBarTabIndex = index
      },
      loadMore() {
        this.getOrderList();
      },
      init() {
        this.setPair(this.params)
          .then(b => {
            uni.stopPullDownRefresh()
            if (!b) {
              this.$tui.toast("error")
            }
            this.getBalance()
            this.getDepth()
            this.getOrderList();
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
      getOrderList() {
        if (this.loadingStatus !== "more") {
          return false
        }
        this.loadingStatus = "loading";
        entrustOrderList(this.params)
          .then(res => {
            if (res.code > 0) {
              this.loadingStatus = "noMore";
              if (this.orderList.length === 0) {
                this.isNoData = true;
              }
              return false
            }
            this.loadingStatus = "more";
            let dataList = res.data || []
            this.isNoData = (dataList.length === 0 && this.orderList.length === 0);
            console.log(dataList.length, this.orderList.length)
            this.orderList = this.orderList.concat(dataList);
            this.params.page++
            if (dataList.length < this.params.limit) {
              this.loadingStatus = "noMore";
            }
          })
          .catch(() => {
            console.log(123456)
            this.isNoData = false
            this.loadingStatus = "noMore";
            if (this.orderList.length === 0) {
              this.isNoData = true;
            }
          })
      }
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
</style>
