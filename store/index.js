import Vue from "vue";
import Vuex from "vuex";
import actions from "./actions";
import getters from "./getters";
import app from "./modules/app";
import user from "./modules/user";
import market from "./modules/market";

Vue.use(Vuex);

const debug = process.env.NODE_ENV !== "production";

export default new Vuex.Store({
    actions,
    getters,
    modules: {
        app,
        user,
        market,
    },
    strict: debug
    // plugins: debug ? [createLogger()] : []
});
