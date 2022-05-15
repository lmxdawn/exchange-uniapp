<template>
  <view class="login-box">
    <uni-nav-bar @clickLeft="back" class="login-nav-bar" leftIcon="closeempty" color="#E1E8F5" :border="false" background-color="#191E29" :statusBar="true"></uni-nav-bar>
    <view class="login-body">
      <view class="login-title">
        <image class="login-title-logo" src="/static/logo.png"></image>
        <text class="login-title-text">{{title(false)}}</text>
      </view>
      <view class="login-form">
        <my-input v-show="type === 'email'" v-model="form.email" class="login-form-item" :placeholder="emailPlaceholder"></my-input>
        <my-input v-show="type === 'tel'" class="login-form-item" v-model="form.tel" :placeholder="telPlaceholder">
          <template slot="prefix">
            <my-area-code :code="form.areaCode" @selected="areaCodeSelected"></my-area-code>
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
        <my-button class="login-form-item" @click="loginClick" :type="loginType" :loading="loading">{{$t('common.login')}}</my-button>
      </view>
      <view class="login-user">
        <text class="login-user-text" @click="forgetPasswordClick">{{$t('common.forgetPassword')}}?</text>
        <text class="login-user-text" @click="typeClick">{{title(true)}}</text>
      </view>
    </view>

    <view class="login-register">
      <text class="login-register-tip">{{$t('common.register.tip')}}</text>
      <text class="login-register-btn" @click="registerTo">{{$t('common.register')}}</text>
    </view>
  </view>
</template>

<script>
import myInput from "../../components/my-input/input"
import myButton from "../../components/my-button/button"
import myAreaCode from "../../components/my-area-code/index"
import {isBackNavigateBack, navigateBack, navigateTo} from "../../utils/common";
import {loginByPwd} from "../../api/other/auth";
import { mapActions } from "vuex";
import {connectionLogin} from "../../api/ws/connection";
import {getToken, setToken} from "../../utils/userAuth";

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
        let tel = this.$t('common.login.tel')
        return this.type === "email" ? (!isF ? email : tel) : (!isF ? tel : email);
      }
    },
    emailPlaceholder() {
      return this.$t('common.email.placeholder')
    },
    telPlaceholder() {
      return this.$t('common.tel.placeholder')
    },
    pwdPlaceholder() {
      return this.$t('common.login.pwd.placeholder')
    },
    loginType() {
      return ((this.type === 'email' && this.form.email.length > 0) || (this.type === 'tel' && this.form.tel.length > 0)) && this.form.password.length > 0 ? 'success' : 'default'
    }
  },
  data() {
    return {
      type: 'email',
      passwordInputType: "password",
      loading: false,
      form: {
        areaCode: 0,
        email: "",
        tel: "",
        password: ""
      },
      redirect: "", // 登录成功的回调地址
    }
  },
  onLoad(option) {
    if (option.redirect) {
      this.redirect = decodeURIComponent(option.redirect)
    }
  },
  methods: {
    ...mapActions({
      getUserInfo: "getUserInfo",
    }),
    back() {
      navigateBack()
    },
    typeClick() {
      this.type = this.type === "email" ? "tel" : "email";
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
      navigateTo("other/forgetPassword?type=" + this.type)
    },
    registerTo() {
      navigateTo("other/register?type=" + this.type)
    },
    loginClick() {
      if (this.loading) {
        return false;
      }
      this.loading = true
      const data = {
        type: this.type,
        ...this.form
      }
      loginByPwd(data)
          .then(res => {
            if (res.code !== 0) {
              this.loading = false
              this.$tui.toast(this.$t('http.code.' + res.code))
              return false;
            }

            // 设置token
            setToken(res.data.token)

            // 获取用户信息
            this.userInfo();

          })
          .catch(() => {
            this.loading = false
            this.$tui.toast(this.$t('http.code.1'))
          })
    },
    backRedirect() {
      // 登录成功
      this.$tui.toast(this.$t('common.login.success'))
      setTimeout(() => {
        const path = this.redirect ? this.redirect : "home/index"
        isBackNavigateBack(path)
      }, 1000)
    },
    userInfo() {
      this.getUserInfo()
          .then(res => {
            if (res.code > 0) {
              this.loading = false
              this.$tui.toast(this.$t('http.code.' + res.code))
              return false
            }
            // 登录ws-rule路由
            connectionLogin()
                .then(res => {
                  this.loading = false
                  let memberId = res.data && res.data.memberId ? res.data.memberId : 0
                  let token = getToken()
                  const wsUrl = res.data.url
                  const wsPort = res.data.wsPort
                  // 先关闭
                  this.$websocket.Close()
                  // 重新初始化websocket
                  this.$websocket.setConf(wsUrl, wsPort, memberId, token)
                  this.$websocket.connectSocketInit()
                  this.backRedirect()
                })
                .catch(() => {
                  this.loading = false
                  this.$tui.toast(this.$t('http.code.1'))
                })
          })
          .catch(err => {
            console.log(err);
            this.loading = false
            this.$tui.toast(this.$t('http.code.1'))
          })
    }
  }
}
</script>

<style scoped>
.login-box {
}
.login-nav-bar {
  padding: 0 15px;
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
.login-register {
  position: absolute;
  bottom: 50px;
  left: 30px;
}
.login-register-tip {
  font-size: 16px;
  color: #E1E8F5;
}
.login-register-btn {
  font-size: 16px;
  color: #2DBD96;
}
</style>