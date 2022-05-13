<template>
  <view class="login-box">
    <uni-nav-bar @clickLeft="back" class="login-nav-bar" leftIcon="closeempty" color="#E1E8F5" :border="false" background-color="#191E29" :statusBar="true"></uni-nav-bar>
    <view class="login-body">
      <view class="login-title">
        <image class="login-title-logo" src="/static/logo.png"></image>
        <text class="login-title-text">邮箱登录</text>
      </view>
      <view class="login-form">
        <my-input class="login-form-item"></my-input>
        <my-input class="login-form-item">
          <template #prefix>
            <my-area-code></my-area-code>
          </template>
        </my-input>
        <my-input class="login-form-item" v-model="form.password" :input-type="passwordInputType">
          <template #suffix>
            <view class="login-form-item-pwd-suffix">
              <uni-icons class="login-form-item-pwd-close" @click="passwordCloseClick" v-if="form.password.length > 0" custom-prefix="custom-icon" type="closeempty" color="#c1cdde" size="20"></uni-icons>
              <uni-icons @click="passwordEyeClick" custom-prefix="custom-icon" :type="passwordInputType === 'password' ? 'eye-slash' : 'eye'" color="#c1cdde" size="20"></uni-icons>
            </view>
          </template>
        </my-input>
        <my-button class="login-form-item" :type="buttonType">登录</my-button>
      </view>
    </view>
  </view>
</template>

<script>
import myInput from "../../components/my-input/input"
import myButton from "../../components/my-button/button"
import myAreaCode from "../../components/my-area-code/index"
import {navigateBack} from "../../utils/common";

export default {
  components: {
    myButton,
    myInput,
    myAreaCode
  },
  computed: {

  },
  data() {
    return {
      passwordInputType: "password",
      buttonType: "default",
      form: {
        password: ""
      }
    }
  },
  methods: {
    back() {
      navigateBack()
    },
    passwordCloseClick() {
      this.form.password = ""
    },
    passwordEyeClick() {
      this.passwordInputType = this.passwordInputType === 'password' ? 'text' : 'password'
    }
  }
}
</script>

<style scoped>
.login-box {
}
.login-nav-bar {
  padding: 0 10px;
}
.login-body {
  padding-top: 50rpx;
  padding-left: 30px;
  padding-right: 30px;
  box-sizing: border-box;
}

.login-title {
  display: flex;
  flex-direction: column;
}

.login-title-logo {
  width: 240rpx;
  height: 80rpx;
}

.login-title-text {
  font-size: 60rpx;
  color: #E1E8F5;
}
.login-form-item {
  margin-top: 25px;
}
.login-form-item-pwd-suffix {
  padding: 0 14px;
}
.login-form-item-pwd-close {
  margin-right: 10px;
}
</style>