/**
 * @param {*} date 具体日期变量,不传则返回当前时间
 * @return {string} 返回为 "yyyy-mm-dd MM:mm:ss" 格式的日期字符串
 */
function getFormatDate(data) {
    let dateObj
    data ? dateObj = new Date(data) : dateObj = new Date()
    let month = dateObj.getMonth() + 1;
    let strDate = dateObj.getDate();
    let hours = dateObj.getHours();
    let minutes = dateObj.getMinutes();
    let seconds = dateObj.getSeconds();
    if (month >= 1 && month <= 9) {
        month = "0" + month;
    }
    if (strDate >= 0 && strDate <= 9) {
        strDate = "0" + strDate;

    }
    if (hours >= 0 && hours <= 9) {
        hours = "0" + hours
    }
    if (minutes >= 0 && minutes <= 9) {
        minutes = "0" + minutes
    }
    if (seconds >= 0 && seconds <= 9) {
        seconds = "0" + seconds
    }
    return dateObj.getFullYear() + '-' + month + '-' + strDate + ' ' + hours + ":" + minutes + ":" + seconds;
}

/**
 * @param {number} num 小时数
 * @return {string} 返回为 "yyyy-mm-dd MM:mm:ss" 格式的日期字符串
 */
function addFormatDate(num) {
    let curTime = new Date()
    let addHour = curTime.setHours(curTime.getHours() + num)
    return getFormatDate(addHour)
}

/**
 * @param {string} data 字符串
 * @return {array} 返回为时间数组
 */
function getTimeArray(data) {
    let time = new Date()
    //开始时间
    let startTime
    //结束时间，默认为当前时间
    let endTime = getFormatDate()
    switch (data) {
        case "today":
            startTime = getFormatDate(time.setHours(0, 0, 0, 0))
            break;
        case "yesterday":
            startTime = getFormatDate(new Date(time-1000*60*60*24*1).setHours(0, 0, 0, 0))
            endTime = getFormatDate(time.setHours(0, 0, 0, 0))
            break;
        case "lately7":
            startTime = getFormatDate(new Date(time-1000*60*60*24*7).setHours(0, 0, 0, 0))
            break;
        case "lately30":
            startTime = getFormatDate(new Date(time-1000*60*60*24*30).setHours(0, 0, 0, 0))
            break;
        case "month":
            startTime = getFormatDate(new Date(time.getFullYear(),time.getMonth(),1).setHours(0, 0, 0, 0))
            break;
        case "year":
            startTime = getFormatDate(new Date(time.getFullYear(),0,1).setHours(0, 0, 0, 0))
            break;
        default:
            return 202
            break;
    }
    return [startTime,endTime]
}

module.exports = {
    getFormatDate,
    addFormatDate,
    getTimeArray
}