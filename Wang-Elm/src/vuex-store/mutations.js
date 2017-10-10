/**
 * Created by intern on 2017/9/27.
 */

import {
    SAVE_LOCATION,
    ADD_CAR,
    REDUCE_CAR
}from "./mutation-types";

export default {
    [SAVE_LOCATION](state,location){
        state.location = location;
    },
    [ADD_CAR](state,{shopId, foodId, name,original_price,price,spec,index,index2}){

        let car = state.carList;

        let shop = car[shopId] = (car[shopId] || {});

        if (shop[foodId]){

            shop[foodId].count += 1;

        }else {
            shop[foodId] = {
                name,
                original_price,
                price,
                spec,
                index,
                index2,
                count: 1,
            }
        }
        state.carList = {...car};
    },
    [REDUCE_CAR](state,{shopId,foodId}){

        let car = state.carList;

        let shop = car[shopId];

        if (shop[foodId].count != 0){
            shop[foodId].count -= 1;

        }else{

            delete shop[foodId];
        }
        state.carList = {...car};
    }
}


