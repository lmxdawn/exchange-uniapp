<template>
  <view>
    <uni-nav-bar fixed :color="color" :border="false" :background-color="backgroundColor" :statusBar="statusBar">
      <block slot="left">
        <view class="nav-bar-left" v-if="icon0Name">
          <uni-icons :type="icon0Name" :size="icon0Size" :color="icon0Color" @click="onClickIcon(0)" />
        </view>
      </block>
      <view class="input-view" @click="onClickInput">
        <uni-icons class="input-uni-icon" type="search" size="18" color="#717C8A" />
        <input confirm-type="search" disabled class="nav-bar-input" type="text" :placeholder="placeholder" />
      </view>
      <block slot="right">
        <view class="nav-bar-right" v-if="icon1Name || icon2Name">
          <uni-icons style="margin-right: 12px;" :type="icon1Name" :size="icon1Size" :color="icon1Color" @click="onClickIcon(1)"></uni-icons>
          <view style="margin-right: 10px">
            <uni-badge :is-dot="true" size="small" :text="icon2Value" absolute="rightTop">
              <uni-icons class="badge-box" :type="icon2Name" :size="icon2Size" :color="icon2Color" @click="onClickIcon(2)"></uni-icons>
            </uni-badge>
          </view>
        </view>
      </block>
    </uni-nav-bar>
  </view>
</template>

<script>
export default {
  name: "my-nav-bar-search",
  props: {
    statusBar: {
      type: Boolean,
      default: false
    },
    placeholder: {
      type: String,
      default: ""
    },
    color: {
      type: String,
      default: "#b8c6d8"
    },
    backgroundColor: {
      type: String,
      default: "#212631"
    },
    icon0Name: {
      type: String,
      default: ""
    },
    icon1Name: {
      type: String,
      default: ""
    },
    icon2Name: {
      type: String,
      default: ""
    },
    icon2Value: {
      type: Number,
      default: 0
    },
    icon0Size: {
      type: Number,
      default: 28
    },
    icon1Size: {
      type: Number,
      default: 28
    },
    icon2Size: {
      type: Number,
      default: 28
    },
    icon0Color: {
      type: String,
      default: "#717C8A"
    },
    icon1Color: {
      type: String,
      default: "#b8c6d8"
    },
    icon2Color: {
      type: String,
      default: "#b8c6d8"
    },
  },
  methods: {
    onClickInput() {
      this.$emit('onClickInput')
    },
    onClickIcon(index) {
      console.log(index)
      this.$emit('clickIcon', index)
    },
  }
}
</script>

<style lang="scss" scoped>
$nav-height: 35px;

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
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: center;
}

.input-view {
  display: flex;
  flex-direction: row;
  flex: 1;
  background-color: #292E39;
  height: $nav-height;
  border-radius: 5px;
  padding: 0 15px;
  flex-wrap: nowrap;
  line-height: $nav-height;
  margin: 7px 30px 7px 0;
}

.input-uni-icon {
  line-height: $nav-height;
}

.nav-bar-input {
  height: $nav-height;
  line-height: $nav-height;
  flex: 1;
  padding: 0 5px;
  font-size: 14px;
}
.badge-box {
  width: 20px;
  height: 20px;
  display: flex;
  justify-content: center;
  align-items: center;
}
</style>