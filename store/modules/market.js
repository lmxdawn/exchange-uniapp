import * as types from "../mutation-types";
import {getStorageSync, setStorageSync} from "../../utils/storage"
import {usdtRateRead} from "../../api/trade/usdtRate";

const marketCollectKey = "marketCollectKey";
let marketCollect = getStorageSync(marketCollectKey) || "[]"
let marketCollectSet = new Set()
if (marketCollect) {
    try {
        marketCollectSet = new Set(JSON.parse(marketCollect))
    }catch (e) {}
}

// 汇率
const usdtRateKey = "usdtRateKey";
let usdtRateStr = getStorageSync(usdtRateKey)
let usdtRate = {
    name: "USD",
    symbol: "$",
    price: 1,
    precision: 2,
}
if (usdtRateStr) {
    try {
        let tmpUsdtRate = JSON.parse(usdtRateStr)
        usdtRate.name = tmpUsdtRate.name || ""
        usdtRate.symbol = tmpUsdtRate.symbol || ""
        usdtRate.price = tmpUsdtRate.price || 0
        usdtRate.precision = tmpUsdtRate.precision || 2
    }catch (e) {}
}


const state = {
    usdtRate: usdtRate,
    marketCollect: marketCollectSet,
};

// getters
const getters = {
    usdtRate: state => state.usdtRate,
    marketCollect: state => state.marketCollect,
};

// actions
const actions = {
    usdtRateSet({state,commit}, name) {
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
};
export default {
    state,
    getters,
    actions,
    mutations
};
