<template>

  <view>
    <my-k-line ref="myKLine" @tabSelected="echartsTabSelected" @dataZoomLeft="echartsDataZoomLeft" :pair="pair" :usdt-rate="usdtRate" :loading-status="echartsLoadingStatus" :depth-loading-status="echartsDepthLoadingStatus" @drawerClick="pairListTo"></my-k-line>

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
              <swiper-list-page class="pair-list-page-swiper-list-item" :loading-more-text="loadingMoreText" :nid="page.nid" :ref="'page' + index" width="300px" @pairItemClick="pairItemClick"></swiper-list-page>
            </swiper-item>
          </swiper>

          <cover-view class="pair-list-head-list" v-if="search.length > 0"></cover-view>
        </view>
      </view>
    </uni-drawer>
  </view>

</template>
<script>
import myKLine from '../../components/my-k-line/index'
import {mapGetters} from "vuex";
import {marketDepthList} from "../../api/market/depth";
import {marketKLineList} from "../../api/market/kLine";
import {pairRead} from "../../api/trade/pair";
import swiperListPage from "../../components/trade/pair-swiper-list-page"
import myInput from "../../components/my-input/input"
import {WS_MARKET_LISTEN} from "../../constant/wsListenConstant";

// 缓存每页最多
const MAX_CACHE_DATA = 100;
// 缓存页签数量
const MAX_CACHE_PAGE = 3;

export default {
  computed: {
    ...mapGetters({
      usdtRate: "usdtRate",
    }),
    headTitle() {
      return this.$t('trade.coin2coin')
    },
    searchPlaceholder() {
      return this.$t('common.search.placeholder')
    },
  },
  components: {
    myKLine,
    swiperListPage,
    myInput,
  },
  data() {
    return {
      params: {
        tradeCoinId: "",
        coinId: "",
        timeStr: "15min",
        time: 0,
      },
      pair: {
        coin: {},
        tradeCoin: {},
        price: -1,
        price24: -1,
        rate24: -1,
        tradeTotal24: -1,
        tradeAmount24: -1,
        highest24: -1,
        lowest24: -1,
        tradeTotalPrecision: 0,
        tradePricePrecision: 0,
        tradeAmountPrecision: 0
      },
      echartsLoadingStatus: 'loading',
      echartsDepthLoadingStatus: 'loading',
      // 选择交易对相关
      changeStatus: false,
      tabList: [
        {
          id: "tab00",
          name: this.$t('market.collect'),
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
      loadingMoreText: {
        contentdown: this.$t('common.more.down'),
        contentrefresh: this.$t('common.more.refresh'),
        contentnomore: this.$t('common.more.nomore')
      },
    };
  },
  onLoad(option) {
    if (option.coinId && option.tradeCoinId) {
      this.params.coinId = option.coinId
      this.params.tradeCoinId = option.tradeCoinId
    }

  },
  onReady() {
    // 初始化
    this.init()

    // 监听深度图数据事件
    uni.$on(WS_MARKET_LISTEN,(res)=>{
      const obj = res.match || {}
      // 判断是不是当前交易对
      if (res.tradeCoinId === this.pair.tradeCoin.id && res.coinId === this.pair.coin.id) {
        const buyList = res.buyList || []
        const sellList = res.sellList || []
        this.createDepth(buyList, sellList)
        if (obj.price && obj.price > 0) {
          // 更新价格
          this.pair.price = obj.price
        }
      }

      if (obj.price && obj.price > 0) {
        let coinId = res.coinId
        obj.coinId = coinId
        obj.tradeCoinId = res.tradeCoinId
        let len = this.tabList.length
        for (let i = 0; i < len; i++) {
          if (this.tabList[i].nid === coinId) {
            this.setTabItem(i, obj)
            break;
          }
        }
        // 总是去更新自选
        this.setTabItem(0, obj)
      }
    })
  },
  onUnload() {
    // 移除行情监听事件
    uni.$off(WS_MARKET_LISTEN);
  },
  methods: {
    init() {
      this.params.time = 0;
      // 获取交易对信息
      pairRead(this.params)
          .then(res => {
            if (res.code > 0) {
              return false
            }
            this.pair = res.data
            // 获取K线
            this.echartsLoadingStatus = 'loading'
            this.getKLine(false)
            // 获取深度图
            this.echartsDepthLoadingStatus = 'loading'
            this.getDepth()
          })
    },
    echartsTabSelected(item) {
      this.params.timeStr = item.value;
      this.params.time = 0;
      this.echartsLoadingStatus = 'loading'
      this.getKLine(false)
      console.log("图表里面的tab点击了", item)
    },
    echartsDataZoomLeft() {
      console.log("到最左边了")
      this.getKLine(true)
    },
    getKLine(isAdd) {
      marketKLineList(this.params)
          .then(res => {
            this.echartsLoadingStatus = 'more'
            if (res.code !== 0) {
              return false
            }
            let data = res.data
            // 组装数据，数据意义(下标)：[0]时间，[1]开盘(open)，[2]收盘(close)，[3]最低(lowest)，[4]最高(highest)，[5]数量(vol)
            let kLineData = []
            for (let i = 0; i < data.length; i++) {
              kLineData.push([
                data[i].time,
                data[i].open,
                data[i].close,
                data[i].low,
                data[i].high,
                data[i].vol,
              ])
              if (i === 0) {
                this.params.time = data[i].time
              }
            }
            if (isAdd) {
              this.$refs.myKLine.addHistoryData(kLineData)
              return false
            }
            this.$refs.myKLine.createKline(kLineData)
          })
    },
    getDepth() {
      marketDepthList(this.params)
          .then(res => {
            this.echartsDepthLoadingStatus = 'more'
            if (res.code > 0) {
              this.$tui.toast(t('http.code.' + res.code))
              return false
            }
            let buyList = res.data.buyList ||[]
            let sellList = res.data.sellList || []
            this.createDepth(buyList, sellList)
          })
          .catch(() => {
          })
    },
    createDepth(buyList, sellList) {
      let buyData = []
      for (let i = 0; i < buyList.length; i++) {
        buyData.push([
          buyList[i].price,
          buyList[i].amount,
        ])
      }
      let sellData = []
      for (let i = 0; i < sellList.length; i++) {
        sellData.push([
          sellList[i].price,
          sellList[i].amount,
        ])
      }
      this.$refs.myKLine.createDepth(buyData, sellData)
    },
    pairListTo() {
      this.$refs.pairList.open()
    },
    pairItemClick(params) {
      this.$refs.pairList.close()
      this.params.coinId = params.coinId
      this.params.tradeCoinId = params.tradeCoinId
      this.init()
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
    setTabItem(index, obj) {
      this.pageList[index].setItem(obj);
    },
    clearTabData(index) {
      this.pageList[index].clear();
    },
  }
};
</script>


<style lang="scss" scoped>

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