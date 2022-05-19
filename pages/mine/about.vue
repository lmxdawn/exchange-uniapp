<template>
  <view class="about-box">
    <my-card>
      <my-card-item :left-text="contactusText"
                    right-icon="forward">
      </my-card-item>
      <my-card-item :left-text="agreementText"
                    right-icon="forward">
      </my-card-item>
      <!--#ifdef APP-PLUS-->
      <my-card-item :left-text="versionText"
                    :right-text="version"
                    right-icon="forward">
      </my-card-item>
      <!--#endif-->
    </my-card>
  </view>
</template>

<script>
import myCard from "../../components/my-card/index"
import myCardItem from "../../components/my-card/item"

export default {
  components: {
    myCard,
    myCardItem,
  },
  computed: {
    contactusText() {
      return this.$t('mine.about.contactus')
    },
    agreementText() {
      return this.$t('mine.about.agreement')
    },
    versionText() {
      return this.$t('mine.about.version')
    },
  },
  data() {
    return {
      version: "V1.0.0"
    }
  },
  onLoad() {
    // #ifdef APP-PLUS
    plus.runtime.getProperty(plus.runtime.appid, wgtinfo => {
      this.version = "V" + wgtinfo.version
    })
    // #endif
  },
  methods: {
  }
}
</script>

<style scoped>
.about-box {
}
</style>