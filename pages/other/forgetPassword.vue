<template>
  <view class="forget-password-box">
    <uni-nav-bar @clickLeft="back" class="forget-password-nav-bar" leftIcon="back" color="#E1E8F5" :border="false" background-color="#191E29" :statusBar="true"></uni-nav-bar>
    <view class="forget-password-body">
      <view class="forget-password-title">
        <text class="forget-password-title-text">{{$t('common.forgetPassword')}}</text>
      </view>
      <view class="forget-password-form">
        <my-input v-if="type === 'email'" v-model="form.email" class="forget-password-form-item" :placeholder="emailPlaceholder"></my-input>
        <my-input v-else class="forget-password-form-item" v-model="form.mobile" :placeholder="mobilePlaceholder">
          <template slot="prefix">
            <my-area-code @selected="areaCodeSelected"></my-area-code>
          </template>
        </my-input>
        <my-input class="forget-password-form-item" v-model="form.code" :placeholder="codePlaceholder">
          <template slot="suffix">
            <view class="forget-password-form-item-code-suffix">
              <text class="forget-password-form-item-code-suffix-text">{{$t('common.send')}}</text>
            </view>
          </template>
        </my-input>
        <my-button class="forget-password-form-item" :type="buttonType">{{$t('common.next')}}</my-button>
      </view>
      <view class="forget-password-user">
        <text class="forget-password-user-text" @click="typeClick">{{title}}</text>
      </view>
    </view>
  </view>
</template>

<script>
import myInput from "../../components/my-input/input"
import myButton from "../../components/my-button/button"
import myAreaCode from "../../components/my-area-code/index"
import {navigateBack} from "../../utils/common";

export default {
  components: {
    myButton,
    myInput,
    myAreaCode
  },
  computed: {
    title() {
      return this.type === "email" ? this.$t('common.mobile.forgetPassword') : this.$t('common.email.forgetPassword');
    },
    emailPlaceholder() {
      return this.$t('common.email.placeholder')
    },
    mobilePlaceholder() {
      return this.$t('common.mobile.placeholder')
    },
    codePlaceholder() {
      return this.type === "email" ? this.$t('common.email.code.placeholder') : this.$t('common.mobile.code.placeholder');
    },
  },
  data() {
    return {
      type: "email",
      buttonType: "default",
      form: {
        areaCode: "",
        email: "",
        mobile: "",
        code: ""
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
    areaCodeSelected(item) {
      this.form.areaCode = item.code
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
.forget-password-form-item-code-suffix {
  padding: 14px 25px;
  background-color: #4F5460;
}
.forget-password-form-item-code-suffix-text {
  font-size: 15px;
  color: #A7ADB9;
}
.forget-password-user {
  display: flex;
  flex-direction: row;
  justify-content: end;
  align-items: center;
  margin-top: 10px;
}
.forget-password-user-text {
  font-size: 12px;
  color: #E1E8F5;
}
</style>