<template>
  <view class="setting-box">
    <my-card>
      <my-lang></my-lang>
      <my-card-item :left-text="settingRateText"
                    right-icon="forward">
      </my-card-item>
    </my-card>
    <view class="line"></view>
    <my-card>
      <my-card-item :left-text="aboutText"
                    @click="aboutTo"
                    right-icon="forward">
      </my-card-item>
    </my-card>

    <view class="logout" @click="logoutClick()" v-if="this.memberInfo.memberId > 0">
      <text class="logout-text">{{$t('mine.setting.logout')}}</text>
    </view>

    <!-- 提示窗示例 -->
    <uni-popup ref="alertDialog" type="dialog">
      <my-dialog type="row" :cancelText="this.$t('common.cancel')" :confirmText="this.$t('common.ok')" :title="this.$t('common.tip')" :content="this.$t('common.logout.tip')" @confirm="dialogConfirm" @close="dialogClose">
      </my-dialog>
    </uni-popup>
  </view>
</template>

<script>
import myCard from "../../components/my-card/index"
import myCardItem from "../../components/my-card/item"
import MyLang from "../../components/my-lang";
import MyDialog from "../../components/my-dialog";
import {navigateTo} from "../../utils/common";
import { mapActions, mapGetters } from "vuex";

export default {
  components: {
    MyLang,
    myCard,
    myCardItem,
    MyDialog,
  },
  computed: {
    ...mapGetters({
      memberInfo: "memberInfo",
    }),
    settingRateText() {
      return this.$t('mine.setting.rate')
    },
    aboutText() {
      return this.$t('mine.about')
    }
  },
  data() {
    return {
    }
  },
  onLoad() {

  },
  methods: {
    ...mapActions({
      logout: "logout"
    }),
    aboutTo() {
      navigateTo("mine/about")
    },
    logoutClick() {
      this.$refs.alertDialog.open()
    },
    dialogConfirm() {
      this.$refs.alertDialog.close()
      this.logout()
    },
    dialogClose() {
      this.$refs.alertDialog.close()
    }
  }
}
</script>

<style scoped>
.setting-box {
}
.line {
  height: 10px;
  width: 750rpx;
  background-color: #11151F;
}

.logout {
  margin-top: 15px;
  width: 750rpx;
  display: flex;
  align-items: center;
  justify-content: center;
}
.logout-text {
  font-size: 15px;
  color: #2DBD96;
}
</style>