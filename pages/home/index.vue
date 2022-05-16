<template>
  <view>
    <my-nav-bar-search-home :msg-num="value"></my-nav-bar-search-home>

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
          <uni-notice-bar @getmore="getMore" :showGetMore="true" backgroundColor="#191E29" color="#E1E8F5" moreColor="#E1E8F5" :showIcon="true" :scrollable="true" :text="noticeText"></uni-notice-bar>
          <!--<u-notice-bar :text="noticeList" bgColor="#191E29" color="#E1E8F5" direction="column" mode="link" speed="250" url="/pages/componentsB/tag/tag"></u-notice-bar>-->
        </view>
        <view class="card-body">

        </view>
      </view>

    </view>
  </view>
</template>

<script>

  import myNavBarSearchHome from "../../components/my-nav-bar/my-nav-bar-search-home";

  export default {
    components: {
      myNavBarSearchHome
    },
    computed: {
      noticeText() {
        return this.noticeList.join(" ")
      }
    },
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
      getMore() {

      },
		}
	}
</script>

<style lang="scss">

  .content {
    background-color: #212631;
    height: 1500rpx;
  }
  .banner {
    background-color: #212631;
    padding: 15px 0 20px;
  }
  .swiper-item {
    width: 100%;
    height: 100%;
    padding: 0 22px;
    box-sizing: border-box;
    image {
      width: 100%;
      height: 100%;
      border-radius: 5px;
      overflow: hidden;
    }
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
