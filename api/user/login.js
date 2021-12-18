import request from "../../utils/request";

// 密码登录
export function byPwd(data) {
    return request({
        url: "/user/login/byPwd",
        method: "post",
        data: data
    });
}
// 微信公众号登录
export function byWeChatWap(data) {
    return request({
        url: "/user/login/byWeChatWap",
        method: "post",
        data: data
    });
}