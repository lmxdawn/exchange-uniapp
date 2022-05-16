<template>
  <view class="my-nav-bar-search-home">
    <uni-nav-bar fixed color="#b8c6d8" :border="false" background-color="#212631" :statusBar="true">
      <block slot="left">
        <view class="nav-bar-left" @click="asset">
          <my-avatar :member-info="memberInfo" size="mini"></my-avatar>
        </view>
      </block>
      <view class="input-view" @click="onClickInput">
        <uni-icons class="input-uni-icon" type="search" size="18" color="#717C8A" />
        <input confirm-type="search" disabled class="nav-bar-input" type="text" :placeholder="this.$t('common.search.placeholder')" />
      </view>
      <block slot="right">
        <view class="nav-bar-right">
          <uni-icons style="margin-right: 12px;" type="scan" :size="23" color="#b8c6d8" @click="scan"></uni-icons>
          <view style="margin-right: 10px">
            <uni-badge :is-dot="true" size="small" :text="msgNum" absolute="rightTop">
              <uni-icons class="badge-box" type="notification" :size="28" color="#b8c6d8" @click="message"></uni-icons>
            </uni-badge>
          </view>
        </view>
      </block>
    </uni-nav-bar>
  </view>
</template>

<script>
import myAvatar from "../../components/my-avatar/index"
import { mapGetters } from "vuex";
import {navigateTo} from "../../utils/common";
export default {
  name: "my-nav-bar-search-home",
  components: {
    myAvatar
  },
  props: {
    msgNum: {
      type: Number,
      default: 0
    }
  },
  computed: {
    ...mapGetters({
      memberInfo: "memberInfo",
    }),
  },
  methods: {
    onClickInput() {
      this.$emit('onClickInput')
    },
    onClickIcon(index) {
      console.log(index)
      this.$emit('clickIcon', index)
    },
    asset() {
      navigateTo("mine/mine", "slide-in-left")
    },
    scan() {

    },
    message() {

    },
  }
}
</script>

<style lang="scss" scoped>
$nav-height: 35px;
.my-nav-bar-search-home {
  padding-top: 5px;
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
  border-radius: 5px;
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
  flex: 1;
  padding: 0 5px;
  font-size: 14px;
}
.badge-box {
  width: 20px;
  height: 20px;
  display: flex;
  justify-content: center;
  align-items: center;
}
</style>