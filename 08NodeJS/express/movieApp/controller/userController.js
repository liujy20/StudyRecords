const userArr = require("../util/userDB");
const UserMode = require("../mode/userMode");
class UserController {
  test(n) {
    console.log(n);
  }
  // 登录
  login(req, res) {
    let { account, password } = req.body;
    console.log("传入用户", req.body);
    if (
      userArr.some((val) => val.account == account && val.password == password)
    ) {
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
  register(req, res) {
    let { account, password } = req.body;
    if (userArr.some((val) => val.account == account)) {
      res.send({
        code: 500,
        msg: "重复账号!",
      });
    } else {
      userArr.push(new UserMode(account, password));
      res.send({
        code: 200,
        msg: "注册成功",
      });
    }
  }
  // 修改密码
  changePwd(req, res) {
    let { account, oldPwd, newPwd } = req.body;
    // console.log(req.body);
    if (
      userArr.some((val) => val.account == account && val.password == oldPwd)
    ) {
      userArr.forEach((val) => {
        if (val.account == account) {
          val.password = newPwd;
          res.send({
            code: 200,
            msg: "修改成功",
          });
        }
      });
    } else {
      res.send({
        code: 500,
        msg: "修改失败,账号或密码错误",
      });
    }
  }
  // 查看用户
  get(req, res) {
    res.send({
      code: 200,
      msg: userArr,
    });
  }
}
module.exports = UserController;
