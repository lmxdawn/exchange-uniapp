<template>
  <view>
    <uni-nav-bar :color="color" :border="false" :background-color="backgroundColor" :statusBar="statusBar">
      <block slot="left">
        <view class="nav-bar-left">
          <uni-icons :type="iconLeftName" size="25" :color="iconLeftColor" />
        </view>
      </block>
      <view class="nav-bar-center">
        <view class="nav-bar-center-box">
          <uni-segmented-control :current="current" :values="tabBars" @clickItem="onClickItem" styleType="button"></uni-segmented-control>
        </view>
      </view>
      <block slot="right">
        <view class="nav-bar-right">
          <uni-icons :type="iconRightName" size="25" :color="iconRightColor" />
        </view>
      </block>
    </uni-nav-bar>
  </view>
</template>

<script>
export default {
  name: "my-nav-bar-tab",
  props: {
    statusBar: {
      type: Boolean,
      default: false
    },
    current: {
      type: Number,
      default: 0
    },
    tabBars: {
      type: Array,
      default() {
        return []
      }
    },
    iconLeftName: {
      type: String,
      default: ""
    },
    iconRightName: {
      type: String,
      default: ""
    },
    iconLeftColor: {
      type: String,
      default: "#E1E8F5"
    },
    iconRightColor: {
      type: String,
      default: "#E1E8F5"
    },
    color: {
      type: String,
      default: "#E1E8F5"
    },
    backgroundColor: {
      type: String,
      default: "#191E29"
    },
  },
  methods: {
    onClickItem(e) {
      if (this.current !== e.currentIndex) {
        this.$emit('clickItem', e.currentIndex)
      }
    },
  }
}
</script>

<style lang="scss" scoped>
$nav-height: 30px;
.uni-nav-bar-text {
  font-size: 12px;
}

.nav-bar-left {
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: center;
}
.nav-bar-right {
  //float: right;
}

.nav-bar-center {
  display: flex;
  flex: 1;
  justify-content: center;
  align-items: center;
}
.nav-bar-center-box {
  width: 300rpx;
  display: flex;
  justify-content: center;
}

.input-uni-icon {
  line-height: $nav-height;
}

.nav-bar-input {
  height: $nav-height;
  line-height: $nav-height;
  width: 320rpx;
  padding: 0 5px;
  font-size: 14px;
}
</style>