import {
    h5Copy,
    hideLoading,
    jumpWebView,
    navigateBack,
    navigateTo,
    navigateToLogin,
    redirectTo,
    reLaunch, showLoading,
    switchTab,
    toast
} from "./utils/common";
import {STATIC_URL} from "./config/app";
import {getToken} from "./utils/userAuth";

export default {
    toast(text, duration, success) {
        toast(text, duration, success)
    },
    px(num) {
        return uni.upx2px(num) + 'px';
    },
    staticUrl() {
        return STATIC_URL;
    },
    reLaunch(path) {
        reLaunch(path)
    },
    navigateTo(path) {
        navigateTo(path)
    },
    redirectTo(path) {
        redirectTo(path)
    },
    navigateToLogin() {
        if (!getToken()) {
            navigateToLogin();
            return false;
        }
        return true;
    },
    loginNavigateTo(path) {
        if (!getToken()) {
            navigateToLogin();
            return false;
        }
        navigateTo(path)
    },
    navigateBack(delta, type, duration) {
        navigateBack(delta, type, duration)
    },
    switchTab(path) {
        switchTab(path)
    },
    jumpWebView(url) {
        jumpWebView(url)
    },
    showLoading(title, mask) {
        showLoading(title, mask)
    },
    hideLoading() {
        hideLoading()
    },
    copyText(data) {
        if (typeof data.success != 'function') {
            data.success = () => {}
        }
        if (typeof data.fail != 'function') {
            data.fail = () => {}
        }
        // #ifdef APP-PLUS
        uni.setClipboardData({
            data: data.data,
            success: data.success,
            fail: data.fail
        });
        // #endif
        // #ifdef H5
        if (h5Copy(data.data)) {
            toast("复制成功");
            data.success()
        } else {
            toast("复制失败, 当前浏览器不支持");
            data.fail();
        }
        // #endif
    }
};