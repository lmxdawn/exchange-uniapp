<template>
  <view class="about-box">
    <my-card>
      <my-card-item :left-text="contactusText"
                    right-icon="forward">
      </my-card-item>
      <my-card-item :left-text="agreementText"
                    right-icon="forward">
      </my-card-item>
      <my-card-item :left-text="versionText"
                    :right-text="version">
      </my-card-item>
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
      version: ""
    }
  },
  onLoad() {
    // #ifdef APP-PLUS
    this.version = plus.runtime.version
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