<template>
	<view class="content">
    <view class="box transparent-up"></view>
    <view class="box transparent-down"></view>
	</view>
</template>

<script>
  export default {
    components: {
    },
		data() {
			return {
				title: this.$t('common.trade'),
        go: false
			}
		},
		onLoad() {
      setTimeout(() => {
        this.go = true
      }, 100)
		},
		methods: {
		}
	}
</script>

<style>
	.content {
		display: flex;
		flex-direction: column;
		align-items: center;
		justify-content: center;
	}
  .box {
    height: 200rpx;
    width: 200rpx;
    background-color: transparent;
  }

  .transparent-up {  // 这里可以简写哈
    animation: transparent-up 1.5s forwards;
  }
  @keyframes transparent-up {
    99.9% {
      background-color: #1A272F;
    }
    100% {
      background-color: transparent;
    }
  }
  .transparent-down {  // 这里可以简写哈
    animation: transparent-down 1.5s forwards;
  }
  @keyframes transparent-down {
    99.9% {
      background-color: #24222C;
    }
    100% {
      background-color: transparent;
    }
  }
</style>
