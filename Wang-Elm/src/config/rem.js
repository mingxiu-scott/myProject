/**
 * Created by intern on 2017/9/13.
 */

// ;(function (window, document) {
//     /**
//      * 设置meta viport
//      */
//
//     var recalculate = function () {
//
//         var dpr = Math.floor(window.devicePixelRatio) || 1;
//
//         var html = document.documentElement;
//
//         var scale = 1 / dpr;
//
//         var metaEl = document.createElement('meta');
//
//         metaEl.setAttribute('name', 'viewport');
//
//         metaEl.setAttribute('content', 'width=' + 'device-width' + ',initial-scale=' + scale + ',maximum-scale=' + scale + ',minimum-scale=' + scale + ',user-scalable=no');
//
//         document.head.appendChild(metaEl);
//
//         html.setAttribute('data-dpr', dpr);
//
//         var rem = 75;
//
//         if (html.clientWidth < 1242) {
//
//             rem = html.clientWidth / 10;
//
//         } else {
//
//             rem = 108;
//
//         }
//
//         html.style.fontSize = rem + 'px';
//
//         document.body.style.fontSize = 12 * dpr + 'px';
//     };
//
//     if (document.addEventListener) {
//
//         document.addEventListener('DOMContentLoaded', recalculate, false);
//
//         window.addEventListener('orientationchange', recalculate, false);
//
//     } else {
//         window.attachEvent('resize', recalculate);
//
//         document.onreadystatechange = function () {
//
//             if (document.readyState == 'complete') {
//
//                 recalculate();
//
//             }
//         }
//     }
// })(window, document);

;(function (window, document) {
    var recalculate = function () {
        var dpr = Math.floor(window.devicePixelRatio) || 1;
        var html = document.documentElement;
        var scale = 1/dpr;

        html.setAttribute("data-dpr",dpr);

        var metaEl = document.createElement("meta");
        metaEl.setAttribute("name","viewport");
        metaEl.setAttribute('content','width=' + "device-width" + ",initial-scale=" + scale + ",maximum-scale="+scale + ",minimum-scale=" +scale+",user-scalable=no");


        document.head.appendChild(metaEl);
        var rem = 75;

        if (html.clientWidth < 1242){
            rem = html.clientWidth / 10;
        }else {
            rem = 108;
        }

        html.style.fontSize = rem + 'px';
        document.body.style.fontSize = 12* dpr + "px";

    };

    if (document.addEventListener){
        document.addEventListener("DOMContentLoaded", recalculate, false);
        window.addEventListener("orientationchange",recalculate,false);
    }else {
        window.attachEvent("resize",recalculate);

        document.onreadystatechange = function () {
            if (document.readyState == "complete"){
                recalculate();
            }
        }
    }
})(window, document);

