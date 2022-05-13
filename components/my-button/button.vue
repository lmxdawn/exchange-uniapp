<template>
  <button
      class="m-button"
      @click="handleClick"
      :disabled="buttonDisabled"
      :loading="loading"
      :size="size"
      :class="[
      type ? 'm-button__' + type : '',
      {
        'is-disabled': buttonDisabled,
        'is-round': round,
        'is-circle': circle
      }
    ]"
  >
    <text v-if="isSlot">
      <slot></slot>
    </text>
  </button>
</template>

<script>
export default {
  name: "m-button",
  props: {
    type: {
      type: String,
      default: "default"
    },
    size: String,
    icon: {
      type: String,
      default: ""
    },
    loading: Boolean,
    disabled: Boolean,
    round: Boolean,
    circle: Boolean,
    isSlot: {
      type: Boolean,
      default: true
    }
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
.m-button {
  color: #E1E8F5;
  font-size: 35rpx;
  border-radius: 4px;
  &__default {
    background-color: #202530;
  }
  &__success {
    background-color: #2DBD96;
  }
  &.is-disabled,
  &.is-disabled:focus,
  &is-disabled:hover {
    cursor: not-allowed;
    background-color: #E4D9DD;
  }

  &.is-round {
    border-radius: 30px !important;
  }

  &.is-circle {
    border-radius: 50% !important;
    padding: 12px !important;
  }

  &:after {
    border: none;
  }
}

.m-button--text {
  border-color: transparent;
  padding-left: 0;
  padding-right: 0;
}

.m-button--text.is-disabled,
.m-button--text.is-disabled:focus,
.m-button--text.is-disabled:hover,
.m-button--text:active {
  border-color: transparent;
}
</style>
