<template>
	<view class="content">
    <view class="box transparent-up"></view>
    <view class="box transparent-down"></view>
    <my-empty></my-empty>
	</view>
</template>

<script>
  import {mapActions, mapGetters} from "vuex";
  import myEmpty from "../../components/my-empty/my-empty"
  export default {
    components: {
      myEmpty
    },
    computed: {
      ...mapGetters({
        marketCollect: "marketCollect",
      }),
    },
		data() {
			return {
				title: this.$t('common.trade'),
        go: false
			}
		},
		onLoad() {
      // 监听事件
      uni.$on('matchWs',(obj)=>{
        console.log(obj)
      })
      this.usdtRateSet()
      this.marketCollectSet(1)
      setTimeout(() => {
        this.go = true
        let item = {
          tradeCoinId: 1,
          coinId: 3,
          price: 3.311,
          amount: 2,
        }
        uni.$emit('matchWs', item)

      }, 2 * 1000)
		},
    onUnload() {
      // 移除撮合监听事件
      uni.$off('matchWs');
    },
		methods: {
      ...mapActions({
        usdtRateSet: "usdtRateSet",
        marketCollectSet: "marketCollectSet",
      }),
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
