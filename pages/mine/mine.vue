<template>
  <view class="mine-box">
    <uni-nav-bar @clickLeft="back" class="mine-nav-bar" leftIcon="closeempty" color="#E1E8F5" :border="false" background-color="#11151F" :statusBar="true"></uni-nav-bar>
    <view class="mine-body">
      <view class="mine-header" @click="headerClick">
        <my-avatar :member-info="memberInfo" size="big"></my-avatar>
        <view class="mine-user">
          <text class="mine-username">{{memberInfo.memberId > 0 ? memberInfo.name : loginText}}{{memberInfo.name}}</text>
          <view class="mine-uid-box">
            <template v-if="memberInfo.memberId > 0">
              <text class="mine-uid">UID: {{memberInfo.memberId}}</text>
              <uni-icons class="mine-icon" custom-prefix="custom-icon" type="compose" color="#c1cdde" size="12"></uni-icons>
            </template>
            <text class="mine-uid" v-else>{{welcomeText}}</text>
          </view>
        </view>
        <uni-icons custom-prefix="custom-icon" type="forward" color="#c1cdde" size="12"></uni-icons>
      </view>

      <my-card round>
        <my-card-item left-icon="compose"
                      @click="securitySettingTo"
                      :left-text="securitySettingText"
                      :right-text="securitySettingTextText">
        </my-card-item>
        <my-card-item left-icon="compose"
                      @click="settingTo"
                      :left-text="settingText">
        </my-card-item>
      </my-card>

    </view>
  </view>
</template>

<script>
import myCard from "../../components/my-card/index"
import myCardItem from "../../components/my-card/item"
import myAvatar from "../../components/my-avatar/index"
import {navigateBack, navigateTo, navigateToLogin} from "../../utils/common";
import { mapActions, mapGetters } from "vuex";

export default {
  components: {
    myCard,
    myCardItem,
    myAvatar,
  },
  computed: {
    ...mapGetters({
      memberInfo: "memberInfo",
    }),
    welcomeText() {
      return this.$t('mine.welcome')
    },
    loginText() {
      return this.$t('mine.login')
    },
    securitySettingText() {
      return this.$t('mine.security.setting')
    },
    securitySettingTextText() {
      return this.$t('mine.security.setting.text')
    },
    settingText() {
      return this.$t('mine.setting')
    }
  },
  data() {
    return {
      isShowInit: false, // 是否在页面显示的时候重新加载
    }
  },
  onLoad() {

  },
  onShow() {
    if (this.isShowInit) {
      this.isShowInit = false
      this.init()
    }
  },
  methods: {
    ...mapActions({
      getUserInfo: "getUserInfo",
    }),
    back() {
      navigateBack()
    },
    init() {
      this.getUserInfo().then()
    },
    securitySettingTo() {
      if (this.memberInfo.memberId <= 0) {
        this.isShowInit = true
        navigateToLogin("mine/mine")
        return false
      }
      navigateTo("mine/securitySetting")
    },
    settingTo() {
      navigateTo("mine/setting")
    },
    headerClick() {
      if (this.memberInfo.memberId <= 0) {
        this.isShowInit = true
        navigateToLogin("mine/mine")
        return false
      }
    }
  }
}
</script>

<style scoped>

.mine-box {
  background-color: #11151F;
  min-height: 100vh;
}
.mine-nav-bar {
  padding: 0 15px;
}
.mine-body {
  padding-top: 30rpx;
  padding-left: 20px;
  padding-right: 20px;
  box-sizing: border-box;
}
.mine-header {
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 20px;
}
.mine-user {
  flex: 1;
  display: flex;
  flex-direction: column;
  justify-content: center;
  overflow: hidden;
  margin-left: 10px;
}
.mine-username {
  flex: 1;
  color: #E1E8F5;
  font-size: 22px;
  font-weight: 500;
  margin-bottom: 10px;
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
}
.mine-uid-box {
  display: flex;
  flex-direction: row;
  align-items: center;
}
.mine-uid {
  color: #E1E8F5;
  font-size: 13px;
  margin-right: 5px;
}
</style>