<template>
  <view class="setting-box">
    <my-card>
      <my-lang></my-lang>
      <my-card-item :left-text="settingRateText"
                    right-icon="forward">
      </my-card-item>
    </my-card>
  </view>
</template>

<script>
import myCard from "../../components/my-card/index"
import myCardItem from "../../components/my-card/item"
import MyLang from "../../components/my-lang";

export default {
  components: {
    MyLang,
    myCard,
    myCardItem,
  },
  computed: {
    settingRateText() {
      return this.$t('mine.setting.rate')
    }
  },
  data() {
    return {
    }
  },
  onLoad() {

  },
  methods: {
  }
}
</script>

<style scoped>
.setting-box {
}
</style>