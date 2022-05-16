<template>
  <view class="my-code" @click="sendCode">
    <text class="my-code-text" :style="{color: codeButtonColor}">{{codeCount < codeCountMax ? codeCount + " S" : $t('common.send')}}</text>
  </view>
</template>

<script>
import {emailSend} from "../../api/other/email";
import {smsSend} from "../../api/other/sms";

export default {
  name: "index",
  props: {
    type: {
      type: String,
      default: ""
    },
    form: {
      type: Object,
      default: {}
    }
  },
  computed: {
    codeButtonColor() {
      return this.type === "email" ? (this.form.email.length > 0 && this.codeCount === this.codeCountMax ? "#2DBD96" : "#A7ADB9") : (this.form.tel.length > 0 && this.codeCount === this.codeCountMax ? "#2DBD96" : "#A7ADB9")
    },
  },
  data() {
    return {
      codeReload: false,
      codeLoading: false,
      codeTimer: null,
      codeCount: 60,
      codeCountMax: 60,
    }
  },
  methods: {
    // 发送验证码
    sendCode() {
      if (this.type === 'email' && this.form.email.length === 0) {
        return;
      }
      if (this.type === 'tel' && (this.form.tel.length === 0 || this.form.areaCode <= 0)) {
        return;
      }
      if (this.codeLoading || this.codeReload) {
        return;
      }
      this.codeLoading = true;
      let sendCode = this.type === "email" ? emailSend : smsSend
      sendCode(this.form)
          .then(res => {
            this.codeLoading = false;
            if (res.code !== 0) {
              this.$tui.toast(this.$t('http.code.' + res.code))
              return false;
            }
            this.$emit("sendCodeSuccess", res.data)
            this.codeCount--;
            this.codeReload = true;
            this.codeTimer = setInterval(() => {
              if (this.codeCount > 0) {
                this.codeCount--;
              } else {
                clearInterval(this.codeTimer);
                this.codeTimer = null;
                this.codeCount = this.codeCountMax;
                this.codeReload = false;
              }
            }, 1000);
          })
          .catch(() => {
            this.codeLoading = false;
            this.$tui.toast(this.$t('http.code.1'))
          });
    },
  }
}
</script>

<style scoped>
.my-code {
  padding: 12px 25px;
  background-color: #4F5460;
  border-bottom: 1px solid #4F5460;
  border-top: 1px solid #4F5460;
}
.my-code-text {
  font-size: 15px;
  color: #A7ADB9;
}
</style>