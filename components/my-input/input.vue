<template>
  <view class="m-input" :class="[type ? 'm-input-' + type : '', {'m-input-plain': plain}]">
    <!-- 前置元素 -->
    <view class="m-input__prefix-inner">
      <slot name="prefix"></slot>
    </view>
    <view class="m-input__box">
      {{ label }}
      <input type="text"
             :type="inputType"
             class="m-input__inner"
             autocomplete="off"
             :value="value"
             @input="handleInput"
             @blur="inputBlur"
             :placeholder="placeholder"
             :placeholder-style="placeholderStyle">
    </view>
    <!-- 后置内容 -->
    <view class="m-input__suffix-inner">
      <slot name="suffix"></slot>
    </view>
  </view>
</template>

<script>
export default {
  name: "m-input",
  props: {
    value: {
      type: String,
      default: ""
    },
    inputType: {
      type: String,
      default: "text"
    },
    type: {
      type: String,
      default: "default"
    },
    placeholder: {
      type: String,
      default: "请输入内容"
    },
    placeholderStyle: {
      type: String,
      default: "color: #4F5460"
    },
    label: {
      type: String,
      default: ""
    },
    plain: {
      type: Boolean,
      default: false
    },
  },
  methods: {
    handleInput(event) {
      this.$emit("input", event.detail.value);
    },
    // 解决这个问题 https://developers.weixin.qq.com/community/develop/doc/00040a43cd4290dedbc7e7f1851400
    inputBlur() {
      if (window) {
        window.scroll(0, 0);
      }
    }
  }
};
</script>

<style lang="scss" scoped>
uni-input {
  line-height: normal;
  height: auto;
  min-height: auto;
}

.m-input {
  position: relative;
  font-size: 16px;
  border: 1px solid #292E39;
  border-radius: 2px;
  display: flex;
  align-items: center;
  justify-content: space-between;
  caret-color: #2DBD96;

  .m-input__box {
    display: flex;
    flex: auto;
    align-items: center;
    white-space: nowrap;
    padding: 14px;
  }

  &.m-input-plain {
    padding-top: 0;
    padding-bottom: 0;
    border-bottom: none;
  }

  &.m-input-default {
    color: #E1E8F5;
  }

  .m-input__inner {
    display: inline-block;
    flex: auto;

    &::-webkit-input-placeholder {
      color: #4F5460;
    }
  }
}
</style>
