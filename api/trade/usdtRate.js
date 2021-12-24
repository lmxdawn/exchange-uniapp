import request from "../../utils/request";

// 获取usdt汇率列表
export function usdtRateList(params) {
    return request({
        url: "/trade/usdt-rate/list",
        method: "get",
        params: params
    });
}

// 获取usdt汇率详情
export function usdtRateRead(params) {
    return request({
        url: "/trade/usdt-rate/read",
        method: "get",
        params: params
    });
}