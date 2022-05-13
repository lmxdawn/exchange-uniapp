<template>
  <view class="login-box">
    <uni-nav-bar @clickLeft="back" class="login-nav-bar" leftIcon="closeempty" color="#E1E8F5" :border="false" background-color="#191E29" :statusBar="true"></uni-nav-bar>
    <view class="login-body">
      <view class="login-title">
        <image class="login-title-logo" src="/static/logo.png"></image>
        <text class="login-title-text">{{title(false)}}</text>
      </view>
      <view class="login-form">
        <my-input v-if="type === 'email'" v-model="form.email" class="login-form-item" :placeholder="emailPlaceholder"></my-input>
        <my-input v-else class="login-form-item" v-model="form.mobile" :placeholder="mobilePlaceholder">
          <template slot="prefix">
            <my-area-code @selected="areaCodeSelected"></my-area-code>
          </template>
        </my-input>
        <my-input class="login-form-item" v-model="form.password" :input-type="passwordInputType" :placeholder="pwdPlaceholder">
          <template slot="suffix">
            <view class="login-form-item-pwd-suffix">
              <uni-icons class="login-form-item-pwd-close" @click="passwordCloseClick" v-if="form.password.length > 0" custom-prefix="custom-icon" type="closeempty" color="#c1cdde" size="20"></uni-icons>
              <uni-icons @click="passwordEyeClick" custom-prefix="custom-icon" :type="passwordInputType === 'password' ? 'eye-slash' : 'eye'" color="#c1cdde" size="20"></uni-icons>
            </view>
          </template>
        </my-input>
        <my-button class="login-form-item" :type="buttonType">{{$t('common.login')}}</my-button>
      </view>
      <view class="login-user">
        <text class="login-user-text" @click="forgetPasswordClick">{{$t('common.forgetPassword')}}?</text>
        <text class="login-user-text" @click="typeClick">{{title(true)}}</text>
      </view>
    </view>
  </view>
</template>

<script>
import myInput from "../../components/my-input/input"
import myButton from "../../components/my-button/button"
import myAreaCode from "../../components/my-area-code/index"
import {navigateBack, navigateTo} from "../../utils/common";

export default {
  components: {
    myButton,
    myInput,
    myAreaCode
  },
  computed: {
    title() {
      return isF => {
        let email = this.$t('common.login.email')
        let mobile = this.$t('common.login.mobile')
        return this.type === "email" ? (!isF ? email : mobile) : (!isF ? mobile : email);
      }
    },
    emailPlaceholder() {
      return this.$t('common.email.placeholder')
    },
    mobilePlaceholder() {
      return this.$t('common.mobile.placeholder')
    },
    pwdPlaceholder() {
      return this.$t('common.login.pwd.placeholder')
    },
  },
  data() {
    return {
      type: 'email',
      passwordInputType: "password",
      buttonType: "default",
      form: {
        areaCode: "",
        email: "",
        mobile: "",
        password: ""
      }
    }
  },
  methods: {
    back() {
      navigateBack()
    },
    typeClick() {
      this.type = this.type === "email" ? "mobile" : "email";
    },
    passwordCloseClick() {
      this.form.password = ""
    },
    passwordEyeClick() {
      this.passwordInputType = this.passwordInputType === 'password' ? 'text' : 'password'
    },
    areaCodeSelected(item) {
      this.form.areaCode = item.code
    },
    forgetPasswordClick() {
      navigateTo("other/forgetPassword")
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
  width: 120px;
  height: 40px;
}

.login-title-text {
  font-size: 30px;
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
.login-user {
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
  margin-top: 10px;
}
.login-user-text {
  font-size: 12px;
  color: #4F5460;
}
</style>