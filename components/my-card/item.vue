<template>
  <view class="my-card-item" @click="click()">
    <view class="my-card-item-left">
      <uni-icons v-if="leftIcon" class="my-card-item-left-icon" custom-prefix="custom-icon" :type="leftIcon" color="#c1cdde" size="18"></uni-icons>
      <text class="my-card-item-left-text">{{leftText}}</text>
    </view>
    <view class="my-card-item-right">
      <text class="my-card-item-right-text">{{rightText}}</text>
      <uni-icons v-if="rightIcon" class="my-card-item-right-icon" custom-prefix="custom-icon" :type="rightIcon" color="#c1cdde" size="18"></uni-icons>
    </view>
  </view>
</template>

<script>
export default {
  name: "my-card-item",
  props: {
    leftIcon: String,
    leftText: String,
    rightText: String,
    rightIcon: String,
  },
  computed: {
  },
  methods: {
    click() {
      this.$emit("click")
    }
  }
};
</script>

<style lang="scss" scoped>
.my-card-item {
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  padding: 20px 5px;
}
.my-card-item-left {
  display: flex;
  flex-direction: row;
  align-items: center;
}
.my-card-item-left-icon {
  margin-right: 5px;
}
.my-card-item-left-text {
  color: #E1E8F5;
  font-size: 16px;
  font-weight: 500;
}
.my-card-item-right {
  display: flex;
  flex-direction: row;
  align-items: center;
}
.my-card-item-right-icon {
  margin-right: 5px;
}
.my-card-item-right-text {
  color: #9197A3;
  font-size: 12px;
}
</style>
