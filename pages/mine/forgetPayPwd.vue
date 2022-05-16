<template>
  <view class="forget-pay-pwd-box">
    <view class="forget-pay-pwd-form">

      <my-input class="forget-pay-pwd-form-item" v-model="form.password" :input-type="passwordInputType" :placeholder="this.$t('mine.pwd.old')">
        <template slot="suffix">
          <view class="forget-pay-pwd-form-item-pwd-suffix">
            <uni-icons class="forget-pay-pwd-form-item-pwd-close" @click="passwordCloseClick" v-if="form.password.length > 0" custom-prefix="custom-icon" type="closeempty" color="#c1cdde" size="20"></uni-icons>
            <uni-icons @click="passwordEyeClick" custom-prefix="custom-icon" :type="passwordInputType === 'password' ? 'eye-slash' : 'eye'" color="#c1cdde" size="20"></uni-icons>
          </view>
        </template>
      </my-input>

      <my-button class="forget-pay-pwd-form-item" @click="okClick" :type="okType" :loading="loading">{{$t('mine.edit')}}</my-button>
    </view>
  </view>
</template>

<script>
import myInput from "../../components/my-input/input"
import myButton from "../../components/my-button/button"
import {FORGET_PAY_PWD} from "../../constant/codeScene";
export default {
  components: {
    myButton,
    myInput
  },
  computed: {
    okType() {
      return this.form.password.length > 0 ? 'success' : 'default'
    }
  },
  data() {
    return {
      passwordInputType: "password",
      loading: false,
      form: {
        password: "",
        scene: FORGET_PAY_PWD,
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
    okClick() {

    }
  }
}
</script>

<style scoped>
.forget-pay-pwd-box {
  padding: 0 25px;
}
.forget-pay-pwd-form-item {
  margin-top: 25px;
}
.forget-pay-pwd-form-item-pwd-suffix {
  padding: 0 14px;
}
.forget-pay-pwd-form-item-pwd-close {
  margin-right: 10px;
}
</style>