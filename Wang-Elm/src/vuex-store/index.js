/**
 * Created by intern on 2017/9/22.
 */

// import Vuex from "vuex";
//
// import Vue from 'vue';
//
// Vue.use(Vuex);
//
// export default new Vuex.Store({
//     state:{
//         count:0,
//     },
//     mutations:{
//         increment: state=> state.count++,
//         decrement: state=> state.count--,
//     }
// });

import Vuex from 'vuex';

import Vue from 'vue';

Vue.use(Vuex);

export default new Vuex.Store({
    state : {
        count: 0,
    },
    mutations:{
        increment : state => state.count++,
        decrement : state => state.count--,
    }
})
