<template>
  <view class="forget-password-box">
    <uni-nav-bar @clickLeft="back" class="forget-password-nav-bar" leftIcon="back" color="#E1E8F5" :border="false" background-color="#191E29" :statusBar="true"></uni-nav-bar>
    <view class="forget-password-body">
      <view class="forget-password-title">
        <text class="forget-password-title-text">{{$t('common.forgetPassword')}}</text>
      </view>
      <view class="forget-password-form">
        <my-input v-show="type === 'email'" v-model="form.email" class="forget-password-form-item" :placeholder="emailPlaceholder"></my-input>
        <my-input v-show="type === 'tel'" class="forget-password-form-item" v-model="form.tel" :placeholder="telPlaceholder">
          <template slot="prefix">
            <my-area-code :code="form.areaCode" @selected="areaCodeSelected"></my-area-code>
          </template>
        </my-input>
        <my-input class="forget-password-form-item" v-model="form.code" input-type="number" :placeholder="codePlaceholder">
          <template slot="suffix">
            <my-code :type="type" :form="form" @sendCodeSuccess="sendCodeSuccess"></my-code>
          </template>
        </my-input>

        <my-input class="forget-password-form-item" v-model="form.password" :input-type="newPwdInputType" :placeholder="newPwdPlaceholder">
          <template slot="suffix">
            <view class="forget-password-form-item-pwd-suffix">
              <uni-icons class="forget-password-form-item-pwd-close" @click="newPwdCloseClick" v-if="form.password.length > 0" custom-prefix="custom-icon" type="closeempty" color="#c1cdde" size="20"></uni-icons>
              <uni-icons @click="newPwdEyeClick" custom-prefix="custom-icon" :type="newPwdInputType === 'password' ? 'eye-slash' : 'eye'" color="#c1cdde" size="20"></uni-icons>
            </view>
          </template>
        </my-input>

        <my-input class="forget-password-form-item" v-model="form.okPassword" :input-type="okNewPwdInputType" :placeholder="okNewPwdPlaceholder">
          <template slot="suffix">
            <view class="forget-password-form-item-pwd-suffix">
              <uni-icons class="forget-password-form-item-pwd-close" @click="okNewPwdCloseClick" v-if="form.okPassword.length > 0" custom-prefix="custom-icon" type="closeempty" color="#c1cdde" size="20"></uni-icons>
              <uni-icons @click="okNewPwdEyeClick" custom-prefix="custom-icon" :type="okNewPwdInputType === 'password' ? 'eye-slash' : 'eye'" color="#c1cdde" size="20"></uni-icons>
            </view>
          </template>
        </my-input>

        <my-button class="forget-password-form-item" @click="ok" :type="okType" :loading="loading">{{$t('common.ok')}}</my-button>
      </view>
      <view class="forget-password-user">
        <text class="forget-password-user-text"></text>
        <text class="forget-password-user-text" @click="typeClick">{{title}}</text>
      </view>
    </view>
  </view>
</template>

<script>
import myInput from "../../components/my-input/input"
import myButton from "../../components/my-button/button"
import myAreaCode from "../../components/my-area-code/index"
import myCode from "../../components/my-code/index"
import {isBackNavigateBack, navigateBack} from "../../utils/common";
import {FORGET_PWD} from "../../constant/codeScene";

export default {
  components: {
    myButton,
    myInput,
    myAreaCode,
    myCode,
  },
  computed: {
    title() {
      return this.type === "email" ? this.$t('common.tel.forgetPassword') : this.$t('common.email.forgetPassword');
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
    okType() {
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
        scene: FORGET_PWD,
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
    // 发送验证码成功
    sendCodeSuccess(code) {
      this.form.code = code
    },
    ok() {
      if (this.okType === 'default') {
        return false
      }
      if (this.form.password !== this.form.okPassword) {
        this.$tui.toast(this.$t('common.pwd2pwd'))
        return false;
      }
      if (this.loading) {
        return false;
      }

      // 确认
      this.$tui.toast(this.$t('common.forget.pwd'))
      setTimeout(() => {
        isBackNavigateBack("mine/login")
      }, 1000)
    }
  }
}
</script>

<style scoped>
.forget-password-box {
}
.forget-password-nav-bar {
  padding: 0 10px;
}
.forget-password-body {
  padding-top: 50rpx;
  padding-left: 30px;
  padding-right: 30px;
  box-sizing: border-box;
}

.forget-password-title {
  display: flex;
  flex-direction: column;
}

.forget-password-title-text {
  font-size: 30px;
  color: #E1E8F5;
}
.forget-password-form-item {
  margin-top: 25px;
}
.forget-password-form-item-pwd-suffix {
  padding: 0 14px;
}
.forget-password-form-item-pwd-close {
  margin-right: 10px;
}
.forget-password-user {
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
  margin-top: 10px;
}
.forget-password-user-text {
  font-size: 12px;
  color: #E1E8F5;
}
</style>