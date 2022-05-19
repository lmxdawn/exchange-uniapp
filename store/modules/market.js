import * as types from "../mutation-types";
import {getStorageSync, setStorageSync} from "../../utils/storage"
import {usdtRateRead} from "../../api/trade/usdtRate";
import {pairRead} from "../../api/trade/pair";

// 自选
const marketCollectKey = "marketCollectKey";
let marketCollect = getStorageSync(marketCollectKey) || "[]"
let marketCollectSet = new Set()
if (marketCollect) {
    try {
        marketCollectSet = new Set(JSON.parse(marketCollect))
    } catch (e) {
    }
}

// 汇率
const usdtRateKey = "usdtRateKey";
let usdtRateStr = getStorageSync(usdtRateKey)
let usdtRate = {
    name: "USD",
    symbol: "$",
    price: 0,
    precision: 2,
}
if (usdtRateStr) {
    try {
        let obj = JSON.parse(usdtRateStr)
        usdtRate.name = obj.name || ""
        usdtRate.symbol = obj.symbol || ""
        usdtRate.price = obj.price || 0
        usdtRate.precision = obj.precision || 2
    } catch (e) {
    }
}

// 交易对信息
const pairKey = "pairKey";
let pairStr = getStorageSync(pairKey)
let pair = {
    tradeCoin: {
        id: 3,
        name: "--",
    },
    coin: {
        id: 1,
        name: "--",
        usdtPrice: 1
    },
    price: -1,
    price24: -1,
    rate24: -1,
    tradeTotal24: -1,
    tradeAmount24: -1,
    highest24: -1,
    lowest24: -1,
    tradeTotalPrecision: 0,
    tradePricePrecision: 0,
    tradeAmountPrecision: 0,
}
if (pairStr) {
    try {
        let obj = JSON.parse(pairStr)
        pair.tradeCoin = obj.tradeCoin || {} // 交易币种
        pair.coin = obj.coin || {} // 对标币种
        pair.price = obj.price || -1 // 价格
        pair.price24 = obj.price24 || -1 // 24小时价格
        pair.rate24 = obj.rate24 || -1 // 24小时涨跌幅
        pair.tradeTotal24 = obj.tradeTotal24 || -1 // 24小时交易额
        pair.tradeAmount24 = obj.tradeAmount24 || -1 // 24小时交易量
        pair.highest24 = obj.highest24 || -1 // 24小时最高
        pair.lowest24 = obj.lowest24 || -1 // 24小时最低
        pair.tradeTotalPrecision = obj.tradeTotalPrecision || 0 // 总量精度
        pair.tradePricePrecision = obj.tradePricePrecision || 0 // 价格精度
        pair.tradeAmountPrecision = obj.tradeAmountPrecision || 0 // 数量精度
    } catch (e) {
    }
}


const state = {
    pair: pair,
    usdtRate: usdtRate,
    marketCollect: marketCollectSet,
    tradeIsShowInit: 0, // 是否在交易页面显示的时候重新加载
};

// getters
const getters = {
    pair: state => state.pair,
    usdtRate: state => state.usdtRate,
    marketCollect: state => state.marketCollect,
    tradeIsShowInit: state => state.tradeIsShowInit,
};

// actions
const actions = {
    setPair({state, commit}, data) {
        const params = {
            tradeCoinId: data.tradeCoinId || state.pair.tradeCoin.id,
            coinId: data.coinId || state.pair.coin.id,
        }
        return new Promise((resolve, reject) => {
            pairRead(params)
                .then(res => {
                    if (res.code > 0) {
                        resolve(false)
                        return false
                    }
                    commit("setPair", res.data)
                    resolve(true)
                })
                .catch(() => {
                    resolve()
                })
        })
    },
    setPairCoinId({state, commit}, data) {
        commit("setPairCoinId", data)
        commit("setTradeIsShowInit", 1)
    },
    setTradeIsShowInit({state, commit}, isInit) {
        commit("setTradeIsShowInit", isInit)
    },
    usdtRateSet({state, commit}, name) {
        if (!name) {
            name = state.usdtRate.name
        }
        return new Promise((resolve, reject) => {
            usdtRateRead({
                name: name
            })
                .then(res => {
                    if (res.code !== 0) {
                        resolve(false)
                        return false
                    }
                    let obj = {
                        name: name,
                        symbol: res.data.symbol,
                        price: res.data.price,
                        precision: res.data.precision,
                    }
                    commit(types.USDT_RATE_SET, obj);
                    resolve(true)
                })
                .catch(() => {
                    reject()
                })
        })
    },
    marketCollectSet({commit}, id) {
        commit(types.MARKET_COLLECT_SET, id);
    },

};

// mutations
const mutations = {
    [types.USDT_RATE_SET](state, obj) {
        state.usdtRate.name = obj.name || ""
        state.usdtRate.symbol = obj.symbol || ""
        state.usdtRate.price = obj.price || 0
        state.usdtRate.precision = obj.precision || 2
        setStorageSync(usdtRateKey, JSON.stringify(state.usdtRate))
    },
    [types.MARKET_COLLECT_SET](state, id) {
        if (state.marketCollect.has(id)) {
            state.marketCollect.delete(id)
        } else {
            state.marketCollect.add(id);
        }
        setStorageSync(marketCollectKey, JSON.stringify([...state.marketCollect]))
    },
    ["setPair"](state, obj) {
        state.pair.tradeCoin = obj.tradeCoin || {} // 交易币种
        state.pair.coin = obj.coin || {} // 对标币种
        state.pair.price = obj.price || -1 // 价格
        state.pair.price24 = obj.price24 || -1 // 24小时价格
        state.pair.rate24 = obj.rate24 || -1 // 24小时涨跌幅
        state.pair.tradeTotal24 = obj.tradeTotal24 || -1 // 24小时交易额
        state.pair.tradeAmount24 = obj.tradeAmount24 || -1 // 24小时交易量
        state.pair.highest24 = obj.highest24 || -1 // 24小时最高
        state.pair.lowest24 = obj.lowest24 || -1 // 24小时最低
        state.pair.tradeTotalPrecision = obj.tradeTotalPrecision || 0 // 总量精度
        state.pair.tradePricePrecision = obj.tradePricePrecision || 0 // 价格精度
        state.pair.tradeAmountPrecision = obj.tradeAmountPrecision || 0 // 数量精度
        setStorageSync(pairKey, JSON.stringify(state.pair))
    },
    ["setPairCoinId"](state, obj) {
        state.pair.coin.id = obj.coinId
        state.pair.tradeCoin.id = obj.tradeCoinId
    },
    ["setTradeIsShowInit"](state, isInit) {
        state.tradeIsShowInit = isInit
    }
};
export default {
    state,
    getters,
    actions,
    mutations
};
