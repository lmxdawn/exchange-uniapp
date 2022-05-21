import request from "../../utils/request";

// 委托单明细
export function entrustOrderDetailList(params) {
    return request({
        url: "/trade/entrust-order-detail/list",
        method: "get",
        params: params
    });
}