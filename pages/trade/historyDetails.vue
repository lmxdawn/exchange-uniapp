<template>
  <view class="history-details">
    <view class="history-details-body">
      <entrust-order :item="item" class="history-details-order"></entrust-order>

      <view class="history-details-data">

        <view class="history-details-title">{{titleText}}</view>

        <view class="history-details-list">

        </view>

      </view>
    </view>

  </view>
</template>

<script>
import entrustOrder from '../../components/trade/entrust-order.vue';
import myEmpty from "../../components/my-empty/my-empty";
import {navigateBack} from "../../utils/common";
export default {
  name: "historyDetails",
  components: {
    entrustOrder,
    myEmpty
  },
  computed: {
    titleText() {
      return this.$t('trade.order.history.details')
    }
  },
  data() {
    return {
      color: "#E1E8F5",
      backgroundColor: "#191E29",
      item: {
        coin: {},
        tradeCoin: {}
      }
    }
  },
  methods: {
    back() {
      navigateBack()
    },
  }
}
</script>

<style lang="scss" scoped>
.history-details-body {
  padding: 0 15px;
}
.history-details-order {
  border-radius: 5px;
}
.history-details-data {
  margin-top: 20px;
}
.history-details-title {
  font-size: 14px;
  color: #9197A3;
}

</style>