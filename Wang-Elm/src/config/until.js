/**
 * Created by intern on 2017/9/15.
 */

let imgBaseURL = 'https://fuss10.elemecdn.com';

export const getImgPath = (imageHash,size) =>{


    if (!imageHash){
        return;
    }

    var first = imageHash.substr(0,1);

    var second = imageHash.substr(1,2);

    var third = imageHash.substr(3);

    var imgType = imageHash.substr(32);

    var path = imgBaseURL + '/' + first + '/' + second + '/' + third + '.' + imgType + '?' + 'imageMogr/thumbnail/!' + size + 'r/gravity/Center/crop/' + size + '/';

    return path;
};

export const getShopViewImg = (imageHash,size1,size2) =>{
    if (!imageHash) {
        return;
    }
    var first = imageHash.substr(0,1);
    var second = imageHash.substr(1, 2);
    var third = imageHash.substr(3);
    var imgType = imageHash.substr(32);

    var path = imgBaseURL + '/' + first + '/' + second + '/' + third + '.' + imgType + '?' + 'imageMogr/format/webp/thumbnail/!' + size1 + 'p/blur/' + size2 + '/';

    return path;
}



