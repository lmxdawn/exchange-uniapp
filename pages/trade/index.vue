<template>
	<view class="content">
    <view class="box" :class="[go ? 'transparent-up' : '']"></view>
    <view class="box" :class="[go ? 'transparent-down' : '']"></view>
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

        setTimeout(() => {
          this.go = false
        }, 500)

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
    transition-property: background-color;
    transition-duration: 1s
  }

  .transparent-up {
    background-color: #1A272F;
  }
  .transparent-down {
    background-color: #24222C;
  }
</style>
