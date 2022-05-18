
import { settingAppVersion } from "../api/other/setting";
import store from "../store";
import {toast} from "./common";

const installWgt = path => {
    showWaiting("安装中，请等待......");
    plus.runtime.install(path,{},function(){
        plus.nativeUI.closeWaiting();
        console.log("安装wgt文件成功！");
        plus.nativeUI.alert("应用资源更新完成！",function(){
            plus.runtime.restart();
        });
    },function(e){
        plus.nativeUI.closeWaiting();
        console.log("安装wgt文件失败["+e.code+"]："+e.message);
        plus.nativeUI.alert("安装失败["+e.code+"]："+e.message);
    });
};

const downWgt = downUrl => {
    showWaiting("下载更新包中，请等待......");
    plus.downloader.createDownload( downUrl, {filename:"_doc/update/"}, function(d,status){
        if ( status == 200 ) {
            console.log("下载wgt成功："+d.filename);
            installWgt(d.filename); // 安装wgt包
        } else {
            console.log("下载wgt失败！");
            plus.nativeUI.alert("下载更新包失败！");
        }
        plus.nativeUI.closeWaiting();
    }).start();
};

const showModal = (data, showCancel) => {
    uni.showModal({ //提醒用户更新
        title: "更新提示",
        content: data.content,
        showCancel: showCancel,
        success: (res) => {
            if (res.confirm) {
                switch(uni.getSystemInfoSync().platform){
                    case 'android':
                        if (data.update_type == 1 || data.update_type == 2) {
                            downWgt(data.android_update_path);
                        } else {
                            installWgt(data.android_install_path);
                        }
                        break;
                    case 'ios':
                        if (data.update_type == 1 || data.update_type == 2) {
                            downWgt(data.ios_update_path);
                        } else {
                            // ios 打开自带浏览器
                            showWaiting("如没有安装成功\n请退出APP后重试");
                            plus.runtime.openURL(data.ios_install_path);
                        }
                        break;
                    default:
                        break;
                }
            }
        }
    });
};

const showWaiting = (title) => {
    var opt = {width:"100%",height:"100%",size:14};
    plus.nativeUI.showWaiting(title, opt);
};

/**
 * 强制更新
 */
export function checkAppVersion(isShowModal) {
    try {
        let params = {version: ""};
        // #ifdef APP-PLUS
        plus.runtime.getProperty(plus.runtime.appid,function(inf){
            params = {
                version: inf.version || ""
            };
        // #endif
            store.dispatch("setAppVersion", params.version);
            settingAppVersion(params)
                .then(res => {

                    if (res.code) {
                        return false;
                    }
                    let data = res.data;
                    if (data.isUpdate === 0) {
                        // 没有更新
                        store.dispatch("setIsUpAppVersion", false);
                        if (isShowModal) {
                            toast("当前没有可更新的版本");
                        }
                        return false;
                    }

                    // 有更新
                    store.dispatch("setIsUpAppVersion", true);
                    let showCancel = data.isForceUpdate === 1;
                    // #ifdef APP-PLUS
                    showModal(data, showCancel);
                    // #endif
                })
                .catch(err => {});
        // #ifdef APP-PLUS
        });
        // #endif
    }catch (e) {
        if (isShowModal) {
            toast("当前没有可更新的版本");
        }
    }
}
