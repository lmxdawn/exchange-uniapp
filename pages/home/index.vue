<template>
  <view>
    <uni-nav-bar fixed color="#b8c6d8" :border="false" background-color="#212631" @clickLeft="asset" @clickRight="message">
      <block slot="left">
        <view class="nav-bar-left">
          <uni-icons type="contact" size="38" color="#717C8A" @click="asset" />
        </view>
      </block>
      <view class="input-view">
        <uni-icons class="input-uni-icon" type="search" size="18" color="#717C8A" />
        <input confirm-type="search" class="nav-bar-input" type="text" placeholder="输入搜索关键词" @confirm="confirm" />
      </view>
      <block slot="right">
        <view class="nav-bar-right">
          <u-icon name="scan" style="margin-right: 10px" color="#b8c6d8" size="28"></u-icon>
          <view style="margin-right: 10px;position: relative;">
            <u-icon name="bell" color="#b8c6d8" size="28"></u-icon>
            <u-badge absolute :offset="[0,0]" isDot type="error" max="99" :value="value"></u-badge>
          </view>
        </view>
      </block>
    </uni-nav-bar>

    <view class="content">

      <view class="banner">
        <uni-swiper-dot :info="adList" :current="adCurrent" field="content" :mode="adMode" :dotsStyles="{backgroundColor: '#68B1C0', selectedBackgroundColor: '#FFFFFF'}">
          <swiper class="swiper-box" @change="adChange">
            <swiper-item v-for="(item ,index) in adList" :key="index">
              <view class="swiper-item">
                <image :src="item"></image>
              </view>
            </swiper-item>
          </swiper>
        </uni-swiper-dot>
      </view>

      <view class="card">
        <view class="card-head">
          <u-notice-bar :text="noticeList" bgColor="#191E29" color="#E1E8F5" direction="column" mode="link" speed="250" url="/pages/componentsB/tag/tag"></u-notice-bar>
        </view>
        <view class="card-body">

        </view>
      </view>

    </view>
  </view>
</template>

<script>
	export default {
		data() {
			return {
				title: this.$t('common.home'),
        value: 1,
        adCurrent: 0,
        adMode: 'round',
        adList: [
          'https://cdn.uviewui.com/uview/swiper/swiper3.png',
          'https://cdn.uviewui.com/uview/swiper/swiper2.png',
          'https://cdn.uviewui.com/uview/swiper/swiper1.png',
        ],
        noticeList: [
            "sfsdafsafsdfds",
            "光大发的顺丰顺丰大发顺丰萨达地方撒范德萨发神鼎飞丹砂烦都烦死神鼎飞丹砂方方达打多少分",
        ]
			}
		},
		onLoad() {

		},
		methods: {
      adChange(e) {
        this.adCurrent = e.detail.current;
      },
      message() {

      },
      asset() {

      },
      confirm() {

      }
		}
	}
</script>

<style lang="scss">
  $nav-height: 30px;

  .uni-nav-bar-text {
    font-size: 12px;
  }

  .nav-bar-left {
    display: flex;
    flex-direction: row;
    align-items: center;
    justify-content: center;
  }
  .nav-bar-right {
    display: flex;
    flex-direction: row;
    align-items: center;
    justify-content: center;
  }

  .input-view {
    display: flex;
    flex-direction: row;
    flex: 1;
    background-color: #292E39;
    height: $nav-height;
    border-radius: 15px;
    padding: 0 15px;
    flex-wrap: nowrap;
    line-height: $nav-height;
    margin: 7px 30px 7px 0;
  }

  .input-uni-icon {
    line-height: $nav-height;
  }

  .nav-bar-input {
    height: $nav-height;
    line-height: $nav-height;
    width: 320rpx;
    padding: 0 5px;
    font-size: 14px;
  }

  .content {
    background-color: #212631;
    height: 1500rpx;
  }
  .banner {
    background-color: #212631;
    padding: 15px 0 20px;
  }
  .swiper-item {
    padding: 0 22px;
  }

  .card{
    background-color: #191E29;
    .card-head {
      display: flex;
      justify-content: space-between;
      align-items: center;
      height: 40px;
      border-bottom: 1px solid #292E39;
      padding: 5px 0;
      border-radius-topleft: 5px;
      .new-box {
        font-size: 13px;
        padding: 0 8px;
        text-align: left;
        flex: 1;
        color: #E1E8F5;
        overflow:hidden;
        .new-title {
          white-space: nowrap;
          overflow: hidden;
          text-overflow: ellipsis;
        }
      }
    }
    .card-body {
      min-height: 10px;
    }
  }

</style>
