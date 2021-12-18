<script>
import { checkAppVersion } from "./utils/appUpdate";
import { mapGetters } from "vuex";
import {setMemberInit} from "./utils/userAuth";
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
          })
          .catch(err => {
            console.log(err);
          })
    }
  }
}
</script>

<style>
/*每个页面公共的css*/
@import url("style/base.scss");
</style>
