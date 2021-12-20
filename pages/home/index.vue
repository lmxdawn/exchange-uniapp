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
      <image class="logo" src="/static/logo.png"></image>
      <view class="text-area">
        <text class="title">{{title}}</text>
      </view>
      <view>
        <u-icon name="photo" color="#2979ff" size="50"></u-icon>
      </view>
    </view>
  </view>
</template>

<script>
	export default {
		data() {
			return {
				title: this.$t('common.home'),
        value: 1
			}
		},
		onLoad() {

		},
		methods: {
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
	.content {
    height: 1500rpx;
	}

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
</style>
