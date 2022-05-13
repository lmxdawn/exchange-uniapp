<template>
  <view class="my-area-code">
    <view class="my-area-code-value" @click="valueClick">
      <text class="my-area-code-value-text" :style="{color: color}">+374</text>
      <uni-icons custom-prefix="custom-icon" type="bottom" color="#4F5460" size="12"></uni-icons>
    </view>
    <uni-popup ref="myAreaCodePopup" background-color="#191E29">
      <scroll-view scroll-y class="my-area-code-popup-content">
        <my-empty class="my-area-code-popup-content-empty" v-if="isNoData" :text="emptyText" :loadingStatus="loadingStatus"></my-empty>
        <view class="my-area-code-popup-content-list">
          <view class="my-area-code-popup-content-item">
            <text class="my-area-code-popup-content-item-text" :style="{color: color}">阿尔及利亚</text>
            <text class="my-area-code-popup-content-item-text" :style="{color: color}">+374</text>
          </view>
        </view>
      </scroll-view>
    </uni-popup>
  </view>
</template>

<script>
import myEmpty from "../../components/my-empty/my-empty";
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
      dataList: [],
      isNoData: true,
      loadingStatus: "more",
      params: {
        page: 1,
        limit: 100,
      }
    }
  },
  mounted() {
    this.getList()
  },
  methods: {
    valueClick() {
      this.$refs.myAreaCodePopup.open("right")
    },
    getList() {
      this.loadingStatus = 'loading'
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
  height: 100%;
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