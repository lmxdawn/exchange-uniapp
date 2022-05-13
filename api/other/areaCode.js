import request from "../../utils/request";

// 获取电话地区列表
export function areaCodeList(params) {
    return request({
        url: "/other/area-code/list",
        method: "get",
        params: params,
    });
}