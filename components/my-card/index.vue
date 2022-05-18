<template>
  <view
      class="my-card"
      :class="[
        {
          'is-round': round,
        }
      ]"
  >
    <slot></slot>
  </view>
</template>

<script>
export default {
  name: "my-card",
  props: {
    round: Boolean,
  },
  computed: {
    buttonDisabled() {
      return this.disabled;
    }
  },
  methods: {
    handleClick(evt) {
      this.$emit("click", evt);
    }
  }
};
</script>

<style lang="scss" scoped>
.my-card {
  background-color: #191E29;
  box-sizing: border-box;
  &.is-round {
    border-radius: 10px;
  }
  overflow: hidden;
}
</style>
