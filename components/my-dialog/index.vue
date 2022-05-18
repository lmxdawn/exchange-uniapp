<template>

  <view class="my-dialog">
    <view class="my-dialog-item" :class="[type === 'row' ? 'center' : 'left']" v-if="title">
      <text class="my-dialog-title">{{title}}</text>
    </view>
    <view class="my-dialog-item left" v-if="content">
      <text class="my-dialog-content">{{content}}</text>
    </view>
    <slot></slot>
    <view class="my-dialog-item" :class="[type === 'row' ? 'right' : 'column-center']">
      <text class="my-dialog-cancel" :class="[type === 'row' ? '' : 'column']" @click="close">{{cancelText}}</text>
      <text class="my-dialog-confirm" :class="[type === 'row' ? '' : 'column']" @click="confirm">{{confirmText}}</text>
    </view>
  </view>

</template>

<script>
export default {
  name: "index",
  props: {
    type: {
      type: String,
      default: "row", // 可选值：row/column
    },
    title: {
      type: String,
      default: "",
    },
    cancelText: {
      type: String,
      default: "",
    },
    confirmText: {
      type: String,
      default: "",
    },
    content: {
      type: String,
      default: "",
    }
  },
  methods: {
    close() {
      this.$emit('close')
    },
    confirm() {
      this.$emit('confirm')
    }
  }
}
</script>

<style lang="scss" scoped>
.my-dialog {
  width: 600rpx;
  background-color: #2A303A;
  border-radius: 5px;
  display: flex;
  flex-direction: column;
  padding: 12px 20px 12px 15px;
  box-sizing: border-box;
}
.my-dialog-item {
  flex: 1;
  display: flex;
  flex-direction: row;
  margin-top: 8px;
  margin-bottom: 8px;
  &:first-child {
    margin-top: 0;
  }
  &.center {
    justify-content: center;
  }
  &.left {
    justify-content: start;
  }
  &.right {
    justify-content: flex-end;
  }
  &.column-center {
    flex-direction: column-reverse;
    align-items: center;
  }
}
.my-dialog-title {
  font-size: 18px;
  color: #E1E8F5;
  font-weight: 600;
}
.my-dialog-content {
  font-size: 13px;
  color: #E1E8F5;
  font-weight: 500;
}
.my-dialog-cancel {
  font-size: 15px;
  color: #E1E8F5;
  font-weight: 500;
  &.column {
    color: #9197A3;
    padding: 10px 0 0;
  }
}
.my-dialog-confirm {
  font-size: 14px;
  color: #2DBD96;
  font-weight: 500;
  margin-left: 20px;
  &.column {
    color: #E1E8F5;
    margin-left: 0;
    width: 100%;
    display: flex;
    align-items: center;
    justify-content: center;
    background-color: #2DBD96;
    padding: 10px 0;
  }
}
</style>