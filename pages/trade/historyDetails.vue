<template>
  <view class="history-details">
    <view class="history-details-body">
      <entrust-order :item="item" class="history-details-order" total-class="bg" type-class="gray" :data-item-style="itemStyle"></entrust-order>

      <view class="history-details-data">

        <view class="history-details-title">{{titleText}}</view>

        <my-empty v-if="isNoData" :loading-status="loadingStatus" width=""></my-empty>
        <view class="history-details-list">
          <view class="history-details-item" v-for="item in dataList" :key="item.id">
            <view class="history-details-item-dashed">
              <view class="history-details-item-dashed-dot"></view>
            </view>
            <view class="history-details-item-box">
              <text class="history-details-item-time">{{item.createTime}}</text>
              <view class="history-details-item-data">

                <view class="history-details-item-data-item">
                  <text class="history-details-item-data-head">成交数量</text>
                  <view class="history-details-item-data-num">
                    <text class="history-details-item-data-num-text">{{item.amount}}</text>
                  </view>
                </view>

                <view class="history-details-item-data-item">
                  <text class="history-details-item-data-head">成交价格</text>
                  <view class="history-details-item-data-num">
                    <text class="history-details-item-data-num-text">{{item.price}}</text>
                  </view>
                </view>

                <view class="history-details-item-data-item">
                  <text class="history-details-item-data-head">成交额</text>
                  <view class="history-details-item-data-num">
                    <text class="history-details-item-data-num-text">{{item.price * item.amount}}</text>
                  </view>
                </view>

                <view class="history-details-item-data-item">
                  <text class="history-details-item-data-head">手续费</text>
                  <view class="history-details-item-data-num">
                    <text class="history-details-item-data-num-text">{{item.fee}}</text>
                    <text class="history-details-item-data-num-text gray">USDT</text>
                  </view>
                </view>

              </view>
            </view>
          </view>
        </view>

      </view>
    </view>

  </view>
</template>

<script>
import entrustOrder from '../../components/trade/entrust-order.vue';
import myEmpty from "../../components/my-empty/my-empty";
import {navigateBack} from "../../utils/common";
import {entrustOrderRead} from "../../api/trade/entrustOrder";
import {entrustOrderDetailList} from "../../api/trade/entrustOrderDetail";
export default {
  name: "historyDetails",
  components: {
    entrustOrder,
    myEmpty
  },
  computed: {
    titleText() {
      return this.$t('trade.order.history.details')
    },
    itemStyle() {
      return {
        flex: '0 0 50%',
        'margin-top': '8px'
      }
    },
  },
  data() {
    return {
      item: {
        coin: {},
        tradeCoin: {}
      },
      loading: false,
      dataList: [],
      isNoData: true,
      loadingStatus: "more",
      params: {
        id: "",
        page: 1,
        limit: 20,
      },
      loadingMoreText: {
        contentdown: this.$t('common.more.down'),
        contentrefresh: this.$t('common.more.refresh'),
        contentnomore: this.$t('common.more.nomore')
      },
    }
  },
  onLoad(option) {
    this.params.id = option.id;
    this.init();
  },
  onPullDownRefresh() {
    this.getList()
  },
  methods: {
    back() {
      navigateBack()
    },
    init(){
      this.getRead()
      this.getList(true)
    },
    getRead() {
      if (this.loading) {
        return false
      }
      entrustOrderRead(this.params)
        .then(res => {
          uni.stopPullDownRefresh()
          this.loading = false
          if (res.code !== 0) {
            this.$tui.toast(this.$t('http.code.' + res.code))
            return false;
          }
          this.item = res.data;
        })
        .catch(() => {
          uni.stopPullDownRefresh()
          this.loading = false
          this.$tui.toast(this.$t('http.code.1'))
        })
    },
    getList(refresh) {
      if (this.loadingStatus === "loading") {
        return false
      }
      this.loadingStatus = "loading"
      const params = {
        ...this.params,
        orderId: this.params.id
      }
      entrustOrderDetailList(params)
          .then(res => {
            this.isNoData = false
            if (res.code > 0) {
              this.loadingStatus = "noMore";
              if (this.dataList.length === 0) {
                this.isNoData = true;
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
            this.isNoData = false
            this.loadingStatus = "noMore";
            if (this.dataList.length === 0) {
              this.isNoData = true;
            }
          })
    }
  }
}
</script>

<style lang="scss">
page {
  background-color: #11151F;
}
.history-details {
}

.history-details-body {
  padding: 0 15px;
}
.history-details-order {
  flex: 1;
  background-color: #191E29;
  padding: 12px 8px;
  border-radius: 5px;
  margin-bottom: 10px;
}
.history-details-data {
  margin-top: 15px;
}
.history-details-title {
  font-size: 14px;
  color: #9197A3;
}

.history-details-list {
  //padding: 0 15px;
}

.history-details-item {
  margin-top: 10px;
  display: flex;
  flex-direction: row;
}

.history-details-item-dashed {
  margin-top: 5px;
  border-left: 1px dashed #9197A3;
  position: relative;
  height: 118px;
}

.history-details-item-dashed-dot {
  position: absolute;
  left: -3px;
  top: 0;
  width: 5px;
  height: 5px;
  border-radius: 2px;
  background-color: #9197A3;
}

.history-details-item-box {
  padding: 0 10px;
  flex: 1;
  display: flex;
  flex-direction: column;
}

.history-details-item-time {
  color: #9197A3;
  font-size: 12px;
}

.history-details-item-data {
  flex: 1;
  display: flex;
  flex-flow: row wrap;
  flex-direction: row;
  justify-content: space-between;
}

.history-details-item-data-item {
  margin-top: 10px;
  flex: 0 0 50%;
}

.history-details-item-data-head {
  font-size: 13px;
  color: #9197A3;
}
.history-details-item-data-num {
  display: flex;
  flex-direction: row;
  align-items: flex-end;
  margin-top: 5px;
}
.history-details-item-data-num-text {
  font-size: 14px;
  color: #E1E8F5;
  &.gray {
    color: #9197A3;
    font-size: 13px;
    margin-left: 5px;
  }
}

</style>