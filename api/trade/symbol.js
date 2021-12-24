import request from "../../utils/request";

// 获取交易对列表
export function symbolOrderList(params) {
    return request({
        url: "/trade/symbol/list",
        method: "get",
        params: params
    });
}