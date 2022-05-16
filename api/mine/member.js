import request from "../../utils/request";

// 修改登录密码
export function reviseLoginPwd(data) {
    return request({
        url: "/user/member/reviseLoginPwd",
        method: "post",
        data: data,
    });
}

// 修改支付密码
export function revisePayPwd(data) {
    return request({
        url: "/user/member/revisePayPwd",
        method: "post",
        data: data,
    });
}

// 设置支付密码
export function setPayPwd(data) {
    return request({
        url: "/user/member/setPayPwd",
        method: "post",
        data: data,
    });
}