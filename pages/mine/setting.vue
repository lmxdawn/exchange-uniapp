<template>
  <view class="setting-box">
    <my-card>
      <my-card-item :left-text="this.$t('mine.security.setting')"
                    :right-text="this.$t('mine.security.setting.text')"
                    right-icon="forward">
      </my-card-item>
      <my-card-item :left-text="this.$t('mine.setting')"
                    right-icon="forward">
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