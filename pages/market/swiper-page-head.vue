<template>
  <view>
    <view class="swiper-list-page-table-head">
      <view class="swiper-list-page-table-head-left">
        <view class="swiper-list-page-table-head-left1">
          <text class="swiper-list-page-text">名称</text>
          <text class="swiper-list-page-text"> / 成交额</text>
        </view>
        <view class="swiper-list-page-table-head-left2">
          <text class="swiper-list-page-text">价格</text>
        </view>
      </view>
      <view class="swiper-list-page-table-head-right">
        <text class="swiper-list-page-text">(24H)涨跌幅</text>
        <uni-icons color="#8E96A4" custom-prefix="iconfont" type="icon-xiangshang1" size="15"></uni-icons>
      </view>
    </view>
  </view>
</template>

<script>
	export default {
		props: {
			newsItem: {
				type: Object,
				default: function(e) {
					return {}
				}
			}
		},
		methods: {
			click() {
				this.$emit('click');
			},
			close(e) {
				e.stopPropagation();
				this.$emit('close');
			}
		}
	}
</script>

<style scoped>
  .swiper-list-page-table-head {
    display: flex;
    justify-content: center;
    align-items: center;
    flex-direction: row;
    width: 750rpx;
    height: 30px;
    padding: 0 15px;
  }
  .swiper-list-page-table-head-left {
    flex: 1;
    display: flex;
    flex-direction: row;
    justify-content: space-between;
    align-items: center;
    background-color: red;
  }
  .swiper-list-page-table-head-left1 {
    display: flex;
    flex-direction: row;
    justify-content: flex-end;
  }
  .swiper-list-page-table-head-left2 {
    display: flex;
    flex-direction: row;
    justify-content: flex-end;
  }
  .swiper-list-page-table-head-right {
    width: 230rpx;
    display: flex;
    flex-direction: row;
    justify-content: flex-end;
  }
  .swiper-list-page-text {
    color: #8E96A4;
    font-size: 12px;
  }

</style>
