<template>

  <view class="pair-list">
    <uni-drawer ref="drawer" mode="left" :mask-click="false" @change="change" :width="300">
      <view class="pair-list-tab-box">
        <view v-for="(tab,index) in tabList" :key="tab.id" class="pair-list-tab-item" :id="tab.id" :data-current="index" @click="ontabtap">
          <text class="pair-list-tab-item-title" :class="tabIndex===index ? 'pair-list-tab-item-title-active' : ''">{{tab.name}}</text>
          <view class="pair-list-tab-item-title-active-line" v-if="tabIndex===index"></view>
        </view>
      </view>
      <swiper :current="tabIndex" class="pair-list-page-swiper" :duration="300" @change="ontabchange">
        <swiper-item class="pair-list-page-swiper-item" v-for="(page, index) in tabList" :key="page.id">
          <swiper-list-page class="pair-list-page-swiper-list-item" :loading-more-text="loadingMoreText" :nid="page.nid" :ref="'page' + index" width="300px"></swiper-list-page>
        </swiper-item>
      </swiper>
    </uni-drawer>
  </view>

</template>

<script>
import MyStatusBar from "../my-status-bar";
import MyInput from "../my-input/input";
import swiperListPage from "./pair-swiper-list-page.nvue";
import {initVueI18n} from '@dcloudio/uni-i18n'
import messages from '../../locale/index';

const { t } = initVueI18n(messages)

// 缓存每页最多
const MAX_CACHE_DATA = 100;
// 缓存页签数量
const MAX_CACHE_PAGE = 3;

export default {
  name: "pair-list",
  components: {
    MyStatusBar,
    MyInput,
    swiperListPage
  },
  computed: {
    headTitle() {
      return t('trade.coin2coin')
    },
    searchPlaceholder() {
      return t('common.search.placeholder')
    }
  },
  data() {
    return {
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
      loadingMoreText: {
        contentdown: t('common.more.down'),
        contentrefresh: t('common.more.refresh'),
        contentnomore: t('common.more.nomore')
      },
      pageList: []
    }
  },
  mounted() {
  },
  methods: {
    change(status) {
      if (!this.changeStatus && status) {
        this.changeStatus = true
        this.pageList = [];
        let len = this.tabList.length
        for (let i = 0; i < len; i++) {
          let item = this.$refs['page' + i]
          console.log(item)
          if (Array.isArray(item)) {
            this.pageList.push(item[0])
          } else {
            this.pageList.push(item)
          }
        }
        this.switchTab(this.tabIndex);
      }
    },
    open() {
      console.log(this.$refs.drawer)
      this.$refs.drawer.open()
    },

    // 滑动相关
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

.pair-list-tab-box {
  display: flex;
  justify-content: center;
  align-items: center;
  width: 300px;
  flex-direction: row;
  /* #ifndef APP-PLUS */
  white-space: nowrap;
  /* #endif */
  padding-top: 10px;
  padding-bottom: 10px;
  position: relative;
  border-bottom: 1px solid #292E39;
}
.pair-list-tab-back {
  position: absolute;
  left: 10px;
  top: 10px;
}

.pair-list-tab-item {
  flex-wrap: nowrap;
  margin-left: 22px;
  margin-right: 22px;
  display: flex;
  flex-direction: column;
}

.pair-list-tab-item-title {
  color: #9197A3;
  font-size: 16px;
  flex-wrap: nowrap;
  /* #ifndef APP-PLUS */
  white-space: nowrap;
  /* #endif */
  position: relative;
}

.pair-list-tab-item-title-active {
  color: #E1E8F5;
  font-size: 16px;
  font-weight: bold;
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