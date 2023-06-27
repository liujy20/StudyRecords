//获取url传参
function getParam(key) {
    let search = decodeURIComponent(location.search);
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
//获取星期几
function getWeek(date) {
    let week = date.getDay();
    let result = null;
    switch (week) {
        case 0:
            result = '星期日';
            break;
        case 1:
            result = '星期一';
            break;
        case 2:
            result = '星期二';
            break;
        case 3:
            result = '星期三';
            break;
        case 4:
            result = '星期四';
            break;
        case 5:
            result = '星期五';
            break;
        case 6:
            result = '星期六';
            break;
    }
    return result;
}
//保留指定位数
function getUnits(num, unit) {
    let result = num + '';
    for (let count = 0; count < unit - (num + '').length; count++) {
        result = '0' + result;
    }
    return result;
}

export default{
    getParam,
    getUnits
}

