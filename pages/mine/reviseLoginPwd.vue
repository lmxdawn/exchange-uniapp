<template>
  <view class="revise-login-pwd-box">
    <view class="revise-login-pwd-form">

      <my-input class="revise-login-pwd-form-item" v-model="form.password" :input-type="passwordInputType" :placeholder="this.$t('mine.pwd.old')">
        <template slot="suffix">
          <view class="revise-login-pwd-form-item-pwd-suffix">
            <uni-icons class="revise-login-pwd-form-item-pwd-close" @click="passwordCloseClick" v-if="form.password.length > 0" custom-prefix="custom-icon" type="closeempty" color="#c1cdde" size="20"></uni-icons>
            <uni-icons @click="passwordEyeClick" custom-prefix="custom-icon" :type="passwordInputType === 'password' ? 'eye-slash' : 'eye'" color="#c1cdde" size="20"></uni-icons>
          </view>
        </template>
      </my-input>

      <my-input class="revise-login-pwd-form-item" v-model="form.newPassword" :input-type="newPasswordInputType" :placeholder="this.$t('mine.pwd.new')">
        <template slot="suffix">
          <view class="revise-login-pwd-form-item-pwd-suffix">
            <uni-icons class="revise-login-pwd-form-item-pwd-close" @click="newPasswordCloseClick" v-if="form.newPassword.length > 0" custom-prefix="custom-icon" type="closeempty" color="#c1cdde" size="20"></uni-icons>
            <uni-icons @click="newPasswordEyeClick" custom-prefix="custom-icon" :type="newPasswordInputType === 'password' ? 'eye-slash' : 'eye'" color="#c1cdde" size="20"></uni-icons>
          </view>
        </template>
      </my-input>

      <my-input class="revise-login-pwd-form-item" v-model="form.okPassword" :input-type="okPasswordInputType" :placeholder="this.$t('mine.pwd.ok')">
        <template slot="suffix">
          <view class="revise-login-pwd-form-item-pwd-suffix">
            <uni-icons class="revise-login-pwd-form-item-pwd-close" @click="okPasswordCloseClick" v-if="form.okPassword.length > 0" custom-prefix="custom-icon" type="closeempty" color="#c1cdde" size="20"></uni-icons>
            <uni-icons @click="okPasswordEyeClick" custom-prefix="custom-icon" :type="okPasswordInputType === 'password' ? 'eye-slash' : 'eye'" color="#c1cdde" size="20"></uni-icons>
          </view>
        </template>
      </my-input>

      <my-button class="revise-login-pwd-form-item" @click="okClick" :type="okType" :loading="loading">{{$t('mine.edit')}}</my-button>
    </view>
  </view>
</template>

<script>
import myInput from "../../components/my-input/input"
import myButton from "../../components/my-button/button"

export default {
  components: {
    myButton,
    myInput
  },
  computed: {
    okType() {
      return this.form.password.length > 0 && this.form.newPassword.length > 0 && this.form.okPassword.length > 0 ? 'success' : 'default'
    }
  },
  data() {
    return {
      passwordInputType: "password",
      newPasswordInputType: "password",
      okPasswordInputType: "password",
      loading: false,
      form: {
        password: "",
        newPassword: "",
        okPassword: "",
      },
    }
  },
  onLoad() {
  },
  methods: {
    passwordCloseClick() {
      this.form.password = ""
    },
    passwordEyeClick() {
      this.passwordInputType = this.passwordInputType === 'password' ? 'text' : 'password'
    },
    newPasswordCloseClick() {
      this.form.newPassword = ""
    },
    newPasswordEyeClick() {
      this.newPasswordInputType = this.newPasswordInputType === 'password' ? 'text' : 'password'
    },
    okPasswordCloseClick() {
      this.form.okPassword = ""
    },
    okPasswordEyeClick() {
      this.okPasswordInputType = this.okPasswordInputType === 'password' ? 'text' : 'password'
    },
    okClick() {
      if (this.form.newPassword !== this.form.okPassword) {
        this.$tui.toast(this.$t('common.pwd2pwd'))
        return false
      }
      if (this.loading) {
        return false;
      }
      this.loading = true
      // TODO 暂未实现
    },
  }
}
</script>

<style scoped>
.revise-login-pwd-box {
  padding: 0 25px;
}
.revise-login-pwd-form-item {
  margin-top: 25px;
}
.revise-login-pwd-form-item-pwd-suffix {
  padding: 0 14px;
}
.revise-login-pwd-form-item-pwd-close {
  margin-right: 10px;
}
</style>