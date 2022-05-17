<template>
  <view class="my-keyboard-input-item" :style="{backgroundColor:backgroundColor, width: width + 'px', height: height + 'px'}">
    <text :style="{fontSize: size + 'px', color: color}">{{value}}</text>
  </view>
</template>
<script>
  export default {
    name: "myKeyboardInput",
    props: {
      //背景颜色
      backgroundColor: {
        type: String,
        default: "#393E48"
      },
      size: {
        type: Number,
        default: 20
      },
      width: {
        type: Number,
        default: 46
      },
      height: {
        type: Number,
        default: 46
      },
      color: {
        type: String,
        default: "#9EA4B0"
      },
      //输入框的值：数组格式，长度即为输入框个数
      value: {
        type: String,
        default: "" //密码圆点 ●
      }
    },
    data() {
      return {
      };
    }
  }
</script>
<style lang="scss" scoped>
.my-keyboard-input-item {
  display: flex;
  justify-content: center;
  align-items: center;
  position: relative;
  &::after {
    content: '';
    width: 200%;
    height: 200%;
    position: absolute;
    top: 0;
    left: 0;
    border: 1px solid #9197A3;
    border-radius: 10px;
    -webkit-transform: scale(0.5,0.5);
    transform: scale(0.5,0.5);
    -webkit-transform-origin: top left;
  }
}
</style>
