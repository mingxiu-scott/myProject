/**
 * Created by intern on 2017/9/15.
 */

let imgBaseURL = 'https://fuss10.elemecdn.com';

export const getImgPath = (imageHash,size) =>{

    console.log(imageHash);


    if (!imageHash){
        return;
    }

    var first = imageHash.substr(0,1);

    var second = imageHash.substr(1,2);

    var third = imageHash.substr(3);

    var imgType = imageHash.substr(32);

    var path = imgBaseURL + '/' + first + '/' + second + '/' + third + '.' + imgType + '?' + 'imageMogr/thumbnail/!' + size + 'r/gravity/Center/crop/' + size + '/';

    console.log(path);

    return path;
};



