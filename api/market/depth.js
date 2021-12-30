import request from "../../utils/request";

// 获取行情深度
export function marketDepthList(params) {
    return request({
        url: "/market/depth/list",
        method: "get",
        params: params
    });
}