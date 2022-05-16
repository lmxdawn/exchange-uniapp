import * as types from "../mutation-types";
import {loginInfo} from "../../api/user/member";
import {getToken, delToken, getMemberInit, delMemberInit, weChatLogin, setMemberInit} from "../../utils/userAuth";
import {reLaunch, isWeChatWebView} from "../../utils/common";

const member = getMemberInit();
const state = {
    memberInfo: {
        memberId: parseInt(member.memberId) || 0,
        name: member.name || "",
        avatar: member.avatar || "",
        tel: member.tel || "",
        telAreaCode: member.telAreaCode || 0,
        email: member.email || "",
        remark: member.remark || "",
        isPwd: member.isPwd || 0,
        isPayPwd: member.isPayPwd || 0,
        isGoogleKey: member.isGoogleKey || 0,
    },
    memberBindingPageStatus: false,
    memberLoginPageStatus: false,
};

// getters
const getters = {
    memberInfo: state => state.memberInfo,
    memberBindingPageStatus: state => state.memberBindingPageStatus,
    memberLoginPageStatus: state => state.memberLoginPageStatus,
};

// actions
const actions = {
    logout({dispatch,commit}, isNoToLoginPage) {
        let info = {
            memberId: 0,
            name: "",
            avatar: "",
            tel: "",
            telAreaCode: 0,
            email: "",
            remark: "",
            isPwd: 0,
            isPayPwd: 0,
            isGoogleKey: 0,
        };
        commit(types.MEMBER_INFO, info);
        commit(types.MEMBER_CLEAR_LOGIN);
        if (isNoToLoginPage) {
            dispatch("toLoginPage");
        }
    },
    getUserInfo({dispatch, commit}, invite_code) {
        return new Promise((resolve, reject) => {
            if (!getToken()) {
                resolve({});
                return;
            }
            // 获取用户信息
            loginInfo()
                .then(res => {
                    if (res.code === 0) {
                        let data = res.data || {};
                        let info = {
                            memberId: parseInt(data.memberId) || 0,
                            name: data.name || "",
                            avatar: data.avatar || "",
                            tel: data.tel || "",
                            telAreaCode: data.telAreaCode || 0,
                            email: data.email || "",
                            remark: data.remark || "",
                            isPwd: data.isPwd || 0,
                            isPayPwd: data.isPayPwd || 0,
                            isGoogleKey: data.isGoogleKey || 0,
                        };
                        commit(types.MEMBER_INFO, info);
                        // 没有绑定手机号，并且没有绑定邮箱
                        if (!data.tel && !data.email) {
                            // 跳转到填写信息页面
                            setTimeout(() => {
                                dispatch("toBindingTelPage", invite_code);
                            }, 800);
                            return;
                        }
                    }
                    resolve(res);
                })
                .catch(err => {
                    reject(err)
                });

        });
    },
    setMemberIsPayPwd({ commit }, isPayPwd) {
        commit("setMemberIsPayPwd", isPayPwd);
    },
    toBindingTelPage({ commit }, invite_code) {
        commit(types.MEMBER_BINDING_TEL_PAGE, invite_code);
    },
    setBindingTelPageStatus({ commit }, status) {
        commit(types.MEMBER_BINDING_TEL_PAGE_STATUS, status);
    },
    toLoginPage({ commit }, invite_code) {
        commit(types.MEMBER_LOGIN_PAGE, invite_code);
    },
    setLoginPageStatus({ commit }, status) {
        commit(types.MEMBER_LOGIN_PAGE_STATUS, status);
    },
    setRegisterInviteCode({ commit }, value) {
        commit(types.MEMBER_REGISTER_INVITE_CODE, value);
    },
};

// mutations
const mutations = {
    //清空信息
    [types.MEMBER_CLEAR_LOGIN](state) {
        delToken();
        delMemberInit();
    },
    //设置用户信息
    [types.MEMBER_INFO](state, memberInfo) {
        state.memberInfo = memberInfo;
        setMemberInit(memberInfo);
    },
    //设置用户是否设置了支付密码
    ["setMemberIsPayPwd"](state, isPayPwd) {
        state.memberInfo.isPayPwd = isPayPwd;
        setMemberInit(state.memberInfo);
    },
    //当前是否在绑定手机号的页面
    [types.MEMBER_BINDING_TEL_PAGE](state, invite_code) {
        // 如果在绑定页面, 则不要重复跳转
        if (state.memberBindingPageStatus) {
            return false;
        }
        state.memberBindingPageStatus = true;
        reLaunch("login/binding?invite_code=" + invite_code);
    },
    //当前是否在绑定手机号的页面
    [types.MEMBER_BINDING_TEL_PAGE_STATUS](state, status) {
        state.memberBindingPageStatus = status
    },
    //当前是否在登录的页面
    [types.MEMBER_LOGIN_PAGE](state, invite_code) {
        if (!isWeChatWebView()) {
            console.log("跳转登录页面", state.memberLoginPageStatus, isWeChatWebView());
            // 如果在登录页面, 则不要重复跳转
            if (state.memberLoginPageStatus) {
                return false;
            }
            state.memberLoginPageStatus = true;
            reLaunch("login/login?invite_code=" + invite_code);
        } else {
            console.log("微信跳转");
            weChatLogin();
        }
    },
    //当前是否在登录的页面
    [types.MEMBER_LOGIN_PAGE_STATUS](state, status) {
        state.memberLoginPageStatus = status
    },
};
export default {
    state,
    getters,
    actions,
    mutations
};
