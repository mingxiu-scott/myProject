/**
 * Created by intern on 2017/9/27.
 */

import {
    SAVE_LOCATION
}from "./mutation-types";

export default {
    [SAVE_LOCATION](state,location){
        state.location = location;
    }
}
