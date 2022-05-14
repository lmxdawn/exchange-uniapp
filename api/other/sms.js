import request from "../../utils/request";

// 发送短信
export function smsSend(data) {
    return request({
        url: "/other/sms/send",
        method: "post",
        data: data,
    });
}