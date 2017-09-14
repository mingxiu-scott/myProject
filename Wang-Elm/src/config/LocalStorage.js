/**
 * Created by intern on 2017/9/12.
 */
export const setStorage = (key, value)=> {
    if (!key)return;
    if (typeof value !== 'string') {
        value = JSON.stringify(value);
    }
    window.localStorage.setItem(key, value);
};

export const getStorage = (key)=> {
    var res = window.localStorage.getItem(key);
    return JSON.parse(res);
};
