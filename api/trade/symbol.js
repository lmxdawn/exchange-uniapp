import request from "../../utils/request";

// 获取交易对列表
export function symbolList(params) {
    return request({
        url: "/trade/symbol/list",
        method: "get",
        params: params
    });
}
// 获取交易对
export function symbolRead(params) {
    return request({
        url: "/trade/symbol/read",
        method: "get",
        params: params
    });
}