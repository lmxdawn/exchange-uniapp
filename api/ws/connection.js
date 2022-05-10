import request from "../../utils/request";

// 路由登录
export function connectionLogin(data) {
    return request({
        url: "/ws-route/connection/login",
        method: "post",
        data: data
    });
}