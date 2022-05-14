import {API_URL} from '../config/app.js'
import {getToken} from './userAuth.js'
import {queryParams, toast} from './common.js'
import store from '../store'

const request = (obj) => {

    obj.url = API_URL + obj.url;

    // 获取用户本地保存的token
    let token = getToken() || "zm0SVr-J1wtBjLsDq8dbu5PSXsM";
    if (token) {
        obj.header = {};
        obj.header['x-token'] = token
        obj.header['appName'] = process.env.VUE_APP_PLATFORM
    }
    obj.params = obj.params || {};
    if (!obj.params.lang) {
        obj.params.lang = uni.getLocale()
    }
    if (obj.data && !obj.data.lang) {
        obj.data.lang = uni.getLocale()
    }
    if (obj.params) {
        obj.url = obj.url + queryParams(obj.params, true);
    }
    return new Promise((resolve, reject) => {
        uni.request({
            url: obj.url,
            method: obj.method || "get",
            data: obj.data,
            dataType: 'json',
            header: obj.header
        }).then(data => {
            let [err, res] = data;
            let resData = res.data || {};
            if (res.statusCode !== 200) {
                reject(err);
            } else {
                // 如果是登录失效
                if (resData.code === 2) {
                    store.dispatch("logout", false);
                }
                resolve(resData);
            }
        }).catch(err => {
            return reject(err);
        });
    });
};

export default request
