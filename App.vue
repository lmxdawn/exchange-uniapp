<script>
import { checkAppVersion } from "./utils/appUpdate";
import { mapActions, mapGetters } from "vuex";
import {connectionLogin} from "./api/ws/connection";
import {getToken} from "./utils/userAuth"
export default {
  computed: {
    ...mapGetters({
      guide: "guide",
    })
  },
  data() {
    return {
      loginLoading: false
    }
  },
  onLaunch: function() {
    console.log('App Launch')
    // #ifdef APP-PLUS
    plus.screen.lockOrientation('portrait-primary');
    // #endif
    this.userInfo();
    // 获取usd汇率
    this.getUsdtRateSet()
  },
  onShow: function() {
    // 检查APP是否需要更新
    checkAppVersion(false);
  },
  onHide: function() {
    console.log('App Hide')
  },
  methods: {
    ...mapActions({
      getUserInfo: "getUserInfo",
      usdtRateSet: "usdtRateSet",
    }),
    userInfo(invite_code) {
      // #ifdef APP-PLUS
      // 是否完成了引导页的
      if (!this.guide || this.guide.length === 0) {
        return false
      }
      // #endif
      this.getUserInfo(invite_code)
        .then(res => {
          if (res.code > 0) {
            this.$tui.toast(this.$t('http.code.' + res.code))
          }
          // 登录ws-rule路由
          connectionLogin()
            .then(res => {
              let memberId = res.data && res.data.memberId ? res.data.memberId : 0
              let token = getToken()
              const wsUrl = res.data.url
              const wsPort = res.data.wsPort
              // 初始化websocket
              this.$websocket.setConf(wsUrl, wsPort, memberId, token)
              this.$websocket.connectSocketInit()
            })
        })
        .catch(err => {
          console.log(err);
        })
    },
    getUsdtRateSet() {
      this.usdtRateSet()
    }
  }
}
</script>

<style lang="scss">
/*每个页面公共的css*/
@import url("style/base.css");
</style>
