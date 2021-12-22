<template>
  <view class="page-box">
    <uni-nav-bar color="#b8c6d8" :border="false" background-color="#191E29">
      <block slot="left">
        <view class="nav-bar-left">
          <u-icon name="pushpin" size="25" color="#E1E8F5" />
        </view>
      </block>
      <view class="nav-bar-center">
        <view class="nav-bar-center-box">
          <uni-segmented-control :current="current" :values="items" @clickItem="onClickItem" styleType="button"></uni-segmented-control>
        </view>
      </view>
      <block slot="right">
        <view class="nav-bar-right">
          <u-icon name="search" size="25" color="#E1E8F5" />
        </view>
      </block>
    </uni-nav-bar>
    <view class="content">
      <block v-if="current === 0">
        <my-tab-bar :current="tabIndex" :tab-bars="tabBars" :value-list="tabBarsValueList" @switchTab="switchTab"></my-tab-bar>
      </block>
      <block v-if="current === 1">
        <u-tabs :list="tabBars"></u-tabs>
        <view style="height: 100vh">
          选项卡2的内容
        </view>
      </block>
    </view>
  </view>
</template>

<script>
  import myTabBar from '../../components/my-tab-bar/my-tab-bar.nvue';

  // 缓存每页最多
  const MAX_CACHE_DATA = 100;
  // 缓存页签数量
  const MAX_CACHE_PAGE = 3;

  const newsData = {
    data0: {
      "datetime": "40分钟前",
      "article_type": 0,
      "title": "uni-app行业峰会频频亮相，开发者反响热烈!",
      "source": "DCloud",
      "comment_count": 639
    },
    data1: {
      "datetime": "一天前",
      "article_type": 1,
      "title": "DCloud完成B2轮融资，uni-app震撼发布!",
      "image_url": "https://vkceyugu.cdn.bspapp.com/VKCEYUGU-dc-site/b7c7f970-517d-11eb-97b7-0dc4655d6e68.jpg",
      "source": "DCloud",
      "comment_count": 11395
    },
    data2: {
      "datetime": "一天前",
      "article_type": 2,
      "title": "中国技术界小奇迹：HBuilder开发者突破200万",
      "image_url": "https://vkceyugu.cdn.bspapp.com/VKCEYUGU-dc-site/b4cd3000-517d-11eb-a16f-5b3e54966275.jpg",
      "source": "DCloud",
      "comment_count": 11395
    },
    data3: {
      "datetime": "5分钟前",
      "title": "uni-app 支持使用 npm 安装第三方包，生态更趋丰富",
      "source": "DCloud",
      "comment_count": 11
    },
    data4: {
      "datetime": "2小时前",
      "article_type": 4,
      "title": "uni-app 支持原生小程序自定义组件，更开放、更自由",
      "image_url": "https://vkceyugu.cdn.bspapp.com/VKCEYUGU-dc-site/b2e201d0-517d-11eb-8a36-ebb87efcf8c0.jpg",
      "source": "DCloud",
      "comment_count": 69
    }
  };

  export default {
    components: {
      myTabBar
    },
		data() {
			return {
				title: this.$t('common.market'),
        current: 0,
        items: ['现货', '合约'],
        tabIndex: 0,
        tabBars: [
          {
            name: '关注',
            id: 'guanzhu'
          }, {
            name: '推荐',
            id: 'tuijian'
          }, {
            name: '体育',
            id: 'tiyu'
          }, {
            name: '热点',
            id: 'redian'
          }, {
            name: '财经',
            id: 'caijing'
          }, {
            name: '娱乐',
            id: 'yule'
          }, {
            name: '军事',
            id: 'junshi'
          }, {
            name: '历史',
            id: 'lishi'
          }, {
            name: '本地',
            id: 'bendi'
          }, {
            name: '本地222',
            id: '222'
          }],
        tabBarsValueList: [],
        tabBarsCacheTab: [],
			}
		},
		onLoad() {
      setTimeout(() => {
        this.tabBars.forEach((tabBar) => {
          this.tabBarsValueList.push({
            data: [],
            isLoading: false,
            refreshText: "",
            loadingText: '加载更多...'
          });
        });
        this.getList(0);
      }, 350)
		},
		methods: {
      onClickItem(e) {
        if (this.current !== e.currentIndex) {
          this.current = e.currentIndex
        }
      },
      getList(index) {
        let activeTab = this.tabBarsValueList[index];
        let list = [];
        for (let i = 1; i <= 50; i++) {
          let item = Object.assign({}, newsData['data' + Math.floor(Math.random() * 5)]);
          item.id = this.newGuid();
          list.push(item);
        }
        activeTab.data = activeTab.data.concat(list);
      },
      loadMore(e) {
        setTimeout(() => {
          this.getList(this.tabIndex);
        }, 500)
      },
      switchTab(e) {
        let index = e.currentIndex
        if (this.tabIndex === index) {
          return;
        }
        if (this.tabBarsValueList[index].data.length === 0) {
          this.getList(index);
        }

        if (this.tabIndex === index) {
          return;
        }

        // 缓存 tabId
        if (this.tabBarsValueList[this.tabIndex].data.length > MAX_CACHE_DATA) {
          let isExist = this.tabBarsCacheTab.indexOf(this.tabIndex);
          if (isExist < 0) {
            this.tabBarsCacheTab.push(this.tabIndex);
            //console.log("cache index:: " + this.tabIndex);
          }
        }

        this.tabIndex = index;

        // 释放 tabId
        if (this.tabBarsCacheTab.length > MAX_CACHE_PAGE) {
          let cacheIndex = this.tabBarsCacheTab[0];
          this.clearTabData(cacheIndex);
          this.tabBarsCacheTab.splice(0, 1);
          //console.log("remove cache index:: " + cacheIndex);
        }
      },
      clearTabData(e) {
        this.tabBarsValueList[e].data.length = 0;
        this.tabBarsValueList[e].loadingText = "加载更多...";
      },
      refreshData() {
      },
      onrefresh(e) {
        var tab = this.tabBarsValueList[this.tabIndex];
        if (!tab.refreshFlag) {
          return;
        }
        tab.refreshing = true;
        tab.refreshText = "正在刷新...";

        setTimeout(() => {
          this.refreshData();
          this.pulling = true;
          tab.refreshing = false;
          tab.refreshFlag = false;
          tab.refreshText = "已刷新";
          setTimeout(() => { // TODO fix ios和Android 动画时间相反问题
            this.pulling = false;
          }, 500);
        }, 2000);
      },
      onpullingdown(e) {
        var tab = this.tabBarsValueList[this.tabIndex];
        if (tab.refreshing || this.pulling) {
          return;
        }
        if (Math.abs(e.pullingDistance) > Math.abs(e.viewHeight)) {
          tab.refreshFlag = true;
          tab.refreshText = "释放立即刷新";
        } else {
          tab.refreshFlag = false;
          tab.refreshText = "下拉可以刷新";
        }
      },
      newGuid() {
        let s4 = function () {
          return (65536 * (1 + Math.random()) | 0).toString(16).substring(1);
        }
        return (s4() + s4() + "-" + s4() + "-4" + s4().substr(0, 3) + "-" + s4() + "-" + s4() + s4() + s4()).toUpperCase();
      }
		}
	}
</script>

<style lang="scss">
  $nav-height: 30px;

  page {
    width: 100%;
    height: 100%;
  }

  .page-box {
    width: 100%;
    height: 100%;
    display: flex;
    flex-direction: column;
  }

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
    float: right;
  }

  .nav-bar-center {
    display: flex;
    flex: 1;
    justify-content: center;
  }
  .nav-bar-center-box {
    width: 200px;
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
    flex: 1;
    display: flex;
    flex-direction: column;
	}
</style>
