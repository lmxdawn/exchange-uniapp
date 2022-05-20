<template>
	<view class="swiper-item-cell" @click="click" :class="[background]" hover-class="swiper-item-cell-hover">
    <view class="swiper-item-cell-left">
      <view class="swiper-item-cell-text-box">
        <view class="swiper-item-cell-text-list">
          <text class="swiper-item-cell-text">{{listItem.tradeCoin.name}}</text>
          <text class="swiper-item-cell-text gray">/</text>
          <text class="swiper-item-cell-text gray">{{listItem.coin.name}}</text>
        </view>
      </view>
    </view>
    <view class="swiper-item-cell-right">
      <view class="swiper-item-cell-text-box" :class="[rate >= 0 ? 'upRate' : 'downRate']">
        <text class="swiper-item-cell-text">{{listItem.price}}</text>
        <text class="swiper-item-cell-text-small">{{rate >= 0 ? '+' : ''}}{{ rate }}%</text>
      </view>
    </view>
  </view>
</template>

<script>
  import {mapGetters} from "vuex";
  import {accMul} from "../../utils/decimal"
	export default {
		props: {
      //  宽度，单位px
      width: {
        type: [String, Number],
        default: '750rpx'
      },
			listItem: {
				type: Object,
				default: function(e) {
					return {}
				}
			}
		},
    computed: {
      ...mapGetters({
        usdtRate: "usdtRate",
      }),
      priceRate() {
        let usdtPrice = this.listItem.coin.usdtPrice
        usdtPrice = usdtPrice === 1 ? this.listItem.price : usdtPrice
        return Number(accMul(this.usdtRate.price, usdtPrice)).toFixed(this.usdtRate.precision)
      },
      rate() {
        return Number(this.listItem.rate24).toFixed(2)
      }
    },
    data() {
      return {
        background: ''
      }
    },
    watch: {
      listItem: {
        handler(item,index) {
          if (item.rate24 > 0) {
            this.background = 'transparent-up'
          } else {
            this.background = 'transparent-down'
          }
          setTimeout(() =>{
            this.background = ''
          }, 500)
        },
        deep: true
      }
    },
		methods: {
			click() {
        const params = {
          coinId: this.listItem.coin.id,
          tradeCoinId: this.listItem.tradeCoin.id,
        }
        this.$emit("click", params)
			},
		}
	}
</script>

<style lang="scss" scoped>
	.swiper-item-cell {
    display: flex;
    justify-content: center;
    align-items: flex-start;
    flex-direction: row;
    padding: 8px 15px 0;
    background-color: transparent;
    transition-property: background-color;
    transition-duration: .5s
	}
  .swiper-item-cell-hover {
    background-color: #212631;
  }
  .swiper-item-cell-left {
    flex: 1;
    display: flex;
    flex-direction: row;
    justify-content: space-between;
    align-items: center;
  }
  .swiper-item-cell-right {
    width: 130px;
  }

  .swiper-item-cell-text-small {
    font-size: 20rpx;
    margin-top: 5px;
  }

  .swiper-item-cell-text-box {
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: flex-end;
    &.upRate {
      .swiper-item-cell-text {
        color: #2DBD96;
      }
      .swiper-item-cell-text-small {
        color: #2DBD96;
      }
    }
    &.downRate {
      .swiper-item-cell-text {
        color: #ED6666;
      }
      .swiper-item-cell-text-small {
        color: #ED6666;
      }
    }
  }

  .swiper-item-cell-text-list {
    display: flex;
    flex-direction: row;
    align-items: center;
  }

  .swiper-item-cell-text {
    font-size: 14px;
    color: #FFFFFF;
    &.gray {
      font-size: 13px;
      color: #9197A3;
    }
  }

  .transparent-up {
    background-color: #1A272F;
  }
  .transparent-down {
    background-color: #24222C;
  }

</style>
