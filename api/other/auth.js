import request from "../../utils/request";

// 手机号注册
export function registerByTel(data) {
    return request({
        url: "/user/register/byTel",
        method: "post",
        data: data,
    });
}

// 邮箱注册
export function registerByEmail(data) {
    return request({
        url: "/user/register/byEmail",
        method: "post",
        data: data,
    });
}

// 密码登录
export function loginByPwd(data) {
    return request({
        url: "/user/login/byPwd",
        method: "post",
        data: data,
    });
}