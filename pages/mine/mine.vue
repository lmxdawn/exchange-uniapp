<template>
  <view class="mine-box">
    <uni-nav-bar @clickLeft="back" class="mine-nav-bar" leftIcon="closeempty" color="#E1E8F5" :border="false" background-color="#191E29" :statusBar="true"></uni-nav-bar>
    <view class="mine-body">
      <view class="mine-header">
        <view class="mine-avatar">
          <text class="mine-avatar-text">{{memberInfo.name.slice(0,2)}}</text>
        </view>
        <view class="mine-user">
          <text class="mine-username">{{memberInfo.name}}</text>
          <view class="mine-uid-box">
            <text class="mine-uid">UID: {{memberInfo.memberId}}</text>
            <uni-icons class="mine-icon" custom-prefix="custom-icon" type="compose" color="#c1cdde" size="12"></uni-icons>
          </view>
        </view>
      </view>

      <my-card round>
        <my-card-item left-icon="compose"
                      @click="securitySettingTo"
                      :left-text="this.$t('mine.security.setting')"
                      :right-text="this.$t('mine.security.setting.text')">
        </my-card-item>
        <my-card-item left-icon="compose"
                      @click="settingTo"
                      :left-text="this.$t('mine.setting')">
        </my-card-item>
      </my-card>

    </view>
  </view>
</template>

<script>
import myCard from "../../components/my-card/index"
import myCardItem from "../../components/my-card/item"
import {navigateBack, navigateTo} from "../../utils/common";
import { mapActions, mapGetters } from "vuex";

export default {
  components: {
    myCard,
    myCardItem,
  },
  computed: {
    ...mapGetters({
      memberInfo: "memberInfo",
    }),
  },
  data() {
    return {
    }
  },
  onLoad() {

  },
  methods: {
    ...mapActions({
      getUserInfo: "getUserInfo",
    }),
    back() {
      navigateBack()
    },
    securitySettingTo() {
      navigateTo("mine/securitySetting")
    },
    settingTo() {
      console.log(123465)
      navigateTo("mine/setting")
    },
  }
}
</script>

<style scoped>
.mine-box {
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
.mine-avatar {
  width: 60px;
  height: 60px;
  border-radius: 50%;
  margin-right: 10px;
  border: 1px solid #E1E8F5;
  display: flex;
  align-items: center;
  justify-content: center;
}
.mine-avatar-text {
  color: #E1E8F5;
  font-size: 22px;
  font-weight: 500;
}
.mine-user {
  flex: 1;
  display: flex;
  flex-direction: column;
  justify-content: center;
  overflow: hidden;
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