/**
 * 
 * @param {*} formatString   期望时间字符串的输出格式
 * @param {*} time   待转为字符串的时间对象
 * 2023-09-23 12:23:45  => YYYY-MM-DD hh:mm:ss 
 * 2023 09 23 12:23:45 星期三  => YYYY MM DD hh:mm:ss  E
 */
export function getTimeString(formatString,time,isZero = false){
    
    formatString = formatString.replace("YYYY",time.getFullYear());//处理年份
    formatString = formatString.replace("MM",time.getMonth() +1 <10&&isZero ? '0'+ (time.getMonth() +1):time.getMonth() +1);//处理月份
    let date = time.getDate();
    formatString = formatString.replace("DD",date < 10 ? '0'+date :date);//处理日期
    formatString = formatString.replace("hh",time.getHours());//处理小时
    formatString = formatString.replace("mm",time.getMinutes());//处理分钟
    formatString = formatString.replace("ss",time.getSeconds());//处理秒数
    if(time.getDay() ==0){
        formatString.replace("E","星期天");//处理星期几  0-6  0 表示星期天
    }else{
        formatString.replace("E","星期"+time.getDay());//处理星期几  0-6  0 表示星期天
    }
    return formatString;
}



// export default {
//     getTimeString
// }