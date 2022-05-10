<script>
import { checkAppVersion } from "./utils/appUpdate";
import { mapGetters } from "vuex";
import {connectionLogin} from "./api/ws/connection";
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
  },
  onShow: function() {
    // 检查APP是否需要更新
    checkAppVersion(false);
  },
  onHide: function() {
    console.log('App Hide')
  },
  methods: {
    userInfo(invite_code) {
      // #ifdef APP-PLUS
      // 是否完成了引导页的
      if (!this.guide || this.guide.length === 0) {
        return false
      }
      // #endif
      this.$store.dispatch("getUserInfo", invite_code)
          .then(res => {
            if (res.code > 0) {
              this.$tui.toast(this.$t('http.code.' + res.code))
            }

            // 登录ws-rule路由
            connectionLogin()
              .then(res => {
                // 初始化websocket
                this.$websocket.connectSocketInit()
              })
          })
          .catch(err => {
            console.log(err);
          })
    }
  }
}
</script>

<style lang="scss">
/*每个页面公共的css*/
@import url("style/base.css");
</style>
