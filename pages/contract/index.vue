<template>
	<view class="content">
		<image class="logo" src="/static/logo.png"></image>
		<view class="text-area" @click="kLineClick">
			<text class="title">{{title}}</text>
		</view>
    <view @click="charge('en')">切换英文</view>
    <view @click="charge('zh-Hans')">切换中文</view>
	</view>
</template>

<script>
	import {navigateTo} from "../../utils/common";

  export default {
		data() {
			return {

			}
		},
    computed: {
      title() {
        return this.$t('common.contract')
      }
    },
		onLoad() {
		},
		methods: {
      charge(lang) {
        console.log(lang)
        uni.setLocale(lang)
        this.$i18n.locale = lang
      },
      kLineClick() {
        navigateTo("trade/kLine")
      }
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

	.logo {
		height: 200rpx;
		width: 200rpx;
		margin-top: 200rpx;
		margin-left: auto;
		margin-right: auto;
		margin-bottom: 50rpx;
	}

	.text-area {
		display: flex;
		justify-content: center;
	}

	.title {
		font-size: 36rpx;
		color: #8f8f94;
	}
</style>
