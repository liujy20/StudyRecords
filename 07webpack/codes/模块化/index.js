function getParam(url) {
    let search = url;
    if (!search) {
        console.log('空字符串');
        return;
    }
    //去除？
    search = search.substring(1);
    //切割参数
    let arr = search.split('&');
    //存储查找结果
    let val;
    //遍历数组
    arr.forEach(p => {
        let pA = p.split('=');
        if (pA[0] == key) {
            val = pA[1];
        }
    })
    return val;
}

import util from './util.js'

export{
    util,
    getParam
}