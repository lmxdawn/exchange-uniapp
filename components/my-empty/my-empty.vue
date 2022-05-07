<template>
  <view class="my-empty-box" :style="{paddingTop:paddingTop}">
    <view class="my-empty" v-if="loadingStatus === 'noMore'" @click="onClick">
      <image class="my-empty__image" :src="icon" :style="[imageStyle]"></image>
      <text
          class="my-empty__text"
          :style="[textStyle]"
      >{{text}}</text>
    </view>
    <uni-load-more v-else color="#2DBD96" iconType="circle" :status="loadingStatus" :contentText="{}"></uni-load-more>
  </view>
</template>

<script>
export default {
  name: "my-empty",
  props: {
    // 自定义数据，click回传
    clickData: {
      type: [String, Number],
      default: ""
    },
    icon: {
      type: String,
      default: "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAIAAAACABAMAAAAxEHz4AAAABGdBTUEAALGPC/xhBQAAAAFzUkdCAK7OHOkAAAAbUExURUxpcUtQWkdRXEhOWkpMV0hNWUlOW0lPWUhOWrT70rkAAAAJdFJOUwAzGH8MSIwkY4BPDPEAAALxSURBVGje7ZnPb9owFMdN6iocSyhiR+IyseNWjy3HpPPUHUcjxB8wadqRBFB73BRt48+eHZKQEP9KPIlWyhcOCPM+en5+frEfAHTqdCb5poBHU8DSFLA3tL/EX80AF/ijkX0PY3xlYD9KKMBbtbaHO0OA+RRYEN+eeRk1EsmKRotl9f3QJJXTQJ+qwWb6jHkqAmdPFPZ2wgUULvRVIdzQPFk+nigpXAgST54FFsbzeslJji4M/8oduMF4DbiAzIW+Ig0T/J77bZi7YMlLon1IdFIRA/SwXgb3sUe3XDQoa8wAYMhG1PqEbwGo2mcA6sJPDcCG7hRrwANouhDSENh8gJ4LCV3EgA/QcwFjH7gCgJYLbLVFAC0XpAAdF6QAHReEgH0qtQtCQK55O0DIrW0NABtTAMxLU1tAZfwlAkqlqRWgkPPMAZYpoGcKeGUKSNZmgN5hp7cGWCH21gaA12nFWPjn80AVg0hjFULxKsTTQAPwJMqD2AdQOQXoCzJxTM0BsZWA8B13L4wRO8+g/MAgARRPnDJgPE2/mvmWehWSeQ2QmQN3UhAlgPttDXCd2W/zEDYuKOlxzqVGdksAc8FlFTlqW9LY5KkbVuua6EQDdrR3DYoqCy00qMpOustMAZEhwDZ5sDhwUtlZzQGBA40ebc5g4L6kh2sH6AAd4HkBEnr1DUSAawCVF0fe5bsEsJUA3vW/0JoexVT3RtaAgCKADy6V/dS0BRKIZgBuuD2ecsc7bcKAGc8+TkMkvjt/mZfaQOJ26Fo4OMQTcSOqmKAnC5+ftcKuJA7c5p/j2miwyJtx3lZwEqNH+qKZ+FvWDsT7JUd7OlAs4hv8IO6mffgu0LdjCJ88LoAQhNBODFjRYXYBpvrFsb5DB+3+8O1/rLIfTCmjFieCjpqNeDFYxKWfkFP7O9RQ05MrE2qsyf8F1KYwQyg+eUmnUA2ihgiQLKNARx+mRJSFRGMxCFH9k0aEGEJgg3/kfP/YWIYNDDt1aqN/TbuMys3S27gAAAAASUVORK5CYII="
    },
    text: {
      type: String,
      default: "No Data"
    },
    // 文字颜色
    textColor: {
      type: String,
      default: "rgba(184,198,216,.38)"
    },
    // 文字大小
    textSize: {
      type: [String, Number],
      default: 15
    },
    //  图标宽度，单位px
    width: {
      type: [String, Number],
      default: '128px'
    },
    // 图标高度，单位px
    height: {
      type: [String, Number],
      default: '128px'
    },
    // 顶部
    paddingTop: {
      type: [String, Number],
      default: '20px'
    },
    loadingStatus: {
      type: String,
      default: "more"
    },
  },
  computed: {
    imageStyle() {
      const style = {}
      style.width = this.width
      style.height = this.height
      return style
    },
    // 文本样式
    textStyle() {
      const style = {}
      style.color = this.textColor
      style.fontSize = this.textSize
      return style
    },
  },
  methods: {
    onClick() {
      this.$emit('click', this.clickData)
    },
  }
}
</script>

<style lang="scss" scoped>

.my-empty-box {
  position: absolute;
  top: 0;
  left: 0;
  width: 750rpx;
  display: flex;
  flex-direction: row;
  justify-content: center;
  align-items: flex-start;
}

.my-empty {
  /* #ifndef APP-NVUE */
  display: flex;
  /* #endif */
  flex-direction: column;
  justify-content: center;
  align-items: center;
  &__image {
    width: 100%;
  }
  &__text {
    margin-top: 10px;
    color: #9197A3;
  }
}

</style>