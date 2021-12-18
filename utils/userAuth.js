import { getStorageSync, setStorageSync, removeStorageSync } from "./storage";
import {getQueryVariable, delUrlParam, putUrlParam, stringHasValue} from "./common";
import { WECHAT_APP_ID } from "../config/app";

const tokenKey = "member_token";
const initKey = "member_init";

// 获取用户的本地token
export function getToken() {
    return getStorageSync(tokenKey);
}

// 设置用户的本地token
export function setToken(toekn) {
    return setStorageSync(tokenKey, toekn);
}

// 删除登录信息
export function delToken() {
    return removeStorageSync(tokenKey);
}

// 获取用户初始化信息(例如:头像和昵称)
export function getMemberInit() {
    return getStorageSync(initKey);
}

// 设置用户初始化信息(例如:头像和昵称)
export function setMemberInit(obj) {
    return setStorageSync(initKey, obj);
}

// 删除用户初始化信息(例如:头像和昵称)
export function delMemberInit() {
    return removeStorageSync(initKey);
}

/**
 * // 微信授权
 * @param isReset 重置重试次数
 */
export function weChatLogin(isReset) {
    console.log('调用公众号登录');
    // return false;
    let href = window.location.href;
    let reviewRequestCount = parseInt(getQueryVariable("rr_count"));
    let inviteCode = getQueryVariable("invite_code");
    if (isReset || !reviewRequestCount) {
        reviewRequestCount = 1;
    } else {
        //登陆失败重复登陆只限三次
        if (reviewRequestCount > 3) {
            uni.showModal({
                title: '提示',
                content: '登录失败, 请重新登录',
                success: (res) => {
                    if (res.confirm) {
                        weChatLogin(true);
                    }
                }
            });
            return false;
        } else {
            reviewRequestCount++;
        }
    }
    href = delUrlParam(href, "state");
    href = delUrlParam(href, "code");
    href = putUrlParam(href, "rr_count", reviewRequestCount);
    if (stringHasValue(inviteCode)) {
        href = putUrlParam(href, "invite_code", inviteCode);
    }
    // 获取路由地址，后携带当前地址去登录界面
    let redirect = encodeURIComponent(href);
    let url =
        "https://open.weixin.qq.com/connect/oauth2/authorize?appid=" +
        WECHAT_APP_ID +
        "&redirect_uri=" +
        redirect +
        "&response_type=code&scope=snsapi_userinfo&state=sgdc#wechat_redirect";
    window.location.href = url;
}
