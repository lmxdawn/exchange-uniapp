<template>
  <view>
    <view class="my-select-list-value" @click="valueClick">
      <slot></slot>
    </view>
    <uni-popup ref="popup" background-color="#191E29">
      <scroll-view scroll-y class="my-popup-content">
        <my-empty class="my-popup-content-empty" v-if="isNoData" :text="emptyText" :loadingStatus="loadingStatus"></my-empty>
        <view class="my-popup-content-list">
          <view class="my-popup-content-item" v-for="item in dataList" :key="item.id" @click="itemCLick(item)">
            <text class="my-popup-content-item-text" :style="{color: color}">{{item.name}}</text>
            <uni-icons v-if="item.value === selectedValue" custom-prefix="custom-icon" type="checkmarkempty" color="#2DBD96" size="15"></uni-icons>
          </view>
        </view>
      </scroll-view>
    </uni-popup>
  </view>
</template>

<script>
import myEmpty from "../my-empty/my-empty";

export default {
  name: "my-select-list",
  components: {
    myEmpty
  },
  props: {
    type: {
      type: String,
      default: "default"
    },
    isNoData: {
      type: Boolean,
      default: true
    },
    emptyText: {
      type: String,
      default: "NOT DATA"
    },
    loadingStatus: {
      type: String,
      default: 'more'
    },
    dataList: {
      type: Array,
      default: []
    },
    selectedValue: {
      type: Number | String,
      default: 0
    }
  },
  computed: {
    color() {
      const colors = {
        default: "#E1E8F5"
      }
      return colors[this.type];
    }
  },
  methods: {
    valueClick() {
      this.$refs.popup.open("right")
    },
    itemCLick(item) {
      this.$refs.popup.close()
      this.$emit("selected", item)
    },
  }
}
</script>

<style scoped>

.my-popup-content {
  position: relative;
  /* #ifndef APP-NVUE */
  height: 100vh;
  /* #endif */
  /* #ifdef APP-NVUE */
  flex: 1;
  /* #endif */
  width: 500rpx;
}
.my-popup-content-empty {
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  width: 500rpx;
}
.my-popup-content-item {
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
  padding: 14px;
}
.my-popup-content-item-text {
  font-size: 25rpx;
}
</style>