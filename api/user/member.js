import request from "../../utils/request";

// 获取登录的用户信息
export function loginInfo() {
    return request({
        url: "/user/member/loginInfo",
        method: "get"
    });
}