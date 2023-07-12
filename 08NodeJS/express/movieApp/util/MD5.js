function getMD5(pwd){
  let crypto=require('crypto')
  let md5=crypto.createHash('md5')
  let mpwd=md5.update(pwd+secret).digest('hex')
  return mpwd
}
const secret='xwg'
module.exports={
  getMD5,
  secret
}