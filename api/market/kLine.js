import request from "../../utils/request";

// 获取历史K线
export function marketKLineList(params) {
    return request({
        url: "/market/kLine/list",
        method: "get",
        params: params
    });
}