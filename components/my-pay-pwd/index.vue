<template>
  <view class="my-pay-pwd-box">

    <my-keyboard :show="show" @close="close" @keyboard="keyboard">
      <view class="my-pay-pwd">
        <view class="my-pay-pwd-header">
          <text class="my-pay-pwd-title">交易密码</text>
          <uni-icons custom-prefix="custom-icon" type="closeempty" color="#9197A3" size="22" @click="close"></uni-icons>
        </view>
        <view class="my-pay-pwd-body">
          <my-keyboard-item v-for="(item, index) in pwdArr" :value="item" :key="index"></my-keyboard-item>
        </view>
        <view class="my-pay-pwd-footer">
          <view class="my-pay-pwd-text"></view>
          <view class="my-pay-pwd-text" @click="forgetPayPwdTo">忘记交易密码</view>
        </view>
      </view>
    </my-keyboard>

    <!-- 提示窗示例 -->
    <uni-popup ref="alertDialog" type="dialog">
      <my-dialog type="row" :cancelText="this.$t('common.close')" :confirmText="this.$t('common.setTo')" :title="this.$t('common.tip')" :content="this.$t('common.pay.pwd.tip')" @confirm="dialogConfirm" @close="dialogClose">
      </my-dialog>
    </uni-popup>

  </view>
</template>

<script>
import myKeyboard from "../../components/my-keyboard/index"
import myKeyboardItem from "../../components/my-keyboard/item"
import myDialog from "../../components/my-dialog/index"
import {navigateTo} from "../../utils/common";
export default {
  name: "myPayPwd",
  components: {
    myKeyboard,
    myKeyboardItem,
    myDialog,
  },
  data() {
    return {
      show: false,
      payLoading: false,
      payPwd: "",
      pwdNumberArr: [],
      pwdArr: ["", "", "", "", "", ""],
      redirect: "",
    }
  },
  methods: {
    open(isPayPwd, redirect) {
      if (isPayPwd !== 1) {
        this.showSetPayPwd()
        return false
      }
      this.redirect = redirect
      this.show = true
    },
    setPayPwdTo() {
      const setPayPwdUrl = "mine/setPayPwd?redirect=" + this.redirect
      navigateTo(setPayPwdUrl)
    },
    close() {
      this.pwdNumberArr = [];
      this.pwdArr = ["", "", "", "", "", ""];
      this.payPwd = "";
      this.show = false;
      this.$emit('close')
    },
    keyboard(value) {
      if (value < 0) {
        //退格键
        let len = this.pwdNumberArr.length;
        if (len > 0) {
          this.pwdArr.splice(len - 1, 1, "");
          this.pwdNumberArr.pop()
        } else {
          this.pwdArr = ["", "", "", "", "", ""];
        }
        return false
      }

      if (this.pwdNumberArr.length >= this.pwdArr.length) {
        return false
      }
      this.pwdNumberArr.push(value);
      this.pwdArr.splice(this.pwdNumberArr.length - 1, 1, "●");
      if (this.pwdNumberArr.length === this.pwdArr.length) {
        const payPwd = this.pwdNumberArr.join("");
        this.close()
        this.$emit("success", payPwd)
      }
    },
    showSetPayPwd() {
      this.$refs.alertDialog.open()
    },
    dialogConfirm() {
      this.$refs.alertDialog.close()
      this.setPayPwdTo()
    },
    dialogClose() {
      this.$refs.alertDialog.close()
      this.close()
    },
    forgetPayPwdTo() {
      const forgetPayPwdUrl = "mine/forgetPayPwd?redirect=" + this.redirect
      navigateTo(forgetPayPwdUrl)
    }
  }
}
</script>

<style scoped>
.my-pay-pwd {
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  background-color: #212631;
  padding: 10px 15px;
}
.my-pay-pwd-header {
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
}

.my-pay-pwd-body {
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
  padding: 10px 5px;
}

.my-pay-pwd-footer {
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
}
.my-pay-pwd-title {
  font-size: 20px;
  color: #E1E8F5;
  font-weight: 500;
}

.my-pay-pwd-text {
  font-size: 13px;
  color: #9197A3;
}
</style>