import request from "../../utils/request";

// APP版本配置
export function settingAppVersion() {
    return request({
        url: "/other/setting/appVersion",
        method: "get"
    });
}
// APP配置
export function settingApp() {
    return request({
        url: "/other/setting/app",
        method: "get"
    });
}