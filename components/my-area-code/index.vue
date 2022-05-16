<template>
  <view class="my-area-code">
    <my-select-list
        :data-list="dataList"
        :selected-value="selectedValue"
        :loading-status="loadingStatus"
        :is-no-data="isNoData"
        @selected="selected">
      <view class="my-area-code-value">
        <text class="my-area-code-value-text">+{{selectedValue}}</text>
        <uni-icons custom-prefix="custom-icon" type="bottom" color="#4F5460" size="12"></uni-icons>
      </view>
    </my-select-list>
  </view>
</template>

<script>
import MySelectList from "../my-select-list";
import {areaCodeList} from "../../api/other/areaCode";
export default {
  name: "index",
  components: {
    MySelectList,
  },
  data() {
    return {
      dataList: [],
      isNoData: true,
      loadingStatus: "more",
      params: {
        page: 1,
        limit: 100,
      },
      selectedValue: 0
    }
  },
  mounted() {
    this.loadData()
  },
  methods: {
    selected(item) {
      this.selectedValue = item.value
      this.$emit("selected", item)
    },
    loadData(refresh) {
      this.loadingStatus = 'loading'
      areaCodeList(this.params)
        .then(res => {
          this.isNoData = false
          if (res.code > 0) {
            this.loadingStatus = "noMore";
            if (this.dataList.length === 0) {
              this.isNoData = true;
            }
            if (refresh) {
              this.refreshStatus()
            }
            return false
          }
          const dataList = res.data;
          // 请求的值小于每页数量
          this.isNoData = (dataList.length === 0 && this.dataList.length === 0);
          let dataListA = []
          for (let i = 0; i < dataList.length; i++) {
            dataListA[i] = {id: dataList[i].id, value: dataList[i].code, name: dataList[i].name}
          }
          this.loadingStatus = "more";
          if (refresh) {
            this.dataList = dataListA;
            this.refreshStatus()
          } else {
            this.dataList = this.dataList.concat(dataListA);
          }
          // console.log(dataList)
          this.params.page++
          if (dataListA.length < this.params.limit) {
            this.loadingStatus = "noMore";
          }
        })
        .catch(() => {
          this.isNoData = false
          this.loadingStatus = "noMore";
          if (this.dataList.length === 0) {
            this.isNoData = true;
          }
          if (refresh) {
            this.refreshStatus()
          }
        })
    },
    refreshStatus() {

    }
  }
}
</script>

<style scoped>
.my-area-code {
  border-right: 1px solid #292E39;
}
.my-area-code-value {
  padding: 14px;
}
.my-area-code-value-text {
  margin-right: 5px;
  color: #E1E8F5;
}

</style>