import * as types from "../mutation-types";
import {getStorageSync, setStorageSync} from "../../utils/storage"
import {usdtRateRead} from "../../api/trade/usdtRate";
import {symbolRead} from "../../api/trade/symbol";

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
        id: 1,
        name: "--",
    },
    coin: {
        id: 3,
        name: "--",
        usdtPrice: 1
    },
    price: -1,
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
};

// getters
const getters = {
    pair: state => state.pair,
    usdtRate: state => state.usdtRate,
    marketCollect: state => state.marketCollect,
};

// actions
const actions = {
    setPair({state, commit}, data) {
        const params = {
            tradeCoinId: data.tradeCoinId || state.pair.tradeCoin.id,
            coinId: data.coinId || state.pair.coin.id,
        }
        return new Promise((resolve, reject) => {
            symbolRead(params)
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
        state.pair.tradeTotalPrecision = obj.tradeTotalPrecision || 0 // 总量精度
        state.pair.tradePricePrecision = obj.tradePricePrecision || 0 // 价格精度
        state.pair.tradeAmountPrecision = obj.tradeAmountPrecision || 0 // 数量精度
        setStorageSync(pairKey, JSON.stringify(state.pair))
    }
};
export default {
    state,
    getters,
    actions,
    mutations
};
