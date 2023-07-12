const { model } = require("mongoose");
const { getMD5, secret } = require("../util/MD5");
const jwt=require('jsonwebtoken')
const {expressjwt} = require('express-jwt')
class UserController {
  test(n) {
    console.log(n);
  }
  // 登录
  async login(req, res) {
    let { phone, password } = req.body;
    console.log("传入用户", req.body);
    let mpwd=getMD5(password)
    let re = await model("userModel").find({
      phone: phone,
      password: mpwd,
    });
    if (re.length) {
      let token=jwt.sign({phone,password},'xwg',{expiresIn:7*24*60*60})

      res.send({
        code: 200,
        msg: "登录成功",
        token
      });
    } else {
      res.send({
        code: 500,
        msg: "登录失败",
      });
    }
  }
  // 注册
  async register(req, res) {
    let { phone, password } = req.body;
    let mpwd=getMD5(password)
    let re = await model("userModel").find({
      phone: phone,
    });
    if (re.length) {
      res.send({
        code: 500,
        msg: "重复账号!",
      });
    } else {
      await model("userModel").create({
        phone: phone,
        password: mpwd,
      });
      res.send({
        code: 200,
        msg: "注册成功",
      });
    }
  }
  // 修改密码
  async changePwd(req, res) {
    let { phone, oldPwd, newPwd } = req.body;
    // console.log(req.body);
    let mOldpwd=getMD5(oldPwd)
    let re = await model("userModel").find({
      phone: phone,
      password: mOldpwd,
    });
    // console.log(re);
    let mNewpwd=getMD5(newPwd)
    if (re.length) {
      let re = await model("userModel").updateMany(
        {
          phone: phone,
          password: mOldpwd,
        },
        {
          password: mNewpwd,
        }
      );
      // console.log(re);
      if (re.modifiedCount) {
        res.send({
          code: 200,
          msg: "修改成功",
        });
      } else {
        res.send({
          code: 200,
          msg: "修改失败,修改密码与原密码相同",
        });
      }
    } else {
      res.send({
        code: 500,
        msg: "修改失败,账号或密码错误",
      });
    }
  }
  // 查看用户
  async get(req, res) {
    let re = await model("userModel").find({}).skip(4);
    res.send({
      code: 200,
      msg: re,
    });
  }

  // 解析token
  async getOriginToken(req,res){
    let token=req.get('Authorization').split(' ')[1];
    let user=jwt.verify(token,secret)
    // console.log(token);
    res.send({
      code:200,
      msg:'解析成功',
      data:user
    }) 
  }
}
module.exports = UserController;
