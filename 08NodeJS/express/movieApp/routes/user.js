let express = require("express");

let router = express.Router();
let userArr = require("../util/userDB");

// 登录
router.post("/login", (req, res) => {
  let { account, password } = req.body;
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
});
// 注册
router.post("/register", (req, res) => {
  let { account } = req.body;
  if (userArr.some((val) => val.account == account)) {
    res.send({
      code: 500,
      msg: "重复账号!",
    });
  } else {
    userArr.push(req.body);
    res.send({
      code: 200,
      msg: "注册成功",
    });
  }
});
// 修改密码
router.post("/changePwd", (req, res) => {
  let { account, oldPwd, newPwd } = req.body;
  console.log(req.body);
  if (userArr.some((val) => val.account == account && val.password == oldPwd)) {
    userArr.forEach((val) => {
      if (val.account == account) {
        val.password = newPwd;
      }
    });
    res.send({
      code: 200,
      msg: "修改成功",
    });
  } else {
    res.send({
      code: 500,
      msg: "修改失败,账号或密码错误",
    });
  }
});
// 检查用户
router.get("/getUserArr", (req, res) => {
  res.send({
    code: 200,
    msg: userArr,
  });
});

module.exports = router;
