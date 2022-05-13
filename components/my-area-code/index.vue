<template>
  <view class="my-area-code">
    <view class="my-area-code-value" @click="valueClick">
      <text class="my-area-code-value-text" :style="{color: color}">+{{selectedItem.code}}</text>
      <uni-icons custom-prefix="custom-icon" type="bottom" color="#4F5460" size="12"></uni-icons>
    </view>
    <uni-popup ref="myAreaCodePopup" background-color="#191E29">
      <scroll-view scroll-y class="my-area-code-popup-content">
        <my-empty class="my-area-code-popup-content-empty" v-if="isNoData" :text="emptyText" :loadingStatus="loadingStatus"></my-empty>
        <view class="my-area-code-popup-content-list">
          <view class="my-area-code-popup-content-item" v-for="item in dataList" :key="item.id" @click="itemCLick(item)">
            <text class="my-area-code-popup-content-item-text" :style="{color: color}">{{item.name}}</text>
            <text class="my-area-code-popup-content-item-text" :style="{color: color}">+{{item.code}}</text>
          </view>
        </view>
      </scroll-view>
    </uni-popup>
  </view>
</template>

<script>
import myEmpty from "../../components/my-empty/my-empty";
import {areaCodeList} from "../../api/other/areaCode";
export default {
  name: "index",
  components: {
    myEmpty
  },
  props: {
    type: {
      type: String,
      default: "default"
    },
    emptyText: {
      type: String,
      default: "NOT DATA"
    },
  },
  computed: {
    color() {
      const colors = {
        default: "#E1E8F5"
      }
      return colors[this.type];
    }
  },
  data() {
    return {
      selectedItem: {
        code: 0
      },
      dataList: [],
      isNoData: true,
      loadingStatus: "more",
      params: {
        page: 1,
        limit: 100,
      }
    }
  },
  methods: {
    valueClick() {
      this.$refs.myAreaCodePopup.open("right")
      this.loadData()
    },
    itemCLick(item) {
      this.$refs.myAreaCodePopup.close()
      this.selectedItem = item
      this.$emit("selected", item)
    },
    loadData(refresh) {
      this.loadingStatus = 'loading'
      areaCodeList(this.params)
        .then(res => {
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
          console.log(dataList)
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
          if (refresh) {
            this.refreshStatus()
          }
        })
    },
    refreshStatus() {

    }
  }
}
</script>

<style scoped>
.my-area-code {
  border-right: 1px solid #292E39;
}
.my-area-code-value {
  padding: 14px;
}
.my-area-code-popup-content {
  position: relative;
  /* #ifndef APP-NVUE */
  height: 100vh;
  /* #endif */
  /* #ifdef APP-NVUE */
  flex: 1;
  /* #endif */
  width: 500rpx;
}
.my-area-code-popup-content-empty {
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  width: 500rpx;
}
.my-area-code-value-text {
  margin-right: 5px;
}
.my-area-code-popup-content-item {
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
  padding: 14px;
}
.my-area-code-popup-content-item-text {
  font-size: 25rpx;
}
</style>