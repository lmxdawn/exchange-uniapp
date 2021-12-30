import request from "../../utils/request";

// 获取用户钱包列表
export function memberCoinList() {
    return request({
        url: "/user/member-coin/list",
        method: "get"
    });
}
// 获取用户钱包余额
export function memberCoinBalance(params) {
    return request({
        url: "/user/member-coin/balance",
        method: "get",
        params: params
    });
}