/**
 *
 * @param {*} formatString   期望时间字符串的输出格式
 * @param {*} time   待转为字符串的时间对象
 * 2023-09-23 12:23:45  => YYYY-MM-DD hh:mm:ss
 * 2023 09 23 12:23:45 星期三  => YYYY MM DD hh:mm:ss  E
 */
export function getTimeString(formatString, time, isZero = false) {
  //处理年份
  formatString = formatString.replace("YYYY", time.getFullYear());
  //处理月份
  formatString = formatString.replace(
    "MM",
    time.getMonth() + 1 < 10 && isZero
      ? "0" + (time.getMonth() + 1)
      : time.getMonth() + 1
  );
  //处理日期
  let date = time.getDate();
  formatString = formatString.replace("DD", date < 10 ? "0" + date : date);
  //处理小时
  let hour = time.getHours();
  formatString = formatString.replace("hh", hour < 10 ? "0" + hour : hour);
  //处理分钟
  let minute = time.getHours();
  formatString = formatString.replace(
    "mm",
    minute < 10 ? "0" + minute : minute
  );
  //处理秒数
  let second = time.getHours();
  formatString = formatString.replace(
    "ss",
    second < 10 ? "0" + second : second
  );
  //处理星期几  0-6  0 表示星期天
  let timeArr = ["天", "一", "二", "三", "四", "五", "六"];
  formatString = formatString.replace("E", "星期" + timeArr[time.getDay()]);

  return formatString;
}

export default getTimeString;
