<template>
  <view class="list-box">
    <view class="operation-part">
      <view class="operation-part-left">
        <view class="side-btn-box">
          <view class="side-btn-p">
            <view class="side-btn side-btn__buy">
              <text class="side-btn__text">买入</text>
            </view>
          </view>
          <view class="side-btn-p">
            <view class="side-btn side-btn__sell">
              <text class="side-btn__text">卖出</text>
            </view>
          </view>
        </view>
      </view>
      <view class="operation-part-line"></view>
      <view class="operation-part-right"></view>
    </view>
    <view style="height: 900px;"></view>
  </view>
</template>

<script>
export default {
  name: "trade-list"
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
  width: 100%;
  /* #endif */
}
.operation-part-left {
  flex: 1;
  height: 50px;
  padding-right: 10px;
}
.operation-part-right {
  flex: 1;
  height: 50px;
}

.side-btn-box {
  display: flex;
  flex-direction: row;
  justify-content: flex-start;
}
.side-btn-p {
  position: relative;
  width: 50%;
  background-color: #dd524d;
}
.side-btn {
  position: absolute;
  top: 0;
  border-radius: 2px;
  color: #FFFFFF;
  width: 92px;
  height: 40px;
  line-height: 40px;
  text-align: center;
  &__buy {
    left: 0;
    padding-right: 10px;
    background: linear-gradient(-70deg, transparent 20px, #1abb97 0);
    background-repeat: no-repeat;
  }
  &__sell {
    right: 0;
    padding-left: 10px;
    background: linear-gradient(110deg, transparent 20px, #1abb97 0);
    background-repeat: no-repeat;
  }
  .side-btn__text {
  }
}
</style>