<template>
  <view class="dropdown">
    <view class="dropdown-selected">
      <slot></slot>
    </view>
    <view class="dropdown-list">

    </view>
  </view>
</template>

<script>
export default {
  name: "my-dropdown",
  props: {

  },
  methods: {
    open(type) {
      uni.hideTabBar()
    },
    change(e) {
      if (!e.show) {
        uni.showTabBar()
      }
    },
    tradeTypeSelected() {

    },
  }
}
</script>

<style lang="scss" scoped>
.dropdown {
  position: relative;
}
.dropdown-selected {
}
.dropdown-list {
  position: absolute;
  right: 0;
  bottom: 0;
  padding: 5px 15px;
  background-color: red;
}

</style>