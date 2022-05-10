let API_URL = "";
// 上传文件的地址
const UPLOAD_URL = "http://up-z2.qiniu.com";
// 静态url地址
const STATIC_URL = "http://static.shop.test.cn";
// 获取地址需要的地图key
const AM_AP_KEY = "9cb6501819ae8b7c26e671dd7de3eaf9";
// 微信公众号
const WECHAT_APP_ID = "wx1189ab73b2da38b8";
// 环境判断
if (process.env.NODE_ENV === 'development') {
    // 测试
    API_URL = "http://127.0.0.1:9001";
} else {
    // 正式
    API_URL = "http://api.zhuanghuatianjiu.com.cn";
}
export {
    API_URL,
    UPLOAD_URL,
    STATIC_URL,
    AM_AP_KEY,
    WECHAT_APP_ID,
}