// 跳转
export function navigateTo(path, animationType = "") {
    let obj = {
        url: "/pages/" + path,
    }
    // #ifndef APP-PLUS
    animationType = ""
    // #endif
    if (animationType) {
        obj.animationType = animationType
    }
    uni.navigateTo(obj);
}

// 跳转到登录页面
export function navigateToLogin() {
    uni.getProvider({
        service: 'oauth',
        success: (res) => {
            if (~res.provider.indexOf('weixin')) {
                navigateTo("login/wxMiniApp");
            }
        },
        fail: () => {
            toast("未支持的平台")
        }
    });
}

// 跳转
export function redirectTo(path) {
    uni.redirectTo({
        url: "/pages/" + path
    });
}

// 跳转
export function switchTab(path) {
    uni.switchTab({
        url: "/pages/" + path
    });
}

// 跳转
export function reLaunch(path) {
    uni.reLaunch({
        url: "/pages/" + path
    });
}

// 返回上级页面
export function navigateBack(delta, type, duration) {
    uni.navigateBack({
        delta: delta,
        animationType: type,
        animationDuration: duration
    });
}

// 如果可以返回，则返回，否则刷新
export function isBackNavigateBack(path) {
    // 获取当前路由栈深度
    let pages = getCurrentPages()
    if (pages.length === 1) {
        reLaunch(path)
        return false
    }
    navigateBack()
}

// 设置标题栏
export function setNavigationBarTitle(title) {
    uni.setNavigationBarTitle({
        title: title
    });
}

// 跳转webView
export function jumpWebView(url) {
    url = encodeURIComponent(url);
    navigateTo("utils/webView?url=" + url)
}

/**
 * 自动消失的提示窗
 */
export function toast(msg, duration, success) {
    uni.showToast({
        title: msg,
        icon: success ? 'success' : 'none',
        duration: duration || 2000
    })
}

/**
 * 显示加载
 */
export function showLoading(title, mask) {
    uni.showLoading({
        title: title || '加载中',
        mask: mask || false
    });
}

/**
 * 隐藏加载
 */
export function hideLoading() {
    uni.hideLoading();
}

/**
 * 将对象转为url参数
 * @param data
 * @param isPrefix
 */
export function queryParams(data, isPrefix = false) {
    let prefix = isPrefix ? '?' : '';
    let _result = [];
    for (let key in data) {
        let value = data[key];
        // 去掉为空的参数
        if (['', undefined, null].includes(value)) {
            continue
        }
        if (value.constructor === Array) {
            value.forEach(_value => {
                _result.push(encodeURIComponent(key) + '[]=' + encodeURIComponent(_value))
            })
        } else {
            _result.push(encodeURIComponent(key) + '=' + encodeURIComponent(value))
        }
    }

    return _result.length ? prefix + _result.join('&') : ''
}

export function isNullOrEmpty(value) {
    //是否为空
    return (value === null || value === '' || value === undefined) ? true : false;
}

export function trim(value) {
    //去空格
    return value.replace(/(^\s*)|(\s*$)/g, "");
}

export function isMobile(value) {
    //是否为手机号
    return /^(?:13\d|14\d|15\d|16\d|17\d|18\d|19\d)\d{5}(\d{3}|\*{3})$/.test(value);
}

export function isFloat(value) {
    //金额，只允许保留两位小数
    return /^([0-9]*[.]?[0-9])[0-9]{0,1}$/.test(value);
}

export function isNum(value) {
    //是否全为数字
    return /^[0-9]+$/.test(value);
}

export function checkPwd(value) {
    //密码为8~20位数字和字母组合
    return /^(?![0-9]+$)(?![a-zA-Z]+$)[0-9A-Za-z]{8,20}$/.test(value);
}

export function formatNum(num) {
    //格式化手机号码
    if (isMobile(num)) {
        num = num.replace(/^(\d{3})\d{4}(\d{4})$/, '$1****$2')
    }
    return num;
}

export function rmoney(money) {
    //金额格式化
    return parseFloat(money).toFixed(2).toString().split('').reverse().join('').replace(/(\d{3})/g, '$1,').replace(
        /\,$/, '').split('').reverse().join('');
}

export function h5Copy(content) {

    if (!document.queryCommandSupported('copy')) {
        // 不支持
        return false
    }
    let textarea = document.createElement("textarea");
    textarea.value = content;
    textarea.readOnly = "readOnly";
    document.body.appendChild(textarea);
    textarea.select(); // 选择对象
    textarea.setSelectionRange(0, content.length); //核心
    let result = document.execCommand("copy"); // 执行浏览器复制命令
    textarea.remove();
    return result

}

export function getQueryVariable(variable) {
    var query = window.location.search.substring(1);
    var vars = query.split("&");
    for (var i=0;i<vars.length;i++) {
        var pair = vars[i].split("=");
        if(pair[0] == variable){return pair[1];}
    }
    return(false);
}
/**
 * 添加参数 有的话会覆盖
 * @param url
 * @param ref
 * @param value
 * @returns {string}
 */
export function putUrlParam(url, ref, value) {
    // 如果没有参数
    if (url.indexOf("?") === -1) {
        return url + "?" + ref + "=" + value;
    }
    // 如果不包括此参数
    if (url.indexOf(ref) === -1) {
        return url + "&" + ref + "=" + value;
    }
    let arr_url = url.split("?");
    let base = arr_url[0];
    let arr_param = arr_url[1].split("&");

    for (let i = 0; i < arr_param.length; i++) {
        let paired = arr_param[i].split("=");
        if (paired[0] === ref) {
            paired[1] = value;
            arr_param[i] = paired.join("=");
            break;
        }
    }
    return base + "?" + arr_param.join("&");
}

/**
 * 删除指定的参数
 * @param url
 * @param ref
 * @returns {string|*}
 */
export function delUrlParam(url, ref) {
    // 如果不包括此参数
    if (url.indexOf(ref) === -1 || url.indexOf("?") === -1) {
        return url;
    }

    let arr_url = url.split("?");
    let base = arr_url[0];
    let arr_param = arr_url[1].split("&");
    let index = -1;
    for (let i = 0; i < arr_param.length; i++) {
        let paired = arr_param[i].split("=");
        if (paired[0] === ref) {
            index = i;
            break;
        }
    }
    if (index === -1) {
        return url;
    } else {
        arr_param.splice(index, 1);
        return base + "?" + arr_param.join("&");
    }
}

//当前是否再微信浏览器中
export function isWeChatWebView() {
    // #ifdef H5
    // window.navigator.userAgent属性包含了浏览器类型、版本、操作系统类型、浏览器引擎类型等信息，这个属性可以用来判断浏览器类型
    let ua = window.navigator.userAgent.toLowerCase();
    // 通过正则表达式匹配ua中是否含有MicroMessenger字符串
    if (ua.match(/MicroMessenger/i) == 'micromessenger') {
        return true
    }
    console.log(ua);
    // #endif
    return false
}
/**
 * @return {boolean}
 */
export function stringHasValue(content) {
    if (!content) {
        return false;
    }
    return !(
        content === "" ||
        content === undefined ||
        content === null ||
        content === "undefined"
    );
}
