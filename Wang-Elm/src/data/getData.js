/**
 * Created by intern on 2017/9/8.
 */

import fetch from '@/config/fetch';

// 获取定位
export const getPosition = function () {

    return  navigator.geolocation ? new Promise(function (resolve, reject) {
        //一个异步的操作
        navigator.geolocation.getCurrentPosition(resolve, reject, {timeout: 10000,maximumAge:1e4});

    }) : Promise.reject('浏览器不支持地理定位');

};

// 获取地址数据
export const getAddress = (latitude, longitude) => fetch('/bgs/poi/reverse_geo_coding', {latitude, longitude});

//获取天气
export const getWeather = (latitude,longitude) =>fetch('/bgs/weather/current',{latitude,longitude});


export const getEntries=(latitude,longitude,option) =>fetch('/shopping/v2/entries',
    {
        latitude,
        longitude,
        'templates[]': option
    });



