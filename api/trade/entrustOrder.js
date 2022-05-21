import request from "../../utils/request";

// 委托单列表
export function entrustOrderList(params) {
    return request({
        url: "/trade/entrust-order/list",
        method: "get",
        params: params
    });
}

// 委托单详情
export function entrustOrderRead(params) {
    return request({
        url: "/trade/entrust-order/read",
        method: "get",
        params: params
    });
}
// 发起委托单
export function entrustOrderCreate(data) {
    return request({
        url: "/trade/entrust-order/create",
        method: "post",
        data: data
    });
}