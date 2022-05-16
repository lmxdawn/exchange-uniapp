<template>
  <view class="setting-box">
    <my-card>
      <my-card-item :left-text="this.$t('mine.security.setting.login')"
                    right-icon="forward"
                    :right-text="memberInfo.isPwd ? editText : unsetText"
                    @click="reviseLoginPwdTo">
      </my-card-item>
      <my-card-item :left-text="this.$t('mine.security.setting.pay')"
                    right-icon="forward"
                    :right-text="memberInfo.isPayPwd ? editText : unsetText"
                    @click="revisePayPwdTo">
      </my-card-item>
    </my-card>

    <view class="line"></view>

    <my-card>

      <my-card-item :left-text="this.$t('mine.security.setting.tel')"
                    right-icon="forward"
                    :right-text="memberInfo.tel ? memberInfo.tel : unboundText">
      </my-card-item>
      <my-card-item :left-text="this.$t('mine.security.setting.email')"
                    right-icon="forward"
                    :right-text="memberInfo.email ? memberInfo.email : unboundText">
      </my-card-item>
      <my-card-item :left-text="this.$t('mine.security.setting.google')"
                    right-icon="forward"
                    :right-text="memberInfo.isGoogleKey ? editText : unboundText">
      </my-card-item>

    </my-card>
  </view>
</template>

<script>
import myCard from "../../components/my-card/index"
import myCardItem from "../../components/my-card/item"
import {navigateTo} from "../../utils/common";
import { mapGetters } from "vuex";

export default {
  components: {
    myCard,
    myCardItem,
  },
  computed: {
    ...mapGetters({
      memberInfo: "memberInfo",
    }),
    unboundText() {
      return this.$t('mine.unbound')
    },
    editText() {
      return this.$t('mine.edit')
    },
    unsetText() {
      return this.$t('mine.unset')
    },
  },
  data() {
    return {
    }
  },
  onLoad() {

  },
  methods: {
    reviseLoginPwdTo() {
      navigateTo("mine/reviseLoginPwd")
    },
    revisePayPwdTo() {
      let url = "mine/setPayPwd"
      if (this.memberInfo.isPayPwd) {
        url = "mine/revisePayPwd"
      }
      navigateTo(url)
    }
  }
}
</script>

<style scoped>
.line {
  height: 10px;
}
</style>