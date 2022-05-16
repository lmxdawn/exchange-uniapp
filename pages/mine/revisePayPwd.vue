<template>
  <view class="revise-pay-pwd-box">
    <view class="revise-pay-pwd-form">

      <my-input class="revise-pay-pwd-form-item" v-model="form.password" :input-type="passwordInputType" :placeholder="this.$t('mine.pwd.old')">
        <template slot="suffix">
          <view class="revise-pay-pwd-form-item-pwd-suffix">
            <uni-icons class="revise-pay-pwd-form-item-pwd-close" @click="passwordCloseClick" v-if="form.password.length > 0" custom-prefix="custom-icon" type="closeempty" color="#c1cdde" size="20"></uni-icons>
            <uni-icons @click="passwordEyeClick" custom-prefix="custom-icon" :type="passwordInputType === 'password' ? 'eye-slash' : 'eye'" color="#c1cdde" size="20"></uni-icons>
          </view>
        </template>
      </my-input>

      <my-input class="revise-pay-pwd-form-item" v-model="form.newPassword" :input-type="newPasswordInputType" :placeholder="this.$t('mine.pwd.new')">
        <template slot="suffix">
          <view class="revise-pay-pwd-form-item-pwd-suffix">
            <uni-icons class="revise-pay-pwd-form-item-pwd-close" @click="newPasswordCloseClick" v-if="form.newPassword.length > 0" custom-prefix="custom-icon" type="closeempty" color="#c1cdde" size="20"></uni-icons>
            <uni-icons @click="newPasswordEyeClick" custom-prefix="custom-icon" :type="newPasswordInputType === 'password' ? 'eye-slash' : 'eye'" color="#c1cdde" size="20"></uni-icons>
          </view>
        </template>
      </my-input>

      <my-input class="revise-pay-pwd-form-item" v-model="form.okPassword" :input-type="okPasswordInputType" :placeholder="this.$t('mine.pwd.ok')">
        <template slot="suffix">
          <view class="revise-pay-pwd-form-item-pwd-suffix">
            <uni-icons class="revise-pay-pwd-form-item-pwd-close" @click="okPasswordCloseClick" v-if="form.okPassword.length > 0" custom-prefix="custom-icon" type="closeempty" color="#c1cdde" size="20"></uni-icons>
            <uni-icons @click="okPasswordEyeClick" custom-prefix="custom-icon" :type="okPasswordInputType === 'password' ? 'eye-slash' : 'eye'" color="#c1cdde" size="20"></uni-icons>
          </view>
        </template>
      </my-input>

      <my-button class="revise-pay-pwd-form-item" @click="okClick" :type="okType" :loading="loading">{{$t('mine.edit')}}</my-button>
    </view>

    <view class="revise-pay-forget">
      <text class="revise-pay-forget-text"></text>
      <text class="revise-pay-forget-text" @click="forgetPayPwdTo">{{$t('mine.forget.pay.pwd')}}</text>
    </view>

  </view>
</template>

<script>
import myInput from "../../components/my-input/input"
import myButton from "../../components/my-button/button"
import {navigateTo} from "../../utils/common";
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
    forgetPayPwdTo() {
      navigateTo("mine/forgetPayPwd")
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
.revise-pay-pwd-box {
  padding: 0 25px;
}
.revise-pay-pwd-form-item {
  margin-top: 25px;
}
.revise-pay-pwd-form-item-pwd-suffix {
  padding: 0 14px;
}
.revise-pay-pwd-form-item-pwd-close {
  margin-right: 10px;
}
.revise-pay-forget {
  margin-top: 10px;
  display: flex;
  justify-content: space-between;
}
.revise-pay-forget-text {
  font-size: 12px;
  color: #E1E8F5;
}
</style>