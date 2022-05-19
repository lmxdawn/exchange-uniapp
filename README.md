# exchange-uniapp

> Java 交易所源码，前端APP使用uniapp开发，后端使用java开发，采用 Spring Cloud Alibaba 微服务架构，撮合引擎使用Disruptor高效内存队列，所有服务可以实现分布式部署，websocket推送通过增加一层路由服务实现分布式部署

# 说明

> *之前由于uniapp的闪屏一度准备放弃，暂时解决闪屏问题，重新开始开发*

[uni-app切换页面闪屏或者白屏](https://ask.dcloud.net.cn/question/73807)

[服务端代码，点击跳转](https://github.com/lmxdawn/exchange)

# websocket的分布式流程

- 开启websocket的连接
- 当websocket连接成功时
    1. 需要定时发送心跳检测
    2. 需要发送登录的消息，这个时候需要访问 ws-rule 路由服务，通过路由去分配这个用户属于哪个 ws 服务，这样发送消息的时候直接通过路由服务发送，就可以找到这个用户属于哪一个ws服务，从而实现ws的分布式

# 示例图

![df078ac8c0ca4f76ed88b1928f66cfd](https://user-images.githubusercontent.com/21293193/147812493-d3270188-9e32-4c32-92fa-9b638ecddc64.jpg)
![f4d33b5af2a5605d8ba94eb3a294270](https://user-images.githubusercontent.com/21293193/147812500-e485f7ab-e823-4d39-b26d-cafb2258a122.jpg)
