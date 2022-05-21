<template>
  <view class="page-news">
    <scroll-view class="listview" style="flex: 1;" enableBackToTop="true" scroll-y @scrolltolower="loadMore()">
      <view class="listview-box" v-for="(item, index) in dataList" :key="item.id">
        <entrust-order class="list-item" :item="item" forward :type-class="item.status !== 1 ? 'gray' : ''" :total-class="item.status === 1 ? 'bg' : ''" :data-item-style="itemStyle(item)"></entrust-order>
      </view>
      <my-empty v-if="isNoData" :text="emptyText" :click-data="nid" @emptyClick="emptyClick" :loadingStatus="loadingStatus"></my-empty>
      <view class="loading-more" v-if="loadingStatus !== 'noMore' && params.page > 1">
        <uni-load-more :status="loadingStatus" iconType="circle" :contentText="loadingMoreText"></uni-load-more>
      </view>
    </scroll-view>
  </view>
</template>

<script>

import entrustOrder from './entrust-order.vue';
import { entrustOrderList } from "../../api/trade/entrustOrder";
import myEmpty from "../../components/my-empty/my-empty";
import {
  initVueI18n
} from '@dcloudio/uni-i18n'
import messages from '../../locale/index';
const { t } = initVueI18n(messages)

export default {
  components: {
    entrustOrder,
    myEmpty
  },
  props: {
    nid: {
      type: [Number, String],
      default: ''
    },
    loadingMoreText: {
      type: Object,
      default: () => {
        return {
          contentdown: ' ',
          contentrefresh: ' ',
          contentnomore: ' '
        }
      }
    },
  },
  computed: {
    emptyText() {
      return t('common.empty')
    },
    itemStyle() {
      return item => {
        let obj = {}
        if (item.status !== 1) {
          obj["flex-direction"] = "row";
          obj["align-items"] = "center";
          obj["flex"] = "0 0 100%";
        }
        return obj;
      }
    }
  },
  data() {
    return {
      dataList: [],
      isNoData: true,
      loadingStatus: "more",
      loadingShow: true,
      params: {
        status: this.nid,
        page: 1,
        limit: 20,
      }
    }
  },
  created() {

  },
  methods: {
    emptyClick(data) {
      if (data === 0) {
        console.log("点击了空状态")
      }
    },
    loadData(refresh) {
      if (this.loadingStatus !== "more" && !refresh) {
        return;
      }
      this.loadingStatus = "loading";

      entrustOrderList(this.params)
        .then(res => {
          uni.stopPullDownRefresh()
          this.isNoData = false
          if (res.code > 0) {
            this.loadingStatus = "noMore";
            if (this.dataList.length === 0) {
              this.isNoData = true;
            }
            if (refresh) {
              this.refreshStatus()
            }
            return false
          }
          const dataList = res.data;
          // 请求的值小于每页数量
          this.isNoData = (dataList.length === 0 && this.dataList.length === 0);
          this.loadingStatus = "more";
          if (refresh) {
            this.dataList = dataList;
            this.refreshStatus()
          } else {
            this.dataList = this.dataList.concat(dataList);
          }
          this.params.page++
          if (dataList.length < this.params.limit) {
            this.loadingStatus = "noMore";
          }
        })
        .catch(() => {
          uni.stopPullDownRefresh()
          this.isNoData = false
          this.loadingStatus = "noMore";
          if (this.dataList.length === 0) {
            this.isNoData = true;
          }
          if (refresh) {
            this.refreshStatus()
          }
        })
    },
    loadMore(e) {
      console.log(123456)
      this.loadData();
    },
    clear() {
      this.dataList.length = 0;
      this.params.page = 1;
    },
    refreshStatus() {
    },
    refreshData() {
      this.params.page = 1
      this.loadData(true);
    },
  }
}
</script>

<style lang="scss" scoped>

.page-news {
  flex: 1;
  flex-direction: column;
  position: relative;
  left: 0;
  top: 0;
  right: 0;
  bottom: 0;
}

.listview {
  width: 750rpx;
  height: 100%;
  display: flex;
  flex-direction: column;
  padding-bottom: 10px;
}

.listview-box {
  padding: 0 12px;
}

.list-item {
  flex: 1;
  background-color: #191E29;
  padding: 12px 7px;
  border-radius: 5px;
  margin-top: 10px;
}

.loading-icon {
  width: 20px;
  height: 20px;
  margin-left: 5px;
  color: #23AD8F;
}

.loading-text {
  margin-left: 2px;
  font-size: 16px;
  color: #23AD8F;
}
</style>
