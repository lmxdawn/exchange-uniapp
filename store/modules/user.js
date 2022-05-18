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
    logout({commit}) {
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
    },
    getUserInfo({commit}) {
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
};
export default {
    state,
    getters,
    actions,
    mutations
};
