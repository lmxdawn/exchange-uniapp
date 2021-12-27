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
      </view>
      <view class="operation-part-right">
        <view class="test"></view>
      </view>
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
  //width: 100%;
  /* #endif */
  flex: 1;
}
.operation-part-left {
  width: 170px;
  height: 50px;
  padding-right: 10px;
}
.operation-part-right {
  flex: 1;
  height: 50px;
}

.side-btn-box {
  width: 170px;
  height: 40px;
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
.test {
  width: 200px;
  height: 80px;
  margin: 100px;
  background: #ffaaff;
  border-radius: 15px 20px 35px 50px / 10% 25% 1em 50%;
  /*水平-----/-----垂直，中间用“/”隔开*/
  /*左上水平   右上水平   右下水平   左下水平  /  左上垂直   右上垂直   右下垂直   左下垂直*/
  /*这种方法不推荐使用，太乱了，傻傻分不清楚*/
}
</style>