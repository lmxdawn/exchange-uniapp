<template>
  <view class="page-box">
    <my-status-bar></my-status-bar>
    <view class="history-tab-box">
      <view v-for="(tab,index) in tabList" :key="tab.id" class="history-tab-item" :id="tab.id" :data-current="index" @click="ontabtap">
        <text class="history-tab-item-title" :class="tabIndex===index ? 'history-tab-item-title-active' : ''">{{tab.name}}</text>
        <view class="history-tab-item-title-active-line" v-if="tabIndex===index"></view>
      </view>
      <view class="history-tab-back" @click="back">
        <uni-icons color="#E1E8F5" type="back" size="22"/>
      </view>
    </view>
    <swiper :current="tabIndex" class="history-page-swiper" :duration="300" @change="ontabchange">
      <swiper-item class="history-page-swiper-item" v-for="(page, index) in tabList" :key="page.id">
        <entrust-order-swiper-list-page class="history-page-swiper-list-item" :loading-more-text="loadingMoreText" :refresh-status-text="refreshStatusText" :nid="page.nid" :ref="'page' + index"></entrust-order-swiper-list-page>
      </swiper-item>
    </swiper>
  </view>
</template>

<script>
import myNavBarTab from '../../components/my-nav-bar/my-nav-bar-tab';
import entrustOrderSwiperListPage from "../../components/trade/entrust-order-swiper-list-page";
import {
  initVueI18n
} from '@dcloudio/uni-i18n'
import messages from '../../locale/index';
import {navigateBack} from "../../utils/common";
import MyStatusBar from "../../components/my-status-bar";
const { t } = initVueI18n(messages)

// 缓存每页最多
const MAX_CACHE_DATA = 100;
// 缓存页签数量
const MAX_CACHE_PAGE = 3;

export default {
  name: "history",
  components: {
    MyStatusBar,
    myNavBarTab,
    entrustOrderSwiperListPage,
  },
  computed: {
    tabBars() {
      return [t('trade.coin2coin'),t('trade.lever')]
    }
  },
  data() {
    return {
      navBarTabIndex: 0,
      tabList: [
        {
          id: "tab00",
          name: t('trade.order.current'),
          nid: 1
        },
        {
          id: "tab01",
          name: t('trade.order.history'),
          nid: 2
        },
      ],
      tabIndex: 0,
      cacheTab: [],
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
      pageList: []
    }
  },
  onPullDownRefresh() {
    this.refreshData(this.tabIndex)
  },
  onLoad(option) {
    const tabIndex = parseInt(option.tabIndex)
    if (tabIndex >= 0 && tabIndex <= 1) {
      this.tabIndex = tabIndex
    }
  },
  onReady() {
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
  },
  methods: {
    back() {
      navigateBack()
    },
    onNavBarTabClickItem(index) {
      this.navBarTabIndex = index
    },
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
    }
  }
}
</script>

<style lang="scss" scoped>

.page-box {
  width: 100%;
  height: 100vh;
  display: flex;
  flex-direction: column;
}

.history-tab-box {
  display: flex;
  justify-content: center;
  align-items: center;
  width: 750rpx;
  flex-direction: row;
  /* #ifndef APP-PLUS */
  white-space: nowrap;
  /* #endif */
  padding-top: 10px;
  padding-bottom: 10px;
  position: relative;
  border-bottom: 1px solid #292E39;
}
.history-tab-back {
  position: absolute;
  left: 10px;
  top: 10px;
}

.history-tab-item {
  flex-wrap: nowrap;
  margin-left: 22px;
  margin-right: 22px;
  display: flex;
  flex-direction: column;
}

.history-tab-item-title {
  color: #9197A3;
  font-size: 16px;
  flex-wrap: nowrap;
  /* #ifndef APP-PLUS */
  white-space: nowrap;
  /* #endif */
  position: relative;
}

.history-tab-item-title-active {
  color: #E1E8F5;
  font-size: 16px;
  font-weight: bold;
}

.history-page-swiper {
  flex: 1;
  display: flex;
  background-color: #11151F;
}

.history-page-swiper-item {
  flex: 1;
  display: flex;
  flex-direction: column;
}

.history-page-swiper-list-item {
  flex: 1;
  flex-direction: row;
  position: absolute;
  left: 0;
  top: 0;
  right: 0;
  bottom: 0;
}

</style>