import * as types from "../mutation-types";
import {getStorageSync, setStorageSync} from "../../utils/storage"
import {isWeChatWebView} from "../../utils/common";

const guideKey = "guideKey";

const state = {
    PhoneFirstLoadUrl: "", //用户第一次加载的url， vue框架在微信浏览器路由时url不会变
    isWxView: isWeChatWebView(),
    currentDate: Math.floor(new Date().getTime() / 1000), //当前日期 会用服务器返回的数据
    guide: getStorageSync(guideKey) || false, // 引导页面
    isUpAppVersion: false,
    appVersion: "0.0.0",
    adParams: {}, // 广告点击的参数
};

// getters
const getters = {
    PhoneFirstLoadUrl: state => state.PhoneFirstLoadUrl,
    isWxView: state => state.isWxView,
    currentDate: state => state.currentDate,
    guide: state => state.guide,
    isUpAppVersion: state => state.isUpAppVersion,
    appVersion: state => state.appVersion,
    adParams: state => state.adParams,
};

// actions
const actions = {
    setPhoneFirstLoadUrl({commit}, url) {
        commit(types.PHONE_FIRST_LOAD_URL, url);
    },
    setCurrentDate({commit}, currentDate) {
        commit(types.CURRENT_DATE, currentDate);
    },
    setGuide({commit}, guide) {
        commit(types.GUIDE, guide);
    },
    setIsUpAppVersion({commit}, status) {
        commit(types.IS_UP_APP_VERSION, status);
    },
    setAppVersion({commit}, version) {
        commit(types.APP_VERSION, version);
    },
    setAdParams({commit}, item) {
        commit(types.AD_PARAMS, item);
    },
};

// mutations
const mutations = {
    //设置用户第一次加载的url，微信js-sdk分享的问题 https://www.zhihu.com/question/59388458/answer/340351305
    [types.PHONE_FIRST_LOAD_URL](state, url) {
        state.PhoneFirstLoadUrl = url;
    },
    // 服务器当前时间
    [types.CURRENT_DATE](state, currentDate) {
        state.currentDate = currentDate;
    },
    // 引导
    [types.GUIDE](state, guide) {
        state.guide = guide;
        setStorageSync(guideKey, guide);
    },
    // 版本
    [types.IS_UP_APP_VERSION](state, status) {
        state.isUpAppVersion = status;
    },
    // 版本
    [types.APP_VERSION](state, version) {
        state.appVersion = version;
    },
    // 广告跳转到 tabBar 的参数
    [types.AD_PARAMS](state, item) {
        state.adParams[item.key] = item.value;
    },
};
export default {
    state,
    getters,
    actions,
    mutations
};
