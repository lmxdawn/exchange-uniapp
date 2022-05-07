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
      <!-- #ifdef APP-NVUE -->
      <list ref="list" class="listview" @loadmore="loadMore">
        <refresh class="refresh" :display="refreshing ? 'show' : 'hide'" @refresh="onrefresh" @pullingdown="onpullingdown">
          <div class="refresh-view">
            <image class="refresh-icon" :src="refreshIcon" :style="{width: (refreshing || pulling) ? 0: '30px'}" :class="{'refresh-icon-active': refreshFlag}"></image>
            <loading-indicator class="loading-icon" animating="true" v-if="refreshing || pulling"></loading-indicator>
            <text class="loading-text">{{refreshText}}</text>
          </div>
        </refresh>
        <cell class="cell">
          <trade-list
              :pair="pair"
              :balance="balance"
              :tradeBalance="tradeBalance"
              :isNoData="isNoData"
              :loading-status="loadingStatus"
              :orderList="orderList"></trade-list>
        </cell>
        <cell class="load-more" v-if="loadingStatus !== 'noMore' || params.page > 1">
          <uni-load-more :status="loadingStatus" iconType="circle" :contentText="loadingMoreText"></uni-load-more>
        </cell>
      </list>
      <!-- #endif -->
      <!-- #ifndef APP-NVUE -->
      <scroll-view class="listview" style="flex: 1;" enableBackToTop="true" scroll-y @scrolltolower="loadMore()">
        <trade-list
            :pair="pair"
            :balance="balance"
            :tradeBalance="tradeBalance"
            :isNoData="isNoData"
            :loading-status="loadingStatus"
            :orderList="orderList"></trade-list>
        <view class="load-more" v-if="loadingStatus !== 'noMore' || params.page > 1">
          <uni-load-more :status="loadingStatus" iconType="circle" :contentText="loadingMoreText"></uni-load-more>
        </view>
      </scroll-view>
      <!-- #endif -->
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
  import {memberCoinSymbolBalance} from "../../api/user/memberCoin";
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
        return [t('trade.coin2coin'),t('market.contract')]
      },
    },
		data() {
			return {
        navBarTabIndex: 0,
        refreshing: false,
        refreshFlag: false,
        refreshText: "",
        refreshIcon: "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAIAAAACABAMAAAAxEHz4AAAABGdBTUEAALGPC/xhBQAAAAFzUkdCAK7OHOkAAAAVUExURUxpcSKtjyOtjyOtkCGujyOujyOtjyVq54MAAAAGdFJOUwCBq1Ms2KeJoRYAAAETSURBVGje7de9DoIwFAXgqrgzKLMOOhMTnZmcndwB4f0fQbHclj+Tnt7E6ZyFpAknHy3hBmMYhmEYhmGgbPbVTlWQtW2TKu5ft5+UioJzV9CmOoCGYAHxhB4QTxBALMEBYgkeEEcYAOIIQ0AMYQSIIYwBOGECwAlTAEqYAVDCHIARFgAYYQmAECaADCYIoLaXFUpwN+T2YoTwCiy4CcD0BdJYhX/LLUAK3Aq2BbVxBUIoIEHuC2SpQPbgA/AFltAEPsJdAL7AEkrkGDvAoOC7dkBGaj4uMFfkTUxOjR3qw8O7HHP8wwqdPgtYwAIWsCBgSlaKgkz7z7TtCh6KggQYyT/G5FP129gZCsMwDMMwDMP8PW8Th/WSXjS8nAAAAABJRU5ErkJggg==",
        pulling: false,
        params: {
          tradeCoinId: 3,
          coinId: 1,
        },
        refreshStatusText: {
          initial: t('common.refresh.initial'),
          complete: t('common.refresh.complete'),
          pull: t('common.refresh.pull'),
          freed: t('common.refresh.freed'),
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
        isNoData: false,
        loadingStatus: "more",
        orderList: [],
      }
		},
		onLoad() {
      this.init()
		},
    onUnload() {

    },
		methods: {
      ...mapActions({
        setPair: "setPair",
        usdtRateSet: "usdtRateSet",
      }),
      onNavBarTabClickItem(index) {
        this.navBarTabIndex = index
      },
      loadData(refresh) {
        this.init(refresh)
      },
      loadMore(e) {
        this.getOrderList();
      },
      refreshStatus() {
        setTimeout(() => {
          this.pulling = true;
          this.refreshing = false;
          this.refreshFlag = false;
          this.refreshText = this.refreshStatusText.complete;
          setTimeout(() => { // TODO fix ios和Android 动画时间相反问题
            this.pulling = false;
          }, 500);
        }, 500);
      },
      refreshData() {
        this.refreshing = true;
        this.refreshText = this.refreshStatusText.initial;
        this.params.page = 1
        this.loadData(true);
      },
      onrefresh(e) {
        if (!this.refreshFlag) {
          return;
        }
        this.refreshData();
        // #ifdef APP-NVUE
        this.$refs.list.resetLoadmore();
        // #endif

      },
      onpullingdown(e) {
        if (this.refreshing || this.pulling) {
          return;
        }

        if (Math.abs(e.pullingDistance) > Math.abs(e.viewHeight)) {
          this.refreshFlag = true;
          this.refreshText = this.refreshStatusText.freed;
        } else {
          this.refreshFlag = false;
          this.refreshText = this.refreshStatusText.pull;
        }
      },
      init(refresh) {
        this.setPair(this.params)
          .then(b => {
            if (!b) {
              this.$tui.toast("error")
            }
            this.getBalance()
            this.getDepth(refresh)
            this.getOrderList();
          })
      },
      getBalance() {
        const params = {
          tradeCoinId: this.pair.tradeCoin.id,
          coinId: this.pair.coin.id,
        }
        memberCoinSymbolBalance(params)
            .then(res => {
              if (res.code > 0) {
                this.$tui.toast(t('http.code.' + res.code))
                return false
              }
              this.tradeBalance = res.data.tradeBalance || 0.00
              this.balance = res.data.balance || 0.00
            })
      },
      getDepth(refresh) {
        const params = {
          tradeCoinId: this.pair.tradeCoin.id,
          coinId: this.pair.coin.id,
        }
        marketDepthList(params)
            .then(res => {
              if (refresh) {
                this.refreshStatus()
              }
              if (res.code > 0) {
                this.$tui.toast(t('http.code.' + res.code))
                return false
              }
              let sellList = res.data.sellList || []
              this.depthSell = sellList.reverse()
              this.depthBuy = res.data.buyList ||[]
            })
            .catch(() => {
              if (refresh) {
                this.refreshStatus()
              }
            })
      },
      getOrderList() {
        let params = {
          tradeCoinId: this.pair.tradeCoin.id,
          coinId: this.pair.coin.id,
          page: 1,
          limit: 20
        }
        entrustOrderList(params)
          .then(res => {
            this.loadingStatus = "noMore";
            if (res.code > 0) {
              if (this.orderList.length === 0) {
                this.isNoData = true;
              }
              return false
            }
            let dataList = res.data || []
            this.isNoData = (dataList.length === 0 && this.orderList.length === 0);
            this.orderList = dataList;
          })
          .catch(() => {
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
    flex: 1;
    /* #ifndef APP-PLUS */
    display: flex;
    /* #endif */
    flex-direction: column;
    background-color: #11151F;
  }
  .page-line {
    height: 3px;
  }
  .page-body {
    flex: 1;
    display: flex;
    flex-direction: column;
    /* #ifndef APP-NVUE */
    overflow: hidden auto;
    /* #endif */
  }
  .listview {
    flex: 1;
    /* #ifndef APP-NVUE */
    display: flex;
    flex-direction: column;
    overflow: hidden auto;
    /* #endif */
    /* #ifndef MP-ALIPAY */
    flex-direction: column;
    /* #endif */
  }

  .load-more {
    background-color: #191E29;
  }

  .refresh {
    height: 64px;
    flex-direction: row;
    justify-content: center;
  }

  .refresh-view {
    width: 750rpx;
    flex-direction: row;
    flex-wrap: nowrap;
    align-items: center;
    justify-content: center;
  }

  .refresh-icon {
    margin-top: 1px;
    width: 35px;
    height: 35px;
    transition-duration: .5s;
    transition-property: transform;
    transform: rotate(0deg);
    transform-origin: 16px 17px;
  }

  .refresh-icon-active {
    transform: rotate(180deg);
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
