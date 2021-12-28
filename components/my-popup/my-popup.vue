<template>
  <view class="my-popup-box">
    <view class="my-popup-selected">
      <slot></slot>
    </view>
    <uni-popup ref="myPopup" :maskClick="false" @change="change" @maskClick="maskClick">
      <view class="my-popup">
        <view class="my-popup-list">
          <view class="my-popup-list-item" :class="[index === current ? 'selected' : '']" v-for="(item, index) in list" @click="selected(index)">
            <text class="my-popup-list-item__text">{{item}}</text>
            <uni-icons v-if="index === current" class="my-popup-list-item__check" color="#1ABB97" custom-prefix="iconfont" type="icon-check" size="20"></uni-icons>
          </view>
        </view>
        <view class="my-popup-close">
          <view class="my-popup-close-btn">
            <text class="my-popup-close__text">{{cancelText}}</text>
          </view>
        </view>
      </view>
    </uni-popup>
  </view>
</template>

<script>
export default {
  name: "my-popup",
  props: {
    cancelText: {
      type: String,
      default: ""
    },
    current: {
      type: Number,
      default: 0
    },
    list: {
      type: Array,
      default() {
        return []
      }
    }
  },
  data() {
    return {
    }
  },
  methods: {
    open(type) {
      uni.hideTabBar()
      this.$refs.myPopup.open(type)
    },
    change(e) {
      if (!e.show) {
      }
    },
    maskClick() {
      setTimeout(() => {
        uni.showTabBar()
      }, 300)
      this.$refs.myPopup.close()
    },
    selected(index) {
      this.maskClick()
      this.$emit('selected', index)
    },
  }
}
</script>

<style lang="scss" scoped>
.my-popup {
  background-color: #191E29;
  width: 750rpx;
  padding: 20px 0;
}
.my-popup-list {
  border-top-left-radius: 20px;
  border-top-right-radius: 20px;
}
.my-popup-list-item {
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
  padding: 13px 20px;
  &__text {
    color: #E1E8F5;
    font-size: 15px;
  }
  &.selected {
    background-color: #212631;
  }
}
.my-popup-close {
  padding: 20px 10px 0;
  &__text {
    color: #E1E8F5;
    font-size: 15px;
  }
}
.my-popup-close-btn {
  display: flex;
  justify-content: center;
  align-items: center;
  padding: 13px 0;
  border-radius: 3px;
  background-color: #212631;
}
</style>