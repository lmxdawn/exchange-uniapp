<template>
  <view>
    <view class="swiper-list-page-table-head">
      <view class="swiper-list-page-table-head-left">
        <view class="swiper-list-page-table-head-left1">
          <view class="swiper-list-page-table-head-button" @click="nameClick">
            <text class="swiper-list-page-text">名称</text>
            <view class="swiper-list-page-table-head-icon">
              <image class="swiper-list-page-table-head-icon-up" :src="nameStatus === 1 ? upSelectedImgUrl : upImgUrl"></image>
              <image class="swiper-list-page-table-head-icon-down" :src="nameStatus === 2 ? downSelectedImgUrl : downImgUrl"></image>
            </view>
          </view>
          <view class="swiper-list-page-table-head-button">
            <text class="swiper-list-page-text">/</text>
          </view>
          <view class="swiper-list-page-table-head-button" @click="totalClick">
            <text class="swiper-list-page-text">成交额</text>
            <view class="swiper-list-page-table-head-icon">
              <image class="swiper-list-page-table-head-icon-up" :src="totalStatus === 1 ? upSelectedImgUrl : upImgUrl"></image>
              <image class="swiper-list-page-table-head-icon-down" :src="totalStatus === 2 ? downSelectedImgUrl : downImgUrl"></image>
            </view>
          </view>
        </view>
        <view class="swiper-list-page-table-head-button" @click="priceClick">
          <text class="swiper-list-page-text">价格</text>
          <view class="swiper-list-page-table-head-icon">
            <image class="swiper-list-page-table-head-icon-up" :src="priceStatus === 1 ? upSelectedImgUrl : upImgUrl"></image>
            <image class="swiper-list-page-table-head-icon-down" :src="priceStatus === 2 ? downSelectedImgUrl : downImgUrl"></image>
          </view>
        </view>
      </view>
      <view class="swiper-list-page-table-head-button swiper-list-page-table-head-right" @click="upDownClick">
        <text class="swiper-list-page-text">(24H)涨跌幅</text>
        <view class="swiper-list-page-table-head-icon">
          <image class="swiper-list-page-table-head-icon-up" :src="upDownStatus === 1 ? upSelectedImgUrl : upImgUrl"></image>
          <image class="swiper-list-page-table-head-icon-down" :src="upDownStatus === 2 ? downSelectedImgUrl : downImgUrl"></image>
        </view>
      </view>
    </view>
  </view>
</template>

<script>
	export default {
		props: {
			name: {
				type: String,
				default: ""
			},
			total: {
				type: String,
				default: ""
			},
			price: {
				type: String,
				default: ""
			},
			upDown: {
				type: String,
				default: ""
			},
		},
    data() {
      return {
        upImgUrl: "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABAAAAAQCAYAAAAf8/9hAAAAAXNSR0IArs4c6QAAAIJJREFUOE9jZKAQMFKon2GQG9A7bWkoE8P/L4VZMdtxeRWnF0CaGRn+rwJp/M/AGFacFb0amyFYDUDWDNOEyxAMA7BpxmcIigH4NOMyBG4AMZqxGQI2YMLsZeL/fv97QUqiYmFlkM1LjXkCd0H/9KX1pBhQmBndCFI/yFMiMV6i2AsAFAs1EedHGRcAAAAASUVORK5CYII=",
        upSelectedImgUrl: "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABAAAAAQCAYAAAAf8/9hAAAAAXNSR0IArs4c6QAAAHxJREFUOE9jZKAQMFKon2GQG6C7d1ooAwPDl8vOWdtxeRWnF6CaV0E1hl12zlqNzRCsBqBphunDagiGATg04zQExQACmrEaAjeASM0YhoAN0NkzW5yR8fcLUhIVIxOr7CXH1CdwF+jsnV5PigFXnDMbQeoHeUokxksUewEAXTcoEXcbtOcAAAAASUVORK5CYII=",
        downImgUrl: "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABAAAAAQCAYAAAAf8/9hAAAAAXNSR0IArs4c6QAAAIVJREFUOE9jZKAQMFKon2EQGdA/fWk9Kd4pzIxuBKkHe2HC7GXi/37/e0GKASysDLJ5qTFP4GHQO21pKCPD/1XEGPKfgTGsOCt6NdwFME3EGIKsGcMAkAA+Q9A1YzUAlyHYNOM0AN0QXJrxGgAzhInh/5fCrJjtuAJ3EKVEYuIfmxqKvQAAyt41EVVC3hgAAAAASUVORK5CYII=",
        downSelectedImgUrl: "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABAAAAAQCAYAAAAf8/9hAAAAAXNSR0IArs4c6QAAAH5JREFUOE9jZKAQMFKon2EQGaCzd3o9Kd654pzZCFIP9oLOntnijIy/X5BiACMTq+wlx9Qn8DDQ3TstlIGBYRWRhoRdds5aDXcBTBORhsA1YxgAEiBgCIpmrAbgMQRDM04DsBiCVTNeA5AM+XLZOWs7rsAdRCmRyPjHUEaxFwDbKCgRGH8UYAAAAABJRU5ErkJggg==",
        nameStatus: 0,
        totalStatus: 0,
        priceStatus: 0,
        upDownStatus: 0,
      }
    },
		methods: {
		  clear() {
        this.nameStatus = 0
        this.totalStatus = 0
        this.priceStatus = 0
        this.upDownStatus = 0
      },
      nameClick() {
        let status = this.nameStatus
        if (status === 0) {
          status = 1
        } else if (status === 1) {
          status = 2
        } else {
          status = 0
        }
        this.clear()
        this.nameStatus = status
				this.$emit('nameClick', status);
			},
      totalClick() {
        let status = this.totalStatus
        if (status === 0) {
          status = 1
        } else if (status === 1) {
          status = 2
        } else {
          status = 0
        }
        this.clear()
        this.totalStatus = status
        this.$emit('totalClick', status);
			},
      priceClick() {
        let status = this.priceStatus
        if (status === 0) {
          status = 1
        } else if (status === 1) {
          status = 2
        } else {
          status = 0
        }
        this.clear()
        this.priceStatus = status
        this.$emit('priceClick', status);
			},
      upDownClick() {
        let status = this.upDownStatus
        if (status === 0) {
          status = 1
        } else if (status === 1) {
          status = 2
        } else {
          status = 0
        }
        this.clear()
        this.upDownStatus = status
        this.$emit('upDownClick', status);
			},
		}
	}
</script>

<style lang="scss" scoped>
  .swiper-list-page-table-head {
    display: flex;
    justify-content: center;
    align-items: center;
    flex-direction: row;
    width: 750rpx;
    padding: 5px 15px 0;
  }
  .swiper-list-page-table-head-left {
    flex: 1;
    display: flex;
    flex-direction: row;
    justify-content: space-between;
    align-items: center;
  }
  .swiper-list-page-table-head-left1 {
    display: flex;
    flex-direction: row;
    justify-content: flex-end;
  }
  .swiper-list-page-table-head-button {
    display: flex;
    flex-direction: row;
    justify-content: flex-end;
    align-items: center;
    height: 55rpx;
  }
  .swiper-list-page-table-head-right {
    width: 230rpx;
  }
  .swiper-list-page-table-head-icon {
    height: 30rpx;
    margin-left: 2px;
    /* #ifndef APP-NVUE */
    padding-top: 2px;
    /* #endif */
  }
  .swiper-list-page-table-head-icon-up {
    width: 8px;
    height: 8px;
    margin-bottom: -1px;
  }
  .swiper-list-page-table-head-icon-down {
    width: 8px;
    height: 8px;
    margin-top: -1px;
  }
  .swiper-list-page-text {
    color: #8E96A4;
    font-size: 12px;
  }

</style>
