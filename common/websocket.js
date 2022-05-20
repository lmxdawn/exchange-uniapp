import {WS_MARKET_LISTEN,WS_ENTRUST_ORDER_LISTEN} from "../constant/wsListenConstant";

export default class socketIO {
    constructor(time) {
        this.wsUrl = "" // 链接地址
        this.wsPort = "" // 端口
        this.socketOpen = false //避免重复连接
        this.socketMsgQueue = [] // socket需要发送的消息队列
        this.connectNum = 1 // 重连次数
        this.connectMaxNum = 10 // 重连最大次数
        //心跳检测
        this.timeout = time ? time : 2000 //多少秒执行检测
        this.heartbeatInterval = null //检测服务器端是否还活着
        this.reconnectTimeOut = null //重连之后多久再次重连
        this.reconnectLock = false // 重连锁，防止重复重连

        // 用户相关
        this.memberId = 0 // 用户ID
        this.token = "" // 用户token
    }

    // 设置配置
    setConf(wsUrl, wsPort, memberId, token) {
        this.wsUrl = wsUrl
        this.wsPort = wsPort
        this.memberId = memberId
        this.token = token
    }

    // 初始化
    connectSocketInit() {

        // 启动连接
        this.connectSocket()

        // 成功连接监听
        this.onSocketOpen()

        // 监听正常消息
        this.onSocketMessage()

        // 监听错误
        this.onSocketError()

        // 监听关闭
        this.onSocketClose()
    }

    // 启动连接
    connectSocket() {
        const wsUrl = `ws://${this.wsUrl}:${this.wsPort}/ws`
        uni.connectSocket({
            url: wsUrl,
        });
    }

    // 监听连接成功的消息
    onSocketOpen() {
        uni.onSocketOpen((res) => {
            console.log("WebSocket连接正常！");
            // 清除定时器
            clearInterval(this.reconnectTimeOut)
            clearInterval(this.heartbeatInterval)
            this.connectNum = 1
            this.socketOpen = true;
            for (let i = 0; i < this.socketMsgQueue.length; i++) {
                this.Send(this.socketMsgQueue[i]);
            }
            // 清空队列
            this.socketMsgQueue = [];

            // 启动心跳
            this.Start();

            // 发送登录
            this.SendLogin()
        });
    }

    // 监听服务端发送过来的消息
    onSocketMessage() {
        uni.onSocketMessage((res) => {
            console.log('收到服务器内容：' + res.data);
            const data = JSON.parse(res.data)
            const type = parseInt(data.type)
            // type:（0：心跳，1：登录成功的返回，2：行情的推送，3：委托订单变化）
            switch (type) {
                case 0:
                    console.log("服务端心跳")
                    break
                case 1:
                    console.log("登录成功消息")
                    break
                case 2:
                    console.log("行情推送来了", data)
                    uni.$emit(WS_MARKET_LISTEN, JSON.parse(data.data))
                    break
                case 3:
                    console.log("委托订单的变化通知来了", data)
                    uni.$emit(WS_ENTRUST_ORDER_LISTEN, JSON.parse(data.data))
                    break
            }
        });
    }

    // 监听关闭
    onSocketClose() {
        // 这里仅是事件监听【如果socket关闭了会执行】
        uni.onSocketClose(() => {
            console.log('WebSocket 已关闭！');
            // 执行重连逻辑
            this.Reconnect();
        });
    }

    // 监听错误
    onSocketError() {
        uni.onSocketError(() => {
            console.log('WebSocket连接打开失败，请检查！');
            // 执行重连逻辑
            this.Reconnect();
        });
    }

    // 主动关闭socket连接
    Close() {
        if (!this.socketOpen) {
            return
        }
        uni.closeSocket();
    }

    //发送消息。type：（0：心跳，1：用户登录，2：游客登录）
    Send(data, success) {
        // console.log("data---------->", data);
        // 注：只有连接正常打开中 ，才能正常成功发送消息
        if (!this.socketOpen) {
            // 没有在线，加入队列
            this.socketMsgQueue.push(data)
            return false
        }
        if (typeof success !== 'function') {
            success = () => {
                // console.log("消息发送成功");
            }
        }
        uni.sendSocketMessage({
            data: JSON.stringify(data),
            success
        });
    }

    //发送登录消息
    SendLogin(success) {
        let obj = {
            type: this.token ? 1 : 2,
            memberId: this.memberId,
            data: this.token,
        }
        this.Send(obj, success)
    }

    //发送心跳消息
    SendHeartbeat(success) {
        let obj = {
            type: 0,
            data: new Date(),
        }
        this.Send(obj, success)
    }

    //开启心跳检测
    Start() {
        if (this.heartbeatInterval) {
            return false
        }
        this.heartbeatInterval = setInterval(() => {
            this.SendHeartbeat()
        }, this.timeout)
    }

    //重新连接
    Reconnect() {
        // 已经连接了
        if (this.socketOpen) {
            return false
        }
        // 已经在重连了
        if (this.reconnectLock) {
            return false
        }
        this.reconnectLock = true
        this.socketOpen = false;
        // 停止发送心跳
        clearInterval(this.heartbeatInterval)
        // 停止重连定时
        clearInterval(this.reconnectTimeOut)

        if (this.connectNum > this.connectMaxNum) {
            this.connectNum = 1
            return false
        }

        // console.log(`WebSocket连接失败，正尝试第${this.connectNum}次连接`)

        this.reconnectTimeOut = setInterval(() => {
            this.connectSocketInit();
        }, this.timeout)
        this.connectNum += 1
        this.reconnectLock = false
    }
}