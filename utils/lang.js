import { getStorageSync, setStorageSync } from "./storage";

const langKey = "lang";

// 获取语言
export function getLang() {
    return getStorageSync(langKey) || "en";
}

// 设置语言
export function setLang(lang) {
    return setStorageSync(langKey, lang);
}
