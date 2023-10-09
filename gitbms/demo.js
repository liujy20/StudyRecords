var WXBizDataCrypt = require('./tool/WXBizDataCrypt')

var appId = 'wx1ad717865c973761'
var sessionKey = '9e11c55b751340a6ffa'//867973bc0502b'

var encryptedData = "7xbWuqn9sdJ/sO2PQwYWNObAlzKwPsmMm3EeAOIl9qWSl7EUZ6DBUQ7QXbYhhpY4Fm/rrqgR+qP7rWgA1d6f9HEmtDTiXMlWdo9Skk1xBSq0zDAbkvqgQZbA9Nr9QNB/QsosIq8Tza7uh3nN+q6bBdqOE+5b82oX/uBr466oDa45EwmKKvY9HH4bTwYgsKXeWBtBIdijGMxG5CyTPFYsP0MGr3GTcNDbtm9gfzl1rjgLOJEaMpeOciBIMQrbUA/ZFtBS5U1JbqaXfUvl++IKcxYmvZqv7Nr3gaWrx/eGQARX5jE+J2qJjcVvLTaj+SzF3NDkztLXUAnIn1tDP9NfytkKzHxjO8HJNA/nGsKusQUWeTjTwh8i6QAjWfaIhNmg6Gss6XLWy9DAH5xfAQRs+Nefd4DZsMMTl31qyVTgo2s="
var iv = "XVK8K3Rt+GX7RjP8zL4Srw=="

var pc = new WXBizDataCrypt(appId, sessionKey)

var data = pc.decryptData(encryptedData , iv)

console.log('解密后 data: ', data)
// 解密后的数据为
//
// data = {
//   "nickName": "Band",
//   "gender": 1,
//   "language": "zh_CN",
//   "city": "Guangzhou",
//   "province": "Guangdong",
//   "country": "CN",
//   "avatarUrl": "http://wx.qlogo.cn/mmopen/vi_32/aSKcBBPpibyKNicHNTMM0qJVh8Kjgiak2AHWr8MHM4WgMEm7GFhsf8OYrySdbvAMvTsw3mo8ibKicsnfN5pRjl1p8HQ/0",
//   "unionId": "ocMvos6NjeKLIBqg5Mr9QjxrP1FA",
//   "watermark": {
//     "timestamp": 1477314187,
//     "appid": "wx4f4bc4dec97d474b"
//   }
// }
