/**
 * Created by intern on 2017/9/22.
 */

import Vuex from 'vuex';
import Vue from 'vue';
import mutations from "./mutations";


Vue.use(Vuex);

const state = {
    location: null,
};

export default new Vuex.Store({
    state,
    mutations,
})
