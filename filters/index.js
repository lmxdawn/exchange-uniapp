import {formatNum} from "../utils/common";

/**
 * 时间格式化
 */
export function parseTime(time, cFormat, xArr, aArr) {

    if ((time + "").length === 10) {
        time = +time * 1000;
    }

    xArr = xArr && xArr.length === 2 ? xArr : ['AM', 'PM']
    aArr = aArr && aArr.length === 7 ? aArr : ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday", "Sunday"]

    const format = cFormat || "{y}-{m}-{d} {h}:{i}:{s}";
    let date;
    if (typeof time === "object") {
        date = time;
    } else if (!isNaN(parseInt(time))){
        date = new Date(parseInt(time));
    } else {
        date = new Date(time);
    }
    const formatObj = {
        y: date.getFullYear(),
        m: date.getMonth() + 1,
        d: date.getDate(),
        h: date.getHours(),
        i: date.getMinutes(),
        s: date.getSeconds(),
        a: date.getDay()
    };
    const timeStr = format.replace(/{(y|m|d|h|i|s|a|x)+}/g, (result, key) => {
        let value = formatObj[key];
        if (key === "x") {
            let h = formatObj['h']
            return h <= 12 ? xArr[0] : xArr[1]
        }
        if (key === "a")
            return aArr[value - 1];
        if (result.length > 0 && value < 10) {
            value = "0" + value;
        }
        return value || 0;
    });
    return timeStr;
}

/**
 * 格式化昵称
 * @returns {void | string | *}
 * @param name
 */
export function formatName(name) {
    return name.substr(1, 1) + "***" + name.substr(name.length - 1, 1);
}


/**
 * 格式化手机号
 * @returns {void | string | *}
 * @param num
 */
export function formatTel(num) {
    return formatNum(num);
}
