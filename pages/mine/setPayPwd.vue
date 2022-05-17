<template>
  <view class="set-pay-pwd-box">
    <view class="set-pay-pwd-form">

      <my-input class="set-pay-pwd-form-item" v-model="form.code" input-type="number" :placeholder="codePlaceholder">
        <template slot="suffix">
          <my-code :type="type" :form="codeFrom" @sendCodeSuccess="sendCodeSuccess"></my-code>
        </template>
      </my-input>

      <my-input class="set-pay-pwd-form-item" v-model="form.password" :input-type="newPwdInputType" :placeholder="newPwdPlaceholder">
        <template slot="suffix">
          <view class="set-pay-pwd-form-item-pwd-suffix">
            <uni-icons class="set-pay-pwd-form-item-pwd-close" @click="newPwdCloseClick" v-if="form.password.length > 0" custom-prefix="custom-icon" type="closeempty" color="#c1cdde" size="20"></uni-icons>
            <uni-icons @click="newPwdEyeClick" custom-prefix="custom-icon" :type="newPwdInputType === 'password' ? 'eye-slash' : 'eye'" color="#c1cdde" size="20"></uni-icons>
          </view>
        </template>
      </my-input>

      <my-input class="set-pay-pwd-form-item" v-model="form.okPassword" :input-type="okNewPwdInputType" :placeholder="okNewPwdPlaceholder">
        <template slot="suffix">
          <view class="set-pay-pwd-form-item-pwd-suffix">
            <uni-icons class="set-pay-pwd-form-item-pwd-close" @click="okNewPwdCloseClick" v-if="form.okPassword.length > 0" custom-prefix="custom-icon" type="closeempty" color="#c1cdde" size="20"></uni-icons>
            <uni-icons @click="okNewPwdEyeClick" custom-prefix="custom-icon" :type="okNewPwdInputType === 'password' ? 'eye-slash' : 'eye'" color="#c1cdde" size="20"></uni-icons>
          </view>
        </template>
      </my-input>

      <my-button class="set-pay-pwd-form-item" @click="ok" :type="okType" :loading="loading">{{$t('common.ok')}}</my-button>
    </view>
  </view>
</template>

<script>
import myInput from "../../components/my-input/input"
import myButton from "../../components/my-button/button"
import myCode from "../../components/my-code/index"
import {isBackNavigateBack, navigateBack} from "../../utils/common";
import {SET_PAY_PWD} from "../../constant/codeScene";
import { mapActions, mapGetters } from "vuex";
import {setPayPwd} from "../../api/mine/member";

export default {
  components: {
    myButton,
    myInput,
    myCode,
  },
  computed: {
    ...mapGetters({
      memberInfo: "memberInfo",
    }),
    codePlaceholder() {
      return this.type === "email" ? this.$t('common.email.code.placeholder') : this.$t('common.tel.code.placeholder');
    },
    newPwdPlaceholder() {
      return this.$t('mine.pwd.new')
    },
    okNewPwdPlaceholder() {
      return this.$t('mine.pwd.ok')
    },
    okType() {
      return this.form.code.length > 0 && this.form.password.length === 6 && this.form.okPassword.length > 0 ? 'success' : 'default'
    },
    type() {
      return this.memberInfo.tel ? "tel" : "email"
    },
    codeFrom() {
      return {
        areaCode: this.memberInfo.telAreaCode,
        email: this.memberInfo.email,
        tel: this.memberInfo.tel,
        scene: SET_PAY_PWD,
      }
    }
  },
  data() {
    return {
      newPwdInputType: "password",
      okNewPwdInputType: "password",
      loading: false,
      form: {
        code: "",
        password: "",
        okPassword: "",
      },
      redirect: "",
    }
  },
  onLoad(option) {
    if (option.redirect) {
      this.redirect = decodeURIComponent(option.redirect)
    }
  },
  methods: {
    ...mapActions({
      setMemberIsPayPwd: "setMemberIsPayPwd"
    }),
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

      const data = {
        ...this.form,
        telOrEmail: this.memberInfo.tel || this.memberInfo.email
      }
      this.loading = true
      setPayPwd(data)
        .then(res => {
          if (res.code > 0) {
            this.loading = false
            this.$tui.toast(this.$t('http.code.' + res.code))
            return false
          }
          this.setMemberIsPayPwd(1)
          // 确认
          this.$tui.toast(this.$t('mine.set.pay.pwd.success'))
          setTimeout(() => {
            const path = this.redirect ? this.redirect : "home/index"
            isBackNavigateBack(path)
          }, 1000)
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
.set-pay-pwd-box {
  padding-left: 30px;
  padding-right: 30px;
  box-sizing: border-box;
}
.set-pay-pwd-form-item {
  margin-top: 25px;
}
.set-pay-pwd-form-item-pwd-suffix {
  padding: 0 14px;
}
.set-pay-pwd-form-item-pwd-close {
  margin-right: 10px;
}
</style>