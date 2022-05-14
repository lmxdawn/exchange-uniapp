import request from "../../utils/request";

// 发送邮件
export function emailSend(data) {
    return request({
        url: "/other/email/send",
        method: "post",
        data: data,
    });
}