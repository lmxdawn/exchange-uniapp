<template>
  <view class="my-lang">
    <my-select-list
        :is-no-data="false"
        :data-list="dataList"
        :selected-value="selectedValue"
        @selected="selected">
      <my-card-item :left-text="settingLangText"
                    :right-text="selectedName"
                    right-icon="forward">
      </my-card-item>
    </my-select-list>
  </view>
</template>

<script>
import myCardItem from "../../components/my-card/item"
import MySelectList from "../my-select-list";
import {getLang, setLang} from "../../utils/lang";

export default {
  name: "my-lang",
  components: {
    myCardItem,
    MySelectList,
  },
  data() {
    return {
      dataList: [
        {
          id: 1,
          value: "en",
          name: "English",
        },
        {
          id: 2,
          value: "zh-Hans",
          name: "中文简体",
        }
      ],
      selectedValue: getLang()
    }
  },
  computed: {
    selectedName() {
      const item = this.dataList.find(item => item.value === this.selectedValue)
      return item && item.name ? item.name : ""
    },
    settingLangText() {
      return this.$t('mine.setting.lang')
    }
  },
  methods: {
    selected(item) {
      const lang = item.value
      this.selectedValue = lang
      setLang(lang)
      this.$i18n.locale = lang
    }
  }
}
</script>

<style scoped>

</style>