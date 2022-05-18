<template>
  <view class="register-box">
    <uni-nav-bar @clickLeft="back" class="register-nav-bar" leftIcon="back" color="#E1E8F5" :border="false" background-color="#191E29" :statusBar="true"></uni-nav-bar>
    <view class="register-body">
      <view class="register-title">
        <text class="register-title-text">{{title(false)}}</text>
      </view>
      <view class="register-form">
        <my-input v-show="type === 'email'" v-model="form.email" class="register-form-item" :placeholder="emailPlaceholder"></my-input>
        <my-input v-show="type === 'tel'" class="register-form-item" v-model="form.tel" :placeholder="telPlaceholder">
          <template slot="prefix">
            <my-area-code :code="form.areaCode" @selected="areaCodeSelected"></my-area-code>
          </template>
        </my-input>
        <my-input class="register-form-item" v-model="form.code" input-type="number" :placeholder="codePlaceholder">
          <template slot="suffix">
            <my-code :type="type" :form="form" @sendCodeSuccess="sendCodeSuccess"></my-code>
          </template>
        </my-input>

        <my-input class="register-form-item" v-model="form.password" :input-type="newPwdInputType" :placeholder="newPwdPlaceholder">
          <template slot="suffix">
            <view class="register-form-item-pwd-suffix">
              <uni-icons class="register-form-item-pwd-close" @click="newPwdCloseClick" v-if="form.password.length > 0" custom-prefix="custom-icon" type="closeempty" color="#c1cdde" size="20"></uni-icons>
              <uni-icons @click="newPwdEyeClick" custom-prefix="custom-icon" :type="newPwdInputType === 'password' ? 'eye-slash' : 'eye'" color="#c1cdde" size="20"></uni-icons>
            </view>
          </template>
        </my-input>

        <my-input class="register-form-item" v-model="form.okPassword" :input-type="okNewPwdInputType" :placeholder="okNewPwdPlaceholder">
          <template slot="suffix">
            <view class="register-form-item-pwd-suffix">
              <uni-icons class="register-form-item-pwd-close" @click="okNewPwdCloseClick" v-if="form.okPassword.length > 0" custom-prefix="custom-icon" type="closeempty" color="#c1cdde" size="20"></uni-icons>
              <uni-icons @click="okNewPwdEyeClick" custom-prefix="custom-icon" :type="okNewPwdInputType === 'password' ? 'eye-slash' : 'eye'" color="#c1cdde" size="20"></uni-icons>
            </view>
          </template>
        </my-input>

        <my-button class="register-form-item" @click="registerClick" :loading="loading" :type="registerType">{{$t('common.register')}}</my-button>
      </view>
      <view class="register-user">
        <text class="register-user-text"></text>
        <text class="register-user-text" @click="typeClick">{{title(true)}}</text>
      </view>
    </view>

    <view class="register-login">
      <text class="register-login-tip">{{$t('common.login.tip')}}</text>
      <text class="register-login-btn" @click="loginTo">{{$t('common.login')}}</text>
    </view>
  </view>
</template>

<script>
import myInput from "../../components/my-input/input"
import myButton from "../../components/my-button/button"
import myAreaCode from "../../components/my-area-code/index"
import myCode from "../../components/my-code/index"
import {isBackNavigateBack, navigateBack} from "../../utils/common";
import {registerByEmail, registerByTel} from "../../api/mine/auth";
import {REGISTER} from "../../constant/codeScene";

export default {
  components: {
    myButton,
    myInput,
    myAreaCode,
    myCode,
  },
  computed: {
    title() {
      return isF => {
        let email = this.$t('common.register.email')
        let tel = this.$t('common.register.tel')
        return this.type === "email" ? (!isF ? email : tel) : (!isF ? tel : email);
      }
    },
    emailPlaceholder() {
      return this.$t('common.email.placeholder')
    },
    telPlaceholder() {
      return this.$t('common.tel.placeholder')
    },
    codePlaceholder() {
      return this.type === "email" ? this.$t('common.email.code.placeholder') : this.$t('common.tel.code.placeholder');
    },
    newPwdPlaceholder() {
      return this.$t('common.new.pwd.placeholder')
    },
    okNewPwdPlaceholder() {
      return this.$t('common.ok.new.pwd.placeholder')
    },
    registerType() {
      return this.form.code.length > 0 && this.form.password.length >= 8 && this.form.password.length <= 20 && this.form.okPassword.length > 0 ? 'success' : 'default'
    }
  },
  data() {
    return {
      type: "email",
      newPwdInputType: "password",
      okNewPwdInputType: "password",
      loading: false,
      form: {
        areaCode: 0,
        email: "",
        tel: "",
        code: "",
        password: "",
        okPassword: "",
        scene: REGISTER,
      }
    }
  },
  onLoad(option) {
    this.type = option.type
  },
  methods: {
    back() {
      navigateBack()
    },
    typeClick() {
      this.type = this.type === "email" ? "tel" : "email";
    },
    areaCodeSelected(item) {
      this.form.areaCode = item.value
    },
    newPwdCloseClick() {
      this.form.password = ""
    },
    newPwdEyeClick() {
      this.newPwdInputType = this.newPwdInputType === 'password' ? 'text' : 'password'
    },
    okNewPwdCloseClick() {
      this.form.okPassword = ""
    },
    okNewPwdEyeClick() {
      this.okNewPwdInputType = this.okNewPwdInputType === 'password' ? 'text' : 'password'
    },
    loginTo() {
      isBackNavigateBack("mine/login")
    },
    // 发送验证码成功
    sendCodeSuccess(code) {
      this.form.code = code
    },
    registerClick() {
      if (this.registerType === 'default') {
        return false
      }
      if (this.form.password !== this.form.okPassword) {
        this.$tui.toast(this.$t('common.pwd2pwd'))
        return false;
      }
      if (this.loading) {
        return false;
      }
      this.loading = true
      let register = this.type === "email" ? registerByEmail : registerByTel
      register(this.form)
        .then(res => {
          this.loading = false
          if (res.code !== 0) {
            this.$tui.toast(this.$t('http.code.' + res.code))
            return false;
          }
          // 确认
          this.$tui.toast(this.$t('common.register.success'))
          setTimeout(() => {
            isBackNavigateBack("mine/login")
          }, 1000)
        })
        .catch(() => {
          this.loading = false
          this.$tui.toast(this.$t('http.code.1'))
        })
    }
  }
}
</script>

<style scoped>
.register-box {
}
.register-nav-bar {
  padding: 0 10px;
}
.register-body {
  padding-top: 50rpx;
  padding-left: 30px;
  padding-right: 30px;
  box-sizing: border-box;
}

.register-title {
  display: flex;
  flex-direction: column;
}

.register-title-text {
  font-size: 30px;
  color: #E1E8F5;
}
.register-form-item {
  margin-top: 25px;
}
.register-form-item-pwd-suffix {
  padding: 0 14px;
}
.register-form-item-pwd-close {
  margin-right: 10px;
}
.register-form-item-code-suffix {
  padding: 10px 25px;
  background-color: #4F5460;
  border-bottom: 1px solid #4F5460;
  border-top: 1px solid #4F5460;
}
.register-form-item-code-suffix-text {
  font-size: 15px;
  color: #A7ADB9;
}
.register-user {
  display: flex;
  flex-direction: row;
  justify-content: flex-end;
  align-items: center;
  margin-top: 10px;
}
.register-user-text {
  font-size: 12px;
  color: #E1E8F5;
}
.register-login {
   position: absolute;
   bottom: 50px;
   left: 30px;
 }
.register-login-tip {
  font-size: 16px;
  color: #E1E8F5;
}
.register-login-btn {
  font-size: 16px;
  color: #2DBD96;
}
</style>