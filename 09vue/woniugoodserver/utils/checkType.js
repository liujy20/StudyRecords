/**
 * @param {*} _id 
 * @return {Boolean} 
 */
function check_id(_id) {
    return typeof _id == "string" && _id.length == 24
}

/**
 * @param {*} data 
 * @return {Boolean} 
 */
function check_string(data) {
    return typeof data == "string"
}

/**
 * @param {*} data 
 * @return {Boolean} 
 */
 function check_array(data) {
    return data instanceof Array
}

/**
 * @param {*} data 
 * @return {Boolean} 
 */
function check_number(data) {
    return typeof data == "number"
}
/**
 * @param {*} data 
 * @return {Boolean} 
 */
function check_pay(data) {
    let array = ["pay_actual", "pay_integral", "pay_freight", "pay_type"]
    if (data instanceof Object&& Object.keys(data).length==4) {
        let res = array.every(item => data.hasOwnProperty(item) && typeof data[item] == "number")
        if (res) {
            return true
        } else {
            return false
        }
    } else {
        return false
    }
}

module.exports = {
    check_id,
    check_string,
    check_number,
    check_array,
    check_pay
}