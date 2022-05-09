import request from "../../utils/request";

// 获取交易对列表
export function pairList(params) {
    return request({
        url: "/trade/pair/list",
        method: "get",
        params: params
    });
}
// 获取交易对
export function pairRead(params) {
    return request({
        url: "/trade/pair/read",
        method: "get",
        params: params
    });
}