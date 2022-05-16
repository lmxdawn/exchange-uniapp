// import { getStorageSync, setStorageSync } from "./storage";

// const langKey = "member_lang";

// 获取本地lang
export function getLang() {
    return uni.getLocale()
    // return getStorageSync(langKey);
}

// 设置本地lang
export function setLang(lang) {
    return uni.setLocale(lang)
    // return setStorageSync(langKey, lang);
}
