<template>
  <view>
    <nav-bar :pair="pair"></nav-bar>
    <k-echarts ref="kEcharts" :init-data="data" />
  </view>
</template>

<script>
import navBar from './nav-bar'
import kEcharts from '../../components/k-echart/index'
export default {
  components: {
    kEcharts,
    navBar
  },
  props: {
    pair: {
      type: Object,
      default() {
        return {}
      }
    },
  },
  data() {
    return {
      data: []
    }
  },
  methods: {
    init(data) {
      this.$refs.kEcharts.init(data)
    }
  }
}
</script>

<style scoped>

</style>