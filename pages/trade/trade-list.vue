<template>
  <view class="list-box">
    <view class="operation-part">
      <view class="operation-part-left">
        <view class="side-btn-box">
          <view class="side-btn side-btn__buy side-btn__buy__activate">
            <text class="side-btn__text">买入</text>
          </view>
          <view class="side-btn side-btn__sell">
            <text class="side-btn__text">卖出</text>
          </view>
        </view>

        <my-popup ref="tradeTypePopup" @selected="tradeTypeSelected" :current="tradeForm.type" :list="tradeTypeArr" :cancel-text="cancelText">
          <view class="trade-type" @click="tradeTypeShow">
            <text class="trade-type__text">{{ tradeTypeArr[tradeForm.type] }}</text>
            <uni-icons class="trade-type__down" color="#c1cdde" custom-prefix="iconfont" type="icon-xiangxia1" size="13"></uni-icons>
          </view>
        </my-popup>

        <view class="trade-input-box">
          <uni-number-box class="trade-input" background="rgba(184,198,216,.08)" color="#ffffff" placeholder="fsdafsdafdsa" placeholderColor="#b8c6d8" v-model="tradeForm.price" :step="0.01"></uni-number-box>
        </view>



      </view>
      <view class="operation-part-right">

      </view>
    </view>

    <view style="height: 900px;"></view>
  </view>
</template>

<script>
import myPopup from "../../components/my-popup/my-popup"
export default {
  name: "trade-list",
  props: {
    cancelText: {
      type: String,
      default: ""
    },
    tradeTypeArr: {
      type: Array,
      default() {
        return []
      }
    }
  },
  components: {
    myPopup
  },
  computed: {
  },
  data() {
    return {
      tradeForm: {
        type: 0,
        price: 0.1
      }
    }
  },
  methods: {
    tradeTypeShow() {
      this.$refs.tradeTypePopup.open('bottom')
    },
    tradeTypeSelected(index) {
      this.tradeForm.type = index
    },
  }
}
</script>

<style lang="scss" scoped>
.list-box {
  flex: 1;
  background-color: #212631;
  width: 750rpx;
  border-top-left-radius: 20px;
  border-top-right-radius: 20px;
  /* #ifndef APP-NVUE */
  overflow: hidden auto;
  /* #endif */
  padding: 20px 15px 0;
}
.operation-part {
  display: flex;
  flex-direction: row;
  /* #ifndef APP-NVUE */
  //width: 100%;
  /* #endif */
  flex: 1;
}
.operation-part-left {
  width: 170px;
  padding-right: 10px;
}
.operation-part-right {
  flex: 1;
  height: 50px;
}

.side-btn-box {
  width: 170px;
  height: 35px;
  display: flex;
  flex-direction: row;
  justify-content: space-between;
}
.side-btn {
  display: flex;
  flex-direction: row;
  justify-content: center;
  align-items: center;
  border-radius: 2px;
  width: 80px;
  background-color: rgba(184,198,216,.08);
  .side-btn__text {
    color: #949AA6;
  }
  &__buy {
  }
  &__buy__activate {
    background-color: #1abb97!important;
    .side-btn__text {
      color: #FFFFFF;
    }
  }
  &__sell {
  }
  &__sell__activate {
    background-color: #ed6666!important;
    .side-btn__text {
      color: #FFFFFF;
    }
  }
  .side-btn__text {
  }
}

.trade-type {
  display: flex;
  flex-direction: row;
  justify-content: flex-start;
  align-items: center;
  padding: 10px 0;
  &__text {
    font-size: 13px;
    color: #c1cdde;
  }
  &__down {
    margin-left: 5px;
  }
}

.trade-input-box {
}
.trade-input {
}

</style>