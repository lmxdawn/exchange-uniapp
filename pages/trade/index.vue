<template>
	<view class="page-box">

	</view>
</template>

<script>
  import {mapActions, mapGetters} from "vuex";
  import myNavBarTrade from "../../components/my-nav-bar/my-nav-bar-trade"
  export default {
    components: {
      myNavBarTrade
    },
    computed: {
      ...mapGetters({
        marketCollect: "marketCollect",
      }),
    },
		data() {
			return {
				title: this.$t('common.trade'),
			}
		},
		onLoad() {

		},
    onUnload() {

    },
		methods: {
      ...mapActions({
        usdtRateSet: "usdtRateSet",
        marketCollectSet: "marketCollectSet",
      }),
		}
	}
</script>

<style scoped>
	.page-box {
	}
</style>
