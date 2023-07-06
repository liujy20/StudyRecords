require("../mode/userMode");
const { model } = require("mongoose");

class UserController {
  test(n) {
    console.log(n);
  }
  // 登录
  async login(req, res) {
    let { account, password } = req.body;
    console.log("传入用户", req.body);
    let re = await model("userModel").find({
      account: account,
      password: password,
    });
    if (re.length) {
      res.send({
        code: 200,
        msg: "登录成功",
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
    let { account, password } = req.body;
    let re = await model("userModel").find({
      account: account,
    });
    if (re.length) {
      res.send({
        code: 500,
        msg: "重复账号!",
      });
    } else {
      await model("userModel").create({
        account: account,
        password: password,
      });
      res.send({
        code: 200,
        msg: "注册成功",
      });
    }
  }
  // 修改密码
  async changePwd(req, res) {
    let { account, oldPwd, newPwd } = req.body;
    // console.log(req.body);
    let re = await model("userModel").find({
      account: account,
      password:oldPwd
    });
    // console.log(re);
    if (re.length) {
      let re = await model("userModel").updateMany(
        {
          account: account,
          password: oldPwd,
        },
        {
          password: newPwd,
        }
      );
      // console.log(re);
      if (re.modifiedCount) {
        res.send({
          code: 200,
          msg: "修改成功",
        });
      }else{
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
    let re = await model("userModel").find({});
    res.send({
      code: 200,
      msg: re,
    });
  }
}
module.exports = UserController;
