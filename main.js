
// 解决renderjs在h5端鼠标移动监听不了的问题，实现echart的dataZoom方法可以使用
//#ifdef H5
window.wx = {}
//#endif

import App from './App'

// 国际化
import messages from './locale/index'

let i18nConfig = {
    locale: uni.getLocale(),
    messages
}

import Vue from 'vue'
import VueI18n from 'vue-i18n'
import store from './store'

import * as filters from "./filters/index"; // 全局过滤器

// uView 组件库
import uView from '@/uni_modules/uview-ui'
Vue.use(uView)
// 使用rpx单位
// uni.$u.config.unit = 'rpx'

// 实用的方法
import tui from "./tui";


Vue.use(VueI18n)
const i18n = new VueI18n(i18nConfig)

// 注册全局实用程序过滤器（register global utility filters）.
Object.keys(filters).forEach(key => {
    Vue.filter(key, filters[key]);
});

Vue.config.productionTip = false;

Vue.prototype.$tui = tui;
Vue.prototype.$eventHub = Vue.prototype.$eventHub || new Vue();
Vue.prototype.$store = store;

App.mpType = 'app';

const app = new Vue({
    i18n,
    store,
    ...App
});
app.$mount();
